"use client";

import React, { useState, useEffect } from "react";
import {
  ArrowRight,
  ArrowLeft,
  Terminal,
  Mic,
  CheckCircle2,
  ShieldCheck,
  Clock,
  Moon,
  Sun,
  ChevronRight,
  Trophy,
  Check,
  BookOpen,
  Video,
  Code2,
  FileText,
  GitBranch,
  Flame,
} from "lucide-react";
import { ROADMAP_PHASES } from "../data/roadmap";
import { CAPSTONE_PROJECTS } from "../data/capstones";
import { RoadmapTopic } from "../types/roadmap";

export type PortfolioTab = "home" | "docs" | "how-it-works" | "curriculum" | "oral-exams" | "capstones";

interface PortfolioHomeProps {
  onEnterRoadmap: (topic?: RoadmapTopic) => void;
  onExploreCapstones: (phaseId?: number) => void;
  isDark: boolean;
  onToggleTheme: () => void;
  completedCount: number;
  totalTopics: number;
}

export function PortfolioHome({
  onEnterRoadmap,
  onExploreCapstones,
  isDark,
  onToggleTheme,
  completedCount,
  totalTopics,
}: PortfolioHomeProps) {
  const [activeTab, setActiveTab] = useState<PortfolioTab>("home");

  useEffect(() => {
    if (activeTab === "home" || activeTab === "oral-exams") {
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
        activeTab === "home" || activeTab === "oral-exams" ? "h-screen max-h-screen overflow-hidden" : "min-h-screen"
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
              onClick={() => handleSwitchTab("docs")}
              className={`transition-colors py-1 whitespace-nowrap ${
                activeTab === "docs" || activeTab === "how-it-works"
                  ? "text-zinc-950 dark:text-[#F3EFE6] font-bold border-b-2 border-zinc-950 dark:border-[#F3EFE6]"
                  : "hover:text-zinc-950 dark:hover:text-[#F3EFE6]"
              }`}
            >
              Docs
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
                onClick={() => handleSwitchTab("docs")}
                className="flex items-center gap-2 rounded-xl border border-zinc-300 bg-white/90 px-6 py-4 text-sm sm:text-base font-semibold text-zinc-900 hover:bg-zinc-50 dark:border-[#2C2A26] dark:bg-[#1A1917] dark:text-[#F3EFE6] dark:hover:bg-[#22211D] transition-colors shadow-2xs"
              >
                <BookOpen className="h-4 w-4 text-zinc-500 dark:text-[#A19B8F]" />
                <span>Docs</span>
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
                51 Masterclasses (56+ Hours)
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-md bg-stone-100 dark:bg-[#1C1B18] border border-zinc-200/80 dark:border-[#2C2A26] px-3 py-1">
                <Check className="h-3 w-3 text-zinc-700 dark:text-[#D5CFBF]" />
                Authoritative Literature (DDIA, Fowler)
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-md bg-stone-100 dark:bg-[#1C1B18] border border-zinc-200/80 dark:border-[#2C2A26] px-3 py-1">
                <Check className="h-3 w-3 text-zinc-700 dark:text-[#D5CFBF]" />
                Mock Technical Interview Simulator
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
      {/* VIEW 2: DOCS (STUDENT ONBOARDING & STUDY METHODOLOGY)     */}
      {/* ========================================================= */}
      {(activeTab === "docs" || activeTab === "how-it-works") && (
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

          {/* Header Banner */}
          <div className="text-center flex flex-col items-center max-w-3xl mx-auto space-y-4 pb-10 border-b border-zinc-200/80 dark:border-[#2C2A26]">
            <div className="inline-flex items-center gap-2 rounded-full border border-zinc-300 dark:border-[#2C2A26] bg-stone-100 dark:bg-[#1A1917] px-3.5 py-1 text-xs font-mono font-bold uppercase tracking-wider text-zinc-800 dark:text-[#D5CFBF]">
              <BookOpen className="h-3.5 w-3.5 text-zinc-700 dark:text-[#D5CFBF]" />
              <span>Student Documentation & Study Methodology</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold tracking-tight text-zinc-950 dark:text-[#F3EFE6]">
              Backend Engineering Docs: Step-by-Step Study Guide
            </h2>
            <p className="text-base sm:text-lg font-serif text-zinc-600 dark:text-[#DDD7CD] leading-relaxed max-w-2xl mx-auto">
              Welcome to the Backend Engineering Hub. To master distributed systems from first principles and build a verifiable portfolio, follow this exact 6-stage engineering loop on every topic.
            </p>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={() => onEnterRoadmap()}
                className="inline-flex items-center gap-2 rounded-xl bg-zinc-950 px-5 py-2.5 text-xs sm:text-sm font-bold text-white hover:bg-zinc-800 dark:bg-[#F3EFE6] dark:text-[#141312] dark:hover:bg-white transition-all shadow-sm"
              >
                <span>Launch Topic #01</span>
                <ArrowRight className="h-4 w-4" />
              </button>
              <button
                onClick={() => handleSwitchTab("curriculum")}
                className="inline-flex items-center gap-2 rounded-xl border border-zinc-300 bg-white/90 px-5 py-2.5 text-xs sm:text-sm font-semibold text-zinc-900 hover:bg-zinc-50 dark:border-[#2C2A26] dark:bg-[#1A1917] dark:text-[#F3EFE6] dark:hover:bg-[#22211D] transition-colors shadow-2xs"
              >
                <span>Browse All 31 Topics</span>
              </button>
            </div>
          </div>

          {/* Sequential 6-Stage Methodology Loop Banner */}
          <div className="mt-10 rounded-2xl border border-zinc-200/90 bg-stone-50/70 p-4 sm:p-6 dark:border-[#2C2A26] dark:bg-[#1A1917]">
            <div className="flex items-center justify-between pb-4 border-b border-zinc-200 dark:border-[#2C2A26]">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-[#8E887B]">
                The Daily Topic Mastery Cycle
              </span>
              <span className="font-mono text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
                Repeat for Topics 01 → 31
              </span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 pt-4">
              <div className="rounded-xl border border-zinc-200/80 bg-white p-3 dark:border-[#2C2A26] dark:bg-[#141312] text-center space-y-1">
                <span className="font-mono text-xs font-bold text-zinc-400">01</span>
                <p className="text-xs font-bold text-zinc-900 dark:text-[#F3EFE6]">Watch Video</p>
                <p className="text-[11px] text-zinc-500 dark:text-[#8E887B]">Masterclass Streams</p>
              </div>
              <div className="rounded-xl border border-zinc-200/80 bg-white p-3 dark:border-[#2C2A26] dark:bg-[#141312] text-center space-y-1">
                <span className="font-mono text-xs font-bold text-zinc-400">02</span>
                <p className="text-xs font-bold text-zinc-900 dark:text-[#F3EFE6]">Read Theory</p>
                <p className="text-[11px] text-zinc-500 dark:text-[#8E887B]">Free Canonical Texts</p>
              </div>
              <div className="rounded-xl border border-zinc-200/80 bg-white p-3 dark:border-[#2C2A26] dark:bg-[#141312] text-center space-y-1">
                <span className="font-mono text-xs font-bold text-zinc-400">03</span>
                <p className="text-xs font-bold text-zinc-900 dark:text-[#F3EFE6]">Solve Questions</p>
                <p className="text-[11px] text-zinc-500 dark:text-[#8E887B]">3 Self-Check Tests</p>
              </div>
              <div className="rounded-xl border border-zinc-200/80 bg-white p-3 dark:border-[#2C2A26] dark:bg-[#141312] text-center space-y-1">
                <span className="font-mono text-xs font-bold text-zinc-400">04</span>
                <p className="text-xs font-bold text-zinc-900 dark:text-[#F3EFE6]">Code Challenge</p>
                <p className="text-[11px] text-zinc-500 dark:text-[#8E887B]">Production Ticket</p>
              </div>
              <div className="rounded-xl border border-zinc-200/80 bg-white p-3 dark:border-[#2C2A26] dark:bg-[#141312] text-center space-y-1">
                <span className="font-mono text-xs font-bold text-zinc-400">05</span>
                <p className="text-xs font-bold text-zinc-900 dark:text-[#F3EFE6]">Take Notes</p>
                <p className="text-[11px] text-zinc-500 dark:text-[#8E887B]">Export Handbook</p>
              </div>
              <div className="rounded-xl border border-zinc-200/80 bg-white p-3 dark:border-[#2C2A26] dark:bg-[#141312] text-center space-y-1">
                <span className="font-mono text-xs font-bold text-zinc-400">06</span>
                <p className="text-xs font-bold text-zinc-900 dark:text-[#F3EFE6]">Push to GitHub</p>
                <p className="text-[11px] text-zinc-500 dark:text-[#8E887B]">Public Portfolio</p>
              </div>
            </div>
          </div>

          {/* In-Depth 6 Step Execution Cards */}
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Step 1: Watch Video First */}
            <div className="rounded-2xl border border-zinc-200/90 bg-stone-50/40 p-6 dark:border-[#2C2A26] dark:bg-[#1A1917] space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-950 text-white dark:bg-[#F3EFE6] dark:text-[#141312] font-mono font-bold text-xs shadow-xs">
                    01
                  </span>
                  <span className="font-mono text-xs font-semibold text-zinc-500 dark:text-[#8E887B] flex items-center gap-1">
                    <Video className="h-3.5 w-3.5" />
                    <span>51 Masterclasses (56+ Hrs)</span>
                  </span>
                </div>
                <h3 className="font-serif font-bold text-lg text-zinc-950 dark:text-[#F3EFE6]">
                  1. Watch Architectural Masterclasses First
                </h3>
                <p className="text-xs sm:text-sm text-zinc-600 dark:text-[#A19B8F] leading-relaxed font-sans">
                  Start every topic by watching the curated video masterclasses (51 high-impact videos totaling 56+ hours across the roadmap). Industry authorities (ByteByteGo, Hussein Nasser, TechWorld with Nana) break down distributed system topologies, packet journeys, and failure modes visually to build your mental model first.
                </p>
                <div className="rounded-xl bg-stone-100 dark:bg-[#141312] p-3 text-xs text-zinc-700 dark:text-[#DDD7CD] space-y-1.5 border border-zinc-200/60 dark:border-[#262420]">
                  <p className="font-semibold text-zinc-900 dark:text-[#F3EFE6]">What to do:</p>
                  <ul className="list-disc pl-4 space-y-1 text-zinc-600 dark:text-[#A19B8F]">
                    <li>Watch the Primary Masterclass with active focus</li>
                    <li>Switch to the Secondary Video for deep-dive nuances</li>
                    <li>Study wire protocol flowcharts & packet sequences visually</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Step 2: Read Literature Second */}
            <div className="rounded-2xl border border-zinc-200/90 bg-stone-50/40 p-6 dark:border-[#2C2A26] dark:bg-[#1A1917] space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-950 text-white dark:bg-[#F3EFE6] dark:text-[#141312] font-mono font-bold text-xs shadow-xs">
                    02
                  </span>
                  <span className="font-mono text-xs font-semibold text-zinc-500 dark:text-[#8E887B] flex items-center gap-1">
                    <BookOpen className="h-3.5 w-3.5" />
                    <span>Theory & Literature</span>
                  </span>
                </div>
                <h3 className="font-serif font-bold text-lg text-zinc-950 dark:text-[#F3EFE6]">
                  2. Reinforce & Deepen with Free Canonical Books
                </h3>
                <p className="text-xs sm:text-sm text-zinc-600 dark:text-[#A19B8F] leading-relaxed font-sans">
                  Now that you understand the visual architecture, solidify and deepen your knowledge by reading the literature. Each topic links directly to 100% free canonical texts (Martin Fowler, RFCs, Google SRE, Use The Index Luke) with zero paywalls.
                </p>
                <div className="rounded-xl bg-stone-100 dark:bg-[#141312] p-3 text-xs text-zinc-700 dark:text-[#DDD7CD] space-y-1.5 border border-zinc-200/60 dark:border-[#262420]">
                  <p className="font-semibold text-zinc-900 dark:text-[#F3EFE6]">What to do:</p>
                  <ul className="list-disc pl-4 space-y-1 text-zinc-600 dark:text-[#A19B8F]">
                    <li>Read the hardware/wire layer tradeoffs and formulas</li>
                    <li>Open the 100% free canonical chapter deep-link</li>
                    <li>Solidify edge cases, latency numbers & failure rules</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="rounded-2xl border border-zinc-200/90 bg-stone-50/40 p-6 dark:border-[#2C2A26] dark:bg-[#1A1917] space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-950 text-white dark:bg-[#F3EFE6] dark:text-[#141312] font-mono font-bold text-xs shadow-xs">
                    03
                  </span>
                  <span className="font-mono text-xs font-semibold text-rose-600 dark:text-rose-400 flex items-center gap-1">
                    <Mic className="h-3.5 w-3.5" />
                    <span>Mock Interview Simulator</span>
                  </span>
                </div>
                <h3 className="font-serif font-bold text-lg text-zinc-950 dark:text-[#F3EFE6]">
                  3. Run Timed Mock Technical Interview
                </h3>
                <p className="text-xs sm:text-sm text-zinc-600 dark:text-[#A19B8F] leading-relaxed font-sans">
                  Senior engineers are evaluated on spontaneous oral architectural defense. In every module, click &ldquo;Start Mock Interview&rdquo; to launch the 75s countdown simulator and verbally answer the WHAT, WHY, and HOW questions.
                </p>
                <div className="rounded-xl bg-stone-100 dark:bg-[#141312] p-3 text-xs text-zinc-700 dark:text-[#DDD7CD] space-y-1.5 border border-zinc-200/60 dark:border-[#262420]">
                  <p className="font-semibold text-zinc-900 dark:text-[#F3EFE6]">What to do:</p>
                  <ul className="list-disc pl-4 space-y-1 text-zinc-600 dark:text-[#A19B8F]">
                    <li>Click &ldquo;Start Mock Interview&rdquo; in the module header</li>
                    <li>Speak your defense aloud under the 75-second timer</li>
                    <li>Reveal the Staff Rubric & grade yourself (Mastered / Partial / Missed)</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="rounded-2xl border border-zinc-200/90 bg-stone-50/40 p-6 dark:border-[#2C2A26] dark:bg-[#1A1917] space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-950 text-white dark:bg-[#F3EFE6] dark:text-[#141312] font-mono font-bold text-xs shadow-xs">
                    04
                  </span>
                  <span className="font-mono text-xs font-semibold text-zinc-500 dark:text-[#8E887B] flex items-center gap-1">
                    <Code2 className="h-3.5 w-3.5" />
                    <span>Code Execution</span>
                  </span>
                </div>
                <h3 className="font-serif font-bold text-lg text-zinc-950 dark:text-[#F3EFE6]">
                  4. Code the Hands-On Engineering Ticket
                </h3>
                <p className="text-xs sm:text-sm text-zinc-600 dark:text-[#A19B8F] leading-relaxed font-sans">
                  Open the topic challenge ticket (e.g. TICKET-001) with realistic latency and concurrency criteria. Study the production blueprints in Go, TypeScript, Python, or Java and write the code.
                </p>
                <div className="rounded-xl bg-stone-100 dark:bg-[#141312] p-3 text-xs text-zinc-700 dark:text-[#DDD7CD] space-y-1.5 border border-zinc-200/60 dark:border-[#262420]">
                  <p className="font-semibold text-zinc-900 dark:text-[#F3EFE6]">What to do:</p>
                  <ul className="list-disc pl-4 space-y-1 text-zinc-600 dark:text-[#A19B8F]">
                    <li>Implement the ticket in your local development editor</li>
                    <li>Enforce zero-toy standards with real concurrency</li>
                    <li>Run performance benchmarks to verify latency SLOs</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Step 5 */}
            <div className="rounded-2xl border border-zinc-200/90 bg-stone-50/40 p-6 dark:border-[#2C2A26] dark:bg-[#1A1917] space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-950 text-white dark:bg-[#F3EFE6] dark:text-[#141312] font-mono font-bold text-xs shadow-xs">
                    05
                  </span>
                  <span className="font-mono text-xs font-semibold text-zinc-500 dark:text-[#8E887B] flex items-center gap-1">
                    <FileText className="h-3.5 w-3.5" />
                    <span>Notes Studio</span>
                  </span>
                </div>
                <h3 className="font-serif font-bold text-lg text-zinc-950 dark:text-[#F3EFE6]">
                  5. Take Notes & Export Your Handbook
                </h3>
                <p className="text-xs sm:text-sm text-zinc-600 dark:text-[#A19B8F] leading-relaxed font-sans">
                  Open the slide-over Notes Studio (press <kbd className="font-mono text-[10px] px-1 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800">N</kbd>) to document your mental models, benchmark measurements, and gotchas.
                </p>
                <div className="rounded-xl bg-stone-100 dark:bg-[#141312] p-3 text-xs text-zinc-700 dark:text-[#DDD7CD] space-y-1.5 border border-zinc-200/60 dark:border-[#262420]">
                  <p className="font-semibold text-zinc-900 dark:text-[#F3EFE6]">What to do:</p>
                  <ul className="list-disc pl-4 space-y-1 text-zinc-600 dark:text-[#A19B8F]">
                    <li>Record tradeoffs, diagrams, and personal insights</li>
                    <li>Notes persist automatically in your local storage</li>
                    <li>Export your complete unified Markdown Handbook</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Step 6 */}
            <div className="rounded-2xl border border-zinc-200/90 bg-stone-50/40 p-6 dark:border-[#2C2A26] dark:bg-[#1A1917] space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-950 text-white dark:bg-[#F3EFE6] dark:text-[#141312] font-mono font-bold text-xs shadow-xs">
                    06
                  </span>
                  <span className="font-mono text-xs font-semibold text-zinc-500 dark:text-[#8E887B] flex items-center gap-1">
                    <GitBranch className="h-3.5 w-3.5" />
                    <span>GitHub Portfolio</span>
                  </span>
                </div>
                <h3 className="font-serif font-bold text-lg text-zinc-950 dark:text-[#F3EFE6]">
                  6. Push Clean Code to Public GitHub
                </h3>
                <p className="text-xs sm:text-sm text-zinc-600 dark:text-[#A19B8F] leading-relaxed font-sans">
                  Build verifiable proof of work for employers. Structure your code into clean directories, write professional commit messages, and push your benchmarked projects to public GitHub repositories.
                </p>
                <div className="rounded-xl bg-stone-100 dark:bg-[#141312] p-3 text-xs text-zinc-700 dark:text-[#DDD7CD] space-y-1.5 border border-zinc-200/60 dark:border-[#262420]">
                  <p className="font-semibold text-zinc-900 dark:text-[#F3EFE6]">What to do:</p>
                  <ul className="list-disc pl-4 space-y-1 text-zinc-600 dark:text-[#A19B8F]">
                    <li>Commit clean implementations with Conventional Commits</li>
                    <li>Include READMEs with architecture & benchmark output</li>
                    <li>Link public repositories in your hiring portfolio</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* GitHub Repository Layout & Terminal Workflow Guide */}
          <div className="mt-12 rounded-2xl border border-zinc-300 dark:border-[#2C2A26] bg-stone-900 text-stone-100 p-6 sm:p-8 space-y-5 shadow-lg">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-stone-800 text-emerald-400 font-mono">
                  <Terminal className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-lg text-white">
                    Recommended GitHub Repository Layout & Git Workflow
                  </h3>
                  <p className="text-xs text-stone-400">
                    How to organize your code, commit history, and showcase verifiable proof of work
                  </p>
                </div>
              </div>
              <span className="font-mono text-xs bg-emerald-950/80 text-emerald-400 border border-emerald-800/80 px-3 py-1 rounded-full self-start sm:self-auto font-semibold">
                GitHub Ready
              </span>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {/* Directory Structure */}
              <div className="space-y-2">
                <span className="font-mono text-xs font-semibold text-stone-400 uppercase tracking-wider">
                  Suggested Directory Tree
                </span>
                <pre className="p-4 rounded-xl bg-stone-950 border border-stone-800 text-xs font-mono text-stone-300 overflow-x-auto leading-relaxed">
{`backend-engineering-mastery/
├── 01-networking-and-hardware/
│   ├── topic-01-tcp-udp-sockets/
│   │   ├── main.go (or index.ts)
│   │   ├── benchmark_test.go
│   │   └── README.md
│   └── topic-02-concurrency-memory/
├── 02-apis-and-protocols/
│   ├── topic-03-http2-http3/
│   └── topic-05-grpc-protobuf/
├── capstones/
│   ├── 01-distributed-rate-limiter/
│   └── 02-event-driven-saga/
└── notes/
    └── backend-handbook.md`}
                </pre>
              </div>

              {/* Terminal Commands */}
              <div className="space-y-2">
                <span className="font-mono text-xs font-semibold text-stone-400 uppercase tracking-wider">
                  Git Push Commands
                </span>
                <pre className="p-4 rounded-xl bg-stone-950 border border-stone-800 text-xs font-mono text-emerald-400 overflow-x-auto leading-relaxed">
{`# 1. Initialize local repository
git init backend-engineering-mastery
cd backend-engineering-mastery

# 2. Add topic implementation and tests
git add .
git commit -m "feat(networking): zero-copy TCP socket server with epoll"

# 3. Push to your public GitHub
git remote add origin https://github.com/<username>/backend-engineering-mastery.git
git branch -M main
git push -u origin main`}
                </pre>
                <p className="text-xs text-stone-400 pt-1">
                  💡 Tip: Document latency benchmarks (p99 ms) and RPS numbers directly in your topic READMEs.
                </p>
              </div>
            </div>
          </div>

          {/* Capstone Box & Quick Links */}
          <div className="mt-10 rounded-2xl border border-zinc-200/90 bg-stone-50/50 dark:border-[#2C2A26] dark:bg-[#1A1917] p-6 sm:p-7 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2.5 text-zinc-950 dark:text-[#F3EFE6]">
                <Trophy className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                <h4 className="font-serif font-bold text-base sm:text-lg">The 7 Production Portfolio Capstones</h4>
              </div>
              <button
                onClick={() => handleSwitchTab("capstones")}
                className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-zinc-900 hover:text-zinc-600 dark:text-[#F3EFE6] dark:hover:text-[#A19B8F] transition-colors shrink-0"
              >
                <span>View 7 Capstone Specifications</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-[#A19B8F] leading-relaxed">
              At the conclusion of each Phase, build an industry-grade portfolio capstone (Distributed Rate Limiter, Raft Consensus, Event-Driven Outbox). Record your GitHub URL in the Capstone Viewer to mark your achievement.
            </p>
          </div>

          {/* Dedicated Mock Technical Interview & Whiteboard Defense Simulator Guide */}
          <div className="mt-8 rounded-2xl border-2 border-purple-500/30 bg-gradient-to-br from-purple-50/70 via-stone-50/50 to-stone-100/60 p-6 sm:p-8 dark:border-purple-500/30 dark:from-purple-950/20 dark:via-[#1A1917] dark:to-[#141312] space-y-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-purple-200/60 dark:border-purple-900/40 pb-5">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-purple-700 dark:text-purple-400 font-mono text-xs font-bold uppercase tracking-wider">
                  <Mic className="h-4 w-4" />
                  <span>Integrated Feature • Mock Technical Interview Simulator</span>
                </div>
                <h3 className="font-serif font-bold text-xl sm:text-2xl text-zinc-950 dark:text-[#F3EFE6]">
                  Senior & Staff Technical Mock Interview Simulator
                </h3>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => handleSwitchTab("oral-exams")}
                  className="inline-flex items-center gap-2 rounded-xl bg-purple-700 hover:bg-purple-800 dark:bg-purple-600 dark:hover:bg-purple-500 text-white px-4 py-2.5 text-xs font-bold transition-all shadow-xs active:scale-95"
                >
                  <Mic className="h-3.5 w-3.5" />
                  <span>Launch Simulator (93 Prompts)</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            <p className="text-sm sm:text-[15px] text-zinc-700 dark:text-[#DDD7CD] leading-relaxed font-serif">
              In senior engineering loops at high-bar tech companies, coding syntax is only 30% of the evaluation. Over 70% of hiring committee decisions hinge on your ability to <strong>defend architectural decisions out loud under realistic time pressure</strong>. For every single one of the 31 topics, we have integrated an interactive <strong>Technical Mock Interview Simulator</strong> equipped with 3 authentic staff-level prompts (93 total), a real-time 75-second countdown timer, and benchmark grading rubrics.
            </p>

            <div className="grid gap-4 sm:grid-cols-3 pt-1">
              <div className="rounded-xl border border-purple-200/70 bg-white/90 dark:border-[#2C2A26] dark:bg-[#141312] p-4 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-md bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 font-mono text-xs font-bold">1</span>
                  <h4 className="font-bold text-xs sm:text-sm text-zinc-900 dark:text-[#F3EFE6]">[WHAT] Abstraction & Invariants</h4>
                </div>
                <p className="text-xs text-zinc-600 dark:text-[#A19B8F] leading-relaxed">
                  State the fundamental mechanism and mental model in two crisp sentences without hesitation. Zero fluff, zero filler.
                </p>
              </div>

              <div className="rounded-xl border border-purple-200/70 bg-white/90 dark:border-[#2C2A26] dark:bg-[#141312] p-4 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-md bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 font-mono text-xs font-bold">2</span>
                  <h4 className="font-bold text-xs sm:text-sm text-zinc-900 dark:text-[#F3EFE6]">[WHY] Trade-offs & Alternatives</h4>
                </div>
                <p className="text-xs text-zinc-600 dark:text-[#A19B8F] leading-relaxed">
                  Justify why you chose this design over 2 viable alternatives, quantifying latency, memory, and operational cost curves.
                </p>
              </div>

              <div className="rounded-xl border border-purple-200/70 bg-white/90 dark:border-[#2C2A26] dark:bg-[#141312] p-4 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-md bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300 font-mono text-xs font-bold">3</span>
                  <h4 className="font-bold text-xs sm:text-sm text-zinc-900 dark:text-[#F3EFE6]">[HOW] Pathologies & Failures</h4>
                </div>
                <p className="text-xs text-zinc-600 dark:text-[#A19B8F] leading-relaxed">
                  Explain exactly how the subsystem behaves under network partitions, split-brain, memory saturation, or crash loops.
                </p>
              </div>
            </div>

            <div className="rounded-xl border border-zinc-200 dark:border-[#2C2A26] bg-stone-100/70 dark:bg-[#1A1917] p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 text-zinc-700 dark:text-[#DDD7CD]">
                <ShieldCheck className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>
                  <strong>Interactive Scoring:</strong> Click <em>&ldquo;Start Mock Interview&rdquo;</em> in any topic to test yourself against the clock, reveal the staff breakdown, and self-grade your performance (Mastered, Partial, or Missed).
                </span>
              </div>
              <button
                onClick={() => onEnterRoadmap()}
                className="inline-flex items-center gap-1.5 font-mono font-bold text-zinc-900 hover:text-zinc-600 dark:text-[#F3EFE6] dark:hover:text-[#A19B8F] shrink-0 underline"
              >
                <span>Try in Topic #01</span>
                <ArrowRight className="h-3 w-3" />
              </button>
            </div>
          </div>

          {/* Deliberate Practice & Engineering Mindset Callout */}
          <div className="mt-12 rounded-2xl border-2 border-amber-500/40 bg-gradient-to-br from-amber-50/70 via-stone-50/50 to-stone-100/60 p-6 sm:p-8 dark:border-amber-500/30 dark:from-amber-950/25 dark:via-[#1A1917] dark:to-[#141312] space-y-4 shadow-sm">
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-500/15 text-amber-700 dark:text-amber-400 font-bold">
                <Flame className="h-4 w-4" />
              </span>
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-400">
                Core Engineering Principle • The Law of Deliberate Practice
              </span>
            </div>

            <h3 className="font-serif font-bold text-xl sm:text-2xl text-zinc-950 dark:text-[#F3EFE6] tracking-tight">
              Watching Videos & Reading Alone is Never Enough — True Mastery is Built in the Terminal
            </h3>

            <p className="text-sm sm:text-base text-zinc-700 dark:text-[#DDD7CD] leading-relaxed font-serif">
              Merely consuming video masterclasses and reading architectural books creates an <em>illusion of competence</em>. In distributed systems and backend engineering, no one is hired or respected for how many hours of video they streamed. You are evaluated solely on <strong>production reliability, concurrency resilience, latency SLAs, and how your systems survive failure under fire</strong>. You cannot learn to swim by watching others from the pool deck — you must jump in and write code.
            </p>

            <div className="grid gap-3 sm:grid-cols-3 pt-2">
              <div className="rounded-xl border border-amber-500/20 bg-white/80 dark:bg-[#1A1917]/80 p-4 space-y-1.5 shadow-2xs">
                <p className="font-mono text-xs font-bold text-zinc-900 dark:text-[#F3EFE6] flex items-center gap-1.5">
                  <Check className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400" />
                  Code Everything From Scratch
                </p>
                <p className="text-xs text-zinc-600 dark:text-[#A19B8F] leading-relaxed">
                  Never copy-paste mindlessly. Type out socket handlers, database transactions, and cache invalidation logic. Experience compiler errors and runtime race conditions firsthand.
                </p>
              </div>

              <div className="rounded-xl border border-amber-500/20 bg-white/80 dark:bg-[#1A1917]/80 p-4 space-y-1.5 shadow-2xs">
                <p className="font-mono text-xs font-bold text-zinc-900 dark:text-[#F3EFE6] flex items-center gap-1.5">
                  <Check className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400" />
                  Break Systems Under Load
                </p>
                <p className="text-xs text-zinc-600 dark:text-[#A19B8F] leading-relaxed">
                  Kill database replicas, inject artificial 400ms network packet jitter, flood channels with poison pills, and verify that your circuit breakers and dead-letter queues hold up.
                </p>
              </div>

              <div className="rounded-xl border border-amber-500/20 bg-white/80 dark:bg-[#1A1917]/80 p-4 space-y-1.5 shadow-2xs">
                <p className="font-mono text-xs font-bold text-zinc-900 dark:text-[#F3EFE6] flex items-center gap-1.5">
                  <Check className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400" />
                  Measure, Qualify & Push
                </p>
                <p className="text-xs text-zinc-600 dark:text-[#A19B8F] leading-relaxed">
                  Measure p99 latencies, run load tests, document architectural trade-offs in READMEs, and push your 7 portfolio capstones to GitHub. That is how you qualify yourself as an elite engineer.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Launch Banner */}
          <div className="mt-12 rounded-2xl border border-zinc-300 dark:border-[#35332D] bg-stone-100/80 dark:bg-[#201F1B] p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
            <div className="space-y-1 text-center sm:text-left">
              <h3 className="font-serif font-bold text-xl text-zinc-950 dark:text-[#F3EFE6]">
                Ready to Start Your Engineering Journey?
              </h3>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-[#A19B8F]">
                Begin now with Topic #01: Network Sockets, TCP/UDP Wire Mechanics & Packet Journeys.
              </p>
            </div>

            <button
              onClick={() => onEnterRoadmap()}
              className="group flex items-center gap-2.5 rounded-xl bg-zinc-950 px-7 py-3.5 text-xs sm:text-sm font-bold text-white hover:bg-zinc-800 dark:bg-[#F3EFE6] dark:text-[#141312] dark:hover:bg-white transition-all shadow-md active:scale-[0.98] shrink-0"
            >
              <span>Launch Topic #01 Now</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
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
          <div className="text-center flex flex-col items-center max-w-3xl mx-auto space-y-4 pb-10 border-b border-zinc-200/80 dark:border-[#2C2A26]">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold tracking-tight text-zinc-950 dark:text-[#F3EFE6]">
              The 7 Architectural Mastery Phases
            </h2>
            <p className="text-base sm:text-lg font-serif text-zinc-600 dark:text-[#DDD7CD] leading-relaxed max-w-2xl mx-auto">
              31 exhaustive production deep-dives arranged in cognitive dependency order. Master networking primitives, storage engines, distributed coordination, and staff architecture.
            </p>

            <button
              onClick={() => onEnterRoadmap()}
              className="mt-2 inline-flex items-center gap-2 rounded-xl bg-zinc-950 px-6 py-3 text-xs sm:text-sm font-bold text-white hover:bg-zinc-800 dark:bg-[#F3EFE6] dark:text-[#141312] dark:hover:bg-white transition-all shrink-0 shadow-sm"
            >
              <span>Launch Full Roadmap</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          {/* Metric Stats Grid */}
          <div className="my-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            <div className="rounded-2xl border border-zinc-200/80 bg-stone-50/60 dark:border-[#2C2A26] dark:bg-[#1A1917] p-4 text-center shadow-2xs">
              <span className="block font-mono text-2xl sm:text-3xl font-bold text-zinc-950 dark:text-[#F3EFE6]">
                07
              </span>
              <span className="text-[11px] sm:text-xs font-serif font-medium text-zinc-600 dark:text-[#A19B8F]">
                Architectural Phases
              </span>
            </div>
            <div className="rounded-2xl border border-zinc-200/80 bg-stone-50/60 dark:border-[#2C2A26] dark:bg-[#1A1917] p-4 text-center shadow-2xs">
              <span className="block font-mono text-2xl sm:text-3xl font-bold text-zinc-950 dark:text-[#F3EFE6]">
                31
              </span>
              <span className="text-[11px] sm:text-xs font-serif font-medium text-zinc-600 dark:text-[#A19B8F]">
                Core Modules
              </span>
            </div>
            <div className="rounded-2xl border border-zinc-200/80 bg-stone-50/60 dark:border-[#2C2A26] dark:bg-[#1A1917] p-4 text-center shadow-2xs">
              <span className="block font-mono text-2xl sm:text-3xl font-bold text-zinc-950 dark:text-[#F3EFE6]">
                51
              </span>
              <span className="text-[11px] sm:text-xs font-serif font-medium text-zinc-600 dark:text-[#A19B8F]">
                Masterclass Videos
              </span>
            </div>
            <div className="rounded-2xl border border-zinc-200/80 bg-stone-50/60 dark:border-[#2C2A26] dark:bg-[#1A1917] p-4 text-center shadow-2xs">
              <span className="block font-mono text-2xl sm:text-3xl font-bold text-zinc-950 dark:text-[#F3EFE6]">
                56+
              </span>
              <span className="text-[11px] sm:text-xs font-serif font-medium text-zinc-600 dark:text-[#A19B8F]">
                Video Watch Hours
              </span>
            </div>
            <div className="rounded-2xl border border-zinc-200/80 bg-stone-50/60 dark:border-[#2C2A26] dark:bg-[#1A1917] p-4 text-center shadow-2xs">
              <span className="block font-mono text-2xl sm:text-3xl font-bold text-zinc-950 dark:text-[#F3EFE6]">
                93
              </span>
              <span className="text-[11px] sm:text-xs font-serif font-medium text-zinc-600 dark:text-[#A19B8F]">
                Mock Interview Qs
              </span>
            </div>
            <div className="rounded-2xl border border-zinc-200/80 bg-stone-50/60 dark:border-[#2C2A26] dark:bg-[#1A1917] p-4 text-center shadow-2xs">
              <span className="block font-mono text-2xl sm:text-3xl font-bold text-zinc-950 dark:text-[#F3EFE6]">
                07
              </span>
              <span className="text-[11px] sm:text-xs font-serif font-medium text-zinc-600 dark:text-[#A19B8F]">
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
                              {String(topic.number).padStart(2, "0")}. {topic.title}
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
        <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 flex flex-col justify-center overflow-y-auto no-scrollbar">
          {/* Breadcrumb / Back to Home */}
          <div className="mb-4 sm:mb-6">
            <button
              onClick={() => handleSwitchTab("home")}
              className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-zinc-500 hover:text-zinc-950 dark:text-[#A19B8F] dark:hover:text-[#F3EFE6] transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back to Home</span>
            </button>
          </div>

          <div className="grid gap-8 lg:gap-12 lg:grid-cols-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-6 space-y-4 sm:space-y-5">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold tracking-tight text-zinc-950 dark:text-[#F3EFE6]">
                Senior Technical Whiteboard & Oral Exam Simulator
              </h2>

              <p className="text-sm sm:text-base lg:text-lg font-serif text-zinc-600 dark:text-[#DDD7CD] leading-relaxed">
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
