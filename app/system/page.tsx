import type { Metadata } from "next";
import Link from "next/link";
import { TopBar } from "@/components/TopBar";

export const metadata: Metadata = {
  title: "Design System",
  description:
    "The RateGame design system — foundations today, components as we build them.",
};

function Arrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 12 12" fill="none" aria-hidden>
      <path
        d="M2.5 6h7M6.5 3l3 3-3 3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function SystemPage() {
  return (
    <>
      <TopBar />

      <main className="mx-auto w-full max-w-[1320px] flex-1 px-6">
        {/* Hero */}
        <section className="page-rise py-16 sm:py-24">
          <p className="text-sm font-medium uppercase tracking-wider text-muted-soft">
            RateGame
          </p>
          <h1 className="mt-3 max-w-3xl text-[clamp(2.4rem,6vw,3.8rem)] font-semibold leading-[1.04] tracking-[-0.03em]">
            Design System
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
            A monochrome canvas where the only color is the rating. The
            foundations live here today; components arrive as we build them.
          </p>
        </section>

        {/* Cards */}
        <section className="grid grid-cols-1 gap-4 border-t border-border py-12 sm:grid-cols-2">
          {/* Foundations */}
          <Link
            href="/system/foundations"
            className="group flex flex-col rounded-card border border-border bg-surface p-6 transition-colors hover:border-border-strong"
          >
            <span className="flex items-center justify-between">
              <span className="text-base font-semibold tracking-tight">
                Foundations
              </span>
              <span className="text-muted-soft transition-colors group-hover:text-fg">
                <Arrow />
              </span>
            </span>
            <span className="mt-2 text-sm leading-relaxed text-muted">
              Tokens, color, type, spacing, radius and the brand principles — the
              source of truth for building on-brand components.
            </span>
            <span className="mt-6 flex items-center gap-2" aria-hidden>
              <span className="size-5 rounded-full bg-rg-green" />
              <span className="size-5 rounded-full bg-rg-yellow" />
              <span className="size-5 rounded-full bg-rg-red" />
              <span className="mx-1 h-5 w-px bg-border" />
              <span className="size-5 rounded-md bg-surface-1 ring-1 ring-border" />
              <span className="size-5 rounded-md bg-surface-2 ring-1 ring-border" />
              <span className="size-5 rounded-md bg-surface-3 ring-1 ring-border" />
            </span>
          </Link>

          {/* Sections — placeholder */}
          <div className="flex flex-col rounded-card border border-dashed border-border bg-surface/40 p-6">
            <span className="flex items-center justify-between">
              <span className="text-base font-semibold tracking-tight text-muted">
                Sections
              </span>
              <span className="rounded-pill border border-border-strong px-2 py-0.5 text-[11px] font-medium text-muted-soft">
                Coming soon
              </span>
            </span>
            <span className="mt-2 text-sm leading-relaxed text-muted-soft">
              Components, grouped into sections. Empty for now — this is where
              they&apos;ll live as you build them, session by session.
            </span>
          </div>
        </section>
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto max-w-[1320px] px-6 py-8 text-sm text-muted">
          RateGame Design System
        </div>
      </footer>
    </>
  );
}
