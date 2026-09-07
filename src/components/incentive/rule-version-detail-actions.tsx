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
  isOwnPending,
  isOwnActive,
}: {
  versionId: string;
  canApprove: boolean;
  canRollback: boolean;
  rollbackCandidates: RollbackCandidate[];
  /** DEC-001/GOV-RULE-01: maker-checker within the SAME role -- distinct
   * from a role gap, so the note names "you created this" rather than a
   * role the viewer already has. */
  isOwnPending: boolean;
  isOwnActive: boolean;
}) {
  const t = useT();
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [errorKey, setErrorKey] = useState<string | null>(null);
  const [targetVersionId, setTargetVersionId] = useState(rollbackCandidates[0]?.id ?? "");

  if (!canApprove && !canRollback) {
    if (isOwnPending) return <p className="cds-field__msg cds-field__msg--hint">{t("incentive.error.SELF_APPROVAL")}</p>;
    if (isOwnActive) return <p className="cds-field__msg cds-field__msg--hint">{t("incentive.error.SELF_ROLLBACK")}</p>;
    return null;
  }

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

  // No card of its own -- the caller supplies the SectionCard this sits in,
  // so a `cds-card` here would put a box inside a box.
  return (
    <div className="space-y-3">
      {canApprove && (
        <button
          type="button"
          onClick={handleApprove}
          disabled={pending}
          aria-busy={pending}
          className="cds-btn cds-btn--md"
        >
          {t("incentive.rules.detail.approveButton")}
        </button>
      )}
      {canRollback && rollbackCandidates.length > 0 && (
        <div className="flex items-end gap-2">
          <label className="cds-field">
            {t("incentive.rules.detail.rollbackTargetLabel")}
            <select
              value={targetVersionId}
              onChange={(e) => setTargetVersionId(e.target.value)}
              disabled={pending}
              className="cds-select--native mt-1"
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
            className="cds-btn cds-btn--danger cds-btn--md"
          >
            {t("incentive.rules.detail.rollbackButton")}
          </button>
        </div>
      )}
      {errorKey && (
        <p role="alert" className="cds-field__msg cds-field__msg--error">
          {t(errorKey)}
        </p>
      )}
    </div>
  );
}
