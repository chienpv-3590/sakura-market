import { FieldGrid, Field } from "@/components/layout/field-grid";
import { StatusBadge } from "@/components/ui/status-badge";

// SCR018 version header: which version, from when, its 承認 state, and the
// two people the two-person rule (DEC-001) names. `displayStatus` is the
// computed one (a version whose effective_from is still in the future reads
// `scheduled`, not `active`) -- resolved by the page, rendered here.
export function RuleVersionFields({
  versionNo,
  effectiveFrom,
  displayStatus,
  rawStatus,
  createdByName,
  approvedByName,
  dict,
}: {
  versionNo: number;
  effectiveFrom: string;
  displayStatus: string;
  rawStatus: string;
  createdByName: string | null;
  approvedByName: string | null;
  dict: Record<string, string>;
}) {
  return (
    <FieldGrid>
      <Field label={dict["incentive.rules.detail.versionNoLabel"]} variant="mono">
        {versionNo}
      </Field>
      <Field label={dict["incentive.rules.detail.effectiveFromLabel"]} variant="mono">
        {effectiveFrom}
      </Field>
      <Field label={dict["incentive.rules.detail.statusLabel"]} variant="node">
        <StatusBadge
          status={displayStatus}
          label={dict[`incentive.rules.status.${displayStatus}`] ?? rawStatus}
        />
      </Field>
      <Field label={dict["incentive.rules.detail.createdByLabel"]}>{createdByName ?? "—"}</Field>
      <Field label={dict["incentive.rules.detail.approvedByLabel"]}>{approvedByName ?? "—"}</Field>
    </FieldGrid>
  );
}
