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
        className="sm-btn sm-btn-danger"
      >
        {t("reconciliation.lock.openButton")}
      </button>
    );
  }

  return (
    <div className="sm-card max-w-md space-y-3 border-stop bg-stop-bg p-4">
      <p className="sm-error font-semibold">{t("reconciliation.lock.warningTitle")}</p>
      <p className="sm-error">{t("reconciliation.lock.warningBody")}</p>
      <label className="flex flex-col text-sm font-medium text-secondary">
        {t("reconciliation.lock.typeToConfirmLabel").replace("{date}", businessDate)}
        <input
          type="text"
          value={typed}
          onChange={(e) => setTyped(e.target.value)}
          disabled={pending}
          className="sm-field mt-1"
        />
      </label>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={handleLock}
          disabled={pending || !canConfirm}
          aria-busy={pending}
          className="sm-btn sm-btn-danger"
        >
          {t("reconciliation.lock.confirmButton")}
        </button>
        <button
          type="button"
          onClick={() => setOpen(false)}
          disabled={pending}
          className="sm-btn sm-btn-secondary"
        >
          {t("reconciliation.lock.cancelButton")}
        </button>
      </div>
      {errorKey && (
        <p role="alert" className="sm-error">
          {t(errorKey)}
        </p>
      )}
    </div>
  );
}
