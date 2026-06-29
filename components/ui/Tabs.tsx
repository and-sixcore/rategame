"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Tabs — a section / segmented control. Hand-built (no Radix) and React-18-safe:
 * state flows through a <Context.Provider>, subcomponents use forwardRef. The
 * active trigger gets an fg underline; an optional `count` renders a surface-2
 * pill (parity with the mobile GameDetailsTabBar). On-system tokens only.
 *
 * Controlled via `value` / `onValueChange`, or uncontrolled via `defaultValue`.
 */
interface TabsContextValue {
  value: string;
  setValue: (v: string) => void;
}

const TabsContext = React.createContext<TabsContextValue | null>(null);

function useTabs(component: string): TabsContextValue {
  const ctx = React.useContext(TabsContext);
  if (!ctx) throw new Error(`${component} must be used within <Tabs>`);
  return ctx;
}

export interface TabsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}

export const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(function Tabs(
  { value, defaultValue, onValueChange, className, children, ...props },
  ref
) {
  const isControlled = value !== undefined;
  const [internal, setInternal] = React.useState(defaultValue ?? "");
  const current = isControlled ? (value as string) : internal;

  const setValue = React.useCallback(
    (v: string) => {
      if (!isControlled) setInternal(v);
      onValueChange?.(v);
    },
    [isControlled, onValueChange]
  );

  const ctx = React.useMemo(() => ({ value: current, setValue }), [current, setValue]);

  return (
    <TabsContext.Provider value={ctx}>
      <div ref={ref} className={cn("flex flex-col", className)} {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  );
});

export const TabsList = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  function TabsList({ className, ...props }, ref) {
    return (
      <div
        ref={ref}
        role="tablist"
        className={cn("flex items-stretch gap-1 border-b border-border", className)}
        {...props}
      />
    );
  }
);

export interface TabsTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
  /** Optional count pill (e.g. number of takes). */
  count?: number;
}

export const TabsTrigger = React.forwardRef<HTMLButtonElement, TabsTriggerProps>(
  function TabsTrigger({ value, count, className, children, ...props }, ref) {
    const { value: active, setValue } = useTabs("TabsTrigger");
    const selected = active === value;

    return (
      <button
        ref={ref}
        type="button"
        role="tab"
        aria-selected={selected}
        data-selected={selected}
        onClick={() => setValue(value)}
        className={cn(
          "-mb-px inline-flex items-center gap-1.5 border-b-2 px-3 pb-2.5 pt-1.5 text-label transition-colors",
          selected
            ? "border-fg font-semibold text-fg"
            : "border-transparent font-medium text-fg-subtle hover:text-fg-muted",
          className
        )}
        {...props}
      >
        {children}
        {count !== undefined && (
          <span className="inline-grid min-w-5 place-items-center rounded-full bg-surface-2 px-1.5 py-0.5 text-caption font-medium tabular-nums text-fg-muted">
            {count}
          </span>
        )}
      </button>
    );
  }
);

export interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

export const TabsContent = React.forwardRef<HTMLDivElement, TabsContentProps>(
  function TabsContent({ value, className, children, ...props }, ref) {
    const { value: active } = useTabs("TabsContent");
    if (active !== value) return null;
    return (
      <div ref={ref} role="tabpanel" className={cn("pt-4", className)} {...props}>
        {children}
      </div>
    );
  }
);
