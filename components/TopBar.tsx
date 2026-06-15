"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Wordmark } from "./Wordmark";
import { MobileMenu } from "./MobileMenu";
import { Search } from "./Search";

const sections = [
  { label: "Handbook", href: "/handbook" },
  { label: "System", href: "/system" },
  { label: "Playground", href: "/playground" },
];

export function TopBar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-[1320px] items-center gap-4 px-4 sm:px-6">
        <Wordmark />

        {/* Desktop navigation */}
        <nav className="ml-auto hidden items-center gap-1 text-sm lg:flex">
          <div className="mr-2">
            <Search />
          </div>
          {sections.map((s) => {
            const active =
              s.href === "/handbook"
                ? pathname.startsWith("/handbook")
                : pathname.startsWith(s.href);
            return (
              <Link
                key={s.href}
                href={s.href}
                className={[
                  "rounded-lg px-3 py-1.5 transition-colors",
                  active ? "font-medium text-fg" : "text-muted hover:text-fg",
                ].join(" ")}
              >
                {s.label}
              </Link>
            );
          })}
          <a
            href="https://rategame.io/"
            target="_blank"
            rel="noreferrer"
            className="ml-1 inline-flex items-center gap-1 rounded-lg border border-border-strong px-3 py-1.5 text-fg transition-colors hover:border-muted"
          >
            rategame.io
            <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden>
              <path
                d="M3 9L9 3M9 3H4M9 3V8"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </nav>

        {/* Mobile: search + menu */}
        <div className="ml-auto flex items-center gap-1 lg:hidden">
          <Search />
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
