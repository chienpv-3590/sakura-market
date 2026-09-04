import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/lib/db/types";

// lot_code format is a working assumption -- RFP hasn't ratified the real
// Sakura market convention yet (lotintakeandmekiki/technical-spec.md § 5.3).
// LOT-YYYYMMDD-NNN, NNN = count of lots already created for that JST
// business day + 1, zero-padded to 3 digits. UNIQUE(lot_code) is the DB's
// own backstop if two intake clerks race the same count -- the route
// handler retries once on a 23505 unique-violation (app/api/lots/route.ts).
export function formatLotCode(businessDate: string, seq: number): string {
  const compact = businessDate.replaceAll("-", "");
  return `LOT-${compact}-${String(seq).padStart(3, "0")}`;
}

/** Next 1-based sequence number for lots already created on businessDate. */
export async function nextLotSeq(
  client: SupabaseClient<Database>,
  businessDate: string,
): Promise<number> {
  const { count, error } = await client
    .from("lot")
    .select("id", { count: "exact", head: true })
    .eq("business_date", businessDate);

  if (error) {
    throw new Error(`nextLotSeq(${businessDate}) failed: ${error.message}`);
  }
  return (count ?? 0) + 1;
}
