import Link from "next/link";
import { notFound } from "next/navigation";
import type { SupabaseClient } from "@supabase/supabase-js";
import { requireUser } from "@/lib/auth/require-role";
import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/lib/db/types";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { getLocale } from "@/lib/i18n/get-locale";
import { I18nProvider } from "@/lib/i18n/i18n-provider";
import { getReportDefinition } from "@/lib/reports/registry";
import { loadReportRows, parseReportFilters } from "@/lib/reports/load-report-rows";
import { REPORT_PAGE_SIZE } from "@/lib/reports/report-page-size";
import { loadParticipantOptions } from "@/lib/reports/participant-options";
import { MockDataBadge } from "@/components/reports/mock-data-badge";
import { ReportFilterForm } from "@/components/reports/report-filter-form";
import { ReportResultTable } from "@/components/reports/report-result-table";

// SCR020_ReportViewer (A2/A3, FR-RPT-01, FR-RPT-02, FR-RPT-03, US002, US003).
// Mock reports (9/12) show the badge + notice and no export link -- the
// export route also enforces 403 server-side (Security Considerations: the
// FE gate is never the only gate).
export default async function ReportViewerPage({
  params,
  searchParams,
}: {
  params: Promise<{ reportCode: string }>;
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const [{ reportCode }, rawSearchParams, , locale] = await Promise.all([
    params,
    searchParams,
    requireUser(),
    getLocale(),
  ]);
  const dict = await getDictionary(locale, ["common", "reports"]);

  const definition = getReportDefinition(reportCode);
  if (!definition) notFound();

  const urlSearchParams = new URLSearchParams(
    Object.entries(rawSearchParams).filter((entry): entry is [string, string] => typeof entry[1] === "string"),
  );
  const page = Math.max(1, Number(urlSearchParams.get("page")) || 1);

  const supabase: SupabaseClient<Database> = await createClient();
  const filters = parseReportFilters(definition, urlSearchParams);
  const { rows, total } = await loadReportRows(supabase, definition, filters, { paginate: true, page });
  const participantOptions = definition.filterFields.some((f) => f.type === "select")
    ? await loadParticipantOptions(supabase)
    : [];

  const filterValues: Record<string, string> = {
    ...(filters.businessDate ? { businessDate: filters.businessDate } : {}),
    ...(filters.period ? { period: filters.period } : {}),
    ...(filters.participantId ? { participantId: filters.participantId } : {}),
  };
  const exportHref = `/api/reports/${definition.code}/export.csv?${new URLSearchParams(filterValues).toString()}`;

  return (
    <I18nProvider locale={locale} dict={dict}>
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-strong">
            {definition.code} — {dict[definition.titleKey]}
          </h1>
          <Link href="/reports" className="text-sm text-secondary hover:underline">
            {dict["reports.viewer.backLink"]}
          </Link>
        </div>

        {definition.isMock ? (
          <div className="space-y-3">
            <MockDataBadge label={dict["reports.catalog.badgeMock"]} />
            <p className="text-sm text-wait">{dict["reports.viewer.mockNotice"]}</p>
            <button
              type="button"
              disabled
              title={dict["reports.viewer.exportDisabledMock"]}
              className="sm-btn sm-btn-secondary"
            >
              {dict["reports.viewer.exportButton"]}
            </button>
          </div>
        ) : (
          <a
            href={exportHref}
            className="sm-btn sm-btn-primary"
          >
            {dict["reports.viewer.exportButton"]}
          </a>
        )}

        <ReportFilterForm
          fields={definition.filterFields}
          values={filterValues}
          participantOptions={participantOptions}
          dict={dict}
        />

        <ReportResultTable
          columns={definition.columns}
          rows={rows}
          page={page}
          pageSize={REPORT_PAGE_SIZE}
          total={total}
          baseHref={`/reports/${definition.code}`}
          filterValues={filterValues}
          dict={dict}
        />
      </section>
    </I18nProvider>
  );
}
