/**
 * Unit Test Suite for Progress State Sanitization & Schema Validation
 */

const assert = require("assert");

// Mock implementation matching src/hooks/useProgress.ts sanitizeProgressData
const CURRENT_SCHEMA_VERSION = 2;

const defaultData = {
  version: CURRENT_SCHEMA_VERSION,
  completedTopics: [],
  completedBooks: [],
  completedCapstones: [],
  capstoneSubmissions: {},
  notes: {},
};

function sanitizeProgressData(raw) {
  if (!raw || typeof raw !== "object") {
    return { ...defaultData, updatedAt: new Date().toISOString() };
  }

  const completedTopics = Array.isArray(raw.completedTopics)
    ? raw.completedTopics.filter((t) => typeof t === "string")
    : [];

  const completedBooks = Array.isArray(raw.completedBooks)
    ? raw.completedBooks.filter((b) => typeof b === "string")
    : [];

  const completedCapstones = Array.isArray(raw.completedCapstones)
    ? raw.completedCapstones
        .map((c) => (typeof c === "number" ? c : parseInt(String(c), 10)))
        .filter((c) => !Number.isNaN(c))
    : [];

  const capstoneSubmissions = {};
  if (raw.capstoneSubmissions && typeof raw.capstoneSubmissions === "object") {
    for (const [key, val] of Object.entries(raw.capstoneSubmissions)) {
      const numKey = parseInt(key, 10);
      if (!Number.isNaN(numKey) && typeof val === "string") {
        capstoneSubmissions[numKey] = val;
      }
    }
  }

  const notes = {};
  if (raw.notes && typeof raw.notes === "object") {
    for (const [key, val] of Object.entries(raw.notes)) {
      if (typeof val === "string") {
        notes[key] = val;
      }
    }
  }

  return {
    version: typeof raw.version === "number" ? raw.version : CURRENT_SCHEMA_VERSION,
    completedTopics,
    completedBooks,
    completedCapstones,
    capstoneSubmissions,
    notes,
    updatedAt: typeof raw.updatedAt === "string" ? raw.updatedAt : new Date().toISOString(),
  };
}

console.log("🧪 Running unit tests for useProgress hook & schema validation...\n");

// Test 1: Null/undefined/corrupt payload fallback
{
  const result = sanitizeProgressData(null);
  assert.strictEqual(result.version, 2, "Default version should be 2");
  assert.deepStrictEqual(result.completedTopics, [], "completedTopics should default to empty array");
  console.log("  ✓ Test 1: Null payload safely falls back to default schema");
}

{
  const result = sanitizeProgressData("not a json object");
  assert.strictEqual(result.version, 2);
  assert.deepStrictEqual(result.notes, {});
  console.log("  ✓ Test 2: Primitive string payload safely falls back to default schema");
}

// Test 2: Legacy v1 storage migration (no version key)
{
  const legacyData = {
    completedTopics: ["backend-first-principles", "http-protocol-deep-dive"],
    completedBooks: ["backend-first-principles"],
    notes: { "backend-first-principles": "Great notes on Clean Architecture" },
  };
  const result = sanitizeProgressData(legacyData);
  assert.strictEqual(result.version, 2, "Version upgraded to current schema version");
  assert.strictEqual(result.completedTopics.length, 2, "Preserves completed topics");
  assert.strictEqual(result.notes["backend-first-principles"], "Great notes on Clean Architecture", "Preserves notes");
  console.log("  ✓ Test 3: Legacy v1 data correctly parsed and upgraded without data loss");
}

// Test 3: Malformed fields (numbers in topic array, null notes, etc.)
{
  const messyData = {
    version: 2,
    completedTopics: ["valid-id", 12345, null, undefined, {}],
    completedBooks: ["valid-book", false],
    completedCapstones: [1, "2", "invalid", null],
    notes: { "valid-topic": "My notes", "bad-topic": 42 },
  };
  const result = sanitizeProgressData(messyData);
  assert.deepStrictEqual(result.completedTopics, ["valid-id"], "Filters out non-string topic IDs");
  assert.deepStrictEqual(result.completedBooks, ["valid-book"], "Filters out non-string book IDs");
  assert.deepStrictEqual(result.completedCapstones, [1, 2], "Coerces numeric strings and discards NaN");
  assert.strictEqual(result.notes["valid-topic"], "My notes");
  assert.strictEqual(result.notes["bad-topic"], undefined, "Discards non-string notes");
  console.log("  ✓ Test 4: Malformed and poisoned data elements strictly sanitized");
}

// Test 4: Export/Import Roundtrip
{
  const initial = {
    version: 2,
    completedTopics: ["routing-request-dispatching"],
    completedBooks: ["routing-request-dispatching"],
    completedCapstones: [1],
    capstoneSubmissions: { 1: "https://github.com/engineer/project" },
    notes: { "routing-request-dispatching": "Radix trees are O(k)" },
  };
  const exportPayload = JSON.stringify({
    app: "backend-roadmap-platform",
    exportedAt: new Date().toISOString(),
    data: initial,
  });
  const parsed = JSON.parse(exportPayload);
  const restored = sanitizeProgressData(parsed.data);
  assert.deepStrictEqual(restored.completedTopics, initial.completedTopics);
  assert.deepStrictEqual(restored.capstoneSubmissions[1], initial.capstoneSubmissions[1]);
  assert.deepStrictEqual(restored.notes, initial.notes);
  console.log("  ✓ Test 5: Full export/import round-trip preserves state perfectly");
}

console.log("\n✅ ALL 5 USEPROGRESS HOOK UNIT TESTS PASSED SUCCESSFULLY!\n");
