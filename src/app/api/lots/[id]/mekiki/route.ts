import { NextResponse } from "next/server";
import type { SupabaseClient } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/server";
import type { Database, TablesInsert } from "@/lib/db/types";
import { requireRole } from "@/lib/auth/require-role";
import { writeAuditLog } from "@/lib/audit/write-audit-log";

// FR-LOT-02 / SM-001 (A2): 目利き is manual entry only (SCOPE-OUT-01) --
// grade is free text, never an enum, and there is no grading logic here.
function parseGrade(body: unknown): string | null {
  if (typeof body !== "object" || body === null) return null;
  const grade = (body as Record<string, unknown>).grade;
  if (typeof grade !== "string") return null;
  const trimmed = grade.trim();
  return trimmed.length > 0 ? trimmed : null;
}

async function handleCreate(request: Request, lotId: string, assessorId: string): Promise<NextResponse> {
  let rawBody: unknown;
  try {
    rawBody = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }
  const grade = parseGrade(rawBody);
  if (!grade) return NextResponse.json({ error: "invalid_request" }, { status: 422 });

  const supabase: SupabaseClient<Database> = await createClient();

  const { data: lot, error: lotError } = await supabase
    .from("lot")
    .select("id, status, business_date")
    .eq("id", lotId)
    .maybeSingle();
  if (lotError) throw new Error(`mekiki: lot lookup failed: ${lotError.message}`);
  if (!lot) return NextResponse.json({ error: "lot_not_found" }, { status: 404 });

  // CAS-gate the state transition FIRST -- only the request that flips
  // 'received' -> 'published' proceeds to write the mekiki_record. Same
  // compare-and-swap idiom as availability-service.ts and for the same
  // reason: no cross-table BEGIN/COMMIT is available through PostgREST, so
  // this conditional UPDATE is the actual serialization point (phase-06
  // asked for one DB transaction; see § "Implementation notes" in the
  // handback report for the full explanation of this substitute).
  const { data: published, error: publishError } = await supabase
    .from("lot")
    .update({ status: "published" })
    .eq("id", lotId)
    .eq("status", "received")
    .select("id")
    .maybeSingle();
  if (publishError) throw new Error(`mekiki: publish failed: ${publishError.message}`);
  if (!published) {
    return NextResponse.json({ error: "lot_not_receivable" }, { status: 409 });
  }

  const insertRow: TablesInsert<"mekiki_record"> = {
    lot_id: lotId,
    grade,
    assessor_id: assessorId,
    business_date: lot.business_date,
  };
  const { data: mekiki, error: insertError } = await supabase
    .from("mekiki_record")
    .insert(insertRow)
    .select()
    .single();

  if (insertError || !mekiki) {
    // Best-effort compensation: the mekiki row is what makes "published"
    // meaningful. Put status back rather than leave a published lot with no
    // recorded assessment.
    await supabase.from("lot").update({ status: "received" }).eq("id", lotId).eq("status", "published");
    throw new Error(`mekiki: insert failed: ${insertError?.message}`);
  }

  await writeAuditLog(supabase, {
    actorId: assessorId,
    action: "publish",
    entity: "lot",
    entityId: lotId,
    before: { status: "received" },
    after: { status: "published", grade },
  });

  return NextResponse.json({ mekiki, status: "published" }, { status: 201 });
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
): Promise<NextResponse> {
  const user = await requireRole(["ROLE-JUDGE"]);
  const { id } = await params;
  try {
    return await handleCreate(request, id, user.id);
  } catch (err) {
    console.error("[api/lots/:id/mekiki] POST unexpected error", err);
    return NextResponse.json({ error: "internal_error" }, { status: 500 });
  }
}
