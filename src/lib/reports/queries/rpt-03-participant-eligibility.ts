import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/lib/db/types";
import { todayJst, toJstDate } from "@/lib/db/business-date";
import type { ReportRow } from "../report-row";

// RFP §08-02 TBL-REPORT-01 gives RPT-03 no threshold for "sắp mất hiệu lực",
// and SC-07 (the dedicated lapse-warning screen) is out of scope, so no prior
// number was ever chosen either. 30 days is this phase's own working
// assumption, kept as one named constant so a real number from the customer
// (phase-06 §Next Steps) is a one-line change, never a code search.
export const EXPIRY_WARNING_DAYS = 30;

const ACTIVE_STATUS = "có hiệu lực";

interface ParticipantRow {
  id: string;
  category: string;
  name: string;
  license_type: string;
  status: string;
  valid_from: string;
  valid_to: string | null;
}

interface HistoryRow {
  participant_id: string;
  from_status: string | null;
  to_status: string;
  reason: string;
  changed_by: string | null;
  changed_at: string;
}

/** Calendar-day difference `to - from`, both "YYYY-MM-DD" strings -- deliberately no `new Date()` "now" call, only arithmetic on already-resolved JST date strings. */
function daysBetween(fromDate: string, toDate: string): number {
  const [fy, fm, fd] = fromDate.split("-").map(Number);
  const [ty, tm, td] = toDate.split("-").map(Number);
  const fromUtc = Date.UTC(fy, fm - 1, fd);
  const toUtc = Date.UTC(ty, tm - 1, td);
  return Math.round((toUtc - fromUtc) / 86_400_000);
}

/** `today + days`, formatted "YYYY-MM-DD" via the same `toJstDate` every write path uses -- UTC-midnight input keeps the JST-formatted calendar date from rolling over (JST is always UTC+9, never behind). */
function addDays(dateStr: string, days: number): string {
  const [y, m, d] = dateStr.split("-").map(Number);
  return toJstDate(new Date(Date.UTC(y, m - 1, d + days)));
}

/**
 * RPT-03 "Danh sách người tham gia đã hoặc sắp mất hiệu lực" (phase-04
 * §Architecture). With neither filter given, the result is "not currently
 * `có hiệu lực`" UNION "`có hiệu lực` but `valid_to` falls within
 * EXPIRY_WARNING_DAYS" -- a direct `participantId`/`eligibilityStatus` filter
 * bypasses that compound rule and behaves like every other report's plain
 * `.eq()` filter (phase-04 Success Criteria #4 only specifies the no-filter
 * shape).
 */
export async function loadParticipantEligibilityRows(
  client: SupabaseClient<Database>,
  participantId: string | undefined,
  eligibilityStatus: string | undefined,
): Promise<ReportRow[]> {
  let query = client.from("participant").select("id, category, name, license_type, status, valid_from, valid_to");
  if (participantId) query = query.eq("id", participantId);
  if (eligibilityStatus) query = query.eq("status", eligibilityStatus);

  const { data, error } = await query;
  if (error) throw new Error(`loadParticipantEligibilityRows: participant lookup failed: ${error.message}`);
  let participants = (data ?? []) as ParticipantRow[];

  if (!participantId && !eligibilityStatus) {
    const warningCutoff = addDays(todayJst(), EXPIRY_WARNING_DAYS);
    participants = participants.filter(
      (p) => p.status !== ACTIVE_STATUS || (p.valid_to !== null && p.valid_to <= warningCutoff),
    );
  }

  const participantIds = participants.map((p) => p.id);
  const { data: historyData, error: historyError } =
    participantIds.length > 0
      ? await client
          .from("participant_status_history")
          .select("participant_id, from_status, to_status, reason, changed_by, changed_at")
          .in("participant_id", participantIds)
      : { data: [] as HistoryRow[], error: null };
  if (historyError) throw new Error(`loadParticipantEligibilityRows: history lookup failed: ${historyError.message}`);

  const latestHistoryByParticipant = new Map<string, HistoryRow>();
  for (const h of [...(historyData ?? [])].sort((a, b) => a.changed_at.localeCompare(b.changed_at))) {
    latestHistoryByParticipant.set(h.participant_id, h);
  }

  const actorIds = Array.from(
    new Set((historyData ?? []).map((h) => h.changed_by).filter((id): id is string => id !== null)),
  );
  const { data: actors } =
    actorIds.length > 0
      ? await client.from("app_user").select("id, display_name, email").in("id", actorIds)
      : { data: [] as { id: string; display_name: string | null; email: string }[] };
  const actorNameById = new Map((actors ?? []).map((a) => [a.id, a.display_name ?? a.email]));

  const today = todayJst();
  const rows: ReportRow[] = participants.map((p) => {
    const history = latestHistoryByParticipant.get(p.id);
    return {
      participantId: p.id,
      participantName: p.name,
      category: p.category,
      licenseType: p.license_type,
      status: p.status,
      validFrom: p.valid_from,
      validTo: p.valid_to,
      daysUntilExpiry: p.valid_to !== null ? daysBetween(today, p.valid_to) : null,
      lastTransitionFrom: history?.from_status ?? null,
      lastTransitionTo: history?.to_status ?? null,
      lastTransitionReason: history?.reason ?? null,
      lastTransitionBy: history?.changed_by ? (actorNameById.get(history.changed_by) ?? history.changed_by) : null,
      lastTransitionAt: history?.changed_at ?? null,
    };
  });

  rows.sort((a, b) => {
    const aDays = a.daysUntilExpiry === null ? Number.POSITIVE_INFINITY : (a.daysUntilExpiry as number);
    const bDays = b.daysUntilExpiry === null ? Number.POSITIVE_INFINITY : (b.daysUntilExpiry as number);
    return aDays !== bDays ? aDays - bDays : String(a.participantName).localeCompare(String(b.participantName));
  });
  return rows;
}
