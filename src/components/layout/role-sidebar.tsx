"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useT } from "@/lib/i18n/i18n-provider";
import { NAV_GROUPS } from "@/lib/nav-items";
import type { Role } from "@/lib/auth/role-landing";
import { useNavState } from "./nav-shell";
import { NAV_ICON_FOR_SLUG, NavIcon } from "./nav-icons";

// Port of the design system's RoleSidebar.jsx onto this app's role-aware nav.
// The DS component computes `sections` from its own ROLE_NAV table; here the
// table is lib/nav-items.ts and the filter is the same one that was already
// in place -- nothing about WHO SEES WHAT changed in this pass.
//
// Presentation only: it never decides who CAN act, only what to show. The real
// gate is still requireRole() on the destination page/API; hiding a link is a
// legibility improvement, not a substitute for that check.
//
// The active item is marked three ways at once -- --sidebar-active fill, white
// text, and aria-current="page" -- so it reads on a dim floor and never
// depends on colour alone. In the collapsed rail the label is gone, so each
// item keeps `title` (pointer) and `aria-label` (AT).
export function RoleSidebar({ role }: { role: Role }) {
  const t = useT();
  const pathname = usePathname();
  const { expanded } = useNavState();

  const visibleGroups = NAV_GROUPS.map((group) => ({
    ...group,
    items: group.items.filter((item) => !item.roles || item.roles.includes(role)),
  })).filter((group) => group.items.length > 0);

  return (
    <nav
      className={`cds-rolenav ${expanded ? "cds-rolenav--expanded" : "cds-rolenav--collapsed"}`}
      aria-label={t("nav.sidebarLabel")}
    >
      <Link href="/" className="cds-rolenav__head" aria-label={t("nav.brandLabel")}>
        <span className="cds-rolenav__mark">
          <NavIcon name="dashboard" />
        </span>
        <span className="cds-rolenav__brand" aria-hidden={!expanded}>
          <span className="cds-rolenav__name">{t("app.name")}</span>
          <span className="cds-rolenav__subtitle">{t(`role.${role}`)}</span>
        </span>
      </Link>

      <div className="cds-rolenav__scroll">
        {visibleGroups.map((group) => (
          <div key={group.groupKey}>
            <div className="cds-rolenav__group">
              {expanded ? t(group.groupKey) : "···"}
            </div>
            {group.items.map((item) => {
              const active =
                pathname === item.href || pathname.startsWith(`${item.href}/`);
              const label = t(item.labelKey);
              return (
                <Link
                  key={item.slug}
                  href={item.href}
                  title={label}
                  aria-label={label}
                  aria-current={active ? "page" : undefined}
                  className={`cds-rolenav__item ${active ? "cds-rolenav__item--active" : ""}`}
                >
                  <span className="cds-rolenav__ico">
                    <NavIcon name={NAV_ICON_FOR_SLUG[item.slug] ?? "dashboard"} />
                  </span>
                  <span className="cds-rolenav__label">{label}</span>
                </Link>
              );
            })}
          </div>
        ))}
      </div>
    </nav>
  );
}
