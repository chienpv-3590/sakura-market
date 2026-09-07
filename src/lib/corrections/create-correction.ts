import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database, Tables, TablesInsert } from "@/lib/db/types";
import { writeAuditLog } from "@/lib/audit/write-audit-log";

export type CreateCorrectionReason = "TXN_NOT_FOUND" | "NOT_LOCKED";
export type CreateCorrectionResult =
  | { ok: true; correction: Tables<"correction_request"> }
  | { ok: false; reason: CreateCorrectionReason };

/**
 * A1 (FR-001, FR-201, BR-001, BR-003, US001). BR-001: this function's ONLY
 * write is the INSERT below -- the original `transaction` row is never
 * touched. FR-001: a correction only makes sense once the transaction's own
 * business_date is locked (an unlocked day can still be edited directly).
 * `reason`/evidence presence (BR-003) is validated by the route handler
 * before this is even called, since the evidence file itself must already be
 * uploaded (evidence-upload.ts) to have a path to pass in here.
 */
export async function createCorrection(
  client: SupabaseClient<Database>,
  input: { targetTxnId: string; reason: string; evidencePath: string; actorId: string },
): Promise<CreateCorrectionResult> {
  const { data: txn, error: txnError } = await client
    .from("transaction")
    .select("id, business_date")
    .eq("id", input.targetTxnId)
    .maybeSingle();
  if (txnError) {
    throw new Error(`createCorrection: transaction lookup failed: ${txnError.message}`);
  }
  if (!txn) return { ok: false, reason: "TXN_NOT_FOUND" };

  const { data: lock, error: lockError } = await client
    .from("business_day_lock")
    .select("business_date")
    .eq("business_date", txn.business_date)
    .maybeSingle();
  if (lockError) {
    throw new Error(`createCorrection: lock lookup failed: ${lockError.message}`);
  }
  if (!lock) return { ok: false, reason: "NOT_LOCKED" };

  const insertRow: TablesInsert<"correction_request"> = {
    target_txn_id: input.targetTxnId,
    reason: input.reason,
    evidence_path: input.evidencePath,
    status: "pending",
    requested_by: input.actorId,
  };
  const { data: correction, error: insertError } = await client
    .from("correction_request")
    .insert(insertRow)
    .select()
    .single();
  if (insertError || !correction) {
    throw new Error(`createCorrection: insert failed: ${insertError?.message}`);
  }

  await writeAuditLog(client, {
    actorId: input.actorId,
    action: "correction_request_create",
    entity: "correction_request",
    entityId: correction.id,
    before: null,
    after: { target_txn_id: input.targetTxnId, status: "pending" },
    reason: input.reason,
  });

  return { ok: true, correction };
}
