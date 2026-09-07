// Hand-authored inline SVG for the dashboard process drawing.
//
// All of it is decoration in the accessibility sense -- every fact it depicts
// is also written as HTML text in the nodes and in the visually-hidden prose
// summary -- so each <svg> is aria-hidden and focusable={false}. Nothing here
// is a control; the clickable nodes are real <a> elements over/beside it.
//
// Every colour, radius and stroke weight resolves through cds-tokens.css. No
// hex literal appears in this file.
//
// SCALE IS LOAD-BEARING. Every glyph renders at exactly one CSS pixel per
// viewBox unit, so a stroke width stated here is its width on screen -- the
// only way the 18-unit main channel and the 2-unit せり channel really read as
// 9:1. Change a glyph's box and its CSS size must change with it.
//
// The connector's 44x72 box serves both layouts: upright for the horizontal
// spine, quarter-turned by CSS (--conn-rot) for the vertical chain.

const ARROW = "cds-flow-arrow";
const ARROW_STOP = "cds-flow-arrow-stop";
const RIBBON = "cds-flow-ribbon";

/** Shared <defs>: rendered once per page by ProcessFlow. */
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
            stroke-width that varies from 2 to 18 across the drawing. */}
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

/**
 * A spine connector: a tapered ribbon carrying a record to the next stage.
 *
 * `from`/`to` are the channel's half-widths in viewBox units at each end, so
 * the ribbon can widen or narrow along the flow. A stroke cannot taper, hence
 * the filled path; the arrowhead is still a <marker>, placed on a stroke-less
 * one-unit path at the tip.
 */
export function FlowConnector({
  from = 7,
  to = 9,
  dashed = false,
  long = false,
}: {
  from?: number;
  to?: number;
  dashed?: boolean;
  /** Reaches across the next lane's inlet column to its spine. */
  long?: boolean;
}) {
  const mid = 36;
  const box = long ? 198 : 44;
  const tip = box - 16;
  return (
    <svg
      className={`cds-flow__conn ${long ? "cds-flow__conn--long" : ""}`}
      viewBox={`0 0 ${box} 72`}
      aria-hidden
      focusable="false"
    >
      {!dashed && (
        <path
          d={`M0 ${mid - from} C ${tip * 0.4} ${mid - from}, ${tip * 0.6} ${mid - to}, ${tip} ${mid - to} L ${tip} ${mid + to} C ${tip * 0.6} ${mid + to}, ${tip * 0.4} ${mid + from}, 0 ${mid + from} Z`}
          fill={`url(#${RIBBON})`}
        />
      )}
      {dashed && (
        <path
          d={`M0 ${mid} L ${tip} ${mid}`}
          fill="none"
          stroke="var(--cacao-600)"
          strokeWidth={to * 2}
          strokeDasharray="6 5"
          strokeLinecap="round"
        />
      )}
      <path d={`M${tip} ${mid} L ${tip + 1} ${mid}`} fill="none" markerEnd={`url(#${ARROW})`} />
    </svg>
  );
}

/**
 * The せり merge: a thin channel joining the main one.
 *
 * Its stroke width against FlowConnector's ribbon is the whole point -- see
 * MAIN_INLET_WIDTH / SERI_INLET_WIDTH in process-flow-config.ts, which are
 * 9:1 because 相対取引 carries roughly 90% of transaction value.
 */
export function FlowMerge({ width }: { width: number }) {
  return (
    <svg className="cds-flow__merge" viewBox="0 0 96 88" aria-hidden focusable="false">
      <path
        d="M8 80 C 8 44, 32 24, 78 16"
        fill="none"
        stroke="var(--cacao-600)"
        strokeWidth={width}
        strokeLinecap="round"
        markerEnd={`url(#${ARROW})`}
      />
    </svg>
  );
}

/** A terminal fork: peels out of the spine, curves down, and stops. */
export function FlowFork() {
  return (
    <svg className="cds-flow__fork" viewBox="0 0 72 72" aria-hidden focusable="false">
      <path
        d="M10 2 C 10 30, 34 40, 46 62"
        fill="none"
        stroke="var(--status-overdue-solid)"
        strokeWidth="3"
        strokeDasharray="7 5"
        strokeLinecap="round"
        markerEnd={`url(#${ARROW_STOP})`}
      />
    </svg>
  );
}

/**
 * The day-lock barrier: three hatch bars across the channel.
 *
 * This is the form difference that separates a checkpoint from a stage -- a
 * stage is a card the flow enters, this is a plate the flow strikes.
 */
export function FlowBarrier({ closed }: { closed: boolean }) {
  // --neutral-500 for the open plate, not --border-strong: the hatch bars are
  // 4px and say "there is a gate here", so they owe 3:1 as non-text UI.
  // --neutral-500 measures 3.68:1 on --surface-page; --border-strong, which is
  // sized for 1px hairlines, is 2.19:1.
  const tone = closed ? "var(--status-overdue-solid)" : "var(--neutral-500)";
  return (
    <svg className="cds-flow__barrier" viewBox="0 0 44 72" aria-hidden focusable="false">
      {/* the full channel arriving... */}
      <path d="M0 28 L 12 28 L 12 44 L 0 44 Z" fill={`url(#${RIBBON})`} />
      {/* ...striking the plate... */}
      {[16, 24, 32].map((x) => (
        <path
          key={x}
          d={`M${x} 10 L ${x - 7} 62`}
          stroke={tone}
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
        />
      ))}
      {/* ...and only a thin, broken channel leaving it. */}
      <path
        d="M32 36 L 40 36"
        fill="none"
        stroke="var(--cacao-600)"
        strokeWidth="3"
        strokeDasharray="4 4"
        strokeLinecap="round"
        markerEnd={`url(#${ARROW})`}
      />
    </svg>
  );
}
