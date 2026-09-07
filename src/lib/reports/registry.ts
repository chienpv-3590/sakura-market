import type { ReportFilterField } from "./report-filter-field";

export interface ReportColumn {
  key: string;
  labelKey: string;
}

export interface ReportDefinition {
  code: string;
  titleKey: string;
  frequencyKey: string;
  filterDescriptionKey: string;
  isMock: boolean;
  filterFields: ReportFilterField[];
  columns: ReportColumn[];
}

const BUSINESS_DATE_FILTER: ReportFilterField = {
  key: "businessDate",
  type: "date",
  labelKey: "reports.filter.businessDate",
  required: true,
};

const RPT_01_COLUMNS: ReportColumn[] = [
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

const RPT_05_COLUMNS: ReportColumn[] = [
  { key: "businessDate", labelKey: "reports.column.businessDate" },
  { key: "participant", labelKey: "reports.column.participant" },
  { key: "sourceType", labelKey: "reports.column.sourceType" },
  { key: "sourceId", labelKey: "reports.column.sourceId" },
  { key: "qty", labelKey: "reports.column.qty" },
  { key: "amountJpy", labelKey: "reports.column.amount" },
  { key: "variance", labelKey: "reports.column.variance" },
];

const RPT_07_COLUMNS: ReportColumn[] = [
  { key: "period", labelKey: "reports.column.period" },
  { key: "participant", labelKey: "reports.column.participant" },
  { key: "amountJpy", labelKey: "reports.column.amount" },
  { key: "kind", labelKey: "reports.column.kind" },
  { key: "ruleVersionNo", labelKey: "reports.column.ruleVersion" },
  { key: "ruleEffectiveFrom", labelKey: "reports.column.effectiveFrom" },
  { key: "originPeriod", labelKey: "reports.column.originPeriod" },
];

/**
 * TBL-REPORT-01, 12 fixed reports -- FR-RPT-03 explicitly forbids a
 * self-service report builder, so this list IS the entire catalog surface;
 * nothing lets a caller add a 13th report or a different filter shape.
 *
 * Only RPT-01/05/07 are real in this 10h prototype (phase-09 §"chọn 3 báo
 * cáo chạy thật"); the other 9 carry `isMock: true`, an empty filter/column
 * set, and are declared mock everywhere they render -- never blurred in
 * with the 3 real ones (Risk Assessment: "Báo cáo mock bị hiểu là số thật").
 */
export const REPORT_REGISTRY: ReportDefinition[] = [
  {
    code: "RPT-01",
    titleKey: "reports.catalog.RPT-01.title",
    frequencyKey: "reports.catalog.RPT-01.frequency",
    filterDescriptionKey: "reports.catalog.RPT-01.filter",
    isMock: false,
    filterFields: [BUSINESS_DATE_FILTER],
    columns: RPT_01_COLUMNS,
  },
  {
    code: "RPT-02",
    titleKey: "reports.catalog.RPT-02.title",
    frequencyKey: "reports.catalog.RPT-02.frequency",
    filterDescriptionKey: "reports.catalog.RPT-02.filter",
    isMock: true,
    filterFields: [],
    columns: [],
  },
  {
    code: "RPT-03",
    titleKey: "reports.catalog.RPT-03.title",
    frequencyKey: "reports.catalog.RPT-03.frequency",
    filterDescriptionKey: "reports.catalog.RPT-03.filter",
    isMock: true,
    filterFields: [],
    columns: [],
  },
  {
    code: "RPT-04",
    titleKey: "reports.catalog.RPT-04.title",
    frequencyKey: "reports.catalog.RPT-04.frequency",
    filterDescriptionKey: "reports.catalog.RPT-04.filter",
    isMock: true,
    filterFields: [],
    columns: [],
  },
  {
    code: "RPT-05",
    titleKey: "reports.catalog.RPT-05.title",
    frequencyKey: "reports.catalog.RPT-05.frequency",
    filterDescriptionKey: "reports.catalog.RPT-05.filter",
    isMock: false,
    filterFields: [BUSINESS_DATE_FILTER],
    columns: RPT_05_COLUMNS,
  },
  {
    code: "RPT-06",
    titleKey: "reports.catalog.RPT-06.title",
    frequencyKey: "reports.catalog.RPT-06.frequency",
    filterDescriptionKey: "reports.catalog.RPT-06.filter",
    isMock: true,
    filterFields: [],
    columns: [],
  },
  {
    code: "RPT-07",
    titleKey: "reports.catalog.RPT-07.title",
    frequencyKey: "reports.catalog.RPT-07.frequency",
    filterDescriptionKey: "reports.catalog.RPT-07.filter",
    isMock: false,
    filterFields: [
      { key: "period", type: "date", labelKey: "reports.filter.period", required: true },
      { key: "participantId", type: "select", labelKey: "reports.filter.participant", optionsKey: "participants", required: false },
    ],
    columns: RPT_07_COLUMNS,
  },
  {
    code: "RPT-08",
    titleKey: "reports.catalog.RPT-08.title",
    frequencyKey: "reports.catalog.RPT-08.frequency",
    filterDescriptionKey: "reports.catalog.RPT-08.filter",
    isMock: true,
    filterFields: [],
    columns: [],
  },
  {
    code: "RPT-09",
    titleKey: "reports.catalog.RPT-09.title",
    frequencyKey: "reports.catalog.RPT-09.frequency",
    filterDescriptionKey: "reports.catalog.RPT-09.filter",
    isMock: true,
    filterFields: [],
    columns: [],
  },
  {
    code: "RPT-10",
    titleKey: "reports.catalog.RPT-10.title",
    frequencyKey: "reports.catalog.RPT-10.frequency",
    filterDescriptionKey: "reports.catalog.RPT-10.filter",
    isMock: true,
    filterFields: [],
    columns: [],
  },
  {
    code: "RPT-11",
    titleKey: "reports.catalog.RPT-11.title",
    frequencyKey: "reports.catalog.RPT-11.frequency",
    filterDescriptionKey: "reports.catalog.RPT-11.filter",
    isMock: true,
    filterFields: [],
    columns: [],
  },
  {
    code: "RPT-12",
    titleKey: "reports.catalog.RPT-12.title",
    frequencyKey: "reports.catalog.RPT-12.frequency",
    filterDescriptionKey: "reports.catalog.RPT-12.filter",
    isMock: true,
    filterFields: [],
    columns: [],
  },
];

export function getReportDefinition(code: string): ReportDefinition | undefined {
  return REPORT_REGISTRY.find((r) => r.code === code);
}
