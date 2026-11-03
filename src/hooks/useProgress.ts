"use client";

import { useState, useEffect, useCallback } from "react";
import { ROADMAP_TOPICS } from "../data/roadmap";

const STORAGE_KEY = "backend_roadmap_progress_v2";
const LEGACY_STORAGE_KEY = "backend_roadmap_progress_v1";
const CURRENT_SCHEMA_VERSION = 2;

export interface ProgressData {
  version: number;
  completedTopics: string[];
  completedBooks: string[];
  completedCapstones: number[];
  capstoneSubmissions: Record<number, string>;
  notes: Record<string, string>;
  updatedAt?: string;
}

const defaultData: ProgressData = {
  version: CURRENT_SCHEMA_VERSION,
  completedTopics: [],
  completedBooks: [],
  completedCapstones: [],
  capstoneSubmissions: {},
  notes: {},
  updatedAt: new Date().toISOString(),
};

export function sanitizeProgressData(raw: unknown): ProgressData {
  if (!raw || typeof raw !== "object") {
    return { ...defaultData, updatedAt: new Date().toISOString() };
  }

  const obj = raw as Record<string, unknown>;

  const completedTopics = Array.isArray(obj.completedTopics)
    ? obj.completedTopics.filter((t): t is string => typeof t === "string")
    : [];

  const completedBooks = Array.isArray(obj.completedBooks)
    ? obj.completedBooks.filter((b): b is string => typeof b === "string")
    : [];

  const completedCapstones = Array.isArray(obj.completedCapstones)
    ? obj.completedCapstones
        .map((c) => (typeof c === "number" ? c : parseInt(String(c), 10)))
        .filter((c): c is number => !Number.isNaN(c))
    : [];

  const capstoneSubmissions: Record<number, string> = {};
  if (obj.capstoneSubmissions && typeof obj.capstoneSubmissions === "object") {
    for (const [key, val] of Object.entries(obj.capstoneSubmissions)) {
      const numKey = parseInt(key, 10);
      if (!Number.isNaN(numKey) && typeof val === "string") {
        capstoneSubmissions[numKey] = val;
      }
    }
  }

  const notes: Record<string, string> = {};
  if (obj.notes && typeof obj.notes === "object") {
    for (const [key, val] of Object.entries(obj.notes)) {
      if (typeof val === "string") {
        notes[key] = val;
      }
    }
  }

  return {
    version: typeof obj.version === "number" ? obj.version : CURRENT_SCHEMA_VERSION,
    completedTopics,
    completedBooks,
    completedCapstones,
    capstoneSubmissions,
    notes,
    updatedAt: typeof obj.updatedAt === "string" ? obj.updatedAt : new Date().toISOString(),
  };
}

export function useProgress() {
  const [data, setData] = useState<ProgressData>(defaultData);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount (hydration safe, with backward compatibility)
  useEffect(() => {
    try {
      let stored = localStorage.getItem(STORAGE_KEY);
      // Fallback check for legacy v1 storage
      if (!stored) {
        stored = localStorage.getItem(LEGACY_STORAGE_KEY);
      }

      if (stored) {
        const parsed = JSON.parse(stored);
        setData(sanitizeProgressData(parsed));
      }
    } catch (e) {
      console.error("Failed to read progress from localStorage; resetting to default safe state.", e);
      setData(defaultData);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Separate effect: Synchronize state to localStorage purely without side effects in updater functions
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error("Failed to save progress to localStorage", e);
    }
  }, [data, isLoaded]);

  const toggleTopic = useCallback((topicId: string) => {
    setData((prev) => {
      const exists = prev.completedTopics.includes(topicId);
      const updated = exists
        ? prev.completedTopics.filter((id) => id !== topicId)
        : [...prev.completedTopics, topicId];
      return {
        ...prev,
        completedTopics: updated,
        updatedAt: new Date().toISOString(),
      };
    });
  }, []);

  const toggleBook = useCallback((topicId: string) => {
    setData((prev) => {
      const exists = prev.completedBooks.includes(topicId);
      const updated = exists
        ? prev.completedBooks.filter((id) => id !== topicId)
        : [...prev.completedBooks, topicId];
      return {
        ...prev,
        completedBooks: updated,
        updatedAt: new Date().toISOString(),
      };
    });
  }, []);

  const saveNote = useCallback((topicId: string, note: string) => {
    setData((prev) => ({
      ...prev,
      notes: {
        ...prev.notes,
        [topicId]: note,
      },
      updatedAt: new Date().toISOString(),
    }));
  }, []);

  const toggleCapstone = useCallback((phaseId: number) => {
    setData((prev) => {
      const completedCapstones = prev.completedCapstones || [];
      const exists = completedCapstones.includes(phaseId);
      const updated = exists
        ? completedCapstones.filter((id) => id !== phaseId)
        : [...completedCapstones, phaseId];
      return {
        ...prev,
        completedCapstones: updated,
        updatedAt: new Date().toISOString(),
      };
    });
  }, []);

  const saveCapstoneSubmission = useCallback((phaseId: number, repoUrl: string) => {
    setData((prev) => ({
      ...prev,
      capstoneSubmissions: {
        ...(prev.capstoneSubmissions || {}),
        [phaseId]: repoUrl,
      },
      updatedAt: new Date().toISOString(),
    }));
  }, []);

  const resetProgress = useCallback(() => {
    setData({
      ...defaultData,
      updatedAt: new Date().toISOString(),
    });
  }, []);

  // Export full learning progress as a JSON file
  const exportProgress = useCallback(() => {
    try {
      const exportPayload = {
        app: "backend-roadmap-platform",
        exportedAt: new Date().toISOString(),
        data,
      };
      const jsonString = JSON.stringify(exportPayload, null, 2);
      const blob = new Blob([jsonString], { type: "application/json;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      const dateStr = new Date().toISOString().split("T")[0];
      link.href = url;
      link.download = `backend-roadmap-progress-${dateStr}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Failed to export progress", err);
    }
  }, [data]);

  // Import progress from JSON string with validation
  const importProgress = useCallback((jsonString: string): { success: boolean; error?: string } => {
    try {
      const parsed = JSON.parse(jsonString);
      const rawData = parsed && typeof parsed === "object" && "data" in parsed ? parsed.data : parsed;
      const sanitized = sanitizeProgressData(rawData);

      // Validate that at least something sensible was provided
      if (
        !sanitized.completedTopics.length &&
        !sanitized.completedBooks.length &&
        !sanitized.completedCapstones.length &&
        !Object.keys(sanitized.notes).length
      ) {
        // Still allow empty valid data, but ensure it is not corrupt
      }

      setData(sanitized);
      return { success: true };
    } catch (err) {
      const message = err instanceof Error ? err.message : "Invalid JSON format";
      return { success: false, error: message };
    }
  }, []);

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
    completedCapstones: data.completedCapstones,
    capstoneSubmissions: data.capstoneSubmissions,
    notes: data.notes,
    isTopicCompleted: (id: string) => data.completedTopics.includes(id),
    isBookCompleted: (id: string) => data.completedBooks.includes(id),
    isCapstoneCompleted: (phaseId: number) => data.completedCapstones.includes(phaseId),
    getCapstoneSubmission: (phaseId: number) => data.capstoneSubmissions[phaseId] || "",
    getNote: (id: string) => data.notes[id] || "",
    toggleTopic,
    toggleBook,
    toggleCapstone,
    saveCapstoneSubmission,
    saveNote,
    resetProgress,
    exportProgress,
    importProgress,
    totalTopics,
    completedCount,
    overallPercentage,
    getPhaseProgress,
  };
}
