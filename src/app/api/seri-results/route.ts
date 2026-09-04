import { NextResponse } from "next/server";
import type { SupabaseClient } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/server";
import type { Database, TablesInsert } from "@/lib/db/types";
import { requireRole, requireUser } from "@/lib/auth/require-role";
import { writeAuditLog } from "@/lib/audit/write-audit-log";
import { todayJst } from "@/lib/db/business-date";
import { findSeriResultByLot } from "@/lib/seri/seri-queries";

// A1 (FR-SERI-01, FR-SERI-02). Every field here is hand-typed by the
// operator -- no OCR, no image/signal recognition anywhere in this route
// (SCOPE-OUT-02). confirmed_by is a real app_user id (schema FK), not free
// text, so the FE offers a picker rather than a name field.
type CreateSeriBody = {
  lotId: string;
  winnerParticipantId: string;
  qty: number;
  unitPrice: number;
  decidedAt: string;
  confirmedBy: string;
};

function parseCreateBody(body: unknown): CreateSeriBody | null {
  if (typeof body !== "object" || body === null) return null;
  const b = body as Record<string, unknown>;
  const lotId = typeof b.lotId === "string" ? b.lotId.trim() : "";
  const winnerParticipantId = typeof b.winnerParticipantId === "string" ? b.winnerParticipantId.trim() : "";
  const confirmedBy = typeof b.confirmedBy === "string" ? b.confirmedBy.trim() : "";
  const decidedAtRaw = typeof b.decidedAt === "string" ? b.decidedAt.trim() : "";
  const qty = b.qty;
  const unitPrice = b.unitPrice;

  if (lotId.length === 0 || winnerParticipantId.length === 0 || confirmedBy.length === 0) return null;
  if (typeof qty !== "number" || !Number.isFinite(qty) || qty <= 0) return null;
  if (typeof unitPrice !== "number" || !Number.isInteger(unitPrice) || unitPrice <= 0) return null;

  const decidedAt = decidedAtRaw.length > 0 ? new Date(decidedAtRaw) : new Date();
  if (Number.isNaN(decidedAt.getTime())) return null;

  return { lotId, winnerParticipantId, qty, unitPrice, decidedAt: decidedAt.toISOString(), confirmedBy };
}

async function handleCreate(request: Request, actorId: string): Promise<NextResponse> {
  let rawBody: unknown;
  try {
    rawBody = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }
  const body = parseCreateBody(rawBody);
  if (!body) return NextResponse.json({ error: "invalid_request" }, { status: 422 });

  const supabase: SupabaseClient<Database> = await createClient();

  const { data: lot, error: lotError } = await supabase
    .from("lot")
    .select("id")
    .eq("id", body.lotId)
    .maybeSingle();
  if (lotError) throw new Error(`POST /api/seri-results: lot lookup failed: ${lotError.message}`);
  if (!lot) return NextResponse.json({ error: "lot_not_found" }, { status: 404 });

  const existing = await findSeriResultByLot(supabase, body.lotId);
  if (existing) {
    return NextResponse.json({ error: "already_recorded", id: existing.id }, { status: 409 });
  }

  const insertRow: TablesInsert<"seri_result"> = {
    lot_id: body.lotId,
    winner_participant_id: body.winnerParticipantId,
    qty: body.qty,
    unit_price: body.unitPrice,
    decided_at: body.decidedAt,
    confirmed_by: body.confirmedBy,
    business_date: todayJst(),
  };

  const { data, error } = await supabase.from("seri_result").insert(insertRow).select().single();
  if (error) {
    if (error.code === "23503") return NextResponse.json({ error: "invalid_request" }, { status: 422 });
    throw new Error(`POST /api/seri-results insert failed: ${error.message}`);
  }

  await writeAuditLog(supabase, {
    actorId,
    action: "create",
    entity: "seri_result",
    entityId: data.id,
    before: null,
    after: data,
  });

  return NextResponse.json({ id: data.id }, { status: 201 });
}

async function handleList(request: Request): Promise<NextResponse> {
  const supabase: SupabaseClient<Database> = await createClient();
  const url = new URL(request.url);
  const businessDate = url.searchParams.get("businessDate");
  const winnerId = url.searchParams.get("winnerId");

  let query = supabase.from("seri_result").select("*").order("created_at", { ascending: false }).limit(100);
  if (businessDate) query = query.eq("business_date", businessDate);
  if (winnerId) query = query.eq("winner_participant_id", winnerId);

  const { data, error } = await query;
  if (error) throw new Error(`GET /api/seri-results failed: ${error.message}`);
  return NextResponse.json({ seriResults: data });
}

export async function POST(request: Request): Promise<NextResponse> {
  const user = await requireRole(["ROLE-TRADE"]);
  try {
    return await handleCreate(request, user.id);
  } catch (err) {
    console.error("[api/seri-results] POST unexpected error", err);
    return NextResponse.json({ error: "internal_error" }, { status: 500 });
  }
}

export async function GET(request: Request): Promise<NextResponse> {
  await requireUser();
  try {
    return await handleList(request);
  } catch (err) {
    console.error("[api/seri-results] GET unexpected error", err);
    return NextResponse.json({ error: "internal_error" }, { status: 500 });
  }
}
