import { requireRole } from "@/lib/auth/require-role";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { getLocale } from "@/lib/i18n/get-locale";
import { I18nProvider } from "@/lib/i18n/i18n-provider";
import { RuleVersionForm } from "@/components/incentive/rule-version-form";
import { PageFrame } from "@/components/layout/page-frame";

// SCR018_RuleVersionEditor create (A1, FR-201, US001).
export default async function NewRuleVersionPage() {
  const [, locale] = await Promise.all([requireRole(["ROLE-RULE-ADMIN"]), getLocale()]);
  const dict = await getDictionary(locale, ["common", "incentive"]);

  return (
    <I18nProvider locale={locale} dict={dict}>
      <PageFrame
        title={dict["incentive.rules.new.title"]}
      >
        <section className="max-w-md space-y-6">
        <RuleVersionForm />
        </section>
      </PageFrame>
    </I18nProvider>
  );
}
