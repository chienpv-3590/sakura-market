"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useT } from "@/lib/i18n/i18n-provider";

const REASON_I18N_KEY: Record<string, string> = {
  INVALID_EFFECTIVE_DATE: "incentive.error.INVALID_EFFECTIVE_DATE",
  VERSION_CONFLICT: "incentive.error.generic",
};

// SCR018_RuleVersionEditor create form (A1, FR-201). The rate itself (110/100,
// BR-INC-01) is fixed and never exposed here -- only effective_from + an
// optional note, matching technical-spec §4.6 ("không cấu hình qua UI").
export function RuleVersionForm() {
  const t = useT();
  const router = useRouter();
  const [effectiveFrom, setEffectiveFrom] = useState("");
  const [note, setNote] = useState("");
  const [pending, setPending] = useState(false);
  const [errorKey, setErrorKey] = useState<string | null>(null);

  const canSubmit = effectiveFrom.trim().length > 0;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending || !canSubmit) return;

    setPending(true);
    setErrorKey(null);
    try {
      const response = await fetch("/api/incentive-rules", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ effectiveFrom, note: note.trim() || undefined }),
      });
      const body = await response.json();
      if (!response.ok) {
        const reasonCode = typeof body.reason === "string" ? body.reason : "";
        setErrorKey(REASON_I18N_KEY[reasonCode] ?? "incentive.error.generic");
        return;
      }
      router.push("/incentive/rules");
      router.refresh();
    } catch {
      setErrorKey("incentive.error.generic");
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md space-y-4">
      <label className="flex flex-col text-sm text-zinc-700">
        {t("incentive.rules.new.effectiveFromLabel")}
        <input
          type="date"
          value={effectiveFrom}
          onChange={(e) => setEffectiveFrom(e.target.value)}
          disabled={pending}
          className="mt-1 rounded-md border border-zinc-300 px-3 py-2 text-sm"
        />
        <span className="mt-1 text-xs text-zinc-500">{t("incentive.rules.new.effectiveFromHint")}</span>
      </label>
      <label className="flex flex-col text-sm text-zinc-700">
        {t("incentive.rules.new.noteLabel")}
        <input
          type="text"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          disabled={pending}
          className="mt-1 rounded-md border border-zinc-300 px-3 py-2 text-sm"
        />
      </label>
      <button
        type="submit"
        disabled={pending || !canSubmit}
        aria-busy={pending}
        className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {t("incentive.rules.new.submitButton")}
      </button>
      {errorKey && (
        <p role="alert" className="text-sm text-red-600">
          {t(errorKey)}
        </p>
      )}
    </form>
  );
}
