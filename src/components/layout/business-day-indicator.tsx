"use client";

import { useT } from "@/lib/i18n/i18n-provider";
import { StatusBadge } from "@/components/ui/status-badge";

// Nearly everything in this system keys off the current JST business day and
// whether it is already locked -- a locked day changes what every write
// screen will accept. Surfacing it in the topheader means a user never has to
// navigate to /reconciliation just to find that out. `businessDate`/`locked`
// are resolved server-side (todayJst() + loadLockStatus()) and passed in as
// props -- this component only renders them.
//
// The lock goes through the SAME StatusBadge and the SAME status-tone map as
// every other state in the app, so "locked" is the identical colour and shape
// here, on the dashboard tile and on /reconciliation. `locked` maps to the
// design system's `error` tone (--status-overdue): a locked day REFUSES
// writes, so it must read as an obstruction, never as "finished". The word is
// always rendered; colour only reinforces it.
export function BusinessDayIndicator({
  businessDate,
  locked,
}: {
  businessDate: string;
  locked: boolean;
}) {
  const t = useT();
  const status = locked ? "day_locked" : "day_open";

  return (
    <div className="flex shrink-0 items-center gap-2">
      <span className="cds-topheader__role hidden lg:inline">
        {t("header.businessDateLabel")}
      </span>
      <span className="cds-table__mono hidden text-[13px] text-body lg:inline">
        {businessDate}
      </span>
      <StatusBadge
        status={status}
        label={t(locked ? "home.stage.lockedYes" : "home.stage.lockedNo")}
      />
    </div>
  );
}
