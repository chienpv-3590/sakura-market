"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useT } from "@/lib/i18n/i18n-provider";

// IF-ACC-01 write action (phase-03 §Architecture) -- POST only, so a
// browser prefetch/refresh/bot can never create a batch by accident. The
// caller only renders this when `user.role === "ROLE-SETTLEMENT"`; the
// route re-checks the role (and RLS re-checks it again at the DB) -- this
// button being hidden is the THIRD gate, never the only one (phase-03
// §Security Considerations).
const REASON_MESSAGE_KEY: Record<string, string> = {
  DAY_NOT_LOCKED: "reports.rpt06.createBatchError.dayNotLocked",
  SEQ_RACE_EXHAUSTED: "reports.rpt06.createBatchError.raceExhausted",
  INVALID_BUSINESS_DATE: "reports.rpt06.createBatchError.invalidDate",
};

export function CreateExportBatchButton({ businessDate }: { businessDate: string }) {
  const t = useT();
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [errorKey, setErrorKey] = useState<string | null>(null);

  async function handleCreate() {
    if (pending) return;
    setPending(true);
    setErrorKey(null);
    try {
      const response = await fetch("/api/accounting/export-batches", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ businessDate }),
      });
      const body = await response.json().catch(() => ({}) as { reason?: string; batchCode?: string });
      if (!response.ok) {
        setErrorKey(REASON_MESSAGE_KEY[body.reason ?? ""] ?? "reports.rpt06.createBatchError.generic");
        return;
      }
      const params = new URLSearchParams({ businessDate, batchCode: body.batchCode ?? "" });
      router.push(`/reports/RPT-06?${params.toString()}`);
      router.refresh();
    } catch {
      setErrorKey("reports.rpt06.createBatchError.generic");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="space-y-2">
      <button
        type="button"
        onClick={handleCreate}
        disabled={pending}
        aria-busy={pending}
        className="cds-btn cds-btn--md"
      >
        {t("reports.rpt06.createBatchButton")}
      </button>
      {errorKey && (
        <p role="alert" className="cds-field__msg cds-field__msg--error">
          {t(errorKey)}
        </p>
      )}
    </div>
  );
}
