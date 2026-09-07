"use client";

import Link from "next/link";
import { useT } from "@/lib/i18n/i18n-provider";
import type { Role } from "@/lib/auth/role-landing";
import type { StageCardValue } from "./resolve-stage-value";

// One pipeline-dashboard tile. A "forbidden" value renders a plain, non-link
// tile with an em-dash in place of the number plus a visible caption naming
// the roles that CAN see it -- distinct from a real `0`, and distinct from a
// clickable card (the destination screen would 404 for this role anyway).
//
// The figure uses .sm-num (mono + tabular) so counts line up down the row of
// tiles instead of drifting with digit width, exactly as the design system's
// .rd-kpi-val does.
export function StageCard({
  titleKey,
  href,
  value,
  allowedRoles,
}: {
  titleKey: string;
  href: string;
  value: StageCardValue;
  allowedRoles: readonly Role[];
}) {
  const t = useT();

  if (value.kind === "forbidden") {
    const roleNames = allowedRoles.map((role) => t(`role.${role}`)).join(", ");
    return (
      <div
        className="sm-card bg-neutral-50 p-4"
        title={`${t("home.stage.notPermittedTooltip")} ${roleNames}`}
      >
        <p className="text-sm font-medium text-muted">{t(titleKey)}</p>
        <p
          className="sm-num mt-2 text-left text-2xl font-bold text-subtle"
          aria-label={t("home.stage.notPermittedTooltip")}
        >
          —
        </p>
        <p className="sm-hint mt-1">
          {t("home.stage.notPermittedCaption")}: {roleNames}
        </p>
      </div>
    );
  }

  // A lock state is a state, not a figure -- it gets the badge treatment and
  // the same stop/ok tones the header indicator uses, so "locked" reads
  // identically wherever it appears.
  if (value.kind === "lock") {
    return (
      <Link href={href} className="sm-card block p-4 hover:bg-neutral-50">
        <p className="text-sm font-medium text-muted">{t(titleKey)}</p>
        <p className="mt-3">
          <span className={`sm-badge font-bold ${value.locked ? "sm-tone-stop" : "sm-tone-ok"}`}>
            {t(value.locked ? "home.stage.lockedYes" : "home.stage.lockedNo")}
          </span>
        </p>
      </Link>
    );
  }

  return (
    <Link href={href} className="sm-card block p-4 hover:bg-neutral-50">
      <p className="text-sm font-medium text-muted">{t(titleKey)}</p>
      <p className="sm-num mt-2 text-left text-2xl font-bold text-strong">{value.value}</p>
    </Link>
  );
}
