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
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-strong">{dict["seri.list.title"]}</h1>
          {canCreate ? (
            <Link
              href="/seri/new"
              className="sm-btn sm-btn-primary"
            >
              {dict["seri.list.newLink"]}
            </Link>
          ) : (
            <HandoffCaption actionLabel={dict["seri.list.newLink"]} roles={["ROLE-TRADE"]} />
          )}
        </div>
        <form method="GET" className="flex flex-wrap items-end gap-4">
          <label className="flex flex-col text-sm font-medium text-secondary">
            {dict["seri.list.filterLotCodeLabel"]}
            <input
              type="text"
              name="lotCode"
              defaultValue={lotCode ?? ""}
              className="sm-field mt-1"
            />
          </label>
          <label className="flex flex-col text-sm font-medium text-secondary">
            {dict["seri.list.filterBusinessDateLabel"]}
            <input
              type="date"
              name="businessDate"
              defaultValue={businessDate ?? ""}
              className="sm-field mt-1"
            />
          </label>
          <label className="flex flex-col text-sm font-medium text-secondary">
            {dict["seri.list.filterWinnerNameLabel"]}
            <input
              type="text"
              name="winnerName"
              defaultValue={winnerName ?? ""}
              className="sm-field mt-1"
            />
          </label>
          <button
            type="submit"
            className="sm-btn sm-btn-secondary"
          >
            {dict["seri.list.filterSubmit"]}
          </button>
        </form>
        {results.length === 0 ? (
          <p className="sm-empty">{dict["seri.list.empty"]}</p>
        ) : (
          <div className="sm-table-wrap sm-table-scroll">
            <table className="sm-table">
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
                    <td className="sm-num">{r.qty}</td>
                    <td className="sm-num">{r.unit_price.toLocaleString()}</td>
                    <td className="sm-mono">{new Date(r.decided_at).toLocaleString()}</td>
                    <td>
                      <Link href={`/seri/${r.id}`} className="sm-link">
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
    </I18nProvider>
  );
}
