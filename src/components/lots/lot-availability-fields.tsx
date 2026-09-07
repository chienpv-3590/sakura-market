import { FieldGrid, Field } from "@/components/layout/field-grid";
import { StatusBadge } from "@/components/ui/status-badge";

// SCR006_LotDetail / REG-AVAILABILITY: read-only available_qty + initial_qty
// + status. Was the top half of AvailabilityPanel; split out because the
// lot's audit trail is a section of its own with its own card, and one
// component cannot sit inside two cards.
export function LotAvailabilityFields({
  availableQty,
  initialQty,
  status,
  dict,
}: {
  availableQty: number;
  initialQty: number;
  status: string;
  dict: Record<string, string>;
}) {
  return (
    <FieldGrid>
      <Field label={dict["lots.detail.availableQtyLabel"]} variant="figure">
        {availableQty}
      </Field>
      <Field label={dict["lots.detail.initialQtyLabel"]} variant="figure">
        {initialQty}
      </Field>
      <Field label={dict["lots.detail.statusLabel"]} variant="node">
        <StatusBadge status={status} label={dict[`lots.status.${status}`] ?? status} />
      </Field>
    </FieldGrid>
  );
}
