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

  return (
    <form onSubmit={handleSubmit} className="max-w-md space-y-3 rounded-md border border-zinc-200 p-4">
      <div>
        <label htmlFor="edit-field" className="block text-sm font-medium text-zinc-700">
          {t("lots.edit.fieldLabel")}
        </label>
        <select
          id="edit-field"
          value={field}
          onChange={(e) => handleFieldChange(e.target.value as EditableField)}
          disabled={submitting}
          className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 text-sm"
        >
          <option value="item">{t("lots.edit.fieldOption.item")}</option>
          <option value="package_count">{t("lots.edit.fieldOption.packageCount")}</option>
        </select>
      </div>
      <div>
        <label htmlFor="edit-new-value" className="block text-sm font-medium text-zinc-700">
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
          className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 text-sm"
        />
      </div>
      <div>
        <label htmlFor="edit-reason" className="block text-sm font-medium text-zinc-700">
          {t("lots.edit.reasonLabel")}
        </label>
        <input
          id="edit-reason"
          type="text"
          required
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          disabled={submitting}
          className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 text-sm"
        />
      </div>
      {errorKey && (
        <p role="alert" className="text-sm text-red-600">
          {t(errorKey)}
        </p>
      )}
      {success && <p className="text-sm text-emerald-700">{t("lots.edit.success")}</p>}
      <button
        type="submit"
        disabled={submitting}
        aria-busy={submitting}
        className="rounded-md bg-zinc-900 px-3 py-2 text-sm font-medium text-white hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {submitting ? t("lots.edit.submitting") : t("lots.edit.submit")}
      </button>
    </form>
  );
}
