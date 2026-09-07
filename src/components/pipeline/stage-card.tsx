"use client";

import Link from "next/link";
import { useT } from "@/lib/i18n/i18n-provider";
import type { Role } from "@/lib/auth/role-landing";
import type { StageCardValue } from "./resolve-stage-value";

// One pipeline-dashboard tile. A "forbidden" value renders a plain, non-link
// tile with an em-dash in place of the number plus a visible caption naming
// the roles that CAN see it -- distinct from a real `0`, and distinct from a
// clickable card (the destination screen would 404 for this role anyway).
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
        className="rounded-lg border border-zinc-200 bg-zinc-50 p-4"
        title={`${t("home.stage.notPermittedTooltip")} ${roleNames}`}
      >
        <p className="text-sm font-medium text-zinc-500">{t(titleKey)}</p>
        <p className="mt-2 text-2xl font-semibold text-zinc-400" aria-label={t("home.stage.notPermittedTooltip")}>
          —
        </p>
        <p className="mt-1 text-xs text-zinc-500">
          {t("home.stage.notPermittedCaption")}: {roleNames}
        </p>
      </div>
    );
  }

  const display =
    value.kind === "count" ? value.value : t(value.locked ? "home.stage.lockedYes" : "home.stage.lockedNo");

  return (
    <Link href={href} className="block rounded-lg border border-zinc-200 p-4 hover:bg-zinc-50">
      <p className="text-sm font-medium text-zinc-500">{t(titleKey)}</p>
      <p className="mt-2 text-2xl font-semibold text-zinc-900">{display}</p>
    </Link>
  );
}
