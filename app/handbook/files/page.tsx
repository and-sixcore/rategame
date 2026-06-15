import type { Metadata } from "next";
import { FileCard } from "@/components/FileCard";
import { AnimatedText } from "@/components/AnimatedText";
import { fileGroups, filesByGroup, PROJECT_URL } from "@/lib/files";

export const metadata: Metadata = {
  title: "Files",
  description:
    "The map of the RateGame design system. Every Figma file and what it's for.",
};

export default function FilesPage() {
  return (
    <div className="max-w-[860px]">
      <header className="max-w-[720px]">
        <AnimatedText
          as="h1"
          className="text-[clamp(2.1rem,4vw,2.9rem)] font-semibold leading-[1.1] tracking-tight"
        >
          The system
        </AnimatedText>
        <p className="mt-3 text-[1.0625rem] leading-relaxed text-muted">
          Every design lives in one RateGame Figma project, split into purpose-built
          files. Here's the map of what each file is for, and where to open it.
        </p>
        <a
          href={PROJECT_URL}
          target="_blank"
          rel="noreferrer"
          className="mt-5 inline-flex items-center gap-2 rounded-pill border border-border-strong px-4 py-2 text-sm font-medium text-fg transition-colors hover:border-muted"
        >
          Open the RateGame project
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
            <path
              d="M3 9L9 3M9 3H4M9 3V8"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </header>

      <div className="mt-12 flex flex-col gap-12">
        {fileGroups.map((group) => (
          <section key={group}>
            <h2 className="mb-4 text-xs font-medium text-muted-soft">
              {group}
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {filesByGroup(group).map((file) => (
                <FileCard key={file.name} file={file} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
