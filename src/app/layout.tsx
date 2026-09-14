import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Backend Engineering Master Roadmap | Open Learning Hub",
  description:
    "An open, production-grade roadmap for backend engineers. 31 modules pairing YouTube video walkthroughs with canonical engineering literature and hands-on practice challenges.",
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
      </body>
    </html>
  );
}
