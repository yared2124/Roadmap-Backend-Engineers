"use client";

import React, { useState } from "react";
import { ROADMAP_PHASES } from "../data/roadmap";
import { RoadmapTopic } from "../types/roadmap";
import { Check, ChevronDown, ChevronRight, PlayCircle, BookOpen, Trophy, FileText, Compass, Sparkles } from "lucide-react";

interface SidebarProps {
  activeTopicId: string;
  activeCapstonePhaseId?: number | null;
  onSelectTopic: (topic: RoadmapTopic) => void;
  onSelectCapstone?: (phaseId: number) => void;
  isTopicCompleted: (id: string) => boolean;
  isCapstoneCompleted?: (phaseId: number) => boolean;
  onToggleTopic: (id: string) => void;
  getPhaseProgress: (phaseId: number) => { total: number; completed: number; percentage: number };
  searchQuery: string;
  notes?: Record<string, string>;
  isOpen: boolean;
  onClose: () => void;
  onOpenGuide?: () => void;
}

export function Sidebar({
  activeTopicId,
  activeCapstonePhaseId,
  onSelectTopic,
  onSelectCapstone,
  isTopicCompleted,
  isCapstoneCompleted,
  onToggleTopic,
  getPhaseProgress,
  searchQuery,
  notes = {},
  isOpen,
  onClose,
  onOpenGuide,
}: SidebarProps) {
  // Keep all phases expanded by default
  const [expandedPhases, setExpandedPhases] = useState<Record<number, boolean>>({
    1: true,
    2: true,
    3: true,
    4: true,
    5: true,
    6: true,
    7: true,
  });

  const togglePhase = (phaseId: number) => {
    setExpandedPhases((prev) => ({ ...prev, [phaseId]: !prev[phaseId] }));
  };

  const matchesSearch = (topic: RoadmapTopic) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      topic.title.toLowerCase().includes(q) ||
      topic.shortSummary.toLowerCase().includes(q) ||
      topic.recommendedBook.title.toLowerCase().includes(q)
    );
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm lg:hidden transition-opacity"
        />
      )}

      {/* Sidebar Container - Stays fixed on left with independent scroll */}
      <aside
        className={`fixed top-16 bottom-0 left-0 z-30 w-80 shrink-0 border-r border-zinc-200 bg-white dark:border-zinc-800 dark:bg-black transition-transform duration-200 ease-in-out lg:relative lg:top-0 lg:bottom-0 lg:h-full lg:translate-x-0 overflow-y-auto ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
              Syllabus & Modules (31)
            </h2>
          </div>

          {/* Start Here: Roadmap Strategy & Orientation Card */}
          {onOpenGuide && (
            <div className="mb-4 rounded-xl border border-zinc-200 bg-zinc-50/70 p-3 dark:border-zinc-800 dark:bg-zinc-900/50">
              <div className="flex items-center justify-between mb-1.5">
                <span className="inline-flex items-center gap-1 rounded-md bg-zinc-200/80 dark:bg-zinc-800 px-2 py-0.5 text-[10px] font-extrabold text-zinc-800 dark:text-zinc-200 uppercase tracking-wider font-mono">
                  <Compass className="h-3 w-3 text-zinc-600 dark:text-zinc-400" />
                  Orientation Guide
                </span>
              </div>
              <p className="text-[11.5px] text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed">
                Understand the 5-stage study routine, portfolio capstones, and oral whiteboard interview frameworks.
              </p>
              <button
                onClick={onOpenGuide}
                className="mt-2.5 flex w-full items-center justify-center gap-1.5 rounded-lg bg-zinc-950 px-3 py-1.5 text-xs font-bold text-white shadow-xs hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200 active:scale-[0.98] transition-all"
              >
                <Compass className="h-3.5 w-3.5" />
                <span>Open Guide</span>
              </button>
            </div>
          )}

          {/* Phases List */}
          <div className="space-y-4">
            {ROADMAP_PHASES.map((phase) => {
              const filteredTopics = phase.topics.filter(matchesSearch);
              if (searchQuery && filteredTopics.length === 0) return null;

              const isExpanded = expandedPhases[phase.id];
              const progress = getPhaseProgress(phase.id);

              return (
                <div
                  key={phase.id}
                  className="rounded-xl border border-zinc-200/90 bg-zinc-50/50 p-2 dark:border-zinc-800 dark:bg-zinc-950/60"
                >
                  {/* Phase Header */}
                  <button
                    onClick={() => togglePhase(phase.id)}
                    className="flex w-full items-center justify-between rounded-lg p-2 text-left hover:bg-zinc-200/50 dark:hover:bg-zinc-900 transition-colors"
                  >
                    <div className="flex-1 pr-2">
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <span className="font-mono text-xs font-black tracking-wider text-zinc-950 dark:text-zinc-50 uppercase bg-zinc-200/90 dark:bg-zinc-800 px-2 py-0.5 rounded-md">
                          PHASE 0{phase.id}
                        </span>
                        <span className="font-mono text-xs font-extrabold text-zinc-700 dark:text-zinc-300">
                          {progress.completed}/{progress.total}
                        </span>
                      </div>
                      <h3 className="text-[13.5px] font-extrabold tracking-tight text-zinc-950 dark:text-zinc-50 leading-snug">
                        {phase.name}
                      </h3>
                    </div>
                    <div className="text-zinc-400">
                      {isExpanded ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </div>
                  </button>

                  {/* Phase Topics */}
                  {isExpanded && (
                    <div className="mt-1 space-y-1 pt-1">
                      {filteredTopics.map((topic) => {
                        const isActive = topic.id === activeTopicId;
                        const completed = isTopicCompleted(topic.id);
                        const hasNote = Boolean(notes[topic.id]?.trim());

                        return (
                          <div
                            key={topic.id}
                            className={`group flex items-center justify-between rounded-lg px-2.5 py-2 transition-all ${
                              isActive
                                ? "bg-zinc-950 text-white dark:bg-zinc-100 dark:text-zinc-950 font-bold shadow-xs"
                                : "text-zinc-800 hover:bg-zinc-200/70 dark:text-zinc-200 dark:hover:bg-zinc-900 font-medium"
                            }`}
                          >
                            {/* Topic Title Click */}
                            <button
                              onClick={() => {
                                onSelectTopic(topic);
                                onClose();
                              }}
                              className="flex flex-1 items-center gap-2.5 text-left text-[13px] sm:text-[13.5px] leading-snug"
                            >
                              <span
                                className={`font-mono text-xs font-bold shrink-0 ${
                                  isActive
                                    ? "text-zinc-300 dark:text-zinc-600"
                                    : "text-zinc-400 dark:text-zinc-500"
                                }`}
                              >
                                {String(topic.number).padStart(2, "0")}
                              </span>
                              <span className="line-clamp-1 flex-1 font-semibold tracking-tight">
                                {topic.title}
                              </span>
                              {hasNote && (
                                <span
                                  title="Has personal notes"
                                  className={`shrink-0 ${
                                    isActive
                                      ? "text-amber-300 dark:text-amber-600"
                                      : "text-amber-500 dark:text-amber-400"
                                  }`}
                                >
                                  <FileText className="h-3.5 w-3.5" />
                                </span>
                              )}
                              <span
                                className={`font-mono text-[10px] font-bold shrink-0 ml-1 px-1.5 py-0.5 rounded-md ${
                                  isActive
                                    ? "text-zinc-100 dark:text-zinc-900 bg-white/25 dark:bg-black/20"
                                    : "text-zinc-600 dark:text-zinc-400 bg-zinc-200/80 dark:bg-zinc-800"
                                }`}
                              >
                                {topic.timeEstimates?.total || topic.duration}
                              </span>
                            </button>

                            {/* Checkbox */}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                onToggleTopic(topic.id);
                              }}
                              className={`ml-2 flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-md border transition-colors ${
                                completed
                                  ? isActive
                                    ? "border-white bg-white text-black dark:border-black dark:bg-black dark:text-white"
                                    : "border-zinc-900 bg-zinc-900 text-white dark:border-zinc-100 dark:bg-zinc-100 dark:text-black"
                                  : isActive
                                  ? "border-zinc-400 hover:border-white"
                                  : "border-zinc-300 hover:border-zinc-600 dark:border-zinc-700 dark:hover:border-zinc-400"
                              }`}
                              title={completed ? "Mark as incomplete" : "Mark as complete"}
                            >
                              {completed && <Check className="h-3.5 w-3.5 stroke-[3.5]" />}
                            </button>
                          </div>
                        );
                      })}

                      {/* Phase Capstone Project Milestone */}
                      {phase.capstoneProject && onSelectCapstone && (!searchQuery || phase.capstoneProject.title.toLowerCase().includes(searchQuery.toLowerCase())) && (
                        <div
                          className={`group mt-2.5 flex items-center justify-between rounded-lg border px-2.5 py-2 transition-all ${
                            activeCapstonePhaseId === phase.id
                              ? "border-amber-500/80 bg-amber-500/15 text-amber-950 dark:text-amber-200 font-bold shadow-xs"
                              : isCapstoneCompleted?.(phase.id)
                              ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-900 dark:border-emerald-900 dark:text-emerald-200 font-semibold"
                              : "border-dashed border-zinc-300 bg-zinc-100/60 text-zinc-800 hover:border-zinc-400 hover:bg-zinc-200/60 dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-200 dark:hover:bg-zinc-850 font-semibold"
                          }`}
                        >
                          <button
                            onClick={() => {
                              onSelectCapstone(phase.id);
                              onClose();
                            }}
                            className="flex flex-1 items-center gap-2 text-left text-xs sm:text-[13px]"
                          >
                            <Trophy className="h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400" />
                            <span className="line-clamp-1 flex-1 font-bold">
                              Capstone: {phase.capstoneProject.title}
                            </span>
                            {isCapstoneCompleted?.(phase.id) && (
                              <span className="shrink-0 font-mono text-[10px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/80 px-1.5 py-0.5 rounded">
                                ✓ Done
                              </span>
                            )}
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </aside>
    </>
  );
}
