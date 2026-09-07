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
  intake_docs: "lots.intake.intakeDocsLabel",
  business_date: "lots.diff.businessDate",
};

export const LOT_CREATE_FIELDS = [
  "lot_code",
  "item",
  "package_count",
  "initial_qty",
  "intake_docs",
] as const;

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
