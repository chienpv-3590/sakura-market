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
import { StatusBadge } from "@/components/ui/status-badge";
import { PageFrame } from "@/components/layout/page-frame";

// SCR018_RuleVersionEditor detail (A2/A3, DEC-001, US002).
export default async function RuleVersionDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [{ id }, user, locale] = await Promise.all([params, requireRole(["ROLE-RULE-ADMIN"]), getLocale()]);
  const dict = await getDictionary(locale, ["common", "incentive"]);

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

  return (
    <I18nProvider locale={locale} dict={dict}>
      <PageFrame
        title={
          <>
            {dict["incentive.rules.detail.title"]} v{version.version_no}
          </>
        }
      >
        <section className="max-w-md space-y-6">

        <dl className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <dt className="text-muted">{dict["incentive.rules.detail.versionNoLabel"]}</dt>
            <dd className="cds-table__mono text-strong">{version.version_no}</dd>
          </div>
          <div>
            <dt className="text-muted">{dict["incentive.rules.detail.effectiveFromLabel"]}</dt>
            <dd className="cds-table__mono text-strong">{version.effective_from}</dd>
          </div>
          <div>
            <dt className="text-muted">{dict["incentive.rules.detail.statusLabel"]}</dt>
            <dd>
              <StatusBadge
                status={displayStatus}
                label={dict[`incentive.rules.status.${displayStatus}`] ?? version.status}
              />
            </dd>
          </div>
          <div>
            <dt className="text-muted">{dict["incentive.rules.detail.createdByLabel"]}</dt>
            <dd className="text-strong">{version.createdByName ?? "—"}</dd>
          </div>
          <div>
            <dt className="text-muted">{dict["incentive.rules.detail.approvedByLabel"]}</dt>
            <dd className="text-strong">{version.approvedByName ?? "—"}</dd>
          </div>
        </dl>

        <RuleVersionDetailActions
          versionId={version.id}
          canApprove={canApprove}
          canRollback={canRollback}
          rollbackCandidates={rollbackCandidates}
          isOwnPending={isCreator && version.status === "pending_approval"}
          isOwnActive={isCreator && version.status === "active"}
        />
        </section>
      </PageFrame>
    </I18nProvider>
  );
}
