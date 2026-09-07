"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useT } from "@/lib/i18n/i18n-provider";
import { NAV_GROUPS, type NavItem } from "@/lib/nav-items";

// Flattened once at module scope -- NAV_GROUPS is static data, not per-render.
const ALL_ITEMS: readonly NavItem[] = NAV_GROUPS.flatMap((group) => group.items);

/**
 * Finds the nav item whose href is the longest matching prefix of pathname
 * -- e.g. both "/incentive" and "/incentive/rules" are real nav items, and
 * "/incentive/rules/abc" must resolve to the more specific one.
 */
function findSection(pathname: string): NavItem | null {
  let best: NavItem | null = null;
  for (const item of ALL_ITEMS) {
    const isMatch = pathname === item.href || pathname.startsWith(`${item.href}/`);
    if (isMatch && (!best || item.href.length > best.href.length)) {
      best = item;
    }
  }
  return best;
}

// Lightweight wayfinding rendered as the design system's .cds-breadcrumb:
// section name (from the nav item it matches) plus, at most, one generic
// suffix ("Tạo mới" / "Chi tiết") for whatever comes after it in the URL.
// Each page's own <h1> already carries the specific title -- this only
// orients at the header level ("which top-level area am I in").
export function PageBreadcrumb() {
  const t = useT();
  const pathname = usePathname();

  if (pathname === "/") {
    return <span className="cds-topheader__title">{t("app.name")}</span>;
  }

  const section = findSection(pathname);
  const rest = section ? pathname.slice(section.href.length).split("/").filter(Boolean) : [];
  const suffixKey = rest.length === 0 ? null : rest[0] === "new" ? "breadcrumb.new" : "breadcrumb.detail";

  return (
    <nav className="cds-breadcrumb" aria-label={t("nav.sidebarLabel")}>
      <Link href="/" className="cds-breadcrumb__item">
        {t("app.name")}
      </Link>
      {section && (
        <>
          <Separator />
          <span
            className={
              suffixKey
                ? "cds-breadcrumb__item"
                : "cds-breadcrumb__item cds-breadcrumb__item--current"
            }
          >
            {t(section.labelKey)}
          </span>
        </>
      )}
      {suffixKey && (
        <>
          <Separator />
          <span className="cds-breadcrumb__item cds-breadcrumb__item--current">
            {t(suffixKey)}
          </span>
        </>
      )}
    </nav>
  );
}

// The design system's chevron separator -- aria-hidden, so a screen reader
// reads the trail as a plain list of names.
function Separator() {
  return (
    <span className="cds-breadcrumb__sep" aria-hidden="true">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m9 18 6-6-6-6" />
      </svg>
    </span>
  );
}
