// SM-001 (FIG-010): the single source of truth for the participant eligibility
// state machine. Both the UI (which transition buttons to render) and the API
// (which transitions to accept) import this same table -- phase-05
// Architecture: "một hằng số duy nhất dùng chung cho cả UI và API".
//
// Status literals match the DB CHECK constraint on participant.status
// (supabase/migrations/20260904090100_participant.sql) exactly -- these are
// the real column values, not display labels. Display labels live in
// dictionaries/{locale}/participants.json under `status.<value>`.
export type ParticipantStatus = "có hiệu lực" | "tạm ngừng" | "mất hiệu lực" | "xét lại";

export const PARTICIPANT_STATUSES: readonly ParticipantStatus[] = [
  "có hiệu lực",
  "tạm ngừng",
  "mất hiệu lực",
  "xét lại",
];

// ASCII event codes -- stable wire identifiers for the transition API and for
// UI button keys/translation lookups (`event.<code>`). FIG-010 names each
// transition in Vietnamese business language; these codes are just how that
// name travels over JSON without encoding concerns.
export type TransitionEvent = "vi_pham" | "go" | "het_han" | "nop_don" | "chap_thuan";

export interface TransitionEdge {
  readonly from: ParticipantStatus;
  readonly event: TransitionEvent;
  readonly to: ParticipantStatus;
}

// Exactly 5 edges -- SM-001 allows no others. Any (from, event) or (from, to)
// pair not listed here must be rejected by callers (phase-05 Key Insights:
// "Mọi cặp (từ, đến) ngoài bảng đều phải bị từ chối" -- e.g. "Mất hiệu lực →
// Có hiệu lực" directly, skipping "Xét lại", is illegal).
export const TRANSITIONS: readonly TransitionEdge[] = [
  { from: "có hiệu lực", event: "vi_pham", to: "tạm ngừng" },
  { from: "tạm ngừng", event: "go", to: "có hiệu lực" },
  { from: "có hiệu lực", event: "het_han", to: "mất hiệu lực" },
  { from: "mất hiệu lực", event: "nop_don", to: "xét lại" },
  { from: "xét lại", event: "chap_thuan", to: "có hiệu lực" },
];

export function isParticipantStatus(value: string): value is ParticipantStatus {
  return (PARTICIPANT_STATUSES as readonly string[]).includes(value);
}

export function isTransitionEvent(value: string): value is TransitionEvent {
  return TRANSITIONS.some((edge) => edge.event === value);
}

/**
 * Events that can legally fire from the given current status, in FIG-010
 * order. The UI renders exactly these buttons -- never all 5 with the
 * illegal ones disabled (phase-05 Implementation Steps #9).
 */
export function allowedEvents(from: ParticipantStatus): TransitionEvent[] {
  return TRANSITIONS.filter((edge) => edge.from === from).map((edge) => edge.event);
}

/**
 * Resolves the destination status for a (from, event) pair, or `null` when
 * that pair is not one of the 5 SM-001 edges -- callers must reject (422),
 * never fall back to a guessed target.
 */
export function resolveTarget(
  from: ParticipantStatus,
  event: TransitionEvent,
): ParticipantStatus | null {
  const edge = TRANSITIONS.find((e) => e.from === from && e.event === event);
  return edge ? edge.to : null;
}
