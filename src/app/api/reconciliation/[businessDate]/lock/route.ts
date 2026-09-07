import { NextResponse } from "next/server";
import type { SupabaseClient } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import type { Database } from "@/lib/db/types";
import { requireRole } from "@/lib/auth/require-role";
import { writeAuditLog } from "@/lib/audit/write-audit-log";
import { lockBusinessDay } from "@/lib/reconciliation/lock-business-day";
import { isValidBusinessDate } from "@/lib/reconciliation/business-date-validation";
import { runIncentiveForPeriod } from "@/lib/incentive/run-incentive-for-period";

// F009 A5 (ALG-001, ALG-002) -- runs synchronously right after the lock
// commits (QĐ-5: no queue on this stack). Never lets an engine failure
// surface as a lock failure -- locking the day is the primary action and
// must succeed regardless; a failure here is only ever recorded as an audit
// row (phase-09 Risk Assessment).
async function runIncentiveAfterLock(businessDate: string, actorId: string): Promise<void> {
  const adminClient = createAdminClient();
  try {
    await runIncentiveForPeriod(adminClient, businessDate, actorId);
  } catch (err) {
    console.error(`[api/reconciliation/${businessDate}/lock] runIncentiveForPeriod failed`, err);
    try {
      await writeAuditLog(adminClient, {
        actorId,
        action: "incentive_engine_error",
        entity: "incentive_result",
        entityId: businessDate,
        before: null,
        after: null,
        reason: err instanceof Error ? err.message : String(err),
      });
    } catch (auditErr) {
      console.error(`[api/reconciliation/${businessDate}/lock] failed to audit incentive engine error`, auditErr);
    }
  }
}

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
      await runIncentiveAfterLock(businessDate, user.id);
      return NextResponse.json({ status: "locked", lock: result.lock });
    }
    return NextResponse.json({ reason: result.reason }, { status: 409 });
  } catch (err) {
    console.error(`[api/reconciliation/${businessDate}/lock] POST unexpected error`, err);
    return NextResponse.json({ error: "internal_error" }, { status: 500 });
  }
}
