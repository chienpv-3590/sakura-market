"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Locale } from "@/lib/i18n/config";
import { useI18n, useT } from "@/lib/i18n/i18n-provider";

export function LocaleSwitcher() {
  const { locale } = useI18n();
  const t = useT();
  const router = useRouter();
  const [pending, setPending] = useState(false);

  async function switchTo(next: Locale) {
    if (next === locale || pending) return;
    setPending(true);
    try {
      const response = await fetch("/api/locale", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ locale: next }),
      });
      if (!response.ok) {
        throw new Error(`Locale update failed with status ${response.status}`);
      }
      router.refresh();
    } catch (error) {
      // Locale switching is a UX nicety, not a critical path — log and let
      // the user retry rather than crashing the header.
      console.error("Failed to switch locale", error);
    } finally {
      setPending(false);
    }
  }

  return (
    // .cds-btngroup is the design system's segmented control. The pressed
    // segment is fill + --color-primary + bold weight, plus a 1px cacao
    // hairline drawn by ::after, so the selection survives a monochrome or
    // colour-blind read. aria-pressed carries it for AT.
    <div
      className={`cds-btngroup cds-btngroup--sm ${pending ? "cds-btngroup--disabled" : ""}`}
      role="group"
      aria-label={t("action.switchLocale")}
    >
      <button
        type="button"
        className="cds-btngroup__item"
        onClick={() => switchTo("vi")}
        disabled={pending}
        aria-pressed={locale === "vi"}
      >
        VI
      </button>
      <button
        type="button"
        className="cds-btngroup__item"
        onClick={() => switchTo("ja")}
        disabled={pending}
        aria-pressed={locale === "ja"}
      >
        JA
      </button>
    </div>
  );
}
