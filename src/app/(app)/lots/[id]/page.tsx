import { notFound } from "next/navigation";
import type { SupabaseClient } from "@supabase/supabase-js";
import { requireUser } from "@/lib/auth/require-role";
import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/lib/db/types";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { getLocale } from "@/lib/i18n/get-locale";
import { I18nProvider } from "@/lib/i18n/i18n-provider";
import { LotAvailabilityFields } from "@/components/lots/lot-availability-fields";
import { LotAuditHistoryTable } from "@/components/lots/lot-audit-history-table";
import { LotEditForm } from "@/components/lots/lot-edit-form";
import { loadLot, loadLotAuditHistory } from "@/lib/lots/lot-queries";
import { StageProgressBar } from "@/components/pipeline/stage-progress-bar";
import { HandoffCaption } from "@/components/pipeline/handoff-caption";
import { PageFrame } from "@/components/layout/page-frame";
import { SectionCard } from "@/components/layout/section-card";

// SCR006_LotDetail -- REG-AVAILABILITY (everyone) + REG-EDIT (ROLE-SETTLEMENT
// only, matching the PATCH /api/lots/[id] role gate).
export default async function LotDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const user = await requireUser();
  const { id } = await params;
  const locale = await getLocale();
  const dict = await getDictionary(locale, ["common", "lots", "nav"]);

  const supabase: SupabaseClient<Database> = await createClient();
  const lot = await loadLot(supabase, id);
  if (!lot) notFound();
  const history = await loadLotAuditHistory(supabase, id);

  return (
    <I18nProvider locale={locale} dict={dict}>
      <PageFrame
        title={
          <>
            {dict["lots.detail.title"]}: <span className="cds-table__mono">{lot.lot_code}</span>
          </>
        }
        description={lot.item}
        backHref="/lots"
        backLabel={dict["nav.lots"]}
      >
        <section className="mx-auto max-w-5xl space-y-6">
          <SectionCard title={dict["pipeline.title"]}>
            <StageProgressBar kind="lot" status={lot.status} />
          </SectionCard>

          <SectionCard title={dict["lots.detail.availabilityTitle"]}>
            <LotAvailabilityFields
              availableQty={lot.available_qty}
              initialQty={lot.initial_qty}
              status={lot.status}
              dict={dict}
            />
          </SectionCard>

          {/* The edit form is ROLE-SETTLEMENT's; every other role gets the
              same card carrying the caption that says whose it is. */}
          <SectionCard title={dict["lots.detail.editTitle"]}>
            {user.role === "ROLE-SETTLEMENT" ? (
              <LotEditForm
                lotId={lot.id}
                currentItem={lot.item}
                currentPackageCount={lot.package_count}
              />
            ) : (
              <HandoffCaption
                actionLabel={dict["lots.detail.editTitle"]}
                roles={["ROLE-SETTLEMENT"]}
              />
            )}
          </SectionCard>

          <SectionCard title={dict["lots.detail.historyTitle"]} tight>
            <LotAuditHistoryTable history={history} dict={dict} />
          </SectionCard>
        </section>
      </PageFrame>
    </I18nProvider>
  );
}
