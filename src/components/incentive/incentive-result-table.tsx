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
    return <p className="sm-empty">{dict["incentive.result.empty"]}</p>;
  }

  return (
    <div className="sm-table-wrap sm-table-scroll">
      <table className="sm-table">
        <thead>
          <tr>
            <th>{dict["incentive.result.columnPeriod"]}</th>
            <th>{dict["incentive.result.columnParticipant"]}</th>
            <th className="text-right">{dict["incentive.result.columnAmount"]}</th>
            <th>{dict["incentive.result.columnKind"]}</th>
            <th>{dict["incentive.result.columnRuleVersion"]}</th>
            <th>{dict["incentive.result.columnOriginPeriod"]}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id}>
              <td className="sm-mono text-strong">{row.period}</td>
              <td className="text-strong">{row.participantName}</td>
              <td className="sm-num text-strong">{row.amountJpy.toLocaleString()}</td>
              <td>
                <span className={`sm-badge ${row.kind === "delta" ? "sm-tone-move" : "sm-tone-money"}`}>
                  {row.kind === "delta" ? dict["incentive.result.kindDelta"] : dict["incentive.result.kindNormal"]}
                </span>
              </td>
              <td className="sm-mono text-secondary">
                v{row.ruleVersionNo} ({row.ruleEffectiveFrom})
              </td>
              <td className="sm-mono text-muted">{row.originPeriod ?? "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
