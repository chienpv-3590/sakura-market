// FR-LOT-01. POST /api/lots returns only these codes for a rejected intake
// document -- never a hardcoded Vietnamese/Japanese string -- so the FE
// translates through whichever locale is active (same convention as
// corrections/correction-reject-reasons.ts).
import type { IntakeDocReason } from "./intake-doc-upload";

export const INTAKE_DOC_REJECT_I18N_KEY: Record<IntakeDocReason, string> = {
  INVALID_TYPE: "lots.intake.error.invalidDocType",
  TOO_LARGE: "lots.intake.error.docTooLarge",
};

export function isIntakeDocRejectReason(value: string): value is IntakeDocReason {
  return Object.prototype.hasOwnProperty.call(INTAKE_DOC_REJECT_I18N_KEY, value);
}
