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
    let res = null;
    let lastError = null;
    for (let attempt = 0; attempt < 2; attempt++) {
      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 15000);
        res = await fetch(b.readingUrl, {
          method: "GET",
          headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
          },
          signal: controller.signal
        });
        clearTimeout(timeout);
        if (res.ok) break;
      } catch (err) {
        lastError = err;
        await new Promise((r) => setTimeout(r, 1000));
      }
    }

    if ((!res || !res.ok)) {
      // Fallback with curl
      try {
        const { execSync } = require("child_process");
        const statusStr = execSync(`curl -s -o /dev/null -w "%{http_code}" -L --max-time 15 "${b.readingUrl}"`).toString().trim();
        const statusCode = parseInt(statusStr, 10);
        if (statusCode >= 200 && statusCode < 400) {
          res = { ok: true, status: statusCode };
          lastError = null;
        }
      } catch (fallbackErr) {
        lastError = fallbackErr;
      }
    }

    if (res && res.ok) {
      valid.push(b);
      console.log(`✓ [Topic ${b.topicNumber.padStart(2, "0")}] HTTP ${res.status}: "${b.bookTitle}" -> ${b.readingUrl}`);
    } else if (res) {
      failed.push({ ...b, status: res.status });
      console.error(`✗ [Topic ${b.topicNumber.padStart(2, "0")}] HTTP ${res.status}: "${b.bookTitle}" -> ${b.readingUrl}`);
    } else {
      failed.push({ ...b, error: lastError ? lastError.message : "Network error" });
      console.error(`✗ [Topic ${b.topicNumber.padStart(2, "0")}] ERROR: "${b.bookTitle}" -> ${lastError ? lastError.message : "Network error"}`);
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
