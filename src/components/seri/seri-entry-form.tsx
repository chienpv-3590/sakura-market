"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useT } from "@/lib/i18n/i18n-provider";
import { SeriFormFields } from "./seri-form-fields";

type LotOption = { id: string; lotCode: string; item: string };
type ParticipantOption = { id: string; name: string };
type OperatorOption = { id: string; label: string };

type SeriEntryFormProps =
  | {
      mode: "create";
      lots: LotOption[];
      participants: ParticipantOption[];
      operators: OperatorOption[];
      defaultConfirmedBy: string;
    }
  | {
      mode: "edit";
      seriResultId: string;
      participants: ParticipantOption[];
      operators: OperatorOption[];
      initial: {
        winnerParticipantId: string;
        qty: number;
        unitPrice: number;
        decidedAt: string;
        confirmedBy: string | null;
      };
    };

function toDatetimeLocal(iso: string): string {
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

// SCR009 (create) + SCR010 edit form (edit) share one component -- same
// mode-prop pattern as participant-form.tsx. No file/image field anywhere in
// this form: FR-SERI-01 / SCOPE-OUT-02 forbid it outright (Success Criteria
// checks there is no input[type=file] here).
export function SeriEntryForm(props: SeriEntryFormProps) {
  const t = useT();
  const router = useRouter();
  const initial = props.mode === "edit" ? props.initial : undefined;

  const [lotId, setLotId] = useState(props.mode === "create" ? (props.lots[0]?.id ?? "") : "");
  const [winnerParticipantId, setWinnerParticipantId] = useState(
    initial?.winnerParticipantId ?? props.participants[0]?.id ?? "",
  );
  const [qty, setQty] = useState(initial ? String(initial.qty) : "");
  const [unitPrice, setUnitPrice] = useState(initial ? String(initial.unitPrice) : "");
  const [decidedAt, setDecidedAt] = useState(
    initial ? toDatetimeLocal(initial.decidedAt) : toDatetimeLocal(new Date().toISOString()),
  );
  const [confirmedBy, setConfirmedBy] = useState(
    initial?.confirmedBy ?? (props.mode === "create" ? props.defaultConfirmedBy : (props.operators[0]?.id ?? "")),
  );
  const [reason, setReason] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [errorKey, setErrorKey] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setErrorKey(null);
    setSuccess(false);
    const decidedAtIso = new Date(decidedAt).toISOString();

    try {
      if (props.mode === "create") {
        const response = await fetch("/api/seri-results", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            lotId,
            winnerParticipantId,
            qty: Number(qty),
            unitPrice: Number(unitPrice),
            decidedAt: decidedAtIso,
            confirmedBy,
          }),
        });
        const body = await response.json();
        if (!response.ok) {
          setErrorKey(response.status === 409 ? "seri.create.error.duplicate" : "seri.create.error.invalidRequest");
          setSubmitting(false);
          return;
        }
        router.push(`/seri/${body.id}`);
        return;
      }

      const response = await fetch(`/api/seri-results/${props.seriResultId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          winnerParticipantId,
          qty: Number(qty),
          unitPrice: Number(unitPrice),
          decidedAt: decidedAtIso,
          confirmedBy,
          reason: reason.trim(),
        }),
      });
      if (!response.ok) {
        setErrorKey("seri.edit.error.invalidRequest");
        setSubmitting(false);
        return;
      }
      setSuccess(true);
      setReason("");
      setSubmitting(false);
      router.refresh();
    } catch {
      setErrorKey("seri.create.error.network");
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md space-y-4">
      {props.mode === "create" && (
        <div>
          <label htmlFor="seri-lot" className="cds-field__label">
            {t("seri.form.lotLabel")}
          </label>
          <select
            id="seri-lot"
            value={lotId}
            onChange={(e) => setLotId(e.target.value)}
            disabled={submitting}
            className="cds-select--native mt-1 w-full"
          >
            {props.lots.map((lot) => (
              <option key={lot.id} value={lot.id}>
                {lot.lotCode} — {lot.item}
              </option>
            ))}
          </select>
        </div>
      )}
      <SeriFormFields
        winnerParticipantId={winnerParticipantId}
        onWinnerChange={setWinnerParticipantId}
        qty={qty}
        onQtyChange={setQty}
        unitPrice={unitPrice}
        onUnitPriceChange={setUnitPrice}
        decidedAt={decidedAt}
        onDecidedAtChange={setDecidedAt}
        confirmedBy={confirmedBy}
        onConfirmedByChange={setConfirmedBy}
        participants={props.participants}
        operators={props.operators}
        disabled={submitting}
      />
      {props.mode === "edit" && (
        <div>
          <label htmlFor="seri-reason" className="cds-field__label">
            {t("seri.form.reasonLabel")}
          </label>
          <input
            id="seri-reason"
            type="text"
            required
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            disabled={submitting}
            className="cds-input--native mt-1 w-full"
          />
        </div>
      )}
      {errorKey && (
        <p role="alert" className="cds-field__msg cds-field__msg--error">
          {t(errorKey)}
        </p>
      )}
      {success && <p className="cds-field__msg cds-field__msg--hint text-ok">{t("seri.edit.success")}</p>}
      <button
        type="submit"
        disabled={submitting || (props.mode === "edit" && reason.trim().length === 0)}
        aria-busy={submitting}
        className="cds-btn cds-btn--md w-full"
      >
        {submitting
          ? t("seri.form.submitting")
          : props.mode === "create"
            ? t("seri.form.submitCreate")
            : t("seri.form.submitUpdate")}
      </button>
    </form>
  );
}
