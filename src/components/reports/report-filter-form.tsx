import type { ReportFilterField } from "@/lib/reports/report-filter-field";
import type { ParticipantOption } from "@/lib/reports/participant-options";

// SCR020_ReportViewer shared filter framework (F010 CAP-02) -- renders
// whatever `fields` the report's registry entry declares; RPT-01/05/07 all
// go through this ONE component, no per-report filter form.
export function ReportFilterForm({
  fields,
  values,
  participantOptions,
  dict,
}: {
  fields: ReportFilterField[];
  values: Record<string, string>;
  participantOptions: ParticipantOption[];
  dict: Record<string, string>;
}) {
  if (fields.length === 0) return null;

  return (
    <form method="GET" className="flex flex-wrap items-end gap-4">
      {fields.map((field) => (
        <label key={field.key} className="flex flex-col text-sm text-zinc-700">
          {dict[field.labelKey]}
          {field.type === "date" ? (
            <input
              type="date"
              name={field.key}
              defaultValue={values[field.key] ?? ""}
              className="mt-1 rounded-md border border-zinc-300 px-3 py-2 text-sm"
            />
          ) : (
            <select
              name={field.key}
              defaultValue={values[field.key] ?? ""}
              className="mt-1 rounded-md border border-zinc-300 px-3 py-2 text-sm"
            >
              <option value="">{dict["reports.filter.participantAll"]}</option>
              {participantOptions.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          )}
        </label>
      ))}
      <button
        type="submit"
        className="rounded-md border border-zinc-300 px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-100"
      >
        {dict["reports.viewer.filterSubmit"]}
      </button>
    </form>
  );
}
