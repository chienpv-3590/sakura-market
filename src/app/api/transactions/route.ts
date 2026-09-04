import { NextResponse } from "next/server";
import type { SupabaseClient } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/server";
import type { Database, TablesInsert } from "@/lib/db/types";
import { requireRole, requireUser } from "@/lib/auth/require-role";
import { writeAuditLog } from "@/lib/audit/write-audit-log";
import { todayJst } from "@/lib/db/business-date";
import { formatTxnCode, nextTxnSeq } from "@/lib/transactions/txn-code";

// A1 (FR-AITAI-01): draft only, no eligibility/quantity gate here -- those
// are A2's job exclusively (BR-PERM-01, see confirm-transaction.ts's own
// comment on why calling checkParticipantEligibility from THIS route would
// be the exact bug Success Criteria #1 is designed to catch).
type CreateTransactionBody = {
  lotId: string;
  buyerParticipantId: string;
  qty: number;
  unitPrice: number;
};

function parseCreateBody(body: unknown): CreateTransactionBody | null {
  if (typeof body !== "object" || body === null) return null;
  const b = body as Record<string, unknown>;
  const lotId = typeof b.lotId === "string" ? b.lotId.trim() : "";
  const buyerParticipantId = typeof b.buyerParticipantId === "string" ? b.buyerParticipantId.trim() : "";
  const qty = b.qty;
  const unitPrice = b.unitPrice;

  if (lotId.length === 0 || buyerParticipantId.length === 0) return null;
  if (typeof qty !== "number" || !Number.isFinite(qty) || qty <= 0) return null;
  if (typeof unitPrice !== "number" || !Number.isInteger(unitPrice) || unitPrice <= 0) return null;

  return { lotId, buyerParticipantId, qty, unitPrice };
}

const MAX_TXN_CODE_ATTEMPTS = 2; // 1 retry on a txn_code unique-violation race

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

  // Boundary check: the lot must be a real, currently 'published' lot --
  // SCR007's dropdown already restricts to this, but the API must not trust
  // whatever id the client actually posts.
  const { data: lot, error: lotError } = await supabase
    .from("lot")
    .select("id, status")
    .eq("id", body.lotId)
    .maybeSingle();
  if (lotError) throw new Error(`POST /api/transactions: lot lookup failed: ${lotError.message}`);
  if (!lot || lot.status !== "published") {
    return NextResponse.json({ error: "lot_not_available" }, { status: 422 });
  }

  // business_date is always server-computed (todayJst()), never taken from
  // the client -- same precedent as POST /api/lots.
  const businessDate = todayJst();
  let lastMessage = "";

  for (let attempt = 0; attempt < MAX_TXN_CODE_ATTEMPTS; attempt++) {
    const seq = await nextTxnSeq(supabase, businessDate);
    const txnCode = formatTxnCode(businessDate, seq);
    const insertRow: TablesInsert<"transaction"> = {
      txn_code: txnCode,
      lot_id: body.lotId,
      buyer_participant_id: body.buyerParticipantId,
      qty: body.qty,
      unit_price: body.unitPrice,
      business_date: businessDate,
      status: "draft",
    };

    const { data, error } = await supabase.from("transaction").insert(insertRow).select().single();

    if (!error && data) {
      await writeAuditLog(supabase, {
        actorId,
        action: "create",
        entity: "transaction",
        entityId: data.id,
        before: null,
        after: data,
      });
      return NextResponse.json({ id: data.id, txnCode: data.txn_code }, { status: 201 });
    }

    if (error.code === "23505") {
      lastMessage = error.message;
      continue; // txn_code collision -- retry once against a fresh count
    }
    if (error.code === "23503") {
      return NextResponse.json({ error: "invalid_request" }, { status: 422 });
    }
    throw new Error(`POST /api/transactions insert failed: ${error.message}`);
  }

  throw new Error(`POST /api/transactions: txn_code collision persisted after retry: ${lastMessage}`);
}

async function handleList(request: Request): Promise<NextResponse> {
  const supabase: SupabaseClient<Database> = await createClient();
  const url = new URL(request.url);
  const businessDate = url.searchParams.get("businessDate");
  const status = url.searchParams.get("status");

  let query = supabase.from("transaction").select("*").order("created_at", { ascending: false }).limit(100);
  if (businessDate) query = query.eq("business_date", businessDate);
  if (status) query = query.eq("status", status);

  const { data, error } = await query;
  if (error) throw new Error(`GET /api/transactions failed: ${error.message}`);
  return NextResponse.json({ transactions: data });
}

export async function POST(request: Request): Promise<NextResponse> {
  const user = await requireRole(["ROLE-TRADE"]);
  try {
    return await handleCreate(request, user.id);
  } catch (err) {
    console.error("[api/transactions] POST unexpected error", err);
    return NextResponse.json({ error: "internal_error" }, { status: 500 });
  }
}

export async function GET(request: Request): Promise<NextResponse> {
  await requireUser();
  try {
    return await handleList(request);
  } catch (err) {
    console.error("[api/transactions] GET unexpected error", err);
    return NextResponse.json({ error: "internal_error" }, { status: 500 });
  }
}
