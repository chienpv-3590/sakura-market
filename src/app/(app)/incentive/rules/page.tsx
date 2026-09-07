import Link from "next/link";
import type { SupabaseClient } from "@supabase/supabase-js";
import { requireRole } from "@/lib/auth/require-role";
import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/lib/db/types";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { getLocale } from "@/lib/i18n/get-locale";
import { I18nProvider } from "@/lib/i18n/i18n-provider";
import { todayJst } from "@/lib/db/business-date";
import { listRuleVersions } from "@/lib/incentive/rule-version-queries";
import { computeDisplayStatuses } from "@/lib/incentive/rule-version-display-status";
import { RuleVersionTable } from "@/components/incentive/rule-version-table";

const STATUSES = ["pending_approval", "active", "rolled_back"] as const;

// SCR017_RuleVersionList (A4, FR-101) -- ROLE-RULE-ADMIN landing page
// (role-landing.ts routes both maker and checker accounts here).
export default async function RuleVersionListPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const [{ status }, , locale] = await Promise.all([searchParams, requireRole(["ROLE-RULE-ADMIN"]), getLocale()]);
  const dict = await getDictionary(locale, ["common", "incentive"]);

  const validStatus = status && (STATUSES as readonly string[]).includes(status) ? status : undefined;

  const supabase: SupabaseClient<Database> = await createClient();
  const rows = await listRuleVersions(supabase, validStatus);
  const displayStatus = computeDisplayStatuses(rows, todayJst());

  return (
    <I18nProvider locale={locale} dict={dict}>
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-strong">
            {dict["incentive.rules.list.title"]} — {dict["term.incentive"]}
          </h1>
          <Link
            href="/incentive/rules/new"
            className="sm-btn sm-btn-primary"
          >
            {dict["incentive.rules.list.newLink"]}
          </Link>
        </div>

        <form method="GET" className="flex flex-wrap items-end gap-4">
          <label className="flex flex-col text-sm font-medium text-secondary">
            {dict["incentive.rules.list.filterStatusLabel"]}
            <select
              name="status"
              defaultValue={validStatus ?? ""}
              className="sm-field mt-1"
            >
              <option value="">{dict["incentive.rules.list.filterAll"]}</option>
              {STATUSES.map((s) => (
                <option key={s} value={s}>
                  {dict[`incentive.rules.status.${s}`]}
                </option>
              ))}
            </select>
          </label>
          <button
            type="submit"
            className="sm-btn sm-btn-secondary"
          >
            {dict["incentive.rules.list.filterSubmit"]}
          </button>
        </form>

        <RuleVersionTable rows={rows} displayStatus={displayStatus} dict={dict} />
      </section>
    </I18nProvider>
  );
}
