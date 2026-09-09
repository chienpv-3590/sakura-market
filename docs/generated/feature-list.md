# Feature List

**Project**: Sakura Market (産地市場)
**Generated**: 2026-09-08
**Analysis Scope**: `user-stories.md` (44 US001–US044), `screen-list.md` (26 SCR001–SCR026, 19 REG###), `route-list.md` (38 API + 26 page routes), `permissions-matrix.md` (40 PERM001–PERM040), `data-model.md` (18 tables + 1 view, MODEL001–MODEL019), `behavior-logic.md` (2 BL001–BL002)

**Code Format**: `F###_NameSlug` — see F-Code Collision Note below before reading further.

**Feature Types**: `ui` (has SCR###) · `background` (BL### only) · `mixed` (both) — 11 of 12 features are `ui`; F011_SharedFoundation is `mixed` (one UI action + 2 background listeners).

**Related Screens column format**: `SCR###`, `SCR###/REG###`, or comma-separated mixed, per `code-formats.md`.

**Workspace**: single package, no monorepo — `sakura-market` (Next.js 16.3.4 App Router). **Languages**: TypeScript (strict) throughout, all 12 features. Neither varies per feature, so both are stated once here rather than repeated 12 times (DRY).

---

## F-Code Collision Note — read before trusting any F### below

This repo already carries an **11-feature scheme, F001–F011**, in active use in three independent places, all mutually consistent:

1. `docs/pham-vi-va-phan-mock.md:16-42` — the customer-facing scope doc, table titled "11 feature F001..F011", each row `F00N_CamelName | SCR0xx_Name | SC-xx | Vietnamese title`.
2. `docs/gia-dinh-tich-hop-ke-toan.md:35` — cites `F008` inline prose.
3. Source-code comments across `src/` — 62 grep hits for `F00[1-9]|F01[01]` confirmed live in this pass (`grep -rn "F0[0-9][0-9]" docs/ src/`), e.g. `src/app/api/corrections/[id]/approve/route.ts:12` ("F009 FR-401"), `src/lib/lots/availability-service.ts:4` ("F004/F005/F006 call this"), `src/lib/reports/queries/rpt-01-daily-transactions.ts:8` ("F010 không sở hữu bảng dữ liệu nghiệp vụ nào").

**This document reuses all 11 codes verbatim** — same code, same slug, same primary business outcome as the legacy doc. No renumbering. One genuinely new capability surfaced during this rebuild-spec pass that the legacy 11 do not cover (`SCR002_Home`, confirmed by `screen-list.md:87` "**Legacy ref**: none... not in `docs/pham-vi-va-phan-mock.md` § 1's SCR001–020 table at all" and `screen-list.md:954` "likely a later engineering addition, not a planned business screen") — continuing the sequence per this task's instruction, it is assigned **F012_PipelineDashboard**, a new code, not a renumbering of anything.

**Every feature entry below carries a `**Legacy/RFP Traceability**` field** — the same discipline `screen-list.md` set for its own `Legacy ref` field — so a customer holding the original Function List / RFP identifiers (`FN-##`, `FE-0##`, `IF-ACC-01`, `SC-##`) can find the matching F### here without a second lookup document.

---

## Modeling Notes (read before the per-feature sections)

**1. `SCR002_Home` is cited by three features, not one — this is deliberate, not a violation.** It is the sole **atomic** screen in this corpus shared across features (every other multi-feature situation in this run is a composite screen with disjoint per-region ownership, which does not apply here since `SCR002_Home` has no `REG###` entries — `screen-list.md:86` "**Type**: atomic"). Three distinct pieces of that one rendered page belong to three distinct business outcomes:
   - **F012_PipelineDashboard** owns the page's actual content — the 6-domain pipeline flow visualization (`US004_ViewPipelineDashboard`). This is the one feature with a bare, full-ownership `SCR002_Home` citation.
   - **F001_AuthAndRole** cites `SCR002_Home` only for the sign-out control rendered in the shared `TopHeader`/`AppShell` chrome that wraps this page (and every other `(app)/*` page) — `US002_SignOut`.
   - **F011_SharedFoundation** cites `SCR002_Home` only for the locale-switcher control in that same shared chrome — `US003_SwitchUILanguage`.
   Each citation below is annotated with which slice it owns. This is the identical anchoring pattern `user-stories.md`'s own Method note 2 uses ("Global, zero-role-branch actions... anchored to SCR002_Home... with an explicit note").

**2. Why F012 is a new feature and not folded into F011_SharedFoundation.** Per `code-formats.md` § Feature Clustering Rule, grouping is by primary business outcome, never by "it's cross-cutting" alone. F011's outcome is *technical infrastructure that has no business story of its own* (audit trail, RLS baseline, i18n, seed) — none of its members are things an operator would describe as "a thing I use." F012's outcome is squarely user-facing: "give an operator at-a-glance visibility of where today's work stands across all 6 domains before they act" — a real, describable, testable capability with its own US (`US004`) and its own screen content. Folding it into F011 would violate the "no undeclared outcome" bullet of the Clustering Rule by hiding a genuine outcome inside an infrastructure bucket for line-count convenience — that is exactly the kind of grouping the rule forbids.

**3. Composite screens in this corpus never split ownership across features.** All 6 composite screens (`SCR005`, `SCR009`, `SCR012`, `SCR015`, `SCR017`, `SCR026`, 19 `REG###` total) have every one of their regions owned by a single feature — verified by cross-checking each region's "Owner" independence signal (distinct mutation/auth-gate/query) against the owning domain. So each is cited below as a bare `SCR###` (full ownership), not decomposed into per-region bullets — simpler, and the template's partial-ownership convention exists specifically for the cross-feature-split case, which does not occur here (KISS: don't split what nothing downstream needs split).

**4. BL001/BL002 have no owning `US###` — a genuine, disclosed gap, not an oversight.** `user-stories.md` Method note 4 states plainly that no `system`-typed story exists in this project because both BL items are a client-side nav-rail cross-tab sync with no human trigger and no observable business outcome — they fail the Valid User Story bar outright. `code-formats.md`'s "Valid Background Logic Requirements" table nominally wants a `system` US### mapping; none can be supplied without inventing one, which this pass will not do. Both items are mapped to **F011_SharedFoundation** by artifact type (shared UI-layout infrastructure — `nav-shell.tsx` renders in every page's layout, same "cuts across all screens" character as audit/RLS/i18n) with this gap stated explicitly rather than silently satisfied.

---

## Feature Hierarchy

Sorted P0 → P3. All 12 features are `ui` except F011 (`mixed`).

| Code | Name | Type | Priority | Legacy/RFP Traceability |
|------|------|------|----------|--------------------------|
| F001_AuthAndRole | Authentication & Session | ui | P0 | `docs/pham-vi-va-phan-mock.md:20` (identical); SC-01 |
| F011_SharedFoundation | Shared Foundation (Audit, RLS, Localization) | mixed | P0 | `docs/pham-vi-va-phan-mock.md:41` (identical) |
| F003_LotIntakeAndMekiki | Lot Intake & Quality Grading (目利き) | ui | P0 | `docs/pham-vi-va-phan-mock.md:23-25` (identical); SC-08/09/10 |
| F004_AitaiTransaction | Negotiated Trade (相対取引) | ui | P0 | `docs/pham-vi-va-phan-mock.md:26-27` (identical); SC-11/12 |
| F005_SeriResultEntry | Auction Result Entry (せり) | ui | P0 | `docs/pham-vi-va-phan-mock.md:28-29` (identical); SC-13/14 |
| F007_DailyReconcileAndLock | Daily Reconciliation & Business-Day Lock | ui | P0 | `docs/pham-vi-va-phan-mock.md:32` (identical); SC-18 |
| F010_ReportAndExport | Reporting & Accounting Export | ui | P0 | `docs/pham-vi-va-phan-mock.md:38-39` (identical); SC-25/26/27, `FN-11`/`FE-037`/`IF-ACC-01` |
| F002_ParticipantEligibility | Participant Eligibility Management | ui | P1 | `docs/pham-vi-va-phan-mock.md:21-22` (identical); SC-05/06 |
| F006_DeliveryTracking | Delivery Tracking | ui | P1 | `docs/pham-vi-va-phan-mock.md:30-31` (identical); SC-15/16 |
| F008_PostLockCorrection | Post-Lock Correction (Maker-Checker) | ui | P1 | `docs/pham-vi-va-phan-mock.md:33-34` (identical); SC-20/21 |
| F009_IncentiveAndRuleVersion | Incentive Calculation & Rule Versioning (完納奨励金) | ui | P1 | `docs/pham-vi-va-phan-mock.md:35-37` (identical); SC-22/23/24, `GOV-RULE-01` |
| F012_PipelineDashboard | Pipeline Dashboard | ui | P2 | **NEW** — no legacy code; net-new capability (see F-Code Collision Note) |

---

## Feature Details

### F001_AuthAndRole: Authentication & Session

**Type**: ui
**Priority**: P0
**Legacy/RFP Traceability**: `F001_AuthAndRole`, `docs/pham-vi-va-phan-mock.md:20` (`SCR001_Login`, LAB-1 `SC-01`, "Đăng nhập") — identical scope, no drift.

**Description**: Credential-based sign-in and sign-out for the market's 7 fixed operator roles. Input: username/password (no self-registration anywhere in the codebase — accounts are provisioned outside the app). Process: `handleSignIn()` validates credentials, checks `lockout.ts`'s consecutive-failure counter, and resolves a role-specific landing page (`src/lib/auth/role-landing.ts:24-32`). Output: an authenticated Supabase session, or a byte-identical `401 invalid_credentials` for both wrong password and inactive account (`sign-in/route.ts:16-18`) so a caller cannot distinguish the two by response. Sign-out ends the session unconditionally, even without a live one (`sign-out/route.ts`).

**Known gap — session timeout.** `docs/pham-vi-va-phan-mock.md:77` records that session-timeout enforcement is **off** (`supabase/config.toml` `[auth.sessions]` block commented out) against RFP `NFR-SEC-03` (P0). Lockout itself (5 consecutive failures) is real and enforced.

**Related Screens**:
- SCR001_Login (owns — full screen)
- SCR002_Home (shared layout only — sign-out button in `TopHeader`/`user-menu.tsx`; the page's own content is owned by F012_PipelineDashboard, see Modeling Note 1)

**Related User Stories**:
- US001_SignIn: Sign In
- US002_SignOut: Sign Out

**Related APIs/Routes**:
- (POST) /api/auth/sign-in — ROUTE002
- (POST) /api/auth/sign-out — ROUTE003

**Related Data Models**:
- MODEL001_AppUser (also carries DISC-001 `role`, the 7-value role enumeration every PERM### below keys off)

**Related Background Logic**: none.

**Related Permissions**:
- PERM001_SessionAndActiveAccountBaselineGate (Layer 1 proxy.ts + Layer 2 require-role.ts — the mechanism this feature's login grants access through)
- PERM028_AppUserNoAuthenticatedWritePolicy (RLS — no authenticated role, including the signed-in user themself, can write its own `app_user` row)

---

### F002_ParticipantEligibility: Participant Eligibility Management

**Type**: ui
**Priority**: P1
**Legacy/RFP Traceability**: `F002_ParticipantEligibility`, `docs/pham-vi-va-phan-mock.md:21-22` (`SCR002_ParticipantList`/`SCR003_ParticipantDetail`, LAB-1 `SC-05`/`SC-06`) — identical scope. Out-of-scope adjacent items under the same legacy row: `SC-07` (expiry warning screen, `FR-PARTY-03`, P1 deferred — see F010's RPT-03 partial mechanism) and `SC-03`/`SC-04` (account/role administration, `FE-003`/`FR-IAM-02`, P0 **deliberately deferred**, see gap note below).

**Description**: Manage the 4 fixed participant categories (卸売業者/仲卸/売買参加者/買出人) and their eligibility lifecycle (`có hiệu lực → tạm ngừng/mất hiệu lực/xét lại`, DISC-002/DISC-003 in MODEL003). Input: participant profile fields + a lifecycle-transition event with a reason. Process: `ROLE-SYS-ADMIN`-gated create/edit/transition, `category` immutable once set (`participants/[id]/route.ts` rejects the key outright if present), transition resolved through a state machine (`state-machine.ts`). Output: a participant record other features (trade eligibility checks in F004/F005) read against.

**Known gap — account/role administration is out of scope, by deliberate decision, not oversight.** RFP `FE-003`/`FR-IAM-02` (P0) wants an admin screen for account/permission management; the 9 demo accounts are instead fixed via `seed:users` with no admin UI. `docs/pham-vi-va-phan-mock.md:76` records this as the same decision that deferred MFA (`FE-002`/`NFR-SEC-01`) — both P0 RFP items, both consciously out of this build's scope, both slated "before production."

**Related Screens**:
- SCR003_ParticipantList
- SCR004_ParticipantNew
- SCR005_ParticipantDetail (composite — owns all 4 regions: REG001_Profile, REG002_Edit, REG003_Transition, REG004_History)

**Related User Stories**:
- US005_ViewParticipantList: View Participant List
- US006_CreateParticipant: Create a Participant
- US007_ViewParticipantDetail: View Participant Detail
- US008_EditParticipant: Edit a Participant
- US009_TransitionParticipantStatus: Transition a Participant's Status

**Related APIs/Routes**:
- (GET) /api/participants — ROUTE024
- (POST) /api/participants — ROUTE025
- (PATCH) /api/participants/:id — ROUTE022
- (POST) /api/participants/:id/transition — ROUTE023

**Related Data Models**:
- MODEL003_Participant (DISC-002 `category`, DISC-003 `status`)
- MODEL004_ParticipantStatusHistory

**Related Background Logic**: none.

**Related Permissions**:
- PERM022_ParticipantCreation
- PERM023_ParticipantEdit
- PERM024_ParticipantStatusTransition
- PERM030_ParticipantRlsWrites

---

### F003_LotIntakeAndMekiki: Lot Intake & Quality Grading (目利き)

**Type**: ui
**Priority**: P0
**Legacy/RFP Traceability**: `F003_LotIntakeAndMekiki`, `docs/pham-vi-va-phan-mock.md:23-25` (`SCR004_LotIntake`/`SCR005_MekikiEntry`/`SCR006_LotDetail`, LAB-1 `SC-08`/`SC-09`/`SC-10`) — identical scope. `SCR006_LotsList` (this pass's new list screen) has no legacy code (`screen-list.md:232`, folded silently into the doc's F003 row set) but is unambiguously same-domain.

**Description**: Receive a lot (input: item/package_count/optional receipt attachments), grade it via 目利き (input: quality assessment fields, gated `ROLE-JUDGE`, requires `lot.status='received'`), and adjust item/package_count post-grading (`ROLE-SETTLEMENT`, `available_qty` deliberately excluded from the PATCH allowlist). Output: an `available_qty` other features (F004, F005) draw down from via a compare-and-swap loop, since **no cross-table Postgres transaction exists in this stack** (PostgREST only — `src/lib/lots/availability-service.ts:9-110`, up to 25 CAS retries, load-tested at 20 concurrent requests → exactly 10 succeed, `available_qty` never negative per `docs/pham-vi-va-phan-mock.md:269-270`).

**Known gap — receipt attachments are optional, and this is a genuine acceptance-criteria reading, not an omission.** `FR-LOT-01` requires the system be *able to* store required receipt documents; no `BR-###` sets a minimum count the way F008's `BR-003` does for correction evidence, so lot creation is not blocked by a missing file (`docs/pham-vi-va-phan-mock.md:234-238`). `MODEL018_LotAttachment` is append-only (no update/delete policy), mirroring `audit_log`.

**Related Screens**:
- SCR006_LotsList
- SCR007_LotIntake
- SCR008_MekikiEntry
- SCR009_LotDetail (composite — owns all 4 regions: REG001_Overview, REG002_Attachments, REG003_Edit, REG004_History)

**Related User Stories**:
- US010_ViewLotsList: View Lots List
- US011_ReceiveLot: Receive a Lot
- US012_ViewLotDetail: View Lot Detail
- US013_GradeLot: Grade a Lot
- US014_EditLot: Edit a Lot's Item/Package Count

**Related APIs/Routes**:
- (GET) /api/lots — ROUTE021
- (POST) /api/lots — ROUTE020
- (GET) /api/lots/:id — ROUTE018
- (PATCH) /api/lots/:id — ROUTE019
- (POST) /api/lots/:id/mekiki — ROUTE017

**Related Data Models**:
- MODEL005_Lot (DISC-004 `status`: received/published/traded/delivered)
- MODEL006_MekikiRecord
- MODEL018_LotAttachment

**Related Background Logic**: none.

**Related Permissions**:
- PERM003_LotIntakeCreation
- PERM004_MekikiGradingEntry
- PERM005_LotFieldAdjustment
- PERM031_LotAndLotAttachmentRlsWrites
- PERM032_MekikiRecordRlsWrites

---

### F004_AitaiTransaction: Negotiated Trade (相対取引)

**Type**: ui
**Priority**: P0
**Legacy/RFP Traceability**: `F004_AitaiTransaction`, `docs/pham-vi-va-phan-mock.md:26-27` (`SCR007_AitaiCreate`/`SCR008_TransactionList`, LAB-1 `SC-11`/`SC-12`) — identical scope.

**Description**: Create a negotiated trade against an available lot (input: participant, lot, qty, unit_price), then confirm (locks in the qty draw-down) or cancel a draft trade. Output: a `transaction` row feeding F007's reconciliation view and F009's incentive engine. 8 concurrent confirm requests on the same transaction → exactly 1 succeeds, verified live (`docs/pham-vi-va-phan-mock.md:271-272`).

**Known design decision — `transaction.type` is not a live discriminator.** `data-model.md`'s DISC-005 covers only `status` (draft/confirmed/cancelled). The original F004 spec described `transaction.type` as shared with せり, but 3 of 4 downstream specs (F005/F007/F010) independently chose to treat せり as its own table (`seri_result`) — QĐ-1 in `docs/pham-vi-va-phan-mock.md:190-194` — so `transaction.type`'s CHECK constraint is now fixed to the single literal `'aitai'` and carries no behavioral branch.

**Related Screens**:
- SCR010_AitaiCreate
- SCR011_TransactionsList
- SCR012_TransactionDetail (composite — owns all 3 regions: REG001_Overview, REG002_Actions, REG003_History)

**Related User Stories**:
- US015_ViewTransactionsList: View Transactions List
- US016_CreateAitai: Create a Negotiated Trade
- US017_ViewTransactionDetail: View Transaction Detail
- US018_ConfirmTrade: Confirm a Draft Trade
- US019_CancelTrade: Cancel a Trade

**Related APIs/Routes**:
- (GET) /api/transactions — ROUTE038
- (POST) /api/transactions — ROUTE037
- (POST) /api/transactions/:id/confirm — ROUTE036
- (POST) /api/transactions/:id/cancel — ROUTE035

**Related Data Models**:
- MODEL007_Transaction (DISC-005 `status`)

**Related Background Logic**: none.

**Related Permissions**:
- PERM006_AitaiTransactionCreation
- PERM007_AitaiTransactionConfirmCancel
- PERM033_TransactionRlsWrites

---

### F005_SeriResultEntry: Auction Result Entry (せり)

**Type**: ui
**Priority**: P0
**Legacy/RFP Traceability**: `F005_SeriResultEntry`, `docs/pham-vi-va-phan-mock.md:28-29` (`SCR009_SeriEntry`/`SCR010_SeriLookup`, LAB-1 `SC-13`/`SC-14`) — identical scope.

**Description**: Record a せり (auction) result against a received lot (input: lot, participant, qty, price — `ROLE-TRADE`), then look up and edit it. Edit is gated to two roles (`ROLE-TRADE` **or** `ROLE-SETTLEMENT`) — the only screen in this corpus with an OR role gate, producing two distinct US (US023/US024) for the same PATCH endpoint per `user-stories.md` Method note 2.

**Related Screens**:
- SCR013_SeriEntry
- SCR014_SeriList
- SCR015_SeriDetail (composite — owns all 3 regions: REG001_Details, REG002_Edit, REG003_History)

**Related User Stories**:
- US020_ViewSeriList: View Seri Lookup List
- US021_RecordSeriResult: Record a Seri Result
- US022_ViewSeriDetail: View Seri Result Detail
- US023_EditSeriResultAsTrade: Edit a Seri Result (as Trade)
- US024_EditSeriResultAsSettlement: Edit a Seri Result (as Settlement)

**Related APIs/Routes**:
- (GET) /api/seri-results — ROUTE034
- (POST) /api/seri-results — ROUTE033
- (GET) /api/seri-results/:id — ROUTE031
- (PATCH) /api/seri-results/:id — ROUTE032

**Related Data Models**:
- MODEL008_SeriResult

**Related Background Logic**: none.

**Related Permissions**:
- PERM008_SeriResultCreation
- PERM009_SeriResultEdit
- PERM034_SeriResultRlsWrites

---

### F006_DeliveryTracking: Delivery Tracking

**Type**: ui
**Priority**: P1
**Legacy/RFP Traceability**: `F006_DeliveryTracking`, `docs/pham-vi-va-phan-mock.md:30-31` (`SCR011_DeliveryList`/`SCR012_DeliveryDetail`, LAB-1 `SC-15`/`SC-16`) — identical scope. `SC-17` (delivery-exception recording, `FR-DEL-03`, P1) under the same legacy row is out of scope, see gap below.

**Description**: Record shipments against, and complete, an existing delivery (input: shipment qty per record; completion has no input beyond the action itself). **This feature does not create deliveries.** Verified this pass: `delivery` table access across all of `src/` is 7 `.select(`/3 `.update(`/**zero** `.insert(` — the only `insert into public.delivery` anywhere is `supabase/seed.sql:149`. US027/US028 are scoped accordingly; no story in this feature (or any other) claims delivery creation.

**Known gap — delivery creation itself.** No code path creates a `delivery` row from a confirmed transaction. `[UNVERIFIED]`: whether this was an intentional scope cut or a build gap was not traceable from source; `user-stories.md` Method note 5 flags the same absence and leaves it open. Demo delivery rows exist only because the seed script inserted them.

**Known gap — delivery exceptions (`SC-17`/`FR-DEL-03`, RFP `RPT-04`).** `delivery.status` CHECK permits `'ngoại lệ'` (exception) at the schema level (`supabase/migrations/20260904090400_delivery.sql:10`), but no write path in `src/lib/deliveries/` or `src/app/api/deliveries/` ever sets it, and neither `delivery` nor `delivery_shipment` has a `reason` column — so `RPT-04` cannot be built from data that doesn't exist, not from missing report-building time (`docs/pham-vi-va-phan-mock.md:106-115`).

**Known deviation — delivery completion role.** `ROUTE007`'s handler restricts completion to `ROLE-SETTLEMENT` alone, departing from an earlier technical-spec draft's "both roles" note (`route-list.md:91`, the route's own comment cites this explicitly) — worth flagging for anyone reconciling against that earlier draft.

**Related Screens**:
- SCR016_DeliveryList
- SCR017_DeliveryDetail (composite — owns all 3 regions: REG001_Overview, REG002_NewShipment, REG003_History)

**Related User Stories**:
- US025_ViewDeliveryList: View Delivery List
- US026_ViewDeliveryDetail: View Delivery Detail
- US027_RecordShipment: Record a Shipment
- US028_CompleteDelivery: Complete a Delivery

**Related APIs/Routes**:
- (GET) /api/deliveries — ROUTE010
- (GET) /api/deliveries/by-transaction/:transactionId — ROUTE009
- (POST) /api/deliveries/:id/shipments — ROUTE008
- (POST) /api/deliveries/:id/complete — ROUTE007

**Related Data Models**:
- MODEL009_Delivery (DISC-006 `status`: chờ/đang giao/hoàn tất/ngoại lệ — the 4th value is schema-only, see gap above)
- MODEL010_DeliveryShipment

**Related Background Logic**: none.

**Related Permissions**:
- PERM010_DeliveryShipmentRecording
- PERM011_DeliveryCompletion
- PERM035_DeliveryAndDeliveryShipmentRlsWrites

---

### F007_DailyReconcileAndLock: Daily Reconciliation & Business-Day Lock

**Type**: ui
**Priority**: P0
**Legacy/RFP Traceability**: `F007_DailyReconcileAndLock`, `docs/pham-vi-va-phan-mock.md:32` (`SCR013_ReconcileAndLock`, LAB-1 `SC-18`) — identical scope. `SC-19` (dispute management, `FR-SETTLE-03`, P1) under the same legacy row is out of scope, see gap below.

**Description**: View per-line reconciliation for a business date (`aitai`/`seri`/`delivery` rows unioned through the `reconciliation_line` view, qty ordered vs. cumulative shipped) and lock the day — a one-way action with no unlock endpoint anywhere in this codebase. Locking is what makes F008's post-lock correction and F009's incentive engine meaningful. Enforcement is a Postgres trigger, `trg_block_after_lock`, `BEFORE UPDATE OR DELETE` on exactly 4 tables — `transaction`, `seri_result`, `mekiki_record`, `delivery_shipment` — never on INSERT; `lot` and `delivery` are deliberately exempt because both legitimately span business days (QĐ-3). Verified live: the trigger rejects **both** a normal `authenticated` client and `service_role` (BYPASSRLS) with the identical `P0001` error — deliberately placed in the trigger rather than RLS, because an RLS-based lock would silently return `200 []` instead of a distinguishable error (QĐ-4, `docs/pham-vi-va-phan-mock.md:204-214`).

**Known gap — dispute management (`SC-19`/`FR-SETTLE-03`).** No dispute table, no dispute status, no SLA milestone exists anywhere in the migrations — there is nothing to build a dispute screen or `RPT-09` from (`docs/pham-vi-va-phan-mock.md:113-115,79`).

**Known gap — OBJ-04 (report within 15 minutes) is not met by this feature.** Locking runs synchronously when a person clicks the button; there is no scheduled batch anywhere in this codebase (`behavior-logic.md` Headline Finding — grep for `setInterval|cron\.schedule|Queue\(` across `src/` returns zero hits). "Batch xong trước 11:00 JST" is a contractual target, not an enforced SLA — nothing measures elapsed time.

**Related Screens**:
- SCR018_ReconcileAndLock

**Related User Stories**:
- US029_ViewReconciliationLines: View Reconciliation Lines
- US030_LockBusinessDay: Lock a Business Day

**Related APIs/Routes**:
- (GET) /api/reconciliation/:businessDate — ROUTE027
- (POST) /api/reconciliation/:businessDate/lock — ROUTE026

**Related Data Models**:
- MODEL011_BusinessDayLock
- MODEL017_ReconciliationLine (VIEW, not a table — `UNION ALL` over transaction/seri_result/delivery_shipment, `security_invoker=true` so it never bypasses the caller's own RLS; DISC-011 `source_type`)

**Related Background Logic**: none.

**Related Permissions**:
- PERM012_BusinessDayLock
- PERM036_BusinessDayLockRlsWrites

---

### F008_PostLockCorrection: Post-Lock Correction (Maker-Checker)

**Type**: ui
**Priority**: P1
**Legacy/RFP Traceability**: `F008_PostLockCorrection`, `docs/pham-vi-va-phan-mock.md:33-34` (`SCR014_CorrectionRequest`/`SCR015_CorrectionApproval`, LAB-1 `SC-20`/`SC-21`) — identical scope.

**Description**: Request a correction on a locked transaction (input: target transaction, reason, ≥0 evidence files — 4-MIME allow-list, 5MB cap, server-enforced not client-`accept`-trusted), then approve or reject it. This is the one lawful write path into locked business-day data (`accounting_export_batch` aside, see F010) — it writes a `transaction_adjustment` row (`kind`: reverse zeroes the original, delta records a partial amount — DISC-008) rather than mutating the locked row itself.

**Maker-checker is an identity check, not a role check.** Both requester and approver hold `ROLE-SETTLEMENT`; the system blocks the *same person* from approving their own request — **403 SELF_APPROVAL** — verified live (`docs/pham-vi-va-phan-mock.md:276-278`). Approve and reject share one endpoint (`decision: "approve"|"reject"`) but are two distinct US (approve triggers `runIncentiveDeltaAfterApproval`, a real side effect into F009; reject does not — a genuine data-flow branch, `user-stories.md` Method note 7).

**Related Screens**:
- SCR019_CorrectionRequest
- SCR020_CorrectionApproval

**Related User Stories**:
- US031_RequestCorrection: Request a Correction
- US032_ViewCorrectionQueue: View Correction Approval Queue
- US033_ApproveCorrection: Approve a Correction Request
- US034_RejectCorrection: Reject a Correction Request

**Related APIs/Routes**:
- (POST) /api/corrections — ROUTE005
- (GET) /api/corrections — ROUTE006
- (POST) /api/corrections/:id/approve — ROUTE004

**Related Data Models**:
- MODEL012_CorrectionRequest (DISC-007 `status`: pending/approved/rejected)
- MODEL013_TransactionAdjustment (DISC-008 `kind`: reverse/delta)

**Related Background Logic**: none.

**Related Permissions**:
- PERM013_CorrectionRequestCreation
- PERM014_CorrectionApprovalRoleGate
- PERM015_CorrectionMakerCheckerSelfApprovalBlock
- PERM037_CorrectionAndAdjustmentRlsWrites

---

### F009_IncentiveAndRuleVersion: Incentive Calculation & Rule Versioning (完納奨励金)

**Type**: ui
**Priority**: P1
**Legacy/RFP Traceability**: `F009_IncentiveAndRuleVersion`, `docs/pham-vi-va-phan-mock.md:35-37` (`SCR016_IncentiveResult`/`SCR017_RuleVersionList`/`SCR018_RuleVersionEditor`, LAB-1 `SC-22`/`SC-23`/`SC-24`) — identical scope. Also owns `GOV-RULE-01` (§ cap of 4 rule-version changes/year), first named in `docs/pham-vi-va-phan-mock.md:69,85` — see gap below.

**Description**: View 完納奨励金 (on-time-payment incentive) results by period; create, approve, and roll back incentive rule versions. The calculation engine runs **synchronously inside the lock/approve request** (`runIncentiveDeltaAfterApproval` / the F007 lock route), not as a background job the original spec described — no queue infrastructure exists in this stack. Verified live: `987654 → 1086419` on-time, `→ 0` late, and `1235 → 1358` — the last case proves **floor rounding**, not round-half-up (round would give 1359) (`docs/pham-vi-va-phan-mock.md:273-275`).

**Rule-version maker-checker mirrors F008's identity check, with a twist on rollback.** Approve and rollback are gated `ROLE-RULE-ADMIN`; the demo pair `ruleadmin@`/`rulechecker@` shares that role, and the same-creator-cannot-approve identity check applies (**403 SELF_APPROVAL** on approve, **403 SELF_ROLLBACK** on rollback). Rollback's self-check is against the *currently active* version's own creator, not the rollback target's — confirmed directly in `rollback-rule-version.ts:44-45`, not inferred from the approve case.

**Known gap — `GOV-RULE-01` (≤4 rule-version changes/year) is not enforced.** `create-rule-version.ts` does not count versions created in the current year and does not block a 5th change — this cap exists only as an RFP requirement, with zero code enforcing it (`docs/pham-vi-va-phan-mock.md:85`).

**Known gap — `payment_record` is a disclosed mock input table, not a real payment ledger.** The engine's ALG-002 needs `eligible_amount_jpy`/`paid_on_time` and no F00x spec supplied a source table for them — `payment_record` (MODEL016) was added purely to unblock this, seed-data only, deliberately no authenticated write policy.

**Related Screens**:
- SCR021_IncentiveResult
- SCR022_RuleVersionList
- SCR023_RuleVersionNew
- SCR024_RuleVersionDetail

**Related User Stories**:
- US035_ViewIncentiveResults: View Incentive Results
- US036_ViewRuleVersionList: View Rule Version List
- US037_CreateRuleVersion: Create a New Incentive Rule Version
- US038_ViewRuleVersionDetail: View Rule Version Detail
- US039_ApproveRuleVersion: Approve a Rule Version
- US040_RollbackRuleVersion: Roll Back to an Earlier Rule Version

**Related APIs/Routes**:
- (GET) /api/incentive-results — ROUTE011
- (GET) /api/incentive-rules — ROUTE015
- (POST) /api/incentive-rules — ROUTE014
- (POST) /api/incentive-rules/:id/approve — ROUTE012
- (POST) /api/incentive-rules/:id/rollback — ROUTE013

**Related Data Models**:
- MODEL014_IncentiveRuleVersion (DISC-009 `status`: pending_approval/active/rolled_back)
- MODEL015_IncentiveResult (DISC-010 `kind`: normal/delta; no authenticated write policy — `service_role`/`SECURITY DEFINER` only)
- MODEL016_PaymentRecord (**disclosed mock table**, see gap above)

**Related Background Logic**: none — the "engine" runs synchronously in a request handler, not as an actual background job (see Description).

**Related Permissions**:
- PERM016_IncentiveRuleVersionCreateList
- PERM017_IncentiveRuleApprovalRoleGate
- PERM018_IncentiveRuleMakerCheckerSelfApprovalBlock
- PERM019_IncentiveRuleRollbackRoleGate
- PERM020_IncentiveRuleMakerCheckerSelfRollbackBlock
- PERM021_IncentiveResultsViewing
- PERM038_IncentiveRuleVersionRlsWrites
- PERM039_IncentiveResultAndPaymentRecordSystemOnly

---

### F010_ReportAndExport: Reporting & Accounting Export

**Type**: ui
**Priority**: P0
**Legacy/RFP Traceability**: `F010_ReportAndExport`, `docs/pham-vi-va-phan-mock.md:38-39` (`SCR019_ReportCatalog`/`SCR020_ReportViewer`, LAB-1 `SC-25`/`SC-26`). `SC-27` ("Batch xuất kế toán") has no screen of its own — it runs inside `SCR026_ReportViewer`/REG002 — and maps to RFP `FN-11`/`FE-037`/`IF-ACC-01` (P0), the accounting-integration requirement, confirmed **built** as of 2026-09-08 (`docs/pham-vi-va-phan-mock.md:8-10,74`).

**Description**: Browse a 12-report catalog, view/filter one report's rows, export as CSV, and (settlement role only) create a daily accounting export batch. This feature **owns no core business data table** — every report reads across other features' tables (`src/lib/reports/queries/rpt-01-daily-transactions.ts:8`, "F010 không sở hữu bảng dữ liệu nghiệp vụ nào") — except `accounting_export_batch`, which it does own.

**Known gap — 5 of 12 reports are mock, and the two report endpoints reject a mock differently (load-bearing distinction).** `RPT-04`, `RPT-09`, `RPT-10`, `RPT-11`, `RPT-12` are `isMock: true` in `src/lib/reports/registry.ts`. The **export** endpoint refuses a mock outright with `403 MOCK_REPORT` (`export.csv/route.ts:33`) before running any query; the **view** endpoint has no rejection branch at all and returns `200` with `rows: [], total: 0, isMock: true` (`load-report-rows.ts:78`). `RPT-10/11/12` are mock for ring-2 budget reasons (data sources exist); `RPT-04`/`RPT-09` are mock because **their source data does not exist anywhere in the schema** — see F006 and F007 gap notes respectively for why. A considered, rejected alternative: building a half-working `RPT-04` from `transaction.qty` minus `delivery_shipment.qty` was weighed and explicitly declined, because F007's own `reconciliation_line.variance` already surfaces that exact number for `source_type='aitai'` rows — a second, half-complete report under the RFP's exact code/title would invite the customer to mistake half a report for a whole one (`docs/pham-vi-va-phan-mock.md:116-124`).

**Known gap — accounting connection method, tax rate, and batch replace/accumulate semantics are unconfirmed assumptions, not defects.** Five assumptions are recorded pending an RFP §08-03 interface working session (`docs/gia-dinh-tich-hop-ke-toan.md`): (1) 8%軽減税率 on 税抜 basis, floor-rounded, summed per participant/day — `src/lib/accounting/tax.ts`; (2) every export mints a **new** batch code, `kind: full|re-export` distinguishes first-vs-subsequent so the receiving accounting system can choose replace-vs-accumulate semantics itself; (3) no external/ERP participant code exists on `participant`, only the internal uuid; (4) connection is manual CSV download via UI, no SFTP/API/schedule; (5) `RPT-03`'s "about to expire" threshold (30 days) is an unconfirmed constant.

**Related Screens**:
- SCR025_ReportCatalog
- SCR026_ReportViewer (composite — owns both regions: REG001_ReportResults, REG002_AccountingExportBatch)

**Related User Stories**:
- US041_ViewReportCatalog: View Report Catalog
- US042_ViewReportData: View Report Data
- US043_ExportReportData: Export Report Data as CSV
- US044_CreateExportBatch: Create a Daily Accounting Export Batch

**Related APIs/Routes**:
- (GET) /api/reports — ROUTE030
- (GET) /api/reports/:reportCode — ROUTE029
- (GET) /api/reports/:reportCode/export.csv — ROUTE028
- (POST) /api/accounting/export-batches — ROUTE001

**Related Data Models**:
- MODEL019_AccountingExportBatch (append-only, no update/delete policy; deliberately **exempt** from `trg_block_after_lock` since it records data *about* an already-locked day rather than *into* one — QĐ-3 extension, `docs/pham-vi-va-phan-mock.md:125-137`. Live-checked 2026-09-08: table exists, 0 batches exported in the demo environment.)

**Related Background Logic**: none — batch creation is a synchronous button click, not a scheduled export (see F007's OBJ-04 gap note; both point at the same absence).

**Related Permissions**:
- PERM025_AccountingExportBatchCreation
- PERM026_MockReportExportBlock
- PERM040_AccountingExportBatchRlsWrites

---

### F011_SharedFoundation: Shared Foundation (Audit, RLS, Localization)

**Type**: mixed
**Priority**: P0
**Legacy/RFP Traceability**: `F011_SharedFoundation`, `docs/pham-vi-va-phan-mock.md:41` — "audit log, RLS, i18n VI/JA, seed — không có màn hình riêng" (no screen of its own — cuts across all 20/26 screens). Identical scope, one exception: `SCR002_Home` did not exist when the legacy doc was written, so this pass adds one narrow UI citation to it (locale switcher only — see Modeling Note 1).

**Description**: Infrastructure every other feature depends on but none of them owns: (1) audit logging — `writeAuditLog()` called at every sensitive write, 331 audit rows vs. 31 core business-table rows live-checked 2026-09-08, a ~10.7:1 ratio (`docs/pham-vi-va-phan-mock.md:303-307`); (2) the RLS baseline — `read_all_active_users` grants every active role read access on **all 18 tables + 1 view** (16 in `rls_core.sql` + 1 each from `lot_attachment.sql`/`accounting_export.sql`); (3) VI/JA UI-language switching; (4) demo seed data.

**Known gap — RLS restricts writes only; do not describe it as read isolation.** Every table in this schema is readable by every active account regardless of role — page-level access is gated in the **application layer** by `requireRole()`, which returns **404** (not 403) on a role mismatch (`require-role.ts:66-77`). An earlier project document made the read-isolation error; it was corrected only after an audit.

**Known gap — `POST /api/locale` has no Layer-2 check of its own (PERM002).** Every other route in this codebase calls `requireUser()`/`requireRole()`; this one sits behind the Layer-1 session check only — a caller with a valid Supabase session but a **deactivated** `app_user` row can still set the locale cookie. Impact is low (a UI-language cookie, validated to `vi`|`ja`, no other effect) but it is an observed, real inconsistency with every other route's pattern, recorded here rather than silently normalized away.

**Known gap — a write blocked by the lock trigger via a path that bypasses the app layer may go unaudited.** A direct `psql` write or another PostgREST client is still correctly rejected by `trg_block_after_lock` (P0001), but only the app-layer responder (`handle-locked-write.ts`) actively writes an `audit_log` row for that rejection — the trigger itself cannot, since Postgres has no autonomous transaction to keep an INSERT alive alongside a statement that is about to roll back (`docs/pham-vi-va-phan-mock.md:160-166`).

**Known gap — no automated test suite anywhere in this repository.** A recorded, deliberate waiver (`plan.md` § "Quyết định: không cài test runner cho LAB-3"), not an oversight — do not describe testing as a delivered capability of this or any feature.

**Related Screens**:
- SCR002_Home (shared layout only — locale-switcher control in `TopHeader`; the page's own dashboard content is owned by F012_PipelineDashboard, see Modeling Note 1)

**Related User Stories**:
- US003_SwitchUILanguage: Switch UI Language

**Related APIs/Routes**:
- (POST) /api/locale — ROUTE016

**Related Data Models**:
- MODEL002_AuditLog

**Related Background Logic**:
- BL001_StorageEventSubscribe: Nav-rail cross-tab sync — subscribe (no owning US###, see Modeling Note 4)
- BL002_StorageEventUnsubscribe: Nav-rail cross-tab sync — unsubscribe (no owning US###, see Modeling Note 4)

**Related Permissions**:
- PERM002_LocaleEndpointLayer2Gap
- PERM027_RlsSharedReadAllActiveRolePolicy
- PERM029_AuditLogAppendOnlyWrite

---

### F012_PipelineDashboard: Pipeline Dashboard

**Type**: ui
**Priority**: P2
**Legacy/RFP Traceability**: **No legacy code — genuinely new.** `screen-list.md:87` confirms `SCR002_Home` appears in none of `docs/pham-vi-va-phan-mock.md` § 1's SCR001–020 rows; `screen-list.md:954` calls it "likely a later engineering addition, not a planned business screen." No RFP `FN-##`/`FE-0##` identifier maps to it either — it answers no line item in the original Function List. See F-Code Collision Note and Modeling Note 2 for why this earns its own code rather than folding into F011.

**Description**: A single connected-flow visualization (explicitly *not* "a grid of loose cards," per the component's own source comment, `src/app/(app)/page.tsx:22-26`) giving an operator one-glance status across 6 domains — lots, transactions, seri, deliveries, reconciliation, corrections — 10 stage nodes across 5 lanes, each stage gated by its own `allowedRoles` before any query runs (e.g., the corrections-pending card shows a `{kind:"forbidden"}` state for every role but `ROLE-SETTLEMENT`, mirroring F008's own approval gate — `permissions-matrix.md` PERM014's own note documents this card explicitly). Below the flow sits a static, zero-query i18n glossary. Every stage node links out to its owning feature's list/detail screen.

**Related Screens**:
- SCR002_Home (owns — dashboard content only; shared-layout chrome elements on the same physical page belong to F001/F011, see Modeling Note 1)

**Related User Stories**:
- US004_ViewPipelineDashboard: View Pipeline Dashboard

**Related APIs/Routes**: none dedicated — reads live status through each owning domain's existing query functions (`countLotsByStatus`, `countTransactionsByStatus`, `countSeriResults`, `countDeliveriesByStatus`, `loadLockStatus`, `countCorrectionsByStatus`), none of which is a route this feature itself defines; each is already attributed to its owning feature above (F003/F004/F005/F006/F007/F008 respectively).

**Related Data Models**: none dedicated — this feature aggregates read access to models F003–F008 already own; it introduces no schema of its own.

**Related Background Logic**: none.

**Related Permissions**: none dedicated — gated by the generic session baseline (PERM001, owned by F001) plus, for the one role-restricted card, the same rule PERM014 (owned by F008) already documents. No standalone PERM### exists for the dashboard itself; recorded here as a genuine cross-reference rather than a duplicated PERM entry (DRY).

---

## Summary

- **Total Features**: 12 (F001–F011 reused verbatim from the pre-existing legacy scheme; F012 newly assigned)
- **Total Screens**: 26 (all 26 SCR001–SCR026 claimed; SCR002_Home is claimed by 3 features for 3 disjoint chrome/content slices — see Modeling Note 1)
- **Total User Stories**: 44 (all 44 US001–US044 claimed, zero orphans)
- **Total Routes**: 38 (all 38 ROUTE001–ROUTE038 claimed, zero orphans, zero double-claims)
- **Total Data Models**: 19 (all 18 tables + 1 view claimed; MODEL016_PaymentRecord and MODEL019_AccountingExportBatch are both post-legacy additions, attributed to F009/F010 respectively by domain fit)
- **Total Background Logic**: 2 (both claimed by F011; both lack an owning US### — disclosed gap, Modeling Note 4)
- **Total Permissions**: 40 (all 40 PERM001–PERM040 claimed, zero orphans, zero double-claims)
- **Languages Detected**: TypeScript (strict), single package, no multi-stack split

## Cross-Reference Validation

- [x] All F### codes are unique (F001–F012)
- [x] All F### codes are referenced in UserStories.md — indirectly, via this document's own citations (UserStories.md predates this file and does not itself carry F### fields; that is by design, per `code-formats.md`: "FeatureList is the ONLY document that maps features to other artifacts")
- [x] All screen references are valid (SCR001–SCR026, all in `screen-list.md`'s Screen Index; no REG-scoped refs used here since Modeling Note 3 established every composite screen is single-feature-owned)
- [x] All user story references are valid (US001–US044, all in `user-stories.md`'s Index)
- [x] All route references are valid (ROUTE001–ROUTE038, all in `route-list.md`'s Backend Routes tables)
- [x] All data model references are valid (MODEL001–MODEL019, all in `data-model.md`)
- [x] All behavior logic references are valid (BL001–BL002, both in `behavior-logic.md`)
- [x] All permission references are valid (PERM001–PERM040, all in `permissions-matrix.md`)
- [x] Every US has a parent feature (F###) — 44/44, see per-feature "Related User Stories" above; sums to 2+5+5+5+5+4+2+4+6+4+1+1 = 44
- [x] Every screen has a parent feature (F###) — 26/26; SCR002_Home has 3 parents for 3 disjoint slices, by design (Modeling Note 1), not a gap
- [x] Every route maps to a feature (F###) — 38/38, no route double-claimed; F012 has none of its own (reads via other features' already-claimed routes, stated explicitly, not silently omitted)
- [x] Every data model maps to a feature (F###) — 19/19
- [x] Every background logic maps to a feature (F###) — 2/2, both F011, both flagged for the missing US### (Modeling Note 4)
- [x] Every permission maps to a feature (F###) — 40/40, no permission double-claimed
