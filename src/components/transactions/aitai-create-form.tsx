"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useT } from "@/lib/i18n/i18n-provider";
import { KeyboardOperableForm } from "./keyboard-operable-form";

type LotOption = { id: string; lotCode: string; item: string; availableQty: number };
type ParticipantOption = { id: string; name: string };

// SCR007_AitaiCreate (A1, FR-AITAI-01). Deliberately does NOT check
// eligibility or availability here -- both gates run only at confirm time
// (A2, BR-PERM-01/BR-LOT-02) -- this form only creates a 'draft'.
export function AitaiCreateForm({
  lots,
  participants,
}: {
  lots: LotOption[];
  participants: ParticipantOption[];
}) {
  const t = useT();
  const router = useRouter();
  const [lotId, setLotId] = useState(lots[0]?.id ?? "");
  const [buyerParticipantId, setBuyerParticipantId] = useState(participants[0]?.id ?? "");
  const [qty, setQty] = useState("");
  const [unitPrice, setUnitPrice] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [errorKey, setErrorKey] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setErrorKey(null);

    try {
      const response = await fetch("/api/transactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lotId,
          buyerParticipantId,
          qty: Number(qty),
          unitPrice: Number(unitPrice),
        }),
      });
      const body = await response.json();
      if (!response.ok) {
        setErrorKey("transactions.create.error.invalidRequest");
        setSubmitting(false);
        return;
      }
      router.push(`/transactions/${body.id}`);
    } catch {
      setErrorKey("transactions.create.error.network");
      setSubmitting(false);
    }
  }

  if (lots.length === 0 || participants.length === 0) {
    return <p className="text-sm text-zinc-500">{t("transactions.create.noLots")}</p>;
  }

  return (
    <KeyboardOperableForm onSubmit={handleSubmit} className="max-w-md space-y-4">
      <div>
        <label htmlFor="txn-lot" className="block text-sm font-medium text-zinc-700">
          {t("transactions.create.lotLabel")}
        </label>
        <select
          id="txn-lot"
          value={lotId}
          onChange={(e) => setLotId(e.target.value)}
          disabled={submitting}
          className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 text-sm focus:border-zinc-500 focus:outline-none"
        >
          {lots.map((lot) => (
            <option key={lot.id} value={lot.id}>
              {lot.lotCode} — {lot.item} ({lot.availableQty})
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="txn-buyer" className="block text-sm font-medium text-zinc-700">
          {t("transactions.create.buyerLabel")}
        </label>
        <select
          id="txn-buyer"
          value={buyerParticipantId}
          onChange={(e) => setBuyerParticipantId(e.target.value)}
          disabled={submitting}
          className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 text-sm focus:border-zinc-500 focus:outline-none"
        >
          {participants.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="txn-qty" className="block text-sm font-medium text-zinc-700">
          {t("transactions.create.qtyLabel")}
        </label>
        <input
          id="txn-qty"
          type="number"
          min={0.01}
          step={0.01}
          required
          value={qty}
          onChange={(e) => setQty(e.target.value)}
          disabled={submitting}
          className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 text-sm focus:border-zinc-500 focus:outline-none"
        />
      </div>
      <div>
        <label htmlFor="txn-unit-price" className="block text-sm font-medium text-zinc-700">
          {t("transactions.create.unitPriceLabel")}
        </label>
        <input
          id="txn-unit-price"
          type="number"
          min={1}
          step={1}
          required
          value={unitPrice}
          onChange={(e) => setUnitPrice(e.target.value)}
          disabled={submitting}
          className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 text-sm focus:border-zinc-500 focus:outline-none"
        />
      </div>
      {errorKey && (
        <p role="alert" className="text-sm text-red-600">
          {t(errorKey)}
        </p>
      )}
      <button
        type="submit"
        disabled={submitting}
        aria-busy={submitting}
        className="w-full rounded-md bg-zinc-900 px-3 py-2 text-sm font-medium text-white hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {submitting ? t("transactions.create.submitting") : t("transactions.create.submit")}
      </button>
    </KeyboardOperableForm>
  );
}
