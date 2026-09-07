import { AuditDiff } from "@/components/audit/audit-diff";
import { LOT_FIELD_LABELS, LOT_CREATE_FIELDS } from "@/components/audit/audit-field-maps";
import type { LotAuditRow } from "@/lib/lots/lot-queries";
import { EmptyState } from "@/components/ui/empty-state";

// SCR006 adjustment trail. Reads audit_log for the lot rather than a separate
// history table (DRY, phase-06 step 9) -- was the bottom half of
// AvailabilityPanel, now a section of its own so it gets its own card.
//
// Renders the bare `cds-table__wrap`, no heading and no outer box: the caller
// puts it in a SectionCard with `tight`, which supplies both.
export function LotAuditHistoryTable({
  history,
  dict,
}: {
  history: LotAuditRow[];
  dict: Record<string, string>;
}) {
  if (history.length === 0) {
    return <EmptyState description={dict["lots.detail.historyEmpty"]} compact />;
  }

  return (
    <div className="cds-table__wrap">
      <table className="cds-table cds-table--default cds-table--hover">
        <thead>
          <tr>
            <th>{dict["lots.detail.historyColumns.action"]}</th>
            <th>{dict["lots.detail.historyColumns.change"]}</th>
            <th>{dict["lots.detail.historyColumns.reason"]}</th>
            <th>{dict["lots.detail.historyColumns.at"]}</th>
          </tr>
        </thead>
        <tbody>
          {history.map((row) => (
            <tr key={row.id} className="align-top">
              <td className="cds-table__mono">{dict[`lots.action.${row.action}`] ?? row.action}</td>
              <td>
                <AuditDiff
                  before={row.before}
                  after={row.after}
                  fieldLabels={LOT_FIELD_LABELS}
                  statusPrefix="lots.status."
                  createFields={LOT_CREATE_FIELDS}
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
