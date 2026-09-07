// Shown on both SCR019 (catalog row) and SCR020 (viewer) for any of the 9
// reports not built for real in this prototype (functional-spec §3 Open
// Decision) -- never blurred in with the 3 real ones (Risk Assessment).
//
// `wait` tone (status-vacant): the report exists but is not yet backed by
// real data -- pending, not broken. The label is always rendered.
export function MockDataBadge({ label }: { label: string }) {
  return <span className="cds-statusbadge cds-statusbadge--warn">{label}</span>;
}
