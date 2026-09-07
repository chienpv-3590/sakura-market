// Shown on both SCR019 (catalog row) and SCR020 (viewer) for any of the 9
// reports not built for real in this prototype (functional-spec §3 Open
// Decision) -- never blurred in with the 3 real ones (Risk Assessment).
export function MockDataBadge({ label }: { label: string }) {
  return (
    <span className="inline-block rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-800">
      {label}
    </span>
  );
}
