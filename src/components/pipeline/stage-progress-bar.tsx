"use client";

import { useT } from "@/lib/i18n/i18n-provider";
import { StatusBadge } from "@/components/ui/status-badge";
import { resolveProgressView } from "./progress-steps-config";
import type { ProgressKind } from "./progress-steps-config";

// Shared across the lot / transaction / delivery detail pages. Renders which
// step the record has reached and who acts next -- both derived from
// `status`, never hardcoded (see resolveProgressView).
//
// Every step is the app's one StatusBadge, so the step the record sits on now
// is the SAME colour as its badge everywhere else on the page: a `confirmed`
// transaction never reads green here and violet in the table. Steps already
// passed read `ok`; steps not yet reached read `idle` and dimmed; the current
// step is additionally bold. Position and weight therefore carry the
// information on their own, without the hue.
//
// The design system's `cds-stepper` is NOT this component -- it is a numeric
// +/- input. The DS ships no horizontal step indicator, so this stays a badge
// sequence built from DS parts rather than a new component invented to fill
// the gap.
export function StageProgressBar({ kind, status }: { kind: ProgressKind; status: string }) {
  const t = useT();
  const view = resolveProgressView(kind, status);

  if (view.type === "unknown") {
    return (
      <p className="cds-field__msg cds-field__msg--hint">
        {t("pipeline.unknownStatus")}: {view.status}
      </p>
    );
  }

  const nextActorRoles = view.type === "main" ? view.nextActorRoles : [];

  return (
    <div className="flex flex-col gap-2">
      <ol className="flex flex-wrap items-center gap-2">
        {view.mainSteps.map((step, index) => {
          const passed = view.type === "main" && index < view.currentIndex;
          const isCurrent = view.type === "main" && index === view.currentIndex;
          const upcoming = !passed && !isCurrent;
          return (
            <li key={step.status} className="flex items-center gap-2">
              <StatusBadge
                // Only the current step wears its own status colour; the
                // rest carry a position, resolved through the same map.
                status={isCurrent ? step.status : passed ? "step_passed" : "step_upcoming"}
                label={t(step.labelKey)}
                current={isCurrent}
                dimmed={upcoming}
              />
              {index < view.mainSteps.length - 1 && (
                <span aria-hidden className="text-subtle">
                  →
                </span>
              )}
            </li>
          );
        })}
        {view.type === "branch" && (
          <>
            <span aria-hidden className="text-subtle">
              →
            </span>
            <li>
              <StatusBadge
                status={view.branch.status}
                label={t(view.branch.labelKey)}
                current
              />
            </li>
          </>
        )}
      </ol>
      <p className="text-[13px] text-secondary">
        {nextActorRoles.length > 0
          ? `${t("pipeline.nextActorLabel")}: ${nextActorRoles.map((role) => t(`role.${role}`)).join(", ")}`
          : t("pipeline.noNextActor")}
      </p>
    </div>
  );
}
