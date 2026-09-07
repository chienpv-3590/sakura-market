import type { ReactNode } from "react";

/**
 * One 20px glyph per sidebar entry.
 *
 * `.cds-rolenav__ico svg` sizes them; the icon idiom is the design system's
 * own -- viewBox 0 0 24 24, no fill, `currentColor` stroke at 2, round caps
 * and joins -- so an icon inherits the item's colour in all three sidebar
 * states (rest --text-on-dark-muted, hover --text-on-dark, active #fff).
 *
 * `dashboard`, `building`, `contract`, `chart`, `wallet`, `settings`,
 * `tasks`, `folder` and `users` are lifted verbatim from RoleSidebar.jsx's
 * ICONS map.
 * `truck`, `filePen` and `award` are NOT in that map -- this app has business
 * stages a property-management product does not -- so they are drawn in the
 * same idiom from the same Lucide set the DS map is taken from.
 *
 * Icons are decoration: `aria-hidden` here, and every sidebar item carries a
 * real text label (or, in the collapsed rail, a `title` + `aria-label`).
 */
const PATHS: Record<string, ReactNode> = {
  dashboard: (
    <>
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
    </>
  ),
  building: (
    <>
      <rect x="4" y="2" width="16" height="20" rx="1" />
      <path d="M9 6h.01M15 6h.01M9 10h.01M15 10h.01M9 14h.01M15 14h.01M10 22v-4h4v4" />
    </>
  ),
  contract: (
    <>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
      <path d="M14 2v6h6M9 15l2 2 4-4" />
    </>
  ),
  chart: (
    <>
      <path d="M3 3v18h18" />
      <path d="M7 15l4-4 3 3 5-6" />
    </>
  ),
  truck: (
    <>
      <path d="M14 17V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v9a1 1 0 0 0 1 1h2" />
      <path d="M9 17h6" />
      <path d="M19 17h2a1 1 0 0 0 1-1v-3.6a1 1 0 0 0-.22-.62l-3.48-4.35A1 1 0 0 0 17.52 7H14" />
      <circle cx="7" cy="18" r="2" />
      <circle cx="17" cy="18" r="2" />
    </>
  ),
  wallet: (
    <>
      <path d="M19 7V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h13a2 2 0 0 0 2-2v-2" />
      <path d="M21 12h-6a2 2 0 0 0 0 4h6v-4Z" />
    </>
  ),
  filePen: (
    <>
      <path d="M13 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h6" />
      <path d="M13 3v5h5" />
      <path d="M21 12.5 15.5 18H13v-2.5L18.5 10z" />
    </>
  ),
  award: (
    <>
      <circle cx="12" cy="8" r="6" />
      <path d="M15.48 12.89 17 22l-5-3-5 3 1.52-9.11" />
    </>
  ),
  settings: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z" />
    </>
  ),
  folder: (
    <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" />
  ),
  tasks: (
    <>
      <path d="M11 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-6" />
      <path d="m9 11 3 3L22 4" />
    </>
  ),
  users: (
    <>
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </>
  ),
};

/** Nav-item slug (lib/nav-items.ts) -> glyph. `dashboard` is the brand/home. */
export const NAV_ICON_FOR_SLUG: Record<string, string> = {
  lots: "building",
  transactions: "contract",
  seri: "chart",
  deliveries: "truck",
  reconciliation: "wallet",
  corrections: "filePen",
  incentive: "award",
  "incentive-rules": "settings",
  reports: "folder",
  participants: "users",
};

export function NavIcon({ name }: { name: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {PATHS[name] ?? PATHS.dashboard}
    </svg>
  );
}
