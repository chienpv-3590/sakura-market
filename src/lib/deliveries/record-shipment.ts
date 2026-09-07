import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database, Tables, TablesInsert } from "@/lib/db/types";
import { writeAuditLog } from "@/lib/audit/write-audit-log";
import { todayJst } from "@/lib/db/business-date";
import { round2 } from "./qty-math";

export type RecordShipmentReason = "NOT_FOUND" | "ALREADY_COMPLETED" | "OVER_DELIVERY";

export type RecordShipmentResult =
  | { ok: true; delivery: Tables<"delivery">; shipment: Tables<"delivery_shipment"> }
  | { ok: false; reason: RecordShipmentReason; remaining?: number };

const MAX_CAS_ATTEMPTS = 10;
const MAX_SEQ_ATTEMPTS = 5;

// Best-effort rollback of the CAS bump when the dependent ledger insert never
// lands -- PostgrestBuilder is PromiseLike, not a real Promise (no .catch()),
// so this wraps the await in try/catch instead.
async function revertDeliveredQty(
  client: SupabaseClient<Database>,
  deliveryId: string,
  fromQty: number,
  byQty: number,
): Promise<void> {
  try {
    await client
      .from("delivery")
      .update({ delivered_qty: round2(fromQty - byQty) })
      .eq("id", deliveryId)
      .eq("delivered_qty", fromQty);
  } catch {
    // Best-effort only -- the thrown insert-failure error below is what
    // surfaces to the caller either way.
  }
}

/**
 * A2 (FR-DEL-05, US001). QĐ-5: no cross-table BEGIN/COMMIT through PostgREST,
 * so the serialization point is a compare-and-swap on `delivery.delivered_qty`
 * (same idiom as availability-service.ts's reserveLotQty) -- read the current
 * cumulative, re-check the OVER_DELIVERY guard against that exact value, then
 * write conditioned on both `delivered_qty` and `status` still matching what
 * was just read. Only after that CAS wins does the dependent
 * `delivery_shipment` ledger row get inserted, with a compensating rollback
 * of the CAS if that insert never lands (mirrors confirm-transaction.ts).
 */
export async function recordShipment(
  client: SupabaseClient<Database>,
  deliveryId: string,
  qty: number,
  actorId: string,
): Promise<RecordShipmentResult> {
  if (!Number.isFinite(qty) || qty <= 0) {
    throw new Error(`recordShipment: qty must be > 0, got ${qty}`);
  }

  const { data: delivery0, error: readError } = await client
    .from("delivery")
    .select("id, status, delivered_qty, transaction_id")
    .eq("id", deliveryId)
    .maybeSingle();
  if (readError) {
    throw new Error(`recordShipment(${deliveryId}): delivery lookup failed: ${readError.message}`);
  }
  if (!delivery0) return { ok: false, reason: "NOT_FOUND" };

  const { data: txn, error: txnError } = await client
    .from("transaction")
    .select("qty")
    .eq("id", delivery0.transaction_id)
    .maybeSingle();
  if (txnError) {
    throw new Error(`recordShipment(${deliveryId}): transaction lookup failed: ${txnError.message}`);
  }
  if (!txn) return { ok: false, reason: "NOT_FOUND" };
  const orderedQty = round2(txn.qty);

  let updatedDelivery: Tables<"delivery"> | null = null;
  for (let attempt = 0; attempt < MAX_CAS_ATTEMPTS; attempt++) {
    const { data: current, error: currentError } = await client
      .from("delivery")
      .select("status, delivered_qty")
      .eq("id", deliveryId)
      .maybeSingle();
    if (currentError) {
      throw new Error(`recordShipment(${deliveryId}): re-read failed: ${currentError.message}`);
    }
    if (!current) return { ok: false, reason: "NOT_FOUND" };
    if (current.status === "hoàn tất") return { ok: false, reason: "ALREADY_COMPLETED" };

    const remaining = round2(orderedQty - current.delivered_qty);
    if (round2(qty) > remaining) return { ok: false, reason: "OVER_DELIVERY", remaining };

    const { data: won, error: casError } = await client
      .from("delivery")
      .update({ delivered_qty: round2(current.delivered_qty + qty), status: "đang giao" })
      .eq("id", deliveryId)
      .eq("delivered_qty", current.delivered_qty)
      .eq("status", current.status)
      .select("*")
      .maybeSingle();
    if (casError) {
      throw new Error(`recordShipment(${deliveryId}): CAS update failed: ${casError.message}`);
    }
    if (won) {
      updatedDelivery = won;
      break;
    }
    // Lost the CAS to a concurrent shipment write -- retry against a fresh read.
  }
  if (!updatedDelivery) {
    throw new Error(`recordShipment(${deliveryId}): gave up after ${MAX_CAS_ATTEMPTS} CAS retries`);
  }

  let lastMessage = "";
  for (let attempt = 0; attempt < MAX_SEQ_ATTEMPTS; attempt++) {
    const { count, error: countError } = await client
      .from("delivery_shipment")
      .select("id", { count: "exact", head: true })
      .eq("delivery_id", deliveryId);
    if (countError) {
      throw new Error(`recordShipment(${deliveryId}): seq count failed: ${countError.message}`);
    }
    const seq = (count ?? 0) + 1;

    const insertRow: TablesInsert<"delivery_shipment"> = {
      delivery_id: deliveryId,
      seq,
      qty: round2(qty),
      confirmed_by: actorId,
      business_date: todayJst(),
    };
    const { data: shipment, error: insertError } = await client
      .from("delivery_shipment")
      .insert(insertRow)
      .select()
      .single();

    if (!insertError && shipment) {
      await writeAuditLog(client, {
        actorId,
        action: "delivery_shipment_record",
        entity: "delivery",
        entityId: deliveryId,
        before: { delivered_qty: round2(updatedDelivery.delivered_qty - qty) },
        after: { delivered_qty: updatedDelivery.delivered_qty, shipment_seq: seq, shipment_qty: round2(qty) },
      });
      return { ok: true, delivery: updatedDelivery, shipment };
    }

    if (insertError?.code === "23505") {
      lastMessage = insertError.message;
      continue; // seq collision (concurrent shipment) -- retry with a fresh count
    }

    // Compensate: the CAS already committed the cumulative bump, but no
    // ledger row exists to justify it -- undo it rather than leave
    // delivered_qty ahead of what delivery_shipment actually records.
    await revertDeliveredQty(client, deliveryId, updatedDelivery.delivered_qty, qty);
    throw new Error(`recordShipment(${deliveryId}): shipment insert failed: ${insertError?.message}`);
  }

  await revertDeliveredQty(client, deliveryId, updatedDelivery.delivered_qty, qty);
  throw new Error(`recordShipment(${deliveryId}): seq collision persisted after retry: ${lastMessage}`);
}
