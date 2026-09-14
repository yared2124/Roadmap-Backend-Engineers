"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  Compass,
  Rocket,
  PlayCircle,
  BookOpen,
  Mic,
  Code2,
  CheckCircle2,
  Layers,
  ArrowRight,
  FileText,
  Lightbulb,
  Award,
  Terminal,
  Clock,
  Sparkles,
  ShieldCheck,
  Cpu,
  Database,
  Server,
  Zap,
} from "lucide-react";
import { ROADMAP_PHASES } from "../data/roadmap";
import { CAPSTONE_PROJECTS } from "../data/capstones";

interface RoadmapGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartCourse: () => void;
  onExploreCapstones: () => void;
  currentTopicTitle?: string;
  currentTopicNumber?: number;
}

type GuideTab = "roadmap" | "how-to-study" | "what-to-say" | "what-to-build";

export function RoadmapGuideModal({
  isOpen,
  onClose,
  onStartCourse,
  onExploreCapstones,
  currentTopicTitle = "Backend from First Principles",
  currentTopicNumber = 1,
}: RoadmapGuideModalProps) {
  const [activeTab, setActiveTab] = useState<GuideTab>("roadmap");

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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog Container */}
      <div className="relative flex flex-col w-full max-w-4xl max-h-[92vh] rounded-2xl border border-zinc-200 bg-white shadow-2xl dark:border-zinc-800 dark:bg-zinc-950 overflow-hidden text-zinc-900 dark:text-zinc-100 transition-all">
        {/* Top Header Banner */}
        <div className="relative shrink-0 border-b border-zinc-200 bg-gradient-to-r from-zinc-900 via-zinc-950 to-zinc-900 p-5 sm:p-6 text-white dark:border-zinc-800">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Student Success & Orientation Blueprint • የተማሪዎች መመሪያ</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white">
                ሮድማፑን እንዴት እንደምትጠቀም፣ ምን እንደምትሰራ እና ምን እንደምትናገር
              </h2>
              <p className="text-xs sm:text-sm text-zinc-300 font-medium">
                How this curriculum works, the 5-step daily routine, oral whiteboard interview mastery, and 7 portfolio capstones.
              </p>
            </div>

            <button
              onClick={onClose}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white transition-colors"
              aria-label="Close Guide"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="mt-5 flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            <button
              onClick={() => setActiveTab("roadmap")}
              className={`flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs sm:text-sm font-semibold transition-all shrink-0 ${
                activeTab === "roadmap"
                  ? "bg-white text-zinc-950 shadow-md"
                  : "bg-white/10 text-zinc-300 hover:bg-white/15 hover:text-white"
              }`}
            >
              <Compass className="h-4 w-4" />
              <span>1. ሮድማፑ እንዴት እንደሆነ (Curriculum Structure)</span>
            </button>

            <button
              onClick={() => setActiveTab("how-to-study")}
              className={`flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs sm:text-sm font-semibold transition-all shrink-0 ${
                activeTab === "how-to-study"
                  ? "bg-white text-zinc-950 shadow-md"
                  : "bg-white/10 text-zinc-300 hover:bg-white/15 hover:text-white"
              }`}
            >
              <Zap className="h-4 w-4" />
              <span>2. ምን እንደምታደርግ (5-Step Routine)</span>
            </button>

            <button
              onClick={() => setActiveTab("what-to-say")}
              className={`flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs sm:text-sm font-semibold transition-all shrink-0 ${
                activeTab === "what-to-say"
                  ? "bg-white text-zinc-950 shadow-md"
                  : "bg-white/10 text-zinc-300 hover:bg-white/15 hover:text-white"
              }`}
            >
              <Mic className="h-4 w-4" />
              <span>3. ምን እንደምትናገር (Whiteboard Interview)</span>
            </button>

            <button
              onClick={() => setActiveTab("what-to-build")}
              className={`flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs sm:text-sm font-semibold transition-all shrink-0 ${
                activeTab === "what-to-build"
                  ? "bg-white text-zinc-950 shadow-md"
                  : "bg-white/10 text-zinc-300 hover:bg-white/15 hover:text-white"
              }`}
            >
              <Terminal className="h-4 w-4" />
              <span>4. ምን እንደምትሰራ (7 Capstone Projects)</span>
            </button>
          </div>
        </div>

        {/* Scrollable Tab Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-6 text-sm">
          {/* TAB 1: THE ROADMAP STRUCTURE */}
          {activeTab === "roadmap" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5 dark:border-zinc-800 dark:bg-zinc-900/50">
                <h3 className="text-base font-bold text-zinc-950 dark:text-zinc-50 flex items-center gap-2">
                  <Compass className="h-5 w-5 text-indigo-500" />
                  የሮድማፑ አወቃቀርና የዕድገት ጉዞ (The Engineering Trajectory)
                </h3>
                <p className="mt-2 text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  ይህ ሮድማፕ ተራ የቪዲዮ ክምችት አይደለም። አንድን የጀማሪ ወይም መካከለኛ ባክኤንድ ፕሮግራመር ወደ ከፍተኛ 
                  (<strong>Senior / Principal Backend Architect</strong>) ደረጃ ለማድረስ የተነደፈ የ <strong>7 ምዕራፎች (Phases)</strong>፣ 
                  <strong>31 የተሟሉ ሞጁሎች</strong> እና <strong>7 ትላልቅ የፖርትፎሊዮ ካፕስቶን ፕሮጀክቶች</strong> ስብስብ ነው።
                </p>
              </div>

              {/* Key Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-center">
                  <span className="block text-2xl sm:text-3xl font-extrabold text-zinc-950 dark:text-zinc-50">7</span>
                  <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">Architectural Phases</span>
                </div>
                <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-center">
                  <span className="block text-2xl sm:text-3xl font-extrabold text-zinc-950 dark:text-zinc-50">31</span>
                  <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">Deep Core Modules</span>
                </div>
                <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-center">
                  <span className="block text-2xl sm:text-3xl font-extrabold text-zinc-950 dark:text-zinc-50">93</span>
                  <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">Oral Whiteboard Qs</span>
                </div>
                <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-center">
                  <span className="block text-2xl sm:text-3xl font-extrabold text-zinc-950 dark:text-zinc-50">7</span>
                  <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">Real-World Capstones</span>
                </div>
              </div>

              {/* 7 Phases Cards */}
              <div className="space-y-3">
                <h4 className="font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                  <Layers className="h-4 w-4 text-emerald-500" />
                  የ 7ቱ ምዕራፎች ቅደም ተከተል (The 7 Progressive Phases)
                </h4>

                <div className="grid gap-2.5 sm:grid-cols-2">
                  {ROADMAP_PHASES.map((phase) => (
                    <div
                      key={phase.id}
                      className="p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30 flex items-start gap-3 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors"
                    >
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 font-mono font-bold text-xs">
                        0{phase.id}
                      </span>
                      <div>
                        <h5 className="font-bold text-xs sm:text-sm text-zinc-900 dark:text-zinc-100">
                          {phase.name}
                        </h5>
                        <p className="text-[11.5px] text-zinc-500 dark:text-zinc-400 mt-0.5 leading-snug">
                          {phase.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Learning Philosophy Alert */}
              <div className="p-4 rounded-xl border border-amber-500/20 bg-amber-500/5 text-amber-900 dark:text-amber-200 text-xs sm:text-[13px] leading-relaxed">
                <strong>💡 የኮርሱ ወርቃማ ህግ (The Golden Rule):</strong> በአንድ ርዕስ ላይ ኮዱን ብቻ ኮፒ ፔስት ማድረግ አይፈቀድም። 
                ጥያቄው "እንዴት ይሰራል?" ብቻ ሳይሆን <em>"ሲስተሙ በከፍተኛ ጫና ስር ሲወድቅ ምን ይከሰታል? ከሌላው አማራጭ ይሄ ለምን ተመረጠ?"</em> 
                የሚሉትን የሲኒየር መሃንዲስ ጥያቄዎች መመለስ መቻል አለብህ።
              </div>
            </div>
          )}

          {/* TAB 2: THE 5-STEP STUDY ROUTINE */}
          {activeTab === "how-to-study" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5 dark:border-zinc-800 dark:bg-zinc-900/50">
                <h3 className="text-base font-bold text-zinc-950 dark:text-zinc-50 flex items-center gap-2">
                  <Zap className="h-5 w-5 text-amber-500" />
                  ምን እንደምታደርግ፦ የ 5ቱ ደረጃዎች የቀን ተቀን የጥናት ቀመር (Daily 5-Step Formula)
                </h3>
                <p className="mt-1 text-zinc-600 dark:text-zinc-400 text-xs sm:text-sm leading-relaxed">
                  በእያንዳንዱ ሞጁል ላይ ስትገባ ጊዜህን ሳታባክን ደረጃ በደረጃ የሚከተሉትን 5 ተግባራት አከናውን፡
                </p>
              </div>

              <div className="space-y-4">
                {/* Step 1 */}
                <div className="flex gap-4 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-500/10 text-red-500 font-bold">
                    <PlayCircle className="h-6 w-6" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-red-500 uppercase tracking-wider">Step 01</span>
                      <h4 className="font-bold text-zinc-950 dark:text-zinc-50">
                        የተጣራውን የቪዲዮ ትምህርት በጥሞና መመልከት (Watch Masterclass)
                      </h4>
                    </div>
                    <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                      እያንዳንዱ ርዕስ ከ 30 እስከ 60 ደቂቃ የሚፈጅ አለም አቀፍ ደረጃውን የጠበቀ የዩቲዩብ ቪዲዮ አለው። ቪዲዮውን ስታይ 
                      የአርክቴክቸር አስተሳሰቡን (Mental Model)፣ የኔትወርክ ፍሰቱን እና የተሰሩትን ስህተቶች አስተውል።
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex gap-4 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-500 font-bold">
                    <BookOpen className="h-6 w-6" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-blue-500 uppercase tracking-wider">Step 02</span>
                      <h4 className="font-bold text-zinc-950 dark:text-zinc-50">
                        የተመረጡትን የመጽሐፍ ምዕራፎች ማንበብ (Read Curated Book Chapters)
                      </h4>
                    </div>
                    <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                      እንደ Martin Fowler፣ Martin Kleppmann (DDIA)፣ እና Ilya Grigorik ባሉ ታላላቅ ምሁራን የተፃፉትን የተወሰኑ ምዕራፎች አንብብ። 
                      ይህ እውቀት ከዩቲዩብ ቪዲዮ የማታገኘውን የውስጥ ዳታ ስትራክቸር እና የአሰራር ጥልቀት ይሰጥሃል።
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex gap-4 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-500 font-bold">
                    <Layers className="h-6 w-6" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-indigo-500 uppercase tracking-wider">Step 03</span>
                      <h4 className="font-bold text-zinc-950 dark:text-zinc-50">
                        የአርክቴክቸር ዲያግራሙን በዓይንህ መከታተል (Trace Architecture Flowchart)
                      </h4>
                    </div>
                    <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                      በኮርሱ ውስጥ የተካተቱትን በይነ-መረባዊ የፍሰት ዲያግራሞች ተጠቀም። አንድ ሪኩዌስት ከ Client $\rightarrow$ Gateway $\rightarrow$ 
                      Service $\rightarrow$ Cache Miss $\rightarrow$ Database እንዴት እንደሚሄድ እና የላቴንሲ (Latency) መጠኑን በዓይንህ ተመልከት።
                    </p>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="flex gap-4 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500 font-bold">
                    <Code2 className="h-6 w-6" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-emerald-500 uppercase tracking-wider">Step 04</span>
                      <h4 className="font-bold text-zinc-950 dark:text-zinc-50">
                        በምትመርጠው ቋንቋ ኮዱን መፃፍ (Implement Multi-Language Code)
                      </h4>
                    </div>
                    <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                      ኮዱ በ TypeScript/Node.js፣ Go፣ Python፣ እና Java ተዘጋጅቷል። በምትወደው ቋንቋ ኮዱን በኮምፒውተርህ ላይ ፅፈህ ሞክረው።
                    </p>
                  </div>
                </div>

                {/* Step 5 */}
                <div className="flex gap-4 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-500/10 text-purple-500 font-bold">
                    <FileText className="h-6 w-6" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-purple-500 uppercase tracking-wider">Step 05</span>
                      <h4 className="font-bold text-zinc-950 dark:text-zinc-50">
                        በኖት ስቱዲዮ ማስታወሻ መያዝ (Record in Notes Studio)
                      </h4>
                    </div>
                    <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                      "Insert Senior Template" በመጫን ያጋጠሙህን ችግሮች፣ የ Trade-off መፍትሄዎችን እና ያረጋገጥካቸውን ነጥቦች መዝግብ። 
                      በመጨረሻም ሁሉንም ማስታወሻዎችህን በአንድ ላይ በ Markdown ዳውንሎድ ማድረግ ትችላለህ።
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: WHITEBOARD & ORAL INTERVIEW (WHAT TO SAY) */}
          {activeTab === "what-to-say" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5 dark:border-zinc-800 dark:bg-zinc-900/50">
                <h3 className="text-base font-bold text-zinc-950 dark:text-zinc-50 flex items-center gap-2">
                  <Mic className="h-5 w-5 text-red-500" />
                  ምን እንደምትናገር፦ በቴክኒካል ኢንተርቪውና በኋይትቦርድ ላይ የማሳመን ጥበብ (The Oral Whiteboard Formula)
                </h3>
                <p className="mt-1 text-zinc-600 dark:text-zinc-400 text-xs sm:text-sm leading-relaxed">
                  አብዛኞቹ ፕሮግራመሮች ኢንተርቪው የሚወድቁት ኮዲንግ ስለማይችሉ ሳይሆን ሃሳባቸውን <strong>በቃል (Oral Communication)</strong> 
                  አቀናጅተው ማቅረብ ስለማይችሉ ነው። በ 75 ሰከንድ ውስጥ እንዴት መናገር እንዳለብህ የሚያሳይ ህግ፡
                </p>
              </div>

              {/* 3-Tier Answer Formula */}
              <div className="space-y-3.5">
                <h4 className="font-bold text-zinc-950 dark:text-zinc-50 text-sm flex items-center gap-2">
                  <Award className="h-4 w-4 text-emerald-500" />
                  የሲኒየር ኢንጂነር ባለ 3 ደረጃ የመልስ ቀመር (The Senior 3-Tier Structure):
                </h4>

                <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-md bg-blue-500/10 text-blue-600 dark:text-blue-400 font-mono font-bold text-xs">
                      1. [WHAT] ዋናው ጽንሰ-ሃሳብ (Core Mental Model)
                    </span>
                  </div>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed pl-1">
                    <strong>ምን ትናገራለህ?</strong> ጥያቄው ሲጠየቅ ሳትደናገጥ ፅንሰ-ሃሳቡን በ 2 አጫጭር ዓረፍተ ነገሮች ግለጽ። 
                    <br />
                    <em>ምሳሌ (Redis Cache):</em> "Cache-aside ማለት አፕሊኬሽኑ መጀመሪያ ዳታውን ከማስታወሻ (In-memory) ፈልጎ ሲያጣ ብቻ ከዋናው ዳታቤዝ አምጥቶ የሚያስቀምጥበት ሲስተም ነው።"
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-md bg-amber-500/10 text-amber-600 dark:text-amber-400 font-mono font-bold text-xs">
                      2. [WHY] ለምን ተመረጠ? ዋጋውስ ምንድነው? (Trade-offs & Latency)
                    </span>
                  </div>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed pl-1">
                    <strong>ምን ትናገራለህ?</strong> ይሄ ቴክኖሎጂ ምን ችግር እንደሚፈታ እና ምን የጎንዮሽ ጉዳት እንዳለው አስረዳ። 
                    <br />
                    <em>ምሳሌ:</em> "ከ Disk I/O ይልቅ የ RAM ላቴንሲ ወደ ~1ms ዝቅ ያደርገዋል፤ ነገር ግን ዳታው ከዋናው ዳታቤዝ ጋር እንዳይለያይ (Stale Data) የማድረግ እና የ Cache Invalidation ውስብስብነት ያመጣል።"
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono font-bold text-xs">
                      3. [HOW] በእውነተኛ ፕሮዳክሽን እና ስህተት ሲፈጠር (Edge Cases & Failure Modes)
                    </span>
                  </div>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed pl-1">
                    <strong>ምን ትናገራለህ?</strong> አገልጋዩ ቢወድቅ፣ ወይም በሺዎች የሚቆጠሩ ተጠቃሚዎች በአንዴ ቢመጡ (Thundering Herd) እንዴት እንደምትከላከል ግለጽ።
                    <br />
                    <em>ምሳሌ:</em> "የ Thundering herd ችግር እንዳይፈጠር በ Distributed Mutex እንቆልፋለን፤ እንዲሁም ሁሉም ካሽ በአንድ ሰከንድ እንዳይጠፋ በ TTL ላይ ጂተር (Jitter) እንጨምራለን።"
                  </p>
                </div>
              </div>

              {/* Live Simulator Advice */}
              <div className="p-4 rounded-xl border border-red-500/20 bg-red-500/5 text-xs sm:text-[13px] text-zinc-800 dark:text-zinc-200 leading-relaxed space-y-2">
                <div className="font-bold flex items-center gap-2 text-red-600 dark:text-red-400">
                  <Clock className="h-4 w-4" />
                  የ 75 ሰከንድ ኢንተርቪው ማስመሰያውን ተጠቀም (Use the Mock Interview Engine):
                </div>
                <p>
                  በእያንዳንዱ ሞጁል ግርጌ <strong>"🎙️ Start Mock Interview"</strong> የሚል ቁልፍ አለ። እሱን ስትጫን የ 75 ሰከንድ ታይመር ይቆጥራል። 
                  ማስታወሻህን ሳታይ <em>ድምፅህን አውጥተህ ተናገር</em>። ሰዓቱ ሲያልቅ "Reveal Benchmark" ተጭነህ መልስህን ከኢንዱስትሪው ደረጃ ጋር በማነጻጸር እራስህን ደረጃ ስጥ!
                </p>
              </div>
            </div>
          )}

          {/* TAB 4: THE 7 CAPSTONES (WHAT TO BUILD) */}
          {activeTab === "what-to-build" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5 dark:border-zinc-800 dark:bg-zinc-900/50">
                <h3 className="text-base font-bold text-zinc-950 dark:text-zinc-50 flex items-center gap-2">
                  <Terminal className="h-5 w-5 text-emerald-500" />
                  ምን እንደምትሰራ፦ 7ቱ የፖርትፎሊዮ ካፕስቶን ፕሮጀክቶች (7 Senior Capstone Projects)
                </h3>
                <p className="mt-1 text-zinc-600 dark:text-zinc-400 text-xs sm:text-sm leading-relaxed">
                  ተማሪዎች ኮርሱን ሲያጠናቅቁ የሚከተሉትን 7 ፕሮዳክሽን ደረጃ ያላቸው ፕሮጀክቶች ሰርተው በ GitHub ፖርትፎሊዮ ላይ ያኖራሉ። 
                  እነዚህ ፕሮጀክቶች ለማንኛውም አለም አቀፍ የቴክ ኩባንያ የብቃት ማረጋገጫ ናቸው፡
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-1">
                {Object.values(CAPSTONE_PROJECTS).map((capstone) => (
                  <div
                    key={capstone.phaseId}
                    className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <span className="flex h-6 w-6 items-center justify-center rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono font-bold text-xs">
                          P{capstone.phaseId}
                        </span>
                        <h4 className="font-bold text-zinc-900 dark:text-zinc-100 text-sm">
                          {capstone.title}
                        </h4>
                      </div>
                      <span className="text-[11px] font-mono font-semibold text-zinc-400 bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded">
                        {capstone.estimatedHours} Hours
                      </span>
                    </div>

                    <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                      {capstone.scenario}
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {capstone.keyDeliverables?.slice(0, 3).map((del, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center gap-1 rounded-md bg-zinc-100 dark:bg-zinc-800/80 px-2 py-0.5 text-[10.5px] font-medium text-zinc-700 dark:text-zinc-300"
                        >
                          <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                          {del}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer & Direct Course Entry Call-To-Action */}
        <div className="shrink-0 border-t border-zinc-200 bg-zinc-50/90 p-4 sm:p-5 dark:border-zinc-800 dark:bg-zinc-900/90 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3 text-xs text-zinc-500 dark:text-zinc-400">
            <span className="hidden sm:inline-block">የአሁኑ ንቁ ርዕስ (Active):</span>
            <span className="font-bold text-zinc-900 dark:text-zinc-100 truncate max-w-xs">
              Module {currentTopicNumber < 10 ? `0${currentTopicNumber}` : currentTopicNumber}: {currentTopicTitle}
            </span>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              onClick={() => {
                onClose();
                onExploreCapstones();
              }}
              className="flex-1 sm:flex-initial rounded-xl border border-zinc-300 bg-white px-3.5 py-2.5 text-xs font-bold text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700 transition-colors shadow-2xs text-center"
            >
              🛠️ የካፕስቶን ፕሮጀክቶች
            </button>

            {/* Glowing Big Call-To-Action to Enter Course */}
            <button
              onClick={() => {
                onStartCourse();
                onClose();
              }}
              className="flex-1 sm:flex-initial group flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 px-5 py-2.5 text-xs sm:text-sm font-extrabold text-white shadow-lg hover:from-emerald-500 hover:to-teal-500 hover:shadow-emerald-500/20 active:scale-[0.98] transition-all"
            >
              <Rocket className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              <span>🚀 ወደ ኮርሱ ግባ — Start Learning</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
