import Link from "next/link";
import type { Tables } from "@/lib/db/types";
import { StatusBadge } from "@/components/ui/status-badge";
import { ConfirmCancelButtonGroup } from "./confirm-cancel-button-group";
import { HandoffCaption } from "@/components/pipeline/handoff-caption";
import { EmptyState } from "@/components/ui/empty-state";

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
  // A viewer who cannot act sees the handoff caption, not the status word
  // repeated -- the status already has its own column and badge. This changes
  // nothing about WHO may act: `canAct` is still decided server-side and the
  // real gate is still requireRole() on /api/transactions/[id]/confirm.
  if (transactions.length === 0) {
    return <EmptyState description={dict["transactions.list.empty"]} />;
  }

  return (
    <div className="cds-table__wrap">
      <table className="cds-table cds-table--default cds-table--hover">
        <thead>
          <tr>
            <th>{dict["transactions.list.columns.code"]}</th>
            <th>{dict["transactions.list.columns.lot"]}</th>
            <th>{dict["transactions.list.columns.buyer"]}</th>
            <th className="text-right">{dict["transactions.list.columns.qty"]}</th>
            <th className="text-right">{dict["transactions.list.columns.unitPrice"]}</th>
            <th>{dict["transactions.list.columns.businessDate"]}</th>
            <th>{dict["transactions.list.columns.status"]}</th>
            <th>{dict["transactions.list.columns.actions"]}</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((txn) => (
            <tr key={txn.id}>
              <td className="cds-table__mono">
                <Link href={`/transactions/${txn.id}`} className="hover:underline">
                  {txn.txn_code}
                </Link>
              </td>
              <td>{lotCodes[txn.lot_id] ?? txn.lot_id}</td>
              <td>{buyerNames[txn.buyer_participant_id] ?? txn.buyer_participant_id}</td>
              <td className="cds-table__num cds-table__mono">{txn.qty}</td>
              <td className="cds-table__num cds-table__mono">{txn.unit_price.toLocaleString()}</td>
              <td className="cds-table__mono">{txn.business_date}</td>
              <td>
                <StatusBadge
                  status={txn.status}
                  label={dict[`transactions.status.${txn.status}`] ?? txn.status}
                />
              </td>
              <td>
                {canAct ? (
                  <ConfirmCancelButtonGroup transactionId={txn.id} status={txn.status} />
                ) : (
                  <HandoffCaption
                    actionLabel={dict["transactions.actions.confirm"]}
                    roles={["ROLE-TRADE"]}
                  />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
