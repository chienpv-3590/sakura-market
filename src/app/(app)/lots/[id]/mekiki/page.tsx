import { notFound } from "next/navigation";
import type { SupabaseClient } from "@supabase/supabase-js";
import { requireUser } from "@/lib/auth/require-role";
import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/lib/db/types";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { getLocale } from "@/lib/i18n/get-locale";
import { I18nProvider } from "@/lib/i18n/i18n-provider";
import { MekikiForm } from "@/components/lots/mekiki-form";

// SCR005_MekikiEntry. Page-level view is open to any active user (matches
// the shared read_all_active_users RLS policy); the actual write stays
// gated to ROLE-JUDGE at the API layer (POST /api/lots/[id]/mekiki) -- this
// page only decides whether to show the form or an explanatory notice.
export default async function MekikiEntryPage({ params }: { params: Promise<{ id: string }> }) {
  const user = await requireUser();
  const { id } = await params;
  const locale = await getLocale();
  const dict = await getDictionary(locale, ["common", "lots"]);

  const supabase: SupabaseClient<Database> = await createClient();
  const { data: lot, error } = await supabase
    .from("lot")
    .select("id, lot_code, item, status")
    .eq("id", id)
    .maybeSingle();

  if (error) throw new Error(`MekikiEntryPage: lot lookup failed: ${error.message}`);
  if (!lot) notFound();

  return (
    <I18nProvider locale={locale} dict={dict}>
      <section className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-strong">{dict["lots.mekiki.title"]}</h1>
          <p className="sm-hint mt-1">
            {dict["lots.mekiki.lotCodeLabel"]}: <span className="sm-mono">{lot.lot_code}</span>
            {" — "}
            {dict["lots.mekiki.itemLabel"]}: {lot.item}
          </p>
        </div>
        {user.role === "ROLE-JUDGE" && lot.status === "received" ? (
          <MekikiForm lotId={lot.id} />
        ) : user.role !== "ROLE-JUDGE" ? (
          <p className="text-sm text-muted">{dict["lots.mekiki.wrongRole"]}</p>
        ) : (
          <p className="text-sm text-muted">{dict["lots.mekiki.alreadyDone"]}</p>
        )}
      </section>
    </I18nProvider>
  );
}
