import { notFound } from "next/navigation";
import type { SupabaseClient } from "@supabase/supabase-js";
import { requireRole } from "@/lib/auth/require-role";
import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/lib/db/types";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { getLocale } from "@/lib/i18n/get-locale";
import { I18nProvider } from "@/lib/i18n/i18n-provider";
import { todayJst } from "@/lib/db/business-date";
import { listRuleVersions, loadRuleVersion } from "@/lib/incentive/rule-version-queries";
import { computeDisplayStatuses } from "@/lib/incentive/rule-version-display-status";
import { RuleVersionDetailActions } from "@/components/incentive/rule-version-detail-actions";
import { RuleVersionFields } from "@/components/incentive/rule-version-fields";
import { PageFrame } from "@/components/layout/page-frame";
import { SectionCard } from "@/components/layout/section-card";

// SCR018_RuleVersionEditor detail (A2/A3, DEC-001, US002).
export default async function RuleVersionDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [{ id }, user, locale] = await Promise.all([params, requireRole(["ROLE-RULE-ADMIN"]), getLocale()]);
  const dict = await getDictionary(locale, ["common", "incentive", "nav"]);

  const supabase: SupabaseClient<Database> = await createClient();
  const version = await loadRuleVersion(supabase, id);
  if (!version) notFound();

  const isCreator = version.created_by !== null && version.created_by === user.id;
  const canApprove = version.status === "pending_approval" && !isCreator;
  const canRollback = version.status === "active" && !isCreator;

  const allVersions = canRollback ? await listRuleVersions(supabase) : [];
  const rollbackCandidates = allVersions
    .filter((v) => v.id !== id && (v.status === "active" || v.status === "rolled_back"))
    .map((v) => ({ id: v.id, versionNo: v.version_no, effectiveFrom: v.effective_from }));
  const displayStatus = computeDisplayStatuses([version], todayJst()).get(version.id) ?? version.status;
  // A superseded or rolled-back version has nothing to approve, nothing to
  // roll back and nobody to explain that to -- RuleVersionDetailActions
  // rendered null for it, so the card would be an empty box. No card either.
  const isOwnPending = isCreator && version.status === "pending_approval";
  const isOwnActive = isCreator && version.status === "active";
  const hasActions = canApprove || canRollback || isOwnPending || isOwnActive;

  return (
    <I18nProvider locale={locale} dict={dict}>
      <PageFrame
        title={
          <>
            {dict["incentive.rules.detail.title"]} v{version.version_no}
          </>
        }
        backHref="/incentive/rules"
        backLabel={dict["nav.incentiveRules"]}
      >
        <section className="mx-auto max-w-5xl space-y-6">
          <SectionCard title={dict["section.details"]}>
            <RuleVersionFields
              versionNo={version.version_no}
              effectiveFrom={version.effective_from}
              displayStatus={displayStatus}
              rawStatus={version.status}
              createdByName={version.createdByName}
              approvedByName={version.approvedByName}
              dict={dict}
            />
          </SectionCard>

          {/* 承認 and rollback both refuse the version's own author (DEC-001),
              so this card holds either the buttons or the reason there are
              none -- RuleVersionDetailActions decides which. */}
          {hasActions && (
            <SectionCard title={dict["incentive.rules.detail.actionsTitle"]}>
              <RuleVersionDetailActions
                versionId={version.id}
                canApprove={canApprove}
                canRollback={canRollback}
                rollbackCandidates={rollbackCandidates}
                isOwnPending={isOwnPending}
                isOwnActive={isOwnActive}
              />
            </SectionCard>
          )}
        </section>
      </PageFrame>
    </I18nProvider>
  );
}
