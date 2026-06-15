import type { IconType } from "react-icons";
import {
  IoEaselOutline,
  IoChatbubblesOutline,
  IoPhonePortraitOutline,
  IoGlobeOutline,
  IoBulbOutline,
  IoColorPaletteOutline,
  IoCubeOutline,
  IoFlagOutline,
  IoMegaphoneOutline,
  IoShareSocialOutline,
  IoArchiveOutline,
  IoBookOutline,
  IoTelescopeOutline,
  IoFlaskOutline,
  IoBarChartOutline,
  IoDocumentOutline,
} from "react-icons/io5";

// Maps each Figma file to a relevant Ionicon (via react-icons/io5).
export const fileIcons: Record<string, IconType> = {
  Workboard: IoEaselOutline,
  Review: IoChatbubblesOutline,
  App: IoPhonePortraitOutline,
  Web: IoGlobeOutline,
  Ideaboard: IoBulbOutline,
  Foundations: IoColorPaletteOutline,
  Components: IoCubeOutline,
  Flags: IoFlagOutline,
  Promotional: IoMegaphoneOutline,
  Socials: IoShareSocialOutline,
  Archive: IoArchiveOutline,
  Brandbook: IoBookOutline,
  "Product Strategy": IoTelescopeOutline,
  Testing: IoFlaskOutline,
  Analytics: IoBarChartOutline,
};

export const fallbackIcon: IconType = IoDocumentOutline;
