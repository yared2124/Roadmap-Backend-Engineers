"use client";

import React, { useState, useEffect } from "react";
import { RoadmapTopic } from "../types/roadmap";
import { TOPIC_CODE_SNIPPETS, SupportedLanguage } from "../data/multiLangCode";
import { TOPIC_ARCHITECTURE_FLOWS } from "../data/architectureFlows";
import { VideoPlayer } from "./VideoPlayer";
import { BookCard } from "./BookCard";
import { ChallengeSection } from "./ChallengeSection";
import { NotesDrawer } from "./NotesDrawer";
import { VisualFlowchart } from "./VisualFlowchart";
import { MockInterviewModal } from "./MockInterviewModal";
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
  Trophy,
  Clock,
  PlayCircle,
  Copy,
  Mic,
  Compass,
  ChevronRight,
} from "lucide-react";

interface TopicViewerProps {
  topic: RoadmapTopic;
  isCompleted: boolean;
  onToggleComplete: () => void;
  isBookRead: boolean;
  onToggleBookRead: () => void;
  note: string;
  onSaveNote: (topicId: string, note: string) => void;
  onExportAllNotes?: () => void;
  onOpenPhaseCapstone?: (phaseId: number) => void;
  onSelectPrev: () => void;
  onSelectNext: () => void;
  hasPrev: boolean;
  hasNext: boolean;
  onOpenGuide?: () => void;
}

export function TopicViewer({
  topic,
  isCompleted,
  onToggleComplete,
  isBookRead,
  onToggleBookRead,
  note,
  onSaveNote,
  onExportAllNotes,
  onOpenPhaseCapstone,
  onSelectPrev,
  onSelectNext,
  hasPrev,
  hasNext,
  onOpenGuide,
}: TopicViewerProps) {
  const [preferredLang, setPreferredLang] = useState<SupportedLanguage>("go");
  const [copiedCode, setCopiedCode] = useState(false);
  const [isMockInterviewOpen, setIsMockInterviewOpen] = useState(false);
  const [interviewScore, setInterviewScore] = useState<number | null>(null);

  // Load saved mock interview score for current topic
  useEffect(() => {
    try {
      const saved = localStorage.getItem(`interview_score_${topic.id}`);
      if (saved) {
        setInterviewScore(parseInt(saved, 10));
      } else {
        setInterviewScore(null);
      }
    } catch {
      setInterviewScore(null);
    }
  }, [topic.id]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("backend_roadmap_preferred_lang") as SupportedLanguage;
      if (saved && ["go", "typescript", "python"].includes(saved)) {
        setPreferredLang(saved);
      }
    } catch {}
  }, []);

  const handleSelectLanguage = (lang: SupportedLanguage) => {
    setPreferredLang(lang);
    try {
      localStorage.setItem("backend_roadmap_preferred_lang", lang);
    } catch {}
  };

  const topicSnippets = TOPIC_CODE_SNIPPETS[topic.id];
  const activeCode = topicSnippets ? topicSnippets[preferredLang] : topic.coreDeepDive.blueprintCode;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(activeCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };
  return (
    <div className="mx-auto max-w-4xl space-y-8 pb-20">
      {/* Top Meta Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-200 pb-5 dark:border-[#2C2A26]">
        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold tracking-tight text-zinc-950 dark:text-[#F3EFE6] leading-tight">
            <span className="font-mono font-bold text-zinc-400 dark:text-zinc-600 mr-2.5">
              {String(topic.number).padStart(2, "0")}
            </span>
            {topic.title}
          </h1>
          <p className="mt-3 text-lg sm:text-xl font-serif text-zinc-700 dark:text-[#EDE8DF] leading-relaxed font-normal max-w-4xl">
            {topic.shortSummary}
          </p>

          {/* Study Plan & Time Commitment */}
          {topic.timeEstimates && (
            <div className="mt-4 flex flex-wrap items-center gap-2.5 pt-1 font-mono">
              <span className="inline-flex items-center gap-1.5 rounded-lg bg-zinc-950 px-3.5 py-1.5 text-xs font-bold text-white dark:bg-[#F3EFE6] dark:text-[#141312] shadow-xs">
                <Clock className="h-4 w-4" />
                <span>Est. Total: {topic.timeEstimates.total}</span>
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-xs font-semibold text-zinc-800 dark:border-[#2C2A26] dark:bg-[#1A1917] dark:text-[#D5CFBF]">
                <PlayCircle className="h-4 w-4 text-red-500" />
                <span>Video: {topic.timeEstimates.video}</span>
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-xs font-semibold text-zinc-800 dark:border-[#2C2A26] dark:bg-[#1A1917] dark:text-[#D5CFBF]">
                <BookOpen className="h-4 w-4 text-blue-500" />
                <span>Reading: {topic.timeEstimates.reading}</span>
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-xs font-semibold text-zinc-800 dark:border-[#2C2A26] dark:bg-[#1A1917] dark:text-[#D5CFBF]">
                <Code2 className="h-4 w-4 text-emerald-500" />
                <span>Lab & Practice: {topic.timeEstimates.lab}</span>
              </span>
            </div>
          )}
        </div>

        {/* Complete Toggle Button */}
        <button
          onClick={onToggleComplete}
          className={`flex items-center gap-2 rounded-xl border px-5 py-2.5 text-sm font-bold transition-all shadow-xs shrink-0 ${
            isCompleted
              ? "border-zinc-950 bg-zinc-950 text-white dark:border-[#F3EFE6] dark:bg-[#F3EFE6] dark:text-[#141312]"
              : "border-zinc-300 bg-white text-zinc-900 hover:border-zinc-500 hover:bg-zinc-50 dark:border-[#2C2A26] dark:bg-[#1A1917] dark:text-[#F3EFE6] dark:hover:border-zinc-500"
          }`}
        >
          <CheckCircle2 className="h-4 w-4 stroke-[2.5]" />
          <span>{isCompleted ? "Topic Completed" : "Mark as Completed"}</span>
        </button>
      </div>

      {/* Architectural Insights Card */}
      <div className="rounded-2xl border border-zinc-200 bg-stone-50/50 p-6 dark:border-[#2C2A26] dark:bg-[#1A1917] shadow-sm space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-zinc-950 text-white dark:bg-[#F3EFE6] dark:text-[#141312] text-xs font-mono font-bold shadow-2xs">
            <Lightbulb className="h-4 w-4" />
          </div>
          <span className="font-mono text-xs sm:text-sm font-bold uppercase tracking-wider text-zinc-950 dark:text-[#F3EFE6]">
            Architectural Insights & Best Practices
          </span>
        </div>

        <blockquote className="border-l-4 border-amber-600 pl-4 py-1 text-base sm:text-lg font-serif italic text-zinc-900 dark:text-[#F3EFE6] leading-relaxed">
          &ldquo;{topic.seniorInsight.quote}&rdquo;
        </blockquote>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
          <div className="rounded-xl border border-zinc-200/90 bg-white p-4 dark:border-gray-700 dark:bg-gray-800/80 shadow-2xs">
            <span className="font-mono text-xs font-bold text-zinc-950 dark:text-white flex items-center gap-1.5 mb-1.5 uppercase tracking-wide">
              <Lightbulb className="h-4 w-4 text-amber-500" />
              Production Reality
            </span>
            <p className="text-sm leading-relaxed text-zinc-800 dark:text-gray-200 font-normal">
              {topic.seniorInsight.productionLesson}
            </p>
          </div>

          <div className="rounded-xl border border-zinc-200/90 bg-white p-4 dark:border-gray-700 dark:bg-gray-800/80 shadow-2xs">
            <span className="font-mono text-xs font-bold text-zinc-950 dark:text-white flex items-center gap-1.5 mb-1.5 uppercase tracking-wide">
              <AlertTriangle className="h-4 w-4 text-red-500" />
              Common Junior Pitfall
            </span>
            <p className="text-sm leading-relaxed text-zinc-800 dark:text-gray-200 font-normal">
              {topic.seniorInsight.commonMistake}
            </p>
          </div>
        </div>
      </div>

      {/* 1. Video Lecture Suite (Tabbed Switcher for Multi-Video Topics) */}
      <VideoPlayer
        primaryVideo={{
          youtubeId: topic.youtubeId,
          title: topic.title,
          duration: topic.duration,
          description: topic.shortSummary,
        }}
        secondaryVideo={topic.secondaryVideo}
      />

      {/* 2. Deep Architectural Breakdown */}
      <section className="space-y-5 rounded-2xl border border-zinc-200 bg-white p-6 sm:p-8 dark:border-gray-700 dark:bg-gray-800 shadow-sm">
        <div className="flex items-center gap-2.5 border-b border-zinc-100 pb-3.5 dark:border-gray-800">
          <Code2 className="h-5 w-5 text-zinc-950 dark:text-white" />
          <h3 className="font-mono text-xs sm:text-sm font-bold uppercase tracking-wider text-zinc-950 dark:text-white">
            Architectural Deep Dive & Mental Models
          </h3>
        </div>

        <div className="space-y-4 text-sm sm:text-[15px] leading-relaxed text-zinc-800 dark:text-gray-200">
          <div>
            <h4 className="font-mono text-xs sm:text-sm font-bold uppercase tracking-wider text-zinc-950 dark:text-white mb-1.5 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-blue-500 inline-block" />
              What is it?
            </h4>
            <p className="leading-relaxed pl-4 border-l-2 border-zinc-200 dark:border-gray-700 font-normal">
              {topic.coreDeepDive.what}
            </p>
          </div>

          <div>
            <h4 className="font-mono text-xs sm:text-sm font-bold uppercase tracking-wider text-zinc-950 dark:text-white mb-1.5 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-amber-500 inline-block" />
              Why do we need it?
            </h4>
            <p className="leading-relaxed pl-4 border-l-2 border-zinc-200 dark:border-gray-700 font-normal">
              {topic.coreDeepDive.why}
            </p>
          </div>

          <div>
            <h4 className="font-mono text-xs sm:text-sm font-bold uppercase tracking-wider text-zinc-950 dark:text-white mb-2 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500 inline-block" />
              How it works under the hood:
            </h4>
            <ul className="space-y-2 pl-4 border-l-2 border-zinc-200 dark:border-gray-700">
              {topic.coreDeepDive.howItWorks.map((step, idx) => (
                <li key={idx} className="flex items-start gap-2.5 font-normal">
                  <span className="text-zinc-400 dark:text-gray-500 font-mono font-bold">•</span>
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Multi-Language Blueprint Code Engine */}
        <div className="pt-4 border-t border-zinc-100 dark:border-gray-800 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="font-mono text-xs sm:text-sm font-bold text-zinc-950 dark:text-white">
              {topic.coreDeepDive.blueprintTitle}
            </span>

            {/* Language Selector Tabs */}
            <div className="flex items-center gap-1 rounded-lg border border-zinc-200 bg-zinc-100/90 p-1 dark:border-gray-700 dark:bg-gray-800">
              {(["go", "typescript", "python"] as const).map((lang) => (
                <button
                  key={lang}
                  onClick={() => handleSelectLanguage(lang)}
                  className={`rounded-md px-3 py-1.5 font-mono text-xs font-bold transition-all ${
                    preferredLang === lang
                      ? "bg-zinc-950 text-white dark:bg-gray-100 dark:text-gray-950 shadow-xs"
                      : "text-zinc-600 hover:text-black dark:text-gray-400 dark:hover:text-white"
                  }`}
                >
                  {lang === "go"
                    ? "Go"
                    : lang === "typescript"
                    ? "TypeScript / Node"
                    : "Python"}
                </button>
              ))}
            </div>
          </div>

          <div className="relative overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950 p-4 font-mono text-xs sm:text-sm text-zinc-100 dark:bg-[#111827] shadow-inner">
            <div className="absolute top-3 right-3 z-10 flex items-center gap-2">
              <span className="font-mono text-[10px] uppercase text-zinc-400 font-bold px-2 py-0.5 rounded bg-zinc-800/90">
                {preferredLang === "go" ? "golang" : preferredLang === "typescript" ? "typescript" : "python"}
              </span>
              <button
                onClick={handleCopyCode}
                className="inline-flex items-center gap-1.5 rounded-md border border-zinc-700 bg-zinc-900 px-2.5 py-1 text-xs font-mono font-medium text-zinc-200 hover:border-zinc-500 hover:text-white transition-colors"
                title="Copy Code"
              >
                {copiedCode ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-400" />
                    <span className="text-emerald-400 font-semibold">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
            <pre className="overflow-x-auto pt-7 leading-relaxed">
              <code>{activeCode}</code>
            </pre>
          </div>
        </div>
      </section>

      {/* 2.5 Visual System Architecture Flowchart (Data Flow Lifecycle) */}
      {(topic.architectureFlow || TOPIC_ARCHITECTURE_FLOWS[topic.id]) && (
        <VisualFlowchart flow={topic.architectureFlow || TOPIC_ARCHITECTURE_FLOWS[topic.id]} />
      )}

      {/* 3. Curated Book Recommendation */}
      <BookCard
        book={topic.recommendedBook}
        isRead={isBookRead}
        onToggleRead={onToggleBookRead}
      />

      {/* 4. Self-Assessment Checklist (Immediate evaluation after reading) */}
      <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800 shadow-sm space-y-5">
        <div className="flex items-center justify-between flex-wrap gap-3 border-b border-zinc-100 pb-3.5 dark:border-zinc-900">
          <div className="flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-zinc-950 dark:text-white" />
            <h4 className="font-mono text-xs sm:text-sm font-bold uppercase tracking-wider text-zinc-950 dark:text-white">
              Self-Assessment: Understanding Check (Can you answer these aloud?)
            </h4>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            {interviewScore !== null && (
              <span className="inline-flex items-center gap-1 rounded-lg bg-emerald-100 px-2.5 py-1 text-xs font-mono font-bold text-emerald-900 dark:bg-emerald-950/80 dark:text-emerald-200 border border-emerald-300 dark:border-emerald-800 shadow-2xs">
                Score: {interviewScore}%
              </span>
            )}
            <button
              onClick={() => setIsMockInterviewOpen(true)}
              className="inline-flex items-center gap-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 px-3.5 py-1.5 text-xs font-bold text-white transition-colors shadow-xs active:scale-95"
            >
              <Mic className="h-3.5 w-3.5" />
              <span>Start Mock Interview</span>
            </button>
            <span className="text-xs font-mono font-bold text-zinc-500 dark:text-gray-400">
              {topic.selfCheckQuestions.length} Questions
            </span>
          </div>
        </div>

        {/* Prerequisite Reading Gate Banner */}
        <div
          className={`rounded-xl border p-4 sm:p-5 transition-all ${
            isBookRead
              ? "border-emerald-200 bg-emerald-50/50 dark:border-emerald-900/50 dark:bg-emerald-950/25"
              : "border-amber-200 bg-amber-50/50 dark:border-amber-900/50 dark:bg-amber-950/25"
          }`}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border ${
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
                  <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-zinc-600 dark:text-gray-400">
                    Required Prerequisite Reading
                  </span>
                  {isBookRead && (
                    <span className="inline-flex items-center gap-1 rounded bg-emerald-100 px-2 py-0.5 text-[10.5px] font-extrabold text-emerald-900 dark:bg-emerald-900/70 dark:text-emerald-200 font-mono">
                      ✓ Completed
                    </span>
                  )}
                </div>
                <h5 className="text-sm sm:text-base font-bold text-zinc-950 dark:text-white mt-1">
                  {topic.recommendedBook.title}{" "}
                  <span className="font-medium text-zinc-600 dark:text-gray-400">
                    by {topic.recommendedBook.author}
                  </span>
                </h5>
                <p className="text-xs sm:text-sm text-zinc-700 dark:text-gray-200 mt-1">
                  <span className="font-bold text-zinc-950 dark:text-gray-100">
                    Assigned Chapter:{" "}
                  </span>
                  {topic.recommendedBook.keyChapters}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 shrink-0 flex-wrap sm:flex-nowrap">
              {topic.recommendedBook.readingUrl && (
                <a
                  href={topic.recommendedBook.readingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-300 bg-white px-3.5 py-2 text-xs sm:text-sm font-semibold text-zinc-900 hover:bg-zinc-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700 transition-colors shadow-xs"
                >
                  <span>Read Chapter Online</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              )}
              <button
                onClick={onToggleBookRead}
                className={`inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-xs sm:text-sm font-semibold transition-colors shrink-0 ${
                  isBookRead
                    ? "border border-emerald-400 bg-emerald-600 text-white hover:bg-emerald-700 dark:border-emerald-700 dark:bg-emerald-600 dark:text-white shadow-xs"
                    : "border border-zinc-950 bg-zinc-950 text-white hover:bg-zinc-800 dark:border-zinc-100 dark:bg-gray-100 dark:text-gray-950 dark:hover:bg-white shadow-xs"
                }`}
              >
                {isBookRead ? (
                  <>
                    <Check className="h-4 w-4" />
                    <span>Reading Completed</span>
                  </>
                ) : (
                  <>
                    <BookmarkCheck className="h-4 w-4" />
                    <span>Mark Chapter as Read</span>
                  </>
                )}
              </button>
            </div>
          </div>

          <p className="mt-3 text-xs font-medium text-zinc-600 dark:text-gray-400 border-t border-zinc-200/60 dark:border-gray-700/60 pt-2.5 leading-relaxed flex items-center gap-1.5">
            <AlertTriangle className="h-3.5 w-3.5 text-amber-500 shrink-0" />
            <span>Make sure you have studied the assigned reading above before attempting the self-assessment questions below.</span>
          </p>
        </div>

        <p className="text-xs sm:text-[14px] text-zinc-700 dark:text-gray-300 font-medium leading-relaxed">
          After reviewing the lecture and completing the required chapter reading, test your staff-level grasp by answering each of the following:
        </p>
        <ul className="space-y-3 pt-1">
          {topic.selfCheckQuestions.map((qItem, idx) => {
            const isObj = typeof qItem === "object" && qItem !== null;
            const questionText = isObj ? qItem.question : qItem;
            const answerText = isObj ? qItem.answerExplanation : null;
            const category = isObj ? qItem.category : null;

            return (
              <li
                key={idx}
                className="rounded-xl border border-zinc-200/80 bg-zinc-50/70 p-4 sm:p-4.5 dark:border-gray-700 dark:bg-gray-800/60 space-y-2.5 transition-all"
              >
                <div className="flex items-start gap-3">
                  <span className="font-mono text-sm font-bold text-zinc-500 dark:text-gray-400 pt-0.5">
                    0{idx + 1}.
                  </span>
                  {category && (
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-extrabold font-mono tracking-wide uppercase shrink-0 mt-0.5 ${
                        category === "WHAT"
                          ? "bg-blue-100 text-blue-900 dark:bg-blue-950/80 dark:text-blue-200 border border-blue-200 dark:border-blue-800"
                          : category === "WHY"
                          ? "bg-amber-100 text-amber-900 dark:bg-amber-950/80 dark:text-amber-200 border border-amber-200 dark:border-amber-800"
                          : "bg-emerald-100 text-emerald-900 dark:bg-emerald-950/80 dark:text-emerald-200 border border-emerald-200 dark:border-emerald-800"
                      }`}
                    >
                      {category}
                    </span>
                  )}
                  <span className="text-sm sm:text-[15px] leading-relaxed font-bold text-zinc-950 dark:text-white">
                    {questionText}
                  </span>
                </div>
                {answerText && (
                  <details className="pl-7 group">
                    <summary className="cursor-pointer font-mono text-xs font-bold text-zinc-600 hover:text-zinc-950 dark:text-gray-400 dark:hover:text-zinc-100 transition-colors list-none flex items-center gap-2 select-none py-1">
                      <ChevronRight className="h-3.5 w-3.5 text-zinc-400 group-open:rotate-90 transition-transform" />
                      <span>Reveal Engineering Answer & Takeaway</span>
                    </summary>
                    <div className="mt-2.5 rounded-xl border border-zinc-200 bg-white p-4 text-sm sm:text-[14.5px] leading-relaxed text-zinc-800 dark:border-gray-700 dark:bg-[#111827] dark:text-gray-200 font-normal shadow-xs">
                      <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-1.5 flex items-center gap-1.5">
                        <Check className="h-3.5 w-3.5" />
                        <span>Engineering Deep Dive & Key Takeaway</span>
                      </div>
                      {answerText}
                    </div>
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
        <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800 shadow-sm space-y-4">
          <div className="flex items-center gap-2">
            <Code2 className="h-5 w-5 text-zinc-950 dark:text-white" />
            <h4 className="font-mono text-xs sm:text-sm font-bold uppercase tracking-wider text-zinc-950 dark:text-white">
              Primary Sources & Canonical Specifications
            </h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-1">
            {topic.additionalReferences.map((ref, idx) => (
              <a
                key={idx}
                href={ref.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col justify-between rounded-xl border border-zinc-200/80 bg-zinc-50/60 p-4 hover:border-zinc-400 hover:bg-zinc-100 dark:border-gray-800 dark:bg-gray-800/40 dark:hover:border-gray-500 dark:hover:bg-gray-750 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm sm:text-[14.5px] text-zinc-950 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                      {ref.title}
                    </span>
                    <span className="font-mono text-xs text-zinc-400 group-hover:text-zinc-950 dark:group-hover:text-white transition-colors">↗</span>
                  </div>
                  <p className="mt-1.5 text-xs sm:text-[13px] text-zinc-600 dark:text-gray-300 leading-relaxed font-medium">
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
        topicTitle={topic.title}
        initialNote={note}
        onSaveNote={onSaveNote}
        onExportAllNotes={onExportAllNotes}
      />

      {/* Phase Capstone Milestone Callout */}
      {onOpenPhaseCapstone && (
        <div className="rounded-xl border border-amber-500/30 bg-linear-to-r from-amber-500/10 via-amber-500/5 to-transparent p-6 dark:border-amber-500/25 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                <span className="font-mono text-xs sm:text-sm font-bold uppercase tracking-wider text-amber-900 dark:text-amber-300">
                  Phase 0{topic.phaseId} Capstone Project
                </span>
              </div>
              <p className="text-xs sm:text-sm text-zinc-700 dark:text-gray-200 leading-relaxed font-medium">
                Complete all topics in this phase, then build the production-grade portfolio project to prove your hands-on mastery.
              </p>
            </div>
            <button
              onClick={() => onOpenPhaseCapstone(topic.phaseId)}
              className="inline-flex items-center gap-2 rounded-xl bg-amber-600 hover:bg-amber-700 px-5 py-2.5 text-xs sm:text-sm font-bold text-white transition-colors shadow-xs shrink-0 font-mono"
            >
              <Trophy className="h-4 w-4" />
              <span>View Phase Capstone</span>
            </button>
          </div>
        </div>
      )}

      {/* Bottom Prev / Next Navigation */}
      <div className="flex items-center justify-between border-t border-zinc-200 pt-6 dark:border-gray-700">
        <button
          onClick={onSelectPrev}
          disabled={!hasPrev}
          className="inline-flex items-center gap-2 rounded-xl border border-zinc-300 bg-white px-5 py-2.5 text-xs sm:text-sm font-bold text-zinc-800 hover:bg-zinc-100 disabled:opacity-30 disabled:pointer-events-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700 transition-colors shadow-xs"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Previous Module</span>
        </button>

        <button
          onClick={onSelectNext}
          disabled={!hasNext}
          className="inline-flex items-center gap-2 rounded-xl bg-zinc-950 px-5 py-2.5 text-xs sm:text-sm font-bold text-white hover:bg-zinc-800 disabled:opacity-30 disabled:pointer-events-none dark:bg-gray-100 dark:text-gray-950 dark:hover:bg-white transition-colors shadow-xs"
        >
          <span>Next Module</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>

      {/* 8. Interactive Oral Mock Technical Interview Simulator Modal */}
      <MockInterviewModal
        isOpen={isMockInterviewOpen}
        onClose={() => setIsMockInterviewOpen(false)}
        topicId={topic.id}
        topicTitle={topic.title}
        questions={topic.selfCheckQuestions}
        onSaveScore={(tId, score) => setInterviewScore(score)}
      />
    </div>
  );
}
