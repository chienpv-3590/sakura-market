import type { SupabaseClient } from "@supabase/supabase-js";
import { requireRole } from "@/lib/auth/require-role";
import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/lib/db/types";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { getLocale } from "@/lib/i18n/get-locale";
import { I18nProvider } from "@/lib/i18n/i18n-provider";
import { todayJst } from "@/lib/db/business-date";
import { isValidPeriod } from "@/lib/incentive/is-valid-period";
import { listIncentiveResults } from "@/lib/incentive/incentive-result-queries";
import { IncentiveResultTable } from "@/components/incentive/incentive-result-table";

// SCR016_IncentiveResult (A6, FR-303, US003) -- ROLE-SETTLEMENT's own view
// of 完納奨励金 results per functional-spec's Actors table.
export default async function IncentivePage({
  searchParams,
}: {
  searchParams: Promise<{ period?: string }>;
}) {
  const [{ period }, , locale] = await Promise.all([searchParams, requireRole(["ROLE-SETTLEMENT"]), getLocale()]);
  const dict = await getDictionary(locale, ["common", "incentive"]);

  const resolvedPeriod = period && isValidPeriod(period) ? period : todayJst();

  const supabase: SupabaseClient<Database> = await createClient();
  const rows = await listIncentiveResults(supabase, { period: resolvedPeriod });

  return (
    <I18nProvider locale={locale} dict={dict}>
      <section className="space-y-6">
        <h1 className="text-2xl font-semibold text-zinc-900">
          {dict["incentive.result.title"]} — {dict["term.incentive"]}
        </h1>

        <form method="GET" className="flex flex-wrap items-end gap-4">
          <label className="flex flex-col text-sm text-zinc-700">
            {dict["incentive.result.periodLabel"]}
            <input
              type="date"
              name="period"
              defaultValue={resolvedPeriod}
              max={todayJst()}
              className="mt-1 rounded-md border border-zinc-300 px-3 py-2 text-sm"
            />
          </label>
          <button
            type="submit"
            className="rounded-md border border-zinc-300 px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-100"
          >
            {dict["incentive.result.periodSubmit"]}
          </button>
        </form>

        <IncentiveResultTable rows={rows} dict={dict} />
      </section>
    </I18nProvider>
  );
}
