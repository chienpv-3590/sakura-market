import { NextResponse } from "next/server";
import type { SupabaseClient } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/lib/db/types";
import { requireRole, requireUser } from "@/lib/auth/require-role";
import { createLot, type CreateLotFields } from "@/lib/lots/create-lot";
import { checkIntakeDocFile } from "@/lib/lots/intake-doc-upload";
import { attachIntakeDoc } from "@/lib/lots/attach-intake-doc";

// FR-LOT-01: create a lot (A1), with optional intake-document attachments
// (D-LOT "chứng từ tiếp nhận"). multipart/form-data, same convention as
// POST /api/corrections: { item, packageCount, initialQty, intakeDocs[] }.
// Attaching a document is optional -- FR-LOT-01's acceptance criterion is
// that the system *can* store the required documents ("lưu được các chứng
// từ bắt buộc"), not that every single POST must carry one; no BR-LOT rule
// sets a minimum attachment count the way BR-003 does for F008 evidence.
function parseCreateLotFields(form: FormData): CreateLotFields | null {
  const itemRaw = form.get("item");
  const item = typeof itemRaw === "string" ? itemRaw.trim() : "";
  if (item.length === 0) return null;

  const packageCountRaw = form.get("packageCount");
  const packageCount = typeof packageCountRaw === "string" ? Number(packageCountRaw) : NaN;
  if (!Number.isInteger(packageCount) || packageCount <= 0) return null;

  const initialQtyRaw = form.get("initialQty");
  const initialQty = typeof initialQtyRaw === "string" ? Number(initialQtyRaw) : NaN;
  if (!Number.isFinite(initialQty) || initialQty <= 0) return null;

  return { item, packageCount, initialQty };
}

function collectIntakeDocFiles(form: FormData): File[] {
  return form.getAll("intakeDocs").filter((value): value is File => value instanceof File && value.size > 0);
}

async function handleCreate(request: Request, actorId: string): Promise<NextResponse> {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ error: "invalid_request" }, { status: 400 });
  }

  const fields = parseCreateLotFields(form);
  if (!fields) {
    return NextResponse.json({ error: "invalid_request" }, { status: 422 });
  }

  const files = collectIntakeDocFiles(form);
  for (const file of files) {
    const check = checkIntakeDocFile(file);
    if (!check.ok) {
      // Reject before creating anything -- a bad file must not leave an
      // orphan lot with no attachments behind it.
      return NextResponse.json({ reason: check.reason }, { status: 422 });
    }
  }

  const supabase: SupabaseClient<Database> = await createClient();
  const lot = await createLot(supabase, fields, actorId);

  // Every file already passed checkIntakeDocFile above, so a failure here is
  // an infra-level surprise (storage/DB), not a validation rejection -- the
  // lot itself still exists and is still the success response; count of
  // failures is surfaced so the UI can tell the operator to retry attaching.
  let attachmentsFailed = 0;
  for (const file of files) {
    const result = await attachIntakeDoc(supabase, lot.id, actorId, file);
    if (!result.ok) attachmentsFailed += 1;
  }

  return NextResponse.json(
    { id: lot.id, lotCode: lot.lot_code, attachmentsFailed },
    { status: 201 },
  );
}

async function handleList(): Promise<NextResponse> {
  const supabase: SupabaseClient<Database> = await createClient();
  const { data, error } = await supabase
    .from("lot")
    .select("id, lot_code, item, package_count, initial_qty, available_qty, status, business_date, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(`GET /api/lots failed: ${error.message}`);
  }
  return NextResponse.json({ lots: data });
}

export async function POST(request: Request): Promise<NextResponse> {
  // requireRole redirects/404s outside the try -- never let the catch below
  // swallow that control flow and turn it into a JSON 500.
  const user = await requireRole(["ROLE-INTAKE"]);
  try {
    return await handleCreate(request, user.id);
  } catch (err) {
    console.error("[api/lots] POST unexpected error", err);
    return NextResponse.json({ error: "internal_error" }, { status: 500 });
  }
}

export async function GET(): Promise<NextResponse> {
  await requireUser();
  try {
    return await handleList();
  } catch (err) {
    console.error("[api/lots] GET unexpected error", err);
    return NextResponse.json({ error: "internal_error" }, { status: 500 });
  }
}
