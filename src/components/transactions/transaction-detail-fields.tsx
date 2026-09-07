import { FieldGrid, Field } from "@/components/layout/field-grid";
import { StatusBadge } from "@/components/ui/status-badge";

// SCR008 detail: the 相対取引 record itself, read-only. Server Component --
// the page already has the dictionary and the joined lot/buyer rows, so this
// takes strings and renders them.
export function TransactionDetailFields({
  lotCode,
  lotItem,
  buyerName,
  qty,
  unitPrice,
  businessDate,
  status,
  dict,
}: {
  lotCode: string;
  lotItem: string;
  buyerName: string;
  qty: number;
  unitPrice: number;
  businessDate: string;
  status: string;
  dict: Record<string, string>;
}) {
  return (
    <FieldGrid>
      <Field label={dict["transactions.detail.lotLabel"]}>
        {lotItem ? `${lotCode} — ${lotItem}` : lotCode}
      </Field>
      <Field label={dict["transactions.detail.buyerLabel"]}>{buyerName}</Field>
      <Field label={dict["transactions.detail.qtyLabel"]} variant="mono">
        {qty}
      </Field>
      <Field label={dict["transactions.detail.unitPriceLabel"]} variant="mono">
        {unitPrice.toLocaleString()}
      </Field>
      <Field label={dict["transactions.detail.businessDateLabel"]} variant="mono">
        {businessDate}
      </Field>
      <Field label={dict["transactions.detail.statusLabel"]} variant="node">
        <StatusBadge status={status} label={dict[`transactions.status.${status}`] ?? status} />
      </Field>
    </FieldGrid>
  );
}
