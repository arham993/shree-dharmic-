import type { Metadata, Viewport } from "next";
import "@fontsource/yatra-one/400.css";
import "@fontsource/mukta/400.css";
import "@fontsource/mukta/500.css";
import "@fontsource/mukta/600.css";
import "@fontsource/mukta/700.css";
import "@fontsource/tiro-devanagari-hindi/400.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Shree Dharmic Leela Committee — Become a Member",
  description:
    "Join the Shree Dharmic Leela Committee. Register online, verify your mobile and pay your membership fee securely to support our annual Ramleela.",
};

export const viewport: Viewport = { themeColor: "#e8741c" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
