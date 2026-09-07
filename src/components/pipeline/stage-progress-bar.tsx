"use client";

import { useT } from "@/lib/i18n/i18n-provider";
import { resolveProgressView, type ProgressKind } from "./progress-steps-config";

// Shared across the lot / transaction / delivery detail pages. Renders which
// step the record has reached and who acts next -- both derived from
// `status`, never hardcoded (see resolveProgressView).
export function StageProgressBar({ kind, status }: { kind: ProgressKind; status: string }) {
  const t = useT();
  const view = resolveProgressView(kind, status);

  if (view.type === "unknown") {
    return <p className="text-sm text-zinc-500">{t("pipeline.unknownStatus")}: {view.status}</p>;
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
                  "rounded-full px-3 py-1 text-xs font-medium " +
                  (state === "current"
                    ? "bg-zinc-900 text-white"
                    : state === "done"
                      ? "bg-zinc-200 text-zinc-700"
                      : "bg-zinc-100 text-zinc-400")
                }
              >
                {t(step.labelKey)}
              </span>
              {index < view.mainSteps.length - 1 && <span aria-hidden className="text-zinc-300">→</span>}
            </li>
          );
        })}
        {view.type === "branch" && (
          <>
            <span aria-hidden className="text-zinc-300">→</span>
            <li>
              <span className="rounded-full bg-zinc-800 px-3 py-1 text-xs font-medium text-white">
                {t(view.branch.labelKey)}
              </span>
            </li>
          </>
        )}
      </ol>
      <p className="text-sm text-zinc-600">
        {nextActorRoles.length > 0
          ? `${t("pipeline.nextActorLabel")}: ${nextActorRoles.map((role) => t(`role.${role}`)).join(", ")}`
          : t("pipeline.noNextActor")}
      </p>
    </div>
  );
}
