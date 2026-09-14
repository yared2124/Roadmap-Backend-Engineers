"use client";

import React from "react";
import { BookOpen, Check, BookmarkCheck, ExternalLink } from "lucide-react";
import { RecommendedBook } from "../types/roadmap";

interface BookCardProps {
  book: RecommendedBook;
  isRead: boolean;
  onToggleRead: () => void;
}

export function BookCard({ book, isRead, onToggleRead }: BookCardProps) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-linear-to-br from-white to-zinc-50/60 p-6 dark:border-zinc-800 dark:from-zinc-950 dark:to-zinc-900/60 shadow-sm transition-all space-y-4">
      <div className="flex items-start justify-between gap-4 flex-wrap sm:flex-nowrap">
        <div className="flex items-start gap-3.5">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-zinc-200 bg-zinc-100 text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 shadow-2xs">
            <BookOpen className="h-6 w-6" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono text-xs font-black uppercase tracking-wider text-indigo-700 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/80 px-2 py-0.5 rounded-md">
                Authoritative Literature
              </span>
            </div>
            <h4 className="text-lg sm:text-xl font-black text-zinc-950 dark:text-zinc-50 tracking-tight">
              {book.title}
            </h4>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 font-medium mt-0.5">
              by <span className="font-bold text-zinc-900 dark:text-zinc-100">{book.author}</span>
            </p>
          </div>
        </div>

        {/* Read Actions */}
        <div className="flex items-center gap-2.5 shrink-0">
          {book.readingUrl && (
            <a
              href={book.readingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-xl border border-zinc-300 bg-white px-4 py-2 text-xs font-bold text-zinc-900 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800 transition-colors shadow-xs"
            >
              <span>Read Online</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          )}
          <button
            onClick={onToggleRead}
            className={`flex items-center gap-1.5 rounded-xl border px-4 py-2 text-xs font-bold transition-all shadow-xs ${
              isRead
                ? "border-zinc-950 bg-zinc-950 text-white dark:border-white dark:bg-white dark:text-black"
                : "border-zinc-300 bg-zinc-50 text-zinc-800 hover:border-zinc-500 hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200"
            }`}
          >
            {isRead ? (
              <>
                <Check className="h-4 w-4 stroke-[3]" />
                <span>Chapter Read</span>
              </>
            ) : (
              <>
                <BookmarkCheck className="h-4 w-4" />
                <span>Mark Chapter Read</span>
              </>
            )}
          </button>
        </div>
      </div>

      <div className="space-y-3 border-t border-zinc-100 pt-4 dark:border-zinc-800/80 text-sm leading-relaxed">
        <div className="rounded-xl border border-indigo-200/80 bg-indigo-50/50 p-3.5 dark:border-indigo-900/50 dark:bg-indigo-950/30">
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-indigo-900 dark:text-indigo-300 block mb-1">
            Assigned Reading Chapter:
          </span>
          <span className="text-sm sm:text-[15px] font-bold text-indigo-950 dark:text-indigo-200">
            {book.keyChapters}
          </span>
        </div>
        <div className="px-1">
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100 block mb-1">
            Why Read This:
          </span>
          <p className="text-sm leading-relaxed text-zinc-800 dark:text-zinc-200">
            {book.whyReadThis}
          </p>
        </div>
      </div>
    </div>
  );
}
