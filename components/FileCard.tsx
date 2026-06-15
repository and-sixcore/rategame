import { FigmaFile } from "@/lib/files";
import { fileIcons, fallbackIcon } from "@/lib/fileIcons";

export function FileCard({ file }: { file: FigmaFile }) {
  const Icon = fileIcons[file.name] ?? fallbackIcon;
  return (
    <a
      href={file.href}
      target="_blank"
      rel="noreferrer"
      className="group flex flex-col rounded-card border border-border bg-surface p-5 transition-colors hover:border-border-strong"
    >
      <div className="mb-3 flex items-start justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span
            aria-hidden
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-surface-2 text-muted-soft transition-colors group-hover:text-fg"
          >
            <Icon className="h-[18px] w-[18px]" />
          </span>
          <h3 className="text-base font-semibold tracking-tight text-fg">
            {file.name}
          </h3>
        </div>
        <span className="mt-1 text-muted-soft transition-colors group-hover:text-fg">
          <svg width="14" height="14" viewBox="0 0 12 12" fill="none" aria-hidden>
            <path
              d="M3 9L9 3M9 3H4M9 3V8"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>
      <p className="text-sm leading-relaxed text-muted">{file.description}</p>
    </a>
  );
}
