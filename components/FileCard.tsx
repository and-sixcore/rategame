import { FigmaFile } from "@/lib/files";

export function FileCard({ file }: { file: FigmaFile }) {
  return (
    <a
      href={file.href}
      target="_blank"
      rel="noreferrer"
      className="group flex flex-col rounded-card border border-border bg-surface p-5 transition-colors hover:border-border-strong"
    >
      <div className="mb-2 flex items-start justify-between gap-3">
        <h3 className="text-base font-semibold tracking-tight text-fg">
          {file.name}
        </h3>
        <span className="mt-0.5 text-muted-soft transition-colors group-hover:text-fg">
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
