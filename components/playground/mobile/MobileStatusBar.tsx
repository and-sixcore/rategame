import { IoCellular, IoWifi, IoBatteryFull } from "react-icons/io5";
import { app } from "@/lib/playground/appTheme";
import { useMobileEnv } from "./env";

/** The OS status bar inside the screen. Center is left clear for the island/punch. */
export function MobileStatusBar() {
  const { platform, tokens } = useMobileEnv();
  const ios = platform === "ios";
  return (
    <div
      style={{
        height: tokens.statusBarHeight,
        flex: "0 0 auto",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "space-between",
        padding: ios ? "0 26px 9px" : "0 18px 8px",
        color: app.text,
        fontFamily: tokens.font,
      }}
    >
      <span
        style={{
          fontSize: ios ? 15 : 13,
          fontWeight: 600,
          letterSpacing: ios ? 0.2 : 0,
        }}
      >
        9:41
      </span>
      <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
        <IoCellular size={ios ? 17 : 15} />
        <IoWifi size={ios ? 17 : 15} />
        <IoBatteryFull size={ios ? 23 : 19} />
      </span>
    </div>
  );
}
