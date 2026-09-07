import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database, TablesInsert } from "@/lib/db/types";
import { writeAuditLog } from "@/lib/audit/write-audit-log";
import { todayJst } from "@/lib/db/business-date";
import { calculateIncentive } from "./calculate-incentive";

export type RunIncentiveDeltaSkipReason = "TXN_NOT_FOUND" | "NO_ORIGIN_RESULT" | "NO_PAYMENT_RECORD";
export type RunIncentiveDeltaResult =
  | { skipped: false; incentiveResultId: string; amountJpy: number }
  | { skipped: true; reason: RunIncentiveDeltaSkipReason };

export interface RunIncentiveDeltaParams {
  correctionId: string;
  targetTxnId: string;
  amountDelta: number;
}

/**
 * FR-401 (ALG-002). Called by the corrections approve route right after
 * F008's `approveCorrection()` has already inserted the `transaction_adjustment`
 * row -- this function never touches `correction_request` or
 * `transaction_adjustment` itself, only appends one `incentive_result` row.
 *
 * The single detail every reviewer gets wrong (phase-09 Risk Assessment):
 * this reads the ORIGIN period's own `incentive_result(kind='normal')` row
 * to learn which `rule_version_id` and eligible baseline applied there --
 * it deliberately does NOT call `resolveRuleVersion()` again, because the
 * rule in force today may differ from the one used when the origin period
 * was actually calculated. Using today's rule would let a rate change bleed
 * into a prior period's delta.
 *
 * `adminClient` MUST be the service-role client (same RLS reason as
 * run-incentive-for-period.ts).
 */
export async function runIncentiveDelta(
  adminClient: SupabaseClient<Database>,
  params: RunIncentiveDeltaParams,
): Promise<RunIncentiveDeltaResult> {
  const { data: txn, error: txnError } = await adminClient
    .from("transaction")
    .select("business_date, buyer_participant_id")
    .eq("id", params.targetTxnId)
    .maybeSingle();
  if (txnError) {
    throw new Error(`runIncentiveDelta(${params.correctionId}): transaction lookup failed: ${txnError.message}`);
  }
  if (!txn) return { skipped: true, reason: "TXN_NOT_FOUND" };

  const originPeriod = txn.business_date;
  const participantId = txn.buyer_participant_id;

  const { data: originResult, error: originError } = await adminClient
    .from("incentive_result")
    .select("rule_version_id")
    .eq("participant_id", participantId)
    .eq("period", originPeriod)
    .eq("kind", "normal")
    .maybeSingle();
  if (originError) {
    throw new Error(`runIncentiveDelta(${params.correctionId}): origin result lookup failed: ${originError.message}`);
  }
  if (!originResult) {
    // No prior incentive_result for this participant/period means A5 never
    // ran (or produced nothing) for the origin period -- nothing to amend.
    await writeAuditLog(adminClient, {
      actorId: null,
      action: "incentive_delta_skipped_no_origin",
      entity: "incentive_result",
      entityId: params.correctionId,
      before: null,
      after: null,
      reason: `no incentive_result(kind=normal) for participant=${participantId} period=${originPeriod}`,
    });
    return { skipped: true, reason: "NO_ORIGIN_RESULT" };
  }

  const { data: payment, error: paymentError } = await adminClient
    .from("payment_record")
    .select("eligible_amount_jpy, paid_on_time")
    .eq("participant_id", participantId)
    .eq("business_date", originPeriod)
    .maybeSingle();
  if (paymentError) {
    throw new Error(`runIncentiveDelta(${params.correctionId}): payment_record lookup failed: ${paymentError.message}`);
  }
  if (!payment) {
    await writeAuditLog(adminClient, {
      actorId: null,
      action: "incentive_delta_skipped_no_payment_record",
      entity: "incentive_result",
      entityId: params.correctionId,
      before: null,
      after: null,
      reason: `no payment_record for participant=${participantId} business_date=${originPeriod}`,
    });
    return { skipped: true, reason: "NO_PAYMENT_RECORD" };
  }

  const paidOnTime = payment.paid_on_time === true;
  const eligibleOld = payment.eligible_amount_jpy;
  // Eligible amount can only ever be >= 0 (payment_record's own CHECK
  // constraint) -- a `reverse` adjustment can drive the recomputed eligible
  // amount negative if it was the only transaction behind that baseline;
  // floor it at 0 rather than let a negative "eligible amount" leak into
  // ALG-002.
  const eligibleNew = Math.max(0, eligibleOld + params.amountDelta);
  const amountOld = calculateIncentive(eligibleOld, paidOnTime);
  const amountNew = calculateIncentive(eligibleNew, paidOnTime);

  const period = todayJst();
  const insertRow: TablesInsert<"incentive_result"> = {
    participant_id: participantId,
    period,
    amount_jpy: amountNew - amountOld,
    rule_version_id: originResult.rule_version_id,
    kind: "delta",
    origin_period: originPeriod,
    source_correction_id: params.correctionId,
  };
  const { data: inserted, error: insertError } = await adminClient
    .from("incentive_result")
    .insert(insertRow)
    .select("id, amount_jpy")
    .single();
  if (insertError || !inserted) {
    throw new Error(`runIncentiveDelta(${params.correctionId}): incentive_result insert failed: ${insertError?.message}`);
  }

  return { skipped: false, incentiveResultId: inserted.id, amountJpy: inserted.amount_jpy };
}
