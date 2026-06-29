"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Badge, type BadgeVariant } from "./Badge";

/**
 * Avatar — a round user image with an initials fallback and an optional badge
 * overlay. Presentational: image + name in via props. Sizes align with ScorePill
 * (24 / 32 / 48 / 64 px). On-system only: neutral surface-2 disc, fg initials.
 */
export type AvatarSize = "xs" | "sm" | "md" | "lg";

const SIZES: Record<AvatarSize, { box: number; font: number; badge: number }> = {
  xs: { box: 24, font: 10, badge: 10 },
  sm: { box: 32, font: 12, badge: 13 },
  md: { box: 48, font: 16, badge: 18 },
  lg: { box: 64, font: 22, badge: 22 },
};

function initialsOf(name?: string): string {
  if (!name) return "";
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export interface AvatarProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  src?: string | null;
  /** Used for the initials fallback and the image alt. */
  name?: string;
  size?: AvatarSize;
  /** Optional earned badge, overlaid bottom-right. */
  badge?: BadgeVariant;
}

export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  function Avatar({ src, name, size = "md", badge, className, style, ...props }, ref) {
    const { box, font, badge: badgeSize } = SIZES[size];
    const [failed, setFailed] = React.useState(false);

    React.useEffect(() => {
      setFailed(false);
    }, [src]);

    const showImage = !!src && src !== "null" && !failed;
    const initials = initialsOf(name);

    return (
      <div
        ref={ref}
        className={cn("relative inline-flex shrink-0", className)}
        style={{ width: box, height: box, ...style }}
        {...props}
      >
        {showImage ? (
          // eslint-disable-next-line @next/next/no-img-element -- avatar src is an arbitrary runtime URL, not a build-time asset
          <img
            src={src}
            alt={name ?? "Avatar"}
            width={box}
            height={box}
            className="h-full w-full rounded-full object-cover"
            onError={() => setFailed(true)}
          />
        ) : (
          <div
            aria-label={name ? `${name} avatar` : "Avatar"}
            role="img"
            className="grid h-full w-full place-items-center rounded-full bg-surface-2 font-semibold text-fg"
            style={{ fontSize: font }}
          >
            {initials || (
              <span className="text-fg-subtle" style={{ fontSize: font }}>
                ?
              </span>
            )}
          </div>
        )}

        {badge && (
          <span className="absolute -bottom-0.5 -right-0.5 inline-flex">
            <Badge variant={badge} size={badgeSize} />
          </span>
        )}
      </div>
    );
  }
);
