import type { Metadata } from "next";
import Image from "next/image";
import { ResourceCard } from "@/components/ResourceCard";
import { AnimatedText } from "@/components/AnimatedText";
import { fileGroups, filesByGroup, PROJECT_URL } from "@/lib/files";

export const metadata: Metadata = {
  title: "Resources",
  description: "Every RateGame Figma board, in one place.",
};

export default function ResourcesPage() {
  return (
    <div className="max-w-[860px]">
      <header className="max-w-[720px]">
        <AnimatedText
          as="h1"
          className="text-[clamp(2.1rem,4vw,2.9rem)] font-semibold leading-[1.1] tracking-tight"
        >
          Resources
        </AnimatedText>
        <p className="mt-3 text-[1.0625rem] leading-relaxed text-muted">
          Quick links to every Figma board. For what each file is for, see{" "}
          <a
            href="/handbook/files"
            className="font-medium text-fg underline decoration-border-strong decoration-2 underline-offset-2 hover:decoration-green"
          >
            the system
          </a>
          .
        </p>
      </header>

      {/* Parent project */}
      <a
        href={PROJECT_URL}
        target="_blank"
        rel="noreferrer"
        className="group mt-8 flex items-center gap-4 rounded-card border border-border bg-surface px-5 py-4 transition-colors hover:border-border-strong"
      >
        <Image
          src="/rategame-logo.png"
          alt="RateGame"
          width={40}
          height={40}
          className="shrink-0 rounded-[10px]"
        />
        <span className="flex-1">
          <span className="block text-sm font-semibold text-fg">
            RateGame project
          </span>
          <span className="block text-xs text-muted">
            The parent Figma project where all files live
          </span>
        </span>
        <span className="text-muted-soft transition-colors group-hover:text-fg">
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
      </a>

      <div className="mt-10 flex flex-col gap-10">
        {fileGroups.map((group) => (
          <section key={group}>
            <h2 className="mb-3 text-xs font-medium text-muted-soft">
              {group}
            </h2>
            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {filesByGroup(group).map((file) => (
                <ResourceCard key={file.name} file={file} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
