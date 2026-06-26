"use client";

import { useState } from "react";
import Link from "next/link";
import { IoArrowBack } from "react-icons/io5";
import { SectionsCatalog } from "./SectionsCatalog";
import { SectionDetail } from "./SectionDetail";

/** The Sections area of the design system: catalog list ↔ component detail. */
export function SystemSections() {
  const [selected, setSelected] = useState<string | null>(null);

  if (selected) {
    return <SectionDetail sectionId={selected} onBack={() => setSelected(null)} />;
  }

  return (
    <div className="page-rise py-10">
      <Link
        href="/system"
        className="inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-fg"
      >
        <IoArrowBack size={16} />
        Design System
      </Link>
      <div className="mt-6">
        <SectionsCatalog onOpen={setSelected} />
      </div>
    </div>
  );
}
