import { NextResponse } from "next/server";
import type { SupabaseClient } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/lib/db/types";
import { requireUser } from "@/lib/auth/require-role";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { getLocale } from "@/lib/i18n/get-locale";
import { todayJst } from "@/lib/db/business-date";
import { getReportDefinition } from "@/lib/reports/registry";
import { loadReportRows, parseReportFilters } from "@/lib/reports/load-report-rows";
import { toCsv } from "@/lib/reports/to-csv";
import { loadBatchByCode } from "@/lib/accounting/export-batch-queries";

// RPT-06's own batch code shape (batch-code.ts's `formatBatchCode`).
// Validated HERE, before the value ever reaches `.eq()` or
// `Content-Disposition` (phase-03 Security Considerations: an arbitrary
// string in a filename is a header-injection path) -- a value that fails
// this regex can never match a real batch anyway, so it is treated the same
// as "not found".
const BATCH_CODE_FORMAT = /^ACC-\d{8}-\d{2}$/;

// A3 (FR-RPT-03, US003) -- CSV always UTF-8 with BOM, `,` delimiter, RFC
// 4180 quoting, CRLF (F010 §4.6). Mock reports are blocked with 403 before
// any query runs -- never lets a sample dataset masquerade as an export.
export async function GET(
  request: Request,
  { params }: { params: Promise<{ reportCode: string }> },
): Promise<NextResponse> {
  await requireUser();
  const { reportCode } = await params;
  const definition = getReportDefinition(reportCode);
  if (!definition) return NextResponse.json({ error: "report_not_found" }, { status: 404 });
  if (definition.isMock) return NextResponse.json({ reason: "MOCK_REPORT" }, { status: 403 });

  const url = new URL(request.url);

  try {
    const [locale, supabase] = await Promise.all([getLocale(), createClient() as Promise<SupabaseClient<Database>>]);
    const dict = await getDictionary(locale, ["reports"]);
    const filters = parseReportFilters(definition, url.searchParams);

    // RPT-06 / IF-ACC-01 (§08-05): a CSV export must always be a specific,
    // named batch snapshot -- there is no "preview CSV" (phase-03 §Key
    // Insights #2). Checked ahead of loadReportRows so a missing/malformed/
    // unknown batchCode never reaches a live query.
    let filenameOverride: string | null = null;
    if (definition.code === "RPT-06") {
      const batchCode = filters.batchCode;
      if (!batchCode) {
        return NextResponse.json({ reason: "BATCH_CODE_REQUIRED" }, { status: 422 });
      }
      if (!BATCH_CODE_FORMAT.test(batchCode)) {
        return NextResponse.json({ reason: "BATCH_NOT_FOUND" }, { status: 404 });
      }
      const batch = await loadBatchByCode(supabase, batchCode);
      if (!batch || batch.business_date !== filters.businessDate) {
        return NextResponse.json({ reason: "BATCH_NOT_FOUND" }, { status: 404 });
      }
      // Filename is built from the DB-verified `batch.batch_code`, never
      // from the raw query string -- a second, independent layer against
      // header injection on top of the regex check above.
      filenameOverride = `RPT-06-${batch.batch_code}.csv`;
    }

    const { rows } = await loadReportRows(supabase, definition, filters, { paginate: false });

    const columns = definition.columns.map((c) => ({ key: c.key, header: dict[c.labelKey] ?? c.key }));
    const csv = toCsv(columns, rows);
    const dateForFilename = filters.businessDate ?? filters.period ?? todayJst();
    const filename = filenameOverride ?? `${definition.code}-${dateForFilename}.csv`;

    return new NextResponse(csv, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    });
  } catch (err) {
    console.error(`[api/reports/${reportCode}/export.csv] GET unexpected error`, err);
    return NextResponse.json({ error: "internal_error" }, { status: 500 });
  }
}
