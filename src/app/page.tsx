"use client";

import React, { useState, useEffect } from "react";
import { ROADMAP_TOPICS } from "../data/roadmap";
import { RoadmapTopic } from "../types/roadmap";
import { useProgress } from "../hooks/useProgress";
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import { TopicViewer } from "../components/TopicViewer";

export default function Home() {
  const [activeTopic, setActiveTopic] = useState<RoadmapTopic>(ROADMAP_TOPICS[0]);
  const [isDark, setIsDark] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const {
    completedCount,
    totalTopics,
    overallPercentage,
    isTopicCompleted,
    isBookCompleted,
    getNote,
    toggleTopic,
    toggleBook,
    saveNote,
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

  const handleToggleTheme = () => {
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
  };

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

  const handleSelectPrev = () => {
    if (hasPrev) {
      setActiveTopic(ROADMAP_TOPICS[currentIndex - 1]);
      scrollToTop();
    }
  };

  const handleSelectNext = () => {
    if (hasNext) {
      setActiveTopic(ROADMAP_TOPICS[currentIndex + 1]);
      scrollToTop();
    }
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-white text-zinc-900 dark:bg-black dark:text-zinc-100 flex flex-col font-sans transition-colors duration-200">
      {/* Top Navbar - Locked at top */}
      <Header
        completedCount={completedCount}
        totalTopics={totalTopics}
        overallPercentage={overallPercentage}
        isDark={isDark}
        onToggleTheme={handleToggleTheme}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        isSidebarOpen={isSidebarOpen}
      />

      {/* Main Workspace Layout - Fills remaining height */}
      <div className="flex flex-1 w-full overflow-hidden">
        {/* Left Syllabus Navigation - Independent scroll */}
        <Sidebar
          activeTopicId={activeTopic.id}
          onSelectTopic={(t) => {
            setActiveTopic(t);
            scrollToTop();
          }}
          isTopicCompleted={isTopicCompleted}
          onToggleTopic={toggleTopic}
          getPhaseProgress={getPhaseProgress}
          searchQuery={searchQuery}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />

        {/* Center/Right Content Canvas - Only this scrolls when reading */}
        <main
          id="main-content-scroll"
          className="flex-1 overflow-y-auto px-4 py-8 sm:px-6 lg:px-12"
        >
          <TopicViewer
            topic={activeTopic}
            isCompleted={isTopicCompleted(activeTopic.id)}
            onToggleComplete={() => toggleTopic(activeTopic.id)}
            isBookRead={isBookCompleted(activeTopic.id)}
            onToggleBookRead={() => toggleBook(activeTopic.id)}
            note={getNote(activeTopic.id)}
            onSaveNote={saveNote}
            onSelectPrev={handleSelectPrev}
            onSelectNext={handleSelectNext}
            hasPrev={hasPrev}
            hasNext={hasNext}
          />
        </main>
      </div>
    </div>
  );
}
