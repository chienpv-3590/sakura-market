// Nhãn i18n cho từng cột DB, tách theo miền. Tái dùng khóa đã có ở list/form —
// không đẻ ra bộ nhãn thứ hai phải bảo trì song song (DRY).

export const LOT_FIELD_LABELS: Record<string, string> = {
  item: "lots.list.columns.item",
  lot_code: "lots.list.columns.code",
  package_count: "lots.list.columns.packageCount",
  initial_qty: "lots.list.columns.initialQty",
  available_qty: "lots.list.columns.availableQty",
  status: "lots.list.columns.status",
  grade: "lots.mekiki.gradeLabel",
  business_date: "lots.diff.businessDate",
};

// `intake_docs` used to be a typed string smuggled into this same audit row
// (phase-06 workaround for the missing column). It's a real attachment now
// -- its own `lot_attachment` row with its own `attach_document` audit entry
// (see attach-intake-doc.ts) -- so it's gone from both this list and
// LOT_FIELD_LABELS above rather than left as a dead, always-absent field.
export const LOT_CREATE_FIELDS = ["lot_code", "item", "package_count", "initial_qty"] as const;

export const TXN_FIELD_LABELS: Record<string, string> = {
  txn_code: "transactions.list.columns.code",
  lot_id: "transactions.list.columns.lot",
  buyer_participant_id: "transactions.list.columns.buyer",
  qty: "transactions.list.columns.qty",
  unit_price: "transactions.list.columns.unitPrice",
  business_date: "transactions.list.columns.businessDate",
  status: "transactions.list.columns.status",
};

export const TXN_CREATE_FIELDS = [
  "txn_code",
  "qty",
  "unit_price",
  "business_date",
  "status",
] as const;

export const SERI_FIELD_LABELS: Record<string, string> = {
  lot_id: "seri.list.columns.lot",
  winner_participant_id: "seri.list.columns.winner",
  qty: "seri.list.columns.qty",
  unit_price: "seri.list.columns.unitPrice",
  decided_at: "seri.list.columns.decidedAt",
};

export const SERI_CREATE_FIELDS = ["qty", "unit_price", "decided_at"] as const;
