"use client";

import React, { useState } from "react";
import { ROADMAP_PHASES } from "../data/roadmap";
import { RoadmapTopic } from "../types/roadmap";
import { Check, ChevronDown, ChevronRight, PlayCircle, BookOpen } from "lucide-react";

interface SidebarProps {
  activeTopicId: string;
  onSelectTopic: (topic: RoadmapTopic) => void;
  isTopicCompleted: (id: string) => boolean;
  onToggleTopic: (id: string) => void;
  getPhaseProgress: (phaseId: number) => { total: number; completed: number; percentage: number };
  searchQuery: string;
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({
  activeTopicId,
  onSelectTopic,
  isTopicCompleted,
  onToggleTopic,
  getPhaseProgress,
  searchQuery,
  isOpen,
  onClose,
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
            <h2 className="text-xs font-mono font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              Syllabus & Modules (31)
            </h2>
          </div>

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
                  className="rounded-lg border border-zinc-200/80 bg-zinc-50/40 p-1.5 dark:border-zinc-800/80 dark:bg-zinc-950/40"
                >
                  {/* Phase Header */}
                  <button
                    onClick={() => togglePhase(phase.id)}
                    className="flex w-full items-center justify-between rounded-md p-2 text-left hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
                  >
                    <div className="flex-1 pr-2">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="font-mono text-xs font-black tracking-wider text-zinc-900 dark:text-white uppercase bg-zinc-200/80 dark:bg-zinc-800 px-2 py-0.5 rounded">
                          PHASE 0{phase.id}
                        </span>
                        <span className="font-mono text-xs font-bold text-zinc-600 dark:text-zinc-300">
                          {progress.completed}/{progress.total}
                        </span>
                      </div>
                      <h3 className="text-sm font-black tracking-tight text-zinc-950 dark:text-white leading-snug">
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
                    <div className="mt-1 space-y-0.5 pt-1">
                      {filteredTopics.map((topic) => {
                        const isActive = topic.id === activeTopicId;
                        const completed = isTopicCompleted(topic.id);

                        return (
                          <div
                            key={topic.id}
                            className={`group flex items-center justify-between rounded-md px-2 py-1.5 transition-colors ${
                              isActive
                                ? "bg-black text-white dark:bg-white dark:text-black font-medium"
                                : "text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-900"
                            }`}
                          >
                            {/* Topic Title Click */}
                            <button
                              onClick={() => {
                                onSelectTopic(topic);
                                onClose();
                              }}
                              className="flex flex-1 items-center gap-2 text-left text-xs"
                            >
                              <span
                                className={`font-mono text-[10px] ${
                                  isActive
                                    ? "text-zinc-300 dark:text-zinc-600"
                                    : "text-zinc-400 dark:text-zinc-500"
                                }`}
                              >
                                {String(topic.number).padStart(2, "0")}
                              </span>
                              <span className="line-clamp-1 flex-1">
                                {topic.title}
                              </span>
                            </button>

                            {/* Checkbox */}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                onToggleTopic(topic.id);
                              }}
                              className={`ml-2 flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors ${
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
                              {completed && <Check className="h-3 w-3 stroke-[3]" />}
                            </button>
                          </div>
                        );
                      })}
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
