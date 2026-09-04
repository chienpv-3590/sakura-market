import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/lib/db/types";

// txn_code format mirrors lot_code (lots/lot-code.ts): TXN-YYYYMMDD-NNN,
// NNN = count of transactions already created for that JST business day + 1,
// zero-padded to 3 digits. UNIQUE(txn_code) is the DB's own backstop if two
// trade clerks race the same count -- the route handler retries once on a
// 23505 unique-violation (app/api/transactions/route.ts).
export function formatTxnCode(businessDate: string, seq: number): string {
  const compact = businessDate.replaceAll("-", "");
  return `TXN-${compact}-${String(seq).padStart(3, "0")}`;
}

/** Next 1-based sequence number for transactions already created on businessDate. */
export async function nextTxnSeq(
  client: SupabaseClient<Database>,
  businessDate: string,
): Promise<number> {
  const { count, error } = await client
    .from("transaction")
    .select("id", { count: "exact", head: true })
    .eq("business_date", businessDate);

  if (error) {
    throw new Error(`nextTxnSeq(${businessDate}) failed: ${error.message}`);
  }
  return (count ?? 0) + 1;
}
