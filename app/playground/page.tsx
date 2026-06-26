import type { Metadata } from "next";
import { TopBar } from "@/components/TopBar";
import { PlaygroundClient } from "@/components/playground/PlaygroundClient";

export const metadata: Metadata = {
  title: "Playground",
  description:
    "Click through living, mock-data prototypes of the RateGame web and mobile apps inside real device frames.",
};

export default function PlaygroundPage() {
  return (
    <>
      <TopBar />
      <main className="mx-auto w-full max-w-[1320px] flex-1 px-6 pb-24">
        <PlaygroundClient />
      </main>
    </>
  );
}
