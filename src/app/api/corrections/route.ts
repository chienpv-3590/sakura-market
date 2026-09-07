import { NextResponse } from "next/server";
import type { SupabaseClient } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/lib/db/types";
import { requireRole } from "@/lib/auth/require-role";
import { uploadEvidence } from "@/lib/corrections/evidence-upload";
import { createCorrection } from "@/lib/corrections/create-correction";
import type { CreateCorrectionReason } from "@/lib/corrections/create-correction";
import { listCorrections } from "@/lib/corrections/correction-queries";

const CREATE_STATUS_BY_REASON: Record<CreateCorrectionReason, number> = {
  TXN_NOT_FOUND: 404,
  NOT_LOCKED: 409,
};

// A1 (FR-001, FR-201, BR-001, BR-003, US001) -- SCR014 "Gửi yêu cầu".
// multipart/form-data: { targetTxnId, reason, evidence }.
async function handleCreate(request: Request, actorId: string): Promise<NextResponse> {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ error: "invalid_request" }, { status: 400 });
  }

  const targetTxnId = form.get("targetTxnId");
  const reasonRaw = form.get("reason");
  const evidence = form.get("evidence");

  if (typeof targetTxnId !== "string" || targetTxnId.trim().length === 0) {
    return NextResponse.json({ error: "missing_target_txn_id" }, { status: 422 });
  }
  const reason = typeof reasonRaw === "string" ? reasonRaw.trim() : "";
  if (reason.length === 0) {
    return NextResponse.json({ error: "missing_reason" }, { status: 422 });
  }
  if (!(evidence instanceof File) || evidence.size === 0) {
    return NextResponse.json({ error: "missing_evidence" }, { status: 422 });
  }

  const supabase: SupabaseClient<Database> = await createClient();

  const uploadResult = await uploadEvidence(supabase, targetTxnId, evidence);
  if (!uploadResult.ok) {
    return NextResponse.json({ reason: uploadResult.reason }, { status: 422 });
  }

  const result = await createCorrection(supabase, {
    targetTxnId,
    reason,
    evidencePath: uploadResult.path,
    actorId,
  });
  if (!result.ok) {
    return NextResponse.json({ reason: result.reason }, { status: CREATE_STATUS_BY_REASON[result.reason] });
  }
  return NextResponse.json({ correction: result.correction }, { status: 201 });
}

async function handleList(status: string | null): Promise<NextResponse> {
  const supabase: SupabaseClient<Database> = await createClient();
  const corrections = await listCorrections(supabase, status ?? "pending");
  return NextResponse.json({ corrections });
}

export async function POST(request: Request): Promise<NextResponse> {
  const user = await requireRole(["ROLE-SETTLEMENT"]);
  try {
    return await handleCreate(request, user.id);
  } catch (err) {
    console.error("[api/corrections] POST unexpected error", err);
    return NextResponse.json({ error: "internal_error" }, { status: 500 });
  }
}

export async function GET(request: Request): Promise<NextResponse> {
  await requireRole(["ROLE-SETTLEMENT"]);
  try {
    const status = new URL(request.url).searchParams.get("status");
    return await handleList(status);
  } catch (err) {
    console.error("[api/corrections] GET unexpected error", err);
    return NextResponse.json({ error: "internal_error" }, { status: 500 });
  }
}
