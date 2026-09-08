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

// RPT-02 "Lịch sử lô hàng và log trạng thái giao dịch" (phase-04
// §Architecture) -- 15 columns, one row per transaction/seri_result event.
export const RPT_02_COLUMNS = [
  { key: "lotCode", labelKey: "reports.column.lotCode" },
  { key: "item", labelKey: "reports.column.item" },
  { key: "lotStatus", labelKey: "reports.column.lotStatus" },
  { key: "businessDate", labelKey: "reports.column.businessDate" },
  { key: "mekikiGrade", labelKey: "reports.column.mekikiGrade" },
  { key: "eventType", labelKey: "reports.column.eventType" },
  { key: "txnCode", labelKey: "reports.column.txnCode" },
  { key: "participant", labelKey: "reports.column.participant" },
  { key: "qty", labelKey: "reports.column.qty" },
  { key: "unitPrice", labelKey: "reports.column.unitPrice" },
  { key: "amountJpy", labelKey: "reports.column.amount" },
  { key: "txnStatus", labelKey: "reports.column.txnStatus" },
  { key: "eventAt", labelKey: "reports.column.eventAt" },
  { key: "actor", labelKey: "reports.column.actor" },
  { key: "reason", labelKey: "reports.column.reason" },
];

// RPT-03 "Danh sách người tham gia đã hoặc sắp mất hiệu lực" (phase-04
// §Architecture) -- 13 columns, one row per participant.
export const RPT_03_COLUMNS = [
  { key: "participantId", labelKey: "reports.column.participantId" },
  { key: "participantName", labelKey: "reports.column.participantName" },
  { key: "category", labelKey: "reports.column.category" },
  { key: "licenseType", labelKey: "reports.column.licenseType" },
  { key: "status", labelKey: "reports.column.status" },
  { key: "validFrom", labelKey: "reports.column.validFrom" },
  { key: "validTo", labelKey: "reports.column.validTo" },
  { key: "daysUntilExpiry", labelKey: "reports.column.daysUntilExpiry" },
  { key: "lastTransitionFrom", labelKey: "reports.column.lastTransitionFrom" },
  { key: "lastTransitionTo", labelKey: "reports.column.lastTransitionTo" },
  { key: "lastTransitionReason", labelKey: "reports.column.lastTransitionReason" },
  { key: "lastTransitionBy", labelKey: "reports.column.lastTransitionBy" },
  { key: "lastTransitionAt", labelKey: "reports.column.lastTransitionAt" },
];

// RPT-06 / IF-ACC-01 (phase-03 §Architecture) -- 13 columns, fixed order.
// `batchCode`/`businessDate`/`exportedAt`/`exportedBy` cover RFP §08-05's 4
// provenance fields; `businessDate`/`participantId`+`participantName`/
// `netAmountJpy`/`taxJpy`/`status`/`batchCode` cover §08-03's 6 minimum
// fields (businessDate and batchCode are shared by both sections, not
// duplicated columns). The remaining 4 columns (participantCategory,
// grossAmountJpy, adjustmentAmountJpy, totalWithTaxJpy) are reconciliation
// aids, not RFP-mandated.
export const RPT_06_COLUMNS = [
  { key: "batchCode", labelKey: "reports.column.batchCode" },
  { key: "businessDate", labelKey: "reports.column.businessDate" },
  { key: "participantId", labelKey: "reports.column.participantId" },
  { key: "participantName", labelKey: "reports.column.participantName" },
  { key: "participantCategory", labelKey: "reports.column.participantCategory" },
  { key: "grossAmountJpy", labelKey: "reports.column.grossAmount" },
  { key: "adjustmentAmountJpy", labelKey: "reports.column.adjustmentAmount" },
  { key: "netAmountJpy", labelKey: "reports.column.netAmount" },
  { key: "taxJpy", labelKey: "reports.column.tax" },
  { key: "totalWithTaxJpy", labelKey: "reports.column.totalWithTax" },
  { key: "status", labelKey: "reports.column.status" },
  { key: "exportedAt", labelKey: "reports.column.exportedAt" },
  { key: "exportedBy", labelKey: "reports.column.exportedBy" },
];
