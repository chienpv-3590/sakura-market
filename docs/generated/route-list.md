# Route List

**Project**: sakura-market
**Generated**: 2026-09-08

## Method

Tier-2 static parse of `src/app/**` (Next.js 16 App Router). No `_route-probe.json` sidecar
exists — correct, not an omission: the Wave 0.4 probe gate only fires for
Gemfile.lock/composer.lock/mix.lock stacks, and App Router has no route-lister CLI. Every
`route.ts` and `page.tsx` under `src/app/` (30 route.ts + 26 page.tsx, per scout-report.md File
Inventory) was opened directly; HTTP methods are the functions each file actually exports (never
assumed from the file's existence). `Owner F###` is filled for all 38 rows from `feature-list.md` (Wave 5, 12 features
`F001`-`F012`), cross-checked 38/38 by the Wave 7a review. `F012_PipelineDashboard` owns no
API route — it is a read-only dashboard screen assembled from other features' queries.

## Conventions (apply uniformly — not repeated per row)

- **Tầng 1** (`src/proxy.ts` + `src/lib/supabase/proxy.ts:updateSession`, Next 16's renamed
  `middleware.ts`): every request except `path === "/login"` or `path.startsWith("/api/auth/")`
  requires a valid Supabase session (`supabase.auth.getClaims()`). Missing/expired →
  **307 redirect** to `/login?reason=unauthenticated` (`lib/supabase/proxy.ts:42-53`).
  Matcher: `/((?!_next/static|_next/image|favicon.ico|.*\.(?:svg|png|jpg|jpeg|gif|webp)$).*)`
  (`src/proxy.ts:9-11`).
- **Tầng 2** (`requireUser()` / `requireRole()`, `src/lib/auth/require-role.ts:58-78`): requires
  an active `app_user` row matching the session. No/inactive row → **307 redirect** to
  `/login?reason=inactive` (`require-role.ts:61`). `requireRole([...])` additionally checks role
  membership; wrong role → `notFound()` → **404** (deliberately not 403 — `require-role.ts:66-77`).
  All `(app)/*` pages inherit `requireUser()` from the shared layout
  (`src/app/(app)/layout.tsx:11`) even when the page itself calls no auth function.
- Business-day-locked writes → **423** (`respondLockedWrite`, `lib/reconciliation/handle-locked-write.ts:41`,
  or an inline literal PATCH/`P0001`-catch in the route itself).
- Maker-checker self-approval → **403 SELF_APPROVAL** (corrections approve, incentive-rules
  approve); rollback's analogous case is **403 SELF_ROLLBACK**.
- Mock report export → **403 MOCK_REPORT** (`reports/[reportCode]/export.csv`).
- Malformed/invalid input a gated caller IS otherwise allowed to send → **422**.
- Wrong state for the requested write → **409**. The complete set of reason codes mapped to 409,
  from the `STATUS_BY_REASON` tables in the route handlers: `ALREADY_COMPLETED`, `ALREADY_DECIDED`,
  `DAY_NOT_LOCKED`, `NOT_ACTIVE`, `NOT_DRAFT`, `NOT_LOCKED`, `SEQ_RACE_EXHAUSTED`,
  `VERSION_CONFLICT`. Four routes additionally return an inline `status: 409` whose `reason` is
  passed through from a lib function (`lots/[id]/mekiki`, `reconciliation/[businessDate]/lock`,
  `seri-results`, `transactions/[id]/cancel`).
- Uncaught handler exception → **500** `{ error: "internal_error" }` (every route wraps its body
  in try/catch per this convention; none were found to leak a raw stack trace).

## Backend Routes

> **Completeness Contract:** one row per leaf route (HTTP method + concrete path). No
> resource-summary tables, no approximation markers, no wildcard paths. 30 `route.ts` files → 38
> leaf rows below (every exported `GET`/`POST`/`PATCH`/`DELETE` was confirmed by opening the file;
> no method assumed). No `DELETE` handler exists anywhere in this codebase.

> **Code Column Contract:** `Code` = `ROUTE001`-`ROUTE038`, contiguous, global to this file.
> `Owner F###` = the owning feature from `feature-list.md` (see Method above).

### File: src/app/api/accounting/export-batches/route.ts

| Method | Path | Code | Owner F### | Handler | Middleware / Roles | Status Codes |
|--------|------|------|------------|---------|---------------------|---------------|
| POST | /api/accounting/export-batches | ROUTE001 | F010 | POST (L34) → createExportBatch() | requireRole([ROLE-SETTLEMENT]) | 400 invalid_json; 422 INVALID_BUSINESS_DATE; 409 DAY_NOT_LOCKED / SEQ_RACE_EXHAUSTED; 201 ok |

### File: src/app/api/auth/sign-in/route.ts

| Method | Path | Code | Owner F### | Handler | Middleware / Roles | Status Codes |
|--------|------|------|------------|---------|---------------------|---------------|
| POST | /api/auth/sign-in | ROUTE002 | F001 | POST (L134) → handleSignIn() | public (proxy.ts isPublicPath `/api/auth/*`); pre-auth, no requireUser | 400 invalid_json/invalid_request; 403 (account locked, `lockout.ts`); 401 invalid_credentials (wrong password / inactive account — byte-identical response by design, `route.ts:16-18`); 200 `{ redirectTo }` |

### File: src/app/api/auth/sign-out/route.ts

| Method | Path | Code | Owner F### | Handler | Middleware / Roles | Status Codes |
|--------|------|------|------------|---------|---------------------|---------------|
| POST | /api/auth/sign-out | ROUTE003 | F001 | POST (L10) | public (proxy.ts isPublicPath `/api/auth/*`); no requireUser (works with or without a live session) | 200 `{ redirectTo: "/login" }`; 500 internal |

### File: src/app/api/corrections/[id]/approve/route.ts

| Method | Path | Code | Owner F### | Handler | Middleware / Roles | Status Codes |
|--------|------|------|------------|---------|---------------------|---------------|
| POST | /api/corrections/:id/approve | ROUTE004 | F008 | POST (L62) → approveCorrection() | requireRole([ROLE-SETTLEMENT]) | 400 invalid_json; 422 invalid_request/INVALID_ADJUSTMENT; 404 NOT_FOUND; **403 SELF_APPROVAL**; 409 ALREADY_DECIDED; 200 ok |

### File: src/app/api/corrections/route.ts

| Method | Path | Code | Owner F### | Handler | Middleware / Roles | Status Codes |
|--------|------|------|------------|---------|---------------------|---------------|
| POST | /api/corrections | ROUTE005 | F008 | POST (L66) → handleCreate() → createCorrection() | requireRole([ROLE-SETTLEMENT]) | 400 invalid_request (form parse); 422 missing_target_txn_id/missing_reason/missing_evidence/(evidence-upload reason); 404 TXN_NOT_FOUND; 409 NOT_LOCKED; 201 ok |
| GET | /api/corrections | ROUTE006 | F008 | GET (L76) → handleList() → listCorrections() | requireRole([ROLE-SETTLEMENT]) | 200 ok; 500 internal |

### File: src/app/api/deliveries/[id]/complete/route.ts

| Method | Path | Code | Owner F### | Handler | Middleware / Roles | Status Codes |
|--------|------|------|------------|---------|---------------------|---------------|
| POST | /api/deliveries/:id/complete | ROUTE007 | F006 | POST (L18) → completeDelivery() | requireRole([ROLE-SETTLEMENT]) (departs from deliverytracking/technical-spec.md §5.2 "cả 2 role" — see `complete-delivery.ts` own comment, route.ts:16-17) | 404 NOT_FOUND; 409 ALREADY_COMPLETED; 422 QTY_MISMATCH; 200 ok |

### File: src/app/api/deliveries/[id]/shipments/route.ts

| Method | Path | Code | Owner F### | Handler | Middleware / Roles | Status Codes |
|--------|------|------|------------|---------|---------------------|---------------|
| POST | /api/deliveries/:id/shipments | ROUTE008 | F006 | POST (L22) → recordShipment() | requireRole([ROLE-DELIVERY]) | 400 invalid_json; 422 invalid_request/OVER_DELIVERY; 404 NOT_FOUND; 409 ALREADY_COMPLETED; 201 ok |

### File: src/app/api/deliveries/by-transaction/[transactionId]/route.ts

| Method | Path | Code | Owner F### | Handler | Middleware / Roles | Status Codes |
|--------|------|------|------------|---------|---------------------|---------------|
| GET | /api/deliveries/by-transaction/:transactionId | ROUTE009 | F006 | GET (L11) → loadShipmentsByTransaction() | requireUser() — any active role | 200 ok (incl. `[]`); 500 internal |

### File: src/app/api/deliveries/route.ts

| Method | Path | Code | Owner F### | Handler | Middleware / Roles | Status Codes |
|--------|------|------|------------|---------|---------------------|---------------|
| GET | /api/deliveries | ROUTE010 | F006 | GET (L11) → listDeliveries() | requireUser() — any active role | 200 ok; 500 internal |

No `POST /api/deliveries` exists — a `delivery` row is created implicitly elsewhere (transaction
confirm flow), never via a direct client POST to this path. `[UNVERIFIED]` exact creation site;
out of scope for this route-list pass (would require tracing `confirm-transaction.ts`).

### File: src/app/api/incentive-results/route.ts

| Method | Path | Code | Owner F### | Handler | Middleware / Roles | Status Codes |
|--------|------|------|------------|---------|---------------------|---------------|
| GET | /api/incentive-results | ROUTE011 | F009 | GET (L12) → listIncentiveResults() | requireRole([ROLE-SETTLEMENT]) | 200 ok; 500 internal |

### File: src/app/api/incentive-rules/[id]/approve/route.ts

| Method | Path | Code | Owner F### | Handler | Middleware / Roles | Status Codes |
|--------|------|------|------------|---------|---------------------|---------------|
| POST | /api/incentive-rules/:id/approve | ROUTE012 | F009 | POST (L17) → approveRuleVersion() | requireRole([ROLE-RULE-ADMIN]) | 404 NOT_FOUND; **403 SELF_APPROVAL**; 409 ALREADY_DECIDED; 200 ok |

### File: src/app/api/incentive-rules/[id]/rollback/route.ts

| Method | Path | Code | Owner F### | Handler | Middleware / Roles | Status Codes |
|--------|------|------|------------|---------|---------------------|---------------|
| POST | /api/incentive-rules/:id/rollback | ROUTE013 | F009 | POST (L28) → rollbackRuleVersion() | requireRole([ROLE-RULE-ADMIN]) | 400 invalid_json; 422 invalid_request/INVALID_TARGET; 404 NOT_FOUND; **403 SELF_ROLLBACK**; 409 NOT_ACTIVE; 200 ok |

### File: src/app/api/incentive-rules/route.ts

| Method | Path | Code | Owner F### | Handler | Middleware / Roles | Status Codes |
|--------|------|------|------------|---------|---------------------|---------------|
| POST | /api/incentive-rules | ROUTE014 | F009 | POST (L29) → createRuleVersion() | requireRole([ROLE-RULE-ADMIN]) | 400 invalid_json; 422 invalid_request/INVALID_EFFECTIVE_DATE; 409 VERSION_CONFLICT; 201 ok |
| GET | /api/incentive-rules | ROUTE015 | F009 | GET (L59) → listRuleVersions() | requireRole([ROLE-RULE-ADMIN]) | 200 ok; 500 internal |

### File: src/app/api/locale/route.ts

| Method | Path | Code | Owner F### | Handler | Middleware / Roles | Status Codes |
|--------|------|------|------------|---------|---------------------|---------------|
| POST | /api/locale | ROUTE016 | F011 | POST (L9) | **Tầng 1 only** — no `requireUser()`/`requireRole()` call in-handler (verified: no import of `require-role.ts`); reachable by any request carrying a valid Supabase session even if its `app_user` row is missing/inactive, since Tầng 2 is never invoked here | 400 invalid JSON / `locale` not "vi"\|"ja"; 200 sets `LOCALE_COOKIE_NAME` cookie (not httpOnly) |

### File: src/app/api/lots/[id]/mekiki/route.ts

| Method | Path | Code | Owner F### | Handler | Middleware / Roles | Status Codes |
|--------|------|------|------------|---------|---------------------|---------------|
| POST | /api/lots/:id/mekiki | ROUTE017 | F003 | POST (L89) → handleCreate() | requireRole([ROLE-JUDGE]) | 400 invalid_json; 422 invalid_request; 404 lot_not_found; 409 lot_not_receivable (CAS on `lot.status`); 201 ok |

### File: src/app/api/lots/[id]/route.ts

| Method | Path | Code | Owner F### | Handler | Middleware / Roles | Status Codes |
|--------|------|------|------------|---------|---------------------|---------------|
| GET | /api/lots/:id | ROUTE018 | F003 | GET (L110) → loadLot()+loadLotAuditHistory() | requireUser() — any active role | 404 not_found; 200 ok; 500 internal |
| PATCH | /api/lots/:id | ROUTE019 | F003 | PATCH (L124) → handleAdjust() | requireRole([ROLE-SETTLEMENT]); allowlist `item`\|`package_count` only — `available_qty` deliberately excluded | 400 invalid_json; 422 invalid_request; 404 not_found; **423** locked_business_date; 200 ok |

### File: src/app/api/lots/route.ts

| Method | Path | Code | Owner F### | Handler | Middleware / Roles | Status Codes |
|--------|------|------|------------|---------|---------------------|---------------|
| POST | /api/lots | ROUTE020 | F003 | POST (L92) → handleCreate() → createLot() | requireRole([ROLE-INTAKE]) | 400 invalid_request (form parse); 422 invalid_request/(intake-doc reject reason); 201 ok |
| GET | /api/lots | ROUTE021 | F003 | GET (L104) → handleList() | requireUser() — any active role | 200 ok; 500 internal |

### File: src/app/api/participants/[id]/route.ts

| Method | Path | Code | Owner F### | Handler | Middleware / Roles | Status Codes |
|--------|------|------|------------|---------|---------------------|---------------|
| PATCH | /api/participants/:id | ROUTE022 | F002 | PATCH (L19) | requireRole([ROLE-SYS-ADMIN]); `category` is immutable — request rejected outright if the key is even present | 400 invalid_json; 422 category_immutable/reason_required/category_license_mismatch/invalid_valid_from/invalid_valid_to/no_fields_to_update; 404 not_found; 200 ok |

No `GET /api/participants/:id` exists — the detail page queries Supabase directly server-side
(`(app)/participants/[id]/page.tsx:31`) rather than calling an API route.

### File: src/app/api/participants/[id]/transition/route.ts

| Method | Path | Code | Owner F### | Handler | Middleware / Roles | Status Codes |
|--------|------|------|------------|---------|---------------------|---------------|
| POST | /api/participants/:id/transition | ROUTE023 | F002 | POST (L19) → resolveTarget() (state-machine.ts) | requireRole([ROLE-SYS-ADMIN]) | 400 invalid_json; 422 invalid_event/reason_required/illegal_transition; 404 not_found; 200 `{ status }` |

### File: src/app/api/participants/route.ts

| Method | Path | Code | Owner F### | Handler | Middleware / Roles | Status Codes |
|--------|------|------|------------|---------|---------------------|---------------|
| GET | /api/participants | ROUTE024 | F002 | GET (L18) | requireUser() — any active role (matches RLS `read_all_active_users`) | 400 invalid_category/invalid_status; 200 ok; 500 internal |
| POST | /api/participants | ROUTE025 | F002 | POST (L58) | requireRole([ROLE-SYS-ADMIN]) | 400 invalid_json; 422 invalid_category/invalid_name/category_license_mismatch/invalid_valid_from/invalid_valid_to; 201 ok |

### File: src/app/api/reconciliation/[businessDate]/lock/route.ts

| Method | Path | Code | Owner F### | Handler | Middleware / Roles | Status Codes |
|--------|------|------|------------|---------|---------------------|---------------|
| POST | /api/reconciliation/:businessDate/lock | ROUTE026 | F007 | POST (L41) → lockBusinessDay() | requireRole([ROLE-SETTLEMENT]); **no unlock endpoint exists anywhere in this codebase — this action is one-way** | 400 invalid_business_date; 409 (all failure reasons, incl. ALREADY_LOCKED — `lock-business-day.ts:7,31`); 200 ok |

### File: src/app/api/reconciliation/[businessDate]/route.ts

| Method | Path | Code | Owner F### | Handler | Middleware / Roles | Status Codes |
|--------|------|------|------------|---------|---------------------|---------------|
| GET | /api/reconciliation/:businessDate | ROUTE027 | F007 | GET (L11) → loadReconciliationLines()+loadLockStatus() | requireUser() — any active role | 400 invalid_business_date; 200 ok; 500 internal |

### File: src/app/api/reports/[reportCode]/export.csv/route.ts

| Method | Path | Code | Owner F### | Handler | Middleware / Roles | Status Codes |
|--------|------|------|------------|---------|---------------------|---------------|
| GET | /api/reports/:reportCode/export.csv | ROUTE028 | F010 | GET (L25) → loadReportRows()+toCsv() | requireUser() — any active role | 404 report_not_found / BATCH_NOT_FOUND; **403 MOCK_REPORT**; 422 BATCH_CODE_REQUIRED; 200 `text/csv` w/ `Content-Disposition` |

### File: src/app/api/reports/[reportCode]/route.ts

| Method | Path | Code | Owner F### | Handler | Middleware / Roles | Status Codes |
|--------|------|------|------------|---------|---------------------|---------------|
| GET | /api/reports/:reportCode | ROUTE029 | F010 | GET (L13) → loadReportRows() | requireUser() — any active role | 404 report_not_found; 200 ok (paginated); 500 internal |

### File: src/app/api/reports/route.ts

| Method | Path | Code | Owner F### | Handler | Middleware / Roles | Status Codes |
|--------|------|------|------------|---------|---------------------|---------------|
| GET | /api/reports | ROUTE030 | F010 | GET (L7) → static `REPORT_REGISTRY` (no DB read) | requireUser() — any active role | 200 ok |

### File: src/app/api/seri-results/[id]/route.ts

| Method | Path | Code | Owner F### | Handler | Middleware / Roles | Status Codes |
|--------|------|------|------------|---------|---------------------|---------------|
| GET | /api/seri-results/:id | ROUTE031 | F005 | GET (L119) → loadSeriResult()+loadSeriAuditHistory() | requireUser() — any active role | 404 not_found; 200 ok; 500 internal |
| PATCH | /api/seri-results/:id | ROUTE032 | F005 | PATCH (L133) → handleUpdate() | requireRole([ROLE-TRADE, ROLE-SETTLEMENT]) | 400 invalid_json; 422 invalid_request (incl. FK `23503`); 404 not_found; **423** locked_business_date (Postgres `P0001`); 200 ok |

### File: src/app/api/seri-results/route.ts

| Method | Path | Code | Owner F### | Handler | Middleware / Roles | Status Codes |
|--------|------|------|------------|---------|---------------------|---------------|
| POST | /api/seri-results | ROUTE033 | F005 | POST (L111) → handleCreate() | requireRole([ROLE-TRADE]) | 400 invalid_json; 422 invalid_request; 404 lot_not_found; 409 already_recorded; 201 ok |
| GET | /api/seri-results | ROUTE034 | F005 | GET (L121) → handleList() | requireUser() — any active role | 200 ok; 500 internal |

### File: src/app/api/transactions/[id]/cancel/route.ts

| Method | Path | Code | Owner F### | Handler | Middleware / Roles | Status Codes |
|--------|------|------|------------|---------|---------------------|---------------|
| POST | /api/transactions/:id/cancel | ROUTE035 | F004 | POST (L23) → cancelTransaction() | requireRole([ROLE-TRADE]) | 400 invalid_json; 422 reason_required; **423** LOCKED_BUSINESS_DATE (via `respondLockedWrite`); 409 (other, e.g. NOT_CANCELLABLE); 200 ok |

### File: src/app/api/transactions/[id]/confirm/route.ts

| Method | Path | Code | Owner F### | Handler | Middleware / Roles | Status Codes |
|--------|------|------|------------|---------|---------------------|---------------|
| POST | /api/transactions/:id/confirm | ROUTE036 | F004 | POST (L20) → confirmTransaction() | requireRole([ROLE-TRADE]) | 409 NOT_DRAFT; 422 INELIGIBLE_PARTY/INSUFFICIENT_QTY; **423** LOCKED_BUSINESS_DATE; 200 ok |

### File: src/app/api/transactions/route.ts

| Method | Path | Code | Owner F### | Handler | Middleware / Roles | Status Codes |
|--------|------|------|------------|---------|---------------------|---------------|
| POST | /api/transactions | ROUTE037 | F004 | POST (L123) → handleCreate() | requireRole([ROLE-TRADE]) | 400 invalid_json; 422 invalid_request/lot_not_available/(FK `23503`); 201 ok |
| GET | /api/transactions | ROUTE038 | F004 | GET (L133) → handleList() | requireUser() — any active role | 200 ok; 500 internal |

## Middleware (proxy.ts — Next 16's `middleware.ts`)

`src/proxy.ts` delegates to `src/lib/supabase/proxy.ts:updateSession`. Matcher (all requests
except static assets):
```
/((?!_next/static|_next/image|favicon.ico|.*\.(?:svg|png|jpg|jpeg|gif|webp)$).*)
```
Behavior: refreshes the Supabase session cookie on every matched request, then gates every path
except `/login` and `/api/auth/*` behind "does a session exist" (no DB round trip — `is_active`
and role checks are Tầng 2's job, done per-route above). No session → 307 to
`/login?reason=unauthenticated`, carrying the refreshed cookies onto the redirect
(`lib/supabase/proxy.ts:41-54`). This app has **no background/scheduled routes** — no cron
endpoints exist anywhere in `src/app/`.

## Frontend Routes/Pages

> One row per `page.tsx` (26 total). `(app)` and `(auth)` are route groups — parentheses do not
> appear in the URL. Every `(app)/*` page additionally inherits `requireUser()` from
> `src/app/(app)/layout.tsx:11` (Tầng 2, any active role) even where the page itself calls no auth
> function — noted as "(layout)" in Guard below. `Guard` documents the same role-gating detail the
> Backend Routes table carries, extended here per the same completeness intent (template's base 3
> columns — Path/Component/Route Name — plus this one).

### File: src/app/(app)/*, src/app/(auth)/login/page.tsx

| Path | Component | Route Name | Guard |
|------|-----------|------------|-------|
| / | HomePage | home (SCR002_Home, pipeline dashboard) | requireUser() (also layout) — any active role |
| /login | LoginPage | login (SCR001_Login) | public — no requireUser/requireRole; `getCurrentUser()` redirects away via `roleLanding()` if already signed in |
| /lots | LotsPage | lots-list (SCR006_LotsList) | requireUser() (layout) — any active role; in-page: "create" link shown only if `role === ROLE-INTAKE` |
| /lots/new | NewLotPage | lots-new (SCR007_LotIntake) | requireRole([ROLE-INTAKE]) |
| /lots/:id | LotDetailPage | lots-detail (SCR009_LotDetail) | requireUser() (layout) — any active role; in-page: edit form shown only if `role === ROLE-SETTLEMENT` |
| /lots/:id/mekiki | MekikiEntryPage | lots-mekiki (SCR008_MekikiEntry) | requireUser() (layout) — any active role; in-page: form shown only if `role === ROLE-JUDGE` and `lot.status === "received"` (actual write enforcement is the API route, ROUTE017) |
| /participants | ParticipantsPage | participants-list (SCR003_ParticipantList) | requireUser() (layout) + `getCurrentUser()` — any active role; in-page: "create" link shown only if `role === ROLE-SYS-ADMIN` |
| /participants/new | NewParticipantPage | participants-new (SCR004_ParticipantNew) | requireRole([ROLE-SYS-ADMIN]) |
| /participants/:id | ParticipantDetailPage | participants-detail (SCR005_ParticipantDetail) | requireUser() (layout) + `getCurrentUser()` — any active role; in-page: edit form + transition actions shown only if `role === ROLE-SYS-ADMIN` |
| /transactions | TransactionsPage | transactions-list (SCR011_TransactionsList) | requireUser() (layout) — any active role; in-page: "create" link + row actions shown only if `role === ROLE-TRADE` |
| /transactions/new | NewTransactionPage | transactions-new (SCR010_AitaiCreate) | requireRole([ROLE-TRADE]) |
| /transactions/:id | TransactionDetailPage | transactions-detail (SCR012_TransactionDetail) | requireUser() (layout) — any active role; in-page: confirm/cancel actions shown only if `role === ROLE-TRADE` |
| /seri | SeriPage | seri-list (SCR014_SeriList) | requireUser() (layout) — any active role; in-page: "create" link shown only if `role === ROLE-TRADE` |
| /seri/new | NewSeriResultPage | seri-new (SCR013_SeriEntry) | requireRole([ROLE-TRADE]) |
| /seri/:id | SeriDetailPage | seri-detail (SCR015_SeriDetail) | requireUser() (layout) — any active role; in-page: edit form shown only if `role === ROLE-TRADE \|\| ROLE-SETTLEMENT` |
| /deliveries | DeliveriesPage | deliveries-list (SCR016_DeliveryList) | requireUser() (layout) — any active role |
| /deliveries/:id | DeliveryDetailPage | deliveries-detail (SCR017_DeliveryDetail) | requireUser() (layout) — any active role; in-page: new-shipment form shown only if `role === ROLE-DELIVERY` and not yet "hoàn tất"; complete action shown only if `role === ROLE-SETTLEMENT` |
| /reconciliation | ReconciliationPage | reconciliation (SCR018_ReconcileAndLock) | requireUser() (layout) — any active role; in-page: lock dialog shown only if `role === ROLE-SETTLEMENT` and day not yet locked |
| /corrections | CorrectionsPage | corrections-list (SCR020_CorrectionApproval) | requireRole([ROLE-SETTLEMENT]) |
| /corrections/new | NewCorrectionPage | corrections-new (SCR019_CorrectionRequest) | requireRole([ROLE-SETTLEMENT]) |
| /incentive | IncentivePage | incentive-results (SCR021_IncentiveResult) | requireRole([ROLE-SETTLEMENT]) |
| /incentive/rules | RuleVersionListPage | incentive-rules-list (SCR022_RuleVersionList) | requireRole([ROLE-RULE-ADMIN]) |
| /incentive/rules/new | NewRuleVersionPage | incentive-rules-new (SCR023_RuleVersionNew) | requireRole([ROLE-RULE-ADMIN]) |
| /incentive/rules/:id | RuleVersionDetailPage | incentive-rules-detail (SCR024_RuleVersionDetail) | requireRole([ROLE-RULE-ADMIN]); in-page: approve/rollback disabled for the version's own creator (maker-checker, same DEC-001 rule as ROUTE012/ROUTE013) |
| /reports | ReportCatalogPage | reports-catalog (SCR025_ReportCatalog) | requireUser() — any active role |
| /reports/:reportCode | ReportViewerPage | reports-viewer (SCR026_ReportViewer) | requireUser() — any active role; in-page: mock reports show a disabled export button + badge, RPT-06 batch-create button shown only if `role === ROLE-SETTLEMENT` |

## Summary

| Category | Count |
|----------|-------|
| Backend Routes (leaf rows) | 38 |
| Backend Route Files | 30 |
| Frontend Pages | 26 |
| Total | 64 |

### Role → route matrix (routes with a `requireRole` narrowing beyond `requireUser`)

| Role | API routes (Code) | Pages |
|------|--------------------|-------|
| ROLE-INTAKE | ROUTE020 | /lots/new |
| ROLE-JUDGE | ROUTE017 | — (page uses requireUser + in-page check, /lots/:id/mekiki) |
| ROLE-TRADE | ROUTE033, ROUTE035, ROUTE036, ROUTE037 | /transactions/new, /seri/new |
| ROLE-TRADE or ROLE-SETTLEMENT | ROUTE032 | — (in-page check, /seri/:id) |
| ROLE-DELIVERY | ROUTE008 | — (in-page check, /deliveries/:id) |
| ROLE-SETTLEMENT | ROUTE001, ROUTE004, ROUTE005, ROUTE006, ROUTE007, ROUTE011, ROUTE019, ROUTE026 | /corrections, /corrections/new, /incentive |
| ROLE-RULE-ADMIN | ROUTE012, ROUTE013, ROUTE014, ROUTE015 | /incentive/rules, /incentive/rules/new, /incentive/rules/:id |
| ROLE-SYS-ADMIN | ROUTE022, ROUTE023, ROUTE025 | /participants/new |

## Verification Notes

- Every route above was confirmed by opening the source file directly (not inferred from the file
  tree or from prose docs); every `requireRole`/`requireUser` call and every literal status code
  cited was read in context, not assumed.
- `[UNVERIFIED]`: the exact code path that creates a `delivery` row (no `POST /api/deliveries`
  exists) was not traced in this pass — flagged inline under ROUTE010's file section rather than
  guessed.
- Known example from the task brief confirmed exactly: `src/app/api/accounting/export-batches/route.ts`
  is POST-only (no GET export) and gated to `ROLE-SETTLEMENT` (ROUTE001).
- No test suite exists in this repo (deliberate waiver, confirmed against scout-report.md's file
  inventory — no `*.test.*`/`*.spec.*` entries).
