"use client";

import React from "react";
import { BookOpen, Check, BookmarkCheck } from "lucide-react";
import { RecommendedBook } from "../types/roadmap";

interface BookCardProps {
  book: RecommendedBook;
  isRead: boolean;
  onToggleRead: () => void;
}

export function BookCard({ book, isRead, onToggleRead }: BookCardProps) {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950 shadow-sm transition-all">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900">
            <BookOpen className="h-5 w-5 text-zinc-900 dark:text-zinc-100" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                Authoritative Literature
              </span>
            </div>
            <h4 className="text-base font-bold text-zinc-900 dark:text-white">
              {book.title}
            </h4>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              by <span className="font-medium text-zinc-800 dark:text-zinc-200">{book.author}</span>
            </p>
          </div>
        </div>

        {/* Read Checklist Button */}
        <button
          onClick={onToggleRead}
          className={`flex shrink-0 items-center gap-1.5 rounded-md border px-3 py-1.5 text-xs font-medium transition-colors ${
            isRead
              ? "border-zinc-900 bg-zinc-900 text-white dark:border-white dark:bg-white dark:text-black"
              : "border-zinc-300 bg-zinc-50 text-zinc-700 hover:border-zinc-400 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300"
          }`}
        >
          {isRead ? (
            <>
              <Check className="h-3.5 w-3.5" />
              <span>Chapter Read</span>
            </>
          ) : (
            <>
              <BookmarkCheck className="h-3.5 w-3.5" />
              <span>Mark Read</span>
            </>
          )}
        </button>
      </div>

      <div className="mt-4 space-y-2 border-t border-zinc-100 pt-3 dark:border-zinc-900 text-xs">
        <div>
          <span className="font-mono font-semibold text-zinc-900 dark:text-zinc-200">
            Assigned Reading:{" "}
          </span>
          <span className="text-zinc-700 dark:text-zinc-300 font-medium">
            {book.keyChapters}
          </span>
        </div>
        <div>
          <span className="font-mono font-semibold text-zinc-900 dark:text-zinc-200">
            Why Read This:{" "}
          </span>
          <span className="text-zinc-600 dark:text-zinc-400">
            {book.whyReadThis}
          </span>
        </div>
      </div>
    </div>
  );
}
