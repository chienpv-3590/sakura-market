import { AuditDiff } from "@/components/audit/audit-diff";
import { TXN_FIELD_LABELS, TXN_CREATE_FIELDS } from "@/components/audit/audit-field-maps";
import type { TransactionAuditRow } from "@/lib/transactions/txn-queries";
import { EmptyState } from "@/components/ui/empty-state";

// SCR008 audit trail (FR-AUDIT-01). Lifted out of the page so the page reads
// as its list of sections; same shape as lots' and せり's history blocks.
//
// Renders the bare `cds-table__wrap`, no heading and no outer box: the caller
// puts it in a SectionCard with `tight`, which supplies both.
export function TransactionAuditHistoryTable({
  history,
  dict,
}: {
  history: TransactionAuditRow[];
  dict: Record<string, string>;
}) {
  if (history.length === 0) {
    return <EmptyState description={dict["transactions.detail.historyEmpty"]} compact />;
  }

  return (
    <div className="cds-table__wrap">
      <table className="cds-table cds-table--default cds-table--hover">
        <thead>
          <tr>
            <th>{dict["transactions.detail.historyColumns.action"]}</th>
            <th>{dict["transactions.detail.historyColumns.change"]}</th>
            <th>{dict["transactions.detail.historyColumns.reason"]}</th>
            <th>{dict["transactions.detail.historyColumns.at"]}</th>
          </tr>
        </thead>
        <tbody>
          {history.map((row) => (
            <tr key={row.id} className="align-top">
              <td className="cds-table__mono">
                {dict[`transactions.action.${row.action}`] ?? row.action}
              </td>
              <td>
                <AuditDiff
                  before={row.before}
                  after={row.after}
                  fieldLabels={TXN_FIELD_LABELS}
                  statusPrefix="transactions.status."
                  createFields={TXN_CREATE_FIELDS}
                />
              </td>
              <td>{row.reason ?? "—"}</td>
              <td className="cds-table__mono">{new Date(row.created_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
