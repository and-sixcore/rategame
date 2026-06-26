"use client";

import { IoOpenOutline } from "react-icons/io5";

/** Opens the current preview as a standalone full-screen page in a new tab. */
export function FullscreenButton({ href }: { href: string }) {
  return (
    <button
      onClick={() => window.open(href, "_blank", "noopener")}
      title="Open full screen in a new tab"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 7,
        border: "1px solid var(--color-border)",
        background: "var(--color-surface-1)",
        color: "var(--color-fg-muted)",
        borderRadius: 999,
        padding: "7px 15px",
        fontSize: 13,
        fontWeight: 600,
        cursor: "pointer",
      }}
    >
      <IoOpenOutline size={15} />
      Full screen
    </button>
  );
}
