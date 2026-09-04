import { NextResponse } from "next/server";
import type { SupabaseClient } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/server";
import type { Database, TablesUpdate } from "@/lib/db/types";
import { requireRole, requireUser } from "@/lib/auth/require-role";
import { writeAuditLog } from "@/lib/audit/write-audit-log";
import { loadSeriResult, loadSeriAuditHistory } from "@/lib/seri/seri-queries";

type PatchBody = {
  qty?: number;
  unitPrice?: number;
  decidedAt?: string;
  confirmedBy?: string;
  reason: string;
};

function parsePatchBody(body: unknown): PatchBody | null {
  if (typeof body !== "object" || body === null) return null;
  const b = body as Record<string, unknown>;
  const reason = typeof b.reason === "string" ? b.reason.trim() : "";
  if (reason.length === 0) return null; // FR-SERI-03: reason is mandatory on every edit

  const result: PatchBody = { reason };
  if (b.qty !== undefined) {
    if (typeof b.qty !== "number" || !Number.isFinite(b.qty) || b.qty <= 0) return null;
    result.qty = b.qty;
  }
  if (b.unitPrice !== undefined) {
    if (typeof b.unitPrice !== "number" || !Number.isInteger(b.unitPrice) || b.unitPrice <= 0) return null;
    result.unitPrice = b.unitPrice;
  }
  if (b.decidedAt !== undefined) {
    if (typeof b.decidedAt !== "string") return null;
    const d = new Date(b.decidedAt);
    if (Number.isNaN(d.getTime())) return null;
    result.decidedAt = d.toISOString();
  }
  if (b.confirmedBy !== undefined) {
    if (typeof b.confirmedBy !== "string" || b.confirmedBy.trim().length === 0) return null;
    result.confirmedBy = b.confirmedBy.trim();
  }
  return result;
}

async function handleShow(id: string): Promise<NextResponse> {
  const supabase: SupabaseClient<Database> = await createClient();
  const seriResult = await loadSeriResult(supabase, id);
  if (!seriResult) return NextResponse.json({ error: "not_found" }, { status: 404 });
  const history = await loadSeriAuditHistory(supabase, id);
  return NextResponse.json({ seriResult, history });
}

// A3 (FR-SERI-03): before/after keys use raw DB column names (snake_case),
// matching PATCH /api/lots/[id]'s own audit convention -- not the camelCase
// request/response shape -- so `audit_log.before->>'unit_price'` etc. reads
// directly (Success Criteria #8).
async function handleUpdate(request: Request, id: string, actorId: string): Promise<NextResponse> {
  let rawBody: unknown;
  try {
    rawBody = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }
  const body = parsePatchBody(rawBody);
  if (!body) return NextResponse.json({ error: "invalid_request" }, { status: 422 });

  const supabase: SupabaseClient<Database> = await createClient();
  const current = await loadSeriResult(supabase, id);
  if (!current) return NextResponse.json({ error: "not_found" }, { status: 404 });

  const update: TablesUpdate<"seri_result"> = {};
  const before: Record<string, string | number | null> = {};
  const after: Record<string, string | number | null> = {};
  if (body.qty !== undefined && body.qty !== current.qty) {
    before.qty = current.qty;
    after.qty = body.qty;
    update.qty = body.qty;
  }
  if (body.unitPrice !== undefined && body.unitPrice !== current.unit_price) {
    before.unit_price = current.unit_price;
    after.unit_price = body.unitPrice;
    update.unit_price = body.unitPrice;
  }
  if (body.decidedAt !== undefined && body.decidedAt !== current.decided_at) {
    before.decided_at = current.decided_at;
    after.decided_at = body.decidedAt;
    update.decided_at = body.decidedAt;
  }
  if (body.confirmedBy !== undefined && body.confirmedBy !== current.confirmed_by) {
    before.confirmed_by = current.confirmed_by;
    after.confirmed_by = body.confirmedBy;
    update.confirmed_by = body.confirmedBy;
  }

  if (Object.keys(update).length === 0) {
    return NextResponse.json({ seriResult: current });
  }

  const { data: updated, error } = await supabase.from("seri_result").update(update).eq("id", id).select().single();
  if (error) {
    if (error.code === "P0001") return NextResponse.json({ error: "locked_business_date" }, { status: 423 });
    if (error.code === "23503") return NextResponse.json({ error: "invalid_request" }, { status: 422 });
    throw new Error(`PATCH /api/seri-results/${id} update failed: ${error.message}`);
  }

  await writeAuditLog(supabase, {
    actorId,
    action: "update",
    entity: "seri_result",
    entityId: id,
    before,
    after,
    reason: body.reason,
  });

  return NextResponse.json({ seriResult: updated });
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
): Promise<NextResponse> {
  await requireUser();
  const { id } = await params;
  try {
    return await handleShow(id);
  } catch (err) {
    console.error("[api/seri-results/:id] GET unexpected error", err);
    return NextResponse.json({ error: "internal_error" }, { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
): Promise<NextResponse> {
  const user = await requireRole(["ROLE-TRADE", "ROLE-SETTLEMENT"]);
  const { id } = await params;
  try {
    return await handleUpdate(request, id, user.id);
  } catch (err) {
    console.error("[api/seri-results/:id] PATCH unexpected error", err);
    return NextResponse.json({ error: "internal_error" }, { status: 500 });
  }
}
