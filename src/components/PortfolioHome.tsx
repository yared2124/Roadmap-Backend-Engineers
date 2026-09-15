"use client";

import React from "react";
import {
  ArrowRight,
  Layers,
  Terminal,
  BookOpen,
  Code2,
  FileText,
  Mic,
  CheckCircle2,
  Cpu,
  ShieldCheck,
  Zap,
  Clock,
  Compass,
  Moon,
  Sun,
  ChevronRight,
  Trophy,
  PlayCircle,
  Check,
} from "lucide-react";
import { ROADMAP_PHASES } from "../data/roadmap";
import { CAPSTONE_PROJECTS } from "../data/capstones";
import { RoadmapTopic } from "../types/roadmap";

interface PortfolioHomeProps {
  onEnterRoadmap: (topic?: RoadmapTopic) => void;
  onExploreCapstones: (phaseId?: number) => void;
  onOpenGuide?: () => void;
  isDark: boolean;
  onToggleTheme: () => void;
  completedCount: number;
  totalTopics: number;
}

export function PortfolioHome({
  onEnterRoadmap,
  onExploreCapstones,
  onOpenGuide,
  isDark,
  onToggleTheme,
  completedCount,
  totalTopics,
}: PortfolioHomeProps) {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen w-full bg-white text-zinc-900 dark:bg-[#141312] dark:text-[#F3EFE6] selection:bg-zinc-900 selection:text-white dark:selection:bg-[#F3EFE6] dark:selection:text-[#141312] font-sans transition-colors duration-200">
      {/* 1. Global Navigation Header */}
      <header className="sticky top-0 z-40 w-full border-b border-zinc-200/80 bg-white/90 backdrop-blur-md dark:border-[#2C2A26] dark:bg-[#141312]/90">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Brand Title */}
          <div className="flex items-center gap-3">
            <span className="font-serif font-bold tracking-tight text-zinc-950 dark:text-[#F3EFE6] text-lg sm:text-xl">
              Backend Engineer Hub
            </span>
          </div>

          {/* Center Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-7 text-xs sm:text-sm font-semibold text-zinc-600 dark:text-[#A19B8F]">
            <button
              onClick={() => scrollToSection("how-to-use")}
              className="hover:text-zinc-950 dark:hover:text-[#F3EFE6] transition-colors"
            >
              How It Works
            </button>
            <button
              onClick={() => scrollToSection("curriculum-phases")}
              className="hover:text-zinc-950 dark:hover:text-[#F3EFE6] transition-colors"
            >
              Curriculum
            </button>
            <button
              onClick={() => scrollToSection("study-formula")}
              className="hover:text-zinc-950 dark:hover:text-[#F3EFE6] transition-colors"
            >
              Methodology
            </button>
            <button
              onClick={() => scrollToSection("interview-engine")}
              className="hover:text-zinc-950 dark:hover:text-[#F3EFE6] transition-colors"
            >
              Oral Exams
            </button>
            <button
              onClick={() => scrollToSection("capstone-projects")}
              className="hover:text-zinc-950 dark:hover:text-[#F3EFE6] transition-colors"
            >
              Capstones
            </button>
          </nav>

          {/* Right Action: Theme Toggle & Launch Roadmap */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              onClick={onToggleTheme}
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-200 text-zinc-700 hover:bg-zinc-100 dark:border-[#2C2A26] dark:text-[#EDE8DF] dark:hover:bg-[#1F1E1B] transition-colors"
              aria-label="Toggle Theme"
            >
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>

            {/* Top Right "Roadmap" Action Button */}
            <button
              onClick={() => onEnterRoadmap()}
              className="group flex items-center gap-2 rounded-xl bg-zinc-950 px-4 py-2 text-xs sm:text-sm font-bold text-white shadow-sm hover:bg-zinc-800 dark:bg-[#F3EFE6] dark:text-[#141312] dark:hover:bg-[#EDE8DF] transition-all active:scale-[0.98]"
            >
              <span>Roadmap</span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>
      </header>

      {/* 2. Hero Section with Warm Matte Background & Editorial Typography */}
      <section className="relative overflow-hidden border-b border-zinc-200/80 dark:border-[#2C2A26] bg-linear-to-b from-stone-50/60 via-white to-stone-50/30 dark:from-[#171614] dark:via-[#141312] dark:to-[#141312] py-20 sm:py-28">
        {/* Warm Ambient Subtle Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[950px] h-[400px] bg-gradient-to-tr from-amber-500/5 via-stone-400/5 to-transparent blur-3xl pointer-events-none rounded-full" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center flex flex-col items-center space-y-7">
            
            {/* Top Category / Purpose Pill Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-zinc-300/80 bg-stone-100/80 px-4 py-1.5 text-xs font-mono font-medium text-zinc-800 dark:border-[#35332D] dark:bg-[#1C1B18] dark:text-[#D5CFBF] shadow-2xs">
              <span>Systematic Mastery • Distributed Systems & Backend Engineering</span>
            </div>

            {/* Headline with Editorial Serif Grace */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold tracking-tight text-zinc-950 dark:text-[#F3EFE6] leading-[1.12] max-w-4xl">
              Backend Engineering Roadmap{" "}
              <span className="italic font-normal text-transparent bg-clip-text bg-linear-to-r from-zinc-800 via-zinc-950 to-stone-700 dark:from-amber-100 dark:via-[#F3EFE6] dark:to-stone-300">
                & Systems Architecture
              </span>
            </h1>

            {/* Subtitle / Description in Prominent Recommended Font Size (Matching Screenshot) */}
            <p className="text-lg sm:text-xl md:text-2xl font-serif font-normal text-zinc-700 dark:text-[#EDE8DF] leading-relaxed max-w-3xl mx-auto">
              A comprehensive, production-grade learning system designed to bridge the gap between building toy APIs and architecting resilient, high-throughput distributed systems.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <button
                onClick={() => onEnterRoadmap()}
                className="group flex items-center gap-2.5 rounded-xl bg-zinc-950 px-7 py-4 text-sm sm:text-base font-bold text-white shadow-lg shadow-zinc-950/15 hover:bg-zinc-800 dark:bg-[#F3EFE6] dark:text-[#141312] dark:hover:bg-white dark:shadow-black/40 transition-all active:scale-[0.98]"
              >
                <span>Start Learning Now</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={() => scrollToSection("how-to-use")}
                className="flex items-center gap-2 rounded-xl border border-zinc-300 bg-white/90 px-6 py-4 text-sm sm:text-base font-semibold text-zinc-900 hover:bg-zinc-50 dark:border-[#2C2A26] dark:bg-[#1A1917] dark:text-[#F3EFE6] dark:hover:bg-[#22211D] transition-colors shadow-2xs"
              >
                <Compass className="h-4 w-4 text-zinc-500 dark:text-[#A19B8F]" />
                <span>How It Works</span>
              </button>

              <button
                onClick={() => scrollToSection("curriculum-phases")}
                className="flex items-center gap-2 rounded-xl border border-zinc-200 bg-stone-100/80 px-5 py-4 text-sm sm:text-base font-medium text-zinc-700 hover:bg-stone-200 dark:border-[#2C2A26] dark:bg-[#1E1D1A] dark:text-[#D5CFBF] dark:hover:bg-[#25231F] transition-colors shadow-2xs"
              >
                <span>Explore 7 Phases</span>
              </button>
            </div>

            {/* Editorial Feature Badges Row */}
            <div className="flex flex-wrap items-center justify-center gap-2.5 pt-2 text-xs text-zinc-600 dark:text-[#A19B8F] font-medium">
              <span className="inline-flex items-center gap-1.5 rounded-md bg-stone-100 dark:bg-[#1C1B18] border border-zinc-200/80 dark:border-[#2C2A26] px-3 py-1">
                <Check className="h-3 w-3 text-zinc-700 dark:text-[#D5CFBF]" />
                Zero Toy Frameworks
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-md bg-stone-100 dark:bg-[#1C1B18] border border-zinc-200/80 dark:border-[#2C2A26] px-3 py-1">
                <Check className="h-3 w-3 text-zinc-700 dark:text-[#D5CFBF]" />
                Authoritative Literature (DDIA, Fowler)
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-md bg-stone-100 dark:bg-[#1C1B18] border border-zinc-200/80 dark:border-[#2C2A26] px-3 py-1">
                <Check className="h-3 w-3 text-zinc-700 dark:text-[#D5CFBF]" />
                Whiteboard Oral Exam Simulator
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-md bg-stone-100 dark:bg-[#1C1B18] border border-zinc-200/80 dark:border-[#2C2A26] px-3 py-1">
                <Check className="h-3 w-3 text-zinc-700 dark:text-[#D5CFBF]" />
                7 Verifiable Capstones
              </span>
            </div>

            {/* Progress Bar indicator if user already has progress */}
            {completedCount > 0 && (
              <div className="inline-flex items-center gap-3 rounded-2xl border border-zinc-300 dark:border-[#2C2A26] bg-stone-50 dark:bg-[#1A1917] p-3.5 text-xs font-mono font-semibold">
                <CheckCircle2 className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                <span>
                  Your Progress: {completedCount} of {totalTopics} modules completed (
                  {Math.round((completedCount / totalTopics) * 100)}%)
                </span>
                <button
                  onClick={() => onEnterRoadmap()}
                  className="text-zinc-900 dark:text-[#F3EFE6] underline font-bold"
                >
                  Resume →
                </button>
              </div>
            )}
          </div>

          {/* Key Metric Stats Grid in Warm Matte Finish */}
          <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 border-t border-zinc-200/80 pt-12 dark:border-[#2C2A26]">
            {/* Stat 1 */}
            <div className="rounded-2xl border border-zinc-200/80 bg-white/80 dark:border-[#2C2A26] dark:bg-[#1A1917] p-5 text-center shadow-2xs hover:border-zinc-400 dark:hover:border-[#3D3A34] transition-colors">
              <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-lg bg-stone-100 text-zinc-700 dark:bg-[#25231F] dark:text-[#D5CFBF] mb-2">
                <Layers className="h-4 w-4" />
              </div>
              <span className="block font-mono text-3xl sm:text-4xl font-bold text-zinc-950 dark:text-[#F3EFE6]">
                07
              </span>
              <span className="text-xs sm:text-sm font-serif font-medium text-zinc-600 dark:text-[#A19B8F]">
                Architectural Phases
              </span>
            </div>

            {/* Stat 2 */}
            <div className="rounded-2xl border border-zinc-200/80 bg-white/80 dark:border-[#2C2A26] dark:bg-[#1A1917] p-5 text-center shadow-2xs hover:border-zinc-400 dark:hover:border-[#3D3A34] transition-colors">
              <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-lg bg-stone-100 text-zinc-700 dark:bg-[#25231F] dark:text-[#D5CFBF] mb-2">
                <Cpu className="h-4 w-4" />
              </div>
              <span className="block font-mono text-3xl sm:text-4xl font-bold text-zinc-950 dark:text-[#F3EFE6]">
                31
              </span>
              <span className="text-xs sm:text-sm font-serif font-medium text-zinc-600 dark:text-[#A19B8F]">
                Production Deep Dives
              </span>
            </div>

            {/* Stat 3 */}
            <div className="rounded-2xl border border-zinc-200/80 bg-white/80 dark:border-[#2C2A26] dark:bg-[#1A1917] p-5 text-center shadow-2xs hover:border-zinc-400 dark:hover:border-[#3D3A34] transition-colors">
              <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-lg bg-stone-100 text-zinc-700 dark:bg-[#25231F] dark:text-[#D5CFBF] mb-2">
                <Mic className="h-4 w-4" />
              </div>
              <span className="block font-mono text-3xl sm:text-4xl font-bold text-zinc-950 dark:text-[#F3EFE6]">
                93
              </span>
              <span className="text-xs sm:text-sm font-serif font-medium text-zinc-600 dark:text-[#A19B8F]">
                Whiteboard Oral Questions
              </span>
            </div>

            {/* Stat 4 */}
            <div className="rounded-2xl border border-zinc-200/80 bg-white/80 dark:border-[#2C2A26] dark:bg-[#1A1917] p-5 text-center shadow-2xs hover:border-zinc-400 dark:hover:border-[#3D3A34] transition-colors">
              <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-lg bg-stone-100 text-zinc-700 dark:bg-[#25231F] dark:text-[#D5CFBF] mb-2">
                <Trophy className="h-4 w-4" />
              </div>
              <span className="block font-mono text-3xl sm:text-4xl font-bold text-zinc-950 dark:text-[#F3EFE6]">
                07
              </span>
              <span className="text-xs sm:text-sm font-serif font-medium text-zinc-600 dark:text-[#A19B8F]">
                Portfolio Capstones
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 2.5. Platform Introduction & Step-by-Step User Orientation Guide */}
      <section id="how-to-use" className="py-20 sm:py-28 border-b border-zinc-200/80 dark:border-[#2C2A26] bg-white dark:bg-[#141312]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-3xl space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-zinc-300 dark:border-[#2C2A26] bg-stone-100 dark:bg-[#1A1917] px-3.5 py-1 text-xs font-mono font-bold uppercase tracking-wider text-zinc-800 dark:text-[#D5CFBF]">
                <Compass className="h-3.5 w-3.5 text-zinc-700 dark:text-[#D5CFBF]" />
                <span>Platform Introduction & User Guide</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold tracking-tight text-zinc-950 dark:text-[#F3EFE6]">
                How to Use This Learning Platform: Full Step-by-Step Guide
              </h2>
              <p className="text-base sm:text-lg font-serif text-zinc-600 dark:text-[#DDD7CD] leading-relaxed">
                Welcome to the Backend Engineering Hub. This platform was engineered from first principles to take you from writing basic APIs to designing resilient, mission-critical distributed systems. Here is your complete guide to navigating and getting the most out of every feature.
              </p>
            </div>

            {onOpenGuide && (
              <button
                onClick={onOpenGuide}
                className="inline-flex items-center gap-2 rounded-xl border border-zinc-300 dark:border-[#2C2A26] bg-stone-50 dark:bg-[#1A1917] px-5 py-3 text-xs sm:text-sm font-mono font-bold text-zinc-900 dark:text-[#F3EFE6] hover:bg-stone-100 dark:hover:bg-[#22211E] transition-colors shrink-0 shadow-2xs"
              >
                <BookOpen className="h-4 w-4 text-zinc-600 dark:text-[#D5CFBF]" />
                <span>Open Detailed Orientation Modal</span>
              </button>
            )}
          </div>

          {/* 5 Sequential Onboarding Steps */}
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            
            {/* Step 1 */}
            <div className="rounded-2xl border border-zinc-200/90 bg-stone-50/40 p-6 dark:border-[#2C2A26] dark:bg-[#1A1917] space-y-3.5">
              <div className="flex items-center justify-between">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-950 text-white dark:bg-[#F3EFE6] dark:text-[#141312] font-mono font-bold text-xs shadow-xs">
                  01
                </span>
                <span className="font-mono text-xs font-semibold text-zinc-500 dark:text-[#8E887B]">
                  Step 1 • Navigation
                </span>
              </div>
              <h3 className="font-serif font-bold text-lg text-zinc-950 dark:text-[#F3EFE6]">
                Explore the 7 Sequential Phases
              </h3>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-[#A19B8F] leading-relaxed font-sans">
                The curriculum is divided into 7 sequential phases—from Network Sockets & Wire Protocols to Multi-Region Distributed Consensus. Start from Phase 01 or jump to any topic using the left sidebar or the global command palette (<kbd className="font-mono px-1.5 py-0.5 rounded bg-zinc-200 dark:bg-[#262420] text-[11px]">⌘K</kbd> / <kbd className="font-mono px-1.5 py-0.5 rounded bg-zinc-200 dark:bg-[#262420] text-[11px]">Ctrl+K</kbd>).
              </p>
            </div>

            {/* Step 2 */}
            <div className="rounded-2xl border border-zinc-200/90 bg-stone-50/40 p-6 dark:border-[#2C2A26] dark:bg-[#1A1917] space-y-3.5">
              <div className="flex items-center justify-between">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-950 text-white dark:bg-[#F3EFE6] dark:text-[#141312] font-mono font-bold text-xs shadow-xs">
                  02
                </span>
                <span className="font-mono text-xs font-semibold text-zinc-500 dark:text-[#8E887B]">
                  Step 2 • Daily Study
                </span>
              </div>
              <h3 className="font-serif font-bold text-lg text-zinc-950 dark:text-[#F3EFE6]">
                Follow the 5-Stage Study Routine
              </h3>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-[#A19B8F] leading-relaxed font-sans">
                Inside each module, execute the complete learning pipeline: watch the 30–60m canonical video lecture, read the assigned chapters from DDIA (Kleppmann) and Fowler, trace the live visual latency flowchart, inspect polyglot code (Go, TS, Python, Java), and solve the practice challenges.
              </p>
            </div>

            {/* Step 3 */}
            <div className="rounded-2xl border border-zinc-200/90 bg-stone-50/40 p-6 dark:border-[#2C2A26] dark:bg-[#1A1917] space-y-3.5">
              <div className="flex items-center justify-between">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-950 text-white dark:bg-[#F3EFE6] dark:text-[#141312] font-mono font-bold text-xs shadow-xs">
                  03
                </span>
                <span className="font-mono text-xs font-semibold text-zinc-500 dark:text-[#8E887B]">
                  Step 3 • Whiteboard Exam
                </span>
              </div>
              <h3 className="font-serif font-bold text-lg text-zinc-950 dark:text-[#F3EFE6]">
                Simulate Oral Whiteboard Defense
              </h3>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-[#A19B8F] leading-relaxed font-sans">
                Senior engineering interviews are won out loud. Click the &ldquo;Mock Oral Exam&rdquo; button on any topic to launch a 75-second countdown timer. Speak your architectural answer out loud following the <span className="font-mono font-bold text-zinc-800 dark:text-[#F3EFE6]">[WHAT]</span>, <span className="font-mono font-bold text-zinc-800 dark:text-[#F3EFE6]">[WHY]</span>, and <span className="font-mono font-bold text-zinc-800 dark:text-[#F3EFE6]">[HOW]</span> structure, then self-grade against the official Staff rubric.
              </p>
            </div>

            {/* Step 4 */}
            <div className="rounded-2xl border border-zinc-200/90 bg-stone-50/40 p-6 dark:border-[#2C2A26] dark:bg-[#1A1917] space-y-3.5">
              <div className="flex items-center justify-between">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-950 text-white dark:bg-[#F3EFE6] dark:text-[#141312] font-mono font-bold text-xs shadow-xs">
                  04
                </span>
                <span className="font-mono text-xs font-semibold text-zinc-500 dark:text-[#8E887B]">
                  Step 4 • Production Capstones
                </span>
              </div>
              <h3 className="font-serif font-bold text-lg text-zinc-950 dark:text-[#F3EFE6]">
                Build 7 Production-Grade Capstones
              </h3>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-[#A19B8F] leading-relaxed font-sans">
                Each curriculum phase culminates in a portfolio capstone designed for your public GitHub. Review the architectural specs, implement the verifiable benchmark suites, and record your GitHub repository URL to prove production competence to hiring managers.
              </p>
            </div>

            {/* Step 5 */}
            <div className="rounded-2xl border border-zinc-200/90 bg-stone-50/40 p-6 dark:border-[#2C2A26] dark:bg-[#1A1917] space-y-3.5">
              <div className="flex items-center justify-between">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-950 text-white dark:bg-[#F3EFE6] dark:text-[#141312] font-mono font-bold text-xs shadow-xs">
                  05
                </span>
                <span className="font-mono text-xs font-semibold text-zinc-500 dark:text-[#8E887B]">
                  Step 5 • Notes & Retention
                </span>
              </div>
              <h3 className="font-serif font-bold text-lg text-zinc-950 dark:text-[#F3EFE6]">
                Synthesize & Export Personal Notes
              </h3>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-[#A19B8F] leading-relaxed font-sans">
                Open the slide-over Notes Studio on any topic to document edge cases and architectural tradeoffs. When you are done, export all your notes as a consolidated, publication-ready Markdown handbook with one click.
              </p>
            </div>

            {/* Step 6: Quick Action Jump */}
            <div className="rounded-2xl border border-zinc-300 dark:border-[#35332D] bg-stone-100/70 dark:bg-[#201F1B] p-6 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-[#A19B8F]">
                  Ready to Begin?
                </span>
                <h3 className="font-serif font-bold text-lg text-zinc-950 dark:text-[#F3EFE6]">
                  Launch Interactive Roadmap
                </h3>
                <p className="text-xs sm:text-sm text-zinc-600 dark:text-[#A19B8F] leading-relaxed">
                  Start immediately with Topic #01: Network Sockets, TCP/UDP Wire Mechanics, and Packet Journeys.
                </p>
              </div>

              <button
                onClick={() => onEnterRoadmap()}
                className="group/start flex w-full items-center justify-center gap-2 rounded-xl bg-zinc-950 py-3 text-xs sm:text-sm font-bold text-white hover:bg-zinc-800 dark:bg-[#F3EFE6] dark:text-[#141312] dark:hover:bg-white transition-all shadow-md active:scale-[0.98]"
              >
                <span>Enter Topic #01 Now</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover/start:translate-x-1" />
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* 3. The 5-Stage Engineering Study Formula */}
      <section id="study-formula" className="py-20 sm:py-28 border-b border-zinc-200/80 dark:border-[#2C2A26] bg-stone-50/40 dark:bg-[#161513]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* Section Heading with Inspiring Editorial Typography */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-3xl space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-zinc-300 dark:border-[#2C2A26] bg-white dark:bg-[#1A1917] px-3.5 py-1 text-xs font-mono font-bold uppercase tracking-wider text-zinc-800 dark:text-[#D5CFBF]">
                <Zap className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400" />
                <span>Pedagogical Architecture</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold tracking-tight text-zinc-950 dark:text-[#F3EFE6]">
                The 5-Stage Engineering Study Lifecycle
              </h2>
              <p className="text-base sm:text-lg font-serif text-zinc-600 dark:text-[#DDD7CD] leading-relaxed">
                Engineers don&apos;t master distributed systems by passively skimming slides. Every single module follows a rigorous 5-step cognitive pipeline designed to build authentic mental models, debate trade-offs, and prove production implementation.
              </p>
            </div>

            {/* Quick Link into Roadmap */}
            <button
              onClick={() => onEnterRoadmap()}
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-zinc-950 dark:text-[#F3EFE6] hover:underline shrink-0 font-mono"
            >
              <span>Experience the 5 stages</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          {/* 5-Step Connected Cards Grid in Warm Dark Palette */}
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            
            {/* Stage 1: Video Masterclass */}
            <div className="group relative flex flex-col justify-between rounded-2xl border border-zinc-200/90 bg-white p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 dark:border-[#2C2A26] dark:bg-[#1A1917] dark:hover:border-[#3D3A34]">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-zinc-950 text-white dark:bg-[#F3EFE6] dark:text-[#141312] font-mono font-bold text-sm shadow-sm">
                    01
                  </div>
                  <span className="rounded-full bg-stone-100 dark:bg-[#25231F] px-2.5 py-0.5 font-mono text-[10.5px] font-bold text-zinc-800 dark:text-[#D5CFBF] border border-zinc-200 dark:border-[#35332D]">
                    30–60m Video
                  </span>
                </div>

                <div className="flex items-center gap-2 text-zinc-700 dark:text-[#D5CFBF]">
                  <PlayCircle className="h-4 w-4" />
                  <span className="font-mono text-xs font-bold uppercase tracking-wider">
                    Foundation
                  </span>
                </div>

                <h3 className="font-serif font-bold text-base text-zinc-950 dark:text-[#F3EFE6] leading-snug">
                  Canonical Video Masterclass
                </h3>

                <p className="text-xs text-zinc-600 dark:text-[#A19B8F] leading-relaxed">
                  High-yield lectures dissecting architectural intent, protocols, and underlying systems mechanics before touching code.
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-zinc-100 dark:border-[#262420]">
                <span className="inline-block text-[11px] font-mono font-semibold text-zinc-700 dark:text-[#D5CFBF]">
                  • Mental Models & Protocols
                </span>
              </div>
            </div>

            {/* Stage 2: Authoritative Literature */}
            <div className="group relative flex flex-col justify-between rounded-2xl border border-zinc-200/90 bg-white p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 dark:border-[#2C2A26] dark:bg-[#1A1917] dark:hover:border-[#3D3A34]">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-zinc-950 text-white dark:bg-[#F3EFE6] dark:text-[#141312] font-mono font-bold text-sm shadow-sm">
                    02
                  </div>
                  <span className="rounded-full bg-stone-100 dark:bg-[#25231F] px-2.5 py-0.5 font-mono text-[10.5px] font-bold text-zinc-800 dark:text-[#D5CFBF] border border-zinc-200 dark:border-[#35332D]">
                    Core Reading
                  </span>
                </div>

                <div className="flex items-center gap-2 text-zinc-700 dark:text-[#D5CFBF]">
                  <BookOpen className="h-4 w-4" />
                  <span className="font-mono text-xs font-bold uppercase tracking-wider">
                    Literature
                  </span>
                </div>

                <h3 className="font-serif font-bold text-base text-zinc-950 dark:text-[#F3EFE6] leading-snug">
                  Authoritative Literature
                </h3>

                <p className="text-xs text-zinc-600 dark:text-[#A19B8F] leading-relaxed">
                  Curated chapters from foundational texts: Martin Kleppmann (DDIA), Martin Fowler, and Ilya Grigorik.
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-zinc-100 dark:border-[#262420]">
                <span className="inline-block text-[11px] font-mono font-semibold text-zinc-700 dark:text-[#D5CFBF]">
                  • Peer-Reviewed Citations
                </span>
              </div>
            </div>

            {/* Stage 3: Visual Architecture Flow */}
            <div className="group relative flex flex-col justify-between rounded-2xl border border-zinc-200/90 bg-white p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 dark:border-[#2C2A26] dark:bg-[#1A1917] dark:hover:border-[#3D3A34]">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-zinc-950 text-white dark:bg-[#F3EFE6] dark:text-[#141312] font-mono font-bold text-sm shadow-sm">
                    03
                  </div>
                  <span className="rounded-full bg-stone-100 dark:bg-[#25231F] px-2.5 py-0.5 font-mono text-[10.5px] font-bold text-zinc-800 dark:text-[#D5CFBF] border border-zinc-200 dark:border-[#35332D]">
                    Flowchart
                  </span>
                </div>

                <div className="flex items-center gap-2 text-zinc-700 dark:text-[#D5CFBF]">
                  <Cpu className="h-4 w-4" />
                  <span className="font-mono text-xs font-bold uppercase tracking-wider">
                    Systems Flow
                  </span>
                </div>

                <h3 className="font-serif font-bold text-base text-zinc-950 dark:text-[#F3EFE6] leading-snug">
                  Visual Architecture Flow
                </h3>

                <p className="text-xs text-zinc-600 dark:text-[#A19B8F] leading-relaxed">
                  Interactive flowcharts mapping client, gateway, cache, database, and dead-letter queues with microsecond latencies.
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-zinc-100 dark:border-[#262420]">
                <span className="inline-block text-[11px] font-mono font-semibold text-zinc-700 dark:text-[#D5CFBF]">
                  • Latency & Recovery Paths
                </span>
              </div>
            </div>

            {/* Stage 4: Polyglot Code Blueprints */}
            <div className="group relative flex flex-col justify-between rounded-2xl border border-zinc-200/90 bg-white p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 dark:border-[#2C2A26] dark:bg-[#1A1917] dark:hover:border-[#3D3A34]">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-zinc-950 text-white dark:bg-[#F3EFE6] dark:text-[#141312] font-mono font-bold text-sm shadow-sm">
                    04
                  </div>
                  <span className="rounded-full bg-stone-100 dark:bg-[#25231F] px-2.5 py-0.5 font-mono text-[10.5px] font-bold text-zinc-800 dark:text-[#D5CFBF] border border-zinc-200 dark:border-[#35332D]">
                    Polyglot
                  </span>
                </div>

                <div className="flex items-center gap-2 text-zinc-700 dark:text-[#D5CFBF]">
                  <Code2 className="h-4 w-4" />
                  <span className="font-mono text-xs font-bold uppercase tracking-wider">
                    Code Patterns
                  </span>
                </div>

                <h3 className="font-serif font-bold text-base text-zinc-950 dark:text-[#F3EFE6] leading-snug">
                  Polyglot Code Blueprints
                </h3>

                <p className="text-xs text-zinc-600 dark:text-[#A19B8F] leading-relaxed">
                  Production implementations switchable across Node.js, Go, Python, and Java with clean dependency layers.
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-zinc-100 dark:border-[#262420]">
                <span className="inline-block text-[11px] font-mono font-semibold text-zinc-700 dark:text-[#D5CFBF]">
                  • Go • TS • Python • Java
                </span>
              </div>
            </div>

            {/* Stage 5: Systems Note Studio */}
            <div className="group relative flex flex-col justify-between rounded-2xl border border-zinc-200/90 bg-white p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 dark:border-[#2C2A26] dark:bg-[#1A1917] dark:hover:border-[#3D3A34]">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-zinc-950 text-white dark:bg-[#F3EFE6] dark:text-[#141312] font-mono font-bold text-sm shadow-sm">
                    05
                  </div>
                  <span className="rounded-full bg-stone-100 dark:bg-[#25231F] px-2.5 py-0.5 font-mono text-[10.5px] font-bold text-zinc-800 dark:text-[#D5CFBF] border border-zinc-200 dark:border-[#35332D]">
                    Synthesis
                  </span>
                </div>

                <div className="flex items-center gap-2 text-zinc-700 dark:text-[#D5CFBF]">
                  <FileText className="h-4 w-4" />
                  <span className="font-mono text-xs font-bold uppercase tracking-wider">
                    Retention
                  </span>
                </div>

                <h3 className="font-serif font-bold text-base text-zinc-950 dark:text-[#F3EFE6] leading-snug">
                  Systems Note Studio
                </h3>

                <p className="text-xs text-zinc-600 dark:text-[#A19B8F] leading-relaxed">
                  Markdown notes editor with senior templates for documenting trade-offs, edge cases, and exporting master cheat-sheets.
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-zinc-100 dark:border-[#262420]">
                <span className="inline-block text-[11px] font-mono font-semibold text-zinc-700 dark:text-[#D5CFBF]">
                  • Senior Trade-off Rubrics
                </span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. Whiteboard Oral Interview Engine */}
      <section id="interview-engine" className="py-20 sm:py-28 border-b border-zinc-200/80 dark:border-[#2C2A26] bg-white dark:bg-[#141312]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-zinc-300 dark:border-[#2C2A26] bg-stone-100 dark:bg-[#1A1917] px-3.5 py-1 text-xs font-mono font-bold uppercase tracking-wider text-zinc-800 dark:text-[#D5CFBF]">
                <Mic className="h-3.5 w-3.5 text-zinc-700 dark:text-[#D5CFBF]" />
                <span>Executive Technical Communication</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold tracking-tight text-zinc-950 dark:text-[#F3EFE6]">
                Senior Technical Whiteboard & Oral Exam Simulator
              </h2>

              <p className="text-base sm:text-lg font-serif text-zinc-600 dark:text-[#DDD7CD] leading-relaxed">
                Senior and Staff candidates stand out not by typing trivial syntax, but by articulating architectural trade-offs aloud under realistic time constraints.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3.5">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-zinc-950 text-white dark:bg-[#F3EFE6] dark:text-[#141312] font-mono text-xs font-bold shadow-xs">
                    1
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-zinc-900 dark:text-[#F3EFE6]">
                      [WHAT] The Core Abstraction & Mental Model
                    </h4>
                    <p className="text-xs text-zinc-600 dark:text-[#A19B8F] mt-0.5">
                      State the architectural definition and purpose in two crisp sentences without hesitation.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-zinc-950 text-white dark:bg-[#F3EFE6] dark:text-[#141312] font-mono text-xs font-bold shadow-xs">
                    2
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-zinc-900 dark:text-[#F3EFE6]">
                      [WHY] Trade-offs, Latency & Failure Modes
                    </h4>
                    <p className="text-xs text-zinc-600 dark:text-[#A19B8F] mt-0.5">
                      Contrast against alternatives, quantify disk vs memory I/O latency, and state engineering compromises.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-zinc-950 text-white dark:bg-[#F3EFE6] dark:text-[#141312] font-mono text-xs font-bold shadow-xs">
                    3
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-zinc-900 dark:text-[#F3EFE6]">
                      [HOW] Production Hardening & Edge Cases
                    </h4>
                    <p className="text-xs text-zinc-600 dark:text-[#A19B8F] mt-0.5">
                      Address concurrency races, cache stampedes, distributed mutex leases, and recovery fallbacks.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Simulation Preview Window Card */}
            <div className="lg:col-span-6 rounded-2xl border border-zinc-200/90 bg-stone-50/50 p-6 sm:p-7 shadow-lg dark:border-[#2C2A26] dark:bg-[#1A1917] space-y-5">
              
              {/* Window Header */}
              <div className="flex items-center justify-between border-b border-zinc-200/80 dark:border-[#262420] pb-3">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-zinc-400 dark:bg-zinc-600" />
                    <span className="h-2.5 w-2.5 rounded-full bg-zinc-400 dark:bg-zinc-600" />
                    <span className="h-2.5 w-2.5 rounded-full bg-zinc-400 dark:bg-zinc-600" />
                  </div>
                  <span className="font-mono text-xs font-bold text-zinc-700 dark:text-[#D5CFBF] ml-2">
                    ACTIVE ORAL SIMULATOR
                  </span>
                </div>
                
                <span className="font-mono text-xs font-bold text-zinc-700 dark:text-[#D5CFBF]">
                  ⏱️ 75s Countdown
                </span>
              </div>

              {/* Sample Question Box with Recommended Font Size and Editorial Serif */}
              <div className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-[#2C2A26] dark:bg-[#141312] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="inline-block px-2.5 py-0.5 rounded text-[10.5px] font-mono font-bold bg-stone-100 text-zinc-800 dark:bg-[#25231F] dark:text-[#D5CFBF] border border-zinc-200 dark:border-[#35332D]">
                    [WHY CATEGORY]
                  </span>
                  <span className="text-[11px] font-mono text-zinc-500 dark:text-[#8E887B]">
                    Topic #07 • Write Paths
                  </span>
                </div>
                
                <p className="text-base sm:text-lg font-serif font-medium text-zinc-900 dark:text-[#F3EFE6] leading-relaxed">
                  &ldquo;Why is an append-only WAL (Write-Ahead Log) preferred over in-place B-Tree updates for high-throughput database writes?&rdquo;
                </p>
              </div>

              {/* Simulation Visual Feedback */}
              <div className="flex items-center justify-between pt-1">
                <span className="text-xs font-mono text-zinc-500 dark:text-[#8E887B]">
                  Self-Grading: Mastered • Partial • Missed
                </span>
                
                <button
                  onClick={() => onEnterRoadmap()}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-zinc-950 px-4 py-2 text-xs font-bold text-white hover:bg-zinc-800 dark:bg-[#F3EFE6] dark:text-[#141312] dark:hover:bg-white transition-colors shadow-xs"
                >
                  <Terminal className="h-3.5 w-3.5" />
                  <span>Try Simulator</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. The 7 Curriculum Phases */}
      <section id="curriculum-phases" className="py-20 sm:py-28 border-b border-zinc-200/80 dark:border-[#2C2A26] bg-stone-50/40 dark:bg-[#161513]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="max-w-2xl space-y-2">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-[#A19B8F]">
                Curriculum Progression
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold tracking-tight text-zinc-950 dark:text-[#F3EFE6]">
                7 Architectural Phases • 31 Core Modules
              </h2>
              <p className="text-sm sm:text-base font-serif text-zinc-600 dark:text-[#DDD7CD]">
                Structured in sequential order from network wire physics to enterprise cloud orchestration.
              </p>
            </div>

            <button
              onClick={() => onEnterRoadmap()}
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-zinc-950 dark:text-[#F3EFE6] hover:underline shrink-0 font-mono"
            >
              <span>View All 31 Modules</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {ROADMAP_PHASES.map((phase) => (
              <div
                key={phase.id}
                className="flex flex-col justify-between rounded-2xl border border-zinc-200/90 bg-white p-6 hover:border-zinc-400 dark:border-[#2C2A26] dark:bg-[#1A1917] dark:hover:border-[#3D3A34] transition-all shadow-xs hover:shadow-md duration-300"
              >
                <div className="space-y-3.5">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold tracking-wider text-zinc-900 dark:text-[#F3EFE6] bg-stone-100 dark:bg-[#25231F] px-2.5 py-1 rounded-md border border-zinc-200 dark:border-[#35332D]">
                      PHASE 0{phase.id}
                    </span>
                    <span className="font-mono text-xs font-semibold text-zinc-400 dark:text-[#8E887B]">
                      {phase.topics.length} Modules
                    </span>
                  </div>

                  <h3 className="font-serif font-bold text-lg text-zinc-950 dark:text-[#F3EFE6]">
                    {phase.name}
                  </h3>

                  <p className="text-xs text-zinc-600 dark:text-[#A19B8F] leading-relaxed font-sans">
                    {phase.description}
                  </p>

                  <div className="border-t border-zinc-100 dark:border-[#262420] pt-3 space-y-1.5">
                    {phase.topics.slice(0, 3).map((topic) => (
                      <button
                        key={topic.id}
                        onClick={() => onEnterRoadmap(topic)}
                        className="group flex w-full items-center justify-between text-left text-xs font-semibold text-zinc-700 dark:text-[#D5CFBF] hover:text-zinc-950 dark:hover:text-[#F3EFE6] transition-colors"
                      >
                        <span className="truncate pr-2">
                          #{String(topic.number).padStart(2, "0")} {topic.title}
                        </span>
                        <ChevronRight className="h-3 w-3 text-zinc-400 transition-transform group-hover:translate-x-0.5" />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-zinc-100 dark:border-[#262420]">
                  <button
                    onClick={() => onEnterRoadmap(phase.topics[0])}
                    className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-stone-100 py-2.5 text-xs font-bold text-zinc-900 hover:bg-zinc-950 hover:text-white dark:bg-[#22211E] dark:text-[#EDE8DF] dark:hover:bg-[#F3EFE6] dark:hover:text-[#141312] transition-all shadow-2xs"
                  >
                    <span>Enter Phase 0{phase.id}</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. The 7 Production Portfolio Capstone Projects */}
      <section id="capstone-projects" className="py-20 sm:py-28 border-b border-zinc-200/80 dark:border-[#2C2A26] bg-white dark:bg-[#141312]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="max-w-3xl space-y-2">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-[#A19B8F]">
                Portfolio Capstones
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold tracking-tight text-zinc-950 dark:text-[#F3EFE6]">
                7 Portfolio-Grade Capstone Projects
              </h2>
              <p className="text-base sm:text-lg font-serif text-zinc-600 dark:text-[#DDD7CD] leading-relaxed">
                Engineers are hired for proof of work, not toy tutorials. Each curriculum phase culminates in an industry-grade system engineered for your public GitHub portfolio.
              </p>
            </div>

            <div className="flex flex-wrap gap-2 text-xs font-mono text-zinc-500 dark:text-[#8E887B]">
              <span className="rounded-lg border border-zinc-200 dark:border-[#2C2A26] bg-white dark:bg-[#1A1917] px-3 py-1.5 font-medium shadow-2xs">
                Zero Toy Frameworks
              </span>
              <span className="rounded-lg border border-zinc-200 dark:border-[#2C2A26] bg-white dark:bg-[#1A1917] px-3 py-1.5 font-medium shadow-2xs">
                Strict Benchmark Suites
              </span>
              <span className="rounded-lg border border-zinc-200 dark:border-[#2C2A26] bg-white dark:bg-[#1A1917] px-3 py-1.5 font-medium shadow-2xs">
                Staff Review Rubrics
              </span>
            </div>
          </div>

          {/* Grid of Standard Capstones (Phases 1 to 6) */}
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Object.values(CAPSTONE_PROJECTS)
              .filter((capstone) => capstone.phaseId !== 7)
              .map((capstone) => {
                return (
                  <div
                    key={capstone.phaseId}
                    className="group relative flex flex-col justify-between rounded-2xl border border-zinc-200/90 bg-stone-50/40 p-6 dark:border-[#2C2A26] dark:bg-[#1A1917] hover:shadow-lg transition-all duration-300 shadow-xs"
                  >
                    <div className="space-y-4">
                      {/* Meta badges row */}
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1.5">
                          <span className="font-mono text-xs font-bold tracking-wide border border-zinc-200 dark:border-[#35332D] bg-white dark:bg-[#25231F] text-zinc-800 dark:text-[#D5CFBF] px-2.5 py-0.5 rounded-md">
                            PHASE 0{capstone.phaseId}
                          </span>
                          <span className="font-mono text-[11px] font-semibold border border-zinc-200 dark:border-[#35332D] bg-stone-100 dark:bg-[#1F1E1B] text-zinc-700 dark:text-[#A19B8F] px-2 py-0.5 rounded-md">
                            {capstone.difficulty}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 font-mono text-xs font-semibold text-zinc-500 dark:text-[#8E887B]">
                          <Clock className="h-3.5 w-3.5" />
                          <span>{capstone.estimatedHours}</span>
                        </div>
                      </div>

                      {/* Project Title and Subtitle with Editorial Serif */}
                      <div>
                        <h3 className="text-xl font-serif font-bold tracking-tight text-zinc-950 dark:text-[#F3EFE6] group-hover:text-amber-700 dark:group-hover:text-amber-200 transition-colors">
                          {capstone.shortName || capstone.title}
                        </h3>
                        {capstone.subtitle && (
                          <p className="text-xs font-sans font-semibold text-zinc-500 dark:text-[#A19B8F] mt-1 line-clamp-1">
                            {capstone.subtitle}
                          </p>
                        )}
                      </div>

                      {/* Scenario pitch */}
                      <p className="text-xs sm:text-[13px] font-serif text-zinc-600 dark:text-[#DDD7CD] leading-relaxed">
                        {capstone.pitch || capstone.scenario}
                      </p>

                      {/* Highlights checklist */}
                      {capstone.highlights && capstone.highlights.length > 0 && (
                        <div className="space-y-2 pt-2 border-t border-zinc-100 dark:border-[#262420]">
                          {capstone.highlights.map((item, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-xs font-medium text-zinc-700 dark:text-[#D5CFBF]">
                              <CheckCircle2 className="h-3.5 w-3.5 text-zinc-500 dark:text-[#8E887B] shrink-0" />
                              <span className="truncate">{item}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Tech stack chips */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {capstone.techStack.map((tech, i) => (
                          <span
                            key={i}
                            className="rounded-md border border-zinc-200/80 bg-white px-2 py-0.5 font-mono text-[11px] font-medium text-zinc-600 dark:border-[#2C2A26] dark:bg-[#141312] dark:text-[#A19B8F]"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="pt-5 mt-4 border-t border-zinc-100 dark:border-[#262420]">
                      <button
                        onClick={() => onExploreCapstones(capstone.phaseId)}
                        className="group/btn flex w-full items-center justify-center gap-2 rounded-xl border border-zinc-300 dark:border-[#2C2A26] bg-white py-2.5 text-xs font-bold text-zinc-900 hover:bg-zinc-950 hover:text-white dark:bg-[#22211E] dark:text-[#EDE8DF] dark:hover:bg-[#F3EFE6] dark:hover:text-[#141312] transition-all duration-200 shadow-2xs"
                      >
                        <Terminal className="h-3.5 w-3.5" />
                        <span>Inspect Spec & Architecture</span>
                        <ArrowRight className="h-3 w-3 transition-transform group-hover/btn:translate-x-1" />
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>

          {/* Featured Grand Finale Flagship Capstone 07 (CloudScale) */}
          {CAPSTONE_PROJECTS[7] && (
            <div className="mt-12 rounded-3xl border border-zinc-300 dark:border-[#2C2A26] bg-stone-50/70 dark:bg-[#1A1917] p-7 sm:p-9 shadow-lg relative overflow-hidden group">
              <div className="relative z-10 grid gap-8 lg:grid-cols-12 items-center">
                {/* Left Side: Overview & Pitch */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-zinc-300 dark:border-[#35332D] bg-white dark:bg-[#25231F] px-3 py-1 font-mono text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-[#F3EFE6]">
                      <Trophy className="h-3.5 w-3.5" />
                      Grand Finale • Capstone 07
                    </span>
                    <span className="font-mono text-xs font-bold border border-zinc-300 dark:border-[#35332D] bg-stone-100 dark:bg-[#1E1D1A] text-zinc-700 dark:text-[#A19B8F] px-2.5 py-0.5 rounded-full">
                      Staff Level
                    </span>
                    <span className="inline-flex items-center gap-1 font-mono text-xs font-semibold text-zinc-500 dark:text-[#8E887B]">
                      <Clock className="h-3.5 w-3.5" />
                      20-25 Hours
                    </span>
                  </div>

                  <div>
                    <h3 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight text-zinc-950 dark:text-[#F3EFE6]">
                      {CAPSTONE_PROJECTS[7].shortName || CAPSTONE_PROJECTS[7].title}
                    </h3>
                    <p className="text-sm font-sans font-semibold text-zinc-600 dark:text-[#A19B8F] mt-1">
                      {CAPSTONE_PROJECTS[7].subtitle}
                    </p>
                  </div>

                  <p className="text-sm sm:text-base font-serif text-zinc-600 dark:text-[#DDD7CD] leading-relaxed max-w-2xl">
                    {CAPSTONE_PROJECTS[7].pitch || CAPSTONE_PROJECTS[7].scenario}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-1">
                    {CAPSTONE_PROJECTS[7].techStack.map((tech, i) => (
                      <span
                        key={i}
                        className="rounded-lg border border-zinc-200 dark:border-[#2C2A26] bg-white dark:bg-[#141312] px-2.5 py-1 font-mono text-xs font-medium text-zinc-800 dark:text-[#D5CFBF] shadow-2xs"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right Side: Key Deliverables & Action CTA */}
                <div className="lg:col-span-5 rounded-2xl border border-zinc-200 dark:border-[#2C2A26] bg-white dark:bg-[#141312] p-6 shadow-sm space-y-4">
                  <div className="flex items-center justify-between border-b border-zinc-100 dark:border-[#262420] pb-3">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="h-4 w-4 text-zinc-700 dark:text-[#D5CFBF]" />
                      <span className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-900 dark:text-[#F3EFE6]">
                        Production Deliverables
                      </span>
                    </div>
                    <span className="text-[11px] font-mono font-semibold text-zinc-500 dark:text-[#8E887B]">
                      Verifiable Suite
                    </span>
                  </div>

                  <ul className="space-y-2.5">
                    {CAPSTONE_PROJECTS[7].highlights?.map((hl, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-[13px] font-medium text-zinc-700 dark:text-[#D5CFBF]">
                        <CheckCircle2 className="h-4 w-4 text-zinc-600 dark:text-[#A19B8F] shrink-0 mt-0.5" />
                        <span>{hl}</span>
                      </li>
                    ))}
                    <li className="flex items-start gap-2.5 text-xs sm:text-[13px] font-medium text-zinc-700 dark:text-[#D5CFBF]">
                      <CheckCircle2 className="h-4 w-4 text-zinc-600 dark:text-[#A19B8F] shrink-0 mt-0.5" />
                      <span>Zero-Downtime Rolling Updates with Nginx Reverse Proxy</span>
                    </li>
                  </ul>

                  <div className="pt-2">
                    <button
                      onClick={() => onExploreCapstones(7)}
                      className="group/cta flex w-full items-center justify-center gap-2 rounded-xl bg-zinc-950 hover:bg-zinc-800 text-white dark:bg-[#F3EFE6] dark:text-[#141312] dark:hover:bg-white py-3.5 text-xs sm:text-sm font-bold transition-all shadow-md active:scale-[0.99]"
                    >
                      <Terminal className="h-4 w-4" />
                      <span>Inspect Flagship Spec & Rubric</span>
                      <ArrowRight className="h-4 w-4 transition-transform group-hover/cta:translate-x-1" />
                    </button>
                    <p className="text-center font-mono text-[11px] text-zinc-400 dark:text-[#8E887B] mt-2">
                      Principal & Staff Engineer Resume Milestone
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 7. Bottom High-Impact Conversion Banner in Warm Dark Matte */}
      <section className="relative overflow-hidden py-20 sm:py-28 bg-[#181715] text-[#F3EFE6] border-t border-[#2C2A26]">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#35332D] bg-[#22211E] px-4 py-1.5 text-xs font-mono font-medium text-[#D5CFBF]">
            <span>Continuous Engineering Mastery</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold tracking-tight max-w-3xl mx-auto leading-tight text-[#F3EFE6]">
            Ready to Master Production Backend Architecture?
          </h2>

          <p className="text-base sm:text-lg font-serif text-[#DDD7CD] max-w-2xl mx-auto leading-relaxed">
            No fluff. No toy code. Read the canonical textbooks, study real failure modes, and build systems that scale to millions of requests.
          </p>

          <div className="pt-3">
            <button
              onClick={() => onEnterRoadmap()}
              className="group inline-flex items-center gap-2.5 rounded-xl bg-[#F3EFE6] hover:bg-white px-8 py-4 text-sm sm:text-base font-bold text-[#141312] shadow-xl transition-all active:scale-[0.98]"
            >
              <span>Launch Interactive Roadmap</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </section>

      {/* 8. Clean Minimal Footer */}
      <footer className="border-t border-zinc-200 py-8 dark:border-[#2C2A26] bg-white dark:bg-[#141312] text-xs text-zinc-500 dark:text-[#8E887B]">
        <div className="mx-auto flex max-w-7xl flex-col sm:flex-row items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} Backend Engineer Hub. Built for Principal & Senior Engineers.</p>
          <div className="flex items-center gap-4">
            <button
              onClick={() => scrollToSection("how-to-use")}
              className="hover:text-zinc-950 dark:hover:text-[#F3EFE6] transition-colors"
            >
              How It Works
            </button>
            <span>•</span>
            <button
              onClick={() => onEnterRoadmap()}
              className="hover:text-zinc-950 dark:hover:text-[#F3EFE6] transition-colors"
            >
              Enter Roadmap
            </button>
            <span>•</span>
            <button
              onClick={() => onExploreCapstones(1)}
              className="hover:text-zinc-950 dark:hover:text-[#F3EFE6] transition-colors"
            >
              Capstones
            </button>
            <span>•</span>
            <button
              onClick={() => scrollToSection("study-formula")}
              className="hover:text-zinc-950 dark:hover:text-[#F3EFE6] transition-colors"
            >
              Methodology
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
