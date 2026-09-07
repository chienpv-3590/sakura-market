import { ROLES, type Role } from "@/lib/auth/role-landing";

export type PipelineStageId =
  | "lots-received"
  | "lots-published"
  | "transactions-draft"
  | "transactions-confirmed"
  | "deliveries-in-progress"
  | "business-day-lock"
  | "corrections-pending";

export type PipelineStageDef = {
  id: PipelineStageId;
  titleKey: string;
  href: string;
  /**
   * Roles allowed to see the real value behind this card. Mirrored 1:1 from
   * the requireRole()/requireUser() gate already enforced on the destination
   * screen (see e.g. corrections/page.tsx: `requireRole(["ROLE-SETTLEMENT"])`)
   * -- never invented here. Every stage below whose screen is reachable by
   * requireUser() alone lists every role (ROLES); "corrections-pending" is
   * the one stage whose screen is further gated, so it lists only that role.
   */
  allowedRoles: readonly Role[];
};

// Left-to-right flow order: intake/thẩm định -> bán -> giao nhận -> đối
// chiếu -> điều chỉnh. See WHY section of the task brief for the full
// stage/screen/role table this mirrors.
export const PIPELINE_STAGES: readonly PipelineStageDef[] = [
  {
    id: "lots-received",
    titleKey: "home.stage.lotsReceived.title",
    href: "/lots",
    allowedRoles: ROLES,
  },
  {
    id: "lots-published",
    titleKey: "home.stage.lotsPublished.title",
    href: "/lots",
    allowedRoles: ROLES,
  },
  {
    id: "transactions-draft",
    titleKey: "home.stage.transactionsDraft.title",
    href: "/transactions?status=draft",
    allowedRoles: ROLES,
  },
  {
    id: "transactions-confirmed",
    titleKey: "home.stage.transactionsConfirmed.title",
    href: "/transactions?status=confirmed",
    allowedRoles: ROLES,
  },
  {
    id: "deliveries-in-progress",
    titleKey: "home.stage.deliveriesInProgress.title",
    href: `/deliveries?status=${encodeURIComponent("đang giao")}`,
    allowedRoles: ROLES,
  },
  {
    id: "business-day-lock",
    titleKey: "home.stage.businessDayLock.title",
    href: "/reconciliation",
    allowedRoles: ROLES,
  },
  {
    id: "corrections-pending",
    titleKey: "home.stage.correctionsPending.title",
    href: "/corrections",
    // corrections/page.tsx gates the whole screen behind
    // requireRole(["ROLE-SETTLEMENT"]) -- every other role gets a 404 there,
    // so their card must not claim a real count either.
    allowedRoles: ["ROLE-SETTLEMENT"],
  },
];
