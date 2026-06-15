"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Sidebar } from "./Sidebar";

const sections = [
  { label: "Handbook", href: "/handbook" },
  { label: "System", href: "/system" },
  { label: "Playground", href: "/playground" },
];

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const inHandbook = pathname.startsWith("/handbook");

  useEffect(() => setMounted(true), []);

  // Lock body scroll while the menu is open.
  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  const close = () => setOpen(false);

  // The drawer is portaled to <body> so it isn't trapped by the header's
  // backdrop-filter containing block.
  const drawer = (
    <div className="fixed inset-0 z-50 flex flex-col bg-bg">
      <div className="flex h-14 shrink-0 items-center justify-between border-b border-border px-4 sm:px-6">
        <span className="text-sm font-semibold tracking-tight text-fg">Menu</span>
        <button
          type="button"
          aria-label="Close menu"
          onClick={close}
          className="-mr-1 rounded-lg p-2 text-muted transition-colors hover:bg-surface hover:text-fg"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
            <path
              d="M5 5l10 10M15 5L5 15"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
        {/* Primary nav — full-width filled buttons */}
        <div className="flex flex-col gap-2.5">
          {sections.map((s) => {
            const active =
              s.href === "/handbook"
                ? pathname.startsWith("/handbook")
                : pathname.startsWith(s.href);
            return (
              <Link
                key={s.href}
                href={s.href}
                onClick={close}
                className={[
                  "flex w-full items-center justify-between rounded-xl border px-4 py-3.5 text-[1.05rem] font-medium transition-colors",
                  active
                    ? "border-border-strong bg-surface-2 text-fg"
                    : "border-border bg-surface text-fg hover:border-border-strong",
                ].join(" ")}
              >
                {s.label}
                {active ? (
                  <span className="h-2 w-2 rounded-full bg-green" aria-hidden />
                ) : (
                  <svg width="14" height="14" viewBox="0 0 12 12" fill="none" aria-hidden className="text-muted-soft">
                    <path
                      d="M2.5 6h7M6.5 3l3 3-3 3"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </Link>
            );
          })}
        </div>

        {/* Secondary — not filled */}
        <a
          href="https://rategame.io/"
          target="_blank"
          rel="noreferrer"
          onClick={close}
          className="mt-2 flex items-center gap-1.5 px-4 py-3 text-[0.95rem] text-muted transition-colors hover:text-fg"
        >
          rategame.io
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
            <path
              d="M3 9L9 3M9 3H4M9 3V8"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>

        {/* Handbook sections — secondary, not filled */}
        {inHandbook && (
          <div className="mt-6 border-t border-border pt-6">
            <Sidebar onNavigate={close} />
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      <button
        type="button"
        aria-label="Open menu"
        aria-expanded={open}
        onClick={() => setOpen(true)}
        className="-mr-1 rounded-lg p-2 text-fg transition-colors hover:bg-surface"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
          <path
            d="M3 5.5h14M3 10h14M3 14.5h14"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
          />
        </svg>
      </button>

      {open && mounted && createPortal(drawer, document.body)}
    </>
  );
}
