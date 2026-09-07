"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useT } from "@/lib/i18n/i18n-provider";
import {
  CONFIRM_REJECT_I18N_KEY,
  CANCEL_REJECT_I18N_KEY,
  isConfirmRejectReason,
  isCancelRejectReason,
} from "@/lib/transactions/reject-reasons";

// SCR008 REG-CONFIRM + REG-CANCEL -- shared by the list row and the detail
// page. Both actions self-disable while a request is in flight: a
// double-click is exactly what confirm-transaction.ts's status CAS survives
// correctly, but disabling early keeps the UI honest about "already sent"
// too (NFR: chống double-submit).
export function ConfirmCancelButtonGroup({
  transactionId,
  status,
}: {
  transactionId: string;
  status: string;
}) {
  const t = useT();
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [errorKey, setErrorKey] = useState<string | null>(null);
  const [showCancelForm, setShowCancelForm] = useState(false);
  const [reason, setReason] = useState("");

  async function handleConfirm() {
    if (pending) return;
    setPending(true);
    setErrorKey(null);
    try {
      const response = await fetch(`/api/transactions/${transactionId}/confirm`, { method: "POST" });
      const body = await response.json();
      if (!response.ok) {
        const reasonCode = typeof body.reason === "string" ? body.reason : "";
        setErrorKey(
          isConfirmRejectReason(reasonCode)
            ? CONFIRM_REJECT_I18N_KEY[reasonCode]
            : "transactions.confirm.error.generic",
        );
        setPending(false);
        return;
      }
      router.refresh();
    } catch {
      setErrorKey("transactions.confirm.error.generic");
      setPending(false);
    }
  }

  async function handleCancel() {
    if (pending || reason.trim().length === 0) return;
    setPending(true);
    setErrorKey(null);
    try {
      const response = await fetch(`/api/transactions/${transactionId}/cancel`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reason: reason.trim() }),
      });
      const body = await response.json();
      if (!response.ok) {
        const reasonCode = typeof body.reason === "string" ? body.reason : "";
        setErrorKey(
          isCancelRejectReason(reasonCode)
            ? CANCEL_REJECT_I18N_KEY[reasonCode]
            : "transactions.cancel.error.generic",
        );
        setPending(false);
        return;
      }
      setShowCancelForm(false);
      setReason("");
      router.refresh();
    } catch {
      setErrorKey("transactions.cancel.error.generic");
      setPending(false);
    }
  }

  if (status === "cancelled") {
    return <span className="text-sm text-subtle">{t("transactions.status.cancelled")}</span>;
  }

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2">
        {status === "draft" && (
          <button
            type="button"
            onClick={handleConfirm}
            disabled={pending}
            aria-busy={pending}
            className="sm-btn sm-btn-primary"
          >
            {t("transactions.actions.confirm")}
          </button>
        )}
        <button
          type="button"
          onClick={() => setShowCancelForm((v) => !v)}
          disabled={pending}
          className="sm-btn sm-btn-secondary"
        >
          {t("transactions.actions.cancel")}
        </button>
      </div>
      {showCancelForm && (
        <div className="flex flex-wrap items-center gap-2">
          <input
            type="text"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder={t("transactions.actions.cancelReasonPlaceholder")}
            disabled={pending}
            className="sm-field"
          />
          <button
            type="button"
            onClick={handleCancel}
            disabled={pending || reason.trim().length === 0}
            aria-busy={pending}
            className="sm-btn sm-btn-danger"
          >
            {t("transactions.actions.cancelConfirm")}
          </button>
        </div>
      )}
      {errorKey && (
        <p role="alert" className="sm-error">
          {t(errorKey)}
        </p>
      )}
    </div>
  );
}
