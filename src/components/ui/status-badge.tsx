import { toneFor } from "./status-tone";

/**
 * The one status badge in the app. Pure/presentational -- no hooks, no
 * "use client" -- so Server and Client Components can both render it; the
 * caller passes the already-translated label.
 *
 * `label` is required, never optional: a status must be readable without
 * colour (WCAG 1.4.1), and it must survive a monochrome print of a
 * reconciliation sheet.
 */
export function StatusBadge({ status, label }: { status: string; label: string }) {
  return <span className={`sm-badge sm-tone-${toneFor(status)}`}>{label}</span>;
}
