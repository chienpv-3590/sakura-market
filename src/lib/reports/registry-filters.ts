import type { ReportFilterField } from "./report-filter-field";

// Shared filter constants for TBL-REPORT-01 (F010 CAP-02). Pure data, no
// logic -- deliberately does NOT import from ./registry (one-way import
// direction: registry.ts imports these, never the reverse) to keep the split
// free of a circular module dependency.

/** RPT-01/05 "Ngày nghiệp vụ" -- required date, defaults to todayJst() when missing/invalid. */
export const BUSINESS_DATE_FILTER: ReportFilterField = {
  key: "businessDate",
  type: "date",
  labelKey: "reports.filter.businessDate",
  required: true,
};

/** RPT-03/07/10 "Người tham gia" -- optional select, populated from `participant`. */
export const PARTICIPANT_FILTER: ReportFilterField = {
  key: "participantId",
  type: "select",
  labelKey: "reports.filter.participant",
  optionsKey: "participants",
  required: false,
};

/** RPT-02 "Lô hàng" -- optional select, populated from `lot`. */
export const LOT_FILTER: ReportFilterField = {
  key: "lotId",
  type: "select",
  labelKey: "reports.filter.lot",
  optionsKey: "lots",
  required: false,
};

/** RPT-02 "Trạng thái giao dịch" -- optional select, static enum (`transaction.status`). */
export const TXN_STATUS_FILTER: ReportFilterField = {
  key: "txnStatus",
  type: "select",
  labelKey: "reports.filter.txnStatus",
  optionsKey: "txnStatus",
  required: false,
};

/** RPT-03 "Trạng thái hiệu lực" -- optional select, static enum (F002's 4 fixed statuses). */
export const ELIGIBILITY_STATUS_FILTER: ReportFilterField = {
  key: "eligibilityStatus",
  type: "select",
  labelKey: "reports.filter.eligibilityStatus",
  optionsKey: "eligibilityStatus",
  required: false,
};

/** RPT-08 "Chủ thể thực hiện" -- optional select, populated from `app_user`. */
export const ACTOR_FILTER: ReportFilterField = {
  key: "actorId",
  type: "select",
  labelKey: "reports.filter.actor",
  optionsKey: "actors",
  required: false,
};

/** RPT-06 "Batch code" -- optional free-text filter, trimmed + length-capped. */
export const BATCH_CODE_FILTER: ReportFilterField = {
  key: "batchCode",
  type: "text",
  labelKey: "reports.filter.batchCode",
  required: false,
  maxLength: 40,
};
