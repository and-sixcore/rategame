import { FigmaFile } from "@/lib/files";
import { fileIcons, fallbackIcon } from "@/lib/fileIcons";

export function ResourceCard({ file }: { file: FigmaFile }) {
  const Icon = fileIcons[file.name] ?? fallbackIcon;
  return (
    <a
      href={file.href}
      target="_blank"
      rel="noreferrer"
      className="group flex items-center gap-3 rounded-xl border border-border bg-surface px-4 py-3 transition-colors hover:border-border-strong"
    >
      <span
        aria-hidden
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-surface-2 text-muted-soft transition-colors group-hover:text-fg"
      >
        <Icon className="h-[18px] w-[18px]" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-sm font-medium text-fg">
          {file.name}
        </span>
        <span className="block truncate text-xs text-muted">{file.role}</span>
      </span>
      <span className="text-muted-soft transition-colors group-hover:text-fg">
        <svg width="13" height="13" viewBox="0 0 12 12" fill="none" aria-hidden>
          <path
            d="M3 9L9 3M9 3H4M9 3V8"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </a>
  );
}
