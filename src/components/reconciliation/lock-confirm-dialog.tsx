"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useT } from "@/lib/i18n/i18n-provider";

// SCR013 "Lock ngày nghiệp vụ" (A2, FR-401). FR-401 requires a confirmation
// step SEPARATE from ordinary table viewing, plus an explicit "I understand
// this cannot be undone" acknowledgement -- implemented here as retyping the
// exact business date before the final confirm button enables. There is no
// unlock counterpart anywhere in this codebase; that is by design.
export function LockConfirmDialog({ businessDate }: { businessDate: string }) {
  const t = useT();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [typed, setTyped] = useState("");
  const [pending, setPending] = useState(false);
  const [errorKey, setErrorKey] = useState<string | null>(null);

  const canConfirm = typed.trim() === businessDate;

  async function handleLock() {
    if (pending || !canConfirm) return;
    setPending(true);
    setErrorKey(null);
    try {
      const response = await fetch(`/api/reconciliation/${businessDate}/lock`, { method: "POST" });
      if (!response.ok) {
        setErrorKey("reconciliation.lock.error.generic");
        return;
      }
      setOpen(false);
      router.refresh();
    } catch {
      setErrorKey("reconciliation.lock.error.generic");
    } finally {
      setPending(false);
    }
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="rounded-md bg-red-700 px-4 py-2 text-sm font-medium text-white hover:bg-red-800"
      >
        {t("reconciliation.lock.openButton")}
      </button>
    );
  }

  return (
    <div className="max-w-md space-y-3 rounded-md border border-red-300 bg-red-50 p-4">
      <p className="text-sm font-semibold text-red-800">{t("reconciliation.lock.warningTitle")}</p>
      <p className="text-sm text-red-700">{t("reconciliation.lock.warningBody")}</p>
      <label className="flex flex-col text-sm text-zinc-700">
        {t("reconciliation.lock.typeToConfirmLabel").replace("{date}", businessDate)}
        <input
          type="text"
          value={typed}
          onChange={(e) => setTyped(e.target.value)}
          disabled={pending}
          className="mt-1 rounded-md border border-zinc-300 px-3 py-2 text-sm"
        />
      </label>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={handleLock}
          disabled={pending || !canConfirm}
          aria-busy={pending}
          className="rounded-md bg-red-700 px-3 py-2 text-sm font-medium text-white hover:bg-red-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {t("reconciliation.lock.confirmButton")}
        </button>
        <button
          type="button"
          onClick={() => setOpen(false)}
          disabled={pending}
          className="rounded-md border border-zinc-300 px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-100"
        >
          {t("reconciliation.lock.cancelButton")}
        </button>
      </div>
      {errorKey && (
        <p role="alert" className="text-sm text-red-600">
          {t(errorKey)}
        </p>
      )}
    </div>
  );
}
