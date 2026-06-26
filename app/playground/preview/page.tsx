"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { DeviceFrame } from "@/components/playground/DeviceFrame";
import { MobilePrototype } from "@/components/playground/mobile/MobilePrototype";
import { WebApp, type Viewport } from "@/components/playground/web/WebApp";
import { DEFAULT_FLOW } from "@/lib/playground/flows";
import { devices, type DeviceId } from "@/lib/playground/devices";

function PreviewInner() {
  const params = useSearchParams();
  const flow = params.get("flow") || DEFAULT_FLOW;

  // Size the mobile frame to its container (ResizeObserver → setState in a
  // callback, not synchronously in the effect body).
  const ref = useRef<HTMLDivElement>(null);
  const [box, setBox] = useState({ w: 0, h: 0 });
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setBox({ w: e.contentRect.width, h: e.contentRect.height }));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  if (params.get("target") === "mobile") {
    const device: DeviceId = params.get("device") === "pixel" ? "pixel" : "iphone";
    const spec = devices[device];
    const width = box.h ? Math.min(460, box.w - 32, ((box.h - 48) * spec.frameW) / spec.frameH) : 0;
    return (
      <div ref={ref} style={{ position: "fixed", inset: 0, display: "grid", placeItems: "center", background: "#0a0a0a" }}>
        {width > 0 && (
          <DeviceFrame device={device} width={width}>
            <MobilePrototype device={device} flowId={flow} />
          </DeviceFrame>
        )}
      </div>
    );
  }

  const v = params.get("vp");
  const vp: Viewport = v === "tablet" || v === "mobile" ? v : "desktop";
  return (
    <div style={{ position: "fixed", inset: 0, background: "#0a0a0a" }}>
      <WebApp viewport={vp} flowId={flow} />
    </div>
  );
}

/** Standalone full-screen preview of a single shell + flow, driven by query params. */
export default function PreviewPage() {
  return (
    <Suspense fallback={<div style={{ position: "fixed", inset: 0, background: "#0a0a0a" }} />}>
      <PreviewInner />
    </Suspense>
  );
}
