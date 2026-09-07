import Link from "next/link";
import type { RuleVersionListRow } from "@/lib/incentive/rule-version-queries";
import type { RuleVersionDisplayStatus } from "@/lib/incentive/rule-version-display-status";
import { StatusBadge } from "@/components/ui/status-badge";
import { EmptyState } from "@/components/ui/empty-state";

// SCR017_RuleVersionList. `displayStatus` is computed server-side (SM-001 §
// 4.3 -- superseded/scheduled are read-time labels, never a stored column).
export function RuleVersionTable({
  rows,
  displayStatus,
  dict,
}: {
  rows: RuleVersionListRow[];
  displayStatus: Map<string, RuleVersionDisplayStatus>;
  dict: Record<string, string>;
}) {
  if (rows.length === 0) {
    return <EmptyState description={dict["incentive.rules.list.empty"]} />;
  }

  return (
    <div className="cds-table__wrap">
      <table className="cds-table cds-table--default cds-table--hover">
        <thead>
          <tr>
            <th className="text-right">{dict["incentive.rules.list.columnVersionNo"]}</th>
            <th>{dict["incentive.rules.list.columnEffectiveFrom"]}</th>
            <th>{dict["incentive.rules.list.columnStatus"]}</th>
            <th>{dict["incentive.rules.list.columnCreatedBy"]}</th>
            <th>{dict["incentive.rules.list.columnApprovedBy"]}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id}>
              <td className="cds-table__num cds-table__mono">
                <Link href={`/incentive/rules/${row.id}`} className="font-medium text-strong hover:underline">
                  v{row.version_no}
                </Link>
              </td>
              <td className="cds-table__mono text-strong">{row.effective_from}</td>
              <td>
                <StatusBadge
                  status={displayStatus.get(row.id) ?? row.status}
                  label={dict[`incentive.rules.status.${displayStatus.get(row.id) ?? row.status}`] ?? row.status}
                />
              </td>
              <td className="text-secondary">{row.createdByName ?? "—"}</td>
              <td className="text-secondary">{row.approvedByName ?? "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
