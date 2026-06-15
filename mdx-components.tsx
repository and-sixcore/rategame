import type { MDXComponents } from "mdx/types";
import { ComponentPropsWithoutRef, ReactNode } from "react";
import { Callout } from "@/components/Callout";
import { Steps, Step } from "@/components/Steps";
import { AnimatedText } from "@/components/AnimatedText";

// Wraps every MDX page in editorial prose styling + a readable measure.
function Wrapper({ children }: { children: ReactNode }) {
  return <article className="prose max-w-[720px]">{children}</article>;
}

// Page titles get a gentle Calligraph reveal on open.
function H1({ children }: ComponentPropsWithoutRef<"h1">) {
  return <AnimatedText as="h1">{children}</AnimatedText>;
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    wrapper: Wrapper,
    h1: H1,
    Callout,
    Steps,
    Step,
    ...components,
  };
}
