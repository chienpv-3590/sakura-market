// F008 A1/A3. Route handlers return only these codes -- never a hardcoded
// Vietnamese string -- so the FE translates through whichever locale is
// active (same convention as transactions/reject-reasons.ts).
import type { CreateCorrectionReason } from "./create-correction";
import type { ApproveCorrectionReason } from "./approve-correction";
import type { UploadEvidenceReason } from "./evidence-upload";

export const CREATE_REJECT_I18N_KEY: Record<CreateCorrectionReason, string> = {
  TXN_NOT_FOUND: "corrections.error.txnNotFound",
  NOT_LOCKED: "corrections.error.notLocked",
};

export const EVIDENCE_REJECT_I18N_KEY: Record<UploadEvidenceReason, string> = {
  INVALID_TYPE: "corrections.error.invalidEvidenceType",
  TOO_LARGE: "corrections.error.evidenceTooLarge",
};

export const APPROVE_REJECT_I18N_KEY: Record<ApproveCorrectionReason, string> = {
  NOT_FOUND: "corrections.error.notFound",
  SELF_APPROVAL: "corrections.error.selfApproval",
  ALREADY_DECIDED: "corrections.error.alreadyDecided",
  INVALID_ADJUSTMENT: "corrections.error.invalidAdjustment",
};

export function isCreateRejectReason(value: string): value is CreateCorrectionReason {
  return Object.prototype.hasOwnProperty.call(CREATE_REJECT_I18N_KEY, value);
}

export function isEvidenceRejectReason(value: string): value is UploadEvidenceReason {
  return Object.prototype.hasOwnProperty.call(EVIDENCE_REJECT_I18N_KEY, value);
}

export function isApproveRejectReason(value: string): value is ApproveCorrectionReason {
  return Object.prototype.hasOwnProperty.call(APPROVE_REJECT_I18N_KEY, value);
}
