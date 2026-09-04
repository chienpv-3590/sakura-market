import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database, Tables } from "@/lib/db/types";
import { checkParticipantEligibility } from "@/lib/participants/eligibility";
import { reserveLotQty, releaseLotQty } from "@/lib/lots/availability-service";
import { writeAuditLog } from "@/lib/audit/write-audit-log";
import { todayJst } from "@/lib/db/business-date";
import type { ConfirmRejectReason } from "./reject-reasons";

export type ConfirmResult =
  | { ok: true; transaction: Tables<"transaction"> }
  | { ok: false; reason: ConfirmRejectReason; detail?: string };

async function revertToDraft(client: SupabaseClient<Database>, txnId: string): Promise<void> {
  const { error } = await client
    .from("transaction")
    .update({ status: "draft", confirmed_by: null, confirmed_at: null })
    .eq("id", txnId);
  if (error) {
    throw new Error(`confirmTransaction: revert-to-draft failed for ${txnId}: ${error.message}`);
  }
}

/**
 * A2 (FR-AITAI-02, INT-001, INT-002). QĐ-5: PostgREST gives no cross-table
 * BEGIN/COMMIT, so the single DB transaction the spec's pseudocode wants is
 * approximated as: hit the serialization point FIRST -- the draft->confirmed
 * CAS on `transaction.status`, which doubles as both the "SELECT ... FOR
 * UPDATE" row lock the spec sketched (unavailable through PostgREST) and the
 * double-submit guard -- THEN run the two BR-PERM-01/BR-LOT-02 gates, with a
 * compensating write back to 'draft' (and, once quantity was reserved, a
 * releaseLotQty) if anything after the CAS fails. Running the gates first and
 * the CAS last would let two concurrent confirms both pass the gates before
 * either flips status -- exactly the double-decrement bug
 * availability-service.ts's own CAS exists to prevent one layer down.
 *
 * Eligibility is evaluated against todayJst() -- "now", the actual instant of
 * this confirm call -- never against `transaction.business_date` (the day the
 * draft happened to be stamped with). BR-PERM-01 means the moment of
 * confirmation, and a draft can in principle be confirmed on a later day than
 * it was created.
 */
export async function confirmTransaction(
  client: SupabaseClient<Database>,
  txnId: string,
  actorId: string,
): Promise<ConfirmResult> {
  const { data: won, error: casError } = await client
    .from("transaction")
    .update({ status: "confirmed", confirmed_by: actorId, confirmed_at: new Date().toISOString() })
    .eq("id", txnId)
    .eq("status", "draft")
    .select("*")
    .maybeSingle();

  if (casError) {
    if (casError.code === "P0001") {
      return { ok: false, reason: "LOCKED_BUSINESS_DATE" };
    }
    throw new Error(`confirmTransaction(${txnId}): status CAS failed: ${casError.message}`);
  }
  if (!won) {
    // Either the id doesn't exist, or status was already something other
    // than 'draft' -- a second confirm request on the same transaction lands
    // here with 0 rows (Success Criteria #6): whichever request commits the
    // CAS first wins, every other caller gets NOT_DRAFT without ever
    // touching the lot.
    return { ok: false, reason: "NOT_DRAFT" };
  }

  let qtyReserved = false;
  try {
    const eligibility = await checkParticipantEligibility(client, won.buyer_participant_id, todayJst());
    if (!eligibility.eligible) {
      await revertToDraft(client, txnId);
      return { ok: false, reason: "INELIGIBLE_PARTY", detail: eligibility.reason };
    }

    const reserved = await reserveLotQty(client, won.lot_id, won.qty);
    if (!reserved) {
      await revertToDraft(client, txnId);
      return { ok: false, reason: "INSUFFICIENT_QTY" };
    }
    qtyReserved = true;

    const { error: lotStatusError } = await client
      .from("lot")
      .update({ status: "traded" })
      .eq("id", won.lot_id);
    if (lotStatusError) {
      throw new Error(`confirmTransaction(${txnId}): lot.status update failed: ${lotStatusError.message}`);
    }

    await writeAuditLog(client, {
      actorId,
      action: "transaction_confirm",
      entity: "transaction",
      entityId: txnId,
      before: { status: "draft" },
      after: { status: "confirmed", confirmed_by: actorId, lot_id: won.lot_id, qty: won.qty },
    });

    return { ok: true, transaction: won };
  } catch (err) {
    // Best-effort compensation -- there is no cross-table transaction here to
    // roll this back automatically (Success Criteria #5: never leave a
    // half-applied confirm -- quantity reserved but status not actually
    // confirmed -- sitting in the DB).
    if (qtyReserved) {
      await releaseLotQty(client, won.lot_id, won.qty).catch(() => undefined);
    }
    await revertToDraft(client, txnId).catch(() => undefined);
    throw err;
  }
}
