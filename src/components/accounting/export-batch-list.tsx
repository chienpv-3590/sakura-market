import Link from "next/link";
import type { Tables } from "@/lib/db/types";

// RPT-06 viewer's own batch history (phase-03 §Implementation Steps #9) --
// every batch ever exported for the current business_date, oldest first
// (export-batch-queries.ts's own ordering). Clicking a row's code jumps the
// viewer into "xem batch" mode for that snapshot.
export function ExportBatchList({
  batches,
  exportedByNames,
  dict,
}: {
  batches: Tables<"accounting_export_batch">[];
  exportedByNames: Map<string, string>;
  dict: Record<string, string>;
}) {
  if (batches.length === 0) {
    return <p className="text-sm text-secondary">{dict["reports.rpt06.batchListEmpty"]}</p>;
  }

  return (
    <div className="cds-table__wrap">
      <table className="cds-table cds-table--default cds-table--hover">
        <thead>
          <tr>
            <th>{dict["reports.rpt06.batchColumn.code"]}</th>
            <th>{dict["reports.rpt06.batchColumn.kind"]}</th>
            <th className="text-right">{dict["reports.rpt06.batchColumn.rowCount"]}</th>
            <th className="text-right">{dict["reports.rpt06.batchColumn.totalNet"]}</th>
            <th className="text-right">{dict["reports.rpt06.batchColumn.totalTax"]}</th>
            <th className="text-right">{dict["reports.rpt06.batchColumn.taxRate"]}</th>
            <th>{dict["reports.rpt06.batchColumn.exportedAt"]}</th>
            <th>{dict["reports.rpt06.batchColumn.exportedBy"]}</th>
          </tr>
        </thead>
        <tbody>
          {batches.map((batch) => (
            <tr key={batch.id}>
              <td>
                <Link
                  href={`/reports/RPT-06?businessDate=${batch.business_date}&batchCode=${batch.batch_code}`}
                  className="text-secondary hover:underline"
                >
                  {batch.batch_code}
                </Link>
              </td>
              <td>{dict[`reports.rpt06.kind.${batch.kind}`] ?? batch.kind}</td>
              <td className="cds-table__num cds-table__mono text-right">{batch.row_count.toLocaleString()}</td>
              <td className="cds-table__num cds-table__mono text-right">
                {batch.total_net_amount_jpy.toLocaleString()}
              </td>
              <td className="cds-table__num cds-table__mono text-right">{batch.total_tax_jpy.toLocaleString()}</td>
              <td className="cds-table__num cds-table__mono text-right">{(batch.tax_rate_bps / 100).toFixed(2)}%</td>
              <td className="text-strong">{new Date(batch.exported_at).toLocaleString()}</td>
              <td className="text-strong">
                {(batch.exported_by ? exportedByNames.get(batch.exported_by) : undefined) ?? "—"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
