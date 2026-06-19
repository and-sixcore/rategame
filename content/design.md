# RateGame Design System

RateGame is "Letterboxd for sports": fans rate games across leagues. This file is the source of truth for building web sections and components. Use these tokens and rules verbatim. Do not invent hex values or use arbitrary Tailwind values (`text-[#abc]`, `p-[13px]`) when a token exists.

This document reflects what is actually built in the repo. It is rendered as an article at `/system/foundations/spec` and the same tokens power `/system/foundations`.

## Stack

- React + Next.js (App Router) and Tailwind v4 (CSS-first `@theme`), TypeScript, dark mode only.
- Core font: SN Pro (self-hosted variable font via `next/font`, exposed as `--font-sans`).
- Icons: Ionicons via `react-icons/io5`.
- Class helper: `cn()` (clsx + tailwind-merge) in `lib/utils.ts`.
- Components are plain typed React styled with Tailwind. Match the repo's conventions; do not pull in a component framework.
- All tokens live in `app/globals.css` inside one `@theme` block. That block is the single source of truth.

## The one idea that runs the whole system

Monochrome canvas, one accent per context, accent = rating state.

The UI is near-black and greyscale. Color is never decoration. The three semaphore colors carry meaning only:

| Color | Token | Meaning | Rating range |
|---|---|---|---|
| Green `#1AFF97` | `rg-green` | good / positive / "rated well" | 7.0 to 10 |
| Yellow `#FFE81A` | `rg-yellow` | mixed / average | 4.0 to 6.9 |
| Red `#FF6B4D` | `rg-red` | poor / negative | 0 to 3.9 |

**Text is never green, yellow or red.** A semaphore color appears only as the ScorePill's score number (and, if ever needed, a card's rating glow). Copy, headings, labels, links and icons are always `fg` / `fg-muted` / `fg-subtle`.

Brand green is a separate role: active nav, brand marks and primary affordances (for example the "Rated" check). It uses the brand `green` token, never the `rg-*` rating tokens, and never appears on rating values.

One dominant accent per surface or card. Never mix two semaphore colors in the same component.

## Color tokens

```css
@theme {
  /* Canvas + surfaces (near-black, stepped) */
  --color-bg: #0a0a0a;          /* page / app background, near-black */
  --color-surface-1: #1a1a1a;   /* default card */
  --color-surface-2: #262626;   /* raised / inner panel / chip / code / ScorePill disc */
  --color-surface-3: #333333;   /* hover / pressed / selected chip */
  --color-border: #262626;      /* hairline borders */

  /* Text (the only colors copy ever uses) */
  --color-fg: #f2f2f2;          /* primary text */
  --color-fg-muted: #d9d9d9;    /* secondary text */
  --color-fg-subtle: #808080;   /* meta / timestamps / captions */

  /* Semaphore (rating value only, never text) */
  --color-rg-green: #1aff97;
  --color-rg-yellow: #ffe81a;
  --color-rg-red: #ff6b4d;
  --color-rg-green-dim: rgba(26,255,151,0.12);
  --color-rg-yellow-dim: rgba(255,232,26,0.12);
  --color-rg-red-dim: rgba(255,107,77,0.12);

  /* Brand green (affordances and nav only) */
  --color-green: #1aff97;
  --color-green-soft: #112a1f;  /* dark green-tinted surface, e.g. active nav */
}
```

## Typography: SN Pro

`font-family: var(--font-sans)`, which resolves to SN Pro. Use tabular figures (`tabular-nums`) for any score or stat. Weight is applied per role, not baked into the size token.

| Role | Size / LH / Weight | Use |
|---|---|---|
| Display | 64 / 76 / 400 | landing hero |
| H1 | 44 / 56 / 500 | page title |
| H2 | 32 / 40 / 600 | section title |
| H3 | 24 / 30 / 600 | card title ("Mavericks vs Bulls") |
| Body L | 20 / 24 / 400 | lead text |
| Body | 16 / 24 / 400 | takes / paragraph copy |
| Body S | 14 / 18 / 400 | secondary rows |
| Label | 14 / 18 / 500 | buttons, nav, chips |
| Caption | 12 / 16 / 400 | meta (league, round, date), counts |
| Footnote | 10 / 12 / 400 | fine print |

```css
@theme {
  --text-display: 64px; --text-display--line-height: 76px;
  --text-h1: 44px;  --text-h1--line-height: 56px;
  --text-h2: 32px;  --text-h2--line-height: 40px;
  --text-h3: 24px;  --text-h3--line-height: 30px;
  --text-body-lg: 20px; --text-body-lg--line-height: 24px;
  --text-body: 16px;    --text-body--line-height: 24px;
  --text-body-sm: 14px; --text-body-sm--line-height: 18px;
  --text-label: 14px;   --text-label--line-height: 18px;
  --text-caption: 12px; --text-caption--line-height: 16px;
  --text-footnote: 10px; --text-footnote--line-height: 12px;
}
```

## Spacing (8px grid)

Do NOT redefine the `--spacing-*` scale. RateGame's 8px grid maps cleanly onto Tailwind's default numeric scale, so use the existing utilities:

```
4px = 1   8px = 2   12px = 3   16px = 4   24px = 6
32px = 8  40px = 10 48px = 12  64px = 16  96px = 24
```

4px is the only sub-step.

## Radius

```css
@theme {
  --radius-sm: 8px;    /* chips, small controls   -> rounded-sm  */
  --radius-md: 12px;   /* buttons, inputs          -> rounded-md  */
  --radius-2xl: 16px;  /* cards                    -> rounded-2xl */
  --radius-3xl: 20px;  /* large media cards        -> rounded-3xl */
  /* pills, avatars, score badges                  -> rounded-full */
}
```

Note: cards (16px) and media (20px) are exposed via `rounded-2xl` / `rounded-3xl` on purpose, so the existing handbook's `rounded-lg` / `rounded-xl` usages keep their original values.

## Elevation

Dark mode uses a faint light glow, not a heavy shadow.

```css
@theme {
  --shadow-1: 0 4px 16px rgba(255,255,255,0.04);  /* resting card */
  --shadow-2: 0 8px 16px rgba(255,255,255,0.10);  /* hover */
}
```

A rating card's "glow" is a soft shadow only, with no border ring:

```css
box-shadow: 0 0 30px -4px var(--color-rg-green);
```

## Cursor

Tailwind v4 ships buttons with the default cursor. An unlayered base rule restores `cursor: pointer` for every interactive control (`button:not(:disabled)`, `[role="button"]`, `a[href]`). It must be unlayered, since an `@layer base` rule loses to preflight.

## Signature component: the ScorePill

The circular rating badge is RateGame's identity.

- Circular, with a neutral `surface-2` disc and no ring or border.
- The number is in the matching semaphore color, weight 700, tabular figures.
- Color is chosen by rating value (thresholds below). Never a fixed color.

```
<ScorePill
  value={8.2}              // drives color via thresholds
  size="xs|sm|md|lg|hero"  // 24 / 32 / 48 / 64 / 96 px
/>
```

Number sizes per pill size: xs 9, sm 12, md 16, lg 22, hero 34.

Thresholds: `value >= 7` green, `4 <= value < 7` yellow, `value < 4` red.

## Primitives

Kept in `components/ui/`, built to the rules above:

**ScorePill** as above. The primitive everything else reuses.

**RateButton** is the one non-flat element. Brushed silver with a clean vertical (top to bottom) linear gradient, dark label, `rounded-md`. Reads "Rate Game" (full) or "Rate" (compact). States beyond default: `rated` (dark surface, green check + green "Rated") and `disabled` (desaturated, not-allowed cursor).

**Chip** is a filter pill. `surface-2` fill by default, lighter `surface-3` when selected, `Label` text, `rounded-full`. Used for league filters and date scrollers.

## Composites (build later)

Composite components (game card, take/post card, stat card, top nav, side rail, match strip) are intentionally not in the repo yet. They are built one session at a time on top of these tokens and primitives, and will live under the "Sections" area. Keep the ScorePill leading and reuse the primitives.

For reference, the recurring patterns these composites follow:

- Meta lines use bullet separators and `fg-subtle`, e.g. `NBA - Play-offs - 2024`.
- Media headers use a dark gradient scrim from the bottom over the photo.
- Cards use `rounded-2xl`; media uses `rounded-3xl`; inner panels use `rounded-md`.
- A card that represents a single rating may use the rating glow (soft shadow, no border).

## Where it lives

- `/system`: a landing with two cards (Foundations and Sections), using the shared site top nav.
- `/system/foundations`: the living token and principles reference that instructs agents building components.
- `/system/foundations/spec`: this document, as an article, with copy and download.
- Sections: empty for now, the future home for components.

## Hard rules

- Reference tokens via utility classes. Never raw hex or arbitrary Tailwind values.
- 8px grid only (4px is the single sub-step).
- One semaphore color per component. Green, yellow and red mean rating state, nothing else.
- Text is never green, yellow or red. A semaphore color appears only as the ScorePill's score.
- Score numbers: weight 700, tabular figures, color from thresholds.
- Page background is `#0a0a0a`. Cards step up: surface-1, then surface-2, then surface-3.
- The Rate button is the only non-flat element. Everything else is flat.
- Brand green is for active nav, brand marks and primary affordances, never for ratings.
- Build components as plain typed React with Tailwind and `cn()`. Match the repo's conventions.
