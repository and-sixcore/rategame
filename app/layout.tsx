import type { Metadata } from "next";
import localFont from "next/font/local";
import { Geist_Mono } from "next/font/google";
import "./globals.css";

// SN Pro (Supernotes, OFL 1.1) — self-hosted variable font.
const snPro = localFont({
  variable: "--font-sn-pro",
  display: "swap",
  src: [
    {
      path: "./fonts/SNPro-Variable.woff2",
      weight: "100 900",
      style: "normal",
    },
    {
      path: "./fonts/SNPro-VariableItalic.woff2",
      weight: "100 900",
      style: "italic",
    },
  ],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "RateGame Design Handbook",
    template: "%s · RateGame Handbook",
  },
  description:
    "How we design RateGame. The process, the files, the philosophy, and the recipes behind the product.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${snPro.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bg text-fg">{children}</body>
    </html>
  );
}
