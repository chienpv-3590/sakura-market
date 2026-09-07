import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database, Tables } from "@/lib/db/types";
import { writeAuditLog } from "@/lib/audit/write-audit-log";

export type ApproveRuleVersionReason = "NOT_FOUND" | "SELF_APPROVAL" | "ALREADY_DECIDED";
export type ApproveRuleVersionResult =
  | { ok: true; ruleVersion: Tables<"incentive_rule_version"> }
  | { ok: false; reason: ApproveRuleVersionReason };

/**
 * A2 (FR-202, BR-003, DEC-001, SM-001, GOV-RULE-01). Mirrors F008's
 * approveCorrection() CAS-first ordering (QĐ-5): the
 * status='pending_approval'->'active' UPDATE is both the serialization point
 * and the double-approve guard, matching the same 403 SELF_APPROVAL
 * precedent F008 established for its own maker-checker gate.
 */
export async function approveRuleVersion(
  client: SupabaseClient<Database>,
  input: { ruleVersionId: string; actorId: string },
): Promise<ApproveRuleVersionResult> {
  const { data: version, error: readError } = await client
    .from("incentive_rule_version")
    .select("id, status, created_by")
    .eq("id", input.ruleVersionId)
    .maybeSingle();
  if (readError) {
    throw new Error(`approveRuleVersion(${input.ruleVersionId}): lookup failed: ${readError.message}`);
  }
  if (!version) return { ok: false, reason: "NOT_FOUND" };
  if (version.created_by !== null && version.created_by === input.actorId) {
    return { ok: false, reason: "SELF_APPROVAL" };
  }
  if (version.status !== "pending_approval") return { ok: false, reason: "ALREADY_DECIDED" };

  const { data: updated, error: casError } = await client
    .from("incentive_rule_version")
    .update({ status: "active", approved_by: input.actorId })
    .eq("id", input.ruleVersionId)
    .eq("status", "pending_approval")
    .select()
    .maybeSingle();
  if (casError) {
    throw new Error(`approveRuleVersion(${input.ruleVersionId}): CAS update failed: ${casError.message}`);
  }
  if (!updated) return { ok: false, reason: "ALREADY_DECIDED" };

  await writeAuditLog(client, {
    actorId: input.actorId,
    action: "approve_rule_version",
    entity: "incentive_rule_version",
    entityId: input.ruleVersionId,
    before: { status: "pending_approval" },
    after: { status: "active", approved_by: input.actorId },
  });

  return { ok: true, ruleVersion: updated };
}
