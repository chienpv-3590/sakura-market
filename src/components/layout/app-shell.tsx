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

  return (
    <div className="flex min-h-screen">
      <SidebarNav role={user.role} />
      <div className="flex flex-1 flex-col">
        <AppShellHeader />
        <main className="flex-1 px-6 py-8">{children}</main>
      </div>
    </div>
  );
}
