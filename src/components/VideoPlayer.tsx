"use client";

import React, { useState } from "react";
import { Youtube, Layers, PlayCircle, ArrowRight } from "lucide-react";

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
  const [activeTab, setActiveTab] = useState<"part1" | "part2">("part1");

  // Determine effective primary video
  const effectivePrimary: VideoInfo = primaryVideo || {
    youtubeId: youtubeId || "",
    title: title || "Video Lecture",
    duration: duration || "",
  };

  const hasSecondary = Boolean(secondaryVideo && secondaryVideo.youtubeId);
  const activeVideo = activeTab === "part1" || !hasSecondary ? effectivePrimary : secondaryVideo!;

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-4 sm:p-5 dark:border-gray-700 dark:bg-gray-800 shadow-sm space-y-4">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-600/10 text-red-600 dark:bg-red-500/20 dark:text-red-400 border border-red-500/20 shadow-2xs">
            <Youtube className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xs sm:text-sm font-mono font-bold uppercase tracking-wider text-zinc-950 dark:text-white">
                Curated Video Masterclass
              </h3>
              {hasSecondary && (
                <span className="inline-flex items-center gap-1 rounded-full bg-indigo-100/80 px-2.5 py-0.5 text-[10.5px] font-bold text-indigo-900 dark:bg-indigo-950/80 dark:text-indigo-200 font-mono border border-indigo-200 dark:border-indigo-800">
                  2-Part Deep Dive
                </span>
              )}
            </div>
            <p className="text-xs font-medium text-zinc-500 dark:text-gray-400">
              {hasSecondary
                ? "Switch between foundational principles and hands-on production engineering"
                : "Authoritative senior-level video lecture"}
            </p>
          </div>
        </div>

        {/* Video Tab Switcher (When 2 videos are present) */}
        {hasSecondary && secondaryVideo && (
          <div className="inline-flex rounded-xl border border-zinc-200 bg-zinc-100/90 p-1 dark:border-gray-700 dark:bg-gray-800/90 shrink-0 shadow-2xs">
            <button
              type="button"
              onClick={() => setActiveTab("part1")}
              className={`flex items-center gap-2 rounded-lg px-3.5 py-1.5 text-xs sm:text-[13px] font-bold transition-all ${
                activeTab === "part1"
                  ? "bg-zinc-950 text-white shadow-xs dark:bg-white dark:text-gray-950"
                  : "text-zinc-600 hover:text-zinc-950 dark:text-gray-400 dark:hover:text-zinc-100"
              }`}
            >
              <PlayCircle className="h-3.5 w-3.5" />
              <span>Part 1: Architecture</span>
              <span
                className={`font-mono text-[10.5px] px-1.5 py-0.5 rounded-md ${
                  activeTab === "part1"
                    ? "bg-zinc-800 text-zinc-200 dark:bg-gray-200 dark:text-zinc-800"
                    : "bg-zinc-200/80 text-zinc-700 dark:bg-gray-700 dark:text-gray-300"
                }`}
              >
                {effectivePrimary.duration}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("part2")}
              className={`flex items-center gap-2 rounded-lg px-3.5 py-1.5 text-xs sm:text-[13px] font-bold transition-all ${
                activeTab === "part2"
                  ? "bg-zinc-950 text-white shadow-xs dark:bg-white dark:text-gray-950"
                  : "text-zinc-600 hover:text-zinc-950 dark:text-gray-400 dark:hover:text-zinc-100"
              }`}
            >
              <Layers className="h-3.5 w-3.5" />
              <span>Part 2: Deep Dive</span>
              <span
                className={`font-mono text-[10.5px] px-1.5 py-0.5 rounded-md ${
                  activeTab === "part2"
                    ? "bg-zinc-800 text-zinc-200 dark:bg-gray-200 dark:text-zinc-800"
                    : "bg-zinc-200/80 text-zinc-700 dark:bg-gray-700 dark:text-gray-300"
                }`}
              >
                {secondaryVideo.duration}
              </span>
            </button>
          </div>
        )}
      </div>

      {/* 16:9 Aspect Ratio Responsive Player */}
      <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-zinc-200 bg-black dark:border-gray-700 shadow-md">
        <iframe
          key={activeVideo.youtubeId}
          src={`https://www.youtube-nocookie.com/embed/${activeVideo.youtubeId}?rel=0&modestbranding=1`}
          title={activeVideo.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 h-full w-full border-0"
        />
      </div>

      {/* Active Video Meta & Quick Switcher Footer */}
      <div className="rounded-xl border border-zinc-100 bg-zinc-50/70 p-3.5 sm:p-4 dark:border-zinc-900 dark:bg-gray-800/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-mono text-[11px] font-extrabold uppercase tracking-wider text-zinc-500 dark:text-gray-400">
              {activeTab === "part1" || !hasSecondary ? "Part 1 Lecture" : "Part 2 Lab / Deep Dive"}
            </span>
            <span className="text-zinc-300 dark:text-zinc-700">•</span>
            <span className="font-mono text-xs font-bold text-zinc-700 dark:text-gray-300">
              {activeVideo.duration}
            </span>
          </div>
          <h4 className="text-sm sm:text-[14.5px] font-bold text-zinc-950 dark:text-white">
            {activeVideo.title}
          </h4>
          {activeVideo.description && (
            <p className="text-xs sm:text-[13px] text-zinc-600 dark:text-gray-300 leading-relaxed font-medium pt-0.5">
              {activeVideo.description}
            </p>
          )}
        </div>

        {hasSecondary && (
          <button
            type="button"
            onClick={() => setActiveTab(activeTab === "part1" ? "part2" : "part1")}
            className="inline-flex items-center gap-1.5 text-xs font-bold font-mono text-zinc-700 hover:text-black dark:text-gray-300 dark:hover:text-white transition-colors shrink-0 sm:self-center border border-zinc-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3.5 py-2 rounded-lg shadow-2xs"
          >
            <span>
              {activeTab === "part1"
                ? "Switch to Part 2 Deep Dive"
                : "Back to Part 1 Architecture"}
            </span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        )}
      </div>
    </div>
  );
}
