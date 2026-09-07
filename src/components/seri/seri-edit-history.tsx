import { AuditDiff } from "@/components/audit/audit-diff";
import { SERI_FIELD_LABELS, SERI_CREATE_FIELDS } from "@/components/audit/audit-field-maps";
import type { SeriAuditRow } from "@/lib/seri/seri-queries";

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
    return <p className="sm-empty">{dict["seri.detail.historyEmpty"]}</p>;
  }

  return (
    <div className="sm-table-wrap sm-table-scroll">
      <table className="sm-table">
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
              <td className="sm-mono">
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
