"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useT } from "@/lib/i18n/i18n-provider";

const APPROVE_REASON_I18N_KEY: Record<string, string> = {
  NOT_FOUND: "incentive.error.NOT_FOUND",
  SELF_APPROVAL: "incentive.error.SELF_APPROVAL",
  ALREADY_DECIDED: "incentive.error.ALREADY_DECIDED",
};
const ROLLBACK_REASON_I18N_KEY: Record<string, string> = {
  NOT_FOUND: "incentive.error.NOT_FOUND",
  SELF_ROLLBACK: "incentive.error.SELF_ROLLBACK",
  NOT_ACTIVE: "incentive.error.NOT_ACTIVE",
  INVALID_TARGET: "incentive.error.INVALID_TARGET",
};

export interface RollbackCandidate {
  id: string;
  versionNo: number;
  effectiveFrom: string;
}

// SCR018_RuleVersionEditor detail (A2/A3, DEC-001). `canApprove`/
// `canRollback` are computed server-side (status + created_by !== viewer) --
// the button never renders itself into existence from client-only state.
export function RuleVersionDetailActions({
  versionId,
  canApprove,
  canRollback,
  rollbackCandidates,
}: {
  versionId: string;
  canApprove: boolean;
  canRollback: boolean;
  rollbackCandidates: RollbackCandidate[];
}) {
  const t = useT();
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [errorKey, setErrorKey] = useState<string | null>(null);
  const [targetVersionId, setTargetVersionId] = useState(rollbackCandidates[0]?.id ?? "");

  if (!canApprove && !canRollback) return null;

  async function handleApprove() {
    if (pending) return;
    setPending(true);
    setErrorKey(null);
    try {
      const response = await fetch(`/api/incentive-rules/${versionId}/approve`, { method: "POST" });
      const body = await response.json();
      if (!response.ok) {
        const reasonCode = typeof body.reason === "string" ? body.reason : "";
        setErrorKey(APPROVE_REASON_I18N_KEY[reasonCode] ?? "incentive.error.generic");
        return;
      }
      router.refresh();
    } catch {
      setErrorKey("incentive.error.generic");
    } finally {
      setPending(false);
    }
  }

  async function handleRollback() {
    if (pending || !targetVersionId) return;
    setPending(true);
    setErrorKey(null);
    try {
      const response = await fetch(`/api/incentive-rules/${versionId}/rollback`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ targetVersionId }),
      });
      const body = await response.json();
      if (!response.ok) {
        const reasonCode = typeof body.reason === "string" ? body.reason : "";
        setErrorKey(ROLLBACK_REASON_I18N_KEY[reasonCode] ?? "incentive.error.generic");
        return;
      }
      router.refresh();
    } catch {
      setErrorKey("incentive.error.generic");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="space-y-3 rounded-md border border-zinc-300 p-4">
      {canApprove && (
        <button
          type="button"
          onClick={handleApprove}
          disabled={pending}
          aria-busy={pending}
          className="rounded-md bg-emerald-700 px-3 py-2 text-sm font-medium text-white hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {t("incentive.rules.detail.approveButton")}
        </button>
      )}
      {canRollback && rollbackCandidates.length > 0 && (
        <div className="flex items-end gap-2">
          <label className="flex flex-col text-sm text-zinc-700">
            {t("incentive.rules.detail.rollbackTargetLabel")}
            <select
              value={targetVersionId}
              onChange={(e) => setTargetVersionId(e.target.value)}
              disabled={pending}
              className="mt-1 rounded-md border border-zinc-300 px-3 py-2 text-sm"
            >
              {rollbackCandidates.map((c) => (
                <option key={c.id} value={c.id}>
                  v{c.versionNo} ({c.effectiveFrom})
                </option>
              ))}
            </select>
          </label>
          <button
            type="button"
            onClick={handleRollback}
            disabled={pending}
            aria-busy={pending}
            className="rounded-md bg-red-700 px-3 py-2 text-sm font-medium text-white hover:bg-red-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {t("incentive.rules.detail.rollbackButton")}
          </button>
        </div>
      )}
      {errorKey && (
        <p role="alert" className="text-sm text-red-600">
          {t(errorKey)}
        </p>
      )}
    </div>
  );
}
