import { ReactNode } from "react";

type PillTone = "default" | "green" | "outline";

const tones: Record<PillTone, string> = {
  default: "bg-surface-2 text-muted border border-border",
  green: "bg-green-soft text-green-ink border border-green/30",
  outline: "bg-transparent text-fg border border-border-strong",
};

export function Pill({
  children,
  tone = "default",
}: {
  children: ReactNode;
  tone?: PillTone;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-pill px-2.5 py-0.5 text-xs font-medium tracking-tight ${tones[tone]}`}
    >
      {children}
    </span>
  );
}
