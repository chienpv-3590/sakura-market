import { NextResponse } from "next/server";
import type { SupabaseClient } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/lib/db/types";
import { requireRole, requireUser } from "@/lib/auth/require-role";
import { writeAuditLog } from "@/lib/audit/write-audit-log";
import { loadLot, loadLotAuditHistory, isBusinessDateLocked } from "@/lib/lots/lot-queries";

// FR-LOT-04 (A6): single-field controlled adjustment. available_qty is
// deliberately NOT in this allowlist -- it only ever moves through
// reserveLotQty/releaseLotQty (availability-service.ts), never through a
// free-form PATCH (Security Considerations, phase-06).
const EDITABLE_FIELDS = ["item", "package_count"] as const;
type EditableField = (typeof EDITABLE_FIELDS)[number];

function isEditableField(value: unknown): value is EditableField {
  return typeof value === "string" && (EDITABLE_FIELDS as readonly string[]).includes(value);
}

type AdjustBody =
  | { field: "item"; newValue: string; reason: string }
  | { field: "package_count"; newValue: number; reason: string };

function parseAdjustBody(body: unknown): AdjustBody | null {
  if (typeof body !== "object" || body === null) return null;
  const b = body as Record<string, unknown>;
  if (!isEditableField(b.field)) return null;
  const reason = typeof b.reason === "string" ? b.reason.trim() : "";
  if (reason.length === 0) return null;

  if (b.field === "item") {
    if (typeof b.newValue !== "string" || b.newValue.trim().length === 0) return null;
    return { field: "item", newValue: b.newValue.trim(), reason };
  }
  if (typeof b.newValue !== "number" || !Number.isInteger(b.newValue) || b.newValue <= 0) return null;
  return { field: "package_count", newValue: b.newValue, reason };
}

async function handleShow(id: string): Promise<NextResponse> {
  const supabase: SupabaseClient<Database> = await createClient();
  const lot = await loadLot(supabase, id);
  if (!lot) return NextResponse.json({ error: "not_found" }, { status: 404 });

  const history = await loadLotAuditHistory(supabase, id);
  return NextResponse.json({ lot, history });
}

async function handleAdjust(request: Request, id: string, actorId: string): Promise<NextResponse> {
  let rawBody: unknown;
  try {
    rawBody = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }
  const body = parseAdjustBody(rawBody);
  if (!body) return NextResponse.json({ error: "invalid_request" }, { status: 422 });

  const supabase: SupabaseClient<Database> = await createClient();
  const lot = await loadLot(supabase, id);
  if (!lot) return NextResponse.json({ error: "not_found" }, { status: 404 });

  // BR-CLOSE-01 (F007): a locked business day blocks direct attribute
  // adjustment even though `lot` carries no DB trigger for it (QĐ-3 --
  // available_qty writes must stay possible across days; this app-level
  // check is scoped to A6 only, it never touches available_qty).
  if (await isBusinessDateLocked(supabase, lot.business_date)) {
    await writeAuditLog(supabase, {
      actorId,
      action: "adjust_blocked_locked",
      entity: "lot",
      entityId: id,
      before: null,
      after: { field: body.field, newValue: body.newValue },
      reason: body.reason,
    });
    return NextResponse.json({ error: "locked_business_date" }, { status: 423 });
  }

  // Branch explicitly (rather than a computed { [field]: value } payload) so
  // the update body stays a literal shape TablesUpdate<"lot"> can check.
  const before: Record<string, string | number> = { [body.field]: lot[body.field] };
  const after: Record<string, string | number> = { [body.field]: body.newValue };
  const { data: updated, error } =
    body.field === "item"
      ? await supabase.from("lot").update({ item: body.newValue }).eq("id", id).select().single()
      : await supabase
          .from("lot")
          .update({ package_count: body.newValue })
          .eq("id", id)
          .select()
          .single();

  if (error) {
    throw new Error(`PATCH /api/lots/${id} update failed: ${error.message}`);
  }

  await writeAuditLog(supabase, {
    actorId,
    action: "adjust",
    entity: "lot",
    entityId: id,
    before,
    after,
    reason: body.reason,
  });

  return NextResponse.json({ lot: updated });
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
    console.error("[api/lots/:id] GET unexpected error", err);
    return NextResponse.json({ error: "internal_error" }, { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
): Promise<NextResponse> {
  const user = await requireRole(["ROLE-SETTLEMENT"]);
  const { id } = await params;
  try {
    return await handleAdjust(request, id, user.id);
  } catch (err) {
    console.error("[api/lots/:id] PATCH unexpected error", err);
    return NextResponse.json({ error: "internal_error" }, { status: 500 });
  }
}
