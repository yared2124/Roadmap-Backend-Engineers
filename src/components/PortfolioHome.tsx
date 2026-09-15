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
  Database,
  Server,
  ShieldCheck,
  Zap,
  Clock,
  Compass,
  Moon,
  Sun,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Trophy,
  GitBranch,
} from "lucide-react";
import { ROADMAP_PHASES, ROADMAP_TOPICS } from "../data/roadmap";
import { CAPSTONE_PROJECTS } from "../data/capstones";
import { RoadmapTopic } from "../types/roadmap";

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
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen w-full bg-white text-zinc-900 dark:bg-[#111827] dark:text-gray-100 selection:bg-zinc-900 selection:text-white dark:selection:bg-white dark:selection:text-black font-sans transition-colors duration-200">
      {/* 1. Global Navigation Header */}
      <header className="sticky top-0 z-40 w-full border-b border-zinc-200/80 bg-white/90 backdrop-blur-md dark:border-gray-800 dark:bg-[#111827]/90">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-950 text-white font-mono font-bold text-base dark:bg-white dark:text-gray-950 shadow-xs">
              B
            </div>
            <div>
              <span className="font-extrabold tracking-tight text-zinc-950 dark:text-white text-base sm:text-lg">
                Backend Engineer Hub
              </span>
              <span className="hidden sm:inline-block ml-2 text-xs font-mono text-zinc-500 dark:text-gray-400">
                v1.0
              </span>
            </div>
          </div>

          {/* Center Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-6 text-xs sm:text-sm font-semibold text-zinc-600 dark:text-gray-400">
            <button
              onClick={() => scrollToSection("curriculum-phases")}
              className="hover:text-zinc-950 dark:hover:text-white transition-colors"
            >
              Curriculum
            </button>
            <button
              onClick={() => scrollToSection("study-formula")}
              className="hover:text-zinc-950 dark:hover:text-white transition-colors"
            >
              Methodology
            </button>
            <button
              onClick={() => scrollToSection("interview-engine")}
              className="hover:text-zinc-950 dark:hover:text-white transition-colors"
            >
              Oral Exams
            </button>
            <button
              onClick={() => scrollToSection("capstone-projects")}
              className="hover:text-zinc-950 dark:hover:text-white transition-colors"
            >
              Capstones
            </button>
          </nav>

          {/* Right Action: Theme Toggle & Prominent Roadmap Button */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              onClick={onToggleTheme}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-200 text-zinc-700 hover:bg-zinc-100 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-750 transition-colors"
              aria-label="Toggle Theme"
            >
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>

            {/* Top Right "Roadmap" Action Button */}
            <button
              onClick={() => onEnterRoadmap()}
              className="group flex items-center gap-2 rounded-xl bg-zinc-950 px-4 py-2 text-xs sm:text-sm font-bold text-white shadow-xs hover:bg-zinc-800 dark:bg-white dark:text-gray-950 dark:hover:bg-zinc-200 transition-all active:scale-[0.98]"
            >
              <span>Roadmap</span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>
      </header>

      {/* 2. Hero Section */}
      <section className="relative overflow-hidden border-b border-zinc-200/80 dark:border-gray-800 bg-gradient-to-b from-zinc-50/50 via-white to-white dark:from-[#111827] dark:via-[#111827] dark:to-[#0f172a] py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center flex flex-col items-center space-y-6">
            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-zinc-950 dark:text-white leading-[1.1] max-w-4xl">
              Backend Engineering Roadmap & Architecture Mastery
            </h1>

            {/* Subtitle / Description */}
            <p className="text-base sm:text-lg text-zinc-600 dark:text-gray-400 font-normal leading-relaxed max-w-2xl mx-auto">
              A comprehensive, production-grade learning system designed to bridge the gap between building toy APIs and architecting resilient, high-throughput distributed systems.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
              <button
                onClick={() => onEnterRoadmap()}
                className="group flex items-center gap-2.5 rounded-xl bg-zinc-950 px-6 py-3.5 text-sm sm:text-base font-bold text-white shadow-md hover:bg-zinc-800 dark:bg-white dark:text-gray-950 dark:hover:bg-zinc-200 transition-all active:scale-[0.98]"
              >
                <span>Start Learning</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={() => scrollToSection("curriculum-phases")}
                className="flex items-center gap-2 rounded-xl border border-zinc-300 bg-white px-5 py-3.5 text-sm sm:text-base font-bold text-zinc-900 hover:bg-zinc-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700 transition-colors shadow-2xs"
              >
                <Compass className="h-4 w-4 text-zinc-500" />
                <span>Explore Curriculum</span>
              </button>
            </div>

            {/* Progress Bar indicator if user already has progress */}
            {completedCount > 0 && (
              <div className="inline-flex items-center gap-3 rounded-xl border border-zinc-200 bg-zinc-50 p-3 text-xs dark:border-gray-700 dark:bg-gray-900/80 font-mono font-semibold">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                <span>Your Current Progress: {completedCount} of {totalTopics} modules completed ({Math.round((completedCount / totalTopics) * 100)}%)</span>
                <button
                  onClick={() => onEnterRoadmap()}
                  className="text-emerald-600 dark:text-emerald-400 hover:underline font-bold"
                >
                  Resume
                </button>
              </div>
            )}
          </div>

          {/* Key Metric Stats Grid */}
          <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-6 border-t border-zinc-200/80 pt-10 dark:border-gray-800 text-center">
            <div className="space-y-1 text-center">
              <span className="block font-mono text-3xl sm:text-4xl font-black text-zinc-950 dark:text-white">
                07
              </span>
              <span className="text-xs sm:text-sm font-semibold text-zinc-500 dark:text-gray-400">
                Architectural Phases
              </span>
            </div>
            <div className="space-y-1 text-center">
              <span className="block font-mono text-3xl sm:text-4xl font-black text-zinc-950 dark:text-white">
                31
              </span>
              <span className="text-xs sm:text-sm font-semibold text-zinc-500 dark:text-gray-400">
                Production Deep Dives
              </span>
            </div>
            <div className="space-y-1 text-center">
              <span className="block font-mono text-3xl sm:text-4xl font-black text-zinc-950 dark:text-white">
                93
              </span>
              <span className="text-xs sm:text-sm font-semibold text-zinc-500 dark:text-gray-400">
                Whiteboard Oral Questions
              </span>
            </div>
            <div className="space-y-1 text-center">
              <span className="block font-mono text-3xl sm:text-4xl font-black text-zinc-950 dark:text-white">
                07
              </span>
              <span className="text-xs sm:text-sm font-semibold text-zinc-500 dark:text-gray-400">
                Portfolio Capstones
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. The 5-Stage Engineering Study Formula */}
      <section id="study-formula" className="py-16 sm:py-20 border-b border-zinc-200/80 dark:border-gray-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl space-y-3">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              Systematic Learning Architecture
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-950 dark:text-white">
              The 5-Stage Engineering Study Lifecycle
            </h2>
            <p className="text-sm sm:text-base text-zinc-600 dark:text-gray-400">
              Every single module follows an end-to-end pedagogical blueprint designed to instill authentic mental models, rigorous trade-off evaluation, and verifiable implementation skills.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {/* Stage 1 */}
            <div className="rounded-2xl border border-zinc-200 bg-zinc-50/50 p-5 dark:border-gray-700 dark:bg-gray-800/30 space-y-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-900 text-white dark:bg-gray-100 dark:text-gray-950 font-mono font-bold text-sm">
                01
              </div>
              <h3 className="font-bold text-sm sm:text-base text-zinc-950 dark:text-white">
                Canonical Video Masterclass
              </h3>
              <p className="text-xs text-zinc-600 dark:text-gray-400 leading-relaxed">
                High-yield video lectures (30–60 min) dissecting architectural intent, protocols, and underlying systems mechanics.
              </p>
            </div>

            {/* Stage 2 */}
            <div className="rounded-2xl border border-zinc-200 bg-zinc-50/50 p-5 dark:border-gray-700 dark:bg-gray-800/30 space-y-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-900 text-white dark:bg-gray-100 dark:text-gray-950 font-mono font-bold text-sm">
                02
              </div>
              <h3 className="font-bold text-sm sm:text-base text-zinc-950 dark:text-white">
                Authoritative Literature
              </h3>
              <p className="text-xs text-zinc-600 dark:text-gray-400 leading-relaxed">
                Specific chapters from foundational engineering texts: Martin Fowler, Martin Kleppmann (DDIA), and Ilya Grigorik.
              </p>
            </div>

            {/* Stage 3 */}
            <div className="rounded-2xl border border-zinc-200 bg-zinc-50/50 p-5 dark:border-gray-700 dark:bg-gray-800/30 space-y-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-900 text-white dark:bg-gray-100 dark:text-gray-950 font-mono font-bold text-sm">
                03
              </div>
              <h3 className="font-bold text-sm sm:text-base text-zinc-950 dark:text-white">
                Visual Architecture Flow
              </h3>
              <p className="text-xs text-zinc-600 dark:text-gray-400 leading-relaxed">
                Interactive flowcharts mapping client, gateway, cache, database, and dead-letter queue execution paths and latencies.
              </p>
            </div>

            {/* Stage 4 */}
            <div className="rounded-2xl border border-zinc-200 bg-zinc-50/50 p-5 dark:border-gray-700 dark:bg-gray-800/30 space-y-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-900 text-white dark:bg-gray-100 dark:text-gray-950 font-mono font-bold text-sm">
                04
              </div>
              <h3 className="font-bold text-sm sm:text-base text-zinc-950 dark:text-white">
                Polyglot Code Blueprints
              </h3>
              <p className="text-xs text-zinc-600 dark:text-gray-400 leading-relaxed">
                Production implementations switchable across TypeScript/Node.js, Go, Python, and Java with clean dependency layers.
              </p>
            </div>

            {/* Stage 5 */}
            <div className="rounded-2xl border border-zinc-200 bg-zinc-50/50 p-5 dark:border-gray-700 dark:bg-gray-800/30 space-y-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-900 text-white dark:bg-gray-100 dark:text-gray-950 font-mono font-bold text-sm">
                05
              </div>
              <h3 className="font-bold text-sm sm:text-base text-zinc-950 dark:text-white">
                Systems Note Studio
              </h3>
              <p className="text-xs text-zinc-600 dark:text-gray-400 leading-relaxed">
                Structured Markdown editor with senior templates for documenting trade-offs, edge cases, and exporting master notes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Whiteboard Oral Interview Engine */}
      <section id="interview-engine" className="py-16 sm:py-20 border-b border-zinc-200/80 dark:border-gray-800 bg-zinc-50/30 dark:bg-[#0f172a]/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-12 items-center">
            <div className="lg:col-span-6 space-y-4">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
                Executive Technical Communication
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-zinc-950 dark:text-white">
                Senior Technical Whiteboard & Oral Exam Simulator
              </h2>
              <p className="text-sm sm:text-base text-zinc-600 dark:text-gray-400 leading-relaxed">
                Senior and Staff candidates stand out not by typing trivial syntax, but by articulating architectural trade-offs aloud under realistic time constraints.
              </p>
              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-zinc-950 text-white dark:bg-white dark:text-black font-mono text-xs font-bold">
                    1
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-zinc-900 dark:text-gray-100">
                      [WHAT] The Core Abstraction & Mental Model
                    </h4>
                    <p className="text-xs text-zinc-500 dark:text-gray-400">
                      State the architectural definition and purpose in two crisp sentences without hesitation.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-zinc-950 text-white dark:bg-white dark:text-black font-mono text-xs font-bold">
                    2
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-zinc-900 dark:text-gray-100">
                      [WHY] Trade-offs, Latency & Failure Modes
                    </h4>
                    <p className="text-xs text-zinc-500 dark:text-gray-400">
                      Contrast against alternatives, quantify disk vs memory I/O latency, and state engineering compromises.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-zinc-950 text-white dark:bg-white dark:text-black font-mono text-xs font-bold">
                    3
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-zinc-900 dark:text-gray-100">
                      [HOW] Production Hardening & Edge Cases
                    </h4>
                    <p className="text-xs text-zinc-500 dark:text-gray-400">
                      Address concurrency races, cache stampedes, distributed mutex leases, and recovery fallbacks.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Simulation Preview Card */}
            <div className="lg:col-span-6 rounded-2xl border border-zinc-200 bg-white p-6 shadow-md dark:border-gray-700 dark:bg-gray-800 space-y-4">
              <div className="flex items-center justify-between border-b border-zinc-100 dark:border-gray-700 pb-3">
                <div className="flex items-center gap-2">
                  <Mic className="h-4 w-4 text-rose-500" />
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-zinc-950 dark:text-white">
                    Active Oral Exam Engine
                  </span>
                </div>
                <span className="font-mono text-xs font-bold text-zinc-500 dark:text-gray-400">
                  75s Countdown Timer
                </span>
              </div>

              <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 dark:border-gray-700 dark:bg-gray-900/80 space-y-2">
                <span className="inline-block px-2 py-0.5 rounded text-[10.5px] font-mono font-bold bg-blue-100 text-blue-900 dark:bg-blue-950 dark:text-blue-300">
                  [WHY CATEGORY]
                </span>
                <p className="text-sm font-bold text-zinc-900 dark:text-gray-100">
                  &ldquo;Why is an append-only WAL (Write-Ahead Log) preferred over in-place B-Tree updates for high-throughput database writes?&rdquo;
                </p>
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-xs text-zinc-500 dark:text-gray-400 font-medium">
                  Self-Grading: Mastered (+100%) • Partial (+50%) • Missed (0%)
                </span>
                <button
                  onClick={() => onEnterRoadmap()}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-rose-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-rose-700 transition-colors"
                >
                  <Terminal className="h-3.5 w-3.5" />
                  <span>Try in Roadmap</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. The 7 Curriculum Phases */}
      <section id="curriculum-phases" className="py-16 sm:py-20 border-b border-zinc-200/80 dark:border-gray-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="max-w-2xl space-y-2">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                Curriculum Progression
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-950 dark:text-white">
                7 Architectural Phases • 31 Core Modules
              </h2>
              <p className="text-sm text-zinc-600 dark:text-gray-400">
                Structured in sequential order from network wire physics to enterprise cloud orchestration.
              </p>
            </div>

            <button
              onClick={() => onEnterRoadmap()}
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-zinc-950 dark:text-white hover:underline shrink-0"
            >
              <span>View All 31 Modules</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {ROADMAP_PHASES.map((phase) => (
              <div
                key={phase.id}
                className="flex flex-col justify-between rounded-2xl border border-zinc-200 bg-white p-5 hover:border-zinc-400 dark:border-gray-700 dark:bg-gray-800 dark:hover:border-gray-500 transition-all shadow-xs"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-black tracking-wider text-zinc-950 dark:text-white bg-zinc-100 dark:bg-gray-700 px-2.5 py-1 rounded-md">
                      PHASE 0{phase.id}
                    </span>
                    <span className="font-mono text-xs font-bold text-zinc-400">
                      {phase.topics.length} Modules
                    </span>
                  </div>

                  <h3 className="font-extrabold text-base text-zinc-950 dark:text-white">
                    {phase.name}
                  </h3>

                  <p className="text-xs text-zinc-600 dark:text-gray-400 leading-relaxed">
                    {phase.description}
                  </p>

                  <div className="border-t border-zinc-100 dark:border-gray-800 pt-3 space-y-1.5">
                    {phase.topics.slice(0, 3).map((topic) => (
                      <button
                        key={topic.id}
                        onClick={() => onEnterRoadmap(topic)}
                        className="group flex w-full items-center justify-between text-left text-xs font-semibold text-zinc-700 dark:text-gray-300 hover:text-zinc-950 dark:hover:text-white"
                      >
                        <span className="truncate pr-2">
                          #{String(topic.number).padStart(2, "0")} {topic.title}
                        </span>
                        <ChevronRight className="h-3 w-3 text-zinc-400 transition-transform group-hover:translate-x-0.5" />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-zinc-100 dark:border-gray-700">
                  <button
                    onClick={() => onEnterRoadmap(phase.topics[0])}
                    className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-zinc-100 py-2 text-xs font-bold text-zinc-900 hover:bg-zinc-200 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700 transition-colors"
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
      <section id="capstone-projects" className="py-16 sm:py-24 border-b border-zinc-200/80 dark:border-gray-800 bg-linear-to-b from-zinc-50/70 via-white to-zinc-50/40 dark:from-[#0b1120] dark:via-[#0f172a] dark:to-[#0b1120]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="max-w-2xl space-y-2">
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-zinc-950 dark:text-white">
                7 Portfolio-Grade Capstone Projects
              </h2>
              <p className="text-sm sm:text-base text-zinc-600 dark:text-gray-300 leading-relaxed">
                Engineers are hired for proof of work, not toy tutorials. Each curriculum phase culminates in an industry-grade system engineered for your public GitHub portfolio.
              </p>
            </div>

            <div className="flex flex-wrap gap-2 text-xs font-mono text-zinc-500 dark:text-gray-400">
              <span className="rounded-lg border border-zinc-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-2.5 py-1.5 font-medium shadow-2xs">
                Zero Toy Frameworks
              </span>
              <span className="rounded-lg border border-zinc-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-2.5 py-1.5 font-medium shadow-2xs">
                Strict Benchmark Suites
              </span>
              <span className="rounded-lg border border-zinc-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-2.5 py-1.5 font-medium shadow-2xs">
                Staff Review Rubrics
              </span>
            </div>
          </div>

          {/* Grid of Standard Capstones (Phases 1 to 6) */}
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Object.values(CAPSTONE_PROJECTS)
              .filter((capstone) => capstone.phaseId !== 7)
              .map((capstone) => {
                const phaseBadges: Record<number, { badge: string; hoverBorder: string }> = {
                  1: {
                    badge: "bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/25",
                    hoverBorder: "hover:border-blue-500/60 dark:hover:border-blue-400/60",
                  },
                  2: {
                    badge: "bg-sky-500/10 text-sky-700 dark:text-sky-400 border-sky-500/25",
                    hoverBorder: "hover:border-sky-500/60 dark:hover:border-sky-400/60",
                  },
                  3: {
                    badge: "bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border-indigo-500/25",
                    hoverBorder: "hover:border-indigo-500/60 dark:hover:border-indigo-400/60",
                  },
                  4: {
                    badge: "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/25",
                    hoverBorder: "hover:border-amber-500/60 dark:hover:border-amber-400/60",
                  },
                  5: {
                    badge: "bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-500/25",
                    hoverBorder: "hover:border-purple-500/60 dark:hover:border-purple-400/60",
                  },
                  6: {
                    badge: "bg-rose-500/10 text-rose-700 dark:text-rose-400 border-rose-500/25",
                    hoverBorder: "hover:border-rose-500/60 dark:hover:border-rose-400/60",
                  },
                };
                const accent = phaseBadges[capstone.phaseId] || {
                  badge: "bg-zinc-500/10 text-zinc-700 dark:text-zinc-400 border-zinc-500/25",
                  hoverBorder: "hover:border-zinc-500/60",
                };

                const difficultyStyles: Record<string, string> = {
                  Intermediate: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/50 dark:text-blue-300 dark:border-blue-900",
                  Advanced: "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/50 dark:text-purple-300 dark:border-purple-900",
                  Senior: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/50 dark:text-amber-300 dark:border-amber-900",
                  Staff: "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/50 dark:text-rose-300 dark:border-rose-900",
                };

                return (
                  <div
                    key={capstone.phaseId}
                    className={`group relative flex flex-col justify-between rounded-2xl border border-zinc-200/90 bg-white p-6 dark:border-gray-800 dark:bg-gray-800/80 hover:shadow-xl ${accent.hoverBorder} transition-all duration-300 shadow-xs`}
                  >
                    <div className="space-y-4">
                      {/* Meta badges row */}
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1.5">
                          <span className={`font-mono text-xs font-black tracking-wide border px-2.5 py-0.5 rounded-md ${accent.badge}`}>
                            PHASE 0{capstone.phaseId}
                          </span>
                          <span className={`font-mono text-[11px] font-semibold border px-2 py-0.5 rounded-md ${difficultyStyles[capstone.difficulty] || "bg-zinc-100 text-zinc-700 border-zinc-200"}`}>
                            {capstone.difficulty}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 font-mono text-xs font-semibold text-zinc-400 dark:text-gray-400">
                          <Clock className="h-3.5 w-3.5" />
                          <span>{capstone.estimatedHours}</span>
                        </div>
                      </div>

                      {/* Project Title and Subtitle */}
                      <div>
                        <h3 className="text-lg font-black tracking-tight text-zinc-950 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {capstone.shortName || capstone.title}
                        </h3>
                        {capstone.subtitle && (
                          <p className="text-xs font-semibold text-zinc-500 dark:text-gray-400 mt-0.5 line-clamp-1">
                            {capstone.subtitle}
                          </p>
                        )}
                      </div>

                      {/* Delightful, readable pitch */}
                      <p className="text-xs sm:text-[13px] text-zinc-600 dark:text-gray-300 leading-relaxed">
                        {capstone.pitch || capstone.scenario}
                      </p>

                      {/* Highlights checklist */}
                      {capstone.highlights && capstone.highlights.length > 0 && (
                        <div className="space-y-1.5 pt-2 border-t border-zinc-100 dark:border-gray-800">
                          {capstone.highlights.map((item, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-xs font-medium text-zinc-700 dark:text-gray-200">
                              <CheckCircle2 className="h-3.5 w-3.5 text-zinc-400 dark:text-zinc-500 shrink-0" />
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
                            className="rounded-md border border-zinc-200/80 bg-zinc-50 px-2 py-0.5 font-mono text-[11px] font-medium text-zinc-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="pt-5 mt-4 border-t border-zinc-100 dark:border-gray-800">
                      <button
                        onClick={() => onExploreCapstones(capstone.phaseId)}
                        className="group/btn flex w-full items-center justify-center gap-2 rounded-xl border border-zinc-200 bg-zinc-50 py-2.5 text-xs font-extrabold text-zinc-900 hover:bg-zinc-950 hover:text-white dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-white dark:hover:text-zinc-950 transition-all duration-200 shadow-2xs"
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
            <div className="mt-8 rounded-3xl border border-zinc-200/90 dark:border-gray-800 bg-linear-to-br from-zinc-50/80 via-white to-zinc-100/50 dark:from-[#0d1624] dark:via-[#0f172a] dark:to-[#0b1120] p-6 sm:p-8 shadow-xl relative overflow-hidden group hover:border-zinc-400 dark:hover:border-gray-700 transition-all duration-300">
              <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-zinc-500/5 blur-3xl pointer-events-none" />

              <div className="relative z-10 grid gap-8 lg:grid-cols-12 items-center">
                {/* Left Side: Overview & Pitch */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 font-mono text-xs font-black uppercase tracking-wider text-amber-600 dark:text-amber-400">
                      <Trophy className="h-3.5 w-3.5" />
                      Grand Finale • Capstone 07
                    </span>
                    <span className="font-mono text-xs font-bold border border-rose-500/25 bg-rose-500/10 text-rose-600 dark:text-rose-400 px-2.5 py-0.5 rounded-full">
                      Staff Level
                    </span>
                    <span className="inline-flex items-center gap-1 font-mono text-xs font-semibold text-zinc-500 dark:text-gray-400">
                      <Clock className="h-3.5 w-3.5" />
                      20-25 Hours
                    </span>
                  </div>

                  <div>
                    <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-zinc-950 dark:text-white">
                      {CAPSTONE_PROJECTS[7].shortName || CAPSTONE_PROJECTS[7].title}
                    </h3>
                    <p className="text-sm font-semibold text-zinc-600 dark:text-zinc-400 mt-1">
                      {CAPSTONE_PROJECTS[7].subtitle}
                    </p>
                  </div>

                  <p className="text-sm text-zinc-600 dark:text-gray-300 leading-relaxed max-w-2xl">
                    {CAPSTONE_PROJECTS[7].pitch || CAPSTONE_PROJECTS[7].scenario}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-1">
                    {CAPSTONE_PROJECTS[7].techStack.map((tech, i) => (
                      <span
                        key={i}
                        className="rounded-lg border border-zinc-200 dark:border-gray-700 bg-white/90 dark:bg-gray-800/90 px-2.5 py-1 font-mono text-xs font-medium text-zinc-800 dark:text-gray-200 shadow-2xs"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right Side: Key Deliverables & Action CTA */}
                <div className="lg:col-span-5 rounded-2xl border border-zinc-200 dark:border-gray-700 bg-white/90 dark:bg-gray-800/90 p-5 sm:p-6 shadow-sm space-y-4">
                  <div className="flex items-center justify-between border-b border-zinc-100 dark:border-gray-700 pb-3">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="h-4 w-4 text-zinc-700 dark:text-zinc-300" />
                      <span className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-900 dark:text-white">
                        Production Deliverables
                      </span>
                    </div>
                    <span className="text-[11px] font-mono font-semibold text-zinc-500 dark:text-gray-400">
                      Verifiable Suite
                    </span>
                  </div>

                  <ul className="space-y-2.5">
                    {CAPSTONE_PROJECTS[7].highlights?.map((hl, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-[13px] font-medium text-zinc-700 dark:text-gray-200">
                        <CheckCircle2 className="h-4 w-4 text-zinc-500 dark:text-zinc-400 shrink-0 mt-0.5" />
                        <span>{hl}</span>
                      </li>
                    ))}
                    <li className="flex items-start gap-2.5 text-xs sm:text-[13px] font-medium text-zinc-700 dark:text-gray-200">
                      <CheckCircle2 className="h-4 w-4 text-zinc-500 dark:text-zinc-400 shrink-0 mt-0.5" />
                      <span>Zero-Downtime Rolling Updates with Nginx Reverse Proxy</span>
                    </li>
                  </ul>

                  <div className="pt-2">
                    <button
                      onClick={() => onExploreCapstones(7)}
                      className="group/cta flex w-full items-center justify-center gap-2 rounded-xl bg-zinc-950 hover:bg-zinc-800 text-white dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200 py-3 text-xs sm:text-sm font-black transition-all shadow-md active:scale-[0.99]"
                    >
                      <Terminal className="h-4 w-4" />
                      <span>Inspect Flagship Spec & Rubric</span>
                      <ArrowRight className="h-4 w-4 transition-transform group-hover/cta:translate-x-1" />
                    </button>
                    <p className="text-center font-mono text-[11px] text-zinc-400 dark:text-gray-500 mt-2">
                      Principal & Staff Engineer Resume Milestone
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 7. Bottom High-Impact Conversion Banner */}
      <section className="py-16 sm:py-20 bg-zinc-950 text-white dark:bg-gray-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight max-w-2xl mx-auto">
            Ready to Master Production Backend Architecture?
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 max-w-xl mx-auto">
            No fluff. No toy code. Read the canonical textbooks, study real failure modes, and build systems that scale.
          </p>
          <div className="pt-2">
            <button
              onClick={() => onEnterRoadmap()}
              className="group inline-flex items-center gap-2 rounded-xl bg-white px-7 py-4 text-sm sm:text-base font-extrabold text-zinc-950 shadow-xl hover:bg-zinc-100 transition-all active:scale-[0.98]"
            >
              <span>Launch Interactive Roadmap</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </section>

      {/* 8. Clean Minimal Footer */}
      <footer className="border-t border-zinc-200 py-8 dark:border-gray-700 bg-white dark:bg-[#111827] text-xs text-zinc-500 dark:text-gray-400">
        <div className="mx-auto flex max-w-7xl flex-col sm:flex-row items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} Backend Engineer Hub. Built for Principal & Senior Engineers.</p>
          <div className="flex items-center gap-4">
            <button
              onClick={() => onEnterRoadmap()}
              className="hover:text-zinc-950 dark:hover:text-white transition-colors"
            >
              Enter Roadmap
            </button>
            <span>•</span>
            <button
              onClick={() => onExploreCapstones(1)}
              className="hover:text-zinc-950 dark:hover:text-white transition-colors"
            >
              Capstones
            </button>
            <span>•</span>
            <button
              onClick={() => scrollToSection("study-formula")}
              className="hover:text-zinc-950 dark:hover:text-white transition-colors"
            >
              Methodology
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
