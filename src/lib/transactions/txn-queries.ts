import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database, Tables } from "@/lib/db/types";

export type TransactionAuditRow = Pick<
  Tables<"audit_log">,
  "id" | "action" | "before" | "after" | "reason" | "actor_id" | "created_at"
>;

/** Single transaction row by id, or null when it doesn't exist (RLS-filtered too). */
export async function loadTransaction(
  client: SupabaseClient<Database>,
  id: string,
): Promise<Tables<"transaction"> | null> {
  const { data, error } = await client.from("transaction").select("*").eq("id", id).maybeSingle();
  if (error) {
    throw new Error(`loadTransaction(${id}) failed: ${error.message}`);
  }
  return data;
}

/** SCR008 detail history -- audit_log rows for this transaction, newest first. */
export async function loadTransactionAuditHistory(
  client: SupabaseClient<Database>,
  id: string,
): Promise<TransactionAuditRow[]> {
  const { data, error } = await client
    .from("audit_log")
    .select("id, action, before, after, reason, actor_id, created_at")
    .eq("entity", "transaction")
    .eq("entity_id", id)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(`loadTransactionAuditHistory(${id}) failed: ${error.message}`);
  }
  return data ?? [];
}
