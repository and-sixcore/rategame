import { devices, type DeviceId } from "@/lib/playground/devices";
import { app } from "@/lib/playground/appTheme";

/**
 * Composites screen content into a phone-frame PNG. The frame art has a
 * transparent screen cutout and sits *on top* of the content (so the Dynamic
 * Island / hole-punch overlay the app, like a real device). `children` fill the
 * measured screen rectangle.
 */
export function DeviceFrame({
  device,
  width = 320,
  children,
}: {
  device: DeviceId;
  width?: number;
  children: React.ReactNode;
}) {
  const spec = devices[device];
  const height = (width * spec.frameH) / spec.frameW;
  const s = spec.screen;
  const radius = spec.screenRadius * (width / spec.frameW);

  return (
    <div
      style={{
        position: "relative",
        width,
        height,
        flex: "0 0 auto",
        filter: "drop-shadow(0 24px 48px rgba(0,0,0,0.55))",
      }}
    >
      {/* Screen content — behind the frame */}
      <div
        style={{
          position: "absolute",
          left: `${s.left}%`,
          top: `${s.top}%`,
          width: `${s.width}%`,
          height: `${s.height}%`,
          borderRadius: radius,
          overflow: "hidden",
          background: app.bg,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {children}
      </div>

      {/* Frame art — on top, click-through */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={spec.frame}
        alt={spec.label}
        draggable={false}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          userSelect: "none",
        }}
      />
    </div>
  );
}
