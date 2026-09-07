export type RuleVersionDisplayStatus = "pending_approval" | "active" | "rolled_back" | "superseded" | "scheduled";

interface VersionLike {
  id: string;
  status: string;
  effective_from: string;
}

/**
 * SM-001 §4.3 unresolved question, resolved for this prototype: `superseded`
 * is NOT a stored DB status -- ALG-001 always picks the `active` row with
 * the greatest `effective_from <= today`, so any OTHER `active` row is
 * superseded in effect. Computed at read time here so SCR017 can label it
 * without a background job that would only exist to flip a status by date.
 *
 * An `active` row whose `effective_from` is still in the future is labelled
 * `scheduled` -- approved, but not yet the version ALG-001 would pick.
 */
export function computeDisplayStatuses(versions: VersionLike[], today: string): Map<string, RuleVersionDisplayStatus> {
  const inForce = versions
    .filter((v) => v.status === "active" && v.effective_from <= today)
    .sort((a, b) => (a.effective_from < b.effective_from ? 1 : a.effective_from > b.effective_from ? -1 : 0))[0];

  const result = new Map<string, RuleVersionDisplayStatus>();
  for (const v of versions) {
    if (v.status !== "active") {
      // Safe cast: the DB CHECK constraint on incentive_rule_version.status
      // only ever allows 'pending_approval' | 'active' | 'rolled_back', and
      // 'active' was just excluded above.
      result.set(v.id, v.status as RuleVersionDisplayStatus);
      continue;
    }
    if (v.effective_from > today) {
      result.set(v.id, "scheduled");
    } else if (inForce && v.id === inForce.id) {
      result.set(v.id, "active");
    } else {
      result.set(v.id, "superseded");
    }
  }
  return result;
}
