import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database, TablesInsert } from "@/lib/db/types";
import { writeAuditLog } from "@/lib/audit/write-audit-log";
import { resolveRuleVersion } from "./resolve-rule-version";
import { calculateIncentive } from "./calculate-incentive";

export interface RunIncentiveForPeriodResult {
  skipped: boolean;
  ruleVersionId: string | null;
  insertedCount: number;
}

/**
 * A5 (ALG-001, ALG-002, FR-001, FR-301, FR-302) -- runs synchronously inside
 * the F007 lock route right after `business_day_lock` is inserted (QĐ-5: no
 * queue exists on this stack, so the spec's "background job" trigger becomes
 * a direct call; recorded as an intentional deviation for LAB-4's ADR). The
 * caller must swallow any error from this function itself -- locking the day
 * is the primary action and must succeed even if the engine fails (phase-09
 * Risk Assessment).
 *
 * `adminClient` MUST be the service-role client. `incentive_result` has
 * deliberately no authenticated write policy (20260904091000_rls_ops.sql) --
 * it is written via service_role or not at all.
 *
 * `payment_record` is the MOCK table (see 20260904090700_incentive.sql) that
 * stands in for a real payment ledger integration -- it already carries
 * `eligible_amount_jpy` and the generated `paid_on_time` column per
 * participant/business_date, so one row there is one participant "eligible"
 * for this period.
 */
export async function runIncentiveForPeriod(
  adminClient: SupabaseClient<Database>,
  period: string,
  triggeredBy: string | null,
): Promise<RunIncentiveForPeriodResult> {
  const rule = await resolveRuleVersion(adminClient, period);
  if (!rule) {
    // Edge case (functional-spec §9, technical-spec §3.3): no active version
    // covers this period -- stop, do not guess, leave an operational trace.
    await writeAuditLog(adminClient, {
      actorId: triggeredBy,
      action: "incentive_skipped_no_rule",
      entity: "incentive_result",
      entityId: period,
      before: null,
      after: null,
      reason: `no active incentive_rule_version with effective_from <= ${period}`,
    });
    return { skipped: true, ruleVersionId: null, insertedCount: 0 };
  }

  const { data: payments, error: paymentError } = await adminClient
    .from("payment_record")
    .select("participant_id, eligible_amount_jpy, paid_on_time")
    .eq("business_date", period);
  if (paymentError) {
    throw new Error(`runIncentiveForPeriod(${period}): payment_record lookup failed: ${paymentError.message}`);
  }

  const rows: TablesInsert<"incentive_result">[] = (payments ?? []).map((payment) => ({
    participant_id: payment.participant_id,
    period,
    amount_jpy: calculateIncentive(payment.eligible_amount_jpy, payment.paid_on_time === true),
    rule_version_id: rule.id,
    kind: "normal",
  }));

  if (rows.length === 0) {
    return { skipped: false, ruleVersionId: rule.id, insertedCount: 0 };
  }

  const { error: insertError } = await adminClient.from("incentive_result").insert(rows);
  if (insertError) {
    throw new Error(`runIncentiveForPeriod(${period}): incentive_result insert failed: ${insertError.message}`);
  }

  return { skipped: false, ruleVersionId: rule.id, insertedCount: rows.length };
}
