"use client";

import { useT } from "@/lib/i18n/i18n-provider";

// Nearly everything in this system keys off the current JST business day and
// whether it is already locked -- a locked day changes what every write
// screen will accept. Surfacing it here means a user never has to navigate
// to /reconciliation just to find that out. `businessDate`/`locked` are
// resolved server-side (todayJst() + loadLockStatus()) and passed in as
// props -- this component only renders them.
export function BusinessDayIndicator({ businessDate, locked }: { businessDate: string; locked: boolean }) {
  const t = useT();

  return (
    <div className="flex items-center gap-2 text-sm">
      <span className="text-zinc-500">{t("header.businessDateLabel")}</span>
      <span className="font-mono font-medium text-zinc-900">{businessDate}</span>
      <span
        className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
          locked ? "bg-zinc-900 text-white" : "bg-zinc-100 text-zinc-600"
        }`}
      >
        {t(locked ? "home.stage.lockedYes" : "home.stage.lockedNo")}
      </span>
    </div>
  );
}
