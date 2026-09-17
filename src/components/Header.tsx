"use client";

import React, { useState, useEffect } from "react";
import { Moon, Sun, CheckCircle2, Search, Menu, X, Keyboard, ArrowLeft, BookOpen } from "lucide-react";

interface HeaderProps {
  completedCount: number;
  totalTopics: number;
  overallPercentage: number;
  isDark: boolean;
  onToggleTheme: () => void;
  onOpenCommandPalette: () => void;
  onOpenShortcuts: () => void;
  onOpenGuide: () => void;
  onBackToPortfolio?: () => void;
  onToggleSidebar: () => void;
  isSidebarOpen: boolean;
}

export function Header({
  completedCount,
  totalTopics,
  overallPercentage,
  isDark,
  onToggleTheme,
  onOpenCommandPalette,
  onOpenShortcuts,
  onOpenGuide,
  onBackToPortfolio,
  onToggleSidebar,
  isSidebarOpen,
}: HeaderProps) {
  const [isMac, setIsMac] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMac(/(Mac|iPhone|iPod|iPad)/i.test(navigator.platform));
    }
  }, []);

  return (
    <header className="shrink-0 z-40 w-full border-b border-zinc-200 bg-white/95 backdrop-blur-md dark:border-[#2C2A26] dark:bg-[#141312]/95">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left: Brand & Mobile Menu */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleSidebar}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-200 text-zinc-600 hover:bg-zinc-100 dark:border-[#2C2A26] dark:text-[#D5CFBF] dark:hover:bg-[#1F1E1B] lg:hidden"
            aria-label="Toggle Sidebar"
          >
            {isSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          <div className="flex items-center gap-2.5">
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                {onBackToPortfolio ? (
                  <button
                    onClick={onBackToPortfolio}
                    className="font-serif font-bold tracking-tight text-zinc-950 dark:text-[#F3EFE6] text-base sm:text-lg hover:opacity-85 transition-opacity text-left"
                    title="Return to Home"
                  >
                    Backend Engineer Hub
                  </button>
                ) : (
                  <span className="font-serif font-bold tracking-tight text-zinc-950 dark:text-[#F3EFE6] text-base sm:text-lg">
                    Backend Engineer Hub
                  </span>
                )}
                <a
                  href="https://t.me/techyada"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 rounded-md border border-zinc-200/90 bg-stone-50/80 px-2 py-0.5 text-[11px] font-mono font-medium text-zinc-600 hover:text-sky-600 hover:border-sky-300 dark:border-[#2C2A26] dark:bg-[#1A1917] dark:text-[#A19B8F] dark:hover:text-sky-400 dark:hover:border-sky-600 transition-colors shadow-2xs"
                  title="Built by Tech Yada (Telegram Channel)"
                >
                  Built by Tech Yada
                </a>
                {onBackToPortfolio && (
                  <button
                    onClick={onBackToPortfolio}
                    className="inline-flex items-center gap-1 rounded-lg border border-zinc-200 bg-stone-100/80 px-2 py-0.5 text-xs font-mono font-bold text-zinc-700 hover:bg-stone-200 dark:border-[#2C2A26] dark:bg-[#1E1D1A] dark:text-[#D5CFBF] dark:hover:bg-[#25231F] transition-colors shadow-2xs"
                    title="Return to Home"
                  >
                    <ArrowLeft className="h-3 w-3" />
                    <span>Home</span>
                  </button>
                )}
              </div>
              <p className="hidden md:block text-xs font-mono font-medium text-zinc-500 dark:text-[#8E887B]">
                Principal Engineer Roadmap
              </p>
            </div>
          </div>
        </div>

        {/* Center: Command Palette Trigger Button */}
        <div className="hidden md:flex flex-1 max-w-md mx-6">
          <button
            onClick={onOpenCommandPalette}
            type="button"
            className="group flex w-full items-center justify-between rounded-xl border border-zinc-200 bg-stone-50/80 px-4 py-2 text-xs sm:text-[13px] font-medium text-zinc-600 hover:border-zinc-400 hover:bg-white dark:border-[#2C2A26] dark:bg-[#1A1917] dark:text-[#A19B8F] dark:hover:border-[#3D3A34] dark:hover:bg-[#201F1B] transition-all shadow-2xs"
          >
            <div className="flex items-center gap-2.5">
              <Search className="h-4 w-4 text-zinc-400 group-hover:text-zinc-700 dark:group-hover:text-[#F3EFE6] transition-colors" />
              <span>Quick search topics, capstones, books...</span>
            </div>
            <div className="flex items-center gap-1">
              <kbd className="inline-flex items-center rounded-md border border-zinc-200 bg-zinc-100 px-2 py-0.5 font-mono text-[10.5px] font-bold text-zinc-700 dark:border-[#35332D] dark:bg-[#25231F] dark:text-[#D5CFBF]">
                {isMac ? "⌘K" : "Ctrl K"}
              </kbd>
            </div>
          </button>
        </div>

        {/* Right: Progress, Shortcuts & Theme Toggle */}
        <div className="flex items-center gap-2.5">
          {/* Mobile search trigger */}
          <button
            onClick={onOpenCommandPalette}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-200 text-zinc-700 hover:bg-zinc-100 dark:border-[#2C2A26] dark:text-[#EDE8DF] dark:hover:bg-[#1F1E1B] transition-colors md:hidden"
            aria-label="Open Command Palette"
            title="Search (Ctrl + K)"
          >
            <Search className="h-4 w-4" />
          </button>

          {/* Student Orientation & Docs Button */}
          <button
            onClick={onOpenGuide}
            className="flex items-center gap-1.5 rounded-xl border border-zinc-200 bg-stone-50/80 px-2.5 sm:px-3 py-1.5 text-xs font-mono font-bold text-zinc-800 dark:border-[#2C2A26] dark:bg-[#1A1917] dark:text-[#D5CFBF] hover:bg-stone-100 dark:hover:bg-[#22211E] transition-all shadow-2xs group"
            title="Student Documentation & Study Methodology"
          >
            <BookOpen className="h-4 w-4 text-zinc-600 dark:text-[#A19B8F] transition-transform group-hover:scale-110" />
            <span className="hidden sm:inline">Docs</span>
          </button>

          {/* Progress Pill */}
          <div className="flex items-center gap-2 rounded-xl border border-zinc-200 bg-stone-50/90 px-3.5 py-1.5 text-xs sm:text-sm font-semibold dark:border-[#2C2A26] dark:bg-[#1A1917] shadow-2xs">
            <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            <span className="font-mono font-bold text-zinc-950 dark:text-[#F3EFE6]">
              {completedCount}/{totalTopics}
            </span>
            <span className="text-zinc-300 dark:text-zinc-700 font-bold">•</span>
            <span className="font-mono font-extrabold text-zinc-950 dark:text-[#F3EFE6]">
              {overallPercentage}%
            </span>
          </div>

          {/* Keyboard Shortcuts Trigger Button */}
          <button
            onClick={onOpenShortcuts}
            className="hidden sm:flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-200 text-zinc-700 hover:bg-zinc-100 dark:border-[#2C2A26] dark:text-[#EDE8DF] dark:hover:bg-[#1F1E1B] transition-colors"
            title="Keyboard Shortcuts (?)"
            aria-label="View Keyboard Shortcuts"
          >
            <Keyboard className="h-4 w-4" />
          </button>

          {/* Theme Toggle Button */}
          <button
            onClick={onToggleTheme}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-200 text-zinc-700 hover:bg-zinc-100 dark:border-[#2C2A26] dark:text-[#EDE8DF] dark:hover:bg-[#1F1E1B] transition-colors"
            title={isDark ? "Switch to Light Mode (T)" : "Switch to Dark Mode (T)"}
            aria-label="Toggle Theme"
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Linear Progress Bar below header */}
      <div className="h-[2px] w-full bg-zinc-100 dark:bg-[#201F1B] overflow-hidden">
        <div
          className="h-full bg-black dark:bg-[#F3EFE6] transition-all duration-500 ease-out"
          style={{ width: `${overallPercentage}%` }}
        />
      </div>
    </header>
  );
}
