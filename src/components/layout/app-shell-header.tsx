import type { SupabaseClient } from "@supabase/supabase-js";
import { getCurrentUser } from "@/lib/auth/require-role";
import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/lib/db/types";
import { todayJst } from "@/lib/db/business-date";
import { loadLockStatus } from "@/lib/reconciliation/reconciliation-queries";
import { PageBreadcrumb } from "./page-breadcrumb";
import { BusinessDayIndicator } from "./business-day-indicator";
import { LocaleSwitcher } from "./locale-switcher";
import { UserMenu } from "./user-menu";

// getCurrentUser() is React.cache()-wrapped -- (app)/layout.tsx already
// called requireUser() (which calls it) earlier in this same request, so
// this doesn't add a second app_user query.
//
// Two rows: the top row is the domain-critical, always-true-for-everyone
// state (where you are + today's business day/lock); the bottom row is the
// session-level controls (who you are, sign out, locale).
export async function AppShellHeader() {
  const user = await getCurrentUser();
  const businessDate = todayJst();
  const supabase: SupabaseClient<Database> = await createClient();
  const lock = await loadLockStatus(supabase, businessDate);

  return (
    <header className="border-b border-line bg-card px-4 py-3 sm:px-6">
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
        <PageBreadcrumb />
        <BusinessDayIndicator businessDate={businessDate} locked={lock.locked} />
      </div>
      <div className="mt-2 flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-t border-line pt-2">
        <div>{user && <UserMenu displayName={user.displayName} role={user.role} />}</div>
        <LocaleSwitcher />
      </div>
    </header>
  );
}
