import { RoadmapTopic } from '../../types/roadmap';

export const topic: RoadmapTopic = {
  "id": "business-logic-layer-domain-invariants",
  "number": 18,
  "title": "Business Logic Layer (BLL) & Domain Invariants (Transactions, Repository Pattern)",
  "phaseId": 3,
  "phaseName": "Data Persistence & Storage",
  "duration": "30 min",
  "timeEstimates": {
    "video": "30 min",
    "reading": "35 min",
    "lab": "45 min",
    "total": "1 hr 50 min"
  },
  "youtubeId": "1Lcr2c3MVF4",
  "youtubeChannelUrl": "https://www.youtube.com/@MilanJovanovicTech",
  "shortSummary": "Domain-Driven Design (DDD), maintaining business invariants across aggregate roots, and wrapping multi-table workflows in database transactions.",
  "seniorInsight": {
    "quote": "An invariant is a business rule that must ALWAYS be true at all times (e.g. account balance cannot be negative). Enforce invariants in the domain layer, not in UI forms.",
    "productionLesson": "Always wrap multi-table state mutations in an explicit ACID transaction (BEGIN ... COMMIT). If a transfer debits Account A and the server crashes before crediting Account B, money vanishes into thin air without transaction rollback.",
    "commonMistake": "Letting repository methods manage transactions internally, preventing multiple repository calls from sharing a single atomic Unit of Work."
  },
  "coreDeepDive": {
    "what": "The Business Logic Layer encapsulates core domain rules, entity aggregates, and business workflows independently of UI or database technologies.",
    "why": "Ensures business rules remain cohesive, testable, and protected against invalid state transitions.",
    "howItWorks": [
      "1. Entities encapsulate identity and business validation logic.",
      "2. Aggregates act as consistency boundaries around related entities.",
      "3. Unit of Work manages database transaction lifecycle across multiple repository updates."
    ],
    "blueprintTitle": "Atomic Money Transfer Transaction",
    "blueprintCode": "async function transferFunds(fromId, toId, amountCents) {\n  const client = await pool.connect();\n  try {\n    await client.query('BEGIN');\n    // Lock source row to prevent concurrent overdraft\n    const from = await client.query(\n      'SELECT balance FROM accounts WHERE id = $1 FOR UPDATE',\n      [fromId]\n    );\n    if (from.rows[0].balance < amountCents) {\n      throw new Error('Insufficient funds invariant violated');\n    }\n    await client.query('UPDATE accounts SET balance = balance - $1 WHERE id = $2', [amountCents, fromId]);\n    await client.query('UPDATE accounts SET balance = balance + $1 WHERE id = $2', [amountCents, toId]);\n    await client.query('COMMIT');\n  } catch (err) {\n    await client.query('ROLLBACK');\n    throw err;\n  } finally {\n    client.release();\n  }\n}",
    "blueprintLanguage": "javascript"
  },
  "recommendedBook": {
    "title": "Patterns of Enterprise Application Architecture",
    "author": "Martin Fowler",
    "keyChapters": "Repository Pattern (Mediating Between Domain Entities and Data Mapping)",
    "whyReadThis": "The authoritative definition of the Repository pattern, separating domain rules and transaction aggregates from database queries.",
    "readingUrl": "https://martinfowler.com/eaaCatalog/repository.html"
  },
  "handsOnChallenge": {
    "ticketNumber": "TICKET-015",
    "title": "Implement Transactional Outbox Pattern for Order Invariants",
    "scenario": "Orders must be saved and an event emitted to RabbitMQ atomically. If the message broker is down, the order must still commit.",
    "acceptanceCriteria": [
      "Write order and outbox event into PostgreSQL inside the SAME database transaction.",
      "A separate background poller reads uncommitted outbox rows and publishes to RabbitMQ."
    ],
    "terminalLab": "psql -d testdb -c \"SELECT * FROM outbox_events WHERE processed = false;\"",
    "hints": [
      "Because both writes share a single database transaction, either both succeed or both roll back!"
    ],
    "solutionCode": "await client.query('BEGIN');\nawait client.query('INSERT INTO orders (id, total) VALUES ($1, $2)', [orderId, total]);\nawait client.query('INSERT INTO outbox_events (event_type, payload) VALUES ($1, $2)', ['ORDER_CREATED', JSON.stringify({ orderId })]);\nawait client.query('COMMIT');",
    "solutionExplanation": "The Transactional Outbox pattern guarantees 100% data consistency between database state mutations and asynchronous message broker publishing."
  },
  "selfCheckQuestions": [
    {
      "category": "WHAT",
      "question": "What is a Domain Invariant, and where must its validation be enforced to prevent corrupted business states?",
      "answerExplanation": "A domain invariant is a business rule that must always hold true at all times within an application (e.g., 'an account balance cannot drop below zero', 'a confirmed booking cannot have duplicate reserved seats'). It must be enforced inside the Domain Model / Business Logic Layer (via Domain Entities and Aggregate Roots), backed by database constraints (CHECK constraints, foreign keys, and serializable transactions), never solely in frontend code or UI validations."
    },
    {
      "category": "WHY",
      "question": "Why is the Transaction Script pattern dangerous for complex enterprise applications compared to Domain-Driven Design (DDD) Aggregates?",
      "answerExplanation": "Transaction Scripts organize logic as single procedural methods interacting directly with database tables. As applications grow, business rules get duplicated across multiple endpoints, leading to fragmented logic, subtle race conditions, inconsistent invariants, and an untestable codebase. DDD Aggregates encapsulate state and rules, ensuring all mutations pass through strict domain methods."
    },
    {
      "category": "HOW",
      "question": "How do you implement the Unit of Work pattern to ensure multiple repository operations commit or rollback atomically in a single database transaction?",
      "answerExplanation": "Create a Unit of Work abstraction that maintains a reference to an active database transaction. Repositories accept this context/transaction. All business modifications register changes in memory; when the service finishes, the Unit of Work issues a single COMMIT. If any operation fails, it executes an automatic ROLLBACK, guaranteeing that orphaned mutations never persist."
    }
  ]
};

export default topic;
