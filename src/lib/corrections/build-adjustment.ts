export type AdjustmentKind = "reverse" | "delta";

export interface OriginalTransactionValues {
  qty: number;
  unitPrice: number;
}

export interface DeltaInput {
  qtyDelta: number;
  unitPriceDelta: number;
}

export interface AdjustmentValues {
  kind: AdjustmentKind;
  qtyDelta: number;
  unitPriceDelta: number;
  amountDelta: number;
}

/**
 * F008 A3. `transaction_adjustment`'s amount_delta = the JPY difference this
 * adjustment represents: (new total) - (old total), where "new" is the
 * original value plus whatever delta applies. For kind='reverse' the delta
 * IS the full original value negated (qty_delta=-qty, unit_price_delta=
 * -unit_price), so the new total is always 0 -- exactly
 * postlockcorrection/technical-spec.md §3.1's COR-01 example. For
 * kind='delta' the deltas come from the approver (see approve-correction.ts
 * for why -- the tech-spec's A3 request body carries `adjustment_kind` but
 * no numeric fields, a gap resolved here: the approver, who has reviewed the
 * evidence, supplies the corrected qty/price delta at approval time), and
 * this formula matches the COR-02 example exactly: qty=120, unit_price=850,
 * qtyDelta=0, unitPriceDelta=-50 -> amountDelta = 120*800 - 120*850 = -6000.
 */
export function buildAdjustment(
  kind: AdjustmentKind,
  original: OriginalTransactionValues,
  delta?: DeltaInput,
): AdjustmentValues {
  if (kind === "reverse") {
    return {
      kind,
      qtyDelta: -original.qty,
      unitPriceDelta: -original.unitPrice,
      amountDelta: -Math.round(original.qty * original.unitPrice),
    };
  }

  const qtyDelta = delta?.qtyDelta ?? 0;
  const unitPriceDelta = delta?.unitPriceDelta ?? 0;
  const oldTotal = original.qty * original.unitPrice;
  const newTotal = (original.qty + qtyDelta) * (original.unitPrice + unitPriceDelta);

  return { kind, qtyDelta, unitPriceDelta, amountDelta: Math.round(newTotal - oldTotal) };
}
