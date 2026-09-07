import Link from "next/link";
import type { SupabaseClient } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/server";
import { getCurrentUser } from "@/lib/auth/require-role";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { getLocale } from "@/lib/i18n/get-locale";
import { I18nProvider } from "@/lib/i18n/i18n-provider";
import type { Database, Tables } from "@/lib/db/types";
import { isParticipantCategory } from "@/lib/participants/category-rules";
import { isParticipantStatus } from "@/lib/participants/state-machine";
import { ParticipantFilters } from "@/components/participants/participant-filters";
import { ParticipantTable } from "@/components/participants/participant-table";
import { HandoffCaption } from "@/components/pipeline/handoff-caption";
import { PageFrame } from "@/components/layout/page-frame";

type ParticipantRow = Tables<"participant">;

// SCR002_ParticipantList. Any active role may view (RLS read_all_active_users
// grants read to all); only ROLE-SYS-ADMIN sees the "create" link.
export default async function ParticipantsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; status?: string }>;
}) {
  const [{ category, status }, user, locale] = await Promise.all([
    searchParams,
    getCurrentUser(),
    getLocale(),
  ]);
  const dict = await getDictionary(locale, ["common", "participants"]);

  const validCategory = category && isParticipantCategory(category) ? category : undefined;
  const validStatus = status && isParticipantStatus(status) ? status : undefined;

  const supabase: SupabaseClient<Database> = await createClient();
  let query = supabase
    .from("participant")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(50);
  if (validCategory) query = query.eq("category", validCategory);
  if (validStatus) query = query.eq("status", validStatus);

  const { data, error } = await query;
  if (error) {
    throw new Error(`ParticipantsPage: query failed: ${error.message}`);
  }
  const participants: ParticipantRow[] = data ?? [];
  const canWrite = user?.role === "ROLE-SYS-ADMIN";

  return (
    <I18nProvider locale={locale} dict={dict}>
      <PageFrame
        title={dict["participants.list.title"]}
        actions={
          canWrite ? (
          <Link
          href="/participants/new"
          className="cds-btn cds-btn--md"
          >
          {dict["participants.list.createButton"]}
          </Link>
          ) : (
          <HandoffCaption actionLabel={dict["participants.list.createButton"]} roles={["ROLE-SYS-ADMIN"]} />
          )
        }
      >
        <section className="space-y-6">
        <ParticipantFilters category={validCategory} status={validStatus} />
        <ParticipantTable participants={participants} dict={dict} />
        </section>
      </PageFrame>
    </I18nProvider>
  );
}
