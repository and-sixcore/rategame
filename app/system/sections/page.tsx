import type { Metadata } from "next";
import { TopBar } from "@/components/TopBar";
import { SystemSections } from "@/components/sections/SystemSections";

export const metadata: Metadata = {
  title: "Sections",
  description:
    "The RateGame component library — components grouped into sections, derived from the web and mobile apps.",
};

export default function SystemSectionsPage() {
  return (
    <>
      <TopBar />
      <main className="mx-auto w-full max-w-[1320px] flex-1 px-6 pb-24">
        <SystemSections />
      </main>
    </>
  );
}
