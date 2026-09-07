"use client";

import { Fragment, useState } from "react";
import type { Tables } from "@/lib/db/types";
import { EmptyState } from "@/components/ui/empty-state";

type Line = Tables<"reconciliation_line">;
type Shipment = Tables<"delivery_shipment">;

// SCR013 (A1, FR-201). Client Component: the "Xem giao hàng" expansion per
// aitai row calls F006's A4 (GET /api/deliveries/by-transaction/{id}) on
// demand -- FR-DEL-04's "truy được các lần giao từ một bản quyết toán",
// exercised here from F007's own screen rather than duplicating shipment
// data into this view.
export function ReconcileTable({ lines, dict }: { lines: Line[]; dict: Record<string, string> }) {
  const [expanded, setExpanded] = useState<Record<string, Shipment[] | "loading" | undefined>>({});

  async function toggleTrace(sourceId: string) {
    if (expanded[sourceId]) {
      setExpanded((prev) => ({ ...prev, [sourceId]: undefined }));
      return;
    }
    setExpanded((prev) => ({ ...prev, [sourceId]: "loading" }));
    try {
      const response = await fetch(`/api/deliveries/by-transaction/${sourceId}`);
      const body = await response.json();
      setExpanded((prev) => ({ ...prev, [sourceId]: response.ok ? body.shipments : [] }));
    } catch {
      setExpanded((prev) => ({ ...prev, [sourceId]: [] }));
    }
  }

  if (lines.length === 0) {
    return <EmptyState description={dict["reconciliation.table.empty"]} />;
  }

  return (
    <div className="cds-table__wrap">
      <table className="cds-table cds-table--default cds-table--hover">
        <thead>
          <tr>
            <th>{dict["reconciliation.table.columns.sourceType"]}</th>
            <th className="text-right">{dict["reconciliation.table.columns.qty"]}</th>
            <th className="text-right">{dict["reconciliation.table.columns.amount"]}</th>
            <th className="text-right">{dict["reconciliation.table.columns.variance"]}</th>
            <th>{dict["reconciliation.table.columns.trace"]}</th>
          </tr>
        </thead>
        <tbody>
          {lines.map((line) => {
            const key = `${line.source_type}:${line.source_id}`;
            const trace = line.source_id ? expanded[line.source_id] : undefined;
            return (
              <Fragment key={key}>
                <tr>
                  <td>
                    {dict[`reconciliation.sourceType.${line.source_type}`] ?? line.source_type}
                  </td>
                  <td className="cds-table__num cds-table__mono">{line.qty}</td>
                  <td className="cds-table__num cds-table__mono">{line.amount_jpy?.toLocaleString() ?? "—"}</td>
                  <td className="cds-table__num cds-table__mono">{line.variance ?? "—"}</td>
                  <td>
                    {line.source_type === "aitai" && line.source_id && (
                      <button
                        type="button"
                        onClick={() => toggleTrace(line.source_id!)}
                        className="cds-link cds-link--underline"
                      >
                        {dict["reconciliation.table.traceToggle"]}
                      </button>
                    )}
                  </td>
                </tr>
                {trace && (
                  <tr className="bg-page">
                    <td colSpan={5}>
                      {trace === "loading" ? (
                        dict["reconciliation.table.traceLoading"]
                      ) : trace.length === 0 ? (
                        dict["reconciliation.table.traceEmpty"]
                      ) : (
                        <ul className="space-y-1">
                          {trace.map((s) => (
                            <li key={s.id} className="cds-table__mono">
                              #{s.seq} — {s.qty} — {new Date(s.shipped_at).toLocaleString()}
                            </li>
                          ))}
                        </ul>
                      )}
                    </td>
                  </tr>
                )}
              </Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
