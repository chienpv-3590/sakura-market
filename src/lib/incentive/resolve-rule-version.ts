import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database, Tables } from "@/lib/db/types";

/**
 * ALG-001 (FR-001). Among `status='active'` rows, picks the one with the
 * greatest `effective_from` that is still `<= period` -- the version "in
 * force" for that period. Never considers `pending_approval` rows, and
 * never falls back to a future-dated version. No match -> null, and the
 * caller (run-incentive-for-period.ts) must stop rather than guess.
 *
 * `read_all_active_users` RLS lets any active session read this table, but
 * callers here are expected to pass the admin client -- see
 * run-incentive-for-period.ts for why the write-side of that flow needs it.
 */
export async function resolveRuleVersion(
  client: SupabaseClient<Database>,
  period: string,
): Promise<Tables<"incentive_rule_version"> | null> {
  const { data, error } = await client
    .from("incentive_rule_version")
    .select("*")
    .eq("status", "active")
    .lte("effective_from", period)
    .order("effective_from", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) {
    throw new Error(`resolveRuleVersion(${period}) failed: ${error.message}`);
  }
  return data;
}
