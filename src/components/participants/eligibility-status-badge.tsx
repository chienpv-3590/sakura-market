// SM-001 status -> Tailwind color mapping. Pure/presentational: works in
// both Server and Client Components (no "use client", no hooks) since the
// translated label is passed in by the caller.
const STATUS_COLORS: Record<string, string> = {
  "có hiệu lực": "bg-green-100 text-green-800",
  "tạm ngừng": "bg-amber-100 text-amber-800",
  "mất hiệu lực": "bg-red-100 text-red-800",
  "xét lại": "bg-blue-100 text-blue-800",
};

export function EligibilityStatusBadge({
  status,
  label,
}: {
  status: string;
  label: string;
}) {
  const colorClass = STATUS_COLORS[status] ?? "bg-zinc-100 text-zinc-800";
  return (
    <span className={`inline-block rounded-full px-2 py-1 text-xs font-medium ${colorClass}`}>
      {label}
    </span>
  );
}
