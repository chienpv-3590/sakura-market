import { NextResponse } from "next/server";
import type { SupabaseClient } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/server";
import { requireRole } from "@/lib/auth/require-role";
import { writeAuditLog } from "@/lib/audit/write-audit-log";
import type { Database, TablesInsert } from "@/lib/db/types";
import { isParticipantStatus, isTransitionEvent, resolveTarget } from "@/lib/participants/state-machine";
import { toAuditSnapshot } from "@/lib/participants/audit-json";

/**
 * A3 · SM-001 · US003. `(from, event)` must resolve to a real SM-001 edge
 * (state-machine.ts is the single source of truth the UI buttons share) --
 * anything else is a 422, never a guessed target. `reason` is mandatory.
 * Writes participant.status + participant_status_history + audit_log
 * sequentially (see phase-05 Data Flow "BEGIN...COMMIT"); true multi-
 * statement atomicity would need a Postgres RPC, which is out of scope here
 * since supabase/migrations/** is off-limits for this task.
 */
export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
): Promise<NextResponse> {
  const user = await requireRole(["ROLE-SYS-ADMIN"]);
  const { id } = await params;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }
  const input = body as { event?: unknown; reason?: unknown } | null;
  const event = typeof input?.event === "string" ? input.event : "";
  const reason = typeof input?.reason === "string" ? input.reason.trim() : "";

  if (!isTransitionEvent(event)) {
    return NextResponse.json({ error: "invalid_event" }, { status: 422 });
  }
  if (reason.length === 0) {
    return NextResponse.json({ error: "reason_required" }, { status: 422 });
  }

  try {
    const supabase: SupabaseClient<Database> = await createClient();
    const { data: participant, error: lookupError } = await supabase
      .from("participant")
      .select("status")
      .eq("id", id)
      .maybeSingle();
    if (lookupError) {
      throw new Error(`transition ${id}: lookup failed: ${lookupError.message}`);
    }
    if (!participant || !isParticipantStatus(participant.status)) {
      return NextResponse.json({ error: "not_found" }, { status: 404 });
    }

    const from = participant.status;
    const to = resolveTarget(from, event);
    if (to === null) {
      return NextResponse.json({ error: "illegal_transition", from, event }, { status: 422 });
    }

    const { error: updateError } = await supabase
      .from("participant")
      .update({ status: to })
      .eq("id", id);
    if (updateError) {
      throw new Error(`transition ${id}: status update failed: ${updateError.message}`);
    }

    const historyRow: TablesInsert<"participant_status_history"> = {
      participant_id: id,
      from_status: from,
      to_status: to,
      reason,
      changed_by: user.id,
    };
    const { error: historyError } = await supabase
      .from("participant_status_history")
      .insert(historyRow);
    if (historyError) {
      throw new Error(`transition ${id}: history insert failed: ${historyError.message}`);
    }

    await writeAuditLog(supabase, {
      actorId: user.id,
      action: "status_change",
      entity: "participant",
      entityId: id,
      before: toAuditSnapshot({ status: from }),
      after: toAuditSnapshot({ status: to }),
      reason,
    });

    return NextResponse.json({ status: to });
  } catch (err) {
    console.error(`[api/participants/${id}/transition] POST failed`, err);
    return NextResponse.json({ error: "internal_error" }, { status: 500 });
  }
}
