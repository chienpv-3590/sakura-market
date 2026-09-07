import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database, Tables, TablesInsert } from "@/lib/db/types";
import { writeAuditLog } from "@/lib/audit/write-audit-log";
import { buildAdjustment, type AdjustmentKind } from "./build-adjustment";

export type Decision = "approve" | "reject";
export type ApproveCorrectionReason =
  | "NOT_FOUND"
  | "SELF_APPROVAL"
  | "ALREADY_DECIDED"
  | "INVALID_ADJUSTMENT";

export type ApproveCorrectionResult =
  | { ok: true; status: "approved"; adjustment: Tables<"transaction_adjustment"> }
  | { ok: true; status: "rejected" }
  | { ok: false; reason: ApproveCorrectionReason };

export interface ApproveCorrectionInput {
  correctionId: string;
  actorId: string;
  decision: Decision;
  adjustmentKind?: AdjustmentKind;
  qtyDelta?: number;
  unitPriceDelta?: number;
  note?: string | null;
}

/**
 * A3 (FR-301, FR-401, BR-002, SM-001, DEC-001, US002). QĐ-5 CAS-first order:
 * the status='pending'->'approved'|'rejected' UPDATE is the serialization
 * point (also the double-decision guard, same idiom as
 * confirm-transaction.ts) and runs BEFORE the dependent
 * `transaction_adjustment` insert; if that insert fails, the CAS is
 * compensated back to 'pending' rather than left approved with no
 * adjustment row to justify it. BR-002/the phase's own hard rule: this
 * function NEVER writes to `transaction` under any branch.
 */
export async function approveCorrection(
  client: SupabaseClient<Database>,
  input: ApproveCorrectionInput,
): Promise<ApproveCorrectionResult> {
  const { data: correction, error: readError } = await client
    .from("correction_request")
    .select("id, target_txn_id, status, requested_by")
    .eq("id", input.correctionId)
    .maybeSingle();
  if (readError) {
    throw new Error(`approveCorrection(${input.correctionId}): lookup failed: ${readError.message}`);
  }
  if (!correction) return { ok: false, reason: "NOT_FOUND" };
  if (correction.requested_by !== null && correction.requested_by === input.actorId) {
    return { ok: false, reason: "SELF_APPROVAL" };
  }
  if (correction.status !== "pending") return { ok: false, reason: "ALREADY_DECIDED" };

  if (input.decision === "reject") {
    const { data: rejected, error: casError } = await client
      .from("correction_request")
      .update({ status: "rejected", approved_by: input.actorId })
      .eq("id", input.correctionId)
      .eq("status", "pending")
      .select("id")
      .maybeSingle();
    if (casError) {
      throw new Error(`approveCorrection(${input.correctionId}): reject CAS failed: ${casError.message}`);
    }
    if (!rejected) return { ok: false, reason: "ALREADY_DECIDED" };

    await writeAuditLog(client, {
      actorId: input.actorId,
      action: "reject_correction",
      entity: "correction_request",
      entityId: input.correctionId,
      before: { status: "pending" },
      after: { status: "rejected" },
      reason: input.note ?? null,
    });
    return { ok: true, status: "rejected" };
  }

  if (!input.adjustmentKind) return { ok: false, reason: "INVALID_ADJUSTMENT" };
  if (
    input.adjustmentKind === "delta" &&
    (input.qtyDelta ?? 0) === 0 &&
    (input.unitPriceDelta ?? 0) === 0
  ) {
    return { ok: false, reason: "INVALID_ADJUSTMENT" };
  }

  const { data: txn, error: txnError } = await client
    .from("transaction")
    .select("qty, unit_price")
    .eq("id", correction.target_txn_id)
    .maybeSingle();
  if (txnError) {
    throw new Error(`approveCorrection(${input.correctionId}): transaction lookup failed: ${txnError.message}`);
  }
  if (!txn) return { ok: false, reason: "NOT_FOUND" };

  const adjustment = buildAdjustment(
    input.adjustmentKind,
    { qty: txn.qty, unitPrice: txn.unit_price },
    input.adjustmentKind === "delta"
      ? { qtyDelta: input.qtyDelta ?? 0, unitPriceDelta: input.unitPriceDelta ?? 0 }
      : undefined,
  );

  const { data: approved, error: casError } = await client
    .from("correction_request")
    .update({ status: "approved", approved_by: input.actorId })
    .eq("id", input.correctionId)
    .eq("status", "pending")
    .select("id")
    .maybeSingle();
  if (casError) {
    throw new Error(`approveCorrection(${input.correctionId}): approve CAS failed: ${casError.message}`);
  }
  if (!approved) return { ok: false, reason: "ALREADY_DECIDED" };

  const insertRow: TablesInsert<"transaction_adjustment"> = {
    source_correction_id: input.correctionId,
    target_txn_id: correction.target_txn_id,
    kind: adjustment.kind,
    qty_delta: adjustment.qtyDelta,
    unit_price_delta: adjustment.unitPriceDelta,
    amount_delta: adjustment.amountDelta,
  };
  const { data: adjustmentRow, error: insertError } = await client
    .from("transaction_adjustment")
    .insert(insertRow)
    .select()
    .single();
  if (insertError || !adjustmentRow) {
    // Compensate: undo the CAS rather than leave 'approved' standing with no
    // adjustment row to back it (BR-002's whole point is that the adjustment
    // row IS the record of what changed).
    await client
      .from("correction_request")
      .update({ status: "pending", approved_by: null })
      .eq("id", input.correctionId)
      .eq("status", "approved");
    throw new Error(`approveCorrection(${input.correctionId}): adjustment insert failed: ${insertError?.message}`);
  }

  await writeAuditLog(client, {
    actorId: input.actorId,
    action: "approve_correction",
    entity: "correction_request",
    entityId: input.correctionId,
    before: { status: "pending" },
    after: { status: "approved", ...adjustment },
    reason: input.note ?? null,
  });

  return { ok: true, status: "approved", adjustment: adjustmentRow };
}
