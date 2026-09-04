"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useT } from "@/lib/i18n/i18n-provider";
import { PARTICIPANT_CATEGORIES } from "@/lib/participants/category-rules";
import { PARTICIPANT_STATUSES } from "@/lib/participants/state-machine";

// SCR002 filter bar. Reads/writes the `category`/`status` query params so the
// page's own Server Component re-fetches with the new filter on navigation.
export function ParticipantFilters({
  category,
  status,
}: {
  category?: string;
  status?: string;
}) {
  const t = useT();
  const router = useRouter();
  const searchParams = useSearchParams();

  function updateFilter(key: "category" | "status", value: string) {
    const next = new URLSearchParams(searchParams.toString());
    if (value) {
      next.set(key, value);
    } else {
      next.delete(key);
    }
    const queryString = next.toString();
    router.push(queryString ? `/participants?${queryString}` : "/participants");
  }

  return (
    <div className="flex flex-wrap gap-4">
      <label className="flex flex-col text-sm text-zinc-700">
        {t("participants.list.filterCategoryLabel")}
        <select
          value={category ?? ""}
          onChange={(event) => updateFilter("category", event.target.value)}
          className="mt-1 rounded-md border border-zinc-300 px-3 py-2 text-sm focus:border-zinc-500 focus:outline-none"
        >
          <option value="">{t("participants.list.filterAllCategories")}</option>
          {PARTICIPANT_CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {t(`category.${c}`)}
            </option>
          ))}
        </select>
      </label>
      <label className="flex flex-col text-sm text-zinc-700">
        {t("participants.list.filterStatusLabel")}
        <select
          value={status ?? ""}
          onChange={(event) => updateFilter("status", event.target.value)}
          className="mt-1 rounded-md border border-zinc-300 px-3 py-2 text-sm focus:border-zinc-500 focus:outline-none"
        >
          <option value="">{t("participants.list.filterAllStatuses")}</option>
          {PARTICIPANT_STATUSES.map((s) => (
            <option key={s} value={s}>
              {t(`status.${s}`)}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
