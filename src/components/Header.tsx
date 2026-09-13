"use client";

import React from "react";
import { Moon, Sun, CheckCircle2, Search, ExternalLink, Menu, X, BookOpen } from "lucide-react";
import { CHANNEL_URL, CHANNEL_NAME } from "../data/roadmap";

interface HeaderProps {
  completedCount: number;
  totalTopics: number;
  overallPercentage: number;
  isDark: boolean;
  onToggleTheme: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
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
  onToggleSidebar,
  isSidebarOpen,
}: HeaderProps) {
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
                <a
                  href={CHANNEL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden sm:inline-flex items-center gap-1 rounded-full border border-zinc-200 px-2 py-0.5 text-xs font-medium text-zinc-600 hover:border-zinc-400 dark:border-zinc-800 dark:text-zinc-400 dark:hover:border-zinc-600 transition-colors"
                >
                  <span>{CHANNEL_NAME}</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
              <p className="hidden md:block text-[11px] text-zinc-500 dark:text-zinc-400">
                Principal Engineer Roadmap • Curated Books • Real Practice
              </p>
            </div>
          </div>
        </div>

        {/* Center: Search */}
        <div className="hidden md:flex flex-1 max-w-md mx-6">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
            <input
              type="text"
              placeholder="Search 31 topics, PostgreSQL, Redis, Kafka, Books..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full rounded-md border border-zinc-200 bg-zinc-50/50 py-1.5 pl-9 pr-4 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-400 focus:bg-white focus:outline-none dark:border-zinc-800 dark:bg-zinc-900/50 dark:text-white dark:placeholder:text-zinc-500 dark:focus:border-zinc-600 transition-colors"
            />
          </div>
        </div>

        {/* Right: Progress & Theme Toggle */}
        <div className="flex items-center gap-3">
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

          {/* Theme Toggle Button */}
          <button
            onClick={onToggleTheme}
            className="flex h-9 w-9 items-center justify-center rounded-md border border-zinc-200 text-zinc-700 hover:bg-zinc-100 dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-900 transition-colors"
            title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
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
