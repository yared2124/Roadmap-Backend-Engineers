import { RoadmapTopic } from '../../types/roadmap';

export const topic: RoadmapTopic = {
  "id": "caching-strategies-redis",
  "number": 19,
  "title": "Caching Strategies (Redis, Cache-Aside, Write-Through, Cache Invalidation)",
  "phaseId": 3,
  "phaseName": "Data Persistence & Storage",
  "duration": "1 hr 27 min",
  "timeEstimates": {
    "video": "1 hr 39 min",
    "reading": "35 min",
    "lab": "45 min",
    "total": "2 hr 59 min"
  },
  "youtubeId": "XCsS_NVAa1g",
  "youtubeChannelUrl": "https://www.youtube.com/@freecodecamp",
  "secondaryVideo": {
    "youtubeId": "5TRFpFBccQM",
    "title": "System Design: Why is Single-Threaded Redis So Fast?",
    "duration": "12 min",
    "description": "ByteByteGo breaks down I/O multiplexing, in-memory skip lists, and how Redis handles millions of operations without multi-threading lock overhead."
  },
  "shortSummary": "In-memory caching with Redis: Cache-Aside, Write-Through, TTL strategies, Cache Stampede (Thundering Herd), and invalidation patterns.",
  "seniorInsight": {
    "quote": "There are only two hard things in Computer Science: cache invalidation and naming things. — Phil Karlton",
    "productionLesson": "Never cache data without an explicit TTL (Time-To-Live). A bug in your cache invalidation logic will serve stale, corrupted user data indefinitely unless protected by an automated expiration fallback.",
    "commonMistake": "Caching identical database queries with the exact same TTL, causing thousands of keys to expire at the same second and hammering PostgreSQL with a Thundering Herd spike."
  },
  "coreDeepDive": {
    "what": "Caching stores computed database results in high-speed RAM (Redis/Memcached) to avoid repeated disk I/O and query execution.",
    "why": "Reduces database query load by 90%+ and drops API response latency from 50ms to under 2ms.",
    "howItWorks": [
      "1. Cache-Aside: Application checks Redis for key. On cache hit, return immediately. On cache miss, read PostgreSQL, populate Redis with TTL, and return.",
      "2. Cache Stampede Mitigation: Apply random jitter to TTLs (e.g. 300s + Math.random() * 30s) so keys expire smoothly.",
      "3. Distributed Mutex: When cache expires, only one worker acquires a lock to recompute the data while other requests serve stale or wait."
    ],
    "blueprintTitle": "Cache-Aside Pattern with Jittered TTL",
    "blueprintCode": "async function getProduct(productId) {\n  const cacheKey = 'product:' + productId;\n  const cached = await redis.get(cacheKey);\n  if (cached) return JSON.parse(cached);\n\n  // Cache Miss: Query Database\n  const product = await db.query('SELECT * FROM products WHERE id = $1', [productId]);\n  \n  // Apply random jitter to prevent cache stampede\n  const ttl = 300 + Math.floor(Math.random() * 30);\n  await redis.set(cacheKey, JSON.stringify(product.rows[0]), 'EX', ttl);\n  return product.rows[0];\n}",
    "blueprintLanguage": "javascript"
  },
  "recommendedBook": {
    "title": "Redis Architecture & Data Structures Guide",
    "author": "Redis Core Team",
    "keyChapters": "Redis Data Types: Strings, Hashes, Sorted Sets & In-Memory Caching",
    "whyReadThis": "Official guide covering cache keys, memory optimization, eviction policies (LRU/LFU), and atomic commands.",
    "readingUrl": "https://redis.io/docs/latest/develop/data-types/"
  },
  "handsOnChallenge": {
    "ticketNumber": "TICKET-016",
    "title": "Implement Distributed Rate Limiter using Redis Token Bucket",
    "scenario": "Prevent API abuse by limiting each API key to 100 requests per minute across 10 horizontal backend server instances.",
    "acceptanceCriteria": [
      "Use Redis INCR with EXPIRE or Redis Sorted Sets for atomic sliding window rate limiting.",
      "Return 429 Too Many Requests with Retry-After header on limit breach."
    ],
    "terminalLab": "redis-cli -u redis://localhost:6379 ping",
    "hints": [
      "Single INCR operations in Redis are single-threaded and atomic, avoiding race conditions across servers!"
    ],
    "solutionCode": "async function rateLimiter(apiKey) {\n  const key = 'rate:' + apiKey + ':' + Math.floor(Date.now() / 60000);\n  const count = await redis.incr(key);\n  if (count === 1) await redis.expire(key, 60);\n  return count <= 100;\n}",
    "solutionExplanation": "Keying by the current minute bucket and atomically incrementing guarantees consistent rate limits regardless of which server node handles the request."
  },
  "selfCheckQuestions": [
    {
      "category": "WHAT",
      "question": "What is the difference between Cache-Aside (Lazy Loading) and Write-Through caching patterns?",
      "answerExplanation": "In Cache-Aside, the application first queries Redis; on cache miss, it reads from PostgreSQL, writes the result to Redis with a TTL, and returns it. In Write-Through, the application writes updates to the cache first, and the cache synchronously writes to the database before acknowledging success, ensuring data is always fresh in cache at the cost of higher write latency."
    },
    {
      "category": "WHY",
      "question": "Why do Cache Stampedes (Dog-piling) occur when high-traffic cache keys expire, and how do Probabilistic Early Expiration algorithms (XFetch) prevent them?",
      "answerExplanation": "When a popular key expires, hundreds of concurrent requests simultaneously get a cache miss and rush to execute the same heavy query on the database, causing DB CPU spikes and downtime. The XFetch algorithm computes an early refresh probability based on compute time, remaining TTL, and a randomness factor beta, refreshing the cache in the background before it formally expires."
    },
    {
      "category": "HOW",
      "question": "How do you solve Cache Penetration (queries for non-existent records repeatedly hitting the DB) using Bloom Filters or null caching?",
      "answerExplanation": "When a query finds no record in the database, write a null sentinel value into Redis with a short TTL (e.g., 60 seconds) so subsequent lookups hit the cache. For massive keyspaces, place a Bloom Filter in front of the cache; if the Bloom Filter indicates an ID definitely does not exist, reject the request immediately without touching Redis or PostgreSQL."
    }
  ]
};

export default topic;
