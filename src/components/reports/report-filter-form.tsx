import type { ReportFilterField, ReportFilterOptionsKey } from "@/lib/reports/report-filter-field";
import type { FilterOption } from "@/lib/reports/filter-options";

// "All" placeholder label per optionsKey -- domain-specific wording (e.g.
// "Tất cả người tham gia" vs "Tất cả lô hàng"), same convention the
// participant dropdown already used before this framework generalized.
const ALL_LABEL_KEY: Record<ReportFilterOptionsKey, string> = {
  participants: "reports.filter.participantAll",
  lots: "reports.filter.lotAll",
  actors: "reports.filter.actorAll",
  txnStatus: "reports.filter.txnStatusAll",
  eligibilityStatus: "reports.filter.eligibilityStatusAll",
};

// The two static-enum optionsKeys carry a raw, untranslated value (e.g.
// "draft", "có hiệu lực") -- translated here the same way ReportResultTable
// already translates column values: `dict["reports.<prefix>.<value>"]`,
// falling back to the raw value if a translation is missing.
const OPTION_LABEL_DICT_PREFIX: Partial<Record<ReportFilterOptionsKey, string>> = {
  txnStatus: "reports.status",
  eligibilityStatus: "reports.eligibilityStatus",
};

function optionLabel(optionsKey: ReportFilterOptionsKey, option: FilterOption, dict: Record<string, string>): string {
  const prefix = OPTION_LABEL_DICT_PREFIX[optionsKey];
  if (!prefix) return option.label;
  return dict[`${prefix}.${option.value}`] ?? option.label;
}

// SCR020_ReportViewer shared filter framework (F010 CAP-02) -- renders
// whatever `fields` the report's registry entry declares; every report goes
// through this ONE component, no per-report filter form.
export function ReportFilterForm({
  fields,
  values,
  filterOptions,
  dict,
}: {
  fields: ReportFilterField[];
  values: Record<string, string>;
  filterOptions: Record<ReportFilterOptionsKey, FilterOption[]>;
  dict: Record<string, string>;
}) {
  if (fields.length === 0) return null;

  return (
    <form method="GET" className="flex flex-wrap items-end gap-4">
      {fields.map((field) => (
        <label key={field.key} className="cds-field">
          {dict[field.labelKey]}
          {field.type === "date" && (
            <input
              type="date"
              name={field.key}
              defaultValue={values[field.key] ?? ""}
              className="cds-input--native mt-1"
            />
          )}
          {field.type === "select" && (
            <select
              name={field.key}
              defaultValue={values[field.key] ?? ""}
              className="cds-select--native mt-1"
            >
              <option value="">{dict[ALL_LABEL_KEY[field.optionsKey]]}</option>
              {filterOptions[field.optionsKey].map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {optionLabel(field.optionsKey, opt, dict)}
                </option>
              ))}
            </select>
          )}
          {field.type === "text" && (
            <input
              type="text"
              name={field.key}
              defaultValue={values[field.key] ?? ""}
              maxLength={field.maxLength}
              className="cds-input--native mt-1"
            />
          )}
        </label>
      ))}
      <button
        type="submit"
        className="cds-btn cds-btn--secondary cds-btn--md"
      >
        {dict["reports.viewer.filterSubmit"]}
      </button>
    </form>
  );
}
