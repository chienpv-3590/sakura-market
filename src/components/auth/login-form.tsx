"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { useT } from "@/lib/i18n/i18n-provider";

type SignInResponse = { redirectTo: string } | { error: string };

const ERROR_KEYS: Record<string, string> = {
  invalid_credentials: "auth.login.error.invalidCredentials",
  invalid_request: "auth.login.error.invalidRequest",
};

function errorMessageKey(code: string | undefined): string {
  return ERROR_KEYS[code ?? ""] ?? "auth.login.error.network";
}

export function LoginForm({ reason }: { reason?: string }) {
  const t = useT();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorKey, setErrorKey] = useState<string | null>(
    reason === "inactive" ? "auth.login.reason.inactive" : null,
  );
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setErrorKey(null);

    try {
      const response = await fetch("/api/auth/sign-in", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const body: SignInResponse = await response.json();

      if (!response.ok || !("redirectTo" in body)) {
        setErrorKey(errorMessageKey("error" in body ? body.error : undefined));
        setSubmitting(false);
        return;
      }

      // The route handler already set the session cookie on this response;
      // router.push() re-fetches the target route fresh (dynamic routes
      // default to a 0s client router-cache staleTime in Next 16), so
      // requireUser() in (app)/layout.tsx sees the new session immediately.
      router.push(body.redirectTo);
      router.refresh();
    } catch {
      setErrorKey("auth.login.error.network");
      setSubmitting(false);
    }
  }

  return (
    // method="post" matters even though submission is handled in JS: if the
    // button is pressed before this component hydrates, the browser falls
    // back to a native submit, and a GET would put the password in the URL
    // (history, Referer, server logs). POST keeps it in the body.
    <form onSubmit={handleSubmit} method="post" className="w-full space-y-4">
      <div className="cds-field">
        <label htmlFor="email" className="cds-field__label">
          {t("auth.login.emailLabel")}
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="username"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          disabled={submitting}
          aria-invalid={errorKey ? true : undefined}
          className={`cds-input--native ${errorKey ? "cds-input--error" : ""}`}
        />
      </div>
      <div className="cds-field">
        <label htmlFor="password" className="cds-field__label">
          {t("auth.login.passwordLabel")}
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          disabled={submitting}
          aria-invalid={errorKey ? true : undefined}
          className={`cds-input--native ${errorKey ? "cds-input--error" : ""}`}
        />
      </div>
      {errorKey && (
        <div role="alert" className="cds-alert cds-alert--error">
          <span className="cds-alert__ico" aria-hidden>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 8v5M12 16h.01" />
            </svg>
          </span>
          <div className="cds-alert__body">
            <div className="cds-alert__title">{t(errorKey)}</div>
          </div>
        </div>
      )}
      <button
        type="submit"
        disabled={submitting}
        aria-busy={submitting}
        className="cds-btn cds-btn--lg cds-btn--full"
      >
        {submitting && <span className="cds-btn__spin" aria-hidden />}
        {submitting ? t("auth.login.submitting") : t("auth.login.submit")}
      </button>
    </form>
  );
}
