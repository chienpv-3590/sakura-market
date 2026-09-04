import { getCurrentUser } from "@/lib/auth/require-role";
import { LocaleSwitcher } from "./locale-switcher";
import { UserMenu } from "./user-menu";

// getCurrentUser() is React.cache()-wrapped -- (app)/layout.tsx already
// called requireUser() (which calls it) earlier in this same request, so
// this doesn't add a second app_user query.
export async function AppShellHeader() {
  const user = await getCurrentUser();

  return (
    <header className="flex items-center justify-between border-b border-zinc-200 px-6 py-3">
      <div>{user && <UserMenu displayName={user.displayName} role={user.role} />}</div>
      <LocaleSwitcher />
    </header>
  );
}
