"use client";

import { useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import { PlaygroundLanding } from "./PlaygroundLanding";
import { MobileShell } from "./MobileShell";
import { WebShell } from "./WebShell";

type View = "home" | "web" | "mobile";

const META: Record<"web" | "mobile", { title: string; blurb: string }> = {
  web: { title: "Web", blurb: "rategame.io — switch desktop, tablet and mobile widths." },
  mobile: { title: "Mobile", blurb: "The native app — toggle between iOS and Android." },
};

export function PlaygroundClient() {
  const [view, setView] = useState<View>("home");

  if (view === "home") return <PlaygroundLanding onOpen={setView} />;

  const meta = META[view];
  return (
    <div className="page-rise py-10">
      <button
        onClick={() => setView("home")}
        className="inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-fg"
      >
        <IoArrowBack size={16} />
        Playground
      </button>

      <div className="mt-4 flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <h1 className="text-3xl font-semibold tracking-tight text-fg">{meta.title}</h1>
        <p className="text-sm text-muted">{meta.blurb}</p>
      </div>

      <div className="mt-8 flex justify-center rounded-2xl border border-border bg-[#0c0d0f] p-6 sm:p-10">
        {view === "mobile" ? <MobileShell /> : <WebShell />}
      </div>
    </div>
  );
}
