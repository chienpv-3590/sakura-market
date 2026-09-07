// Every business status in the app -> one design-system status tone.
// This file is the ONLY map from domain state to colour.
//
// The tone names are the design system's own -- StatusBadge.jsx ships this
// exact vocabulary, and each one is a fixed pairing of three status tokens
// (fg / bg / solid). They are re-read here by SEMANTIC ROLE, because the
// design system was authored for a property-management product:
//
//   ok        <- status-occupied    active / succeeded / valid
//   warn      <- status-vacant      waiting on someone's decision
//   contract  <- status-contract    committed and in flight
//   idle      <- status-inactive    closed / superseded / not applicable
//   error     <- status-overdue     blocked / refused / revoked
//   forecast  <- accent-valuation   an estimate, not a fact (目利き grading)
//   info      <- status-info        neutral notice
//
// One map, so a status can never wear two different colours on two screens.
// Colour is always paired with the translated label at the call site.
export type StatusTone =
  | "ok"
  | "warn"
  | "error"
  | "contract"
  | "idle"
  | "forecast"
  | "info";

const STATUS_TONE: Record<string, StatusTone> = {
  // lot: received -> published -> traded -> delivered
  received: "warn", // landed, awaiting 目利き / listing
  published: "contract", // live on the floor
  traded: "contract", // sold, delivery outstanding
  delivered: "ok",

  // transaction: draft -> confirmed | cancelled
  draft: "warn",
  confirmed: "ok",
  cancelled: "idle",

  // delivery
  "chờ": "warn",
  "đang giao": "contract",
  "hoàn tất": "ok",
  "ngoại lệ": "error",

  // correction: pending -> approved | rejected
  pending: "warn",
  approved: "ok",
  rejected: "error",

  // participant eligibility
  "có hiệu lực": "ok",
  "xét lại": "warn",
  "tạm ngừng": "idle",
  "mất hiệu lực": "error",

  // 完納奨励金 rule version (display status, computed at read time)
  pending_approval: "warn",
  scheduled: "contract",
  active: "ok",
  superseded: "idle",
  rolled_back: "error",

  // JST business day. A locked day REFUSES writes, so it is an obstruction,
  // never a completion -- `error`, the same tone as a rejected correction.
  day_locked: "error",
  day_open: "ok",

  // Progress-bar step POSITIONS, not domain states (see StageProgressBar).
  // A step already passed reads `ok` whatever its own status tone is; a step
  // not yet reached reads `idle`. Kept in this map so the progress bar cannot
  // drift away from the one place colour is decided.
  step_passed: "ok",
  step_upcoming: "idle",
};

/** Unknown status falls back to `idle` -- never silently reads as success. */
export function toneFor(status: string): StatusTone {
  return STATUS_TONE[status] ?? "idle";
}
