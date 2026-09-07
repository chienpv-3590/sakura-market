import type { SupabaseClient } from "@supabase/supabase-js";
import type { ReactNode } from "react";
import { getCurrentUser } from "@/lib/auth/require-role";
import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/lib/db/types";
import { todayJst } from "@/lib/db/business-date";
import { loadLockStatus } from "@/lib/reconciliation/reconciliation-queries";
import { NavShell } from "./nav-shell";
import { RoleSidebar } from "./role-sidebar";
import { TopHeader } from "./top-header";

// getCurrentUser() is React.cache()-wrapped -- (app)/layout.tsx already
// called requireUser() (which calls it) earlier in this same request, so
// this doesn't add a second app_user query.
//
// Shape is the design system's AppShell: a 2-column grid whose first column
// is the dark navy rail (--sidebar-bg) and whose second column stacks the
// 56px topheader over a single scrolling body. The sidebar and header are
// rendered here (server) and handed to NavShell (client) as props, so the
// rail's collapse state can live in one client component without pulling the
// whole tree client-side.
export async function AppShell({ children }: { children: ReactNode }) {
  const user = await getCurrentUser();
  if (!user) {
    // Unreachable in practice: (app)/layout.tsx's requireUser() already
    // redirected to /login before AppShell ever renders. Fail loud instead
    // of silently rendering a shell with no role context.
    throw new Error("AppShell: no active user after requireUser() gate");
  }

  const businessDate = todayJst();
  const supabase: SupabaseClient<Database> = await createClient();
  const lock = await loadLockStatus(supabase, businessDate);

  return (
    <NavShell
      sidebar={<RoleSidebar role={user.role} />}
      header={
        <TopHeader
          businessDate={businessDate}
          locked={lock.locked}
          displayName={user.displayName}
          role={user.role}
        />
      }
    >
      <main className="min-w-0">{children}</main>
    </NavShell>
  );
}
