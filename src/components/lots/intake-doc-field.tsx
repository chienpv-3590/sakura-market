"use client";

import { useState } from "react";
import { useT } from "@/lib/i18n/i18n-provider";

const INTAKE_DOC_ACCEPT = "image/jpeg,image/png,image/webp,application/pdf";

/**
 * FR-LOT-01 chứng từ tiếp nhận: a real file input, 0+ files, optional (see
 * lot-intake-form.tsx's own note on why it isn't required). Keyboard-operable
 * like every other field on SCR004 -- Tab focuses it, Space/Enter opens the
 * OS picker (keyboard-operable-form.tsx explicitly excludes this input type
 * from its Enter-submits hijack so that stays true).
 *
 * Owns its own "N file đã chọn" hint state so the parent form doesn't need a
 * second, parallel piece of state just to render that one line -- the actual
 * FileList travels via `new FormData(formElement)` at submit time, not
 * through this state at all.
 */
export function IntakeDocField({ tabIndex, disabled }: { tabIndex: number; disabled: boolean }) {
  const t = useT();
  const [fileCount, setFileCount] = useState(0);

  return (
    <div>
      <label htmlFor="intakeDocs" className="cds-field__label">
        {t("lots.intake.intakeDocsLabel")}
      </label>
      <input
        id="intakeDocs"
        name="intakeDocs"
        type="file"
        accept={INTAKE_DOC_ACCEPT}
        multiple
        tabIndex={tabIndex}
        onChange={(e) => setFileCount(e.target.files?.length ?? 0)}
        disabled={disabled}
        className="cds-input--native mt-1 w-full"
      />
      <p className="cds-field__msg cds-field__msg--hint mt-1">
        {t("lots.intake.intakeDocsHint")}
        {fileCount > 0 && ` — ${t("lots.intake.intakeDocsSelected").replace("{n}", String(fileCount))}`}
      </p>
    </div>
  );
}
