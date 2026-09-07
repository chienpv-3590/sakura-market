import Link from "next/link";
import type { DeliveryListRow } from "@/lib/deliveries/delivery-queries";
import { StatusBadge } from "@/components/ui/status-badge";

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
    return <p className="sm-empty">{dict["deliveries.list.empty"]}</p>;
  }

  return (
    <div className="sm-table-wrap sm-table-scroll">
      <table className="sm-table">
        <thead>
          <tr>
            <th>{dict["deliveries.list.columns.txnCode"]}</th>
            <th>{dict["deliveries.list.columns.businessDate"]}</th>
            <th className="text-right">{dict["deliveries.list.columns.deliveredQty"]}</th>
            <th className="text-right">{dict["deliveries.list.columns.orderedQty"]}</th>
            <th>{dict["deliveries.list.columns.status"]}</th>
          </tr>
        </thead>
        <tbody>
          {deliveries.map((d) => (
            <tr key={d.id}>
              <td className="sm-mono">
                <Link href={`/deliveries/${d.id}`} className="hover:underline">
                  {d.txn_code}
                </Link>
              </td>
              <td className="sm-mono">{d.business_date}</td>
              <td className="sm-num">{d.delivered_qty}</td>
              <td className="sm-num">{d.transaction_qty}</td>
              <td>
                <StatusBadge status={d.status} label={dict[`deliveries.status.${d.status}`] ?? d.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
