"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { handbookNav } from "@/lib/nav";

export function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-7 text-sm" aria-label="Handbook sections">
      {handbookNav.map((section) => (
        <div key={section.title}>
          {section.href ? (
            <Link
              href={section.href}
              onClick={onNavigate}
              aria-current={pathname === section.href ? "page" : undefined}
              className={[
                "mb-2 block text-xs font-medium transition-colors",
                pathname === section.href
                  ? "text-fg"
                  : "text-muted-soft hover:text-fg",
              ].join(" ")}
            >
              {section.title}
            </Link>
          ) : (
            <p className="mb-2 text-xs font-medium text-muted-soft">
              {section.title}
            </p>
          )}
          <ul className="flex flex-col gap-0.5">
            {section.items.map((item) => {
              const active = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onNavigate}
                    aria-current={active ? "page" : undefined}
                    className={[
                      "relative flex items-center rounded-lg px-3 py-1.5 transition-colors",
                      active
                        ? "bg-surface font-medium text-fg"
                        : "text-muted hover:bg-surface hover:text-fg",
                    ].join(" ")}
                  >
                    {active && (
                      <span
                        aria-hidden
                        className="absolute left-0 top-1/2 h-4 w-[3px] -translate-y-1/2 rounded-full bg-green"
                      />
                    )}
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}
