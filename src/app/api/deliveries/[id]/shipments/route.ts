import { NextResponse } from "next/server";
import type { SupabaseClient } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/lib/db/types";
import { requireRole } from "@/lib/auth/require-role";
import { recordShipment } from "@/lib/deliveries/record-shipment";
import type { RecordShipmentReason } from "@/lib/deliveries/record-shipment";

const STATUS_BY_REASON: Record<RecordShipmentReason, number> = {
  NOT_FOUND: 404,
  ALREADY_COMPLETED: 409,
  OVER_DELIVERY: 422,
};

function parseQty(body: unknown): number | null {
  if (typeof body !== "object" || body === null) return null;
  const qty = (body as Record<string, unknown>).qty;
  return typeof qty === "number" && Number.isFinite(qty) && qty > 0 ? qty : null;
}

// A2 (FR-DEL-05, US001) -- SCR012 "Ghi nhận lần giao mới".
export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
): Promise<NextResponse> {
  const user = await requireRole(["ROLE-DELIVERY"]);
  const { id } = await params;

  let rawBody: unknown;
  try {
    rawBody = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }
  const qty = parseQty(rawBody);
  if (qty === null) return NextResponse.json({ error: "invalid_request" }, { status: 422 });

  try {
    const supabase: SupabaseClient<Database> = await createClient();
    const result = await recordShipment(supabase, id, qty, user.id);

    if (result.ok) {
      return NextResponse.json({ delivery: result.delivery, shipment: result.shipment }, { status: 201 });
    }
    return NextResponse.json(
      { reason: result.reason, remaining: result.remaining },
      { status: STATUS_BY_REASON[result.reason] },
    );
  } catch (err) {
    console.error(`[api/deliveries/${id}/shipments] POST unexpected error`, err);
    return NextResponse.json({ error: "internal_error" }, { status: 500 });
  }
}
