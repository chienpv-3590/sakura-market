import { toneFor } from "./status-tone";

/**
 * The one status badge in the app -- the design system's `.cds-statusbadge`,
 * with the tone class carrying the fg/bg pair and `__dot` the solid.
 *
 * Pure/presentational -- no hooks, no "use client" -- so Server and Client
 * Components can both render it; the caller passes the already-translated
 * label.
 *
 * `label` is required, never optional: a status must be readable without
 * colour (WCAG 1.4.1), and it must survive a monochrome print of a
 * reconciliation sheet. `current` adds bold for the step a record sits on
 * right now, so position and weight also carry that.
 */
export function StatusBadge({
  status,
  label,
  current = false,
  dimmed = false,
}: {
  status: string;
  label: string;
  current?: boolean;
  dimmed?: boolean;
}) {
  const tone = toneFor(status);
  return (
    <span
      className={[
        "cds-statusbadge",
        `cds-statusbadge--${tone}`,
        current ? "cds-statusbadge--current" : "",
        dimmed ? "opacity-70" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <span className="cds-statusbadge__dot" aria-hidden />
      {label}
    </span>
  );
}
