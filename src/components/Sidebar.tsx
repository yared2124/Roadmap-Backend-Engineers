"use client";

import React, { useState } from "react";
import { ROADMAP_PHASES } from "../data/roadmap";
import { RoadmapTopic } from "../types/roadmap";
import { Check, ChevronDown, ChevronRight, Trophy, FileText } from "lucide-react";

interface SidebarProps {
  activeTopicId: string;
  activeCapstonePhaseId?: number | null;
  onSelectTopic: (topic: RoadmapTopic) => void;
  onSelectCapstone?: (phaseId: number) => void;
  isTopicCompleted: (id: string) => boolean;
  isCapstoneCompleted?: (phaseId: number) => boolean;
  onToggleTopic: (id: string) => void;
  getPhaseProgress: (phaseId: number) => { total: number; completed: number; percentage: number };
  searchQuery?: string;
  notes?: Record<string, string>;
  isOpen: boolean;
  onClose: () => void;
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
  searchQuery = "",
  notes = {},
  isOpen,
  onClose,
}: SidebarProps) {
  // Start with all phases collapsed by default on startup as requested
  const [expandedPhases, setExpandedPhases] = useState<Record<number, boolean>>({});
  const [selectedPhaseId, setSelectedPhaseId] = useState<number | null>(null);

  const togglePhase = (phaseId: number) => {
    const nextState = !expandedPhases[phaseId];
    setExpandedPhases((prev) => ({ ...prev, [phaseId]: nextState }));
    if (nextState) {
      setSelectedPhaseId(phaseId);
    } else if (selectedPhaseId === phaseId) {
      setSelectedPhaseId(null);
    }
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
        className={`fixed top-16 bottom-0 left-0 z-30 w-80 shrink-0 border-r border-zinc-200 bg-white dark:border-[#2C2A26] dark:bg-[#141312] transition-transform duration-200 ease-in-out lg:relative lg:top-0 lg:bottom-0 lg:h-full lg:translate-x-0 overflow-y-auto ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-700 dark:text-[#A19B8F]">
              Syllabus & Modules (31)
            </h2>
            <button
              onClick={() => {
                const count = Object.values(expandedPhases).filter(Boolean).length;
                if (count >= 4) {
                  setExpandedPhases({});
                  setSelectedPhaseId(null);
                } else {
                  setExpandedPhases({ 1: true, 2: true, 3: true, 4: true, 5: true, 6: true, 7: true });
                }
              }}
              className="text-[11px] font-mono font-bold text-zinc-500 hover:text-zinc-950 dark:text-[#A19B8F] dark:hover:text-[#F3EFE6] underline transition-colors"
            >
              {Object.values(expandedPhases).filter(Boolean).length >= 4 ? "Collapse All" : "Expand All"}
            </button>
          </div>

          {/* Phases List */}
          <div className="space-y-4">
            {ROADMAP_PHASES.map((phase) => {
              const filteredTopics = phase.topics.filter(matchesSearch);
              if (searchQuery && filteredTopics.length === 0) return null;

              const isExpanded = searchQuery.trim() ? true : Boolean(expandedPhases[phase.id]);
              const progress = getPhaseProgress(phase.id);
              // Dynamic phase highlight follows the clicked/expanded phase
              const isPhaseSelected = selectedPhaseId !== null ? selectedPhaseId === phase.id : isExpanded;

              return (
                <div
                  key={phase.id}
                  className={`rounded-xl border transition-all ${
                    isPhaseSelected
                      ? "border-amber-500/80 bg-amber-500/[0.05] ring-1 ring-amber-500/30 dark:border-amber-500/60 dark:bg-amber-950/20 shadow-xs"
                      : "border-zinc-200/90 bg-stone-50/50 dark:border-[#2C2A26] dark:bg-[#1A1917]"
                  } p-2`}
                >
                  {/* Phase Header */}
                  <button
                    onClick={() => togglePhase(phase.id)}
                    className="flex w-full items-center justify-between rounded-lg p-2 text-left hover:bg-zinc-100 dark:hover:bg-[#22211E] transition-colors"
                  >
                    <div className="flex-1 pr-2">
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <span
                          className={`font-mono text-xs font-black tracking-wider uppercase px-2.5 py-1 rounded-md border transition-colors ${
                            isPhaseSelected
                              ? "bg-amber-500/20 text-amber-950 dark:bg-amber-500/25 dark:text-amber-300 border-amber-500/40"
                              : "text-zinc-950 dark:text-[#F3EFE6] bg-zinc-200/90 dark:bg-[#25231F] border-zinc-300/80 dark:border-[#35332D]"
                          }`}
                        >
                          PHASE 0{phase.id}
                        </span>
                        <span className="font-mono text-xs font-black text-zinc-800 dark:text-[#E8E2D5] bg-white dark:bg-[#1A1917] px-2 py-0.5 rounded border border-zinc-200 dark:border-[#2C2A26]">
                          {progress.completed}/{progress.total}
                        </span>
                      </div>
                      <h3 className="text-sm sm:text-[14.5px] font-black tracking-tight text-zinc-950 dark:text-white leading-snug">
                        {phase.name}
                      </h3>
                    </div>
                    <div className={isPhaseSelected ? "text-amber-600 dark:text-amber-400" : "text-zinc-500 dark:text-zinc-400"}>
                      {isExpanded ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </div>
                  </button>

                  {/* Phase Topics */}
                  {isExpanded && (
                    <div className="mt-1 space-y-1.5 pt-1 border-t border-zinc-200/70 dark:border-[#262420]">
                      {filteredTopics.map((topic) => {
                        const isActive = topic.id === activeTopicId;
                        const completed = isTopicCompleted(topic.id);
                        const hasNote = Boolean(notes[topic.id]?.trim());

                        return (
                          <div
                            key={topic.id}
                            className={`group flex items-start justify-between rounded-lg px-2.5 py-2 transition-all ${
                              isActive
                                ? "bg-zinc-950 text-white font-extrabold shadow-md ring-1 ring-zinc-800 dark:bg-[#22211E] dark:text-white dark:ring-1 dark:ring-zinc-600"
                                : "text-zinc-900 hover:bg-zinc-100 hover:text-black dark:text-zinc-100 dark:hover:bg-gray-800/80 dark:hover:text-white border border-transparent font-medium"
                            }`}
                          >
                            {/* Topic Title Click */}
                            <button
                              onClick={() => {
                                setSelectedPhaseId(phase.id);
                                onSelectTopic(topic);
                                onClose();
                              }}
                              className="flex flex-1 items-start gap-2.5 text-left text-xs sm:text-[13.5px] leading-snug py-0.5"
                            >
                              <span
                                className={`font-mono text-xs font-black shrink-0 mt-0.5 px-1.5 py-0.5 rounded ${
                                  isActive
                                    ? "bg-zinc-800 text-white dark:bg-zinc-700 dark:text-white"
                                    : "bg-zinc-200/80 text-zinc-800 dark:bg-[#282622] dark:text-[#D5CFBF]"
                                }`}
                              >
                                {String(topic.number).padStart(2, "0")}
                              </span>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between gap-1.5">
                                  <span
                                    className={`font-black tracking-tight text-[13px] sm:text-[13.5px] leading-snug ${
                                      isActive
                                        ? "text-white dark:text-white"
                                        : "text-zinc-950 dark:text-zinc-100 group-hover:text-black dark:group-hover:text-white"
                                    }`}
                                  >
                                    {topic.title}
                                  </span>
                                  {hasNote && (
                                    <span
                                      title="Has personal notes"
                                      className={`shrink-0 mt-0.5 ${
                                        isActive
                                          ? "text-amber-300 dark:text-amber-400"
                                          : "text-amber-600 dark:text-amber-400"
                                      }`}
                                    >
                                      <FileText className="h-3.5 w-3.5" />
                                    </span>
                                  )}
                                </div>
                                <div className="mt-1 flex items-center gap-2">
                                  <span
                                    className={`font-mono text-[10.5px] font-bold px-1.5 py-0.5 rounded ${
                                      isActive
                                        ? "text-zinc-300 bg-zinc-800 dark:bg-zinc-700 dark:text-zinc-200"
                                        : "text-zinc-600 bg-zinc-200/90 dark:bg-[#201F1B] dark:text-[#A19B8F]"
                                    }`}
                                  >
                                    {topic.timeEstimates?.total || topic.duration}
                                  </span>
                                </div>
                              </div>
                            </button>

                            {/* Checkbox */}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                onToggleTopic(topic.id);
                              }}
                              className={`ml-2 mt-1 flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-md border transition-colors ${
                                completed
                                  ? "border-emerald-600 bg-emerald-600 text-white dark:border-emerald-500 dark:bg-emerald-500 dark:text-white"
                                  : isActive
                                  ? "border-zinc-500 hover:border-zinc-300 dark:border-gray-500 dark:hover:border-gray-300"
                                  : "border-zinc-300 hover:border-zinc-500 dark:border-gray-600 dark:hover:border-gray-400"
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
                              : "border-dashed border-zinc-300 bg-zinc-100/60 text-zinc-800 hover:border-zinc-400 hover:bg-zinc-200/60 dark:border-gray-700 dark:bg-gray-900/80 dark:text-gray-200 dark:hover:bg-gray-800 font-semibold"
                          }`}
                        >
                          <button
                            onClick={() => {
                              setSelectedPhaseId(phase.id);
                              onSelectCapstone(phase.id);
                              onClose();
                            }}
                            className="flex flex-1 items-center gap-2 text-left text-xs sm:text-[13px]"
                          >
                            <Trophy className="h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400" />
                            <span className="flex-1 font-black">
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
