import { AuditDiff } from "@/components/audit/audit-diff";
import { SERI_FIELD_LABELS, SERI_CREATE_FIELDS } from "@/components/audit/audit-field-maps";
import type { SeriAuditRow } from "@/lib/seri/seri-queries";
import { EmptyState } from "@/components/ui/empty-state";

// SCR010 history block -- reads audit_log filtered by entity='seri_result',
// same DRY pattern lots' AvailabilityPanel established (FR-SERI-03 +
// FR-AUDIT-01): no separate history table for せり.
export function SeriEditHistory({
  history,
  dict,
}: {
  history: SeriAuditRow[];
  dict: Record<string, string>;
}) {
  if (history.length === 0) {
    return <EmptyState description={dict["seri.detail.historyEmpty"]} compact />;
  }

  return (
    <div className="cds-table__wrap">
      <table className="cds-table cds-table--default cds-table--hover">
        <thead>
          <tr>
            <th>{dict["seri.detail.historyColumns.action"]}</th>
            <th>{dict["seri.detail.historyColumns.change"]}</th>
            <th>{dict["seri.detail.historyColumns.reason"]}</th>
            <th>{dict["seri.detail.historyColumns.at"]}</th>
          </tr>
        </thead>
        <tbody>
          {history.map((row) => (
            <tr key={row.id} className="align-top">
              <td className="cds-table__mono">
              {dict[`seri.action.${row.action}`] ?? row.action}
            </td>
            <td>
              <AuditDiff
                before={row.before}
                after={row.after}
                fieldLabels={SERI_FIELD_LABELS}
                createFields={SERI_CREATE_FIELDS}
              />
            </td>
              <td>{row.reason ?? "—"}</td>
              <td>{new Date(row.created_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
