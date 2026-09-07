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
    return <p className="text-sm text-zinc-500">{dict["deliveries.detail.shipmentsEmpty"]}</p>;
  }

  return (
    <table className="w-full border-collapse text-sm">
      <thead>
        <tr className="border-b border-zinc-200 text-left text-zinc-500">
          <th className="py-2 pr-4 font-medium">{dict["deliveries.detail.shipmentColumns.seq"]}</th>
          <th className="py-2 pr-4 font-medium">{dict["deliveries.detail.shipmentColumns.qty"]}</th>
          <th className="py-2 pr-4 font-medium">{dict["deliveries.detail.shipmentColumns.shippedAt"]}</th>
          <th className="py-2 pr-4 font-medium">{dict["deliveries.detail.shipmentColumns.businessDate"]}</th>
        </tr>
      </thead>
      <tbody>
        {shipments.map((s) => (
          <tr key={s.id} className="border-b border-zinc-100">
            <td className="py-2 pr-4">{s.seq}</td>
            <td className="py-2 pr-4">{s.qty}</td>
            <td className="py-2 pr-4">{new Date(s.shipped_at).toLocaleString()}</td>
            <td className="py-2 pr-4">{s.business_date}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
