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
export function SidebarNav({ role }: { role: Role }) {
  const t = useT();
  const pathname = usePathname();

  const visibleGroups = NAV_GROUPS.map((group) => ({
    ...group,
    items: group.items.filter((item) => !item.roles || item.roles.includes(role)),
  })).filter((group) => group.items.length > 0);

  return (
    <nav className="w-56 shrink-0 border-r border-zinc-200 bg-zinc-50 px-3 py-6">
      <Link href="/" className="block px-3">
        <p className="text-base font-semibold text-zinc-900">{t("app.name")}</p>
      </Link>
      <p className="mb-6 mt-1 px-3">
        <span className="inline-block rounded-full bg-zinc-200 px-2 py-0.5 text-xs font-medium text-zinc-700">
          {t(`role.${role}`)}
        </span>
      </p>
      <ul className="space-y-6">
        {visibleGroups.map((group) => (
          <li key={group.groupKey}>
            <p className="mb-2 px-3 text-[11px] font-bold uppercase tracking-wider text-zinc-400">
              {t(group.groupKey)}
            </p>
            <ul className="space-y-1">
              {group.items.map((item) => {
                const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
                return (
                  <li key={item.slug}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={`block border-l-4 py-2 pl-3 pr-3 text-sm font-medium ${
                        active
                          ? "border-zinc-900 bg-zinc-100 text-zinc-900"
                          : "border-transparent text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900"
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
