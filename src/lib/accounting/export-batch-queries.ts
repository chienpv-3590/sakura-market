import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database, Tables } from "@/lib/db/types";

/** Single batch by its unique batch_code -- e.g. re-loading `ACC-20260902-01`'s own snapshot. */
export async function loadBatchByCode(
  client: SupabaseClient<Database>,
  batchCode: string,
): Promise<Tables<"accounting_export_batch"> | null> {
  const { data, error } = await client
    .from("accounting_export_batch")
    .select("*")
    .eq("batch_code", batchCode)
    .maybeSingle();
  if (error) {
    throw new Error(`loadBatchByCode(${batchCode}) failed: ${error.message}`);
  }
  return data;
}

/** Every batch ever exported for one business_date, oldest (seq=1) first. */
export async function listBatchesForDate(
  client: SupabaseClient<Database>,
  businessDate: string,
): Promise<Tables<"accounting_export_batch">[]> {
  const { data, error } = await client
    .from("accounting_export_batch")
    .select("*")
    .eq("business_date", businessDate)
    .order("seq", { ascending: true });
  if (error) {
    throw new Error(`listBatchesForDate(${businessDate}) failed: ${error.message}`);
  }
  return data ?? [];
}
