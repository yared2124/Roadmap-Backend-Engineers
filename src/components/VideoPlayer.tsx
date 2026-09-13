"use client";

import React, { useState } from "react";
import { Play, ExternalLink, Youtube, Clock } from "lucide-react";
import { CHANNEL_URL, CHANNEL_NAME } from "../data/roadmap";
import { VideoTimestamp } from "../types/roadmap";

interface VideoPlayerProps {
  youtubeId: string;
  title: string;
  duration: string;
  timestamps?: VideoTimestamp[];
}

export function VideoPlayer({
  youtubeId,
  title,
  duration,
  timestamps,
}: VideoPlayerProps) {
  const [startSeconds, setStartSeconds] = useState<number | null>(null);
  const watchUrl = startSeconds
    ? `https://www.youtube.com/watch?v=${youtubeId}&t=${startSeconds}s`
    : `https://www.youtube.com/watch?v=${youtubeId}`;

  const embedUrl = startSeconds !== null
    ? `https://www.youtube-nocookie.com/embed/${youtubeId}?start=${startSeconds}&autoplay=1&rel=0&modestbranding=1&enablejsapi=1`
    : `https://www.youtube-nocookie.com/embed/${youtubeId}?rel=0&modestbranding=1&enablejsapi=1`;

  const handleSeek = (seconds: number) => {
    setStartSeconds(seconds);
  };

  return (
    <div className="rounded-xl border border-zinc-200 bg-zinc-50/50 p-4 dark:border-zinc-800 dark:bg-zinc-950/50">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Youtube className="h-4 w-4 text-zinc-900 dark:text-white" />
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
            Video Lecture
          </span>
          <span className="text-zinc-400">•</span>
          <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
            {duration}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <a
            href={CHANNEL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-md border border-zinc-300 bg-white px-2.5 py-1 text-xs font-medium text-zinc-700 hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 transition-colors"
          >
            <span>{CHANNEL_NAME}</span>
            <ExternalLink className="h-3 w-3" />
          </a>
          <a
            href={watchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-md bg-black px-2.5 py-1 text-xs font-medium text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200 transition-colors"
          >
            <span>Watch on YouTube</span>
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </div>

      {/* 16:9 Aspect Ratio Container */}
      <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-zinc-200 bg-black dark:border-zinc-800 shadow-sm">
        <iframe
          key={`${youtubeId}-${startSeconds}`}
          src={embedUrl}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 h-full w-full border-0"
        />
      </div>

      {/* Video Chapter Timestamps */}
      {timestamps && timestamps.length > 0 && (
        <div className="mt-3 border-t border-zinc-200/60 pt-3 dark:border-zinc-800/60">
          <div className="mb-2 flex items-center gap-1.5 text-xs font-mono font-semibold text-zinc-700 dark:text-zinc-300">
            <Clock className="h-3.5 w-3.5 text-zinc-500" />
            <span>Interactive Video Chapters (Click to Jump):</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {timestamps.map((ts, idx) => {
              const isActive = startSeconds === ts.seconds;
              return (
                <button
                  key={idx}
                  onClick={() => handleSeek(ts.seconds)}
                  className={`inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-xs font-mono transition-all ${
                    isActive
                      ? "border-black bg-black text-white dark:border-white dark:bg-white dark:text-black shadow-sm"
                      : "border-zinc-200 bg-white text-zinc-700 hover:border-zinc-400 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:border-zinc-600"
                  }`}
                >
                  <span className="font-bold">{ts.timeFormatted}</span>
                  <span className="text-[11px] font-sans opacity-90">{ts.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Player Pro-Tips & Shortcuts Bar */}
      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-zinc-200/60 pt-3 text-[11px] text-zinc-500 dark:border-zinc-800/60 dark:text-zinc-400">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 font-mono">
            <kbd className="rounded border border-zinc-200 bg-white px-1 py-0.5 text-[10px] dark:border-zinc-800 dark:bg-zinc-900">
              Space
            </kbd>{" "}
            Play/Pause
          </span>
          <span className="flex items-center gap-1 font-mono">
            <kbd className="rounded border border-zinc-200 bg-white px-1 py-0.5 text-[10px] dark:border-zinc-800 dark:bg-zinc-900">
              Shift + &gt;
            </kbd>{" "}
            Speed Up
          </span>
          <span className="flex items-center gap-1 font-mono">
            <kbd className="rounded border border-zinc-200 bg-white px-1 py-0.5 text-[10px] dark:border-zinc-800 dark:bg-zinc-900">
              F
            </kbd>{" "}
            Fullscreen
          </span>
        </div>
        <span className="italic">
          Tip: Click any chapter badge above to seek directly to that topic.
        </span>
      </div>
    </div>
  );
}
