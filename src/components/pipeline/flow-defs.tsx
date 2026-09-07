// The dashboard drawing's shared <defs>: one gradient, two arrowheads.
//
// Rendered once per page by ProcessFlow; every glyph in flow-glyphs.tsx
// references these by id. Decoration in the accessibility sense, so the <svg>
// is aria-hidden and focusable={false}. Every colour resolves through
// cds-tokens.css -- no hex literal appears in this file.

/** Arrowhead for a channel that continues. */
export const ARROW = "cds-flow-arrow";
/** Arrowhead for a branch that ends. */
export const ARROW_STOP = "cds-flow-arrow-stop";
/** The channel gradient. */
export const RIBBON = "cds-flow-ribbon";

export function FlowDefs() {
  return (
    <svg width="0" height="0" aria-hidden focusable="false" className="absolute">
      <defs>
        {/* The channel gradient: lighter upstream, saturated downstream, so the
            spine has direction even in a still frame. cacao-600 -> cacao-700:
            the ribbon carries direction and so owes 3:1 as non-text UI, but 3:1
            is only the floor and a thin connector at the floor reads washed
            out -- reported as unclear in review. Measured on --surface-page:
            cacao-400 3.16:1 (the old, faint value), cacao-600 4.82:1,
            cacao-700 6.57:1. Every stroke in this file sits at 600 or darker. */}
        <linearGradient id={RIBBON} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="var(--cacao-600)" />
          <stop offset="1" stopColor="var(--cacao-700)" />
        </linearGradient>
        {/* markerUnits=userSpaceOnUse: the head must not scale with a
            stroke-width that varies from 2 to 18 across the drawing.
            These are for the THIN channels only -- the merge curve and the
            barrier's outgoing trickle, where a 12x12 head is several times
            the stroke it terminates. A tapered ribbon draws its own head,
            because at 18 units thick this one vanishes inside it (see
            FlowConnector). */}
        <marker
          id={ARROW}
          viewBox="0 0 12 12"
          refX="10"
          refY="6"
          markerWidth="12"
          markerHeight="12"
          markerUnits="userSpaceOnUse"
          orient="auto-start-reverse"
        >
          <path d="M1 1 L11 6 L1 11 Z" fill="var(--cacao-700)" />
        </marker>
        <marker
          id={ARROW_STOP}
          viewBox="0 0 12 12"
          refX="10"
          refY="6"
          markerWidth="11"
          markerHeight="11"
          markerUnits="userSpaceOnUse"
          orient="auto-start-reverse"
        >
          <path d="M1 1 L11 6 L1 11 Z" fill="var(--status-overdue-solid)" />
        </marker>
      </defs>
    </svg>
  );
}
