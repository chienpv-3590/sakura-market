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
import { loadFilterOptions } from "@/lib/reports/filter-options";
import type { ReportFilterOptionsKey } from "@/lib/reports/report-filter-field";
import { loadUserDisplayNames } from "@/lib/reports/queries/rpt-06-accounting-export";
import { listBatchesForDate } from "@/lib/accounting/export-batch-queries";
import { MockDataBadge } from "@/components/reports/mock-data-badge";
import { ReportFilterForm } from "@/components/reports/report-filter-form";
import { ReportResultTable } from "@/components/reports/report-result-table";
import { CreateExportBatchButton } from "@/components/accounting/create-export-batch-button";
import { ExportBatchList } from "@/components/accounting/export-batch-list";
import { PageFrame } from "@/components/layout/page-frame";

const SETTLEMENT_ROLE = "ROLE-SETTLEMENT";

// SCR020_ReportViewer (A2/A3, FR-RPT-01, FR-RPT-02, FR-RPT-03, US002, US003).
// Mock reports (8/12) show the badge + notice and no export link -- the
// export route also enforces 403 server-side (Security Considerations: the
// FE gate is never the only gate). RPT-06 (IF-ACC-01) gets its own block:
// two modes ("xem trước" vs "xem batch", phase-03 §Overview #3) that must
// never be blurred together, plus the batch-create action and history list.
export default async function ReportViewerPage({
  params,
  searchParams,
}: {
  params: Promise<{ reportCode: string }>;
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const [{ reportCode }, rawSearchParams, user, locale] = await Promise.all([
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

  const selectOptionsKeys: ReportFilterOptionsKey[] = [];
  for (const field of definition.filterFields) {
    if (field.type === "select") selectOptionsKeys.push(field.optionsKey);
  }
  const filterOptions = await loadFilterOptions(supabase, selectOptionsKeys);

  const filterValues: Record<string, string> = { ...filters };
  const exportHref = `/api/reports/${definition.code}/export.csv?${new URLSearchParams(filterValues).toString()}`;

  const isRpt06 = definition.code === "RPT-06";
  const hasBatchCode = isRpt06 && Boolean(filters.batchCode);
  const batches = isRpt06 ? await listBatchesForDate(supabase, filters.businessDate) : [];
  const exportedByNames = isRpt06
    ? await loadUserDisplayNames(
        supabase,
        batches.map((b) => b.exported_by).filter((id): id is string => Boolean(id)),
      )
    : new Map<string, string>();

  return (
    <I18nProvider locale={locale} dict={dict}>
      <PageFrame
        title={
          <>
            {definition.code} — {dict[definition.titleKey]}
          </>
        }
        actions={
          <Link href="/reports" className="text-sm text-secondary hover:underline">
          {dict["reports.viewer.backLink"]}
          </Link>
        }
      >
        <section className="space-y-6">

        {definition.isMock ? (
          <div className="space-y-3">
            <MockDataBadge label={dict["reports.catalog.badgeMock"]} />
            <p className="text-sm text-warn">{dict["reports.viewer.mockNotice"]}</p>
            <button
              type="button"
              disabled
              title={dict["reports.viewer.exportDisabledMock"]}
              className="cds-btn cds-btn--secondary cds-btn--md"
            >
              {dict["reports.viewer.exportButton"]}
            </button>
          </div>
        ) : isRpt06 ? (
          <div className="space-y-3">
            <p className="text-sm text-warn">{dict["reports.rpt06.taxAssumptionNotice"]}</p>
            <p className="text-sm text-secondary">
              {hasBatchCode ? dict["reports.rpt06.modeBatchLabel"] : dict["reports.rpt06.modePreviewLabel"]}
            </p>
            {hasBatchCode ? (
              <a href={exportHref} className="cds-btn cds-btn--md">
                {dict["reports.viewer.exportButton"]}
              </a>
            ) : (
              <button
                type="button"
                disabled
                title={dict["reports.rpt06.exportDisabledPreview"]}
                className="cds-btn cds-btn--secondary cds-btn--md"
              >
                {dict["reports.viewer.exportButton"]}
              </button>
            )}
            {user.role === SETTLEMENT_ROLE && <CreateExportBatchButton businessDate={filters.businessDate} />}
            <ExportBatchList batches={batches} exportedByNames={exportedByNames} dict={dict} />
          </div>
        ) : (
          <a
            href={exportHref}
            className="cds-btn cds-btn--md"
          >
            {dict["reports.viewer.exportButton"]}
          </a>
        )}

        <ReportFilterForm
          fields={definition.filterFields}
          values={filterValues}
          filterOptions={filterOptions}
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
      </PageFrame>
    </I18nProvider>
  );
}
