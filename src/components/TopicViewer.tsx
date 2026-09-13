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
  BookOpen,
  BookmarkCheck,
  ExternalLink,
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
          <div className="inline-flex items-center gap-2.5 rounded-md border border-zinc-300 bg-zinc-100/90 px-3 py-1 dark:border-zinc-700 dark:bg-zinc-900 mb-2 shadow-xs">
            <span className="font-mono text-xs font-black tracking-widest text-black dark:text-white uppercase">
              PHASE 0{topic.phaseId}
            </span>
            <span className="text-zinc-300 dark:text-zinc-700 font-bold">•</span>
            <span className="text-xs font-black uppercase tracking-wider text-zinc-900 dark:text-zinc-100">
              {topic.phaseName}
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

      {/* 1. Primary Video Lecture */}
      <VideoPlayer
        youtubeId={topic.youtubeId}
        title={topic.title}
        duration={topic.duration}
      />

      {/* 1.1 Optional Secondary / Follow-up Lecture */}
      {topic.secondaryVideo && (
        <div className="space-y-2">
          <div className="flex items-center gap-2 px-1">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100">
              Part 2 / Essential Mindset: {topic.secondaryVideo.title}
            </span>
            <span className="text-zinc-400">•</span>
            <span className="text-xs font-mono text-zinc-500">{topic.secondaryVideo.duration}</span>
          </div>
          <p className="text-xs text-zinc-600 dark:text-zinc-400 px-1">
            {topic.secondaryVideo.description}
          </p>
          <VideoPlayer
            youtubeId={topic.secondaryVideo.youtubeId}
            title={topic.secondaryVideo.title}
            duration={topic.secondaryVideo.duration}
          />
        </div>
      )}

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

      {/* 4. Self-Assessment Checklist (Immediate evaluation after reading) */}
      <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950 shadow-sm space-y-5">
        <div className="flex items-center justify-between flex-wrap gap-2 border-b border-zinc-100 pb-3 dark:border-zinc-900">
          <div className="flex items-center gap-2">
            <HelpCircle className="h-4 w-4 text-zinc-900 dark:text-white" />
            <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-white">
              Self-Assessment: Understanding Check (Can you answer these aloud?)
            </h4>
          </div>
          <span className="text-xs font-mono text-zinc-400">
            {topic.selfCheckQuestions.length} Questions
          </span>
        </div>

        {/* Prerequisite Reading Gate Banner */}
        <div
          className={`rounded-lg border p-4 transition-all ${
            isBookRead
              ? "border-emerald-200 bg-emerald-50/40 dark:border-emerald-900/40 dark:bg-emerald-950/20"
              : "border-amber-200 bg-amber-50/40 dark:border-amber-900/40 dark:bg-amber-950/20"
          }`}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-start gap-3">
              <div
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border ${
                  isBookRead
                    ? "border-emerald-300 bg-emerald-100 text-emerald-800 dark:border-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300"
                    : "border-amber-300 bg-amber-100 text-amber-800 dark:border-amber-800 dark:bg-amber-900/50 dark:text-amber-300"
                }`}
              >
                {isBookRead ? (
                  <BookmarkCheck className="h-5 w-5" />
                ) : (
                  <BookOpen className="h-5 w-5" />
                )}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                    Required Prerequisite Reading
                  </span>
                  {isBookRead && (
                    <span className="inline-flex items-center gap-1 rounded bg-emerald-100 px-1.5 py-0.5 text-[10px] font-bold text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300 font-mono">
                      ✓ Completed
                    </span>
                  )}
                </div>
                <h5 className="text-xs font-bold text-zinc-900 dark:text-white mt-0.5">
                  {topic.recommendedBook.title}{" "}
                  <span className="font-normal text-zinc-500 dark:text-zinc-400">
                    by {topic.recommendedBook.author}
                  </span>
                </h5>
                <p className="text-[11.5px] text-zinc-600 dark:text-zinc-300 mt-0.5">
                  <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                    Assigned Chapter:{" "}
                  </span>
                  {topic.recommendedBook.keyChapters}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0 flex-wrap sm:flex-nowrap">
              {topic.recommendedBook.readingUrl && (
                <a
                  href={topic.recommendedBook.readingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-md border border-zinc-300 bg-white px-3 py-1.5 text-xs font-semibold text-zinc-900 hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800 transition-colors shadow-xs"
                >
                  <span>Read Chapter Online</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              )}
              <button
                onClick={onToggleBookRead}
                className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors shrink-0 ${
                  isBookRead
                    ? "border border-emerald-300 bg-emerald-600 text-white hover:bg-emerald-700 dark:border-emerald-700 dark:bg-emerald-600 dark:text-white"
                    : "border border-zinc-900 bg-black text-white hover:bg-zinc-800 dark:border-white dark:bg-white dark:text-black dark:hover:bg-zinc-200"
                }`}
              >
                {isBookRead ? (
                  <>
                    <Check className="h-3.5 w-3.5" />
                    <span>Reading Completed</span>
                  </>
                ) : (
                  <>
                    <BookmarkCheck className="h-3.5 w-3.5" />
                    <span>Mark Chapter as Read</span>
                  </>
                )}
              </button>
            </div>
          </div>

          <p className="mt-2.5 text-[11px] text-zinc-500 dark:text-zinc-400 border-t border-zinc-200/60 dark:border-zinc-800/60 pt-2 leading-relaxed">
            ⚠️ Make sure you have studied the assigned reading above before attempting the self-assessment questions below.
          </p>
        </div>

        <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
          After reviewing the lecture and completing the required chapter reading, test your staff-level grasp by answering each of the following:
        </p>
        <ul className="space-y-2.5 pt-1 text-xs text-zinc-700 dark:text-zinc-300">
          {topic.selfCheckQuestions.map((qItem, idx) => {
            const isObj = typeof qItem === "object" && qItem !== null;
            const questionText = isObj ? qItem.question : qItem;
            const answerText = isObj ? qItem.answerExplanation : null;

            return (
              <li
                key={idx}
                className="rounded-md border border-zinc-200/80 bg-zinc-50/60 p-3 dark:border-zinc-900 dark:bg-zinc-900/40 space-y-2"
              >
                <div className="flex items-start gap-2.5">
                  <span className="font-mono font-bold text-zinc-400">0{idx + 1}.</span>
                  <span className="leading-relaxed font-medium text-zinc-900 dark:text-zinc-100">{questionText}</span>
                </div>
                {answerText && (
                  <details className="pl-6 group">
                    <summary className="cursor-pointer font-mono text-[11px] font-semibold text-zinc-500 hover:text-black dark:hover:text-white transition-colors list-none flex items-center gap-1.5">
                      <span className="text-[10px] text-zinc-400 group-open:rotate-90 transition-transform">▶</span>
                      Reveal Engineering Answer & Takeaway
                    </summary>
                    <p className="mt-2 rounded border border-zinc-200/80 bg-white p-2.5 text-[11.5px] leading-relaxed text-zinc-600 dark:border-zinc-800 dark:bg-black dark:text-zinc-400">
                      {answerText}
                    </p>
                  </details>
                )}
              </li>
            );
          })}
        </ul>
      </div>

      {/* 5. Production Engineering Challenge & Solution (Applied Hands-on Practice) */}
      {topic.handsOnChallenge && (
        <ChallengeSection challenge={topic.handsOnChallenge} />
      )}

      {/* 6. Additional Authoritative References (RFCs, Papers, Official Specs) */}
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

      {/* 7. Student Personal Notes Scratchpad */}
      <NotesDrawer
        topicId={topic.id}
        initialNote={note}
        onSaveNote={onSaveNote}
      />

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
