import type { Metadata } from "next";
import { Syne, DM_Sans, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: {
    default: "Devansh Agrawal — Backend Engineer",
    template: "%s · Devansh Agrawal",
  },
  description:
    "Engineering journal of a backend engineer — scalable systems, multi-tenant platforms, zero-loss migrations, and AI infrastructure. How Devansh Agrawal builds software.",
  keywords: [
    "Backend Engineer",
    "Django",
    "PostgreSQL",
    "System Design",
    "Multi-tenant",
    "RAG",
    "Devansh Agrawal",
  ],
  authors: [{ name: "Devansh Agrawal" }],
  creator: "Devansh Agrawal",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Devansh Agrawal — Backend Engineer",
    description:
      "Production backends, multi-tenant architecture, and AI pipelines — engineered for scale.",
    siteName: "Devansh Agrawal",
  },
  twitter: {
    card: "summary_large_image",
    title: "Devansh Agrawal — Backend Engineer",
    description:
      "Production backends, multi-tenant architecture, and AI pipelines — engineered for scale.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${dmSans.variable} ${jetbrains.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[var(--bg)] text-[var(--fg)]">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
