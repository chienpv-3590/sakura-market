import type { SupabaseClient } from "@supabase/supabase-js";
import { requireUser } from "@/lib/auth/require-role";
import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/lib/db/types";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { getLocale } from "@/lib/i18n/get-locale";
import { I18nProvider } from "@/lib/i18n/i18n-provider";
import { listDeliveries } from "@/lib/deliveries/delivery-queries";
import { DeliveryTable } from "@/components/deliveries/delivery-table";
import { PageFrame } from "@/components/layout/page-frame";

// "ngoại lệ" bi bo khoi filter co chu dich: schema cho phep trang thai do
// (FIG-013) nhung FR-DEL-03 -- ghi nhan ngoai le giao hang -- nam ngoai pham
// vi ban nay, nen KHONG duong code nao set duoc no. Mot filter luon tra ve
// rong khien nguoi dung khong phan biet duoc "hom nay khong co ngoai le" voi
// "he thong chua ghi duoc ngoai le". Xem docs/pham-vi-va-phan-mock.md.
const STATUSES = ["chờ", "đang giao", "hoàn tất"] as const;

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
      <PageFrame
        title={dict["deliveries.list.title"]}
      >
        <section className="space-y-6">
        <form method="GET" className="flex flex-wrap items-end gap-4">
          <label className="cds-field">
            {dict["deliveries.list.filterBusinessDateLabel"]}
            <input
              type="date"
              name="businessDate"
              defaultValue={businessDate ?? ""}
              className="cds-input--native mt-1"
            />
          </label>
          <label className="cds-field">
            {dict["deliveries.list.filterStatusLabel"]}
            <select
              name="status"
              defaultValue={validStatus ?? ""}
              className="cds-select--native mt-1"
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
            className="cds-btn cds-btn--secondary cds-btn--md"
          >
            {dict["deliveries.list.filterSubmit"]}
          </button>
        </form>
        <DeliveryTable deliveries={deliveries} dict={dict} />
        </section>
      </PageFrame>
    </I18nProvider>
  );
}
