import { NextResponse } from "next/server";
import type { SupabaseClient } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/lib/db/types";
import { requireUser } from "@/lib/auth/require-role";
import { listDeliveries } from "@/lib/deliveries/delivery-queries";

// A1 (FR-DEL-01) -- SCR011. Read-only for any active role (RLS's
// read_all_active_users already allows this; ROLE-DELIVERY is the primary
// consumer, ROLE-SETTLEMENT reads it from F007's cross-link).
export async function GET(request: Request): Promise<NextResponse> {
  await requireUser();
  try {
    const url = new URL(request.url);
    const status = url.searchParams.get("status") ?? undefined;
    const businessDate = url.searchParams.get("businessDate") ?? undefined;

    const supabase: SupabaseClient<Database> = await createClient();
    const deliveries = await listDeliveries(supabase, { status, businessDate });
    return NextResponse.json({ deliveries });
  } catch (err) {
    console.error("[api/deliveries] GET unexpected error", err);
    return NextResponse.json({ error: "internal_error" }, { status: 500 });
  }
}
