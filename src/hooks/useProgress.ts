"use client";

import { useState, useEffect, useCallback } from "react";
import { ROADMAP_TOPICS } from "../data/roadmap";

const STORAGE_KEY = "backend_roadmap_progress_v1";

interface ProgressData {
  completedTopics: string[];
  completedBooks: string[];
  notes: Record<string, string>;
}

const defaultData: ProgressData = {
  completedTopics: [],
  completedBooks: [],
  notes: {},
};

export function useProgress() {
  const [data, setData] = useState<ProgressData>(defaultData);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount (hydration safe)
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setData(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Failed to read progress from localStorage", e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save to localStorage when state updates
  const save = useCallback((newData: ProgressData) => {
    setData(newData);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
    } catch (e) {
      console.error("Failed to save progress to localStorage", e);
    }
  }, []);

  const toggleTopic = useCallback(
    (topicId: string) => {
      setData((prev) => {
        const exists = prev.completedTopics.includes(topicId);
        const updated = exists
          ? prev.completedTopics.filter((id) => id !== topicId)
          : [...prev.completedTopics, topicId];
        const next = { ...prev, completedTopics: updated };
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        } catch {}
        return next;
      });
    },
    []
  );

  const toggleBook = useCallback(
    (topicId: string) => {
      setData((prev) => {
        const exists = prev.completedBooks.includes(topicId);
        const updated = exists
          ? prev.completedBooks.filter((id) => id !== topicId)
          : [...prev.completedBooks, topicId];
        const next = { ...prev, completedBooks: updated };
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        } catch {}
        return next;
      });
    },
    []
  );

  const saveNote = useCallback(
    (topicId: string, note: string) => {
      setData((prev) => {
        const next = {
          ...prev,
          notes: {
            ...prev.notes,
            [topicId]: note,
          },
        };
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        } catch {}
        return next;
      });
    },
    []
  );

  const resetProgress = useCallback(() => {
    save(defaultData);
  }, [save]);

  const totalTopics = ROADMAP_TOPICS.length;
  const completedCount = data.completedTopics.length;
  const overallPercentage = Math.round((completedCount / totalTopics) * 100) || 0;

  const getPhaseProgress = useCallback(
    (phaseId: number) => {
      const phaseTopics = ROADMAP_TOPICS.filter((t) => t.phaseId === phaseId);
      const total = phaseTopics.length;
      const completed = phaseTopics.filter((t) =>
        data.completedTopics.includes(t.id)
      ).length;
      const percentage = Math.round((completed / total) * 100) || 0;
      return { total, completed, percentage };
    },
    [data.completedTopics]
  );

  return {
    isLoaded,
    completedTopics: data.completedTopics,
    completedBooks: data.completedBooks,
    notes: data.notes,
    isTopicCompleted: (id: string) => data.completedTopics.includes(id),
    isBookCompleted: (id: string) => data.completedBooks.includes(id),
    getNote: (id: string) => data.notes[id] || "",
    toggleTopic,
    toggleBook,
    saveNote,
    resetProgress,
    totalTopics,
    completedCount,
    overallPercentage,
    getPhaseProgress,
  };
}
