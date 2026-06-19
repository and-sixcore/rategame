import type { Metadata } from "next";
import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { TopBar } from "@/components/TopBar";
import { SpecActions } from "@/components/SpecActions";

export const metadata: Metadata = {
  title: "Design spec",
  description:
    "The RateGame design system spec (design.md) — the written source of truth, as an article.",
};

function getSpec() {
  return fs.readFileSync(
    path.join(process.cwd(), "content", "design.md"),
    "utf8"
  );
}

export default function SpecPage() {
  const md = getSpec();

  return (
    <>
      <TopBar />

      {/* Sticky actions bar under the site TopBar (h-14) */}
      <div className="sticky top-14 z-30 border-b border-border bg-bg/80 backdrop-blur">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-3 px-6 py-2.5">
          <Link
            href="/system/foundations"
            className="text-label text-muted transition-colors hover:text-fg"
          >
            ← Foundations
          </Link>
          <SpecActions md={md} />
        </div>
      </div>

      <main className="page-rise mx-auto w-full max-w-3xl flex-1 px-6 py-12">
        <article className="prose">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{md}</ReactMarkdown>
        </article>
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto max-w-3xl px-6 py-8 text-sm text-muted">
          RateGame design system · design.md
        </div>
      </footer>
    </>
  );
}
