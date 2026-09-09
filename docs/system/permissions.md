# Permissions

**Project**: sakura-market
**Generated**: 2026-09-08
**Analysis Scope**: Who can do what across the whole system — session/login, role-gated actions,
database-level write rules, and maker-checker approval rules.

> **Curated, plain-language view.** This document is for PM, BA, and client audiences who need to
> understand access without reading raw codes. The raw PERM### matrix lives at
> [permissions-matrix.md](./permissions-matrix.md). This document is derived from that matrix.

## Authorization System Type

**System Type**: `hybrid`

The system combines role-based access control with an identity-based maker-checker rule layered on
top of two roles' own approval actions.

| System Type | Description |
|-------------|-------------|
| `rbac` | Role-Based Access Control — roles (admin, user, manager) drive access |
| `abac` | Attribute-Based Access Control — policies on attributes (department, owner, status) |
| `acl` | Access Control List — explicit per-user permissions |
| `ownership` | Resource Ownership — owner_id / created_by / can_edit rules |
| `hybrid` | Mixed — roles combined with ownership checks |
| `other` | Custom permission logic |

**Identified Roles** (7 total, confirmed independently from both the database schema and the
application code — `app_user.role`'s CHECK constraint and `src/lib/auth/role-landing.ts`'s `ROLES`
constant agree exactly):

- Sys Admin — manages market participants: creates them, edits their details, and moves them
  through their eligibility lifecycle (active / suspended / revoked / under review).
- Intake — receives lots into the market and records their receipt documents.
- Judge — grades received lots (目利き, mekiki) before they can be sold.
- Trade — creates negotiated trades (相対取引, aitai) and auction results (せり, seri), and confirms
  or cancels them.
- Delivery — records shipments against a delivery and tracks its progress.
- Settlement — the operationally central role: locks business days, reviews reconciliation,
  requests and approves corrections after a lock, views incentive results, and creates the daily
  accounting export batch. Also shares delivery-completion and seri-result-edit rights with other
  roles in places.
- Rule Admin — creates, approves, and rolls back incentive rate-table versions.

Two demo accounts (`settlement` / `settlement-lead`) share the Settlement role, and two more
(`ruleadmin` / `rulechecker`) share the Rule Admin role — these are separate people, not separate
roles; the maker-checker rule below exists specifically because two different people can hold the
same role.

## Curated View

- **Every signed-in, active account** can read essentially everything in the system — every
  participant, lot, transaction, seri result, delivery, correction, incentive rule and result, and
  accounting export batch. There is no role that sees a narrower slice of the data than any other;
  the differences between roles are entirely about who is allowed to **change** something, never
  about who is allowed to **see** it.
- **Sys Admin** can create and edit market participants and move them through their eligibility
  states. No other role can touch participant records at all.
- **Intake** can bring a new lot into the system and attach its receipt documents. No other role can
  create a lot.
- **Judge** can grade a lot once it has been received. No other role can record a grade.
- **Trade** can create negotiated trades and auction results, and can confirm or cancel a trade.
  Trade can also edit an existing auction result, a right it shares with Settlement.
- **Settlement** can adjust certain lot fields after intake, lock a business day (a one-way action —
  once a day is locked, it stays locked, forever), request and decide corrections after a lock,
  view incentive results, and create the daily accounting export batch. Settlement can also
  complete a delivery — a right that, per the current build, Delivery itself does **not** have,
  even though the shipment-tracking spec originally described both roles sharing it.
- **Delivery** can record a shipment against a delivery while it is still in progress, but cannot
  mark a delivery complete.
- **Rule Admin** can create new incentive rate-table versions, approve them, and roll a version back
  to an earlier one.
- **No role** — not even Sys Admin — can create or edit its own account through the app. Accounts are
  provisioned entirely outside the application, through the underlying database platform's own admin
  tooling.
- **No role** can write to the computed incentive-result ledger or to the (deliberately mock,
  seed-only) payment-record table; both are populated only by an automated background process, never
  by a person clicking a button.
- **No one** can unlock a business day once it has been locked — there is no such action anywhere in
  the system.

## Access Boundaries

The system draws its boundary almost entirely around **who may write**, not who may read. Every
active account, regardless of role, can look at every participant, lot, trade, auction result,
delivery, reconciliation line, correction, incentive rule/result, and accounting export batch in the
system. What separates one role from another is the narrow set of actions each is allowed to
perform: Intake brings lots in, Judge grades them, Trade sells them and records auctions, Delivery
ships them, Settlement locks the books and handles the money-adjacent workflow (corrections,
incentive review, accounting export, delivery completion), Rule Admin governs the incentive
rate table, and Sys Admin governs who is allowed to participate in the market at all.

A second, narrower boundary sits inside two of Settlement's and Rule Admin's own actions: **a person
who requests a correction cannot also be the one who approves it, and a person who creates an
incentive rule version cannot also be the one who approves or rolls it back**. This is not a
role boundary — both the requester and the approver typically hold the exact same role — it is a
same-person check, so that no single account can both propose and rubber-stamp its own change.

Buttons and menu links that appear or disappear by role (a "create" link only Intake sees, an edit
form only Settlement sees, and so on) are a courtesy that matches what the account is actually
allowed to do — they are not themselves what stops a wrong-role account. Every one of those actions
is independently checked again on the server, and a wrong-role account that bypassed the hidden UI
and called the action directly would still be refused.

## Special Conditions

- **A locked business day cannot be edited, ever, by anyone** — this includes accounts that would
  otherwise bypass every other check in the system (automated/administrative access). It is enforced
  at the database level itself, not by any role rule, and it applies to exactly four kinds of record:
  trades, auction results, lot gradings, and delivery shipments. Two kinds of record are deliberately
  exempt because they naturally span more than one business day: the lot itself, and the delivery
  header. Filing a correction after a lock is the one recognized way to still adjust the historical
  record — it never edits the original, only records a separate adjustment alongside it.
- **A logged-in account with no matching (or a disabled) internal user record** is redirected to the
  sign-in screen throughout the app — with one narrow exception: setting the UI display language
  (Vietnamese/Japanese) does not check whether the account's internal record is active, only that a
  login session exists at all. The only effect of that gap is which language the interface shows;
  it exposes no data and permits no other action.
- **Five of the twelve report types in the report catalog are marked as mock data** (`RPT-04`, `RPT-09`, `RPT-10`, `RPT-11`, `RPT-12` — the other seven are real, per `src/lib/reports/registry.ts`).** No role, not
  even Settlement, can export a mock report's data — the export button is disabled for everyone,
  and the export link itself refuses the request even if called directly.
- **The daily accounting export succeeds even for an already-locked business day** — creating a
  record about a locked day is treated as safe, unlike editing the locked day's own records, which
  is never allowed.
- No feature flags, A/B experiments, or environment-specific (dev/staging/prod) behavior differences
  were found anywhere in this codebase.
