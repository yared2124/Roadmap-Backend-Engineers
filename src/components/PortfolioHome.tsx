"use client";

import React, { useState, useEffect } from "react";
import {
  ArrowRight,
  ArrowLeft,
  Layers,
  Terminal,
  Mic,
  CheckCircle2,
  Cpu,
  ShieldCheck,
  Clock,
  Compass,
  Moon,
  Sun,
  ChevronRight,
  Trophy,
  Check,
} from "lucide-react";
import { ROADMAP_PHASES } from "../data/roadmap";
import { CAPSTONE_PROJECTS } from "../data/capstones";
import { RoadmapTopic } from "../types/roadmap";

export type PortfolioTab = "home" | "how-it-works" | "curriculum" | "oral-exams" | "capstones";

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
  const [activeTab, setActiveTab] = useState<PortfolioTab>("home");

  useEffect(() => {
    if (activeTab === "home") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [activeTab]);

  const handleSwitchTab = (tab: PortfolioTab) => {
    setActiveTab(tab);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  };

  return (
    <div
      className={`w-full bg-white text-zinc-900 dark:bg-[#141312] dark:text-[#F3EFE6] selection:bg-zinc-900 selection:text-white dark:selection:bg-[#F3EFE6] dark:selection:text-[#141312] font-sans transition-colors duration-200 flex flex-col justify-between ${
        activeTab === "home" ? "h-screen max-h-screen overflow-hidden" : "min-h-screen"
      }`}
    >
      {/* 1. Global Navigation Header */}
      <header className="sticky top-0 z-40 w-full border-b border-zinc-200/80 bg-white/90 backdrop-blur-md dark:border-[#2C2A26] dark:bg-[#141312]/90">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Brand Title: Clicking returns to Home */}
          <button
            onClick={() => handleSwitchTab("home")}
            className="flex items-center gap-3 text-left group focus:outline-hidden"
          >
            <span className="font-serif font-bold tracking-tight text-zinc-950 dark:text-[#F3EFE6] text-lg sm:text-xl group-hover:opacity-85 transition-opacity">
              Backend Engineer Hub
            </span>
          </button>

          {/* Center Navigation Links: Switching tabs on click instead of scrolling down */}
          <nav className="flex items-center gap-3 sm:gap-6 text-xs sm:text-sm font-semibold text-zinc-600 dark:text-[#A19B8F] overflow-x-auto">
            <button
              onClick={() => handleSwitchTab("how-it-works")}
              className={`transition-colors py-1 whitespace-nowrap ${
                activeTab === "how-it-works"
                  ? "text-zinc-950 dark:text-[#F3EFE6] font-bold border-b-2 border-zinc-950 dark:border-[#F3EFE6]"
                  : "hover:text-zinc-950 dark:hover:text-[#F3EFE6]"
              }`}
            >
              How It Works
            </button>
            <button
              onClick={() => handleSwitchTab("curriculum")}
              className={`transition-colors py-1 whitespace-nowrap ${
                activeTab === "curriculum"
                  ? "text-zinc-950 dark:text-[#F3EFE6] font-bold border-b-2 border-zinc-950 dark:border-[#F3EFE6]"
                  : "hover:text-zinc-950 dark:hover:text-[#F3EFE6]"
              }`}
            >
              Curriculum
            </button>
            <button
              onClick={() => handleSwitchTab("oral-exams")}
              className={`transition-colors py-1 whitespace-nowrap ${
                activeTab === "oral-exams"
                  ? "text-zinc-950 dark:text-[#F3EFE6] font-bold border-b-2 border-zinc-950 dark:border-[#F3EFE6]"
                  : "hover:text-zinc-950 dark:hover:text-[#F3EFE6]"
              }`}
            >
              Oral Exams
            </button>
            <button
              onClick={() => handleSwitchTab("capstones")}
              className={`transition-colors py-1 whitespace-nowrap ${
                activeTab === "capstones"
                  ? "text-zinc-950 dark:text-[#F3EFE6] font-bold border-b-2 border-zinc-950 dark:border-[#F3EFE6]"
                  : "hover:text-zinc-950 dark:hover:text-[#F3EFE6]"
              }`}
            >
              Capstones
            </button>
          </nav>

          {/* Right Action: Theme Toggle & Launch Roadmap */}
          <div className="flex items-center gap-3 shrink-0">
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

      {/* ========================================================= */}
      {/* VIEW 1: CLEAN STANDALONE HOME / HERO (MATCHING SCREENSHOT) */}
      {/* ========================================================= */}
      {activeTab === "home" && (
        <main className="relative flex-1 flex flex-col justify-center items-center overflow-hidden px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
          {/* Subtle Warm Ambient Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[950px] h-[450px] bg-gradient-to-tr from-amber-500/5 via-stone-400/5 to-transparent blur-3xl pointer-events-none rounded-full" />

          <div className="relative mx-auto max-w-4xl text-center flex flex-col items-center space-y-6 sm:space-y-7">
            {/* Headline matching user screenshot */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold tracking-tight text-zinc-950 dark:text-[#F3EFE6] leading-[1.12] max-w-4xl">
              Backend Engineering Roadmap
            </h1>

            {/* Subtitle in Recommended Editorial Font Size */}
            <p className="text-lg sm:text-xl md:text-2xl font-serif font-normal text-zinc-700 dark:text-[#EDE8DF] leading-relaxed max-w-3xl mx-auto">
              A comprehensive, production-grade learning system designed to bridge the gap between building toy APIs and architecting resilient, high-throughput distributed systems.
            </p>

            {/* Action Buttons: Click switches views cleanly */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <button
                onClick={() => onEnterRoadmap()}
                className="group flex items-center gap-2.5 rounded-xl bg-zinc-950 px-7 py-4 text-sm sm:text-base font-bold text-white shadow-lg shadow-zinc-950/15 hover:bg-zinc-800 dark:bg-[#F3EFE6] dark:text-[#141312] dark:hover:bg-white dark:shadow-black/40 transition-all active:scale-[0.98]"
              >
                <span>Start Learning Now</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={() => handleSwitchTab("how-it-works")}
                className="flex items-center gap-2 rounded-xl border border-zinc-300 bg-white/90 px-6 py-4 text-sm sm:text-base font-semibold text-zinc-900 hover:bg-zinc-50 dark:border-[#2C2A26] dark:bg-[#1A1917] dark:text-[#F3EFE6] dark:hover:bg-[#22211D] transition-colors shadow-2xs"
              >
                <Compass className="h-4 w-4 text-zinc-500 dark:text-[#A19B8F]" />
                <span>How It Works</span>
              </button>

              <button
                onClick={() => handleSwitchTab("curriculum")}
                className="flex items-center gap-2 rounded-xl border border-zinc-200 bg-stone-100/80 px-5 py-4 text-sm sm:text-base font-medium text-zinc-700 hover:bg-stone-200 dark:border-[#2C2A26] dark:bg-[#1E1D1A] dark:text-[#D5CFBF] dark:hover:bg-[#25231F] transition-colors shadow-2xs"
              >
                <span>Explore 7 Phases</span>
              </button>
            </div>

            {/* Editorial Checklist Row (Matching Screenshot Exactly) */}
            <div className="flex flex-wrap items-center justify-center gap-2.5 pt-2 text-xs text-zinc-600 dark:text-[#A19B8F] font-medium">
              <span className="inline-flex items-center gap-1.5 rounded-md bg-stone-100 dark:bg-[#1C1B18] border border-zinc-200/80 dark:border-[#2C2A26] px-3 py-1">
                <Check className="h-3 w-3 text-zinc-700 dark:text-[#D5CFBF]" />
                Zero-Toy Frameworks
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

            {/* Subtle Progress Bar indicator if user already has saved progress */}
            {completedCount > 0 && (
              <div className="inline-flex items-center gap-3 rounded-2xl border border-zinc-300 dark:border-[#2C2A26] bg-stone-50 dark:bg-[#1A1917] p-3.5 text-xs font-mono font-semibold mt-4">
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
        </main>
      )}

      {/* ========================================================= */}
      {/* VIEW 2: HOW IT WORKS (USER ONBOARDING & STUDY GUIDE)       */}
      {/* ========================================================= */}
      {activeTab === "how-it-works" && (
        <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
          {/* Breadcrumb / Back to Home */}
          <div className="mb-8">
            <button
              onClick={() => handleSwitchTab("home")}
              className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-zinc-500 hover:text-zinc-950 dark:text-[#A19B8F] dark:hover:text-[#F3EFE6] transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back to Home</span>
            </button>
          </div>

          <div className="text-center flex flex-col items-center max-w-3xl mx-auto space-y-4 pb-10 border-b border-zinc-200/80 dark:border-[#2C2A26]">
            <div className="inline-flex items-center gap-2 rounded-full border border-zinc-300 dark:border-[#2C2A26] bg-stone-100 dark:bg-[#1A1917] px-3.5 py-1 text-xs font-mono font-bold uppercase tracking-wider text-zinc-800 dark:text-[#D5CFBF]">
              <Compass className="h-3.5 w-3.5 text-zinc-700 dark:text-[#D5CFBF]" />
              <span>Platform Introduction & User Guide</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold tracking-tight text-zinc-950 dark:text-[#F3EFE6]">
              How to Use This Learning Platform: Full Step-by-Step Guide
            </h2>
            <p className="text-base sm:text-lg font-serif text-zinc-600 dark:text-[#DDD7CD] leading-relaxed max-w-2xl mx-auto">
              Welcome to the Backend Engineering Hub. This platform was engineered from first principles to take you from writing basic APIs to designing resilient, mission-critical distributed systems.
            </p>
          </div>

          {/* 6 Sequential Onboarding Steps */}
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Step 1 */}
            <div className="rounded-2xl border border-zinc-200/90 bg-stone-50/40 p-6 dark:border-[#2C2A26] dark:bg-[#1A1917] space-y-3.5">
              <div className="flex items-center justify-between">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-950 text-white dark:bg-[#F3EFE6] dark:text-[#141312] font-mono font-bold text-xs shadow-xs">
                  01
                </span>
                <span className="font-mono text-xs font-semibold text-zinc-500 dark:text-[#8E887B]">
                  Step 1 • Orientation
                </span>
              </div>
              <h3 className="font-serif font-bold text-lg text-zinc-950 dark:text-[#F3EFE6]">
                Navigate the 7 Engineering Phases
              </h3>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-[#A19B8F] leading-relaxed font-sans">
                The curriculum is strictly sequenced from hardware and networking primitives (Phase 1) through storage engines, asynchronous event brokers, cloud reliability, up to Principal Staff engineering architecture. Follow the order linearly for maximum retention.
              </p>
            </div>

            {/* Step 2 */}
            <div className="rounded-2xl border border-zinc-200/90 bg-stone-50/40 p-6 dark:border-[#2C2A26] dark:bg-[#1A1917] space-y-3.5">
              <div className="flex items-center justify-between">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-950 text-white dark:bg-[#F3EFE6] dark:text-[#141312] font-mono font-bold text-xs shadow-xs">
                  02
                </span>
                <span className="font-mono text-xs font-semibold text-zinc-500 dark:text-[#8E887B]">
                  Step 2 • Topic Mastery
                </span>
              </div>
              <h3 className="font-serif font-bold text-lg text-zinc-950 dark:text-[#F3EFE6]">
                Study Deep Dives & Systems Flowcharts
              </h3>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-[#A19B8F] leading-relaxed font-sans">
                Each of the 31 topics features an authoritative video masterclass, curated literature citations (Kleppmann, Fowler), interactive latency flowcharts, and multi-language code blueprints in Go, TypeScript, Python, and Java.
              </p>
            </div>

            {/* Step 3 */}
            <div className="rounded-2xl border border-zinc-200/90 bg-stone-50/40 p-6 dark:border-[#2C2A26] dark:bg-[#1A1917] space-y-3.5">
              <div className="flex items-center justify-between">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-950 text-white dark:bg-[#F3EFE6] dark:text-[#141312] font-mono font-bold text-xs shadow-xs">
                  03
                </span>
                <span className="font-mono text-xs font-semibold text-zinc-500 dark:text-[#8E887B]">
                  Step 3 • Oral Whiteboard
                </span>
              </div>
              <h3 className="font-serif font-bold text-lg text-zinc-950 dark:text-[#F3EFE6]">
                Simulate Oral Whiteboard Defense
              </h3>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-[#A19B8F] leading-relaxed font-sans">
                Senior engineering interviews are oral defenses of architectural trade-offs. Use the built-in Whiteboard Simulator to rehearse answering the 3 rigorous questions per topic under realistic timing before revealing staff-level solution breakdowns.
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
        </main>
      )}

      {/* ========================================================= */}
      {/* VIEW 3: CURRICULUM (THE 7 PHASES & MODULES)               */}
      {/* ========================================================= */}
      {activeTab === "curriculum" && (
        <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
          {/* Breadcrumb / Back to Home */}
          <div className="mb-8">
            <button
              onClick={() => handleSwitchTab("home")}
              className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-zinc-500 hover:text-zinc-950 dark:text-[#A19B8F] dark:hover:text-[#F3EFE6] transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back to Home</span>
            </button>
          </div>

          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-zinc-200/80 dark:border-[#2C2A26]">
            <div className="max-w-3xl space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-zinc-300 dark:border-[#2C2A26] bg-stone-100 dark:bg-[#1A1917] px-3.5 py-1 text-xs font-mono font-bold uppercase tracking-wider text-zinc-800 dark:text-[#D5CFBF]">
                <Layers className="h-3.5 w-3.5 text-zinc-700 dark:text-[#D5CFBF]" />
                <span>Complete Curriculum</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold tracking-tight text-zinc-950 dark:text-[#F3EFE6]">
                The 7 Architectural Mastery Phases
              </h2>
              <p className="text-base sm:text-lg font-serif text-zinc-600 dark:text-[#DDD7CD] leading-relaxed">
                31 exhaustive production deep-dives arranged in cognitive dependency order. Master networking primitives, storage engines, distributed coordination, and staff architecture.
              </p>
            </div>

            <button
              onClick={() => onEnterRoadmap()}
              className="inline-flex items-center gap-2 rounded-xl bg-zinc-950 px-6 py-3 text-xs sm:text-sm font-bold text-white hover:bg-zinc-800 dark:bg-[#F3EFE6] dark:text-[#141312] dark:hover:bg-white transition-all shrink-0 shadow-sm"
            >
              <span>Launch Full Roadmap</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          {/* Metric Stats Grid */}
          <div className="my-10 grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="rounded-2xl border border-zinc-200/80 bg-stone-50/60 dark:border-[#2C2A26] dark:bg-[#1A1917] p-5 text-center shadow-2xs">
              <span className="block font-mono text-3xl sm:text-4xl font-bold text-zinc-950 dark:text-[#F3EFE6]">
                07
              </span>
              <span className="text-xs sm:text-sm font-serif font-medium text-zinc-600 dark:text-[#A19B8F]">
                Architectural Phases
              </span>
            </div>
            <div className="rounded-2xl border border-zinc-200/80 bg-stone-50/60 dark:border-[#2C2A26] dark:bg-[#1A1917] p-5 text-center shadow-2xs">
              <span className="block font-mono text-3xl sm:text-4xl font-bold text-zinc-950 dark:text-[#F3EFE6]">
                31
              </span>
              <span className="text-xs sm:text-sm font-serif font-medium text-zinc-600 dark:text-[#A19B8F]">
                Production Deep Dives
              </span>
            </div>
            <div className="rounded-2xl border border-zinc-200/80 bg-stone-50/60 dark:border-[#2C2A26] dark:bg-[#1A1917] p-5 text-center shadow-2xs">
              <span className="block font-mono text-3xl sm:text-4xl font-bold text-zinc-950 dark:text-[#F3EFE6]">
                93
              </span>
              <span className="text-xs sm:text-sm font-serif font-medium text-zinc-600 dark:text-[#A19B8F]">
                Whiteboard Oral Questions
              </span>
            </div>
            <div className="rounded-2xl border border-zinc-200/80 bg-stone-50/60 dark:border-[#2C2A26] dark:bg-[#1A1917] p-5 text-center shadow-2xs">
              <span className="block font-mono text-3xl sm:text-4xl font-bold text-zinc-950 dark:text-[#F3EFE6]">
                07
              </span>
              <span className="text-xs sm:text-sm font-serif font-medium text-zinc-600 dark:text-[#A19B8F]">
                Portfolio Capstones
              </span>
            </div>
          </div>

          {/* 7 Phases Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {ROADMAP_PHASES.map((phase) => {
              const capstone = CAPSTONE_PROJECTS[phase.id];
              return (
                <div
                  key={phase.id}
                  className="group relative flex flex-col justify-between rounded-2xl border border-zinc-200/90 bg-stone-50/40 p-6 dark:border-[#2C2A26] dark:bg-[#1A1917] hover:border-zinc-400 dark:hover:border-[#423F38] transition-all shadow-xs"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold tracking-wider text-zinc-500 dark:text-[#A19B8F]">
                        PHASE 0{phase.id}
                      </span>
                      <span className="rounded-full bg-stone-100 dark:bg-[#25231F] px-2.5 py-0.5 font-mono text-xs font-semibold text-zinc-700 dark:text-[#D5CFBF] border border-zinc-200 dark:border-[#35332D]">
                        {phase.topics.length} Deep Dives
                      </span>
                    </div>

                    <div>
                      <h3 className="text-xl font-serif font-bold text-zinc-950 dark:text-[#F3EFE6] group-hover:text-amber-700 dark:group-hover:text-amber-200 transition-colors">
                        {phase.name}
                      </h3>
                    </div>

                    <p className="text-xs sm:text-sm font-serif text-zinc-600 dark:text-[#DDD7CD] leading-relaxed">
                      {phase.description}
                    </p>

                    {/* Topic previews */}
                    <div className="space-y-1.5 pt-2 border-t border-zinc-100 dark:border-[#262420]">
                      <span className="font-mono text-[11px] uppercase tracking-wider text-zinc-400 dark:text-[#8E887B] font-semibold">
                        Syllabus Highlights
                      </span>
                      <ul className="space-y-1">
                        {phase.topics.slice(0, 3).map((topic) => (
                          <li
                            key={topic.id}
                            onClick={() => onEnterRoadmap(topic)}
                            className="cursor-pointer flex items-center justify-between text-xs text-zinc-700 dark:text-[#D5CFBF] hover:text-zinc-950 dark:hover:text-white transition-colors group/item"
                          >
                            <span className="truncate pr-2 font-medium">
                              #{topic.number} {topic.title}
                            </span>
                            <ChevronRight className="h-3 w-3 text-zinc-400 group-hover/item:translate-x-0.5 transition-transform shrink-0" />
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Footer actions */}
                  <div className="mt-6 pt-4 border-t border-zinc-100 dark:border-[#262420] flex items-center justify-between gap-3">
                    <button
                      onClick={() => onEnterRoadmap(phase.topics[0])}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-zinc-900 dark:text-[#F3EFE6] hover:underline font-mono"
                    >
                      <span>Start Phase</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>

                    {capstone && (
                      <button
                        onClick={() => onExploreCapstones(phase.id)}
                        className="inline-flex items-center gap-1 rounded-lg border border-zinc-300 dark:border-[#35332D] bg-white dark:bg-[#201F1B] px-2.5 py-1 text-[11px] font-mono font-semibold text-zinc-700 dark:text-[#D5CFBF] hover:bg-zinc-100 dark:hover:bg-[#2A2823] transition-colors"
                      >
                        <Terminal className="h-3 w-3" />
                        <span>Capstone 0{phase.id}</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </main>
      )}

      {/* ========================================================= */}
      {/* VIEW 4: ORAL EXAMS (WHITEBOARD & INTERVIEW SIMULATOR)     */}
      {/* ========================================================= */}
      {activeTab === "oral-exams" && (
        <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
          {/* Breadcrumb / Back to Home */}
          <div className="mb-8">
            <button
              onClick={() => handleSwitchTab("home")}
              className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-zinc-500 hover:text-zinc-950 dark:text-[#A19B8F] dark:hover:text-[#F3EFE6] transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back to Home</span>
            </button>
          </div>

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
                      [WHY] Production Trade-offs & Alternatives
                    </h4>
                    <p className="text-xs text-zinc-600 dark:text-[#A19B8F] mt-0.5">
                      Explain why this solution was selected over the alternatives, citing latency and cost curves.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-zinc-950 text-white dark:bg-[#F3EFE6] dark:text-[#141312] font-mono text-xs font-bold shadow-xs">
                    3
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-zinc-900 dark:text-[#F3EFE6]">
                      [HOW] Pathologies, Outages & Recovery
                    </h4>
                    <p className="text-xs text-zinc-600 dark:text-[#A19B8F] mt-0.5">
                      Describe exactly how the subsystem fails under partition, cascade, or memory pressure.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={() => onEnterRoadmap()}
                  className="inline-flex items-center gap-2 rounded-xl bg-zinc-950 px-6 py-3.5 text-xs sm:text-sm font-bold text-white hover:bg-zinc-800 dark:bg-[#F3EFE6] dark:text-[#141312] dark:hover:bg-white transition-all shadow-md active:scale-[0.98]"
                >
                  <Mic className="h-4 w-4" />
                  <span>Launch Oral Exam Simulator in Roadmap</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            {/* Right Card: Interactive Terminal Preview */}
            <div className="lg:col-span-6">
              <div className="rounded-2xl border border-zinc-300 dark:border-[#2C2A26] bg-stone-50/80 dark:bg-[#1A1917] p-6 sm:p-8 shadow-md">
                <div className="flex items-center justify-between border-b border-zinc-200 dark:border-[#2C2A26] pb-4">
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-red-400/80" />
                    <span className="h-3 w-3 rounded-full bg-yellow-400/80" />
                    <span className="h-3 w-3 rounded-full bg-green-400/80" />
                    <span className="font-mono text-xs text-zinc-500 dark:text-[#8E887B] ml-2">
                      sim_session_08.sh
                    </span>
                  </div>
                  <span className="rounded-full bg-stone-200/80 dark:bg-[#282622] px-2.5 py-0.5 font-mono text-[11px] font-semibold text-zinc-700 dark:text-[#D5CFBF]">
                    2:00 Countdown
                  </span>
                </div>

                <div className="space-y-4 pt-5 font-mono text-xs leading-relaxed">
                  <div className="text-zinc-500 dark:text-[#8E887B]">
                    // System Prompt: Senior Staff Interviewer
                  </div>
                  <div className="rounded-xl border border-zinc-200 dark:border-[#2C2A26] bg-white dark:bg-[#141312] p-4 text-zinc-900 dark:text-[#F3EFE6]">
                    <span className="font-bold text-amber-700 dark:text-amber-300">
                      Interviewer:{" "}
                    </span>
                    &ldquo;Under an asymmetric network partition where Node C can receive heartbeats but cannot acknowledge them, how does the Raft leader prevent split-brain election cycles?&rdquo;
                  </div>
                  <div className="rounded-xl border border-zinc-200/80 dark:border-[#262420] bg-stone-100/60 dark:bg-[#1E1D19] p-4 text-zinc-700 dark:text-[#D5CFBF] space-y-2">
                    <div className="flex items-center gap-2 font-bold text-zinc-900 dark:text-[#F3EFE6]">
                      <ShieldCheck className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                      <span>Staff Defense Rubric:</span>
                    </div>
                    <p className="text-[11px] text-zinc-600 dark:text-[#A19B8F] leading-normal font-sans">
                      1. Identify Pre-Vote phase (Raft extension) where candidates query peers before incrementing term.<br />
                      2. Mention leader lease timers and heartbeats preventing disruptive re-elections.<br />
                      3. State quorum acknowledgment invariants (majority requirement of (N/2) + 1).
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      )}

      {/* ========================================================= */}
      {/* VIEW 5: CAPSTONES (7 PRODUCTION PORTFOLIO PROJECTS)       */}
      {/* ========================================================= */}
      {activeTab === "capstones" && (
        <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
          {/* Breadcrumb / Back to Home */}
          <div className="mb-8">
            <button
              onClick={() => handleSwitchTab("home")}
              className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-zinc-500 hover:text-zinc-950 dark:text-[#A19B8F] dark:hover:text-[#F3EFE6] transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back to Home</span>
            </button>
          </div>

          <div className="text-center flex flex-col items-center max-w-3xl mx-auto space-y-4 pb-10 border-b border-zinc-200/80 dark:border-[#2C2A26]">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold tracking-tight text-zinc-950 dark:text-[#F3EFE6]">
              7 Industry-Grade Engineering Projects
            </h2>
            <p className="text-base sm:text-lg font-serif text-zinc-600 dark:text-[#DDD7CD] leading-relaxed max-w-2xl mx-auto">
              Build verifiable distributed systems for your portfolio with real latency requirements and failure tests.
            </p>

            <div className="flex flex-wrap justify-center gap-2 text-xs font-mono text-zinc-500 dark:text-[#8E887B] pt-2">
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
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Object.values(CAPSTONE_PROJECTS)
              .filter((capstone) => capstone.phaseId !== 7)
              .map((capstone) => (
                <div
                  key={capstone.phaseId}
                  className="group relative flex flex-col justify-between rounded-2xl border border-zinc-200/90 bg-stone-50/40 p-6 dark:border-[#2C2A26] dark:bg-[#1A1917] hover:shadow-lg transition-all duration-300 shadow-xs"
                >
                  <div className="space-y-4">
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

                    <p className="text-xs sm:text-[13px] font-serif text-zinc-600 dark:text-[#DDD7CD] leading-relaxed">
                      {capstone.pitch || capstone.scenario}
                    </p>

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
              ))}
          </div>

          {/* Grand Finale Flagship Capstone 07 */}
          {CAPSTONE_PROJECTS[7] && (
            <div className="mt-12 rounded-3xl border border-zinc-300 dark:border-[#2C2A26] bg-stone-50/70 dark:bg-[#1A1917] p-7 sm:p-9 shadow-lg relative overflow-hidden group">
              <div className="relative z-10 grid gap-8 lg:grid-cols-12 items-center">
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
                    <h3 className="text-2xl sm:text-3xl font-serif font-bold text-zinc-950 dark:text-[#F3EFE6]">
                      {CAPSTONE_PROJECTS[7].title}
                    </h3>
                    <p className="text-xs sm:text-sm font-sans font-semibold text-zinc-500 dark:text-[#A19B8F] mt-1">
                      {CAPSTONE_PROJECTS[7].subtitle}
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm font-serif text-zinc-600 dark:text-[#DDD7CD] leading-relaxed">
                    {CAPSTONE_PROJECTS[7].scenario}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {CAPSTONE_PROJECTS[7].techStack.map((t, idx) => (
                      <span
                        key={idx}
                        className="rounded-md border border-zinc-200 dark:border-[#35332D] bg-white dark:bg-[#141312] px-2.5 py-0.5 font-mono text-xs text-zinc-700 dark:text-[#D5CFBF]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-5 rounded-2xl border border-zinc-300 dark:border-[#2C2A26] bg-white dark:bg-[#141312] p-6 space-y-4 shadow-sm">
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-[#D5CFBF]">
                    Verification Deliverables:
                  </span>
                  <ul className="space-y-2 text-xs font-medium text-zinc-700 dark:text-[#D5CFBF]">
                    {(CAPSTONE_PROJECTS[7].keyDeliverables || CAPSTONE_PROJECTS[7].highlights || []).slice(0, 4).map((d, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                        <span>{d}</span>
                      </li>
                    ))}
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
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      )}

    </div>
  );
}
