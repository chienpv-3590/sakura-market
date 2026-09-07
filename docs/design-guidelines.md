# Sakura Market — Design Guidelines

Internal operations tool for a Japanese fisheries wholesale market. Used on a market floor
at 02:00. **Legibility beats decoration.** No animation, no gradients, no decorative icons.
Adequate contrast, generous hit targets, unambiguous state.

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
