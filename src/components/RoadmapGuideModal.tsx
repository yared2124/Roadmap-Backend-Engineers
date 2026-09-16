"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  Compass,
  ArrowRight,
  PlayCircle,
  BookOpen,
  Mic,
  Code2,
  CheckCircle2,
  Layers,
  FileText,
  Lightbulb,
  Award,
  Terminal,
  Clock,
  Zap,
  GitBranch,
  HelpCircle,
  Flame,
} from "lucide-react";
import { ROADMAP_PHASES } from "../data/roadmap";
import { CAPSTONE_PROJECTS } from "../data/capstones";

interface RoadmapGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartCourse: () => void;
  onExploreCapstones: () => void;
  currentTopicTitle?: string;
  currentTopicNumber?: number;
}

type GuideTab = "roadmap" | "how-to-study" | "what-to-say" | "what-to-build";

export function RoadmapGuideModal({
  isOpen,
  onClose,
  onStartCourse,
  onExploreCapstones,
  currentTopicTitle = "Backend from First Principles",
  currentTopicNumber = 1,
}: RoadmapGuideModalProps) {
  const [activeTab, setActiveTab] = useState<GuideTab>("roadmap");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog Container */}
      <div className="relative flex flex-col w-full max-w-4xl max-h-[92vh] rounded-2xl border border-zinc-200 bg-white shadow-2xl dark:border-gray-700 dark:bg-gray-800 overflow-hidden text-zinc-900 dark:text-gray-100 transition-all">
        {/* Top Header Banner */}
        <div className="relative shrink-0 border-b border-zinc-200 bg-zinc-950 p-5 sm:p-6 text-white dark:border-gray-700">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-2 rounded-full border border-zinc-700 bg-zinc-900 px-3 py-1 text-xs font-semibold text-zinc-300">
                <BookOpen className="h-3.5 w-3.5" />
                <span>Student Docs & Strategy Blueprint</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white">
                How to Study, What to Build, and How to Communicate Architecture
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 font-medium">
                The 6-stage daily routine, oral whiteboard exam mastery, and 7 production portfolio capstones.
              </p>
            </div>

            <button
              onClick={onClose}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white transition-colors"
              aria-label="Close Guide"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="mt-5 flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            <button
              onClick={() => setActiveTab("roadmap")}
              className={`flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs sm:text-sm font-semibold transition-all shrink-0 ${
                activeTab === "roadmap"
                  ? "bg-white text-zinc-950 shadow-md"
                  : "bg-white/10 text-zinc-300 hover:bg-white/15 hover:text-white"
              }`}
            >
              <Compass className="h-4 w-4" />
              <span>1. Curriculum Trajectory</span>
            </button>

            <button
              onClick={() => setActiveTab("how-to-study")}
              className={`flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs sm:text-sm font-semibold transition-all shrink-0 ${
                activeTab === "how-to-study"
                  ? "bg-white text-zinc-950 shadow-md"
                  : "bg-white/10 text-zinc-300 hover:bg-white/15 hover:text-white"
              }`}
            >
              <Zap className="h-4 w-4" />
              <span>2. 6-Stage Study Routine</span>
            </button>

            <button
              onClick={() => setActiveTab("what-to-say")}
              className={`flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs sm:text-sm font-semibold transition-all shrink-0 ${
                activeTab === "what-to-say"
                  ? "bg-white text-zinc-950 shadow-md"
                  : "bg-white/10 text-zinc-300 hover:bg-white/15 hover:text-white"
              }`}
            >
              <Mic className="h-4 w-4" />
              <span>3. Mock Interview Simulator</span>
            </button>

            <button
              onClick={() => setActiveTab("what-to-build")}
              className={`flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs sm:text-sm font-semibold transition-all shrink-0 ${
                activeTab === "what-to-build"
                  ? "bg-white text-zinc-950 shadow-md"
                  : "bg-white/10 text-zinc-300 hover:bg-white/15 hover:text-white"
              }`}
            >
              <Terminal className="h-4 w-4" />
              <span>4. 7 Portfolio Capstones</span>
            </button>
          </div>
        </div>

        {/* Scrollable Tab Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-6 text-sm">
          {/* TAB 1: THE ROADMAP STRUCTURE */}
          {activeTab === "roadmap" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5 dark:border-gray-700 dark:bg-gray-800/60">
                <h3 className="text-base font-bold text-zinc-950 dark:text-white flex items-center gap-2">
                  <Compass className="h-5 w-5 text-zinc-900 dark:text-gray-100" />
                  Curriculum Structure & Engineering Trajectory
                </h3>
                <p className="mt-2 text-zinc-600 dark:text-gray-400 leading-relaxed">
                  This platform is not a random collection of videos. It is a systematic curriculum designed to advance software engineers from standard application developers into <strong>Senior and Principal Distributed Systems Architects</strong> across <strong>7 progressive phases</strong>, <strong>31 in-depth modules</strong>, <strong>51 video masterclasses (56+ hours)</strong>, and <strong>7 production capstones</strong>.
                </p>
              </div>

              {/* Key Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                <div className="p-4 rounded-xl border border-zinc-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-center">
                  <span className="block text-2xl sm:text-3xl font-extrabold text-zinc-950 dark:text-white font-mono">07</span>
                  <span className="text-xs font-semibold text-zinc-500 dark:text-gray-400">Architectural Phases</span>
                </div>
                <div className="p-4 rounded-xl border border-zinc-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-center">
                  <span className="block text-2xl sm:text-3xl font-extrabold text-zinc-950 dark:text-white font-mono">31</span>
                  <span className="text-xs font-semibold text-zinc-500 dark:text-gray-400">Core Modules</span>
                </div>
                <div className="p-4 rounded-xl border border-zinc-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-center">
                  <span className="block text-2xl sm:text-3xl font-extrabold text-zinc-950 dark:text-white font-mono">51</span>
                  <span className="text-xs font-semibold text-zinc-500 dark:text-gray-400">Videos (56+ Hrs)</span>
                </div>
                <div className="p-4 rounded-xl border border-zinc-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-center">
                  <span className="block text-2xl sm:text-3xl font-extrabold text-zinc-950 dark:text-white font-mono">93</span>
                  <span className="text-xs font-semibold text-zinc-500 dark:text-gray-400">Mock Interview Qs</span>
                </div>
                <div className="p-4 rounded-xl border border-zinc-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-center">
                  <span className="block text-2xl sm:text-3xl font-extrabold text-zinc-950 dark:text-white font-mono">07</span>
                  <span className="text-xs font-semibold text-zinc-500 dark:text-gray-400">Real-World Capstones</span>
                </div>
              </div>

              {/* 7 Phases Cards */}
              <div className="space-y-3">
                <h4 className="font-bold text-zinc-900 dark:text-gray-100 flex items-center gap-2">
                  <Layers className="h-4 w-4 text-zinc-700 dark:text-gray-300" />
                  The 7 Progressive Phases
                </h4>

                <div className="grid gap-2.5 sm:grid-cols-2">
                  {ROADMAP_PHASES.map((phase) => (
                    <div
                      key={phase.id}
                      className="p-3.5 rounded-xl border border-zinc-200 dark:border-gray-700 bg-zinc-50/50 dark:bg-gray-800/30 flex items-start gap-3 hover:border-zinc-300 dark:hover:border-gray-600 transition-colors"
                    >
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-zinc-900 text-white dark:bg-gray-100 dark:text-gray-900 font-mono font-bold text-xs">
                        0{phase.id}
                      </span>
                      <div>
                        <h5 className="font-bold text-xs sm:text-sm text-zinc-900 dark:text-gray-100">
                          {phase.name}
                        </h5>
                        <p className="text-[11.5px] text-zinc-500 dark:text-gray-400 mt-0.5 leading-snug">
                          {phase.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Learning Philosophy Alert */}
              <div className="p-4 rounded-xl border border-zinc-200 bg-zinc-50 dark:border-gray-700 dark:bg-gray-800 text-xs sm:text-[13px] leading-relaxed text-zinc-700 dark:text-gray-300">
                <strong className="text-zinc-950 dark:text-white">The Core Philosophy:</strong> Copying code snippets is prohibited. The question is never merely &ldquo;how do we write this?&rdquo; but rather <em>&ldquo;What happens when this system experiences a partition, high write contention, or cascading failure? Why did we choose this architecture over alternatives?&rdquo;</em>
              </div>
            </div>
          )}

          {/* TAB 2: THE 6-STAGE STUDY ROUTINE */}
          {activeTab === "how-to-study" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5 dark:border-gray-700 dark:bg-gray-800/60">
                <h3 className="text-base font-bold text-zinc-950 dark:text-white flex items-center gap-2">
                  <Zap className="h-5 w-5 text-zinc-800 dark:text-gray-200" />
                  The 6-Stage Daily Engineering Routine
                </h3>
                <p className="mt-1 text-zinc-600 dark:text-gray-400 text-xs sm:text-sm leading-relaxed">
                  Execute the following 6 structured steps on every module to ensure complete mastery from first principles to production:
                </p>
              </div>

              <div className="space-y-4">
                {/* Step 1: Watch Video First */}
                <div className="flex gap-4 p-4 rounded-xl border border-zinc-200 dark:border-gray-700 bg-white dark:bg-gray-800/40">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-zinc-100 dark:bg-gray-700 text-zinc-800 dark:text-gray-200 font-bold">
                    <PlayCircle className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-zinc-500 uppercase tracking-wider">Step 01</span>
                      <h4 className="font-bold text-zinc-950 dark:text-white">
                        Watch Architectural Video Masterclasses First
                      </h4>
                    </div>
                    <p className="text-xs text-zinc-600 dark:text-gray-400 leading-relaxed">
                      Start by watching the embedded video masterclasses (ByteByteGo, Hussein Nasser, TechWorld with Nana). Focus on visual architecture diagrams, packet journeys, and distributed failure states to establish a solid mental model.
                    </p>
                  </div>
                </div>

                {/* Step 2: Reinforce with Reading Second */}
                <div className="flex gap-4 p-4 rounded-xl border border-zinc-200 dark:border-gray-700 bg-white dark:bg-gray-800/40">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-zinc-100 dark:bg-gray-700 text-zinc-800 dark:text-gray-200 font-bold">
                    <BookOpen className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-zinc-500 uppercase tracking-wider">Step 02</span>
                      <h4 className="font-bold text-zinc-950 dark:text-white">
                        Reinforce & Deepen with Free Canonical Literature
                      </h4>
                    </div>
                    <p className="text-xs text-zinc-600 dark:text-gray-400 leading-relaxed">
                      Now that you have the visual foundation, solidify your knowledge by reading the literature. Each topic links directly to 100% free canonical texts (Martin Fowler, RFCs, Google SRE, Use The Index Luke) with zero paywalls.
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex gap-4 p-4 rounded-xl border border-zinc-200 dark:border-gray-700 bg-white dark:bg-gray-800/40">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-zinc-100 dark:bg-gray-700 text-zinc-800 dark:text-gray-200 font-bold">
                    <HelpCircle className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-zinc-500 uppercase tracking-wider">Step 03</span>
                      <h4 className="font-bold text-zinc-950 dark:text-white">
                        Self-Check Diagnostic Questions
                      </h4>
                    </div>
                    <p className="text-xs text-zinc-600 dark:text-gray-400 leading-relaxed">
                      Solve the 3 diagnostic self-check questions per topic before checking solutions. Formulate your reasoning to eliminate illusions of competence and expose blind spots.
                    </p>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="flex gap-4 p-4 rounded-xl border border-zinc-200 dark:border-gray-700 bg-white dark:bg-gray-800/40">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-zinc-100 dark:bg-gray-700 text-zinc-800 dark:text-gray-200 font-bold">
                    <Code2 className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-zinc-500 uppercase tracking-wider">Step 04</span>
                      <h4 className="font-bold text-zinc-950 dark:text-white">
                        Hands-On Production Ticket & Blueprints
                      </h4>
                    </div>
                    <p className="text-xs text-zinc-600 dark:text-gray-400 leading-relaxed">
                      Open your local IDE and implement the assigned ticket (e.g. TICKET-001) using the multi-language blueprints in Go, TypeScript, Python, or Java with real latency and concurrency constraints.
                    </p>
                  </div>
                </div>

                {/* Step 5 */}
                <div className="flex gap-4 p-4 rounded-xl border border-zinc-200 dark:border-gray-700 bg-white dark:bg-gray-800/40">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-zinc-100 dark:bg-gray-700 text-zinc-800 dark:text-gray-200 font-bold">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-zinc-500 uppercase tracking-wider">Step 05</span>
                      <h4 className="font-bold text-zinc-950 dark:text-white">
                        Notes Studio & Handbook Export
                      </h4>
                    </div>
                    <p className="text-xs text-zinc-600 dark:text-gray-400 leading-relaxed">
                      Press <kbd className="font-mono text-[10px] px-1 py-0.5 rounded bg-zinc-200 dark:bg-zinc-700">N</kbd> to open Notes Studio. Document tradeoffs, benchmarks, and gotchas. Click &ldquo;Export All Notes&rdquo; to build your personal Markdown handbook.
                    </p>
                  </div>
                </div>

                {/* Step 6 */}
                <div className="flex gap-4 p-4 rounded-xl border border-zinc-200 dark:border-gray-700 bg-white dark:bg-gray-800/40">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-zinc-100 dark:bg-gray-700 text-zinc-800 dark:text-gray-200 font-bold">
                    <GitBranch className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-zinc-500 uppercase tracking-wider">Step 06</span>
                      <h4 className="font-bold text-zinc-950 dark:text-white">
                        Push to GitHub & Build Public Portfolio
                      </h4>
                    </div>
                    <p className="text-xs text-zinc-600 dark:text-gray-400 leading-relaxed">
                      Organize your implementations into clean topic directories, write informative READMEs with benchmark graphs, commit using Conventional Commits, and push to your public GitHub portfolio.
                    </p>
                  </div>
                </div>
              </div>

              {/* Crucial Practice Callout */}
              <div className="p-4 rounded-xl border-2 border-amber-500/30 bg-amber-500/10 dark:border-amber-500/20 dark:bg-amber-950/20 text-xs leading-relaxed text-zinc-800 dark:text-zinc-200 space-y-2">
                <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 font-bold font-mono uppercase tracking-wider text-[11px]">
                  <Flame className="h-4 w-4" />
                  <span>The Law of Deliberate Practice</span>
                </div>
                <p>
                  <strong>Watching videos and reading alone is never enough.</strong> You cannot learn distributed systems by passively streaming lectures. You must write the socket servers from scratch, break connections under load, benchmark p99 latency, and build the 7 portfolio capstones. True mastery is forged in the terminal.
                </p>
              </div>
            </div>
          )}

          {/* TAB 3: WHITEBOARD & ORAL INTERVIEW (WHAT TO SAY) */}
          {activeTab === "what-to-say" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5 dark:border-gray-700 dark:bg-gray-800/60">
                <h3 className="text-base font-bold text-zinc-950 dark:text-white flex items-center gap-2">
                  <Mic className="h-5 w-5 text-rose-500" />
                  Technical Mock Interview & Whiteboard Defense Simulator
                </h3>
                <p className="mt-1 text-zinc-600 dark:text-gray-400 text-xs sm:text-sm leading-relaxed">
                  Senior engineering interviews evaluate how you articulate architectural choices aloud under pressure. Across all 31 modules, use the built-in 75-second Mock Interview Simulator with the 3-tier formula:
                </p>
              </div>

              {/* 3-Tier Answer Formula */}
              <div className="space-y-3.5">
                <h4 className="font-bold text-zinc-950 dark:text-white text-sm flex items-center gap-2">
                  <Award className="h-4 w-4 text-zinc-700 dark:text-gray-300" />
                  The Senior 3-Tier Response Framework
                </h4>

                <div className="p-4 rounded-xl border border-zinc-200 dark:border-gray-700 bg-white dark:bg-gray-800/60 space-y-2">
                  <span className="px-2.5 py-0.5 rounded-md bg-blue-100 text-blue-900 dark:bg-blue-950 dark:text-blue-200 font-mono font-bold text-xs">
                    1. [WHAT] The Core Abstraction & Mental Model
                  </span>
                  <p className="text-xs text-zinc-600 dark:text-gray-400 leading-relaxed pl-1">
                    Deliver the architectural definition and core mechanism in two crisp sentences. Do not ramble or hedge.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-zinc-200 dark:border-gray-700 bg-white dark:bg-gray-800/60 space-y-2">
                  <span className="px-2.5 py-0.5 rounded-md bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-200 font-mono font-bold text-xs">
                    2. [WHY] Trade-offs, Latency & Failure Modes
                  </span>
                  <p className="text-xs text-zinc-600 dark:text-gray-400 leading-relaxed pl-1">
                    Explain why this solution was selected over alternatives. Quantify disk vs memory I/O latencies (~1ms vs ~25ms) and state operational trade-offs.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-zinc-200 dark:border-gray-700 bg-white dark:bg-gray-800/60 space-y-2">
                  <span className="px-2.5 py-0.5 rounded-md bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-200 font-mono font-bold text-xs">
                    3. [HOW] Production Hardening & Edge Cases
                  </span>
                  <p className="text-xs text-zinc-600 dark:text-gray-400 leading-relaxed pl-1">
                    Describe handling edge cases: thundering herds, distributed mutex leases, split-brain partitions, and jittered TTL expiration.
                  </p>
                </div>
              </div>

              {/* Live Simulator Advice */}
              <div className="p-4 rounded-xl border border-zinc-200 bg-zinc-50 dark:border-gray-700 dark:bg-gray-800 text-xs sm:text-[13px] text-zinc-800 dark:text-gray-200 leading-relaxed space-y-2">
                <div className="font-bold flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>Launch the 75-Second Whiteboard Simulator on Each Topic:</span>
                </div>
                <p>
                  Click &ldquo;Start Mock Interview&rdquo; on any module. A 75-second timer will begin. Speak your solution aloud without consulting notes. When finished, reveal the benchmark solution and self-grade your performance.
                </p>
              </div>
            </div>
          )}

          {/* TAB 4: THE 7 CAPSTONES (WHAT TO BUILD) */}
          {activeTab === "what-to-build" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5 dark:border-gray-700 dark:bg-gray-800/60">
                <h3 className="text-base font-bold text-zinc-950 dark:text-white flex items-center gap-2">
                  <Terminal className="h-5 w-5 text-zinc-800 dark:text-gray-200" />
                  7 Production Portfolio Capstone Projects
                </h3>
                <p className="mt-1 text-zinc-600 dark:text-gray-400 text-xs sm:text-sm leading-relaxed">
                  Upon completing each phase, implement and submit a production-grade portfolio project on GitHub:
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-1">
                {Object.values(CAPSTONE_PROJECTS).map((capstone) => (
                  <div
                    key={capstone.phaseId}
                    className="p-4 rounded-xl border border-zinc-200 dark:border-gray-700 bg-white dark:bg-gray-800/60 hover:border-zinc-300 dark:hover:border-gray-600 transition-colors space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <span className="flex h-6 w-6 items-center justify-center rounded-md bg-zinc-100 text-zinc-900 dark:bg-gray-700 dark:text-gray-100 font-mono font-bold text-xs">
                          P{capstone.phaseId}
                        </span>
                        <div>
                          <h4 className="font-bold text-zinc-900 dark:text-gray-100 text-sm">
                            {capstone.shortName || capstone.title}
                          </h4>
                          {capstone.subtitle && (
                            <p className="text-[11px] text-zinc-500 dark:text-gray-400">
                              {capstone.subtitle}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-zinc-100 dark:bg-gray-700 text-zinc-700 dark:text-gray-300">
                          {capstone.difficulty}
                        </span>
                        <span className="text-[11px] font-mono font-semibold text-zinc-500 bg-zinc-100 dark:bg-gray-700 px-2 py-0.5 rounded">
                          {capstone.estimatedHours}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-zinc-600 dark:text-gray-300 leading-relaxed">
                      {capstone.pitch || capstone.scenario}
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {(capstone.highlights || capstone.techStack).map((item, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center gap-1 rounded-md bg-zinc-100 dark:bg-gray-700/80 px-2 py-0.5 text-[10.5px] font-medium text-zinc-700 dark:text-gray-300"
                        >
                          <CheckCircle2 className="h-3 w-3 text-zinc-500 dark:text-zinc-400" />
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer & Direct Course Entry Call-To-Action */}
        <div className="shrink-0 border-t border-zinc-200 bg-zinc-50/90 p-4 sm:p-5 dark:border-gray-700 dark:bg-gray-800/90 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3 text-xs text-zinc-500 dark:text-gray-400">
            <span className="hidden sm:inline-block">Active Topic:</span>
            <span className="font-bold text-zinc-900 dark:text-gray-100 truncate max-w-xs">
              Module {currentTopicNumber < 10 ? `0${currentTopicNumber}` : currentTopicNumber}: {currentTopicTitle}
            </span>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              onClick={() => {
                onClose();
                onExploreCapstones();
              }}
              className="flex-1 sm:flex-initial rounded-xl border border-zinc-300 bg-white px-3.5 py-2.5 text-xs font-bold text-zinc-700 hover:bg-zinc-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-zinc-700 transition-colors shadow-2xs text-center"
            >
              Portfolio Capstones
            </button>

            {/* Direct Start Learning CTA */}
            <button
              onClick={() => {
                onStartCourse();
                onClose();
              }}
              className="flex-1 sm:flex-initial group flex items-center justify-center gap-2 rounded-xl bg-zinc-950 px-5 py-2.5 text-xs sm:text-sm font-extrabold text-white shadow-md hover:bg-zinc-800 dark:bg-white dark:text-gray-950 dark:hover:bg-zinc-200 active:scale-[0.98] transition-all"
            >
              <span>Start Learning</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
