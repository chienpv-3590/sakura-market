"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useT } from "@/lib/i18n/i18n-provider";
import { KeyboardOperableForm } from "./keyboard-operable-form";

const ERROR_KEYS: Record<string, string> = {
  invalid_request: "lots.mekiki.error.invalidRequest",
  lot_not_found: "lots.mekiki.error.notFound",
  lot_not_receivable: "lots.mekiki.error.notReceivable",
};

// SCR005_MekikiEntry (A2, FR-LOT-02). `grade` is a single free-text field on
// purpose (SCOPE-OUT-01) -- no enum, no suggestion, no scoring anywhere on
// this screen. Assessor + timestamp are set server-side from the session.
export function MekikiForm({ lotId }: { lotId: string }) {
  const t = useT();
  const router = useRouter();
  const [grade, setGrade] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [errorKey, setErrorKey] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setErrorKey(null);

    try {
      const response = await fetch(`/api/lots/${lotId}/mekiki`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ grade }),
      });
      const body = await response.json();

      if (!response.ok) {
        setErrorKey(ERROR_KEYS[body.error] ?? "lots.mekiki.error.network");
        setSubmitting(false);
        return;
      }
      setDone(true);
      setSubmitting(false);
      router.refresh();
    } catch {
      setErrorKey("lots.mekiki.error.network");
      setSubmitting(false);
    }
  }

  if (done) {
    return <p className="text-sm font-medium text-emerald-700">{t("lots.mekiki.success")}</p>;
  }

  return (
    <KeyboardOperableForm onSubmit={handleSubmit} className="max-w-md space-y-4">
      <div>
        <label htmlFor="grade" className="block text-sm font-medium text-zinc-700">
          {t("lots.mekiki.gradeLabel")}
        </label>
        <input
          id="grade"
          name="grade"
          type="text"
          required
          tabIndex={1}
          placeholder={t("lots.mekiki.gradePlaceholder")}
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
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
        tabIndex={2}
        disabled={submitting}
        aria-busy={submitting}
        className="w-full rounded-md bg-zinc-900 px-3 py-2 text-sm font-medium text-white hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {submitting ? t("lots.mekiki.submitting") : t("lots.mekiki.submit")}
      </button>
    </KeyboardOperableForm>
  );
}
