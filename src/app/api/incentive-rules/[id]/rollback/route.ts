import { NextResponse } from "next/server";
import type { SupabaseClient } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/lib/db/types";
import { requireRole } from "@/lib/auth/require-role";
import { rollbackRuleVersion } from "@/lib/incentive/rollback-rule-version";
import type { RollbackRuleVersionReason } from "@/lib/incentive/rollback-rule-version";

const STATUS_BY_REASON: Record<RollbackRuleVersionReason, number> = {
  NOT_FOUND: 404,
  SELF_ROLLBACK: 403,
  NOT_ACTIVE: 409,
  INVALID_TARGET: 422,
};

interface RollbackBody {
  targetVersionId: string;
}

function parseBody(body: unknown): RollbackBody | null {
  if (typeof body !== "object" || body === null) return null;
  const b = body as Record<string, unknown>;
  if (typeof b.targetVersionId !== "string" || b.targetVersionId.trim().length === 0) return null;
  return { targetVersionId: b.targetVersionId.trim() };
}

// A3 (FR-204, SM-001, US002) -- SCR017 "Rollback".
export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
): Promise<NextResponse> {
  const user = await requireRole(["ROLE-RULE-ADMIN"]);
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
    const result = await rollbackRuleVersion(supabase, {
      activeVersionId: id,
      targetVersionId: body.targetVersionId,
      actorId: user.id,
    });
    if (result.ok) {
      return NextResponse.json({ demoted: result.demoted, promoted: result.promoted });
    }
    return NextResponse.json({ reason: result.reason }, { status: STATUS_BY_REASON[result.reason] });
  } catch (err) {
    console.error(`[api/incentive-rules/${id}/rollback] POST unexpected error`, err);
    return NextResponse.json({ error: "internal_error" }, { status: 500 });
  }
}
