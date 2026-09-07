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

// SCR012_DeliveryDetail (A2/A3/A4, FR-DEL-02/04/05, US001-003).
export default async function DeliveryDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const user = await requireUser();
  const { id } = await params;
  const locale = await getLocale();
  const dict = await getDictionary(locale, ["common", "deliveries"]);

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
      <section className="max-w-3xl space-y-8">
        <div>
          <h1 className="text-2xl font-semibold text-zinc-900">
            {dict["deliveries.detail.title"]}: <span className="font-mono">{transaction.txn_code}</span>
          </h1>
          <p className="mt-1 text-sm text-zinc-600">
            {dict["deliveries.detail.businessDateLabel"]}: {transaction.business_date} —{" "}
            {dict[`deliveries.status.${delivery.status}`] ?? delivery.status}
          </p>
          {lock && (
            <p className="mt-1 text-sm">
              <Link href={`/reconciliation?date=${transaction.business_date}`} className="text-zinc-700 underline">
                {dict["deliveries.detail.reconciliationLink"]}
              </Link>
            </p>
          )}
        </div>

        <DeliveryProgress
          deliveryId={delivery.id}
          deliveredQty={delivery.delivered_qty}
          orderedQty={transaction.qty}
          status={delivery.status}
          canComplete={canComplete}
        />

        {canRecordShipment && (
          <div>
            <h2 className="text-lg font-semibold text-zinc-900">{dict["deliveries.detail.newShipmentTitle"]}</h2>
            <div className="mt-2">
              <ShipmentForm deliveryId={delivery.id} />
            </div>
          </div>
        )}

        <div>
          <h2 className="text-lg font-semibold text-zinc-900">{dict["deliveries.detail.shipmentsTitle"]}</h2>
          <div className="mt-2">
            <ShipmentHistoryTable shipments={shipments} dict={dict} />
          </div>
        </div>
      </section>
    </I18nProvider>
  );
}
