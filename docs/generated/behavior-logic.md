---
authored_by: rebuild-spec
---
<!-- layout-exempt: rebuild-spec owns all docs/system|features|generated|flows paths — all references here are output targets or internal definitions -->
# Behavior Logic

**Project**: Sakura Market (産地市場)
**Generated**: 2026-09-08
**Analysis Scope**: Full `src/` tree — scout-driven Background Logic Source Inventory (server-side scheduled/async execution) plus a direct search for client-side interaction patterns (debounce, optimistic UI, polling, upload progress, realtime).

**Code Format**: All codes follow `BL###_NameSlug` format.

**Behavior Logic Types** (canonical 10 — language-neutral): `scheduled-job`, `queue-worker`, `event-listener`, `observer`, `mail`, `notification`, `middleware`, `custom-command`, `integration`, `webhook`.

**Note**: Auth/permission middleware is NOT included — see Permissions.md.

**Note**: Feature and UserStory mapping is managed in FeatureList.md and UserStories.md (not yet generated at time of writing — those are later-wave artifacts; see `## Cross-Reference Validation` below for status). This document contains behavior logic items without direct feature/story references.

---

## Headline Finding — this application has no background or scheduled execution

The scout Background Logic Source Inventory (`plans/260908-1408-rebuild-spec/artifacts/scout-report.md` § `Background Logic Source Inventory`, mirrored in `_scout-bl-inventory.md`) contains **exactly 2 entries**, both in one file, both DOM-level client listeners:

```
- src/components/layout/nav-shell.tsx:L29 — marker `addEventListener`
- src/components/layout/nav-shell.tsx:L32 — marker `EventListener`
```

Independently confirmed for this artifact: `grep -rEn "setInterval|cron\.schedule|Queue\(|Bull\(|celery|@Cron|@Scheduled"` against `src/` returns zero hits, and no `@Process()`, `IHostedService`, `BackgroundService`, or any other queue/scheduler marker from `bl-source-patterns.md`'s Mode B table appears anywhere in the tree. There is no `app/Jobs`, no `app/Console/Commands` with a `schedule()` registration, no worker process, no cron entry — nothing in this codebase runs on a timer or off a queue. Every code path that produces a report, an export, or a notification is invoked synchronously from a route handler or a server component in response to a human request.

This is load-bearing for the stated system objective **OBJ-04** (a same-day / within-15-minutes report). Per `docs/gia-dinh-tich-hop-ke-toan.md:66-74`, the accounting export flow is: a person opens the report screen and clicks a button (`src/components/accounting/create-export-batch-button.tsx`), which calls `POST /api/accounting/export-batches` (`src/app/api/accounting/export-batches/route.ts`) to create a batch, then the CSV is downloaded through a separate export endpoint. There is no SFTP push, no scheduled batch, no automatic API delivery — the doc states this plainly: *"phần 'tự động hoá xuất dữ liệu' — chính là phần OBJ-01/OBJ-04 kỳ vọng — chưa có gì được xây; RFP §08-03 để ngỏ đúng điểm này."* The code confirms the doc: OBJ-04 is not met by anything in this repository, because nothing in this repository runs unattended.

This is a factual absence, not a scan gap: an earlier scan in this project mis-scanned minified `.next/` build output and reported 1887 spurious markers; that bug has been fixed, and this run scoped strictly to `src/`.

---

## Behavior Logic Index

BA-first summary — one row per `BL###` item, banded by **Type**. `Payload` and `File Schema` are the
two columns BAs ask about most. Full source citations, module links, and the Cardinality Contract
that governs how these items are counted live in the **Dev Appendix** below.

### Type: event-listener

| Code | Name | Trigger | Payload | File Schema |
|------|------|---------|---------|--------------|
| BL001_StorageEventSubscribe | Nav-rail cross-tab sync — subscribe | Any mounted `NavShell` instance registers through `useSyncExternalStore`; on registration, `navStore.subscribe` attaches the listener | channel: browser `storage` DOM event, fired by another same-origin tab/window writing `localStorage["sakura.nav.expanded"]`; data: native `StorageEvent` fields (key/oldValue/newValue) are received but not read — the handler only triggers React to re-invoke `getSnapshot()`, which re-reads the key itself | N/A — not a file-exchange type |
| BL002_StorageEventUnsubscribe | Nav-rail cross-tab sync — unsubscribe | The cleanup function `subscribe` returns is invoked by React (component unmount, or before re-subscribing a new callback) | channel: same `storage` DOM event as BL001 — this entry is the listener teardown, not a new binding; data: none consumed | N/A — not a file-exchange type |

**No other Type band exists.** `scheduled-job`, `queue-worker`, `observer`, `mail`, `notification`, `middleware` (non-auth), `custom-command`, `integration`, and `webhook` each have **zero** matching inventory entries in this codebase — see Headline Finding above. Per template convention, an empty Type band is omitted rather than shown with a placeholder row.

---

## Dev Appendix

Source citations, module links, and the deterministic rules `validate_behavior_logic.py` enforces.
Every `BL###` heading below carries the same code as its Index row above.

### Cardinality Contract

Rules enforced by Wave 2b researcher and Wave 7a reviewer. Violations are critical.

- **Rule C1 — 1 BL per inventory entry**: Mode A stacks (folder convention): 1 file = 1 BL. Mode B stacks (annotation/decorator): 1 decorator hit = 1 BL (multiple hits in same file → multiple BL items). Aggregation is a critical violation.
- **Rule C2 — Source fields mandatory, single-valued**: Every BL item MUST include `**Source File**` (one relative path) and `**Source Symbol**` (one symbol). Multi-symbol forms forbidden. Both fields must match the scout inventory entry 1-to-1.
- **Rule C3 — Unmatched BL warning**: A BL item whose Source File does not appear in the scout inventory → warning unless justified.

**Applied to this artifact**: the scout inventory has 2 entries, both in `src/components/layout/nav-shell.tsx` (Mode B: 2 marker hits in one file → 2 BL items, per Rule C1). BL001 = L29 (`addEventListener`), BL002 = L32 (`removeEventListener`, matched by the `EventListener` substring marker). Both entries share the same containing method (`navStore.subscribe`) because line 32 is the unsubscribe closure that `subscribe` itself returns — there is no separate named symbol for it in the source. No aggregation was performed; no BL item was invented beyond these 2.

### Inclusion/Exclusion Matrix (scout-side filter)

| Include | Exclude |
|---------|---------|
| All files/symbols in scout `## Background Logic Source Inventory` | Abstract base classes, traits, interfaces |
| `[SIGNAL_INFERRED]`-tagged inventory entries (with justification) | Vendor overrides and third-party library subclasses |
| | `*Test.php`, `*Spec.rb`, `test_*.py`, `*.test.ts` and all test files |
| | Files < 10 LOC (scaffolding/stubs) |
| | Auth/ACL/OAuth/JWT middleware (→ Permissions.md) |

No `[SIGNAL_INFERRED]` entries in this codebase — both inventory entries matched the plain `addEventListener`/`EventListener` markers directly, no inference needed.

### Anti-Patterns: Aggregation Forbidden

Aggregating multiple source files into a single BL item violates Rule C1 and is flagged critical by the reviewer. Not applicable in practice here — both entries are already single-file, single-symbol, and are kept as 2 separate BL items rather than folded into one "nav sync" umbrella item.

---

## BL001_StorageEventSubscribe: Nav-rail cross-tab sync — subscribe

**Type**: event-listener
**Trigger**: `NavShell` (`src/components/layout/nav-shell.tsx:66-115`) calls `useSyncExternalStore(navStore.subscribe, navStore.getSnapshot, navStore.getServerSnapshot)` on render; React invokes `navStore.subscribe(onChange)` to register.
**Payload**: channel = browser `storage` DOM event, fired when any other same-origin tab/window writes to `localStorage` under key `sakura.nav.expanded`; data = native `StorageEvent` object is received but its fields are not read — `onChange` is React's internal re-render trigger, and the actual new value is re-read from `localStorage` by `getSnapshot()` (`nav-shell.tsx:37-44`), not taken from the event.
**File Schema**: N/A — not a file-exchange type.
**Source File**: `src/components/layout/nav-shell.tsx`
**Source Symbol**: `navStore.subscribe`

### Description

`navStore` (`nav-shell.tsx:27-56`) is a plain-object external store wrapping `window.localStorage`, used to keep the collapsible dark nav rail's expand/collapse state in sync when the same origin is open in two browser tabs. On `subscribe(onChange)`, line 29 attaches `window.addEventListener("storage", onChange)` and also registers `onChange` in an in-memory `Set` (`navStore.local`) so `write()` can notify same-tab listeners directly — the native `storage` event only fires in *other* tabs/windows, never the one that made the write, so the in-memory fan-out is what keeps the writing tab's own UI in sync. This is UI state only: no server round trip, no persisted entity, no other component in the tree depends on it beyond `NavShell`/`useNavState`.

### Related Modules

- `src/components/layout/nav-shell.tsx` (`navStore`, `NavShell`, `useNavState`)

### Related Routes

- None — pure client-side Web Storage API usage, no network request.

### Related Data Models

- None — state lives in browser `localStorage["sakura.nav.expanded"]`, not in any `MODEL###` entity in `data-model.md`.

---

## BL002_StorageEventUnsubscribe: Nav-rail cross-tab sync — unsubscribe

**Type**: event-listener
**Trigger**: React invokes the cleanup function returned by `navStore.subscribe` — on `NavShell` unmount, or before re-subscribing a replacement `onChange` callback.
**Payload**: channel = same `storage` DOM event as BL001; data = none consumed — this is teardown only.
**File Schema**: N/A — not a file-exchange type.
**Source File**: `src/components/layout/nav-shell.tsx`
**Source Symbol**: `navStore.subscribe` (the returned cleanup closure — no independently named symbol exists for it in source)

### Description

Line 32 is the body of the arrow function `subscribe` returns (`nav-shell.tsx:31-34`): `window.removeEventListener("storage", onChange)` paired with `navStore.local.delete(onChange)`. This is the exact mirror of BL001 — it removes both the DOM-level `storage` listener and the in-memory fan-out entry that BL001 registered, preventing a leaked listener/closure once the subscribing component goes away. Recorded as a separate BL item per Cardinality Contract Rule C1 (2 distinct grep-marker hits in the same file → 2 BL items), not merged into BL001.

### Related Modules

- `src/components/layout/nav-shell.tsx` (`navStore`, `NavShell`, `useNavState`)

### Related Routes

- None.

### Related Data Models

- None.

---

## Summary

- **Total Behavior Logic Items**: 2
- **By Type**: custom-command: 0, event-listener: 2, integration: 0, mail: 0, middleware: 0, notification: 0, observer: 0, queue-worker: 0, scheduled-job: 0, webhook: 0
- **Scout inventory entries**: 2 — mapped 1:1 to the 2 BL items above (BL001 ↔ `nav-shell.tsx:L29`, BL002 ↔ `nav-shell.tsx:L32`). No sentinel `_(none found)_` markers appeared in the scout inventory to skip; the inventory simply had no rows for the other 9 types (there is no per-type sentinel row format in this scout output — see scout-report.md/`_scout-bl-inventory.md`, which list only real entries).

---

## Cross-Reference Validation

- [x] All BL### codes are unique (BL001, BL002)
- [ ] All BL### codes are referenced in UserStories.md (type=system) — **not checkable yet**: `user-stories.md` is not present in `artifacts/` at time of writing (later-wave artifact; session context marks `feature_count: <pending-W5>`). Wave 5/7a to confirm.
- [ ] All BL### codes are referenced in FeatureList.md — **not checkable yet**, same reason (`feature-list.md` not yet generated).
- [x] All related route references are valid — N/A: neither BL item has a route reference (pure client-side DOM listener, no synchronous route counterpart).
- [x] All related data model references are valid — N/A: neither BL item has a data-model reference (state is browser `localStorage`, not a persisted entity).
- [x] No orphaned behavior logic references
- [x] All BL items have Source File + Source Symbol fields (Rule C2)
- [x] All Source File paths match scout Background Logic Source Inventory entries (Rule C2/C3) — both `src/components/layout/nav-shell.tsx` entries confirmed against `scout-report.md:327-332` and `_scout-bl-inventory.md:1-6`.

---

## Client-Side Logic

Searched directly (these patterns are not part of the scout Background Logic Source Inventory — they are a separate, template-defined detection pass over `src/`).

### Debounce / Throttle

`N/A — no debounce or throttle patterns detected.` Searched `debounce|throttle|useDebounce` (case-insensitive) across `src/` — zero matches.

### Optimistic UI

`N/A — no optimistic UI patterns detected.` Searched `useOptimistic|optimisticUpdate|rollback` (case-insensitive) across `src/` — the only hits were the word "rollback" used for the **incentive rule-version rollback business feature** (`src/lib/incentive/rollback-rule-version.ts`, `src/app/api/incentive-rules/[id]/rollback/route.ts`, `src/components/incentive/rule-version-detail-actions.tsx`), a server-validated maker-checker operation that reverts an incentive rule to a prior approved version — not a client-side optimistic-update-then-rollback pattern. No `useOptimistic` or `setState`-before-`await`-with-catch-rollback pattern exists in the codebase.

### Polling

`N/A — no polling patterns detected.` Searched `setInterval|refetchInterval|usePolling|setTimeout\(.*fetch` (case-insensitive) across `src/` — zero matches. Consistent with the Headline Finding: nothing in this codebase re-checks server state on a timer.

### Upload Progress

`N/A — no upload progress patterns detected.` Searched `onUploadProgress|upload\.onprogress|onProgress|useUpload` (case-insensitive) across `src/` — zero matches.

### Realtime (WebSocket / SSE / EventSource)

`N/A — no realtime patterns detected.` Searched `new WebSocket|EventSource|useWebSocket|realtime\.|supabase.*channel`, then re-checked broadly with `\.channel\(|realtime|subscribe\(` (case-insensitive) — the only match across all of `src/` was `nav-shell.tsx` itself (its own `navStore.subscribe` method name, already covered as BL001/BL002). No Supabase Realtime channel subscription exists anywhere in the codebase; all data access is one-shot PostgREST request/response, matching the project's established no-scheduled-execution posture.
