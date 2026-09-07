"use client";

import Link from "next/link";
import { useT } from "@/lib/i18n/i18n-provider";
import type { Role } from "@/lib/auth/role-landing";
import { StatusBadge } from "@/components/ui/status-badge";
import { NavIcon } from "@/components/layout/nav-icons";
import type { StageCardValue } from "./resolve-stage-value";
import type { FlowNodeRole } from "./process-flow-config";

// One node of the process drawing: a rounded container carrying a glyph, a
// label and the live count. Built on the design system's .cds-statcard (muted
// label over a mono tabular figure) plus the role modifier that says what
// KIND of node it is -- see cds-app-flow.css.
//
// Every node is a real focusable <a> (or, when the role may not open it, a
// plain <div>), so the whole flow is keyboard-reachable in process order and
// the SVG behind it is pure decoration.
//
// Three value shapes, unchanged from the previous dashboard:
//  - count      -> the figure, node links to its screen
//  - lock       -> a StatusBadge, because a lock is a state and not a figure,
//                  and it must read identically here, in the topheader and on
//                  /reconciliation (one status-tone map, one answer)
//  - forbidden  -> NOT a link, an em-dash in place of the number, plus a
//                  visible caption naming the roles that CAN open it. The
//                  destination 404s for this role, so a link would be a dead
//                  end, and the em-dash is distinct from a real 0.
export function FlowNode({
  role,
  titleKey,
  href,
  value,
  allowedRoles,
  noteKey,
  icon,
}: {
  role: FlowNodeRole;
  titleKey: string;
  href: string;
  value: StageCardValue;
  allowedRoles: readonly Role[];
  noteKey?: string;
  icon: string;
}) {
  const t = useT();
  // The gate's frame turns --status-overdue only once the day is actually
  // locked; before that it is a distinct-but-neutral checkpoint, so a green
  // "not locked yet" badge never sits inside a red barrier.
  const gateClosed = value.kind === "lock" && value.locked;
  const className = [
    "cds-statcard",
    "cds-flow__node",
    `cds-flow__node--${role}`,
    gateClosed ? "cds-flow__node--gate-closed" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const head = <span className="cds-statcard__label">{t(titleKey)}</span>;

  const note = noteKey ? <span className="cds-flow__note">{t(noteKey)}</span> : null;

  // The role of a non-spine node is stated in words, so the drawing is never
  // the only thing carrying it (WCAG 1.4.1 / 1.3.3).
  const roleWord =
    role === "main" ? null : (
      <span className="cds-flow__rolelabel">{t(`home.flow.role.${role}`)}</span>
    );

  // The glyph and the figure share one row: label above at full width, then
  // chip on the left and count on the right.
  const chip = (
    <span className="cds-flow__chip" aria-hidden>
      <NavIcon name={icon} />
    </span>
  );

  const figure =
    value.kind === "forbidden" ? (
      <>
        <span className="cds-flow__figrow">
          {chip}
          <span className="cds-statcard__val" aria-label={t("home.stage.notPermittedTooltip")}>
            —
          </span>
        </span>
        <span className="cds-field__msg cds-field__msg--hint">
          {t("home.stage.notPermittedCaption")}:{" "}
          {allowedRoles.map((r) => t(`role.${r}`)).join(", ")}
        </span>
      </>
    ) : value.kind === "lock" ? (
      // The badge is nowrap and about 90px wide; it gets its own row rather
      // than being clipped beside the glyph in a one-column lane.
      <>
        {chip}
        <span className="cds-flow__gatebadge">
          <StatusBadge
            status={value.locked ? "day_locked" : "day_open"}
            label={t(value.locked ? "home.stage.lockedYes" : "home.stage.lockedNo")}
            current
          />
        </span>
      </>
    ) : (
      <span className="cds-flow__figrow">
        {chip}
        <span className="cds-statcard__val">{value.value}</span>
      </span>
    );

  if (value.kind === "forbidden") {
    const roleNames = allowedRoles.map((r) => t(`role.${r}`)).join(", ");
    return (
      <div
        className={`${className} cds-statcard--muted`}
        title={`${t("home.stage.notPermittedTooltip")} ${roleNames}`}
      >
        {roleWord}
        {head}
        {figure}
        {note}
      </div>
    );
  }

  return (
    <Link href={href} className={className}>
      {roleWord}
      {head}
      {figure}
      {note}
    </Link>
  );
}
