"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import { ROADMAP_TOPICS, ROADMAP_PHASES } from "../data/roadmap";
import { CAPSTONE_PROJECTS } from "../data/capstones";
import { RoadmapTopic } from "../types/roadmap";
import {
  Search,
  BookOpen,
  Trophy,
  Layers,
  HelpCircle,
  Clock,
  Sparkles,
  Command,
  Sun,
  Moon,
  Keyboard,
  FileDown,
  ArrowRight,
  ArrowLeft,
  X,
  CheckCircle2,
} from "lucide-react";

export type PaletteCategory = "all" | "topics" | "capstones" | "books" | "questions" | "commands";

interface PaletteResult {
  id: string;
  type: "topic" | "capstone" | "book" | "question" | "command";
  title: string;
  subtitle: string;
  badge?: string;
  badgeColor?: string;
  metadata?: string;
  onSelect: () => void;
}

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTopic: (topic: RoadmapTopic) => void;
  onSelectCapstone: (phaseId: number) => void;
  onToggleTheme: () => void;
  onOpenShortcuts: () => void;
  onOpenGuide: () => void;
  onExportAllNotes: () => void;
  onSelectNext: () => void;
  onSelectPrev: () => void;
  isDark: boolean;
  isTopicCompleted: (id: string) => boolean;
  isCapstoneCompleted: (phaseId: number) => boolean;
}

export function CommandPalette({
  isOpen,
  onClose,
  onSelectTopic,
  onSelectCapstone,
  onToggleTheme,
  onOpenShortcuts,
  onOpenGuide,
  onExportAllNotes,
  onSelectNext,
  onSelectPrev,
  isDark,
  isTopicCompleted,
  isCapstoneCompleted,
}: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<PaletteCategory>("all");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Focus search input on open
  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Build searchable items
  const allItems = useMemo<PaletteResult[]>(() => {
    const results: PaletteResult[] = [];

    // 1. Quick Commands
    results.push({
      id: "cmd-open-guide",
      type: "command",
      title: "Open Student Orientation & Action Guide (መመሪያ)",
      subtitle: "How this roadmap works, 5-step daily routine, oral interview tips & 7 capstones",
      badge: "Guide",
      badgeColor: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
      onSelect: () => {
        onClose();
        setTimeout(onOpenGuide, 50);
      },
    });

    results.push({
      id: "cmd-theme",
      type: "command",
      title: isDark ? "Switch to Light Mode" : "Switch to Dark Mode",
      subtitle: "Toggle application color scheme",
      badge: "Command",
      badgeColor: "bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300",
      onSelect: () => {
        onToggleTheme();
        onClose();
      },
    });

    results.push({
      id: "cmd-export-notes",
      type: "command",
      title: "Export All Notes as Markdown (.md)",
      subtitle: "Download all 31 module notes as a single structured document",
      badge: "Command",
      badgeColor: "bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300",
      onSelect: () => {
        onExportAllNotes();
        onClose();
      },
    });

    results.push({
      id: "cmd-shortcuts",
      type: "command",
      title: "View Keyboard Shortcuts Cheat-sheet",
      subtitle: "See all shortcut keys for lightning-fast roadmap navigation",
      badge: "Command",
      badgeColor: "bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300",
      onSelect: () => {
        onClose();
        setTimeout(onOpenShortcuts, 50);
      },
    });

    results.push({
      id: "cmd-next-topic",
      type: "command",
      title: "Navigate to Next Module",
      subtitle: "Jump to the subsequent curriculum topic",
      badge: "Nav",
      badgeColor: "bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300",
      onSelect: () => {
        onSelectNext();
        onClose();
      },
    });

    results.push({
      id: "cmd-prev-topic",
      type: "command",
      title: "Navigate to Previous Module",
      subtitle: "Return to the previous curriculum topic",
      badge: "Nav",
      badgeColor: "bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300",
      onSelect: () => {
        onSelectPrev();
        onClose();
      },
    });

    // 2. Topics (31)
    ROADMAP_TOPICS.forEach((topic) => {
      const completed = isTopicCompleted(topic.id);
      results.push({
        id: `topic-${topic.id}`,
        type: "topic",
        title: topic.title,
        subtitle: `${topic.phaseName} • ${topic.shortSummary}`,
        badge: completed ? "Completed" : (topic.timeEstimates?.total || "Topic"),
        badgeColor: completed
          ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
          : "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
        metadata: `${topic.phaseName} ${topic.shortSummary}`,
        onSelect: () => {
          onSelectTopic(topic);
          onClose();
        },
      });
    });

    // 3. Phase Capstones (7)
    Object.values(CAPSTONE_PROJECTS).forEach((capstone) => {
      const completed = isCapstoneCompleted(capstone.phaseId);
      results.push({
        id: `capstone-${capstone.phaseId}`,
        type: "capstone",
        title: capstone.title,
        subtitle: `Phase 0${capstone.phaseId} Capstone • ${capstone.scenario.slice(0, 85)}...`,
        badge: completed ? "Completed" : "Capstone",
        badgeColor: completed
          ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
          : "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
        metadata: `${capstone.techStack.join(" ")} Phase ${capstone.phaseId}`,
        onSelect: () => {
          onSelectCapstone(capstone.phaseId);
          onClose();
        },
      });
    });

    // 4. Books (Curated per topic)
    const seenBooks = new Set<string>();
    ROADMAP_TOPICS.forEach((topic) => {
      const book = topic.recommendedBook;
      const key = `${book.title}-${book.keyChapters}`;
      if (!seenBooks.has(key)) {
        seenBooks.add(key);
        results.push({
          id: `book-${topic.id}`,
          type: "book",
          title: book.title,
          subtitle: `${book.author} — ${book.keyChapters} (Linked in ${topic.title})`,
          badge: "Book",
          badgeColor: "bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300",
          metadata: `${book.author} ${book.keyChapters} ${book.title}`,
          onSelect: () => {
            onSelectTopic(topic);
            onClose();
          },
        });
      }
    });

    // 5. Self-Check Interview Questions (93)
    ROADMAP_TOPICS.forEach((topic) => {
      topic.selfCheckQuestions?.forEach((q, qIdx) => {
        const questionText = typeof q === "string" ? q : q.question;
        const answerText = typeof q === "string" ? "" : q.answerExplanation;
        const category = typeof q === "string" ? "Question" : (q.category || "Question");

        results.push({
          id: `q-${topic.id}-${qIdx}`,
          type: "question",
          title: questionText,
          subtitle: `From ${topic.title} (${category}) • ${answerText.slice(0, 90)}...`,
          badge: category,
          badgeColor:
            category === "WHAT"
              ? "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300"
              : category === "WHY"
              ? "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300"
              : "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
          metadata: `${answerText} ${topic.title}`,
          onSelect: () => {
            onSelectTopic(topic);
            onClose();
          },
        });
      });
    });

    return results;
  }, [
    isDark,
    onToggleTheme,
    onExportAllNotes,
    onOpenShortcuts,
    onSelectNext,
    onSelectPrev,
    onSelectTopic,
    onSelectCapstone,
    isTopicCompleted,
    isCapstoneCompleted,
    onClose,
  ]);

  // Filtered results based on query and activeCategory
  const filteredResults = useMemo(() => {
    let list = allItems;
    if (activeCategory !== "all") {
      const typeMap: Record<string, string> = {
        topics: "topic",
        capstones: "capstone",
        books: "book",
        questions: "question",
        commands: "command",
      };
      const targetType = typeMap[activeCategory];
      list = list.filter((item) => item.type === targetType);
    }

    if (!query.trim()) {
      return list.slice(0, 20); // Top items when search is empty
    }

    const q = query.toLowerCase();
    return list
      .filter((item) => {
        return (
          item.title.toLowerCase().includes(q) ||
          item.subtitle.toLowerCase().includes(q) ||
          (item.metadata && item.metadata.toLowerCase().includes(q))
        );
      })
      .slice(0, 30);
  }, [allItems, activeCategory, query]);

  // Keyboard navigation inside the palette
  useEffect(() => {
    setSelectedIndex(0);
  }, [filteredResults]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < filteredResults.length - 1 ? prev + 1 : 0
        );
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev > 0 ? prev - 1 : Math.max(0, filteredResults.length - 1)
        );
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (filteredResults[selectedIndex]) {
          filteredResults[selectedIndex].onSelect();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, filteredResults, selectedIndex, onClose]);

  // Scroll active item into view
  useEffect(() => {
    if (listRef.current) {
      const activeEl = listRef.current.querySelector(
        `[data-index="${selectedIndex}"]`
      ) as HTMLElement | null;
      if (activeEl) {
        activeEl.scrollIntoView({ block: "nearest" });
      }
    }
  }, [selectedIndex]);

  if (!isOpen) return null;

  const renderIcon = (type: PaletteResult["type"]) => {
    switch (type) {
      case "topic":
        return <Layers className="h-4 w-4 text-blue-500" />;
      case "capstone":
        return <Trophy className="h-4 w-4 text-amber-500" />;
      case "book":
        return <BookOpen className="h-4 w-4 text-indigo-500" />;
      case "question":
        return <HelpCircle className="h-4 w-4 text-emerald-500" />;
      case "command":
        return <Sparkles className="h-4 w-4 text-purple-500" />;
    }
  };

  const categories: { key: PaletteCategory; label: string }[] = [
    { key: "all", label: "All" },
    { key: "topics", label: "Topics (31)" },
    { key: "capstones", label: "Capstones (7)" },
    { key: "books", label: "Books" },
    { key: "questions", label: "Self-Check Qs" },
    { key: "commands", label: "Actions" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-12 sm:pt-20 px-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Palette Container */}
      <div className="relative w-full max-w-2xl rounded-2xl border border-zinc-200 bg-white shadow-2xl dark:border-zinc-800 dark:bg-zinc-950 overflow-hidden flex flex-col transition-all max-h-[82vh]">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-zinc-100 dark:border-zinc-800/80">
          <Search className="h-5 w-5 text-zinc-400 shrink-0 mr-3" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search 31 topics, capstones, books, self-check questions, or actions..."
            className="w-full bg-transparent text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none dark:text-zinc-100 dark:placeholder:text-zinc-500"
          />
          {query ? (
            <button
              onClick={() => setQuery("")}
              className="p-1 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
            >
              <X className="h-4 w-4" />
            </button>
          ) : (
            <kbd className="hidden sm:inline-flex items-center rounded border border-zinc-200 dark:border-zinc-800 px-1.5 py-0.5 font-mono text-[10px] text-zinc-400">
              Esc
            </kbd>
          )}
        </div>

        {/* Filter Category Tabs */}
        <div className="flex items-center gap-1 px-3 py-2 border-b border-zinc-100 dark:border-zinc-800/60 bg-zinc-50/50 dark:bg-zinc-900/30 overflow-x-auto text-xs no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`px-2.5 py-1 rounded-md font-mono text-xs font-medium transition-colors shrink-0 ${
                activeCategory === cat.key
                  ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950"
                  : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-200/60 dark:text-zinc-400 dark:hover:text-zinc-200 dark:hover:bg-zinc-800/60"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div
          ref={listRef}
          className="flex-1 overflow-y-auto p-2 space-y-1 divide-y divide-zinc-100/50 dark:divide-zinc-900"
        >
          {filteredResults.length === 0 ? (
            <div className="py-12 text-center">
              <Search className="mx-auto h-8 w-8 text-zinc-300 dark:text-zinc-700 mb-2" />
              <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                No matching results found
              </p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                Try searching for PostgreSQL, Redis, Kafka, Distributed Systems, or Architecture.
              </p>
            </div>
          ) : (
            filteredResults.map((item, index) => {
              const isSelected = index === selectedIndex;
              return (
                <div
                  key={item.id}
                  data-index={index}
                  onClick={item.onSelect}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-colors ${
                    isSelected
                      ? "bg-zinc-100 dark:bg-zinc-800/90 text-zinc-900 dark:text-zinc-50"
                      : "hover:bg-zinc-50 dark:hover:bg-zinc-900/50 text-zinc-700 dark:text-zinc-300"
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800">
                      {renderIcon(item.type)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-xs truncate">
                          {item.title}
                        </span>
                      </div>
                      <p className="text-[11px] text-zinc-500 dark:text-zinc-400 truncate">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>

                  {item.badge && (
                    <span
                      className={`inline-flex items-center rounded-md px-2 py-0.5 font-mono text-[10px] font-semibold tracking-wider uppercase shrink-0 ${item.badgeColor}`}
                    >
                      {item.badge}
                    </span>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Footer info bar */}
        <div className="px-4 py-2 border-t border-zinc-100 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/30 flex items-center justify-between text-[11px] text-zinc-400">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1">
              <kbd className="rounded border border-zinc-200 dark:border-zinc-800 px-1 py-0.5 font-mono text-[10px] text-zinc-500">
                ↑↓
              </kbd>{" "}
              Navigate
            </span>
            <span className="inline-flex items-center gap-1">
              <kbd className="rounded border border-zinc-200 dark:border-zinc-800 px-1 py-0.5 font-mono text-[10px] text-zinc-500">
                ↵
              </kbd>{" "}
              Select
            </span>
            <span className="inline-flex items-center gap-1">
              <kbd className="rounded border border-zinc-200 dark:border-zinc-800 px-1 py-0.5 font-mono text-[10px] text-zinc-500">
                Esc
              </kbd>{" "}
              Close
            </span>
          </div>

          <span className="font-mono text-[10px] text-zinc-400">
            {filteredResults.length} matches
          </span>
        </div>
      </div>
    </div>
  );
}
