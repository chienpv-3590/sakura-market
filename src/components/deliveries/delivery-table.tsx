import Link from "next/link";
import type { DeliveryListRow } from "@/lib/deliveries/delivery-queries";
import { StatusBadge } from "@/components/ui/status-badge";
import { EmptyState } from "@/components/ui/empty-state";

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
    return <EmptyState description={dict["deliveries.list.empty"]} />;
  }

  return (
    <div className="cds-table__wrap">
      <table className="cds-table cds-table--default cds-table--hover">
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
              <td className="cds-table__mono">
                <Link href={`/deliveries/${d.id}`} className="hover:underline">
                  {d.txn_code}
                </Link>
              </td>
              <td className="cds-table__mono">{d.business_date}</td>
              <td className="cds-table__num cds-table__mono">{d.delivered_qty}</td>
              <td className="cds-table__num cds-table__mono">{d.transaction_qty}</td>
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
