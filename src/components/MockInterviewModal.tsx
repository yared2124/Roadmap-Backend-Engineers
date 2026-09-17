"use client";

import React, { useState, useEffect, useCallback } from "react";
import { SelfCheckQuestion } from "../types/roadmap";
import {
  Mic,
  Timer,
  CheckCircle2,
  AlertCircle,
  XCircle,
  X,
  Play,
  Pause,
  RotateCcw,
  Trophy,
  ArrowRight,
} from "lucide-react";

interface MockInterviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  topicId: string;
  topicTitle: string;
  questions: (string | SelfCheckQuestion)[];
  onSaveScore?: (topicId: string, scorePercentage: number) => void;
}

const DEFAULT_TIME_SECONDS = 75; // 1 min 15 sec per question

export function MockInterviewModal({
  isOpen,
  onClose,
  topicId,
  topicTitle,
  questions,
  onSaveScore,
}: MockInterviewModalProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(DEFAULT_TIME_SECONDS);
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const [isAnswerRevealed, setIsAnswerRevealed] = useState(false);
  const [grades, setGrades] = useState<Record<number, "mastered" | "partial" | "missed">>({});
  const [isCompleted, setIsCompleted] = useState(false);

  // Normalize questions array to SelfCheckQuestion objects
  const parsedQuestions: SelfCheckQuestion[] = questions.map((q) => {
    if (typeof q === "object" && q !== null) {
      return q;
    }
    return {
      category: "WHAT",
      question: q,
      answerExplanation: "Master this fundamental backend architectural concept.",
    };
  });

  const totalQuestions = parsedQuestions.length;
  const currentQ = parsedQuestions[currentIndex];

  // Timer countdown hook
  useEffect(() => {
    if (!isOpen || isCompleted || !isTimerRunning || isAnswerRevealed) return;

    if (timeLeft <= 0) {
      setIsTimerRunning(false);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, isCompleted, isTimerRunning, isAnswerRevealed, timeLeft]);

  // Handle ESC key to exit
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Reset state when opening a new interview session
  const resetSession = useCallback(() => {
    setCurrentIndex(0);
    setTimeLeft(DEFAULT_TIME_SECONDS);
    setIsTimerRunning(true);
    setIsAnswerRevealed(false);
    setGrades({});
    setIsCompleted(false);
  }, []);

  useEffect(() => {
    if (isOpen) {
      resetSession();
    }
  }, [isOpen, resetSession]);

  const handleRevealAnswer = () => {
    setIsAnswerRevealed(true);
    setIsTimerRunning(false);
  };

  const handleGrade = (grade: "mastered" | "partial" | "missed") => {
    const newGrades = { ...grades, [currentIndex]: grade };
    setGrades(newGrades);

    if (currentIndex + 1 < totalQuestions) {
      setCurrentIndex((prev) => prev + 1);
      setTimeLeft(DEFAULT_TIME_SECONDS);
      setIsTimerRunning(true);
      setIsAnswerRevealed(false);
    } else {
      // Completed all questions!
      setIsCompleted(true);
      // Calculate score percentage
      let points = 0;
      Object.values(newGrades).forEach((g) => {
        if (g === "mastered") points += 100;
        else if (g === "partial") points += 50;
      });
      const score = Math.round(points / totalQuestions);

      // Save to localStorage
      try {
        localStorage.setItem(`interview_score_${topicId}`, score.toString());
      } catch (e) {
        console.error("Failed to persist score to localStorage", e);
      }

      if (onSaveScore) {
        onSaveScore(topicId, score);
      }
    }
  };

  if (!isOpen) return null;

  // Calculate final score
  const calculateFinalScore = () => {
    let points = 0;
    Object.values(grades).forEach((g) => {
      if (g === "mastered") points += 100;
      else if (g === "partial") points += 50;
    });
    return Math.round(points / (totalQuestions || 1));
  };

  const finalScore = calculateFinalScore();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl rounded-3xl border border-zinc-200 bg-white p-6 sm:p-8 dark:border-gray-700 dark:bg-gray-800 shadow-2xl space-y-6">
        {/* Top Header Bar */}
        <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-900 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-rose-600/10 text-rose-600 dark:bg-rose-500/20 dark:text-rose-400 border border-rose-500/20 shadow-xs">
              <Mic className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
                  Senior Oral Exam Simulator
                </span>
                <span className="text-zinc-300 dark:text-zinc-700">•</span>
                <span className="font-mono text-xs text-zinc-500">
                  {topicTitle}
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-black text-zinc-950 dark:text-white">
                Staff Technical Mock Interview
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-200 text-zinc-500 hover:bg-zinc-100 hover:text-black dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-750 dark:hover:text-white transition-colors"
            aria-label="Close interview modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {!isCompleted ? (
          <>
            {/* Live Timer & Progress Strip */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-2xl border border-zinc-200/80 bg-zinc-50/70 p-4 dark:border-gray-700 dark:bg-gray-800/40">
              <div className="flex items-center gap-2 font-mono text-xs font-bold text-zinc-600 dark:text-gray-300">
                <span>QUESTION {currentIndex + 1} OF {totalQuestions}</span>
                <span className="text-zinc-400">•</span>
                <span
                  className={`px-2 py-0.5 rounded text-[11px] font-extrabold uppercase ${
                    currentQ?.category === "WHAT"
                      ? "bg-blue-100 text-blue-900 dark:bg-blue-950 dark:text-blue-200"
                      : currentQ?.category === "WHY"
                      ? "bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-200"
                      : "bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-200"
                  }`}
                >
                  {currentQ?.category || "INTERVIEW"}
                </span>
              </div>

              {/* Countdown Clock */}
              <div className="flex items-center gap-3">
                <div
                  className={`flex items-center gap-2 rounded-xl px-3.5 py-1.5 font-mono text-sm font-black border transition-all ${
                    timeLeft <= 15
                      ? "border-rose-400 bg-rose-100 text-rose-800 animate-pulse dark:border-rose-800 dark:bg-rose-950/60 dark:text-rose-300"
                      : timeLeft <= 35
                      ? "border-amber-400 bg-amber-100 text-amber-800 dark:border-amber-800 dark:bg-amber-950/60 dark:text-amber-300"
                      : "border-zinc-300 bg-white text-zinc-900 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                  }`}
                >
                  <Timer className="h-4 w-4" />
                  <span>00:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}</span>
                </div>

                <button
                  onClick={() => setIsTimerRunning(!isTimerRunning)}
                  title={isTimerRunning ? "Pause Timer" : "Resume Timer"}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-200 text-zinc-600 hover:bg-zinc-100 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 transition-colors"
                >
                  {isTimerRunning ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
                </button>

                <button
                  onClick={() => setTimeLeft(DEFAULT_TIME_SECONDS)}
                  title="Reset Clock to 75s"
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-200 text-zinc-600 hover:bg-zinc-100 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 transition-colors"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            {/* Question Card & Oral Prompt */}
            <div className="space-y-4">
              <div className="rounded-2xl border border-zinc-200 bg-linear-to-b from-zinc-50 to-white p-6 sm:p-7 dark:border-gray-700 dark:from-zinc-900/60 dark:to-gray-800 space-y-4 shadow-sm">
                <div className="flex items-center gap-2">
                  <span className="flex h-2.5 w-2.5 rounded-full bg-rose-500 animate-ping" />
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
                    Live Oral Interview Question:
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-black text-zinc-950 dark:text-white leading-snug">
                  "{currentQ?.question}"
                </h3>

                <div className="rounded-xl border border-rose-200/80 bg-rose-50/40 p-4 dark:border-rose-900/40 dark:bg-rose-950/20 flex items-start gap-3">
                  <Mic className="h-5 w-5 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                  <p className="text-xs sm:text-[13px] text-rose-950 dark:text-rose-200 leading-relaxed font-medium">
                    <span className="font-bold">Staff Interview Rule: </span>
                    Speak your answer out loud right now as if answering a Principal Engineer across the table. Explain the core trade-offs, internal mechanics, and production failure modes before revealing the answer.
                  </p>
                </div>
              </div>

              {/* Reveal Staff Answer Toggle */}
              {!isAnswerRevealed ? (
                <div className="flex justify-center pt-2">
                  <button
                    onClick={handleRevealAnswer}
                    className="inline-flex items-center gap-2 rounded-xl bg-zinc-950 px-6 py-3.5 text-xs sm:text-sm font-extrabold text-white hover:bg-zinc-800 dark:bg-white dark:text-gray-950 dark:hover:bg-zinc-200 transition-all shadow-md active:scale-95"
                  >
                    <CheckCircle2 className="h-4 w-4" />
                    <span>I'm Done Speaking — Reveal Staff Rubric & Answer</span>
                  </button>
                </div>
              ) : (
                /* Revealed Staff Answer & Grading Rubric */
                <div className="space-y-4 rounded-2xl border border-emerald-500/30 bg-emerald-50/30 p-6 dark:border-emerald-900/40 dark:bg-emerald-950/20 animate-in fade-in duration-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                    <h4 className="font-mono text-xs sm:text-sm font-bold uppercase tracking-wider text-emerald-900 dark:text-emerald-300">
                      Staff Engineer Answer & Rubric Breakdown:
                    </h4>
                  </div>

                  <div className="rounded-xl border border-zinc-200 bg-white p-4.5 text-xs sm:text-sm leading-relaxed text-zinc-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 font-medium shadow-xs">
                    {currentQ?.answerExplanation}
                  </div>

                  {/* Self Evaluation Buttons */}
                  <div className="space-y-2 pt-2 border-t border-emerald-200/60 dark:border-emerald-900/60">
                    <span className="font-mono text-xs font-bold text-zinc-700 dark:text-gray-300 block">
                      Honest Self-Evaluation: How well did you articulate this aloud?
                    </span>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      <button
                        onClick={() => handleGrade("mastered")}
                        className="flex items-center justify-center gap-2 rounded-xl border border-emerald-400 bg-emerald-600 hover:bg-emerald-700 p-3 text-xs sm:text-sm font-bold text-white transition-colors shadow-xs"
                      >
                        <CheckCircle2 className="h-4 w-4" />
                        <span>Nailed It! (Staff Ready)</span>
                      </button>

                      <button
                        onClick={() => handleGrade("partial")}
                        className="flex items-center justify-center gap-2 rounded-xl border border-amber-300 bg-amber-500 hover:bg-amber-600 p-3 text-xs sm:text-sm font-bold text-white transition-colors shadow-xs"
                      >
                        <AlertCircle className="h-4 w-4" />
                        <span>Partially (Needs Polish)</span>
                      </button>

                      <button
                        onClick={() => handleGrade("missed")}
                        className="flex items-center justify-center gap-2 rounded-xl border border-rose-300 bg-rose-600 hover:bg-rose-700 p-3 text-xs sm:text-sm font-bold text-white transition-colors shadow-xs"
                      >
                        <XCircle className="h-4 w-4" />
                        <span>Missed / Struggled</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          /* Final Interview Score & Results Summary */
          <div className="space-y-6 py-4 text-center">
            <div className="inline-flex h-20 w-20 items-center justify-center rounded-3xl bg-amber-500/10 text-amber-600 dark:bg-amber-400/20 dark:text-amber-400 border border-amber-500/20 shadow-sm mx-auto">
              <Trophy className="h-10 w-10" />
            </div>

            <div className="space-y-1.5">
              <h3 className="text-2xl sm:text-3xl font-black text-zinc-950 dark:text-white">
                Mock Interview Completed!
              </h3>
              <p className="text-sm font-medium text-zinc-600 dark:text-gray-400 max-w-md mx-auto">
                Evaluation results for <span className="font-semibold text-zinc-900 dark:text-gray-100">{topicTitle}</span>
              </p>
            </div>

            {/* Score Ring / Pill */}
            <div className="inline-block rounded-2xl border border-zinc-200 bg-zinc-50 px-8 py-4 dark:border-gray-700 dark:bg-gray-900/80 shadow-xs">
              <div className="font-mono text-4xl sm:text-5xl font-black text-zinc-950 dark:text-white">
                {finalScore}%
              </div>
              <div className="font-mono text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mt-1">
                {finalScore >= 80
                  ? "Staff / Principal Level Ready"
                  : finalScore >= 50
                  ? "Senior Level (Solid Foundation)"
                  : "Needs Further Review & Reading"}
              </div>
            </div>

            {/* Breakdown List */}
            <div className="rounded-2xl border border-zinc-200 bg-white p-5 text-left dark:border-gray-700 dark:bg-gray-800/40 space-y-3">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-gray-400">
                Performance Breakdown by Question:
              </span>
              <div className="space-y-2">
                {parsedQuestions.map((q, idx) => {
                  const grade = grades[idx];
                  return (
                    <div
                      key={idx}
                      className="flex items-center justify-between gap-3 rounded-xl border border-zinc-100 bg-zinc-50/70 p-3 text-xs dark:border-gray-700 dark:bg-gray-900/80"
                    >
                      <span className="font-semibold text-zinc-900 dark:text-gray-100 truncate">
                        0{idx + 1}. {q.question}
                      </span>
                      <span
                        className={`font-mono text-[11px] font-bold px-2 py-0.5 rounded uppercase shrink-0 ${
                          grade === "mastered"
                            ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
                            : grade === "partial"
                            ? "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300"
                            : "bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300"
                        }`}
                      >
                        {grade || "missed"}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={resetSession}
                className="inline-flex items-center gap-2 rounded-xl border border-zinc-300 bg-white px-5 py-2.5 text-xs sm:text-sm font-bold text-zinc-800 hover:bg-zinc-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700 transition-colors shadow-2xs"
              >
                <RotateCcw className="h-4 w-4" />
                <span>Retake Mock Interview</span>
              </button>

              <button
                onClick={onClose}
                className="inline-flex items-center gap-2 rounded-xl bg-zinc-950 px-6 py-2.5 text-xs sm:text-sm font-bold text-white hover:bg-zinc-800 dark:bg-white dark:text-gray-950 dark:hover:bg-zinc-200 transition-colors shadow-xs"
              >
                <span>Continue Roadmap Learning</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
