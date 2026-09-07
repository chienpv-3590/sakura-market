import { notFound } from "next/navigation";
import type { SupabaseClient } from "@supabase/supabase-js";
import { requireUser } from "@/lib/auth/require-role";
import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/lib/db/types";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { getLocale } from "@/lib/i18n/get-locale";
import { I18nProvider } from "@/lib/i18n/i18n-provider";
import { loadTransaction, loadTransactionAuditHistory } from "@/lib/transactions/txn-queries";
import { ConfirmCancelButtonGroup } from "@/components/transactions/confirm-cancel-button-group";
import { StageProgressBar } from "@/components/pipeline/stage-progress-bar";

// SCR008_TransactionList detail view -- REG-CONFIRM + REG-CANCEL live here
// too (not just the list row), plus the audit trail, same pattern lots'
// detail page (SCR006) already established.
export default async function TransactionDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const user = await requireUser();
  const { id } = await params;
  const locale = await getLocale();
  const dict = await getDictionary(locale, ["common", "transactions"]);

  const supabase: SupabaseClient<Database> = await createClient();
  const txn = await loadTransaction(supabase, id);
  if (!txn) notFound();
  const history = await loadTransactionAuditHistory(supabase, id);

  const [{ data: lot }, { data: buyer }] = await Promise.all([
    supabase.from("lot").select("lot_code, item").eq("id", txn.lot_id).maybeSingle(),
    supabase.from("participant").select("name").eq("id", txn.buyer_participant_id).maybeSingle(),
  ]);

  const canAct = user.role === "ROLE-TRADE";

  return (
    <I18nProvider locale={locale} dict={dict}>
      <section className="max-w-3xl space-y-8">
        <div>
          <h1 className="text-2xl font-semibold text-zinc-900">
            {dict["transactions.detail.title"]}: <span className="font-mono">{txn.txn_code}</span>
          </h1>
        </div>

        <div>
          <h2 className="text-sm font-medium uppercase tracking-wide text-zinc-500">
            {dict["pipeline.title"]}
          </h2>
          <div className="mt-2">
            <StageProgressBar kind="transaction" status={txn.status} />
          </div>
        </div>

        <dl className="grid grid-cols-2 gap-4 text-sm sm:grid-cols-3">
          <div>
            <dt className="text-zinc-500">{dict["transactions.detail.lotLabel"]}</dt>
            <dd className="text-zinc-900">
              {lot?.lot_code ?? txn.lot_id} — {lot?.item ?? ""}
            </dd>
          </div>
          <div>
            <dt className="text-zinc-500">{dict["transactions.detail.buyerLabel"]}</dt>
            <dd className="text-zinc-900">{buyer?.name ?? txn.buyer_participant_id}</dd>
          </div>
          <div>
            <dt className="text-zinc-500">{dict["transactions.detail.qtyLabel"]}</dt>
            <dd className="text-zinc-900">{txn.qty}</dd>
          </div>
          <div>
            <dt className="text-zinc-500">{dict["transactions.detail.unitPriceLabel"]}</dt>
            <dd className="text-zinc-900">{txn.unit_price.toLocaleString()}</dd>
          </div>
          <div>
            <dt className="text-zinc-500">{dict["transactions.detail.businessDateLabel"]}</dt>
            <dd className="text-zinc-900">{txn.business_date}</dd>
          </div>
          <div>
            <dt className="text-zinc-500">{dict["transactions.detail.statusLabel"]}</dt>
            <dd className="text-zinc-900">{dict[`transactions.status.${txn.status}`] ?? txn.status}</dd>
          </div>
        </dl>

        {canAct && (
          <div>
            <h2 className="text-lg font-semibold text-zinc-900">{dict["transactions.detail.actionsTitle"]}</h2>
            <div className="mt-2">
              <ConfirmCancelButtonGroup transactionId={txn.id} status={txn.status} />
            </div>
          </div>
        )}

        <div>
          <h2 className="text-lg font-semibold text-zinc-900">{dict["transactions.detail.historyTitle"]}</h2>
          {history.length === 0 ? (
            <p className="mt-2 text-sm text-zinc-500">{dict["transactions.detail.historyEmpty"]}</p>
          ) : (
            <table className="mt-2 w-full text-left text-sm">
              <thead>
                <tr className="border-b border-zinc-200 text-zinc-500">
                  <th className="py-1 pr-2">{dict["transactions.detail.historyColumns.action"]}</th>
                  <th className="py-1 pr-2">{dict["transactions.detail.historyColumns.before"]}</th>
                  <th className="py-1 pr-2">{dict["transactions.detail.historyColumns.after"]}</th>
                  <th className="py-1 pr-2">{dict["transactions.detail.historyColumns.reason"]}</th>
                  <th className="py-1 pr-2">{dict["transactions.detail.historyColumns.at"]}</th>
                </tr>
              </thead>
              <tbody>
                {history.map((row) => (
                  <tr key={row.id} className="border-b border-zinc-100 align-top">
                    <td className="py-1 pr-2">{row.action}</td>
                    <td className="py-1 pr-2 font-mono text-xs">{JSON.stringify(row.before)}</td>
                    <td className="py-1 pr-2 font-mono text-xs">{JSON.stringify(row.after)}</td>
                    <td className="py-1 pr-2">{row.reason ?? "—"}</td>
                    <td className="py-1 pr-2">{new Date(row.created_at).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </section>
    </I18nProvider>
  );
}
