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
    return <p className="text-sm text-zinc-500">{dict["participants.list.empty"]}</p>;
  }

  return (
    <table className="w-full border-collapse text-sm">
      <thead>
        <tr className="border-b border-zinc-200 text-left text-zinc-500">
          <th className="py-2 pr-4 font-medium">{dict["participants.list.tableHeaderName"]}</th>
          <th className="py-2 pr-4 font-medium">{dict["participants.list.tableHeaderCategory"]}</th>
          <th className="py-2 pr-4 font-medium">{dict["participants.list.tableHeaderLicenseType"]}</th>
          <th className="py-2 pr-4 font-medium">{dict["participants.list.tableHeaderStatus"]}</th>
          <th className="py-2 pr-4 font-medium">{dict["participants.list.tableHeaderValidFrom"]}</th>
          <th className="py-2 pr-4 font-medium">{dict["participants.list.tableHeaderValidTo"]}</th>
        </tr>
      </thead>
      <tbody>
        {participants.map((p) => (
          <tr key={p.id} className="border-b border-zinc-100 hover:bg-zinc-50">
            <td className="py-2 pr-4">
              <Link href={`/participants/${p.id}`} className="font-medium text-zinc-900 hover:underline">
                {p.name}
              </Link>
            </td>
            <td className="py-2 pr-4">{dict[`category.${p.category}`] ?? p.category}</td>
            <td className="py-2 pr-4">{dict[`licenseType.${p.license_type}`] ?? p.license_type}</td>
            <td className="py-2 pr-4">
              <EligibilityStatusBadge status={p.status} label={dict[`status.${p.status}`] ?? p.status} />
            </td>
            <td className="py-2 pr-4">{p.valid_from}</td>
            <td className="py-2 pr-4">{p.valid_to ?? dict["participants.detail.validToNone"]}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
