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

  // Locked maps to the `stop` tone (status-overdue = blocked): a locked day
  // REFUSES writes, so it must read as an obstruction, not as "finished".
  // Unlocked maps to `ok` (status-occupied = active): the day accepts writes.
  // The word itself is always rendered -- colour only reinforces it.
  return (
    <div className="flex items-center gap-2 text-sm">
      <span className="text-muted">{t("header.businessDateLabel")}</span>
      <span className="sm-mono font-medium text-strong">{businessDate}</span>
      <span className={`sm-badge font-semibold ${locked ? "sm-tone-stop" : "sm-tone-ok"}`}>
        {t(locked ? "home.stage.lockedYes" : "home.stage.lockedNo")}
      </span>
    </div>
  );
}
