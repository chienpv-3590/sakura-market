import type { PipelineStageId } from "./pipeline-stage-config";

/**
 * The SHAPE of the business process, separate from the counts that fill it.
 *
 * The dashboard has to teach the flow, not just report numbers, so the
 * structure below is the domain truth this app implements:
 *
 *   Lô hàng --> 目利き/công bố --> 相対取引 --> Giao hàng --> ‖KHÓA NGÀY‖ --> Điều chỉnh
 *   received     published        draft->                     irreversible     reverse/delta
 *                                confirmed
 *                                  ^  |
 *                    せり (inlet) --+  +--> cancelled (terminal)
 *
 * Three node roles, and the difference between them is domain meaning, not
 * decoration:
 *
 *  - `main`   a stage every record passes through, on the spine.
 *  - `inlet`  a SECOND, minor way into a stage. せり is one: 相対取引 carries
 *             roughly 90% of transaction value and せり is the small manual
 *             path, so it must never be drawn as a step AFTER 相対取引 nor at
 *             the same weight as it -- that is the exact misreading the
 *             assignment warns about.
 *  - `outlet` a branch that leaves the spine and ends (cancelled, ngoại lệ).
 *             A fork is domain truth and is drawn as a fork.
 *  - `gate`   not a stage at all: locking a business day is a one-way
 *             checkpoint the whole flow passes THROUGH, after which every
 *             write is refused. Corrections exist only on the far side of it.
 */
export type FlowNodeRole = "main" | "inlet" | "outlet" | "gate";

/**
 * The 90/10 fact, expressed as geometry.
 *
 * These two numbers are the stroke widths, in SVG user units, of the two
 * channels that feed the sale stage. They are 9:1 because 相対取引 carries
 * roughly 90% of transaction value and せり roughly 10% -- so the drawing
 * cannot be read as making them equals. The ratio is also stated in words in
 * `home.flow.note.aitaiShare` / `home.flow.note.seriMinor` and in the flow's
 * prose description, so it is asserted in text as well as drawn.
 */
export const MAIN_INLET_WIDTH = 18;
export const SERI_INLET_WIDTH = 2;

export type FlowNodeDef = {
  stageId: PipelineStageId;
  role: FlowNodeRole;
  /** Dictionary key for the one-line caption under the figure. */
  noteKey?: string;
  /** Glyph name from components/layout/nav-icons.tsx. */
  icon: string;
};

export type FlowLaneDef = {
  laneKey: string;
  /** Channel half-widths, in viewBox units, entering and leaving this lane. */
  channelIn?: number;
  channelOut?: number;
  /** The connector leaving this lane is dashed: only corrections pass a lock. */
  dashedOut?: boolean;
  /** Minor paths feeding INTO this lane. Rendered above the spine. */
  inlets?: readonly FlowNodeDef[];
  /** The spine itself: 1..2 nodes, left to right (a state transition). */
  spine: readonly FlowNodeDef[];
  /** Branches leaving this lane and ending. Rendered below the spine. */
  outlets?: readonly FlowNodeDef[];
};

export const FLOW_LANES: readonly FlowLaneDef[] = [
  {
    laneKey: "home.flow.lane.intake",
    channelOut: 6,
    spine: [{ stageId: "lots-received", role: "main", icon: "building" }],
  },
  {
    laneKey: "home.flow.lane.mekiki",
    // Leaves at the full main-channel width: this is the 90% inlet into the
    // sale stage, and it is drawn nine times heavier than せり.
    channelOut: MAIN_INLET_WIDTH / 2,
    spine: [{ stageId: "lots-published", role: "main", icon: "chart" }],
  },
  {
    laneKey: "home.flow.lane.sale",
    channelOut: 8,
    inlets: [
      {
        stageId: "seri-results",
        role: "inlet",
        noteKey: "home.flow.note.seriMinor",
        icon: "award",
      },
    ],
    spine: [
      {
        stageId: "transactions-draft",
        role: "main",
        noteKey: "home.flow.note.aitaiShare",
        icon: "contract",
      },
      { stageId: "transactions-confirmed", role: "main", icon: "tasks" },
    ],
    outlets: [
      {
        stageId: "transactions-cancelled",
        role: "outlet",
        noteKey: "home.flow.note.cancelBranch",
        icon: "filePen",
      },
    ],
  },
  {
    laneKey: "home.flow.lane.delivery",
    channelOut: 8,
    spine: [{ stageId: "deliveries-in-progress", role: "main", icon: "truck" }],
    outlets: [
      {
        stageId: "deliveries-exception",
        role: "outlet",
        noteKey: "home.flow.note.exceptionBranch",
        icon: "filePen",
      },
    ],
  },
  {
    laneKey: "home.flow.lane.gate",
    // Past the lock only reverse/delta corrections move, so the outgoing
    // channel is thin and broken rather than a ribbon.
    channelOut: 3,
    dashedOut: true,
    spine: [
      {
        stageId: "business-day-lock",
        role: "gate",
        noteKey: "home.flow.note.gateIrreversible",
        icon: "wallet",
      },
    ],
  },
  {
    laneKey: "home.flow.lane.postLock",
    spine: [
      {
        stageId: "corrections-pending",
        role: "main",
        noteKey: "home.flow.note.postLockOnly",
        icon: "settings",
      },
    ],
  },
];
