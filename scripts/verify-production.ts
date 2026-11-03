/**
 * Comprehensive Production Readiness Verification Suite
 * Validates data integrity via Zod schemas, assets, code samples, capstones, and SEO configurations.
 */

import fs from "fs";
import path from "path";
import { ROADMAP_TOPICS, ROADMAP_PHASES } from "../src/data/roadmap";
import { TOPIC_CODE_SNIPPETS } from "../src/data/multiLangCode";
import { CAPSTONE_PROJECTS } from "../src/data/capstones";
import { RoadmapTopicSchema } from "../src/data/schema";

const ROOT_DIR = path.join(__dirname, "..");
const failures: string[] = [];
const warnings: string[] = [];
let passCount = 0;

function assert(condition: boolean, message: string, isWarning = false) {
  if (condition) {
    passCount++;
  } else {
    if (isWarning) {
      warnings.push(message);
    } else {
      failures.push(message);
    }
  }
}

console.log("\n============================================================");
console.log("       BACKEND ROADMAP PRODUCTION READINESS AUDIT");
console.log("============================================================\n");

// --- 1. AUDIT ROADMAP DATA VIA ZOD SCHEMAS ---
console.log("🔍 [1/5] Auditing Curriculum & Topics (via Zod validation)...");

assert(ROADMAP_TOPICS.length === 37, `Expected 37 topics, found ${ROADMAP_TOPICS.length}`);

// Verify numbers 1 to 37 are all present and contiguous
const topicNums = ROADMAP_TOPICS.map((t) => t.number);
for (let i = 1; i <= 37; i++) {
  assert(topicNums.includes(i), `Topic number ${i} is missing from roadmap`);
}

// Validate each topic with Zod Schema
ROADMAP_TOPICS.forEach((topic) => {
  const result = RoadmapTopicSchema.safeParse(topic);
  assert(result.success, `Topic #${topic.number} (${topic.id}) failed Zod validation: ${result.error?.message}`);

  // Validate YouTube ID
  assert(/^[A-Za-z0-9_-]{11}$/.test(topic.youtubeId), `Invalid YouTube ID "${topic.youtubeId}" for #${topic.number}`);

  // Validate YouTube Channel URL
  const channelUrl = topic.youtubeChannelUrl || "";
  assert(
    channelUrl.startsWith("https://www.youtube.com/@") ||
    channelUrl.startsWith("https://www.youtube.com/channel/") ||
    channelUrl.startsWith("https://www.youtube.com/c/"),
    `Topic #${topic.number} (${topic.title}) uses non-specific channel URL: ${channelUrl}`
  );

  // Validate reading URL
  const bookUrl = topic.recommendedBook.readingUrl || "";
  assert(
    bookUrl.startsWith("http://") || bookUrl.startsWith("https://"),
    `Invalid readingUrl for "${topic.recommendedBook.title}": ${bookUrl}`
  );

  // Validate hands-on challenge ticket
  assert(
    Boolean(topic.handsOnChallenge && topic.handsOnChallenge.ticketNumber && topic.handsOnChallenge.title),
    `Topic #${topic.number} handsOnChallenge missing ticket number or title`
  );

  // Validate self-check questions (3 per topic: WHAT, WHY, HOW)
  assert(
    topic.selfCheckQuestions.length === 3,
    `Topic #${topic.number} expected 3 oral defense questions, found ${topic.selfCheckQuestions.length}`
  );

  const categories = topic.selfCheckQuestions.map((q) => q.category);
  assert(
    categories.includes("WHAT") && categories.includes("WHY") && categories.includes("HOW"),
    `Topic #${topic.number} missing required WHAT/WHY/HOW question categories`
  );
});

// Total self-check questions: 37 * 3 = 111
const totalQuestions = ROADMAP_TOPICS.reduce((acc, t) => acc + t.selfCheckQuestions.length, 0);
assert(totalQuestions === 111, `Expected 111 total oral defense questions (3 per topic), found ${totalQuestions}`);

// --- 2. AUDIT MULTI-LANGUAGE CODE IMPLEMENTATIONS ---
console.log("🔍 [2/5] Auditing Multi-Language Code Snippets (Go, TS, Python)...");

const snippetKeys = Object.keys(TOPIC_CODE_SNIPPETS);
assert(snippetKeys.length === 37, `Expected 37 topic snippet entries, found ${snippetKeys.length}`);

ROADMAP_TOPICS.forEach((topic) => {
  const snippet = TOPIC_CODE_SNIPPETS[topic.id];
  assert(Boolean(snippet), `Topic "${topic.id}" missing from TOPIC_CODE_SNIPPETS`);

  if (snippet) {
    (["go", "typescript", "python"] as const).forEach((lang) => {
      const code = snippet[lang]?.trim() || "";
      assert(
        code.length > 50,
        `Topic "${topic.id}" ${lang} implementation snippet is unexpectedly short (${code.length} chars)`
      );
      assert(
        !code.includes("TODO: Implement"),
        `Topic "${topic.id}" ${lang} implementation contains unfinished placeholder`
      );
    });
  }
});

// --- 3. AUDIT PORTFOLIO CAPSTONES & PHASES ---
console.log("🔍 [3/5] Auditing Portfolio Capstone Projects & Phases...");

const capstoneKeys = Object.keys(CAPSTONE_PROJECTS);
assert(capstoneKeys.length === 7, `Expected 7 industry capstone projects, found ${capstoneKeys.length}`);

assert(ROADMAP_PHASES.length === 7, `Expected 7 roadmap phases, found ${ROADMAP_PHASES.length}`);

for (let phase = 1; phase <= 7; phase++) {
  const phaseData = ROADMAP_PHASES.find((p) => p.id === phase);
  assert(Boolean(phaseData), `Phase ${phase} missing in ROADMAP_PHASES`);
  assert(Boolean(CAPSTONE_PROJECTS[phase]), `Phase ${phase} missing capstone project in CAPSTONE_PROJECTS`);
  if (phaseData) {
    assert(phaseData.topics.length > 0, `Phase ${phase} has 0 topics assigned`);
    assert(Boolean(phaseData.capstoneProject), `Phase ${phase} capstoneProject is not defined`);
  }
}

// --- 4. AUDIT SEO & PRODUCTION ASSETS ---
console.log("🔍 [4/5] Auditing Production Assets, SEO & Routing...");
const robotsFile = path.join(ROOT_DIR, "public/robots.txt");
assert(fs.existsSync(robotsFile), "public/robots.txt must exist for search indexability");

const sitemapFile = path.join(ROOT_DIR, "public/sitemap.xml");
assert(fs.existsSync(sitemapFile), "public/sitemap.xml must exist for sitemap generation");

const iconFile = path.join(ROOT_DIR, "public/icon.svg");
assert(fs.existsSync(iconFile), "public/icon.svg must exist for browser tab favicon");

const layoutFile = path.join(ROOT_DIR, "src/app/layout.tsx");
assert(fs.existsSync(layoutFile), "src/app/layout.tsx must exist");
const layoutContent = fs.readFileSync(layoutFile, "utf-8");
assert(layoutContent.includes("openGraph"), "layout.tsx must contain OpenGraph metadata");
assert(layoutContent.includes("twitter"), "layout.tsx must contain Twitter card metadata");
assert(layoutContent.includes("keywords"), "layout.tsx must contain SEO keywords");

// --- 5. AUDIT PACKAGE SCRIPTS & DEPENDENCIES ---
console.log("🔍 [5/5] Auditing Package Manifest & Build Scripts...");
const pkgFile = path.join(ROOT_DIR, "package.json");
const pkg = JSON.parse(fs.readFileSync(pkgFile, "utf-8"));
assert(Boolean(pkg.scripts.build), "package.json must contain a build script");
assert(Boolean(pkg.scripts.start), "package.json must contain a start script");
assert(Boolean(pkg.scripts["test:prod"]), "package.json must contain a test:prod script");
assert(Boolean(pkg.dependencies.next), "Next.js must be a listed dependency");
assert(Boolean(pkg.dependencies.react), "React must be a listed dependency");
assert(Boolean(pkg.dependencies.zod), "Zod must be a listed dependency");

// --- SUMMARY RESULTS ---
console.log("\n============================================================");
console.log("                   AUDIT RESULT SUMMARY");
console.log("============================================================");
console.log(`Passed Checks:    ${passCount}`);
console.log(`Warnings:         ${warnings.length}`);
console.log(`Critical Errors:  ${failures.length}`);

if (warnings.length > 0) {
  console.log("\nWarnings:");
  warnings.forEach((w) => console.log(`  ⚠ ${w}`));
}

if (failures.length > 0) {
  console.error("\nCRITICAL FAILURES:");
  failures.forEach((f) => console.error(`  ✗ ${f}`));
  console.log("\n❌ AUDIT FAILED: Please fix the above issues before deploying to production.\n");
  process.exit(1);
} else {
  console.log("\n✅ ALL 130+ INTEGRITY CHECKS PASSED!");
  console.log("The Backend Engineering Roadmap is 100% PRODUCTION READY.");
  console.log("============================================================\n");
  process.exit(0);
}
