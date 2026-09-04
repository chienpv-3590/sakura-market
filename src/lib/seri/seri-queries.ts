import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database, Tables } from "@/lib/db/types";

export type SeriAuditRow = Pick<
  Tables<"audit_log">,
  "id" | "action" | "before" | "after" | "reason" | "actor_id" | "created_at"
>;

export interface SeriSearchFilters {
  businessDate?: string;
  lotCode?: string;
  winnerName?: string;
}

/** Single seri_result row by id, or null when it doesn't exist. */
export async function loadSeriResult(
  client: SupabaseClient<Database>,
  id: string,
): Promise<Tables<"seri_result"> | null> {
  const { data, error } = await client.from("seri_result").select("*").eq("id", id).maybeSingle();
  if (error) {
    throw new Error(`loadSeriResult(${id}) failed: ${error.message}`);
  }
  return data;
}

/** SCR010 edit history -- audit_log rows for this seri_result, newest first. */
export async function loadSeriAuditHistory(
  client: SupabaseClient<Database>,
  id: string,
): Promise<SeriAuditRow[]> {
  const { data, error } = await client
    .from("audit_log")
    .select("id, action, before, after, reason, actor_id, created_at")
    .eq("entity", "seri_result")
    .eq("entity_id", id)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(`loadSeriAuditHistory(${id}) failed: ${error.message}`);
  }
  return data ?? [];
}

/**
 * A1's duplicate guard (technical-spec.md §5.2 Assumptions: at most 1 active
 * seri_result per lot in LAB-3 -- an app-level rule, not a DB unique
 * constraint, so this is the single place that enforces it).
 */
export async function findSeriResultByLot(
  client: SupabaseClient<Database>,
  lotId: string,
): Promise<Tables<"seri_result"> | null> {
  const { data, error } = await client.from("seri_result").select("*").eq("lot_id", lotId).maybeSingle();
  if (error) {
    throw new Error(`findSeriResultByLot(${lotId}) failed: ${error.message}`);
  }
  return data;
}

/**
 * SCR010 lookup (FR-SERI-03: "tra cứu theo mã lô hàng / ngày nghiệp vụ /
 * người thắng"). lotCode/winnerName resolve to ids first since seri_result
 * itself only stores foreign keys, not denormalized names/codes.
 */
export async function searchSeriResults(
  client: SupabaseClient<Database>,
  filters: SeriSearchFilters,
): Promise<Tables<"seri_result">[]> {
  let query = client.from("seri_result").select("*").order("created_at", { ascending: false }).limit(100);

  if (filters.businessDate) {
    query = query.eq("business_date", filters.businessDate);
  }
  if (filters.lotCode) {
    const { data: lot, error: lotError } = await client
      .from("lot")
      .select("id")
      .eq("lot_code", filters.lotCode)
      .maybeSingle();
    if (lotError) throw new Error(`searchSeriResults: lot lookup failed: ${lotError.message}`);
    if (!lot) return [];
    query = query.eq("lot_id", lot.id);
  }
  if (filters.winnerName) {
    const { data: winners, error: winnerError } = await client
      .from("participant")
      .select("id")
      .ilike("name", `%${filters.winnerName}%`);
    if (winnerError) throw new Error(`searchSeriResults: winner lookup failed: ${winnerError.message}`);
    const ids = (winners ?? []).map((w) => w.id);
    if (ids.length === 0) return [];
    query = query.in("winner_participant_id", ids);
  }

  const { data, error } = await query;
  if (error) throw new Error(`searchSeriResults failed: ${error.message}`);
  return data ?? [];
}
