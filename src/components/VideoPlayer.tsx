"use client";

import React from "react";
import { Youtube, Layers, PlayCircle, Clock } from "lucide-react";

export interface VideoInfo {
  youtubeId: string;
  title: string;
  duration: string;
  description?: string;
}

interface VideoPlayerProps {
  // Backwards-compatible simple props
  youtubeId?: string;
  title?: string;
  duration?: string;

  // Multi-video suite props
  primaryVideo?: VideoInfo;
  secondaryVideo?: VideoInfo;
}

export function VideoPlayer({
  youtubeId,
  title,
  duration,
  primaryVideo,
  secondaryVideo,
}: VideoPlayerProps) {
  // Determine effective primary video
  const effectivePrimary: VideoInfo = primaryVideo || {
    youtubeId: youtubeId || "",
    title: title || "Video Lecture",
    duration: duration || "",
  };

  const hasSecondary = Boolean(secondaryVideo && secondaryVideo.youtubeId);

  // =========================================================================
  // SCENARIO 1: TWO VIDEOS (SIDE-BY-SIDE 2-COLUMN GRID: FOUNDATION & DEEP DIVE)
  // =========================================================================
  if (hasSecondary && secondaryVideo) {
    return (
      <div className="space-y-4 rounded-2xl border border-zinc-200 bg-white p-5 sm:p-6 dark:border-[#2C2A26] dark:bg-[#1A1917] shadow-sm">
        {/* Main Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-100 pb-4 dark:border-[#262420]">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-600/10 text-red-600 dark:bg-red-500/20 dark:text-red-400 border border-red-500/20 shadow-2xs">
              <Youtube className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xs sm:text-sm font-mono font-bold uppercase tracking-wider text-zinc-950 dark:text-[#F3EFE6]">
                  Curated Video Masterclass Suite
                </h3>
                <span className="inline-flex items-center gap-1 rounded-full bg-stone-100 px-2.5 py-0.5 text-[11px] font-bold text-zinc-800 dark:bg-[#25231F] dark:text-[#D5CFBF] font-mono border border-zinc-200 dark:border-[#35332D]">
                  2-Part Sequence
                </span>
              </div>
              <p className="text-xs font-serif text-zinc-500 dark:text-[#A19B8F]">
                Watch the foundational architecture first (Part 1), then advance to the deep dive (Part 2).
              </p>
            </div>
          </div>
        </div>

        {/* Side-by-Side 2-Column Responsive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-1">
          {/* VIDEO 1: FOUNDATION (FIRST) */}
          <div className="flex flex-col justify-between rounded-xl border border-zinc-200/90 bg-stone-50/50 p-4 sm:p-5 dark:border-[#2E2B26] dark:bg-[#141312] shadow-2xs space-y-3.5">
            <div className="space-y-3">
              {/* Step indicator and metadata */}
              <div className="flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-md bg-zinc-950 px-2.5 py-1 text-[11px] font-mono font-bold text-white dark:bg-[#F3EFE6] dark:text-[#141312]">
                  <PlayCircle className="h-3 w-3" />
                  <span>01. START HERE</span>
                </span>
                <span className="inline-flex items-center gap-1 text-xs font-mono font-semibold text-zinc-500 dark:text-[#8E887B]">
                  <Clock className="h-3.5 w-3.5" />
                  <span>{effectivePrimary.duration}</span>
                </span>
              </div>

              <div>
                <h4 className="font-serif font-bold text-sm sm:text-base text-zinc-950 dark:text-[#F3EFE6] line-clamp-2 leading-snug">
                  {effectivePrimary.title}
                </h4>
                {effectivePrimary.description && (
                  <p className="text-xs text-zinc-600 dark:text-[#A19B8F] line-clamp-2 mt-1 font-sans">
                    {effectivePrimary.description}
                  </p>
                )}
              </div>
            </div>

            {/* 16:9 Responsive Player for Video 1 */}
            <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-zinc-200 bg-black dark:border-[#2C2A26] shadow-sm">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${effectivePrimary.youtubeId}?rel=0&modestbranding=1`}
                title={effectivePrimary.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="absolute inset-0 h-full w-full border-0"
              />
            </div>
          </div>

          {/* VIDEO 2: PRODUCTION DEEP DIVE (NEXT) */}
          <div className="flex flex-col justify-between rounded-xl border border-zinc-200/90 bg-stone-50/50 p-4 sm:p-5 dark:border-[#2E2B26] dark:bg-[#141312] shadow-2xs space-y-3.5">
            <div className="space-y-3">
              {/* Step indicator and metadata */}
              <div className="flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-md border border-zinc-300 dark:border-[#35332D] bg-white dark:bg-[#201F1B] px-2.5 py-1 text-[11px] font-mono font-bold text-zinc-800 dark:text-[#D5CFBF]">
                  <Layers className="h-3 w-3" />
                  <span>02. NEXT • DEEP DIVE</span>
                </span>
                <span className="inline-flex items-center gap-1 text-xs font-mono font-semibold text-zinc-500 dark:text-[#8E887B]">
                  <Clock className="h-3.5 w-3.5" />
                  <span>{secondaryVideo.duration}</span>
                </span>
              </div>

              <div>
                <h4 className="font-serif font-bold text-sm sm:text-base text-zinc-950 dark:text-[#F3EFE6] line-clamp-2 leading-snug">
                  {secondaryVideo.title}
                </h4>
                {secondaryVideo.description && (
                  <p className="text-xs text-zinc-600 dark:text-[#A19B8F] line-clamp-2 mt-1 font-sans">
                    {secondaryVideo.description}
                  </p>
                )}
              </div>
            </div>

            {/* 16:9 Responsive Player for Video 2 */}
            <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-zinc-200 bg-black dark:border-[#2C2A26] shadow-sm">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${secondaryVideo.youtubeId}?rel=0&modestbranding=1`}
                title={secondaryVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="absolute inset-0 h-full w-full border-0"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // SCENARIO 2: SINGLE VIDEO (CLEAN FULL-WIDTH PLAYER)
  // =========================================================================
  return (
    <div className="space-y-4 rounded-2xl border border-zinc-200 bg-white p-4 sm:p-5 dark:border-[#2C2A26] dark:bg-[#1A1917] shadow-sm">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-600/10 text-red-600 dark:bg-red-500/20 dark:text-red-400 border border-red-500/20 shadow-2xs">
            <Youtube className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xs sm:text-sm font-mono font-bold uppercase tracking-wider text-zinc-950 dark:text-[#F3EFE6]">
                Curated Video Masterclass
              </h3>
            </div>
            <p className="text-xs font-serif text-zinc-500 dark:text-[#A19B8F]">
              Authoritative senior-level video lecture
            </p>
          </div>
        </div>

        {effectivePrimary.duration && (
          <div className="flex items-center gap-1 text-xs font-mono font-semibold text-zinc-500 dark:text-[#8E887B]">
            <Clock className="h-3.5 w-3.5" />
            <span>{effectivePrimary.duration}</span>
          </div>
        )}
      </div>

      {/* 16:9 Aspect Ratio Responsive Player */}
      <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-zinc-200 bg-black dark:border-[#2C2A26] shadow-md">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${effectivePrimary.youtubeId}?rel=0&modestbranding=1`}
          title={effectivePrimary.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 h-full w-full border-0"
        />
      </div>

      {/* Video Title and Description */}
      <div className="rounded-xl border border-zinc-100 bg-stone-50/60 p-3.5 sm:p-4 dark:border-[#262420] dark:bg-[#141312]">
        <h4 className="text-sm sm:text-base font-serif font-bold text-zinc-950 dark:text-[#F3EFE6]">
          {effectivePrimary.title}
        </h4>
        {effectivePrimary.description && (
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-[#A19B8F] mt-1 font-sans leading-relaxed">
            {effectivePrimary.description}
          </p>
        )}
      </div>
    </div>
  );
}
