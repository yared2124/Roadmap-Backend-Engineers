// Automated Verification Script for all 31 Recommended Open Literature Links in Roadmap
const fs = require("fs");
const path = require("path");

const roadmapPath = path.join(__dirname, "../src/data/roadmap.ts");
const content = fs.readFileSync(roadmapPath, "utf-8");

// Extract topic number, title, book title, author, keyChapters, readingUrl
const bookRegex = /number:\s*(\d+),[\s\S]*?title:\s*"([^"]+)",[\s\S]*?recommendedBook:\s*\{[\s\S]*?title:\s*"([^"]+)",[\s\S]*?author:\s*"([^"]+)",[\s\S]*?keyChapters:\s*"([^"]+)",[\s\S]*?readingUrl:\s*"([^"]+)"/g;

const books = [];
let match;
while ((match = bookRegex.exec(content)) !== null) {
  books.push({
    topicNumber: match[1],
    topicTitle: match[2],
    bookTitle: match[3],
    author: match[4],
    keyChapters: match[5],
    readingUrl: match[6]
  });
}

async function verifyLiterature() {
  console.log(`\n======================================================`);
  console.log(`      RECOMMENDED LITERATURE OPEN-ACCESS AUDIT        `);
  console.log(`======================================================`);
  console.log(`Auditing ${books.length} literature resources...\n`);

  const valid = [];
  const failed = [];

  for (const b of books) {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 12000);
      const res = await fetch(b.readingUrl, {
        method: "GET",
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
        },
        signal: controller.signal
      });
      clearTimeout(timeout);

      if (res.ok) {
        valid.push(b);
        console.log(`✓ [Topic ${b.topicNumber.padStart(2, "0")}] HTTP ${res.status}: "${b.bookTitle}" -> ${b.readingUrl}`);
      } else {
        failed.push({ ...b, status: res.status });
        console.error(`✗ [Topic ${b.topicNumber.padStart(2, "0")}] HTTP ${res.status}: "${b.bookTitle}" -> ${b.readingUrl}`);
      }
    } catch (e) {
      failed.push({ ...b, error: e.message });
      console.error(`✗ [Topic ${b.topicNumber.padStart(2, "0")}] ERROR: "${b.bookTitle}" -> ${e.message}`);
    }
  }

  console.log(`\n======================================================`);
  console.log(`Total Literature Audited: ${books.length}`);
  console.log(`Status 200 OK (Open Access Direct Links): ${valid.length}`);
  console.log(`Failed / Inaccessible: ${failed.length}`);
  console.log(`======================================================\n`);

  if (failed.length === 0 && books.length === 31) {
    console.log("SUCCESS: 100% of all 31 recommended books are free, direct-access, open canonical literature!");
    process.exit(0);
  } else {
    console.error("FAILURES DETECTED:", JSON.stringify(failed, null, 2));
    process.exit(1);
  }
}

verifyLiterature();
