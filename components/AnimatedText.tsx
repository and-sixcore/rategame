"use client";

import { Calligraph } from "calligraph";
import { useSyncExternalStore } from "react";
import type { ElementType, ReactNode } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(cb: () => void) {
  const mq = window.matchMedia(QUERY);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}

/** SSR-safe prefers-reduced-motion (false on the server, real value on the client). */
function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    () => false,
  );
}

/**
 * A gentle, professional text reveal (Calligraph) used for page titles.
 * Falls back to plain rendering for non-string children or when the user
 * prefers reduced motion.
 */
export function AnimatedText({
  children,
  className,
  as = "span",
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
}) {
  const reducedMotion = usePrefersReducedMotion();

  if (typeof children !== "string") {
    const As = as;
    return <As className={className}>{children}</As>;
  }
  return (
    <Calligraph
      as={as}
      // items-baseline keeps the split character spans on the text baseline,
      // so punctuation (e.g. the colon) doesn't float above the letters.
      className={["items-baseline", className].filter(Boolean).join(" ")}
      initial={!reducedMotion}
      variant="text"
      animation="smooth"
      trend={1}
      drift={{ x: 0, y: 6 }}
      stagger={0.01}
      autoSize={false}
    >
      {children}
    </Calligraph>
  );
}
