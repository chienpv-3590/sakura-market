import Link from "next/link";
import { notFound } from "next/navigation";
import type { SupabaseClient } from "@supabase/supabase-js";
import { requireUser } from "@/lib/auth/require-role";
import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/lib/db/types";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { getLocale } from "@/lib/i18n/get-locale";
import { I18nProvider } from "@/lib/i18n/i18n-provider";
import { loadDeliveryWithTransaction, loadShipments } from "@/lib/deliveries/delivery-queries";
import { DeliveryProgress } from "@/components/deliveries/delivery-progress";
import { ShipmentForm } from "@/components/deliveries/shipment-form";
import { ShipmentHistoryTable } from "@/components/deliveries/shipment-history-table";
import { StageProgressBar } from "@/components/pipeline/stage-progress-bar";
import { StatusBadge } from "@/components/ui/status-badge";
import { HandoffCaption } from "@/components/pipeline/handoff-caption";
import { PageFrame } from "@/components/layout/page-frame";
import { SectionCard } from "@/components/layout/section-card";

// SCR012_DeliveryDetail (A2/A3/A4, FR-DEL-02/04/05, US001-003).
export default async function DeliveryDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const user = await requireUser();
  const { id } = await params;
  const locale = await getLocale();
  const dict = await getDictionary(locale, ["common", "deliveries", "nav"]);

  const supabase: SupabaseClient<Database> = await createClient();
  const found = await loadDeliveryWithTransaction(supabase, id);
  if (!found) notFound();
  const { delivery, transaction } = found;
  const shipments = await loadShipments(supabase, id);

  const { data: lock } = await supabase
    .from("business_day_lock")
    .select("business_date")
    .eq("business_date", transaction.business_date)
    .maybeSingle();

  const canRecordShipment = user.role === "ROLE-DELIVERY" && delivery.status !== "hoàn tất";
  const canComplete = user.role === "ROLE-SETTLEMENT";

  return (
    <I18nProvider locale={locale} dict={dict}>
      <PageFrame
        title={
          <>
            {dict["deliveries.detail.title"]}: <span className="cds-table__mono">{transaction.txn_code}</span>
          </>
        }
        status={
          <StatusBadge
            status={delivery.status}
            label={dict[`deliveries.status.${delivery.status}`] ?? delivery.status}
          />
        }
        backHref="/deliveries"
        backLabel={dict["nav.deliveries"]}
        meta={
          <>
            <span>
              {dict["deliveries.detail.businessDateLabel"]}:{" "}
              <span className="cds-table__mono">{transaction.business_date}</span>
            </span>
            {lock && (
              <Link
                href={`/reconciliation?date=${transaction.business_date}`}
                className="cds-link cds-link--underline"
              >
                {dict["deliveries.detail.reconciliationLink"]}
              </Link>
            )}
          </>
        }
      >
        <section className="mx-auto max-w-5xl space-y-6">
          <SectionCard title={dict["pipeline.title"]}>
            <StageProgressBar kind="delivery" status={delivery.status} />
          </SectionCard>

          <SectionCard title={dict["deliveries.detail.progressTitle"]}>
            <DeliveryProgress
              deliveryId={delivery.id}
              deliveredQty={delivery.delivered_qty}
              orderedQty={transaction.qty}
              status={delivery.status}
              canComplete={canComplete}
            />
          </SectionCard>

          {canRecordShipment && (
            <SectionCard title={dict["deliveries.detail.newShipmentTitle"]}>
              <ShipmentForm deliveryId={delivery.id} />
            </SectionCard>
          )}
          {/* "hoàn tất" is terminal -- nothing left to record and nothing left
              to hand off to ROLE-DELIVERY, so the section itself goes away. */}
          {!canRecordShipment && delivery.status !== "hoàn tất" && (
            <SectionCard title={dict["deliveries.detail.newShipmentTitle"]}>
              <HandoffCaption
                actionLabel={dict["deliveries.detail.newShipmentTitle"]}
                roles={["ROLE-DELIVERY"]}
              />
            </SectionCard>
          )}

          <SectionCard title={dict["deliveries.detail.shipmentsTitle"]} tight>
            <ShipmentHistoryTable shipments={shipments} dict={dict} />
          </SectionCard>
        </section>
      </PageFrame>
    </I18nProvider>
  );
}
