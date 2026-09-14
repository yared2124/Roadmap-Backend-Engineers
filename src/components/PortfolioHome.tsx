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
    <div className="min-h-screen w-full bg-white text-zinc-900 dark:bg-black dark:text-zinc-100 selection:bg-zinc-900 selection:text-white dark:selection:bg-white dark:selection:text-black font-sans transition-colors duration-200">
      {/* 1. Global Navigation Header */}
      <header className="sticky top-0 z-40 w-full border-b border-zinc-200/80 bg-white/90 backdrop-blur-md dark:border-zinc-800/80 dark:bg-black/90">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-950 text-white font-mono font-bold text-base dark:bg-white dark:text-zinc-950 shadow-xs">
              B
            </div>
            <div>
              <span className="font-extrabold tracking-tight text-zinc-950 dark:text-zinc-50 text-base sm:text-lg">
                Backend Engineer Hub
              </span>
              <span className="hidden sm:inline-block ml-2 text-xs font-mono text-zinc-500 dark:text-zinc-400">
                v1.0
              </span>
            </div>
          </div>

          {/* Center Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-6 text-xs sm:text-sm font-semibold text-zinc-600 dark:text-zinc-400">
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
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-200 text-zinc-700 hover:bg-zinc-100 dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-900 transition-colors"
              aria-label="Toggle Theme"
            >
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>

            {/* Top Right "Roadmap" Action Button */}
            <button
              onClick={() => onEnterRoadmap()}
              className="group flex items-center gap-2 rounded-xl bg-zinc-950 px-4 py-2 text-xs sm:text-sm font-bold text-white shadow-xs hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200 transition-all active:scale-[0.98]"
            >
              <span>Roadmap</span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>
      </header>

      {/* 2. Hero Section */}
      <section className="relative overflow-hidden border-b border-zinc-200/80 dark:border-zinc-800/80 bg-gradient-to-b from-zinc-50/50 via-white to-white dark:from-zinc-950/50 dark:via-black dark:to-black py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center flex flex-col items-center space-y-6">
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-zinc-300 bg-zinc-100/80 px-3.5 py-1 text-xs font-semibold text-zinc-800 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Staff & Principal Engineer Level Curriculum</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-zinc-950 dark:text-zinc-50 leading-[1.1] max-w-4xl">
              Backend Engineering Roadmap & Architecture Mastery
            </h1>

            {/* Subtitle / Description */}
            <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 font-normal leading-relaxed max-w-2xl mx-auto">
              A comprehensive, production-grade learning system designed to bridge the gap between building toy APIs and architecting resilient, high-throughput distributed systems.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
              <button
                onClick={() => onEnterRoadmap()}
                className="group flex items-center gap-2.5 rounded-xl bg-zinc-950 px-6 py-3.5 text-sm sm:text-base font-bold text-white shadow-md hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200 transition-all active:scale-[0.98]"
              >
                <span>Start Learning</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={() => scrollToSection("curriculum-phases")}
                className="flex items-center gap-2 rounded-xl border border-zinc-300 bg-white px-5 py-3.5 text-sm sm:text-base font-bold text-zinc-900 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800 transition-colors shadow-2xs"
              >
                <Compass className="h-4 w-4 text-zinc-500" />
                <span>Explore Curriculum</span>
              </button>
            </div>

            {/* Progress Bar indicator if user already has progress */}
            {completedCount > 0 && (
              <div className="inline-flex items-center gap-3 rounded-xl border border-zinc-200 bg-zinc-50 p-3 text-xs dark:border-zinc-800 dark:bg-zinc-900/60 font-mono font-semibold">
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
          <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-6 border-t border-zinc-200/80 pt-10 dark:border-zinc-800/80 text-center">
            <div className="space-y-1 text-center">
              <span className="block font-mono text-3xl sm:text-4xl font-black text-zinc-950 dark:text-zinc-50">
                07
              </span>
              <span className="text-xs sm:text-sm font-semibold text-zinc-500 dark:text-zinc-400">
                Architectural Phases
              </span>
            </div>
            <div className="space-y-1 text-center">
              <span className="block font-mono text-3xl sm:text-4xl font-black text-zinc-950 dark:text-zinc-50">
                31
              </span>
              <span className="text-xs sm:text-sm font-semibold text-zinc-500 dark:text-zinc-400">
                Production Deep Dives
              </span>
            </div>
            <div className="space-y-1 text-center">
              <span className="block font-mono text-3xl sm:text-4xl font-black text-zinc-950 dark:text-zinc-50">
                93
              </span>
              <span className="text-xs sm:text-sm font-semibold text-zinc-500 dark:text-zinc-400">
                Whiteboard Oral Questions
              </span>
            </div>
            <div className="space-y-1 text-center">
              <span className="block font-mono text-3xl sm:text-4xl font-black text-zinc-950 dark:text-zinc-50">
                07
              </span>
              <span className="text-xs sm:text-sm font-semibold text-zinc-500 dark:text-zinc-400">
                Portfolio Capstones
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. The 5-Stage Engineering Study Formula */}
      <section id="study-formula" className="py-16 sm:py-20 border-b border-zinc-200/80 dark:border-zinc-800/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl space-y-3">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              Systematic Learning Architecture
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-950 dark:text-zinc-50">
              The 5-Stage Engineering Study Lifecycle
            </h2>
            <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
              Every single module follows an end-to-end pedagogical blueprint designed to instill authentic mental models, rigorous trade-off evaluation, and verifiable implementation skills.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {/* Stage 1 */}
            <div className="rounded-2xl border border-zinc-200 bg-zinc-50/50 p-5 dark:border-zinc-800 dark:bg-zinc-900/30 space-y-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950 font-mono font-bold text-sm">
                01
              </div>
              <h3 className="font-bold text-sm sm:text-base text-zinc-950 dark:text-zinc-50">
                Canonical Video Masterclass
              </h3>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                High-yield video lectures (30–60 min) dissecting architectural intent, protocols, and underlying systems mechanics.
              </p>
            </div>

            {/* Stage 2 */}
            <div className="rounded-2xl border border-zinc-200 bg-zinc-50/50 p-5 dark:border-zinc-800 dark:bg-zinc-900/30 space-y-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950 font-mono font-bold text-sm">
                02
              </div>
              <h3 className="font-bold text-sm sm:text-base text-zinc-950 dark:text-zinc-50">
                Authoritative Literature
              </h3>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Specific chapters from foundational engineering texts: Martin Fowler, Martin Kleppmann (DDIA), and Ilya Grigorik.
              </p>
            </div>

            {/* Stage 3 */}
            <div className="rounded-2xl border border-zinc-200 bg-zinc-50/50 p-5 dark:border-zinc-800 dark:bg-zinc-900/30 space-y-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950 font-mono font-bold text-sm">
                03
              </div>
              <h3 className="font-bold text-sm sm:text-base text-zinc-950 dark:text-zinc-50">
                Visual Architecture Flow
              </h3>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Interactive flowcharts mapping client, gateway, cache, database, and dead-letter queue execution paths and latencies.
              </p>
            </div>

            {/* Stage 4 */}
            <div className="rounded-2xl border border-zinc-200 bg-zinc-50/50 p-5 dark:border-zinc-800 dark:bg-zinc-900/30 space-y-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950 font-mono font-bold text-sm">
                04
              </div>
              <h3 className="font-bold text-sm sm:text-base text-zinc-950 dark:text-zinc-50">
                Polyglot Code Blueprints
              </h3>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Production implementations switchable across TypeScript/Node.js, Go, Python, and Java with clean dependency layers.
              </p>
            </div>

            {/* Stage 5 */}
            <div className="rounded-2xl border border-zinc-200 bg-zinc-50/50 p-5 dark:border-zinc-800 dark:bg-zinc-900/30 space-y-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950 font-mono font-bold text-sm">
                05
              </div>
              <h3 className="font-bold text-sm sm:text-base text-zinc-950 dark:text-zinc-50">
                Systems Note Studio
              </h3>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Structured Markdown editor with senior templates for documenting trade-offs, edge cases, and exporting master notes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Whiteboard Oral Interview Engine */}
      <section id="interview-engine" className="py-16 sm:py-20 border-b border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-50/30 dark:bg-zinc-950/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-12 items-center">
            <div className="lg:col-span-6 space-y-4">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
                Executive Technical Communication
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-zinc-950 dark:text-zinc-50">
                Senior Technical Whiteboard & Oral Exam Simulator
              </h2>
              <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Senior and Staff candidates stand out not by typing trivial syntax, but by articulating architectural trade-offs aloud under realistic time constraints.
              </p>
              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-zinc-950 text-white dark:bg-white dark:text-black font-mono text-xs font-bold">
                    1
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-zinc-900 dark:text-zinc-100">
                      [WHAT] The Core Abstraction & Mental Model
                    </h4>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                      State the architectural definition and purpose in two crisp sentences without hesitation.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-zinc-950 text-white dark:bg-white dark:text-black font-mono text-xs font-bold">
                    2
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-zinc-900 dark:text-zinc-100">
                      [WHY] Trade-offs, Latency & Failure Modes
                    </h4>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                      Contrast against alternatives, quantify disk vs memory I/O latency, and state engineering compromises.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-zinc-950 text-white dark:bg-white dark:text-black font-mono text-xs font-bold">
                    3
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-zinc-900 dark:text-zinc-100">
                      [HOW] Production Hardening & Edge Cases
                    </h4>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                      Address concurrency races, cache stampedes, distributed mutex leases, and recovery fallbacks.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Simulation Preview Card */}
            <div className="lg:col-span-6 rounded-2xl border border-zinc-200 bg-white p-6 shadow-md dark:border-zinc-800 dark:bg-zinc-900 space-y-4">
              <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-3">
                <div className="flex items-center gap-2">
                  <Mic className="h-4 w-4 text-rose-500" />
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-zinc-950 dark:text-zinc-50">
                    Active Oral Exam Engine
                  </span>
                </div>
                <span className="font-mono text-xs font-bold text-zinc-500 dark:text-zinc-400">
                  75s Countdown Timer
                </span>
              </div>

              <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-950/60 space-y-2">
                <span className="inline-block px-2 py-0.5 rounded text-[10.5px] font-mono font-bold bg-blue-100 text-blue-900 dark:bg-blue-950 dark:text-blue-300">
                  [WHY CATEGORY]
                </span>
                <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                  &ldquo;Why is an append-only WAL (Write-Ahead Log) preferred over in-place B-Tree updates for high-throughput database writes?&rdquo;
                </p>
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
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
      <section id="curriculum-phases" className="py-16 sm:py-20 border-b border-zinc-200/80 dark:border-zinc-800/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="max-w-2xl space-y-2">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                Curriculum Progression
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-950 dark:text-zinc-50">
                7 Architectural Phases • 31 Core Modules
              </h2>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Structured in sequential order from network wire physics to enterprise cloud orchestration.
              </p>
            </div>

            <button
              onClick={() => onEnterRoadmap()}
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-zinc-950 dark:text-zinc-50 hover:underline shrink-0"
            >
              <span>View All 31 Modules</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {ROADMAP_PHASES.map((phase) => (
              <div
                key={phase.id}
                className="flex flex-col justify-between rounded-2xl border border-zinc-200 bg-white p-5 hover:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-zinc-600 transition-all shadow-xs"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-black tracking-wider text-zinc-950 dark:text-zinc-50 bg-zinc-100 dark:bg-zinc-800 px-2.5 py-1 rounded-md">
                      PHASE 0{phase.id}
                    </span>
                    <span className="font-mono text-xs font-bold text-zinc-400">
                      {phase.topics.length} Modules
                    </span>
                  </div>

                  <h3 className="font-extrabold text-base text-zinc-950 dark:text-zinc-50">
                    {phase.name}
                  </h3>

                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {phase.description}
                  </p>

                  <div className="border-t border-zinc-100 dark:border-zinc-800/80 pt-3 space-y-1.5">
                    {phase.topics.slice(0, 3).map((topic) => (
                      <button
                        key={topic.id}
                        onClick={() => onEnterRoadmap(topic)}
                        className="group flex w-full items-center justify-between text-left text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white"
                      >
                        <span className="truncate pr-2">
                          #{String(topic.number).padStart(2, "0")} {topic.title}
                        </span>
                        <ChevronRight className="h-3 w-3 text-zinc-400 transition-transform group-hover:translate-x-0.5" />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-800">
                  <button
                    onClick={() => onEnterRoadmap(phase.topics[0])}
                    className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-zinc-100 py-2 text-xs font-bold text-zinc-900 hover:bg-zinc-200 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800 transition-colors"
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
      <section id="capstone-projects" className="py-16 sm:py-20 border-b border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-950/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl space-y-2">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              Verifiable Production Output
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-950 dark:text-zinc-50">
              7 Portfolio-Grade Capstone Projects
            </h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Engineers do not build toy tutorials. Each phase concludes with a portfolio project designed to demonstrate architectural seniority on GitHub.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Object.values(CAPSTONE_PROJECTS).map((capstone) => (
              <div
                key={capstone.phaseId}
                className="flex flex-col justify-between rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900 space-y-4 hover:border-zinc-400 dark:hover:border-zinc-600 transition-all shadow-xs"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-300 px-2 py-0.5 rounded">
                      Phase 0{capstone.phaseId} Capstone
                    </span>
                    <span className="font-mono text-xs font-semibold text-zinc-400">
                      {capstone.estimatedHours} Hours
                    </span>
                  </div>

                  <h3 className="font-bold text-base text-zinc-950 dark:text-zinc-50 leading-snug">
                    {capstone.title}
                  </h3>

                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {capstone.scenario}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {capstone.techStack.map((tech, i) => (
                      <span
                        key={i}
                        className="rounded-md border border-zinc-200 bg-zinc-50 px-2 py-0.5 font-mono text-[10.5px] font-medium text-zinc-700 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => onExploreCapstones(capstone.phaseId)}
                  className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-zinc-300 bg-white py-2 text-xs font-bold text-zinc-900 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700 transition-colors shadow-2xs"
                >
                  <Terminal className="h-3.5 w-3.5" />
                  <span>Inspect Spec & Rubric</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Bottom High-Impact Conversion Banner */}
      <section className="py-16 sm:py-20 bg-zinc-950 text-white dark:bg-zinc-900">
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
      <footer className="border-t border-zinc-200 py-8 dark:border-zinc-800 bg-white dark:bg-black text-xs text-zinc-500 dark:text-zinc-400">
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
