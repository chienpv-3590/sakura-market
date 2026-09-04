import { NextResponse } from "next/server";
import type { SupabaseClient } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/lib/db/types";
import { requireRole } from "@/lib/auth/require-role";
import { writeAuditLog } from "@/lib/audit/write-audit-log";
import { cancelTransaction } from "@/lib/transactions/cancel-transaction";

function parseReason(body: unknown): string | null {
  if (typeof body !== "object" || body === null) return null;
  const reason = (body as Record<string, unknown>).reason;
  if (typeof reason !== "string") return null;
  const trimmed = reason.trim();
  return trimmed.length > 0 ? trimmed : null;
}

// A3 (FR-AITAI-03). Locked-day handling matches phase-07 Implementation
// Steps #5: attempt the write, catch the trigger's P0001, THEN write the
// `locked_write_attempt` audit row as a fresh statement of its own (the
// failed UPDATE was already rolled back by Postgres and cannot carry a
// write alongside it -- see cancel-transaction.ts's own note).
export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
): Promise<NextResponse> {
  const user = await requireRole(["ROLE-TRADE"]);
  const { id } = await params;

  let rawBody: unknown;
  try {
    rawBody = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }
  const reason = parseReason(rawBody);
  if (!reason) return NextResponse.json({ error: "reason_required" }, { status: 422 });

  try {
    const supabase: SupabaseClient<Database> = await createClient();
    const result = await cancelTransaction(supabase, id, user.id, reason);

    if (result.ok) {
      return NextResponse.json({ status: "cancelled" });
    }
    if (result.reason === "LOCKED_BUSINESS_DATE") {
      await writeAuditLog(supabase, {
        actorId: user.id,
        action: "locked_write_attempt",
        entity: "transaction",
        entityId: id,
        before: null,
        after: null,
        reason,
      });
      return NextResponse.json({ reason: result.reason }, { status: 423 });
    }
    return NextResponse.json({ reason: result.reason }, { status: 409 });
  } catch (err) {
    console.error(`[api/transactions/${id}/cancel] POST unexpected error`, err);
    return NextResponse.json({ error: "internal_error" }, { status: 500 });
  }
}
