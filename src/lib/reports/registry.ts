import type { ReportFilterField } from "./report-filter-field";
import { BUSINESS_DATE_FILTER, PARTICIPANT_FILTER, BATCH_CODE_FILTER } from "./registry-filters";
import { RPT_01_COLUMNS, RPT_05_COLUMNS, RPT_06_COLUMNS, RPT_07_COLUMNS } from "./registry-columns";

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

// RPT-07 is the only report needing a "period" date filter distinct from
// businessDate -- one report, so it stays inline rather than becoming an
// 8th shared constant in registry-filters.ts.
const RPT_07_PERIOD_FILTER: ReportFilterField = {
  key: "period",
  type: "date",
  labelKey: "reports.filter.period",
  required: true,
};

/**
 * TBL-REPORT-01, 12 fixed reports -- FR-RPT-03 explicitly forbids a
 * self-service report builder, so this list IS the entire catalog surface;
 * nothing lets a caller add a 13th report or a different filter shape.
 *
 * RPT-01/05/07 were real from the 10h prototype (phase-09 §"chọn 3 báo cáo
 * chạy thật"); phase-03 adds RPT-06 (= IF-ACC-01, P0) as the 4th. The
 * remaining 8 carry `isMock: true`, an empty filter/column set, and are
 * declared mock everywhere they render -- never blurred in with the real
 * ones (Risk Assessment: "Báo cáo mock bị hiểu là số thật").
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
    isMock: false,
    filterFields: [BUSINESS_DATE_FILTER, BATCH_CODE_FILTER],
    columns: RPT_06_COLUMNS,
  },
  {
    code: "RPT-07",
    titleKey: "reports.catalog.RPT-07.title",
    frequencyKey: "reports.catalog.RPT-07.frequency",
    filterDescriptionKey: "reports.catalog.RPT-07.filter",
    isMock: false,
    filterFields: [RPT_07_PERIOD_FILTER, PARTICIPANT_FILTER],
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
