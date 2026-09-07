import type { Tables } from "@/lib/db/types";
import { FieldGrid, Field } from "@/components/layout/field-grid";
import { EligibilityStatusBadge } from "./eligibility-status-badge";

// SCR003 profile block: category / license type / 許可 state / validity window.
// Server Component -- the page has the dictionary and the already-narrowed
// row, so this only renders it.
export function ParticipantProfileFields({
  participant,
  dict,
}: {
  participant: Tables<"participant">;
  dict: Record<string, string>;
}) {
  return (
    <FieldGrid>
      <Field label={dict["participants.detail.categoryLabel"]}>
        {dict[`category.${participant.category}`] ?? participant.category}
      </Field>
      <Field label={dict["participants.detail.licenseTypeLabel"]}>
        {dict[`licenseType.${participant.license_type}`] ?? participant.license_type}
      </Field>
      <Field label={dict["participants.detail.statusLabel"]} variant="node">
        <EligibilityStatusBadge
          status={participant.status}
          label={dict[`status.${participant.status}`] ?? participant.status}
        />
      </Field>
      <Field label={dict["participants.detail.validFromLabel"]} variant="mono">
        {participant.valid_from}
      </Field>
      <Field label={dict["participants.detail.validToLabel"]} variant="mono">
        {participant.valid_to ?? dict["participants.detail.validToNone"]}
      </Field>
    </FieldGrid>
  );
}
