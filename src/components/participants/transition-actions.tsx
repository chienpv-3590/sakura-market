"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useT } from "@/lib/i18n/i18n-provider";
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
    return <p className="text-sm text-zinc-500">{t("participants.detail.transitionNoneAvailable")}</p>;
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
                ? "border-zinc-900 bg-zinc-900 text-white"
                : "border-zinc-300 text-zinc-700 hover:bg-zinc-100"
            }`}
          >
            {t(`event.${event}`)}
          </button>
        ))}
      </div>
      {selected && (
        <div className="space-y-2 rounded-md border border-zinc-200 p-3">
          <label className="block text-sm font-medium text-zinc-700">
            {t("participants.detail.transitionReasonLabel")}
            <textarea
              value={reason}
              onChange={(event) => setReason(event.target.value)}
              disabled={submitting}
              placeholder={t("participants.detail.transitionReasonPlaceholder")}
              rows={2}
              className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 text-sm focus:border-zinc-500 focus:outline-none"
            />
          </label>
          {error && (
            <p role="alert" className="text-sm text-red-600">
              {error}
            </p>
          )}
          <div className="flex gap-2">
            <button
              type="button"
              onClick={confirm}
              disabled={submitting}
              aria-busy={submitting}
              className="rounded-md bg-zinc-900 px-3 py-2 text-sm font-medium text-white hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {t("participants.detail.transitionConfirm")}
            </button>
            <button
              type="button"
              onClick={cancelSelection}
              disabled={submitting}
              className="rounded-md border border-zinc-300 px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {t("participants.detail.transitionCancel")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
