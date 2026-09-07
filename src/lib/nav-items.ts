export type NavItem = {
  slug: string;
  labelKey: string;
  href: string;
};

export type NavGroup = {
  groupKey: string;
  items: readonly NavItem[];
};

// The same 9 business screens as before, now regrouped by pipeline stage
// (Tiếp nhận / Giao dịch / Giao nhận / Quyết toán / Quản trị) instead of one
// flat list. Group headings are labels, not links -- SidebarNav renders them
// as plain text above each item list. Item labels live in
// dictionaries/{locale}/nav.json under the matching `labelKey`; group
// headings live under `groupKey`.
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
      { slug: "corrections", labelKey: "nav.corrections", href: "/corrections" },
      { slug: "incentive", labelKey: "nav.incentive", href: "/incentive" },
      { slug: "reports", labelKey: "nav.reports", href: "/reports" },
    ],
  },
  {
    groupKey: "nav.group.admin",
    items: [{ slug: "participants", labelKey: "nav.participants", href: "/participants" }],
  },
];
