"use client";

import React, { useState } from "react";
import { CapstoneProject } from "../types/roadmap";
import {
  Trophy,
  CheckCircle2,
  Github,
  Terminal,
  Layers,
  Clock,
  ExternalLink,
  Copy,
  Check,
  FolderGit2,
  ShieldCheck,
} from "lucide-react";

interface CapstoneViewerProps {
  capstone: CapstoneProject;
  isCompleted: boolean;
  onToggleComplete: () => void;
  submissionUrl: string;
  onSaveSubmissionUrl: (url: string) => void;
  onBackToTopic: () => void;
}

export function CapstoneViewer({
  capstone,
  isCompleted,
  onToggleComplete,
  submissionUrl,
  onSaveSubmissionUrl,
  onBackToTopic,
}: CapstoneViewerProps) {
  const [copiedDiagram, setCopiedDiagram] = useState(false);
  const [repoInput, setRepoInput] = useState(submissionUrl);
  const [isSaved, setIsSaved] = useState(false);

  const handleCopyDiagram = () => {
    if (!capstone.architectureDiagram) return;
    navigator.clipboard.writeText(capstone.architectureDiagram);
    setCopiedDiagram(true);
    setTimeout(() => setCopiedDiagram(false), 2000);
  };

  const handleSaveRepo = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveSubmissionUrl(repoInput.trim());
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  const getDifficultyBadge = (difficulty: string) => {
    switch (difficulty) {
      case "Intermediate":
        return "bg-blue-100 text-blue-800 dark:bg-blue-950/70 dark:text-blue-300 border-blue-200 dark:border-blue-800";
      case "Advanced":
        return "bg-purple-100 text-purple-800 dark:bg-purple-950/70 dark:text-purple-300 border-purple-200 dark:border-purple-800";
      case "Senior":
        return "bg-amber-100 text-amber-800 dark:bg-amber-950/70 dark:text-amber-300 border-amber-200 dark:border-amber-800";
      case "Staff":
        return "bg-rose-100 text-rose-800 dark:bg-rose-950/70 dark:text-rose-300 border-rose-200 dark:border-rose-800";
      default:
        return "bg-zinc-100 text-zinc-800 dark:bg-gray-700 dark:text-gray-300";
    }
  };

  return (
    <div className="mx-auto max-w-4xl space-y-8 pb-16">
      {/* Top Breadcrumb & Return Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBackToTopic}
          className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-500 hover:text-black dark:hover:text-white transition-colors"
        >
          <span>← Back to Topics</span>
        </button>
        <span className="font-mono text-[11px] uppercase tracking-wider text-zinc-400">
          Phase 0{capstone.phaseId} Milestone Challenge
        </span>
      </div>

      {/* Hero Header Card */}
      <div className="rounded-2xl border border-zinc-200 bg-linear-to-b from-zinc-50 to-white p-6 sm:p-8 dark:border-gray-700 dark:from-zinc-900/60 dark:to-gray-800 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
          <Trophy className="h-64 w-64 text-zinc-900 dark:text-white" />
        </div>

        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-2.5 py-1 text-xs font-mono font-bold text-amber-600 dark:text-amber-400 border border-amber-500/20">
              <Trophy className="h-3.5 w-3.5" />
              PHASE CAPSTONE PROJECT
            </span>
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold border ${getDifficultyBadge(
                capstone.difficulty
              )}`}
            >
              {capstone.difficulty} Level
            </span>
            <span className="inline-flex items-center gap-1 font-mono text-xs text-zinc-500 dark:text-gray-400">
              <Clock className="h-3.5 w-3.5" />
              {capstone.estimatedHours}
            </span>
          </div>

          <div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-zinc-900 dark:text-white">
              {capstone.shortName ? `${capstone.shortName}: ${capstone.subtitle || capstone.title}` : capstone.title}
            </h1>
            {capstone.subtitle && (
              <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 mt-1">
                {capstone.subtitle}
              </p>
            )}
          </div>

          <p className="text-sm sm:text-base leading-relaxed text-zinc-600 dark:text-gray-300 max-w-3xl">
            {capstone.scenario}
          </p>

          {capstone.highlights && capstone.highlights.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-1">
              {capstone.highlights.map((hl, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-xs font-mono font-medium text-emerald-700 dark:text-emerald-300"
                >
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                  {hl}
                </span>
              ))}
            </div>
          )}

          {/* Quick Tech Stack Tags */}
          <div className="pt-2 flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono text-zinc-400">Primary Stack:</span>
            {capstone.techStack.map((tech, i) => (
              <span
                key={i}
                className="inline-flex items-center rounded-md border border-zinc-200 bg-white px-2 py-0.5 text-xs font-mono font-medium text-zinc-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Section 1: Key Deliverables Checklist */}
      <div className="rounded-xl border border-zinc-200 bg-white p-6 sm:p-7 dark:border-gray-700 dark:bg-gray-800 shadow-sm space-y-4">
        <div className="flex items-center gap-2.5 border-b border-zinc-100 dark:border-zinc-900 pb-3">
          <Layers className="h-5 w-5 text-zinc-950 dark:text-white" />
          <h2 className="text-base sm:text-lg font-extrabold text-zinc-950 dark:text-white">
            Core Engineering Deliverables
          </h2>
        </div>

        <p className="text-xs sm:text-[13.5px] font-medium text-zinc-600 dark:text-gray-300">
          Your project repository must satisfy each of the following architectural specifications:
        </p>

        <ul className="space-y-3 pt-1">
          {capstone.keyDeliverables.map((item, idx) => (
            <li
              key={idx}
              className="flex items-start gap-3 rounded-xl border border-zinc-200/80 bg-zinc-50/70 p-4 dark:border-zinc-900 dark:bg-gray-800/40 text-xs sm:text-[14px] leading-relaxed font-semibold text-zinc-900 dark:text-gray-100 shadow-xs"
            >
              <span className="font-mono font-bold text-zinc-400 shrink-0 mt-0.5">
                0{idx + 1}.
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Section 2: Architecture Diagram */}
      {capstone.architectureDiagram && (
        <div className="rounded-xl border border-zinc-200 bg-white p-6 sm:p-7 dark:border-gray-700 dark:bg-gray-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-900 pb-3">
            <div className="flex items-center gap-2.5">
              <Terminal className="h-5 w-5 text-zinc-950 dark:text-white" />
              <h2 className="text-base sm:text-lg font-extrabold text-zinc-950 dark:text-white">
                System Architecture & Data Flow
              </h2>
            </div>
            <button
              onClick={handleCopyDiagram}
              className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-zinc-600 hover:text-zinc-950 dark:text-gray-400 dark:hover:text-zinc-100 transition-colors"
            >
              {copiedDiagram ? (
                <>
                  <Check className="h-4 w-4 text-emerald-500" />
                  <span className="text-emerald-500">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  <span>Copy Diagram</span>
                </>
              )}
            </button>
          </div>

          <pre className="overflow-x-auto rounded-xl bg-zinc-950 p-5 font-mono text-xs sm:text-[12.5px] leading-relaxed text-zinc-200 dark:border dark:border-gray-700 shadow-inner">
            <code>{capstone.architectureDiagram}</code>
          </pre>
        </div>
      )}

      {/* Section 3: Acceptance & Review Criteria */}
      <div className="rounded-xl border border-zinc-200 bg-white p-6 sm:p-7 dark:border-gray-700 dark:bg-gray-800 shadow-sm space-y-4">
        <div className="flex items-center gap-2.5 border-b border-zinc-100 dark:border-zinc-900 pb-3">
          <ShieldCheck className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
          <h2 className="text-base sm:text-lg font-extrabold text-zinc-950 dark:text-white">
            Acceptance Criteria & Verification Test Suite
          </h2>
        </div>

        <p className="text-xs sm:text-[13.5px] font-medium text-zinc-600 dark:text-gray-300">
          Senior staff criteria used to evaluate whether your repository is production-ready:
        </p>

        <div className="space-y-3">
          {capstone.acceptanceCriteria.map((crit, idx) => (
            <div
              key={idx}
              className="flex items-start gap-3 rounded-xl border border-emerald-500/25 bg-emerald-50/50 p-4 text-xs sm:text-[13.5px] dark:border-emerald-950 dark:bg-emerald-950/25 text-emerald-950 dark:text-emerald-100 shadow-2xs"
            >
              <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <span className="leading-relaxed font-mono font-medium">{crit}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Section 4: GitHub Repository Submission & Portfolio Guide */}
      <div className="rounded-xl border border-zinc-200 bg-white p-6 sm:p-7 dark:border-gray-700 dark:bg-gray-800 shadow-sm space-y-6">
        <div className="flex items-center gap-2.5 border-b border-zinc-100 dark:border-zinc-900 pb-3">
          <FolderGit2 className="h-5 w-5 text-zinc-950 dark:text-white" />
          <h2 className="text-base sm:text-lg font-extrabold text-zinc-950 dark:text-white">
            GitHub Submission & Portfolio Guide
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h3 className="text-xs sm:text-sm font-mono font-bold uppercase tracking-wider text-zinc-600 dark:text-gray-400">
              Recommended Repository Structure
            </h3>
            <pre className="overflow-x-auto rounded-xl bg-zinc-950 p-4 font-mono text-xs text-zinc-200 dark:border dark:border-gray-700 shadow-inner">
              <code>{capstone.githubSubmissionGuide.folderStructure}</code>
            </pre>
          </div>

          <div className="space-y-3">
            <h3 className="text-xs sm:text-sm font-mono font-bold uppercase tracking-wider text-zinc-600 dark:text-gray-400">
              README.md Portfolio Checklist
            </h3>
            <div className="space-y-2.5">
              {capstone.githubSubmissionGuide.readmeChecklist.map((checkItem, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 text-xs sm:text-sm font-medium text-zinc-800 dark:text-gray-200"
                >
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">✓</span>
                  <span>{checkItem}</span>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-zinc-100 dark:border-zinc-900">
              <span className="text-xs text-zinc-500 dark:text-gray-400 block font-mono font-medium">
                Recommended Repository Name:
              </span>
              <code className="text-xs sm:text-sm font-bold text-zinc-950 dark:text-white font-mono bg-zinc-100 dark:bg-gray-800 px-2.5 py-1 rounded-md inline-block mt-1">
                {capstone.githubSubmissionGuide.recommendedRepoName}
              </code>
            </div>
          </div>
        </div>

        {/* Student Submission Form */}
        <div className="rounded-xl border border-zinc-200/90 bg-zinc-50 p-5 dark:border-gray-700 dark:bg-gray-900/80 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Github className="h-4 w-4 text-zinc-900 dark:text-white" />
              <h3 className="text-xs font-bold text-zinc-900 dark:text-white font-mono uppercase tracking-wider">
                Submit Your Project Repository
              </h3>
            </div>
            {isCompleted && (
              <span className="inline-flex items-center gap-1 rounded bg-emerald-100 px-2 py-0.5 text-xs font-bold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-mono">
                ✓ Milestone Completed
              </span>
            )}
          </div>

          <form onSubmit={handleSaveRepo} className="flex flex-col sm:flex-row gap-2">
            <input
              type="url"
              placeholder="https://github.com/your-username/repo-name"
              value={repoInput}
              onChange={(e) => setRepoInput(e.target.value)}
              className="flex-1 rounded-md border border-zinc-300 bg-white px-3.5 py-2 text-xs text-zinc-900 placeholder:text-zinc-400 focus:outline-hidden focus:ring-2 focus:ring-black dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:ring-white font-mono"
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-1.5 rounded-md bg-zinc-900 px-4 py-2 text-xs font-bold text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200 transition-colors shrink-0"
            >
              {isSaved ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <FolderGit2 className="h-3.5 w-3.5" />}
              <span>{isSaved ? "Saved!" : "Save Link"}</span>
            </button>
          </form>

          {submissionUrl && (
            <div className="flex items-center justify-between text-xs pt-1">
              <span className="text-zinc-500 dark:text-gray-400">Current submission:</span>
              <a
                href={submissionUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-mono text-zinc-900 dark:text-white hover:underline truncate max-w-xs sm:max-w-md"
              >
                <span>{submissionUrl}</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          )}

          {/* Toggle Milestone Completion */}
          <div className="pt-3 border-t border-zinc-200 dark:border-gray-700 flex justify-end">
            <button
              onClick={onToggleComplete}
              className={`inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-xs font-bold font-mono transition-colors shadow-xs ${
                isCompleted
                  ? "bg-emerald-600 text-white hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-500"
                  : "bg-black text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
              }`}
            >
              <Trophy className="h-4 w-4" />
              <span>
                {isCompleted
                  ? "Phase Capstone Completed! (Click to Unmark)"
                  : "Mark Phase Capstone as Completed"}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
