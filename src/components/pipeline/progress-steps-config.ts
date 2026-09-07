import type { Role } from "@/lib/auth/role-landing";

export type ProgressKind = "lot" | "transaction" | "delivery";

export type ProgressStepDef = {
  status: string;
  labelKey: string;
  /** Roles that act FROM this status. Empty = nothing left to do here. */
  nextActorRoles: readonly Role[];
};

// Happy-path steps, in flow order. Labels reuse each domain's own existing
// `*.status.*` dictionary keys (already present, already vi/ja parity-checked)
// -- no new business-namespace keys needed for this.
const LOT_MAIN_STEPS: readonly ProgressStepDef[] = [
  { status: "received", labelKey: "lots.status.received", nextActorRoles: ["ROLE-JUDGE"] },
  { status: "published", labelKey: "lots.status.published", nextActorRoles: ["ROLE-TRADE"] },
  { status: "traded", labelKey: "lots.status.traded", nextActorRoles: ["ROLE-DELIVERY"] },
  { status: "delivered", labelKey: "lots.status.delivered", nextActorRoles: [] },
];

const TRANSACTION_MAIN_STEPS: readonly ProgressStepDef[] = [
  { status: "draft", labelKey: "transactions.status.draft", nextActorRoles: ["ROLE-TRADE"] },
  { status: "confirmed", labelKey: "transactions.status.confirmed", nextActorRoles: ["ROLE-DELIVERY"] },
];
// cancelled is a terminal side-outcome reachable from draft (see WHY diagram:
// "draft --> confirmed | cancelled"), not a step further along the happy path.
const TRANSACTION_BRANCHES: readonly ProgressStepDef[] = [
  { status: "cancelled", labelKey: "transactions.status.cancelled", nextActorRoles: [] },
];

const DELIVERY_MAIN_STEPS: readonly ProgressStepDef[] = [
  { status: "chờ", labelKey: "deliveries.status.chờ", nextActorRoles: ["ROLE-DELIVERY"] },
  { status: "đang giao", labelKey: "deliveries.status.đang giao", nextActorRoles: ["ROLE-DELIVERY", "ROLE-SETTLEMENT"] },
  { status: "hoàn tất", labelKey: "deliveries.status.hoàn tất", nextActorRoles: [] },
];
// ngoại lệ is a terminal side-outcome reachable from đang giao (see WHY
// diagram: "chờ --> đang giao --> hoàn tất | ngoại lệ").
const DELIVERY_BRANCHES: readonly ProgressStepDef[] = [
  { status: "ngoại lệ", labelKey: "deliveries.status.ngoại lệ", nextActorRoles: [] },
];

const MODELS: Record<ProgressKind, { main: readonly ProgressStepDef[]; branches: readonly ProgressStepDef[] }> = {
  lot: { main: LOT_MAIN_STEPS, branches: [] },
  transaction: { main: TRANSACTION_MAIN_STEPS, branches: TRANSACTION_BRANCHES },
  delivery: { main: DELIVERY_MAIN_STEPS, branches: DELIVERY_BRANCHES },
};

export type ProgressView =
  | { type: "main"; mainSteps: readonly ProgressStepDef[]; currentIndex: number; nextActorRoles: readonly Role[] }
  | { type: "branch"; mainSteps: readonly ProgressStepDef[]; branch: ProgressStepDef }
  | { type: "unknown"; status: string };

/**
 * Derives the current step purely from `status` -- the record's actual,
 * live column value. Never a hardcoded stage: a status this function
 * doesn't recognize (data drift, a future status value) falls through to
 * "unknown" rather than guessing a position.
 */
export function resolveProgressView(kind: ProgressKind, status: string): ProgressView {
  const model = MODELS[kind];

  const mainIndex = model.main.findIndex((step) => step.status === status);
  if (mainIndex !== -1) {
    return {
      type: "main",
      mainSteps: model.main,
      currentIndex: mainIndex,
      nextActorRoles: model.main[mainIndex].nextActorRoles,
    };
  }

  const branch = model.branches.find((step) => step.status === status);
  if (branch) {
    return { type: "branch", mainSteps: model.main, branch };
  }

  return { type: "unknown", status };
}
