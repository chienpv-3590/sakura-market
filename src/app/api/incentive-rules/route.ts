import { NextResponse } from "next/server";
import type { SupabaseClient } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/lib/db/types";
import { requireRole } from "@/lib/auth/require-role";
import { createRuleVersion } from "@/lib/incentive/create-rule-version";
import type { CreateRuleVersionReason } from "@/lib/incentive/create-rule-version";
import { listRuleVersions } from "@/lib/incentive/rule-version-queries";

const CREATE_STATUS_BY_REASON: Record<CreateRuleVersionReason, number> = {
  INVALID_EFFECTIVE_DATE: 422,
  VERSION_CONFLICT: 409,
};

interface CreateBody {
  effectiveFrom: string;
  note?: string;
}

function parseBody(body: unknown): CreateBody | null {
  if (typeof body !== "object" || body === null) return null;
  const b = body as Record<string, unknown>;
  if (typeof b.effectiveFrom !== "string" || b.effectiveFrom.trim().length === 0) return null;
  const note = typeof b.note === "string" && b.note.trim().length > 0 ? b.note.trim() : undefined;
  return { effectiveFrom: b.effectiveFrom.trim(), note };
}

// A1 (FR-201, FR-203, US001) -- SCR018 "Tạo phiên bản biểu suất".
export async function POST(request: Request): Promise<NextResponse> {
  const user = await requireRole(["ROLE-RULE-ADMIN"]);

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
    const result = await createRuleVersion(supabase, {
      effectiveFrom: body.effectiveFrom,
      note: body.note ?? null,
      actorId: user.id,
    });
    if (!result.ok) {
      return NextResponse.json({ reason: result.reason }, { status: CREATE_STATUS_BY_REASON[result.reason] });
    }
    return NextResponse.json({ ruleVersion: result.ruleVersion }, { status: 201 });
  } catch (err) {
    console.error("[api/incentive-rules] POST unexpected error", err);
    return NextResponse.json({ error: "internal_error" }, { status: 500 });
  }
}

// A4 (FR-101, US001, US002) -- SCR017 list, read-only.
export async function GET(request: Request): Promise<NextResponse> {
  await requireRole(["ROLE-RULE-ADMIN"]);
  try {
    const status = new URL(request.url).searchParams.get("status") ?? undefined;
    const supabase: SupabaseClient<Database> = await createClient();
    const ruleVersions = await listRuleVersions(supabase, status);
    return NextResponse.json({ ruleVersions });
  } catch (err) {
    console.error("[api/incentive-rules] GET unexpected error", err);
    return NextResponse.json({ error: "internal_error" }, { status: 500 });
  }
}
