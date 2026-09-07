import type { ReactNode } from "react";

/**
 * The read-only field block every detail screen opens with.
 *
 * Six screens were each writing the same `<dl>` / `<dt>` / `<dd>` stack by
 * hand, which is how they drifted: three columns on one, two on another,
 * `text-strong` present here and missing there. One definition, so a label
 * looks like a label on all of them.
 *
 * Two columns at 320px (a label and its value still fit side by side at that
 * width), three from the DS's own --bp-tablet upward.
 */
export function FieldGrid({ children }: { children: ReactNode }) {
  return <dl className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm sm:grid-cols-3">{children}</dl>;
}

/**
 * `variant` picks the value's treatment:
 *   text    plain prose (a name, an item)
 *   mono    a code or a date -- tabular digits, so figures on separate rows
 *           line up under each other
 *   figure  the headline number of the screen (available quantity, remaining
 *           quantity): --fs-display instead of --fs-body, so the figure the
 *           reader came for is the first thing found
 *   node    the value renders its own appearance (a StatusBadge), so the cell
 *           adds no colour or weight of its own
 */
export function Field({
  label,
  variant = "text",
  children,
}: {
  label: ReactNode;
  variant?: "text" | "mono" | "figure" | "node";
  children: ReactNode;
}) {
  const VALUE_CLASS: Record<string, string | undefined> = {
    text: "text-strong",
    mono: "cds-table__mono text-strong",
    figure: "cds-figure",
    node: undefined,
  };
  const valueClass = VALUE_CLASS[variant];
  return (
    <div>
      <dt className="text-muted">{label}</dt>
      <dd className={valueClass}>{children}</dd>
    </div>
  );
}
