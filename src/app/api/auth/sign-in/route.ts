import { NextResponse } from "next/server";
import type { SupabaseClient } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import type { Database } from "@/lib/db/types";
import { writeAuditLog } from "@/lib/audit/write-audit-log";
import { registerFailure, clearFailures } from "@/lib/auth/lockout";
import { isRole, roleLanding } from "@/lib/auth/role-landing";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// One body, byte-identical, for every rejection branch below -- wrong
// password, locked account, and inactive account must never be
// distinguishable to the caller (authandrole/technical-spec.md § 5.3,
// phase-04 Key Insight: don't let a stranger probe which emails exist).
function genericFailure(status: number) {
  return NextResponse.json({ error: "invalid_credentials" }, { status });
}

type AppUserForLogin = {
  id: string;
  role: string;
  is_active: boolean;
  failed_login_count: number;
  locked_until: string | null;
};

async function handleSignIn(request: Request): Promise<NextResponse> {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const rawEmail = (body as { email?: unknown } | null)?.email;
  const password = (body as { password?: unknown } | null)?.password;
  if (
    typeof rawEmail !== "string" ||
    typeof password !== "string" ||
    !EMAIL_PATTERN.test(rawEmail) ||
    password.length === 0
  ) {
    return NextResponse.json({ error: "invalid_request" }, { status: 400 });
  }
  const email = rawEmail.trim().toLowerCase();

  const admin: SupabaseClient<Database> = createAdminClient();
  const { data: appUser, error: lookupError } = await admin
    .from("app_user")
    .select("id, role, is_active, failed_login_count, locked_until")
    .eq("email", email)
    .maybeSingle();

  if (lookupError) {
    throw new Error(`sign-in: app_user lookup failed: ${lookupError.message}`);
  }

  // 1. Already locked -- reject before ever touching Supabase Auth.
  if (appUser?.locked_until && new Date(appUser.locked_until).getTime() > Date.now()) {
    await writeAuditLog(admin, {
      actorId: appUser.id,
      action: "login_locked",
      entity: "app_user",
      entityId: appUser.id,
    });
    return genericFailure(403);
  }

  // 2. Real credential check -- via the request's own server client so a
  // successful attempt sets the session cookie on this response.
  const supabase: SupabaseClient<Database> = await createClient();
  const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (authError || !authData.session) {
    // 2a. Wrong password (or unknown email). Admin client: no session
    // exists yet for RLS to authenticate against.
    if (appUser) {
      await registerFailure(appUser.id, appUser.failed_login_count);
    }
    await writeAuditLog(admin, {
      actorId: appUser?.id ?? null,
      action: "login_failed",
      entity: "app_user",
      entityId: appUser?.id ?? email,
    });
    return genericFailure(401);
  }

  // 2b. Password correct but the account is not active -- reject and drop
  // the session Supabase Auth just created. Admin client again: is_active
  // false makes private.current_user_role() null, so the authenticated
  // client itself can't satisfy audit_log's RLS insert check right now.
  if (!appUser || !appUser.is_active) {
    await supabase.auth.signOut();
    await writeAuditLog(admin, {
      actorId: appUser?.id ?? authData.user.id,
      action: "login_inactive",
      entity: "app_user",
      entityId: appUser?.id ?? authData.user.id,
    });
    return genericFailure(401);
  }

  return signInSuccess(supabase, appUser);
}

async function signInSuccess(
  supabase: SupabaseClient<Database>,
  appUser: AppUserForLogin,
): Promise<NextResponse> {
  if (!isRole(appUser.role)) {
    // Unreachable in practice -- app_user.role carries a DB CHECK
    // constraint over the 7 TBL-ROLE-01 values (Phase 03 core_identity.sql).
    throw new Error(`sign-in: app_user ${appUser.id} has unrecognized role "${appUser.role}"`);
  }

  await clearFailures(appUser.id);
  // Active session now exists and is_active=true, so the request's own
  // client can satisfy audit_log's RLS insert policy directly.
  await writeAuditLog(supabase, {
    actorId: appUser.id,
    action: "login_success",
    entity: "app_user",
    entityId: appUser.id,
  });

  return NextResponse.json({ redirectTo: roleLanding(appUser.role) });
}

export async function POST(request: Request): Promise<NextResponse> {
  try {
    return await handleSignIn(request);
  } catch (err) {
    console.error("[auth/sign-in] unexpected error", err);
    return NextResponse.json({ error: "internal_error" }, { status: 500 });
  }
}
