import type { ReactNode } from "react";

/**
 * One content section of a detail screen, on the design system's own card.
 *
 * The DS supplies the parts (`cds-card` / `__head` / `__title` / `__actions` /
 * `__body` / `__body--tight`) but nothing that assembles them, so before this
 * existed the app had `cds-card__title` headings floating with no card around
 * them and information sitting straight on the page ground. Composing the
 * parts in exactly one place is what keeps that from coming back: no caller
 * can produce a `__title` outside a `cds-card`, and every section on every
 * detail screen gets the same head height, padding and boundary.
 *
 * `tight` is for a section whose whole body is a table: `cds-card__body--tight`
 * drops the 18px so the table meets the card edge, and `cds-card--clip` keeps
 * the last row's hover fill inside the card's bottom corners. The table's own
 * `cds-table__wrap` stays the horizontal scroll container.
 *
 * `actions` lands in `cds-card__actions` -- the system's place for a section's
 * primary control, right-aligned on the head row.
 *
 * Pure/presentational: no hooks, so Server and Client Components can both
 * render it. `<section>` with no accessible name is exposed as generic, so it
 * groups the content and contributes its `<h2>` to the document outline
 * without announcing an unnamed region.
 */
export function SectionCard({
  title,
  actions,
  tight = false,
  children,
}: {
  title: ReactNode;
  actions?: ReactNode;
  tight?: boolean;
  children: ReactNode;
}) {
  return (
    <section className={tight ? "cds-card cds-card--clip" : "cds-card"}>
      <div className="cds-card__head">
        <h2 className="cds-card__title">{title}</h2>
        {actions && <div className="cds-card__actions">{actions}</div>}
      </div>
      <div className={tight ? "cds-card__body cds-card__body--tight" : "cds-card__body"}>
        {children}
      </div>
    </section>
  );
}
