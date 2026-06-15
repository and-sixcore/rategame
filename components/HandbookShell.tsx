"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { TopBar } from "./TopBar";
import { Sidebar } from "./Sidebar";
import { PageNav } from "./PageNav";

export function HandbookShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <>
      <TopBar />

      <div className="mx-auto flex w-full max-w-[1320px] flex-1 px-4 sm:px-6">
        {/* Desktop sidebar */}
        <aside className="sticky top-14 hidden h-[calc(100vh-3.5rem)] w-56 shrink-0 overflow-y-auto py-10 pr-6 lg:block">
          <Sidebar />
        </aside>

        {/* Content */}
        <main className="min-w-0 flex-1 py-10 lg:pl-10 lg:pr-6">
          <div key={pathname} className="page-rise">
            {children}
            <div className="max-w-[720px]">
              <PageNav />
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
