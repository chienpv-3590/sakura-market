"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { useT } from "@/lib/i18n/i18n-provider";
import {
  PARTICIPANT_CATEGORIES,
  requiredLicenseType,
  type ParticipantCategory,
} from "@/lib/participants/category-rules";
import { TextField } from "./text-field";

type Mode = "create" | "edit";

export interface ParticipantFormInitial {
  id: string;
  category: ParticipantCategory;
  name: string;
  validFrom: string;
  validTo: string | null;
}

// A1 (create) + A2 (edit) share one form. `license_type` is never a free
// choice in this UI -- category determines it 1:1 (category-rules.ts), so it
// is shown read-only and derived, never editable. `category` itself is only
// selectable in create mode; edit mode shows it locked (US001: "category
// bất biến sau khi tạo").
export function ParticipantForm({ mode, initial }: { mode: Mode; initial?: ParticipantFormInitial }) {
  const t = useT();
  const router = useRouter();
  const [category, setCategory] = useState<ParticipantCategory>(
    initial?.category ?? PARTICIPANT_CATEGORIES[0],
  );
  const [name, setName] = useState(initial?.name ?? "");
  const [validFrom, setValidFrom] = useState(initial?.validFrom ?? "");
  const [validTo, setValidTo] = useState(initial?.validTo ?? "");
  const [reason, setReason] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const licenseType = requiredLicenseType(category);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setError(null);

    const url = mode === "create" ? "/api/participants" : `/api/participants/${initial?.id}`;
    const method = mode === "create" ? "POST" : "PATCH";
    const body =
      mode === "create"
        ? { category, name: name.trim(), license_type: licenseType, valid_from: validFrom, valid_to: validTo || null }
        : {
            name: name.trim(),
            license_type: licenseType,
            valid_from: validFrom,
            valid_to: validTo || null,
            reason: reason.trim(),
          };

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!response.ok) {
        setError(t("participants.form.error.generic"));
        setSubmitting(false);
        return;
      }
      const saved: { id: string } = await response.json();
      router.push(`/participants/${mode === "create" ? saved.id : initial?.id}`);
      router.refresh();
    } catch {
      setError(t("participants.form.error.generic"));
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-lg space-y-4">
      <div>
        <label className="cds-field__label">{t("participants.form.categoryLabel")}</label>
        {mode === "create" ? (
          <select
            value={category}
            onChange={(event) => setCategory(event.target.value as ParticipantCategory)}
            className="cds-select--native mt-1 w-full"
          >
            {PARTICIPANT_CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {t(`category.${c}`)}
              </option>
            ))}
          </select>
        ) : (
          <p className="cds-input--native cds-input--readonly mt-1">
            {t(`category.${category}`)} — {t("participants.form.categoryLockedHint")}
          </p>
        )}
      </div>
      <div>
        <label className="cds-field__label">
          {t("participants.form.licenseTypeLabel")}
        </label>
        <p className="cds-input--native cds-input--readonly mt-1">
          {t(`licenseType.${licenseType}`)}
        </p>
        <p className="cds-field__msg cds-field__msg--hint mt-1">{t("participants.form.licenseTypeAutoHint")}</p>
      </div>
      <TextField
        id="participant-name"
        label={t("participants.form.nameLabel")}
        value={name}
        onChange={(event) => setName(event.target.value)}
        required
        disabled={submitting}
      />
      <div className="flex gap-4">
        <div className="flex-1">
          <TextField
            id="participant-valid-from"
            type="date"
            label={t("participants.form.validFromLabel")}
            value={validFrom}
            onChange={(event) => setValidFrom(event.target.value)}
            required
            disabled={submitting}
          />
        </div>
        <div className="flex-1">
          <TextField
            id="participant-valid-to"
            type="date"
            label={t("participants.form.validToLabel")}
            value={validTo ?? ""}
            onChange={(event) => setValidTo(event.target.value)}
            disabled={submitting}
          />
          <p className="cds-field__msg cds-field__msg--hint mt-1">{t("participants.form.validToOptional")}</p>
        </div>
      </div>
      {mode === "edit" && (
        <TextField
          id="participant-reason"
          label={t("participants.form.reasonLabel")}
          value={reason}
          onChange={(event) => setReason(event.target.value)}
          required
          disabled={submitting}
          placeholder={t("participants.form.reasonPlaceholder")}
        />
      )}
      {error && (
        <p role="alert" className="cds-field__msg cds-field__msg--error">
          {error}
        </p>
      )}
      <button
        type="submit"
        disabled={submitting}
        aria-busy={submitting}
        className="cds-btn cds-btn--md"
      >
        {submitting
          ? t("participants.form.submitting")
          : mode === "create"
            ? t("participants.form.submitCreate")
            : t("participants.form.submitUpdate")}
      </button>
    </form>
  );
}
