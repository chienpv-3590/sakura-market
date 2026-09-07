// F006 A2/A3. Route handlers return only these codes -- never a hardcoded
// Vietnamese string -- so the FE translates through whichever locale is
// active (same convention as transactions/reject-reasons.ts).
import type { RecordShipmentReason } from "./record-shipment";
import type { CompleteDeliveryReason } from "./complete-delivery";

export const SHIPMENT_REJECT_I18N_KEY: Record<RecordShipmentReason, string> = {
  NOT_FOUND: "deliveries.error.notFound",
  ALREADY_COMPLETED: "deliveries.error.alreadyCompleted",
  OVER_DELIVERY: "deliveries.error.overDelivery",
};

export const COMPLETE_REJECT_I18N_KEY: Record<CompleteDeliveryReason, string> = {
  NOT_FOUND: "deliveries.error.notFound",
  ALREADY_COMPLETED: "deliveries.error.alreadyCompleted",
  QTY_MISMATCH: "deliveries.error.qtyMismatch",
};

export function isShipmentRejectReason(value: string): value is RecordShipmentReason {
  return Object.prototype.hasOwnProperty.call(SHIPMENT_REJECT_I18N_KEY, value);
}

export function isCompleteRejectReason(value: string): value is CompleteDeliveryReason {
  return Object.prototype.hasOwnProperty.call(COMPLETE_REJECT_I18N_KEY, value);
}
