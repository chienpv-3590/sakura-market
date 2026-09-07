"use client";

import { useT } from "@/lib/i18n/i18n-provider";
import { PIPELINE_STAGES } from "./pipeline-stage-config";
import {
  FLOW_LANES,
  SERI_INLET_WIDTH,
  type FlowNodeDef,
} from "./process-flow-config";
import type { StageCardValue } from "./resolve-stage-value";
import { FlowNode } from "./flow-node";
import { FlowBarrier, FlowConnector, FlowDefs, FlowFork, FlowMerge } from "./flow-glyphs";

// The dashboard's process drawing: an <ol> of lanes in process order, so a
// screen reader and the tab key both walk the flow in the order a lot
// actually travels. Inside a lane the inlet comes before the main nodes,
// which is also the order a record reaches them.
//
// Everything graphical -- the tapered channel ribbons, the せり merge, the
// terminal forks, the lock barrier -- is inline SVG in flow-glyphs.tsx, all
// of it aria-hidden. It depicts nothing that is not also written as text: the
// visually-hidden <p> below describes the whole flow in prose, and each node
// carries its own label, figure and role in words.
//
// Horizontal graphic from --bp-web-jp (1280px); a vertical chain below it
// (see cds-app-flow.css for why not --bp-web).
//
// NOTE ON cds-stepper: the design system's `cds-stepper` is a numeric +/-
// INPUT (__btn--minus / __btn--plus / __input / __unit / __spin), not a step
// indicator. It draws one straight line and this flow has a merge, two forks
// and a gate, so it is the wrong tool and the drawing is hand-authored.
export function ProcessFlow({ values }: { values: Record<string, StageCardValue> }) {
  const t = useT();
  const stageById = new Map(PIPELINE_STAGES.map((s) => [s.id, s]));
  const locked = values["business-day-lock"];

  function node(def: FlowNodeDef) {
    const stage = stageById.get(def.stageId);
    if (!stage) return null;
    return (
      <FlowNode
        key={def.stageId}
        role={def.role}
        titleKey={stage.titleKey}
        href={stage.href}
        value={values[def.stageId] ?? { kind: "forbidden" }}
        allowedRoles={stage.allowedRoles}
        noteKey={def.noteKey}
        icon={def.icon}
      />
    );
  }

  return (
    <div className="cds-flow__scroll">
      <FlowDefs />
      <p className="cds-visually-hidden" id="cds-flow-desc">
        {t("home.flow.description")}
      </p>
      <ol className="cds-flow" aria-label={t("home.flow.label")} aria-describedby="cds-flow-desc">
        {FLOW_LANES.map((lane, index) => {
          const isGate = lane.spine[0]?.role === "gate";
          const isLast = index === FLOW_LANES.length - 1;
          // If the next lane has an inlet column, this lane's channel has to
          // reach across it to that lane's spine -- otherwise the drawing
          // reads as the 90% channel feeding せり.
          const longOut = Boolean(FLOW_LANES[index + 1]?.inlets);
          return (
            <li
              key={lane.laneKey}
              className={[
                "cds-flow__lane",
                isLast ? "cds-flow__lane--last" : "",
                isGate ? "cds-flow__lane--gate" : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <p className="cds-section-title cds-flow__lanelabel">{t(lane.laneKey)}</p>

              <div className="cds-flow__row">
                {lane.inlets?.map((def) => (
                  <span key={def.stageId} className="cds-flow__inletwrap">
                    {node(def)}
                    <FlowMerge width={SERI_INLET_WIDTH} />
                  </span>
                ))}
                <div className="cds-flow__spine">{lane.spine.map(node)}</div>
              </div>

              {lane.outlets && (
                <div className="cds-flow__forkwrap">
                  <FlowFork />
                  <ul className="cds-flow__outlets">
                    {lane.outlets.map((def) => (
                      <li key={def.stageId}>{node(def)}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* The connector belongs to the lane it leaves, so the drawing
                  and the reading order can never disagree. */}
              {!isLast && (
                <span
                  className={`cds-flow__connwrap ${longOut ? "cds-flow__connwrap--long" : ""}`}
                >
                  {isGate ? (
                    <FlowBarrier closed={locked?.kind === "lock" && locked.locked} />
                  ) : (
                    <>
                      {/* Two glyphs, one shown per layout (CSS picks): the
                          vertical chain wants a 44-unit connector, the
                          horizontal graphic a 198-unit one that reaches past
                          the next lane's inlet column. Both are decoration,
                          so rendering both costs nothing semantically. */}
                      <FlowConnector
                        from={lane.channelIn ?? lane.channelOut ?? 6}
                        to={lane.channelOut ?? 6}
                        dashed={lane.dashedOut}
                      />
                      {longOut && (
                        <FlowConnector
                          from={lane.channelIn ?? lane.channelOut ?? 6}
                          to={lane.channelOut ?? 6}
                          dashed={lane.dashedOut}
                          long
                        />
                      )}
                    </>
                  )}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
