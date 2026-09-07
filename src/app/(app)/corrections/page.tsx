import Link from "next/link";
import type { SupabaseClient } from "@supabase/supabase-js";
import { requireRole } from "@/lib/auth/require-role";
import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/lib/db/types";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { getLocale } from "@/lib/i18n/get-locale";
import { I18nProvider } from "@/lib/i18n/i18n-provider";
import { listCorrections } from "@/lib/corrections/correction-queries";
import { CorrectionListTable, type CorrectionRowView } from "@/components/corrections/correction-list-table";

const EVIDENCE_URL_TTL_SECONDS = 300; // short-lived signed URL (Security Considerations)

// SCR015_CorrectionApproval (A2/A3, DEC-001). ROLE-SETTLEMENT only -- both
// the requester and the approver are ROLE-SETTLEMENT accounts (functional-
// spec Actors); DEC-001's requester!=approver check happens per-row below.
export default async function CorrectionsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const [{ status }, user, locale] = await Promise.all([
    searchParams,
    requireRole(["ROLE-SETTLEMENT"]),
    getLocale(),
  ]);
  const dict = await getDictionary(locale, ["common", "corrections"]);

  const supabase: SupabaseClient<Database> = await createClient();
  const corrections = await listCorrections(supabase, status ?? "pending");

  const rows: CorrectionRowView[] = await Promise.all(
    corrections.map(async (c) => {
      const { data: signed } = await supabase.storage
        .from("correction-evidence")
        .createSignedUrl(c.evidence_path, EVIDENCE_URL_TTL_SECONDS);
      return {
        id: c.id,
        txnCode: c.txn_code,
        reason: c.reason,
        status: c.status,
        evidenceUrl: signed?.signedUrl ?? null,
        canDecide: c.status === "pending" && c.requested_by !== user.id,
        // DEC-001's maker-checker split within the *same* ROLE-SETTLEMENT
        // role, distinct from a role gap -- surfaced separately so the note
        // reads "you created this" rather than naming a role you already have.
        isOwnPendingRequest: c.status === "pending" && c.requested_by === user.id,
      };
    }),
  );

  return (
    <I18nProvider locale={locale} dict={dict}>
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-strong">{dict["corrections.list.title"]}</h1>
          <Link href="/corrections/new" className="sm-btn sm-btn-primary">
            {dict["corrections.list.newLink"]}
          </Link>
        </div>
        <CorrectionListTable rows={rows} dict={dict} />
      </section>
    </I18nProvider>
  );
}
