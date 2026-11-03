/**
 * Backward compatibility wrapper for verify-production.ts
 */
const { spawnSync } = require("child_process");
const path = require("path");

const scriptPath = path.join(__dirname, "verify-production.ts");
const result = spawnSync("npx", ["tsx", scriptPath], { stdio: "inherit" });
process.exit(result.status || 0);
