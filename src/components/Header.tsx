"use client";

import React, { useState, useEffect } from "react";
import { Moon, Sun, CheckCircle2, Search, Menu, X, Keyboard, Command, Compass, ArrowLeft } from "lucide-react";

interface HeaderProps {
  completedCount: number;
  totalTopics: number;
  overallPercentage: number;
  isDark: boolean;
  onToggleTheme: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
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
  searchQuery,
  onSearchChange,
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
    <header className="shrink-0 z-40 w-full border-b border-zinc-200 bg-white/95 backdrop-blur-md dark:border-zinc-800 dark:bg-black/95">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left: Brand & Mobile Menu */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleSidebar}
            className="flex h-9 w-9 items-center justify-center rounded-md border border-zinc-200 text-zinc-600 hover:bg-zinc-100 dark:border-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-900 lg:hidden"
            aria-label="Toggle Sidebar"
          >
            {isSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-950 text-white font-mono font-bold text-base dark:bg-white dark:text-zinc-950 shadow-xs">
              B
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold tracking-tight text-zinc-950 dark:text-zinc-50 text-base sm:text-lg">
                  Backend Engineer Hub
                </span>
                {onBackToPortfolio && (
                  <button
                    onClick={onBackToPortfolio}
                    className="hidden sm:inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-zinc-100/80 px-2.5 py-1 text-xs font-bold text-zinc-700 hover:bg-zinc-200 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 transition-colors shadow-2xs"
                    title="Return to Portfolio Homepage"
                  >
                    <ArrowLeft className="h-3.5 w-3.5" />
                    <span>Overview</span>
                  </button>
                )}
              </div>
              <p className="hidden md:block text-xs font-semibold text-zinc-500 dark:text-zinc-400">
                Principal Engineer Roadmap • Curated Books • Real Practice
              </p>
            </div>
          </div>
        </div>

        {/* Center: Command Palette Trigger Button */}
        <div className="hidden md:flex flex-1 max-w-md mx-6">
          <button
            onClick={onOpenCommandPalette}
            type="button"
            className="group flex w-full items-center justify-between rounded-xl border border-zinc-200 bg-zinc-50/80 px-4 py-2 text-xs sm:text-[13px] font-medium text-zinc-600 hover:border-zinc-400 hover:bg-white dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-300 dark:hover:border-zinc-700 dark:hover:bg-zinc-900 transition-all shadow-2xs"
          >
            <div className="flex items-center gap-2.5">
              <Search className="h-4 w-4 text-zinc-400 group-hover:text-zinc-700 dark:group-hover:text-zinc-200 transition-colors" />
              <span>Quick search topics, capstones, books...</span>
            </div>
            <div className="flex items-center gap-1">
              <kbd className="inline-flex items-center rounded-md border border-zinc-200 bg-zinc-100 px-2 py-0.5 font-mono text-[10.5px] font-bold text-zinc-700 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
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
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-200 text-zinc-700 hover:bg-zinc-100 dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-900 transition-colors md:hidden"
            aria-label="Open Command Palette"
            title="Search (Ctrl + K)"
          >
            <Search className="h-4 w-4" />
          </button>

          {/* Student Orientation & Strategy Guide Button */}
          <button
            onClick={onOpenGuide}
            className="flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-zinc-50/80 px-2.5 sm:px-3 py-1.5 text-xs font-bold text-zinc-800 dark:border-zinc-800 dark:bg-zinc-900/80 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all shadow-2xs group"
            title="Roadmap Orientation & Strategy Guide"
          >
            <Compass className="h-4 w-4 text-zinc-600 dark:text-zinc-400 transition-transform group-hover:rotate-45" />
            <span className="hidden sm:inline">Guide</span>
          </button>

          {/* Progress Pill */}
          <div className="flex items-center gap-2 rounded-lg border border-zinc-200 bg-zinc-50/90 px-3.5 py-1.5 text-xs sm:text-sm font-semibold dark:border-zinc-800 dark:bg-zinc-900/80 shadow-2xs">
            <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            <span className="font-mono font-bold text-zinc-950 dark:text-zinc-50">
              {completedCount}/{totalTopics}
            </span>
            <span className="text-zinc-400 dark:text-zinc-600 font-bold">•</span>
            <span className="font-mono font-extrabold text-zinc-950 dark:text-zinc-50">
              {overallPercentage}%
            </span>
          </div>

          {/* Keyboard Shortcuts Trigger Button */}
          <button
            onClick={onOpenShortcuts}
            className="hidden sm:flex h-9 w-9 items-center justify-center rounded-md border border-zinc-200 text-zinc-700 hover:bg-zinc-100 dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-900 transition-colors"
            title="Keyboard Shortcuts (?)"
            aria-label="View Keyboard Shortcuts"
          >
            <Keyboard className="h-4 w-4" />
          </button>

          {/* Theme Toggle Button */}
          <button
            onClick={onToggleTheme}
            className="flex h-9 w-9 items-center justify-center rounded-md border border-zinc-200 text-zinc-700 hover:bg-zinc-100 dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-900 transition-colors"
            title={isDark ? "Switch to Light Mode (T)" : "Switch to Dark Mode (T)"}
            aria-label="Toggle Theme"
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Linear Progress Bar below header */}
      <div className="h-[2px] w-full bg-zinc-100 dark:bg-zinc-900 overflow-hidden">
        <div
          className="h-full bg-black dark:bg-white transition-all duration-500 ease-out"
          style={{ width: `${overallPercentage}%` }}
        />
      </div>
    </header>
  );
}
