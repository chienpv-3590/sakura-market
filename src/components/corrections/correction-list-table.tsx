import { CorrectionApprovalPanel } from "./correction-approval-panel";

export interface CorrectionRowView {
  id: string;
  txnCode: string;
  reason: string;
  status: string;
  evidenceUrl: string | null;
  canDecide: boolean;
}

// SCR015_CorrectionApproval list (A2, DEC-001). Server Component: the
// per-row CorrectionApprovalPanel only self-renders when `canDecide` is true
// -- computed server-side by the page from status/requested_by/currentUser.
export function CorrectionListTable({ rows, dict }: { rows: CorrectionRowView[]; dict: Record<string, string> }) {
  if (rows.length === 0) {
    return <p className="text-sm text-zinc-500">{dict["corrections.list.empty"]}</p>;
  }

  return (
    <ul className="space-y-4">
      {rows.map((row) => (
        <li key={row.id} className="space-y-2 rounded-md border border-zinc-200 p-4">
          <div className="flex items-center justify-between">
            <span className="font-mono text-sm">{row.txnCode}</span>
            <span className="text-sm text-zinc-500">
              {dict[`corrections.status.${row.status}`] ?? row.status}
            </span>
          </div>
          <p className="text-sm text-zinc-700">{row.reason}</p>
          {row.evidenceUrl && (
            <a href={row.evidenceUrl} target="_blank" rel="noreferrer" className="text-sm text-zinc-700 underline">
              {dict["corrections.list.evidenceLink"]}
            </a>
          )}
          <CorrectionApprovalPanel correctionId={row.id} canDecide={row.canDecide} />
        </li>
      ))}
    </ul>
  );
}
