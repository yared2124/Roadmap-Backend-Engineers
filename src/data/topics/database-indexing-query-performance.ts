import { RoadmapTopic } from '../../types/roadmap';

export const topic: RoadmapTopic = {
  "id": "database-indexing-query-performance",
  "number": 16,
  "title": "Database Indexing & Query Performance (B-Trees, EXPLAIN ANALYZE, N+1 Problems)",
  "phaseId": 3,
  "phaseName": "Data Persistence & Storage",
  "duration": "43 min",
  "timeEstimates": {
    "video": "1 hr 21 min",
    "reading": "40 min",
    "lab": "45 min",
    "total": "2 hr 46 min"
  },
  "youtubeId": "-qNSXK7s7_w",
  "youtubeChannelUrl": "https://www.youtube.com/@hnasr",
  "secondaryVideo": {
    "youtubeId": "clrtT_4WBAw",
    "title": "PostgreSQL Indexing: How, Why & When (PyCon AU)",
    "duration": "38 min",
    "description": "Deep dive into how PostgreSQL reads B-Tree indexes, builds query execution plans, and how to debug slow queries with EXPLAIN ANALYZE."
  },
  "shortSummary": "B-Tree internals, composite index leftmost prefix rules, reading EXPLAIN (ANALYZE, BUFFERS), and eliminating N+1 query patterns.",
  "seniorInsight": {
    "quote": "An index is not magic dust. Every index accelerates read queries but penalizes every single INSERT, UPDATE, and DELETE.",
    "productionLesson": "Always inspect EXPLAIN (ANALYZE, BUFFERS). If you see 'Seq Scan' on a table with millions of rows or 'Buffers: shared read=50000', your query is reading massive data blocks off disk instead of using RAM-cached B-Tree index pages.",
    "commonMistake": "Creating a composite index on (status, created_at) and expecting it to accelerate queries filtering only on created_at (violates Leftmost Prefix rule)."
  },
  "coreDeepDive": {
    "what": "Indexes are auxiliary balanced tree (B-Tree) data structures that allow database engines to locate matching rows in O(log N) operations.",
    "why": "Transforms multi-second full table scans into sub-millisecond index seeks.",
    "howItWorks": [
      "1. B-Trees maintain sorted balance across leaf nodes linked together for fast range scans.",
      "2. Composite index (A, B) only works if column A is filtered in the WHERE clause.",
      "3. Covering indexes (INCLUDE clause) store payload columns in leaf nodes, avoiding heap table fetches completely (Index-Only Scan)."
    ],
    "blueprintTitle": "B-Tree Index vs Sequential Scan Analysis",
    "blueprintCode": "-- Unindexed Slow Query: Seq Scan (scans 1,000,000 rows off disk)\nEXPLAIN (ANALYZE, BUFFERS) \nSELECT * FROM users WHERE email = 'alice@example.com';\n-- Result: Execution Time: 480.25 ms (Seq Scan on users)\n\n-- Add B-Tree Index\nCREATE UNIQUE INDEX idx_users_email ON users(email);\n\n-- Indexed Fast Query: Index Scan (seeks directly via 3 B-Tree hops)\nEXPLAIN (ANALYZE, BUFFERS) \nSELECT * FROM users WHERE email = 'alice@example.com';\n-- Result: Execution Time: 0.12 ms (Index Scan using idx_users_email)",
    "blueprintLanguage": "sql"
  },
  "recommendedBook": {
    "title": "Use The Index, Luke! (Free Complete Book)",
    "author": "Markus Winand",
    "keyChapters": "Anatomy of an Index: B-Trees, Leaf Nodes, and Query Execution Plans",
    "whyReadThis": "The undisputed master textbook on database indexing, completely free online, explaining how B-Trees work, leftmost prefix rules, and EXPLAIN ANALYZE.",
    "readingUrl": "https://use-the-index-luke.com/sql/anatomy"
  },
  "handsOnChallenge": {
    "ticketNumber": "TICKET-014",
    "title": "Diagnose and Eliminate an N+1 Query Cascade",
    "scenario": "An endpoint fetching 100 users executes 1 SQL query for users and 100 separate SQL queries for their addresses, taking 2.5 seconds.",
    "acceptanceCriteria": [
      "Identify the N+1 query loop in logs.",
      "Refactor into a single query using an INNER JOIN or WHERE id IN (...) eager load."
    ],
    "terminalLab": "psql -d testdb -c \"EXPLAIN ANALYZE SELECT * FROM orders WHERE user_id IN (SELECT id FROM users LIMIT 10);\"",
    "hints": [
      "Instead of querying db.query('SELECT * FROM addresses WHERE user_id = ?') inside a for-loop, use one query with WHERE user_id = ANY($1)."
    ],
    "solutionCode": "// Clean single-query eager fetch\nconst users = await db.query('SELECT * FROM users LIMIT 100');\nconst userIds = users.rows.map(u => u.id);\nconst addresses = await db.query('SELECT * FROM addresses WHERE user_id = ANY($1)', [userIds]);",
    "solutionExplanation": "Batching child IDs into a single query reduces 101 network round-trips down to exactly 2 round-trips, slashing response time by 95%."
  },
  "selfCheckQuestions": [
    {
      "category": "WHAT",
      "question": "How does a B-Tree index work under the hood, and what is the difference between an Index Scan, Index Only Scan, and Bitmap Heap Scan?",
      "answerExplanation": "A B-Tree is a balanced multi-way search tree maintaining sorted keys on disk pages (O(log N) seeks). An Index Scan traverses the B-Tree to find row IDs (cTIDs) and fetches table pages from disk. An Index Only Scan retrieves all requested columns directly from the index leaf without touching table heap pages. A Bitmap Heap Scan collects row pointers from index matches into a memory bitmap, sorts them by physical disk location, and reads table blocks sequentially."
    },
    {
      "category": "WHY",
      "question": "Why does putting a function around an indexed column (e.g., WHERE LOWER(email) = 'test@example.com') cause PostgreSQL to ignore a standard B-Tree index?",
      "answerExplanation": "Standard B-Tree indexes store raw values, not computed function outputs. The query engine cannot reverse the mathematical or string function to search the sorted index, forcing it to fall back to an exhaustive, CPU-heavy Sequential Table Scan on every single row. To fix this, you must create an explicit functional expression index: CREATE INDEX ON users (LOWER(email));."
    },
    {
      "category": "HOW",
      "question": "How do you detect, profile, and eliminate the classic N+1 query problem in an ORM (Prisma, Hibernate, GORM)?",
      "answerExplanation": "Turn on SQL query logging or use APM tools to spot repetitive queries in logs. The N+1 problem occurs when fetching 1 parent collection followed by N separate queries for each child relation. Eliminate it by using eager loading with SQL JOIN or batch fetching (WHERE id IN (...)), or by utilizing DataLoader patterns that coalesce individual ID requests across an event-loop tick into a single batch query."
    }
  ]
};

export default topic;
