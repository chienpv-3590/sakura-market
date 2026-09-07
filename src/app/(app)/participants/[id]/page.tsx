import { notFound } from "next/navigation";
import type { SupabaseClient } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/server";
import { getCurrentUser } from "@/lib/auth/require-role";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { getLocale } from "@/lib/i18n/get-locale";
import { I18nProvider } from "@/lib/i18n/i18n-provider";
import type { Database } from "@/lib/db/types";
import { isParticipantCategory } from "@/lib/participants/category-rules";
import { isParticipantStatus } from "@/lib/participants/state-machine";
import { ParticipantProfileFields } from "@/components/participants/participant-profile-fields";
import { TransitionHistoryTable } from "@/components/participants/transition-history-table";
import { TransitionActions } from "@/components/participants/transition-actions";
import { ParticipantForm } from "@/components/participants/participant-form";
import { HandoffCaption } from "@/components/pipeline/handoff-caption";
import { PageFrame } from "@/components/layout/page-frame";
import { SectionCard } from "@/components/layout/section-card";

// SCR003_ParticipantDetail. Profile + current eligibility + full transition
// history, plus (ROLE-SYS-ADMIN only) the edit form and transition actions.
export default async function ParticipantDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [user, locale] = await Promise.all([getCurrentUser(), getLocale()]);
  const dict = await getDictionary(locale, ["common", "participants", "nav"]);

  const supabase: SupabaseClient<Database> = await createClient();
  const { data: participant, error: participantError } = await supabase
    .from("participant")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (participantError) {
    throw new Error(`ParticipantDetailPage: lookup failed: ${participantError.message}`);
  }
  // DB CHECK constraints already restrict category/status to the known
  // values -- this can only fail if the schema and this code drift apart.
  if (!participant || !isParticipantStatus(participant.status) || !isParticipantCategory(participant.category)) {
    notFound();
  }

  const { data: history, error: historyError } = await supabase
    .from("participant_status_history")
    .select("*")
    .eq("participant_id", id)
    .order("changed_at", { ascending: true });
  if (historyError) {
    throw new Error(`ParticipantDetailPage: history query failed: ${historyError.message}`);
  }

  const changedByIds = Array.from(
    new Set((history ?? []).map((h) => h.changed_by).filter((v): v is string => v !== null)),
  );
  const changedByNames: Record<string, string> = {};
  if (changedByIds.length > 0) {
    const { data: users } = await supabase
      .from("app_user")
      .select("id, display_name, email")
      .in("id", changedByIds);
    for (const u of users ?? []) {
      changedByNames[u.id] = u.display_name ?? u.email;
    }
  }

  const canWrite = user?.role === "ROLE-SYS-ADMIN";

  return (
    <I18nProvider locale={locale} dict={dict}>
      <PageFrame
        title={participant.name}
        backHref="/participants"
        backLabel={dict["nav.participants"]}
      >
        <section className="ms-0 me-auto max-w-3xl space-y-6">
          <SectionCard title={dict["participants.detail.profileSection"]}>
            <ParticipantProfileFields participant={participant} dict={dict} />
          </SectionCard>

          {/* Both write sections are ROLE-SYS-ADMIN's. Every other role keeps
              the card and the heading, and reads whose the action is. */}
          <SectionCard title={dict["participants.form.editTitle"]}>
            {canWrite ? (
              <ParticipantForm
                mode="edit"
                initial={{
                  id: participant.id,
                  category: participant.category,
                  name: participant.name,
                  validFrom: participant.valid_from,
                  validTo: participant.valid_to,
                }}
              />
            ) : (
              <HandoffCaption
                actionLabel={dict["participants.form.editTitle"]}
                roles={["ROLE-SYS-ADMIN"]}
              />
            )}
          </SectionCard>

          <SectionCard title={dict["participants.detail.transitionSection"]}>
            {canWrite ? (
              <TransitionActions participantId={participant.id} currentStatus={participant.status} />
            ) : (
              <HandoffCaption
                actionLabel={dict["participants.detail.transitionSection"]}
                roles={["ROLE-SYS-ADMIN"]}
              />
            )}
          </SectionCard>

          <SectionCard title={dict["participants.detail.historySection"]} tight>
            <TransitionHistoryTable
              history={history ?? []}
              changedByNames={changedByNames}
              dict={dict}
            />
          </SectionCard>
        </section>
      </PageFrame>
    </I18nProvider>
  );
}
