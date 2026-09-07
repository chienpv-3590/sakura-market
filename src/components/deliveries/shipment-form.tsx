"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useT } from "@/lib/i18n/i18n-provider";
import { SHIPMENT_REJECT_I18N_KEY, isShipmentRejectReason } from "@/lib/deliveries/delivery-reject-reasons";

// SCR012 "Ghi nhận lần giao mới" (A2, US001). ROLE-DELIVERY only -- the
// parent page decides whether to render this at all.
export function ShipmentForm({ deliveryId }: { deliveryId: string }) {
  const t = useT();
  const router = useRouter();
  const [qty, setQty] = useState("");
  const [pending, setPending] = useState(false);
  const [errorKey, setErrorKey] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const parsed = Number(qty);
    if (pending || !Number.isFinite(parsed) || parsed <= 0) return;

    setPending(true);
    setErrorKey(null);
    try {
      const response = await fetch(`/api/deliveries/${deliveryId}/shipments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ qty: parsed }),
      });
      const body = await response.json();
      if (!response.ok) {
        const reasonCode = typeof body.reason === "string" ? body.reason : "";
        setErrorKey(
          isShipmentRejectReason(reasonCode) ? SHIPMENT_REJECT_I18N_KEY[reasonCode] : "deliveries.error.generic",
        );
        return;
      }
      setQty("");
      router.refresh();
    } catch {
      setErrorKey("deliveries.error.generic");
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap items-end gap-2">
      <label className="flex flex-col text-sm text-zinc-700">
        {t("deliveries.detail.newShipmentQtyLabel")}
        <input
          type="number"
          min="0.01"
          step="0.01"
          value={qty}
          onChange={(e) => setQty(e.target.value)}
          disabled={pending}
          className="mt-1 w-40 rounded-md border border-zinc-300 px-3 py-2 text-sm"
        />
      </label>
      <button
        type="submit"
        disabled={pending || qty.trim().length === 0}
        aria-busy={pending}
        className="rounded-md bg-zinc-900 px-3 py-2 text-sm font-medium text-white hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {t("deliveries.detail.newShipmentSubmit")}
      </button>
      {errorKey && (
        <p role="alert" className="w-full text-sm text-red-600">
          {t(errorKey)}
        </p>
      )}
    </form>
  );
}
