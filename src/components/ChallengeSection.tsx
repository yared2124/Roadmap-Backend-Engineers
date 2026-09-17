"use client";

import React, { useState } from "react";
import { HandsOnChallenge } from "../types/roadmap";
import { Terminal, Lightbulb, Code2, Copy, Check, ChevronDown, ChevronUp } from "lucide-react";

interface ChallengeSectionProps {
  challenge: HandsOnChallenge;
}

export function ChallengeSection({ challenge }: ChallengeSectionProps) {
  const [showHints, setShowHints] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [copiedTerminal, setCopiedTerminal] = useState(false);
  const [copiedSolution, setCopiedSolution] = useState(false);

  const copyToClipboard = (text: string, isTerminal: boolean) => {
    navigator.clipboard.writeText(text);
    if (isTerminal) {
      setCopiedTerminal(true);
      setTimeout(() => setCopiedTerminal(false), 2000);
    } else {
      setCopiedSolution(true);
      setTimeout(() => setCopiedSolution(false), 2000);
    }
  };

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-6 sm:p-8 dark:border-gray-700 dark:bg-gray-800 shadow-sm space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-100 pb-4 dark:border-gray-800">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-950 text-white dark:bg-gray-100 dark:text-gray-950 shadow-2xs">
            <Terminal className="h-4 w-4" />
          </div>
          <span className="font-mono text-xs sm:text-sm font-black uppercase tracking-wider text-zinc-950 dark:text-white">
            Production Engineering Challenge
          </span>
          <span className="rounded-md bg-zinc-100 px-2.5 py-0.5 font-mono text-xs font-bold text-zinc-800 dark:bg-gray-700 dark:text-gray-200 border border-zinc-200 dark:border-gray-600">
            {challenge.ticketNumber}
          </span>
        </div>
        <span className="text-xs font-mono font-bold text-zinc-500 dark:text-gray-400">
          Hands-on Verification
        </span>
      </div>

      {/* Ticket Details */}
      <div className="space-y-2">
        <h4 className="text-lg sm:text-xl font-black text-zinc-950 dark:text-white tracking-tight">
          {challenge.title}
        </h4>
        <p className="text-sm sm:text-[15px] leading-relaxed text-zinc-800 dark:text-gray-200 font-normal">
          {challenge.scenario}
        </p>
      </div>

      {/* Acceptance Criteria */}
      <div className="rounded-xl border border-zinc-200/90 bg-zinc-50/70 p-5 dark:border-gray-700 dark:bg-gray-800/60 space-y-3">
        <h5 className="text-xs font-mono font-black uppercase tracking-wider text-zinc-950 dark:text-white">
          Acceptance Criteria
        </h5>
        <ul className="space-y-2 text-sm text-zinc-800 dark:text-gray-200 font-medium">
          {challenge.acceptanceCriteria.map((criterion, idx) => (
            <li key={idx} className="flex items-start gap-2.5">
              <span className="font-mono font-bold text-zinc-400 dark:text-gray-500 shrink-0">[{idx + 1}]</span>
              <span>{criterion}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Terminal Lab (if provided) */}
      {challenge.terminalLab && (
        <div className="space-y-2">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-mono font-bold text-zinc-900 dark:text-gray-100 uppercase tracking-wide">
              Terminal Quick-Lab Command
            </span>
            <button
              onClick={() => copyToClipboard(challenge.terminalLab!, true)}
              className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-zinc-600 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors"
            >
              {copiedTerminal ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-500" />
                  <span className="text-emerald-500">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
          <div className="overflow-x-auto rounded-xl border border-zinc-800 bg-zinc-950 p-4 font-mono text-xs sm:text-sm text-zinc-100 dark:bg-[#111827] shadow-inner">
            <pre>
              <code>{challenge.terminalLab}</code>
            </pre>
          </div>
        </div>
      )}

      {/* Hints & Solution Controls */}
      <div className="flex flex-wrap items-center gap-3 pt-2">
        {/* Toggle Hints Button */}
        {challenge.hints.length > 0 && (
          <button
            onClick={() => setShowHints(!showHints)}
            className="inline-flex items-center gap-2 rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-2 text-xs font-bold text-zinc-800 hover:bg-zinc-100 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700 transition-colors shadow-2xs"
          >
            <Lightbulb className="h-4 w-4 text-amber-500" />
            <span>{showHints ? "Hide Hints" : `View Hints (${challenge.hints.length})`}</span>
            {showHints ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
          </button>
        )}

        {/* Toggle Solution Button */}
        {challenge.solutionCode && (
          <button
            onClick={() => setShowSolution(!showSolution)}
            className="inline-flex items-center gap-2 rounded-xl bg-zinc-950 px-4 py-2 text-xs font-bold text-white hover:bg-black dark:bg-gray-100 dark:text-gray-950 dark:hover:bg-white transition-colors shadow-2xs"
          >
            <Code2 className="h-4 w-4" />
            <span>{showSolution ? "Hide Model Solution" : "Reveal Model Solution"}</span>
            {showSolution ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
          </button>
        )}
      </div>

      {/* Hints Container */}
      {showHints && challenge.hints.length > 0 && (
        <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 dark:border-amber-500/25 space-y-2">
          <span className="font-mono text-xs font-bold text-amber-900 dark:text-amber-200 flex items-center gap-1.5 uppercase tracking-wide">
            <Lightbulb className="h-4 w-4 text-amber-600 dark:text-amber-400" />
            Architectural Hints
          </span>
          <ul className="space-y-1.5 text-sm text-zinc-800 dark:text-gray-200 font-medium pl-2">
            {challenge.hints.map((hint, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-amber-500 font-mono font-bold">•</span>
                <span>{hint}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Solution Container */}
      {showSolution && challenge.solutionCode && (
        <div className="rounded-xl border border-zinc-200 bg-zinc-50/50 p-5 dark:border-gray-700 dark:bg-gray-800/40 space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-zinc-950 dark:text-white">
              Senior Implementation Solution
            </span>
            <button
              onClick={() => copyToClipboard(challenge.solutionCode!, false)}
              className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-zinc-600 hover:text-black dark:text-gray-400 dark:hover:text-white"
            >
              {copiedSolution ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-500" />
                  <span className="text-emerald-500">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  <span>Copy Solution</span>
                </>
              )}
            </button>
          </div>

          <div className="overflow-x-auto rounded-xl border border-zinc-800 bg-zinc-950 p-4 font-mono text-xs sm:text-sm text-zinc-100 dark:bg-[#111827] shadow-inner">
            <pre>
              <code>{challenge.solutionCode}</code>
            </pre>
          </div>

          {challenge.solutionExplanation && (
            <div className="rounded-lg border border-zinc-200/80 bg-white p-3.5 dark:border-gray-700 dark:bg-[#111827]/50 text-sm leading-relaxed text-zinc-800 dark:text-gray-200 font-normal">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-zinc-950 dark:text-white block mb-1">
                Rationale & Production Context:
              </span>
              <p>{challenge.solutionExplanation}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
