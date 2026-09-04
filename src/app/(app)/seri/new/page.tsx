import type { SupabaseClient } from "@supabase/supabase-js";
import { requireRole } from "@/lib/auth/require-role";
import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/lib/db/types";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { getLocale } from "@/lib/i18n/get-locale";
import { I18nProvider } from "@/lib/i18n/i18n-provider";
import { SeriEntryForm } from "@/components/seri/seri-entry-form";

// SCR009_SeriEntry. ROLE-TRADE only (matches write_trade RLS policy on
// seri_result insert). Lot dropdown excludes lots that already have a
// seri_result -- a nicer path than letting the operator hit A1's 409 and
// re-navigate, though that 409 guard is still the real enforcement point.
export default async function NewSeriResultPage() {
  const user = await requireRole(["ROLE-TRADE"]);
  const locale = await getLocale();
  const dict = await getDictionary(locale, ["common", "transactions"]);

  const supabase: SupabaseClient<Database> = await createClient();
  const [{ data: lots }, { data: existing }, { data: participants }, { data: operators }] = await Promise.all([
    supabase.from("lot").select("id, lot_code, item").order("lot_code"),
    supabase.from("seri_result").select("lot_id"),
    supabase.from("participant").select("id, name").order("name"),
    supabase.from("app_user").select("id, display_name, email").eq("is_active", true).order("display_name"),
  ]);

  const takenLotIds = new Set((existing ?? []).map((r) => r.lot_id));
  const availableLots = (lots ?? [])
    .filter((l) => !takenLotIds.has(l.id))
    .map((l) => ({ id: l.id, lotCode: l.lot_code, item: l.item }));

  return (
    <I18nProvider locale={locale} dict={dict}>
      <section className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-zinc-900">{dict["seri.create.title"]}</h1>
          <p className="mt-1 text-sm text-zinc-600">{dict["seri.create.subtitle"]}</p>
        </div>
        <SeriEntryForm
          mode="create"
          lots={availableLots}
          participants={(participants ?? []).map((p) => ({ id: p.id, name: p.name }))}
          operators={(operators ?? []).map((o) => ({ id: o.id, label: o.display_name ?? o.email }))}
          defaultConfirmedBy={user.id}
        />
      </section>
    </I18nProvider>
  );
}
