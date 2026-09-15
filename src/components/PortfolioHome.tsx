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
  Activity,
  Check,
} from "lucide-react";
import { ROADMAP_PHASES } from "../data/roadmap";
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
    <div className="min-h-screen w-full bg-white text-zinc-900 dark:bg-[#0b1120] dark:text-gray-100 selection:bg-blue-600 selection:text-white dark:selection:bg-blue-500 dark:selection:text-white font-sans transition-colors duration-200">
      {/* 1. Global Navigation Header */}
      <header className="sticky top-0 z-40 w-full border-b border-zinc-200/80 bg-white/85 backdrop-blur-md dark:border-gray-800/80 dark:bg-[#0b1120]/85">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <span className="font-extrabold tracking-tight text-zinc-950 dark:text-white text-base sm:text-lg">
              Backend Engineer Hub
            </span>
          </div>

          {/* Center Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-7 text-xs sm:text-sm font-semibold text-zinc-600 dark:text-gray-400">
            <button
              onClick={() => scrollToSection("curriculum-phases")}
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Curriculum
            </button>
            <button
              onClick={() => scrollToSection("study-formula")}
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Methodology
            </button>
            <button
              onClick={() => scrollToSection("interview-engine")}
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Oral Exams
            </button>
            <button
              onClick={() => scrollToSection("capstone-projects")}
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Capstones
            </button>
          </nav>

          {/* Right Action: Theme Toggle & Launch Roadmap */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              onClick={onToggleTheme}
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-200 text-zinc-700 hover:bg-zinc-100 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle Theme"
            >
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>

            {/* Top Right "Roadmap" Action Button */}
            <button
              onClick={() => onEnterRoadmap()}
              className="group flex items-center gap-2 rounded-xl bg-zinc-950 px-4 py-2 text-xs sm:text-sm font-bold text-white shadow-sm hover:bg-zinc-800 dark:bg-blue-600 dark:text-white dark:hover:bg-blue-500 transition-all active:scale-[0.98]"
            >
              <span>Roadmap</span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>
      </header>

      {/* 2. Hero Section with Ambient Glow */}
      <section className="relative overflow-hidden border-b border-zinc-200/80 dark:border-gray-800/80 bg-linear-to-b from-blue-50/30 via-white to-zinc-50/50 dark:from-[#0f172a] dark:via-[#0b1120] dark:to-[#0b1120] py-18 sm:py-24">
        {/* Subtle Ambient Radial Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] sm:w-[900px] h-[400px] bg-gradient-to-tr from-blue-500/10 via-indigo-500/10 to-transparent blur-3xl pointer-events-none rounded-full" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center flex flex-col items-center space-y-6">
            
            {/* Top Motivating Pill Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/25 bg-blue-50/90 px-4 py-1.5 text-xs font-semibold text-blue-700 dark:border-blue-400/25 dark:bg-blue-950/50 dark:text-blue-300 shadow-2xs backdrop-blur-md">
              <span>The Systematic Path to Senior & Staff Backend Engineering</span>
            </div>

            {/* Headline with High-Impact Gradient Accent */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-zinc-950 dark:text-white leading-[1.12] max-w-4xl">
              Backend Engineering Roadmap{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 via-indigo-600 to-sky-600 dark:from-blue-400 dark:via-indigo-300 dark:to-sky-300">
                & Systems Mastery
              </span>
            </h1>

            {/* Subtitle / Description */}
            <p className="text-base sm:text-lg text-zinc-600 dark:text-gray-300 font-normal leading-relaxed max-w-2xl mx-auto">
              A comprehensive, production-grade learning system designed to bridge the gap between building toy APIs and architecting resilient, high-throughput distributed systems.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
              <button
                onClick={() => onEnterRoadmap()}
                className="group flex items-center gap-2.5 rounded-xl bg-zinc-950 px-6 py-3.5 text-sm sm:text-base font-bold text-white shadow-lg shadow-zinc-950/15 hover:bg-zinc-800 dark:bg-blue-600 dark:hover:bg-blue-500 dark:shadow-blue-600/20 transition-all active:scale-[0.98]"
              >
                <span>Start Learning Now</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={() => scrollToSection("curriculum-phases")}
                className="flex items-center gap-2 rounded-xl border border-zinc-300 bg-white/90 px-5 py-3.5 text-sm sm:text-base font-bold text-zinc-900 hover:bg-zinc-50 dark:border-gray-700 dark:bg-gray-800/90 dark:text-gray-100 dark:hover:bg-gray-700 transition-colors shadow-2xs backdrop-blur-xs"
              >
                <Compass className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                <span>Explore 7 Phases</span>
              </button>
            </div>

            {/* Feature Badges Row */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-1 text-xs text-zinc-600 dark:text-gray-400 font-medium">
              <span className="inline-flex items-center gap-1.5 rounded-md bg-zinc-100 dark:bg-gray-800/80 px-2.5 py-1">
                <Check className="h-3 w-3 text-blue-600 dark:text-blue-400" />
                Zero Toy Frameworks
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-md bg-zinc-100 dark:bg-gray-800/80 px-2.5 py-1">
                <Check className="h-3 w-3 text-blue-600 dark:text-blue-400" />
                Authoritative Literature (DDIA, Fowler)
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-md bg-zinc-100 dark:bg-gray-800/80 px-2.5 py-1">
                <Check className="h-3 w-3 text-blue-600 dark:text-blue-400" />
                Whiteboard Oral Exam Simulator
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-md bg-zinc-100 dark:bg-gray-800/80 px-2.5 py-1">
                <Check className="h-3 w-3 text-blue-600 dark:text-blue-400" />
                7 Verifiable Capstones
              </span>
            </div>

            {/* Progress Bar indicator if user already has progress */}
            {completedCount > 0 && (
              <div className="inline-flex items-center gap-3 rounded-2xl border border-blue-200/80 bg-blue-50/70 p-3.5 text-xs dark:border-blue-900/60 dark:bg-blue-950/40 font-mono font-semibold backdrop-blur-xs">
                <CheckCircle2 className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                <span>
                  Your Progress: {completedCount} of {totalTopics} modules completed (
                  {Math.round((completedCount / totalTopics) * 100)}%)
                </span>
                <button
                  onClick={() => onEnterRoadmap()}
                  className="text-blue-600 dark:text-blue-400 hover:underline font-bold"
                >
                  Resume →
                </button>
              </div>
            )}
          </div>

          {/* Key Metric Stats Grid */}
          <div className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 border-t border-zinc-200/80 pt-10 dark:border-gray-800/80">
            {/* Stat 1 */}
            <div className="rounded-2xl border border-zinc-200/80 bg-white/70 dark:border-gray-800 dark:bg-gray-850/50 p-4 sm:p-5 text-center shadow-2xs hover:border-blue-300 dark:hover:border-blue-800 transition-colors">
              <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400 mb-2">
                <Layers className="h-4 w-4" />
              </div>
              <span className="block font-mono text-3xl sm:text-4xl font-black text-zinc-950 dark:text-white">
                07
              </span>
              <span className="text-xs sm:text-sm font-semibold text-zinc-600 dark:text-gray-400">
                Architectural Phases
              </span>
            </div>

            {/* Stat 2 */}
            <div className="rounded-2xl border border-zinc-200/80 bg-white/70 dark:border-gray-800 dark:bg-gray-850/50 p-4 sm:p-5 text-center shadow-2xs hover:border-sky-300 dark:hover:border-sky-800 transition-colors">
              <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-lg bg-sky-50 text-sky-600 dark:bg-sky-950/60 dark:text-sky-400 mb-2">
                <Cpu className="h-4 w-4" />
              </div>
              <span className="block font-mono text-3xl sm:text-4xl font-black text-zinc-950 dark:text-white">
                31
              </span>
              <span className="text-xs sm:text-sm font-semibold text-zinc-600 dark:text-gray-400">
                Production Deep Dives
              </span>
            </div>

            {/* Stat 3 */}
            <div className="rounded-2xl border border-zinc-200/80 bg-white/70 dark:border-gray-800 dark:bg-gray-850/50 p-4 sm:p-5 text-center shadow-2xs hover:border-rose-300 dark:hover:border-rose-800 transition-colors">
              <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-lg bg-rose-50 text-rose-600 dark:bg-rose-950/60 dark:text-rose-400 mb-2">
                <Mic className="h-4 w-4" />
              </div>
              <span className="block font-mono text-3xl sm:text-4xl font-black text-zinc-950 dark:text-white">
                93
              </span>
              <span className="text-xs sm:text-sm font-semibold text-zinc-600 dark:text-gray-400">
                Whiteboard Oral Questions
              </span>
            </div>

            {/* Stat 4 */}
            <div className="rounded-2xl border border-zinc-200/80 bg-white/70 dark:border-gray-800 dark:bg-gray-850/50 p-4 sm:p-5 text-center shadow-2xs hover:border-amber-300 dark:hover:border-amber-800 transition-colors">
              <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-lg bg-amber-50 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400 mb-2">
                <Trophy className="h-4 w-4" />
              </div>
              <span className="block font-mono text-3xl sm:text-4xl font-black text-zinc-950 dark:text-white">
                07
              </span>
              <span className="text-xs sm:text-sm font-semibold text-zinc-600 dark:text-gray-400">
                Portfolio Capstones
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. The 5-Stage Engineering Study Formula (Stunning Redesign) */}
      <section id="study-formula" className="py-16 sm:py-24 border-b border-zinc-200/80 dark:border-gray-800/80 bg-linear-to-b from-zinc-50/50 via-white to-zinc-50/30 dark:from-[#0b1120] dark:via-[#0e1628] dark:to-[#0b1120]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* Section Heading with Inspiring Student Pitch */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-50/80 px-3.5 py-1 text-xs font-mono font-bold uppercase tracking-wider text-blue-700 dark:border-blue-400/20 dark:bg-blue-950/50 dark:text-blue-300">
                <Zap className="h-3.5 w-3.5 text-blue-500" />
                <span>Systematic Learning Architecture</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-zinc-950 dark:text-white">
                The 5-Stage Engineering Study Lifecycle
              </h2>
              <p className="text-sm sm:text-base text-zinc-600 dark:text-gray-300 leading-relaxed">
                Engineers don&apos;t master distributed systems by passively skimming slides. Every single module follows a rigorous 5-step cognitive pipeline designed to build authentic mental models, debate trade-offs, and prove production implementation.
              </p>
            </div>

            {/* Quick Link into Roadmap */}
            <button
              onClick={() => onEnterRoadmap()}
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-blue-600 dark:text-blue-400 hover:underline shrink-0"
            >
              <span>Experience the 5-stage workflow</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          {/* 5-Step Connected Cards Grid */}
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            
            {/* Stage 1: Video Masterclass */}
            <div className="group relative flex flex-col justify-between rounded-2xl border border-blue-200/90 bg-linear-to-b from-blue-50/60 via-white to-white p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 dark:border-blue-900/40 dark:bg-linear-to-b dark:from-blue-950/30 dark:via-gray-850 dark:to-gray-900">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white font-mono font-black text-sm shadow-sm ring-4 ring-blue-500/15">
                    01
                  </div>
                  <span className="rounded-full bg-blue-100/80 px-2.5 py-0.5 font-mono text-[10px] font-extrabold text-blue-800 dark:bg-blue-950 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                    30–60m Video
                  </span>
                </div>

                <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
                  <PlayCircle className="h-4 w-4" />
                  <span className="font-mono text-xs font-bold uppercase tracking-wider">
                    Foundation
                  </span>
                </div>

                <h3 className="font-extrabold text-base text-zinc-950 dark:text-white leading-snug">
                  Canonical Video Masterclass
                </h3>

                <p className="text-xs text-zinc-600 dark:text-gray-300 leading-relaxed">
                  High-yield lectures dissecting architectural intent, protocols, and underlying systems mechanics before touching code.
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-blue-100 dark:border-gray-800">
                <span className="inline-block text-[11px] font-semibold text-blue-700 dark:text-blue-400">
                  • Mental Models & Protocols
                </span>
              </div>
            </div>

            {/* Stage 2: Authoritative Literature */}
            <div className="group relative flex flex-col justify-between rounded-2xl border border-amber-200/90 bg-linear-to-b from-amber-50/60 via-white to-white p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 dark:border-amber-900/40 dark:bg-linear-to-b dark:from-amber-950/30 dark:via-gray-850 dark:to-gray-900">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-600 text-white font-mono font-black text-sm shadow-sm ring-4 ring-amber-500/15">
                    02
                  </div>
                  <span className="rounded-full bg-amber-100/80 px-2.5 py-0.5 font-mono text-[10px] font-extrabold text-amber-800 dark:bg-amber-950 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                    Core Readings
                  </span>
                </div>

                <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400">
                  <BookOpen className="h-4 w-4" />
                  <span className="font-mono text-xs font-bold uppercase tracking-wider">
                    Literature
                  </span>
                </div>

                <h3 className="font-extrabold text-base text-zinc-950 dark:text-white leading-snug">
                  Authoritative Literature
                </h3>

                <p className="text-xs text-zinc-600 dark:text-gray-300 leading-relaxed">
                  Curated chapters from foundational texts: Martin Kleppmann (DDIA), Martin Fowler, and Ilya Grigorik.
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-amber-100 dark:border-gray-800">
                <span className="inline-block text-[11px] font-semibold text-amber-700 dark:text-amber-400">
                  • Industry Standards & Citations
                </span>
              </div>
            </div>

            {/* Stage 3: Visual Architecture Flow */}
            <div className="group relative flex flex-col justify-between rounded-2xl border border-sky-200/90 bg-linear-to-b from-sky-50/60 via-white to-white p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 dark:border-sky-900/40 dark:bg-linear-to-b dark:from-sky-950/30 dark:via-gray-850 dark:to-gray-900">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-600 text-white font-mono font-black text-sm shadow-sm ring-4 ring-sky-500/15">
                    03
                  </div>
                  <span className="rounded-full bg-sky-100/80 px-2.5 py-0.5 font-mono text-[10px] font-extrabold text-sky-800 dark:bg-sky-950 dark:text-sky-300 border border-sky-200 dark:border-sky-800">
                    Interactive Flow
                  </span>
                </div>

                <div className="flex items-center gap-2 text-sky-600 dark:text-sky-400">
                  <Cpu className="h-4 w-4" />
                  <span className="font-mono text-xs font-bold uppercase tracking-wider">
                    Systems Flow
                  </span>
                </div>

                <h3 className="font-extrabold text-base text-zinc-950 dark:text-white leading-snug">
                  Visual Architecture Flow
                </h3>

                <p className="text-xs text-zinc-600 dark:text-gray-300 leading-relaxed">
                  Interactive flowcharts mapping client, gateway, cache, database, and dead-letter queues with microsecond latencies.
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-sky-100 dark:border-gray-800">
                <span className="inline-block text-[11px] font-semibold text-sky-700 dark:text-sky-400">
                  • End-to-End Latency Breakdown
                </span>
              </div>
            </div>

            {/* Stage 4: Polyglot Code Blueprints */}
            <div className="group relative flex flex-col justify-between rounded-2xl border border-indigo-200/90 bg-linear-to-b from-indigo-50/60 via-white to-white p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 dark:border-indigo-900/40 dark:bg-linear-to-b dark:from-indigo-950/30 dark:via-gray-850 dark:to-gray-900">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-600 text-white font-mono font-black text-sm shadow-sm ring-4 ring-indigo-500/15">
                    04
                  </div>
                  <span className="rounded-full bg-indigo-100/80 px-2.5 py-0.5 font-mono text-[10px] font-extrabold text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                    Polyglot
                  </span>
                </div>

                <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
                  <Code2 className="h-4 w-4" />
                  <span className="font-mono text-xs font-bold uppercase tracking-wider">
                    Code Blueprints
                  </span>
                </div>

                <h3 className="font-extrabold text-base text-zinc-950 dark:text-white leading-snug">
                  Polyglot Code Blueprints
                </h3>

                <p className="text-xs text-zinc-600 dark:text-gray-300 leading-relaxed">
                  Production implementations switchable across Node.js, Go, Python, and Java with clean dependency layers.
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-indigo-100 dark:border-gray-800">
                <span className="inline-block text-[11px] font-semibold text-indigo-700 dark:text-indigo-400">
                  • Go • Node.js • Python • Java
                </span>
              </div>
            </div>

            {/* Stage 5: Systems Note Studio */}
            <div className="group relative flex flex-col justify-between rounded-2xl border border-purple-200/90 bg-linear-to-b from-purple-50/60 via-white to-white p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 dark:border-purple-900/40 dark:bg-linear-to-b dark:from-purple-950/30 dark:via-gray-850 dark:to-gray-900">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-600 text-white font-mono font-black text-sm shadow-sm ring-4 ring-purple-500/15">
                    05
                  </div>
                  <span className="rounded-full bg-purple-100/80 px-2.5 py-0.5 font-mono text-[10px] font-extrabold text-purple-800 dark:bg-purple-950 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
                    Trade-offs
                  </span>
                </div>

                <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400">
                  <FileText className="h-4 w-4" />
                  <span className="font-mono text-xs font-bold uppercase tracking-wider">
                    Retention
                  </span>
                </div>

                <h3 className="font-extrabold text-base text-zinc-950 dark:text-white leading-snug">
                  Systems Note Studio
                </h3>

                <p className="text-xs text-zinc-600 dark:text-gray-300 leading-relaxed">
                  Markdown notes editor with senior templates for documenting trade-offs, edge cases, and exporting master cheat-sheets.
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-purple-100 dark:border-gray-800">
                <span className="inline-block text-[11px] font-semibold text-purple-700 dark:text-purple-400">
                  • Senior Trade-off Rubrics
                </span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. Whiteboard Oral Interview Engine */}
      <section id="interview-engine" className="py-16 sm:py-24 border-b border-zinc-200/80 dark:border-gray-800/80 bg-zinc-50/40 dark:bg-[#080d1a]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-6 space-y-5">
              <div className="inline-flex items-center gap-2 rounded-full border border-rose-500/25 bg-rose-50/80 px-3.5 py-1 text-xs font-mono font-bold uppercase tracking-wider text-rose-700 dark:border-rose-400/25 dark:bg-rose-950/50 dark:text-rose-300">
                <Mic className="h-3.5 w-3.5 text-rose-500" />
                <span>Executive Technical Communication</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-zinc-950 dark:text-white">
                Senior Technical Whiteboard & Oral Exam Simulator
              </h2>

              <p className="text-sm sm:text-base text-zinc-600 dark:text-gray-300 leading-relaxed">
                Senior and Staff candidates stand out not by typing trivial syntax, but by articulating architectural trade-offs aloud under realistic time constraints.
              </p>

              <div className="space-y-3.5 pt-2">
                <div className="flex items-start gap-3.5">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-zinc-950 text-white dark:bg-white dark:text-black font-mono text-xs font-bold shadow-xs">
                    1
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-zinc-900 dark:text-gray-100">
                      [WHAT] The Core Abstraction & Mental Model
                    </h4>
                    <p className="text-xs text-zinc-600 dark:text-gray-400">
                      State the architectural definition and purpose in two crisp sentences without hesitation.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-zinc-950 text-white dark:bg-white dark:text-black font-mono text-xs font-bold shadow-xs">
                    2
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-zinc-900 dark:text-gray-100">
                      [WHY] Trade-offs, Latency & Failure Modes
                    </h4>
                    <p className="text-xs text-zinc-600 dark:text-gray-400">
                      Contrast against alternatives, quantify disk vs memory I/O latency, and state engineering compromises.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-zinc-950 text-white dark:bg-white dark:text-black font-mono text-xs font-bold shadow-xs">
                    3
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-zinc-900 dark:text-gray-100">
                      [HOW] Production Hardening & Edge Cases
                    </h4>
                    <p className="text-xs text-zinc-600 dark:text-gray-400">
                      Address concurrency races, cache stampedes, distributed mutex leases, and recovery fallbacks.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Simulation Preview Window Card */}
            <div className="lg:col-span-6 rounded-2xl border border-zinc-200/90 bg-white p-6 shadow-xl dark:border-gray-800 dark:bg-gray-850 space-y-5">
              
              {/* Window Header */}
              <div className="flex items-center justify-between border-b border-zinc-100 dark:border-gray-800 pb-3">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-rose-500/80" />
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
                    <span className="h-2.5 w-2.5 rounded-full bg-blue-500/80" />
                  </div>
                  <span className="font-mono text-xs font-bold text-zinc-800 dark:text-zinc-200 ml-2">
                    ACTIVE WHITEBOARD SIMULATOR
                  </span>
                </div>
                
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500" />
                  </span>
                  <span className="font-mono text-xs font-bold text-rose-600 dark:text-rose-400">
                    75s Countdown
                  </span>
                </div>
              </div>

              {/* Sample Question Box */}
              <div className="rounded-xl border border-zinc-200 bg-zinc-50/80 p-4 dark:border-gray-750 dark:bg-gray-900/90 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="inline-block px-2 py-0.5 rounded text-[10.5px] font-mono font-extrabold bg-blue-100 text-blue-900 dark:bg-blue-950 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                    [WHY CATEGORY]
                  </span>
                  <span className="text-[11px] font-mono text-zinc-500 dark:text-gray-400">
                    Topic #07 • Write Paths
                  </span>
                </div>
                
                <p className="text-sm font-bold text-zinc-950 dark:text-white leading-relaxed">
                  &ldquo;Why is an append-only WAL (Write-Ahead Log) preferred over in-place B-Tree updates for high-throughput database writes?&rdquo;
                </p>
              </div>

              {/* Simulation Visual Feedback */}
              <div className="flex items-center justify-between pt-1">
                <span className="text-xs text-zinc-500 dark:text-gray-400 font-medium">
                  Self-Grading: Mastered (+100%) • Partial (+50%) • Missed (0%)
                </span>
                
                <button
                  onClick={() => onEnterRoadmap()}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-rose-600 px-4 py-2 text-xs font-bold text-white hover:bg-rose-700 transition-colors shadow-sm"
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
      <section id="curriculum-phases" className="py-16 sm:py-24 border-b border-zinc-200/80 dark:border-gray-800/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="max-w-2xl space-y-2">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                Curriculum Progression
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-zinc-950 dark:text-white">
                7 Architectural Phases • 31 Core Modules
              </h2>
              <p className="text-sm text-zinc-600 dark:text-gray-400">
                Structured in sequential order from network wire physics to enterprise cloud orchestration.
              </p>
            </div>

            <button
              onClick={() => onEnterRoadmap()}
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-blue-600 dark:text-blue-400 hover:underline shrink-0"
            >
              <span>View All 31 Modules</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {ROADMAP_PHASES.map((phase) => (
              <div
                key={phase.id}
                className="flex flex-col justify-between rounded-2xl border border-zinc-200/90 bg-white p-6 hover:border-blue-400 dark:border-gray-800 dark:bg-gray-850 dark:hover:border-blue-500/60 transition-all shadow-xs hover:shadow-lg duration-300"
              >
                <div className="space-y-3.5">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-black tracking-wider text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2.5 py-1 rounded-md border border-blue-200 dark:border-blue-900">
                      PHASE 0{phase.id}
                    </span>
                    <span className="font-mono text-xs font-bold text-zinc-400">
                      {phase.topics.length} Modules
                    </span>
                  </div>

                  <h3 className="font-extrabold text-base text-zinc-950 dark:text-white">
                    {phase.name}
                  </h3>

                  <p className="text-xs text-zinc-600 dark:text-gray-300 leading-relaxed">
                    {phase.description}
                  </p>

                  <div className="border-t border-zinc-100 dark:border-gray-800 pt-3 space-y-1.5">
                    {phase.topics.slice(0, 3).map((topic) => (
                      <button
                        key={topic.id}
                        onClick={() => onEnterRoadmap(topic)}
                        className="group flex w-full items-center justify-between text-left text-xs font-semibold text-zinc-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                      >
                        <span className="truncate pr-2">
                          #{String(topic.number).padStart(2, "0")} {topic.title}
                        </span>
                        <ChevronRight className="h-3 w-3 text-zinc-400 transition-transform group-hover:translate-x-0.5" />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-zinc-100 dark:border-gray-800">
                  <button
                    onClick={() => onEnterRoadmap(phase.topics[0])}
                    className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-zinc-100 py-2.5 text-xs font-bold text-zinc-900 hover:bg-zinc-950 hover:text-white dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-blue-600 dark:hover:text-white transition-all shadow-2xs"
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
      <section id="capstone-projects" className="py-16 sm:py-24 border-b border-zinc-200/80 dark:border-gray-800/80 bg-linear-to-b from-zinc-50/70 via-white to-zinc-50/40 dark:from-[#080d1a] dark:via-[#0b1120] dark:to-[#080d1a]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="max-w-2xl space-y-2">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                Portfolio Capstones
              </span>
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
                    className={`group relative flex flex-col justify-between rounded-2xl border border-zinc-200/90 bg-white p-6 dark:border-gray-800 dark:bg-gray-850 hover:shadow-xl ${accent.hoverBorder} transition-all duration-300 shadow-xs`}
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
                              <CheckCircle2 className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
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
                            className="rounded-md border border-zinc-200/80 bg-zinc-50 px-2 py-0.5 font-mono text-[11px] font-medium text-zinc-600 dark:border-gray-750 dark:bg-gray-800 dark:text-gray-300"
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
                        className="group/btn flex w-full items-center justify-center gap-2 rounded-xl border border-zinc-200 bg-zinc-50 py-2.5 text-xs font-extrabold text-zinc-900 hover:bg-zinc-950 hover:text-white dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-blue-600 dark:hover:text-white transition-all duration-200 shadow-2xs"
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
            <div className="mt-10 rounded-3xl border border-amber-500/30 dark:border-amber-500/20 bg-linear-to-br from-amber-50/40 via-white to-zinc-50 dark:from-[#0d1624] dark:via-[#0f172a] dark:to-[#080d1a] p-6 sm:p-8 shadow-xl relative overflow-hidden group hover:border-amber-500/50 dark:hover:border-amber-500/40 transition-all duration-300">
              <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

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
                <div className="lg:col-span-5 rounded-2xl border border-zinc-200 dark:border-gray-700 bg-white/95 dark:bg-gray-850/90 p-5 sm:p-6 shadow-sm space-y-4">
                  <div className="flex items-center justify-between border-b border-zinc-100 dark:border-gray-750 pb-3">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="h-4 w-4 text-blue-600 dark:text-blue-400" />
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
                        <CheckCircle2 className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                        <span>{hl}</span>
                      </li>
                    ))}
                    <li className="flex items-start gap-2.5 text-xs sm:text-[13px] font-medium text-zinc-700 dark:text-gray-200">
                      <CheckCircle2 className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                      <span>Zero-Downtime Rolling Updates with Nginx Reverse Proxy</span>
                    </li>
                  </ul>

                  <div className="pt-2">
                    <button
                      onClick={() => onExploreCapstones(7)}
                      className="group/cta flex w-full items-center justify-center gap-2 rounded-xl bg-zinc-950 hover:bg-zinc-800 text-white dark:bg-blue-600 dark:text-white dark:hover:bg-blue-500 py-3 text-xs sm:text-sm font-black transition-all shadow-md active:scale-[0.99]"
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
      <section className="relative overflow-hidden py-18 sm:py-24 bg-zinc-950 text-white dark:bg-[#070b14] border-t border-zinc-800">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-600/10 blur-3xl pointer-events-none rounded-full" />
        
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-xs font-semibold text-blue-400">
            <span>Ready for the Next Step in Your Career?</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight max-w-2xl mx-auto leading-tight">
            Ready to Master Production Backend Architecture?
          </h2>

          <p className="text-sm sm:text-base text-zinc-400 max-w-xl mx-auto leading-relaxed">
            No fluff. No toy code. Read the canonical textbooks, study real failure modes, and build systems that scale to millions of requests.
          </p>

          <div className="pt-2">
            <button
              onClick={() => onEnterRoadmap()}
              className="group inline-flex items-center gap-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 px-8 py-4 text-sm sm:text-base font-extrabold text-white shadow-xl shadow-blue-600/25 transition-all active:scale-[0.98]"
            >
              <span>Launch Interactive Roadmap</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </section>

      {/* 8. Clean Minimal Footer */}
      <footer className="border-t border-zinc-200 py-8 dark:border-gray-800 bg-white dark:bg-[#0b1120] text-xs text-zinc-500 dark:text-gray-400">
        <div className="mx-auto flex max-w-7xl flex-col sm:flex-row items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} Backend Engineer Hub. Built for Principal & Senior Engineers.</p>
          <div className="flex items-center gap-4">
            <button
              onClick={() => onEnterRoadmap()}
              className="hover:text-blue-600 dark:hover:text-white transition-colors"
            >
              Enter Roadmap
            </button>
            <span>•</span>
            <button
              onClick={() => onExploreCapstones(1)}
              className="hover:text-blue-600 dark:hover:text-white transition-colors"
            >
              Capstones
            </button>
            <span>•</span>
            <button
              onClick={() => scrollToSection("study-formula")}
              className="hover:text-blue-600 dark:hover:text-white transition-colors"
            >
              Methodology
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
