import type { ReactNode } from "react";
import { AppShell } from "@/components/layout/app-shell";
import { requireUser } from "@/lib/auth/require-role";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { getLocale } from "@/lib/i18n/get-locale";
import { I18nProvider } from "@/lib/i18n/i18n-provider";

export default async function AppLayout({ children }: { children: ReactNode }) {
  // Tầng 2 gate -- redirects to /login when there's no valid, active
  // app_user (see lib/auth/require-role.ts).
  await requireUser();
  const locale = await getLocale();
  const dict = await getDictionary(locale, ["common", "nav"]);

  return (
    <I18nProvider locale={locale} dict={dict}>
      <AppShell>{children}</AppShell>
    </I18nProvider>
  );
}
