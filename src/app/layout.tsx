import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://backend-roadmap.vercel.app"),
  title: {
    default: "Backend Engineering Master Roadmap | Open Learning Hub",
    template: "%s | Backend Roadmap",
  },
  description:
    "An open, production-grade roadmap for backend engineers. 31 modules pairing YouTube video walkthroughs with canonical engineering literature, 124 code implementations, 7 portfolio capstones, and oral exam defense.",
  keywords: [
    "Backend Engineering",
    "Distributed Systems",
    "System Design",
    "Go",
    "TypeScript",
    "Python",
    "Java",
    "Microservices",
    "Database Internals",
    "Concurrency",
    "Kafka",
    "Kubernetes",
    "Cloud Architecture",
    "Roadmap",
  ],
  authors: [{ name: "Yared & Community" }],
  creator: "Yared",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://backend-roadmap.vercel.app",
    title: "Backend Engineering Master Roadmap | Open Learning Hub",
    description:
      "Master backend engineering: 31 exhaustive deep dives, 51 video lectures, 124 multi-language code snippets, and 7 production portfolio capstones.",
    siteName: "Backend Engineering Roadmap",
  },
  twitter: {
    card: "summary_large_image",
    title: "Backend Engineering Master Roadmap | Open Learning Hub",
    description:
      "Master backend engineering: 31 exhaustive deep dives, 51 video lectures, 124 multi-language code snippets, and 7 production portfolio capstones.",
    creator: "@yared",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-white text-zinc-900 antialiased selection:bg-zinc-900 selection:text-white dark:bg-[#111827] dark:text-gray-100 dark:selection:bg-white dark:selection:text-gray-950">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
