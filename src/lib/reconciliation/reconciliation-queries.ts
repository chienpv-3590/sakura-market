import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database, Tables } from "@/lib/db/types";

export type LockStatus = { locked: boolean; lockedAt: string | null; lockedBy: string | null };

/** A1 (FR-001, FR-201) -- reads straight from the `reconciliation_line` view
 * (Phase 03), never a physical copy of transaction/seri_result/delivery data. */
export async function loadReconciliationLines(
  client: SupabaseClient<Database>,
  businessDate: string,
): Promise<Tables<"reconciliation_line">[]> {
  const { data, error } = await client
    .from("reconciliation_line")
    .select("*")
    .eq("business_date", businessDate)
    .order("source_type", { ascending: true });

  if (error) {
    throw new Error(`loadReconciliationLines(${businessDate}) failed: ${error.message}`);
  }
  return data ?? [];
}

/** A1/A2 -- whether `business_date` already has a `business_day_lock` row. */
export async function loadLockStatus(
  client: SupabaseClient<Database>,
  businessDate: string,
): Promise<LockStatus> {
  const { data, error } = await client
    .from("business_day_lock")
    .select("locked_at, locked_by")
    .eq("business_date", businessDate)
    .maybeSingle();

  if (error) {
    throw new Error(`loadLockStatus(${businessDate}) failed: ${error.message}`);
  }
  if (!data) return { locked: false, lockedAt: null, lockedBy: null };
  return { locked: true, lockedAt: data.locked_at, lockedBy: data.locked_by };
}
