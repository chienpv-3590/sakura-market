"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useT } from "@/lib/i18n/i18n-provider";
import { EmptyState } from "@/components/ui/empty-state";
import {
  allowedEvents,
  type ParticipantStatus,
  type TransitionEvent,
} from "@/lib/participants/state-machine";

// SCR003 transition block (A3). Renders exactly the buttons `allowedEvents()`
// returns for the current status -- never all 5 with the illegal ones
// disabled (phase-05 Implementation Steps #9). Reason is mandatory before
// the confirm button will submit.
export function TransitionActions({
  participantId,
  currentStatus,
}: {
  participantId: string;
  currentStatus: ParticipantStatus;
}) {
  const t = useT();
  const router = useRouter();
  const events = allowedEvents(currentStatus);
  const [selected, setSelected] = useState<TransitionEvent | null>(null);
  const [reason, setReason] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function selectEvent(event: TransitionEvent) {
    setSelected(event);
    setError(null);
  }

  function cancelSelection() {
    setSelected(null);
    setReason("");
    setError(null);
  }

  async function confirm() {
    if (!selected) return;
    if (reason.trim().length === 0) {
      setError(t("participants.detail.transitionReasonRequired"));
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      const response = await fetch(`/api/participants/${participantId}/transition`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ event: selected, reason: reason.trim() }),
      });
      if (!response.ok) {
        setError(t("participants.detail.transitionError"));
        setSubmitting(false);
        return;
      }
      cancelSelection();
      router.refresh();
    } catch {
      setError(t("participants.detail.transitionError"));
      setSubmitting(false);
    }
  }

  if (events.length === 0) {
    return <EmptyState description={t("participants.detail.transitionNoneAvailable")} />;
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {events.map((event) => (
          <button
            key={event}
            type="button"
            onClick={() => selectEvent(event)}
            className={`rounded-md border px-3 py-2 text-sm font-medium ${
              selected === event
                ? "border-brand bg-brand text-card"
                : "border-line-strong text-secondary hover:bg-hover"
            }`}
          >
            {t(`event.${event}`)}
          </button>
        ))}
      </div>
      {selected && (
        <div className="cds-card space-y-2 p-3">
          <label className="cds-field__label">
            {t("participants.detail.transitionReasonLabel")}
            <textarea
              value={reason}
              onChange={(event) => setReason(event.target.value)}
              disabled={submitting}
              placeholder={t("participants.detail.transitionReasonPlaceholder")}
              rows={2}
              className="cds-textarea mt-1 w-full"
            />
          </label>
          {error && (
            <p role="alert" className="cds-field__msg cds-field__msg--error">
              {error}
            </p>
          )}
          <div className="flex gap-2">
            <button
              type="button"
              onClick={confirm}
              disabled={submitting}
              aria-busy={submitting}
              className="cds-btn cds-btn--md"
            >
              {t("participants.detail.transitionConfirm")}
            </button>
            <button
              type="button"
              onClick={cancelSelection}
              disabled={submitting}
              className="cds-btn cds-btn--secondary cds-btn--md"
            >
              {t("participants.detail.transitionCancel")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
