"use client";

import { useT } from "@/lib/i18n/i18n-provider";
import type { Role } from "@/lib/auth/role-landing";

// Shown in place of a hidden write action so the gap explains itself instead
// of just going quiet -- "hide the action, keep the visibility, explain the
// handoff". Reuses the existing role.ROLE-* dictionary keys (common.json)
// rather than hardcoding role names, same pattern StageCard's "forbidden"
// state already established on the home dashboard.
export function HandoffCaption({ actionLabel, roles }: { actionLabel: string; roles: readonly Role[] }) {
  const t = useT();
  const roleNames = roles.map((role) => t(`role.${role}`)).join(", ");
  return (
    <p className="cds-field__msg cds-field__msg--hint">
      {actionLabel} — {t("action.doneByRole")}: {roleNames}
    </p>
  );
}
