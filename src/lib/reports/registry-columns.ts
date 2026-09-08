// Column data for the 3 real reports (RPT-01/05/07) -- pure data, no logic,
// moved verbatim out of registry.ts (development-rules.md's 200-line cap).
// Deliberately does NOT import `ReportColumn` from ./registry (one-way import
// direction: registry.ts imports these arrays, never the reverse) -- the
// object-literal shape below is structurally identical to `ReportColumn`, so
// no explicit type import is needed to satisfy that contract at the call site.

export const RPT_01_COLUMNS = [
  { key: "businessDate", labelKey: "reports.column.businessDate" },
  { key: "sourceType", labelKey: "reports.column.sourceType" },
  { key: "code", labelKey: "reports.column.code" },
  { key: "item", labelKey: "reports.column.item" },
  { key: "participant", labelKey: "reports.column.participant" },
  { key: "participantCategory", labelKey: "reports.column.participantCategory" },
  { key: "qty", labelKey: "reports.column.qty" },
  { key: "unitPrice", labelKey: "reports.column.unitPrice" },
  { key: "amountJpy", labelKey: "reports.column.amount" },
  { key: "status", labelKey: "reports.column.status" },
];

export const RPT_05_COLUMNS = [
  { key: "businessDate", labelKey: "reports.column.businessDate" },
  { key: "participant", labelKey: "reports.column.participant" },
  { key: "sourceType", labelKey: "reports.column.sourceType" },
  { key: "sourceId", labelKey: "reports.column.sourceId" },
  { key: "qty", labelKey: "reports.column.qty" },
  { key: "amountJpy", labelKey: "reports.column.amount" },
  { key: "variance", labelKey: "reports.column.variance" },
];

export const RPT_07_COLUMNS = [
  { key: "period", labelKey: "reports.column.period" },
  { key: "participant", labelKey: "reports.column.participant" },
  { key: "amountJpy", labelKey: "reports.column.amount" },
  { key: "kind", labelKey: "reports.column.kind" },
  { key: "ruleVersionNo", labelKey: "reports.column.ruleVersion" },
  { key: "ruleEffectiveFrom", labelKey: "reports.column.effectiveFrom" },
  { key: "originPeriod", labelKey: "reports.column.originPeriod" },
];
