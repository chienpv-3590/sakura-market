import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { writeAuditLog } from "@/lib/audit/write-audit-log";

/**
 * F007 A0 / FR-402 shared responder. `trg_block_after_lock` (Phase 03) is the
 * actual enforcement -- this only turns the P0001 it raises into a clean
 * HTTP 423 and records the attempt.
 *
 * Every caller (transaction/seri_result/mekiki_record/delivery_shipment
 * write paths) already translated the raw Postgres error into its own
 * domain-specific "LOCKED_BUSINESS_DATE" result BEFORE reaching this
 * function -- this is the single place that turns that result into the
 * response + audit row, so the pattern phase-07 built ad-hoc for
 * transactions/cancel doesn't get re-invented per table.
 *
 * Writes the audit row with a FRESH client (a new createClient() call, not
 * whatever client attempted the blocked write) -- the write that hit P0001
 * was already rolled back by Postgres, and Postgres has no autonomous
 * transaction to let an INSERT survive alongside it; issuing the audit
 * INSERT as its own separate statement on its own client keeps this
 * unambiguous rather than relying on reuse of a client instance that just
 * saw a failed request (F007 Unresolved Questions §5.3).
 */
export async function respondLockedWrite(context: {
  actorId: string;
  entity: string;
  entityId: string;
  reason?: string | null;
}): Promise<NextResponse> {
  const freshClient = await createClient();
  await writeAuditLog(freshClient, {
    actorId: context.actorId,
    action: "locked_write_attempt",
    entity: context.entity,
    entityId: context.entityId,
    before: null,
    after: null,
    reason: context.reason ?? null,
  });
  return NextResponse.json({ reason: "LOCKED_BUSINESS_DATE" }, { status: 423 });
}
