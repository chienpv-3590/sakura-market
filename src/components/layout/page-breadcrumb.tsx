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

// Lightweight wayfinding, not a full crumb trail: section name (from the nav
// item it matches) plus, at most, one generic suffix ("Tạo mới" / "Chi
// tiết") for whatever comes after it in the URL. Each page's own <h1>
// already carries the specific title -- this only orients at the header
// level ("which top-level area am I in").
export function PageBreadcrumb() {
  const t = useT();
  const pathname = usePathname();

  if (pathname === "/") {
    return <p className="text-sm font-semibold text-strong">{t("app.name")}</p>;
  }

  const section = findSection(pathname);
  const rest = section ? pathname.slice(section.href.length).split("/").filter(Boolean) : [];
  const suffixKey = rest.length === 0 ? null : rest[0] === "new" ? "breadcrumb.new" : "breadcrumb.detail";

  return (
    <p className="text-sm">
      <Link href="/" className="text-subtle hover:text-secondary">
        {t("app.name")}
      </Link>
      {section && (
        <>
          <span className="mx-1.5 text-subtle">/</span>
          <span className="font-semibold text-strong">{t(section.labelKey)}</span>
        </>
      )}
      {suffixKey && (
        <>
          <span className="mx-1.5 text-subtle">/</span>
          <span className="text-secondary">{t(suffixKey)}</span>
        </>
      )}
    </p>
  );
}
