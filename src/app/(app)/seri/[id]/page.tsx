import { notFound } from "next/navigation";
import type { SupabaseClient } from "@supabase/supabase-js";
import { requireUser } from "@/lib/auth/require-role";
import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/lib/db/types";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { getLocale } from "@/lib/i18n/get-locale";
import { I18nProvider } from "@/lib/i18n/i18n-provider";
import { loadSeriResult, loadSeriAuditHistory } from "@/lib/seri/seri-queries";
import { SeriEntryForm } from "@/components/seri/seri-entry-form";
import { SeriEditHistory } from "@/components/seri/seri-edit-history";
import { HandoffCaption } from "@/components/pipeline/handoff-caption";
import { PageFrame } from "@/components/layout/page-frame";

// SCR010_SeriLookup detail + edit. Edit is allowed for ROLE-TRADE OR
// ROLE-SETTLEMENT (functional-spec.md §3 Open Decision -- role-only, not
// restricted to the original creator, matches the seri_result RLS update
// policy exactly).
export default async function SeriDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const user = await requireUser();
  const { id } = await params;
  const locale = await getLocale();
  const dict = await getDictionary(locale, ["common", "transactions"]);

  const supabase: SupabaseClient<Database> = await createClient();
  const seriResult = await loadSeriResult(supabase, id);
  if (!seriResult) notFound();
  const history = await loadSeriAuditHistory(supabase, id);

  const [{ data: lot }, { data: participants }, { data: operators }] = await Promise.all([
    supabase.from("lot").select("lot_code, item").eq("id", seriResult.lot_id).maybeSingle(),
    supabase.from("participant").select("id, name").order("name"),
    supabase.from("app_user").select("id, display_name, email").eq("is_active", true).order("display_name"),
  ]);

  const canEdit = user.role === "ROLE-TRADE" || user.role === "ROLE-SETTLEMENT";

  return (
    <I18nProvider locale={locale} dict={dict}>
      <PageFrame
        title={
          <>
            {dict["seri.detail.title"]}: <span className="cds-table__mono">{lot?.lot_code ?? seriResult.lot_id}</span>
          </>
        }
        description={lot?.item}
      >
        <section className="max-w-3xl space-y-8">

        {canEdit ? (
          <SeriEntryForm
            mode="edit"
            seriResultId={seriResult.id}
            participants={(participants ?? []).map((p) => ({ id: p.id, name: p.name }))}
            operators={(operators ?? []).map((o) => ({ id: o.id, label: o.display_name ?? o.email }))}
            initial={{
              winnerParticipantId: seriResult.winner_participant_id,
              qty: seriResult.qty,
              unitPrice: seriResult.unit_price,
              decidedAt: seriResult.decided_at,
              confirmedBy: seriResult.confirmed_by,
            }}
          />
        ) : (
          <HandoffCaption
            actionLabel={dict["seri.detail.editAction"]}
            roles={["ROLE-TRADE", "ROLE-SETTLEMENT"]}
          />
        )}

        <div>
          <h2 className="cds-card__title">{dict["seri.detail.historyTitle"]}</h2>
          <SeriEditHistory history={history} dict={dict} />
        </div>
        </section>
      </PageFrame>
    </I18nProvider>
  );
}
