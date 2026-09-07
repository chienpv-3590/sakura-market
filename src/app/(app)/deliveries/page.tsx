import type { SupabaseClient } from "@supabase/supabase-js";
import { requireUser } from "@/lib/auth/require-role";
import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/lib/db/types";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { getLocale } from "@/lib/i18n/get-locale";
import { I18nProvider } from "@/lib/i18n/i18n-provider";
import { listDeliveries } from "@/lib/deliveries/delivery-queries";
import { DeliveryTable } from "@/components/deliveries/delivery-table";

const STATUSES = ["chờ", "đang giao", "hoàn tất", "ngoại lệ"] as const;

// SCR011_DeliveryList (A1, FR-DEL-01) -- ROLE-DELIVERY's landing page.
export default async function DeliveriesPage({
  searchParams,
}: {
  searchParams: Promise<{ businessDate?: string; status?: string }>;
}) {
  const [{ businessDate, status }, , locale] = await Promise.all([searchParams, requireUser(), getLocale()]);
  const dict = await getDictionary(locale, ["common", "deliveries"]);

  const validStatus = status && (STATUSES as readonly string[]).includes(status) ? status : undefined;

  const supabase: SupabaseClient<Database> = await createClient();
  const deliveries = await listDeliveries(supabase, { status: validStatus, businessDate });

  return (
    <I18nProvider locale={locale} dict={dict}>
      <section className="space-y-6">
        <h1 className="text-2xl font-semibold text-zinc-900">{dict["deliveries.list.title"]}</h1>
        <form method="GET" className="flex flex-wrap items-end gap-4">
          <label className="flex flex-col text-sm text-zinc-700">
            {dict["deliveries.list.filterBusinessDateLabel"]}
            <input
              type="date"
              name="businessDate"
              defaultValue={businessDate ?? ""}
              className="mt-1 rounded-md border border-zinc-300 px-3 py-2 text-sm"
            />
          </label>
          <label className="flex flex-col text-sm text-zinc-700">
            {dict["deliveries.list.filterStatusLabel"]}
            <select
              name="status"
              defaultValue={validStatus ?? ""}
              className="mt-1 rounded-md border border-zinc-300 px-3 py-2 text-sm"
            >
              <option value="">{dict["deliveries.list.filterAllStatuses"]}</option>
              {STATUSES.map((s) => (
                <option key={s} value={s}>
                  {dict[`deliveries.status.${s}`]}
                </option>
              ))}
            </select>
          </label>
          <button
            type="submit"
            className="rounded-md border border-zinc-300 px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-100"
          >
            {dict["deliveries.list.filterSubmit"]}
          </button>
        </form>
        <DeliveryTable deliveries={deliveries} dict={dict} />
      </section>
    </I18nProvider>
  );
}
