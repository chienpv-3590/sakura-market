// TBL-ROLE-01 -- the 7 internal roles. Source of truth for `app_user.role`
// (also enforced by a Postgres CHECK constraint, Phase 03 core_identity.sql).
export type Role =
  | "ROLE-INTAKE"
  | "ROLE-JUDGE"
  | "ROLE-TRADE"
  | "ROLE-DELIVERY"
  | "ROLE-SETTLEMENT"
  | "ROLE-RULE-ADMIN"
  | "ROLE-SYS-ADMIN";

export const ROLES: readonly Role[] = [
  "ROLE-INTAKE",
  "ROLE-JUDGE",
  "ROLE-TRADE",
  "ROLE-DELIVERY",
  "ROLE-SETTLEMENT",
  "ROLE-RULE-ADMIN",
  "ROLE-SYS-ADMIN",
];

// Landing page per role, right after sign-in (phase-04 § Architecture,
// bảng điều hướng theo TBL-ROLE-01).
const ROLE_LANDING: Record<Role, string> = {
  "ROLE-INTAKE": "/lots/new",
  "ROLE-JUDGE": "/lots",
  "ROLE-TRADE": "/transactions",
  "ROLE-DELIVERY": "/deliveries",
  "ROLE-SETTLEMENT": "/reconciliation",
  "ROLE-RULE-ADMIN": "/incentive/rules",
  "ROLE-SYS-ADMIN": "/participants",
};

export function roleLanding(role: Role): string {
  return ROLE_LANDING[role];
}

/**
 * Boundary guard: `app_user.role` arrives from the database as a plain
 * `string`. Never trust it as `Role` without checking it against the known
 * set first -- an unrecognized value must fail closed, not fall through as
 * some default role.
 */
export function isRole(value: string): value is Role {
  return (ROLES as readonly string[]).includes(value);
}
