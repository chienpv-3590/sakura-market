import { StatusBadge } from "@/components/ui/status-badge";

/**
 * SM-001 participant eligibility badge. Kept as a named component because the
 * participant screens read better with the domain name, but the tone mapping
 * itself lives once in components/ui/status-tone.ts alongside every other
 * status in the app.
 */
export function EligibilityStatusBadge({ status, label }: { status: string; label: string }) {
  return <StatusBadge status={status} label={label} />;
}
