"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ROADMAP_TOPICS } from "../../../data/roadmap";
import { RoadmapTopic } from "../../../types/roadmap";
import { useProgress } from "../../../hooks/useProgress";
import { Header } from "../../../components/Header";
import { Sidebar } from "../../../components/Sidebar";
import { TopicViewer } from "../../../components/TopicViewer";
import { CommandPalette } from "../../../components/CommandPalette";
import { ShortcutsModal } from "../../../components/ShortcutsModal";
import { RoadmapGuideModal } from "../../../components/RoadmapGuideModal";
import { ChevronRight, ArrowLeft } from "lucide-react";

interface TopicDetailClientProps {
  topic: RoadmapTopic;
}

export function TopicDetailClient({ topic }: TopicDetailClientProps) {
  const router = useRouter();
  const [isDark, setIsDark] = useState<boolean>(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isShortcutsOpen, setIsShortcutsOpen] = useState(false);
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    completedCount,
    totalTopics,
    overallPercentage,
    isTopicCompleted,
    isBookCompleted,
    isCapstoneCompleted,
    toggleTopic,
    toggleBook,
    getNote,
    saveNote,
    notes,
    getPhaseProgress,
    exportProgress,
    importProgress,
  } = useProgress();

  // Dark Mode Theme synchronization
  useEffect(() => {
    const storedTheme = localStorage.getItem("backend_roadmap_theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialDark = storedTheme ? storedTheme === "dark" : prefersDark;

    setIsDark(initialDark);
    if (initialDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setIsDark((prev) => {
      const next = !prev;
      localStorage.setItem("backend_roadmap_theme", next ? "dark" : "light");
      if (next) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      return next;
    });
  }, []);

  const currentIndex = ROADMAP_TOPICS.findIndex((t) => t.id === topic.id);
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < ROADMAP_TOPICS.length - 1;

  const handleSelectPrev = () => {
    if (hasPrev) {
      router.push(`/topics/${ROADMAP_TOPICS[currentIndex - 1].id}`);
    }
  };

  const handleSelectNext = () => {
    if (hasNext) {
      router.push(`/topics/${ROADMAP_TOPICS[currentIndex + 1].id}`);
    }
  };

  const handleSelectTopic = (selected: RoadmapTopic) => {
    router.push(`/topics/${selected.id}`);
    setIsSidebarOpen(false);
  };

  const handleImportTrigger = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        const success = importProgress(content);
        if (success) {
          alert("Progress and notes imported successfully!");
        } else {
          alert("Failed to import progress file. Please check that it is valid JSON.");
        }
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#FAF9F5] text-zinc-900 transition-colors duration-200 dark:bg-[#141312] dark:text-[#E6E4DD]">
      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        onChange={handleFileChange}
        className="hidden"
        aria-hidden="true"
      />

      <Sidebar
        activeTopicId={topic.id}
        onSelectTopic={handleSelectTopic}
        isTopicCompleted={isTopicCompleted}
        isCapstoneCompleted={isCapstoneCompleted}
        onToggleTopic={toggleTopic}
        getPhaseProgress={getPhaseProgress}
        notes={notes}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <div className="flex flex-1 flex-col overflow-hidden">
        <Header
          completedCount={completedCount}
          totalTopics={totalTopics}
          overallPercentage={overallPercentage}
          isDark={isDark}
          onToggleTheme={toggleTheme}
          onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
          onOpenShortcuts={() => setIsShortcutsOpen(true)}
          onOpenGuide={() => setIsGuideOpen(true)}
          onBackToPortfolio={() => router.push("/")}
          onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
          isSidebarOpen={isSidebarOpen}
        />

        {/* Breadcrumb Navigation Bar */}
        <div className="border-b border-zinc-200 bg-white/70 px-4 py-2 text-xs backdrop-blur-sm dark:border-[#2C2A26] dark:bg-[#1A1917]/70 sm:px-8">
          <div className="mx-auto flex max-w-5xl items-center gap-2 overflow-x-auto text-zinc-500 dark:text-[#9E988A]">
            <Link
              href="/"
              className="flex items-center gap-1 font-medium hover:text-zinc-900 dark:hover:text-[#F3EFE6] transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Full Roadmap</span>
            </Link>
            <ChevronRight className="h-3.5 w-3.5 shrink-0 opacity-50" />
            <span className="shrink-0 font-medium">Phase {topic.phaseId}: {topic.phaseName}</span>
            <ChevronRight className="h-3.5 w-3.5 shrink-0 opacity-50" />
            <span className="shrink-0 font-semibold text-zinc-900 dark:text-[#F3EFE6]">
              #{topic.number} {topic.title}
            </span>
          </div>
        </div>

        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-5xl px-4 py-6 sm:px-8 sm:py-8">
            <TopicViewer
              topic={topic}
              isCompleted={isTopicCompleted(topic.id)}
              onToggleComplete={() => toggleTopic(topic.id)}
              isBookRead={isBookCompleted(topic.id)}
              onToggleBookRead={() => toggleBook(topic.id)}
              note={getNote(topic.id)}
              onSaveNote={saveNote}
              onExportAllNotes={exportProgress}
              onSelectPrev={handleSelectPrev}
              onSelectNext={handleSelectNext}
              hasPrev={hasPrev}
              hasNext={hasNext}
            />
          </div>
        </main>
      </div>

      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onSelectTopic={handleSelectTopic}
        onSelectCapstone={(phaseId) => router.push(`/#capstone-${phaseId}`)}
        onToggleTheme={toggleTheme}
        onOpenShortcuts={() => setIsShortcutsOpen(true)}
        onOpenGuide={() => setIsGuideOpen(true)}
        onBackToPortfolio={() => router.push("/")}
        onExportAllNotes={exportProgress}
        onExportProgress={exportProgress}
        onImportProgress={handleImportTrigger}
        onSelectNext={handleSelectNext}
        onSelectPrev={handleSelectPrev}
        isDark={isDark}
        isTopicCompleted={isTopicCompleted}
        isCapstoneCompleted={isCapstoneCompleted}
      />

      <ShortcutsModal isOpen={isShortcutsOpen} onClose={() => setIsShortcutsOpen(false)} />
      <RoadmapGuideModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
        onStartCourse={() => {
          setIsGuideOpen(false);
          router.push(`/topics/${ROADMAP_TOPICS[0].id}`);
        }}
        onExploreCapstones={() => {
          setIsGuideOpen(false);
          router.push("/#capstones");
        }}
        currentTopicTitle={topic.title}
        currentTopicNumber={topic.number}
      />
    </div>
  );
}
