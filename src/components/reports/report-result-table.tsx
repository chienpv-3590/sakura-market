import Link from "next/link";
import type { ReportColumn } from "@/lib/reports/registry";
import type { ReportRow } from "@/lib/reports/report-row";
import { EmptyState } from "@/components/ui/empty-state";

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
    return <EmptyState description={dict["reports.viewer.empty"]} />;
  }

  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  // Column alignment is decided once from the first row: a figure column is
  // right-aligned and tabular so values line up when the sheet is scanned
  // down a column rather than read across a row.
  const isNumericColumn = (key: string) => typeof rows[0]?.[key] === "number";

  return (
    <div className="space-y-3">
      <div className="cds-table__wrap">
        <table className="cds-table cds-table--default cds-table--hover">
          <thead>
            <tr>
              {columns.map((col) => (
                <th key={col.key} className={isNumericColumn(col.key) ? "text-right" : undefined}>
                  {dict[col.labelKey] ?? col.key}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i}>
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
                  if (enumLabel === undefined && typeof value === "number") {
                    return (
                      <td key={col.key} className="cds-table__num cds-table__mono text-strong">
                        {value.toLocaleString()}
                      </td>
                    );
                  }
                  return (
                    <td key={col.key} className="text-strong">
                      {enumLabel ?? value ?? "—"}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between text-sm text-secondary">
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
              className="cds-btn cds-btn--secondary cds-btn--md"
            >
              {dict["reports.viewer.paginationPrev"]}
            </Link>
          )}
          {page < totalPages && (
            <Link
              href={buildPageHref(baseHref, filterValues, page + 1)}
              className="cds-btn cds-btn--secondary cds-btn--md"
            >
              {dict["reports.viewer.paginationNext"]}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
