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
    return <p className="mt-2 text-sm text-zinc-500">{dict["seri.detail.historyEmpty"]}</p>;
  }

  return (
    <table className="mt-2 w-full text-left text-sm">
      <thead>
        <tr className="border-b border-zinc-200 text-zinc-500">
          <th className="py-1 pr-2">{dict["seri.detail.historyColumns.action"]}</th>
          <th className="py-1 pr-2">{dict["seri.detail.historyColumns.change"]}</th>
          <th className="py-1 pr-2">{dict["seri.detail.historyColumns.reason"]}</th>
          <th className="py-1 pr-2">{dict["seri.detail.historyColumns.at"]}</th>
        </tr>
      </thead>
      <tbody>
        {history.map((row) => (
          <tr key={row.id} className="border-b border-zinc-100 align-top">
            <td className="py-1 pr-2 whitespace-nowrap">
            {dict[`seri.action.${row.action}`] ?? row.action}
          </td>
          <td className="py-1 pr-2">
            <AuditDiff
              before={row.before}
              after={row.after}
              fieldLabels={SERI_FIELD_LABELS}
              createFields={SERI_CREATE_FIELDS}
            />
          </td>
            <td className="py-1 pr-2">{row.reason ?? "—"}</td>
            <td className="py-1 pr-2">{new Date(row.created_at).toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
