/**
 * Comprehensive Production Readiness Verification Suite
 * Validates data integrity, assets, code samples, capstones, and SEO configurations.
 */

const fs = require("fs");
const path = require("path");

const ROOT_DIR = path.join(__dirname, "..");
let failures = [];
let warnings = [];
let passCount = 0;

function assert(condition, message, isWarning = false) {
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

// --- 1. AUDIT ROADMAP DATA (src/data/roadmap.ts) ---
console.log("🔍 [1/5] Auditing Curriculum & Topics (src/data/roadmap.ts)...");
const roadmapFile = path.join(ROOT_DIR, "src/data/roadmap.ts");
assert(fs.existsSync(roadmapFile), "roadmap.ts file must exist");

const roadmapContent = fs.readFileSync(roadmapFile, "utf-8");

// Check topic numbers
const topicNums = [...roadmapContent.matchAll(/number:\s*(\d+),/g)].map((m) => parseInt(m[1], 10));
assert(topicNums.length === 31, `Expected 31 topics, found ${topicNums.length}`);

// Verify numbers 1 to 31 are all present
for (let i = 1; i <= 31; i++) {
  assert(topicNums.includes(i), `Topic number ${i} is missing from roadmap`);
}

// Check primary videos and youtube IDs (11-char pattern)
const primaryYtRegex = /number:\s*(\d+),[\s\S]*?youtubeId:\s*"([^"]+)"/g;
let primaryYtMatches = [...roadmapContent.matchAll(primaryYtRegex)];
assert(primaryYtMatches.length === 31, `Expected 31 primary videos, found ${primaryYtMatches.length}`);

primaryYtMatches.forEach((m) => {
  const [_, topicNum, ytId] = m;
  assert(/^[A-Za-z0-9_-]{11}$/.test(ytId), `Invalid YouTube ID format "${ytId}" for topic #${topicNum}`);
});

// Check canonical books and readingUrls
const bookRegex = /recommendedBook:\s*\{[\s\S]*?title:\s*"([^"]+)"[\s\S]*?readingUrl:\s*"([^"]+)"/g;
let bookMatches = [...roadmapContent.matchAll(bookRegex)];
assert(bookMatches.length === 31, `Expected 31 canonical book entries, found ${bookMatches.length}`);

bookMatches.forEach((m) => {
  const [_, bookTitle, url] = m;
  assert(url.startsWith("http://") || url.startsWith("https://"), `Invalid readingUrl for "${bookTitle}": ${url}`);
});

// Check handsOnChallenge lab tickets
const challengeMatches = [...roadmapContent.matchAll(/handsOnChallenge:\s*\{[\s\S]*?ticketNumber:\s*"([^"]+)"/g)];
assert(challengeMatches.length === 31, `Expected 31 hands-on challenges, found ${challengeMatches.length}`);

// Check selfCheckQuestions count (3 per topic = 93 total)
const selfCheckBlocks = [...roadmapContent.matchAll(/selfCheckQuestions:\s*\[/g)];
assert(selfCheckBlocks.length === 31, `Expected 31 self-check question sets, found ${selfCheckBlocks.length}`);

const individualQuestions = [...roadmapContent.matchAll(/category:\s*"(WHAT|WHY|HOW)",[\s\S]*?question:\s*"([^"]+)",[\s\S]*?answerExplanation:\s*"([^"]+)"/g)];
assert(individualQuestions.length === 93, `Expected 93 total oral defense questions (3 per topic), found ${individualQuestions.length}`);

// --- 2. AUDIT MULTI-LANGUAGE CODE IMPLEMENTATIONS ---
console.log("🔍 [2/5] Auditing Multi-Language Code Snippets (src/data/multiLangCode.ts)...");
const multiLangFile = path.join(ROOT_DIR, "src/data/multiLangCode.ts");
assert(fs.existsSync(multiLangFile), "multiLangCode.ts file must exist");

const multiLangContent = fs.readFileSync(multiLangFile, "utf-8");

// Count implementations per language
const goBlocks = [...multiLangContent.matchAll(/"go":\s*"([\s\S]*?)",/g)];
const tsBlocks = [...multiLangContent.matchAll(/"typescript":\s*"([\s\S]*?)",/g)];
const pyBlocks = [...multiLangContent.matchAll(/"python":\s*"([\s\S]*?)"\s*\},?/g)];

assert(goBlocks.length === 31, `Expected 31 Go implementations, found ${goBlocks.length}`);
assert(tsBlocks.length === 31, `Expected 31 TypeScript implementations, found ${tsBlocks.length}`);
assert(pyBlocks.length === 31, `Expected 31 Python implementations, found ${pyBlocks.length}`);

// Ensure code blocks are substantial and not empty/TODO
[...goBlocks, ...tsBlocks, ...pyBlocks].forEach((b, idx) => {
  const code = b[1].trim();
  assert(code.length > 50, `Implementation snippet #${idx + 1} is unexpectedly short (${code.length} chars)`);
  assert(!code.includes("TODO: Implement"), `Implementation snippet #${idx + 1} contains unfinished placeholder`);
});

// --- 3. AUDIT PORTFOLIO CAPSTONES ---
console.log("🔍 [3/5] Auditing Portfolio Capstone Projects (src/data/capstones.ts)...");
const capstonesFile = path.join(ROOT_DIR, "src/data/capstones.ts");
assert(fs.existsSync(capstonesFile), "capstones.ts file must exist");

const capstonesContent = fs.readFileSync(capstonesFile, "utf-8");
const capstoneIds = [...capstonesContent.matchAll(/id:\s*"([^"]+)",[\s\S]*?phaseId:\s*(\d+)/g)];
assert(capstoneIds.length === 7, `Expected 7 industry capstone projects, found ${capstoneIds.length}`);

for (let phase = 1; phase <= 7; phase++) {
  const hasPhase = capstoneIds.some((c) => parseInt(c[2], 10) === phase);
  assert(hasPhase, `Phase ${phase} is missing a dedicated capstone project`);
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
  console.log("\n✅ ALL 100+ INTEGRITY CHECKS PASSED!");
  console.log("The Backend Engineering Roadmap is 100% PRODUCTION READY.");
  console.log("============================================================\n");
  process.exit(0);
}
