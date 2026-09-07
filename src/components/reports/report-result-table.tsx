import Link from "next/link";
import type { ReportColumn } from "@/lib/reports/registry";
import type { ReportRow } from "@/lib/reports/report-row";

function buildPageHref(baseHref: string, filterValues: Record<string, string>, page: number): string {
  const params = new URLSearchParams(filterValues);
  params.set("page", String(page));
  return `${baseHref}?${params.toString()}`;
}

// SCR020_ReportViewer shared result table (F010 CAP-02) -- one generic
// component renders RPT-01/05/07 alike, columns coming from the registry.
export function ReportResultTable({
  columns,
  rows,
  page,
  pageSize,
  total,
  baseHref,
  filterValues,
  dict,
}: {
  columns: ReportColumn[];
  rows: ReportRow[];
  page: number;
  pageSize: number;
  total: number;
  baseHref: string;
  filterValues: Record<string, string>;
  dict: Record<string, string>;
}) {
  if (rows.length === 0) {
    return <p className="text-sm text-zinc-600">{dict["reports.viewer.empty"]}</p>;
  }

  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  return (
    <div className="space-y-3">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="border-b border-zinc-300 text-left text-zinc-500">
            {columns.map((col) => (
              <th key={col.key} className="py-2 pr-4">
                {dict[col.labelKey] ?? col.key}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-zinc-100">
              {columns.map((col) => {
                const value = row[col.key];
                // A small, known set of enum-like columns (sourceType/kind/
                // status) get a translated label -- everything else renders
                // as-is. Falls back to the raw value if a translation is
                // missing rather than showing a blank cell.
                const enumLabel =
                  (col.key === "sourceType" || col.key === "kind" || col.key === "status") && value !== null
                    ? dict[`reports.${col.key}.${value}`]
                    : undefined;
                return (
                  <td key={col.key} className="py-2 pr-4 text-zinc-900">
                    {enumLabel ?? (typeof value === "number" ? value.toLocaleString() : (value ?? "—"))}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex items-center justify-between text-sm text-zinc-600">
        <span>
          {dict["reports.viewer.paginationInfo"]
            .replace("{page}", String(page))
            .replace("{totalPages}", String(totalPages))
            .replace("{total}", String(total))}
        </span>
        <div className="flex gap-2">
          {page > 1 && (
            <Link
              href={buildPageHref(baseHref, filterValues, page - 1)}
              className="rounded-md border border-zinc-300 px-3 py-1 hover:bg-zinc-100"
            >
              {dict["reports.viewer.paginationPrev"]}
            </Link>
          )}
          {page < totalPages && (
            <Link
              href={buildPageHref(baseHref, filterValues, page + 1)}
              className="rounded-md border border-zinc-300 px-3 py-1 hover:bg-zinc-100"
            >
              {dict["reports.viewer.paginationNext"]}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
