"use client";

import { Calligraph } from "calligraph";
import type { ElementType, ReactNode } from "react";

/**
 * A gentle, professional text reveal (Calligraph) used for page titles.
 * Falls back to plain rendering when children aren't a simple string.
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
  if (typeof children !== "string") {
    const As = as;
    return <As className={className}>{children}</As>;
  }
  return (
    <Calligraph
      as={as}
      className={className}
      initial
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
