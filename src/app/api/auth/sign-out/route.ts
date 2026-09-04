import { NextResponse } from "next/server";
import type { SupabaseClient } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import type { Database } from "@/lib/db/types";
import { writeAuditLog } from "@/lib/audit/write-audit-log";

// A2 · POST /api/auth/sign-out -- audit BEFORE signOut(), because signOut()
// clears the session this handler needs to know who the actor was.
export async function POST(): Promise<NextResponse> {
  try {
    const supabase: SupabaseClient<Database> = await createClient();
    const { data: claimsData } = await supabase.auth.getClaims();
    const userId = claimsData?.claims.sub ?? null;

    if (userId) {
      // Admin client so the audit write always succeeds even if the account
      // was deactivated mid-session -- audit_log's RLS insert policy
      // requires is_active=true, which we cannot assume here.
      const admin: SupabaseClient<Database> = createAdminClient();
      await writeAuditLog(admin, {
        actorId: userId,
        action: "logout",
        entity: "app_user",
        entityId: userId,
      });
    }

    await supabase.auth.signOut();
    return NextResponse.json({ redirectTo: "/login" });
  } catch (err) {
    console.error("[auth/sign-out] unexpected error", err);
    return NextResponse.json({ error: "internal_error" }, { status: 500 });
  }
}
