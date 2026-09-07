import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database, Tables } from "@/lib/db/types";
import { writeAuditLog } from "@/lib/audit/write-audit-log";

export type RollbackRuleVersionReason = "NOT_FOUND" | "SELF_ROLLBACK" | "NOT_ACTIVE" | "INVALID_TARGET";
export type RollbackRuleVersionResult =
  | { ok: true; demoted: Tables<"incentive_rule_version">; promoted: Tables<"incentive_rule_version"> }
  | { ok: false; reason: RollbackRuleVersionReason };

/**
 * A3 (FR-204, SM-001, GOV-RULE-01). `activeVersionId` is demoted to
 * 'rolled_back'; `targetVersionId` is promoted to 'active'. Never deletes a
 * row -- FR-204's whole point is that a rolled-back version stays traceable.
 *
 * Design decision (spec is ambiguous here, resolved and documented rather
 * than guessed at twice -- gate A0 says rollback needs "người phê duyệt...
 * khác người tạo" without saying created_by of WHICH version): this applies
 * the maker-checker check to `activeVersionId` (the version being demoted),
 * the same row A2's created_by check would have covered had this version's
 * own approval been undone instead. This stops the one person who drafted a
 * version from also being the one who un-does it.
 *
 * Also blocks promoting a `pending_approval` row straight to 'active' via
 * rollback -- that would let a never-approved draft skip A2's maker-checker
 * gate entirely (the actual security hole this function must not open).
 */
export async function rollbackRuleVersion(
  client: SupabaseClient<Database>,
  input: { activeVersionId: string; targetVersionId: string; actorId: string },
): Promise<RollbackRuleVersionResult> {
  if (input.activeVersionId === input.targetVersionId) {
    return { ok: false, reason: "INVALID_TARGET" };
  }

  const { data: active, error: activeError } = await client
    .from("incentive_rule_version")
    .select("id, status, created_by")
    .eq("id", input.activeVersionId)
    .maybeSingle();
  if (activeError) {
    throw new Error(`rollbackRuleVersion(${input.activeVersionId}): active lookup failed: ${activeError.message}`);
  }
  if (!active) return { ok: false, reason: "NOT_FOUND" };
  if (active.created_by !== null && active.created_by === input.actorId) {
    return { ok: false, reason: "SELF_ROLLBACK" };
  }
  if (active.status !== "active") return { ok: false, reason: "NOT_ACTIVE" };

  const { data: target, error: targetError } = await client
    .from("incentive_rule_version")
    .select("id, status")
    .eq("id", input.targetVersionId)
    .maybeSingle();
  if (targetError) {
    throw new Error(`rollbackRuleVersion(${input.targetVersionId}): target lookup failed: ${targetError.message}`);
  }
  if (!target) return { ok: false, reason: "NOT_FOUND" };
  if (target.status === "pending_approval") return { ok: false, reason: "INVALID_TARGET" };

  const { data: demoted, error: demoteError } = await client
    .from("incentive_rule_version")
    .update({ status: "rolled_back" })
    .eq("id", input.activeVersionId)
    .eq("status", "active")
    .select()
    .maybeSingle();
  if (demoteError) {
    throw new Error(`rollbackRuleVersion(${input.activeVersionId}): demote CAS failed: ${demoteError.message}`);
  }
  if (!demoted) return { ok: false, reason: "NOT_ACTIVE" };

  const { data: promoted, error: promoteError } = await client
    .from("incentive_rule_version")
    .update({ status: "active" })
    .eq("id", input.targetVersionId)
    .select()
    .maybeSingle();
  if (promoteError || !promoted) {
    // Compensate: undo the demote rather than leave no version active.
    await client.from("incentive_rule_version").update({ status: "active" }).eq("id", input.activeVersionId).eq("status", "rolled_back");
    throw new Error(`rollbackRuleVersion(${input.targetVersionId}): promote failed: ${promoteError?.message}`);
  }

  await writeAuditLog(client, {
    actorId: input.actorId,
    action: "rollback_rule_version",
    entity: "incentive_rule_version",
    entityId: input.activeVersionId,
    before: { active: input.activeVersionId },
    after: { active: input.targetVersionId },
  });

  return { ok: true, demoted, promoted };
}
