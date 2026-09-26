import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Content Room — Synthetic audience simulation",
  description: "Test content with 100 simulated audience members before publishing."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
