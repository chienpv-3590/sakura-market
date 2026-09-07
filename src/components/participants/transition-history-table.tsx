import type { Tables } from "@/lib/db/types";
import { EligibilityStatusBadge } from "./eligibility-status-badge";
import { EmptyState } from "@/components/ui/empty-state";

type HistoryRow = Tables<"participant_status_history">;

// SCR003 history block. Append-only source data (no update/delete route or
// RLS policy exists for participant_status_history -- see phase-05 Security
// Considerations). Server Component: receives dict + a changed_by lookup map
// instead of calling useT()/querying app_user itself.
export function TransitionHistoryTable({
  history,
  changedByNames,
  dict,
}: {
  history: HistoryRow[];
  changedByNames: Record<string, string>;
  dict: Record<string, string>;
}) {
  if (history.length === 0) {
    return <EmptyState description={dict["participants.detail.historyEmpty"]} />;
  }

  return (
    <div className="cds-table__wrap">
      <table className="cds-table cds-table--default cds-table--hover">
        <thead>
          <tr>
            <th>{dict["participants.detail.historyHeaderFrom"]}</th>
            <th>{dict["participants.detail.historyHeaderTo"]}</th>
            <th>{dict["participants.detail.historyHeaderReason"]}</th>
            <th>{dict["participants.detail.historyHeaderChangedBy"]}</th>
            <th>{dict["participants.detail.historyHeaderChangedAt"]}</th>
          </tr>
        </thead>
        <tbody>
          {history.map((h) => (
            <tr key={h.id}>
              <td>
                {h.from_status ? (
                  <EligibilityStatusBadge
                    status={h.from_status}
                    label={dict[`status.${h.from_status}`] ?? h.from_status}
                  />
                ) : (
                  "—"
                )}
              </td>
              <td>
                <EligibilityStatusBadge
                  status={h.to_status}
                  label={dict[`status.${h.to_status}`] ?? h.to_status}
                />
              </td>
              <td>{h.reason}</td>
              <td>{(h.changed_by && changedByNames[h.changed_by]) ?? "—"}</td>
              <td>{new Date(h.changed_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
