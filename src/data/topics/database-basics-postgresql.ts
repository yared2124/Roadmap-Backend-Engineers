import { RoadmapTopic } from '../../types/roadmap';

export const topic: RoadmapTopic = {
  "id": "database-basics-postgresql",
  "number": 14,
  "title": "Database Basics & PostgreSQL Deep Dive (ACID, MVCC, Connection Pools)",
  "phaseId": 3,
  "phaseName": "Data Persistence & Storage",
  "duration": "4 hrs 20 min",
  "timeEstimates": {
    "video": "4 hr 20 min",
    "reading": "45 min",
    "lab": "60 min",
    "total": "6 hr 5 min"
  },
  "youtubeId": "qw--VYLpxG4",
  "youtubeChannelUrl": "https://www.youtube.com/@freecodecamp",
  "shortSummary": "PostgreSQL relational architecture, ACID transactions, MVCC row versioning, transaction isolation levels, and PgBouncer connection pooling.",
  "seniorInsight": {
    "quote": "PostgreSQL does not update rows in place. An UPDATE writes an entirely new row tuple and marks the old tuple dead. Vacuuming cleans it up.",
    "productionLesson": "PostgreSQL forks a dedicated OS process for every direct client connection (~10MB RAM per connection). Without an external connection pooler (like PgBouncer), spikes of 1,000 web connections will crash PostgreSQL with OOM or context-switching thrashing.",
    "commonMistake": "Assuming Read Committed isolation prevents all race conditions (it does not prevent lost updates or phantom reads)."
  },
  "coreDeepDive": {
    "what": "PostgreSQL is an advanced, enterprise-grade relational database powered by Multi-Version Concurrency Control (MVCC) and strict ACID compliance.",
    "why": "Guarantees financial-grade data durability and concurrent read/write isolation without table-locking overhead.",
    "howItWorks": [
      "1. Write-Ahead Logging (WAL): Mutations are sequentially flushed to append-only WAL before modifying data pages, guaranteeing crash recovery.",
      "2. MVCC: Readers never block writers and writers never block readers because each transaction sees a consistent snapshot based on transaction IDs (xmin/xmax).",
      "3. Vacuum: Background autovacuum daemon purges dead row versions and prevents transaction ID wraparound."
    ],
    "blueprintTitle": "PostgreSQL Connection Pooling Architecture",
    "blueprintCode": "[1,000 Web Client Workers]\n       │\n       ▼ (Lightweight client connections)\n[PgBouncer Pooler (Transaction Mode)]\n       │\n       ▼ (50 Persistent pooled server connections)\n[PostgreSQL Database Instance] (ACID Execution Engine)",
    "blueprintLanguage": "text"
  },
  "recommendedBook": {
    "title": "PostgreSQL Concurrency Control & Internals",
    "author": "The PostgreSQL Global Development Group",
    "keyChapters": "Chapter 13: Concurrency Control (MVCC, Transaction Isolation Levels, and Locks)",
    "whyReadThis": "Official documentation explaining how Multi-Version Concurrency Control (MVCC) prevents readers from blocking writers and avoids phantom reads.",
    "readingUrl": "https://www.postgresql.org/docs/current/mvcc.html"
  },
  "handsOnChallenge": {
    "ticketNumber": "TICKET-012",
    "title": "Inspect MVCC Dead Tuples & Configure PgBouncer Pool",
    "scenario": "High-volume updates on the orders table are bloating disk storage and slowing sequential scans due to dead tuples.",
    "acceptanceCriteria": [
      "Query pg_stat_user_tables to detect n_dead_tup counts.",
      "Trigger VACUUM (VERBOSE, ANALYZE) to reclaim table space."
    ],
    "terminalLab": "psql -d testdb -c \"SELECT relname, n_live_tup, n_dead_tup, last_vacuum FROM pg_stat_user_tables;\"",
    "hints": [
      "Look for tables where n_dead_tup exceeds n_live_tup!"
    ],
    "solutionCode": "VACUUM (VERBOSE, ANALYZE) orders;",
    "solutionExplanation": "Vacuuming marks dead tuple space as reusable for future inserts, preventing table bloat and keeping index pages compact."
  },
  "selfCheckQuestions": [
    {
      "category": "WHAT",
      "question": "What is Multi-Version Concurrency Control (MVCC), and how does PostgreSQL prevent readers from blocking writers?",
      "answerExplanation": "MVCC creates a new version (tuple) of a row on every UPDATE and flags rows on DELETE with transaction IDs (xmin and xmax) rather than overwriting data in-place. Because readers view a point-in-time snapshot corresponding to their transaction isolation level, read queries scan valid historical tuples without acquiring row locks, meaning readers never block writers and writers never block readers."
    },
    {
      "category": "WHY",
      "question": "Why is connection pooling (e.g., PgBouncer) mandatory for PostgreSQL when scaling to thousands of concurrent API requests?",
      "answerExplanation": "PostgreSQL uses a process-per-connection model where each client connection forks a backend process consuming ~5-10MB of RAM, OS file descriptors, and CPU context switching. Without a pooler, 5,000 incoming connections crash the database via out-of-memory or CPU thrashing. PgBouncer multiplexes thousands of incoming client connections onto a small pool of 50-100 real database connections."
    },
    {
      "category": "HOW",
      "question": "How do you detect and fix PostgreSQL database bloat caused by dead tuples and abandoned long-running transactions?",
      "answerExplanation": "Query pg_stat_user_tables to check n_dead_tup. Identify old transactions holding locks via pg_stat_activity where now() - xact_start is excessive, as they prevent autovacuum from cleaning dead rows. Terminate offending connections with pg_terminate_backend(pid) and tune autovacuum settings (autovacuum_vacuum_scale_factor = 0.05)."
    }
  ]
};

export default topic;
