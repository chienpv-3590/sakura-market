"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useT } from "@/lib/i18n/i18n-provider";
import {
  CREATE_REJECT_I18N_KEY,
  EVIDENCE_REJECT_I18N_KEY,
  isCreateRejectReason,
  isEvidenceRejectReason,
} from "@/lib/corrections/correction-reject-reasons";

// SCR014_CorrectionRequest (A1, FR-201, BR-003, US001). BR-003: the submit
// button stays disabled until BOTH reason and evidence are present -- the FE
// gate US001 asks for, backed by the same check server-side (create route).
export function CorrectionRequestForm({ targetTxnId }: { targetTxnId: string }) {
  const t = useT();
  const router = useRouter();
  const [reason, setReason] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [pending, setPending] = useState(false);
  const [errorKey, setErrorKey] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const canSubmit = reason.trim().length > 0 && file !== null;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending || !canSubmit || !file) return;

    setPending(true);
    setErrorKey(null);
    try {
      const form = new FormData();
      form.set("targetTxnId", targetTxnId);
      form.set("reason", reason.trim());
      form.set("evidence", file);

      const response = await fetch("/api/corrections", { method: "POST", body: form });
      const body = await response.json();
      if (!response.ok) {
        const reasonCode = typeof body.reason === "string" ? body.reason : "";
        if (isCreateRejectReason(reasonCode)) setErrorKey(CREATE_REJECT_I18N_KEY[reasonCode]);
        else if (isEvidenceRejectReason(reasonCode)) setErrorKey(EVIDENCE_REJECT_I18N_KEY[reasonCode]);
        else setErrorKey("corrections.error.generic");
        return;
      }
      setDone(true);
      router.refresh();
    } catch {
      setErrorKey("corrections.error.generic");
    } finally {
      setPending(false);
    }
  }

  if (done) {
    return <p className="text-sm text-emerald-700">{t("corrections.request.success")}</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md space-y-4">
      <label className="flex flex-col text-sm text-zinc-700">
        {t("corrections.request.reasonLabel")}
        <textarea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          disabled={pending}
          rows={4}
          className="mt-1 rounded-md border border-zinc-300 px-3 py-2 text-sm"
        />
      </label>
      <label className="flex flex-col text-sm text-zinc-700">
        {t("corrections.request.evidenceLabel")}
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp,application/pdf"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          disabled={pending}
          className="mt-1 text-sm"
        />
      </label>
      <button
        type="submit"
        disabled={pending || !canSubmit}
        aria-busy={pending}
        className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {t("corrections.request.submit")}
      </button>
      {errorKey && (
        <p role="alert" className="text-sm text-red-600">
          {t(errorKey)}
        </p>
      )}
    </form>
  );
}
