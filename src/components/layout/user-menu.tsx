"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useT } from "@/lib/i18n/i18n-provider";
import type { Role } from "@/lib/auth/role-landing";

export function UserMenu({
  displayName,
  role,
}: {
  displayName: string | null;
  role: Role;
}) {
  const t = useT();
  const router = useRouter();
  const [signingOut, setSigningOut] = useState(false);

  async function handleSignOut() {
    if (signingOut) return;
    setSigningOut(true);
    try {
      const response = await fetch("/api/auth/sign-out", { method: "POST" });
      if (!response.ok) {
        throw new Error(`Sign-out failed with status ${response.status}`);
      }
    } catch (error) {
      // Sign-out failing client-side must not trap the user on the page --
      // fall through to the redirect regardless; proxy.ts bounces back to
      // /login on the next request if the session is somehow still valid.
      console.error("Sign-out request failed", error);
    } finally {
      // Dynamic routes default to a 0s client router-cache staleTime (Next
      // 16), so this always re-fetches -- no stale "still logged in" view.
      router.push("/login");
      router.refresh();
    }
  }

  return (
    <div className="flex items-center gap-3 text-sm">
      <span className="text-zinc-700">
        <span className="font-medium">{displayName ?? "-"}</span>
        <span className="ml-2 text-zinc-500">{t(`role.${role}`)}</span>
      </span>
      <button
        type="button"
        onClick={handleSignOut}
        disabled={signingOut}
        className="rounded-md border border-zinc-300 px-2 py-1 text-zinc-700 hover:bg-zinc-100 disabled:opacity-60"
      >
        {t("auth.signOut")}
      </button>
    </div>
  );
}
