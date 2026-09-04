export type Locale = "vi" | "ja";

export const DEFAULT_LOCALE: Locale = "vi";

export const LOCALES: readonly Locale[] = ["vi", "ja"];

export const LOCALE_COOKIE_NAME = "locale";

// 10 namespaces. `common` + `nav` are filled in Phase 02 (this phase). The
// other 8 are business namespaces — kept as empty `{}` on purpose so each
// later phase (05-09) can fill its own namespace without file conflicts.
export const NAMESPACES = [
  "common",
  "nav",
  "participants",
  "lots",
  "transactions",
  "deliveries",
  "reconciliation",
  "corrections",
  "incentive",
  "reports",
] as const;

export type Namespace = (typeof NAMESPACES)[number];

export function isLocale(value: string | undefined | null): value is Locale {
  return value === "vi" || value === "ja";
}
