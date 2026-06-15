import Link from "next/link";
import { TopBar } from "@/components/TopBar";

const entryPoints = [
  {
    href: "/handbook/philosophy",
    title: "Philosophy",
    body: "Move fast and iterate. 80% for review, 95% for devs, 100% in the codebase.",
  },
  {
    href: "/handbook/files",
    title: "The files",
    body: "Every Figma file in the system and what each one is for.",
  },
  {
    href: "/handbook/workflow",
    title: "The workflow",
    body: "How a feature travels from Workboard to Review to a clean dev handoff.",
  },
  {
    href: "/handbook/recipes/achievements",
    title: "Recipes",
    body: "The fiddly bits: achievements and flags, step by step.",
  },
];

export default function Home() {
  return (
    <>
      <TopBar />
      <main className="mx-auto w-full max-w-[1320px] flex-1 px-6">
        {/* Hero */}
        <section className="page-rise py-20 sm:py-28">
          <h1 className="max-w-3xl text-[clamp(2.6rem,7vw,4.5rem)] font-semibold leading-[1.02] tracking-[-0.03em]">
            The design handbook for RateGame
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
            How we design the community for rating the best games in sports. The
            process, the files, the philosophy, and the recipes behind the product.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link
              href="/handbook"
              className="inline-flex items-center gap-2 rounded-pill bg-white px-6 py-3 text-sm font-semibold text-[#0a0b0d] transition-colors hover:bg-[#e2e2e5]"
            >
              Open the handbook
              <svg width="13" height="13" viewBox="0 0 12 12" fill="none" aria-hidden>
                <path
                  d="M2.5 6h7M6.5 3l3 3-3 3"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
            <a
              href="https://rategame.io/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-pill border border-border-strong px-6 py-3 text-sm font-medium text-fg transition-colors hover:border-muted"
            >
              Visit rategame.io
            </a>
          </div>
        </section>

        {/* Entry points */}
        <section className="grid grid-cols-1 gap-4 border-t border-border py-14 sm:grid-cols-2 lg:grid-cols-4">
          {entryPoints.map((e) => (
            <Link
              key={e.href}
              href={e.href}
              className="group flex flex-col rounded-card border border-border bg-surface p-5 transition-colors hover:border-border-strong"
            >
              <span className="flex items-center justify-between">
                <span className="text-base font-semibold tracking-tight">
                  {e.title}
                </span>
                <span className="text-muted-soft transition-colors group-hover:text-fg">
                  <svg width="14" height="14" viewBox="0 0 12 12" fill="none" aria-hidden>
                    <path
                      d="M2.5 6h7M6.5 3l3 3-3 3"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </span>
              <span className="mt-2 text-sm leading-relaxed text-muted">
                {e.body}
              </span>
            </Link>
          ))}
        </section>
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto max-w-[1320px] px-6 py-8 text-sm text-muted">
          RateGame Design Handbook
        </div>
      </footer>
    </>
  );
}
