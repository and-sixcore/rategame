"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { files } from "@/lib/files";
import searchIndex from "@/lib/search-index.json";

interface SearchItem {
  label: string;
  href: string;
  group: string;
  external?: boolean;
  haystack: string;
}

const filesBody = files.map((f) => `${f.name} ${f.description}`).join(" ");

// Pages (title + full body searchable).
const PAGE_ITEMS: SearchItem[] = [
  ...searchIndex.map((p) => ({
    label: p.title,
    href: p.href,
    group: "Page",
    haystack: `${p.title} ${p.body}`.toLowerCase(),
  })),
  {
    label: "The system",
    href: "/handbook/files",
    group: "Page",
    haystack: `the system files ${filesBody}`.toLowerCase(),
  },
];

// Section headings (jump straight to the anchor).
const HEADING_ITEMS: SearchItem[] = searchIndex.flatMap((p) =>
  p.headings.map((h) => ({
    label: h.text,
    href: `${p.href}#${h.slug}`,
    group: p.title,
    haystack: h.text.toLowerCase(),
  })),
);

// Figma files (open externally).
const FILE_ITEMS: SearchItem[] = files.map((f) => ({
  label: f.name,
  href: f.href,
  group: "Figma files",
  external: true,
  haystack: `${f.name} ${f.description}`.toLowerCase(),
}));

const ITEMS: SearchItem[] = [...PAGE_ITEMS, ...HEADING_ITEMS, ...FILE_ITEMS];

export function Search() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => setMounted(true), []);

  // ⌘K / Ctrl+K toggles the palette.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (open) {
      setQuery("");
      setActive(0);
      const id = requestAnimationFrame(() => inputRef.current?.focus());
      return () => cancelAnimationFrame(id);
    }
  }, [open]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return PAGE_ITEMS;
    return ITEMS.filter((i) => i.haystack.includes(q)).slice(0, 30);
  }, [query]);

  useEffect(() => {
    setActive((a) => Math.min(a, Math.max(results.length - 1, 0)));
  }, [results.length]);

  const select = (item: SearchItem | undefined) => {
    if (!item) return;
    setOpen(false);
    if (item.external) {
      window.open(item.href, "_blank", "noopener,noreferrer");
    } else {
      router.push(item.href);
    }
  };

  const onListKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      select(results[active]);
    }
  };

  const palette = (
    <div className="fixed inset-0 z-[60] flex items-start justify-center px-4 pt-[12vh]">
      <button
        type="button"
        aria-label="Close search"
        onClick={() => setOpen(false)}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />
      <div className="relative w-full max-w-lg overflow-hidden rounded-card border border-border-strong bg-bg shadow-2xl">
        <div className="flex items-center gap-3 border-b border-border px-4">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden className="text-muted-soft">
            <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.5" />
            <path d="M11 11l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onListKey}
            placeholder="Search pages and files…"
            className="h-12 flex-1 bg-transparent text-[0.95rem] text-fg placeholder:text-muted-soft focus:outline-none"
          />
          <kbd className="hidden rounded border border-border bg-surface px-1.5 py-0.5 text-[0.65rem] text-muted-soft sm:block">
            Esc
          </kbd>
        </div>

        <ul className="max-h-[50vh] overflow-y-auto p-2">
          {results.length === 0 && (
            <li className="px-3 py-6 text-center text-sm text-muted-soft">
              No results
            </li>
          )}
          {results.map((item, i) => (
            <li key={`${item.href}-${i}`}>
              <button
                type="button"
                onMouseEnter={() => setActive(i)}
                onClick={() => select(item)}
                className={[
                  "flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-left transition-colors",
                  i === active ? "bg-surface" : "",
                ].join(" ")}
              >
                <span className="text-sm font-medium text-fg">{item.label}</span>
                <span className="flex items-center gap-1.5 text-xs text-muted-soft">
                  {item.group}
                  {item.external && (
                    <svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden>
                      <path
                        d="M3 9L9 3M9 3H4M9 3V8"
                        stroke="currentColor"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  return (
    <>
      <button
        type="button"
        aria-label="Search"
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 rounded-lg border border-border bg-surface px-2.5 py-1.5 text-sm text-muted-soft transition-colors hover:border-border-strong hover:text-fg"
      >
        <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden>
          <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.5" />
          <path d="M11 11l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        <span className="hidden lg:inline">Search</span>
        <kbd className="hidden rounded border border-border px-1.5 py-0.5 text-[0.65rem] lg:inline">
          ⌘K
        </kbd>
      </button>

      {open && mounted && createPortal(palette, document.body)}
    </>
  );
}
