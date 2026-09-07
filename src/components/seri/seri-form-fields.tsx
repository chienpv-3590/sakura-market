"use client";

import { useT } from "@/lib/i18n/i18n-provider";

type ParticipantOption = { id: string; name: string };
type OperatorOption = { id: string; label: string };

const INPUT_CLASS = "sm-field mt-1 w-full";

// Fields shared by SCR009 (create) and SCR010's edit form -- everything
// except the lot picker (create-only) and the mandatory edit reason
// (edit-only), which seri-entry-form.tsx renders around this. Split out
// purely to keep both files under the 200-line limit.
export function SeriFormFields({
  winnerParticipantId,
  onWinnerChange,
  qty,
  onQtyChange,
  unitPrice,
  onUnitPriceChange,
  decidedAt,
  onDecidedAtChange,
  confirmedBy,
  onConfirmedByChange,
  participants,
  operators,
  disabled,
}: {
  winnerParticipantId: string;
  onWinnerChange: (value: string) => void;
  qty: string;
  onQtyChange: (value: string) => void;
  unitPrice: string;
  onUnitPriceChange: (value: string) => void;
  decidedAt: string;
  onDecidedAtChange: (value: string) => void;
  confirmedBy: string;
  onConfirmedByChange: (value: string) => void;
  participants: ParticipantOption[];
  operators: OperatorOption[];
  disabled: boolean;
}) {
  const t = useT();

  return (
    <>
      <div>
        <label htmlFor="seri-winner" className="sm-label">
          {t("seri.form.winnerLabel")}
        </label>
        <select
          id="seri-winner"
          value={winnerParticipantId}
          onChange={(e) => onWinnerChange(e.target.value)}
          disabled={disabled}
          className={INPUT_CLASS}
        >
          {participants.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="seri-qty" className="sm-label">
          {t("seri.form.qtyLabel")}
        </label>
        <input
          id="seri-qty"
          type="number"
          min={0.01}
          step={0.01}
          required
          value={qty}
          onChange={(e) => onQtyChange(e.target.value)}
          disabled={disabled}
          className={INPUT_CLASS}
        />
      </div>
      <div>
        <label htmlFor="seri-unit-price" className="sm-label">
          {t("seri.form.unitPriceLabel")}
        </label>
        <input
          id="seri-unit-price"
          type="number"
          min={1}
          step={1}
          required
          value={unitPrice}
          onChange={(e) => onUnitPriceChange(e.target.value)}
          disabled={disabled}
          className={INPUT_CLASS}
        />
      </div>
      <div>
        <label htmlFor="seri-decided-at" className="sm-label">
          {t("seri.form.decidedAtLabel")}
        </label>
        <input
          id="seri-decided-at"
          type="datetime-local"
          required
          value={decidedAt}
          onChange={(e) => onDecidedAtChange(e.target.value)}
          disabled={disabled}
          className={INPUT_CLASS}
        />
      </div>
      <div>
        <label htmlFor="seri-confirmed-by" className="sm-label">
          {t("seri.form.confirmedByLabel")}
        </label>
        <select
          id="seri-confirmed-by"
          value={confirmedBy}
          onChange={(e) => onConfirmedByChange(e.target.value)}
          disabled={disabled}
          className={INPUT_CLASS}
        >
          {operators.map((o) => (
            <option key={o.id} value={o.id}>
              {o.label}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}
