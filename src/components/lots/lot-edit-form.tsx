"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useT } from "@/lib/i18n/i18n-provider";

type EditableField = "item" | "package_count";

const ERROR_KEYS: Record<string, string> = {
  invalid_request: "lots.edit.error.invalidRequest",
  locked_business_date: "lots.edit.error.locked",
  not_found: "lots.edit.error.notFound",
};

// SCR006_LotDetail / REG-EDIT (A6, FR-LOT-04). Every submit carries a
// mandatory reason; the server writes before/after + reason to audit_log
// and refuses outright when the lot's business_date is locked (423).
export function LotEditForm({
  lotId,
  currentItem,
  currentPackageCount,
}: {
  lotId: string;
  currentItem: string;
  currentPackageCount: number;
}) {
  const t = useT();
  const router = useRouter();
  const [field, setField] = useState<EditableField>("item");
  const [newValue, setNewValue] = useState(currentItem);
  const [reason, setReason] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [errorKey, setErrorKey] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  function handleFieldChange(next: EditableField) {
    setField(next);
    setNewValue(next === "item" ? currentItem : String(currentPackageCount));
    setSuccess(false);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setErrorKey(null);
    setSuccess(false);

    try {
      const response = await fetch(`/api/lots/${lotId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          field,
          newValue: field === "package_count" ? Number(newValue) : newValue,
          reason,
        }),
      });
      const body = await response.json();

      if (!response.ok) {
        setErrorKey(ERROR_KEYS[body.error] ?? "lots.edit.error.network");
        setSubmitting(false);
        return;
      }
      setSuccess(true);
      setReason("");
      setSubmitting(false);
      router.refresh();
    } catch {
      setErrorKey("lots.edit.error.network");
      setSubmitting(false);
    }
  }

  // No card of its own -- the caller supplies the SectionCard this sits in,
  // so a `cds-card` here would put a box inside a box.
  return (
    <form onSubmit={handleSubmit} className="max-w-md space-y-3">
      <div>
        <label htmlFor="edit-field" className="cds-field__label">
          {t("lots.edit.fieldLabel")}
        </label>
        <select
          id="edit-field"
          value={field}
          onChange={(e) => handleFieldChange(e.target.value as EditableField)}
          disabled={submitting}
          className="cds-select--native mt-1 w-full"
        >
          <option value="item">{t("lots.edit.fieldOption.item")}</option>
          <option value="package_count">{t("lots.edit.fieldOption.packageCount")}</option>
        </select>
      </div>
      <div>
        <label htmlFor="edit-new-value" className="cds-field__label">
          {t("lots.edit.newValueLabel")}
        </label>
        <input
          id="edit-new-value"
          type={field === "package_count" ? "number" : "text"}
          min={field === "package_count" ? 1 : undefined}
          required
          value={newValue}
          onChange={(e) => setNewValue(e.target.value)}
          disabled={submitting}
          className="cds-input--native mt-1 w-full"
        />
      </div>
      <div>
        <label htmlFor="edit-reason" className="cds-field__label">
          {t("lots.edit.reasonLabel")}
        </label>
        <input
          id="edit-reason"
          type="text"
          required
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          disabled={submitting}
          className="cds-input--native mt-1 w-full"
        />
      </div>
      {errorKey && (
        <p role="alert" className="cds-field__msg cds-field__msg--error">
          {t(errorKey)}
        </p>
      )}
      {success && <p className="cds-field__msg cds-field__msg--hint text-ok">{t("lots.edit.success")}</p>}
      <button
        type="submit"
        disabled={submitting}
        aria-busy={submitting}
        className="cds-btn cds-btn--md"
      >
        {submitting ? t("lots.edit.submitting") : t("lots.edit.submit")}
      </button>
    </form>
  );
}
