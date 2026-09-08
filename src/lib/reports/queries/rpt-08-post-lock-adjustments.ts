import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/lib/db/types";
import type { ReportRow } from "../report-row";
import { loadApprovedAdjustmentsForDate, type ApprovedAdjustmentRow } from "@/lib/corrections/adjustment-queries";
import { loadLockStatus } from "@/lib/reconciliation/reconciliation-queries";

async function loadParticipantNames(client: SupabaseClient<Database>, ids: string[]): Promise<Map<string, string>> {
  const uniqueIds = Array.from(new Set(ids)).filter(Boolean);
  if (uniqueIds.length === 0) return new Map();
  const { data, error } = await client.from("participant").select("id, name").in("id", uniqueIds);
  if (error) throw new Error(`loadPostLockAdjustmentRows: participant lookup failed: ${error.message}`);
  return new Map((data ?? []).map((p) => [p.id, p.name]));
}

/**
 * Resolves `app_user.display_name` for a set of ids -- falls back to the
 * raw id, NEVER to `email` (phase-05 §Security Considerations: this
 * report's whole point is naming who requested/approved an adjustment, but
 * a CSV data row must never carry an email; only `filter-options.ts`'s
 * dropdown label may fall back to email, for a screen only a signed-in
 * operator sees).
 */
async function loadActorNames(client: SupabaseClient<Database>, ids: string[]): Promise<Map<string, string>> {
  const uniqueIds = Array.from(new Set(ids)).filter(Boolean);
  if (uniqueIds.length === 0) return new Map();
  const { data, error } = await client.from("app_user").select("id, display_name").in("id", uniqueIds);
  if (error) throw new Error(`loadPostLockAdjustmentRows: actor lookup failed: ${error.message}`);
  return new Map((data ?? []).map((u) => [u.id, u.display_name ?? u.id]));
}

function toRow(
  adj: ApprovedAdjustmentRow,
  participantById: Map<string, string>,
  actorById: Map<string, string>,
  dayLockedAt: string | null,
): ReportRow {
  const afterLock = dayLockedAt !== null && adj.createdAt > dayLockedAt;
  return {
    businessDate: adj.businessDate,
    txnCode: adj.txnCode,
    participant: participantById.get(adj.buyerParticipantId) ?? adj.buyerParticipantId,
    correctionId: adj.sourceCorrectionId,
    kind: adj.kind,
    qtyDelta: adj.qtyDelta,
    unitPriceDelta: adj.unitPriceDelta,
    amountDeltaJpy: adj.amountDeltaJpy,
    reason: adj.correctionReason ?? "",
    requestedBy: adj.correctionRequestedBy ? (actorById.get(adj.correctionRequestedBy) ?? adj.correctionRequestedBy) : "",
    approvedBy: adj.correctionApprovedBy ? (actorById.get(adj.correctionApprovedBy) ?? adj.correctionApprovedBy) : "",
    requestedAt: adj.correctionCreatedAt ?? "",
    adjustedAt: adj.createdAt,
    dayLockedAt: dayLockedAt ?? "",
    afterLock: afterLock ? "có" : "không",
  };
}

/**
 * RPT-08 "Log điều chỉnh sau khi lock" (phase-05 §Architecture) -- one row
 * per approved `transaction_adjustment` whose target transaction's
 * business_date is `businessDate`. Reuses `loadApprovedAdjustmentsForDate`
 * (phase-02) rather than re-joining -- see that function's own docstring
 * for why. `actorId`, when given, matches `approved_by`: FR-AUDIT-01's
 * "chủ thể thực hiện" is whoever made the adjustment take effect (the
 * approver), not whoever merely asked for it (phase-05 §Key Insights).
 */
export async function loadPostLockAdjustmentRows(
  client: SupabaseClient<Database>,
  businessDate: string,
  actorId: string | undefined,
): Promise<ReportRow[]> {
  const [adjustments, lockStatus] = await Promise.all([
    loadApprovedAdjustmentsForDate(client, businessDate),
    loadLockStatus(client, businessDate),
  ]);

  const filtered = actorId ? adjustments.filter((a) => a.correctionApprovedBy === actorId) : adjustments;

  const actorIds: string[] = [];
  for (const a of filtered) {
    if (a.correctionRequestedBy) actorIds.push(a.correctionRequestedBy);
    if (a.correctionApprovedBy) actorIds.push(a.correctionApprovedBy);
  }

  const [participantById, actorById] = await Promise.all([
    loadParticipantNames(
      client,
      filtered.map((a) => a.buyerParticipantId),
    ),
    loadActorNames(client, actorIds),
  ]);

  const rows = filtered.map((a) => toRow(a, participantById, actorById, lockStatus.lockedAt));
  rows.sort((a, b) => String(a.adjustedAt).localeCompare(String(b.adjustedAt)));
  return rows;
}
