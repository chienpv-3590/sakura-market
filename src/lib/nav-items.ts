export type NavItem = {
  slug: string;
  labelKey: string;
  href: string;
};

// 9 business groups, shared by the sidebar (this phase) and any future
// breadcrumb. Labels live in dictionaries/{locale}/nav.json under the
// matching `labelKey`.
export const NAV_ITEMS: readonly NavItem[] = [
  { slug: "participants", labelKey: "nav.participants", href: "/participants" },
  { slug: "lots", labelKey: "nav.lots", href: "/lots" },
  { slug: "transactions", labelKey: "nav.transactions", href: "/transactions" },
  { slug: "seri", labelKey: "nav.seri", href: "/seri" },
  { slug: "deliveries", labelKey: "nav.deliveries", href: "/deliveries" },
  { slug: "reconciliation", labelKey: "nav.reconciliation", href: "/reconciliation" },
  { slug: "corrections", labelKey: "nav.corrections", href: "/corrections" },
  { slug: "incentive", labelKey: "nav.incentive", href: "/incentive" },
  { slug: "reports", labelKey: "nav.reports", href: "/reports" },
];
