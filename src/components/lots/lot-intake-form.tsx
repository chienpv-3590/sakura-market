"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useT } from "@/lib/i18n/i18n-provider";
import { KeyboardOperableForm } from "./keyboard-operable-form";

type CreatedLot = { id: string; lotCode: string };

// SCR004_LotIntake (A1, FR-LOT-01). US001 AC: keyboard-only end to end, and
// the newly-minted lot_code must be shown large enough to read at the
// counter. On success we render the code plus a real <a> to SCR005 so the
// keyboard flow (Success Criteria #1) can continue without a mouse.
export function LotIntakeForm() {
  const t = useT();
  const [item, setItem] = useState("");
  const [packageCount, setPackageCount] = useState("");
  const [initialQty, setInitialQty] = useState("");
  const [intakeDocs, setIntakeDocs] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [errorKey, setErrorKey] = useState<string | null>(null);
  const [created, setCreated] = useState<CreatedLot | null>(null);

  function resetForm() {
    setItem("");
    setPackageCount("");
    setInitialQty("");
    setIntakeDocs("");
    setCreated(null);
    setErrorKey(null);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setErrorKey(null);

    try {
      const response = await fetch("/api/lots", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          item,
          packageCount: Number(packageCount),
          initialQty: Number(initialQty),
          intakeDocs: intakeDocs.trim() || null,
        }),
      });
      const body = await response.json();

      if (!response.ok) {
        setErrorKey("lots.intake.error.invalidRequest");
        setSubmitting(false);
        return;
      }
      setCreated({ id: body.id, lotCode: body.lotCode });
      setSubmitting(false);
    } catch {
      setErrorKey("lots.intake.error.network");
      setSubmitting(false);
    }
  }

  if (created) {
    return (
      <div className="cds-card max-w-md space-y-4 p-6">
        <h2 className="cds-card__title !text-ok">{t("lots.intake.successTitle")}</h2>
        <div>
          <span className="cds-field__label">{t("lots.intake.lotCodeLabel")}</span>
          <input
            readOnly
            autoFocus
            value={created.lotCode}
            tabIndex={1}
            className="cds-input--native cds-input--auto cds-table__mono mt-1 w-full text-[24px] font-bold tracking-wide"
          />
        </div>
        <div className="flex gap-3">
          <Link
            href={`/lots/${created.id}/mekiki`}
            tabIndex={2}
            className="cds-btn cds-btn--md"
          >
            {t("lots.intake.continueToMekiki")}
          </Link>
          <button
            type="button"
            tabIndex={3}
            onClick={resetForm}
            className="cds-btn cds-btn--secondary cds-btn--md"
          >
            {t("lots.intake.createAnother")}
          </button>
        </div>
      </div>
    );
  }

  return (
    <KeyboardOperableForm onSubmit={handleSubmit} className="max-w-md space-y-4">
      <div>
        <label htmlFor="item" className="cds-field__label">
          {t("lots.intake.itemLabel")}
        </label>
        <input
          id="item"
          name="item"
          type="text"
          required
          tabIndex={1}
          value={item}
          onChange={(e) => setItem(e.target.value)}
          disabled={submitting}
          className="cds-input--native mt-1 w-full"
        />
      </div>
      <div>
        <label htmlFor="packageCount" className="cds-field__label">
          {t("lots.intake.packageCountLabel")}
        </label>
        <input
          id="packageCount"
          name="packageCount"
          type="number"
          min={1}
          step={1}
          required
          tabIndex={2}
          value={packageCount}
          onChange={(e) => setPackageCount(e.target.value)}
          disabled={submitting}
          className="cds-input--native mt-1 w-full"
        />
      </div>
      <div>
        <label htmlFor="initialQty" className="cds-field__label">
          {t("lots.intake.initialQtyLabel")}
        </label>
        <input
          id="initialQty"
          name="initialQty"
          type="number"
          min={0.01}
          step={0.01}
          required
          tabIndex={3}
          value={initialQty}
          onChange={(e) => setInitialQty(e.target.value)}
          disabled={submitting}
          className="cds-input--native mt-1 w-full"
        />
      </div>
      <div>
        <label htmlFor="intakeDocs" className="cds-field__label">
          {t("lots.intake.intakeDocsLabel")}
        </label>
        <input
          id="intakeDocs"
          name="intakeDocs"
          type="text"
          tabIndex={4}
          value={intakeDocs}
          onChange={(e) => setIntakeDocs(e.target.value)}
          disabled={submitting}
          className="cds-input--native mt-1 w-full"
        />
      </div>
      {errorKey && (
        <p role="alert" className="cds-field__msg cds-field__msg--error">
          {t(errorKey)}
        </p>
      )}
      <button
        type="submit"
        tabIndex={5}
        disabled={submitting}
        aria-busy={submitting}
        className="cds-btn cds-btn--md w-full"
      >
        {submitting ? t("lots.intake.submitting") : t("lots.intake.submit")}
      </button>
    </KeyboardOperableForm>
  );
}
