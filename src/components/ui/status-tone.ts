// Every business status in the app -> one design-system status tone.
//
// The design system ships five status tokens named for a property-management
// product. They are re-read here by SEMANTIC ROLE (full rationale in
// src/styles/design-tokens.css):
//
//   ok    <- status-occupied  active / succeeded / valid
//   wait  <- status-vacant    waiting on someone's decision
//   move  <- status-contract  committed and in flight
//   off   <- status-inactive  closed / superseded / not applicable
//   stop  <- status-overdue   blocked / refused / revoked
//
// One map, so a status can never wear two different colours on two screens.
// Colour is always paired with the translated label at the call site.
export type StatusTone = "ok" | "wait" | "move" | "off" | "stop";

const STATUS_TONE: Record<string, StatusTone> = {
  // lot: received -> published -> traded -> delivered
  received: "wait", // landed, awaiting 目利き / listing
  published: "move", // live on the floor
  traded: "move", // sold, delivery outstanding
  delivered: "ok",

  // transaction: draft -> confirmed | cancelled
  draft: "wait",
  confirmed: "ok",
  cancelled: "off",

  // delivery
  "chờ": "wait",
  "đang giao": "move",
  "hoàn tất": "ok",
  "ngoại lệ": "stop",

  // correction: pending -> approved | rejected
  pending: "wait",
  approved: "ok",
  rejected: "stop",

  // participant eligibility
  "có hiệu lực": "ok",
  "xét lại": "wait",
  "tạm ngừng": "off",
  "mất hiệu lực": "stop",

  // 完納奨励金 rule version (display status, computed at read time)
  pending_approval: "wait",
  scheduled: "move",
  active: "ok",
  superseded: "off",
  rolled_back: "stop",
};

/** Unknown status falls back to `off` -- never silently reads as success. */
export function toneFor(status: string): StatusTone {
  return STATUS_TONE[status] ?? "off";
}
