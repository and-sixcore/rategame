import type { Metadata } from "next";
import { ComingSoon } from "@/components/ComingSoon";

export const metadata: Metadata = {
  title: "Design System",
  description: "The RateGame design system, coming soon.",
};

export default function SystemPage() {
  return (
    <ComingSoon eyebrow="Coming soon" title="Design system">
      A living, hosted version of the RateGame design system (tokens, foundations, and
      components) will live here. For now, the source of truth is the published
      Foundations library in Figma.
    </ComingSoon>
  );
}
