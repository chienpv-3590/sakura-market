import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database, Tables } from "@/lib/db/types";
import { writeAuditLog } from "@/lib/audit/write-audit-log";
import { round2, qtyEquals } from "./qty-math";

export type CompleteDeliveryReason = "NOT_FOUND" | "ALREADY_COMPLETED" | "QTY_MISMATCH";

export type CompleteDeliveryResult =
  | { ok: true; delivery: Tables<"delivery"> }
  | { ok: false; reason: CompleteDeliveryReason; deliveredQty?: number; orderedQty?: number };

/**
 * A3 (FR-DEL-02, BR-DEL-03, US002). BR-DEL-03 in LAB-3 = exact match, no
 * tolerance (functional-spec §3 Open Decisions) -- short delivery stays
 * "đang giao", over-delivery was already refused at record-shipment.ts's own
 * guard, so the only gate left here is `delivered_qty === transaction.qty`.
 *
 * Role note (RLS ground truth, not the tech-spec's stated assumption): the
 * lot-status side effect below needs `lot` write access, and
 * rls_core.sql's `write_lot_operational` policy does NOT include
 * ROLE-DELIVERY -- only ROLE-INTAKE/ROLE-JUDGE/ROLE-TRADE/ROLE-SETTLEMENT.
 * The route handler gates this action to ROLE-SETTLEMENT only for that
 * reason (see app/api/deliveries/[id]/complete/route.ts), overriding
 * deliverytracking/technical-spec.md §5.2's "cả 2 role" assumption -- letting
 * ROLE-DELIVERY through here would silently no-op the lot update (RLS filters
 * the row out instead of erroring) and leave delivery="hoàn tất" with
 * lot.status stuck at "traded".
 */
export async function completeDelivery(
  client: SupabaseClient<Database>,
  deliveryId: string,
  actorId: string,
): Promise<CompleteDeliveryResult> {
  const { data: delivery, error: readError } = await client
    .from("delivery")
    .select("id, status, delivered_qty, transaction_id")
    .eq("id", deliveryId)
    .maybeSingle();
  if (readError) {
    throw new Error(`completeDelivery(${deliveryId}): lookup failed: ${readError.message}`);
  }
  if (!delivery) return { ok: false, reason: "NOT_FOUND" };
  if (delivery.status === "hoàn tất") return { ok: false, reason: "ALREADY_COMPLETED" };

  const { data: txn, error: txnError } = await client
    .from("transaction")
    .select("qty, lot_id")
    .eq("id", delivery.transaction_id)
    .maybeSingle();
  if (txnError) {
    throw new Error(`completeDelivery(${deliveryId}): transaction lookup failed: ${txnError.message}`);
  }
  if (!txn) return { ok: false, reason: "NOT_FOUND" };

  if (!qtyEquals(delivery.delivered_qty, txn.qty)) {
    return {
      ok: false,
      reason: "QTY_MISMATCH",
      deliveredQty: round2(delivery.delivered_qty),
      orderedQty: round2(txn.qty),
    };
  }

  const { data: completed, error: casError } = await client
    .from("delivery")
    .update({ status: "hoàn tất" })
    .eq("id", deliveryId)
    .eq("status", delivery.status)
    .select("*")
    .maybeSingle();
  if (casError) {
    throw new Error(`completeDelivery(${deliveryId}): status CAS failed: ${casError.message}`);
  }
  if (!completed) return { ok: false, reason: "ALREADY_COMPLETED" };

  // Best-effort side effect, not the invariant this action guards -- a lot
  // can in principle back multiple transactions (e.g. LOT-20260902-01 in the
  // seed data), so "delivered" here reflects only this one transaction's
  // delivery, a known simplification carried from the phase plan rather than
  // a modeled multi-transaction lot lifecycle.
  const { error: lotError } = await client.from("lot").update({ status: "delivered" }).eq("id", txn.lot_id);
  if (lotError) {
    throw new Error(`completeDelivery(${deliveryId}): lot status update failed: ${lotError.message}`);
  }

  await writeAuditLog(client, {
    actorId,
    action: "delivery_complete",
    entity: "delivery",
    entityId: deliveryId,
    before: { status: delivery.status, delivered_qty: delivery.delivered_qty },
    after: { status: "hoàn tất", delivered_qty: completed.delivered_qty },
  });

  return { ok: true, delivery: completed };
}
