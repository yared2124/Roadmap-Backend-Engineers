import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-zinc-900 dark:bg-[#111827] dark:text-gray-100 p-6 text-center font-sans">
      <h1 className="text-6xl font-black font-mono tracking-tight mb-2">404</h1>
      <h2 className="text-xl font-bold mb-3">Module or Page Not Found</h2>
      <p className="text-sm text-zinc-600 dark:text-gray-400 max-w-md mb-6 leading-relaxed">
        The requested roadmap module or route could not be found. Return to the main roadmap to continue learning.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 rounded-xl bg-zinc-950 px-5 py-2.5 text-xs sm:text-sm font-bold text-white hover:bg-zinc-800 dark:bg-gray-800 dark:text-white dark:border dark:border-gray-700 dark:hover:bg-gray-700 transition-all shadow-xs"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Return to Roadmap</span>
      </Link>
    </div>
  );
}
