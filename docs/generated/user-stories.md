# User Stories

**Project**: sakura-market
**Generated**: 2026-09-08
**Analysis Scope**: All 26 `SCR###` screens (`screen-list.md`) + 2 global-layout actions (`AppShell`/`TopHeader`, rendered on every `(app)/*` page but not owned by any single `page.tsx`) — 44 `US###` total, zero `system`-typed.

**Code Format**: All US codes follow `US###_NameSlug` (e.g., US001_SignIn).

**US Types**: all 44 stories below are `ui` (require Screen mapping). No `system`-typed story was written — see Method note 4.

## Method notes

1. **SCR### resolution.** Screen references below use `screen-list.md`'s current 26-code numbering, never `route-list.md`'s stale internal-registry parentheticals (e.g. `route-list.md`'s `(SCR004_LotIntake)` is `SCR007_LotIntake` here). Composite-screen mutations/reads cite `SCR###/REG###` per `code-formats.md`'s composite cross-ref convention.
2. **Actor selection for "any active role" screens.** `permissions.md` confirms every active account can read almost everything; only writes are role-gated. Where a read screen has no role gate, this document still names one concrete, defensible representative actor per the domain's own owning role (stated in the code's own comments — e.g. `transactions/page.tsx:15-17` calls itself "ROLE-TRADE's landing page"), and states in Technical Notes that the read itself is universal. Global, zero-role-branch actions (Sign In, Sign Out, Switch UI Language) are all authored from **Settlement**'s standpoint for consistency across the document — Settlement is `permissions.md`'s own "operationally central" role — with an explicit "identical for all 7 roles" note in each. This satisfies the Wave 4.5 gate's "named human actor" requirement without inventing an 8th generic label.
3. **Two demo accounts, one role, one maker-checker check.** `settlement@`/`settlement-lead@` share `ROLE-SETTLEMENT`; `ruleadmin@`/`rulechecker@` share `ROLE-RULE-ADMIN`. Both pairs enforce an **identity** check, not a role check (`403 SELF_APPROVAL` / `403 SELF_ROLLBACK`) — the requester/creator cannot also be the approver. This yields two genuinely distinct story pairs, both written below: US031/US033/US034 (correction requester vs. approver/rejecter) and US037/US039/US040 (rule-version creator vs. approver/rollback-er).
4. **No `system`-typed story.** `behavior-logic.md` (per task brief) contains exactly 2 items, both a client-side cross-tab navigation sync with no human trigger and no observable user-facing outcome — it fails the Valid User Story bar (no actor, no testable pass/fail from a human's perspective) and is out of scope here. This codebase has no cron, queue, worker, or notification logic anywhere; every `US###` below is triggered by a person clicking something, never by the system acting on its own.
5. **No delivery-creation story.** The app has no `POST /api/deliveries` — across all of `src/`, `delivery` table access is 7 `.select(`/3 `.update(`, zero inserts (`route-list.md` ROUTE010 note; only `supabase/seed.sql:149` ever inserts a row). US027/US028 below are scoped to recording shipments **against**, and completing, an **existing** delivery only — no story assumes a delivery is created from a confirmed transaction. `[UNVERIFIED]`: the exact code path (if any) that would create one was not traced; out of scope for this pass.
6. **Mock reports stay mock — but the two report endpoints reject them differently, and the distinction is load-bearing.** RPT-04/09/10/11/12 (5 of 12) are mock. The **export** endpoint refuses them with `403 MOCK_REPORT` (`export.csv/route.ts:33`); the **view** endpoint has no rejection branch at all and returns `200` with `rows: []`, `total: 0`, `isMock: true` (`load-report-rows.ts:78`, flag echoed at `route.ts:31`). Verified live: `GET /api/reports/RPT-04` → 200 `isMock:true`, `GET /api/reports/RPT-04/export.csv` → 403. US042 scopes to the view endpoint, US043 to the export endpoint; neither claims a mock report's export works.
7. **Merge exception applied.** Per `user-stories-ipe-protocol.md` Step 3 (web/`route-view`), a screen's "view" and its own GET-param filter share one US (same actor, same endpoint, no conditional branching between filtered/unfiltered — only input params differ). Two mutations sharing one endpoint but branching on outcome (correction approve/reject, both `POST .../approve` with `decision: "approve"|"reject"`) are split — approve triggers an incentive-delta side effect (`approve/route.ts:90-93`) that reject does not, a genuine data-flow branch, condition (c) fails.

## Interaction Inventory

| Screen | Element | Type | Action | Endpoint |
|--------|---------|------|--------|---------|
| SCR001_Login | LoginForm | primary-action | submit credentials, redirect to role landing | POST /api/auth/sign-in |
| Global layout (all `(app)/*`) | Sign-out button (`user-menu.tsx`) | secondary-action | end session, redirect to /login | POST /api/auth/sign-out |
| Global layout (all `(app)/*`) | LocaleSwitcher | secondary-action | set VI/JA UI-language cookie | POST /api/locale |
| SCR002_Home | ProcessFlow stage nodes | secondary-action | view aggregated pipeline status across 6 domains | N/A (direct queries) |
| SCR003_ParticipantList | ParticipantFilters + ParticipantTable | secondary-action | view/filter participants by category+status | GET /api/participants |
| SCR004_ParticipantNew | ParticipantForm (create) | primary-action | create a participant | POST /api/participants |
| SCR005_ParticipantDetail | ParticipantProfileFields + TransitionHistoryTable | secondary-action | view profile + eligibility + transition history | N/A (direct query) |
| SCR005_ParticipantDetail | ParticipantForm (edit) | primary-action | edit participant fields | PATCH /api/participants/:id |
| SCR005_ParticipantDetail | TransitionActions | primary-action | change a participant's lifecycle status | POST /api/participants/:id/transition |
| SCR006_LotsList | table (inline) | secondary-action | view lots | GET /api/lots |
| SCR007_LotIntake | KeyboardOperableForm | primary-action | receive a new lot | POST /api/lots |
| SCR009_LotDetail | LotAvailabilityFields + LotAttachmentsCard + LotAuditHistoryTable | secondary-action | view lot detail, attachments, audit history | GET /api/lots/:id |
| SCR008_MekikiEntry | MekikiForm | primary-action | grade a received lot (目利き) | POST /api/lots/:id/mekiki |
| SCR009_LotDetail | LotEditForm | primary-action | edit a lot's item/package_count | PATCH /api/lots/:id |
| SCR011_TransactionsList | TransactionTable | secondary-action | view/filter negotiated trades | GET /api/transactions |
| SCR010_AitaiCreate | AitaiCreateForm | primary-action | create a negotiated trade (相対取引) | POST /api/transactions |
| SCR012_TransactionDetail | TransactionDetailFields + TransactionAuditHistoryTable | secondary-action | view transaction detail + audit history | N/A (direct query) |
| SCR012_TransactionDetail | ConfirmCancelButtonGroup (confirm) | primary-action | confirm a draft trade | POST /api/transactions/:id/confirm |
| SCR012_TransactionDetail | ConfirmCancelButtonGroup (cancel) | destructive-action | cancel a trade | POST /api/transactions/:id/cancel |
| SCR014_SeriList | table (inline) | secondary-action | view/look up auction results | GET /api/seri-results |
| SCR013_SeriEntry | SeriEntryForm (create) | primary-action | record a seri (せり) auction result | POST /api/seri-results |
| SCR015_SeriDetail | SeriRecordFields + SeriEditHistory | secondary-action | view seri result detail + edit history | GET /api/seri-results/:id |
| SCR015_SeriDetail | SeriEntryForm (edit, as Trade) | primary-action | edit a seri result | PATCH /api/seri-results/:id |
| SCR015_SeriDetail | SeriEntryForm (edit, as Settlement) | primary-action | edit a seri result | PATCH /api/seri-results/:id |
| SCR016_DeliveryList | DeliveryTable | secondary-action | view/filter deliveries | GET /api/deliveries |
| SCR017_DeliveryDetail | StageProgressBar + ShipmentHistoryTable | secondary-action | view delivery detail + shipment history | N/A (direct query) |
| SCR017_DeliveryDetail | ShipmentForm | primary-action | record a shipment against a delivery | POST /api/deliveries/:id/shipments |
| SCR017_DeliveryDetail | DeliveryProgress (complete action) | primary-action | mark a delivery complete | POST /api/deliveries/:id/complete |
| SCR018_ReconcileAndLock | ReconcileTable | secondary-action | view reconciliation lines for a business date | GET /api/reconciliation/:businessDate |
| SCR018_ReconcileAndLock | LockConfirmDialog | destructive-action | lock a business day (one-way, never reversed) | POST /api/reconciliation/:businessDate/lock |
| SCR019_CorrectionRequest | CorrectionRequestForm | primary-action | request a correction on a locked transaction | POST /api/corrections |
| SCR020_CorrectionApproval | CorrectionListTable | secondary-action | view the correction approval queue | GET /api/corrections |
| SCR020_CorrectionApproval | CorrectionListTable (approve action) | primary-action | approve a correction request | POST /api/corrections/:id/approve |
| SCR020_CorrectionApproval | CorrectionListTable (reject action) | destructive-action | reject a correction request | POST /api/corrections/:id/approve (`decision: "reject"`) |
| SCR021_IncentiveResult | IncentiveResultTable | secondary-action | view incentive (完納奨励金) results by period | GET /api/incentive-results |
| SCR022_RuleVersionList | RuleVersionTable | secondary-action | view incentive rule versions | GET /api/incentive-rules |
| SCR023_RuleVersionNew | RuleVersionForm | primary-action | create a new incentive rule version | POST /api/incentive-rules |
| SCR024_RuleVersionDetail | RuleVersionFields | secondary-action | view rule version detail + rollback candidates | N/A (direct query) |
| SCR024_RuleVersionDetail | RuleVersionDetailActions (approve) | primary-action | approve a pending rule version | POST /api/incentive-rules/:id/approve |
| SCR024_RuleVersionDetail | RuleVersionDetailActions (rollback) | primary-action | roll back to an earlier rule version | POST /api/incentive-rules/:id/rollback |
| SCR025_ReportCatalog | MockDataBadge + catalog list | secondary-action | view the 12-report catalog | GET /api/reports |
| SCR026_ReportViewer | ReportFilterForm + ReportResultTable | secondary-action | view/filter one report's rows | GET /api/reports/:reportCode |
| SCR026_ReportViewer | export link | secondary-action | export a report's data as CSV | GET /api/reports/:reportCode/export.csv |
| SCR026_ReportViewer | CreateExportBatchButton | primary-action | create a daily accounting export batch | POST /api/accounting/export-batches |

## User Story Index

| Code | Title | Type | Priority | Screens |
|------|-------|------|----------|---------|
| US001_SignIn | Sign In | ui | High | SCR001_Login |
| US002_SignOut | Sign Out | ui | Low | SCR002_Home (shared layout, all `(app)/*`) |
| US003_SwitchUILanguage | Switch UI Language | ui | Low | SCR002_Home (shared layout, all `(app)/*`) |
| US004_ViewPipelineDashboard | View Pipeline Dashboard | ui | Medium | SCR002_Home |
| US005_ViewParticipantList | View Participant List | ui | Medium | SCR003_ParticipantList |
| US006_CreateParticipant | Create a Participant | ui | High | SCR004_ParticipantNew |
| US007_ViewParticipantDetail | View Participant Detail | ui | Medium | SCR005_ParticipantDetail/REG001, SCR005_ParticipantDetail/REG004 |
| US008_EditParticipant | Edit a Participant | ui | High | SCR005_ParticipantDetail/REG002 |
| US009_TransitionParticipantStatus | Transition a Participant's Status | ui | High | SCR005_ParticipantDetail/REG003 |
| US010_ViewLotsList | View Lots List | ui | Medium | SCR006_LotsList |
| US011_ReceiveLot | Receive a Lot | ui | High | SCR007_LotIntake |
| US012_ViewLotDetail | View Lot Detail | ui | Medium | SCR009_LotDetail/REG001, SCR009_LotDetail/REG002, SCR009_LotDetail/REG004 |
| US013_GradeLot | Grade a Lot | ui | High | SCR008_MekikiEntry |
| US014_EditLot | Edit a Lot's Item/Package Count | ui | High | SCR009_LotDetail/REG003 |
| US015_ViewTransactionsList | View Transactions List | ui | Medium | SCR011_TransactionsList |
| US016_CreateAitai | Create a Negotiated Trade | ui | High | SCR010_AitaiCreate |
| US017_ViewTransactionDetail | View Transaction Detail | ui | Medium | SCR012_TransactionDetail/REG001, SCR012_TransactionDetail/REG003 |
| US018_ConfirmTrade | Confirm a Draft Trade | ui | High | SCR012_TransactionDetail/REG002 |
| US019_CancelTrade | Cancel a Trade | ui | High | SCR012_TransactionDetail/REG002 |
| US020_ViewSeriList | View Seri Lookup List | ui | Medium | SCR014_SeriList |
| US021_RecordSeriResult | Record a Seri Result | ui | High | SCR013_SeriEntry |
| US022_ViewSeriDetail | View Seri Result Detail | ui | Medium | SCR015_SeriDetail/REG001, SCR015_SeriDetail/REG003 |
| US023_EditSeriResultAsTrade | Edit a Seri Result (as Trade) | ui | High | SCR015_SeriDetail/REG002 |
| US024_EditSeriResultAsSettlement | Edit a Seri Result (as Settlement) | ui | High | SCR015_SeriDetail/REG002 |
| US025_ViewDeliveryList | View Delivery List | ui | Medium | SCR016_DeliveryList |
| US026_ViewDeliveryDetail | View Delivery Detail | ui | Medium | SCR017_DeliveryDetail/REG001, SCR017_DeliveryDetail/REG003 |
| US027_RecordShipment | Record a Shipment | ui | High | SCR017_DeliveryDetail/REG002 |
| US028_CompleteDelivery | Complete a Delivery | ui | High | SCR017_DeliveryDetail/REG001 |
| US029_ViewReconciliationLines | View Reconciliation Lines | ui | Medium | SCR018_ReconcileAndLock |
| US030_LockBusinessDay | Lock a Business Day | ui | High | SCR018_ReconcileAndLock |
| US031_RequestCorrection | Request a Correction | ui | High | SCR019_CorrectionRequest |
| US032_ViewCorrectionQueue | View Correction Approval Queue | ui | Medium | SCR020_CorrectionApproval |
| US033_ApproveCorrection | Approve a Correction Request | ui | High | SCR020_CorrectionApproval |
| US034_RejectCorrection | Reject a Correction Request | ui | High | SCR020_CorrectionApproval |
| US035_ViewIncentiveResults | View Incentive Results | ui | Medium | SCR021_IncentiveResult |
| US036_ViewRuleVersionList | View Rule Version List | ui | Medium | SCR022_RuleVersionList |
| US037_CreateRuleVersion | Create a New Incentive Rule Version | ui | High | SCR023_RuleVersionNew |
| US038_ViewRuleVersionDetail | View Rule Version Detail | ui | Medium | SCR024_RuleVersionDetail |
| US039_ApproveRuleVersion | Approve a Rule Version | ui | High | SCR024_RuleVersionDetail |
| US040_RollbackRuleVersion | Roll Back to an Earlier Rule Version | ui | High | SCR024_RuleVersionDetail |
| US041_ViewReportCatalog | View Report Catalog | ui | Medium | SCR025_ReportCatalog |
| US042_ViewReportData | View Report Data | ui | Medium | SCR026_ReportViewer/REG001 |
| US043_ExportReportData | Export Report Data as CSV | ui | Medium | SCR026_ReportViewer/REG001 |
| US044_CreateExportBatch | Create a Daily Accounting Export Batch | ui | High | SCR026_ReportViewer/REG002 |

---

## US001_SignIn: Sign In

**Type**: ui
**Interaction**: primary-action
**Priority**: High
**Estimate**: S

### User Story

As a Settlement officer (identical for all 7 roles — the handler has no role branch), I want to sign in with my market account credentials so that I can reach my role's landing page and start my work.

### Acceptance Criteria

- [ ] Valid credentials for an active account redirect to the role-specific landing page (`src/lib/auth/role-landing.ts:24-32`); wrong password and an inactive account both return the byte-identical `401 invalid_credentials` (`sign-in/route.ts:16-18`) so a caller cannot distinguish the two.
- [ ] An already-signed-in visitor who opens `/login` is redirected away before the form even renders (`(auth)/login/page.tsx:23-25`).
- [ ] Too many failed attempts locks the account (`403`, `lockout.ts`).

### Technical Notes

- **Endpoint**: POST /api/auth/sign-in (ROUTE002, `src/app/api/auth/sign-in/route.ts:134`)
- **Data Required**: username/password (accounts are provisioned outside the app entirely — no self-registration exists anywhere)
- **Dependencies**: none — pre-auth, public path (`proxy.ts` `isPublicPath`)

### Screens

- SCR001_Login: Login

### Test Scenarios

| Scenario | Given | When | Then |
|----------|-------|------|------|
| Happy Path | an active account with correct credentials | the form is submitted | `200 {redirectTo}` to the role's landing page |
| Error Case | a wrong password, or an inactive account | the form is submitted | `401 invalid_credentials` (identical wording either way) |

---

## US002_SignOut: Sign Out

**Type**: ui
**Interaction**: secondary-action
**Priority**: Low
**Estimate**: S

### User Story

As a Settlement officer (identical for all 7 roles), I want to sign out of the application so that my session ends on this device.

### Acceptance Criteria

- [ ] The session is audited before it is torn down — the audit write happens BEFORE `supabase.auth.signOut()` runs, by design (`sign-out/route.ts:8-29`).
- [ ] The call succeeds and redirects to `/login` whether or not a live session still exists at call time.

### Technical Notes

- **Endpoint**: POST /api/auth/sign-out (ROUTE003, `src/app/api/auth/sign-out/route.ts:8-32`)
- **Data Required**: none
- **Dependencies**: rendered inside `TopHeader`/`AppShell`, itself gated by `requireUser()` on every `(app)/*` page (`(app)/layout.tsx:11`); button trigger at `src/components/layout/user-menu.tsx:27`

### Screens

- SCR002_Home (shared `AppShell` layout — rendered on all 25 `(app)/*` screens, SCR002–SCR026; anchored here since it is not owned by one page)

### Test Scenarios

| Scenario | Given | When | Then |
|----------|-------|------|------|
| Happy Path | a signed-in user clicks Sign Out | request is sent | `200 {redirectTo: "/login"}` |
| Error Case | an unexpected server error during teardown | request is sent | `500 internal` |

---

## US003_SwitchUILanguage: Switch UI Language

**Type**: ui
**Interaction**: secondary-action
**Priority**: Low
**Estimate**: S

### User Story

As a Settlement officer (identical for all 7 roles), I want to switch the interface between Vietnamese and Japanese so that I can read the screen in my preferred language.

### Acceptance Criteria

- [ ] Selecting VI or JA sets a (non-httpOnly) `locale` cookie and the UI re-renders in that language.
- [ ] An invalid value (anything other than `"vi"`/`"ja"`) is rejected with `400`.
- [ ] Per `permissions.md`, this is the one action in the app that only checks a live login session exists — not whether the account's internal `app_user` row is active — but the switcher button itself only ever renders inside `AppShell`, which already requires an active account, so this laxer handler-level check has no practical effect through the UI.

### Technical Notes

- **Endpoint**: POST /api/locale (ROUTE016, `src/app/api/locale/route.ts:9-26`)
- **Data Required**: `locale: "vi" | "ja"`
- **Dependencies**: `src/components/layout/locale-switcher.tsx:18`, rendered inside `TopHeader`/`AppShell`

### Screens

- SCR002_Home (shared `AppShell` layout — rendered on all 25 `(app)/*` screens, SCR002–SCR026)

### Test Scenarios

| Scenario | Given | When | Then |
|----------|-------|------|------|
| Happy Path | a signed-in user picks JA | request is sent | `200`, cookie set, UI text switches |
| Error Case | a malformed body or unsupported locale value | request is sent | `400` |

---

## US004_ViewPipelineDashboard: View Pipeline Dashboard

**Type**: ui
**Interaction**: secondary-action
**Priority**: Medium
**Estimate**: S

### User Story

As a Settlement officer (viewable by any active role; the corrections-pending card is Settlement-exclusive, matching this role's oversight of the whole pipeline), I want to view the aggregated status of the whole market pipeline so that I can see where every lot, trade, seri result, delivery, and correction currently stands without opening six separate screens.

### Acceptance Criteria

- [ ] The dashboard shows one connected flow (not a card grid) across 6 domains: lots, transactions, seri, deliveries, business-day lock, corrections (`(app)/page.tsx:22-26`, `resolve-stage-value.ts:33-68`).
- [ ] The corrections-pending count card renders `forbidden` for every role except Settlement.
- [ ] Each stage node links to its own domain's list screen (e.g. lots → SCR006, transactions → SCR011).

### Technical Notes

- **Endpoint**: N/A — server-rendered direct queries (`countLotsByStatus`, `countTransactionsByStatus`, `countSeriResults`, `countDeliveriesByStatus`, `loadLockStatus`, `countCorrectionsByStatus`)
- **Data Required**: 6 domain-count queries, gated per-card by `stage.allowedRoles`
- **Dependencies**: none

### Screens

- SCR002_Home: Home (pipeline dashboard)

### Test Scenarios

| Scenario | Given | When | Then |
|----------|-------|------|------|
| Happy Path | a signed-in Settlement account | the dashboard loads | all 6 domain cards render, including corrections-pending |
| Error Case | a signed-in non-Settlement account | the dashboard loads | 5 domain cards render; corrections card shows `forbidden` |

---

## US005_ViewParticipantList: View Participant List

**Type**: ui
**Interaction**: secondary-action
**Priority**: Medium
**Estimate**: S

### User Story

As a Sys Admin, I want to view and filter the list of market participants so that I can find the one I need to manage.

### Acceptance Criteria

- [ ] The list is filterable by `?category=&status=` and rewrites the URL query string on filter change (`(app)/participants/page.tsx:20-49`).
- [ ] A "Create" link is shown only when the viewer's role is Sys Admin.
- [ ] Every active role can view this list (`requireUser()`, no role gate on the read).

### Technical Notes

- **Endpoint**: GET /api/participants (ROUTE024)
- **Data Required**: `participant` rows (category, name, license_type, status, valid_from/to)
- **Dependencies**: none

### Screens

- SCR003_ParticipantList: Participant List

### Test Scenarios

| Scenario | Given | When | Then |
|----------|-------|------|------|
| Happy Path | any signed-in account | the page loads with no filters | up to 50 rows returned |
| Error Case | `?category=` or `?status=` set to an invalid value | the page loads | `400 invalid_category`/`invalid_status` |

---

## US006_CreateParticipant: Create a Participant

**Type**: ui
**Interaction**: primary-action
**Priority**: High
**Estimate**: M

### User Story

As a Sys Admin, I want to create a new market participant so that they can be onboarded into the market before any lot or trade names them.

### Acceptance Criteria

- [ ] The form succeeds only for one of the 4 valid categories, with a name and (if applicable) a `valid_from`/`valid_to` window consistent with the category's license type.
- [ ] On success, the account is created in its initial eligibility state.
- [ ] A mismatched category/license, or an invalid date window, is rejected with `422` before any row is written.

### Technical Notes

- **Endpoint**: POST /api/participants (ROUTE025)
- **Data Required**: category, name, license_type, valid_from/to
- **Dependencies**: none

### Screens

- SCR004_ParticipantNew: Participant Create

### Test Scenarios

| Scenario | Given | When | Then |
|----------|-------|------|------|
| Happy Path | a valid category+name+license combination | the form is submitted | `201`, new participant created |
| Error Case | category/license mismatch, or an invalid date window | the form is submitted | `422 category_license_mismatch` / `invalid_valid_from` / `invalid_valid_to` |

---

## US007_ViewParticipantDetail: View Participant Detail

**Type**: ui
**Interaction**: secondary-action
**Priority**: Medium
**Estimate**: S

### User Story

As a Sys Admin (viewable by any active role), I want to view a participant's profile, current eligibility, and full transition history so that I can confirm their standing before dealing with them.

### Acceptance Criteria

- [ ] Profile fields, current FIG-010 eligibility, and the full `participant_status_history` all render from one page load.
- [ ] Each history row's `changed_by` resolves to the acting account's display name (`page.tsx:57-66`), not a raw user id.
- [ ] Edit and transition affordances are hidden (not merely disabled) for any role other than Sys Admin.

### Technical Notes

- **Endpoint**: N/A — server-rendered direct Supabase query (no REST GET route exists for this read; same pattern as US017/US026/US038 below)
- **Data Required**: `participant` row, `participant_status_history` rows, `app_user` display-name lookups
- **Dependencies**: none

### Screens

- SCR005_ParticipantDetail/REG001: Participant Detail (Profile)
- SCR005_ParticipantDetail/REG004: Participant Detail (History)

### Test Scenarios

| Scenario | Given | When | Then |
|----------|-------|------|------|
| Happy Path | any signed-in account, a valid participant id | the page loads | profile + eligibility + history render |
| Error Case | a participant id that does not exist | the page loads | `404 not_found` |

---

## US008_EditParticipant: Edit a Participant

**Type**: ui
**Interaction**: primary-action
**Priority**: High
**Estimate**: M

### User Story

As a Sys Admin, I want to edit a participant's details so that its record stays accurate as its circumstances change.

### Acceptance Criteria

- [ ] `category` is immutable — the request is rejected outright (`422 category_immutable`) if that key is even present in the body, regardless of its value.
- [ ] Any edit that would create a category/license mismatch, or an invalid `valid_from`/`valid_to`, is rejected with `422` and no partial write.
- [ ] A body carrying no editable fields returns `422 no_fields_to_update`.

### Technical Notes

- **Endpoint**: PATCH /api/participants/:id (ROUTE022)
- **Data Required**: any editable field except `category`; a `reason` for the change
- **Dependencies**: `ROLE-SYS-ADMIN` only

### Screens

- SCR005_ParticipantDetail/REG002: Participant Detail (Edit)

### Test Scenarios

| Scenario | Given | When | Then |
|----------|-------|------|------|
| Happy Path | a valid, non-`category` field change with a reason | the form is submitted | `200`, participant updated |
| Error Case | body includes `category` | the form is submitted | `422 category_immutable` |

---

## US009_TransitionParticipantStatus: Transition a Participant's Status

**Type**: ui
**Interaction**: primary-action
**Priority**: High
**Estimate**: M

### User Story

As a Sys Admin, I want to move a participant through its eligibility lifecycle (active / suspended / revoked / under review) so that the market reflects who is currently allowed to participate.

### Acceptance Criteria

- [ ] Every transition requires a `reason`; an empty or missing reason returns `422 reason_required`.
- [ ] A transition that the state machine does not allow from the participant's current status returns `422 illegal_transition` (`state-machine.ts`, `resolveTarget()`).
- [ ] A valid transition records a new `participant_status_history` row and returns the participant's new status.

### Technical Notes

- **Endpoint**: POST /api/participants/:id/transition (ROUTE023)
- **Data Required**: target event, reason
- **Dependencies**: `ROLE-SYS-ADMIN` only

### Screens

- SCR005_ParticipantDetail/REG003: Participant Detail (Transition)

### Test Scenarios

| Scenario | Given | When | Then |
|----------|-------|------|------|
| Happy Path | a legal transition (e.g. active → suspended) with a reason | the action is submitted | `200 {status}` |
| Error Case | an illegal transition for the current status | the action is submitted | `422 illegal_transition` |

---

## US010_ViewLotsList: View Lots List

**Type**: ui
**Interaction**: secondary-action
**Priority**: Medium
**Estimate**: S

### User Story

As an Intake officer (viewable by any active role), I want to view the list of lots so that I can find one to check on, grade, or reference before receiving a new one.

### Acceptance Criteria

- [ ] The list shows lot_code, item, package_count, initial_qty, available_qty, and status for every lot.
- [ ] A "Create" link is shown only when the viewer's role is Intake.
- [ ] A row link to the mekiki-entry screen is shown only for Judge accounts on `status==='received'` rows.

### Technical Notes

- **Endpoint**: GET /api/lots (ROUTE021)
- **Data Required**: `lot` rows
- **Dependencies**: none

### Screens

- SCR006_LotsList: Lots List

### Test Scenarios

| Scenario | Given | When | Then |
|----------|-------|------|------|
| Happy Path | any signed-in account | the page loads | `200`, lot rows render |
| Error Case | zero lots exist yet | the page loads | `EmptyState` renders, no error |

---

## US011_ReceiveLot: Receive a Lot

**Type**: ui
**Interaction**: primary-action
**Priority**: High
**Estimate**: M

### User Story

As an Intake officer, I want to receive a new lot into the market and attach its receipt documents so that it becomes available for grading and sale.

### Acceptance Criteria

- [ ] The form is keyboard-operable end to end (NFR-USE-01); pressing Enter submits, except while focus is inside the file-attachment field.
- [ ] On success the screen shows the newly assigned `lot_code`, a link forward to grade it, and a reset action to immediately start the next intake.
- [ ] Zero or more attachment files may be attached; a per-file upload failure is surfaced as an `attachmentsFailed` count, not a failed intake — the lot itself is still created.

### Technical Notes

- **Endpoint**: POST /api/lots (ROUTE020, `multipart/form-data`)
- **Data Required**: item, package_count, initial_qty, 0+ attachment files
- **Dependencies**: `ROLE-INTAKE` only

### Screens

- SCR007_LotIntake: Lot Intake

### Test Scenarios

| Scenario | Given | When | Then |
|----------|-------|------|------|
| Happy Path | valid lot fields, 0 or more attachments | the form is submitted | `201`, `lot_code` + `attachmentsFailed` count shown |
| Error Case | malformed multipart form | the form is submitted | `400 invalid_request` |

---

## US012_ViewLotDetail: View Lot Detail

**Type**: ui
**Interaction**: secondary-action
**Priority**: Medium
**Estimate**: S

### User Story

As an Intake officer (viewable by any active role), I want to view a lot's pipeline stage, availability, attachments, and audit history so that I can track it through the process I started.

### Acceptance Criteria

- [ ] The stage-progress indicator reflects `lot.status`; availability fields show `available_qty` vs. `initial_qty`.
- [ ] Every attached receipt document (`lot_attachment` rows) is listed.
- [ ] The edit form is shown only to Settlement accounts; every other role sees a read-only view.

### Technical Notes

- **Endpoint**: GET /api/lots/:id (ROUTE018) → `loadLot()` + `loadLotAuditHistory()`
- **Data Required**: `lot` row, `lot_attachment` rows (`loadLotAttachments`), `audit_log` rows (lot-scoped)
- **Dependencies**: none

### Screens

- SCR009_LotDetail/REG001: Lot Detail (Overview)
- SCR009_LotDetail/REG002: Lot Detail (Attachments)
- SCR009_LotDetail/REG004: Lot Detail (History)

### Test Scenarios

| Scenario | Given | When | Then |
|----------|-------|------|------|
| Happy Path | a valid lot id | the page loads | `200`, stage/availability/attachments/history all render |
| Error Case | a lot id that does not exist | the page loads | `404 not_found` |

---

## US013_GradeLot: Grade a Lot

**Type**: ui
**Interaction**: primary-action
**Priority**: High
**Estimate**: M

### User Story

As a Judge, I want to record a 目利き (mekiki) grade for a received lot so that it becomes eligible for sale.

### Acceptance Criteria

- [ ] The grading form is shown only once the lot's status is `received`; every other role, or an ineligible lot, sees an explanatory notice instead.
- [ ] A compare-and-swap on `lot.status` protects the write — grading an already-graded/ineligible lot returns `409 lot_not_receivable`.
- [ ] A successful grade advances the lot to `published` and is immediately reflected on SCR009's stage indicator.

### Technical Notes

- **Endpoint**: POST /api/lots/:id/mekiki (ROUTE017)
- **Data Required**: grade fields (per `MekikiForm`)
- **Dependencies**: `ROLE-JUDGE` only; lot must be `status==='received'`

### Screens

- SCR008_MekikiEntry: Mekiki (目利き) Entry

### Test Scenarios

| Scenario | Given | When | Then |
|----------|-------|------|------|
| Happy Path | a `received` lot, a Judge account | the form is submitted | `201`, lot advances to `published` |
| Error Case | a lot not currently `received` | the form is submitted | `409 lot_not_receivable` |

---

## US014_EditLot: Edit a Lot's Item/Package Count

**Type**: ui
**Interaction**: primary-action
**Priority**: High
**Estimate**: M

### User Story

As a Settlement officer, I want to correct a lot's item name or package count after intake so that a data-entry mistake doesn't propagate into grading or sale.

### Acceptance Criteria

- [ ] Only `item` and `package_count` may be changed — `available_qty` is deliberately excluded from the allowlist, so it can never be edited through this action.
- [ ] The edit is refused with `423 locked_business_date` if the lot's associated business date is already locked (though the `lot` table itself is exempt from the day-lock trigger, this app-level allowlist check still applies).
- [ ] Edit access is limited to Settlement — every other role sees a read-only lot detail.

### Technical Notes

- **Endpoint**: PATCH /api/lots/:id (ROUTE019)
- **Data Required**: `item` and/or `package_count`
- **Dependencies**: `ROLE-SETTLEMENT` only

### Screens

- SCR009_LotDetail/REG003: Lot Detail (Edit)

### Test Scenarios

| Scenario | Given | When | Then |
|----------|-------|------|------|
| Happy Path | a valid `item`/`package_count` change | the form is submitted | `200`, lot updated |
| Error Case | the request includes `available_qty` | the form is submitted | `422 invalid_request` (not in allowlist) |

---

## US015_ViewTransactionsList: View Transactions List

**Type**: ui
**Interaction**: secondary-action
**Priority**: Medium
**Estimate**: S

### User Story

As a Trade officer, I want to view and filter negotiated trades so that I can track the ~90% of transaction value this business handles through 相対取引 (`transactions/page.tsx:15-17`).

### Acceptance Criteria

- [ ] The list is filterable by `businessDate` and `status`.
- [ ] `lot_code` and buyer name are resolved for display only (2 denormalization lookups) — they are not independent capabilities.
- [ ] A "Create" link is shown only to Trade accounts.

### Technical Notes

- **Endpoint**: GET /api/transactions (ROUTE038)
- **Data Required**: `transaction` rows, up to 100
- **Dependencies**: none

### Screens

- SCR011_TransactionsList: Transactions List

### Test Scenarios

| Scenario | Given | When | Then |
|----------|-------|------|------|
| Happy Path | any signed-in account | the page loads | up to 100 filtered rows render |
| Error Case | an unexpected server error | the page loads | `500 internal` |

---

## US016_CreateAitai: Create a Negotiated Trade

**Type**: ui
**Interaction**: primary-action
**Priority**: High
**Estimate**: M

### User Story

As a Trade officer, I want to create a negotiated trade (相対取引, aitai) against a published lot so that a buyer and this market can agree a sale.

### Acceptance Criteria

- [ ] The lot dropdown is pre-filtered to `status==='published'` and `available_qty>0` only.
- [ ] A lot that becomes unavailable between page load and submit is rejected with `422 lot_not_available`.
- [ ] On success the screen navigates to the new transaction's own detail page.

### Technical Notes

- **Endpoint**: POST /api/transactions (ROUTE037)
- **Data Required**: lot id, buyer participant id, qty, price, business_date
- **Dependencies**: `ROLE-TRADE` only

### Screens

- SCR010_AitaiCreate: Aitai (相対取引) Create

### Test Scenarios

| Scenario | Given | When | Then |
|----------|-------|------|------|
| Happy Path | a published lot with `available_qty>0` | the form is submitted | `201`, redirected to transaction detail |
| Error Case | the chosen lot is no longer available | the form is submitted | `422 lot_not_available` |

---

## US017_ViewTransactionDetail: View Transaction Detail

**Type**: ui
**Interaction**: secondary-action
**Priority**: Medium
**Estimate**: S

### User Story

As a Trade officer (viewable by any active role), I want to view a trade's full detail and audit history so that I can confirm its terms before deciding whether to confirm or cancel it.

### Acceptance Criteria

- [ ] Lot, buyer, qty, price, business_date, and status all render from one page load (`loadTransaction`, `page.tsx:26-39`).
- [ ] The full audit trail for this transaction is listed (`loadTransactionAuditHistory`).
- [ ] The Actions card (confirm/cancel) is hidden entirely once `status==='cancelled'`, not merely disabled (`page.tsx:77-86`).

### Technical Notes

- **Endpoint**: N/A — server-rendered direct Supabase query (no REST GET route for a single transaction)
- **Data Required**: `transaction` row, `lot`/`participant` lookups, audit history rows
- **Dependencies**: none

### Screens

- SCR012_TransactionDetail/REG001: Transaction Detail (Overview)
- SCR012_TransactionDetail/REG003: Transaction Detail (History)

### Test Scenarios

| Scenario | Given | When | Then |
|----------|-------|------|------|
| Happy Path | a valid transaction id | the page loads | full detail + history render |
| Error Case | a transaction id that does not exist | the page loads | `404` (`notFound()`) |

---

## US018_ConfirmTrade: Confirm a Draft Trade

**Type**: ui
**Interaction**: primary-action
**Priority**: High
**Estimate**: M

### User Story

As a Trade officer, I want to confirm a draft negotiated trade so that it becomes a settled transaction the rest of the pipeline (delivery, reconciliation) can act on.

### Acceptance Criteria

- [ ] Confirming a transaction that is not in `draft` status returns `409 NOT_DRAFT`.
- [ ] An ineligible buyer party or insufficient remaining quantity returns `422 INELIGIBLE_PARTY`/`INSUFFICIENT_QTY`.
- [ ] Confirming against an already-locked business date returns `423 LOCKED_BUSINESS_DATE`.

### Technical Notes

- **Endpoint**: POST /api/transactions/:id/confirm (ROUTE036)
- **Data Required**: none beyond the transaction id
- **Dependencies**: `ROLE-TRADE` only; transaction must be `draft`

### Screens

- SCR012_TransactionDetail/REG002: Transaction Detail (Actions)

### Test Scenarios

| Scenario | Given | When | Then |
|----------|-------|------|------|
| Happy Path | a `draft` transaction, unlocked business date | Confirm is clicked | `200`, transaction confirmed |
| Error Case | the transaction's business date is already locked | Confirm is clicked | `423 LOCKED_BUSINESS_DATE` |

---

## US019_CancelTrade: Cancel a Trade

**Type**: ui
**Interaction**: destructive-action
**Priority**: High
**Estimate**: M

### User Story

As a Trade officer, I want to cancel a trade with a stated reason so that a deal that fell through does not stay on the books as active.

### Acceptance Criteria

- [ ] A `reason` is required; an empty one returns `422 reason_required`.
- [ ] Cancelling against an already-locked business date returns `423 LOCKED_BUSINESS_DATE` (`respondLockedWrite`).
- [ ] A transaction in a non-cancellable state (e.g. already cancelled) returns `409` with the specific reason.

### Technical Notes

- **Endpoint**: POST /api/transactions/:id/cancel (ROUTE035)
- **Data Required**: reason
- **Dependencies**: `ROLE-TRADE` only

### Screens

- SCR012_TransactionDetail/REG002: Transaction Detail (Actions)

### Test Scenarios

| Scenario | Given | When | Then |
|----------|-------|------|------|
| Happy Path | a cancellable transaction, a stated reason | Cancel is confirmed | `200`, transaction cancelled |
| Error Case | no reason provided | Cancel is confirmed | `422 reason_required` |

---

## US020_ViewSeriList: View Seri Lookup List

**Type**: ui
**Interaction**: secondary-action
**Priority**: Medium
**Estimate**: S

### User Story

As a Trade officer (viewable by any active role), I want to look up recorded auction (せり) results so that I can check what has already been sold this way.

### Acceptance Criteria

- [ ] The list shows lot, winner, qty, unit_price, and decided_at per row.
- [ ] This screen is deliberately lighter than the transactions list — no separate filter/table component — since せり is recording-only.
- [ ] A "Create" link is shown only to Trade accounts.

### Technical Notes

- **Endpoint**: GET /api/seri-results (ROUTE034)
- **Data Required**: `seri_result` rows (lot_code/winner-name lookups are display enrichment only)
- **Dependencies**: none

### Screens

- SCR014_SeriList: Seri Lookup List

### Test Scenarios

| Scenario | Given | When | Then |
|----------|-------|------|------|
| Happy Path | any signed-in account | the page loads | seri result rows render |
| Error Case | zero results exist yet | the page loads | `EmptyState` renders |

---

## US021_RecordSeriResult: Record a Seri Result

**Type**: ui
**Interaction**: primary-action
**Priority**: High
**Estimate**: M

### User Story

As a Trade officer, I want to record a せり (seri) auction result so that its winning bid and quantity are captured in the system.

### Acceptance Criteria

- [ ] The lot dropdown excludes any lot that already carries a `seri_result` (one result per lot, enforced both client-side and server-side).
- [ ] Recording a result for a lot that is not found returns `404 lot_not_found`; one already recorded returns `409 already_recorded`.
- [ ] On success the screen navigates to the new seri result's own detail page.

### Technical Notes

- **Endpoint**: POST /api/seri-results (ROUTE033)
- **Data Required**: lot id, winning participant id, active-operator id, qty, unit_price
- **Dependencies**: `ROLE-TRADE` only

### Screens

- SCR013_SeriEntry: Seri (せり) Entry

### Test Scenarios

| Scenario | Given | When | Then |
|----------|-------|------|------|
| Happy Path | a lot with no existing seri result | the form is submitted | `201`, redirected to seri detail |
| Error Case | a lot that already has a recorded result | the form is submitted | `409 already_recorded` |

---

## US022_ViewSeriDetail: View Seri Result Detail

**Type**: ui
**Interaction**: secondary-action
**Priority**: Medium
**Estimate**: S

### User Story

As a Trade officer (viewable by any active role), I want to view a recorded seri result and its edit history so that I can verify what was recorded and by whom.

### Acceptance Criteria

- [ ] The record's lot/participant/operator lookups render for display alongside the raw result fields.
- [ ] Every prior edit to this result is listed (`loadSeriAuditHistory`).
- [ ] The edit form is shown only to Trade or Settlement accounts — matching the `seri_result` RLS update policy exactly.

### Technical Notes

- **Endpoint**: GET /api/seri-results/:id (ROUTE031) → `loadSeriResult()` + `loadSeriAuditHistory()`
- **Data Required**: `seri_result` row, `lot`/`participant`/`app_user` lookups, edit-history rows
- **Dependencies**: none

### Screens

- SCR015_SeriDetail/REG001: Seri Detail (Details)
- SCR015_SeriDetail/REG003: Seri Detail (History)

### Test Scenarios

| Scenario | Given | When | Then |
|----------|-------|------|------|
| Happy Path | a valid seri result id | the page loads | record + history render |
| Error Case | an id that does not exist | the page loads | `404 not_found` |

---

## US023_EditSeriResultAsTrade: Edit a Seri Result (as Trade)

**Type**: ui
**Interaction**: primary-action
**Priority**: High
**Estimate**: M

### User Story

As a Trade officer, I want to correct a recorded seri result so that a data-entry mistake in the winner, quantity, or price does not stand uncorrected.

### Acceptance Criteria

- [ ] The edit is refused with `423 locked_business_date` (Postgres `P0001`) once the result's business date is locked — filing a correction is the only route forward after that.
- [ ] An invalid field value, or one that violates a foreign key (e.g. an unknown participant), returns `422 invalid_request`.
- [ ] A successful edit appends to the same edit-history list US022 shows.

### Technical Notes

- **Endpoint**: PATCH /api/seri-results/:id (ROUTE032)
- **Data Required**: any editable seri-result field
- **Dependencies**: `ROLE-TRADE` (this endpoint is also open to Settlement — see US024, a separate story per the merge exception since the actor differs)

### Screens

- SCR015_SeriDetail/REG002: Seri Detail (Edit)

### Test Scenarios

| Scenario | Given | When | Then |
|----------|-------|------|------|
| Happy Path | an unlocked business date, a valid field change | the form is submitted | `200`, result updated |
| Error Case | the business date is already locked | the form is submitted | `423 locked_business_date` |

---

## US024_EditSeriResultAsSettlement: Edit a Seri Result (as Settlement)

**Type**: ui
**Interaction**: primary-action
**Priority**: High
**Estimate**: M

### User Story

As a Settlement officer, I want to correct a recorded seri result so that I can fix a mistake found during reconciliation, even though I'm not the Trade officer who originally recorded it.

### Acceptance Criteria

- [ ] Same endpoint, same guards as US023 (`423 locked_business_date`, `422 invalid_request`) — the code path is identical, only the acting role differs.
- [ ] Access to the edit form on SCR015 is granted specifically because `role === 'ROLE-TRADE' || role === 'ROLE-SETTLEMENT'` (`seri/[id]/page.tsx:17-20`), an explicit functional-spec decision, not an oversight.
- [ ] A successful edit appends to the same shared edit-history list.

### Technical Notes

- **Endpoint**: PATCH /api/seri-results/:id (ROUTE032)
- **Data Required**: any editable seri-result field
- **Dependencies**: `ROLE-SETTLEMENT` (dual-role endpoint — see US023)

### Screens

- SCR015_SeriDetail/REG002: Seri Detail (Edit)

### Test Scenarios

| Scenario | Given | When | Then |
|----------|-------|------|------|
| Happy Path | an unlocked business date, a valid field change | the form is submitted | `200`, result updated |
| Error Case | the business date is already locked | the form is submitted | `423 locked_business_date` |

---

## US025_ViewDeliveryList: View Delivery List

**Type**: ui
**Interaction**: secondary-action
**Priority**: Medium
**Estimate**: S

### User Story

As a Delivery officer, I want to view and filter deliveries so that I can find the one I need to ship against next (`(app)/deliveries/page.tsx:12-19`).

### Acceptance Criteria

- [ ] The list is filterable by `businessDate` and `status`.
- [ ] An "ngoại lệ" (exception) status is deliberately excluded from the filter set — no write path in this build can ever set it.
- [ ] Every active role can view this list.

### Technical Notes

- **Endpoint**: GET /api/deliveries (ROUTE010)
- **Data Required**: `delivery` rows
- **Dependencies**: none

### Screens

- SCR016_DeliveryList: Delivery List

### Test Scenarios

| Scenario | Given | When | Then |
|----------|-------|------|------|
| Happy Path | any signed-in account | the page loads | `200`, delivery rows render |
| Error Case | an unexpected server error | the page loads | `500 internal` |

---

## US026_ViewDeliveryDetail: View Delivery Detail

**Type**: ui
**Interaction**: secondary-action
**Priority**: Medium
**Estimate**: S

### User Story

As a Delivery officer (viewable by any active role), I want to view a delivery's shipment progress and history so that I know how much has shipped against the ordered quantity.

### Acceptance Criteria

- [ ] Delivered quantity is shown against ordered quantity, joined from the source transaction (`loadDeliveryWithTransaction`).
- [ ] Every recorded shipment for this delivery is listed (`delivery_shipment` rows).
- [ ] A conditional link to the reconciliation screen appears only once the transaction's business day is locked (`page.tsx:64-71`).

### Technical Notes

- **Endpoint**: N/A — server-rendered direct Supabase query (no REST GET route for a single delivery; `GET /api/deliveries/by-transaction/:transactionId`, ROUTE009, is the only other delivery read and serves a different lookup direction)
- **Data Required**: `delivery` + `transaction` (joined), `business_day_lock` lookup, `delivery_shipment` rows
- **Dependencies**: none

### Screens

- SCR017_DeliveryDetail/REG001: Delivery Detail (Overview)
- SCR017_DeliveryDetail/REG003: Delivery Detail (History)

### Test Scenarios

| Scenario | Given | When | Then |
|----------|-------|------|------|
| Happy Path | a valid delivery id | the page loads | progress + history render |
| Error Case | a delivery id that does not exist | the page loads | `404` |

---

## US027_RecordShipment: Record a Shipment

**Type**: ui
**Interaction**: primary-action
**Priority**: High
**Estimate**: M

### User Story

As a Delivery officer, I want to record a shipment against a delivery so that its progress toward the ordered quantity is tracked.

### Acceptance Criteria

- [ ] The form is shown only while the delivery is not yet "hoàn tất" (complete); it disappears once it is.
- [ ] A shipment quantity that would exceed the ordered quantity is rejected with `422 OVER_DELIVERY`.
- [ ] Recording a shipment against an already-completed delivery returns `409 ALREADY_COMPLETED`.
- [ ] This story never creates the delivery itself — see Method note 5. It only records shipments against a delivery that already exists (seed-only in this build).

### Technical Notes

- **Endpoint**: POST /api/deliveries/:id/shipments (ROUTE008)
- **Data Required**: shipped qty (+ any per-shipment metadata `ShipmentForm` collects)
- **Dependencies**: `ROLE-DELIVERY` only; delivery must not be complete

### Screens

- SCR017_DeliveryDetail/REG002: Delivery Detail (New Shipment)

### Test Scenarios

| Scenario | Given | When | Then |
|----------|-------|------|------|
| Happy Path | remaining qty > 0, a valid shipment qty | the form is submitted | `201`, shipment recorded |
| Error Case | a shipment qty that would exceed the ordered total | the form is submitted | `422 OVER_DELIVERY` |

---

## US028_CompleteDelivery: Complete a Delivery

**Type**: ui
**Interaction**: primary-action
**Priority**: High
**Estimate**: S

### User Story

As a Settlement officer, I want to mark a delivery complete once its shipments account for the full ordered quantity so that the pipeline can treat it as finished.

### Acceptance Criteria

- [ ] Only Settlement can complete a delivery — this deliberately departs from `deliverytracking/technical-spec.md §5.2`'s "cả 2 role" (both roles) note; Delivery officers cannot complete their own deliveries in this build (`complete/route.ts:15-17`, `deliveries/[id]/page.tsx:40`).
- [ ] A quantity mismatch between shipped and ordered totals is rejected with `422 QTY_MISMATCH`.
- [ ] Completing an already-completed delivery returns `409 ALREADY_COMPLETED`.

### Technical Notes

- **Endpoint**: POST /api/deliveries/:id/complete (ROUTE007)
- **Data Required**: none beyond the delivery id
- **Dependencies**: `ROLE-SETTLEMENT` only

### Screens

- SCR017_DeliveryDetail/REG001: Delivery Detail (Overview — complete action is embedded in `DeliveryProgress`, not a separate region, per screen-list.md's own region grouping)

### Test Scenarios

| Scenario | Given | When | Then |
|----------|-------|------|------|
| Happy Path | shipped qty matches ordered qty | Complete is clicked | `200`, delivery marked completed |
| Error Case | shipped qty does not match ordered qty | Complete is clicked | `422 QTY_MISMATCH` |

---

## US029_ViewReconciliationLines: View Reconciliation Lines

**Type**: ui
**Interaction**: secondary-action
**Priority**: Medium
**Estimate**: S

### User Story

As a Settlement officer, I want to view the reconciliation lines for a business date so that I can confirm the day balances before locking it.

### Acceptance Criteria

- [ ] Lines are read from the `reconciliation_line` view for the selected business date.
- [ ] The current lock status for that date is shown alongside the lines.
- [ ] Every active role can view this screen; only Settlement sees the lock action.

### Technical Notes

- **Endpoint**: GET /api/reconciliation/:businessDate (ROUTE027) → `loadReconciliationLines()` + `loadLockStatus()`
- **Data Required**: `reconciliation_line` rows, `business_day_lock` status
- **Dependencies**: none

### Screens

- SCR018_ReconcileAndLock: Reconciliation & Lock

### Test Scenarios

| Scenario | Given | When | Then |
|----------|-------|------|------|
| Happy Path | a valid business date | the page loads | reconciliation lines + lock status render |
| Error Case | an invalid business date format | the page loads | `400 invalid_business_date` |

---

## US030_LockBusinessDay: Lock a Business Day

**Type**: ui
**Interaction**: destructive-action
**Priority**: High
**Estimate**: L

### User Story

As a Settlement officer, I want to lock a business day once reconciliation is confirmed so that its trades, seri results, lot gradings, and delivery shipments become permanently unchangeable except through a correction.

### Acceptance Criteria

- [ ] Locking requires retype-to-confirm in the dialog before the request is sent.
- [ ] Once locked, the day stays locked forever — **no unlock endpoint exists anywhere in this codebase**, confirmed by reading every route file; this is a genuinely one-way action.
- [ ] Locking an already-locked date returns `409` with the specific reason (`ALREADY_LOCKED`, `lock-business-day.ts:7,31`).
- [ ] The lock is enforced at the database level (`trg_block_after_lock`) across exactly 4 tables — `transaction`, `seri_result`, `mekiki_record`, `delivery_shipment` — not by any role rule alone; `lot` and `delivery` headers are deliberately exempt since they span business days.

### Technical Notes

- **Endpoint**: POST /api/reconciliation/:businessDate/lock (ROUTE026)
- **Data Required**: businessDate, retyped confirmation
- **Dependencies**: `ROLE-SETTLEMENT` only

### Screens

- SCR018_ReconcileAndLock: Reconciliation & Lock

### Test Scenarios

| Scenario | Given | When | Then |
|----------|-------|------|------|
| Happy Path | an unlocked business date, confirmation retyped | Lock is confirmed | `200`, day locked |
| Error Case | the date is already locked | Lock is confirmed | `409 ALREADY_LOCKED` |

---

## US031_RequestCorrection: Request a Correction

**Type**: ui
**Interaction**: primary-action
**Priority**: High
**Estimate**: M

### User Story

As a Settlement officer, I want to request a correction against a transaction on an already-locked business date so that a mistake found after lock can still be adjusted through a recognized, auditable process.

### Acceptance Criteria

- [ ] `targetTxnId`, `reason`, and an `evidence` file are all required; each missing field returns its own `422` reason (`missing_target_txn_id`/`missing_reason`/`missing_evidence`).
- [ ] A correction can only ever target a transaction whose business date is already locked — targeting an unlocked one returns `409 NOT_LOCKED`.
- [ ] Targeting a transaction that does not exist returns `404 TXN_NOT_FOUND`.
- [ ] This request never edits the original transaction — it only ever records a separate adjustment alongside it, pending approval.

### Technical Notes

- **Endpoint**: POST /api/corrections (ROUTE005, `multipart/form-data`)
- **Data Required**: targetTxnId, reason, evidence file
- **Dependencies**: `ROLE-SETTLEMENT` only; target transaction's business date must already be locked

### Screens

- SCR019_CorrectionRequest: Correction Request

### Test Scenarios

| Scenario | Given | When | Then |
|----------|-------|------|------|
| Happy Path | a locked transaction, reason + evidence file | the form is submitted | `201`, correction created (pending) |
| Error Case | the target transaction's business date is not locked | the form is submitted | `409 NOT_LOCKED` |

---

## US032_ViewCorrectionQueue: View Correction Approval Queue

**Type**: ui
**Interaction**: secondary-action
**Priority**: Medium
**Estimate**: S

### User Story

As a Settlement officer, I want to view the queue of pending correction requests so that I can see which ones I am eligible to decide.

### Acceptance Criteria

- [ ] Each row is computed for maker-checker eligibility: `isOwnPendingRequest` (the viewer's own request — cannot decide) vs. `canDecide` (`(app)/corrections/page.tsx:15-51`).
- [ ] Evidence for each request is shown via a signed URL with a 300-second TTL, not a permanent public link.
- [ ] This screen is restricted to Settlement only (`requireRole`), unlike most list screens in this app.

### Technical Notes

- **Endpoint**: GET /api/corrections (ROUTE006)
- **Data Required**: `correction_request` rows + signed evidence URLs
- **Dependencies**: `ROLE-SETTLEMENT` only

### Screens

- SCR020_CorrectionApproval: Correction Approval

### Test Scenarios

| Scenario | Given | When | Then |
|----------|-------|------|------|
| Happy Path | a Settlement account, pending requests exist | the page loads | queue renders with per-row eligibility computed |
| Error Case | an unexpected server error | the page loads | `500 internal` |

---

## US033_ApproveCorrection: Approve a Correction Request

**Type**: ui
**Interaction**: primary-action
**Priority**: High
**Estimate**: L

### User Story

As a Settlement officer who did not file the request, I want to approve a pending correction so that its adjustment takes effect on the historical record.

### Acceptance Criteria

- [ ] The requester of a correction cannot approve their own request — attempting it returns `403 SELF_APPROVAL` (`approve-correction.ts`), even though requester and approver typically hold the identical role.
- [ ] Approving records the adjustment (`reverse` or `delta` kind, with qty/price deltas) and, right after, recomputes the incentive delta for the affected transaction — a side effect that a reject never triggers (`approve/route.ts:90-93`); an engine failure here never rolls back the already-approved decision, it only leaves an audit-visible gap.
- [ ] Deciding an already-decided request returns `409 ALREADY_DECIDED`.

### Technical Notes

- **Endpoint**: POST /api/corrections/:id/approve (ROUTE004, `{ decision: "approve", adjustmentKind, qtyDelta, unitPriceDelta, note }`)
- **Data Required**: decision="approve", adjustmentKind, qtyDelta/unitPriceDelta as applicable
- **Dependencies**: `ROLE-SETTLEMENT`, and NOT the correction's own requester

### Screens

- SCR020_CorrectionApproval: Correction Approval

### Test Scenarios

| Scenario | Given | When | Then |
|----------|-------|------|------|
| Happy Path | a pending request filed by a different Settlement account | Approve is submitted | `200`, adjustment recorded, incentive delta recomputed |
| Error Case | the approver is the same account that filed the request | Approve is submitted | `403 SELF_APPROVAL` |

---

## US034_RejectCorrection: Reject a Correction Request

**Type**: ui
**Interaction**: destructive-action
**Priority**: High
**Estimate**: M

### User Story

As a Settlement officer who did not file the request, I want to reject a pending correction so that an unjustified adjustment never touches the historical record.

### Acceptance Criteria

- [ ] The same `403 SELF_APPROVAL` self-check applies to reject as to approve — the requester cannot decide their own request either way.
- [ ] Rejecting records the decision but writes no adjustment and triggers no incentive-delta recompute — the historical record is untouched.
- [ ] Deciding an already-decided request returns `409 ALREADY_DECIDED`.

### Technical Notes

- **Endpoint**: POST /api/corrections/:id/approve (ROUTE004, `{ decision: "reject" }` — same endpoint as US033, split per Method note 7's data-flow branch)
- **Data Required**: decision="reject", optional note
- **Dependencies**: `ROLE-SETTLEMENT`, and NOT the correction's own requester

### Screens

- SCR020_CorrectionApproval: Correction Approval

### Test Scenarios

| Scenario | Given | When | Then |
|----------|-------|------|------|
| Happy Path | a pending request filed by a different Settlement account | Reject is submitted | `200`, request marked rejected, no adjustment written |
| Error Case | the rejecter is the same account that filed the request | Reject is submitted | `403 SELF_APPROVAL` |

---

## US035_ViewIncentiveResults: View Incentive Results

**Type**: ui
**Interaction**: secondary-action
**Priority**: Medium
**Estimate**: S

### User Story

As a Settlement officer, I want to view 完納奨励金 (full-payment incentive) results for a period so that I can review what each participant is owed.

### Acceptance Criteria

- [ ] Results are filterable by period.
- [ ] No role, including Settlement, can write to this table through the app — it is populated only by an automated process (`runIncentiveDelta`, triggered as a side effect of correction approval, US033), never by a button click of its own.
- [ ] This is a read-only screen — no create/edit action exists here.

### Technical Notes

- **Endpoint**: GET /api/incentive-results (ROUTE011)
- **Data Required**: `incentive_result` rows for the selected period
- **Dependencies**: `ROLE-SETTLEMENT` only

### Screens

- SCR021_IncentiveResult: Incentive Result

### Test Scenarios

| Scenario | Given | When | Then |
|----------|-------|------|------|
| Happy Path | a Settlement account, a valid period | the page loads | incentive results for that period render |
| Error Case | an unexpected server error | the page loads | `500 internal` |

---

## US036_ViewRuleVersionList: View Rule Version List

**Type**: ui
**Interaction**: secondary-action
**Priority**: Medium
**Estimate**: S

### User Story

As a Rule Admin, I want to view the list of incentive rate-table versions so that I can see which is currently active and which are historical.

### Acceptance Criteria

- [ ] The list is filterable by status; display status is computed client-side from `effective_from` vs. today, not stored directly.
- [ ] `role-landing.ts` routes both maker (`ruleadmin@`) and checker (`rulechecker@`) demo accounts to this same screen — they share one role.
- [ ] Row links lead to each version's own detail page.

### Technical Notes

- **Endpoint**: GET /api/incentive-rules (ROUTE015)
- **Data Required**: `incentive_rule_version` rows
- **Dependencies**: `ROLE-RULE-ADMIN` only

### Screens

- SCR022_RuleVersionList: Rule Version List

### Test Scenarios

| Scenario | Given | When | Then |
|----------|-------|------|------|
| Happy Path | a Rule Admin account | the page loads | rule version rows render |
| Error Case | an unexpected server error | the page loads | `500 internal` |

---

## US037_CreateRuleVersion: Create a New Incentive Rule Version

**Type**: ui
**Interaction**: primary-action
**Priority**: High
**Estimate**: M

### User Story

As a Rule Admin, I want to create a new incentive rate-table version so that a future effective-dated rule change is ready for a colleague to review.

### Acceptance Criteria

- [ ] An invalid `effective_from` date returns `422 INVALID_EFFECTIVE_DATE`.
- [ ] A conflicting version (e.g. overlapping effective date already pending) returns `409 VERSION_CONFLICT`.
- [ ] On success, the screen navigates to the rule version LIST, not the new version's own detail page — a deliberate choice (`rule-version-form.tsx:43`), not an oversight.
- [ ] The new version starts in `pending_approval` status and cannot be approved by its own creator (see US039).

### Technical Notes

- **Endpoint**: POST /api/incentive-rules (ROUTE014)
- **Data Required**: rate-table fields, effective_from
- **Dependencies**: `ROLE-RULE-ADMIN` only

### Screens

- SCR023_RuleVersionNew: Rule Version Create

### Test Scenarios

| Scenario | Given | When | Then |
|----------|-------|------|------|
| Happy Path | a valid, non-conflicting effective date | the form is submitted | `201`, redirected to rule version list |
| Error Case | an effective date that conflicts with an existing pending version | the form is submitted | `409 VERSION_CONFLICT` |

---

## US038_ViewRuleVersionDetail: View Rule Version Detail

**Type**: ui
**Interaction**: secondary-action
**Priority**: Medium
**Estimate**: S

### User Story

As a Rule Admin, I want to view a specific rule version's detail, along with sibling versions eligible for rollback, so that I know exactly what I'd be approving or rolling back to.

### Acceptance Criteria

- [ ] Fields shown: version_no, effective_from, status, created-by and approved-by display names.
- [ ] The Actions card is entirely omitted (not just disabled) once a version is superseded or rolled back — there is nothing left to approve or roll back for it (`page.tsx:39-44`).
- [ ] Rollback candidates are computed only when the viewed version is currently `active` (`page.tsx:34-37`), listing sibling versions that are themselves `active` or `rolled_back`.

### Technical Notes

- **Endpoint**: N/A — server-rendered direct Supabase query (`loadRuleVersion`, `rule-version-queries.ts`; no REST GET route for a single rule version)
- **Data Required**: `incentive_rule_version` row, sibling versions (for rollback candidates)
- **Dependencies**: `ROLE-RULE-ADMIN` only

### Screens

- SCR024_RuleVersionDetail: Rule Version Detail

### Test Scenarios

| Scenario | Given | When | Then |
|----------|-------|------|------|
| Happy Path | a valid rule version id | the page loads | detail + eligible actions render per the viewer's identity |
| Error Case | a rule version id that does not exist | the page loads | `404` (`notFound()`) |

---

## US039_ApproveRuleVersion: Approve a Rule Version

**Type**: ui
**Interaction**: primary-action
**Priority**: High
**Estimate**: S

### User Story

As a Rule Admin who did not create this version, I want to approve a pending incentive rate-table version so that it becomes the active rate table.

### Acceptance Criteria

- [ ] Approve is only available when the version is `pending_approval` AND the viewer is not its creator (`isCreator`, `page.tsx:30-31`).
- [ ] The creator attempting to approve their own version returns `403 SELF_APPROVAL` (`approve-rule-version.ts:30-31`).
- [ ] Approving an already-decided version returns `409 ALREADY_DECIDED`.

### Technical Notes

- **Endpoint**: POST /api/incentive-rules/:id/approve (ROUTE012)
- **Data Required**: none beyond the version id
- **Dependencies**: `ROLE-RULE-ADMIN`, and NOT the version's own creator

### Screens

- SCR024_RuleVersionDetail: Rule Version Detail

### Test Scenarios

| Scenario | Given | When | Then |
|----------|-------|------|------|
| Happy Path | a pending version created by a different Rule Admin account | Approve is clicked | `200`, version becomes active |
| Error Case | the approver is the same account that created the version | Approve is clicked | `403 SELF_APPROVAL` |

---

## US040_RollbackRuleVersion: Roll Back to an Earlier Rule Version

**Type**: ui
**Interaction**: primary-action
**Priority**: High
**Estimate**: M

### User Story

As a Rule Admin who did not create the currently active version, I want to roll back to an earlier rate-table version so that a bad rate change can be undone.

### Acceptance Criteria

- [ ] Rollback is only available when the CURRENTLY ACTIVE version is `active` AND the viewer is not that active version's own creator (`isCreator`/`canRollback`, `page.tsx:31-32`) — the self-check is against the active version being demoted, not the target being restored.
- [ ] Attempting to roll back one's own active version returns `403 SELF_ROLLBACK` (`rollback-rule-version.ts:44-45`).
- [ ] An invalid or non-sibling `targetVersionId` returns `422 INVALID_TARGET`; a target that is no longer the active version returns `409 NOT_ACTIVE`.

### Technical Notes

- **Endpoint**: POST /api/incentive-rules/:id/rollback (ROUTE013)
- **Data Required**: targetVersionId
- **Dependencies**: `ROLE-RULE-ADMIN`, and NOT the currently-active version's own creator

### Screens

- SCR024_RuleVersionDetail: Rule Version Detail

### Test Scenarios

| Scenario | Given | When | Then |
|----------|-------|------|------|
| Happy Path | an active version created by a colleague, a valid rollback target | Rollback is submitted | `200`, target version promoted, active version demoted |
| Error Case | the account rolling back is the active version's own creator | Rollback is submitted | `403 SELF_ROLLBACK` |

---

## US041_ViewReportCatalog: View Report Catalog

**Type**: ui
**Interaction**: secondary-action
**Priority**: Medium
**Estimate**: S

### User Story

As a Settlement officer (viewable by any active role), I want to view the full report catalog so that I can find the specific report I need.

### Acceptance Criteria

- [ ] All 12 RPT codes are always listed, regardless of mock/real status, so the two badges are never blurred together (`(app)/reports/page.tsx:10-11`).
- [ ] Each mock report (RPT-04, 09, 10, 11, 12) is flagged with a `MockDataBadge`.
- [ ] This is a static, config-driven list (`REPORT_REGISTRY`) — no database read backs it.

### Technical Notes

- **Endpoint**: GET /api/reports (ROUTE030, static registry, no DB read)
- **Data Required**: `REPORT_REGISTRY` config
- **Dependencies**: none

### Screens

- SCR025_ReportCatalog: Report Catalog

### Test Scenarios

| Scenario | Given | When | Then |
|----------|-------|------|------|
| Happy Path | any signed-in account | the page loads | all 12 report codes render, 5 flagged mock |
| Error Case | n/a — static config, no failure path | the page loads | always `200` |

---

## US042_ViewReportData: View Report Data

**Type**: ui
**Interaction**: secondary-action
**Priority**: Medium
**Estimate**: S

### User Story

As a Settlement officer (viewable by any active role), I want to view and filter one report's data so that I can read its actual rows before deciding whether to export them.

### Acceptance Criteria

- [ ] Rows are paginated and filterable per the report's own filter-field definitions.
- [ ] A mock report (RPT-04/09/10/11/12) shows the mock badge, a warning notice, and a disabled export button — its data, such as it is, is never claimed to be real.
- [ ] Requesting a mock report's data directly returns **`200` with `rows: []`, `total: 0`, and `isMock: true`** — NOT a 403. The view endpoint `src/app/api/reports/[reportCode]/route.ts` has no mock rejection branch at all; the short-circuit is `src/lib/reports/load-report-rows.ts:78` (`if (definition.isMock) return { rows: [], total: 0 }`), and the flag is echoed to the client at `route.ts:31`. The `403 MOCK_REPORT` guard exists **only** on the separate CSV export endpoint (`export.csv/route.ts:33`) and is covered by US043 — the two endpoints have deliberately different contracts and must not share this criterion.

### Technical Notes

- **Endpoint**: GET /api/reports/:reportCode (ROUTE029) → `loadReportRows()`
- **Data Required**: paginated report rows, filter-option lists (`loadFilterOptions`)
- **Dependencies**: none

### Screens

- SCR026_ReportViewer/REG001: Report Viewer (Report Results)

### Test Scenarios

| Scenario | Given | When | Then |
|----------|-------|------|------|
| Happy Path | a real (non-mock) report code | the page loads | paginated rows render |
| Error Case | a mock report code, view endpoint called directly | request is sent | `200` with `rows: []`, `total: 0`, `isMock: true` — the view endpoint has NO 403 branch (`load-report-rows.ts:78`). The `403 MOCK_REPORT` belongs to the export endpoint only, see US043. |

---

## US043_ExportReportData: Export Report Data as CSV

**Type**: ui
**Interaction**: secondary-action
**Priority**: Medium
**Estimate**: S

### User Story

As a Settlement officer (viewable by any active role), I want to export a real report's current filtered view as a CSV file so that I can share it outside the app.

### Acceptance Criteria

- [ ] The export link carries the same filter values currently applied on screen (`exportHref`, `page.tsx:66`).
- [ ] A mock report's export button is disabled in the UI, and the export endpoint itself refuses the request even if called directly (`403 MOCK_REPORT`) — the two enforcements are independent, not just cosmetic.
- [ ] The response is `text/csv` with a `Content-Disposition` header naming the file for download.

### Technical Notes

- **Endpoint**: GET /api/reports/:reportCode/export.csv (ROUTE028) → `loadReportRows()` + `toCsv()`
- **Data Required**: current filter values
- **Dependencies**: report must not be mock

### Screens

- SCR026_ReportViewer/REG001: Report Viewer (Report Results)

### Test Scenarios

| Scenario | Given | When | Then |
|----------|-------|------|------|
| Happy Path | a real report, current filters applied | the export link is opened | `200 text/csv` with the filtered rows |
| Error Case | a mock report's export link is opened directly | request is sent | `403 MOCK_REPORT` |

---

## US044_CreateExportBatch: Create a Daily Accounting Export Batch

**Type**: ui
**Interaction**: primary-action
**Priority**: High
**Estimate**: M

### User Story

As a Settlement officer, I want to create a daily accounting export batch (RPT-06) so that the day's transactions can be handed to accounting as a discrete, dated batch.

### Acceptance Criteria

- [ ] This button is shown only on RPT-06 and only to Settlement accounts (`user.role === SETTLEMENT_ROLE`, `page.tsx:127`).
- [ ] An invalid business date returns `422 INVALID_BUSINESS_DATE`.
- [ ] Batch creation still SUCCEEDS even for an already-locked business day — creating a record about a locked day is treated as safe, unlike editing the locked day's own records (`permissions.md`'s explicit special condition).
- [ ] A newly created batch appears immediately in the batch-history list (`ExportBatchList`, same screen) and unlocks the CSV export button for that date (`hasBatchCode`, `page.tsx:69,113-116`).
- [ ] Attempting a batch for a business date that is not yet locked returns `409 DAY_NOT_LOCKED`; a sequence race returns `409 SEQ_RACE_EXHAUSTED`.
- [ ] This is a human-initiated action only — there is no scheduled job anywhere in this codebase that creates a batch on its own; this is the honest reason the customer's `OBJ-04` (a daily report inside 15 minutes, generated automatically) is not met by this build.

### Technical Notes

- **Endpoint**: POST /api/accounting/export-batches (ROUTE001)
- **Data Required**: businessDate
- **Dependencies**: `ROLE-SETTLEMENT` only; businessDate must already be locked

### Screens

- SCR026_ReportViewer/REG002: Report Viewer (Accounting Export Batch, RPT-06 only)

### Test Scenarios

| Scenario | Given | When | Then |
|----------|-------|------|------|
| Happy Path | a locked business date, no sequence exhaustion | the button is clicked | `201`, batch created, appears in history list |
| Error Case | the business date is not yet locked | the button is clicked | `409 DAY_NOT_LOCKED` |

---

## Screen → US Map

| Screen | US Codes |
|--------|---------|
| SCR001_Login | US001 |
| SCR002_Home | US004 (+ US002, US003 anchored here as shared-layout actions) |
| SCR003_ParticipantList | US005 |
| SCR004_ParticipantNew | US006 |
| SCR005_ParticipantDetail | US007, US008, US009 |
| SCR006_LotsList | US010 |
| SCR007_LotIntake | US011 |
| SCR008_MekikiEntry | US013 |
| SCR009_LotDetail | US012, US014 |
| SCR010_AitaiCreate | US016 |
| SCR011_TransactionsList | US015 |
| SCR012_TransactionDetail | US017, US018, US019 |
| SCR013_SeriEntry | US021 |
| SCR014_SeriList | US020 |
| SCR015_SeriDetail | US022, US023, US024 |
| SCR016_DeliveryList | US025 |
| SCR017_DeliveryDetail | US026, US027, US028 |
| SCR018_ReconcileAndLock | US029, US030 |
| SCR019_CorrectionRequest | US031 |
| SCR020_CorrectionApproval | US032, US033, US034 |
| SCR021_IncentiveResult | US035 |
| SCR022_RuleVersionList | US036 |
| SCR023_RuleVersionNew | US037 |
| SCR024_RuleVersionDetail | US038, US039, US040 |
| SCR025_ReportCatalog | US041 |
| SCR026_ReportViewer | US042, US043, US044 |

No `[IPE_ZERO]`: every one of the 26 SCR### has at least one US mapped.

## Role → US Distribution

| Role | US Count | US Codes |
|------|----------|---------|
| ROLE-INTAKE | 3 | US010, US011, US012 |
| ROLE-JUDGE | 1 | US013 |
| ROLE-TRADE | 9 | US015, US016, US017, US018, US019, US020, US021, US022, US023 |
| ROLE-DELIVERY | 3 | US025, US026, US027 |
| ROLE-SETTLEMENT | 18 | US001, US002, US003, US004, US014, US024, US028, US029, US030, US031, US032, US033, US034, US035, US041, US042, US043, US044 |
| ROLE-SYS-ADMIN | 5 | US005, US006, US007, US008, US009 |
| ROLE-RULE-ADMIN | 5 | US036, US037, US038, US039, US040 |
| **Total** | **44** | |

## Cross-Reference Validation

- [x] All US### codes are unique (US001–US044, contiguous)
- [x] All acceptance criteria are testable (each cites a concrete status code, business rule, or observable UI outcome)
- [x] All technical notes are complete (Endpoint / Data Required / Dependencies filled for all 44; `N/A` used only where no REST route exists, with the direct-query function named instead)
- [ ] All US### codes are referenced in FeatureList.md — N/A, FeatureList.md not yet generated (Wave 5 pending, same as `screen-list.md`'s equivalent row)
- [x] All `ui` US### mapped to SCR### or SCR###/REG### (parent SCR exists in `screen-list.md` for all 44; US002/US003 anchored to SCR002_Home with an explicit shared-layout note since `AppShell`/`TopHeader` is not owned by any one `page.tsx`)
- [x] No system US### exist in this document, so the "system US### have ≥1 BL### mapped" check is vacuously satisfied — see Method note 4 for why zero were written
