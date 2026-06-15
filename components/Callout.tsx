import { ReactNode } from "react";

type CalloutType = "note" | "tip" | "warning";

const styles: Record<
  CalloutType,
  { label: string; ring: string; bg: string; dot: string }
> = {
  note: {
    label: "Note",
    ring: "border-border-strong",
    bg: "bg-surface",
    dot: "bg-muted",
  },
  tip: {
    label: "Tip",
    ring: "border-border-strong",
    bg: "bg-surface",
    dot: "bg-muted-soft",
  },
  warning: {
    label: "Watch out",
    ring: "border-amber-500/30",
    bg: "bg-amber-500/10",
    dot: "bg-amber-400",
  },
};

export function Callout({
  type = "note",
  title,
  children,
}: {
  type?: CalloutType;
  title?: string;
  children: ReactNode;
}) {
  const s = styles[type];
  return (
    <div className={`my-6 rounded-card border ${s.ring} ${s.bg} p-4 sm:p-5`}>
      <div className="mb-1.5 flex items-center gap-2">
        <span className={`h-2 w-2 rounded-full ${s.dot}`} aria-hidden />
        <span className="text-xs font-semibold text-fg">
          {title ?? s.label}
        </span>
      </div>
      <div className="text-[0.95rem] leading-relaxed text-[#d7d9de] [&>*+*]:mt-2 [&_strong]:font-semibold [&_strong]:text-fg">
        {children}
      </div>
    </div>
  );
}
