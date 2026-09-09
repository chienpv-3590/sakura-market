# Permissions Matrix

**Project**: sakura-market
**Generated**: 2026-09-08
**Analysis Scope**: Full authorization surface — Layer 1 (session, proxy.ts), Layer 2 (role gates,
require-role.ts), Layer 3 (Postgres RLS — write-only), maker-checker identity checks, and
client-side (UI-only) gates. Excludes pure business-validation rules with no role/access
dimension (e.g. participant.category immutability) — those belong to feature-spec BR-###, not here.

> **Raw PERM### matrix.** Machine-generated inventory of every permission item with full
> per-permission detail. The plain-language curated view lives at
> [permissions.md](./permissions.md). This file is written FIRST; permissions.md is derived from it.

**Code Format**: `PERM###_NameSlug`.

**Design note on granularity (DRY):** each PERM below documents BOTH its server-side enforcement
(Layer 2 `requireRole`/`requireUser`, or Layer 3 RLS) AND its client-side UI mirror (button/nav
visibility) together in one block, where both exist for the same capability — rather than
duplicating near-identical `screen-permission` rows next to their `role-based` counterpart. The
Description of every such PERM states explicitly which part is server-enforced and which part is
"client-side only, convenience, not a security boundary" per the task's separation requirement.
No standalone `feature-flag` / `experiment` / `env-gate` / `locale-gate` mechanism exists anywhere
in this codebase — grep for `useFlag|useFeature|isEnabled|useExperiment|getVariant|process\.env\.`
gated UI branches and `i18n.locale ===`-style content branches found none; the one locale-related
finding (PERM002) is a Layer-2 **authorization gap**, not a locale-conditioned UI branch, so it is
typed `route-guard`, not `locale-gate`.

## Permissions Index

| Code | Name | Type | Enforced At |
|------|------|------|-------------|
| PERM001 | SessionAndActiveAccountBaselineGate | route-guard | Layer 1 (proxy.ts) + Layer 2 (require-role.ts), server |
| PERM002 | LocaleEndpointLayer2Gap | route-guard | Layer 1 only (observed gap — no Layer 2), server |
| PERM003 | LotIntakeCreation | role-based | Layer 2, server + client mirror |
| PERM004 | MekikiGradingEntry | role-based | Layer 2, server + client mirror |
| PERM005 | LotFieldAdjustment | role-based | Layer 2, server + client mirror |
| PERM006 | AitaiTransactionCreation | role-based | Layer 2, server + client mirror |
| PERM007 | AitaiTransactionConfirmCancel | role-based | Layer 2, server + client mirror |
| PERM008 | SeriResultCreation | role-based | Layer 2, server + client mirror |
| PERM009 | SeriResultEdit | role-based | Layer 2, server + client mirror |
| PERM010 | DeliveryShipmentRecording | role-based | Layer 2, server + client mirror |
| PERM011 | DeliveryCompletion | role-based | Layer 2, server + client mirror |
| PERM012 | BusinessDayLock | role-based | Layer 2, server + client mirror |
| PERM013 | CorrectionRequestCreation | role-based | Layer 2, server + client mirror |
| PERM014 | CorrectionApprovalRoleGate | role-based | Layer 2, server + client mirror |
| PERM015 | CorrectionMakerCheckerSelfApprovalBlock | resource-ownership | Application layer, server |
| PERM016 | IncentiveRuleVersionCreateList | role-based | Layer 2, server |
| PERM017 | IncentiveRuleApprovalRoleGate | role-based | Layer 2, server |
| PERM018 | IncentiveRuleMakerCheckerSelfApprovalBlock | resource-ownership | Application layer, server + client mirror |
| PERM019 | IncentiveRuleRollbackRoleGate | role-based | Layer 2, server |
| PERM020 | IncentiveRuleMakerCheckerSelfRollbackBlock | resource-ownership | Application layer, server + client mirror |
| PERM021 | IncentiveResultsViewing | role-based | Layer 2, server |
| PERM022 | ParticipantCreation | role-based | Layer 2, server + client mirror |
| PERM023 | ParticipantEdit | role-based | Layer 2, server + client mirror |
| PERM024 | ParticipantStatusTransition | role-based | Layer 2, server + client mirror |
| PERM025 | AccountingExportBatchCreation | role-based | Layer 2, server + client mirror |
| PERM026 | MockReportExportBlock | action-permission | Server (route handler, data-driven) + client mirror |
| PERM027 | RlsSharedReadAllActiveRolePolicy | data-permission | Layer 3 (RLS), server |
| PERM028 | AppUserNoAuthenticatedWritePolicy | data-permission | Layer 3 (RLS), server |
| PERM029 | AuditLogAppendOnlyWrite | data-permission | Layer 3 (RLS), server |
| PERM030 | ParticipantRlsWrites | data-permission | Layer 3 (RLS), server |
| PERM031 | LotAndLotAttachmentRlsWrites | data-permission | Layer 3 (RLS), server |
| PERM032 | MekikiRecordRlsWrites | data-permission | Layer 3 (RLS), server |
| PERM033 | TransactionRlsWrites | data-permission | Layer 3 (RLS), server |
| PERM034 | SeriResultRlsWrites | data-permission | Layer 3 (RLS), server |
| PERM035 | DeliveryAndDeliveryShipmentRlsWrites | data-permission | Layer 3 (RLS), server |
| PERM036 | BusinessDayLockRlsWrites | data-permission | Layer 3 (RLS), server |
| PERM037 | CorrectionAndAdjustmentRlsWrites | data-permission | Layer 3 (RLS), server |
| PERM038 | IncentiveRuleVersionRlsWrites | data-permission | Layer 3 (RLS), server |
| PERM039 | IncentiveResultAndPaymentRecordSystemOnly | data-permission | Layer 3 (RLS), server (service_role only) |
| PERM040 | AccountingExportBatchRlsWrites | data-permission | Layer 3 (RLS), server |

---

## PERM001: SessionAndActiveAccountBaselineGate

**Type**: route-guard
**Enforced At**: Layer 1 (`src/proxy.ts` + `src/lib/supabase/proxy.ts`) + Layer 2 (`src/lib/auth/require-role.ts`), server

### Description

Every request except `/login` and `/api/auth/*` requires a valid Supabase session (Layer 1); every
`(app)/*` page additionally requires an active `app_user` row via `requireUser()`, inherited from
the shared layout even when the page itself calls no auth function. This is the universal baseline
every other role-based PERM below narrows further with `requireRole([...])`. No session → **307**
to `/login?reason=unauthenticated` (carrying refreshed cookies). Valid session but no/inactive
`app_user` row → **307** to `/login?reason=inactive`. `getCurrentUser()` deliberately cannot
distinguish "no matching row" from "inactive row" — RLS's own `read_all_active_users` policy
requires `is_active=true` before the self-lookup select even succeeds, so the ambiguity is
intentional (fail closed either way, never guess).

**Source**:
- `src/proxy.ts:9-11` (matcher, all requests except static assets)
- `src/lib/supabase/proxy.ts:39` (`isPublicPath = path === "/login" || path.startsWith("/api/auth/")`)
- `src/lib/supabase/proxy.ts:41-54` (no-session → 307 unauthenticated)
- `src/app/(app)/layout.tsx:11` (`await requireUser()`, inherited by all `(app)/*` pages)
- `src/lib/auth/require-role.ts:58-64` (`requireUser`, 307 inactive)
- `src/lib/auth/require-role.ts:29-47` (`getCurrentUser`, fail-closed ambiguity)

### Related Routes

- (ALL) every `(app)/*` page and every `/api/*` route except `POST /api/auth/sign-in`, `POST /api/auth/sign-out`

### Related Screens

- SCR001_Login — the one screen reached *without* this gate; `roleLanding(user.role)` redirects an
  already-signed-in user away before the form renders (`src/app/(auth)/login/page.tsx:23-25`)
- All of SCR002_Home .. SCR026_ReportViewer — gated by this baseline

### Permission Rules

| Role | Allow | Conditions |
|------|-------|------------|
| Any of the 7 roles, active | ✓ | Valid session + `app_user.is_active = true` |
| No session / expired JWT | ✗ | 307 → `/login?reason=unauthenticated` |
| Session valid, no/inactive `app_user` row | ✗ | 307 → `/login?reason=inactive` |

### Related Modules

- `src/lib/supabase/proxy.ts`, `src/lib/auth/require-role.ts`, `src/app/(app)/layout.tsx`

---

## PERM002: LocaleEndpointLayer2Gap

**Type**: route-guard
**Enforced At**: Layer 1 only (observed gap — no Layer 2), server

### Description

`POST /api/locale` has no `requireUser()`/`requireRole()` call of its own (confirmed: no import of
`require-role.ts` in this file) — it sits behind Layer 1 only. A caller with a live Supabase session
but a missing/inactive `app_user` row can still call it successfully, since Layer 2 is never invoked
on this path. Impact is minimal: the only effect is setting a non-`httpOnly` UI-language cookie,
strictly validated to `"vi"` or `"ja"` — no data read, no write to any business table. Recorded as
an observed gap per ground rules, not silently patched or omitted.

**Source**: `src/app/api/locale/route.ts:9-33` (no `require-role.ts` import anywhere in file; body
validated against `isLocale()` at line 18)

### Related Routes

- (POST) /api/locale

### Related Screens

- None — invoked from a locale-switcher control, not a distinct screen

### Permission Rules

| Role | Allow | Conditions |
|------|-------|------------|
| Any active session (even without a matching/active `app_user` row) | ✓ | `locale` body field must be exactly `"vi"` or `"ja"`, else 400 |

### Related Modules

- `src/lib/i18n/config.ts` (`isLocale`, `LOCALE_COOKIE_NAME`)

---

## PERM003: LotIntakeCreation

**Type**: role-based
**Enforced At**: Layer 2, server + client mirror

### Description

Creating a lot (F003 A1) is exclusive to `ROLE-INTAKE`, both for the API route and the intake page
itself (both call `requireRole`, not just one). The Lots List screen additionally hides the "create"
link client-side for any other role — cosmetic only; the real boundary is the two `requireRole`
calls and the RLS `write_intake` policy (PERM031).

**Source**:
- `src/app/api/lots/route.ts:92` (`POST` → `handleCreate()` → `requireRole(["ROLE-INTAKE"])`)
- `src/app/(app)/lots/new/page.tsx` (`requireRole(["ROLE-INTAKE"])`, per route-list.md ROUTE020/page mapping)
- `src/app/(app)/lots/page.tsx:32` (`const canCreate = user.role === "ROLE-INTAKE"`, client mirror)

### Related Routes

- (POST) /api/lots

### Related Screens

- SCR007_LotIntake
- SCR006_LotsList — create link, `ROLE-INTAKE` only (client mirror, `lots/page.tsx:32,43`)

### Permission Rules

| Role | Allow | Conditions |
|------|-------|------------|
| ROLE-INTAKE | ✓ | — |
| All other 6 roles | ✗ | API: 404 (`notFound()`, `require-role.ts:74-77`); UI: create link hidden, `HandoffCaption` shown instead |

### Related Modules

- `src/lib/lots/lot-code.ts`

---

## PERM004: MekikiGradingEntry

**Type**: role-based
**Enforced At**: Layer 2, server + client mirror

### Description

目利き (mekiki) grading (F003 A2) writes are exclusive to `ROLE-JUDGE` at the API route. The mekiki
entry PAGE itself is reachable by any active role (`requireUser` only) — it just decides whether to
render the form or an explanatory notice, per its own comment; the real write boundary is the API
route + RLS (PERM032). Lots List additionally hides the mekiki row-link unless the caller is
`ROLE-JUDGE` AND the lot's `status==='received'`.

**Source**:
- `src/app/api/lots/[id]/mekiki/route.ts:89` (`POST` → `handleCreate()` → `requireRole(["ROLE-JUDGE"])`)
- `src/app/(app)/lots/[id]/mekiki/page.tsx:46,48` (`user.role === "ROLE-JUDGE" && lot.status === "received"` — view-only decision, not enforcement)
- `src/app/(app)/lots/page.tsx:79` (`lot.status === "received" && user.role === "ROLE-JUDGE"`, row-link mirror)

### Related Routes

- (POST) /api/lots/:id/mekiki

### Related Screens

- SCR008_MekikiEntry
- SCR006_LotsList — row link, `ROLE-JUDGE` + `status==='received'` only (client mirror)

### Permission Rules

| Role | Allow | Conditions |
|------|-------|------------|
| ROLE-JUDGE | ✓ | Lot must be `status='received'` (409 `lot_not_receivable` via CAS otherwise) |
| All other 6 roles | ✗ | API: 404; page: view-only notice shown instead of the form |

### Related Modules

- (none additional)

---

## PERM005: LotFieldAdjustment

**Type**: role-based
**Enforced At**: Layer 2, server + client mirror

### Description

Post-intake lot field edits (`item`, `package_count` only — `available_qty` deliberately excluded
from the allowlist) are exclusive to `ROLE-SETTLEMENT`. Blocked with **423** if the lot's
`business_date` is locked (`respondLockedWrite`) — note `lot` itself is exempt from
`trg_block_after_lock` (QĐ-3), so this 423 comes from the route's own inline lock check, not the DB
trigger.

**Source**:
- `src/app/api/lots/[id]/route.ts:124` (`PATCH` → `handleAdjust()` → `requireRole(["ROLE-SETTLEMENT"])`)
- `src/app/(app)/lots/[id]/page.tsx:69` (`user.role === "ROLE-SETTLEMENT"`, edit form client mirror)

### Related Routes

- (PATCH) /api/lots/:id

### Related Screens

- SCR009_LotDetail/REG003_Edit

### Permission Rules

| Role | Allow | Conditions |
|------|-------|------------|
| ROLE-SETTLEMENT | ✓ | Fails 423 if lot's business_date is locked |
| All other 6 roles | ✗ | API: 404; page: edit form replaced by `HandoffCaption` |

### Related Modules

- (none additional)

---

## PERM006: AitaiTransactionCreation

**Type**: role-based
**Enforced At**: Layer 2, server + client mirror

### Description

Creating a 相対取引 (aitai negotiated trade) is exclusive to `ROLE-TRADE` — both the API route and
the create page require the role; the Transactions List additionally hides the create link for
every other role.

**Source**:
- `src/app/api/transactions/route.ts:123` (`POST` → `handleCreate()` → `requireRole(["ROLE-TRADE"])`)
- `src/app/(app)/transactions/new/page.tsx:11` (`requireRole(["ROLE-TRADE"])`)
- `src/app/(app)/transactions/page.tsx:53` (`user.role === "ROLE-TRADE"`, create-link mirror)

### Related Routes

- (POST) /api/transactions

### Related Screens

- SCR010_AitaiCreate
- SCR011_TransactionsList — create link, `ROLE-TRADE` only

### Permission Rules

| Role | Allow | Conditions |
|------|-------|------------|
| ROLE-TRADE | ✓ | — |
| All other 6 roles | ✗ | API: 404; page: create link hidden |

### Related Modules

- (none additional)

---

## PERM007: AitaiTransactionConfirmCancel

**Type**: role-based
**Enforced At**: Layer 2, server + client mirror

### Description

Confirming or cancelling a draft transaction is exclusive to `ROLE-TRADE`. Both actions 423 on a
locked business day (`trg_block_after_lock` fires on `transaction`). The detail page hides the
confirm/cancel button group unless `role === ROLE-TRADE`, and the section disappears entirely once
`status==='cancelled'`.

**Source**:
- `src/app/api/transactions/[id]/confirm/route.ts:20` (`requireRole(["ROLE-TRADE"])`)
- `src/app/api/transactions/[id]/cancel/route.ts:23` (`requireRole(["ROLE-TRADE"])`)
- `src/app/(app)/transactions/[id]/page.tsx:41` (`const canAct = user.role === "ROLE-TRADE"`)

### Related Routes

- (POST) /api/transactions/:id/confirm
- (POST) /api/transactions/:id/cancel

### Related Screens

- SCR012_TransactionDetail/REG002_Actions — section itself disappears once `status==='cancelled'`

### Permission Rules

| Role | Allow | Conditions |
|------|-------|------------|
| ROLE-TRADE | ✓ | 423 if business_date locked; 409 if wrong status (`NOT_DRAFT`/`NOT_CANCELLABLE`) |
| All other 6 roles | ✗ | API: 404; page: action group hidden |

### Related Modules

- (none additional)

---

## PERM008: SeriResultCreation

**Type**: role-based
**Enforced At**: Layer 2, server + client mirror

### Description

Recording a せり (auction) result is exclusive to `ROLE-TRADE`, mirroring transaction creation.

**Source**:
- `src/app/api/seri-results/route.ts:111` (`POST` → `handleCreate()` → `requireRole(["ROLE-TRADE"])`)
- `src/app/(app)/seri/new/page.tsx:11` (`requireRole(["ROLE-TRADE"])`)
- `src/app/(app)/seri/page.tsx:46` (`user.role === "ROLE-TRADE"`, create-link mirror)

### Related Routes

- (POST) /api/seri-results

### Related Screens

- SCR013_SeriEntry
- SCR014_SeriList — create link, `ROLE-TRADE` only

### Permission Rules

| Role | Allow | Conditions |
|------|-------|------------|
| ROLE-TRADE | ✓ | 409 if lot already carries a seri_result |
| All other 6 roles | ✗ | API: 404; page: create link hidden |

### Related Modules

- (none additional)

---

## PERM009: SeriResultEdit

**Type**: role-based
**Enforced At**: Layer 2, server + client mirror

### Description

Editing an existing seri result is open to **either** `ROLE-TRADE` **or** `ROLE-SETTLEMENT` — a
deliberate 2-role allowlist (functional-spec's own Open Decision), matching the `seri_result` RLS
update policy exactly (PERM034). 423 on a locked business day.

**Source**:
- `src/app/api/seri-results/[id]/route.ts:133` (`PATCH` → `handleUpdate()` → `requireRole(["ROLE-TRADE", "ROLE-SETTLEMENT"])`)
- `src/app/(app)/seri/[id]/page.tsx:39` (`const canEdit = user.role === "ROLE-TRADE" || user.role === "ROLE-SETTLEMENT"`)

### Related Routes

- (PATCH) /api/seri-results/:id

### Related Screens

- SCR015_SeriDetail/REG002_Edit

### Permission Rules

| Role | Allow | Conditions |
|------|-------|------------|
| ROLE-TRADE, ROLE-SETTLEMENT | ✓ | 423 if business_date locked |
| ROLE-INTAKE, ROLE-JUDGE, ROLE-DELIVERY, ROLE-RULE-ADMIN, ROLE-SYS-ADMIN | ✗ | API: 404; page: edit form hidden |

### Related Modules

- (none additional)

---

## PERM010: DeliveryShipmentRecording

**Type**: role-based
**Enforced At**: Layer 2, server + client mirror

### Description

Recording a shipment against a delivery is exclusive to `ROLE-DELIVERY`. The detail page's
new-shipment form additionally disappears once the delivery reaches `status==='hoàn tất'`
(complete), regardless of role.

**Source**:
- `src/app/api/deliveries/[id]/shipments/route.ts:22` (`POST` → `recordShipment()` → `requireRole(["ROLE-DELIVERY"])`)
- `src/app/(app)/deliveries/[id]/page.tsx:39` (`const canRecordShipment = user.role === "ROLE-DELIVERY" && delivery.status !== "hoàn tất"`)

### Related Routes

- (POST) /api/deliveries/:id/shipments

### Related Screens

- SCR017_DeliveryDetail/REG002_NewShipment

### Permission Rules

| Role | Allow | Conditions |
|------|-------|------------|
| ROLE-DELIVERY | ✓ | Blocked once delivery `status==='hoàn tất'`; 422 `OVER_DELIVERY` if qty exceeds remaining |
| All other 6 roles | ✗ | API: 404; page: form hidden |

### Related Modules

- (none additional)

---

## PERM011: DeliveryCompletion

**Type**: role-based
**Enforced At**: Layer 2, server + client mirror

### Description

Completing a delivery is gated to `ROLE-SETTLEMENT` at the API route. **This departs from
`deliverytracking`'s own technical-spec §5.2, which describes "cả 2 role" (both roles) as eligible**
— the route's own in-file comment records this as a deliberate deviation, not an oversight. Flagged
here rather than silently reconciled, per ground rules (code is authoritative over prose spec).

**Source**:
- `src/app/api/deliveries/[id]/complete/route.ts:16-18` (`requireRole(["ROLE-SETTLEMENT"])`, comment notes the spec departure)
- `src/app/(app)/deliveries/[id]/page.tsx:40` (`const canComplete = user.role === "ROLE-SETTLEMENT"`)

### Related Routes

- (POST) /api/deliveries/:id/complete

### Related Screens

- SCR017_DeliveryDetail/REG001_Overview (complete action embedded in `DeliveryProgress`)

### Permission Rules

| Role | Allow | Conditions |
|------|-------|------------|
| ROLE-SETTLEMENT | ✓ | 409 `ALREADY_COMPLETED`; 422 `QTY_MISMATCH` |
| ROLE-DELIVERY, all other 5 roles | ✗ | API: 404 — note ROLE-DELIVERY, the party that ships, is NOT allowed to complete its own delivery per current code, contra spec §5.2 |

### Related Modules

- (none additional)

---

## PERM012: BusinessDayLock

**Type**: role-based
**Enforced At**: Layer 2, server + client mirror

### Description

Locking a business day (F007 A2) is exclusive to `ROLE-SETTLEMENT`. **One-way: no unlock endpoint
exists anywhere in this codebase** — the lock, once created, is permanent for that business_date.
The lock dialog on the reconciliation page requires retype-to-confirm before submitting.

**Source**:
- `src/app/api/reconciliation/[businessDate]/lock/route.ts:41` (`POST` → `lockBusinessDay()` → `requireRole(["ROLE-SETTLEMENT"])`)
- `src/app/(app)/reconciliation/page.tsx:34` (`const canLock = user.role === "ROLE-SETTLEMENT" && !lock.locked`)

### Related Routes

- (POST) /api/reconciliation/:businessDate/lock

### Related Screens

- SCR018_ReconcileAndLock

### Permission Rules

| Role | Allow | Conditions |
|------|-------|------------|
| ROLE-SETTLEMENT | ✓ | 409 `ALREADY_LOCKED` on a double-lock race (also caught by the `business_day_lock` PK) |
| All other 6 roles | ✗ | API: 404; page: lock dialog hidden |

### Related Modules

- (none additional)

---

## PERM013: CorrectionRequestCreation

**Type**: role-based
**Enforced At**: Layer 2, server + client mirror

### Description

Filing a post-lock correction request (F008 A1) is exclusive to `ROLE-SETTLEMENT`. Requires the
target transaction's business_date to be locked already (409 `NOT_LOCKED` otherwise) — correction is
the one lawful post-lock write path (never touched by `trg_block_after_lock`).

**Source**: `src/app/api/corrections/route.ts:66` (`POST` → `handleCreate()` → `createCorrection()` → `requireRole(["ROLE-SETTLEMENT"])`)

### Related Routes

- (POST) /api/corrections

### Related Screens

- SCR019_CorrectionRequest — reachable via `?txnCode=` from a locked transaction's own detail page, or independently

### Permission Rules

| Role | Allow | Conditions |
|------|-------|------------|
| ROLE-SETTLEMENT | ✓ | 409 `NOT_LOCKED` if target transaction's day isn't locked; 422 on missing reason/evidence |
| All other 6 roles | ✗ | Page-level 404 (`requireRole(["ROLE-SETTLEMENT"])` on the whole page) |

### Related Modules

- (none additional)

---

## PERM014: CorrectionApprovalRoleGate

**Type**: role-based
**Enforced At**: Layer 2, server + client mirror

### Description

The correction-approval queue and its approve/reject action are exclusive to `ROLE-SETTLEMENT` —
gated at the whole-page level (`requireRole`), not just the action button. The Home dashboard's
"corrections-pending" pipeline card mirrors this: it shows a `{kind:"forbidden"}` state (no real
count) for every other role, by explicit design comment, never inferring the restriction from an
empty count.

**Source**:
- `src/app/(app)/corrections/page.tsx` (whole page `requireRole(["ROLE-SETTLEMENT"])`, per route-list.md page mapping)
- `src/app/api/corrections/[id]/approve/route.ts:66` (`requireRole(["ROLE-SETTLEMENT"])`)
- `src/components/pipeline/pipeline-stage-config.ts:94-102` (`allowedRoles: ["ROLE-SETTLEMENT"]` for the `corrections-pending` stage — every other stage lists all 7 roles)
- `src/components/pipeline/resolve-stage-value.ts:39-40` (`if (!stage.allowedRoles.includes(role)) return { kind: "forbidden" }`)

### Related Routes

- (POST) /api/corrections/:id/approve
- (GET) /api/corrections

### Related Screens

- SCR020_CorrectionApproval
- SCR002_Home — corrections-pending card shows `forbidden` state for non-`ROLE-SETTLEMENT`

### Permission Rules

| Role | Allow | Conditions |
|------|-------|------------|
| ROLE-SETTLEMENT | ✓ | See PERM015 for the additional maker-checker identity check |
| All other 6 roles | ✗ | API/page: 404; dashboard: `forbidden` card (no count shown) |

### Related Modules

- (none additional)

---

## PERM015: CorrectionMakerCheckerSelfApprovalBlock

**Type**: resource-ownership
**Enforced At**: Application layer, server

### Description

A `ROLE-SETTLEMENT` user who is `requested_by` on a `pending` correction cannot also `approve`/`reject`
it — **this is an identity check (caller vs. the row's own `requested_by`), not a role check**: both
the requester and the approver hold the exact same `ROLE-SETTLEMENT` role. Enforced entirely in the
application layer (no DB constraint compares `requested_by` to the caller). The approval-queue page
computes `isOwnPendingRequest`/`canDecide` per row so the UI reads "you created this" rather than
implying a role gap — a UI hint only, not itself the enforcement.

**Source**:
- `src/lib/corrections/approve-correction.ts:51-52` (`if (correction.requested_by !== null && correction.requested_by === input.actorId) return { ok: false, reason: "SELF_APPROVAL" }`)
- `src/app/api/corrections/[id]/approve/route.ts:34` (`STATUS_BY_REASON.SELF_APPROVAL = 403`)
- `src/app/(app)/corrections/page.tsx:44,48` (`canDecide: c.status === "pending" && c.requested_by !== user.id`; `isOwnPendingRequest: c.status === "pending" && c.requested_by === user.id`)

### Related Routes

- (POST) /api/corrections/:id/approve

### Related Screens

- SCR020_CorrectionApproval — per-row `isOwnPendingRequest`/`canDecide` badge

### Permission Rules

| Role | Allow | Conditions |
|------|-------|------------|
| ROLE-SETTLEMENT, caller ≠ `requested_by` | ✓ | Can approve/reject |
| ROLE-SETTLEMENT, caller = `requested_by` | ✗ | **403 SELF_APPROVAL**; UI shows "you created this" instead of decide buttons |

### Related Modules

- `src/lib/corrections/approve-correction.ts`

---

## PERM016: IncentiveRuleVersionCreateList

**Type**: role-based
**Enforced At**: Layer 2, server

### Description

Creating a new incentive rule version and listing all versions are both exclusive to
`ROLE-RULE-ADMIN`. `role-landing.ts` routes every rule-admin account (maker or checker) to the list
page as their landing screen.

**Source**:
- `src/app/api/incentive-rules/route.ts:29` (`POST` → `createRuleVersion()` → `requireRole(["ROLE-RULE-ADMIN"])`)
- `src/app/api/incentive-rules/route.ts:59` (`GET` → `listRuleVersions()` → `requireRole(["ROLE-RULE-ADMIN"])`)

### Related Routes

- (POST) /api/incentive-rules
- (GET) /api/incentive-rules

### Related Screens

- SCR022_RuleVersionList
- SCR023_RuleVersionNew

### Permission Rules

| Role | Allow | Conditions |
|------|-------|------------|
| ROLE-RULE-ADMIN | ✓ | 409 `VERSION_CONFLICT`; 422 `INVALID_EFFECTIVE_DATE` (must be strictly after today JST) |
| All other 6 roles | ✗ | Page/API: 404 |

### Related Modules

- (none additional)

---

## PERM017: IncentiveRuleApprovalRoleGate

**Type**: role-based
**Enforced At**: Layer 2, server

### Description

Approving an incentive rule version is exclusive to `ROLE-RULE-ADMIN`. See PERM018 for the
additional maker-checker identity check layered on top.

**Source**: `src/app/api/incentive-rules/[id]/approve/route.ts:17` (`requireRole(["ROLE-RULE-ADMIN"])`)

### Related Routes

- (POST) /api/incentive-rules/:id/approve

### Related Screens

- SCR024_RuleVersionDetail

### Permission Rules

| Role | Allow | Conditions |
|------|-------|------------|
| ROLE-RULE-ADMIN | ✓ | 409 `ALREADY_DECIDED` |
| All other 6 roles | ✗ | API: 404 |

### Related Modules

- (none additional)

---

## PERM018: IncentiveRuleMakerCheckerSelfApprovalBlock

**Type**: resource-ownership
**Enforced At**: Application layer, server + client mirror

### Description

The exact same pattern as PERM015, applied to `incentive_rule_version`: the version's own
`created_by` cannot also be its `approved_by` — an identity check, both accounts hold
`ROLE-RULE-ADMIN`. The detail page's Actions card is entirely **omitted** (not merely disabled) for
the version's own creator when the version is still pending — a stronger client-side treatment than
the corrections screen's inline badge, but still non-authoritative; the 403 is the real boundary.

**Source**:
- `src/lib/incentive/approve-rule-version.ts:30-31` (`if (version.created_by !== null && version.created_by === input.actorId) return { ok: false, reason: "SELF_APPROVAL" }`)
- `src/app/api/incentive-rules/[id]/approve/route.ts:11` (`STATUS_BY_REASON.SELF_APPROVAL = 403`)
- `src/app/(app)/incentive/rules/[id]/page.tsx:30,42,44` (`isCreator`, `isOwnPending = isCreator && version.status === "pending_approval"`, `hasActions = canApprove || canRollback || isOwnPending || isOwnActive`)

### Related Routes

- (POST) /api/incentive-rules/:id/approve

### Related Screens

- SCR024_RuleVersionDetail — Actions card omitted entirely for the version's own creator

### Permission Rules

| Role | Allow | Conditions |
|------|-------|------------|
| ROLE-RULE-ADMIN, caller ≠ `created_by` | ✓ | Can approve |
| ROLE-RULE-ADMIN, caller = `created_by` | ✗ | **403 SELF_APPROVAL**; Actions card omitted client-side |

### Related Modules

- `src/lib/incentive/approve-rule-version.ts`

---

## PERM019: IncentiveRuleRollbackRoleGate

**Type**: role-based
**Enforced At**: Layer 2, server

### Description

Rolling an incentive rule version back to a prior version is exclusive to `ROLE-RULE-ADMIN`. See
PERM020 for the maker-checker identity check on top.

**Source**: `src/app/api/incentive-rules/[id]/rollback/route.ts:28` (`requireRole(["ROLE-RULE-ADMIN"])`)

### Related Routes

- (POST) /api/incentive-rules/:id/rollback

### Related Screens

- SCR024_RuleVersionDetail

### Permission Rules

| Role | Allow | Conditions |
|------|-------|------------|
| ROLE-RULE-ADMIN | ✓ | 409 `NOT_ACTIVE`; 422 `INVALID_TARGET` |
| All other 6 roles | ✗ | API: 404 |

### Related Modules

- (none additional)

---

## PERM020: IncentiveRuleMakerCheckerSelfRollbackBlock

**Type**: resource-ownership
**Enforced At**: Application layer, server + client mirror

### Description

Same identity-check shape as PERM018, applied to rollback: the currently-**active** version's own
`created_by` cannot roll it back to a prior version — checked against the active version's creator,
not the target version's (the code comment explicitly notes this asymmetry: "not saying `created_by`
of WHICH version" — it's the active row's creator that matters here). Both accounts hold
`ROLE-RULE-ADMIN`.

**Source**:
- `src/lib/incentive/rollback-rule-version.ts:44-45` (`if (active.created_by !== null && active.created_by === input.actorId) return { ok: false, reason: "SELF_ROLLBACK" }`)
- `src/lib/incentive/rollback-rule-version.ts:17-19` (comment clarifying which version's `created_by` applies)
- `src/app/api/incentive-rules/[id]/rollback/route.ts:11` (`STATUS_BY_REASON.SELF_ROLLBACK = 403`)
- `src/app/(app)/incentive/rules/[id]/page.tsx:30,43,44` (`isOwnActive = isCreator && version.status === "active"`, folded into `hasActions`)

### Related Routes

- (POST) /api/incentive-rules/:id/rollback

### Related Screens

- SCR024_RuleVersionDetail

### Permission Rules

| Role | Allow | Conditions |
|------|-------|------------|
| ROLE-RULE-ADMIN, caller ≠ active version's `created_by` | ✓ | Can roll back |
| ROLE-RULE-ADMIN, caller = active version's `created_by` | ✗ | **403 SELF_ROLLBACK**; Actions card omitted client-side |

### Related Modules

- `src/lib/incentive/rollback-rule-version.ts`

---

## PERM021: IncentiveResultsViewing

**Type**: role-based
**Enforced At**: Layer 2, server

### Description

Viewing computed 完納奨励金 (full-payment incentive) results is exclusive to `ROLE-SETTLEMENT` —
gated at both the API route and the whole page, filterable by period.

**Source**:
- `src/app/api/incentive-results/route.ts:12` (`GET` → `listIncentiveResults()` → `requireRole(["ROLE-SETTLEMENT"])`)
- `src/app/(app)/incentive/page.tsx:14-15` (page-level `requireRole(["ROLE-SETTLEMENT"])`, per route-list.md mapping)

### Related Routes

- (GET) /api/incentive-results

### Related Screens

- SCR021_IncentiveResult

### Permission Rules

| Role | Allow | Conditions |
|------|-------|------------|
| ROLE-SETTLEMENT | ✓ | — |
| All other 6 roles | ✗ | API/page: 404 |

### Related Modules

- (none additional)

---

## PERM022: ParticipantCreation

**Type**: role-based
**Enforced At**: Layer 2, server + client mirror

### Description

Creating a market participant is exclusive to `ROLE-SYS-ADMIN`.

**Source**:
- `src/app/api/participants/route.ts:58` (`POST` → `requireRole(["ROLE-SYS-ADMIN"])`)
- `src/app/(app)/participants/new/page.tsx:11` (`requireRole(["ROLE-SYS-ADMIN"])`)
- `src/app/(app)/participants/page.tsx:49` (`const canWrite = user?.role === "ROLE-SYS-ADMIN"`, create-link mirror)

### Related Routes

- (POST) /api/participants

### Related Screens

- SCR004_ParticipantNew
- SCR003_ParticipantList — create link, `ROLE-SYS-ADMIN` only

### Permission Rules

| Role | Allow | Conditions |
|------|-------|------------|
| ROLE-SYS-ADMIN | ✓ | 422 on category/license/date validation failures |
| All other 6 roles | ✗ | API: 404; page: create link hidden |

### Related Modules

- (none additional)

---

## PERM023: ParticipantEdit

**Type**: role-based
**Enforced At**: Layer 2, server + client mirror

### Description

Editing a participant's fields is exclusive to `ROLE-SYS-ADMIN`. Note `PATCH /api/participants/:id`
rejects the request outright if the `category` key is even present in the body (immutable-after-
create business rule, not itself a role/access concern — out of scope for this permissions matrix,
tracked as a BR in the owning feature spec instead). No `GET /api/participants/:id` route exists —
the detail page queries Supabase directly server-side, so its read protection is RLS's
`read_all_active_users` (PERM027) + this page's own `requireUser()`, not a route.ts guard.

**Source**:
- `src/app/api/participants/[id]/route.ts:19` (`PATCH` → `requireRole(["ROLE-SYS-ADMIN"])`)
- `src/app/(app)/participants/[id]/page.tsx:68` (`const canWrite = user?.role === "ROLE-SYS-ADMIN"`)
- `src/app/(app)/participants/[id]/page.tsx:31` (direct Supabase query, no API route)

### Related Routes

- (PATCH) /api/participants/:id

### Related Screens

- SCR005_ParticipantDetail/REG002_Edit

### Permission Rules

| Role | Allow | Conditions |
|------|-------|------------|
| ROLE-SYS-ADMIN | ✓ | 422 `category_immutable`/`reason_required`/etc. |
| All other 6 roles | ✗ | API: 404; page: edit form hidden |

### Related Modules

- (none additional)

---

## PERM024: ParticipantStatusTransition

**Type**: role-based
**Enforced At**: Layer 2, server + client mirror

### Description

Transitioning a participant's FIG-010 eligibility state is exclusive to `ROLE-SYS-ADMIN`, via the
`state-machine.ts` transition resolver.

**Source**:
- `src/app/api/participants/[id]/transition/route.ts:19` (`POST` → `resolveTarget()` → `requireRole(["ROLE-SYS-ADMIN"])`)
- `src/app/(app)/participants/[id]/page.tsx:68` (same `canWrite` flag gates both edit form and transition actions)

### Related Routes

- (POST) /api/participants/:id/transition

### Related Screens

- SCR005_ParticipantDetail/REG003_Transition

### Permission Rules

| Role | Allow | Conditions |
|------|-------|------------|
| ROLE-SYS-ADMIN | ✓ | 422 `illegal_transition`/`reason_required` |
| All other 6 roles | ✗ | API: 404; page: transition actions hidden |

### Related Modules

- `src/lib/participants/state-machine.ts` (not read this pass — cited per route-list.md; `[UNVERIFIED]` exact file path beyond the route's own import)

---

## PERM025: AccountingExportBatchCreation

**Type**: role-based
**Enforced At**: Layer 2, server + client mirror

### Description

Creating a daily accounting export batch (IF-ACC-01/FR-SETTLE-02, RPT-06) is one of the three
`ROLE-SETTLEMENT`-exclusive actions the task explicitly calls out (alongside PERM012 lock and
PERM014 correction decisions). Succeeds even on an already-locked business day by design — an export
is a record made *about* a locked day, not a write *into* that day's own business events, so it is
deliberately exempt from `trg_block_after_lock` (which only covers 4 other tables, never this one,
and never fires on INSERT regardless). The button is client-hidden for every other role.

**Source**:
- `src/app/api/accounting/export-batches/route.ts:34` (`POST` → `createExportBatch()` → `requireRole(["ROLE-SETTLEMENT"])`)
- `src/app/(app)/reports/[reportCode]/page.tsx:127` (`user.role === SETTLEMENT_ROLE && <CreateExportBatchButton .../>`, `SETTLEMENT_ROLE` const at line 24)

### Related Routes

- (POST) /api/accounting/export-batches

### Related Screens

- SCR026_ReportViewer/REG002_AccountingExportBatch — RPT-06-exclusive

### Permission Rules

| Role | Allow | Conditions |
|------|-------|------------|
| ROLE-SETTLEMENT | ✓ | 422 `INVALID_BUSINESS_DATE`; 409 `SEQ_RACE_EXHAUSTED` after 5 retries on a `seq` unique-violation race |
| All other 6 roles | ✗ | API: 404; page: button not rendered |

### Related Modules

- `src/lib/accounting/create-export-batch.ts`, `src/lib/accounting/batch-code.ts`

---

## PERM026: MockReportExportBlock

**Type**: action-permission
**Enforced At**: Server (route handler, data-driven) + client mirror

### Description

CSV export is blocked for any report flagged `isMock`, **regardless of caller role** — this is a
data-driven action gate (on the report definition), not a role rule; every one of the 7 roles is
equally blocked. 5 of the 12 catalogued reports are mock (`RPT-04/09/10/11/12`); the other 7 are real — counted from `isMock` in `src/lib/reports/registry.ts`. The viewer shows a badge + disabled export
control and an explanatory notice instead of a live export link; RPT-06 (accounting export, itself a
real/non-mock report) additionally disables its own export link specifically when no `batchCode` is
selected ("xem trước" preview mode), a distinct data-state gate on the same action.

**Source**:
- `src/app/api/reports/[reportCode]/export.csv/route.ts:33` (`if (definition.isMock) return NextResponse.json({ reason: "MOCK_REPORT" }, { status: 403 })`)
- `src/app/(app)/reports/[reportCode]/page.tsx:94-104` (mock badge + disabled export control, `exportDisabledMock` copy)
- `src/app/(app)/reports/[reportCode]/page.tsx:119-124` (RPT-06 preview-mode disabled export, `exportDisabledPreview` copy)
- `src/app/(app)/reports/page.tsx:877` (`MockDataBadge` on the catalog list, flags `isMock`)

### Related Routes

- (GET) /api/reports/:reportCode/export.csv

### Related Screens

- SCR025_ReportCatalog — `MockDataBadge`
- SCR026_ReportViewer/REG001_ReportResults — badge + disabled export control

### Permission Rules

| Role | Allow | Conditions |
|------|-------|------------|
| Any of the 7 roles, report `isMock=false` and (for RPT-06) a `batchCode` selected | ✓ | Returns CSV with `Content-Disposition` |
| Any of the 7 roles, report `isMock=true` | ✗ | **403 MOCK_REPORT**; badge + disabled control shown |
| Any of the 7 roles, RPT-06 with no `batchCode` selected | ✗ | 422 `BATCH_CODE_REQUIRED`; preview-mode disabled control shown |

### Related Modules

- `src/lib/reports/queries/rpt-06-accounting-export.ts`

---

## PERM027: RlsSharedReadAllActiveRolePolicy

**Type**: data-permission
**Enforced At**: Layer 3 (RLS), server

### Description

**RLS restricts WRITES ONLY in this codebase — it grants read access uniformly.** A single policy
named `read_all_active_users` grants **SELECT** on every RLS-enabled business table to **every
active role** (`private.current_user_role() is not null` — this SECURITY DEFINER helper returns
`null` for an inactive/non-existent `app_user` row, so an inactive account cannot even read). This
is the layer that actually protects the `participant` detail page's direct-Supabase-query read path
(PERM023's note) since no API route guards that specific read. **18 tables carry this exact policy
today** — not 16, and not 17: `rls_core.sql` (2026-09-04) covers 16 tables; `lot_attachment.sql`
(2026-09-07) added a 17th; `accounting_export.sql` (2026-09-08) added an 18th. `payment_record` and
`incentive_result` are readable by every active role too, despite having no *authenticated write*
policy at all (PERM039) — RLS's read grant and write grant are independent per table.

**Source**:
- `supabase/migrations/20260904090900_rls_core.sql:11-62` (16 tables: `app_user`, `audit_log`,
  `participant`, `participant_status_history`, `lot`, `mekiki_record`, `transaction`, `seri_result`,
  `delivery`, `delivery_shipment`, `business_day_lock`, `correction_request`,
  `transaction_adjustment`, `incentive_rule_version`, `incentive_result`, `payment_record`)
- `supabase/migrations/20260907090000_lot_attachment.sql:35-36` (17th table)
- `supabase/migrations/20260908090000_accounting_export.sql:49-50` (18th table)
- Confirmed by grep across all 14 migration files for `on public\..* for select` — no other select
  policy exists anywhere; this is the only read policy in the schema

### Related Routes

- (ALL GET routes reading business data)

### Related Screens

- All screens that display data from any of the 18 tables

### Permission Rules

| Role | Allow | Conditions |
|------|-------|------------|
| Any of the 7 roles, `is_active = true` | ✓ | Read (SELECT) on all 18 business tables — no per-role restriction on READ anywhere in this schema |
| Inactive/non-existent `app_user` row | ✗ | `private.current_user_role()` returns `null` → 0 rows on every table (silent, not an error) |

### Related Modules

- `private.current_user_role()` (`supabase/migrations/20260904090900_rls_core.sql`, cited but function body not opened this pass — `[UNVERIFIED]` exact line; existence and SECURITY DEFINER nature confirmed via data-model.md cross-cutting fact #4)

---

## PERM028: AppUserNoAuthenticatedWritePolicy

**Type**: data-permission
**Enforced At**: Layer 3 (RLS), server

### Description

**No INSERT/UPDATE/DELETE policy exists for `authenticated` on `app_user` anywhere across all 14
migration files** (confirmed by grepping every `create policy.*for (insert|update|delete)` across
`supabase/migrations/`; only the single `read_all_active_users` SELECT policy touches this table).
No self-service profile edit, no in-app account creation, and no role self-escalation is possible
through any authenticated session — account provisioning and role assignment happen exclusively
outside RLS (`service_role`/Supabase Admin API, `BYPASSRLS`), never through a user-facing route in
this codebase (no such route exists in route-list.md either).

**Source**: Grep confirmed across `supabase/migrations/*.sql` — zero insert/update/delete policy rows
for `public.app_user`.

### Related Routes

- (none — no route in this codebase writes to `app_user`)

### Related Screens

- (none)

### Permission Rules

| Role | Allow | Conditions |
|------|-------|------------|
| Any of the 7 roles (authenticated) | ✗ | No policy exists → any INSERT/UPDATE/DELETE attempt via the `authenticated` role is rejected by RLS |
| `service_role` (BYPASSRLS) | ✓ | Only path that can write `app_user` — outside this codebase's route surface |

### Related Modules

- (none)

---

## PERM029: AuditLogAppendOnlyWrite

**Type**: data-permission
**Enforced At**: Layer 3 (RLS), server

### Description

Any active role may INSERT an audit row; **no UPDATE/DELETE policy exists for `audit_log`
anywhere** — audit rows are immutable by construction, matching the append-only pattern later
reused for `lot_attachment` and `accounting_export_batch`.

**Source**: `supabase/migrations/20260904090900_rls_core.sql:64-67` (`insert_any_active_user`, `with check (private.current_user_role() is not null)`)

### Related Routes

- (internal — written via `src/lib/audit/write-audit-log.ts`, not a dedicated public route)

### Related Screens

- (none — audit trails surface as read-only history sections on multiple detail screens)

### Permission Rules

| Role | Allow | Conditions |
|------|-------|------------|
| Any of the 7 roles, active | ✓ (INSERT only) | — |
| Any role | ✗ (UPDATE/DELETE) | No such policy exists — Postgres rejects with a row-level-security violation |

### Related Modules

- `src/lib/audit/write-audit-log.ts`

---

## PERM030: ParticipantRlsWrites

**Type**: data-permission
**Enforced At**: Layer 3 (RLS), server

### Description

`participant`: `ROLE-SYS-ADMIN` may INSERT and UPDATE (no DELETE policy — participants are never
hard-deleted, only transitioned via `participant_status_history`). `participant_status_history`:
`ROLE-SYS-ADMIN` INSERT-only (append-only trail). This is the RLS-layer mirror of PERM022/023/024's
API-level `requireRole` gates — defense in depth, same role.

**Source**:
- `supabase/migrations/20260904090900_rls_core.sql:71-77` (`write_sys_admin_insert`/`write_sys_admin_update` on `participant`; `write_sys_admin_insert` on `participant_status_history`)

### Related Routes

- (mirrors PERM022, PERM023, PERM024)

### Related Screens

- (mirrors PERM022, PERM023, PERM024)

### Permission Rules

| Role | Allow | Conditions |
|------|-------|------------|
| ROLE-SYS-ADMIN | ✓ | INSERT+UPDATE on `participant`; INSERT-only on `participant_status_history` |
| All other 6 roles | ✗ | INSERT: RLS violation error; UPDATE: 0 rows affected (silently filtered by `USING`, no error — see PERM032's note on this general RLS behavior) |

### Related Modules

- (none additional)

---

## PERM031: LotAndLotAttachmentRlsWrites

**Type**: data-permission
**Enforced At**: Layer 3 (RLS), server

### Description

`lot`: `ROLE-INTAKE` INSERTs; UPDATE is broader — `ROLE-INTAKE`, `ROLE-JUDGE`, `ROLE-TRADE`, and
`ROLE-SETTLEMENT` may all UPDATE (their respective flows touch `available_qty`/`status`: publish,
reserve/release, adjust). No lock check in this policy — `lot` is QĐ-3-exempt from
`trg_block_after_lock`. `lot_attachment`: `ROLE-INTAKE` INSERT-only, append-only (no update/delete
policy), mirroring `audit_log`.

**Source**:
- `supabase/migrations/20260904090900_rls_core.sql:82-86` (`write_intake` insert, `write_lot_operational` update — 4 roles)
- `supabase/migrations/20260907090000_lot_attachment.sql:40-41` (`write_intake` insert-only on `lot_attachment`)

### Related Routes

- (mirrors PERM003, PERM005; `lot_attachment` write has no dedicated API route in route-list.md — attachments are uploaded as part of the multipart lot-intake form, per PERM003)

### Related Screens

- (mirrors PERM003, PERM005)

### Permission Rules

| Role | Allow | Conditions |
|------|-------|------------|
| ROLE-INTAKE | ✓ | INSERT on `lot` + `lot_attachment` |
| ROLE-INTAKE, ROLE-JUDGE, ROLE-TRADE, ROLE-SETTLEMENT | ✓ | UPDATE on `lot` only |
| ROLE-DELIVERY, ROLE-RULE-ADMIN, ROLE-SYS-ADMIN | ✗ | No write access to either table |

### Related Modules

- (none additional)

---

## PERM032: MekikiRecordRlsWrites

**Type**: data-permission
**Enforced At**: Layer 3 (RLS), server

### Description

`ROLE-JUDGE` may INSERT/UPDATE/DELETE. **The lock check was removed from this policy's `USING`
clause by a later migration** (`lock_enforcement_fix.sql`) — worth recording precisely, because it
illustrates a subtle RLS pitfall the task brief's "RLS restricts writes only" framing depends on
understanding: the original policy's `USING (... and not is_business_day_locked(...))` silently
filtered the row out of the UPDATE's affected set *before* `trg_block_after_lock` (a `BEFORE ROW`
trigger) ever ran — so a normal client got a plain "200 / 0 rows changed", not the domain-specific
`ERR_LOCKED_BUSINESS_DAY` the rest of the system depends on to distinguish "locked" from "wrong role"
or "no such row". The fix keeps only the ROLE check in RLS and leaves the lock check as the
trigger's exclusive job, so the same P0001 fires for every caller including `service_role`.

**Source**:
- `supabase/migrations/20260904090900_rls_core.sql:91-97` (original: `write_judge` insert, lock-aware `no_write_when_locked`/`no_delete_when_locked`)
- `supabase/migrations/20260904091100_lock_enforcement_fix.sql:1-22` (the silent-row-filtering problem, explained in the file's own header comment), `:24-31` (`write_judge_update`/`write_judge_delete`, role-only)

### Related Routes

- (mirrors PERM004)

### Related Screens

- (mirrors PERM004)

### Permission Rules

| Role | Allow | Conditions |
|------|-------|------------|
| ROLE-JUDGE | ✓ | INSERT/UPDATE/DELETE — lock enforcement is the DB trigger's job, not this policy's |
| All other 6 roles | ✗ | RLS violation (INSERT) / 0 rows silently filtered (UPDATE/DELETE) |

### Related Modules

- (none additional)

---

## PERM033: TransactionRlsWrites

**Type**: data-permission
**Enforced At**: Layer 3 (RLS), server

### Description

`ROLE-TRADE` may INSERT/UPDATE `transaction`. Same lock-enforcement-fix history as PERM032 — the
lock check was removed from this policy's `USING` clause; `trg_block_after_lock` is the real
guarantee.

**Source**:
- `supabase/migrations/20260904091000_rls_ops.sql:7-11` (original policies)
- `supabase/migrations/20260904091100_lock_enforcement_fix.sql:33-36` (`write_trade_update`, role-only, post-fix)

### Related Routes

- (mirrors PERM006, PERM007)

### Related Screens

- (mirrors PERM006, PERM007)

### Permission Rules

| Role | Allow | Conditions |
|------|-------|------------|
| ROLE-TRADE | ✓ | INSERT/UPDATE |
| All other 6 roles | ✗ | RLS violation (INSERT) / 0 rows silently filtered (UPDATE) |

### Related Modules

- (none additional)

---

## PERM034: SeriResultRlsWrites

**Type**: data-permission
**Enforced At**: Layer 3 (RLS), server

### Description

`ROLE-TRADE` INSERTs; `ROLE-TRADE` **or** `ROLE-SETTLEMENT` may UPDATE — matching PERM009's 2-role
API allowlist exactly. Same lock-enforcement-fix history.

**Source**:
- `supabase/migrations/20260904091000_rls_ops.sql:15-25` (original policies)
- `supabase/migrations/20260904091100_lock_enforcement_fix.sql:38-41` (`write_trade_settlement_update`, role-only, post-fix)

### Related Routes

- (mirrors PERM008, PERM009)

### Related Screens

- (mirrors PERM008, PERM009)

### Permission Rules

| Role | Allow | Conditions |
|------|-------|------------|
| ROLE-TRADE | ✓ | INSERT+UPDATE |
| ROLE-SETTLEMENT | ✓ | UPDATE only |
| ROLE-INTAKE, ROLE-JUDGE, ROLE-DELIVERY, ROLE-RULE-ADMIN, ROLE-SYS-ADMIN | ✗ | No write access |

### Related Modules

- (none additional)

---

## PERM035: DeliveryAndDeliveryShipmentRlsWrites

**Type**: data-permission
**Enforced At**: Layer 3 (RLS), server

### Description

`delivery`: `ROLE-DELIVERY` **or** `ROLE-SETTLEMENT` may INSERT/UPDATE (F006 lets either confirm
completion, per functional-spec §5.2 — note PERM011's finding that the actual API route narrows this
to `ROLE-SETTLEMENT` only for the completion action specifically, a stricter subset of what RLS
alone allows). No lock check — `delivery` spans business days (QĐ-3 exempt), same as `lot`.
`delivery_shipment`: `ROLE-DELIVERY` INSERTs; `ROLE-DELIVERY` UPDATEs (lock check removed from RLS by
the same later fix, enforced by the trigger instead, keyed to the shipment's own `business_date`).

**Source**:
- `supabase/migrations/20260904091000_rls_ops.sql:29-41` (delivery insert/update, both roles; delivery_shipment original policies)
- `supabase/migrations/20260904091100_lock_enforcement_fix.sql:43-46` (`write_delivery_update`, role-only, post-fix)

### Related Routes

- (mirrors PERM010, PERM011)

### Related Screens

- (mirrors PERM010, PERM011)

### Permission Rules

| Role | Allow | Conditions |
|------|-------|------------|
| ROLE-DELIVERY, ROLE-SETTLEMENT | ✓ | INSERT+UPDATE on `delivery` |
| ROLE-DELIVERY | ✓ | INSERT+UPDATE on `delivery_shipment` |
| All other roles | ✗ | No write access to either table |

### Related Modules

- (none additional)

---

## PERM036: BusinessDayLockRlsWrites

**Type**: data-permission
**Enforced At**: Layer 3 (RLS), server

### Description

`ROLE-SETTLEMENT` may INSERT only — **no UPDATE/DELETE policy exists for `business_day_lock`
anywhere**, structurally enforcing the one-way lock (PERM012) at the data layer too: even if an
UPDATE/DELETE route existed, RLS alone would already reject it for every role.

**Source**: `supabase/migrations/20260904091000_rls_ops.sql:45-46` (`write_settlement`, insert-only)

### Related Routes

- (mirrors PERM012)

### Related Screens

- (mirrors PERM012)

### Permission Rules

| Role | Allow | Conditions |
|------|-------|------------|
| ROLE-SETTLEMENT | ✓ (INSERT only) | PK on `business_date` turns a double-lock race into `23505` |
| Any role | ✗ (UPDATE/DELETE) | No policy exists for either operation |

### Related Modules

- (none additional)

---

## PERM037: CorrectionAndAdjustmentRlsWrites

**Type**: data-permission
**Enforced At**: Layer 3 (RLS), server

### Description

`correction_request`: `ROLE-SETTLEMENT` INSERT+UPDATE (the UPDATE is the approve/reject step —
PERM015's maker-checker identity check is enforced above this, in the application layer, not by
RLS). `transaction_adjustment`: `ROLE-SETTLEMENT` INSERT-only, append-only (no update/delete
policy) — the reverse/delta ledger entry is never edited once written.

**Source**: `supabase/migrations/20260904091000_rls_ops.sql:53-59` (`write_settlement_insert`/`write_settlement_update` on `correction_request`; `write_settlement` insert-only on `transaction_adjustment`)

### Related Routes

- (mirrors PERM013, PERM014, PERM015)

### Related Screens

- (mirrors PERM013, PERM014, PERM015)

### Permission Rules

| Role | Allow | Conditions |
|------|-------|------------|
| ROLE-SETTLEMENT | ✓ | INSERT+UPDATE on `correction_request`; INSERT-only on `transaction_adjustment` |
| All other 6 roles | ✗ | No write access to either table |

### Related Modules

- (none additional)

---

## PERM038: IncentiveRuleVersionRlsWrites

**Type**: data-permission
**Enforced At**: Layer 3 (RLS), server

### Description

`ROLE-RULE-ADMIN` may INSERT+UPDATE `incentive_rule_version` — mirrors PERM016/017/019's API-level
gates. PERM018/020's maker-checker identity checks are application-layer, not RLS.

**Source**: `supabase/migrations/20260904091000_rls_ops.sql:63-67` (`write_rule_admin_insert`/`write_rule_admin_update`)

### Related Routes

- (mirrors PERM016, PERM017, PERM019)

### Related Screens

- (mirrors PERM016, PERM017, PERM019)

### Permission Rules

| Role | Allow | Conditions |
|------|-------|------------|
| ROLE-RULE-ADMIN | ✓ | INSERT+UPDATE |
| All other 6 roles | ✗ | No write access |

### Related Modules

- (none additional)

---

## PERM039: IncentiveResultAndPaymentRecordSystemOnly

**Type**: data-permission
**Enforced At**: Layer 3 (RLS), server (service_role only)

### Description

Neither `incentive_result` nor `payment_record` has **any** authenticated write policy — deliberately.
`incentive_result` is written only by a background job (F009 A5) via `service_role` or a
`SECURITY DEFINER` function; regular sessions get read-only access from the shared read policy
(PERM027). `payment_record` is explicitly seed-only mock data (per data-model.md's MODEL016 note —
not a real payment ledger, added by the LAB-3 plan to supply `eligible_amount_jpy`/`paid_on_time`
inputs `ALG-002` needs). **No role, including `ROLE-SETTLEMENT`, can write either table through the
app.**

**Source**:
- `supabase/migrations/20260904091000_rls_ops.sql:69-76` (comment block explaining both tables' deliberate absence of an authenticated write policy)
- Confirmed by the same repo-wide grep as PERM028: zero insert/update/delete policy rows for
  `incentive_result` or `payment_record`

### Related Routes

- (none — no route in this codebase writes to either table)

### Related Screens

- SCR021_IncentiveResult reads `incentive_result` (read-only)

### Permission Rules

| Role | Allow | Conditions |
|------|-------|------------|
| Any of the 7 roles (authenticated) | ✗ | No write policy exists for either table |
| `service_role` / `SECURITY DEFINER` function | ✓ | Only path — background job (F009 A5) or seed script |

### Related Modules

- (none)

---

## PERM040: AccountingExportBatchRlsWrites

**Type**: data-permission
**Enforced At**: Layer 3 (RLS), server

### Description

`ROLE-SETTLEMENT` may INSERT only — **no UPDATE/DELETE policy exists**, matching the append-only
pattern of `audit_log`/`lot_attachment`: an export already handed to finance must never be edited in
place, only superseded by a brand-new batch (new `batch_code` per export, including re-exports).
Deliberately **not** covered by `trg_block_after_lock` — that trigger only fires on
`UPDATE OR DELETE`, and this table only ever receives INSERTs; an export must succeed even for an
already-locked business day.

**Source**: `supabase/migrations/20260908090000_accounting_export.sql:49-57` (`read_all_active_users`
select; `write_settlement` insert-only), `:59-67` (comment on the deliberate trigger exemption)

### Related Routes

- (mirrors PERM025)

### Related Screens

- (mirrors PERM025)

### Permission Rules

| Role | Allow | Conditions |
|------|-------|------------|
| ROLE-SETTLEMENT | ✓ (INSERT only) | Succeeds even on a locked business_date, by design |
| Any role | ✗ (UPDATE/DELETE) | No policy exists for either operation |

### Related Modules

- (none additional)

---

## Summary

- **Total Permission Items**: 40
- **By Type**: route-guard: 2, screen-permission: 0 (folded into role-based blocks, see Design note),
  action-permission: 1, data-permission: 14, role-based: 20, resource-ownership: 3,
  field-permission: 0, api-scope: 0, feature-flag: 0, experiment: 0, env-gate: 0, locale-gate: 0

---

## Cross-Reference Validation

- [x] All PERM### codes are unique
- [ ] All PERM### codes are referenced in FeatureList.md — **not verified this pass**: `feature-list.md`
  does not exist yet (`_session-context.md`: `feature_count: <pending-W5>`, Wave 5 not yet run). To be
  verified once feature synthesis backfills `Owner F###` across all artifacts.
- [x] All related route references are valid (cross-checked against `route-list.md`'s `ROUTE001`-`ROUTE038`
  paths by method+path, not by its now-superseded `Owner F###`/legacy SCR parentheticals)
- [x] All related screen references use `screen-list.md`'s **current, gate-PASSED** SCR001-026/REG###
  numbering — **not** `route-list.md`'s own parenthetical screen codes, several of which cite an
  earlier renumbering generation (e.g. route-list.md's `(SCR004_LotIntake)` is screen-list.md's
  current `SCR007_LotIntake`; `(SCR006_LotDetail)` is current `SCR009_LotDetail`; `(SCR008_TransactionList`
  is current `SCR011_TransactionsList`/`SCR012_TransactionDetail`). Every screen ref above was verified
  by **screen NAME** against screen-list.md's own index table (lines 25-50), not trusted from
  route-list.md's parenthetical codes directly — this file uses screen-list.md's numbering as the sole
  source of truth for SCR###/REG### codes.
- [x] All related module references are valid
- [x] No orphaned permission references

---

## Client-Side Gate Types

No `feature-flag`, `experiment`, `env-gate`, or `locale-gate` mechanism was found anywhere in this
codebase (grep for `useFlag|useFeature|isEnabled|featureFlag\(|checkFlag`,
`useExperiment|getVariant|abTest\(`, `process\.env\..*(===|!==)` UI branches, and
`i18n\.locale\s*===|currentLocale|getLocale\(\)\s*===` content branches all returned no matches
relevant to authorization/permission gating). The app's i18n (`vi`/`ja`) switches dictionary content
uniformly for all roles — it is not a permission gate. The one locale-adjacent finding
(`POST /api/locale` missing its Layer-2 call) is documented as **PERM002**, typed `route-guard` — it
is an authorization gap, not a locale-conditioned UI branch, so it does not belong in this section.
