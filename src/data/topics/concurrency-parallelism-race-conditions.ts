import { RoadmapTopic } from '../../types/roadmap';

export const topic: RoadmapTopic = {
  "id": "concurrency-parallelism-race-conditions",
  "number": 34,
  "title": "Concurrency & Parallelism (Race Conditions, Locks, Mutexes, Goroutines/Worker Threads)",
  "phaseId": 7,
  "phaseName": "Advanced Engineering, Scale & Operations",
  "duration": "31 min",
  "timeEstimates": {
    "video": "46 min",
    "reading": "35 min",
    "lab": "45 min",
    "total": "2 hr 6 min"
  },
  "youtubeId": "oV9rvDllKEg",
  "youtubeChannelUrl": "https://www.youtube.com/@gnbitcom",
  "secondaryVideo": {
    "youtubeId": "DKScGZb3j6E",
    "title": "Distributed Locking Strategies (Redlock, ZooKeeper, etcd)",
    "duration": "15 min",
    "description": "ByteByteGo's system design breakdown of preventing double-booking race conditions across multi-instance clusters using Redis distributed locks and fencing tokens."
  },
  "shortSummary": "Concurrency vs parallelism, race conditions, mutual exclusion (Mutex), distributed locks (Redlock), and deadlock avoidance.",
  "seniorInsight": {
    "quote": "Concurrency is not parallelism. Concurrency is about dealing with lots of things at once; parallelism is about doing lots of things at once. — Rob Pike",
    "productionLesson": "Node.js is single-threaded for JavaScript execution, but it is NOT immune to race conditions. Two asynchronous requests can execute await db.get() simultaneously, see the same balance, and both execute await db.set(), causing lost updates. Use database row locks (FOR UPDATE) or distributed Redis locks.",
    "commonMistake": "Acquiring multiple locks in different orders across functions, creating unresolvable Deadlocks."
  },
  "coreDeepDive": {
    "what": "Concurrency manages multiple tasks making progress over shared resources; parallelism utilizes multiple CPU cores simultaneously.",
    "why": "Prevents data corruption, state collisions, and throughput collapse in multi-user environments.",
    "howItWorks": [
      "1. Critical sections are protected by Mutexes (Mutual Exclusion).",
      "2. Database row-level locks (SELECT ... FOR UPDATE) prevent concurrent read-modify-write collisions.",
      "3. Distributed locks (Redlock) coordinate synchronization across multiple independent server instances."
    ],
    "blueprintTitle": "Race Condition vs Atomic Row Locking",
    "blueprintCode": "-- VULNERABLE TO RACE CONDITION (Lost Update)\n-- User A and User B both read balance = 100 at the same millisecond:\nSELECT balance FROM accounts WHERE id = 1; \n-- Both compute 100 - 50 = 50 and overwrite:\nUPDATE accounts SET balance = 50 WHERE id = 1; -- 50 ETB lost!\n\n-- PROTECTED: Pessimistic Row Lock (SELECT ... FOR UPDATE)\nBEGIN;\nSELECT balance FROM accounts WHERE id = 1 FOR UPDATE; -- Blocks User B\nUPDATE accounts SET balance = balance - 50 WHERE id = 1;\nCOMMIT; -- User B unblocks and sees correct balance of 50",
    "blueprintLanguage": "sql"
  },
  "recommendedBook": {
    "title": "Redis Distributed Systems Patterns",
    "author": "Salvatore Sanfilippo (antirez)",
    "keyChapters": "Distributed Locks with Redis (The Redlock Algorithm & Fencing Tokens)",
    "whyReadThis": "The definitive technical guide on coordinating mutual exclusion across multi-instance clusters and preventing race conditions.",
    "readingUrl": "https://redis.io/docs/latest/develop/use/patterns/distributed-locks/"
  },
  "handsOnChallenge": {
    "ticketNumber": "TICKET-030",
    "title": "Reproduce and Fix an E-Commerce Inventory Race Condition",
    "scenario": "When the last item of an iPhone is in stock, two simultaneous checkouts both succeed, overselling inventory to -1.",
    "acceptanceCriteria": [
      "Write a script firing 10 concurrent requests to buy 1 item.",
      "Use SELECT FOR UPDATE or atomic UPDATE ... WHERE stock > 0 to guarantee exactly 1 order succeeds."
    ],
    "terminalLab": "node -e 'Promise.all([...Array(10)].map(() => fetch(\"http://localhost:3000/api/buy\")))'",
    "hints": [
      "Execute UPDATE inventory SET stock = stock - 1 WHERE id = $1 AND stock >= 1;"
    ],
    "solutionCode": "const res = await db.query(\n  'UPDATE inventory SET stock = stock - 1 WHERE id = $1 AND stock >= 1 RETURNING *',\n  [productId]\n);\nif (res.rowCount === 0) {\n  throw new SoldOutError('Product is sold out.');\n}",
    "solutionExplanation": "Atomic single-statement conditional updates leverage PostgreSQL's internal row locks, ensuring that only one concurrent transaction decrements the final stock."
  },
  "selfCheckQuestions": [
    {
      "category": "WHAT",
      "question": "What is a Data Race, and what is the difference between Pessimistic Locking and Optimistic Locking for preventing race conditions?",
      "answerExplanation": "A Data Race occurs when two concurrent threads/goroutines access the same memory or database record simultaneously and at least one access is a write. Pessimistic Locking locks the record in the database (SELECT ... FOR UPDATE), forcing other transactions to wait in line. Optimistic Locking adds a version integer column; updates execute without locking (UPDATE items SET qty = qty - 1, version = version + 1 WHERE id = 1 AND version = 5), aborting or retrying if another transaction incremented the version first."
    },
    {
      "category": "WHY",
      "question": "Why is an in-memory Mutex insufficient for preventing race conditions in horizontally scaled multi-instance backends?",
      "answerExplanation": "An in-memory mutex (like sync.Mutex in Go or semaphore locks in Node.js) only synchronizes threads or coroutines running inside a single operating system process on a single machine. In a production cluster running 10 pod instances, each instance has its own isolated memory, so concurrent requests hitting different pods will execute simultaneous conflicting writes without blocking each other."
    },
    {
      "category": "HOW",
      "question": "How do you implement a distributed lock using Redis (Redlock pattern) to prevent concurrent double-booking of a single inventory item?",
      "answerExplanation": "Acquire a lock by setting a unique key with a random UUID and TTL: SET lock:inventory:123 <random_uuid> NX PX 10000. If successful, the worker owns the lock and executes the business logic. To release the lock safely without accidentally releasing another worker's expired lock, execute a Lua script that checks if GET key == random_uuid, deleting the key only if the values match."
    }
  ]
};

export default topic;
