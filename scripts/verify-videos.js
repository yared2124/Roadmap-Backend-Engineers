// Automated Production Verification Script for all YouTube Masterclass Videos in Roadmap
const fs = require("fs");
const path = require("path");

const roadmapPath = path.join(__dirname, "../src/data/roadmap.ts");
const content = fs.readFileSync(roadmapPath, "utf-8");

const topicMatches = [...content.matchAll(/number:\s*(\d+),[\s\S]*?title:\s*"([^"]+)",[\s\S]*?youtubeId:\s*"([^"]+)"/g)];
const secMatches = [...content.matchAll(/secondaryVideo:\s*\{[\s\S]*?youtubeId:\s*"([^"]+)"[\s\S]*?title:\s*"([^"]+)"/g)];

async function verifyAllVideos() {
  const allVideos = [];
  for (const m of topicMatches) {
    allVideos.push({ topicNum: m[1], topicTitle: m[2], id: m[3], type: "primary" });
  }
  for (const m of secMatches) {
    allVideos.push({ id: m[1], title: m[2], type: "secondary" });
  }

  const failed = [];
  const valid = [];

  for (const v of allVideos) {
    try {
      const res = await fetch(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${v.id}&format=json`);
      if (res.ok) {
        const data = await res.json();
        valid.push({ id: v.id, title: data.title, author: data.author_name, type: v.type, topic: v.topicNum });
      } else {
        failed.push({ id: v.id, status: res.status, ...v });
      }
    } catch (e) {
      failed.push({ id: v.id, error: e.message, ...v });
    }
  }

  console.log(`\n========================================`);
  console.log(`      YOUTUBE VIDEO INTEGRITY AUDIT     `);
  console.log(`========================================`);
  console.log(`Total Videos Audited: ${allVideos.length}`);
  console.log(`Status 200 OK (Embeddable): ${valid.length}`);
  console.log(`Failed / Unavailable: ${failed.length}`);
  console.log(`========================================\n`);

  if (failed.length === 0) {
    console.log("SUCCESS: 100% of all videos across all 31 roadmap topics are valid and embeddable!");
    process.exit(0);
  } else {
    console.error("FAILURES DETECTED:", JSON.stringify(failed, null, 2));
    process.exit(1);
  }
}

verifyAllVideos();
