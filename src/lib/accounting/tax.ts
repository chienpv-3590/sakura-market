// IF-ACC-01 tax rule -- WORKING ASSUMPTION PENDING CUSTOMER CONFIRMATION, not
// settled fact. `grep -rniE "tax|thu[eế]|消費税"` across supabase/ and src/
// returns 0 hits: RFP §08-03 lists "thuế" (tax) as a minimum export field but
// never states the rate, whether unit_price is 税込 (inclusive) or 税抜
// (exclusive), or whether tax is computed per line or per participant/day.
//
// Decision (phase-02 §Key Insights #1): no tax column on `transaction` --
// that would silently assert the market records tax per trade, a business
// fact nobody has granted us. Tax is derived at export time from this single
// constant, and the rate actually used is stamped onto every batch row
// (accounting_export_batch.tax_rate_bps) -- same FR-AUDIT-03 discipline
// `incentive_result` already uses for `rule_version_id`. Change the rate
// later by changing this one constant; every past batch still explains
// itself via its own stamped tax_rate_bps.
export const TAX_RATE_BPS = 800; // 8% 軽減税率 (giam ap thuc pham -- thuy san la thuc pham). Thue suat pho thong Nhat la 10%.
export const TAX_BASIS = "exclusive" as const; // gia dinh: unit_price dang luu la gia thue ngoai (税抜)

/**
 * JPY co so, khong co don vi nho hon 1 yen -- luon lam tron XUONG
 * (Math.floor), cung ky luat calculate-incentive.ts:15 (BR-001 tuong duong
 * ben ke toan). `netJpy` la tong tien theo TUNG NGUOI THAM GIA trong ngay
 * (khong phai tinh rieng theo tung dong giao dich) -- gia dinh thu ba trong
 * phase-02 §Key Insights #1.
 */
export function calculateTaxJpy(netJpy: number): number {
  return Math.floor((netJpy * TAX_RATE_BPS) / 10000);
}
