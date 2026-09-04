import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/lib/db/types";
import { releaseLotQty } from "@/lib/lots/availability-service";
import { writeAuditLog } from "@/lib/audit/write-audit-log";
import type { CancelRejectReason } from "./reject-reasons";

export type CancelResult = { ok: true } | { ok: false; reason: CancelRejectReason };

/**
 * A3 (FR-AITAI-03). No `SELECT ... FOR UPDATE` through PostgREST (QĐ-5), so
 * this reads the current status once, then writes conditioned on that exact
 * value read -- a second concurrent cancel (double-cancel, or a cancel racing
 * a confirm) has its own WHERE clause match 0 rows and reports
 * NOT_CANCELLABLE instead of double-releasing quantity.
 *
 * `trg_block_after_lock` (business_day_lock.sql) is the real lock guarantee
 * -- this function does not pre-check `business_day_lock` itself, it lets
 * the trigger fire on the UPDATE and catches the P0001 it raises. The caller
 * (the cancel route handler) is responsible for writing the
 * `locked_write_attempt` audit row as its own follow-up statement, since that
 * write must survive even though this function's own UPDATE was rolled back
 * by Postgres (phase-07 Implementation Steps #5).
 */
export async function cancelTransaction(
  client: SupabaseClient<Database>,
  txnId: string,
  actorId: string,
  reason: string,
): Promise<CancelResult> {
  const { data: txn, error: readError } = await client
    .from("transaction")
    .select("id, status, lot_id, qty")
    .eq("id", txnId)
    .maybeSingle();
  if (readError) {
    throw new Error(`cancelTransaction(${txnId}): lookup failed: ${readError.message}`);
  }
  if (!txn || (txn.status !== "draft" && txn.status !== "confirmed")) {
    return { ok: false, reason: "NOT_CANCELLABLE" };
  }

  const priorStatus = txn.status;
  const { data: cancelled, error: cancelError } = await client
    .from("transaction")
    .update({
      status: "cancelled",
      cancel_reason: reason,
      cancelled_by: actorId,
      cancelled_at: new Date().toISOString(),
    })
    .eq("id", txnId)
    .eq("status", priorStatus) // CAS guard against exactly what was just read
    .select("id")
    .maybeSingle();

  if (cancelError) {
    if (cancelError.code === "P0001") {
      return { ok: false, reason: "LOCKED_BUSINESS_DATE" };
    }
    throw new Error(`cancelTransaction(${txnId}): update failed: ${cancelError.message}`);
  }
  if (!cancelled) {
    // Lost the race -- another request already changed the status between
    // our read and our write (double-cancel or a confirm landed first).
    return { ok: false, reason: "NOT_CANCELLABLE" };
  }

  // Restore quantity ONLY when the prior status was 'confirmed' -- a 'draft'
  // cancel never reserved anything (A2 never ran on it), so there is
  // nothing to release.
  if (priorStatus === "confirmed") {
    await releaseLotQty(client, txn.lot_id, txn.qty);
  }

  await writeAuditLog(client, {
    actorId,
    action: "transaction_cancel",
    entity: "transaction",
    entityId: txnId,
    before: { status: priorStatus },
    after: { status: "cancelled", cancel_reason: reason },
    reason,
  });

  return { ok: true };
}
