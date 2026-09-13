"use client";

import React, { useState } from "react";
import { Play, ExternalLink, Gauge, Volume2, Maximize, Youtube } from "lucide-react";
import { CHANNEL_URL, CHANNEL_NAME } from "../data/roadmap";

interface VideoPlayerProps {
  youtubeId: string;
  title: string;
  duration: string;
}

export function VideoPlayer({ youtubeId, title, duration }: VideoPlayerProps) {
  const [playbackRate, setPlaybackRate] = useState<string>("1");
  const watchUrl = `https://www.youtube.com/watch?v=${youtubeId}`;

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
          src={`https://www.youtube-nocookie.com/embed/${youtubeId}?rel=0&modestbranding=1&enablejsapi=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 h-full w-full border-0"
        />
      </div>

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
          Tip: 1.25x – 1.5x speed is recommended for rapid concept acquisition.
        </span>
      </div>
    </div>
  );
}
