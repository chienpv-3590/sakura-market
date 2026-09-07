"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useT } from "@/lib/i18n/i18n-provider";
import { COMPLETE_REJECT_I18N_KEY, isCompleteRejectReason } from "@/lib/deliveries/delivery-reject-reasons";
import { HandoffCaption } from "@/components/pipeline/handoff-caption";

// SCR012 progress panel (FR-DEL-05 lũy kế/còn lại) + "Xác nhận hoàn tất"
// (A3, BR-DEL-03). `readyToComplete` is derived straight from the
// deliveredQty/orderedQty props on every render -- no local state mirrors it,
// so the button can never go stale relative to what the server actually has
// (phase-08 Implementation Steps #3).
export function DeliveryProgress({
  deliveryId,
  deliveredQty,
  orderedQty,
  status,
  canComplete,
}: {
  deliveryId: string;
  deliveredQty: number;
  orderedQty: number;
  status: string;
  canComplete: boolean;
}) {
  const t = useT();
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [errorKey, setErrorKey] = useState<string | null>(null);

  const remaining = Math.max(0, Math.round((orderedQty - deliveredQty) * 100) / 100);
  const pct = orderedQty > 0 ? Math.min(100, Math.round((deliveredQty / orderedQty) * 100)) : 0;
  const readyToComplete = status !== "hoàn tất" && Math.round(deliveredQty * 100) === Math.round(orderedQty * 100);

  async function handleComplete() {
    if (pending || !readyToComplete) return;
    setPending(true);
    setErrorKey(null);
    try {
      const response = await fetch(`/api/deliveries/${deliveryId}/complete`, { method: "POST" });
      const body = await response.json();
      if (!response.ok) {
        const reasonCode = typeof body.reason === "string" ? body.reason : "";
        setErrorKey(
          isCompleteRejectReason(reasonCode) ? COMPLETE_REJECT_I18N_KEY[reasonCode] : "deliveries.error.generic",
        );
        return;
      }
      router.refresh();
    } catch {
      setErrorKey("deliveries.error.generic");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="space-y-3">
      <dl className="grid grid-cols-3 gap-4 text-sm">
        <div>
          <dt className="text-muted">{t("deliveries.detail.orderedQtyLabel")}</dt>
          <dd className="sm-num mt-1 text-left text-lg font-bold text-strong">{orderedQty}</dd>
        </div>
        <div>
          <dt className="text-muted">{t("deliveries.detail.deliveredQtyLabel")}</dt>
          <dd className="sm-num mt-1 text-left text-lg font-bold text-strong">{deliveredQty}</dd>
        </div>
        <div>
          <dt className="text-muted">{t("deliveries.detail.remainingQtyLabel")}</dt>
          <dd className="sm-num mt-1 text-left text-lg font-bold text-strong">{remaining}</dd>
        </div>
      </dl>
      {/* Progress track (.rd-cat-track/.rd-cat-fill). The figures above carry
          the same information in words, so the bar is reinforcement only --
          it is aria-hidden rather than a redundant progressbar to announce. */}
      <div aria-hidden className="sm-track">
        <span className="sm-fill" style={{ width: `${pct}%` }} />
      </div>
      {canComplete && status !== "hoàn tất" && (
        <div>
          <button
            type="button"
            onClick={handleComplete}
            disabled={pending || !readyToComplete}
            aria-busy={pending}
            className="sm-btn sm-btn-approve"
          >
            {t("deliveries.detail.completeButton")}
          </button>
          {!readyToComplete && (
            <p className="sm-hint mt-1">{t("deliveries.detail.completeDisabledHint")}</p>
          )}
        </div>
      )}
      {!canComplete && status !== "hoàn tất" && (
        <HandoffCaption actionLabel={t("deliveries.detail.completeButton")} roles={["ROLE-SETTLEMENT"]} />
      )}
      {errorKey && (
        <p role="alert" className="sm-error">
          {t(errorKey)}
        </p>
      )}
    </div>
  );
}
