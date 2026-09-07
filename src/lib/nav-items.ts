import type { Role } from "@/lib/auth/role-landing";

export type NavItem = {
  slug: string;
  labelKey: string;
  href: string;
  /**
   * Roles allowed to see this entry. Omitted (the default) means every
   * active role -- most business screens here are deliberately readable by
   * everyone (RLS `read_all_active_users`, FR-601). Set this ONLY for an
   * entry whose destination page 404s for the wrong role via
   * `requireRole()` -- mirrored 1:1 from that server-side gate, never
   * invented here (see lib/auth/require-role.ts call sites).
   */
  roles?: readonly Role[];
};

export type NavGroup = {
  groupKey: string;
  items: readonly NavItem[];
};

// The same business screens as before, grouped by pipeline stage (Tiếp nhận
// / Giao dịch / Giao nhận / Quyết toán / Quản trị). Group headings are
// labels, not links -- SidebarNav renders them as plain text above each item
// list, and hides a group entirely once role filtering leaves it with no
// visible items. Item labels live in dictionaries/{locale}/nav.json under
// the matching `labelKey`; group headings live under `groupKey`.
export const NAV_GROUPS: readonly NavGroup[] = [
  {
    groupKey: "nav.group.intake",
    items: [{ slug: "lots", labelKey: "nav.lots", href: "/lots" }],
  },
  {
    groupKey: "nav.group.trading",
    items: [
      { slug: "transactions", labelKey: "nav.transactions", href: "/transactions" },
      { slug: "seri", labelKey: "nav.seri", href: "/seri" },
    ],
  },
  {
    groupKey: "nav.group.delivery",
    items: [{ slug: "deliveries", labelKey: "nav.deliveries", href: "/deliveries" }],
  },
  {
    groupKey: "nav.group.settlement",
    items: [
      { slug: "reconciliation", labelKey: "nav.reconciliation", href: "/reconciliation" },
      // corrections/page.tsx and incentive/page.tsx both gate the whole
      // screen behind requireRole(["ROLE-SETTLEMENT"]) -- every other role
      // 404s there, so the link must not even be offered to them.
      { slug: "corrections", labelKey: "nav.corrections", href: "/corrections", roles: ["ROLE-SETTLEMENT"] },
      { slug: "incentive", labelKey: "nav.incentive", href: "/incentive", roles: ["ROLE-SETTLEMENT"] },
      // incentive/rules/page.tsx gates behind requireRole(["ROLE-RULE-ADMIN"])
      // instead -- a different role from the "incentive" entry above, so it
      // needs its own item rather than reusing that one.
      {
        slug: "incentive-rules",
        labelKey: "nav.incentiveRules",
        href: "/incentive/rules",
        roles: ["ROLE-RULE-ADMIN"],
      },
      { slug: "reports", labelKey: "nav.reports", href: "/reports" },
    ],
  },
  {
    groupKey: "nav.group.admin",
    items: [{ slug: "participants", labelKey: "nav.participants", href: "/participants" }],
  },
];
