import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database, Tables } from "@/lib/db/types";

export type LotAuditRow = Pick<
  Tables<"audit_log">,
  "id" | "action" | "before" | "after" | "reason" | "actor_id" | "created_at"
>;

/** Single lot row by id, or null when it doesn't exist (RLS-filtered too). */
export async function loadLot(
  client: SupabaseClient<Database>,
  id: string,
): Promise<Tables<"lot"> | null> {
  const { data, error } = await client.from("lot").select("*").eq("id", id).maybeSingle();
  if (error) {
    throw new Error(`loadLot(${id}) failed: ${error.message}`);
  }
  return data;
}

/** REG-AVAILABILITY history -- audit_log rows for this lot, newest first. */
export async function loadLotAuditHistory(
  client: SupabaseClient<Database>,
  id: string,
): Promise<LotAuditRow[]> {
  const { data, error } = await client
    .from("audit_log")
    .select("id, action, before, after, reason, actor_id, created_at")
    .eq("entity", "lot")
    .eq("entity_id", id)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(`loadLotAuditHistory(${id}) failed: ${error.message}`);
  }
  return data ?? [];
}

/**
 * True when `businessDate` already has a business_day_lock row (F007 lock).
 * Reads the table directly rather than calling private.is_business_day_locked
 * -- that function lives in the `private` Postgres schema, which PostgREST
 * does not expose to .rpc(), by design (RLS/trigger-internal only).
 */
export async function isBusinessDateLocked(
  client: SupabaseClient<Database>,
  businessDate: string,
): Promise<boolean> {
  const { data, error } = await client
    .from("business_day_lock")
    .select("business_date")
    .eq("business_date", businessDate)
    .maybeSingle();

  if (error) {
    throw new Error(`isBusinessDateLocked(${businessDate}) failed: ${error.message}`);
  }
  return data !== null;
}
