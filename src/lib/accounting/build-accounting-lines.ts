import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/lib/db/types";
import { loadReconciliationLines } from "@/lib/reconciliation/reconciliation-queries";
import { loadApprovedAdjustmentsForDate } from "@/lib/corrections/adjustment-queries";
import { calculateTaxJpy } from "./tax";

export type AccountingLineStatus = "đã chốt" | "đã điều chỉnh";

export interface AccountingLine {
  businessDate: string;
  participantId: string;
  participantName: string;
  participantCategory: string;
  grossAmountJpy: number;
  adjustmentAmountJpy: number;
  netAmountJpy: number;
  taxJpy: number;
  totalWithTaxJpy: number;
  status: AccountingLineStatus;
}

/**
 * IF-ACC-01 core aggregation -- gross (reconciliation_line) + approved
 * post-lock adjustments (transaction_adjustment), grouped by participant,
 * for one JST business_date. No new view (phase-02 §Key Insights #5): the
 * per-batch tax stamp means this join is done in TypeScript exactly like
 * RPT-01/RPT-05 already do, not inside a parameter-less SQL view.
 *
 * Only reads -- writes nothing. `createExportBatch` is the caller that
 * turns this into a persisted, immutable batch row.
 */
export async function buildAccountingLines(
  client: SupabaseClient<Database>,
  businessDate: string,
): Promise<AccountingLine[]> {
  const [reconciliationLines, adjustments] = await Promise.all([
    loadReconciliationLines(client, businessDate),
    loadApprovedAdjustmentsForDate(client, businessDate),
  ]);

  const grossByParticipant = new Map<string, number>();
  for (const line of reconciliationLines) {
    // `delivery` source rows carry participant_id=null and amount_jpy=null
    // by design (phase-02 §Key Insights #5) -- they fall out of this sum on
    // their own, no separate filter needed.
    if (!line.participant_id || line.amount_jpy === null) continue;
    grossByParticipant.set(line.participant_id, (grossByParticipant.get(line.participant_id) ?? 0) + line.amount_jpy);
  }

  const adjustmentByParticipant = new Map<string, number>();
  for (const adj of adjustments) {
    if (!adj.buyerParticipantId) continue;
    adjustmentByParticipant.set(
      adj.buyerParticipantId,
      (adjustmentByParticipant.get(adj.buyerParticipantId) ?? 0) + adj.amountDeltaJpy,
    );
  }

  const participantIds = new Set<string>([...grossByParticipant.keys(), ...adjustmentByParticipant.keys()]);
  const participantById = await loadParticipantLookup(client, Array.from(participantIds));

  const lines: AccountingLine[] = [];
  for (const participantId of participantIds) {
    const gross = grossByParticipant.get(participantId) ?? 0;
    const adjustment = adjustmentByParticipant.get(participantId) ?? 0;
    const net = gross + adjustment;
    const participant = participantById.get(participantId);
    lines.push({
      businessDate,
      participantId,
      participantName: participant?.name ?? participantId,
      participantCategory: participant?.category ?? "",
      grossAmountJpy: gross,
      adjustmentAmountJpy: adjustment,
      netAmountJpy: net,
      taxJpy: calculateTaxJpy(net),
      totalWithTaxJpy: net + calculateTaxJpy(net),
      status: adjustment === 0 ? "đã chốt" : "đã điều chỉnh",
    });
  }

  lines.sort((a, b) => a.participantName.localeCompare(b.participantName));
  return lines;
}

async function loadParticipantLookup(
  client: SupabaseClient<Database>,
  ids: string[],
): Promise<Map<string, { name: string; category: string }>> {
  if (ids.length === 0) return new Map();

  const { data, error } = await client.from("participant").select("id, name, category").in("id", ids);
  if (error) {
    throw new Error(`buildAccountingLines: participant lookup failed: ${error.message}`);
  }
  return new Map((data ?? []).map((p) => [p.id, { name: p.name, category: p.category }]));
}
