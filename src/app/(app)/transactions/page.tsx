import Link from "next/link";
import type { SupabaseClient } from "@supabase/supabase-js";
import { requireUser } from "@/lib/auth/require-role";
import { createClient } from "@/lib/supabase/server";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { getLocale } from "@/lib/i18n/get-locale";
import { I18nProvider } from "@/lib/i18n/i18n-provider";
import type { Database, Tables } from "@/lib/db/types";
import { TransactionTable } from "@/components/transactions/transaction-table";

const STATUSES = ["draft", "confirmed", "cancelled"] as const;

// SCR008_TransactionList. 相対取引 is the market's primary flow (~90% of
// transaction value, phase-07 Key Insights) -- this is ROLE-TRADE's landing
// page (role-landing.ts), not the せり lookup.
export default async function TransactionsPage({
  searchParams,
}: {
  searchParams: Promise<{ businessDate?: string; status?: string }>;
}) {
  const [{ businessDate, status }, user, locale] = await Promise.all([searchParams, requireUser(), getLocale()]);
  const dict = await getDictionary(locale, ["common", "transactions"]);

  const validStatus = status && (STATUSES as readonly string[]).includes(status) ? status : undefined;

  const supabase: SupabaseClient<Database> = await createClient();
  let query = supabase.from("transaction").select("*").order("created_at", { ascending: false }).limit(100);
  if (businessDate) query = query.eq("business_date", businessDate);
  if (validStatus) query = query.eq("status", validStatus);

  const { data, error } = await query;
  if (error) {
    throw new Error(`TransactionsPage: query failed: ${error.message}`);
  }
  const transactions: Tables<"transaction">[] = data ?? [];

  const lotIds = Array.from(new Set(transactions.map((t) => t.lot_id)));
  const buyerIds = Array.from(new Set(transactions.map((t) => t.buyer_participant_id)));
  const lotCodes: Record<string, string> = {};
  const buyerNames: Record<string, string> = {};

  if (lotIds.length > 0) {
    const { data: lots } = await supabase.from("lot").select("id, lot_code").in("id", lotIds);
    for (const lot of lots ?? []) lotCodes[lot.id] = lot.lot_code;
  }
  if (buyerIds.length > 0) {
    const { data: buyers } = await supabase.from("participant").select("id, name").in("id", buyerIds);
    for (const buyer of buyers ?? []) buyerNames[buyer.id] = buyer.name;
  }

  const canAct = user.role === "ROLE-TRADE";

  return (
    <I18nProvider locale={locale} dict={dict}>
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-zinc-900">{dict["transactions.list.title"]}</h1>
          {canAct && (
            <Link
              href="/transactions/new"
              className="rounded-md bg-zinc-900 px-3 py-2 text-sm font-medium text-white hover:bg-zinc-800"
            >
              {dict["transactions.list.newLink"]}
            </Link>
          )}
        </div>
        <form method="GET" className="flex flex-wrap items-end gap-4">
          <label className="flex flex-col text-sm text-zinc-700">
            {dict["transactions.list.filterBusinessDateLabel"]}
            <input
              type="date"
              name="businessDate"
              defaultValue={businessDate ?? ""}
              className="mt-1 rounded-md border border-zinc-300 px-3 py-2 text-sm"
            />
          </label>
          <label className="flex flex-col text-sm text-zinc-700">
            {dict["transactions.list.filterStatusLabel"]}
            <select
              name="status"
              defaultValue={validStatus ?? ""}
              className="mt-1 rounded-md border border-zinc-300 px-3 py-2 text-sm"
            >
              <option value="">{dict["transactions.list.filterAllStatuses"]}</option>
              {STATUSES.map((s) => (
                <option key={s} value={s}>
                  {dict[`transactions.status.${s}`]}
                </option>
              ))}
            </select>
          </label>
          <button
            type="submit"
            className="rounded-md border border-zinc-300 px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-100"
          >
            {dict["transactions.list.filterSubmit"]}
          </button>
        </form>
        <TransactionTable
          transactions={transactions}
          lotCodes={lotCodes}
          buyerNames={buyerNames}
          dict={dict}
          canAct={canAct}
        />
      </section>
    </I18nProvider>
  );
}
