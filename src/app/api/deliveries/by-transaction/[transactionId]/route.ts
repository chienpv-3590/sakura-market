import { NextResponse } from "next/server";
import type { SupabaseClient } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/lib/db/types";
import { requireUser } from "@/lib/auth/require-role";
import { loadShipmentsByTransaction } from "@/lib/deliveries/delivery-queries";

// A4 (FR-DEL-04, US003) -- consumed by F007's reconciliation table (SCR013)
// to trace an aitai reconciliation line back to its shipments. Read-only for
// any active role; 200 + [] when the transaction has no shipments yet.
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ transactionId: string }> },
): Promise<NextResponse> {
  await requireUser();
  const { transactionId } = await params;

  try {
    const supabase: SupabaseClient<Database> = await createClient();
    const shipments = await loadShipmentsByTransaction(supabase, transactionId);
    return NextResponse.json({ shipments });
  } catch (err) {
    console.error(`[api/deliveries/by-transaction/${transactionId}] GET unexpected error`, err);
    return NextResponse.json({ error: "internal_error" }, { status: 500 });
  }
}
