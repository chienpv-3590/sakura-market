# API Map

**Project**: Sakura Market (産地市場)
**Generated**: 2026-09-08
**API Kind**: rest (Next.js 16 App Router route handlers; no GraphQL/gRPC in this codebase)
**Source**: `route-list.md` (validator-PASSED, 30 `route.ts` files → 38 leaf endpoint rows) + `behavior-logic.md`
(2 BL items, both client-side, no server async surface). Every row below was traced back to
`route-list.md`'s own file:line citations, which were themselves read from source — no endpoint here
was inferred from a resource name or file path alone.

**Auth/Status conventions (apply to every row; not repeated per row — see `route-list.md` "Conventions"
for full citations):**
- No session → **307** to `/login?reason=unauthenticated` (`src/proxy.ts` + `lib/supabase/proxy.ts:updateSession`),
  gates everything except `/login` and `/api/auth/*`.
- Valid session, no/inactive `app_user` row → **307** to `/login?reason=inactive` (`require-role.ts:61`).
- Wrong role on a `requireRole([...])` route → **404** (`notFound()`, deliberately not 403 —
  `require-role.ts:66-77`, so a wrong-role caller cannot learn the route exists).
- Right role, invalid payload → **422**. Business-day locked write → **423**. Wrong state for the write
  → **409** (reason ∈ `ALREADY_COMPLETED`, `ALREADY_DECIDED`, `DAY_NOT_LOCKED`, `NOT_ACTIVE`, `NOT_DRAFT`,
  `NOT_LOCKED`, `SEQ_RACE_EXHAUSTED`, `VERSION_CONFLICT`). Maker-checker self-approval → **403 SELF_APPROVAL**
  / **403 SELF_ROLLBACK**. Mock report export → **403 MOCK_REPORT**. Uncaught exception → **500**
  `{ error: "internal_error" }`.
- **No `DELETE` handler exists anywhere in this codebase** — every method below was confirmed by opening
  the file and reading its exported functions, never assumed from the route's existence.
- **Reported, not smoothed over:** `POST /api/locale` (see Locale domain) calls neither `requireUser()`
  nor `requireRole()` — it is still behind the Tầng-1 session gate, but a deactivated `app_user` with a
  live Supabase session can still call it. Low-impact (it only sets a UI-language cookie strictly
  validated to `vi`/`ja`), kept here as an observed fact rather than corrected.

## Endpoints by Domain

### Accounting

| Method | Path | Handler | Description |
|--------|------|---------|-------------|
| POST | `/api/accounting/export-batches` | `createExportBatch()` — `src/app/api/accounting/export-batches/route.ts:34` | Creates a settlement export batch. `requireRole([ROLE-SETTLEMENT])`. 422 `INVALID_BUSINESS_DATE`; 409 `DAY_NOT_LOCKED`/`SEQ_RACE_EXHAUSTED`; 201 ok. No scheduled/automatic delivery exists downstream of this — see Background Jobs section. |

### Auth

| Method | Path | Handler | Description |
|--------|------|---------|-------------|
| POST | `/api/auth/sign-in` | `handleSignIn()` — `src/app/api/auth/sign-in/route.ts:134` | Public, pre-auth (`proxy.ts` `isPublicPath` exempts `/api/auth/*`). 403 on lockout (`lockout.ts`); wrong password and inactive account both return the **same** 401 `invalid_credentials` by design (`route.ts:16-18`, prevents account-existence probing); 200 `{ redirectTo }`. |
| POST | `/api/auth/sign-out` | (unnamed default export) — `src/app/api/auth/sign-out/route.ts:10` | Public; works with or without a live session. 200 `{ redirectTo: "/login" }`; 500 internal. |

### Corrections

| Method | Path | Handler | Description |
|--------|------|---------|-------------|
| POST | `/api/corrections/:id/approve` | `approveCorrection()` — `src/app/api/corrections/[id]/approve/route.ts:62` | `requireRole([ROLE-SETTLEMENT])`. Maker-checker: creator cannot approve own request → **403 SELF_APPROVAL**. 422 `INVALID_ADJUSTMENT`; 404 `NOT_FOUND`; 409 `ALREADY_DECIDED`; 200 ok. |
| POST | `/api/corrections` | `handleCreate()` → `createCorrection()` — `src/app/api/corrections/route.ts:66` | `requireRole([ROLE-SETTLEMENT])`. Form-parsed multipart (evidence file upload to Supabase Storage bucket `correction-evidence`, `src/lib/corrections/evidence-upload.ts:32`). 422 `missing_target_txn_id`/`missing_reason`/`missing_evidence`; 404 `TXN_NOT_FOUND`; 409 `NOT_LOCKED` (target transaction's business date must already be locked); 201 ok. |
| GET | `/api/corrections` | `handleList()` → `listCorrections()` — `src/app/api/corrections/route.ts:76` | `requireRole([ROLE-SETTLEMENT])`. 200 ok; 500 internal. |

### Deliveries

| Method | Path | Handler | Description |
|--------|------|---------|-------------|
| POST | `/api/deliveries/:id/complete` | `completeDelivery()` — `src/app/api/deliveries/[id]/complete/route.ts:18` | `requireRole([ROLE-SETTLEMENT])` — the route's own comment notes this departs from `deliverytracking/technical-spec.md §5.2` ("cả 2 role"); code is authoritative. 404 `NOT_FOUND`; 409 `ALREADY_COMPLETED`; 422 `QTY_MISMATCH`; 200 ok. |
| POST | `/api/deliveries/:id/shipments` | `recordShipment()` — `src/app/api/deliveries/[id]/shipments/route.ts:22` | `requireRole([ROLE-DELIVERY])`. 422 `invalid_request`/`OVER_DELIVERY`; 404 `NOT_FOUND`; 409 `ALREADY_COMPLETED`; 201 ok. |
| GET | `/api/deliveries/by-transaction/:transactionId` | `loadShipmentsByTransaction()` — `src/app/api/deliveries/by-transaction/[transactionId]/route.ts:11` | `requireUser()` — any active role. 200 ok (incl. `[]`); 500 internal. |
| GET | `/api/deliveries` | `listDeliveries()` — `src/app/api/deliveries/route.ts:11` | `requireUser()` — any active role. 200 ok; 500 internal. **No `POST /api/deliveries` exists** — a `delivery` row is created implicitly by the transaction-confirm flow, never by a direct client POST; `[UNVERIFIED]` exact creation call site (route-list.md flags the same gap, out of scope for a route-only pass — would require tracing `confirm-transaction.ts`). |

### Incentive Results

| Method | Path | Handler | Description |
|--------|------|---------|-------------|
| GET | `/api/incentive-results` | `listIncentiveResults()` — `src/app/api/incentive-results/route.ts:12` | `requireRole([ROLE-SETTLEMENT])`. 200 ok; 500 internal. Read-only — computation happens elsewhere (`src/lib/incentive/calculate-incentive.ts`, `run-incentive-for-period.ts`), invoked synchronously, never on a schedule (confirmed — see Background Jobs). |

### Incentive Rules

| Method | Path | Handler | Description |
|--------|------|---------|-------------|
| POST | `/api/incentive-rules/:id/approve` | `approveRuleVersion()` — `src/app/api/incentive-rules/[id]/approve/route.ts:17` | `requireRole([ROLE-RULE-ADMIN])`. Maker-checker → **403 SELF_APPROVAL**. 404 `NOT_FOUND`; 409 `ALREADY_DECIDED`; 200 ok. |
| POST | `/api/incentive-rules/:id/rollback` | `rollbackRuleVersion()` — `src/app/api/incentive-rules/[id]/rollback/route.ts:28` | `requireRole([ROLE-RULE-ADMIN])`. Maker-checker analogue → **403 SELF_ROLLBACK**. 422 `INVALID_TARGET`; 404 `NOT_FOUND`; 409 `NOT_ACTIVE`; 200 ok. Business rollback of a rule version, not a client-side optimistic-UI rollback (confirmed no `useOptimistic` pattern anywhere, `behavior-logic.md` § Client-Side Logic). |
| POST | `/api/incentive-rules` | `createRuleVersion()` — `src/app/api/incentive-rules/route.ts:29` | `requireRole([ROLE-RULE-ADMIN])`. 422 `INVALID_EFFECTIVE_DATE`; 409 `VERSION_CONFLICT`; 201 ok. |
| GET | `/api/incentive-rules` | `listRuleVersions()` — `src/app/api/incentive-rules/route.ts:59` | `requireRole([ROLE-RULE-ADMIN])`. 200 ok; 500 internal. |

### Locale

| Method | Path | Handler | Description |
|--------|------|---------|-------------|
| POST | `/api/locale` | (unnamed default export) — `src/app/api/locale/route.ts:9` | **Tầng 1 only** — no `requireUser()`/`requireRole()` call in-handler (confirmed: no import of `require-role.ts`). Reachable by any request carrying a valid Supabase session even if its `app_user` row is missing/inactive. 400 invalid JSON or `locale` not `vi`\|`ja`; 200 sets the UI-language cookie (not `httpOnly`). Impact of the missing Tầng-2 check is minimal (cookie value is strictly validated), reported here as-observed per this artifact's ground rules. |

### Lots

| Method | Path | Handler | Description |
|--------|------|---------|-------------|
| POST | `/api/lots/:id/mekiki` | `handleCreate()` — `src/app/api/lots/[id]/mekiki/route.ts:89` | 目利き (quality judging) entry. `requireRole([ROLE-JUDGE])`. 422 `invalid_request`; 404 `lot_not_found`; 409 `lot_not_receivable` (compare-and-swap on `lot.status`); 201 ok. |
| GET | `/api/lots/:id` | `loadLot()` + `loadLotAuditHistory()` — `src/app/api/lots/[id]/route.ts:110` | `requireUser()` — any active role. 404 `not_found`; 200 ok; 500 internal. |
| PATCH | `/api/lots/:id` | `handleAdjust()` — `src/app/api/lots/[id]/route.ts:124` | `requireRole([ROLE-SETTLEMENT])`. Field allowlist is `item`\|`package_count` only — `available_qty` is **deliberately excluded** from this endpoint. 422 `invalid_request`; 404 `not_found`; **423** `locked_business_date`; 200 ok. |
| POST | `/api/lots` | `handleCreate()` → `createLot()` — `src/app/api/lots/route.ts:92` | `requireRole([ROLE-INTAKE])`. Multipart form (intake-document upload to Supabase Storage bucket `lot-attachment`, `src/lib/lots/intake-doc-upload.ts:47`). 422 `invalid_request` / intake-doc reject reason; 201 ok. |
| GET | `/api/lots` | `handleList()` — `src/app/api/lots/route.ts:104` | `requireUser()` — any active role. 200 ok; 500 internal. |

### Participants

| Method | Path | Handler | Description |
|--------|------|---------|-------------|
| PATCH | `/api/participants/:id` | (unnamed default export) — `src/app/api/participants/[id]/route.ts:19` | `requireRole([ROLE-SYS-ADMIN])`. `category` is immutable — request rejected outright if that key is even present (`category_immutable`). 422 `reason_required`/`category_license_mismatch`/`invalid_valid_from`/`invalid_valid_to`/`no_fields_to_update`; 404 `not_found`; 200 ok. **No `GET /api/participants/:id` exists** — the detail page queries Supabase directly server-side (`src/app/(app)/participants/[id]/page.tsx:31`), the normal pattern for read-only screens in this app, not a missing endpoint. |
| POST | `/api/participants/:id/transition` | `resolveTarget()` (via `state-machine.ts`) — `src/app/api/participants/[id]/transition/route.ts:19` | `requireRole([ROLE-SYS-ADMIN])`. 422 `invalid_event`/`reason_required`/`illegal_transition`; 404 `not_found`; 200 `{ status }`. |
| GET | `/api/participants` | (unnamed default export) — `src/app/api/participants/route.ts:18` | `requireUser()` — any active role (matches RLS policy `read_all_active_users`). 400 `invalid_category`/`invalid_status`; 200 ok; 500 internal. |
| POST | `/api/participants` | (unnamed default export) — `src/app/api/participants/route.ts:58` | `requireRole([ROLE-SYS-ADMIN])`. 422 `invalid_category`/`invalid_name`/`category_license_mismatch`/`invalid_valid_from`/`invalid_valid_to`; 201 ok. |

### Reconciliation

| Method | Path | Handler | Description |
|--------|------|---------|-------------|
| POST | `/api/reconciliation/:businessDate/lock` | `lockBusinessDay()` — `src/app/api/reconciliation/[businessDate]/lock/route.ts:41` | `requireRole([ROLE-SETTLEMENT])`. **One-way — no unlock endpoint exists anywhere in this codebase.** 400 `invalid_business_date`; 409 for every failure reason incl. `ALREADY_LOCKED` (`lock-business-day.ts:7,31`); 200 ok. |
| GET | `/api/reconciliation/:businessDate` | `loadReconciliationLines()` + `loadLockStatus()` — `src/app/api/reconciliation/[businessDate]/route.ts:11` | `requireUser()` — any active role. 400 `invalid_business_date`; 200 ok; 500 internal. |

### Reports

| Method | Path | Handler | Description |
|--------|------|---------|-------------|
| GET | `/api/reports/:reportCode/export.csv` | `loadReportRows()` + `toCsv()` — `src/app/api/reports/[reportCode]/export.csv/route.ts:25` | `requireUser()` — any active role. 404 `report_not_found`/`BATCH_NOT_FOUND`; **403 `MOCK_REPORT`** (mock reports cannot be exported); 422 `BATCH_CODE_REQUIRED`; 200 `text/csv` with `Content-Disposition` attachment. |
| GET | `/api/reports/:reportCode` | `loadReportRows()` — `src/app/api/reports/[reportCode]/route.ts:13` | `requireUser()` — any active role. 404 `report_not_found`; 200 ok, paginated; 500 internal. |
| GET | `/api/reports` | Static `REPORT_REGISTRY` (no DB read) — `src/app/api/reports/route.ts:7` | `requireUser()` — any active role. 200 ok. |

### Seri Results

| Method | Path | Handler | Description |
|--------|------|---------|-------------|
| GET | `/api/seri-results/:id` | `loadSeriResult()` + `loadSeriAuditHistory()` — `src/app/api/seri-results/[id]/route.ts:119` | せり (auction) result detail. `requireUser()` — any active role. 404 `not_found`; 200 ok; 500 internal. |
| PATCH | `/api/seri-results/:id` | `handleUpdate()` — `src/app/api/seri-results/[id]/route.ts:133` | `requireRole([ROLE-TRADE, ROLE-SETTLEMENT])` — the only route in this codebase gated to two roles jointly. 422 `invalid_request` (incl. Postgres FK `23503`); 404 `not_found`; **423** `locked_business_date` (Postgres `P0001`); 200 ok. |
| POST | `/api/seri-results` | `handleCreate()` — `src/app/api/seri-results/route.ts:111` | `requireRole([ROLE-TRADE])`. 422 `invalid_request`; 404 `lot_not_found`; 409 `already_recorded`; 201 ok. |
| GET | `/api/seri-results` | `handleList()` — `src/app/api/seri-results/route.ts:121` | `requireUser()` — any active role. 200 ok; 500 internal. |

### Transactions

| Method | Path | Handler | Description |
|--------|------|---------|-------------|
| POST | `/api/transactions/:id/cancel` | `cancelTransaction()` — `src/app/api/transactions/[id]/cancel/route.ts:23` | 相対取引 (negotiated transaction) cancel. `requireRole([ROLE-TRADE])`. 422 `reason_required`; **423** `LOCKED_BUSINESS_DATE` (via `respondLockedWrite`); 409 other reasons (e.g. `NOT_CANCELLABLE`); 200 ok. |
| POST | `/api/transactions/:id/confirm` | `confirmTransaction()` — `src/app/api/transactions/[id]/confirm/route.ts:20` | `requireRole([ROLE-TRADE])`. 409 `NOT_DRAFT`; 422 `INELIGIBLE_PARTY`/`INSUFFICIENT_QTY`; **423** `LOCKED_BUSINESS_DATE`; 200 ok. Implicitly the (unverified) creation point of the paired `delivery` row per Deliveries domain note above. |
| POST | `/api/transactions` | `handleCreate()` — `src/app/api/transactions/route.ts:123` | `requireRole([ROLE-TRADE])`. 422 `invalid_request`/`lot_not_available`/Postgres FK `23503`; 201 ok. |
| GET | `/api/transactions` | `handleList()` — `src/app/api/transactions/route.ts:133` | `requireUser()` — any active role. 200 ok; 500 internal. |

**Domain count check:** 13 domains, 38 endpoint rows — reconciles exactly with `route-list.md`'s
Summary table (`Backend Routes (leaf rows): 38`, `Backend Route Files: 30`). No row was added, dropped,
merged, or renamed relative to `route-list.md`'s `ROUTE001`–`ROUTE038`.

## Background Jobs

**None exist in this codebase — this section is intentionally empty, not incomplete.**

`behavior-logic.md`'s Headline Finding, independently re-confirmed for this artifact: a grep for
`setInterval|cron\.schedule|Queue\(|Bull\(|celery|@Cron|@Scheduled` across `src/` returns zero hits, no
`app/Jobs`-equivalent directory, no worker process, no cron entry. Every report/export/notification path
runs synchronously inside a route handler or server component in direct response to a human request —
there is no timer- or queue-driven execution anywhere to tabulate here.

The only 2 `BL###` items that exist at all (`BL001_StorageEventSubscribe`, `BL002_StorageEventUnsubscribe`,
`src/components/layout/nav-shell.tsx:29,32`) are deliberately **not** listed in the table below: both are
pure client-side DOM `storage`-event listeners for cross-tab nav-rail UI sync, with zero server footprint,
zero network request, and no route or data-model relationship (`behavior-logic.md` confirms "Related
Routes: None" for both). They are not background jobs and not API surfaces — restating them here under a
"Schedule" column that does not apply to them would misrepresent client UI state as server async work.

| Code | Name | Type | Trigger | Schedule |
|------|------|------|---------|----------|
| _(none — see explanation above)_ | | | | |

This is load-bearing for **OBJ-04** (same-day / within-15-minute reporting): per `docs/gia-dinh-tich-hop-ke-toan.md:66-74`
and `behavior-logic.md`, nothing in this repository runs unattended, so OBJ-04 is not met by any
automated mechanism — it depends entirely on a human clicking "create export batch"
(`src/components/accounting/create-export-batch-button.tsx` → `POST /api/accounting/export-batches`,
Accounting domain above) and then downloading the CSV through a separate synchronous export endpoint.

## Webhooks / External Calls

**None exist in this codebase.**

Searched directly for outgoing/incoming integration patterns: no `fetch("http(s)://...")` to a third-party
host, no `axios`, no webhook route or webhook-receiver pattern, no email/SMS provider client (`nodemailer`,
`sendgrid`, `twilio`), no payment gateway, and no realtime channel (`behavior-logic.md` § Client-Side Logic
independently confirms zero `WebSocket`/`EventSource`/Supabase-Realtime usage anywhere in `src/`). The only
external-looking calls in the tree are `client.storage.from("lot-attachment").upload(...)`
(`src/lib/lots/intake-doc-upload.ts:47`) and `client.storage.from("correction-evidence").upload(...)`
(`src/lib/corrections/evidence-upload.ts:32`) — both are calls to **Supabase Storage on the same Supabase
project already used for Postgres/PostgREST/Auth**, i.e. this application's own backing datastore, not a
third-party integration or webhook target. No `INT-###` (per-spec integration) candidates were found at
the artifact level; feature-spec authors should still check for `INT-###` at the per-feature/technical-spec
level, since this artifact only covers project-wide route/job surfaces.

| Direction | Target / Source | Event / Endpoint | Description |
|-----------|------------------|-------------------|--------------|
| _(none found — see explanation above)_ | | | |
