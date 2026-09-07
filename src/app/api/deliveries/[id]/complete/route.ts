import { NextResponse } from "next/server";
import type { SupabaseClient } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/lib/db/types";
import { requireRole } from "@/lib/auth/require-role";
import { completeDelivery } from "@/lib/deliveries/complete-delivery";
import type { CompleteDeliveryReason } from "@/lib/deliveries/complete-delivery";

const STATUS_BY_REASON: Record<CompleteDeliveryReason, number> = {
  NOT_FOUND: 404,
  ALREADY_COMPLETED: 409,
  QTY_MISMATCH: 422,
};

// A3 (FR-DEL-02, BR-DEL-03, US002) -- SCR012 "Xác nhận hoàn tất".
// ROLE-SETTLEMENT only -- see complete-delivery.ts's own comment for why this
// departs from deliverytracking/technical-spec.md §5.2's "cả 2 role" note.
export async function POST(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
): Promise<NextResponse> {
  const user = await requireRole(["ROLE-SETTLEMENT"]);
  const { id } = await params;

  try {
    const supabase: SupabaseClient<Database> = await createClient();
    const result = await completeDelivery(supabase, id, user.id);

    if (result.ok) {
      return NextResponse.json({ status: "completed", delivery: result.delivery });
    }
    return NextResponse.json(
      { reason: result.reason, deliveredQty: result.deliveredQty, orderedQty: result.orderedQty },
      { status: STATUS_BY_REASON[result.reason] },
    );
  } catch (err) {
    console.error(`[api/deliveries/${id}/complete] POST unexpected error`, err);
    return NextResponse.json({ error: "internal_error" }, { status: 500 });
  }
}
