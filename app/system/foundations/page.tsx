import type { Metadata } from "next";
import Link from "next/link";
import { TopBar } from "@/components/TopBar";
import { cn } from "@/lib/utils";
import { ScorePill } from "@/components/ui/ScorePill";
import { RateButton } from "@/components/ui/RateButton";
import { Chip } from "@/components/ui/Chip";

export const metadata: Metadata = {
  title: "Foundations",
  description:
    "RateGame design tokens and foundations — the source of truth for building on-brand components.",
};

/* ------------------------------------------------------------------ helpers */

function Section({
  id,
  title,
  intro,
  children,
}: {
  id: string;
  title: string;
  intro?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-28">
      <h2 className="text-h2 font-semibold text-fg">{title}</h2>
      {intro && <p className="mt-2 max-w-2xl text-body text-fg-muted">{intro}</p>}
      <div className="mt-6">{children}</div>
    </section>
  );
}

function Sub({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-10 first:mt-0">
      <h3 className="text-caption font-semibold uppercase tracking-wider text-fg-subtle">
        {title}
      </h3>
      <div className="mt-4">{children}</div>
    </div>
  );
}

function Code({ children }: { children: React.ReactNode }) {
  return (
    <code className="rounded bg-surface-2 px-1.5 py-0.5 font-mono text-footnote text-fg-muted">
      {children}
    </code>
  );
}

function Swatch({
  name,
  hex,
  block,
  use,
}: {
  name: string;
  hex?: string;
  block: string;
  use: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className={cn("h-16 w-full rounded-md border border-border", block)} />
      <div className="space-y-1">
        <div className="text-body-sm font-medium text-fg">{name}</div>
        {hex && (
          <div className="text-footnote tabular-nums text-fg-subtle">{hex}</div>
        )}
        <Code>{use}</Code>
      </div>
    </div>
  );
}

/* --------------------------------------------------------------------- data */

const SURFACES = [
  { name: "bg", hex: "#0A0A0A", block: "bg-bg", use: "bg-bg" },
  { name: "surface-1", hex: "#1A1A1A", block: "bg-surface-1", use: "bg-surface-1" },
  { name: "surface-2", hex: "#262626", block: "bg-surface-2", use: "bg-surface-2" },
  { name: "surface-3", hex: "#333333", block: "bg-surface-3", use: "bg-surface-3" },
  { name: "border", hex: "#262626", block: "bg-border", use: "border-border" },
];

const TEXT = [
  { name: "fg", hex: "#F2F2F2", block: "bg-fg", use: "text-fg" },
  { name: "fg-muted", hex: "#D9D9D9", block: "bg-fg-muted", use: "text-fg-muted" },
  { name: "fg-subtle", hex: "#808080", block: "bg-fg-subtle", use: "text-fg-subtle" },
];

// Semaphore values are consumed by the ScorePill — never used as a text color.
const SEMAPHORE = [
  { name: "rg-green", hex: "#1AFF97 · ≥7.0", block: "bg-rg-green", use: "--color-rg-green" },
  { name: "rg-yellow", hex: "#FFE81A · 4–6.9", block: "bg-rg-yellow", use: "--color-rg-yellow" },
  { name: "rg-red", hex: "#FF6B4D · <4.0", block: "bg-rg-red", use: "--color-rg-red" },
];

const BRAND = [
  { name: "green", hex: "#1AFF97", block: "bg-green", use: "text-green" },
  { name: "green-soft", hex: "#112A1F", block: "bg-green-soft", use: "bg-green-soft" },
];

const TYPE = [
  { name: "Display", note: "64 / 76 / 400", cls: "text-display", w: "font-normal", use: "text-display" },
  { name: "H1", note: "44 / 56 / 500", cls: "text-h1", w: "font-medium", use: "text-h1 font-medium" },
  { name: "H2", note: "32 / 40 / 600", cls: "text-h2", w: "font-semibold", use: "text-h2 font-semibold" },
  { name: "H3", note: "24 / 30 / 600", cls: "text-h3", w: "font-semibold", use: "text-h3 font-semibold" },
  { name: "Body L", note: "20 / 24 / 400", cls: "text-body-lg", w: "font-normal", use: "text-body-lg" },
  { name: "Body", note: "16 / 24 / 400", cls: "text-body", w: "font-normal", use: "text-body" },
  { name: "Body S", note: "14 / 18 / 400", cls: "text-body-sm", w: "font-normal", use: "text-body-sm" },
  { name: "Label", note: "14 / 18 / 500", cls: "text-label", w: "font-medium", use: "text-label font-medium" },
  { name: "Caption", note: "12 / 16 / 400", cls: "text-caption", w: "font-normal", use: "text-caption" },
  { name: "Footnote", note: "10 / 12 / 400", cls: "text-footnote", w: "font-normal", use: "text-footnote" },
];

const SPACING = [
  { px: 4, w: "w-1", use: "1" },
  { px: 8, w: "w-2", use: "2" },
  { px: 12, w: "w-3", use: "3" },
  { px: 16, w: "w-4", use: "4" },
  { px: 24, w: "w-6", use: "6" },
  { px: 32, w: "w-8", use: "8" },
  { px: 40, w: "w-10", use: "10" },
  { px: 48, w: "w-12", use: "12" },
  { px: 64, w: "w-16", use: "16" },
  { px: 96, w: "w-24", use: "24" },
];

const RADII = [
  { name: "8px · chips", cls: "rounded-sm", use: "rounded-sm" },
  { name: "12px · controls", cls: "rounded-md", use: "rounded-md" },
  { name: "16px · cards", cls: "rounded-2xl", use: "rounded-2xl" },
  { name: "20px · media", cls: "rounded-3xl", use: "rounded-3xl" },
  { name: "pills / avatars", cls: "rounded-full", use: "rounded-full" },
];

const PRINCIPLES = [
  "Monochrome canvas. Color is never decoration — green / yellow / red carry rating meaning only.",
  "Text is never green / yellow / red. Copy, headings, labels and links are always fg / fg-muted / fg-subtle. A semaphore color appears only as the ScorePill's score, ring and glow.",
  "One semaphore color per component. Never mix two rating colors in the same surface.",
  "Score numbers: weight 700, tabular figures, color from thresholds (≥7 green · 4–6.9 yellow · <4 red).",
  "Brand green is for active nav, brand marks and primary affordances — not for ratings.",
  "Page background is #0a0a0a. Cards step up: surface-1 → surface-2 → surface-3.",
  "8px grid (4px is the only sub-step). Cards rounded-2xl, controls rounded-md, pills rounded-full.",
  "Reference tokens via utility classes — never raw hex or arbitrary values like text-[#abc] or p-[13px].",
  "Meta lines use • separators in text-fg-subtle. The Rate button is the only non-flat element.",
];

const SECTION_NAV = [
  { href: "#color", label: "Color" },
  { href: "#type", label: "Type" },
  { href: "#layout", label: "Layout" },
  { href: "#primitives", label: "Primitives" },
  { href: "#principles", label: "Principles" },
];

/* --------------------------------------------------------------------- page */

export default function FoundationsPage() {
  return (
    <>
      <TopBar />

      {/* Section sub-nav, stacked under the site TopBar (h-14) */}
      <div className="sticky top-14 z-30 border-b border-border bg-bg/80 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-6 py-2.5">
          <Link
            href="/system"
            className="text-label text-muted transition-colors hover:text-fg"
          >
            ← Design System
          </Link>
          <nav className="hidden items-center gap-5 text-label text-muted md:flex">
            {SECTION_NAV.map((s) => (
              <a key={s.href} href={s.href} className="hover:text-fg">
                {s.label}
              </a>
            ))}
          </nav>
        </div>
      </div>

      <main className="page-rise mx-auto w-full max-w-5xl flex-1 space-y-16 px-6 py-12">
        {/* Intro */}
        <header>
          <p className="text-label font-medium uppercase tracking-wider text-fg-subtle">
            Design System
          </p>
          <h1 className="mt-2 text-h1 font-medium">Foundations</h1>
          <p className="mt-3 max-w-2xl text-body-lg text-fg-muted">
            The token layer and brand rules behind RateGame — a monochrome canvas
            where the only color is the rating. This is the source of truth for
            building on-brand components.
          </p>
        </header>

        {/* Spec card — the full design.md as an article */}
        <Link
          href="/system/foundations/spec"
          className="group flex items-center justify-between gap-4 rounded-2xl border border-border bg-surface-1 p-5 transition-colors hover:border-border-strong"
        >
          <div className="min-w-0">
            <div className="text-body-lg font-semibold text-fg">
              Design spec — design.md
            </div>
            <p className="mt-1 text-body-sm text-fg-muted">
              The full written source of truth, laid out as an article — copy or
              download the raw markdown.
            </p>
          </div>
          <span
            className="shrink-0 text-fg-subtle transition-colors group-hover:text-fg"
            aria-hidden
          >
            <svg width="18" height="18" viewBox="0 0 12 12" fill="none">
              <path
                d="M2.5 6h7M6.5 3l3 3-3 3"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </Link>

        {/* COLOR */}
        <Section
          id="color"
          title="Color"
          intro="Reference the utility class shown under each swatch — never raw hex."
        >
          <Sub title="Canvas & surfaces">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
              {SURFACES.map((s) => (
                <Swatch key={s.name} {...s} />
              ))}
            </div>
          </Sub>

          <Sub title="Text — the only colors copy ever uses">
            <div className="grid grid-cols-3 gap-4 sm:max-w-lg">
              {TEXT.map((s) => (
                <Swatch key={s.name} {...s} />
              ))}
            </div>
          </Sub>

          <Sub title="Semaphore — rating only, never text">
            <p className="-mt-1 mb-4 max-w-2xl text-body-sm text-fg-muted">
              The only color in the product, and it means one thing: the rating.
              These appear <strong className="font-semibold text-fg">only</strong>{" "}
              inside the ScorePill (its score number, ring and glow). Text — copy,
              headings, labels, links — is never green, yellow or red.
            </p>
            <div className="grid grid-cols-3 gap-4 sm:max-w-lg">
              {SEMAPHORE.map((s) => (
                <Swatch key={s.name} {...s} />
              ))}
            </div>
          </Sub>

          <Sub title="Brand green — affordances & nav only">
            <div className="grid grid-cols-3 gap-4 sm:grid-cols-6">
              {BRAND.map((s) => (
                <Swatch key={s.name} {...s} />
              ))}
            </div>
          </Sub>
        </Section>

        {/* TYPE */}
        <Section
          id="type"
          title="Typography — SN Pro"
          intro="The core font is SN Pro. Sizes and weights below; apply weight per role."
        >
          <div className="divide-y divide-border rounded-2xl border border-border">
            {TYPE.map((t) => (
              <div key={t.name} className="flex items-center gap-6 px-5 py-4">
                <div className="w-28 shrink-0">
                  <div className="text-label font-medium text-fg">{t.name}</div>
                  <div className="text-footnote tabular-nums text-fg-subtle">
                    {t.note}
                  </div>
                </div>
                <div className={cn("min-w-0 flex-1 truncate", t.cls, t.w)}>
                  Rate the game
                </div>
                <div className="hidden shrink-0 sm:block">
                  <Code>{t.use}</Code>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* LAYOUT */}
        <Section
          id="layout"
          title="Spacing, radius & elevation"
          intro="8px grid mapped onto Tailwind's default scale. Radii and dark-mode elevation."
        >
          <Sub title="Spacing — 8px grid">
            <div className="space-y-2">
              {SPACING.map((s) => (
                <div key={s.px} className="flex items-center gap-4">
                  <span className="w-24 text-caption tabular-nums text-fg-subtle">
                    {s.px}px
                  </span>
                  <span className={cn("h-3 rounded-sm bg-fg-subtle", s.w)} />
                  <Code>p-{s.use}</Code>
                </div>
              ))}
            </div>
          </Sub>

          <Sub title="Radius">
            <div className="flex flex-wrap items-end gap-6">
              {RADII.map((r) => (
                <div key={r.name} className="flex flex-col items-center gap-2">
                  <div
                    className={cn(
                      "size-16 border border-border-strong bg-surface-2",
                      r.cls
                    )}
                  />
                  <span className="text-caption text-fg-subtle">{r.name}</span>
                  <Code>{r.use}</Code>
                </div>
              ))}
            </div>
          </Sub>

          <Sub title="Elevation">
            <div className="flex flex-wrap gap-6">
              <div className="flex flex-col items-center gap-2">
                <div className="size-20 rounded-2xl bg-surface-1 shadow-1" />
                <Code>shadow-1</Code>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="size-20 rounded-2xl bg-surface-1 shadow-2" />
                <Code>shadow-2</Code>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div
                  className="size-20 rounded-2xl bg-surface-1"
                  style={{
                    boxShadow: "0 0 30px -4px var(--color-rg-green)",
                  }}
                />
                <span className="text-caption text-fg-subtle">rating glow</span>
              </div>
            </div>
          </Sub>
        </Section>

        {/* PRIMITIVES */}
        <Section
          id="primitives"
          title="Primitives"
          intro="A few atoms built to the rules above, as a reference. Sections come later."
        >
          <Sub title="ScorePill — sizes & thresholds">
            <div className="flex flex-wrap items-center gap-6">
              <ScorePill value={8.2} size="xs" />
              <ScorePill value={8.2} size="sm" />
              <ScorePill value={8.2} size="md" />
              <ScorePill value={8.2} size="lg" />
              <ScorePill value={8.2} size="hero" />
              <span className="mx-2 h-12 w-px bg-border" />
              <ScorePill value={9.1} size="lg" />
              <ScorePill value={5.5} size="lg" />
              <ScorePill value={2.7} size="lg" />
            </div>
          </Sub>

          <Sub title="RateButton">
            <div className="flex flex-wrap items-center gap-4">
              <RateButton />
              <RateButton compact />
              <RateButton variant="rated" />
              <RateButton variant="disabled" />
            </div>
          </Sub>

          <Sub title="Chip">
            <div className="flex flex-wrap items-center gap-2">
              <Chip selected>All</Chip>
              <Chip>NBA</Chip>
              <Chip>NFL</Chip>
              <Chip>MLS</Chip>
              <Chip>MLB</Chip>
            </div>
          </Sub>
        </Section>

        {/* PRINCIPLES — compact, collapsible, at the bottom */}
        <details
          id="principles"
          className="scroll-mt-28 rounded-2xl border border-border bg-surface-1 px-5 py-4"
        >
          <summary className="text-label font-semibold text-fg">
            Principles — the rules every component follows
          </summary>
          <ul className="mt-4 space-y-2">
            {PRINCIPLES.map((p, i) => (
              <li key={i} className="flex gap-2.5 text-body-sm text-fg-muted">
                <span className="mt-[7px] size-1 shrink-0 rounded-full bg-fg-subtle" />
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </details>
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto max-w-5xl px-6 py-8 text-sm text-muted">
          RateGame design system · monochrome canvas, accent = rating state.
        </div>
      </footer>
    </>
  );
}
