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
    <form onSubmit={handleSubmit} className="w-full space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-zinc-700">
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
          className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 text-sm focus:border-zinc-500 focus:outline-none"
        />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-zinc-700">
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
          className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 text-sm focus:border-zinc-500 focus:outline-none"
        />
      </div>
      {errorKey && (
        <p role="alert" className="text-sm text-red-600">
          {t(errorKey)}
        </p>
      )}
      <button
        type="submit"
        disabled={submitting}
        aria-busy={submitting}
        className="w-full rounded-md bg-zinc-900 px-3 py-2 text-sm font-medium text-white hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {submitting ? t("auth.login.submitting") : t("auth.login.submit")}
      </button>
    </form>
  );
}
