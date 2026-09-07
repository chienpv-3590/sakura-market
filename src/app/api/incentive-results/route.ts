import { NextResponse } from "next/server";
import type { SupabaseClient } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/lib/db/types";
import { requireRole } from "@/lib/auth/require-role";
import { todayJst } from "@/lib/db/business-date";
import { listIncentiveResults } from "@/lib/incentive/incentive-result-queries";
import { isValidPeriod } from "@/lib/incentive/is-valid-period";

// A6 (FR-303, US003) -- SCR016. Read-only; every row already carries the
// rule version + effective date used to produce it (FR-AUDIT-03).
export async function GET(request: Request): Promise<NextResponse> {
  await requireRole(["ROLE-SETTLEMENT"]);

  const url = new URL(request.url);
  const periodParam = url.searchParams.get("period");
  const participantId = url.searchParams.get("participantId") ?? undefined;
  const period = periodParam && isValidPeriod(periodParam) ? periodParam : todayJst();

  try {
    const supabase: SupabaseClient<Database> = await createClient();
    const results = await listIncentiveResults(supabase, { period, participantId });
    return NextResponse.json({ period, results });
  } catch (err) {
    console.error("[api/incentive-results] GET unexpected error", err);
    return NextResponse.json({ error: "internal_error" }, { status: 500 });
  }
}
