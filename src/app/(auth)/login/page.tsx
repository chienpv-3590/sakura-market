import { redirect } from "next/navigation";
import { LoginForm } from "@/components/auth/login-form";
import { getCurrentUser } from "@/lib/auth/require-role";
import { roleLanding } from "@/lib/auth/role-landing";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { getLocale } from "@/lib/i18n/get-locale";
import { I18nProvider } from "@/lib/i18n/i18n-provider";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ reason?: string }>;
}) {
  const [{ reason }, user, locale] = await Promise.all([
    searchParams,
    getCurrentUser(),
    getLocale(),
  ]);

  // Already signed in with an active account -- skip the form entirely so
  // there is no /login <-> landing redirect loop for a signed-in user.
  if (user) {
    redirect(roleLanding(user.role));
  }

  const dict = await getDictionary(locale, ["common"]);

  return (
    <I18nProvider locale={locale} dict={dict}>
      <main className="flex min-h-screen items-center justify-center bg-page px-4">
        <div className="sm-card w-full max-w-sm space-y-6 p-8">
          <div className="text-center">
            <h1 className="text-xl font-semibold text-strong">{dict["app.name"]}</h1>
            <p className="sm-hint mt-1">{dict["auth.login.title"]}</p>
          </div>
          <LoginForm reason={reason} />
        </div>
      </main>
    </I18nProvider>
  );
}
