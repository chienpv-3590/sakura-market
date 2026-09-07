import { NextResponse } from "next/server";
import type { SupabaseClient } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/lib/db/types";
import { requireUser } from "@/lib/auth/require-role";
import { loadReconciliationLines, loadLockStatus } from "@/lib/reconciliation/reconciliation-queries";
import { isValidBusinessDate } from "@/lib/reconciliation/business-date-validation";

// A1 (FR-001, FR-101, FR-201) -- SCR013. Read-only for any active role
// (FR-601 lets non-ROLE-SETTLEMENT view read-only).
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ businessDate: string }> },
): Promise<NextResponse> {
  await requireUser();
  const { businessDate } = await params;

  if (!isValidBusinessDate(businessDate)) {
    return NextResponse.json({ error: "invalid_business_date" }, { status: 400 });
  }

  try {
    const supabase: SupabaseClient<Database> = await createClient();
    const [lines, lock] = await Promise.all([
      loadReconciliationLines(supabase, businessDate),
      loadLockStatus(supabase, businessDate),
    ]);
    return NextResponse.json({ businessDate, lines, lock });
  } catch (err) {
    console.error(`[api/reconciliation/${businessDate}] GET unexpected error`, err);
    return NextResponse.json({ error: "internal_error" }, { status: 500 });
  }
}
