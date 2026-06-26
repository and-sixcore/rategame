"use client";

import { IoArrowForward, IoLockClosed } from "react-icons/io5";
import { sectionsByCategory, type Section, type SectionComplexity } from "@/lib/sections";

const complexityLabel: Record<SectionComplexity, string> = {
  atomic: "Atomic",
  composite: "Composite",
  advanced: "Advanced",
};

function Chip({ children, tone = "muted" }: { children: React.ReactNode; tone?: "muted" | "green" }) {
  return (
    <span
      className={[
        "rounded-pill px-2 py-0.5 text-[10.5px] font-semibold",
        tone === "green" ? "bg-surface-2 text-green" : "bg-surface-2 text-muted",
      ].join(" ")}
    >
      {children}
    </span>
  );
}

function Row({ section, onOpen }: { section: Section; onOpen: (id: string) => void }) {
  return (
    <button
      onClick={() => onOpen(section.id)}
      className="group flex w-full items-start gap-3 rounded-xl border border-transparent px-3 py-3 text-left transition-colors hover:border-border hover:bg-surface-1"
    >
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[15px] font-semibold text-fg">{section.name}</span>
          <Chip>{complexityLabel[section.complexity]}</Chip>
          <Chip tone={section.source === "both" ? "green" : "muted"}>
            {section.source === "both" ? "Web + Mobile" : section.source === "web" ? "Web" : "Mobile"}
          </Chip>
        </div>
        <p className="mt-1 text-[13px] leading-snug text-muted">{section.description}</p>
      </div>
      <span className="mt-1 shrink-0 text-[11px] font-medium text-muted-soft">Planned</span>
      <IoArrowForward className="mt-1 shrink-0 text-muted-soft transition-transform group-hover:translate-x-0.5" />
    </button>
  );
}

export function SectionsCatalog({ onOpen }: { onOpen: (id: string) => void }) {
  const groups = sectionsByCategory();
  const total = groups.reduce((n, g) => n + g.items.length, 0);

  return (
    <section className="max-w-[860px]">
      <div className="flex items-baseline justify-between gap-4">
        <h2 className="text-2xl font-semibold tracking-tight text-fg">Sections</h2>
        <span className="text-sm text-muted">{total} components</span>
      </div>
      <p className="mt-1.5 text-sm leading-relaxed text-muted">
        The component library — derived from the real web + mobile apps. Build them one at a time; open
        any for its details. Components a flow produces get saved back here to edit.
      </p>

      {/* Design-system rule */}
      <div className="mt-4 flex items-start gap-3 rounded-xl border border-border bg-surface-1 p-4">
        <IoLockClosed className="mt-0.5 shrink-0 text-green" />
        <p className="text-[13px] leading-relaxed text-muted">
          <span className="font-semibold text-fg">Rule —</span> every section must use the handbook&apos;s
          core design system (the <code className="text-fg-muted">app/globals.css</code> tokens +{" "}
          <code className="text-fg-muted">components/ui</code> primitives — ScorePill, RateButton, Chip)
          and the{" "}
          <a href="/system/foundations" className="font-medium text-green underline underline-offset-2">
            foundations spec
          </a>
          . No off-system colors, spacing or type — and the green/yellow/red semaphore appears only on
          rating values.
        </p>
      </div>

      <div className="mt-6 space-y-8">
        {groups.map((g) => (
          <div key={g.category}>
            <div className="mb-1 flex items-baseline gap-2 px-3">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-soft">{g.category}</h3>
              <span className="text-xs text-muted-soft">{g.items.length}</span>
            </div>
            <div className="divide-y divide-border/60">
              {g.items.map((s) => (
                <Row key={s.id} section={s} onOpen={onOpen} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
