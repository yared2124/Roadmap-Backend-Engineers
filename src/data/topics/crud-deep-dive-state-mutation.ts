import { RoadmapTopic } from '../../types/roadmap';

export const topic: RoadmapTopic = {
  "id": "crud-deep-dive-state-mutation",
  "number": 11,
  "title": "CRUD Deep Dive & State Mutation",
  "phaseId": 2,
  "phaseName": "Core API Architecture & Request Lifecycle",
  "duration": "3 hrs 09 min",
  "timeEstimates": {
    "video": "3 hr 9 min",
    "reading": "30 min",
    "lab": "60 min",
    "total": "4 hr 39 min"
  },
  "youtubeId": "rOpEN1JDaD0",
  "youtubeChannelUrl": "https://www.youtube.com/@javascriptmastery",
  "shortSummary": "Create, Read, Update, Delete in production: Soft deletes vs hard deletes, cursor vs offset pagination, and optimistic vs pessimistic locking.",
  "seniorInsight": {
    "quote": "Offset pagination (OFFSET 1000000 LIMIT 20) is a database killer. In production, always use keyset/cursor-based pagination.",
    "productionLesson": "With OFFSET 100000, PostgreSQL must scan 100,020 rows off disk, discard the first 100,000, and return 20, causing query time to explode. Keyset pagination (WHERE id < last_id ORDER BY id DESC LIMIT 20) uses the B-Tree index to fetch rows in 0.1ms.",
    "commonMistake": "Using hard deletes (DELETE FROM users) and accidentally breaking foreign key referential integrity across audit logs."
  },
  "coreDeepDive": {
    "what": "CRUD operations form the fundamental state mutation primitives of database-backed applications.",
    "why": "Incorrect CRUD implementations lead to race conditions (lost updates), performance collapse on large datasets, and accidental data loss.",
    "howItWorks": [
      "1. Keyset pagination passes an opaque cursor (e.g. base64-encoded created_at + id) for constant-time lookups.",
      "2. Soft deletes set deleted_at = NOW() instead of dropping rows, preserving historical integrity.",
      "3. Optimistic locking compares a version integer (UPDATE ... WHERE id = :id AND version = :v) to catch concurrent edits."
    ],
    "blueprintTitle": "High-Performance Keyset (Cursor) Pagination",
    "blueprintCode": "-- Inefficient Offset Pagination (O(N) full index traverse)\nSELECT * FROM orders ORDER BY created_at DESC OFFSET 50000 LIMIT 20;\n\n-- Efficient Keyset / Cursor Pagination (O(log N) direct B-Tree seek)\nSELECT * FROM orders \nWHERE created_at < '2026-09-13T20:00:00Z'\nORDER BY created_at DESC \nLIMIT 20;",
    "blueprintLanguage": "sql"
  },
  "recommendedBook": {
    "title": "RESTful API Design & HTTP Methods",
    "author": "Lokesh Gupta",
    "keyChapters": "HTTP Methods: GET, POST, PUT, DELETE, and PATCH (Idempotency & Safe Methods)",
    "whyReadThis": "Clear, exhaustive explanation of state mutations, difference between replacement (PUT) and partial modification (PATCH), and status code contracts.",
    "readingUrl": "https://restfulapi.net/http-methods/"
  },
  "handsOnChallenge": {
    "ticketNumber": "TICKET-011",
    "title": "Implement Optimistic Concurrency Control to Prevent Lost Updates",
    "scenario": "Two administrators edit the same store inventory simultaneously, causing one admin's price edit to overwrite the other's stock change.",
    "acceptanceCriteria": [
      "Add a version column to the inventory table.",
      "Reject updates where version does not match with 409 Conflict."
    ],
    "terminalLab": "psql -d testdb -c \"UPDATE products SET stock = stock - 1, version = version + 1 WHERE id = 1 AND version = 5;\"",
    "hints": [
      "Check affected rows count: if 0 rows were updated, a concurrent modification occurred!"
    ],
    "solutionCode": "const updated = await db.query(\n  'UPDATE products SET stock = $1, version = version + 1 WHERE id = $2 AND version = $3 RETURNING *',\n  [newStock, productId, expectedVersion]\n);\nif (updated.rowCount === 0) {\n  throw new ConflictError('Concurrent edit detected. Please refresh and retry.');\n}",
    "solutionExplanation": "Optimistic locking checks that no other transaction changed the version column during the user's edit window without requiring heavy row-level database locks."
  },
  "selfCheckQuestions": [
    {
      "category": "WHAT",
      "question": "What is the technical and semantic difference between HTTP PUT and HTTP PATCH for state mutation?",
      "answerExplanation": "PUT is an idempotent full resource replacement; any existing fields omitted in the request body are either overwritten with null or set to schema defaults. PATCH is a partial mutation; it only updates the specific fields included in the request body, leaving all other existing properties of the stored entity untouched."
    },
    {
      "category": "WHY",
      "question": "Why is Soft Deletion (deleted_at timestamp) both a blessing for auditing and a hazard for unique database constraints?",
      "answerExplanation": "Soft deletion preserves historical records, references in audit logs, and allows accidental deletion recovery. However, standard SQL unique constraints (e.g., UNIQUE(email)) will block re-registration of the same email after soft deletion. It also pollutes B-Tree indexes and requires adding WHERE deleted_at IS NULL to every query, risking slow performance."
    },
    {
      "category": "HOW",
      "question": "How do you safely enforce unique constraints on soft-deleted tables in PostgreSQL?",
      "answerExplanation": "Create a partial unique index: CREATE UNIQUE INDEX idx_users_active_email ON users(email) WHERE deleted_at IS NULL;. This only enforces uniqueness among active non-deleted rows, allowing infinite re-creations of previously soft-deleted entities without database constraint violations."
    }
  ]
};

export default topic;
