"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useT } from "@/lib/i18n/i18n-provider";
import type { Role } from "@/lib/auth/role-landing";

// .cds-topheader__user is the design system's identity block: role above name
// at 11px/13px. The DS pairs it with a dropdown; this app has exactly one
// action behind it (sign out), so the action is rendered directly rather than
// buried one click deeper.
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
    <div className="cds-topheader__identity">
      <span className="cds-topheader__user hidden lg:flex">
        <span className="flex min-w-0 flex-col text-left leading-[1.3]">
          <span className="cds-topheader__role">{t(`role.${role}`)}</span>
          <span className="cds-topheader__uname truncate">{displayName ?? "-"}</span>
        </span>
      </span>
      {/* The label collapses to its glyph below 640px (see cds-app-layout.css)
          but never disappears: aria-label carries it, and it comes back as
          text the moment there is room. */}
      <button
        type="button"
        onClick={handleSignOut}
        disabled={signingOut}
        aria-label={t("auth.signOut")}
        className="cds-btn cds-btn--secondary cds-btn--sm"
      >
        <span className="cds-btn__ico" aria-hidden>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <path d="m16 17 5-5-5-5" />
            <path d="M21 12H9" />
          </svg>
        </span>
        <span className="hidden md:inline">{t("auth.signOut")}</span>
      </button>
    </div>
  );
}
