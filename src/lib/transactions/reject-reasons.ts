// FR-AITAI-02 (BR-PERM-01 / BR-LOT-02 gates) + FR-AITAI-03 (cancel guard).
// The API layer (confirm/cancel route handlers) returns ONLY these reason
// codes -- never a hardcoded Vietnamese string -- so the FE translates
// through whichever locale is active (phase-07 Implementation Steps #2,
// Success Criteria #9). Any `detail` a route also returns alongside a reason
// (e.g. eligibility.ts's own message) is diagnostic only and must never be
// rendered directly -- it may carry a hardcoded VI sentence.
export type ConfirmRejectReason =
  | "NOT_DRAFT"
  | "INELIGIBLE_PARTY"
  | "INSUFFICIENT_QTY"
  | "LOCKED_BUSINESS_DATE";

export type CancelRejectReason = "NOT_CANCELLABLE" | "LOCKED_BUSINESS_DATE";

export const CONFIRM_REJECT_I18N_KEY: Record<ConfirmRejectReason, string> = {
  NOT_DRAFT: "transactions.confirm.error.notDraft",
  INELIGIBLE_PARTY: "transactions.confirm.error.ineligibleParty",
  INSUFFICIENT_QTY: "transactions.confirm.error.insufficientQty",
  LOCKED_BUSINESS_DATE: "transactions.confirm.error.locked",
};

export const CANCEL_REJECT_I18N_KEY: Record<CancelRejectReason, string> = {
  NOT_CANCELLABLE: "transactions.cancel.error.notCancellable",
  LOCKED_BUSINESS_DATE: "transactions.cancel.error.locked",
};

export function isConfirmRejectReason(value: string): value is ConfirmRejectReason {
  return Object.prototype.hasOwnProperty.call(CONFIRM_REJECT_I18N_KEY, value);
}

export function isCancelRejectReason(value: string): value is CancelRejectReason {
  return Object.prototype.hasOwnProperty.call(CANCEL_REJECT_I18N_KEY, value);
}
