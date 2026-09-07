import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/lib/db/types";

export interface IncentiveResultRow {
  id: string;
  period: string;
  participantId: string;
  participantName: string;
  amountJpy: number;
  kind: string;
  originPeriod: string | null;
  sourceCorrectionId: string | null;
  ruleVersionId: string;
  ruleVersionNo: number;
  ruleEffectiveFrom: string;
  createdAt: string;
}

interface JoinedRow {
  id: string;
  period: string;
  participant_id: string;
  amount_jpy: number;
  kind: string;
  origin_period: string | null;
  source_correction_id: string | null;
  rule_version_id: string;
  created_at: string;
  participant: { name: string } | null;
  rule_version: { version_no: number; effective_from: string } | null;
}

function flatten(row: JoinedRow): IncentiveResultRow {
  return {
    id: row.id,
    period: row.period,
    participantId: row.participant_id,
    participantName: row.participant?.name ?? row.participant_id,
    amountJpy: row.amount_jpy,
    kind: row.kind,
    originPeriod: row.origin_period,
    sourceCorrectionId: row.source_correction_id,
    ruleVersionId: row.rule_version_id,
    ruleVersionNo: row.rule_version?.version_no ?? 0,
    ruleEffectiveFrom: row.rule_version?.effective_from ?? "",
    createdAt: row.created_at,
  };
}

/**
 * A6 (FR-303) -- SCR016 list, and reused by RPT-07 (F010, DRY: both read the
 * same join). Joins `incentive_rule_version` so every row already carries
 * the version + effective date used to produce it -- FR-AUDIT-03's hard
 * traceability requirement, satisfied at read time rather than a separate
 * "open detail" round trip.
 */
export async function listIncentiveResults(
  client: SupabaseClient<Database>,
  filters: { period?: string; participantId?: string },
): Promise<IncentiveResultRow[]> {
  let query = client
    .from("incentive_result")
    .select("*, participant:participant_id(name), rule_version:rule_version_id(version_no, effective_from)")
    .order("created_at", { ascending: false });
  if (filters.period) query = query.eq("period", filters.period);
  if (filters.participantId) query = query.eq("participant_id", filters.participantId);

  const { data, error } = await query;
  if (error) {
    throw new Error(`listIncentiveResults failed: ${error.message}`);
  }
  return (data as unknown as JoinedRow[]).map(flatten);
}
