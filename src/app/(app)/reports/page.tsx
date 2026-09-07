import Link from "next/link";
import { requireUser } from "@/lib/auth/require-role";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { getLocale } from "@/lib/i18n/get-locale";
import { I18nProvider } from "@/lib/i18n/i18n-provider";
import { REPORT_REGISTRY } from "@/lib/reports/registry";
import { MockDataBadge } from "@/components/reports/mock-data-badge";
import { PageFrame } from "@/components/layout/page-frame";

// SCR019_ReportCatalog (A1, FR-RPT-01, US001) -- all 12 RPT-01..12 always
// listed; real vs mock badges never blurred together (Risk Assessment).
export default async function ReportCatalogPage() {
  const [, locale] = await Promise.all([requireUser(), getLocale()]);
  const dict = await getDictionary(locale, ["common", "reports"]);

  return (
    <I18nProvider locale={locale} dict={dict}>
      <PageFrame
        title={dict["reports.catalog.title"]}
      >
        <section className="space-y-6">

        <div className="cds-table__wrap">
          <table className="cds-table cds-table--default cds-table--hover">
            <thead>
              <tr>
                <th>{dict["reports.catalog.columnCode"]}</th>
                <th>{dict["reports.catalog.columnTitle"]}</th>
                <th>{dict["reports.catalog.columnFrequency"]}</th>
                <th>{dict["reports.catalog.columnFilter"]}</th>
                <th>{dict["reports.catalog.columnStatus"]}</th>
              </tr>
            </thead>
            <tbody>
              {REPORT_REGISTRY.map((r) => (
                <tr key={r.code}>
                  <td>
                    <Link href={`/reports/${r.code}`} className="font-medium text-strong hover:underline">
                      {r.code}
                    </Link>
                  </td>
                  <td className="text-strong">{dict[r.titleKey]}</td>
                  <td className="text-secondary">{dict[r.frequencyKey]}</td>
                  <td className="text-secondary">{dict[r.filterDescriptionKey]}</td>
                  <td>
                    {r.isMock ? (
                      <MockDataBadge label={dict["reports.catalog.badgeMock"]} />
                    ) : (
                      <span className="cds-statusbadge cds-statusbadge--ok">
                        {dict["reports.catalog.badgeReal"]}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        </section>
      </PageFrame>
    </I18nProvider>
  );
}
