import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database, Json, Tables, TablesInsert } from "@/lib/db/types";
import { todayJst } from "@/lib/db/business-date";

export type CreateRuleVersionReason = "INVALID_EFFECTIVE_DATE" | "VERSION_CONFLICT";
export type CreateRuleVersionResult =
  | { ok: true; ruleVersion: Tables<"incentive_rule_version"> }
  | { ok: false; reason: CreateRuleVersionReason };

const DATE_FORMAT = /^\d{4}-\d{2}-\d{2}$/;

/** FR-201: effective_from must be a real calendar date strictly AFTER today (JST). */
function isFutureBusinessDate(value: string): boolean {
  if (!DATE_FORMAT.test(value)) return false;
  const [y, m, d] = value.split("-").map(Number);
  const parsed = new Date(Date.UTC(y, m - 1, d));
  if (parsed.getUTCFullYear() !== y || parsed.getUTCMonth() !== m - 1 || parsed.getUTCDate() !== d) {
    return false;
  }
  return value > todayJst();
}

/**
 * A1 (FR-201, FR-203). The 110/100 rate is fixed by BR-INC-01 and is NOT
 * user-configurable (technical-spec §4.6) -- `rate_table` here is display/
 * audit metadata only, never read by calculate-incentive.ts.
 *
 * `version_no` is "tự sinh tuần tự" (auto-generated, sequential) per the
 * functional spec -- read the current max and increment. The unique index
 * on `version_no` (20260904090700_incentive.sql) is the real guard against a
 * race; a 23505 here just means "retry", surfaced as VERSION_CONFLICT rather
 * than a raw 500.
 */
export async function createRuleVersion(
  client: SupabaseClient<Database>,
  input: { effectiveFrom: string; note: string | null; actorId: string },
): Promise<CreateRuleVersionResult> {
  if (!isFutureBusinessDate(input.effectiveFrom)) {
    return { ok: false, reason: "INVALID_EFFECTIVE_DATE" };
  }

  const { data: latest, error: latestError } = await client
    .from("incentive_rule_version")
    .select("version_no")
    .order("version_no", { ascending: false })
    .limit(1)
    .maybeSingle();
  if (latestError) {
    throw new Error(`createRuleVersion: version_no lookup failed: ${latestError.message}`);
  }
  const nextVersionNo = (latest?.version_no ?? 0) + 1;

  const rateTable: Json = { numerator: 110, denominator: 100, note: input.note };
  const insertRow: TablesInsert<"incentive_rule_version"> = {
    version_no: nextVersionNo,
    effective_from: input.effectiveFrom,
    status: "pending_approval",
    rate_table: rateTable,
    created_by: input.actorId,
  };

  const { data: ruleVersion, error: insertError } = await client
    .from("incentive_rule_version")
    .insert(insertRow)
    .select()
    .single();
  if (insertError || !ruleVersion) {
    if (insertError?.code === "23505") return { ok: false, reason: "VERSION_CONFLICT" };
    throw new Error(`createRuleVersion: insert failed: ${insertError?.message}`);
  }

  return { ok: true, ruleVersion };
}
