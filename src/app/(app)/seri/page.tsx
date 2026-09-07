import Link from "next/link";
import type { SupabaseClient } from "@supabase/supabase-js";
import { requireUser } from "@/lib/auth/require-role";
import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/lib/db/types";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { getLocale } from "@/lib/i18n/get-locale";
import { I18nProvider } from "@/lib/i18n/i18n-provider";
import { searchSeriResults } from "@/lib/seri/seri-queries";
import { HandoffCaption } from "@/components/pipeline/handoff-caption";
import { EmptyState } from "@/components/ui/empty-state";
import { PageFrame } from "@/components/layout/page-frame";

// SCR010_SeriLookup. Deliberately smaller than SCR008: no separate filter
// component or table component -- せり is recording-only and much lighter
// than 相対取引 (phase-07 Key Insights). One plain GET form is proportionate.
export default async function SeriPage({
  searchParams,
}: {
  searchParams: Promise<{ businessDate?: string; lotCode?: string; winnerName?: string }>;
}) {
  const [{ businessDate, lotCode, winnerName }, user, locale] = await Promise.all([
    searchParams,
    requireUser(),
    getLocale(),
  ]);
  const dict = await getDictionary(locale, ["common", "transactions"]);

  const supabase: SupabaseClient<Database> = await createClient();
  const results = await searchSeriResults(supabase, { businessDate, lotCode, winnerName });

  const lotIds = Array.from(new Set(results.map((r) => r.lot_id)));
  const winnerIds = Array.from(new Set(results.map((r) => r.winner_participant_id)));
  const lotCodes: Record<string, string> = {};
  const winnerNames: Record<string, string> = {};

  if (lotIds.length > 0) {
    const { data: lots } = await supabase.from("lot").select("id, lot_code").in("id", lotIds);
    for (const lot of lots ?? []) lotCodes[lot.id] = lot.lot_code;
  }
  if (winnerIds.length > 0) {
    const { data: winners } = await supabase.from("participant").select("id, name").in("id", winnerIds);
    for (const w of winners ?? []) winnerNames[w.id] = w.name;
  }

  const canCreate = user.role === "ROLE-TRADE";

  return (
    <I18nProvider locale={locale} dict={dict}>
      <PageFrame
        title={dict["seri.list.title"]}
        actions={
          canCreate ? (
          <Link
          href="/seri/new"
          className="cds-btn cds-btn--md"
          >
          {dict["seri.list.newLink"]}
          </Link>
          ) : (
          <HandoffCaption actionLabel={dict["seri.list.newLink"]} roles={["ROLE-TRADE"]} />
          )
        }
      >
        <section className="space-y-6">
        <form method="GET" className="flex flex-wrap items-end gap-4">
          <label className="cds-field">
            {dict["seri.list.filterLotCodeLabel"]}
            <input
              type="text"
              name="lotCode"
              defaultValue={lotCode ?? ""}
              className="cds-input--native mt-1"
            />
          </label>
          <label className="cds-field">
            {dict["seri.list.filterBusinessDateLabel"]}
            <input
              type="date"
              name="businessDate"
              defaultValue={businessDate ?? ""}
              className="cds-input--native mt-1"
            />
          </label>
          <label className="cds-field">
            {dict["seri.list.filterWinnerNameLabel"]}
            <input
              type="text"
              name="winnerName"
              defaultValue={winnerName ?? ""}
              className="cds-input--native mt-1"
            />
          </label>
          <button
            type="submit"
            className="cds-btn cds-btn--secondary cds-btn--md"
          >
            {dict["seri.list.filterSubmit"]}
          </button>
        </form>
        {results.length === 0 ? (
          <EmptyState description={dict["seri.list.empty"]} />
        ) : (
          <div className="cds-table__wrap">
            <table className="cds-table cds-table--default cds-table--hover">
              <thead>
                <tr>
                  <th>{dict["seri.list.columns.lot"]}</th>
                  <th>{dict["seri.list.columns.winner"]}</th>
                  <th className="text-right">{dict["seri.list.columns.qty"]}</th>
                  <th className="text-right">{dict["seri.list.columns.unitPrice"]}</th>
                  <th>{dict["seri.list.columns.decidedAt"]}</th>
                  <th>{dict["seri.list.columns.actions"]}</th>
                </tr>
              </thead>
              <tbody>
                {results.map((r) => (
                  <tr key={r.id}>
                    <td>{lotCodes[r.lot_id] ?? r.lot_id}</td>
                    <td>{winnerNames[r.winner_participant_id] ?? r.winner_participant_id}</td>
                    <td className="cds-table__num cds-table__mono">{r.qty}</td>
                    <td className="cds-table__num cds-table__mono">{r.unit_price.toLocaleString()}</td>
                    <td className="cds-table__mono">{new Date(r.decided_at).toLocaleString()}</td>
                    <td>
                      <Link href={`/seri/${r.id}`} className="cds-link cds-link--underline">
                        {dict["seri.list.detailLink"]}
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        </section>
      </PageFrame>
    </I18nProvider>
  );
}
