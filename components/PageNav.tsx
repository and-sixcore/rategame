"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { handbookNavFlat } from "@/lib/nav";

export function PageNav() {
  const pathname = usePathname();
  const idx = handbookNavFlat.findIndex((item) => item.href === pathname);
  if (idx === -1) return null;

  const prev = idx > 0 ? handbookNavFlat[idx - 1] : null;
  const next =
    idx < handbookNavFlat.length - 1 ? handbookNavFlat[idx + 1] : null;

  if (!prev && !next) return null;

  return (
    <nav
      aria-label="Page navigation"
      className={[
        "mt-16 grid gap-3 border-t border-border pt-8",
        prev && next ? "grid-cols-2" : "grid-cols-1",
      ].join(" ")}
    >
      {prev && (
        <Link
          href={prev.href}
          className="group flex flex-col rounded-card border border-border bg-surface px-4 py-3.5 transition-colors hover:border-border-strong sm:px-5 sm:py-4"
        >
          <span className="flex items-center gap-1.5 text-xs text-muted-soft">
            <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden>
              <path
                d="M9.5 6h-7M5.5 3l-3 3 3 3"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Previous
          </span>
          <span className="mt-1 font-medium text-fg">{prev.label}</span>
        </Link>
      )}

      {next && (
        <Link
          href={next.href}
          className="group flex flex-col items-end rounded-card border border-border bg-surface px-4 py-3.5 text-right transition-colors hover:border-border-strong sm:px-5 sm:py-4"
        >
          <span className="flex items-center gap-1.5 text-xs text-muted-soft">
            Next
            <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden>
              <path
                d="M2.5 6h7M6.5 3l3 3-3 3"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <span className="mt-1 font-medium text-fg">{next.label}</span>
        </Link>
      )}
    </nav>
  );
}
