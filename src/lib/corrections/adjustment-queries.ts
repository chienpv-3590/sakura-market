import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/lib/db/types";

export interface ApprovedAdjustmentRow {
  id: string;
  sourceCorrectionId: string;
  targetTxnId: string;
  buyerParticipantId: string;
  businessDate: string;
  txnCode: string;
  kind: "reverse" | "delta";
  qtyDelta: number;
  unitPriceDelta: number;
  amountDeltaJpy: number;
  createdAt: string;
  correctionReason: string | null;
  correctionRequestedBy: string | null;
  correctionApprovedBy: string | null;
  correctionCreatedAt: string | null;
}

type AdjustmentQueryRow = {
  id: string;
  source_correction_id: string;
  target_txn_id: string;
  kind: string;
  qty_delta: number;
  unit_price_delta: number;
  amount_delta: number;
  created_at: string;
  transaction: { business_date: string; buyer_participant_id: string; txn_code: string } | null;
  correction_request: {
    reason: string;
    requested_by: string | null;
    approved_by: string | null;
    created_at: string;
  } | null;
};

/**
 * Every `transaction_adjustment` row targeting a transaction whose
 * business_date is `businessDate` -- shared between phase-02 (batch line
 * aggregation) and phase-05 (RPT-08 adjustment log), so the join is written
 * exactly once (DRY, plan §Dependencies "02 chan ... 05"). No separate
 * approved-only filter is needed: `transaction_adjustment` rows only ever
 * exist because `approveCorrection` already ran its CAS to 'approved'
 * before inserting one (approve-correction.ts) -- there is no "pending
 * adjustment" state to filter out.
 *
 * `transaction!inner(...)` is required (not a plain embed) so the
 * `.eq("transaction.business_date", ...)` filter below actually narrows the
 * embedded resource instead of being silently ignored by PostgREST.
 *
 * `txn_code`/`source_correction_id`/`correction_request.requested_by` are
 * fetched (phase-05 §Architecture) even though phase-02's own
 * `buildAccountingLines` never reads them -- additive fields on a shared
 * single-join function, not a second join, is what keeps RPT-08 and the
 * accounting export unable to drift apart (Risk Assessment "Lệch với bản
 * xuất kế toán vì hai chỗ tự join lấy"). `evidence_path` is deliberately
 * NEVER selected here -- no caller of this function may ever put it in an
 * output (Security Considerations).
 */
export async function loadApprovedAdjustmentsForDate(
  client: SupabaseClient<Database>,
  businessDate: string,
): Promise<ApprovedAdjustmentRow[]> {
  const { data, error } = await client
    .from("transaction_adjustment")
    .select(
      "id, source_correction_id, target_txn_id, kind, qty_delta, unit_price_delta, amount_delta, created_at, " +
        "transaction!inner(business_date, buyer_participant_id, txn_code), " +
        "correction_request(reason, requested_by, approved_by, created_at)",
    )
    .eq("transaction.business_date", businessDate)
    .order("created_at", { ascending: true });

  if (error) {
    throw new Error(`loadApprovedAdjustmentsForDate(${businessDate}) failed: ${error.message}`);
  }

  return ((data ?? []) as unknown as AdjustmentQueryRow[]).map((row) => ({
    id: row.id,
    sourceCorrectionId: row.source_correction_id,
    targetTxnId: row.target_txn_id,
    buyerParticipantId: row.transaction?.buyer_participant_id ?? "",
    businessDate: row.transaction?.business_date ?? businessDate,
    txnCode: row.transaction?.txn_code ?? "",
    kind: row.kind === "reverse" ? "reverse" : "delta",
    qtyDelta: row.qty_delta,
    unitPriceDelta: row.unit_price_delta,
    amountDeltaJpy: row.amount_delta,
    createdAt: row.created_at,
    correctionReason: row.correction_request?.reason ?? null,
    correctionRequestedBy: row.correction_request?.requested_by ?? null,
    correctionApprovedBy: row.correction_request?.approved_by ?? null,
    correctionCreatedAt: row.correction_request?.created_at ?? null,
  }));
}
