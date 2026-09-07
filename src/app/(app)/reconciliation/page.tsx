import type { SupabaseClient } from "@supabase/supabase-js";
import { requireUser } from "@/lib/auth/require-role";
import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/lib/db/types";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { getLocale } from "@/lib/i18n/get-locale";
import { I18nProvider } from "@/lib/i18n/i18n-provider";
import { todayJst } from "@/lib/db/business-date";
import { loadReconciliationLines, loadLockStatus } from "@/lib/reconciliation/reconciliation-queries";
import { isValidBusinessDate } from "@/lib/reconciliation/business-date-validation";
import { ReconcileTable } from "@/components/reconciliation/reconcile-table";
import { LockConfirmDialog } from "@/components/reconciliation/lock-confirm-dialog";

// SCR013_ReconcileAndLock (A1/A2, FR-101/201/401). ROLE-SETTLEMENT's landing
// page -- await searchParams per Next.js App Router's async API.
export default async function ReconciliationPage({
  searchParams,
}: {
  searchParams: Promise<{ date?: string }>;
}) {
  const [{ date }, user, locale] = await Promise.all([searchParams, requireUser(), getLocale()]);
  const dict = await getDictionary(locale, ["common", "reconciliation"]);

  const businessDate = date && isValidBusinessDate(date) ? date : todayJst();

  const supabase: SupabaseClient<Database> = await createClient();
  const [lines, lock] = await Promise.all([
    loadReconciliationLines(supabase, businessDate),
    loadLockStatus(supabase, businessDate),
  ]);

  const canLock = user.role === "ROLE-SETTLEMENT" && !lock.locked;

  return (
    <I18nProvider locale={locale} dict={dict}>
      <section className="space-y-6">
        <h1 className="text-2xl font-semibold text-zinc-900">{dict["reconciliation.page.title"]}</h1>

        <form method="GET" className="flex flex-wrap items-end gap-4">
          <label className="flex flex-col text-sm text-zinc-700">
            {dict["reconciliation.page.dateLabel"]}
            <input
              type="date"
              name="date"
              defaultValue={businessDate}
              max={todayJst()}
              className="mt-1 rounded-md border border-zinc-300 px-3 py-2 text-sm"
            />
          </label>
          <button
            type="submit"
            className="rounded-md border border-zinc-300 px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-100"
          >
            {dict["reconciliation.page.dateSubmit"]}
          </button>
        </form>

        <p className="text-sm text-zinc-600">
          {lock.locked
            ? `${dict["reconciliation.page.lockedLabel"]} — ${new Date(lock.lockedAt!).toLocaleString()}`
            : dict["reconciliation.page.notLockedLabel"]}
        </p>

        <ReconcileTable lines={lines} dict={dict} />

        {canLock && <LockConfirmDialog businessDate={businessDate} />}
      </section>
    </I18nProvider>
  );
}
