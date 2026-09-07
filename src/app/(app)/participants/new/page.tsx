import { requireRole } from "@/lib/auth/require-role";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { getLocale } from "@/lib/i18n/get-locale";
import { I18nProvider } from "@/lib/i18n/i18n-provider";
import { ParticipantForm } from "@/components/participants/participant-form";
import { PageFrame } from "@/components/layout/page-frame";

// A1 create form. 404s for any role other than ROLE-SYS-ADMIN (Tầng 2 gate,
// same as the API route it posts to).
export default async function NewParticipantPage() {
  await requireRole(["ROLE-SYS-ADMIN"]);
  const locale = await getLocale();
  const dict = await getDictionary(locale, ["common", "participants"]);

  return (
    <I18nProvider locale={locale} dict={dict}>
      <PageFrame
        title={dict["participants.form.createTitle"]}
      >
        <section className="space-y-6">
        <ParticipantForm mode="create" />
        </section>
      </PageFrame>
    </I18nProvider>
  );
}
