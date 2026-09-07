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
import { PageFrame } from "@/components/layout/page-frame";

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
      <PageFrame
        title={
          <>
            {dict["incentive.result.title"]} — {dict["term.incentive"]}
          </>
        }
      >
        <section className="space-y-6">

        <form method="GET" className="flex flex-wrap items-end gap-4">
          <label className="cds-field">
            {dict["incentive.result.periodLabel"]}
            <input
              type="date"
              name="period"
              defaultValue={resolvedPeriod}
              max={todayJst()}
              className="cds-input--native mt-1"
            />
          </label>
          <button
            type="submit"
            className="cds-btn cds-btn--secondary cds-btn--md"
          >
            {dict["incentive.result.periodSubmit"]}
          </button>
        </form>

        <IncentiveResultTable rows={rows} dict={dict} />
        </section>
      </PageFrame>
    </I18nProvider>
  );
}
