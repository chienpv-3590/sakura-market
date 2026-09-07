"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useT } from "@/lib/i18n/i18n-provider";
import { APPROVE_REJECT_I18N_KEY, isApproveRejectReason } from "@/lib/corrections/correction-reject-reasons";
import type { AdjustmentKind } from "@/lib/corrections/build-adjustment";

// SCR015_CorrectionApproval (A3, DEC-001, US002). `canDecide` is computed
// server-side by the page (status==='pending' AND currentUser!==requested_by)
// and passed in as a prop -- the button never renders itself into existence
// from client-only state, matching DEC-001's own wording ("nút chỉ hiện khi
// pending và người xem khác người tạo").
export function CorrectionApprovalPanel({ correctionId, canDecide }: { correctionId: string; canDecide: boolean }) {
  const t = useT();
  const router = useRouter();
  const [kind, setKind] = useState<AdjustmentKind>("reverse");
  const [qtyDelta, setQtyDelta] = useState("0");
  const [unitPriceDelta, setUnitPriceDelta] = useState("0");
  const [pending, setPending] = useState(false);
  const [errorKey, setErrorKey] = useState<string | null>(null);

  if (!canDecide) return null;

  async function decide(decision: "approve" | "reject") {
    if (pending) return;
    setPending(true);
    setErrorKey(null);
    try {
      const body: Record<string, unknown> = { decision };
      if (decision === "approve") {
        body.adjustmentKind = kind;
        if (kind === "delta") {
          body.qtyDelta = Number(qtyDelta) || 0;
          body.unitPriceDelta = Number(unitPriceDelta) || 0;
        }
      }
      const response = await fetch(`/api/corrections/${correctionId}/approve`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const responseBody = await response.json();
      if (!response.ok) {
        const reasonCode = typeof responseBody.reason === "string" ? responseBody.reason : "";
        setErrorKey(
          isApproveRejectReason(reasonCode) ? APPROVE_REJECT_I18N_KEY[reasonCode] : "corrections.error.generic",
        );
        return;
      }
      router.refresh();
    } catch {
      setErrorKey("corrections.error.generic");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="space-y-3 rounded-md border border-zinc-300 p-4">
      <div className="flex gap-4 text-sm">
        <label className="flex items-center gap-1">
          <input type="radio" checked={kind === "reverse"} onChange={() => setKind("reverse")} disabled={pending} />
          {t("corrections.approval.kindReverse")}
        </label>
        <label className="flex items-center gap-1">
          <input type="radio" checked={kind === "delta"} onChange={() => setKind("delta")} disabled={pending} />
          {t("corrections.approval.kindDelta")}
        </label>
      </div>
      {kind === "delta" && (
        <div className="flex gap-4">
          <label className="flex flex-col text-sm text-zinc-700">
            {t("corrections.approval.qtyDeltaLabel")}
            <input
              type="number"
              step="0.01"
              value={qtyDelta}
              onChange={(e) => setQtyDelta(e.target.value)}
              disabled={pending}
              className="mt-1 w-32 rounded-md border border-zinc-300 px-3 py-2 text-sm"
            />
          </label>
          <label className="flex flex-col text-sm text-zinc-700">
            {t("corrections.approval.unitPriceDeltaLabel")}
            <input
              type="number"
              step="1"
              value={unitPriceDelta}
              onChange={(e) => setUnitPriceDelta(e.target.value)}
              disabled={pending}
              className="mt-1 w-32 rounded-md border border-zinc-300 px-3 py-2 text-sm"
            />
          </label>
        </div>
      )}
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => decide("approve")}
          disabled={pending}
          aria-busy={pending}
          className="rounded-md bg-emerald-700 px-3 py-2 text-sm font-medium text-white hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {t("corrections.approval.approveButton")}
        </button>
        <button
          type="button"
          onClick={() => decide("reject")}
          disabled={pending}
          aria-busy={pending}
          className="rounded-md bg-red-700 px-3 py-2 text-sm font-medium text-white hover:bg-red-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {t("corrections.approval.rejectButton")}
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
