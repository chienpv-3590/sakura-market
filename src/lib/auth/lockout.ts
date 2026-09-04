import type { SupabaseClient } from "@supabase/supabase-js";
import { createAdminClient } from "@/lib/supabase/admin";
import type { Database } from "@/lib/db/types";

// NFR-SEC-03 open decision -- the RFP never quantified this threshold
// (authandrole/functional-spec.md § 3 Open Decisions). Prototype default,
// not a customer-confirmed requirement: lock after 5 consecutive failures,
// auto-unlock 15 minutes later. Cheap to retune once the customer chooses a
// real number -- these are the only two constants that would change.
export const MAX_FAILED_ATTEMPTS = 5;
export const LOCK_DURATION_MINUTES = 15;

// Assumption: `app_user` has no per-failure timestamp column (Phase 03's
// fixed schema, out of this phase's scope to alter), so "5 lần sai liên
// tiếp trong 15 phút" is approximated as "5 sai liên tiếp kể từ lần đăng
// nhập thành công hoặc lần khoá gần nhất" -- there is no rolling 15-minute
// window. A successful login always resets the counter (clearFailures), so
// this only under-locks when failures are sparse and spread over days, an
// acceptable trade-off for a 10h prototype.

/**
 * Records one failed sign-in attempt and locks the account once the
 * threshold is reached. Uses the admin client because this runs before any
 * session exists -- RLS has nothing to authenticate against yet.
 */
export async function registerFailure(userId: string, currentFailedCount: number): Promise<void> {
  const admin: SupabaseClient<Database> = createAdminClient();
  const nextCount = currentFailedCount + 1;
  const lockedUntil =
    nextCount >= MAX_FAILED_ATTEMPTS
      ? new Date(Date.now() + LOCK_DURATION_MINUTES * 60_000).toISOString()
      : null;

  const { error } = await admin
    .from("app_user")
    .update({ failed_login_count: nextCount, locked_until: lockedUntil })
    .eq("id", userId);

  if (error) {
    throw new Error(`registerFailure failed for user ${userId}: ${error.message}`);
  }
}

/** Resets the failure counter and clears any lock after a successful sign-in. */
export async function clearFailures(userId: string): Promise<void> {
  const admin: SupabaseClient<Database> = createAdminClient();
  const { error } = await admin
    .from("app_user")
    .update({ failed_login_count: 0, locked_until: null })
    .eq("id", userId);

  if (error) {
    throw new Error(`clearFailures failed for user ${userId}: ${error.message}`);
  }
}
