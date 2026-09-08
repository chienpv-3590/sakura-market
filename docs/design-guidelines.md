# Sakura Market — Design Guidelines

Internal operations tool for a Japanese fisheries wholesale market. Used on a market floor
at 02:00. **Legibility beats decoration.** No animation, no gradients, no decorative icons.
Adequate contrast, generous hit targets, unambiguous state.

> **§1–§4 are stale in full, not just the one example below, and describe a layer that no
> longer ships.** Verified against the code (2026-09-08): `design-tokens.css`, `theme.css`,
> `components.css` and `controls.css` (§1's file table) **do not exist** — 4 of the 5 files
> named there were deleted; only `globals.css` remains, and it imports a completely different
> set (`cds-tokens.css`, `cds-components.css`, ten `cds-app-*.css` files). §2's ~15 hex values
> are **all wrong** — every one differs from the real `cds-tokens.css` (`--border-default` in
> particular is `#D2D7DE`, 1.45:1 on card, not the 3.48:1 the table claims). §4's 12 `.sm-*`
> classes have **zero usages** anywhere in `src/` — the whole class layer was retired, not
> just renamed. The one part still worth reading as-is: §3's semantic **mapping** (which state
> maps to which tone) still matches `src/components/ui/status-tone.ts` exactly; only its hex
> values are superseded by the real palette. Read `src/styles/cds-tokens.css` for current
> values (172 tokens, adopted verbatim) and §9–§10 below for the surface rules that are
> current. Reconciling §1–§4 into a correct description of the cds-* system is outstanding
> work — nothing in §1/§2/§4 should be relied on to write code today.

---

## 1. Where the system lives

| File | Owns |
|---|---|
| `src/styles/design-tokens.css` | The 45 canonical tokens. **The only place a value is written.** |
| `src/styles/theme.css` | Tailwind v4 `@theme inline` aliases so tokens are reachable as utilities |
| `src/styles/components.css` | Card, table, badge, chip, track, empty state |
| `src/styles/controls.css` | Buttons, fields, segmented control, links |
| `src/app/globals.css` | Import order, base element styles, focus ring, reduced-motion guard |
| `src/components/ui/status-tone.ts` | Every business status → one status tone |

Token **names** were recovered from an existing design system (the `rd-*` component CSS)
whose `:root` was lost. Names are authoritative; values were authored here from the semantic
names. If a real token file ever surfaces, only values change — no component needs touching.

Import order matters: `@import "tailwindcss"` first, then the token layer. The token `:root`
block is **unlayered**, so it beats Tailwind's `@layer theme` defaults for same-named
variables (`--font-sans`, `--radius-md`, `--radius-lg`, `--shadow-xs`).

---

## 2. Tokens

### Surfaces and text

| Token | Value | Contrast |
|---|---|---|
| `--surface-page` | `#f2f5f7` | — |
| `--surface-card` | `#ffffff` | — |
| `--text-strong` | `#0f1519` | 18.39 on card · 16.80 on page |
| `--text-body` | `#253039` | 13.46 · 12.29 |
| `--text-secondary` | `#43515c` | 8.17 · 7.46 |
| `--text-muted` | `#556370` | 6.17 · 5.63 |
| `--text-subtle` | `#616e7a` | 5.22 · 4.77 |

All five text levels clear WCAG 2.1 AA (4.5:1) on **both** surfaces. `--text-subtle` is the
floor — nothing lighter is permitted for text.

### Borders, neutrals, brand

| Token | Value | Note |
|---|---|---|
| `--border-subtle` | `#dfe5ea` | hairline divider; decorative, no contrast requirement |
| `--border-default` | `#7e8b98` | **control boundary** — 3.48:1 on card, 3.18:1 on page (WCAG 1.4.11) |
| `--neutral-50` | `#f7f9fa` | table header fill, hover fill |
| `--neutral-200` | `#e1e7eb` | progress track |
| `--neutral-400` | `#828e9b` | graphic marker — 3.34:1 on card |
| `--color-primary` | `#0f4c81` | deep marine blue. 8.86:1 on card, 7.56:1 on its own subtle |
| `--color-primary-subtle` | `#e6eef6` | pressed segment, active nav item |

Brand blue is the one saturated colour that is **not** a status, so a link or a primary
action can never be misread as a state.

### Type and shape

| Token | Value |
|---|---|
| `--font-sans` | `var(--font-noto-sans-jp), ui-sans-serif, system-ui, sans-serif` |
| `--font-mono` | `ui-monospace, "SFMono-Regular", "Cascadia Mono", Menlo, Consolas, monospace` |
| `--fs-caption` | `0.75rem` |
| `--radius-md` / `--radius-lg` / `--radius-pill` | `6px` / `10px` / `9999px` |
| `--shadow-xs` | `0 1px 2px 0 rgb(15 21 25 / 0.06)` |

One family for both scripts: Noto Sans JP's Latin Extended Additional block covers Vietnamese
diacritics, so VI and JA never flash between two fonts on the same screen. Body line-height is
`1.6`; headings `1.35`.

---

## 3. Status tokens — the semantic mapping

The status names are inherited from a property-management product. They are mapped by
**semantic role**, not by their original label.

| Token | Role | This app's states |
|---|---|---|
| `--status-occupied` | active / success / valid | lot `delivered` · txn `confirmed` · delivery `hoàn tất` · correction `approved` · participant `có hiệu lực` · rule `active` · **business day UNLOCKED** |
| `--status-vacant` | waiting on a decision | lot `received` · txn `draft` · delivery `chờ` · correction `pending` · participant `xét lại` · rule `pending_approval` · mock-data notice |
| `--status-contract` | committed and in flight | lot `published`, `traded` · delivery `đang giao` · rule `scheduled` |
| `--status-inactive` | closed / disabled / n-a | txn `cancelled` · participant `tạm ngừng` · rule `superseded` · unreached pipeline steps |
| `--status-overdue` | blocked / refused / error | delivery `ngoại lệ` · correction `rejected` · participant `mất hiệu lực` · rule `rolled_back` · validation errors · destructive actions · **business day LOCKED** |

**Reasoning.** `occupied`/`vacant` were a binary of "producing" vs "idle", which maps cleanly
onto valid/active vs waiting-on-someone. `contract` was the mid-flight commitment, which is
exactly a lot in trade or a part-delivered order. `inactive` was the de-listed unit — closed,
still on record. `overdue` was the state demanding intervention.

**A locked business day is `overdue`, not `occupied`.** It is the highest-stakes state in the
app: a locked day *refuses writes*, so the operator must read it as an obstruction, not as
"finished". Unlocked is `occupied` — the day accepts writes.

| Pair | fg | bg | solid | fg-on-bg |
|---|---|---|---|---|
| occupied | `#14622f` | `#e2f2e6` | `#1c7a3c` | 6.42 |
| vacant | `#7a4a06` | `#fdf0d9` | `#8a5806` | 6.64 |
| contract | `#43389b` | `#ecebfa` | `#5348b5` | 7.83 |
| inactive | `#4b5761` | `#eceff1` | `#5f6c78` | 6.41 |
| overdue | `#9b1c1c` | `#fceaea` | `#b52222` | 7.02 |

### Accents

| Token | Value | Meaning here |
|---|---|---|
| `--accent-valuation-fg/-bg/-solid` | `#0d5757` / `#ddf0ef` / `#0f7070` | 目利き (mekiki) grading and quality assessment — 7.06:1 |
| `--cacao-100 … -700` | `#f5ece3` `#e6d5c5` `#b98d63` `#9d7048` `#7d5637` `#5b3d26` | 完納奨励金 (incentive) / settlement money — `cacao-700` on `cacao-100` is 8.41:1 |

`--status-*-solid` and `--neutral-400` are **graphic fills** (bars, markers). Every solid
carries white text at ≥ 5.38:1, so a solid may also be used as a button background.

---

## 4. Component patterns (ported from `rd-*`)

Classes live in `@layer components`, so any Tailwind utility on the same element still wins:
the class sets the pattern, utilities tune the instance.

| Class | Ports | Notes |
|---|---|---|
| `.sm-card` | `.rd-card` | card surface + `--border-subtle` + `--radius-lg` + `--shadow-xs` |
| `.sm-table-wrap` / `.sm-table-scroll` | `.rd-tbl-wrap` | clips corners; `overflow-x: auto` is what makes wide tables survive 320px |
| `.sm-table` | `.rd-tbl` | **38px** header row on `--neutral-50`, `--border-default` underline, **44px** body rows, hover fill |
| `.sm-mono` / `.sm-num` | `.rd-mono` / `.rd-num` | tabular figures; `.sm-num` also right-aligns |
| `.sm-badge` / `.sm-chip` | `.rd-badge` / `.rd-chip` | pill; **always renders a text label** |
| `.sm-tone-{ok,wait,move,off,stop,mekiki,money}` | `.rd-t-*` | the status mapping above |
| `.sm-track` / `.sm-fill` | `.rd-cat-track` / `.rd-cat-fill` | progress bar |
| `.sm-seg` | `.rd-seg` | segmented control — the VI/JA switch |
| `.sm-btn` + `-primary` `-secondary` `-approve` `-danger` | — | 44px min-height |
| `.sm-label` `.sm-field` `.sm-hint` `.sm-error` `.sm-empty` | — | 44px min-height on fields |

### Tabular numerals

Every figure — quantity, price, date, count, code, version number — carries `.sm-num` or
`.sm-mono`. This is an operations tool where numbers get compared **down a column**.

The mono family is what actually guarantees alignment: **Noto Sans JP ships no `tnum`
feature**, so `font-variant-numeric: tabular-nums` alone would silently no-op. Both are set.

Header cells for figure columns get `text-right` to match.

---

## 5. Accessibility rules

- **State is never colour alone.** Every badge, indicator and disabled control renders a text
  label. A locked day says "Đã khóa"/"ロック済". A hidden action renders a `HandoffCaption`
  naming the role that can perform it.
- **Contrast**: text ≥ 4.5:1 (§2, §3). Control boundaries and graphic markers ≥ 3:1.
- **Hit targets**: 44px minimum on buttons and fields everywhere; the segmented control is
  40px on fine pointers and 44px under `@media (pointer: coarse)`.
- **Focus**: one treatment for everything — `2px solid var(--color-primary)` at `2px` offset,
  on `:focus-visible`.
- **Motion**: none ships. The `prefers-reduced-motion` guard is in place regardless, so
  anything added later inherits correct behaviour.
- **Selected state** in the segmented control is fill + brand colour + **bold weight**, so it
  survives a monochrome or colour-blind read; `aria-pressed` carries it for assistive tech.
- **Active nav item** is marked three ways: a 4px brand rule on the leading edge, a filled
  background, and `aria-current="page"`.

---

## 6. Responsive

Mobile-first. Verified at 320 / 390 / 768 / 1024 / 1440 — zero horizontal page overflow at
every one.

- Below `lg` the shell stacks: the sidebar becomes a full-width band above the content, with
  nav groups in a 2-column grid (3 at `sm`). A 224px fixed column leaves nothing usable at
  390px.
- Wide tables never widen the page. `.sm-table-scroll` scrolls them horizontally inside their
  card. This requires `min-w-0` on every flex ancestor between the shell and the table —
  without it the flex column refuses to shrink and the page overflows instead.

---

## 7. Bilingual (vi / ja)

- All 10 dictionary namespaces must keep **identical key sets**. Add a string to one, add it
  to both.
- Domain terms stay verbatim in both locales: 相対取引 · せり · 目利き · 完納奨励金 · 許可 · 承認.
- Vietnamese diacritics (ă â đ ê ô ơ ư and the tone marks) render from the same Noto Sans JP
  face as the Japanese text.

---

## 8. Rules of thumb

1. Never write a colour literal in a component. Reach for a token utility or a `sm-*` class.
2. A repeated pattern earns a class in `components.css` / `controls.css`; a one-off stays a
   utility.
3. A new status value goes in `status-tone.ts` and nowhere else.
4. Every figure is tabular. Every status has a word. Every action has a 44px target.

---

## 9. Detail screens: surface separation

**Current. This section describes the code as it ships.**

### The rule

Every logical section of a detail screen sits on its own card. Not "most" sections — every
one, on all six detail screens, or the ones that got a card make the ones that did not look
broken. The page title stays in the `PageFrame` header band and is never repeated into a
card.

### The one composition

`src/components/layout/section-card.tsx` is the only place the DS's card parts are assembled:

```
<section class="cds-card [cds-card--clip]">
  <div class="cds-card__head">
    <h2 class="cds-card__title">…</h2>
    [<div class="cds-card__actions">…</div>]
  </div>
  <div class="cds-card__body [cds-card__body--tight]">…</div>
</section>
```

Never hand-write `cds-card__title` — that is how the app ended up with heading classes
floating outside any card. Use `<SectionCard>`.

- **A section whose body is a table** passes `tight`. `cds-card__body--tight` removes the
  18px so the table meets the card edge; `cds-card--clip` keeps the last row's hover fill
  inside the card's corners. The table keeps its own `cds-table__wrap`, which stays the
  horizontal scroll container — that is what makes a wide table survive 320px.
  `.cds-card__body--tight > .cds-table__wrap` drops the wrap's own border, radius and fill so
  there is one boundary, not two.
- **A section's primary control** goes in `cds-card__actions` on the head row.
- **A role-gated section keeps its card.** The body holds the control for the role that owns
  it and a `HandoffCaption` for everyone else, so the heading is present either way and the
  gap explains itself. A section with nothing to say to any role (a terminal state: a
  cancelled 相対取引, a completed delivery, a superseded rule version) is not rendered at all
  — an empty card is worse than no card.
- **Read-only fields** use `FieldGrid` / `Field` from `src/components/layout/field-grid.tsx`.
  Two columns at 320px, three from `--bp-tablet`. `variant`: `text` | `mono` (codes, dates,
  figures in a column) | `figure` (the headline number, `--fs-display` via `.cds-figure`) |
  `node` (the value paints itself, e.g. a `StatusBadge`).
- **Measure**: the content section is `max-w-3xl ms-0 me-auto`. The `ms-0` matters —
  `.cds-shell__page > *` sets `margin-inline: auto`, and a narrow child left at `auto`
  centres itself under a left-aligned page title.

### The boundary, measured

`.cds-card` as vendored is a white face on `--surface-page` with one `--border-subtle`
hairline. That is not a boundary:

| Pair | Ratio |
|---|---|
| `--surface-card` `#FFFFFF` fill on `--surface-page` `#F5F6F8` | 1.08:1 |
| `--border-subtle` `#E3E6EB` on card | 1.25:1 |
| `--border-subtle` `#E3E6EB` on page ground | 1.16:1 |

**No token in the set reaches the 3:1 of SC 1.4.11 against white before `--text-subtle`
`#7C8697` (3.68:1)**, which the system reserves for type; `--border-strong` `#A8B0BC` only
gets to 2.19:1. A 1px `#7C8697` outline on every card reads as a wireframe, not a product.

So `src/styles/cds-app-surface.css` carries the boundary on four cues instead of one line:

| Cue | Value | Ratio |
|---|---|---|
| Outline | `--border-default` `#D2D7DE` | 1.45:1 on card · 1.34:1 on page |
| Elevation | `--shadow-sm` (was `--shadow-xs`) | — |
| Head band | `--surface-sunken` `#EEF0F3` | 1.14:1 on card body |
| Head rule | `--border-default`, same weight as the outline | 1.27:1 on the band |

SC 1.4.11 does not in fact bind here — a card that groups already-legible text identifies no
component, indicates no state, and carries no information the text does not. The text on
these surfaces is what has to pass, and does: `--text-strong` on the head band is 15.15:1,
`--text-muted` labels on card body 5.81:1, table headers 5.38:1.

**If a stronger boundary is ever wanted, raise `--border-default` → `--border-strong` in
`cds-app-surface.css` (2.19:1) — one line, one file.** Do not edit `cds-components.css`; it
is vendored verbatim and overriding it in the app layer is the established pattern
(`cds-app-layout.css` does the same).

### Progress bar

`StageProgressBar` gets a card of its own, titled `pipeline.title`, first on the page. The
same treatment on all three screens that have one (lot, 相対取引, delivery).

Separately: `.cds-progress__fill` ships in the extract with a height, a radius and a
transition but **no background** — the source system passed the colour in from JSX — and it
is rendered on a `<span>`, so `display` was `inline` and a non-replaced inline box ignores
`width`/`height` outright. The bar drew an empty track at any completion, and
`getComputedStyle` reported the right width the whole time while `getBoundingClientRect()`
returned 0×0. It now takes `display: block` and `--color-primary` in `cds-app-controls.css`.
Brand blue rather than a status tone, so a filled bar can never be read as a state;
`status-tone.ts` stays the only state→tone map.

### The section inventory

| Screen | Sections, top to bottom |
|---|---|
| `/transactions/[id]` | pipeline · details · actions (or handoff) · audit history `tight` |
| `/lots/[id]` | pipeline · availability · edit (or handoff) · adjustment history `tight` |
| `/deliveries/[id]` | pipeline · delivery progress · new shipment (or handoff) · shipments `tight` |
| `/participants/[id]` | profile · edit (or handoff) · 許可 transitions (or handoff) · status history `tight` |
| `/seri/[id]` | details · edit せり (or handoff) · edit history `tight` |
| `/incentive/rules/[id]` | details · actions (only when there are any) |

The せり details card is new. The screen previously rendered the record **only** into the
edit form, so any role without edit rights saw a handoff caption and an empty history table
with no record above them.

Every one of the six also carries a `PageFrame` back link to its list. Four never had one and
two (`lots`, `deliveries`) passed `backLabel={dict["nav.*"]}` without loading the `nav`
namespace, so the label was `undefined` and `PageFrame` — which needs both props — rendered
nothing. **A `PageFrame` back link needs `"nav"` in the page's `getDictionary` namespaces.**

---

## 10. The dashboard process drawing: two geometry rules

**Current. This section describes the code as it ships.**

The drawing is hand-authored inline SVG (`flow-glyphs.tsx`, shared `<defs>` in
`flow-defs.tsx`) because the DS's `cds-stepper` is a numeric +/- input, not a step indicator.
Two invariants govern it, and both were violated in ways that only showed on screen.

### An arrowhead must be wider than the channel it ends

The shared `<marker>` is 12×12 with a triangle 10 units tall. The spine channels are 12, 16
and 18 units tall in the same cacao — so every ribbon arrowhead was being drawn **inside the
bar it terminated** and none of them were ever visible. Reported by the user as "the arrow is
covered by the horizontal bar": it was, by its own ribbon.

So `FlowConnector` draws its own head instead of using the marker:

| | |
|---|---|
| `headHalf` | `to + 5` — projects 5 units past each channel edge |
| `headLen` | `14` |
| `apex` | `box - 4` — 4 units of air, so it points *at* the next card |
| `neck` | `apex - headLen` — where the ribbon stops and the head starts |
| fill | `--cacao-700`, the gradient's downstream end |

The marker stays right for the **thin** channels — the せり merge (2 units) and the barrier's
outgoing trickle (3 units) — where 12×12 is several times the stroke.

### A connector's terminus is positioned against its target, never against its neighbour

`FlowMerge` was positioned inside `.cds-flow__inletwrap` with `right: -30px; bottom: 24px`.
That card is bottom-aligned in a row whose height comes from the **two-node spine**, so the
arrowhead landed wherever unrelated content put it. Measured: 22px short of the spine node's
left edge and 3.5px *below* its bottom edge — pointing into the gap between the two spine
nodes.

It is now a child of `.cds-flow__row` (the only stable frame) at `left: 54px; top: 46px`, in a
`96×120` box:

- `54 = 116` (inlet column) `+ 34` (row gap) `- 96` (box width) → the box's right edge **is**
  the spine's left edge, so the path's end at `x=92` lands 4 units short and the marker's tip
  3. Same derivation as `.cds-flow__connwrap--long`'s `198 = 48 + 116 + 34`.
- `46 = 62 - 16` (the path's end y) → the terminus sits 62px below the row's top, which is
  34px below where the main channel arrives (`connwrap` top 14 + mid 36, less the 22px of
  lane label + gap above the row). **Both channels land on one node edge, heavy one first.**
- The path arrives horizontally (last control point shares the end's y) so the head points
  straight in, matching the main ribbon's direction.

Any of `116` / `34` / `96` / the connwrap offsets changing means both constants change.

### What did not change

The 9:1 geometry (`MAIN_INLET_WIDTH` 18 : `SERI_INLET_WIDTH` 2), the one-CSS-pixel-per-viewBox-unit
rule (`96×120` box for a `96 120` viewBox), every stroke at `--cacao-600` or darker, the gate's
notched `clip-path` silhouette, and no animation.
