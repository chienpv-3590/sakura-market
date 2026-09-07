// Shared shape for the ONE generic filter framework every report in
// TBL-REPORT-01 renders through (F010 CAP-02) -- `key` doubles as both the
// URL query-string param name and the HTML form field `name`, so
// ReportFilterForm never needs a per-report branch.
export type ReportFilterField =
  | { key: string; type: "date"; labelKey: string; required: true }
  | { key: string; type: "select"; labelKey: string; optionsKey: "participants"; required: false };
