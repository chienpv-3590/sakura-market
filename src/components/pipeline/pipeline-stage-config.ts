import { ROLES, type Role } from "@/lib/auth/role-landing";

export type PipelineStageId =
  | "lots-received"
  | "lots-published"
  | "transactions-draft"
  | "transactions-confirmed"
  | "transactions-cancelled"
  | "seri-results"
  | "deliveries-in-progress"
  | "deliveries-exception"
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
    id: "transactions-cancelled",
    titleKey: "home.stage.transactionsCancelled.title",
    href: "/transactions?status=cancelled",
    allowedRoles: ROLES,
  },
  {
    id: "seri-results",
    titleKey: "home.stage.seriResults.title",
    href: "/seri",
    allowedRoles: ROLES,
  },
  {
    id: "deliveries-in-progress",
    titleKey: "home.stage.deliveriesInProgress.title",
    href: `/deliveries?status=${encodeURIComponent("đang giao")}`,
    allowedRoles: ROLES,
  },
  {
    // Trang thai nay CO trong schema va CO trong luong nghiep vu (FIG-013),
    // nhung FR-DEL-03 nam ngoai pham vi ban nay nen khong duong code nao set
    // duoc no. Giu lai trong so do vi bo nhanh di la ve sai luong; nhung
    // resolveStageValue tra ve kind:"notBuilt" nen no hien nhan "chua dung"
    // thay vi con so 0 khong bao gio khac duoc. Cung cach xu ly nhu 9 bao cao
    // mock. Xem docs/pham-vi-va-phan-mock.md.
    id: "deliveries-exception",
    titleKey: "home.stage.deliveriesException.title",
    href: `/deliveries?status=${encodeURIComponent("ngoại lệ")}`,
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
