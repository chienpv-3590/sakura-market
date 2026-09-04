import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database, Json, TablesInsert } from "@/lib/db/types";

export interface AuditLogEntry {
  actorId: string | null;
  action: string;
  entity: string;
  entityId: string;
  before?: Json | null;
  after?: Json | null;
  reason?: string | null;
}

/**
 * FR-AUDIT-01 shared primitive (spec/sharedfoundation/technical-spec.md
 * § 3.1 A1). Every feature that performs a create/update/approve/lock/
 * permission-change calls this after (or as part of) its own write.
 *
 * Whether `reason` is mandatory for a given action is the calling feature's
 * own decision -- including rolling back its main write when a mandatory
 * reason is missing. This helper only inserts the row and surfaces failures
 * loudly; it does not encode that per-action policy itself.
 *
 * `client` must actually be allowed to insert as the current caller --
 * `audit_log`'s RLS policy ("insert_any_active_user") requires an active
 * `app_user` row for the session. Pre-session or inactive-account writes
 * (see the sign-in flow in `app/api/auth/sign-in/route.ts`) must pass the
 * admin client instead of the request's own server client.
 */
export async function writeAuditLog(
  client: SupabaseClient<Database>,
  entry: AuditLogEntry,
): Promise<void> {
  const row: TablesInsert<"audit_log"> = {
    actor_id: entry.actorId,
    action: entry.action,
    entity: entry.entity,
    entity_id: entry.entityId,
    before: entry.before ?? null,
    after: entry.after ?? null,
    reason: entry.reason ?? null,
  };

  const { error } = await client.from("audit_log").insert(row);

  if (error) {
    throw new Error(
      `writeAuditLog failed: action="${entry.action}" entity=${entry.entity}/${entry.entityId}: ${error.message}`,
    );
  }
}
