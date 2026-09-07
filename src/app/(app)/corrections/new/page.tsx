import type { SupabaseClient } from "@supabase/supabase-js";
import { requireRole } from "@/lib/auth/require-role";
import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/lib/db/types";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { getLocale } from "@/lib/i18n/get-locale";
import { I18nProvider } from "@/lib/i18n/i18n-provider";
import { CorrectionRequestForm } from "@/components/corrections/correction-request-form";

// SCR014_CorrectionRequest (A1, FR-101, FR-201, US001). FR-101 lets this be
// reached from a locked transaction's own detail page (owned by F004, out of
// this phase's file scope) via `?txnCode=`; this page is also independently
// reachable with its own lookup form when arrived at directly.
export default async function NewCorrectionPage({
  searchParams,
}: {
  searchParams: Promise<{ txnCode?: string }>;
}) {
  const [{ txnCode }, , locale] = await Promise.all([searchParams, requireRole(["ROLE-SETTLEMENT"]), getLocale()]);
  const dict = await getDictionary(locale, ["common", "corrections"]);

  const supabase: SupabaseClient<Database> = await createClient();
  const trimmedCode = txnCode?.trim();
  const { data: txn } = trimmedCode
    ? await supabase.from("transaction").select("*").eq("txn_code", trimmedCode).maybeSingle()
    : { data: null };

  return (
    <I18nProvider locale={locale} dict={dict}>
      <section className="max-w-md space-y-6">
        <h1 className="text-2xl font-semibold text-strong">{dict["corrections.request.title"]}</h1>

        <form method="GET" className="flex items-end gap-2">
          <label className="flex flex-col text-sm font-medium text-secondary">
            {dict["corrections.request.txnCodeLabel"]}
            <input
              type="text"
              name="txnCode"
              defaultValue={trimmedCode ?? ""}
              className="sm-field mt-1"
            />
          </label>
          <button
            type="submit"
            className="sm-btn sm-btn-secondary"
          >
            {dict["corrections.request.txnCodeSubmit"]}
          </button>
        </form>

        {trimmedCode && !txn && <p className="sm-error">{dict["corrections.error.txnNotFound"]}</p>}

        {txn && (
          <>
            <dl className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <dt className="text-muted">{dict["corrections.request.originalQtyLabel"]}</dt>
                <dd className="sm-num text-left text-strong">{txn.qty}</dd>
              </div>
              <div>
                <dt className="text-muted">{dict["corrections.request.originalUnitPriceLabel"]}</dt>
                <dd className="sm-num text-left text-strong">{txn.unit_price.toLocaleString()}</dd>
              </div>
              <div>
                <dt className="text-muted">{dict["corrections.request.businessDateLabel"]}</dt>
                <dd className="sm-mono text-strong">{txn.business_date}</dd>
              </div>
            </dl>
            <CorrectionRequestForm targetTxnId={txn.id} />
          </>
        )}
      </section>
    </I18nProvider>
  );
}
