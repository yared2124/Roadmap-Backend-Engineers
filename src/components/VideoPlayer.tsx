"use client";

import React, { useState } from "react";
import { Youtube, Clock } from "lucide-react";
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

  const handleSeek = (seconds: number) => {
    setStartSeconds(seconds);
  };

  const embedUrl = startSeconds !== null
    ? `https://www.youtube-nocookie.com/embed/${youtubeId}?start=${startSeconds}&autoplay=1&rel=0&modestbranding=1`
    : `https://www.youtube-nocookie.com/embed/${youtubeId}?rel=0&modestbranding=1`;

  return (
    <div className="rounded-xl border border-zinc-200 bg-zinc-50/50 p-4 dark:border-zinc-800 dark:bg-zinc-950/50 shadow-sm">
      {/* Player Header Bar */}
      <div className="mb-3 flex items-center justify-between">
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

      {/* Video Chapter Timestamps (if available) */}
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
    </div>
  );
}
