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
    const { rows } = await loadReportRows(supabase, definition, filters, { paginate: false });

    const columns = definition.columns.map((c) => ({ key: c.key, header: dict[c.labelKey] ?? c.key }));
    const csv = toCsv(columns, rows);
    const dateForFilename = filters.businessDate ?? filters.period ?? todayJst();

    return new NextResponse(csv, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="${definition.code}-${dateForFilename}.csv"`,
      },
    });
  } catch (err) {
    console.error(`[api/reports/${reportCode}/export.csv] GET unexpected error`, err);
    return NextResponse.json({ error: "internal_error" }, { status: 500 });
  }
}
