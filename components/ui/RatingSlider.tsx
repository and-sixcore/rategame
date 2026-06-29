"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { ScorePill } from "./ScorePill";

/**
 * RatingSlider — an interactive 0–10 rating input. Built on a native range input
 * (no Radix) styled with design tokens: a neutral surface track and fill, with a
 * round fg thumb. The live value reads out through ScorePill, so the semaphore
 * color appears ONLY on the value — never on the track. Controlled or uncontrolled.
 */
export interface RatingSliderProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "value" | "defaultValue" | "onChange" | "type" | "min" | "max" | "step"
  > {
  value?: number;
  defaultValue?: number;
  onValueChange?: (value: number) => void;
  /** Show the ScorePill value readout (default true). */
  showScore?: boolean;
}

const MAX = 10;

export const RatingSlider = React.forwardRef<HTMLInputElement, RatingSliderProps>(
  function RatingSlider(
    { value, defaultValue = 5, onValueChange, showScore = true, disabled, className, ...props },
    ref
  ) {
    const isControlled = value !== undefined;
    const [internal, setInternal] = React.useState(defaultValue);
    const current = isControlled ? (value as number) : internal;
    const pct = (current / MAX) * 100;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const next = Number(e.target.value);
      if (!isControlled) setInternal(next);
      onValueChange?.(next);
    };

    return (
      <div className={cn("flex items-center gap-4", disabled && "opacity-40", className)}>
        <div className="relative flex h-8 flex-1 items-center">
          {/* Track */}
          <div className="absolute inset-x-0 h-1.5 rounded-full bg-surface-3" />
          {/* Fill (neutral — never semaphore) */}
          <div
            className="absolute h-1.5 rounded-full bg-fg-subtle"
            style={{ width: `${pct}%` }}
          />
          {/* Thumb */}
          <div
            className="pointer-events-none absolute size-5 -translate-x-1/2 rounded-full border border-border bg-fg shadow-[var(--shadow-1)]"
            style={{ left: `${pct}%` }}
          />
          {/* Native input — transparent, drives interaction + a11y */}
          <input
            ref={ref}
            type="range"
            min={0}
            max={MAX}
            step={0.1}
            value={current}
            disabled={disabled}
            onChange={handleChange}
            aria-valuetext={`${current.toFixed(1)} out of 10`}
            className="absolute inset-x-0 h-8 w-full cursor-pointer appearance-none bg-transparent focus:outline-none [&::-moz-range-thumb]:size-5 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-transparent [&::-webkit-slider-thumb]:size-5 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:bg-transparent"
            {...props}
          />
        </div>
        {showScore && <ScorePill value={current} size="sm" />}
      </div>
    );
  }
);
