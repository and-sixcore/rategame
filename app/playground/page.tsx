import type { Metadata } from "next";
import { ComingSoon } from "@/components/ComingSoon";

export const metadata: Metadata = {
  title: "Playground",
  description: "The AI design workboard, coming soon.",
};

export default function PlaygroundPage() {
  return (
    <ComingSoon eyebrow="Coming soon" title="Workboard">
      A space to build and explore components with AI, the digital extension of the
      Figma worktable. It's on the roadmap. For now, exploration happens in the Workboard
      Figma file.
    </ComingSoon>
  );
}
