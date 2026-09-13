"use client";

import React, { useState } from "react";
import { HandsOnChallenge } from "../types/roadmap";
import { Terminal, Lightbulb, Code2, Copy, Check, ChevronDown, ChevronUp, AlertCircle } from "lucide-react";

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
    <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950 shadow-sm space-y-5">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-100 pb-3 dark:border-zinc-900">
        <div className="flex items-center gap-2">
          <Terminal className="h-4 w-4 text-zinc-900 dark:text-white" />
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-white">
            Production Engineering Challenge
          </span>
          <span className="rounded bg-zinc-100 px-2 py-0.5 font-mono text-[10px] font-semibold text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
            {challenge.ticketNumber}
          </span>
        </div>
        <span className="text-xs text-zinc-500 dark:text-zinc-400">
          Hands-on Practice & Verification
        </span>
      </div>

      {/* Ticket Details */}
      <div>
        <h4 className="text-base font-bold text-zinc-900 dark:text-white">
          {challenge.title}
        </h4>
        <p className="mt-1 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
          {challenge.scenario}
        </p>
      </div>

      {/* Acceptance Criteria */}
      <div className="rounded-lg border border-zinc-200/80 bg-zinc-50/50 p-4 dark:border-zinc-800/80 dark:bg-zinc-900/40">
        <h5 className="mb-2 text-xs font-mono font-semibold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
          Acceptance Criteria
        </h5>
        <ul className="space-y-1.5 text-xs text-zinc-600 dark:text-zinc-400">
          {challenge.acceptanceCriteria.map((criterion, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span className="font-mono font-bold text-zinc-400">[{idx + 1}]</span>
              <span>{criterion}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Terminal Lab (if provided) */}
      {challenge.terminalLab && (
        <div>
          <div className="mb-1.5 flex items-center justify-between">
            <span className="text-xs font-mono font-semibold text-zinc-700 dark:text-zinc-300">
              Terminal Quick-Lab
            </span>
            <button
              onClick={() => copyToClipboard(challenge.terminalLab!, true)}
              className="inline-flex items-center gap-1 text-[11px] font-mono text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
            >
              {copiedTerminal ? (
                <>
                  <Check className="h-3 w-3" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="h-3 w-3" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
          <div className="overflow-x-auto rounded-lg border border-zinc-800 bg-zinc-900 p-3 font-mono text-xs text-zinc-100 dark:bg-black">
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
            className="inline-flex items-center gap-1.5 rounded-md border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-xs font-medium text-zinc-700 hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 transition-colors"
          >
            <Lightbulb className="h-3.5 w-3.5 text-amber-500" />
            <span>{showHints ? "Hide Hints" : "Need a Hint?"}</span>
            {showHints ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
          </button>
        )}

        {/* Toggle Solution Button */}
        {challenge.solutionCode && (
          <button
            onClick={() => setShowSolution(!showSolution)}
            className="inline-flex items-center gap-1.5 rounded-md border border-zinc-900 bg-black px-3 py-1.5 text-xs font-medium text-white hover:bg-zinc-800 dark:border-white dark:bg-white dark:text-black dark:hover:bg-zinc-200 transition-colors"
          >
            <Code2 className="h-3.5 w-3.5" />
            <span>{showSolution ? "Hide Solution" : "View Staff Engineer Solution"}</span>
            {showSolution ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
          </button>
        )}
      </div>

      {/* Hints Accordion */}
      {showHints && challenge.hints.length > 0 && (
        <div className="rounded-lg border border-amber-200 bg-amber-50/50 p-4 dark:border-amber-900/50 dark:bg-amber-950/20 text-xs">
          <div className="flex items-center gap-2 mb-2 text-amber-800 dark:text-amber-300 font-semibold">
            <Lightbulb className="h-4 w-4" />
            <span>Architectural Clues</span>
          </div>
          <ul className="space-y-1 text-zinc-700 dark:text-zinc-300 list-disc list-inside">
            {challenge.hints.map((hint, i) => (
              <li key={i}>{hint}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Solution Accordion */}
      {showSolution && challenge.solutionCode && (
        <div className="space-y-3 rounded-lg border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900/60">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-zinc-900 dark:text-white">
              Staff Engineer Implementation
            </span>
            <button
              onClick={() => copyToClipboard(challenge.solutionCode!, false)}
              className="inline-flex items-center gap-1 text-[11px] font-mono text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
            >
              {copiedSolution ? (
                <>
                  <Check className="h-3 w-3" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="h-3 w-3" />
                  <span>Copy Solution</span>
                </>
              )}
            </button>
          </div>

          <div className="overflow-x-auto rounded-md border border-zinc-800 bg-zinc-900 p-3 font-mono text-xs text-zinc-100 dark:bg-black">
            <pre>
              <code>{challenge.solutionCode}</code>
            </pre>
          </div>

          {challenge.solutionExplanation && (
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              <span className="font-semibold text-zinc-900 dark:text-zinc-200">Why this works: </span>
              {challenge.solutionExplanation}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
