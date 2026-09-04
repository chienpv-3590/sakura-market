import Link from "next/link";
import type { SupabaseClient } from "@supabase/supabase-js";
import { requireUser } from "@/lib/auth/require-role";
import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/lib/db/types";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { getLocale } from "@/lib/i18n/get-locale";
import { I18nProvider } from "@/lib/i18n/i18n-provider";
import { searchSeriResults } from "@/lib/seri/seri-queries";

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
          <h1 className="text-2xl font-semibold text-zinc-900">{dict["seri.list.title"]}</h1>
          {canCreate && (
            <Link
              href="/seri/new"
              className="rounded-md bg-zinc-900 px-3 py-2 text-sm font-medium text-white hover:bg-zinc-800"
            >
              {dict["seri.list.newLink"]}
            </Link>
          )}
        </div>
        <form method="GET" className="flex flex-wrap items-end gap-4">
          <label className="flex flex-col text-sm text-zinc-700">
            {dict["seri.list.filterLotCodeLabel"]}
            <input
              type="text"
              name="lotCode"
              defaultValue={lotCode ?? ""}
              className="mt-1 rounded-md border border-zinc-300 px-3 py-2 text-sm"
            />
          </label>
          <label className="flex flex-col text-sm text-zinc-700">
            {dict["seri.list.filterBusinessDateLabel"]}
            <input
              type="date"
              name="businessDate"
              defaultValue={businessDate ?? ""}
              className="mt-1 rounded-md border border-zinc-300 px-3 py-2 text-sm"
            />
          </label>
          <label className="flex flex-col text-sm text-zinc-700">
            {dict["seri.list.filterWinnerNameLabel"]}
            <input
              type="text"
              name="winnerName"
              defaultValue={winnerName ?? ""}
              className="mt-1 rounded-md border border-zinc-300 px-3 py-2 text-sm"
            />
          </label>
          <button
            type="submit"
            className="rounded-md border border-zinc-300 px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-100"
          >
            {dict["seri.list.filterSubmit"]}
          </button>
        </form>
        {results.length === 0 ? (
          <p className="text-sm text-zinc-500">{dict["seri.list.empty"]}</p>
        ) : (
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-zinc-200 text-left text-zinc-500">
                <th className="py-2 pr-4 font-medium">{dict["seri.list.columns.lot"]}</th>
                <th className="py-2 pr-4 font-medium">{dict["seri.list.columns.winner"]}</th>
                <th className="py-2 pr-4 font-medium">{dict["seri.list.columns.qty"]}</th>
                <th className="py-2 pr-4 font-medium">{dict["seri.list.columns.unitPrice"]}</th>
                <th className="py-2 pr-4 font-medium">{dict["seri.list.columns.decidedAt"]}</th>
                <th className="py-2 pr-4 font-medium">{dict["seri.list.columns.actions"]}</th>
              </tr>
            </thead>
            <tbody>
              {results.map((r) => (
                <tr key={r.id} className="border-b border-zinc-100">
                  <td className="py-2 pr-4">{lotCodes[r.lot_id] ?? r.lot_id}</td>
                  <td className="py-2 pr-4">{winnerNames[r.winner_participant_id] ?? r.winner_participant_id}</td>
                  <td className="py-2 pr-4">{r.qty}</td>
                  <td className="py-2 pr-4">{r.unit_price.toLocaleString()}</td>
                  <td className="py-2 pr-4">{new Date(r.decided_at).toLocaleString()}</td>
                  <td className="py-2 pr-4">
                    <Link href={`/seri/${r.id}`} className="text-zinc-700 underline">
                      {dict["seri.list.detailLink"]}
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </I18nProvider>
  );
}
