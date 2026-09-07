import { NextResponse } from "next/server";
import type { SupabaseClient } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/lib/db/types";
import { requireRole } from "@/lib/auth/require-role";
import { approveRuleVersion } from "@/lib/incentive/approve-rule-version";
import type { ApproveRuleVersionReason } from "@/lib/incentive/approve-rule-version";

const STATUS_BY_REASON: Record<ApproveRuleVersionReason, number> = {
  NOT_FOUND: 404,
  SELF_APPROVAL: 403,
  ALREADY_DECIDED: 409,
};

// A2 (FR-202, BR-003, DEC-001, SM-001, US002) -- SCR018 "Phê duyệt". Same
// maker-checker precedent F008 established: creator === approver -> 403.
export async function POST(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
): Promise<NextResponse> {
  const user = await requireRole(["ROLE-RULE-ADMIN"]);
  const { id } = await params;

  try {
    const supabase: SupabaseClient<Database> = await createClient();
    const result = await approveRuleVersion(supabase, { ruleVersionId: id, actorId: user.id });
    if (result.ok) {
      return NextResponse.json({ status: "active", ruleVersion: result.ruleVersion });
    }
    return NextResponse.json({ reason: result.reason }, { status: STATUS_BY_REASON[result.reason] });
  } catch (err) {
    console.error(`[api/incentive-rules/${id}/approve] POST unexpected error`, err);
    return NextResponse.json({ error: "internal_error" }, { status: 500 });
  }
}
