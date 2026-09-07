import Link from "next/link";
import type { SupabaseClient } from "@supabase/supabase-js";
import { requireUser } from "@/lib/auth/require-role";
import { createClient } from "@/lib/supabase/server";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { getLocale } from "@/lib/i18n/get-locale";
import type { Database } from "@/lib/db/types";
import { HandoffCaption } from "@/components/pipeline/handoff-caption";

// Lots list -- entry point into SCR005 (for ROLE-JUDGE, on 'received' lots)
// and SCR006 (for everyone). Fully server-rendered, no client JS needed.
export default async function LotsPage() {
  const user = await requireUser();
  const locale = await getLocale();
  const dict = await getDictionary(locale, ["common", "lots"]);
  const supabase: SupabaseClient<Database> = await createClient();

  const { data: lots, error } = await supabase
    .from("lot")
    .select("id, lot_code, item, package_count, initial_qty, available_qty, status")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(`LotsPage: failed to load lots: ${error.message}`);
  }

  // /lots/new 404s for anyone but ROLE-INTAKE (requireRole gate) -- the
  // button must not be offered to a role it would 404 for.
  const canCreate = user.role === "ROLE-INTAKE";

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-zinc-900">{dict["lots.list.title"]}</h1>
        {canCreate ? (
          <Link
            href="/lots/new"
            className="rounded-md bg-zinc-900 px-3 py-2 text-sm font-medium text-white hover:bg-zinc-800"
          >
            {dict["lots.list.newLink"]}
          </Link>
        ) : (
          <HandoffCaption actionLabel={dict["lots.list.newLink"]} roles={["ROLE-INTAKE"]} />
        )}
      </div>
      {!lots || lots.length === 0 ? (
        <p className="text-sm text-zinc-500">{dict["lots.list.empty"]}</p>
      ) : (
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-zinc-200 text-zinc-500">
              <th className="py-2 pr-2">{dict["lots.list.columns.code"]}</th>
              <th className="py-2 pr-2">{dict["lots.list.columns.item"]}</th>
              <th className="py-2 pr-2">{dict["lots.list.columns.packageCount"]}</th>
              <th className="py-2 pr-2">{dict["lots.list.columns.initialQty"]}</th>
              <th className="py-2 pr-2">{dict["lots.list.columns.availableQty"]}</th>
              <th className="py-2 pr-2">{dict["lots.list.columns.status"]}</th>
              <th className="py-2 pr-2">{dict["lots.list.columns.actions"]}</th>
            </tr>
          </thead>
          <tbody>
            {lots.map((lot) => (
              <tr key={lot.id} className="border-b border-zinc-100">
                <td className="py-2 pr-2 font-mono">{lot.lot_code}</td>
                <td className="py-2 pr-2">{lot.item}</td>
                <td className="py-2 pr-2">{lot.package_count}</td>
                <td className="py-2 pr-2">{lot.initial_qty}</td>
                <td className="py-2 pr-2">{lot.available_qty}</td>
                <td className="py-2 pr-2">{dict[`lots.status.${lot.status}`] ?? lot.status}</td>
                <td className="py-2 pr-2">
                  <span className="space-x-3">
                    <Link href={`/lots/${lot.id}`} className="text-zinc-700 underline">
                      {dict["lots.list.detailLink"]}
                    </Link>
                    {lot.status === "received" && user.role === "ROLE-JUDGE" && (
                      <Link href={`/lots/${lot.id}/mekiki`} className="text-zinc-700 underline">
                        {dict["lots.list.mekikiLink"]}
                      </Link>
                    )}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}
