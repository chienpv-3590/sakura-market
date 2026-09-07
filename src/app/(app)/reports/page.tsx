import Link from "next/link";
import { requireUser } from "@/lib/auth/require-role";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { getLocale } from "@/lib/i18n/get-locale";
import { I18nProvider } from "@/lib/i18n/i18n-provider";
import { REPORT_REGISTRY } from "@/lib/reports/registry";
import { MockDataBadge } from "@/components/reports/mock-data-badge";

// SCR019_ReportCatalog (A1, FR-RPT-01, US001) -- all 12 RPT-01..12 always
// listed; real vs mock badges never blurred together (Risk Assessment).
export default async function ReportCatalogPage() {
  const [, locale] = await Promise.all([requireUser(), getLocale()]);
  const dict = await getDictionary(locale, ["common", "reports"]);

  return (
    <I18nProvider locale={locale} dict={dict}>
      <section className="space-y-6">
        <h1 className="text-2xl font-semibold text-zinc-900">{dict["reports.catalog.title"]}</h1>

        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-zinc-300 text-left text-zinc-500">
              <th className="py-2 pr-4">{dict["reports.catalog.columnCode"]}</th>
              <th className="py-2 pr-4">{dict["reports.catalog.columnTitle"]}</th>
              <th className="py-2 pr-4">{dict["reports.catalog.columnFrequency"]}</th>
              <th className="py-2 pr-4">{dict["reports.catalog.columnFilter"]}</th>
              <th className="py-2 pr-4">{dict["reports.catalog.columnStatus"]}</th>
            </tr>
          </thead>
          <tbody>
            {REPORT_REGISTRY.map((r) => (
              <tr key={r.code} className="border-b border-zinc-100">
                <td className="py-2 pr-4">
                  <Link href={`/reports/${r.code}`} className="font-medium text-zinc-900 hover:underline">
                    {r.code}
                  </Link>
                </td>
                <td className="py-2 pr-4 text-zinc-900">{dict[r.titleKey]}</td>
                <td className="py-2 pr-4 text-zinc-700">{dict[r.frequencyKey]}</td>
                <td className="py-2 pr-4 text-zinc-700">{dict[r.filterDescriptionKey]}</td>
                <td className="py-2 pr-4">
                  {r.isMock ? (
                    <MockDataBadge label={dict["reports.catalog.badgeMock"]} />
                  ) : (
                    <span className="inline-block rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-800">
                      {dict["reports.catalog.badgeReal"]}
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </I18nProvider>
  );
}
