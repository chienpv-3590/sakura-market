import Link from "next/link";
import type { Tables } from "@/lib/db/types";
import { EligibilityStatusBadge } from "./eligibility-status-badge";

type ParticipantRow = Tables<"participant">;

// SCR002 table. Plain `<table>` per phase-05 Implementation Steps #7 ("Không
// cần thư viện table"). Server Component: receives the already-loaded
// dictionary instead of calling useT(), so it needs no "use client".
export function ParticipantTable({
  participants,
  dict,
}: {
  participants: ParticipantRow[];
  dict: Record<string, string>;
}) {
  if (participants.length === 0) {
    return <p className="sm-empty">{dict["participants.list.empty"]}</p>;
  }

  return (
    <div className="sm-table-wrap sm-table-scroll">
      <table className="sm-table">
        <thead>
          <tr>
            <th>{dict["participants.list.tableHeaderName"]}</th>
            <th>{dict["participants.list.tableHeaderCategory"]}</th>
            <th>{dict["participants.list.tableHeaderLicenseType"]}</th>
            <th>{dict["participants.list.tableHeaderStatus"]}</th>
            <th>{dict["participants.list.tableHeaderValidFrom"]}</th>
            <th>{dict["participants.list.tableHeaderValidTo"]}</th>
          </tr>
        </thead>
        <tbody>
          {participants.map((p) => (
            <tr key={p.id}>
              <td>
                <Link href={`/participants/${p.id}`} className="font-medium text-strong hover:underline">
                  {p.name}
                </Link>
              </td>
              <td>{dict[`category.${p.category}`] ?? p.category}</td>
              <td>{dict[`licenseType.${p.license_type}`] ?? p.license_type}</td>
              <td>
                <EligibilityStatusBadge status={p.status} label={dict[`status.${p.status}`] ?? p.status} />
              </td>
              <td className="sm-mono">{p.valid_from}</td>
              <td className="sm-mono">{p.valid_to ?? dict["participants.detail.validToNone"]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
