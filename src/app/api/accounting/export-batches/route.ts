import { NextResponse } from "next/server";
import type { SupabaseClient } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/lib/db/types";
import { requireRole } from "@/lib/auth/require-role";
import { isValidReportDate } from "@/lib/reports/is-valid-report-date";
import { createExportBatch } from "@/lib/accounting/create-export-batch";
import type { CreateExportBatchReason } from "@/lib/accounting/create-export-batch";

const STATUS_BY_REASON: Record<CreateExportBatchReason, number> = {
  DAY_NOT_LOCKED: 409,
  // Two exports raced the same `seq` 5 times running -- an extremely rare
  // contention case, not a "bad request"; 409 (same bucket as
  // DAY_NOT_LOCKED) is the closest fit in this app's own status-code table.
  SEQ_RACE_EXHAUSTED: 409,
};

interface CreateBatchBody {
  businessDate: string;
}

function parseBody(body: unknown): CreateBatchBody | null {
  if (typeof body !== "object" || body === null) return null;
  const b = body as Record<string, unknown>;
  if (typeof b.businessDate !== "string" || !isValidReportDate(b.businessDate)) return null;
  return { businessDate: b.businessDate };
}

// IF-ACC-01 write path (phase-03 §Architecture, §Key Insights #1). POST
// only -- GET must stay safe, so this is the ONLY route that can insert an
// accounting_export_batch row. `requireRole` gates BEFORE the body is even
// read (wrong role -> 404, matching every other ROLE-SETTLEMENT write route
// in this codebase); the RLS insert policy is the second, independent gate.
export async function POST(request: Request): Promise<NextResponse> {
  const user = await requireRole(["ROLE-SETTLEMENT"]);

  let rawBody: unknown;
  try {
    rawBody = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }
  const body = parseBody(rawBody);
  if (!body) {
    return NextResponse.json({ reason: "INVALID_BUSINESS_DATE" }, { status: 422 });
  }

  try {
    const supabase: SupabaseClient<Database> = await createClient();
    const result = await createExportBatch(supabase, body.businessDate, user.id);
    if (result.ok) {
      return NextResponse.json({ batchCode: result.batch.batch_code }, { status: 201 });
    }
    return NextResponse.json({ reason: result.reason }, { status: STATUS_BY_REASON[result.reason] });
  } catch (err) {
    console.error("[api/accounting/export-batches] POST unexpected error", err);
    return NextResponse.json({ error: "internal_error" }, { status: 500 });
  }
}
