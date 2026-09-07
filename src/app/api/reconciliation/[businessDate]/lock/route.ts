import { NextResponse } from "next/server";
import type { SupabaseClient } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/lib/db/types";
import { requireRole } from "@/lib/auth/require-role";
import { lockBusinessDay } from "@/lib/reconciliation/lock-business-day";
import { isValidBusinessDate } from "@/lib/reconciliation/business-date-validation";

// A2 (FR-401, FR-601, BR-001) -- SCR013 "Lock ngày nghiệp vụ". No unlock
// endpoint exists anywhere in this codebase -- FR-401 makes this one-way.
export async function POST(
  _request: Request,
  { params }: { params: Promise<{ businessDate: string }> },
): Promise<NextResponse> {
  const user = await requireRole(["ROLE-SETTLEMENT"]);
  const { businessDate } = await params;

  if (!isValidBusinessDate(businessDate)) {
    return NextResponse.json({ error: "invalid_business_date" }, { status: 400 });
  }

  try {
    const supabase: SupabaseClient<Database> = await createClient();
    const result = await lockBusinessDay(supabase, businessDate, user.id);

    if (result.ok) {
      return NextResponse.json({ status: "locked", lock: result.lock });
    }
    return NextResponse.json({ reason: result.reason }, { status: 409 });
  } catch (err) {
    console.error(`[api/reconciliation/${businessDate}/lock] POST unexpected error`, err);
    return NextResponse.json({ error: "internal_error" }, { status: 500 });
  }
}
