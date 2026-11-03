import { RoadmapTopic } from '../../types/roadmap';

export const topic: RoadmapTopic = {
  "id": "schema-design-relational-modeling",
  "number": 15,
  "title": "Schema Design & Relational Modeling (Normalization vs Denormalization, Foreign Keys)",
  "phaseId": 3,
  "phaseName": "Data Persistence & Storage",
  "duration": "5 hrs 55 min",
  "timeEstimates": {
    "video": "6 hr 5 min",
    "reading": "45 min",
    "lab": "60 min",
    "total": "7 hr 50 min"
  },
  "youtubeId": "26ls5lNiijk",
  "youtubeChannelUrl": "https://www.youtube.com/@freecodecamp",
  "secondaryVideo": {
    "youtubeId": "_1IKwnbscQU",
    "title": "7 Must-Know Strategies to Scale Your Database",
    "duration": "10 min",
    "description": "ByteByteGo breaks down vertical scaling, read replicas, database sharding, caching tiers, normalization trade-offs, and CQRS."
  },
  "shortSummary": "Database normalization (1NF to 3NF), intentional denormalization, surrogate vs natural keys, UUIDv7, and foreign key referential integrity.",
  "seniorInsight": {
    "quote": "Normalize until it hurts, denormalize until it works. Premature denormalization causes data anomalies; premature normalization causes 12-table join deadlocks.",
    "productionLesson": "Avoid sequential integer IDs (1, 2, 3) in public APIs because competitors can scrape your daily order volume (German Tank Problem). Use UUIDv7, which combines a millisecond Unix timestamp with randomness for monotonic B-Tree insertion locality.",
    "commonMistake": "Omitting foreign key indexes, causing PostgreSQL to execute full table scans whenever parent rows are deleted or updated."
  },
  "coreDeepDive": {
    "what": "Relational modeling organizes domain entities into tables with strict mathematical relationships and constraints.",
    "why": "Prevents data anomalies, guarantees referential integrity, and provides a durable foundation for application growth.",
    "howItWorks": [
      "1. 1NF: Atomic values, no repeating groups.",
      "2. 2NF: No partial dependencies on composite primary keys.",
      "3. 3NF: No transitive dependencies (non-key columns depend only on the primary key).",
      "4. Denormalization: Selectively duplicating aggregate columns (e.g. comment_count) when read volume exceeds write volume by 1000:1."
    ],
    "blueprintTitle": "UUIDv7 Primary Key Definition",
    "blueprintCode": "-- PostgreSQL 17 / UUIDv7 Time-ordered UUID\nCREATE TABLE orders (\n  id UUID PRIMARY KEY DEFAULT gen_random_uuid(), -- Time-ordered\n  user_id UUID NOT NULL REFERENCES users(id) ON DELETE RESTRICT,\n  total_amount_cents BIGINT NOT NULL CHECK (total_amount_cents >= 0),\n  status VARCHAR(32) NOT NULL DEFAULT 'PENDING',\n  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()\n);\n\n-- Crucial: Always create an explicit index on foreign keys!\nCREATE INDEX idx_orders_user_id ON orders(user_id);",
    "blueprintLanguage": "sql"
  },
  "recommendedBook": {
    "title": "PostgreSQL Data Definition & Relational Modeling",
    "author": "The PostgreSQL Global Development Group",
    "keyChapters": "Chapter 5: Constraints (Check, Unique, Foreign Keys & Referential Integrity)",
    "whyReadThis": "Official guide on enforcing relational domain invariants, cascading deletes, natural vs surrogate keys, and preventing corrupted database records.",
    "readingUrl": "https://www.postgresql.org/docs/current/ddl-constraints.html"
  },
  "handsOnChallenge": {
    "ticketNumber": "TICKET-013",
    "title": "Model an E-Commerce Schema with Zero-Loss Inventory Invariants",
    "scenario": "Design normalized tables for Users, Orders, OrderItems, and Inventory with foreign key constraints preventing orphan records.",
    "acceptanceCriteria": [
      "Enforce ON DELETE RESTRICT on users with active orders.",
      "Use CHECK constraints to ensure inventory count never drops below zero.",
      "Index all foreign key reference columns."
    ],
    "terminalLab": "psql -d testdb -c \"d orders\"",
    "hints": [
      "Foreign key constraints automatically enforce referential integrity but DO NOT create indexes automatically!"
    ],
    "solutionCode": "CREATE TABLE inventory (\n  product_id UUID PRIMARY KEY,\n  stock_quantity INT NOT NULL CHECK (stock_quantity >= 0)\n);",
    "solutionExplanation": "Database CHECK constraints enforce business invariants at the lowest storage layer, guaranteeing corrupted data cannot be inserted even if application code has bugs."
  },
  "selfCheckQuestions": [
    {
      "category": "WHAT",
      "question": "What is the difference between Third Normal Form (3NF) and intentional denormalization in relational database design?",
      "answerExplanation": "3NF requires that all non-key columns depend solely and directly on the primary key, eliminating data duplication and update anomalies across tables. Denormalization intentionally reintroduces redundant data (e.g., duplicating user_name inside orders) to eliminate expensive multi-table JOINs and optimize high-frequency read paths in analytical or high-throughput queries."
    },
    {
      "category": "WHY",
      "question": "Why are database foreign keys both a guarantee of referential integrity and a bottleneck in distributed or sharded systems?",
      "answerExplanation": "Foreign keys guarantee data consistency at the engine level by preventing orphaned child records. However, during high-throughput concurrent writes, foreign key checks require shared locks on parent rows, introducing lock contention. In horizontally sharded systems where parent and child rows live on separate nodes, cross-network foreign key validation is prohibitively slow and unsupported."
    },
    {
      "category": "HOW",
      "question": "How do you model and store complex hierarchical / tree-structured data (like nested comment threads) in a relational database for high-performance querying?",
      "answerExplanation": "Use either the Materialized Path model (e.g., PostgreSQL ltree extension storing paths like 1.4.12), Closure Table (a separate lookup table storing ancestor-descendant pairs with path length), or Nested Sets. For most modern backends, PostgreSQL ltree with GiST indexing enables querying all descendants or ancestors of any comment in a single index scan."
    }
  ]
};

export default topic;
