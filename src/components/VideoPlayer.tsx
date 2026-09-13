"use client";

import React from "react";
import { Youtube } from "lucide-react";

interface VideoPlayerProps {
  youtubeId: string;
  title: string;
  duration: string;
}

export function VideoPlayer({ youtubeId, title, duration }: VideoPlayerProps) {
  return (
    <div className="rounded-xl border border-zinc-200 bg-zinc-50/50 p-4 dark:border-zinc-800 dark:bg-zinc-950/50 shadow-sm">
      {/* Player Header */}
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

      {/* 16:9 Aspect Ratio Responsive Player */}
      <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-zinc-200 bg-black dark:border-zinc-800 shadow-sm">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${youtubeId}?rel=0&modestbranding=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 h-full w-full border-0"
        />
      </div>
    </div>
  );
}
