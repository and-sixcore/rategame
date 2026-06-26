/**
 * Device-frame geometry + per-platform UI tokens for the mobile playground.
 *
 * The frame PNGs (public/playground/*.png) were processed so the screen area is
 * transparent; `screen` is the cutout rectangle as a percentage of the frame
 * image, measured from the source art.
 */

export type DeviceId = "iphone" | "pixel";
export type Platform = "ios" | "android";

export interface DeviceSpec {
  id: DeviceId;
  platform: Platform;
  label: string;
  short: string;
  frame: string;
  frameW: number;
  frameH: number;
  /** Screen cutout as % of the frame image. */
  screen: { left: number; top: number; width: number; height: number };
  /** Corner radius of the screen content, in px at base render size. */
  screenRadius: number;
}

export const devices: Record<DeviceId, DeviceSpec> = {
  iphone: {
    id: "iphone",
    platform: "ios",
    label: "iPhone 17 Pro",
    short: "iOS",
    frame: "/playground/iphone-frame.png",
    frameW: 499,
    frameH: 1024,
    screen: { left: 4.01, top: 1.66, width: 91.78, height: 96.68 },
    screenRadius: 44,
  },
  pixel: {
    id: "pixel",
    platform: "android",
    label: "Pixel 10 Pro",
    short: "Android",
    frame: "/playground/pixel-frame.png",
    frameW: 486,
    frameH: 1024,
    screen: { left: 4.32, top: 2.05, width: 90.53, height: 95.9 },
    screenRadius: 36,
  },
};

export interface PlatformTokens {
  /** Primary UI font stack. */
  font: string;
  /** Rounded font used for scores (SF Pro Rounded on iOS, SN Pro on Android). */
  scoreFont: string;
  tabBarHeight: number;
  homeIndicator: number;
  tabIconSize: number;
  tabLabelSize: number;
  /** Status bar height inside the screen. */
  statusBarHeight: number;
}

export const platformTokens: Record<Platform, PlatformTokens> = {
  ios: {
    font: "var(--font-sn-pro), ui-sans-serif, system-ui, sans-serif",
    scoreFont: "var(--font-sn-pro), ui-sans-serif, system-ui, sans-serif",
    tabBarHeight: 56,
    homeIndicator: 22,
    tabIconSize: 25,
    tabLabelSize: 11,
    statusBarHeight: 50,
  },
  android: {
    font: "var(--font-sn-pro), ui-sans-serif, system-ui, sans-serif",
    scoreFont: "var(--font-sn-pro), ui-sans-serif, system-ui, sans-serif",
    tabBarHeight: 58,
    homeIndicator: 16,
    tabIconSize: 23,
    tabLabelSize: 10,
    statusBarHeight: 40,
  },
};
