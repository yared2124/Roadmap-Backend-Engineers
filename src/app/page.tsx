"use client";

import React, { useState, useEffect, useCallback } from "react";
import { ROADMAP_TOPICS } from "../data/roadmap";
import { CAPSTONE_PROJECTS } from "../data/capstones";
import { RoadmapTopic } from "../types/roadmap";
import { useProgress } from "../hooks/useProgress";
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import { TopicViewer } from "../components/TopicViewer";
import { CapstoneViewer } from "../components/CapstoneViewer";
import { CommandPalette } from "../components/CommandPalette";
import { ShortcutsModal } from "../components/ShortcutsModal";
import { RoadmapGuideModal } from "../components/RoadmapGuideModal";
import { PortfolioHome } from "../components/PortfolioHome";

export default function Home() {
  const [viewMode, setViewMode] = useState<"portfolio" | "roadmap">("portfolio");
  const [activeTopic, setActiveTopic] = useState<RoadmapTopic>(ROADMAP_TOPICS[0]);
  const [activeCapstonePhaseId, setActiveCapstonePhaseId] = useState<number | null>(null);
  const [isDark, setIsDark] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isShortcutsOpen, setIsShortcutsOpen] = useState(false);
  const [isGuideOpen, setIsGuideOpen] = useState(false);

  const {
    completedCount,
    totalTopics,
    overallPercentage,
    isTopicCompleted,
    isBookCompleted,
    isCapstoneCompleted,
    getCapstoneSubmission,
    toggleTopic,
    toggleBook,
    toggleCapstone,
    saveCapstoneSubmission,
    getNote,
    saveNote,
    notes,
    getPhaseProgress,
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

  // Check URL hash or view mode preference
  useEffect(() => {
    try {
      const hash = window.location.hash;
      const stored = localStorage.getItem("backend_roadmap_view_mode");
      if (hash === "#roadmap" || stored === "roadmap") {
        setViewMode("roadmap");
      }
    } catch {}
  }, []);

  const handleToggleTheme = useCallback(() => {
    setIsDark((prev) => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("backend_roadmap_theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("backend_roadmap_theme", "light");
      }
      return next;
    });
  }, []);

  // Next / Prev topic navigation
  const currentIndex = ROADMAP_TOPICS.findIndex((t) => t.id === activeTopic.id);
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < ROADMAP_TOPICS.length - 1;

  const scrollToTop = () => {
    const mainEl = document.getElementById("main-content-scroll");
    if (mainEl) {
      mainEl.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSelectPrev = useCallback(() => {
    if (hasPrev) {
      setActiveCapstonePhaseId(null);
      setActiveTopic(ROADMAP_TOPICS[currentIndex - 1]);
      scrollToTop();
    }
  }, [hasPrev, currentIndex]);

  const handleSelectNext = useCallback(() => {
    if (hasNext) {
      setActiveCapstonePhaseId(null);
      setActiveTopic(ROADMAP_TOPICS[currentIndex + 1]);
      scrollToTop();
    }
  }, [hasNext, currentIndex]);

  // Jump to and focus Notes Studio
  const handleFocusNotes = useCallback(() => {
    setActiveCapstonePhaseId(null);
    setTimeout(() => {
      const textarea = document.getElementById("topic-notes-textarea");
      if (textarea) {
        textarea.scrollIntoView({ behavior: "smooth", block: "center" });
        textarea.focus();
      }
    }, 100);
  }, []);

  // Enter Roadmap Workspace
  const handleEnterRoadmap = useCallback((topic?: RoadmapTopic) => {
    setViewMode("roadmap");
    localStorage.setItem("backend_roadmap_view_mode", "roadmap");
    if (topic) {
      setActiveCapstonePhaseId(null);
      setActiveTopic(topic);
    }
    scrollToTop();
  }, []);

  // Return to Portfolio Homepage
  const handleBackToPortfolio = useCallback(() => {
    setViewMode("portfolio");
    localStorage.setItem("backend_roadmap_view_mode", "portfolio");
    scrollToTop();
  }, []);

  // Explore Phase Capstone
  const handleExploreCapstones = useCallback((phaseId?: number) => {
    setViewMode("roadmap");
    localStorage.setItem("backend_roadmap_view_mode", "roadmap");
    setActiveCapstonePhaseId(phaseId || 1);
    scrollToTop();
  }, []);

  // Launch Course at Module 01 or current topic
  const handleStartCourse = useCallback(() => {
    setViewMode("roadmap");
    localStorage.setItem("backend_roadmap_view_mode", "roadmap");
    setActiveCapstonePhaseId(null);
    setActiveTopic(ROADMAP_TOPICS[0]);
    setIsGuideOpen(false);
    scrollToTop();
  }, []);

  // Global Keyboard Shortcuts Listener
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      // 1. Command Palette shortcut (Cmd+K / Ctrl+K)
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
        return;
      }

      // 2. Escape key closes open modals
      if (e.key === "Escape") {
        if (isGuideOpen) {
          setIsGuideOpen(false);
          return;
        }
        if (isCommandPaletteOpen) {
          setIsCommandPaletteOpen(false);
          return;
        }
        if (isShortcutsOpen) {
          setIsShortcutsOpen(false);
          return;
        }
      }

      // 3. Do not trigger single-key shortcuts while typing in inputs or textareas
      const activeEl = document.activeElement;
      const isInputActive =
        activeEl &&
        (activeEl.tagName === "INPUT" ||
          activeEl.tagName === "TEXTAREA" ||
          (activeEl as HTMLElement).isContentEditable);

      if (isInputActive || isCommandPaletteOpen) {
        return;
      }

      // Navigation & Action single-key shortcuts
      switch (e.key) {
        case "j":
        case "J":
        case "ArrowRight":
          e.preventDefault();
          handleSelectNext();
          break;
        case "k":
        case "K":
        case "ArrowLeft":
          e.preventDefault();
          handleSelectPrev();
          break;
        case "m":
        case "M":
          e.preventDefault();
          toggleTopic(activeTopic.id);
          break;
        case "b":
        case "B":
          e.preventDefault();
          toggleBook(activeTopic.id);
          break;
        case "t":
        case "T":
          e.preventDefault();
          handleToggleTheme();
          break;
        case "n":
        case "N":
          e.preventDefault();
          handleFocusNotes();
          break;
        case "?":
          e.preventDefault();
          setIsShortcutsOpen((prev) => !prev);
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleGlobalKeyDown);
    return () => window.removeEventListener("keydown", handleGlobalKeyDown);
  }, [
    isGuideOpen,
    isCommandPaletteOpen,
    isShortcutsOpen,
    handleSelectNext,
    handleSelectPrev,
    activeTopic.id,
    toggleTopic,
    toggleBook,
    handleToggleTheme,
    handleFocusNotes,
  ]);

  // Export all 31 topic notes as a single Markdown document
  const handleExportAllNotes = useCallback(() => {
    let markdown = `# Backend Engineer Roadmap — Master Study Notes\n`;
    markdown += `Generated on: ${new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })}\n`;
    markdown += `Total Curriculum Modules: ${ROADMAP_TOPICS.length}\n\n`;

    markdown += `## Table of Contents\n`;
    ROADMAP_TOPICS.forEach((topic) => {
      const hasContent = Boolean(notes[topic.id]?.trim());
      markdown += `- [${topic.number < 10 ? `0${topic.number}` : topic.number}. ${topic.title}](#topic-${topic.id}) ${hasContent ? "(Notes included)" : ""}\n`;
    });
    markdown += `\n---\n\n`;

    ROADMAP_TOPICS.forEach((topic) => {
      const topicNote = notes[topic.id]?.trim();
      markdown += `<a id="topic-${topic.id}"></a>\n`;
      markdown += `## ${topic.number < 10 ? `0${topic.number}` : topic.number}. ${topic.title}\n`;
      markdown += `**Phase**: ${topic.phaseName}\n`;
      markdown += `**Summary**: ${topic.shortSummary}\n`;
      markdown += `**Recommended Reading**: *${topic.recommendedBook.title}* by ${topic.recommendedBook.author} (${topic.recommendedBook.keyChapters})\n\n`;

      if (topicNote) {
        markdown += `### Personal Study Notes\n\n`;
        markdown += `${topicNote}\n\n`;
      } else {
        markdown += `*No notes recorded for this module yet.*\n\n`;
      }
      markdown += `---\n\n`;
    });

    const blob = new Blob([markdown], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `backend-roadmap-all-notes.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, [notes]);

  if (viewMode === "portfolio") {
    return (
      <PortfolioHome
        onEnterRoadmap={handleEnterRoadmap}
        onExploreCapstones={handleExploreCapstones}
        onOpenGuide={() => setIsGuideOpen(true)}
        isDark={isDark}
        onToggleTheme={handleToggleTheme}
        completedCount={completedCount}
        totalTopics={totalTopics}
      />
    );
  }

  return (
    <div className="h-screen w-screen overflow-hidden bg-white text-zinc-900 dark:bg-[#141312] dark:text-[#F3EFE6] flex flex-col font-sans transition-colors duration-200">
      {/* Top Navbar - Locked at top */}
      <Header
        completedCount={completedCount}
        totalTopics={totalTopics}
        overallPercentage={overallPercentage}
        isDark={isDark}
        onToggleTheme={handleToggleTheme}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        onOpenShortcuts={() => setIsShortcutsOpen(true)}
        onOpenGuide={() => setIsGuideOpen(true)}
        onBackToPortfolio={handleBackToPortfolio}
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        isSidebarOpen={isSidebarOpen}
      />

      {/* Main Workspace Layout - Fills remaining height */}
      <div className="flex flex-1 w-full overflow-hidden">
        {/* Left Syllabus Navigation - Independent scroll */}
        <Sidebar
          activeTopicId={activeTopic.id}
          activeCapstonePhaseId={activeCapstonePhaseId}
          onSelectTopic={(t) => {
            setActiveCapstonePhaseId(null);
            setActiveTopic(t);
            scrollToTop();
          }}
          onSelectCapstone={(phaseId) => {
            setActiveCapstonePhaseId(phaseId);
            scrollToTop();
          }}
          isTopicCompleted={isTopicCompleted}
          isCapstoneCompleted={isCapstoneCompleted}
          onToggleTopic={toggleTopic}
          getPhaseProgress={getPhaseProgress}
          searchQuery={searchQuery}
          notes={notes}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          onOpenGuide={() => setIsGuideOpen(true)}
        />

        {/* Center/Right Content Canvas - Only this scrolls when reading */}
        <main
          id="main-content-scroll"
          className="flex-1 overflow-y-auto px-4 py-8 sm:px-6 lg:px-12"
        >
          {activeCapstonePhaseId && CAPSTONE_PROJECTS[activeCapstonePhaseId] ? (
            <CapstoneViewer
              capstone={CAPSTONE_PROJECTS[activeCapstonePhaseId]}
              isCompleted={isCapstoneCompleted(activeCapstonePhaseId)}
              onToggleComplete={() => toggleCapstone(activeCapstonePhaseId)}
              submissionUrl={getCapstoneSubmission(activeCapstonePhaseId)}
              onSaveSubmissionUrl={(url) => saveCapstoneSubmission(activeCapstonePhaseId, url)}
              onBackToTopic={() => {
                setActiveCapstonePhaseId(null);
                scrollToTop();
              }}
            />
          ) : (
            <TopicViewer
              topic={activeTopic}
              isCompleted={isTopicCompleted(activeTopic.id)}
              onToggleComplete={() => toggleTopic(activeTopic.id)}
              isBookRead={isBookCompleted(activeTopic.id)}
              onToggleBookRead={() => toggleBook(activeTopic.id)}
              note={getNote(activeTopic.id)}
              onSaveNote={saveNote}
              onExportAllNotes={handleExportAllNotes}
              onOpenPhaseCapstone={(phaseId) => {
                setActiveCapstonePhaseId(phaseId);
                scrollToTop();
              }}
              onSelectPrev={handleSelectPrev}
              onSelectNext={handleSelectNext}
              hasPrev={hasPrev}
              hasNext={hasNext}
              onOpenGuide={() => setIsGuideOpen(true)}
            />
          )}
        </main>
      </div>

      {/* Global Command Palette (Cmd+K / Ctrl+K) */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onSelectTopic={(topic) => {
          setActiveCapstonePhaseId(null);
          setActiveTopic(topic);
          scrollToTop();
        }}
        onSelectCapstone={(phaseId) => {
          setActiveCapstonePhaseId(phaseId);
          scrollToTop();
        }}
        onToggleTheme={handleToggleTheme}
        onOpenShortcuts={() => setIsShortcutsOpen(true)}
        onOpenGuide={() => setIsGuideOpen(true)}
        onBackToPortfolio={handleBackToPortfolio}
        onExportAllNotes={handleExportAllNotes}
        onSelectNext={handleSelectNext}
        onSelectPrev={handleSelectPrev}
        isDark={isDark}
        isTopicCompleted={isTopicCompleted}
        isCapstoneCompleted={isCapstoneCompleted}
      />

      {/* Keyboard Shortcuts Cheat-sheet Modal (?) */}
      <ShortcutsModal
        isOpen={isShortcutsOpen}
        onClose={() => setIsShortcutsOpen(false)}
      />

      {/* Student Orientation & Strategy Guide Modal */}
      <RoadmapGuideModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
        onStartCourse={handleStartCourse}
        onExploreCapstones={() => {
          setActiveCapstonePhaseId(1);
          setIsGuideOpen(false);
          scrollToTop();
        }}
        currentTopicTitle={activeTopic.title}
        currentTopicNumber={activeTopic.number}
      />
    </div>
  );
}
