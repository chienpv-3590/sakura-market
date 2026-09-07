import { notFound } from "next/navigation";
import type { SupabaseClient } from "@supabase/supabase-js";
import { requireUser } from "@/lib/auth/require-role";
import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/lib/db/types";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { getLocale } from "@/lib/i18n/get-locale";
import { I18nProvider } from "@/lib/i18n/i18n-provider";
import { AvailabilityPanel } from "@/components/lots/availability-panel";
import { LotEditForm } from "@/components/lots/lot-edit-form";
import { loadLot, loadLotAuditHistory } from "@/lib/lots/lot-queries";
import { StageProgressBar } from "@/components/pipeline/stage-progress-bar";
import { HandoffCaption } from "@/components/pipeline/handoff-caption";

// SCR006_LotDetail -- REG-AVAILABILITY (everyone) + REG-EDIT (ROLE-SETTLEMENT
// only, matching the PATCH /api/lots/[id] role gate).
export default async function LotDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const user = await requireUser();
  const { id } = await params;
  const locale = await getLocale();
  const dict = await getDictionary(locale, ["common", "lots"]);

  const supabase: SupabaseClient<Database> = await createClient();
  const lot = await loadLot(supabase, id);
  if (!lot) notFound();
  const history = await loadLotAuditHistory(supabase, id);

  return (
    <I18nProvider locale={locale} dict={dict}>
      <section className="space-y-8">
        <div>
          <h1 className="text-2xl font-semibold text-strong">
            {dict["lots.detail.title"]}: <span className="sm-mono">{lot.lot_code}</span>
          </h1>
          <p className="sm-hint mt-1">{lot.item}</p>
        </div>
        <div>
          <h2 className="text-sm font-medium uppercase tracking-wide text-muted">
            {dict["pipeline.title"]}
          </h2>
          <div className="mt-2">
            <StageProgressBar kind="lot" status={lot.status} />
          </div>
        </div>
        <AvailabilityPanel
          availableQty={lot.available_qty}
          initialQty={lot.initial_qty}
          status={lot.status}
          history={history}
        />
        {user.role === "ROLE-SETTLEMENT" ? (
          <div>
            <h2 className="text-lg font-semibold text-strong">{dict["lots.detail.editTitle"]}</h2>
            <div className="mt-2">
              <LotEditForm lotId={lot.id} currentItem={lot.item} currentPackageCount={lot.package_count} />
            </div>
          </div>
        ) : (
          <HandoffCaption actionLabel={dict["lots.detail.editTitle"]} roles={["ROLE-SETTLEMENT"]} />
        )}
      </section>
    </I18nProvider>
  );
}
