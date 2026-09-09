# Screen List

**Project**: sakura-market
**Generated**: 2026-09-08
**Analysis Scope**: `src/app/**/page.tsx` (26 files) — route-view branch, per `route-list.md` (Wave 1, gate-passed)

**Code Format**: All codes follow `SCR###_NameSlug` | `SCR###/REG###` for region-scoped references.

**Note**: Feature (F###) mapping lives in FeatureList.md only (not yet generated — Wave 5 pending). UserStory mapping lives in UserStories.md only. Neither is repeated here.

## Method note — 26 SCR, not 20 (see reconciliation at end of document)

This codebase's own source comments (`grep -rn "SCR0" src/`, 90+ hits) and `docs/pham-vi-va-phan-mock.md` § 1 use an internal registry of **SCR001–SCR020** that deliberately merges a list-view file and a detail-view file (or a create-view file and a detail-view file) under ONE code — e.g. `SCR008_TransactionList` covers both `/transactions` (list) and `/transactions/:id` (detail); `SCR010_SeriLookup` covers `/seri` + `/seri/:id`; `SCR018_RuleVersionEditor` covers `/incentive/rules/new` + `/incentive/rules/:id`. That is a real, intentional, documented product convention (confirmed independently in the page-file comments, in `route-list.md`'s own annotations, and in the scope doc) — but it directly conflicts with this pass's **Anti-Compression Rule** (`screen-list-template.md`: *"One SCR per distinct view/page file... ≥2 view files under one namespace/route prefix → emit one SCR per file"*). Per that explicit rule, this document assigns **one SCR### per `page.tsx` file** (26 files → 26 SCR### codes), and each entry below cites the app's own internal SCR-code as `Legacy ref` for traceability. See `## Screen-Count Reconciliation` at the end for the full accounting.

**Region Guidance**: Declared only when ≥1 independence signal exists (distinct API endpoint, independent loading state, independent scroll container, independent auth/permission gate, distinct business workflow, distinct mutation surface, distinct validation/action path). Shared initial payload alone never disqualifies a split, but its absence — i.e., two candidate regions sharing bost read AND write AND workflow — merges them (Trap 3). Owner column uses `TBD` throughout: `feature-list.md` does not exist yet at this wave (Trap 6 permits `TBD`).

**REG Numbering**: top-to-bottom visual order at desktop default viewport, per-screen scope (REG001 under SCR005 is unrelated to REG001 under SCR009).

---

## Screen Index

| Code | Name | Type | Components | Data Displayed |
|------|------|------|------------|----------------|
| SCR001_Login | Login | atomic | 2 | 0 |
| SCR002_Home | Home (pipeline dashboard) | atomic | 2 | 6 |
| SCR003_ParticipantList | Participant List | atomic | 2 | 1 |
| SCR004_ParticipantNew | Participant Create | atomic | 1 | 0 |
| SCR005_ParticipantDetail | Participant Detail | composite | 4 | 3 |
| SCR006_LotsList | Lots List | atomic | 2 | 1 |
| SCR007_LotIntake | Lot Intake | atomic | 2 | 1 |
| SCR008_MekikiEntry | Mekiki (目利き) Entry | atomic | 1 | 1 |
| SCR009_LotDetail | Lot Detail | composite | 5 | 3 |
| SCR010_AitaiCreate | Aitai (相対取引) Create | atomic | 1 | 2 |
| SCR011_TransactionsList | Transactions List | atomic | 1 | 1 |
| SCR012_TransactionDetail | Transaction Detail | composite | 4 | 4 |
| SCR013_SeriEntry | Seri (せり) Entry | atomic | 1 | 3 |
| SCR014_SeriList | Seri Lookup List | atomic | 2 | 1 |
| SCR015_SeriDetail | Seri Detail | composite | 3 | 3 |
| SCR016_DeliveryList | Delivery List | atomic | 1 | 1 |
| SCR017_DeliveryDetail | Delivery Detail | composite | 4 | 3 |
| SCR018_ReconcileAndLock | Reconciliation & Lock | atomic | 2 | 2 |
| SCR019_CorrectionRequest | Correction Request | atomic | 1 | 1 |
| SCR020_CorrectionApproval | Correction Approval | atomic | 1 | 1 |
| SCR021_IncentiveResult | Incentive Result | atomic | 1 | 1 |
| SCR022_RuleVersionList | Rule Version List | atomic | 1 | 1 |
| SCR023_RuleVersionNew | Rule Version Create | atomic | 1 | 0 |
| SCR024_RuleVersionDetail | Rule Version Detail | atomic | 2 | 2 |
| SCR025_ReportCatalog | Report Catalog | atomic | 1 | 1 |
| SCR026_ReportViewer | Report Viewer | composite | 5 | 3 |

---

## SCR001_Login

**Type**: atomic
**Legacy ref**: SCR001_Login (identical file:file mapping)

### Description

Public sign-in screen, a port of the design system's `LoginScreen` (52/48 brand/form split). Reached pre-auth — no `requireUser`/`requireRole` gate. Already-signed-in users are redirected away via `roleLanding(user.role)` before the form renders (`src/app/(auth)/login/page.tsx:23-25`).

### Components

| Component | Type | Purpose |
|-----------|------|---------|
| LoginForm | client form | Posts credentials to `POST /api/auth/sign-in` (ROUTE002) |
| NavIcon | icon | Brand mark in the navy panel |

### Data Displayed

None (credential form only). Reads `?reason=` (`unauthenticated`\|`inactive`) to select the error copy shown by `LoginForm`.

### Routes/URLs

- `/login`

### Related Screens

- Role-landing target after sign-in varies by role — see ScreenFlow § Authentication Flow for the full table (`src/lib/auth/role-landing.ts:24-32`).

---

## SCR002_Home

**Type**: atomic
**Legacy ref**: none in the 20-screen doc — not in `docs/pham-vi-va-phan-mock.md` § 1's SCR001–020 table at all.

### Description

Pipeline dashboard. Own comment states the design intent explicitly: drawn as one connected flow, "not a grid of loose cards" (`src/app/(app)/page.tsx:22-26`), so the order, forks, and the lock gate stay visible as a single picture. Aggregates live status across 6 domains via `resolvePipelineStageValue` (`src/components/pipeline/resolve-stage-value.ts:33-68`), gated per-card by `stage.allowedRoles` before any query runs. Below the flow, a static i18n glossary term list (zero service calls).

### Components

| Component | Type | Purpose |
|-----------|------|---------|
| ProcessFlow | flow diagram | 10 stage nodes across 5 lanes, one continuous SVG-based flow |
| Glossary list | static `<ul>` | 6 static i18n domain terms, no data |

### Data Displayed

- lots-received / lots-published counts (`countLotsByStatus`)
- transactions-draft / -confirmed / -cancelled counts (`countTransactionsByStatus`)
- seri-results count (`countSeriResults`)
- deliveries-in-progress count (`countDeliveriesByStatus`); deliveries-exception is `notBuilt` by design (FR-DEL-03 out of scope)
- business-day-lock status (`loadLockStatus`)
- corrections-pending count (`countCorrectionsByStatus`, ROLE-SETTLEMENT only — `forbidden` card for every other role)

(6 distinct read surfaces across 6 domains: lots, transactions, seri, deliveries, reconciliation, corrections.)

### Routes/URLs

- `/`

### Related Screens

- SCR006_LotsList, SCR011_TransactionsList (filtered `?status=`), SCR014_SeriList, SCR016_DeliveryList (filtered `?status=`), SCR018_ReconcileAndLock, SCR020_CorrectionApproval — all via stage-node `href`s (`src/components/pipeline/pipeline-stage-config.ts:33-103`)

### Notes — genuine judgment call

`H1` (6 distinct named domain-query calls reached one level deep through `resolvePipelineStageValue`) **and** `H2` (6 distinct domains: lots/transactions/seri/deliveries/reconciliation/corrections) both pass under the raw-div fallback (`H3=0` — no `<Card>`/`<Panel>`/`<Section>`-equivalent wrapper anywhere in this file, only 2 plain `<div>`s). Classified **atomic**, not composite: the render tree has no independently-loadable/scrollable REG-worthy split to make. `ProcessFlow` is one continuous flow by explicit source-comment design intent; the Glossary block is fully static (zero service calls, fails Trap 1's independence-signal test outright) and cannot be its own REG. `[SIGNAL_INFERRED]` justification: **Intent matched** — H1/H2's "assembles independent business-logic concerns" intent; **No-row reason** — this codebase organizes by `@/lib/<domain>/*`/`@/components/<domain>/*`, not the literal `features/*`/`modules/*`/`domains/*` folder names the per-stack table lists; **Observed pattern** — 6 named query functions spanning 6 domains, feeding one unified flow visual with no independent scroll/loading/auth boundary.

---

## SCR003_ParticipantList

**Type**: atomic
**Legacy ref**: SCR002_ParticipantList

### Description

Market-participant list (4 categories × 4 statuses), filterable via `?category=&status=` GET params (`src/app/(app)/participants/page.tsx:20-49`). "Create" CTA shown only to `ROLE-SYS-ADMIN` (else `HandoffCaption`).

### Components

| Component | Type | Purpose |
|-----------|------|---------|
| ParticipantFilters | client filter form | Rewrites the URL query string |
| ParticipantTable | table | Renders up to 50 filtered rows |

### Data Displayed

- Data Entity 1: `participant` rows (category, name, license_type, status, valid_from/to)

### Routes/URLs

- `/participants`

### Related Screens

- SCR004_ParticipantNew: create link, `ROLE-SYS-ADMIN` only
- SCR005_ParticipantDetail: row link

---

## SCR004_ParticipantNew

**Type**: atomic
**Legacy ref**: none (folded into the doc's SCR002 row — the doc does not list `/participants/new` as its own SC-code)

### Description

Create-participant form, `requireRole(["ROLE-SYS-ADMIN"])` (`src/app/(app)/participants/new/page.tsx:11`).

### Components

| Component | Type | Purpose |
|-----------|------|---------|
| ParticipantForm | client form (mode="create") | Posts to `POST /api/participants` (ROUTE025) |

### Data Displayed

None (blank create form).

### Routes/URLs

- `/participants/new`

### Related Screens

- SCR005_ParticipantDetail: on success, `router.push(/participants/${saved.id})` (`src/components/participants/participant-form.tsx:73`)
- SCR003_ParticipantList: implicit parent (reached only via that screen's create link); **[UNVERIFIED]** no explicit `backHref`/cancel affordance found in this page file

---

## SCR005_ParticipantDetail (composite)

**Type**: composite
**Legacy ref**: SCR003_ParticipantDetail

### Description

Profile + current FIG-010 eligibility + full transition history, plus (ROLE-SYS-ADMIN only) an edit form and transition actions — 4 `SectionCard`s (`src/app/(app)/participants/[id]/page.tsx:78-121`).

### Components

| Component | Type | Purpose |
|-----------|------|---------|
| ParticipantProfileFields | fields | Read-only profile display |
| ParticipantForm (mode="edit") / HandoffCaption | client form | `PATCH /api/participants/:id` (ROUTE022), ROLE-SYS-ADMIN only |
| TransitionActions / HandoffCaption | client form | `POST /api/participants/:id/transition` (ROUTE023), ROLE-SYS-ADMIN only |
| TransitionHistoryTable | table | `participant_status_history` rows |

### Data Displayed

- Data Entity 1: `participant` row
- Data Entity 2: `participant_status_history` rows
- Data Entity 3: `app_user` display names (resolves `changed_by`, page.tsx:57-66)

### Routes/URLs

- `/participants/:id`

### Related Screens

- SCR003_ParticipantList (back)

### Regions

| Code | Label | Owner | Independence Signals |
|------|-------|-------|---------------------|
| REG001_Profile | TBD | Distinct business workflow (view profile/eligibility); no mutation, no independent query of its own |
| REG002_Edit | TBD | Distinct mutation `PATCH /api/participants/:id` (ROUTE022); distinct auth gate `ROLE-SYS-ADMIN` |
| REG003_Transition | TBD | Distinct mutation `POST /api/participants/:id/transition` (ROUTE023); distinct auth gate `ROLE-SYS-ADMIN` |
| REG004_History | TBD | Distinct read query (`participant_status_history` + `app_user` join, page.tsx:45-66) |

---

## SCR006_LotsList

**Type**: atomic
**Legacy ref**: none (the doc's F003 row set has no plain `/lots` list entry — SCR004/005/006 only cover new/mekiki/detail)

### Description

Lot list — entry point into mekiki entry (`ROLE-JUDGE`, `status==='received'` rows only) and lot detail (everyone), per its own comment (`src/app/(app)/lots/page.tsx:13-14`).

### Components

| Component | Type | Purpose |
|-----------|------|---------|
| EmptyState | state | Zero-row message |
| table (inline) | table | lot_code / item / package_count / initial_qty / available_qty / status |

### Data Displayed

- Data Entity 1: `lot` rows

### Routes/URLs

- `/lots`

### Related Screens

- SCR007_LotIntake: create link, `ROLE-INTAKE` only
- SCR008_MekikiEntry: row link, `ROLE-JUDGE` + `status==='received'` only
- SCR009_LotDetail: row link, everyone

---

## SCR007_LotIntake

**Type**: atomic
**Legacy ref**: SCR004_LotIntake

### Description

Lot-intake form (multipart, 0+ optional attachment files), `requireRole(["ROLE-INTAKE"])`. Keyboard-operable end to end (NFR-USE-01). Success state shows the new `lot_code` plus a real link forward and a reset-for-next-intake action (`src/components/lots/lot-intake-form.tsx:12-41`).

### Components

| Component | Type | Purpose |
|-----------|------|---------|
| KeyboardOperableForm | client form | Posts `FormData` to `POST /api/lots` (ROUTE020) |
| IntakeDocField | file input | 0+ attachment files, excluded from "Enter submits" behavior |

### Data Displayed

Pre-submit: none. Post-submit: created `lot_code` + `attachmentsFailed` count.

### Routes/URLs

- `/lots/new`

### Related Screens

- SCR008_MekikiEntry: success-state link forward (`lot-intake-form.tsx:15`)
- SCR006_LotsList: implicit parent; **[UNVERIFIED]** no explicit back link found in this page file

---

## SCR008_MekikiEntry

**Type**: atomic
**Legacy ref**: SCR005_MekikiEntry

### Description

目利き (mekiki) grading entry. Page-level view open to any active user; the actual write stays gated to `ROLE-JUDGE` at `POST /api/lots/:id/mekiki` (ROUTE017) — this page only decides whether to show the form or an explanatory notice (`src/app/(app)/lots/[id]/mekiki/page.tsx:12-15,46-53`).

### Components

| Component | Type | Purpose |
|-----------|------|---------|
| MekikiForm | client form | Posts to ROUTE017 |

### Data Displayed

- Data Entity 1: `lot` (id, lot_code, item, status)

### Routes/URLs

- `/lots/:id/mekiki`

### Related Screens

- SCR009_LotDetail (`backHref`)

---

## SCR009_LotDetail (composite)

**Type**: composite
**Legacy ref**: SCR006_LotDetail

### Description

Pipeline stage + availability + attachments + (ROLE-SETTLEMENT only) edit + audit history — 5 `SectionCard`s (`src/app/(app)/lots/[id]/page.tsx:48-86`), matching its own comment's naming ("REG-AVAILABILITY... REG-EDIT").

### Components

| Component | Type | Purpose |
|-----------|------|---------|
| StageProgressBar | indicator | Reads `lot.status` |
| LotAvailabilityFields | fields | Reads `lot.available_qty`/`initial_qty` |
| LotAttachmentsCard | list | `lot_attachment` rows |
| LotEditForm / HandoffCaption | client form | `PATCH /api/lots/:id` (ROUTE019), ROLE-SETTLEMENT only |
| LotAuditHistoryTable | table | `audit_log` rows scoped to this lot |

### Data Displayed

- Data Entity 1: `lot` row
- Data Entity 2: `lot_attachment` rows
- Data Entity 3: `audit_log` rows (lot-scoped)

### Routes/URLs

- `/lots/:id`

### Related Screens

- SCR006_LotsList (back)

### Regions

| Code | Label | Owner | Independence Signals |
|------|-------|-------|---------------------|
| REG001_Overview | TBD | Distinct business workflow (pipeline position + availability numbers); both read the single already-loaded `lot` object with no independent query — kept as ONE region per Trap 1 (no independent signal separates stage-progress from availability) |
| REG002_Attachments | TBD | Distinct read query `loadLotAttachments` (`src/lib/lots/lot-attachment-queries.ts`) |
| REG003_Edit | TBD | Distinct mutation `PATCH /api/lots/:id` (ROUTE019); distinct auth gate `ROLE-SETTLEMENT` |
| REG004_History | TBD | Distinct read query `loadLotAuditHistory` |

---

## SCR010_AitaiCreate

**Type**: atomic
**Legacy ref**: SCR007_AitaiCreate

### Description

相対取引 (aitai, negotiated trade) creation form, `requireRole(["ROLE-TRADE"])`. Lot dropdown is pre-filtered to `status==='published'` and `available_qty>0` (`src/app/(app)/transactions/new/page.tsx:11-29`).

### Components

| Component | Type | Purpose |
|-----------|------|---------|
| AitaiCreateForm | client form | Posts to `POST /api/transactions` (ROUTE037) |

### Data Displayed

- Data Entity 1: lot options (id, lot_code, item, available_qty)
- Data Entity 2: participant options (id, name)

### Routes/URLs

- `/transactions/new`

### Related Screens

- SCR012_TransactionDetail: on success, `router.push(/transactions/${id})` (`src/components/transactions/aitai-create-form.tsx:54`)

---

## SCR011_TransactionsList

**Type**: atomic
**Legacy ref**: SCR008_TransactionList (partial — this file only; see Method note)

### Description

相対取引 list, `ROLE-TRADE`'s landing page ("~90% of transaction value" per its own comment — `src/app/(app)/transactions/page.tsx:15-17`). Filterable by `businessDate`/`status`; `lot_code`/buyer name resolved via 2 extra denormalization lookups for display only (page.tsx:44-51).

### Components

| Component | Type | Purpose |
|-----------|------|---------|
| TransactionTable | table | Renders up to 100 filtered rows |

### Data Displayed

- Data Entity 1: `transaction` rows (`lot_code`/buyer-name lookups are display enrichment only, not independent capabilities)

### Routes/URLs

- `/transactions`

### Related Screens

- SCR010_AitaiCreate: create link, `ROLE-TRADE` only
- SCR012_TransactionDetail: row link

### Notes — judgment call (applies uniformly to SCR014/SCR016/SCR020 below)

Raw signal counting is inflated here by 2 ID→display-name lookups (`lot_code`, buyer name) that exist purely for denormalized display, not independent business capabilities: no independent auth gate, mutation, loading state, or scroll container attaches to either lookup — they feed the SAME single browsing capability as the main `transaction` query. No `SectionCard`/`Card`/`Panel` wrapper anywhere in this file (`H3=0`), and `H2`'s per-stack table needs ≥2 real *domain* modules, not 2 incidental lookup queries. Classified **atomic**. The same reasoning was applied to SCR014_SeriList, SCR016_DeliveryList, and SCR020_CorrectionApproval (each also does 1-2 denormalization lookups alongside its primary list query, with zero `SectionCard` wrappers) — contrast with SCR026_ReportViewer, where the second domain (`accounting`) carries its OWN independent mutation+auth+query, not a mere lookup.

---

## SCR012_TransactionDetail (composite)

**Type**: composite
**Legacy ref**: SCR008_TransactionList (partial — detail file; see Method note)

### Description

Pipeline stage + trade details + (`ROLE-TRADE`) confirm/cancel actions + audit history — 4 `SectionCard`s, explicitly "the order every detail screen uses" per its own comment (`src/app/(app)/transactions/[id]/page.tsx:18-24`).

### Components

| Component | Type | Purpose |
|-----------|------|---------|
| StageProgressBar | indicator | Reads `txn.status` |
| TransactionDetailFields | fields | lot/buyer/qty/price/business_date/status |
| ConfirmCancelButtonGroup / HandoffCaption | client form | `POST .../confirm` (ROUTE036) / `POST .../cancel` (ROUTE035), ROLE-TRADE only |
| TransactionAuditHistoryTable | table | Audit trail for this transaction |

### Data Displayed

- Data Entity 1: `transaction` row
- Data Entity 2: `lot` (lot_code, item) lookup
- Data Entity 3: `participant` (name) lookup
- Data Entity 4: audit history rows (`loadTransactionAuditHistory`)

### Routes/URLs

- `/transactions/:id`

### Related Screens

- SCR011_TransactionsList (back)

### Regions

| Code | Label | Owner | Independence Signals |
|------|-------|-------|---------------------|
| REG001_Overview | TBD | Distinct business workflow (pipeline position + trade details); both read the single already-loaded `txn`+lookups with no independent query — merged per Trap 1 |
| REG002_Actions | TBD | Distinct mutation surface: `POST /api/transactions/:id/confirm` (ROUTE036) + `POST /api/transactions/:id/cancel` (ROUTE035); distinct auth gate `ROLE-TRADE`; section itself disappears once `status==='cancelled'` (page.tsx:77-86) |
| REG003_History | TBD | Distinct read query `loadTransactionAuditHistory` |

---

## SCR013_SeriEntry

**Type**: atomic
**Legacy ref**: SCR009_SeriEntry

### Description

せり (seri, auction) result entry, `requireRole(["ROLE-TRADE"])`. Lot dropdown excludes lots that already carry a `seri_result` (`src/app/(app)/seri/new/page.tsx:11-14`).

### Components

| Component | Type | Purpose |
|-----------|------|---------|
| SeriEntryForm (mode="create") | client form | Posts to `POST /api/seri-results` (ROUTE033) |

### Data Displayed

- Data Entity 1: lot options (excluding already-recorded lots)
- Data Entity 2: participant options
- Data Entity 3: active-operator options (`app_user`, `is_active=true`)

### Routes/URLs

- `/seri/new`

### Related Screens

- SCR015_SeriDetail: on success, `router.push(/seri/${id})` (`src/components/seri/seri-entry-form.tsx:94`)

---

## SCR014_SeriList

**Type**: atomic
**Legacy ref**: SCR010_SeriLookup (partial — this file only; see Method note)

### Description

せり lookup — "deliberately smaller than SCR011 [now SCR011_TransactionsList]: no separate filter/table component" per its own comment, since せり is recording-only and much lighter than 相対取引 (`src/app/(app)/seri/page.tsx:14-16`).

### Components

| Component | Type | Purpose |
|-----------|------|---------|
| EmptyState | state | Zero-row message |
| table (inline) | table | lot / winner / qty / unit_price / decided_at |

### Data Displayed

- Data Entity 1: `seri_result` rows (`lot_code`/winner-name lookups are display enrichment, see SCR011's Notes)

### Routes/URLs

- `/seri`

### Related Screens

- SCR013_SeriEntry: create link, `ROLE-TRADE` only
- SCR015_SeriDetail: row link

---

## SCR015_SeriDetail (composite)

**Type**: composite
**Legacy ref**: SCR010_SeriLookup (partial — detail file; see Method note)

### Description

Record details + (`ROLE-TRADE` or `ROLE-SETTLEMENT`) edit + edit history — 3 `SectionCard`s (`src/app/(app)/seri/[id]/page.tsx:41-53,54-70,72-93,95-97`). Edit is open to either role per functional-spec's own Open Decision (page.tsx:17-20), matching the `seri_result` RLS update policy exactly.

### Components

| Component | Type | Purpose |
|-----------|------|---------|
| SeriRecordFields | fields | Read-only record display |
| SeriEntryForm (mode="edit") / HandoffCaption | client form | `PATCH /api/seri-results/:id` (ROUTE032) |
| SeriEditHistory | table | Edit-history rows |

### Data Displayed

- Data Entity 1: `seri_result` row
- Data Entity 2: `lot`/`participant`/`app_user` lookups (display only)
- Data Entity 3: seri edit-history rows (`loadSeriAuditHistory`)

### Routes/URLs

- `/seri/:id`

### Related Screens

- SCR014_SeriList (back)

### Regions

| Code | Label | Owner | Independence Signals |
|------|-------|-------|---------------------|
| REG001_Details | TBD | Distinct business workflow (view-only record display); no mutation or independent query of its own |
| REG002_Edit | TBD | Distinct mutation `PATCH /api/seri-results/:id` (ROUTE032); distinct auth gate `ROLE-TRADE`\|`ROLE-SETTLEMENT` |
| REG003_History | TBD | Distinct read query `loadSeriAuditHistory` |

---

## SCR016_DeliveryList

**Type**: atomic
**Legacy ref**: SCR011_DeliveryList

### Description

`ROLE-DELIVERY`'s landing page (A1, FR-DEL-01). Filterable by `businessDate`/`status`; "ngoại lệ" deliberately excluded from the filter set since no write path can ever set it (FR-DEL-03 out of scope, `src/app/(app)/deliveries/page.tsx:12-19`).

### Components

| Component | Type | Purpose |
|-----------|------|---------|
| DeliveryTable | table | Renders `listDeliveries` result |

### Data Displayed

- Data Entity 1: `delivery` rows

### Routes/URLs

- `/deliveries`

### Related Screens

- SCR017_DeliveryDetail: row link

---

## SCR017_DeliveryDetail (composite)

**Type**: composite
**Legacy ref**: SCR012_DeliveryDetail

### Description

Pipeline stage + shipment progress + (`ROLE-DELIVERY`, while not yet "hoàn tất") new-shipment form + shipment history — 4 `SectionCard`s (`src/app/(app)/deliveries/[id]/page.tsx:20,76-108`).

### Components

| Component | Type | Purpose |
|-----------|------|---------|
| StageProgressBar | indicator | Reads `delivery.status` |
| DeliveryProgress | fields | delivered_qty vs ordered_qty; ROLE-SETTLEMENT-gated complete action embedded |
| ShipmentForm / HandoffCaption | client form | `POST .../shipments` (ROUTE008), ROLE-DELIVERY only |
| ShipmentHistoryTable | table | `delivery_shipment` rows |

### Data Displayed

- Data Entity 1: `delivery` + `transaction` (joined, `loadDeliveryWithTransaction`)
- Data Entity 2: `business_day_lock` lookup (drives the reconciliation link)
- Data Entity 3: `delivery_shipment` rows

### Routes/URLs

- `/deliveries/:id`

### Related Screens

- SCR016_DeliveryList (back)
- SCR018_ReconcileAndLock: conditional link shown only when the transaction's business day is locked (page.tsx:64-71)

### Regions

| Code | Label | Owner | Independence Signals |
|------|-------|-------|---------------------|
| REG001_Overview | TBD | Distinct business workflow (pipeline position + shipment progress numbers); merged per Trap 1 (shared read, no independent signal) |
| REG002_NewShipment | TBD | Distinct mutation `POST /api/deliveries/:id/shipments` (ROUTE008); distinct auth gate `ROLE-DELIVERY`; section disappears once `status==='hoàn tất'` |
| REG003_History | TBD | Distinct read query `loadShipments` |

---

## SCR018_ReconcileAndLock

**Type**: atomic
**Legacy ref**: SCR013_ReconcileAndLock

### Description

`ROLE-SETTLEMENT`'s landing page — reconciliation lines for a business date, plus (while not yet locked) the one-way business-day lock action (`src/app/(app)/reconciliation/page.tsx:16-17`).

### Components

| Component | Type | Purpose |
|-----------|------|---------|
| ReconcileTable | table | `reconciliation_line` rows (view) |
| LockConfirmDialog / HandoffCaption | client, inline expand (not a portal/modal) | `POST /api/reconciliation/:businessDate/lock` (ROUTE026), retype-to-confirm |

### Data Displayed

- Data Entity 1: `reconciliation_line` rows
- Data Entity 2: `business_day_lock` status

### Routes/URLs

- `/reconciliation`

### Related Screens

- Reached from SCR002_Home and SCR017_DeliveryDetail; no outbound link found from this screen itself

### Notes — judgment call

2 distinct capabilities (view reconciliation lines / lock the day) — below this pass's ≥3 threshold for `H1`; no `SectionCard` (`H3=0`); single domain, `@/lib/reconciliation/*` only (`H2` fails). Classified **atomic** despite bundling a genuinely irreversible business action (FR-401) next to the read view — same "1 primary view + 1 embedded primary action" shape as several list screens above (e.g. SCR020's embedded approve action), not treated as composite anywhere in this pass.

---

## SCR019_CorrectionRequest

**Type**: atomic
**Legacy ref**: SCR014_CorrectionRequest

### Description

Post-lock correction-request creation, `requireRole(["ROLE-SETTLEMENT"])`. Reachable via `?txnCode=` from a locked transaction's own detail page, or independently via this page's own lookup form (`src/app/(app)/corrections/new/page.tsx:11-14`).

### Components

| Component | Type | Purpose |
|-----------|------|---------|
| CorrectionRequestForm | client form | Posts to `POST /api/corrections` (ROUTE005) |

### Data Displayed

- Data Entity 1: `transaction` row (by `txn_code` lookup, shown only once found)

### Routes/URLs

- `/corrections/new`

### Related Screens

- SCR012_TransactionDetail: entry via `?txnCode=`; **[UNVERIFIED]** the calling `Link` lives in a different screen's file per this page's own comment ("owned by F004, out of this phase's file scope") — not traced in this pass
- SCR020_CorrectionApproval: **[UNVERIFIED]** no explicit post-submit navigation found in `CorrectionRequestForm`

---

## SCR020_CorrectionApproval

**Type**: atomic
**Legacy ref**: SCR015_CorrectionApproval

### Description

`ROLE-SETTLEMENT`-only correction-approval queue. DEC-001 maker-checker split computed per row: `isOwnPendingRequest` vs `canDecide` (`src/app/(app)/corrections/page.tsx:15-51`).

### Components

| Component | Type | Purpose |
|-----------|------|---------|
| CorrectionListTable | table + embedded action | Approve/reject action embedded per eligible row; signed evidence URL (300s TTL) |

### Data Displayed

- Data Entity 1: `correction_request` rows + signed evidence URLs

### Routes/URLs

- `/corrections`

### Related Screens

- SCR019_CorrectionRequest: create link

---

## SCR021_IncentiveResult

**Type**: atomic
**Legacy ref**: SCR016_IncentiveResult

### Description

`ROLE-SETTLEMENT`'s view of 完納奨励金 (full-payment incentive) results, filterable by period (`src/app/(app)/incentive/page.tsx:14-15`).

### Components

| Component | Type | Purpose |
|-----------|------|---------|
| IncentiveResultTable | table | `incentive_result` rows for the selected period |

### Data Displayed

- Data Entity 1: `incentive_result` rows

### Routes/URLs

- `/incentive`

### Related Screens

None outbound found.

---

## SCR022_RuleVersionList

**Type**: atomic
**Legacy ref**: SCR017_RuleVersionList

### Description

`ROLE-RULE-ADMIN` landing page — `role-landing.ts` routes both maker and checker accounts here. Filterable by status; display status computed client-side from `effective_from` vs today (`src/app/(app)/incentive/rules/page.tsx:17-19`).

### Components

| Component | Type | Purpose |
|-----------|------|---------|
| RuleVersionTable | table | `incentive_rule_version` rows |

### Data Displayed

- Data Entity 1: `incentive_rule_version` rows

### Routes/URLs

- `/incentive/rules`

### Related Screens

- SCR023_RuleVersionNew: create link
- SCR024_RuleVersionDetail: row link

---

## SCR023_RuleVersionNew

**Type**: atomic
**Legacy ref**: SCR018_RuleVersionEditor (partial — create file; see Method note)

### Description

New rate-table version creation, `requireRole(["ROLE-RULE-ADMIN"])` (`src/app/(app)/incentive/rules/new/page.tsx:8`).

### Components

| Component | Type | Purpose |
|-----------|------|---------|
| RuleVersionForm | client form | Posts to `POST /api/incentive-rules` (ROUTE014) |

### Data Displayed

None (blank create form).

### Routes/URLs

- `/incentive/rules/new`

### Related Screens

- SCR022_RuleVersionList: on success, `router.push("/incentive/rules")` (`src/components/incentive/rule-version-form.tsx:43`) — note this goes to the LIST, not to the new version's own detail screen

---

## SCR024_RuleVersionDetail

**Type**: atomic
**Legacy ref**: SCR018_RuleVersionEditor (partial — detail file; see Method note)

### Description

Rule-version detail + maker-checker-gated approve/rollback actions — only 2 `SectionCard`s; the Actions card is entirely omitted (not just disabled) for a superseded/rolled-back version, per its own comment (`src/app/(app)/incentive/rules/[id]/page.tsx:39-44,58-84`).

### Components

| Component | Type | Purpose |
|-----------|------|---------|
| RuleVersionFields | fields | version_no, effective_from, status, created/approved-by names |
| RuleVersionDetailActions (conditional) | client form | `POST .../approve` (ROUTE012) / `POST .../rollback` (ROUTE013); both refuse the version's own creator |

### Data Displayed

- Data Entity 1: `incentive_rule_version` row
- Data Entity 2: sibling versions (rollback candidates)

### Routes/URLs

- `/incentive/rules/:id`

### Related Screens

- SCR022_RuleVersionList (back)

### Notes — judgment call

Only 2 `SectionCard`s (`H3=2`, below the ≥3 threshold this pass applies) despite bundling 2 distinct mutations (approve ROUTE012, rollback ROUTE013) into one "Actions" card. No per-stack `H2` domain plurality (`incentive` only), and `H1`'s own capability count (view / approve / rollback = 3) is not by itself a *second* passing signal under the 2-of-3 gate. Classified **atomic** — contrast with SCR005/SCR009/SCR012/SCR015/SCR017, which all clear `H3≥3` via genuinely separate `SectionCard`s.

---

## SCR025_ReportCatalog

**Type**: atomic
**Legacy ref**: SCR019_ReportCatalog

### Description

Full RPT-01..12 catalog, always listing all 12 regardless of mock/real status so the two badges are never blurred together, per its own comment (`src/app/(app)/reports/page.tsx:10-11`).

### Components

| Component | Type | Purpose |
|-----------|------|---------|
| MockDataBadge | badge | Flags `isMock` reports |

### Data Displayed

- Data Entity 1: `REPORT_REGISTRY` (static config, not a DB read)

### Routes/URLs

- `/reports`

### Related Screens

- SCR026_ReportViewer: row link, ×12 report codes

---

## SCR026_ReportViewer (composite)

**Type**: composite
**Legacy ref**: SCR020_ReportViewer

### Description

Generic viewer for all 12 RPT codes; `RPT-06` (accounting export, `IF-ACC-01`) gets an extra accounting-domain block — batch-create button + batch history — not shared by the other 11 reports (`src/app/(app)/reports/[reportCode]/page.tsx:26-31`).

### Components

| Component | Type | Purpose |
|-----------|------|---------|
| ReportFilterForm | client form | Per-report filter fields |
| ReportResultTable | table | Paginated report rows |
| MockDataBadge | badge | Shown + export disabled when `definition.isMock` |
| CreateExportBatchButton (RPT-06, ROLE-SETTLEMENT only) | client form | `POST /api/accounting/export-batches` (ROUTE001) |
| ExportBatchList (RPT-06 only) | table | `accounting_export_batch` history for the date |

### Data Displayed

- Data Entity 1: report rows per `RPT-0N` definition (paginated, `loadReportRows`)
- Data Entity 2: filter-option lists (`loadFilterOptions`)
- Data Entity 3: `accounting_export_batch` rows + exporter display names (RPT-06 only)

### Routes/URLs

- `/reports/:reportCode`

### Related Screens

- SCR025_ReportCatalog (back link)

### Regions

| Code | Label | Owner | Independence Signals |
|------|-------|-------|---------------------|
| REG001_ReportResults | TBD | Distinct read query `loadReportRows` per report definition; independent filter/pagination |
| REG002_AccountingExportBatch | TBD | RPT-06-exclusive; distinct mutation `POST /api/accounting/export-batches` (ROUTE001); distinct auth gate `ROLE-SETTLEMENT`; distinct read query `listBatchesForDate` |

### Notes — genuine judgment call

`H1` (4 distinct capabilities: view results / export CSV / create batch / view batch history) **and** `H2` (2 domains: `@/lib/reports/*` + `@/lib/accounting/*`, `@/components/accounting/*`) pass under the raw-div fallback (`H3=0` — no `SectionCard`/`Card`/`Panel` wrapper anywhere, all raw `<div>`/`<section>`). Unlike SCR002_Home, a real, cited independence signal exists for REG002 (distinct mutation + auth gate + query), so this one clears composite classification with a defensible REG split rather than staying atomic.

---

## Summary

- **Total Screens**: 26
- **Atomic**: 20
- **Composite**: 6 (SCR005, SCR009, SCR012, SCR015, SCR017, SCR026)
- **Total Regions**: 19 (4 + 4 + 3 + 3 + 3 + 2)

---

## Screen-Count Reconciliation (26 routes vs. "20 screens built out of 32 planned")

Both counts are correct — they are the same feature footprint counted at different granularity:

1. **RFP/original plan**: 32 screens (`SC-01`..`SC-32`), per `docs/pham-vi-va-phan-mock.md` § 2 / § 2b.
2. **`docs/pham-vi-va-phan-mock.md` § 1 — "20 màn đã dựng (SCR001..SCR020)"**: this is the project's own **internal, product-level** screen registry (also embedded as `SCR0##` comments across 90+ source files, confirmed by `grep -rn "SCR0" src/`). It deliberately treats a list-view file and its paired detail-view file (or a create-view file and its paired detail-view file) as **one conceptual screen**: `SCR008_TransactionList` = `/transactions` + `/transactions/:id`; `SCR010_SeriLookup` = `/seri` + `/seri/:id`; `SCR018_RuleVersionEditor` = `/incentive/rules/new` + `/incentive/rules/:id`. 32 planned − 20 built = 12 out-of-scope (§ 2 of the same doc), and this arithmetic is internally consistent (confirmed against the doc's own SC-01..SC-32 cross-reference).
3. **This document — 26 SCR###, one per `page.tsx` file**: per the Anti-Compression Rule this pass is bound to, the 3 merged pairs above are split back into 2 SCR### each (+3 codes), and 3 files the 20-screen doc never named at all are added as their own SCR###: `SCR002_Home` (`/`, a pipeline dashboard the RFP's SC-01..32 catalog never lists — likely a later engineering addition, not a planned business screen), `SCR004_ParticipantNew` (`/participants/new`, silently folded into the doc's `SCR002_ParticipantList` row), and `SCR006_LotsList` (`/lots`, silently absent from the doc's F003 row set even though `/lots/new`, `/lots/:id/mekiki`, and `/lots/:id` are all separately named). **20 (doc) − 3 (unmerge the pairs, net +3 codes) + 3 (previously-unnamed files) = 26**, matching this document's SCR count and Wave 1's 26 `page.tsx` file count exactly.

No prose doc is treated as more authoritative than the code here: every one of the 26 SCR### above was independently derived by opening its `page.tsx` file directly, and the legacy SCR-code cross-reference in each entry is for traceability only.

---

## Cross-Reference Validation

- [x] All SCR### codes are unique (SCR001–SCR026, contiguous)
- [x] All SCR### codes will be referenced in ScreenFlow.md (see companion document)
- [x] All related-screen references above resolve to a code in this document's Screen Index
- [x] All route URLs match `route-list.md`'s Frontend Routes table (Wave 1, gate-passed)
- [ ] All SCR### codes referenced in FeatureList.md — N/A, FeatureList.md not yet generated (Wave 5 pending)
- [x] No REG### is orphaned (every REG### above is declared under an in-document parent SCR###) and no REG### is nested inside another REG###
