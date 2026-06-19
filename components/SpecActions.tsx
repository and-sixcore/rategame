"use client";

import * as React from "react";
import { IoCopyOutline, IoCheckmark, IoDownloadOutline } from "react-icons/io5";

/** Copy-to-clipboard and download buttons for a raw markdown string. */
export function SpecActions({
  md,
  filename = "design.md",
}: {
  md: string;
  filename?: string;
}) {
  const [copied, setCopied] = React.useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(md);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // clipboard blocked — no-op
    }
  }

  function download() {
    const blob = new Blob([md], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }

  const btn =
    "inline-flex items-center gap-1.5 rounded-md border border-border bg-surface-2 px-3 py-1.5 text-label font-medium text-fg transition-colors hover:bg-surface-3";

  return (
    <div className="flex items-center gap-2">
      <button type="button" onClick={copy} className={btn}>
        {copied ? (
          <IoCheckmark className="size-4 text-green" />
        ) : (
          <IoCopyOutline className="size-4" />
        )}
        {copied ? "Copied" : "Copy MD"}
      </button>
      <button type="button" onClick={download} className={btn}>
        <IoDownloadOutline className="size-4" />
        Download
      </button>
    </div>
  );
}
