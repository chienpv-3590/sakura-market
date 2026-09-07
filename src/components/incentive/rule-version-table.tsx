import Link from "next/link";
import type { RuleVersionListRow } from "@/lib/incentive/rule-version-queries";
import type { RuleVersionDisplayStatus } from "@/lib/incentive/rule-version-display-status";

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
    return <p className="text-sm text-zinc-600">{dict["incentive.rules.list.empty"]}</p>;
  }

  return (
    <table className="w-full border-collapse text-sm">
      <thead>
        <tr className="border-b border-zinc-300 text-left text-zinc-500">
          <th className="py-2 pr-4">{dict["incentive.rules.list.columnVersionNo"]}</th>
          <th className="py-2 pr-4">{dict["incentive.rules.list.columnEffectiveFrom"]}</th>
          <th className="py-2 pr-4">{dict["incentive.rules.list.columnStatus"]}</th>
          <th className="py-2 pr-4">{dict["incentive.rules.list.columnCreatedBy"]}</th>
          <th className="py-2 pr-4">{dict["incentive.rules.list.columnApprovedBy"]}</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.id} className="border-b border-zinc-100">
            <td className="py-2 pr-4">
              <Link href={`/incentive/rules/${row.id}`} className="font-medium text-zinc-900 hover:underline">
                v{row.version_no}
              </Link>
            </td>
            <td className="py-2 pr-4 text-zinc-900">{row.effective_from}</td>
            <td className="py-2 pr-4 text-zinc-700">
              {dict[`incentive.rules.status.${displayStatus.get(row.id) ?? row.status}`] ?? row.status}
            </td>
            <td className="py-2 pr-4 text-zinc-700">{row.createdByName ?? "—"}</td>
            <td className="py-2 pr-4 text-zinc-700">{row.approvedByName ?? "—"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
