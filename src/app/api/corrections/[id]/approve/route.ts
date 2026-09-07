import { NextResponse } from "next/server";
import type { SupabaseClient } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/lib/db/types";
import { requireRole } from "@/lib/auth/require-role";
import { approveCorrection } from "@/lib/corrections/approve-correction";
import type { ApproveCorrectionReason, Decision } from "@/lib/corrections/approve-correction";
import type { AdjustmentKind } from "@/lib/corrections/build-adjustment";

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
      return NextResponse.json(
        result.status === "approved" ? { status: result.status, adjustment: result.adjustment } : { status: result.status },
      );
    }
    return NextResponse.json({ reason: result.reason }, { status: STATUS_BY_REASON[result.reason] });
  } catch (err) {
    console.error(`[api/corrections/${id}/approve] POST unexpected error`, err);
    return NextResponse.json({ error: "internal_error" }, { status: 500 });
  }
}
