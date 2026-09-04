import { NextResponse } from "next/server";
import type { SupabaseClient } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/lib/db/types";
import { requireRole } from "@/lib/auth/require-role";
import { confirmTransaction } from "@/lib/transactions/confirm-transaction";
import type { ConfirmRejectReason } from "@/lib/transactions/reject-reasons";

// A2. Status codes follow phase-07 Success Criteria #1/#2/#6 literally:
// the two BR-PERM-01/BR-LOT-02 gates are 422 (a specific, distinguishable
// reason each), the double-submit guard is 409, a locked business day is 423
// (same convention PATCH /api/lots/[id] established).
const STATUS_BY_REASON: Record<ConfirmRejectReason, number> = {
  NOT_DRAFT: 409,
  INELIGIBLE_PARTY: 422,
  INSUFFICIENT_QTY: 422,
  LOCKED_BUSINESS_DATE: 423,
};

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
): Promise<NextResponse> {
  const user = await requireRole(["ROLE-TRADE"]);
  const { id } = await params;

  try {
    const supabase: SupabaseClient<Database> = await createClient();
    const result = await confirmTransaction(supabase, id, user.id);

    if (result.ok) {
      return NextResponse.json({ status: "confirmed", transaction: result.transaction });
    }
    return NextResponse.json(
      { reason: result.reason, detail: result.detail },
      { status: STATUS_BY_REASON[result.reason] },
    );
  } catch (err) {
    console.error(`[api/transactions/${id}/confirm] POST unexpected error`, err);
    return NextResponse.json({ error: "internal_error" }, { status: 500 });
  }
}
