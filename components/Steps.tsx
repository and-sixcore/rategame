import { Children, ReactNode, isValidElement } from "react";

/**
 * Numbered, connected steps for describing a workflow.
 * Usage in MDX:
 *   <Steps>
 *     <Step title="Workboard">...</Step>
 *     <Step title="Review">...</Step>
 *   </Steps>
 */
export function Steps({ children }: { children: ReactNode }) {
  const items = Children.toArray(children).filter(isValidElement);
  return (
    <ol className="my-7 flex flex-col gap-0">
      {items.map((child, i) => (
        <li key={i} className="relative flex gap-4 pb-7 last:pb-0">
          {/* connector line */}
          {i < items.length - 1 && (
            <span
              aria-hidden
              className="absolute left-[15px] top-9 bottom-1 w-px bg-border"
            />
          )}
          <span
            aria-hidden
            className="z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border-strong bg-surface text-sm font-semibold text-fg"
          >
            {i + 1}
          </span>
          <div className="min-w-0 pt-0.5">{child}</div>
        </li>
      ))}
    </ol>
  );
}

export function Step({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div>
      <p className="font-semibold tracking-tight text-fg">{title}</p>
      <div className="mt-1 text-[0.95rem] leading-relaxed text-muted [&>*+*]:mt-1.5">
        {children}
      </div>
    </div>
  );
}
