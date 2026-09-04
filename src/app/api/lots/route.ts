import { NextResponse } from "next/server";
import type { SupabaseClient } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/server";
import type { Database, TablesInsert } from "@/lib/db/types";
import { requireRole, requireUser } from "@/lib/auth/require-role";
import { writeAuditLog } from "@/lib/audit/write-audit-log";
import { todayJst } from "@/lib/db/business-date";
import { formatLotCode, nextLotSeq } from "@/lib/lots/lot-code";

// FR-LOT-01: create a lot (A1). `intake_docs` is receipt-document *metadata*
// only (no real upload in LAB-3 -- see technical-spec.md § 5.2 Assumptions).
// There is no `lot.intake_docs` column (schema is Phase 03's, out of this
// phase's file scope), so it's captured on the creation audit_log row
// instead -- which FR-AUDIT-01 already requires for a "create" action, so
// this reuses a write we need anyway rather than adding new DB surface.
type CreateLotBody = {
  item: string;
  packageCount: number;
  initialQty: number;
  intakeDocs: string | null;
};

function parseCreateLotBody(body: unknown): CreateLotBody | null {
  if (typeof body !== "object" || body === null) return null;
  const b = body as Record<string, unknown>;
  const item = typeof b.item === "string" ? b.item.trim() : "";
  const packageCount = b.packageCount;
  const initialQty = b.initialQty;
  const intakeDocsRaw = b.intakeDocs;

  if (item.length === 0) return null;
  if (typeof packageCount !== "number" || !Number.isInteger(packageCount) || packageCount <= 0) {
    return null;
  }
  if (typeof initialQty !== "number" || !Number.isFinite(initialQty) || initialQty <= 0) {
    return null;
  }
  if (intakeDocsRaw !== undefined && intakeDocsRaw !== null && typeof intakeDocsRaw !== "string") {
    return null;
  }

  return {
    item,
    packageCount,
    initialQty,
    intakeDocs: typeof intakeDocsRaw === "string" ? intakeDocsRaw.trim() || null : null,
  };
}

const MAX_LOT_CODE_ATTEMPTS = 2; // 1 retry on a lot_code unique-violation race

async function handleCreate(request: Request, actorId: string): Promise<NextResponse> {
  let rawBody: unknown;
  try {
    rawBody = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const body = parseCreateLotBody(rawBody);
  if (!body) {
    return NextResponse.json({ error: "invalid_request" }, { status: 422 });
  }

  const supabase: SupabaseClient<Database> = await createClient();
  const businessDate = todayJst();
  let lastMessage = "";

  for (let attempt = 0; attempt < MAX_LOT_CODE_ATTEMPTS; attempt++) {
    const seq = await nextLotSeq(supabase, businessDate);
    const lotCode = formatLotCode(businessDate, seq);
    const insertRow: TablesInsert<"lot"> = {
      lot_code: lotCode,
      item: body.item,
      package_count: body.packageCount,
      initial_qty: body.initialQty,
      available_qty: body.initialQty,
      business_date: businessDate,
      status: "received",
    };

    const { data, error } = await supabase.from("lot").insert(insertRow).select().single();

    if (!error && data) {
      await writeAuditLog(supabase, {
        actorId,
        action: "create",
        entity: "lot",
        entityId: data.id,
        before: null,
        after: { ...data, intake_docs: body.intakeDocs },
      });
      return NextResponse.json({ id: data.id, lotCode: data.lot_code }, { status: 201 });
    }

    if (error.code === "23505") {
      lastMessage = error.message;
      continue; // lot_code collision -- retry once against a fresh count
    }
    throw new Error(`POST /api/lots insert failed: ${error.message}`);
  }

  throw new Error(`POST /api/lots: lot_code collision persisted after retry: ${lastMessage}`);
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
