import type { IncentiveResultRow } from "@/lib/incentive/incentive-result-queries";
import { EmptyState } from "@/components/ui/empty-state";

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
    return <EmptyState description={dict["incentive.result.empty"]} />;
  }

  return (
    <div className="cds-table__wrap">
      <table className="cds-table cds-table--default cds-table--hover">
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
              <td className="cds-table__mono text-strong">{row.period}</td>
              <td className="text-strong">{row.participantName}</td>
              <td className="cds-table__num cds-table__mono text-strong">{row.amountJpy.toLocaleString()}</td>
              <td>
                <span className={`cds-statusbadge ${row.kind === "delta" ? "cds-statusbadge--contract" : "cds-statusbadge--info"}`}>
                  {row.kind === "delta" ? dict["incentive.result.kindDelta"] : dict["incentive.result.kindNormal"]}
                </span>
              </td>
              <td className="cds-table__mono text-secondary">
                v{row.ruleVersionNo} ({row.ruleEffectiveFrom})
              </td>
              <td className="cds-table__mono text-muted">{row.originPeriod ?? "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
