import { requireRole } from "@/lib/auth/require-role";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { getLocale } from "@/lib/i18n/get-locale";
import { I18nProvider } from "@/lib/i18n/i18n-provider";
import { LotIntakeForm } from "@/components/lots/lot-intake-form";

// SCR004_LotIntake. ROLE-INTAKE only (matches write_intake RLS policy).
export default async function NewLotPage() {
  await requireRole(["ROLE-INTAKE"]);
  const locale = await getLocale();
  const dict = await getDictionary(locale, ["common", "lots"]);

  return (
    <I18nProvider locale={locale} dict={dict}>
      <section className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-zinc-900">{dict["lots.intake.title"]}</h1>
          <p className="mt-1 text-sm text-zinc-600">{dict["lots.intake.subtitle"]}</p>
        </div>
        <LotIntakeForm />
      </section>
    </I18nProvider>
  );
}
