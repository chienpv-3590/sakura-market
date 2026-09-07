import type { ReactNode } from "react";
import { getCurrentUser } from "@/lib/auth/require-role";
import { AppShellHeader } from "./app-shell-header";
import { SidebarNav } from "./sidebar-nav";

// getCurrentUser() is React.cache()-wrapped -- (app)/layout.tsx already
// called requireUser() (which calls it) earlier in this same request, so
// this doesn't add a second app_user query.
export async function AppShell({ children }: { children: ReactNode }) {
  const user = await getCurrentUser();
  if (!user) {
    // Unreachable in practice: (app)/layout.tsx's requireUser() already
    // redirected to /login before AppShell ever renders. Fail loud instead
    // of silently rendering a shell with no role context.
    throw new Error("AppShell: no active user after requireUser() gate");
  }

  // Stacks below lg: a 224px fixed sidebar next to content leaves nothing
  // usable on a 390px screen, so the nav becomes a full-width band above the
  // content instead of a column beside it.
  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      <SidebarNav role={user.role} />
      <div className="flex min-w-0 flex-1 flex-col">
        <AppShellHeader />
        <main className="min-w-0 flex-1 bg-page px-4 py-6 sm:px-6 sm:py-8">{children}</main>
      </div>
    </div>
  );
}
