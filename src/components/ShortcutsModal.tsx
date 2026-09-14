"use client";

import React, { useEffect } from "react";
import { X, Keyboard } from "lucide-react";

interface ShortcutsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ShortcutItem {
  keys: string[];
  description: string;
  category: "Navigation" | "Action" | "Study Tools";
}

const SHORTCUTS: ShortcutItem[] = [
  { keys: ["Ctrl", "K"], description: "Open Command Palette & Global Search", category: "Navigation" },
  { keys: ["J", "or", "→"], description: "Navigate to Next Module", category: "Navigation" },
  { keys: ["K", "or", "←"], description: "Navigate to Previous Module", category: "Navigation" },
  { keys: ["M"], description: "Toggle Module Completion status", category: "Action" },
  { keys: ["B"], description: "Toggle Recommended Book Read status", category: "Action" },
  { keys: ["T"], description: "Toggle Dark / Light Theme", category: "Action" },
  { keys: ["N"], description: "Jump to & Focus Topic Notes Studio", category: "Study Tools" },
  { keys: ["?"], description: "Open / Close this Shortcuts Cheat-sheet", category: "Study Tools" },
  { keys: ["Esc"], description: "Close active modal or search palette", category: "Navigation" },
];

export function ShortcutsModal({ isOpen, onClose }: ShortcutsModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const categories = ["Navigation", "Action", "Study Tools"] as const;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-lg rounded-2xl border border-zinc-200 bg-white p-6 shadow-2xl dark:border-zinc-800 dark:bg-zinc-950 transition-all">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-zinc-100 dark:border-zinc-800/80">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
              <Keyboard className="h-5 w-5 text-zinc-800 dark:text-zinc-200" />
            </div>
            <div>
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 text-base">
                Keyboard Shortcuts
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Navigate the roadmap like a senior engineer
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-800 dark:hover:text-zinc-200 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Shortcuts List by Category */}
        <div className="mt-4 space-y-5 max-h-[60vh] overflow-y-auto pr-1">
          {categories.map((category) => {
            const items = SHORTCUTS.filter((s) => s.category === category);
            return (
              <div key={category} className="space-y-2">
                <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                  {category}
                </span>
                <div className="space-y-1.5">
                  {items.map((shortcut, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between rounded-lg px-2.5 py-1.5 hover:bg-zinc-50 dark:hover:bg-zinc-900/60 transition-colors"
                    >
                      <span className="text-xs text-zinc-700 dark:text-zinc-300">
                        {shortcut.description}
                      </span>
                      <div className="flex items-center gap-1 shrink-0">
                        {shortcut.keys.map((k, kIdx) =>
                          k === "or" ? (
                            <span
                              key={kIdx}
                              className="text-[10px] text-zinc-400 dark:text-zinc-500 px-0.5"
                            >
                              or
                            </span>
                          ) : (
                            <kbd
                              key={kIdx}
                              className="inline-flex min-w-[22px] items-center justify-center rounded border border-zinc-300 bg-zinc-100 px-1.5 py-0.5 font-mono text-[11px] font-medium text-zinc-800 shadow-xs dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200"
                            >
                              {k}
                            </kbd>
                          )
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer info */}
        <div className="mt-6 pt-3 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between text-[11px] text-zinc-400">
          <span>Shortcuts disabled while typing in text inputs</span>
          <kbd className="rounded border border-zinc-200 dark:border-zinc-800 px-1.5 py-0.5 font-mono text-[10px] text-zinc-500">
            Esc to dismiss
          </kbd>
        </div>
      </div>
    </div>
  );
}
