import Link from "next/link";
import type { DeliveryListRow } from "@/lib/deliveries/delivery-queries";

// SCR011 table. Server Component, same composition as transactions'
// TransactionTable -- dict/rows already loaded by the page.
export function DeliveryTable({
  deliveries,
  dict,
}: {
  deliveries: DeliveryListRow[];
  dict: Record<string, string>;
}) {
  if (deliveries.length === 0) {
    return <p className="text-sm text-zinc-500">{dict["deliveries.list.empty"]}</p>;
  }

  return (
    <table className="w-full border-collapse text-sm">
      <thead>
        <tr className="border-b border-zinc-200 text-left text-zinc-500">
          <th className="py-2 pr-4 font-medium">{dict["deliveries.list.columns.txnCode"]}</th>
          <th className="py-2 pr-4 font-medium">{dict["deliveries.list.columns.businessDate"]}</th>
          <th className="py-2 pr-4 font-medium">{dict["deliveries.list.columns.deliveredQty"]}</th>
          <th className="py-2 pr-4 font-medium">{dict["deliveries.list.columns.orderedQty"]}</th>
          <th className="py-2 pr-4 font-medium">{dict["deliveries.list.columns.status"]}</th>
        </tr>
      </thead>
      <tbody>
        {deliveries.map((d) => (
          <tr key={d.id} className="border-b border-zinc-100">
            <td className="py-2 pr-4 font-mono">
              <Link href={`/deliveries/${d.id}`} className="hover:underline">
                {d.txn_code}
              </Link>
            </td>
            <td className="py-2 pr-4">{d.business_date}</td>
            <td className="py-2 pr-4">{d.delivered_qty}</td>
            <td className="py-2 pr-4">{d.transaction_qty}</td>
            <td className="py-2 pr-4">{dict[`deliveries.status.${d.status}`] ?? d.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
