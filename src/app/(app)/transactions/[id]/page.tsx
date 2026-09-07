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
import { TransactionDetailFields } from "@/components/transactions/transaction-detail-fields";
import { TransactionAuditHistoryTable } from "@/components/transactions/transaction-audit-history-table";
import { StageProgressBar } from "@/components/pipeline/stage-progress-bar";
import { HandoffCaption } from "@/components/pipeline/handoff-caption";
import { PageFrame } from "@/components/layout/page-frame";
import { SectionCard } from "@/components/layout/section-card";

// SCR008_TransactionList detail view -- REG-CONFIRM + REG-CANCEL live here
// too (not just the list row), plus the audit trail, same pattern lots'
// detail page (SCR006) already established.
//
// Four sections, four cards, in the order every detail screen uses them:
// where the record stands, what it says, what can be done to it, what has
// been done to it.
export default async function TransactionDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const user = await requireUser();
  const { id } = await params;
  const locale = await getLocale();
  const dict = await getDictionary(locale, ["common", "transactions", "nav"]);

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
      <PageFrame
        title={
          <>
            {dict["transactions.detail.title"]}: <span className="cds-table__mono">{txn.txn_code}</span>
          </>
        }
        backHref="/transactions"
        backLabel={dict["nav.transactions"]}
      >
        <section className="ms-0 me-auto max-w-3xl space-y-6">
          <SectionCard title={dict["pipeline.title"]}>
            <StageProgressBar kind="transaction" status={txn.status} />
          </SectionCard>

          <SectionCard title={dict["section.details"]}>
            <TransactionDetailFields
              lotCode={lot?.lot_code ?? txn.lot_id}
              lotItem={lot?.item ?? ""}
              buyerName={buyer?.name ?? txn.buyer_participant_id}
              qty={txn.qty}
              unitPrice={txn.unit_price}
              businessDate={txn.business_date}
              status={txn.status}
              dict={dict}
            />
          </SectionCard>

          {canAct && (
            <SectionCard title={dict["transactions.detail.actionsTitle"]}>
              <ConfirmCancelButtonGroup transactionId={txn.id} status={txn.status} />
            </SectionCard>
          )}
          {/* cancelled is terminal -- nothing left to do and nothing left to
              hand off to ROLE-TRADE, so the section itself goes away. */}
          {!canAct && txn.status !== "cancelled" && (
            <SectionCard title={dict["transactions.detail.actionsTitle"]}>
              <HandoffCaption
                actionLabel={dict["transactions.detail.actionsTitle"]}
                roles={["ROLE-TRADE"]}
              />
            </SectionCard>
          )}

          <SectionCard title={dict["transactions.detail.historyTitle"]} tight>
            <TransactionAuditHistoryTable history={history} dict={dict} />
          </SectionCard>
        </section>
      </PageFrame>
    </I18nProvider>
  );
}
