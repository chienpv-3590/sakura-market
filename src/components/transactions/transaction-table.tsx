import Link from "next/link";
import type { Tables } from "@/lib/db/types";
import { ConfirmCancelButtonGroup } from "./confirm-cancel-button-group";

type TransactionRow = Tables<"transaction">;

// SCR008 table. Server Component: receives the already-loaded dictionary and
// id->name lookup maps instead of calling useT()/querying itself, so it
// needs no "use client" of its own -- it just renders the (client)
// ConfirmCancelButtonGroup per row, same composition lots'
// ParticipantTable uses for EligibilityStatusBadge.
export function TransactionTable({
  transactions,
  lotCodes,
  buyerNames,
  dict,
  canAct,
}: {
  transactions: TransactionRow[];
  lotCodes: Record<string, string>;
  buyerNames: Record<string, string>;
  dict: Record<string, string>;
  canAct: boolean;
}) {
  if (transactions.length === 0) {
    return <p className="text-sm text-zinc-500">{dict["transactions.list.empty"]}</p>;
  }

  return (
    <table className="w-full border-collapse text-sm">
      <thead>
        <tr className="border-b border-zinc-200 text-left text-zinc-500">
          <th className="py-2 pr-4 font-medium">{dict["transactions.list.columns.code"]}</th>
          <th className="py-2 pr-4 font-medium">{dict["transactions.list.columns.lot"]}</th>
          <th className="py-2 pr-4 font-medium">{dict["transactions.list.columns.buyer"]}</th>
          <th className="py-2 pr-4 font-medium">{dict["transactions.list.columns.qty"]}</th>
          <th className="py-2 pr-4 font-medium">{dict["transactions.list.columns.unitPrice"]}</th>
          <th className="py-2 pr-4 font-medium">{dict["transactions.list.columns.businessDate"]}</th>
          <th className="py-2 pr-4 font-medium">{dict["transactions.list.columns.status"]}</th>
          <th className="py-2 pr-4 font-medium">{dict["transactions.list.columns.actions"]}</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((txn) => (
          <tr key={txn.id} className="border-b border-zinc-100">
            <td className="py-2 pr-4 font-mono">
              <Link href={`/transactions/${txn.id}`} className="hover:underline">
                {txn.txn_code}
              </Link>
            </td>
            <td className="py-2 pr-4">{lotCodes[txn.lot_id] ?? txn.lot_id}</td>
            <td className="py-2 pr-4">{buyerNames[txn.buyer_participant_id] ?? txn.buyer_participant_id}</td>
            <td className="py-2 pr-4">{txn.qty}</td>
            <td className="py-2 pr-4">{txn.unit_price.toLocaleString()}</td>
            <td className="py-2 pr-4">{txn.business_date}</td>
            <td className="py-2 pr-4">{dict[`transactions.status.${txn.status}`] ?? txn.status}</td>
            <td className="py-2 pr-4">
              {canAct ? (
                <ConfirmCancelButtonGroup transactionId={txn.id} status={txn.status} />
              ) : (
                (dict[`transactions.status.${txn.status}`] ?? txn.status)
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
