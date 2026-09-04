import { cache } from "react";
import { notFound, redirect } from "next/navigation";
import type { SupabaseClient } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/lib/db/types";
import { isRole, type Role } from "@/lib/auth/role-landing";

export type CurrentUser = {
  id: string;
  email: string;
  displayName: string | null;
  role: Role;
};

/**
 * Resolves the signed-in `app_user` row for the current request, or `null`
 * when there is no valid session, no matching row, or the account is
 * inactive.
 *
 * `read_all_active_users` (RLS on `app_user`) requires the caller's own row
 * to have `is_active = true` before ANY select succeeds -- including
 * selecting its own row. So an inactive account's select comes back empty
 * exactly like "row doesn't exist". That ambiguity is intentional here: fail
 * closed either way, never widen access by guessing which case it was.
 *
 * Wrapped in `React.cache()` so the whole render tree of one request shares
 * a single query (phase-04 risk: requireUser() re-querying on every render).
 */
export const getCurrentUser = cache(async function getCurrentUser(): Promise<CurrentUser | null> {
  const supabase: SupabaseClient<Database> = await createClient();

  // A getClaims() error (expired/invalid JWT) is treated the same as "no
  // session" -- fail closed, matching lib/supabase/proxy.ts's own handling.
  const { data: claimsData } = await supabase.auth.getClaims();
  const userId = claimsData?.claims.sub;
  if (!userId) return null;

  const { data, error } = await supabase
    .from("app_user")
    .select("id, email, display_name, role, is_active")
    .eq("id", userId)
    .maybeSingle();

  if (error) {
    throw new Error(`getCurrentUser: app_user lookup failed: ${error.message}`);
  }
  if (!data || !data.is_active || !isRole(data.role)) return null;

  return {
    id: data.id,
    email: data.email,
    displayName: data.display_name,
    role: data.role,
  };
});

/** Tầng 2 gate: redirect to /login unless there is a valid, active app_user. */
export async function requireUser(): Promise<CurrentUser> {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login?reason=inactive");
  }
  return user;
}

/**
 * Role gate on top of requireUser(). 404s rather than showing a "forbidden"
 * page, so an unauthorized role gets no signal about what exists behind the
 * guard. Call this at the top of both Server Components AND Route Handlers
 * for anything role-restricted -- guarding only the UI is a soft guard.
 */
export async function requireRole(roles: readonly Role[]): Promise<CurrentUser> {
  const user = await requireUser();
  if (!roles.includes(user.role)) {
    notFound();
  }
  return user;
}
