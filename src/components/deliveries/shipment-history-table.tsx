import type { Tables } from "@/lib/db/types";
import { EmptyState } from "@/components/ui/empty-state";

// SCR012 "danh sách từng lần giao" (FR-DEL-05). Server Component -- rows are
// already loaded by the page.
export function ShipmentHistoryTable({
  shipments,
  dict,
}: {
  shipments: Tables<"delivery_shipment">[];
  dict: Record<string, string>;
}) {
  if (shipments.length === 0) {
    return <EmptyState description={dict["deliveries.detail.shipmentsEmpty"]} compact />;
  }

  return (
    <div className="cds-table__wrap">
      <table className="cds-table cds-table--default cds-table--hover">
        <thead>
          <tr>
            <th className="text-right">{dict["deliveries.detail.shipmentColumns.seq"]}</th>
            <th className="text-right">{dict["deliveries.detail.shipmentColumns.qty"]}</th>
            <th>{dict["deliveries.detail.shipmentColumns.shippedAt"]}</th>
            <th>{dict["deliveries.detail.shipmentColumns.businessDate"]}</th>
          </tr>
        </thead>
        <tbody>
          {shipments.map((s) => (
            <tr key={s.id}>
              <td className="cds-table__num cds-table__mono">{s.seq}</td>
              <td className="cds-table__num cds-table__mono">{s.qty}</td>
              <td className="cds-table__mono">{new Date(s.shipped_at).toLocaleString()}</td>
              <td className="cds-table__mono">{s.business_date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
