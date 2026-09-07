import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/lib/db/types";
import { listIncentiveResults } from "@/lib/incentive/incentive-result-queries";
import type { ReportRow } from "../report-row";

/**
 * RPT-07 "Kết quả tính 完納奨励金 theo kỳ" -- reuses F009's own
 * listIncentiveResults() (DRY: same join incentive/page.tsx uses for
 * SCR016), so this report and the incentive result screen can never drift
 * apart on what "the rule version used" means for FR-AUDIT-03.
 */
export async function loadIncentiveReportRows(
  client: SupabaseClient<Database>,
  period: string,
  participantId?: string,
): Promise<ReportRow[]> {
  const results = await listIncentiveResults(client, { period, participantId });
  return results.map((r) => ({
    period: r.period,
    participant: r.participantName,
    amountJpy: r.amountJpy,
    kind: r.kind,
    ruleVersionNo: r.ruleVersionNo,
    ruleEffectiveFrom: r.ruleEffectiveFrom,
    originPeriod: r.originPeriod ?? "",
  }));
}
