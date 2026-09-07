"use client";

import { useT } from "@/lib/i18n/i18n-provider";
import type { LotAuditRow } from "@/lib/lots/lot-queries";
import { AuditDiff } from "@/components/audit/audit-diff";
import { LOT_FIELD_LABELS, LOT_CREATE_FIELDS } from "@/components/audit/audit-field-maps";
import { StatusBadge } from "@/components/ui/status-badge";

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
      <h2 className="text-lg font-semibold text-strong">{t("lots.detail.availabilityTitle")}</h2>
      <dl className="grid grid-cols-2 gap-4 text-sm sm:grid-cols-3">
        <div>
          <dt className="text-muted">{t("lots.detail.availableQtyLabel")}</dt>
          <dd className="sm-num mt-1 text-left text-xl font-bold text-strong">{availableQty}</dd>
        </div>
        <div>
          <dt className="text-muted">{t("lots.detail.initialQtyLabel")}</dt>
          <dd className="sm-num mt-1 text-left text-xl font-bold text-strong">{initialQty}</dd>
        </div>
        <div>
          <dt className="text-muted">{t("lots.detail.statusLabel")}</dt>
          <dd className="mt-1">
            <StatusBadge status={status} label={t(`lots.status.${status}`, status)} />
          </dd>
        </div>
      </dl>
      <div>
        <h3 className="text-sm font-medium uppercase tracking-wide text-muted">
          {t("lots.detail.historyTitle")}
        </h3>
        {history.length === 0 ? (
          <p className="sm-empty">{t("lots.detail.historyEmpty")}</p>
        ) : (
          <div className="sm-table-wrap sm-table-scroll">
            <table className="sm-table">
              <thead>
                <tr>
                  <th>{t("lots.detail.historyColumns.action")}</th>
                  <th>{t("lots.detail.historyColumns.change")}</th>
                  <th>{t("lots.detail.historyColumns.reason")}</th>
                  <th>{t("lots.detail.historyColumns.at")}</th>
                </tr>
              </thead>
              <tbody>
                {history.map((row) => (
                  <tr key={row.id} className="align-top">
                    <td className="sm-mono">
                      {t(`lots.action.${row.action}`, row.action)}
                    </td>
                    <td>
                      <AuditDiff
                        before={row.before}
                        after={row.after}
                        fieldLabels={LOT_FIELD_LABELS}
                        statusPrefix="lots.status."
                        createFields={LOT_CREATE_FIELDS}
                      />
                    </td>
                    <td>{row.reason ?? "—"}</td>
                    <td className="sm-mono">
                      {new Date(row.created_at).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}
