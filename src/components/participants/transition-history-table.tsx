import type { Tables } from "@/lib/db/types";

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
    return <p className="text-sm text-zinc-500">{dict["participants.detail.historyEmpty"]}</p>;
  }

  return (
    <table className="w-full border-collapse text-sm">
      <thead>
        <tr className="border-b border-zinc-200 text-left text-zinc-500">
          <th className="py-2 pr-4 font-medium">{dict["participants.detail.historyHeaderFrom"]}</th>
          <th className="py-2 pr-4 font-medium">{dict["participants.detail.historyHeaderTo"]}</th>
          <th className="py-2 pr-4 font-medium">{dict["participants.detail.historyHeaderReason"]}</th>
          <th className="py-2 pr-4 font-medium">{dict["participants.detail.historyHeaderChangedBy"]}</th>
          <th className="py-2 pr-4 font-medium">{dict["participants.detail.historyHeaderChangedAt"]}</th>
        </tr>
      </thead>
      <tbody>
        {history.map((h) => (
          <tr key={h.id} className="border-b border-zinc-100">
            <td className="py-2 pr-4">
              {h.from_status ? (dict[`status.${h.from_status}`] ?? h.from_status) : "—"}
            </td>
            <td className="py-2 pr-4">{dict[`status.${h.to_status}`] ?? h.to_status}</td>
            <td className="py-2 pr-4">{h.reason}</td>
            <td className="py-2 pr-4">{(h.changed_by && changedByNames[h.changed_by]) ?? "—"}</td>
            <td className="py-2 pr-4">{new Date(h.changed_at).toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
