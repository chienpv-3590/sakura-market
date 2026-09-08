// Shared shape for the ONE generic filter framework every report in
// TBL-REPORT-01 renders through (F010 CAP-02) -- `key` doubles as both the
// URL query-string param name and the HTML form field `name`, so
// ReportFilterForm never needs a per-report branch.
export type ReportFilterOptionsKey = "participants" | "lots" | "actors" | "txnStatus" | "eligibilityStatus";

export type ReportFilterField =
  | { key: string; type: "date"; labelKey: string; required: boolean }
  | { key: string; type: "select"; labelKey: string; optionsKey: ReportFilterOptionsKey; required: boolean }
  | { key: string; type: "text"; labelKey: string; required: boolean; maxLength: number };
