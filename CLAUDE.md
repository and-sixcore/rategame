# RateGame Handbook — working notes

This repo is the **RateGame design handbook** (Next.js 16, React 19, Tailwind v4, SN Pro, MDX) plus a
**`/playground`** that doubles as a **prototype zone**: build a flow or component here against mock data,
preview it on the web + mobile shells, then transfer the component into the real `rategame-web` app and
wire the backend there.

Use **pnpm**, never npm (npm crashes on the pnpm store).

## ⛔ Design-system rule (non-negotiable)

**Every section / component built in the playground MUST use the handbook's core design system and not
deviate at all.** That means:

- Colors / spacing / type / radii come from the tokens in **`app/globals.css`** (`@theme`) — surfaces,
  `fg/-muted/-subtle`, `rg-green/yellow/red`, the SN Pro type scale, the radius scale. No off-system
  hex values, no one-off spacing or fonts.
- Reuse the primitives in **`components/ui/`** (`ScorePill`, `RateButton`, `Chip`) — don't reinvent them.
- The full spec is **`content/design.md`**, rendered at **`/system/foundations`**. When in doubt, read it.
- The **green/yellow/red semaphore appears ONLY on rating values** — never as decoration. Text is never
  green/yellow/red.

## Playground structure

- **Flows** (full screens / sequences) → register in **`lib/playground/flows.tsx`**. They render inside
  the shells via the flow selector.
- **Sections** = the component library (atomic → advanced). It lives under the **design system**, not the
  playground: registry **`lib/sections.ts`**, UI components `components/sections/`, page at
  **`/system/sections`** (the Sections card on `/system`). Components a flow produces get saved here to edit.
- Shells: `components/playground/` — `MobileShell` (device frames, empty shell pending a Figma rebuild)
  and `WebShell` (nav shell). Device frame PNGs in `public/playground/`.

## Transfer / compatibility (so components port cleanly to rategame-web)

`rategame-web` runs **Next 14.2.4 / React 18 / Tailwind v3**. The handbook stays on 16/19/v4 (not
downgraded — only component *code* transfers, not the app). Keep playground components:

- **Presentational** — data in via props (mock here, backend in the web app).
- **React-18-safe** — no `use()`, `useActionState`, `useOptimistic`, `useFormStatus`; use `forwardRef`
  (not ref-as-a-prop) and `<Context.Provider>`. An ESLint guard in `eslint.config.mjs` enforces the hooks.

## Verify before claiming done

`./node_modules/.bin/tsc --noEmit` and `./node_modules/.bin/eslint <changed paths>` must pass.
