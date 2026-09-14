"use client";

import React, { useState, useEffect } from "react";
import { Moon, Sun, CheckCircle2, Search, Menu, X, Keyboard, Command } from "lucide-react";

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
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-black text-white font-mono font-bold text-sm dark:bg-white dark:text-black">
              B
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold tracking-tight text-zinc-900 dark:text-white text-base">
                  Backend Engineer Hub
                </span>
              </div>
              <p className="hidden md:block text-[11px] text-zinc-500 dark:text-zinc-400">
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
            className="group flex w-full items-center justify-between rounded-lg border border-zinc-200 bg-zinc-50/70 px-3.5 py-1.5 text-xs text-zinc-500 hover:border-zinc-400 hover:bg-white dark:border-zinc-800 dark:bg-zinc-900/50 dark:text-zinc-400 dark:hover:border-zinc-700 dark:hover:bg-zinc-900 transition-colors shadow-2xs"
          >
            <div className="flex items-center gap-2">
              <Search className="h-3.5 w-3.5 text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors" />
              <span>Quick search topics, capstones, books...</span>
            </div>
            <div className="flex items-center gap-1">
              <kbd className="inline-flex items-center rounded border border-zinc-200 bg-zinc-100 px-1.5 py-0.5 font-mono text-[10px] font-semibold text-zinc-600 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
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
            className="flex h-9 w-9 items-center justify-center rounded-md border border-zinc-200 text-zinc-700 hover:bg-zinc-100 dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-900 transition-colors md:hidden"
            aria-label="Open Command Palette"
            title="Search (Ctrl + K)"
          >
            <Search className="h-4 w-4" />
          </button>

          {/* Progress Pill */}
          <div className="flex items-center gap-2 rounded-md border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs dark:border-zinc-800 dark:bg-zinc-900">
            <CheckCircle2 className="h-4 w-4 text-zinc-700 dark:text-zinc-300" />
            <span className="font-mono font-medium text-zinc-900 dark:text-white">
              {completedCount}/{totalTopics}
            </span>
            <span className="text-zinc-400 dark:text-zinc-600">•</span>
            <span className="font-mono font-bold text-zinc-900 dark:text-white">
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
