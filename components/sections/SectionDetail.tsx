"use client";

import { IoArrowBack, IoLockClosed } from "react-icons/io5";
import { getSection } from "@/lib/sections";

function Meta({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-border bg-surface-1 px-4 py-3">
      <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-soft">{label}</div>
      <div className="mt-1 text-sm text-fg">{children}</div>
    </div>
  );
}

export function SectionDetail({ sectionId, onBack }: { sectionId: string; onBack: () => void }) {
  const s = getSection(sectionId);
  if (!s) {
    return (
      <div className="page-rise py-10">
        <button onClick={onBack} className="inline-flex items-center gap-2 text-sm text-muted hover:text-fg">
          <IoArrowBack size={16} /> Sections
        </button>
        <p className="mt-6 text-muted">Section not found.</p>
      </div>
    );
  }

  const sourceLabel = s.source === "both" ? "Web + Mobile" : s.source === "web" ? "Web" : "Mobile";

  return (
    <div className="page-rise py-10">
      <button onClick={onBack} className="inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-fg">
        <IoArrowBack size={16} /> Sections
      </button>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <h1 className="text-3xl font-semibold tracking-tight text-fg">{s.name}</h1>
        <span className="rounded-pill bg-surface-2 px-2.5 py-1 text-[11px] font-semibold text-muted">Planned</span>
      </div>
      <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-muted">{s.description}</p>

      <div className="mt-6 grid max-w-[760px] grid-cols-2 gap-3 sm:grid-cols-3">
        <Meta label="Category">{s.category}</Meta>
        <Meta label="Complexity">{s.complexity[0].toUpperCase() + s.complexity.slice(1)}</Meta>
        <Meta label="Source">{sourceLabel}</Meta>
      </div>

      {s.variants && s.variants.length > 0 && (
        <div className="mt-6 max-w-[760px]">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-soft">Variants</div>
          <div className="mt-2 flex flex-wrap gap-2">
            {s.variants.map((v) => (
              <span key={v} className="rounded-pill bg-surface-1 px-3 py-1 text-[12.5px] text-muted">
                {v}
              </span>
            ))}
          </div>
        </div>
      )}

      {s.refs && (s.refs.web || s.refs.mobile) && (
        <div className="mt-6 max-w-[760px]">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-soft">Reference (real apps)</div>
          <div className="mt-2 space-y-1.5">
            {s.refs.web && (
              <div className="flex items-center gap-2 text-[13px]">
                <span className="rounded bg-surface-2 px-1.5 py-0.5 text-[10px] font-semibold text-muted">web</span>
                <code className="text-fg-muted">{s.refs.web}</code>
              </div>
            )}
            {s.refs.mobile && (
              <div className="flex items-center gap-2 text-[13px]">
                <span className="rounded bg-surface-2 px-1.5 py-0.5 text-[10px] font-semibold text-muted">mobile</span>
                <code className="text-fg-muted">{s.refs.mobile}</code>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Rule */}
      <div className="mt-6 flex max-w-[760px] items-start gap-3 rounded-xl border border-border bg-surface-1 p-4">
        <IoLockClosed className="mt-0.5 shrink-0 text-green" />
        <p className="text-[13px] leading-relaxed text-muted">
          <span className="font-semibold text-fg">Build rule —</span> use the handbook&apos;s core design
          system (globals.css tokens + <code className="text-fg-muted">components/ui</code> primitives) and
          the{" "}
          <a href="/system/foundations" className="font-medium text-green underline underline-offset-2">
            foundations spec
          </a>
          . No deviation. Build it presentational (data via props) so it transfers to rategame-web and wires
          to the backend there.
        </p>
      </div>

      {/* Build placeholder */}
      <div className="mt-4 grid max-w-[760px] place-items-center rounded-2xl border border-dashed border-border-strong bg-bg py-14 text-center">
        <div>
          <div className="text-sm font-medium text-fg-subtle">Not built yet</div>
          <div className="mt-1 text-[13px] text-muted-soft">
            When this is built (on its own or from a flow), its preview + edit lands here.
          </div>
        </div>
      </div>
    </div>
  );
}
