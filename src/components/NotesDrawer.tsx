"use client";

import React, { useState, useEffect } from "react";
import { Edit3, Save, Check } from "lucide-react";

interface NotesDrawerProps {
  topicId: string;
  initialNote: string;
  onSaveNote: (topicId: string, note: string) => void;
}

export function NotesDrawer({ topicId, initialNote, onSaveNote }: NotesDrawerProps) {
  const [note, setNote] = useState(initialNote);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setNote(initialNote);
  }, [topicId, initialNote]);

  const handleSave = () => {
    onSaveNote(topicId, note);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Edit3 className="h-4 w-4 text-zinc-900 dark:text-white" />
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-zinc-900 dark:text-white">
            Personal Notes & GitHub Repo Link
          </span>
        </div>
        <button
          onClick={handleSave}
          className="inline-flex items-center gap-1.5 rounded-md bg-zinc-900 px-3 py-1 text-xs font-medium text-white hover:bg-black dark:bg-zinc-100 dark:text-black dark:hover:bg-white transition-colors"
        >
          {saved ? (
            <>
              <Check className="h-3.5 w-3.5" />
              <span>Saved Locally</span>
            </>
          ) : (
            <>
              <Save className="h-3.5 w-3.5" />
              <span>Save Note</span>
            </>
          )}
        </button>
      </div>

      <textarea
        rows={4}
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Paste your GitHub repository link, implementation notes, or architectural questions here (persisted in your browser)..."
        className="w-full rounded-lg border border-zinc-200 bg-zinc-50/50 p-3 font-mono text-xs text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-400 focus:bg-white focus:outline-none dark:border-zinc-800 dark:bg-zinc-900/50 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-zinc-600 transition-colors"
      />
    </div>
  );
}
