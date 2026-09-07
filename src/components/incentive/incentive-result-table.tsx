import type { IncentiveResultRow } from "@/lib/incentive/incentive-result-queries";

// SCR016_IncentiveResult (FR-303). The rule-version + effective-date columns
// are ALWAYS visible -- FR-AUDIT-03 requires that opening any result shows
// which version produced it, so this is a plain column, not a click-to-open
// detail. `kind='delta'` rows additionally carry originPeriod.
export function IncentiveResultTable({
  rows,
  dict,
}: {
  rows: IncentiveResultRow[];
  dict: Record<string, string>;
}) {
  if (rows.length === 0) {
    return <p className="text-sm text-zinc-600">{dict["incentive.result.empty"]}</p>;
  }

  return (
    <table className="w-full border-collapse text-sm">
      <thead>
        <tr className="border-b border-zinc-300 text-left text-zinc-500">
          <th className="py-2 pr-4">{dict["incentive.result.columnPeriod"]}</th>
          <th className="py-2 pr-4">{dict["incentive.result.columnParticipant"]}</th>
          <th className="py-2 pr-4">{dict["incentive.result.columnAmount"]}</th>
          <th className="py-2 pr-4">{dict["incentive.result.columnKind"]}</th>
          <th className="py-2 pr-4">{dict["incentive.result.columnRuleVersion"]}</th>
          <th className="py-2 pr-4">{dict["incentive.result.columnOriginPeriod"]}</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.id} className="border-b border-zinc-100">
            <td className="py-2 pr-4 text-zinc-900">{row.period}</td>
            <td className="py-2 pr-4 text-zinc-900">{row.participantName}</td>
            <td className="py-2 pr-4 text-zinc-900">{row.amountJpy.toLocaleString()}</td>
            <td className="py-2 pr-4 text-zinc-700">
              {row.kind === "delta" ? dict["incentive.result.kindDelta"] : dict["incentive.result.kindNormal"]}
            </td>
            <td className="py-2 pr-4 text-zinc-700">
              v{row.ruleVersionNo} ({row.ruleEffectiveFrom})
            </td>
            <td className="py-2 pr-4 text-zinc-500">{row.originPeriod ?? "—"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
