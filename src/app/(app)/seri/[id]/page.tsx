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
import { SeriRecordFields } from "@/components/seri/seri-record-fields";
import { HandoffCaption } from "@/components/pipeline/handoff-caption";
import { PageFrame } from "@/components/layout/page-frame";
import { SectionCard } from "@/components/layout/section-card";

// SCR010_SeriLookup detail + edit. Edit is allowed for ROLE-TRADE OR
// ROLE-SETTLEMENT (functional-spec.md §3 Open Decision -- role-only, not
// restricted to the original creator, matches the seri_result RLS update
// policy exactly).
export default async function SeriDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const user = await requireUser();
  const { id } = await params;
  const locale = await getLocale();
  const dict = await getDictionary(locale, ["common", "transactions", "nav"]);

  const supabase: SupabaseClient<Database> = await createClient();
  const seriResult = await loadSeriResult(supabase, id);
  if (!seriResult) notFound();
  const history = await loadSeriAuditHistory(supabase, id);

  const [{ data: lot }, { data: participants }, { data: operators }] = await Promise.all([
    supabase.from("lot").select("lot_code, item").eq("id", seriResult.lot_id).maybeSingle(),
    supabase.from("participant").select("id, name").order("name"),
    supabase.from("app_user").select("id, display_name, email").eq("is_active", true).order("display_name"),
  ]);

  const operatorOptions = (operators ?? []).map((o) => ({ id: o.id, label: o.display_name ?? o.email }));
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
        backHref="/seri"
        backLabel={dict["nav.seri"]}
      >
        <section className="mx-auto max-w-5xl space-y-6">
          <SectionCard title={dict["section.details"]}>
            <SeriRecordFields
              lotCode={lot?.lot_code ?? seriResult.lot_id}
              lotItem={lot?.item ?? ""}
              winnerName={
                (participants ?? []).find((p) => p.id === seriResult.winner_participant_id)?.name ??
                seriResult.winner_participant_id
              }
              qty={seriResult.qty}
              unitPrice={seriResult.unit_price}
              decidedAt={seriResult.decided_at}
              confirmedByName={
                operatorOptions.find((o) => o.id === seriResult.confirmed_by)?.label ?? "—"
              }
              dict={dict}
            />
          </SectionCard>

          <SectionCard title={dict["seri.detail.editAction"]}>
            {canEdit ? (
              <SeriEntryForm
                mode="edit"
                seriResultId={seriResult.id}
                participants={(participants ?? []).map((p) => ({ id: p.id, name: p.name }))}
                operators={operatorOptions}
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
          </SectionCard>

          <SectionCard title={dict["seri.detail.historyTitle"]} tight>
            <SeriEditHistory history={history} dict={dict} />
          </SectionCard>
        </section>
      </PageFrame>
    </I18nProvider>
  );
}
