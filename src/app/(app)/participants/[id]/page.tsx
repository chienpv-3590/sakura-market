import Link from "next/link";
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
import { EligibilityStatusBadge } from "@/components/participants/eligibility-status-badge";
import { TransitionHistoryTable } from "@/components/participants/transition-history-table";
import { TransitionActions } from "@/components/participants/transition-actions";
import { ParticipantForm } from "@/components/participants/participant-form";
import { HandoffCaption } from "@/components/pipeline/handoff-caption";

// SCR003_ParticipantDetail. Profile + current eligibility + full transition
// history, plus (ROLE-SYS-ADMIN only) the edit form and transition actions.
export default async function ParticipantDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [user, locale] = await Promise.all([getCurrentUser(), getLocale()]);
  const dict = await getDictionary(locale, ["common", "participants"]);

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
      <section className="max-w-3xl space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-strong">{participant.name}</h1>
          <Link href="/participants" className="text-sm text-secondary hover:underline">
            {dict["participants.detail.backToList"]}
          </Link>
        </div>

        <div className="sm-card p-4">
          <h2 className="mb-3 text-lg font-medium text-strong">{dict["participants.detail.profileSection"]}</h2>
          <dl className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <dt className="text-muted">{dict["participants.detail.categoryLabel"]}</dt>
              <dd className="text-strong">{dict[`category.${participant.category}`] ?? participant.category}</dd>
            </div>
            <div>
              <dt className="text-muted">{dict["participants.detail.licenseTypeLabel"]}</dt>
              <dd className="text-strong">
                {dict[`licenseType.${participant.license_type}`] ?? participant.license_type}
              </dd>
            </div>
            <div>
              <dt className="text-muted">{dict["participants.detail.statusLabel"]}</dt>
              <dd>
                <EligibilityStatusBadge
                  status={participant.status}
                  label={dict[`status.${participant.status}`] ?? participant.status}
                />
              </dd>
            </div>
            <div>
              <dt className="text-muted">{dict["participants.detail.validFromLabel"]}</dt>
              <dd className="sm-mono text-strong">{participant.valid_from}</dd>
            </div>
            <div>
              <dt className="text-muted">{dict["participants.detail.validToLabel"]}</dt>
              <dd className="sm-mono text-strong">{participant.valid_to ?? dict["participants.detail.validToNone"]}</dd>
            </div>
          </dl>
        </div>

        {canWrite ? (
          <div className="sm-card p-4">
            <h2 className="mb-3 text-lg font-medium text-strong">{dict["participants.form.editTitle"]}</h2>
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
          </div>
        ) : (
          <HandoffCaption actionLabel={dict["participants.form.editTitle"]} roles={["ROLE-SYS-ADMIN"]} />
        )}

        {canWrite ? (
          <div className="sm-card p-4">
            <h2 className="mb-3 text-lg font-medium text-strong">{dict["participants.detail.transitionSection"]}</h2>
            <TransitionActions participantId={participant.id} currentStatus={participant.status} />
          </div>
        ) : (
          <HandoffCaption actionLabel={dict["participants.detail.transitionSection"]} roles={["ROLE-SYS-ADMIN"]} />
        )}

        <div className="sm-card p-4">
          <h2 className="mb-3 text-lg font-medium text-strong">{dict["participants.detail.historySection"]}</h2>
          <TransitionHistoryTable history={history ?? []} changedByNames={changedByNames} dict={dict} />
        </div>
      </section>
    </I18nProvider>
  );
}
