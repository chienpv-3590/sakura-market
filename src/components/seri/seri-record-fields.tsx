import { FieldGrid, Field } from "@/components/layout/field-grid";

// SCR010 せり record, read-only.
//
// This section did not exist before: the page rendered the record ONLY into
// the edit form, so a role without edit rights (everything outside ROLE-TRADE
// / ROLE-SETTLEMENT) opened the screen and saw a handoff caption and a history
// table with no record above them. Presentation only -- the row was already
// loaded and already past RLS for whoever got this far.
export function SeriRecordFields({
  lotCode,
  lotItem,
  winnerName,
  qty,
  unitPrice,
  decidedAt,
  confirmedByName,
  dict,
}: {
  lotCode: string;
  lotItem: string;
  winnerName: string;
  qty: number;
  unitPrice: number;
  decidedAt: string;
  confirmedByName: string;
  dict: Record<string, string>;
}) {
  return (
    <FieldGrid>
      <Field label={dict["seri.form.lotLabel"]}>
        {lotItem ? `${lotCode} — ${lotItem}` : lotCode}
      </Field>
      <Field label={dict["seri.form.winnerLabel"]}>{winnerName}</Field>
      <Field label={dict["seri.form.qtyLabel"]} variant="mono">
        {qty}
      </Field>
      <Field label={dict["seri.form.unitPriceLabel"]} variant="mono">
        {unitPrice.toLocaleString()}
      </Field>
      <Field label={dict["seri.form.decidedAtLabel"]} variant="mono">
        {new Date(decidedAt).toLocaleString()}
      </Field>
      <Field label={dict["seri.form.confirmedByLabel"]}>{confirmedByName}</Field>
    </FieldGrid>
  );
}
