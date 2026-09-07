"use client";

import { useT } from "@/lib/i18n/i18n-provider";
import type { Role } from "@/lib/auth/role-landing";
import { useNavState } from "./nav-shell";
import { PageBreadcrumb } from "./page-breadcrumb";
import { BusinessDayIndicator } from "./business-day-indicator";
import { LocaleSwitcher } from "./locale-switcher";
import { UserMenu } from "./user-menu";

// Port of the design system's TopHeader.jsx. One 56px row (--topbar-h), and
// the rail toggle on its left is the sole trigger for the shell's nav state --
// exactly the contract AppShell.jsx documents.
//
// Left  : toggle + where-you-are (breadcrumb).
// Right : today's JST business day and its lock state, the VI/JA switch, and
//         who you are + sign out.
//
// The business day sits in the header because nearly every write screen in
// this system refuses input once the day is locked; an operator must never
// have to navigate to /reconciliation to find that out. Below --bp-tablet the
// wordy parts drop and the lock BADGE stays -- it is the part that changes
// what the app will accept.
export function TopHeader({
  businessDate,
  locked,
  displayName,
  role,
}: {
  businessDate: string;
  locked: boolean;
  displayName: string | null;
  role: Role;
}) {
  const t = useT();
  const { expanded, toggle } = useNavState();

  return (
    <header className="cds-topheader">
      <div className="cds-topheader__left min-w-0">
        <button
          type="button"
          className="cds-topheader__toggle"
          onClick={toggle}
          aria-label={t(expanded ? "nav.collapse" : "nav.expand")}
          aria-expanded={expanded}
          aria-controls="app-nav"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <path className="cds-topheader__panel" d="M9 3v18" />
          </svg>
        </button>
        {/* From --bp-web up only. Below it the header has to give the lock
            badge, the VI/JA switch and sign-out room first, and the crumb
            trail is the one redundant item here: the active rail entry and
            the 24px page title both already say where you are. */}
        <div className="hidden min-w-0 lg:block">
          <PageBreadcrumb />
        </div>
      </div>

      <div className="cds-topheader__right min-w-0">
        <BusinessDayIndicator businessDate={businessDate} locked={locked} />
        <LocaleSwitcher />
        <UserMenu displayName={displayName} role={role} />
      </div>
    </header>
  );
}
