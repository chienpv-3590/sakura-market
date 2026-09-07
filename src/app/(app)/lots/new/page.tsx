import { requireRole } from "@/lib/auth/require-role";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { getLocale } from "@/lib/i18n/get-locale";
import { I18nProvider } from "@/lib/i18n/i18n-provider";
import { LotIntakeForm } from "@/components/lots/lot-intake-form";
import { PageFrame } from "@/components/layout/page-frame";

// SCR004_LotIntake. ROLE-INTAKE only (matches write_intake RLS policy).
export default async function NewLotPage() {
  await requireRole(["ROLE-INTAKE"]);
  const locale = await getLocale();
  const dict = await getDictionary(locale, ["common", "lots"]);

  return (
    <I18nProvider locale={locale} dict={dict}>
      <PageFrame
        title={dict["lots.intake.title"]}
        description={dict["lots.intake.subtitle"]}
      >
        <section className="space-y-6">
        <LotIntakeForm />
        </section>
      </PageFrame>
    </I18nProvider>
  );
}
