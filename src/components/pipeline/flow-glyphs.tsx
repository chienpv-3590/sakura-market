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

import { ARROW, ARROW_STOP, RIBBON } from "./flow-defs";

/**
 * A spine connector: a tapered ribbon carrying a record to the next stage.
 *
 * `from`/`to` are the channel's half-widths in viewBox units at each end, so
 * the ribbon can widen or narrow along the flow. A stroke cannot taper, hence
 * the filled path.
 *
 * THE HEAD IS DRAWN HERE, NOT BY THE SHARED <marker>. The marker is a fixed
 * 12x12 whose triangle is 10 units tall, and these channels are 12, 16 and 18
 * units tall in the same cacao -- so the head was being drawn entirely inside
 * the bar it was supposed to terminate, and every spine arrowhead in the
 * drawing was invisible. Reported as "the arrow is covered by the horizontal
 * bar", and it was: by its own ribbon.
 *
 * So the head is a path sized from `to`: it starts where the ribbon stops and
 * projects 5 units past each of its edges, which is the only way an arrowhead
 * reads as an arrowhead on a channel this thick.
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
  /** Tip of the head. 4 units short of the box, so it points AT the next
   *  card instead of touching it. */
  const apex = box - 4;
  const headLen = 14;
  const headHalf = to + 5;
  /** Where the channel stops and the head starts. */
  const neck = apex - headLen;
  return (
    <svg
      className={`cds-flow__conn ${long ? "cds-flow__conn--long" : ""}`}
      viewBox={`0 0 ${box} 72`}
      aria-hidden
      focusable="false"
    >
      {!dashed && (
        <path
          d={`M0 ${mid - from} C ${neck * 0.4} ${mid - from}, ${neck * 0.6} ${mid - to}, ${neck} ${mid - to} L ${neck} ${mid + to} C ${neck * 0.6} ${mid + to}, ${neck * 0.4} ${mid + from}, 0 ${mid + from} Z`}
          fill={`url(#${RIBBON})`}
        />
      )}
      {dashed && (
        <path
          d={`M0 ${mid} L ${neck} ${mid}`}
          fill="none"
          stroke="var(--cacao-600)"
          strokeWidth={to * 2}
          strokeDasharray="6 5"
          strokeLinecap="round"
        />
      )}
      {/* --cacao-700 is the gradient's downstream end, so the head is the
          darkest point of the channel and reads as its terminus. */}
      <path
        d={`M${neck} ${mid - headHalf} L ${apex} ${mid} L ${neck} ${mid + headHalf} Z`}
        fill="var(--cacao-700)"
      />
    </svg>
  );
}

/**
 * The せり merge: a thin channel joining the main one.
 *
 * Its stroke width against FlowConnector's ribbon is the whole point -- see
 * MAIN_INLET_WIDTH / SERI_INLET_WIDTH in process-flow-config.ts, which are
 * 9:1 because 相対取引 carries roughly 90% of transaction value. The 12x12
 * marker is right HERE, on a 2-unit stroke, for the same reason it was wrong
 * on the ribbon: it is six times the channel's width, so it is unmistakable.
 *
 * The path leaves vertically (first control point shares the start's x) and
 * ARRIVES HORIZONTALLY (last control point shares the end's y), so the head
 * points straight into the spine node's left edge -- the same edge, and the
 * same direction, as the 18-unit main channel arriving 34px above it. Two
 * channels, one node, 9:1.
 *
 * Where the box sits is what makes the head land: see `.cds-flow__merge` in
 * cds-app-flow-wide.css. It is anchored to the ROW, so the terminus is a
 * fixed distance below the spine node's top. It must never be anchored to the
 * せり card -- that card is bottom-aligned in a row sized by the spine, so its
 * own edges move with unrelated content, which is exactly how the old
 * `bottom: 24px` left this arrow 22px short of the spine and 3px below the
 * node altogether.
 */
export function FlowMerge({ width }: { width: number }) {
  return (
    <svg className="cds-flow__merge" viewBox="0 0 96 120" aria-hidden focusable="false">
      <path
        d="M8 120 C 8 64, 26 16, 92 16"
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
