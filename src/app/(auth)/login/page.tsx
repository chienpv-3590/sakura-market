import { redirect } from "next/navigation";
import { LoginForm } from "@/components/auth/login-form";
import { getCurrentUser } from "@/lib/auth/require-role";
import { roleLanding } from "@/lib/auth/role-landing";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { getLocale } from "@/lib/i18n/get-locale";
import { I18nProvider } from "@/lib/i18n/i18n-provider";
import { NavIcon } from "@/components/layout/nav-icons";

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

  // Port of the design system's LoginScreen: a 52/48 split, the brand on a
  // --navy-900 panel with a cacao radial glow, the form on --surface-card at
  // 360px. Below --bp-tablet the navy panel collapses to a band above the
  // form -- the form is what the user came for, so it gets the height.
  return (
    <I18nProvider locale={locale} dict={dict}>
      <div className="cds-login">
        <div className="cds-login__brandpanel">
          <div className="cds-login__glow" aria-hidden />
          <div className="cds-login__brand">
            <span className="cds-rolenav__mark">
              <NavIcon name="dashboard" />
            </span>
            <span className="flex flex-col leading-[1.15]">
              <span className="text-[20px] font-bold text-white">{dict["app.name"]}</span>
              <span className="text-[11px] text-on-dark-muted">
                {dict["home.pipelineTitle"]}
              </span>
            </span>
          </div>
          <p className="cds-login__pitch">{dict["home.welcome"]}</p>
          <p className="cds-login__legal">{dict["home.glossaryTitle"]}</p>
        </div>
        <div className="cds-login__formpanel">
          <div className="w-full max-w-[360px]">
            <h1 className="cds-pageheader__title">{dict["auth.login.title"]}</h1>
            <p className="cds-pageheader__desc mb-6">{dict["home.welcome"]}</p>
            <LoginForm reason={reason} />
          </div>
        </div>
      </div>
    </I18nProvider>
  );
}
