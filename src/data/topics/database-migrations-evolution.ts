import { RoadmapTopic } from "../../types/roadmap";

export const topic: RoadmapTopic = {
  id: "database-migrations-evolution",
  "number": 17,
  title: "Database Schema Migrations & Zero-Downtime Evolution (Expand-Contract Pattern)",
  phaseId: 3,
  phaseName: "Data Persistence & Storage",
  duration: "30 min",
  timeEstimates: {
    video: "30 min",
    reading: "35 min",
    lab: "50 min",
    total: "1 hr 55 min",
  },
  youtubeId: "l_jjjgwNRI0",
  youtubeChannelUrl: "https://www.youtube.com/@programmercave",
  secondaryVideo: {
    youtubeId: "-qNSXK7s7_w",
    title: "PostgreSQL Locks & Table Rewrite Traps",
    duration: "18 min",
    description: "Hussein Nasser explains ACCESS EXCLUSIVE locks during ALTER TABLE and how they block read and write traffic.",
  },
  shortSummary: "Execute seamless, zero-downtime database schema migrations using the Expand and Contract pattern, locking defense, and safe DDL operations.",
  seniorInsight: {
    quote: "A database migration script that runs in 10 milliseconds in local staging can take an Access Exclusive lock and take down production for 2 hours on a 50-million-row table.",
    productionLesson: "Always set a short lock_timeout (e.g. SET lock_timeout = '2s') before running DDL migrations in PostgreSQL. If the lock cannot be acquired immediately, fail fast rather than queuing behind long queries and exhausting the connection pool.",
    commonMistake: "Renaming a database column directly with ALTER TABLE users RENAME COLUMN. Any in-flight app instances running the previous code version will immediately crash with 500 errors.",
  },
  coreDeepDive: {
    what: "Database schema evolution is the practice of transitioning relational schemas safely across deployments without downtime, data loss, or application downtime.",
    why: "In continuous deployment, old code and new code run concurrently during rolling updates. Schemas must remain both backward and forward compatible at every step.",
    howItWorks: [
      "1. Phase 1 (Expand): Add the new column/table nullable or with a default value without modifying existing columns.",
      "2. Phase 2 (Dual Write): Deploy application code that reads from old column but writes to both old and new columns.",
      "3. Phase 3 (Backfill): Run a background worker in batches to backfill historical rows from the old column into the new column.",
      "4. Phase 4 (Read Switch): Deploy new code reading exclusively from the new column.",
      "5. Phase 5 (Contract): Once old code is completely decommissioned, drop the old column and legacy triggers.",
    ],
    blueprintTitle: "Safe Concurrent Index Creation & Zero-Downtime Column Migration",
    blueprintCode: `-- Step 1: Create index concurrently without holding WRITE locks
CREATE INDEX CONCURRENTLY idx_users_email_verified 
ON users (email, is_verified);

-- Step 2: Safe column addition with lock timeout guard
SET lock_timeout = '2s';
ALTER TABLE users ADD COLUMN phone_e164 VARCHAR(20) DEFAULT NULL;

-- Step 3: Dual-write trigger to synchronize during rolling deploy
CREATE OR REPLACE FUNCTION sync_phone_columns()
RETURNS TRIGGER AS $$
BEGIN
    NEW.phone_e164 := COALESCE(NEW.phone_e164, NEW.phone_number);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_sync_phone
BEFORE INSERT OR UPDATE ON users
FOR EACH ROW EXECUTE FUNCTION sync_phone_columns();`,
    blueprintLanguage: "sql",
  },
  recommendedBook: {
    title: "Refactoring Databases: Evolutionary Database Design",
    author: "Scott W. Ambler & Pramod J. Sadalage",
    keyChapters: "Chapter 4: Structural Refactorings, Chapter 7: Transition Periods & Parallel Changes",
    whyReadThis: "The foundational text establishing the Expand/Contract and Parallel Change patterns for production databases.",
    readingUrl: "https://martinfowler.com/books/refactoringDatabases.html",
  },
  handsOnChallenge: {
    ticketNumber: "DB-MIG-401",
    title: "Execute Multi-Phase Zero-Downtime Column Migration on 10M Row Table",
    scenario: "Our users table contains 10 million records. We need to split full_name into first_name and last_name while maintaining 99.99% uptime with 0 failed HTTP requests.",
    acceptanceCriteria: [
      "Add first_name and last_name columns with SET lock_timeout = '2s'.",
      "Deploy application dual-writing both full_name and split names.",
      "Execute batched backfill script processing 1,000 rows per transaction to prevent replication lag.",
      "Safely deprecate and drop full_name column only after zero queries reference it.",
    ],
    hints: [
      "Never run a single UPDATE users SET ... across 10 million rows; it generates massive WAL logs and locks tables.",
      "Use WHERE id > cursor LIMIT 1000 with a sleep(50ms) between batches to allow replicas to catch up.",
    ],
    solutionCode: `// Batched Backfill Script in TypeScript / Prisma
async function backfillNames() {
  let cursor = "0";
  while (true) {
    const users = await prisma.user.findMany({
      where: { id: { gt: cursor }, firstName: null },
      take: 1000,
      orderBy: { id: "asc" },
    });
    if (users.length === 0) break;

    for (const u of users) {
      const [first, ...rest] = (u.fullName || "").split(" ");
      await prisma.user.update({
        where: { id: u.id },
        data: { firstName: first || "", lastName: rest.join(" ") },
      });
    }
    cursor = users[users.length - 1].id;
    await new Promise((r) => setTimeout(r, 50)); // Yield to database engine
  }
}`,
    solutionExplanation: "Batched updates prevent lock escalation, avoid disk I/O spikes, and prevent replica lag buildup.",
  },
  selfCheckQuestions: [
    {
      category: "WHAT",
      question: "What is the Expand-Contract (Parallel Change) migration pattern?",
      answerExplanation: "A phased evolutionary pattern where a database schema is first expanded to support both old and new data structures simultaneously, the application is transitioned, and the old structure is contracted (removed) only after legacy code is completely deprecated.",
    },
    {
      category: "WHY",
      question: "Why does PostgreSQL block all reads and writes when executing certain ALTER TABLE commands?",
      answerExplanation: "Operations like column renames, type changes, or non-concurrent index additions require an ACCESS EXCLUSIVE lock. While waiting for existing read queries to finish, it blocks all subsequent reads and writes, creating connection pool exhaustion.",
    },
    {
      category: "HOW",
      question: "How do you add a NOT NULL column safely to an existing table with millions of rows in modern PostgreSQL?",
      answerExplanation: "In PostgreSQL 11+, you can run 'ALTER TABLE table ADD COLUMN col type NOT NULL DEFAULT default_val' without a table rewrite because the default is stored in metadata. In older versions, add the column as NULL, backfill existing rows in batches, add a CHECK constraint NOT VALID, validate the constraint, and finally set NOT NULL.",
    },
  ],
};

export default topic;
