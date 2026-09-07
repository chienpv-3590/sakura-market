import { NextResponse } from "next/server";
import type { SupabaseClient } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import type { Database } from "@/lib/db/types";
import { requireRole } from "@/lib/auth/require-role";
import { approveCorrection } from "@/lib/corrections/approve-correction";
import type { ApproveCorrectionReason, Decision } from "@/lib/corrections/approve-correction";
import type { AdjustmentKind } from "@/lib/corrections/build-adjustment";
import { runIncentiveDelta } from "@/lib/incentive/run-incentive-delta";

// F009 FR-401 -- runs right after F008's own adjustment insert commits. A
// correction can only ever target an already-locked business_date
// (create-correction.ts's own NOT_LOCKED guard), so the adjustment's target
// transaction's business_date IS the origin period by construction. Engine
// failure here must never surface as an approval failure -- the correction
// is already approved and the adjustment row already recorded; a delta
// failure is only ever an audit-visible gap, not a rolled-back approval.
async function runIncentiveDeltaAfterApproval(
  correctionId: string,
  targetTxnId: string,
  amountDelta: number,
): Promise<void> {
  try {
    const adminClient = createAdminClient();
    await runIncentiveDelta(adminClient, { correctionId, targetTxnId, amountDelta });
  } catch (err) {
    console.error(`[api/corrections/${correctionId}/approve] runIncentiveDelta failed`, err);
  }
}

const STATUS_BY_REASON: Record<ApproveCorrectionReason, number> = {
  NOT_FOUND: 404,
  SELF_APPROVAL: 403,
  ALREADY_DECIDED: 409,
  INVALID_ADJUSTMENT: 422,
};

interface ApproveBody {
  decision: Decision;
  adjustmentKind?: AdjustmentKind;
  qtyDelta?: number;
  unitPriceDelta?: number;
  note?: string;
}

function parseBody(body: unknown): ApproveBody | null {
  if (typeof body !== "object" || body === null) return null;
  const b = body as Record<string, unknown>;
  if (b.decision !== "approve" && b.decision !== "reject") return null;

  const adjustmentKind = b.adjustmentKind === "reverse" || b.adjustmentKind === "delta" ? b.adjustmentKind : undefined;
  const qtyDelta = typeof b.qtyDelta === "number" && Number.isFinite(b.qtyDelta) ? b.qtyDelta : undefined;
  const unitPriceDelta =
    typeof b.unitPriceDelta === "number" && Number.isFinite(b.unitPriceDelta) ? b.unitPriceDelta : undefined;
  const note = typeof b.note === "string" && b.note.trim().length > 0 ? b.note.trim() : undefined;

  return { decision: b.decision, adjustmentKind, qtyDelta, unitPriceDelta, note };
}

// A3 (FR-301, FR-401, BR-002, SM-001, DEC-001, US002) -- SCR015 Duyệt/Từ chối.
export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
): Promise<NextResponse> {
  const user = await requireRole(["ROLE-SETTLEMENT"]);
  const { id } = await params;

  let rawBody: unknown;
  try {
    rawBody = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }
  const body = parseBody(rawBody);
  if (!body) return NextResponse.json({ error: "invalid_request" }, { status: 422 });

  try {
    const supabase: SupabaseClient<Database> = await createClient();
    const result = await approveCorrection(supabase, {
      correctionId: id,
      actorId: user.id,
      decision: body.decision,
      adjustmentKind: body.adjustmentKind,
      qtyDelta: body.qtyDelta,
      unitPriceDelta: body.unitPriceDelta,
      note: body.note,
    });

    if (result.ok) {
      if (result.status === "approved") {
        await runIncentiveDeltaAfterApproval(id, result.adjustment.target_txn_id, result.adjustment.amount_delta);
        return NextResponse.json({ status: result.status, adjustment: result.adjustment });
      }
      return NextResponse.json({ status: result.status });
    }
    return NextResponse.json({ reason: result.reason }, { status: STATUS_BY_REASON[result.reason] });
  } catch (err) {
    console.error(`[api/corrections/${id}/approve] POST unexpected error`, err);
    return NextResponse.json({ error: "internal_error" }, { status: 500 });
  }
}
