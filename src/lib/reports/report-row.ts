// One shared row shape for every report's result table + CSV export --
// generic on purpose, since the same ReportResultTable/toCsv code renders
// RPT-01, RPT-05 and RPT-07 alike (F010's "1 khung dùng chung").
export type ReportRow = Record<string, string | number | null>;
