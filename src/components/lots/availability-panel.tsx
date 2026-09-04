"use client";

import { useT } from "@/lib/i18n/i18n-provider";
import type { LotAuditRow } from "@/lib/lots/lot-queries";

// SCR006_LotDetail / REG-AVAILABILITY: read-only. Renders available_qty +
// initial_qty + status, then the lot's audit_log trail as its history --
// deliberately no separate history table (DRY, phase-06 step 9).
export function AvailabilityPanel({
  availableQty,
  initialQty,
  status,
  history,
}: {
  availableQty: number;
  initialQty: number;
  status: string;
  history: LotAuditRow[];
}) {
  const t = useT();

  return (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold text-zinc-900">{t("lots.detail.availabilityTitle")}</h2>
      <dl className="grid grid-cols-2 gap-4 text-sm sm:grid-cols-3">
        <div>
          <dt className="text-zinc-500">{t("lots.detail.availableQtyLabel")}</dt>
          <dd className="text-xl font-semibold text-zinc-900">{availableQty}</dd>
        </div>
        <div>
          <dt className="text-zinc-500">{t("lots.detail.initialQtyLabel")}</dt>
          <dd className="text-xl font-semibold text-zinc-900">{initialQty}</dd>
        </div>
        <div>
          <dt className="text-zinc-500">{t("lots.detail.statusLabel")}</dt>
          <dd className="text-xl font-semibold text-zinc-900">{t(`lots.status.${status}`, status)}</dd>
        </div>
      </dl>
      <div>
        <h3 className="text-sm font-medium uppercase tracking-wide text-zinc-500">
          {t("lots.detail.historyTitle")}
        </h3>
        {history.length === 0 ? (
          <p className="mt-2 text-sm text-zinc-500">{t("lots.detail.historyEmpty")}</p>
        ) : (
          <table className="mt-2 w-full text-left text-sm">
            <thead>
              <tr className="border-b border-zinc-200 text-zinc-500">
                <th className="py-1 pr-2">{t("lots.detail.historyColumns.action")}</th>
                <th className="py-1 pr-2">{t("lots.detail.historyColumns.before")}</th>
                <th className="py-1 pr-2">{t("lots.detail.historyColumns.after")}</th>
                <th className="py-1 pr-2">{t("lots.detail.historyColumns.reason")}</th>
                <th className="py-1 pr-2">{t("lots.detail.historyColumns.at")}</th>
              </tr>
            </thead>
            <tbody>
              {history.map((row) => (
                <tr key={row.id} className="border-b border-zinc-100 align-top">
                  <td className="py-1 pr-2">{row.action}</td>
                  <td className="py-1 pr-2 font-mono text-xs">{JSON.stringify(row.before)}</td>
                  <td className="py-1 pr-2 font-mono text-xs">{JSON.stringify(row.after)}</td>
                  <td className="py-1 pr-2">{row.reason ?? "—"}</td>
                  <td className="py-1 pr-2">{new Date(row.created_at).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
}
