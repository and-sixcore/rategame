"use client";

import { IoPhonePortraitOutline, IoDesktopOutline, IoArrowForward } from "react-icons/io5";

const PREVIEW_H = 156;

/** Tiny CSS illustration shown on each launcher card. */
function MiniWeb() {
  return (
    <div style={{ height: PREVIEW_H, borderRadius: 11, border: "1px solid var(--color-border)", overflow: "hidden", background: "#0d0d0d", display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 5, padding: "9px 12px", background: "#1a1a1a", borderBottom: "1px solid var(--color-border)" }}>
        <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#ff5f57" }} />
        <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#febc2e" }} />
        <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#28c840" }} />
        <span style={{ flex: 1, height: 9, marginLeft: 8, borderRadius: 999, background: "#2a2a2a" }} />
      </div>
      <div style={{ flex: 1, display: "flex", gap: 10, padding: 12 }}>
        <div style={{ width: 30, display: "flex", flexDirection: "column", gap: 7 }}>
          {[0, 1, 2, 3, 4].map((i) => (
            <span key={i} style={{ height: 6, borderRadius: 3, background: i === 0 ? "#1AFF97" : "#262626" }} />
          ))}
        </div>
        <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1fr 1fr", gridAutoRows: "1fr", gap: 8 }}>
          <span style={{ borderRadius: 7, background: "linear-gradient(180deg,#16241d,#0f2a1e)", border: "1px solid #1f3a2c" }} />
          <span style={{ borderRadius: 7, background: "#1a1a1a" }} />
          <span style={{ borderRadius: 7, background: "#1a1a1a" }} />
          <span style={{ borderRadius: 7, background: "#1a1a1a" }} />
        </div>
      </div>
    </div>
  );
}

function MiniPhone() {
  return (
    <div style={{ height: PREVIEW_H, display: "grid", placeItems: "center" }}>
      <div style={{ width: 84, height: 144, borderRadius: 19, border: "2px solid var(--color-border-strong)", background: "#0d0d0d", padding: "9px 8px 8px", position: "relative", display: "flex", flexDirection: "column", gap: 7 }}>
        <span style={{ position: "absolute", top: 7, left: "50%", transform: "translateX(-50%)", width: 26, height: 5, borderRadius: 999, background: "#1a1a1a" }} />
        <div style={{ marginTop: 8, display: "flex", flexDirection: "column", gap: 6, flex: 1 }}>
          <span style={{ height: 36, borderRadius: 8, background: "linear-gradient(180deg,#16241d,#0f2a1e)", border: "1px solid #1f3a2c" }} />
          <span style={{ height: 16, borderRadius: 6, background: "#1a1a1a" }} />
          <span style={{ height: 16, borderRadius: 6, background: "#1a1a1a" }} />
        </div>
        <div style={{ height: 16, borderRadius: 9, background: "#1a1a1a", display: "flex", alignItems: "center", justifyContent: "space-around", padding: "0 7px" }}>
          {[0, 1, 2, 3, 4].map((i) => (
            <span key={i} style={{ width: 5, height: 5, borderRadius: "50%", background: i === 0 ? "#1AFF97" : "#383838" }} />
          ))}
        </div>
      </div>
    </div>
  );
}

function LauncherCard({
  icon,
  title,
  tag,
  desc,
  preview,
  onClick,
}: {
  icon: React.ReactNode;
  title: string;
  tag: string;
  desc: string;
  preview: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="group block w-full rounded-2xl border border-border bg-surface-1 p-6 text-left transition-colors hover:border-border-strong"
    >
      <div className="mb-5 overflow-hidden rounded-xl bg-bg p-3">{preview}</div>
      <div className="flex items-center gap-2.5">
        <span className="text-fg">{icon}</span>
        <h3 className="text-xl font-semibold tracking-tight text-fg">{title}</h3>
        <span className="rounded-pill bg-surface-2 px-2.5 py-1 text-[11px] font-semibold text-muted">{tag}</span>
      </div>
      <p className="mt-2 text-sm leading-relaxed text-muted">{desc}</p>
      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-green">
        Open preview
        <IoArrowForward className="transition-transform group-hover:translate-x-0.5" />
      </span>
    </button>
  );
}

export function PlaygroundLanding({ onOpen }: { onOpen: (v: "web" | "mobile") => void }) {
  return (
    <div className="page-rise">
      <section className="py-14 sm:py-20">
        <p className="text-sm font-medium uppercase tracking-wider text-muted-soft">RateGame</p>
        <h1 className="mt-3 max-w-3xl text-[clamp(2.4rem,6vw,3.8rem)] font-semibold leading-[1.04] tracking-[-0.03em]">
          Playground
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
          Click through living, mock-data prototypes of the RateGame apps — the web app in a
          resizable browser shell, and the mobile app inside real iOS and Android device frames.
        </p>
      </section>

      <div className="grid gap-5 sm:grid-cols-2 max-w-[860px]">
        <LauncherCard
          icon={<IoDesktopOutline size={20} />}
          title="Web"
          tag="Next.js"
          desc="The rategame.io experience with a desktop / tablet / mobile viewport switcher."
          preview={<MiniWeb />}
          onClick={() => onOpen("web")}
        />
        <LauncherCard
          icon={<IoPhonePortraitOutline size={20} />}
          title="Mobile"
          tag="React Native"
          desc="The native app in an iPhone 17 Pro or Pixel 10 Pro frame — toggle iOS and Android."
          preview={<MiniPhone />}
          onClick={() => onOpen("mobile")}
        />
      </div>
    </div>
  );
}
