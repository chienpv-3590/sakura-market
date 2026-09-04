import type { Json } from "@/lib/db/types";

/**
 * Every audit_log before/after snapshot this feature writes is a plain
 * object of primitive (string/number/boolean/null) fields -- always safe as
 * `Json`. Centralized here once so every call site (create/update/transition
 * routes) doesn't repeat the same `as unknown as Json` justification.
 * Takes `unknown` on purpose: it accepts any already-typed Supabase row or
 * hand-built snapshot object without fighting structural index-signature
 * checks at the call site.
 */
export function toAuditSnapshot(row: unknown): Json {
  return row as Json;
}
