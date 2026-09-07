"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useT } from "@/lib/i18n/i18n-provider";
import { NAV_GROUPS } from "@/lib/nav-items";
import type { Role } from "@/lib/auth/role-landing";

// Sidebar is presentation only -- it never decides who CAN act, it only
// decides what to show. The real gate is still requireRole() on the
// destination page/API; hiding a link here is a legibility improvement, not
// a substitute for that check.
//
// The active item is marked three ways at once -- a 4px brand rule on the
// leading edge, a filled background, and aria-current="page" -- so it reads
// at a glance on a dim floor and never depends on colour alone.
export function SidebarNav({ role }: { role: Role }) {
  const t = useT();
  const pathname = usePathname();

  const visibleGroups = NAV_GROUPS.map((group) => ({
    ...group,
    items: group.items.filter((item) => !item.roles || item.roles.includes(role)),
  })).filter((group) => group.items.length > 0);

  return (
    <nav className="w-full shrink-0 border-b border-line bg-card px-3 py-4 lg:w-56 lg:border-b-0 lg:border-r lg:py-6">
      <Link href="/" className="block px-3">
        <p className="text-base font-semibold text-strong">{t("app.name")}</p>
      </Link>
      <p className="mb-4 mt-2 px-3 lg:mb-6">
        <span className="sm-badge sm-tone-move">{t(`role.${role}`)}</span>
      </p>
      <ul className="grid grid-cols-2 gap-x-4 gap-y-5 sm:grid-cols-3 lg:grid-cols-1 lg:gap-y-6">
        {visibleGroups.map((group) => (
          <li key={group.groupKey}>
            <p className="mb-2 px-3 text-[11px] font-bold uppercase tracking-wider text-muted">
              {t(group.groupKey)}
            </p>
            <ul className="space-y-0.5">
              {group.items.map((item) => {
                const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
                return (
                  <li key={item.slug}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={`flex min-h-11 items-center border-l-4 pl-3 pr-3 text-sm ${
                        active
                          ? "border-brand bg-brand-subtle font-bold text-brand"
                          : "border-transparent font-medium text-secondary hover:bg-neutral-50 hover:text-strong"
                      }`}
                    >
                      {t(item.labelKey)}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </li>
        ))}
      </ul>
    </nav>
  );
}
