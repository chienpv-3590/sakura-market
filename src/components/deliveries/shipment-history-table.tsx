import type { Tables } from "@/lib/db/types";

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
    return <p className="sm-empty">{dict["deliveries.detail.shipmentsEmpty"]}</p>;
  }

  return (
    <div className="sm-table-wrap sm-table-scroll">
      <table className="sm-table">
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
              <td className="sm-num">{s.seq}</td>
              <td className="sm-num">{s.qty}</td>
              <td className="sm-mono">{new Date(s.shipped_at).toLocaleString()}</td>
              <td className="sm-mono">{s.business_date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
