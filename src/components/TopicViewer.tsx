"use client";

import React from "react";
import { RoadmapTopic } from "../types/roadmap";
import { VideoPlayer } from "./VideoPlayer";
import { BookCard } from "./BookCard";
import { ChallengeSection } from "./ChallengeSection";
import { NotesDrawer } from "./NotesDrawer";
import {
  Check,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  ArrowLeft,
  ArrowRight,
  Code2,
  HelpCircle,
} from "lucide-react";

interface TopicViewerProps {
  topic: RoadmapTopic;
  isCompleted: boolean;
  onToggleComplete: () => void;
  isBookRead: boolean;
  onToggleBookRead: () => void;
  note: string;
  onSaveNote: (topicId: string, note: string) => void;
  onSelectPrev: () => void;
  onSelectNext: () => void;
  hasPrev: boolean;
  hasNext: boolean;
}

export function TopicViewer({
  topic,
  isCompleted,
  onToggleComplete,
  isBookRead,
  onToggleBookRead,
  note,
  onSaveNote,
  onSelectPrev,
  onSelectNext,
  hasPrev,
  hasNext,
}: TopicViewerProps) {
  return (
    <div className="mx-auto max-w-4xl space-y-8 pb-20">
      {/* Top Meta Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-200 pb-5 dark:border-zinc-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
              PHASE 0{topic.phaseId} • {topic.phaseName}
            </span>
          </div>
          <h1 className="mt-1 text-2xl font-black tracking-tight text-zinc-900 dark:text-white sm:text-3xl">
            <span className="font-mono font-normal text-zinc-400 dark:text-zinc-600 mr-2">
              #{String(topic.number).padStart(2, "0")}
            </span>
            {topic.title}
          </h1>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            {topic.shortSummary}
          </p>
        </div>

        {/* Complete Toggle Button */}
        <button
          onClick={onToggleComplete}
          className={`flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-semibold transition-all ${
            isCompleted
              ? "border-zinc-900 bg-zinc-900 text-white dark:border-white dark:bg-white dark:text-black shadow-sm"
              : "border-zinc-300 bg-white text-zinc-800 hover:border-zinc-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:border-zinc-400"
          }`}
        >
          <CheckCircle2 className="h-4 w-4" />
          <span>{isCompleted ? "Topic Completed" : "Mark as Completed"}</span>
        </button>
      </div>

      {/* Architectural Insights Card */}
      <div className="rounded-xl border border-zinc-200 bg-gradient-to-br from-zinc-50 to-white p-5 dark:border-zinc-800 dark:from-zinc-950 dark:to-zinc-900/40 shadow-sm space-y-3">
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-black text-white dark:bg-white dark:text-black text-xs font-mono font-bold">
            💡
          </div>
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-white">
            Architectural Insights & Best Practices
          </span>
        </div>

        <blockquote className="border-l-2 border-black pl-3 text-xs italic font-medium text-zinc-800 dark:border-white dark:text-zinc-200">
          &ldquo;{topic.seniorInsight.quote}&rdquo;
        </blockquote>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1 text-xs">
          <div className="rounded-md border border-zinc-200/80 bg-white p-3 dark:border-zinc-800/80 dark:bg-zinc-900/60">
            <span className="font-mono font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5 mb-1">
              <Lightbulb className="h-3.5 w-3.5 text-zinc-700 dark:text-zinc-300" />
              Production Reality
            </span>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              {topic.seniorInsight.productionLesson}
            </p>
          </div>

          <div className="rounded-md border border-zinc-200/80 bg-white p-3 dark:border-zinc-800/80 dark:bg-zinc-900/60">
            <span className="font-mono font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5 mb-1">
              <AlertTriangle className="h-3.5 w-3.5 text-zinc-700 dark:text-zinc-300" />
              Common Junior Pitfall
            </span>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              {topic.seniorInsight.commonMistake}
            </p>
          </div>
        </div>
      </div>

      {/* 1. Video Lecture Section */}
      <VideoPlayer
        youtubeId={topic.youtubeId}
        title={topic.title}
        duration={topic.duration}
        timestamps={topic.timestamps}
      />

      {/* 2. Deep Architectural Breakdown */}
      <section className="space-y-4 rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950 shadow-sm">
        <div className="flex items-center gap-2 border-b border-zinc-100 pb-3 dark:border-zinc-900">
          <Code2 className="h-4 w-4 text-zinc-900 dark:text-white" />
          <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-white">
            Architectural Deep Dive & Mental Models
          </h3>
        </div>

        <div className="space-y-3 text-xs leading-relaxed text-zinc-700 dark:text-zinc-300">
          <div>
            <h4 className="font-mono font-bold text-zinc-900 dark:text-white mb-1">
              What is it?
            </h4>
            <p>{topic.coreDeepDive.what}</p>
          </div>

          <div>
            <h4 className="font-mono font-bold text-zinc-900 dark:text-white mb-1">
              Why do we need it?
            </h4>
            <p>{topic.coreDeepDive.why}</p>
          </div>

          <div>
            <h4 className="font-mono font-bold text-zinc-900 dark:text-white mb-1.5">
              How it works under the hood:
            </h4>
            <ul className="space-y-1 pl-1">
              {topic.coreDeepDive.howItWorks.map((step, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-zinc-400 font-mono">•</span>
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Blueprint Code / Diagram */}
        <div className="pt-2">
          <div className="mb-1.5 flex items-center justify-between">
            <span className="font-mono text-xs font-bold text-zinc-800 dark:text-zinc-200">
              {topic.coreDeepDive.blueprintTitle}
            </span>
            <span className="font-mono text-[10px] uppercase text-zinc-400">
              {topic.coreDeepDive.blueprintLanguage}
            </span>
          </div>
          <div className="overflow-x-auto rounded-lg border border-zinc-800 bg-zinc-900 p-3.5 font-mono text-xs text-zinc-100 dark:bg-black">
            <pre>
              <code>{topic.coreDeepDive.blueprintCode}</code>
            </pre>
          </div>
        </div>
      </section>

      {/* 3. Curated Book Recommendation */}
      <BookCard
        book={topic.recommendedBook}
        isRead={isBookRead}
        onToggleRead={onToggleBookRead}
      />

      {/* 4. Production Engineering Challenge & Solution (Omitted for Module 1 overview) */}
      {topic.number !== 1 && topic.handsOnChallenge && (
        <ChallengeSection challenge={topic.handsOnChallenge} />
      )}

      {/* 5. Additional Authoritative References (RFCs, Papers, Official Specs) */}
      {topic.additionalReferences && topic.additionalReferences.length > 0 && (
        <div className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950 shadow-sm space-y-3">
          <div className="flex items-center gap-2">
            <Code2 className="h-4 w-4 text-zinc-900 dark:text-white" />
            <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-white">
              Primary Sources & Canonical Specifications
            </h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
            {topic.additionalReferences.map((ref, idx) => (
              <a
                key={idx}
                href={ref.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col justify-between rounded-lg border border-zinc-200/80 bg-zinc-50/50 p-3 hover:border-zinc-400 hover:bg-zinc-100 dark:border-zinc-800/80 dark:bg-zinc-900/40 dark:hover:border-zinc-600 dark:hover:bg-zinc-900 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-xs text-zinc-900 dark:text-white group-hover:underline">
                      {ref.title}
                    </span>
                    <span className="font-mono text-[10px] text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white">↗</span>
                  </div>
                  <p className="mt-1 text-[11px] text-zinc-500 dark:text-zinc-400 leading-relaxed">
                    {ref.description}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* 6. Self-Assessment Checklist */}
      <div className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950 shadow-sm space-y-3">
        <div className="flex items-center gap-2">
          <HelpCircle className="h-4 w-4 text-zinc-900 dark:text-white" />
          <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-white">
            Self-Check: Can you answer these aloud?
          </h4>
        </div>
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          You should be able to explain each of these concepts clearly:
        </p>
        <ul className="space-y-2 pt-1 text-xs text-zinc-700 dark:text-zinc-300">
          {topic.selfCheckQuestions.map((q, idx) => (
            <li
              key={idx}
              className="flex items-start gap-2.5 rounded-md border border-zinc-100 bg-zinc-50/50 p-2.5 dark:border-zinc-900 dark:bg-zinc-900/40"
            >
              <span className="font-mono font-bold text-zinc-400">0{idx + 1}.</span>
              <span>{q}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* 7. Student Personal Notes Scratchpad (Omitted for Module 1 overview) */}
      {topic.number !== 1 && (
        <NotesDrawer
          topicId={topic.id}
          initialNote={note}
          onSaveNote={onSaveNote}
        />
      )}

      {/* Bottom Prev / Next Navigation */}
      <div className="flex items-center justify-between border-t border-zinc-200 pt-6 dark:border-zinc-800">
        <button
          onClick={onSelectPrev}
          disabled={!hasPrev}
          className="inline-flex items-center gap-2 rounded-lg border border-zinc-200 bg-white px-4 py-2 text-xs font-medium text-zinc-700 hover:bg-zinc-100 disabled:opacity-30 disabled:pointer-events-none dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Previous Module</span>
        </button>

        <button
          onClick={onSelectNext}
          disabled={!hasNext}
          className="inline-flex items-center gap-2 rounded-lg bg-black px-4 py-2 text-xs font-medium text-white hover:bg-zinc-800 disabled:opacity-30 disabled:pointer-events-none dark:bg-white dark:text-black dark:hover:bg-zinc-200 transition-colors"
        >
          <span>Next Module</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
