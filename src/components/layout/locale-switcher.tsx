"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Locale } from "@/lib/i18n/config";
import { useI18n } from "@/lib/i18n/i18n-provider";

export function LocaleSwitcher() {
  const { locale } = useI18n();
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
    <div className="flex items-center gap-1 rounded-md border border-zinc-200 p-1 text-sm">
      <button
        type="button"
        onClick={() => switchTo("vi")}
        disabled={pending}
        aria-pressed={locale === "vi"}
        className={`rounded px-2 py-1 font-medium ${
          locale === "vi" ? "bg-zinc-900 text-white" : "text-zinc-600 hover:bg-zinc-100"
        }`}
      >
        VI
      </button>
      <button
        type="button"
        onClick={() => switchTo("ja")}
        disabled={pending}
        aria-pressed={locale === "ja"}
        className={`rounded px-2 py-1 font-medium ${
          locale === "ja" ? "bg-zinc-900 text-white" : "text-zinc-600 hover:bg-zinc-100"
        }`}
      >
        JA
      </button>
    </div>
  );
}
