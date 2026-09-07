"use client";

import { useT } from "@/lib/i18n/i18n-provider";
import { resolveProgressView, type ProgressKind } from "./progress-steps-config";
import { toneFor } from "@/components/ui/status-tone";

// Shared across the lot / transaction / delivery detail pages. Renders which
// step the record has reached and who acts next -- both derived from
// `status`, never hardcoded (see resolveProgressView).
//
// Step tones come from the same toneFor() map the status badges use, so the
// step the record sits on now is the SAME colour as its badge elsewhere on
// the page -- a `confirmed` transaction never reads green in one place and
// violet in another. Steps already passed read `ok`, steps not yet reached
// read `off` and dimmed, and the current step is additionally bold, so
// position and weight carry the information without the colour.
export function StageProgressBar({ kind, status }: { kind: ProgressKind; status: string }) {
  const t = useT();
  const view = resolveProgressView(kind, status);

  if (view.type === "unknown") {
    return <p className="text-sm text-muted">{t("pipeline.unknownStatus")}: {view.status}</p>;
  }

  const nextActorRoles = view.type === "main" ? view.nextActorRoles : [];

  return (
    <div className="space-y-2">
      <ol className="flex flex-wrap items-center gap-2">
        {view.mainSteps.map((step, index) => {
          const state =
            view.type === "branch"
              ? "interrupted"
              : index < view.currentIndex
                ? "done"
                : index === view.currentIndex
                  ? "current"
                  : "upcoming";
          return (
            <li key={step.status} className="flex items-center gap-2">
              <span
                className={
                  "sm-badge " +
                  (state === "current"
                    ? `sm-tone-${toneFor(step.status)} font-bold`
                    : state === "done"
                      ? "sm-tone-ok"
                      : "sm-tone-off opacity-70")
                }
              >
                {t(step.labelKey)}
              </span>
              {index < view.mainSteps.length - 1 && <span aria-hidden className="text-subtle">→</span>}
            </li>
          );
        })}
        {view.type === "branch" && (
          <>
            <span aria-hidden className="text-subtle">→</span>
            <li>
              <span className={`sm-badge sm-tone-${toneFor(view.branch.status)} font-bold`}>
                {t(view.branch.labelKey)}
              </span>
            </li>
          </>
        )}
      </ol>
      <p className="text-sm text-secondary">
        {nextActorRoles.length > 0
          ? `${t("pipeline.nextActorLabel")}: ${nextActorRoles.map((role) => t(`role.${role}`)).join(", ")}`
          : t("pipeline.noNextActor")}
      </p>
    </div>
  );
}
