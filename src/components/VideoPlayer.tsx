"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  ExternalLink,
  Youtube,
  Clock,
  Maximize2,
  Minimize2,
  Volume2,
  VolumeX,
  Gauge,
  Sliders,
  Expand,
  X,
} from "lucide-react";
import { CHANNEL_URL, CHANNEL_NAME } from "../data/roadmap";
import { VideoTimestamp } from "../types/roadmap";

interface VideoPlayerProps {
  youtubeId: string;
  title: string;
  duration: string;
  timestamps?: VideoTimestamp[];
}

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

export function VideoPlayer({
  youtubeId,
  title,
  duration,
  timestamps,
}: VideoPlayerProps) {
  const [startSeconds, setStartSeconds] = useState<number | null>(null);
  const [isTheater, setIsTheater] = useState(false);
  const [currentSpeed, setCurrentSpeed] = useState<number>(1);
  const [isMuted, setIsMuted] = useState(false);
  const [playerReady, setPlayerReady] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<any>(null);
  const iframeContainerId = `yt-player-${youtubeId.replace(/[^a-zA-Z0-9_-]/g, "")}`;

  // Load YouTube IFrame API
  useEffect(() => {
    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag?.parentNode?.insertBefore(tag, firstScriptTag);
    }

    const initPlayer = () => {
      if (window.YT && window.YT.Player) {
        try {
          if (playerRef.current) {
            playerRef.current.destroy();
          }
          playerRef.current = new window.YT.Player(iframeContainerId, {
            videoId: youtubeId,
            playerVars: {
              autoplay: startSeconds ? 1 : 0,
              start: startSeconds || 0,
              rel: 0,
              modestbranding: 1,
              enablejsapi: 1,
            },
            events: {
              onReady: (event: any) => {
                setPlayerReady(true);
                if (currentSpeed !== 1) {
                  event.target.setPlaybackRate(currentSpeed);
                }
              },
            },
          });
        } catch (e) {
          console.error("Error initializing YT Player", e);
        }
      }
    };

    if (window.YT && window.YT.Player) {
      initPlayer();
    } else {
      window.onYouTubeIframeAPIReady = initPlayer;
    }

    return () => {
      if (playerRef.current) {
        try {
          playerRef.current.destroy();
        } catch {}
      }
    };
  }, [youtubeId]);

  // Handle Seek
  const handleSeek = (seconds: number) => {
    setStartSeconds(seconds);
    if (playerRef.current && typeof playerRef.current.seekTo === "function") {
      playerRef.current.seekTo(seconds, true);
      playerRef.current.playVideo();
    }
  };

  // Handle Speed Change
  const handleSpeedChange = (speed: number) => {
    setCurrentSpeed(speed);
    if (playerRef.current && typeof playerRef.current.setPlaybackRate === "function") {
      playerRef.current.setPlaybackRate(speed);
    }
  };

  // Handle Mute Toggle
  const handleToggleMute = () => {
    if (playerRef.current) {
      if (isMuted) {
        playerRef.current.unMute();
        setIsMuted(false);
      } else {
        playerRef.current.mute();
        setIsMuted(true);
      }
    }
  };

  // Handle Native Fullscreen
  const handleNativeFullscreen = () => {
    const el = document.getElementById(iframeContainerId);
    if (el) {
      if (el.requestFullscreen) {
        el.requestFullscreen();
      } else if ((el as any).webkitRequestFullscreen) {
        (el as any).webkitRequestFullscreen();
      }
    }
  };

  const watchUrl = startSeconds
    ? `https://www.youtube.com/watch?v=${youtubeId}&t=${startSeconds}s`
    : `https://www.youtube.com/watch?v=${youtubeId}`;

  return (
    <div
      ref={containerRef}
      className={`transition-all duration-300 ${
        isTheater
          ? "fixed inset-0 z-50 flex flex-col justify-center bg-black/95 p-4 sm:p-8 backdrop-blur-md"
          : "rounded-xl border border-zinc-200 bg-zinc-50/50 p-4 dark:border-zinc-800 dark:bg-zinc-950/50 shadow-sm"
      }`}
    >
      {/* Player Header Bar */}
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

        {/* Action Controls Bar */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Maximize / Minimize Theater Mode Toggle */}
          <button
            onClick={() => setIsTheater(!isTheater)}
            className="inline-flex items-center gap-1.5 rounded-md border border-zinc-300 bg-white px-2.5 py-1 text-xs font-medium text-zinc-800 hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800 transition-colors"
            title={isTheater ? "Minimize (Return to normal view)" : "Maximize (Theater expanded view)"}
          >
            {isTheater ? (
              <>
                <Minimize2 className="h-3.5 w-3.5" />
                <span>Minimize</span>
              </>
            ) : (
              <>
                <Maximize2 className="h-3.5 w-3.5" />
                <span>Maximize</span>
              </>
            )}
          </button>

          {/* Fullscreen Button */}
          <button
            onClick={handleNativeFullscreen}
            className="inline-flex items-center gap-1 rounded-md border border-zinc-300 bg-white px-2.5 py-1 text-xs font-medium text-zinc-800 hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800 transition-colors"
            title="Native Fullscreen"
          >
            <Expand className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Fullscreen</span>
          </button>

          {/* Channel Link */}
          <a
            href={CHANNEL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 rounded-md border border-zinc-300 bg-white px-2.5 py-1 text-xs font-medium text-zinc-700 hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 transition-colors"
          >
            <span>{CHANNEL_NAME}</span>
            <ExternalLink className="h-3 w-3" />
          </a>

          {/* Watch on YouTube Link */}
          <a
            href={watchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-md bg-black px-2.5 py-1 text-xs font-medium text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200 transition-colors"
          >
            <span>Open in YouTube</span>
            <ExternalLink className="h-3 w-3" />
          </a>

          {isTheater && (
            <button
              onClick={() => setIsTheater(false)}
              className="ml-2 rounded-full p-1 text-white hover:bg-zinc-800"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>

      {/* 16:9 Aspect Ratio Container */}
      <div
        className={`relative w-full overflow-hidden rounded-lg border border-zinc-200 bg-black dark:border-zinc-800 shadow-sm ${
          isTheater ? "max-h-[75vh] max-w-5xl mx-auto aspect-video" : "aspect-video"
        }`}
      >
        <div id={iframeContainerId} className="absolute inset-0 h-full w-full" />
      </div>

      {/* Built-in Settings Control Bar (Speed, Volume, Audio) */}
      <div className="mt-3 flex flex-wrap items-center justify-between gap-3 border-t border-zinc-200/70 pt-3 dark:border-zinc-800/70">
        {/* Playback Speed Controller */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 text-xs font-mono font-semibold text-zinc-700 dark:text-zinc-300">
            <Gauge className="h-3.5 w-3.5 text-zinc-500" />
            <span>Speed:</span>
          </div>
          <div className="flex items-center gap-1">
            {[0.75, 1, 1.25, 1.5, 1.75, 2].map((rate) => (
              <button
                key={rate}
                onClick={() => handleSpeedChange(rate)}
                className={`rounded px-2 py-0.5 font-mono text-[11px] font-medium transition-colors ${
                  currentSpeed === rate
                    ? "bg-black text-white dark:bg-white dark:text-black font-bold"
                    : "border border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
                }`}
              >
                {rate}x
              </button>
            ))}
          </div>
        </div>

        {/* Audio / Volume Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleToggleMute}
            className="inline-flex items-center gap-1.5 rounded-md border border-zinc-200 bg-white px-2.5 py-1 text-xs font-medium text-zinc-700 hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 transition-colors"
          >
            {isMuted ? (
              <>
                <VolumeX className="h-3.5 w-3.5 text-rose-500" />
                <span>Unmute</span>
              </>
            ) : (
              <>
                <Volume2 className="h-3.5 w-3.5" />
                <span>Mute Audio</span>
              </>
            )}
          </button>
        </div>
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
