"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useT } from "@/lib/i18n/i18n-provider";
import { KeyboardOperableForm } from "./keyboard-operable-form";
import { IntakeDocField } from "./intake-doc-field";
import { INTAKE_DOC_REJECT_I18N_KEY, isIntakeDocRejectReason } from "@/lib/lots/intake-doc-reject-reasons";

type CreatedLot = { id: string; lotCode: string; attachmentsFailed: number };

// SCR004_LotIntake (A1, FR-LOT-01). US001 AC: keyboard-only end to end, and
// the newly-minted lot_code must be shown large enough to read at the
// counter. On success we render the code plus a real <a> to SCR005 so the
// keyboard flow (Success Criteria #1) can continue without a mouse.
//
// `intakeDocs` is a real file input (0+ files), not the free-text field
// phase-06 shipped -- FR-LOT-01's chứng từ tiếp nhận is a real attachment now
// (docs/pham-vi-va-phan-mock.md). The form is posted as `new
// FormData(event.currentTarget)` straight off the <form> element so the file
// input's own FileList travels with it -- no parallel file state to keep in
// sync, and multipart/form-data matches the /api/corrections convention.
export function LotIntakeForm() {
  const t = useT();
  const [item, setItem] = useState("");
  const [packageCount, setPackageCount] = useState("");
  const [initialQty, setInitialQty] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [errorKey, setErrorKey] = useState<string | null>(null);
  const [created, setCreated] = useState<CreatedLot | null>(null);

  // No file-input reset needed: `created` toggling back to null swaps this
  // whole branch back in, mounting a fresh <IntakeDocField> (and a fresh,
  // empty native file input) rather than reusing the old one.
  function resetForm() {
    setItem("");
    setPackageCount("");
    setInitialQty("");
    setCreated(null);
    setErrorKey(null);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setErrorKey(null);

    try {
      const formData = new FormData(event.currentTarget);
      const response = await fetch("/api/lots", { method: "POST", body: formData });
      const body = await response.json();

      if (!response.ok) {
        const reason = typeof body.reason === "string" ? body.reason : "";
        setErrorKey(
          isIntakeDocRejectReason(reason)
            ? INTAKE_DOC_REJECT_I18N_KEY[reason]
            : "lots.intake.error.invalidRequest",
        );
        setSubmitting(false);
        return;
      }
      setCreated({
        id: body.id,
        lotCode: body.lotCode,
        attachmentsFailed: typeof body.attachmentsFailed === "number" ? body.attachmentsFailed : 0,
      });
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
        {created.attachmentsFailed > 0 && (
          <p role="alert" className="cds-field__msg cds-field__msg--error">
            {t("lots.intake.attachmentsFailedWarning")}
          </p>
        )}
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
      <IntakeDocField tabIndex={4} disabled={submitting} />
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
