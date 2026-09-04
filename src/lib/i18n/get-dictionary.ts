import { cache } from "react";
import type { Locale, Namespace } from "./config";

type Dictionary = Record<string, string>;
type Loader = () => Promise<Dictionary>;

// Explicit, literal import() paths per locale/namespace — keeps bundlers
// (webpack/Turbopack) able to statically analyze each import, so no
// namespace ever ships an unrelated locale's chunk and no "critical
// dependency: expression" build warning is produced.
const LOADERS: Record<Locale, Record<Namespace, Loader>> = {
  vi: {
    common: () => import("./dictionaries/vi/common.json").then((m) => m.default),
    nav: () => import("./dictionaries/vi/nav.json").then((m) => m.default),
    participants: () => import("./dictionaries/vi/participants.json").then((m) => m.default),
    lots: () => import("./dictionaries/vi/lots.json").then((m) => m.default),
    transactions: () => import("./dictionaries/vi/transactions.json").then((m) => m.default),
    deliveries: () => import("./dictionaries/vi/deliveries.json").then((m) => m.default),
    reconciliation: () => import("./dictionaries/vi/reconciliation.json").then((m) => m.default),
    corrections: () => import("./dictionaries/vi/corrections.json").then((m) => m.default),
    incentive: () => import("./dictionaries/vi/incentive.json").then((m) => m.default),
    reports: () => import("./dictionaries/vi/reports.json").then((m) => m.default),
  },
  ja: {
    common: () => import("./dictionaries/ja/common.json").then((m) => m.default),
    nav: () => import("./dictionaries/ja/nav.json").then((m) => m.default),
    participants: () => import("./dictionaries/ja/participants.json").then((m) => m.default),
    lots: () => import("./dictionaries/ja/lots.json").then((m) => m.default),
    transactions: () => import("./dictionaries/ja/transactions.json").then((m) => m.default),
    deliveries: () => import("./dictionaries/ja/deliveries.json").then((m) => m.default),
    reconciliation: () => import("./dictionaries/ja/reconciliation.json").then((m) => m.default),
    corrections: () => import("./dictionaries/ja/corrections.json").then((m) => m.default),
    incentive: () => import("./dictionaries/ja/incentive.json").then((m) => m.default),
    reports: () => import("./dictionaries/ja/reports.json").then((m) => m.default),
  },
};

// Loads and flattens the requested namespaces for a locale into one object.
// React.cache() dedupes identical (locale, namespaces) calls within a
// single request — the layout and every page can each call this directly.
export const getDictionary = cache(async function getDictionary(
  locale: Locale,
  namespaces: readonly Namespace[],
): Promise<Dictionary> {
  const loaded = await Promise.all(namespaces.map((ns) => LOADERS[locale][ns]()));
  return Object.assign({}, ...loaded) as Dictionary;
});
