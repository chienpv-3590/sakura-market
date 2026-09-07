import type { SupabaseClient } from "@supabase/supabase-js";
import { requireRole } from "@/lib/auth/require-role";
import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/lib/db/types";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { getLocale } from "@/lib/i18n/get-locale";
import { I18nProvider } from "@/lib/i18n/i18n-provider";
import { AitaiCreateForm } from "@/components/transactions/aitai-create-form";

// SCR007_AitaiCreate. ROLE-TRADE only (matches write_trade RLS policy on
// transaction insert). Dropdown only offers lots that are 'published' and
// still have qty on hand -- an already-drained lot never belongs here even
// though the final availability gate is A2's job, not this form's.
export default async function NewTransactionPage() {
  await requireRole(["ROLE-TRADE"]);
  const locale = await getLocale();
  const dict = await getDictionary(locale, ["common", "transactions"]);

  const supabase: SupabaseClient<Database> = await createClient();
  const [{ data: lots }, { data: participants }] = await Promise.all([
    supabase
      .from("lot")
      .select("id, lot_code, item, available_qty")
      .eq("status", "published")
      .gt("available_qty", 0)
      .order("lot_code"),
    supabase.from("participant").select("id, name").order("name"),
  ]);

  return (
    <I18nProvider locale={locale} dict={dict}>
      <section className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-strong">{dict["transactions.create.title"]}</h1>
          <p className="sm-hint mt-1">{dict["transactions.create.subtitle"]}</p>
        </div>
        <AitaiCreateForm
          lots={(lots ?? []).map((l) => ({
            id: l.id,
            lotCode: l.lot_code,
            item: l.item,
            availableQty: l.available_qty,
          }))}
          participants={(participants ?? []).map((p) => ({ id: p.id, name: p.name }))}
        />
      </section>
    </I18nProvider>
  );
}
