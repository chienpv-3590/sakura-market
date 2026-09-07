import type { ReactNode } from "react";

/**
 * Port of the design system's EmptyState. A screen with no rows says so in
 * words, centred in the space the rows would have filled, rather than showing
 * a blank card the reader has to interpret.
 *
 * Pure/presentational, so Server and Client Components can both render it;
 * the caller passes the already-translated text.
 *
 * `compact` is the DS's own modifier (28px instead of 48px of vertical air) --
 * for an empty panel nested inside a detail page, where the full treatment
 * would dominate the screen.
 */
export function EmptyState({
  description,
  title,
  action,
  compact = false,
}: {
  description: string;
  title?: string;
  action?: ReactNode;
  compact?: boolean;
}) {
  return (
    <div className={`cds-empty ${compact ? "cds-empty--compact" : ""}`}>
      <div className="cds-empty__ico" aria-hidden>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 7.5 12 3l9 4.5v9L12 21l-9-4.5z" />
          <path d="M3 7.5 12 12l9-4.5M12 12v9" />
        </svg>
      </div>
      {title && <div className="cds-empty__title">{title}</div>}
      <div className="cds-empty__desc">{description}</div>
      {action && <div className="cds-empty__action">{action}</div>}
    </div>
  );
}
