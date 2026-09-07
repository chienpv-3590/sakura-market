import { NextResponse } from "next/server";
import type { SupabaseClient } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/lib/db/types";
import { requireUser } from "@/lib/auth/require-role";
import { getReportDefinition } from "@/lib/reports/registry";
import { loadReportRows, parseReportFilters } from "@/lib/reports/load-report-rows";
import { REPORT_PAGE_SIZE } from "@/lib/reports/report-page-size";

// A2 (FR-RPT-01, FR-RPT-02, US002) -- SCR020. `reportCode` is checked
// against the registry before anything else runs (Security Considerations:
// never let an arbitrary string reach a query or a filename).
export async function GET(
  request: Request,
  { params }: { params: Promise<{ reportCode: string }> },
): Promise<NextResponse> {
  await requireUser();
  const { reportCode } = await params;
  const definition = getReportDefinition(reportCode);
  if (!definition) return NextResponse.json({ error: "report_not_found" }, { status: 404 });

  const url = new URL(request.url);
  const page = Math.max(1, Number(url.searchParams.get("page")) || 1);

  try {
    const supabase: SupabaseClient<Database> = await createClient();
    const filters = parseReportFilters(definition, url.searchParams);
    const { rows, total } = await loadReportRows(supabase, definition, filters, { paginate: true, page });
    return NextResponse.json({
      reportCode: definition.code,
      isMock: definition.isMock,
      page,
      pageSize: REPORT_PAGE_SIZE,
      total,
      rows,
    });
  } catch (err) {
    console.error(`[api/reports/${reportCode}] GET unexpected error`, err);
    return NextResponse.json({ error: "internal_error" }, { status: 500 });
  }
}
