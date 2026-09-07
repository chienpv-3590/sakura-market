import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/lib/db/types";
import { todayJst } from "@/lib/db/business-date";
import type { ReportDefinition } from "./registry";
import type { ReportRow } from "./report-row";
import { isValidReportDate } from "./is-valid-report-date";
import { REPORT_PAGE_SIZE } from "./report-page-size";
import { loadDailyTransactionRows } from "./queries/rpt-01-daily-transactions";
import { loadDailyReconciliationRows } from "./queries/rpt-05-daily-reconciliation";
import { loadIncentiveReportRows } from "./queries/rpt-07-incentive-result";

export interface ReportFilters {
  businessDate?: string;
  period?: string;
  participantId?: string;
}

/** Reads `definition.filterFields` generically -- no per-report branch here. */
export function parseReportFilters(definition: ReportDefinition, searchParams: URLSearchParams): ReportFilters {
  const filters: ReportFilters = {};
  for (const field of definition.filterFields) {
    const raw = searchParams.get(field.key)?.trim();
    if (field.type === "date") {
      const value = raw && isValidReportDate(raw) ? raw : todayJst();
      if (field.key === "period") filters.period = value;
      else filters.businessDate = value;
    } else if (field.type === "select" && raw) {
      filters.participantId = raw;
    }
  }
  return filters;
}

async function queryAllRows(
  client: SupabaseClient<Database>,
  definition: ReportDefinition,
  filters: ReportFilters,
): Promise<ReportRow[]> {
  switch (definition.code) {
    case "RPT-01":
      return loadDailyTransactionRows(client, filters.businessDate ?? todayJst());
    case "RPT-05":
      return loadDailyReconciliationRows(client, filters.businessDate ?? todayJst());
    case "RPT-07":
      return loadIncentiveReportRows(client, filters.period ?? todayJst(), filters.participantId);
    default:
      // Registry guarantees every non-mock code is one of the 3 above --
      // an unhandled real code here means the registry and this dispatcher
      // drifted apart, a programming error, not a runtime user input case.
      throw new Error(`load-report-rows: unhandled real report code ${definition.code}`);
  }
}

/**
 * Shared framework entry point (A2/A3). Mock reports (functional-spec §3
 * Open Decision) always return an empty set -- the UI shows the mock badge
 * instead of fabricated numbers, so nobody mistakes a sample for a real
 * figure (Risk Assessment). `paginate: false` returns the FULL filtered set,
 * used by the CSV export (US003: "không giới hạn theo trang").
 */
export async function loadReportRows(
  client: SupabaseClient<Database>,
  definition: ReportDefinition,
  filters: ReportFilters,
  options: { paginate: boolean; page?: number },
): Promise<{ rows: ReportRow[]; total: number }> {
  if (definition.isMock) return { rows: [], total: 0 };

  const all = await queryAllRows(client, definition, filters);
  if (!options.paginate) return { rows: all, total: all.length };

  const page = Math.max(1, options.page ?? 1);
  const start = (page - 1) * REPORT_PAGE_SIZE;
  return { rows: all.slice(start, start + REPORT_PAGE_SIZE), total: all.length };
}
