import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database, Tables } from "@/lib/db/types";

export type DeliveryListRow = Tables<"delivery"> & {
  txn_code: string;
  transaction_qty: number;
  business_date: string;
};

/** SCR011 A1 -- delivery rows joined with just enough of their transaction to
 * render the list (txn_code, ordered qty, business_date for the date filter). */
export async function listDeliveries(
  client: SupabaseClient<Database>,
  filters: { status?: string; businessDate?: string } = {},
): Promise<DeliveryListRow[]> {
  const { data, error } = await client
    .from("delivery")
    .select("*, transaction:transaction_id(txn_code, qty, business_date)")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(`listDeliveries failed: ${error.message}`);
  }

  type Joined = Tables<"delivery"> & {
    transaction: { txn_code: string; qty: number; business_date: string } | null;
  };

  return (data as unknown as Joined[])
    .filter((row) => row.transaction !== null)
    .map((row) => ({
      ...row,
      txn_code: row.transaction!.txn_code,
      transaction_qty: row.transaction!.qty,
      business_date: row.transaction!.business_date,
    }))
    .filter((row) => (filters.status ? row.status === filters.status : true))
    .filter((row) => (filters.businessDate ? row.business_date === filters.businessDate : true));
}

/** SCR012 -- a single delivery plus the ordered qty/business_date of its transaction. */
export async function loadDeliveryWithTransaction(
  client: SupabaseClient<Database>,
  deliveryId: string,
): Promise<{ delivery: Tables<"delivery">; transaction: Tables<"transaction"> } | null> {
  const { data, error } = await client
    .from("delivery")
    .select("*, transaction:transaction_id(*)")
    .eq("id", deliveryId)
    .maybeSingle();

  if (error) {
    throw new Error(`loadDeliveryWithTransaction(${deliveryId}) failed: ${error.message}`);
  }
  if (!data) return null;

  const { transaction, ...delivery } = data as unknown as Tables<"delivery"> & {
    transaction: Tables<"transaction"> | null;
  };
  if (!transaction) return null;

  return { delivery: delivery as Tables<"delivery">, transaction };
}

/** SCR012 shipment ledger, oldest first (seq order matches shipped_at order). */
export async function loadShipments(
  client: SupabaseClient<Database>,
  deliveryId: string,
): Promise<Tables<"delivery_shipment">[]> {
  const { data, error } = await client
    .from("delivery_shipment")
    .select("*")
    .eq("delivery_id", deliveryId)
    .order("seq", { ascending: true });

  if (error) {
    throw new Error(`loadShipments(${deliveryId}) failed: ${error.message}`);
  }
  return data ?? [];
}

/** F006 A4 / FR-DEL-04 -- every shipment across every delivery of one transaction
 * (in practice one delivery per transaction, but this stays transaction_id-keyed
 * to match the tech-spec's contract literally). */
export async function loadShipmentsByTransaction(
  client: SupabaseClient<Database>,
  transactionId: string,
): Promise<Tables<"delivery_shipment">[]> {
  const { data: deliveries, error: deliveryError } = await client
    .from("delivery")
    .select("id")
    .eq("transaction_id", transactionId);
  if (deliveryError) {
    throw new Error(`loadShipmentsByTransaction(${transactionId}): delivery lookup failed: ${deliveryError.message}`);
  }
  const deliveryIds = (deliveries ?? []).map((d) => d.id);
  if (deliveryIds.length === 0) return [];

  const { data, error } = await client
    .from("delivery_shipment")
    .select("*")
    .in("delivery_id", deliveryIds)
    .order("shipped_at", { ascending: true });
  if (error) {
    throw new Error(`loadShipmentsByTransaction(${transactionId}) failed: ${error.message}`);
  }
  return data ?? [];
}

export type DeliveryStatus = "chờ" | "đang giao" | "hoàn tất" | "ngoại lệ";

/** Read-only row count for one delivery status -- feeds the home pipeline dashboard. */
export async function countDeliveriesByStatus(
  client: SupabaseClient<Database>,
  status: DeliveryStatus,
): Promise<number> {
  const { count, error } = await client
    .from("delivery")
    .select("id", { count: "exact", head: true })
    .eq("status", status);
  if (error) {
    throw new Error(`countDeliveriesByStatus(${status}) failed: ${error.message}`);
  }
  return count ?? 0;
}
