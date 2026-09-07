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
      <span className="text-secondary">
        <span className="font-medium text-strong">{displayName ?? "-"}</span>
        <span className="ml-2 text-muted">{t(`role.${role}`)}</span>
      </span>
      <button
        type="button"
        onClick={handleSignOut}
        disabled={signingOut}
        className="sm-btn sm-btn-secondary"
      >
        {t("auth.signOut")}
      </button>
    </div>
  );
}
