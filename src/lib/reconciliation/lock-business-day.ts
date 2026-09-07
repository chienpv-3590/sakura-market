import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database, Tables, TablesInsert } from "@/lib/db/types";
import { writeAuditLog } from "@/lib/audit/write-audit-log";

export type LockBusinessDayResult =
  | { ok: true; lock: Tables<"business_day_lock"> }
  | { ok: false; reason: "ALREADY_LOCKED" };

/**
 * A2 (FR-401, FR-601, BR-001). The primary key on `business_date` is the
 * actual serialization point -- two concurrent lock requests for the same
 * day race a plain INSERT, and Postgres accepts exactly one; the loser gets
 * a 23505 unique-violation, translated here to ALREADY_LOCKED. There is
 * deliberately no unlock path anywhere in this codebase (FR-401: lock is
 * irreversible) -- do not add one, including for ROLE-SYS-ADMIN.
 */
export async function lockBusinessDay(
  client: SupabaseClient<Database>,
  businessDate: string,
  actorId: string,
): Promise<LockBusinessDayResult> {
  const insertRow: TablesInsert<"business_day_lock"> = {
    business_date: businessDate,
    locked_by: actorId,
  };

  const { data, error } = await client.from("business_day_lock").insert(insertRow).select().single();

  if (error) {
    if (error.code === "23505") {
      return { ok: false, reason: "ALREADY_LOCKED" };
    }
    throw new Error(`lockBusinessDay(${businessDate}) failed: ${error.message}`);
  }

  await writeAuditLog(client, {
    actorId,
    action: "lock_business_day",
    entity: "business_day_lock",
    entityId: businessDate,
    before: null,
    after: { locked_at: data.locked_at, locked_by: data.locked_by },
  });

  return { ok: true, lock: data };
}
