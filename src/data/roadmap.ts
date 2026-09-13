import { RoadmapTopic, RoadmapPhase } from "../types/roadmap";

export const CHANNEL_URL = "https://www.youtube.com";
export const CHANNEL_NAME = "YouTube";

export const ROADMAP_TOPICS: RoadmapTopic[] = [
  // ==========================================
  // PHASE 1: Foundations & Web Protocols
  // ==========================================
  {
    id: "backend-first-principles",
    number: 1,
    title: "Backend from First Principles (Orientation & Architecture)",
    phaseId: 1,
    phaseName: "Foundations & Web Protocols",
    duration: "31 min",
    youtubeId: "0Rwb4Xmlcwc",
    youtubeChannelUrl: CHANNEL_URL,
    shortSummary: "Foundations of backend systems: CPU, memory, OS processes, network sockets, disk I/O, and distributed computing mental models.",
    seniorInsight: {
      quote: "Software is an illusion run on physical silicon, electricity, and packet switches. High-scale engineers optimize for hardware constraints, not framework abstractions.",
      productionLesson: "Understand memory vs disk latency: CPU cache (1ns), RAM (100ns), NVMe SSD (100,000ns), Cross-datacenter network packet (50,000,000ns). System bottlenecks are almost always network round-trips and unindexed disk scans.",
      commonMistake: "Treating the server as an abstract magic box and assuming memory allocations and network round-trips are free."
    },
    coreDeepDive: {
      what: "Backend engineering is the discipline of creating reliable, fault-tolerant software that processes business operations, safeguards state, and exposes APIs over networks.",
      why: "Without a disciplined systems approach, applications succumb to memory leaks, thread starvation, data corruption, and catastrophic cascading outages.",
      howItWorks: [
        "1. Operating systems manage memory pages, file descriptors, and non-blocking I/O event loops (epoll/kqueue).",
        "2. Sockets accept incoming TCP byte streams and hand them off to worker threads or asynchronous runtimes.",
        "3. Business code validates state changes and commits mutations into ACID-compliant storage engines.",
        "4. Telemetry engines emit distributed traces to capture latencies at hardware and network boundaries."
      ],
      blueprintTitle: "System Latency Hierarchy & Resource Model",
      blueprintCode: `[L1/L2 Cache: ~1ns]   <-- Registers & CPU execution
       │
[Main Memory (RAM): ~100ns]   <-- Hot working sets, Redis cache, in-memory buffers
       │
[NVMe Flash SSD: ~100,000ns]  <-- PostgreSQL write-ahead logs (WAL), disk tables
       │
[Cross-AZ Network: ~2,000,000ns] <-- Intra-cluster microservices, replica sync
       │
[Transatlantic WAN: ~150,000,000ns] <-- Client browser to origin server`,
      blueprintLanguage: "text"
    },
    recommendedBook: {
      title: "High Performance Browser Networking",
      author: "Ilya Grigorik",
      keyChapters: "Chapters 1 & 2 (Primer on Latency, TCP Fundamentals)",
      whyReadThis: "Explains how the physical speed of light in fiber optics and packet handshakes govern all backend latencies.",
      readingUrl: "https://hpbn.co/"
    },
    handsOnChallenge: {
      ticketNumber: "TICKET-001",
      title: "Measure Network Latency & Process Resource Footprint",
      scenario: "Identify memory page allocations and system call overhead for an API handling concurrent network connections.",
      acceptanceCriteria: [
        "Measure system socket connections and file descriptors using lsof or netstat.",
        "Profile request latency breakdown between DNS, TCP handshake, TLS negotiation, and TTFB."
      ],
      terminalLab: `# Inspect file descriptors and open network sockets for your backend process
lsof -p $(pgrep -f node) -a -i
curl -w "DNS: %{time_namelookup}s | Connect: %{time_connect}s | TLS: %{time_appconnect}s | TTFB: %{time_starttransfer}s | Total: %{time_total}s\n" -o /dev/null -s https://httpbin.org/get`,
      hints: [
        "Remember that everything in UNIX is a file descriptor, including network sockets.",
        "High socket counts without closure result in 'EMFILE: too many open files' errors."
      ],
      solutionCode: `curl -w "DNS: %{time_namelookup}s\nConnect: %{time_connect}s\nTLS: %{time_appconnect}s\nTTFB: %{time_starttransfer}s\nTotal: %{time_total}s\n" -o /dev/null -s https://httpbin.org/get`,
      solutionExplanation: "Isolating network handshake latency from TTFB proves whether performance issues stem from physical routing or backend execution."
    },
    selfCheckQuestions: [
      {
        question: "Why is network latency fundamentally bounded by physics (speed of light in fiber optic cables)?",
        answerExplanation: "Light travels through silica glass at roughly 200,000 km/s (~67% speed of light in vacuum). Round trips across continents require dozens of milliseconds regardless of how fast your CPU is."
      },
      {
        question: "What is the difference between CPU-bound and I/O-bound bottlenecks?",
        answerExplanation: "CPU-bound tasks peg compute cores (e.g. video encoding, cryptographic hashing, JSON parsing), whereas I/O-bound tasks wait for external bytes across networks or storage disks."
      }
    ]
  },
  {
    id: "backend-high-level",
    number: 2,
    title: "High-Level Understanding: What is a Backend, How it Works & Why We Need It",
    phaseId: 1,
    phaseName: "Foundations & Web Protocols",
    duration: "2 hrs 26 min",
    youtubeId: "KOutPbKc9UM",
    youtubeChannelUrl: CHANNEL_URL,
    shortSummary: "Client-server architecture, reverse proxies, edge gateways, application runtimes, and distributed state boundaries.",
    seniorInsight: {
      quote: "The frontend is an untrusted remote sandbox. Never delegate authority or data integrity checks to the client.",
      productionLesson: "In production, client-side validation is strictly for user experience. Every single business invariant, pricing computation, and permission rule must be authoritatively enforced on the backend.",
      commonMistake: "Allowing the client to dictate database foreign keys or assuming HTTP parameters haven't been tampered with in transit."
    },
    coreDeepDive: {
      what: "The backend is the centralized tier that executes critical business logic, orchestrates data persistence, and coordinates microservices.",
      why: "Enables independent horizontal scaling, multi-client support (one API for iOS, Android, and Web), and unified security enforcement.",
      howItWorks: [
        "1. Client resolves host IP via DNS recursive resolvers.",
        "2. Reverse proxy terminates TLS, applies rate limits, and load balances traffic to private subnets.",
        "3. Application server processes requests, executes business rules, queries databases, and emits telemetry.",
        "4. Formatted responses return via standardized status codes and serializations."
      ],
      blueprintTitle: "Three-Tier Backend Topology",
      blueprintCode: `[Client (Mobile/Web)]
       │ (HTTPS :443)
       ▼
[Edge / Reverse Proxy: Nginx/Cloudflare]
       │ (Private VPC HTTP :8080)
       ▼
[Stateless App Servers (Node/Go/Python)]
    ├── [Primary DB: PostgreSQL] (ACID state)
    └── [Cache Tier: Redis]      (In-memory sessions)`,
      blueprintLanguage: "text"
    },
    recommendedBook: {
      title: "Designing Data-Intensive Applications (DDIA)",
      author: "Martin Kleppmann",
      keyChapters: "Chapter 1: Reliable, Scalable, and Maintainable Applications",
      whyReadThis: "The seminal master text explaining how distributed backend systems guarantee reliability, scalability, and maintainability.",
      readingUrl: "https://dataintensive.net/"
    },
    handsOnChallenge: {
      ticketNumber: "TICKET-002",
      title: "Architect an Isolated Three-Tier Network Boundary",
      scenario: "Configure reverse proxy TLS termination and verify that private databases and services cannot be accessed directly from the public internet.",
      acceptanceCriteria: [
        "Bind application services to private localhost or VPC IP addresses.",
        "Ensure public traffic only enters through the reverse proxy on port 443."
      ],
      terminalLab: `# Verify public port listening
netstat -tuln | grep -E ":80|:443|:5432|:6379"`,
      hints: [
        "Databases should NEVER bind to 0.0.0.0 in production.",
        "Use private Docker networks or VPC security groups."
      ],
      solutionCode: `# Docker Compose isolated backend subnet
networks:
  frontend-tier:
  backend-db:
    internal: true`,
      solutionExplanation: "Declaring internal: true isolates databases onto private virtual interfaces, preventing accidental exposure to public interfaces."
    },
    selfCheckQuestions: [
      {
        question: "Why should databases never be exposed directly to the public internet?",
        answerExplanation: "Exposing database ports (e.g. 5432 or 6379) invites brute-force attacks, connection exhaustion DoS, zero-day exploit vulnerabilities, and lacks application-level RBAC auditing."
      }
    ]
  },
  {
    id: "http-protocol-deep-dive",
    number: 3,
    title: "HTTP Protocol Deep Dive (HTTP/1.1 vs HTTP/2 vs HTTP/3, Headers, Status Codes, Idempotency)",
    phaseId: 1,
    phaseName: "Foundations & Web Protocols",
    duration: "39 min",
    youtubeId: "iYM2zFP3Zn0",
    youtubeChannelUrl: CHANNEL_URL,
    shortSummary: "HTTP/1.1 pipelining, HTTP/2 binary framing & multiplexing, HTTP/3 QUIC over UDP, idempotency, and standardized status codes.",
    seniorInsight: {
      quote: "Understanding idempotency separates engineers who build billing race conditions from engineers who build fault-tolerant payment systems.",
      productionLesson: "Networks will duplicate packets and users will double-click. If state-mutating endpoints (like payments or checkout) lack idempotency keys, duplicate network packets will charge customers multiple times.",
      commonMistake: "Using GET for mutations, or blindly returning 200 OK with an error payload inside the JSON body."
    },
    coreDeepDive: {
      what: "HTTP is the application-layer foundation protocol of the internet, defining methods, headers, status codes, and message semantics.",
      why: "Adhering to HTTP semantics enables CDN caching, transparent proxy routing, browser prefetching, and robust automated client retries.",
      howItWorks: [
        "1. Safe methods (GET, HEAD, OPTIONS) never mutate server state.",
        "2. Idempotent methods (PUT, DELETE, GET) produce the identical server state whether executed 1 time or 10 times.",
        "3. HTTP/2 eliminates head-of-line blocking via interleaved binary streams over a single TCP connection.",
        "4. HTTP/3 replaces TCP with QUIC over UDP, preventing packet loss on one stream from stalling unrelated streams."
      ],
      blueprintTitle: "RFC 9457 Problem Details Standard",
      blueprintCode: `// HTTP/1.1 422 Unprocessable Entity
// Content-Type: application/problem+json
{
  "type": "https://api.example.com/errors/insufficient-funds",
  "title": "Insufficient Account Balance",
  "status": 422,
  "detail": "Transfer of 100 ETB requested, but available balance is 45 ETB.",
  "instance": "/accounts/acc_9281/transfers",
  "code": "INSUFFICIENT_FUNDS"
}`,
      blueprintLanguage: "json"
    },
    recommendedBook: {
      title: "HTTP: The Definitive Guide",
      author: "David Gourley & Brian Totty",
      keyChapters: "Chapters 3, 7 & 11 (HTTP Messages, Caching Directives, and Proxies)",
      whyReadThis: "The timeless canonical guide to web protocols, caching headers (ETag, Cache-Control), and proxy negotiation.",
      readingUrl: "https://developer.mozilla.org/en-US/docs/Web/HTTP"
    },
    handsOnChallenge: {
      ticketNumber: "TICKET-003",
      title: "Implement Idempotency Key Middleware for Financial Transactions",
      scenario: "Mobile users on unstable network connections experience dropouts and retry payment requests. Enforce Idempotency-Key headers.",
      acceptanceCriteria: [
        "Check for presence of Idempotency-Key header.",
        "If key was processed within 24h, return cached status code and payload without re-executing business logic.",
        "If key is active, acquire atomic lock to reject concurrent double submissions with 409 Conflict."
      ],
      terminalLab: `# Send initial payment request
curl -X POST https://httpbin.org/post -H "Idempotency-Key: 9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d" -d '{"amount": 500}'`,
      hints: [
        "Use Redis SET key payload NX EX 86400 to atomically claim the idempotency token."
      ],
      solutionCode: `async function idempotencyMiddleware(req, res, next) {
  const key = req.headers['idempotency-key'];
  if (!key) return res.status(400).json({ error: 'Missing Idempotency-Key header' });
  const cached = await redis.get('idemp:' + key);
  if (cached) {
    const { status, body } = JSON.parse(cached);
    return res.status(status).json(body);
  }
  next();
}`,
      solutionExplanation: "Storing completed responses against unique client-generated UUIDs ensures that retries replay the saved outcome safely."
    },
    selfCheckQuestions: [
      {
        question: "Why is PUT idempotent while PATCH is not guaranteed to be idempotent?",
        answerExplanation: "PUT replaces the entire resource with the provided payload (repeating it produces the same entity). PATCH applies a delta (e.g. 'increment count by 1'), which changes state on every repeat."
      },
      {
        question: "What problem does HTTP/3 QUIC solve that HTTP/2 could not?",
        answerExplanation: "HTTP/2 multiplexes streams over a single TCP connection; when one packet is dropped, TCP stalls all streams (TCP head-of-line blocking). HTTP/3 uses QUIC over UDP where packet loss only impacts the single affected stream."
      }
    ]
  },
  {
    id: "routing-request-dispatching",
    number: 4,
    title: "Routing & Request Dispatching (Radix Trees, Versioning)",
    phaseId: 1,
    phaseName: "Foundations & Web Protocols",
    duration: "3 hrs 07 min",
    youtubeId: "WXsD0ZgxjRw",
    youtubeChannelUrl: CHANNEL_URL,
    shortSummary: "URL dispatching, Trie and Radix tree data structures, path parameters, route grouping, and API versioning strategies.",
    seniorInsight: {
      quote: "Never break public API contracts. URL versioning (/v1) allows internal schema refactoring without bricking mobile applications in the wild.",
      productionLesson: "Linear regex-based routers degrade to O(N) lookup time as routes grow into hundreds. Production web frameworks (Go Gin/Chi, Fastify) utilize Radix Trees (O(K) where K is URL path depth), maintaining constant lookup speed.",
      commonMistake: "Failing to return 405 Method Not Allowed with an 'Allow' header when a route matches the URL path but not the HTTP verb."
    },
    coreDeepDive: {
      what: "Routing is the mechanism of matching incoming HTTP Method + URL Path combinations to the designated controller handler function.",
      why: "Efficient routing enables scalable API discovery, clean resource nesting, and hierarchical middleware application.",
      howItWorks: [
        "1. Static prefixes are organized into Radix Tree edges with shared common prefixes.",
        "2. Dynamic parameterized nodes (:userId) match variable path segments and inject them into request parameters.",
        "3. Catch-all wildcards (*filepath) handle remaining subpath captures."
      ],
      blueprintTitle: "Radix Tree Routing Structure",
      blueprintCode: `/api
  └── /v1
        ├── /users
        │     └── /:id (GET, PUT, DELETE)
        │           └── /orders (GET)
        └── /auth
              ├── /login (POST)
              └── /register (POST)`,
      blueprintLanguage: "text"
    },
    recommendedBook: {
      title: "Designing Web APIs",
      author: "Brenda Jin, Saurabh Sahni & Amir Shevat",
      keyChapters: "Chapter 3: API Design Basics & URL Structure",
      whyReadThis: "Practical guidelines for constructing intuitive, durable, and REST-compliant route hierarchies.",
      readingUrl: "https://swagger.io/resources/articles/best-practices-in-api-design/"
    },
    handsOnChallenge: {
      ticketNumber: "TICKET-004",
      title: "Implement API Versioning and Method Validation",
      scenario: "Refactor unversioned flat routes into structured /api/v1 groups and ensure invalid HTTP methods return 405 with an Allow header.",
      acceptanceCriteria: [
        "Prefix all resource routes with /api/v1.",
        "Return 405 Method Not Allowed when method does not match.",
        "Include the Allow header listing supported methods."
      ],
      terminalLab: `# Test 405 response
curl -i -X POST https://api.github.com/zen`,
      hints: [
        "Inspect RFC 9110 Section 15.5.6: 405 responses MUST generate an Allow header field containing supported methods."
      ],
      solutionCode: `app.use('/api/v1/users', (req, res) => {
  if (!['GET', 'POST'].includes(req.method)) {
    res.setHeader('Allow', 'GET, POST');
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
});`,
      solutionExplanation: "Returning 405 rather than 404 communicates to the client that the endpoint exists but the HTTP verb is incorrect."
    },
    selfCheckQuestions: [
      {
        question: "Why is a Radix Tree more efficient than an array of regular expressions for routing?",
        answerExplanation: "A regex array requires testing routes sequentially in O(N) time. A Radix Tree splits paths by common prefixes, matching in O(K) time where K is path length, regardless of how many thousands of routes exist."
      }
    ]
  },
  {
    id: "serialization-deserialization",
    number: 5,
    title: "Serialization & Deserialization (JSON vs Protobuf, 64-bit Int Precision)",
    phaseId: 1,
    phaseName: "Foundations & Web Protocols",
    duration: "36 min",
    youtubeId: "46O73On0gyI",
    youtubeChannelUrl: CHANNEL_URL,
    shortSummary: "JSON parsing overhead, Protocol Buffers binary framing, gRPC, and the JavaScript 64-bit integer precision bug.",
    seniorInsight: {
      quote: "JSON numbers are IEEE 754 floating point. A 64-bit database ID (e.g. 9007199254740993) will silently corrupt into 9007199254740992 in JavaScript unless serialized as a string.",
      productionLesson: "Always serialize IDs as strings (or use UUIDv7) when targeting web and mobile clients. For high-throughput internal microservice communication, migrate from JSON to Protocol Buffers for 5x throughput and 80% bandwidth savings.",
      commonMistake: "Deserializing untrusted user inputs directly into internal domain models without strict schema stripping (Mass Assignment vulnerability)."
    },
    coreDeepDive: {
      what: "Serialization converts in-memory objects into transportable byte streams; deserialization reconstructs objects from bytes.",
      why: "Different programming languages and runtimes must exchange structured data over TCP sockets safely and efficiently.",
      howItWorks: [
        "1. Text-based (JSON, XML): Human-readable, higher CPU parse overhead, verbose text representation.",
        "2. Binary (Protobuf, MsgPack, FlatBuffers): Schema-enforced, zero-copy parsing, compact byte serialization."
      ],
      blueprintTitle: "Safe DTO Schema Validation",
      blueprintCode: `import { z } from "zod";

export const CreateUserSchema = z.object({
  email: z.string().email(),
  // Always accept 64-bit IDs as strings to prevent JS float corruption
  organizationId: z.string().regex(/^\\d+$/),
  age: z.number().int().min(18),
}).strict(); // Strip unauthorized fields`,
      blueprintLanguage: "typescript"
    },
    recommendedBook: {
      title: "Designing Data-Intensive Applications (DDIA)",
      author: "Martin Kleppmann",
      keyChapters: "Chapter 4: Encoding and Evolution (Formats, Thrift, Protocol Buffers, Avro)",
      whyReadThis: "The definitive analysis of binary formats, schema evolution, backward/forward compatibility, and RPC serialization.",
      readingUrl: "https://dataintensive.net/"
    },
    handsOnChallenge: {
      ticketNumber: "TICKET-005",
      title: "Debug 64-bit Integer Corruption & Implement Protobuf Schema",
      scenario: "Database primary keys exceeding Number.MAX_SAFE_INTEGER (9007199254740991) are corrupting when fetched by web frontends.",
      acceptanceCriteria: [
        "Demonstrate precision loss with JSON.parse on 9007199254740993.",
        "Implement a custom serializer that converts BIGINT columns to strings."
      ],
      terminalLab: `node -e 'console.log("JSON Parse:", JSON.parse("{\\"id\\": 9007199254740993}").id); console.log("Max Safe:", Number.MAX_SAFE_INTEGER);'`,
      hints: [
        "Notice how 9007199254740993 rounds down to 9007199254740992!"
      ],
      solutionCode: `// Custom BigInt serializer for JSON.stringify
BigInt.prototype.toJSON = function() {
  return this.toString();
};`,
      solutionExplanation: "Transforming BigInt primitives into strings before serialization prevents the V8 engine from coercing integers into lossy IEEE 754 floats."
    },
    selfCheckQuestions: [
      {
        question: "Why does JavaScript corrupt 64-bit integers like 9007199254740993 in JSON payloads?",
        answerExplanation: "The JavaScript Number primitive is an IEEE 754 double-precision float with only 53 bits for the mantissa. Values exceeding 2^53 - 1 lose precision and round to the nearest even number."
      }
    ]
  },

  // ==========================================
  // PHASE 2: Core API Architecture & Request Lifecycle
  // ==========================================
  {
    id: "middlewares-interceptor-patterns",
    number: 6,
    title: "Request Lifecycle: Middlewares & Interceptor Patterns",
    phaseId: 2,
    phaseName: "Core API Architecture & Request Lifecycle",
    duration: "1 hr 46 min",
    youtubeId: "CnH3kAXSrmU",
    youtubeChannelUrl: CHANNEL_URL,
    shortSummary: "The Onion architecture: Inbound interceptors, auth guards, rate limiters, logging, short-circuiting, and error-handling middleware.",
    seniorInsight: {
      quote: "Middlewares are the immune system of your backend. Every cross-cutting concern must be intercepted before reaching business domain handlers.",
      productionLesson: "Order of middleware execution is critical. If your body-parser middleware runs after your signature verification middleware, raw webhook bytes will be mutated and cryptographic HMAC checks will fail.",
      commonMistake: "Forgetting to call next() or neglecting to return after sending an HTTP response, triggering 'Headers already sent' runtime crashes."
    },
    coreDeepDive: {
      what: "Middleware is a pipeline of functions that intercept HTTP requests and responses before and after controller execution.",
      why: "Prevents code duplication across endpoints for authentication, request logging, rate limiting, and global error handling.",
      howItWorks: [
        "1. Request traverses inbound middlewares (Onion exterior -> interior).",
        "2. Any middleware can short-circuit the chain by returning early (e.g. 401 Unauthorized or 429 Too Many Requests).",
        "3. Controller executes core logic and sends response.",
        "4. Response traverses outbound path (e.g. response compression, telemetry timing)."
      ],
      blueprintTitle: "Onion Middleware Pipeline Execution",
      blueprintCode: `[Incoming Request]
       │
       ▼
[1. Request Correlation ID & Logger]
       │
       ▼
[2. Rate Limiting & IP Filter]
       │
       ▼
[3. Auth Token Verification (JWT/Session)]
       │
       ▼
[4. Controller Handler Execution]
       │
       ▼
[5. Error Handler Catch-All (if thrown)]`,
      blueprintLanguage: "text"
    },
    recommendedBook: {
      title: "Node.js Design Patterns (3rd Edition)",
      author: "Mario Casciaro & Luciano Mammino",
      keyChapters: "Chapter 9: Behavioral Design Patterns (Middleware & Pipeline)",
      whyReadThis: "Comprehensive breakdown of interceptor, chain of responsibility, and pipeline patterns in production web backends.",
      readingUrl: "https://www.nodejsdesignpatterns.com/"
    },
    handsOnChallenge: {
      ticketNumber: "TICKET-006",
      title: "Build an Execution-Timing and Request-ID Correlation Middleware",
      scenario: "Requests are failing across microservices with no trace. Implement a middleware that generates a unique X-Request-ID and measures execution duration.",
      acceptanceCriteria: [
        "Extract existing X-Request-ID or generate UUIDv7.",
        "Attach request ID to incoming headers and outgoing response headers.",
        "Log request start, completion status code, and total latency in milliseconds."
      ],
      terminalLab: `curl -i -H "X-Request-ID: test-trace-uuid-123" https://httpbin.org/headers`,
      hints: [
        "Use process.hrtime.bigint() for microsecond-precise latency measurement."
      ],
      solutionCode: `function correlationMiddleware(req, res, next) {
  const reqId = req.headers['x-request-id'] || crypto.randomUUID();
  req.id = reqId;
  res.setHeader('X-Request-ID', reqId);
  const start = process.hrtime.bigint();
  res.on('finish', () => {
    const elapsedMs = Number(process.hrtime.bigint() - start) / 1e6;
    console.log('[' + reqId + '] ' + req.method + ' ' + req.url + ' ' + res.statusCode + ' - ' + elapsedMs.toFixed(2) + 'ms');
  });
  next();
}`,
      solutionExplanation: "Binding correlation IDs at the outermost middleware layer guarantees that all subsequent logs and sub-service calls carry the same trace identifier."
    },
    selfCheckQuestions: [
      {
        question: "What happens if a middleware encounters an uncaught asynchronous exception without calling next(err)?",
        answerExplanation: "The request hangs until the client or reverse proxy hits a timeout (e.g. 504 Gateway Timeout), consuming server socket resources and connection pool capacity."
      }
    ]
  },
  {
    id: "request-context-deadlines",
    number: 7,
    title: "Request Context & Cancellation Deadlines",
    phaseId: 2,
    phaseName: "Core API Architecture & Request Lifecycle",
    duration: "33 min",
    youtubeId: "LSzR0VEraWw",
    youtubeChannelUrl: CHANNEL_URL,
    shortSummary: "Context propagation, cancellation signals, deadline timeouts, and preventing zombie database queries when clients disconnect.",
    seniorInsight: {
      quote: "When a user closes their browser tab, your server should immediately stop burning CPU and abort pending database queries.",
      productionLesson: "Always pass the request context or AbortSignal into database queries and downstream HTTP fetches. Without deadline propagation, a slow 30-second query will continue running on PostgreSQL even though the client gave up 29 seconds ago.",
      commonMistake: "Creating detached background promises inside HTTP handlers that run indefinitely without cancellation boundaries."
    },
    coreDeepDive: {
      what: "Request Context carries request-scoped values, cancellation signals, and deadlines across API boundaries, worker goroutines, and database drivers.",
      why: "Halts wasted compute and prevents database pool exhaustion when users abandon slow requests.",
      howItWorks: [
        "1. Middleware attaches an AbortController or context.WithTimeout(ctx, 3*time.Second).",
        "2. The cancellation signal is passed into database queries (e.g. pg.query({ text, signal })).",
        "3. If the client socket closes or timeout expires, the signal triggers an abort event.",
        "4. PostgreSQL driver sends an immediate cancel packet to terminate the remote query."
      ],
      blueprintTitle: "Context Cancellation Propagation",
      blueprintCode: `[Client Disconnects / Timeout Expires]
       │
       ▼ (AbortSignal Emitted)
[Express / Go HTTP Context]
       ├── [Downstream Fetch Aborted]
       └── [PostgreSQL Query Cancelled via Driver]`,
      blueprintLanguage: "text"
    },
    recommendedBook: {
      title: "Concurrency in Go",
      author: "Katherine Cox-Buday",
      keyChapters: "Chapter 4: Concurrency Patterns in Go (The Context Package)",
      whyReadThis: "The gold-standard resource for understanding request timeouts, cancellation trees, and deadline propagation.",
      readingUrl: "https://go.dev/blog/context"
    },
    handsOnChallenge: {
      ticketNumber: "TICKET-007",
      title: "Cancel Long-Running Database Query on Client Disconnect",
      scenario: "A heavy analytics query causes database connection pool starvation when users refresh the dashboard repeatedly.",
      acceptanceCriteria: [
        "Attach AbortSignal to database query.",
        "Simulate client disconnect with curl --max-time 1.",
        "Verify in PostgreSQL pg_stat_activity that query terminates immediately."
      ],
      terminalLab: `# Simulate client closing connection after 1 second
curl -m 1 http://localhost:3000/api/heavy-query`,
      hints: [
        "Listen to req.on('close') in Node.js or inspect ctx.Done() in Go."
      ],
      solutionCode: `app.get('/api/heavy-query', async (req, res) => {
  const controller = new AbortController();
  req.on('close', () => controller.abort());
  try {
    const result = await db.query('SELECT pg_sleep(10)', { signal: controller.signal });
    res.json(result);
  } catch (err) {
    if (err.name === 'AbortError') console.log('Query successfully cancelled');
  }
});`,
      solutionExplanation: "Propagating the cancellation signal to PostgreSQL instructs the database engine to release locks and terminate execution immediately."
    },
    selfCheckQuestions: [
      {
        question: "What is a 'zombie query' and why is it dangerous to backend database clusters?",
        answerExplanation: "A zombie query is a database query that continues executing after the requesting client has disconnected. It holds row locks, consumes CPU, and starves connection pools with zero benefit."
      }
    ]
  },
  {
    id: "validation-transformation-dtos",
    number: 8,
    title: "Validation & Transformation (Data Transfer Objects - DTOs, Schema Guards)",
    phaseId: 2,
    phaseName: "Core API Architecture & Request Lifecycle",
    duration: "37 min",
    youtubeId: "Dgym6yLNUbM",
    youtubeChannelUrl: CHANNEL_URL,
    shortSummary: "Data Transfer Objects (DTOs), schema guards (Zod/class-validator), type coercion, stripping mass-assignment fields, and domain primitives.",
    seniorInsight: {
      quote: "Make illegal states unrepresentable. A validated DTO guarantees that business services never deal with undefined, null, or malformed data.",
      productionLesson: "Never pass raw request bodies directly into database ORM save methods. Attackers exploit Mass Assignment vulnerabilities by submitting fields like { role: 'admin', isVerified: true } to elevate permissions.",
      commonMistake: "Validating data inside controllers instead of enforcing strict schema validation at the HTTP boundary."
    },
    coreDeepDive: {
      what: "DTO validation parses raw, untrusted client inputs, coerces types, strips unrecognized properties, and guarantees type safety before entering service layers.",
      why: "Eliminates injection attacks, prevents unexpected runtime null pointers, and shields database schemas from mass assignment exploits.",
      howItWorks: [
        "1. HTTP request payload lands in controller boundary.",
        "2. Validation schema parses and validates fields (email, password strength, regex).",
        "3. Unknown keys are rejected or stripped (.strict()).",
        "4. Validated DTO object is passed into the service layer."
      ],
      blueprintTitle: "DTO Validation & Domain Guard",
      blueprintCode: `import { z } from "zod";

export const UpdateProfileSchema = z.object({
  displayName: z.string().trim().min(2).max(50),
  bio: z.string().max(500).optional(),
  // Strict mode explicitly throws if client attempts to inject 'role' or 'isAdmin'
}).strict();

export type UpdateProfileDTO = z.infer<typeof UpdateProfileSchema>;`,
      blueprintLanguage: "typescript"
    },
    recommendedBook: {
      title: "Secure by Design",
      author: "Dan Bergh Johnsson, Daniel Deogun & Daniel Sawano",
      keyChapters: "Chapter 3: Domain Primitives (Making illegal states unrepresentable)",
      whyReadThis: "Teaches how domain primitives and strict input typing eliminate whole classes of security and logic bugs.",
      readingUrl: "https://cheatsheetseries.owasp.org/"
    },
    handsOnChallenge: {
      ticketNumber: "TICKET-008",
      title: "Prevent Mass Assignment Security Vulnerability",
      scenario: "An attacker upgraded their account to superadmin by sending { role: 'ADMIN' } in the user profile update endpoint.",
      acceptanceCriteria: [
        "Create a strict DTO schema that only permits allowed fields (name, bio).",
        "Reject requests with unknown keys with a 400 Bad Request explaining the violation."
      ],
      terminalLab: `# Simulate exploit payload
curl -X PUT http://localhost:3000/api/profile -H "Content-Type: application/json" -d '{"name": "Alice", "role": "ADMIN"}'`,
      hints: [
        "Use Zod's .strict() or Joi's .unknown(false) to disallow unexpected properties."
      ],
      solutionCode: `const schema = z.object({
  name: z.string().min(1),
  bio: z.string().optional()
}).strict();

function validate(req, res, next) {
  const result = schema.safeParse(req.body);
  if (!result.success) return res.status(400).json({ error: result.error.format() });
  req.validatedBody = result.data;
  next();
}`,
      solutionExplanation: "Strict validation rejects any property not explicitly declared in the DTO whitelist, blocking unauthorized state tampering."
    },
    selfCheckQuestions: [
      {
        question: "What is a Mass Assignment vulnerability and how do DTOs prevent it?",
        answerExplanation: "Mass Assignment occurs when client inputs are blindly bound to database models, allowing attackers to modify protected columns (e.g. role, balance, verified). DTO whitelisting ensures only permitted fields reach database queries."
      }
    ]
  },
  {
    id: "handlers-controllers-services",
    number: 9,
    title: "Handlers, Controllers, and Services (Layered Architecture & Separation of Concerns)",
    phaseId: 2,
    phaseName: "Core API Architecture & Request Lifecycle",
    duration: "58 min",
    youtubeId: "f7Su4KoqSio",
    youtubeChannelUrl: CHANNEL_URL,
    shortSummary: "Three-tier architecture, Clean Architecture, decoupling transport layers from business logic, and repository patterns.",
    seniorInsight: {
      quote: "Controllers should be dumb. They unpack HTTP requests, call the service layer, and format the response. Never write SQL or business rules in a controller.",
      productionLesson: "When business logic lives inside HTTP controllers, you cannot test it without mocking HTTP servers, and you cannot reuse it in background queues, cron jobs, or CLI tools.",
      commonMistake: "Mixing SQL queries, authentication parsing, validation, and email dispatching inside a single massive controller function."
    },
    coreDeepDive: {
      what: "Layered architecture isolates concerns into distinct tiers: Transport/Controller (HTTP), Service/Domain (Business Rules), and Repository (Data Access).",
      why: "Allows switching web frameworks or databases without rewriting business logic, and makes unit testing fast and decoupled from network sockets.",
      howItWorks: [
        "1. Controller receives HTTP request, parses DTO, and extracts user identity.",
        "2. Service evaluates business invariants, executes domain workflows, and coordinates transactions.",
        "3. Repository executes SQL queries against PostgreSQL and maps rows to domain entities."
      ],
      blueprintTitle: "Clean Layered Architecture Flow",
      blueprintCode: `[HTTP Request]
       │
       ▼
[Controller Layer]  <-- Parses DTO, returns HTTP 200/400 status codes
       │
       ▼
[Service Layer]     <-- Pure business logic, pricing calculation, invariants
       │
       ▼
[Repository Layer]  <-- SQL queries, database transactions, Redis cache`,
      blueprintLanguage: "text"
    },
    recommendedBook: {
      title: "Clean Architecture: A Craftsman's Guide",
      author: "Robert C. Martin (Uncle Bob)",
      keyChapters: "Chapters 20 & 22 (Business Rules and Clean Architecture)",
      whyReadThis: "The classic architectural treatise on decoupling business logic from databases, frameworks, and UI boundaries.",
      readingUrl: "https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html"
    },
    handsOnChallenge: {
      ticketNumber: "TICKET-009",
      title: "Refactor a 500-line Fat Controller into Three-Tier Layers",
      scenario: "A legacy endpoint contains database queries, password hashing, and payment gateway calls all inside one Express handler.",
      acceptanceCriteria: [
        "Extract business logic into UserService.",
        "Extract database queries into UserRepository.",
        "Keep UserController under 20 lines of code."
      ],
      terminalLab: `npm test -- test/user-service.test.js`,
      hints: [
        "The service layer should never accept (req, res) objects. Pass clean domain objects."
      ],
      solutionCode: `// Clean Controller
export async function registerController(req, res) {
  const dto = req.validatedBody;
  const user = await userService.registerUser(dto);
  return res.status(201).json(user);
}`,
      solutionExplanation: "Decoupling transport objects (req, res) from business services allows testing userService.registerUser in pure unit tests without HTTP mocks."
    },
    selfCheckQuestions: [
      {
        question: "Why should a Service layer method never accept an Express req or res object?",
        answerExplanation: "Coupling services to HTTP framework objects makes them impossible to reuse in message queue workers, CLI scripts, or alternative protocols (like gRPC or WebSockets)."
      }
    ]
  },
  {
    id: "restful-architecture-openapi",
    number: 10,
    title: "RESTful Architecture & OpenAPI Standards (Idempotency, Resource Design, API Contracts)",
    phaseId: 2,
    phaseName: "Core API Architecture & Request Lifecycle",
    duration: "45 min",
    youtubeId: "lsMQRaeKNDk",
    youtubeChannelUrl: CHANNEL_URL,
    shortSummary: "Resource modeling, RESTful URI design, OpenAPI 3.0 specification, contract-first development, and generating client SDKs.",
    secondaryVideo: {
      youtubeId: "PenvYHJ9Koc",
      title: "Understand OpenAPI in 5 Minutes With Examples",
      duration: "10 min",
      description: "Quick walkthrough of OpenAPI 3.0 spec structure, schemas, and Swagger UI generation."
    },
    seniorInsight: {
      quote: "Write your OpenAPI spec before writing a single line of backend code. An agreed contract prevents weeks of integration misalignment with frontend and mobile teams.",
      productionLesson: "Contract-first design allows frontend teams to generate TypeScript clients and mock servers immediately, parallelizing feature development while backend engineers write the implementation.",
      commonMistake: "Using action verbs in URLs like /api/deleteUser or /api/getUsersById instead of clean REST resources like DELETE /api/users/:id."
    },
    coreDeepDive: {
      what: "REST is an architectural style based on stateless resource representations; OpenAPI is the industry-standard machine-readable specification for documenting APIs.",
      why: "Provides automated interactive documentation (Swagger UI), automated client SDK generation, and contract validation testing.",
      howItWorks: [
        "1. Resources are nouns: /api/v1/orders, /api/v1/orders/{orderId}/items.",
        "2. HTTP verbs specify operations: POST (create), GET (read), PUT (replace), PATCH (update), DELETE (remove).",
        "3. OpenAPI YAML/JSON schema defines parameters, request bodies, and standardized response codes."
      ],
      blueprintTitle: "OpenAPI 3.0 Resource Specification",
      blueprintCode: `openapi: 3.0.3
info:
  title: Order Processing Service
  version: 1.0.0
paths:
  /api/v1/orders/{orderId}:
    get:
      summary: Retrieve an order by UUID
      parameters:
        - name: orderId
          in: path
          required: true
          schema:
            type: string
            format: uuid
      responses:
        '200':
          description: Order details
        '404':
          description: Order not found`,
      blueprintLanguage: "yaml"
    },
    recommendedBook: {
      title: "RESTful Web APIs",
      author: "Leonard Richardson & Mike Amundsen",
      keyChapters: "Chapter 4: The Resource-Oriented Architecture",
      whyReadThis: "The authoritative book on resource design, uniform interfaces, and stateless REST representations.",
      readingUrl: "https://restfulapi.net/"
    },
    handsOnChallenge: {
      ticketNumber: "TICKET-010",
      title: "Design OpenAPI 3.0 Contract and Serve Swagger UI",
      scenario: "Mobile engineers need an interactive contract for the payment checkout system before backend implementation begins.",
      acceptanceCriteria: [
        "Author openapi.yaml specifying POST /checkout with 201 Created and 400 Bad Request responses.",
        "Serve Swagger UI or Scalar at /docs."
      ],
      terminalLab: `npx @scalar/cli validate openapi.yaml`,
      hints: [
        "Ensure all error responses reference application/problem+json schemas."
      ],
      solutionCode: `import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
const spec = YAML.load('./openapi.yaml');
app.use('/docs', swaggerUi.serve, swaggerUi.setup(spec));`,
      solutionExplanation: "Serving automated documentation ensures both human developers and automated SDK generators always work against the exact same API contract."
    },
    selfCheckQuestions: [
      {
        question: "Why should RESTful URIs use nouns (e.g. /orders) rather than verbs (e.g. /getOrders)?",
        answerExplanation: "HTTP verbs (GET, POST, PUT, DELETE) already declare the action to be taken. Using verbs in the URI violates the uniform interface constraint and creates inconsistent routing."
      }
    ]
  },
  {
    id: "crud-deep-dive-state-mutation",
    number: 11,
    title: "CRUD Deep Dive & State Mutation",
    phaseId: 2,
    phaseName: "Core API Architecture & Request Lifecycle",
    duration: "3 hrs 09 min",
    youtubeId: "rOpEN1JDaD0",
    youtubeChannelUrl: CHANNEL_URL,
    shortSummary: "Create, Read, Update, Delete in production: Soft deletes vs hard deletes, cursor vs offset pagination, and optimistic vs pessimistic locking.",
    seniorInsight: {
      quote: "Offset pagination (OFFSET 1000000 LIMIT 20) is a database killer. In production, always use keyset/cursor-based pagination.",
      productionLesson: "With OFFSET 100000, PostgreSQL must scan 100,020 rows off disk, discard the first 100,000, and return 20, causing query time to explode. Keyset pagination (WHERE id < last_id ORDER BY id DESC LIMIT 20) uses the B-Tree index to fetch rows in 0.1ms.",
      commonMistake: "Using hard deletes (DELETE FROM users) and accidentally breaking foreign key referential integrity across audit logs."
    },
    coreDeepDive: {
      what: "CRUD operations form the fundamental state mutation primitives of database-backed applications.",
      why: "Incorrect CRUD implementations lead to race conditions (lost updates), performance collapse on large datasets, and accidental data loss.",
      howItWorks: [
        "1. Keyset pagination passes an opaque cursor (e.g. base64-encoded created_at + id) for constant-time lookups.",
        "2. Soft deletes set deleted_at = NOW() instead of dropping rows, preserving historical integrity.",
        "3. Optimistic locking compares a version integer (UPDATE ... WHERE id = :id AND version = :v) to catch concurrent edits."
      ],
      blueprintTitle: "High-Performance Keyset (Cursor) Pagination",
      blueprintCode: `-- Inefficient Offset Pagination (O(N) full index traverse)
SELECT * FROM orders ORDER BY created_at DESC OFFSET 50000 LIMIT 20;

-- Efficient Keyset / Cursor Pagination (O(log N) direct B-Tree seek)
SELECT * FROM orders 
WHERE created_at < '2026-09-13T20:00:00Z'
ORDER BY created_at DESC 
LIMIT 20;`,
      blueprintLanguage: "sql"
    },
    recommendedBook: {
      title: "SQL Performance Explained",
      author: "Markus Winand",
      keyChapters: "Chapter 4: The Order By and Paging (Indexing for Pagination)",
      whyReadThis: "Explains why offset pagination destroys database performance and how index-backed pagination guarantees constant speed.",
      readingUrl: "https://use-the-index-luke.com/"
    },
    handsOnChallenge: {
      ticketNumber: "TICKET-011",
      title: "Implement Optimistic Concurrency Control to Prevent Lost Updates",
      scenario: "Two administrators edit the same store inventory simultaneously, causing one admin's price edit to overwrite the other's stock change.",
      acceptanceCriteria: [
        "Add a version column to the inventory table.",
        "Reject updates where version does not match with 409 Conflict."
      ],
      terminalLab: `psql -d testdb -c "UPDATE products SET stock = stock - 1, version = version + 1 WHERE id = 1 AND version = 5;"`,
      hints: [
        "Check affected rows count: if 0 rows were updated, a concurrent modification occurred!"
      ],
      solutionCode: `const updated = await db.query(
  'UPDATE products SET stock = $1, version = version + 1 WHERE id = $2 AND version = $3 RETURNING *',
  [newStock, productId, expectedVersion]
);
if (updated.rowCount === 0) {
  throw new ConflictError('Concurrent edit detected. Please refresh and retry.');
}`,
      solutionExplanation: "Optimistic locking checks that no other transaction changed the version column during the user's edit window without requiring heavy row-level database locks."
    },
    selfCheckQuestions: [
      {
        question: "Why does OFFSET pagination get slower the deeper the page number requested?",
        answerExplanation: "The database engine must read all N offset records from disk and evaluate sort ordering before throwing them away. At page 10,000, it reads 200,000 rows just to display 20."
      }
    ]
  },

  // ==========================================
  // PHASE 3: Data Persistence & Storage
  // ==========================================
  {
    id: "database-basics-postgresql",
    number: 12,
    title: "Database Basics & PostgreSQL Deep Dive (ACID, MVCC, Connection Pools)",
    phaseId: 3,
    phaseName: "Data Persistence & Storage",
    duration: "4 hrs 20 min",
    youtubeId: "qw--VYLpxG4",
    youtubeChannelUrl: CHANNEL_URL,
    shortSummary: "PostgreSQL relational architecture, ACID transactions, MVCC row versioning, transaction isolation levels, and PgBouncer connection pooling.",
    seniorInsight: {
      quote: "PostgreSQL does not update rows in place. An UPDATE writes an entirely new row tuple and marks the old tuple dead. Vacuuming cleans it up.",
      productionLesson: "PostgreSQL forks a dedicated OS process for every direct client connection (~10MB RAM per connection). Without an external connection pooler (like PgBouncer), spikes of 1,000 web connections will crash PostgreSQL with OOM or context-switching thrashing.",
      commonMistake: "Assuming Read Committed isolation prevents all race conditions (it does not prevent lost updates or phantom reads)."
    },
    coreDeepDive: {
      what: "PostgreSQL is an advanced, enterprise-grade relational database powered by Multi-Version Concurrency Control (MVCC) and strict ACID compliance.",
      why: "Guarantees financial-grade data durability and concurrent read/write isolation without table-locking overhead.",
      howItWorks: [
        "1. Write-Ahead Logging (WAL): Mutations are sequentially flushed to append-only WAL before modifying data pages, guaranteeing crash recovery.",
        "2. MVCC: Readers never block writers and writers never block readers because each transaction sees a consistent snapshot based on transaction IDs (xmin/xmax).",
        "3. Vacuum: Background autovacuum daemon purges dead row versions and prevents transaction ID wraparound."
      ],
      blueprintTitle: "PostgreSQL Connection Pooling Architecture",
      blueprintCode: `[1,000 Web Client Workers]
       │
       ▼ (Lightweight client connections)
[PgBouncer Pooler (Transaction Mode)]
       │
       ▼ (50 Persistent pooled server connections)
[PostgreSQL Database Instance] (ACID Execution Engine)`,
      blueprintLanguage: "text"
    },
    recommendedBook: {
      title: "The Art of PostgreSQL",
      author: "Dimitri Fontaine",
      keyChapters: "Chapters 4, 6 & 7 (Data Types, Concurrency, and Indexing Strategies)",
      whyReadThis: "Master-level exploration of SQL set-theory, concurrency control, and relational modeling in PostgreSQL.",
      readingUrl: "https://theartofpostgresql.com/"
    },
    handsOnChallenge: {
      ticketNumber: "TICKET-012",
      title: "Inspect MVCC Dead Tuples & Configure PgBouncer Pool",
      scenario: "High-volume updates on the orders table are bloating disk storage and slowing sequential scans due to dead tuples.",
      acceptanceCriteria: [
        "Query pg_stat_user_tables to detect n_dead_tup counts.",
        "Trigger VACUUM (VERBOSE, ANALYZE) to reclaim table space."
      ],
      terminalLab: `psql -d testdb -c "SELECT relname, n_live_tup, n_dead_tup, last_vacuum FROM pg_stat_user_tables;"`,
      hints: [
        "Look for tables where n_dead_tup exceeds n_live_tup!"
      ],
      solutionCode: `VACUUM (VERBOSE, ANALYZE) orders;`,
      solutionExplanation: "Vacuuming marks dead tuple space as reusable for future inserts, preventing table bloat and keeping index pages compact."
    },
    selfCheckQuestions: [
      {
        question: "How does MVCC allow readers and writers to operate concurrently without blocking each other?",
        answerExplanation: "Writers insert new versions of rows with xmin set to their transaction ID rather than mutating rows in-place. Readers look at a snapshot of transaction IDs that were committed before their transaction started, ignoring uncommitted or newer row versions."
      }
    ]
  },
  {
    id: "schema-design-relational-modeling",
    number: 13,
    title: "Schema Design & Relational Modeling (Normalization vs Denormalization, Foreign Keys)",
    phaseId: 3,
    phaseName: "Data Persistence & Storage",
    duration: "5 hrs 55 min",
    youtubeId: "26ls5lNiijk",
    youtubeChannelUrl: CHANNEL_URL,
    shortSummary: "Database normalization (1NF to 3NF), intentional denormalization, surrogate vs natural keys, UUIDv7, and foreign key referential integrity.",
    seniorInsight: {
      quote: "Normalize until it hurts, denormalize until it works. Premature denormalization causes data anomalies; premature normalization causes 12-table join deadlocks.",
      productionLesson: "Avoid sequential integer IDs (1, 2, 3) in public APIs because competitors can scrape your daily order volume (German Tank Problem). Use UUIDv7, which combines a millisecond Unix timestamp with randomness for monotonic B-Tree insertion locality.",
      commonMistake: "Omitting foreign key indexes, causing PostgreSQL to execute full table scans whenever parent rows are deleted or updated."
    },
    coreDeepDive: {
      what: "Relational modeling organizes domain entities into tables with strict mathematical relationships and constraints.",
      why: "Prevents data anomalies, guarantees referential integrity, and provides a durable foundation for application growth.",
      howItWorks: [
        "1. 1NF: Atomic values, no repeating groups.",
        "2. 2NF: No partial dependencies on composite primary keys.",
        "3. 3NF: No transitive dependencies (non-key columns depend only on the primary key).",
        "4. Denormalization: Selectively duplicating aggregate columns (e.g. comment_count) when read volume exceeds write volume by 1000:1."
      ],
      blueprintTitle: "UUIDv7 Primary Key Definition",
      blueprintCode: `-- PostgreSQL 17 / UUIDv7 Time-ordered UUID
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(), -- Time-ordered
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
  total_amount_cents BIGINT NOT NULL CHECK (total_amount_cents >= 0),
  status VARCHAR(32) NOT NULL DEFAULT 'PENDING',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Crucial: Always create an explicit index on foreign keys!
CREATE INDEX idx_orders_user_id ON orders(user_id);`,
      blueprintLanguage: "sql"
    },
    recommendedBook: {
      title: "Database Design for Mere Mortals",
      author: "Michael J. Hernandez",
      keyChapters: "Chapters 5 & 7 (Table Structures, Keys, and Normalization Rules)",
      whyReadThis: "The most practical, step-by-step methodology for relational schema design and integrity enforcement.",
      readingUrl: "https://www.geeksforgeeks.org/database-normalization-introduction/"
    },
    handsOnChallenge: {
      ticketNumber: "TICKET-013",
      title: "Model an E-Commerce Schema with Zero-Loss Inventory Invariants",
      scenario: "Design normalized tables for Users, Orders, OrderItems, and Inventory with foreign key constraints preventing orphan records.",
      acceptanceCriteria: [
        "Enforce ON DELETE RESTRICT on users with active orders.",
        "Use CHECK constraints to ensure inventory count never drops below zero.",
        "Index all foreign key reference columns."
      ],
      terminalLab: `psql -d testdb -c "\d orders"`,
      hints: [
        "Foreign key constraints automatically enforce referential integrity but DO NOT create indexes automatically!"
      ],
      solutionCode: `CREATE TABLE inventory (
  product_id UUID PRIMARY KEY,
  stock_quantity INT NOT NULL CHECK (stock_quantity >= 0)
);`,
      solutionExplanation: "Database CHECK constraints enforce business invariants at the lowest storage layer, guaranteeing corrupted data cannot be inserted even if application code has bugs."
    },
    selfCheckQuestions: [
      {
        question: "Why does UUIDv4 cause B-Tree index fragmentation while UUIDv7 does not?",
        answerExplanation: "UUIDv4 is completely random, inserting keys randomly across B-Tree pages and causing constant page splits and disk thrashing. UUIDv7 embeds a timestamp prefix, ensuring new keys append sequentially to the rightmost leaf page."
      }
    ]
  },
  {
    id: "database-indexing-query-performance",
    number: 14,
    title: "Database Indexing & Query Performance (B-Trees, EXPLAIN ANALYZE, N+1 Problems)",
    phaseId: 3,
    phaseName: "Data Persistence & Storage",
    duration: "43 min",
    youtubeId: "pomxJOFVcQs",
    youtubeChannelUrl: CHANNEL_URL,
    shortSummary: "B-Tree internals, composite index leftmost prefix rules, reading EXPLAIN (ANALYZE, BUFFERS), and eliminating N+1 query patterns.",
    seniorInsight: {
      quote: "An index is not magic dust. Every index accelerates read queries but penalizes every single INSERT, UPDATE, and DELETE.",
      productionLesson: "Always inspect EXPLAIN (ANALYZE, BUFFERS). If you see 'Seq Scan' on a table with millions of rows or 'Buffers: shared read=50000', your query is reading massive data blocks off disk instead of using RAM-cached B-Tree index pages.",
      commonMistake: "Creating a composite index on (status, created_at) and expecting it to accelerate queries filtering only on created_at (violates Leftmost Prefix rule)."
    },
    coreDeepDive: {
      what: "Indexes are auxiliary balanced tree (B-Tree) data structures that allow database engines to locate matching rows in O(log N) operations.",
      why: "Transforms multi-second full table scans into sub-millisecond index seeks.",
      howItWorks: [
        "1. B-Trees maintain sorted balance across leaf nodes linked together for fast range scans.",
        "2. Composite index (A, B) only works if column A is filtered in the WHERE clause.",
        "3. Covering indexes (INCLUDE clause) store payload columns in leaf nodes, avoiding heap table fetches completely (Index-Only Scan)."
      ],
      blueprintTitle: "B-Tree Index vs Sequential Scan Analysis",
      blueprintCode: `-- Unindexed Slow Query: Seq Scan (scans 1,000,000 rows off disk)
EXPLAIN (ANALYZE, BUFFERS) 
SELECT * FROM users WHERE email = 'alice@example.com';
-- Result: Execution Time: 480.25 ms (Seq Scan on users)

-- Add B-Tree Index
CREATE UNIQUE INDEX idx_users_email ON users(email);

-- Indexed Fast Query: Index Scan (seeks directly via 3 B-Tree hops)
EXPLAIN (ANALYZE, BUFFERS) 
SELECT * FROM users WHERE email = 'alice@example.com';
-- Result: Execution Time: 0.12 ms (Index Scan using idx_users_email)`,
      blueprintLanguage: "sql"
    },
    recommendedBook: {
      title: "SQL Performance Explained",
      author: "Markus Winand",
      keyChapters: "Chapters 1 & 2 (Anatomy of an Index, The WHERE Clause)",
      whyReadThis: "The undisputed industry guide for understanding B-Trees, composite indexing, and database query plan optimization.",
      readingUrl: "https://use-the-index-luke.com/"
    },
    handsOnChallenge: {
      ticketNumber: "TICKET-014",
      title: "Diagnose and Eliminate an N+1 Query Cascade",
      scenario: "An endpoint fetching 100 users executes 1 SQL query for users and 100 separate SQL queries for their addresses, taking 2.5 seconds.",
      acceptanceCriteria: [
        "Identify the N+1 query loop in logs.",
        "Refactor into a single query using an INNER JOIN or WHERE id IN (...) eager load."
      ],
      terminalLab: `psql -d testdb -c "EXPLAIN ANALYZE SELECT * FROM orders WHERE user_id IN (SELECT id FROM users LIMIT 10);"`,
      hints: [
        "Instead of querying db.query('SELECT * FROM addresses WHERE user_id = ?') inside a for-loop, use one query with WHERE user_id = ANY($1)."
      ],
      solutionCode: `// Clean single-query eager fetch
const users = await db.query('SELECT * FROM users LIMIT 100');
const userIds = users.rows.map(u => u.id);
const addresses = await db.query('SELECT * FROM addresses WHERE user_id = ANY($1)', [userIds]);`,
      solutionExplanation: "Batching child IDs into a single query reduces 101 network round-trips down to exactly 2 round-trips, slashing response time by 95%."
    },
    selfCheckQuestions: [
      {
        question: "What is the Leftmost Prefix rule for composite indexes?",
        answerExplanation: "A composite index on columns (A, B, C) can only be used by queries that filter on (A), (A, B), or (A, B, C). A query filtering only on (B) or (C) cannot traverse the tree because sorting is hierarchical starting with A."
      }
    ]
  },
  {
    id: "business-logic-layer-domain-invariants",
    number: 15,
    title: "Business Logic Layer (BLL) & Domain Invariants (Transactions, Repository Pattern)",
    phaseId: 3,
    phaseName: "Data Persistence & Storage",
    duration: "30 min",
    youtubeId: "1Lcr2c3MVF4",
    youtubeChannelUrl: CHANNEL_URL,
    shortSummary: "Domain-Driven Design (DDD), maintaining business invariants across aggregate roots, and wrapping multi-table workflows in database transactions.",
    seniorInsight: {
      quote: "An invariant is a business rule that must ALWAYS be true at all times (e.g. account balance cannot be negative). Enforce invariants in the domain layer, not in UI forms.",
      productionLesson: "Always wrap multi-table state mutations in an explicit ACID transaction (BEGIN ... COMMIT). If a transfer debits Account A and the server crashes before crediting Account B, money vanishes into thin air without transaction rollback.",
      commonMistake: "Letting repository methods manage transactions internally, preventing multiple repository calls from sharing a single atomic Unit of Work."
    },
    coreDeepDive: {
      what: "The Business Logic Layer encapsulates core domain rules, entity aggregates, and business workflows independently of UI or database technologies.",
      why: "Ensures business rules remain cohesive, testable, and protected against invalid state transitions.",
      howItWorks: [
        "1. Entities encapsulate identity and business validation logic.",
        "2. Aggregates act as consistency boundaries around related entities.",
        "3. Unit of Work manages database transaction lifecycle across multiple repository updates."
      ],
      blueprintTitle: "Atomic Money Transfer Transaction",
      blueprintCode: `async function transferFunds(fromId, toId, amountCents) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    // Lock source row to prevent concurrent overdraft
    const from = await client.query(
      'SELECT balance FROM accounts WHERE id = $1 FOR UPDATE',
      [fromId]
    );
    if (from.rows[0].balance < amountCents) {
      throw new Error('Insufficient funds invariant violated');
    }
    await client.query('UPDATE accounts SET balance = balance - $1 WHERE id = $2', [amountCents, fromId]);
    await client.query('UPDATE accounts SET balance = balance + $1 WHERE id = $2', [amountCents, toId]);
    await client.query('COMMIT');
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
}`,
      blueprintLanguage: "javascript"
    },
    recommendedBook: {
      title: "Domain-Driven Design: Tackling Complexity in the Heart of Software",
      author: "Eric Evans",
      keyChapters: "Chapters 5 & 6 (Entities, Value Objects, and Aggregates)",
      whyReadThis: "The foundational bible for structuring complex enterprise software and modeling business invariants.",
      readingUrl: "https://www.domainlanguage.com/ddd/reference/"
    },
    handsOnChallenge: {
      ticketNumber: "TICKET-015",
      title: "Implement Transactional Outbox Pattern for Order Invariants",
      scenario: "Orders must be saved and an event emitted to RabbitMQ atomically. If the message broker is down, the order must still commit.",
      acceptanceCriteria: [
        "Write order and outbox event into PostgreSQL inside the SAME database transaction.",
        "A separate background poller reads uncommitted outbox rows and publishes to RabbitMQ."
      ],
      terminalLab: `psql -d testdb -c "SELECT * FROM outbox_events WHERE processed = false;"`,
      hints: [
        "Because both writes share a single database transaction, either both succeed or both roll back!"
      ],
      solutionCode: `await client.query('BEGIN');
await client.query('INSERT INTO orders (id, total) VALUES ($1, $2)', [orderId, total]);
await client.query('INSERT INTO outbox_events (event_type, payload) VALUES ($1, $2)', ['ORDER_CREATED', JSON.stringify({ orderId })]);
await client.query('COMMIT');`,
      solutionExplanation: "The Transactional Outbox pattern guarantees 100% data consistency between database state mutations and asynchronous message broker publishing."
    },
    selfCheckQuestions: [
      {
        question: "Why does dual-writing to PostgreSQL and RabbitMQ without a Transactional Outbox guarantee eventual data loss?",
        answerExplanation: "Network calls can fail midway. If the database commit succeeds but the RabbitMQ network connection drops before publishing, the message is lost forever and downstream services never learn of the event."
      }
    ]
  },
  {
    id: "caching-strategies-redis",
    number: 16,
    title: "Caching Strategies (Redis, Cache-Aside, Write-Through, Cache Invalidation)",
    phaseId: 3,
    phaseName: "Data Persistence & Storage",
    duration: "1 hr 27 min",
    youtubeId: "XCsS_NVAa1g",
    youtubeChannelUrl: CHANNEL_URL,
    shortSummary: "In-memory caching with Redis: Cache-Aside, Write-Through, TTL strategies, Cache Stampede (Thundering Herd), and invalidation patterns.",
    seniorInsight: {
      quote: "There are only two hard things in Computer Science: cache invalidation and naming things. — Phil Karlton",
      productionLesson: "Never cache data without an explicit TTL (Time-To-Live). A bug in your cache invalidation logic will serve stale, corrupted user data indefinitely unless protected by an automated expiration fallback.",
      commonMistake: "Caching identical database queries with the exact same TTL, causing thousands of keys to expire at the same second and hammering PostgreSQL with a Thundering Herd spike."
    },
    coreDeepDive: {
      what: "Caching stores computed database results in high-speed RAM (Redis/Memcached) to avoid repeated disk I/O and query execution.",
      why: "Reduces database query load by 90%+ and drops API response latency from 50ms to under 2ms.",
      howItWorks: [
        "1. Cache-Aside: Application checks Redis for key. On cache hit, return immediately. On cache miss, read PostgreSQL, populate Redis with TTL, and return.",
        "2. Cache Stampede Mitigation: Apply random jitter to TTLs (e.g. 300s + Math.random() * 30s) so keys expire smoothly.",
        "3. Distributed Mutex: When cache expires, only one worker acquires a lock to recompute the data while other requests serve stale or wait."
      ],
      blueprintTitle: "Cache-Aside Pattern with Jittered TTL",
      blueprintCode: `async function getProduct(productId) {
  const cacheKey = 'product:' + productId;
  const cached = await redis.get(cacheKey);
  if (cached) return JSON.parse(cached);

  // Cache Miss: Query Database
  const product = await db.query('SELECT * FROM products WHERE id = $1', [productId]);
  
  // Apply random jitter to prevent cache stampede
  const ttl = 300 + Math.floor(Math.random() * 30);
  await redis.set(cacheKey, JSON.stringify(product.rows[0]), 'EX', ttl);
  return product.rows[0];
}`,
      blueprintLanguage: "javascript"
    },
    recommendedBook: {
      title: "Redis in Action",
      author: "Josiah L. Carlson",
      keyChapters: "Chapters 1, 2 & 6 (Data Structures, Web Application Caching, and Distributed Locks)",
      whyReadThis: "The canonical guide for mastering Redis data structures (Hashes, Sorted Sets, Bitmaps) and production caching.",
      readingUrl: "https://redis.io/docs/latest/"
    },
    handsOnChallenge: {
      ticketNumber: "TICKET-016",
      title: "Implement Distributed Rate Limiter using Redis Token Bucket",
      scenario: "Prevent API abuse by limiting each API key to 100 requests per minute across 10 horizontal backend server instances.",
      acceptanceCriteria: [
        "Use Redis INCR with EXPIRE or Redis Sorted Sets for atomic sliding window rate limiting.",
        "Return 429 Too Many Requests with Retry-After header on limit breach."
      ],
      terminalLab: `redis-cli -u redis://localhost:6379 ping`,
      hints: [
        "Single INCR operations in Redis are single-threaded and atomic, avoiding race conditions across servers!"
      ],
      solutionCode: `async function rateLimiter(apiKey) {
  const key = 'rate:' + apiKey + ':' + Math.floor(Date.now() / 60000);
  const count = await redis.incr(key);
  if (count === 1) await redis.expire(key, 60);
  return count <= 100;
}`,
      solutionExplanation: "Keying by the current minute bucket and atomically incrementing guarantees consistent rate limits regardless of which server node handles the request."
    },
    selfCheckQuestions: [
      {
        question: "What is a Cache Stampede (Thundering Herd) and how does TTL Jitter prevent it?",
        answerExplanation: "When a popular key expires, thousands of concurrent requests all detect a cache miss at the exact same millisecond and simultaneously hit the database with identical queries. Adding random jitter (TTL +/- random delta) ensures keys expire at staggered times."
      }
    ]
  },

  // ==========================================
  // PHASE 4: Security & Access Control
  // ==========================================
  {
    id: "authentication-identity",
    number: 17,
    title: "Authentication & Identity (Sessions, JWTs, Refresh Token Rotation, Cookies)",
    phaseId: 4,
    phaseName: "Security & Access Control",
    duration: "37 min",
    youtubeId: "2PPSXonhIck",
    youtubeChannelUrl: CHANNEL_URL,
    shortSummary: "Stateful session cookies (HttpOnly, Secure, SameSite) vs stateless JWTs, cryptographic signing (RS256), and refresh token rotation with reuse detection.",
    seniorInsight: {
      quote: "Never store JWTs in localStorage. Any third-party npm package or XSS vulnerability can read localStorage and exfiltrate credentials instantly.",
      productionLesson: "Stateless JWTs cannot be revoked without maintaining a centralized revocation list, which defeats the purpose of being stateless. Use short-lived access tokens (15 minutes) paired with stateful refresh tokens stored in HttpOnly, SameSite=Strict cookies with automatic reuse detection.",
      commonMistake: "Using symmetric HS256 with weak secrets instead of asymmetric RS256 / EdDSA key pairs."
    },
    coreDeepDive: {
      what: "Authentication proves WHO a user is; Identity management issues cryptographically verifiable credentials and maintains active sessions.",
      why: "Protects sensitive user data, prevents account takeover, and establishes accountability for operations.",
      howItWorks: [
        "1. User submits credentials; backend verifies password using Argon2id or bcrypt (cost factor >= 12).",
        "2. Server issues short-lived JWT access token and saves refresh token family UUID in Redis.",
        "3. Refresh token is delivered in an HttpOnly, Secure, SameSite=Strict cookie.",
        "4. If a refresh token is reused, all tokens in the family are instantly revoked (Breach Detection)."
      ],
      blueprintTitle: "Refresh Token Rotation & Reuse Detection",
      blueprintCode: `[Client submits Refresh Token #1]
       │
       ▼
[Server validates Token #1 in DB]
    ├── If Valid:
    │     ├── Delete Token #1
    │     ├── Issue Token #2 + Access Token
    │     └── Return to client
    └── If Token #1 was ALREADY used:
          ├── THEFT DETECTED!
          ├── Invalidate ALL refresh tokens for this User
          └── Force re-authentication`,
      blueprintLanguage: "text"
    },
    recommendedBook: {
      title: "Web Security for Developers",
      author: "Malcolm McDonald",
      keyChapters: "Chapters 5 & 6 (Authentication, Password Storage, and Session Management)",
      whyReadThis: "Clear real-world guide to password hashing, session vulnerabilities, CSRF defenses, and authentication architecture.",
      readingUrl: "https://owasp.org/www-project-web-security-testing-guide/"
    },
    handsOnChallenge: {
      ticketNumber: "TICKET-017",
      title: "Implement Refresh Token Rotation with Token Family Revocation",
      scenario: "If an attacker intercepts a refresh token and uses it, the legitimate user's subsequent attempt should trigger immediate invalidation of the entire token family.",
      acceptanceCriteria: [
        "Track token family ID and parent token ID in database.",
        "On reuse attempt, wipe all tokens for that user ID and log security incident."
      ],
      terminalLab: `curl -X POST http://localhost:3000/api/auth/refresh -b "refreshToken=stolen-token-uuid"`,
      hints: [
        "Store a 'used: boolean' flag on each refresh token record in the database."
      ],
      solutionCode: `async function rotateToken(tokenStr) {
  const token = await db.findToken(tokenStr);
  if (token.used) {
    await db.revokeAllUserTokens(token.userId);
    throw new SecurityBreachError('Token reuse detected. All sessions revoked.');
  }
  await db.markUsed(token.id);
  return db.createToken({ userId: token.userId, familyId: token.familyId });
}`,
      solutionExplanation: "Token family tracking instantly detects when two entities possess the same token, quarantining compromised accounts automatically."
    },
    selfCheckQuestions: [
      {
        question: "Why should access tokens have short lifetimes (e.g. 10-15 minutes)?",
        answerExplanation: "Because JWTs are self-contained and verified without database lookups, they cannot be easily revoked. A short expiration window limits the damage if a token is intercepted."
      }
    ]
  },
  {
    id: "authorization-access-control",
    number: 18,
    title: "Authorization & Access Control (RBAC, ABAC, Principle of Least Privilege)",
    phaseId: 4,
    phaseName: "Security & Access Control",
    duration: "35 min",
    youtubeId: "SuycfXLdF8o",
    youtubeChannelUrl: CHANNEL_URL,
    shortSummary: "Role-Based Access Control (RBAC), Attribute-Based Access Control (ABAC), policy enforcement points, and multi-tenant data isolation.",
    seniorInsight: {
      quote: "Authentication is knowing who the caller is. Authorization is verifying whether they have permission to modify THIS specific row in the database.",
      productionLesson: "Broken Object Level Authorization (BOLA/IDOR) is the #1 API vulnerability in the world. Never write: UPDATE documents SET body = :body WHERE id = :id. Always scope by ownership: WHERE id = :id AND organization_id = :currentOrgId.",
      commonMistake: "Checking roles in UI buttons while forgetting to check row-level permissions on backend endpoints."
    },
    coreDeepDive: {
      what: "Authorization governs permissions and access policies determining what authenticated entities are allowed to execute.",
      why: "Prevents vertical privilege escalation (users acting as admins) and horizontal privilege escalation (user A viewing user B's medical records).",
      howItWorks: [
        "1. RBAC assigns permissions to roles (Admin, Member, Viewer) and roles to users.",
        "2. ABAC evaluates dynamic attributes (user department, resource classification, current time, IP subnet).",
        "3. Policy Enforcement Point (PEP) intercepts the request and verifies policies before running domain handlers."
      ],
      blueprintTitle: "Multi-Tenant BOLA-Proof Query",
      blueprintCode: `// VULNERABLE TO BOLA / IDOR (Attacker passes any documentId)
SELECT * FROM documents WHERE id = $1;

// SECURE: Enforces Tenant Isolation at Database Query Boundary
SELECT * FROM documents 
WHERE id = $1 
  AND organization_id = $2; -- Extracted authoritatively from verified JWT`,
      blueprintLanguage: "sql"
    },
    recommendedBook: {
      title: "API Security in Action",
      author: "Neil Madden",
      keyChapters: "Chapter 4: Microservice Authorization with Scopes and Capabilities",
      whyReadThis: "In-depth guide to modern API access control, capability tokens, ABAC, and zero-trust authorization architectures.",
      readingUrl: "https://owasp.org/API-Security/"
    },
    handsOnChallenge: {
      ticketNumber: "TICKET-018",
      title: "Prevent Broken Object Level Authorization (BOLA/IDOR) in Invoice API",
      scenario: "Users can view competitor invoices by changing the URL from /invoices/100 to /invoices/101.",
      acceptanceCriteria: [
        "Extract current user's organizationId from the verified session context.",
        "Ensure all SELECT, UPDATE, and DELETE queries filter by organization_id."
      ],
      terminalLab: `curl -H "Authorization: Bearer user_token" http://localhost:3000/api/invoices/9999`,
      hints: [
        "Never trust an ID parameter from the URL without checking ownership!"
      ],
      solutionCode: `async function getInvoice(req, res) {
  const { invoiceId } = req.params;
  const { orgId } = req.user;
  const invoice = await db.query(
    'SELECT * FROM invoices WHERE id = $1 AND organization_id = $2',
    [invoiceId, orgId]
  );
  if (!invoice.rows[0]) return res.status(404).json({ error: 'Invoice not found' });
  return res.json(invoice.rows[0]);
}`,
      solutionExplanation: "Returning 404 rather than 403 prevents attackers from enumerating valid invoice IDs across other tenants."
    },
    selfCheckQuestions: [
      {
        question: "What is the difference between RBAC and ABAC?",
        answerExplanation: "RBAC makes binary checks based on static roles (e.g. 'Is Admin?'). ABAC evaluates context attributes (e.g. 'Can edit document IF user is author AND document is in DRAFT status AND time is during business hours')."
      }
    ]
  },
  {
    id: "backend-security-hardening",
    number: 19,
    title: "Backend Security & Hardening (OWASP Top 10, CORS, Rate Limiting, SQL Injection/XSS)",
    phaseId: 4,
    phaseName: "Security & Access Control",
    duration: "1 hr 27 min",
    youtubeId: "YYe0FdfdgDU",
    youtubeChannelUrl: CHANNEL_URL,
    shortSummary: "OWASP API Security Top 10, parameterized queries, CORS preflight mechanics, Content Security Policy, and rate limiting against DDoS.",
    seniorInsight: {
      quote: "String concatenation in SQL queries is professional malpractice. Always use parameterized queries or prepared statements without exception.",
      productionLesson: "CORS is not a server security boundary—it is a browser security mechanism that restricts what other websites can read from your API. Command-line curl and automated bot scripts ignore CORS completely.",
      commonMistake: "Setting Access-Control-Allow-Origin: * together with Access-Control-Allow-Credentials: true."
    },
    coreDeepDive: {
      what: "Backend hardening applies defensive controls across network transport, application dependencies, database boundaries, and response headers.",
      why: "Mitigates automated attacks, prevents data breach liabilities, and complies with security standards (SOC2, PCI-DSS, GDPR).",
      howItWorks: [
        "1. Parameterized Queries: Separates SQL query code from user data variables in database drivers, neutralizing SQL injection.",
        "2. Security Headers: Helmet/HSTS enforces HTTPS, disables MIME-sniffing, and protects iframe embedding (X-Frame-Options).",
        "3. Rate Limiting: Leaky bucket algorithms throttle brute force attempts at login and resource creation endpoints."
      ],
      blueprintTitle: "Parameterized Query vs SQL Injection",
      blueprintCode: `-- VULNERABLE: String Concatenation allows ' OR '1'='1 SQL Injection
db.query("SELECT * FROM users WHERE email = '" + req.body.email + "'");

-- SECURE: Parameterized Query sends SQL plan and data in separate packets
db.query("SELECT * FROM users WHERE email = $1", [req.body.email]);`,
      blueprintLanguage: "javascript"
    },
    recommendedBook: {
      title: "API Security in Action",
      author: "Neil Madden",
      keyChapters: "Chapters 3 & 8 (Object-Level Security, Rate Limiting, and DoS Prevention)",
      whyReadThis: "Comprehensive coverage of OWASP API Top 10 vulnerabilities, input validation, and defensive API architectures.",
      readingUrl: "https://owasp.org/API-Security/"
    },
    handsOnChallenge: {
      ticketNumber: "TICKET-019",
      title: "Harden API Headers and Configure Strict CORS Policy",
      scenario: "Security auditors identified missing HSTS headers, permissive CORS (*), and information disclosure revealing X-Powered-By: Express.",
      acceptanceCriteria: [
        "Remove X-Powered-By header.",
        "Enable HSTS with max-age=31536000; includeSubDomains.",
        "Whitelist only trusted frontend domain origins in CORS."
      ],
      terminalLab: `curl -I http://localhost:3000/api/health`,
      hints: [
        "Use helmet() middleware in Express or equivalent security header injectors."
      ],
      solutionCode: `import helmet from 'helmet';
import cors from 'cors';

app.use(helmet());
app.use(cors({
  origin: ['https://app.example.com'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}));`,
      solutionExplanation: "Helmet automates standard security headers (HSTS, CSP, X-Content-Type-Options) and strips runtime fingerprinting headers."
    },
    selfCheckQuestions: [
      {
        question: "Why does parameterized querying eliminate SQL injection completely?",
        answerExplanation: "The database compiles the SQL query structure first into a static execution tree before binding input parameters. Parameters are treated strictly as literal data values and cannot alter the SQL command syntax."
      }
    ]
  },

  // ==========================================
  // PHASE 5: Asynchronous Systems & Integrations
  // ==========================================
  {
    id: "task-queuing-scheduling",
    number: 20,
    title: "Task Queuing & Scheduling (BullMQ, Redis Queues, Cron, Celery)",
    phaseId: 5,
    phaseName: "Asynchronous Systems & Integrations",
    duration: "31 min",
    youtubeId: "nFxjaVmFj5E",
    youtubeChannelUrl: CHANNEL_URL,
    shortSummary: "Decoupling synchronous HTTP requests, message brokers (RabbitMQ/BullMQ), worker pools, dead letter queues (DLQ), and exponential retry backoff.",
    seniorInsight: {
      quote: "Never do heavy compute, PDF generation, or third-party API calls inside the synchronous HTTP request-response cycle.",
      productionLesson: "Always configure a Dead Letter Queue (DLQ) with exponential backoff. If an unhandled exception causes a job to crash on every retry, it will poison the queue and consume 100% of worker CPU without ever finishing.",
      commonMistake: "Assuming message queues guarantee exactly-once processing (production queues guarantee at-least-once; your workers MUST be idempotent)."
    },
    coreDeepDive: {
      what: "Task queuing offloads asynchronous, long-running, or resource-heavy tasks to background worker processes.",
      why: "Ensures sub-100ms HTTP response times, shields backends from traffic spikes, and provides automatic retries during third-party outages.",
      howItWorks: [
        "1. API server accepts request, pushes job payload to Redis/RabbitMQ queue, and returns 202 Accepted immediately.",
        "2. Worker daemon picks up job from queue and processes task in background.",
        "3. On success, worker acknowledges message; on failure, job retries with backoff or moves to DLQ."
      ],
      blueprintTitle: "Asynchronous Worker Queue Topology",
      blueprintCode: `[Client API Request]
       │
       ▼ (Submits Job: 202 Accepted in 15ms)
[HTTP Controller] ──► [Redis / RabbitMQ Queue]
                            │
                            ▼ (Worker polls asynchronously)
                     [Background Worker Pool]
                            ├── [Success: ACK]
                            └── [Failure: Retry -> Dead Letter Queue]`,
      blueprintLanguage: "text"
    },
    recommendedBook: {
      title: "Enterprise Integration Patterns",
      author: "Gregor Hohpe & Bobby Woolf",
      keyChapters: "Chapters 3 & 4 (Messaging Systems & Message Routing)",
      whyReadThis: "The seminal master architecture book covering point-to-point queues, publish-subscribe, and message routing patterns.",
      readingUrl: "https://www.enterpriseintegrationpatterns.com/"
    },
    handsOnChallenge: {
      ticketNumber: "TICKET-020",
      title: "Implement an Idempotent Background Job Worker with Dead Letter Queue",
      scenario: "Video transcoding jobs occasionally fail due to corrupt user files, causing workers to crash endlessly in an infinite retry loop.",
      acceptanceCriteria: [
        "Limit retry attempts to 3 with exponential backoff.",
        "Route failed jobs after 3 attempts to a dead_letter_queue.",
        "Ensure jobs track a processed_ids set to avoid duplicate execution."
      ],
      terminalLab: `npm run worker`,
      hints: [
        "In BullMQ, configure { attempts: 3, backoff: { type: 'exponential', delay: 1000 } }."
      ],
      solutionCode: `const queue = new Queue('transcode', { connection: redis });
await queue.add('video', { fileId: '123' }, {
  attempts: 3,
  backoff: { type: 'exponential', delay: 2000 },
  removeOnFail: false
});`,
      solutionExplanation: "Capping retries and redirecting persistent failures to DLQs prevents corrupted jobs from stalling queue throughput."
    },
    selfCheckQuestions: [
      {
        question: "Why do production message queues provide at-least-once delivery rather than exactly-once delivery?",
        answerExplanation: "Network acknowledgments can fail. If a worker completes a job but the network drops before it can send the ACK back to the broker, the broker will re-assign the message to another worker. Therefore workers must be idempotent."
      }
    ]
  },
  {
    id: "transactional-emails-event-triggers",
    number: 21,
    title: "Transactional Emails & Event Triggers (Idempotent mailers, Templates)",
    phaseId: 5,
    phaseName: "Asynchronous Systems & Integrations",
    duration: "30 min",
    youtubeId: "AcBhyCPJTEk",
    youtubeChannelUrl: CHANNEL_URL,
    shortSummary: "Asynchronous notification pipelines, SMTP vs API deliverability, DKIM/SPF/DMARC domain authentication, and idempotent notification triggers.",
    seniorInsight: {
      quote: "Sending an email directly inside an HTTP handler is a recipe for 504 Gateway Timeouts when your SMTP provider experiences latency spikes.",
      productionLesson: "Always queue email jobs and assign an idempotency key to notification dispatches. During worker retries, the idempotency check prevents sending the same customer 5 duplicate password reset emails.",
      commonMistake: "Failing to configure proper SPF, DKIM, and DMARC DNS records, causing your transactional emails to land directly in spam folders."
    },
    coreDeepDive: {
      what: "Transactional email systems reliably deliver system-triggered communications (receipts, password resets, verification codes).",
      why: "Ensures critical notifications reach users promptly without slowing down the primary application server.",
      howItWorks: [
        "1. Domain event triggers email job creation.",
        "2. Worker renders template with sanitized dynamic variables.",
        "3. Worker dispatches payload over HTTPS API (SES, Postmark, SendGrid) with idempotency tokens.",
        "4. Webhooks listen for bounce, delivery, and open events to maintain domain reputation."
      ],
      blueprintTitle: "Asynchronous Notification Pipeline",
      blueprintCode: `[User Registers] ──► [Save User to PostgreSQL]
                           │
                           ▼ (Push to Queue)
                   [Email Worker]
                           │ (HTTPS API + Idempotency-Key)
                           ▼
              [Email Provider: Postmark/SES] ──► [User Inbox]`,
      blueprintLanguage: "text"
    },
    recommendedBook: {
      title: "Building Microservices (2nd Edition)",
      author: "Sam Newman",
      keyChapters: "Chapter 4: Communication Styles (Asynchronous & Event-Driven Notifications)",
      whyReadThis: "Comprehensive guide to decoupling services and orchestrating event-driven notifications across distributed systems.",
      readingUrl: "https://martinfowler.com/articles/microservices.html"
    },
    handsOnChallenge: {
      ticketNumber: "TICKET-021",
      title: "Build an Idempotent Email Dispatcher with Rate Throttling",
      scenario: "During a flash sale, password reset requests surged, threatening to exceed the email provider's 50 emails/second rate limit.",
      acceptanceCriteria: [
        "Implement rate-throttling on the worker queue (max 50 jobs/sec).",
        "Record sent email hashes in Redis with 10-minute TTL to prevent duplicate dispatches."
      ],
      terminalLab: `curl -X POST http://localhost:3000/api/auth/reset-password -d '{"email": "user@example.com"}'`,
      hints: [
        "Use Redis SETNX to atomically claim the email dispatch token."
      ],
      solutionCode: `async function sendTransactionalEmail(to, templateId, data) {
  const hash = crypto.createHash('sha256').update(to + ':' + templateId + ':' + JSON.stringify(data)).digest('hex');
  const claimed = await redis.set('mail:' + hash, '1', 'NX', 'EX', 600);
  if (!claimed) return console.log('Duplicate email suppressed');
  await mailProvider.send({ to, templateId, data });
}`,
      solutionExplanation: "Hashing the email parameters and setting with NX atomically silences duplicate notifications during accidental double submissions."
    },
    selfCheckQuestions: [
      {
        question: "What are SPF, DKIM, and DMARC, and why are they mandatory for backend email deliverability?",
        answerExplanation: "SPF specifies which IP addresses are authorized to send email for your domain; DKIM cryptographically signs outgoing emails to prevent tampering; DMARC tells receiving mail servers what policy to enforce if SPF or DKIM fails."
      }
    ]
  },
  {
    id: "webhooks-event-driven-subscriptions",
    number: 22,
    title: "Webhooks & Event-Driven Subscriptions (HMAC Signatures, Delivery Retries)",
    phaseId: 5,
    phaseName: "Asynchronous Systems & Integrations",
    duration: "2 hrs 29 min",
    youtubeId: "41NOoEz3Tzc",
    youtubeChannelUrl: CHANNEL_URL,
    shortSummary: "Sending and receiving webhooks, HMAC-SHA256 signature verification, exponential retry backoff, and preventing replay attacks with timestamps.",
    seniorInsight: {
      quote: "Never process an incoming webhook without verifying its cryptographic HMAC signature against the raw, unparsed request byte buffer.",
      productionLesson: "If your body parser converts JSON into an object and you re-stringify it to compute the HMAC hash, JSON key order or whitespace differences will break the signature. Always verify against req.rawBody.",
      commonMistake: "Omitting a timestamp in the signature header, allowing attackers to intercept a valid webhook and replay it repeatedly."
    },
    coreDeepDive: {
      what: "Webhooks provide automated, asynchronous HTTP callbacks between external SaaS platforms (e.g. Stripe, GitHub, Twilio) and your backend.",
      why: "Enables real-time event-driven architectures without wasteful, continuous HTTP polling.",
      howItWorks: [
        "1. Sender computes HMAC-SHA256 signature using a shared secret over payload + timestamp.",
        "2. Sender passes signature in header (e.g. Stripe-Signature).",
        "3. Receiver verifies HMAC signature and checks that timestamp is within 5 minutes (Replay Protection).",
        "4. Receiver responds with 200 OK immediately and offloads processing to a background worker."
      ],
      blueprintTitle: "Cryptographic HMAC-SHA256 Webhook Verification",
      blueprintCode: `import crypto from "crypto";

export function verifyWebhook(rawBody, signatureHeader, secret) {
  // Expected header format: t=1690000000,v1=signature_hash
  const [tPart, sigPart] = signatureHeader.split(",");
  const timestamp = tPart.split("=")[1];
  const signature = sigPart.split("=")[1];

  // Prevent Replay Attacks (Reject events older than 5 minutes)
  if (Math.abs(Date.now() / 1000 - Number(timestamp)) > 300) {
    throw new Error("Webhook timestamp expired (replay attack defense)");
  }

  const payload = timestamp + '.' + rawBody;
  const expected = crypto.createHmac("sha256", secret).update(payload).digest("hex");

  // Constant-time comparison prevents timing attacks!
  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
}`,
      blueprintLanguage: "javascript"
    },
    recommendedBook: {
      title: "Designing Data-Intensive Applications (DDIA)",
      author: "Martin Kleppmann",
      keyChapters: "Chapter 11: Stream Processing (Message Systems & Event-Driven Architectures)",
      whyReadThis: "Analyzes event-driven subscriptions, immutable event logs, stream processing, and idempotency.",
      readingUrl: "https://dataintensive.net/"
    },
    handsOnChallenge: {
      ticketNumber: "TICKET-022",
      title: "Implement Secure Stripe Webhook Ingestion Endpoint",
      scenario: "Build an endpoint that receives payment_intent.succeeded webhooks, verifies HMAC signatures, and handles duplicates safely.",
      acceptanceCriteria: [
        "Verify HMAC-SHA256 signature using raw request buffer.",
        "Reject requests with invalid signatures with 400 Bad Request.",
        "Store event ID in database with UNIQUE constraint to prevent duplicate processing."
      ],
      terminalLab: `stripe listen --forward-to localhost:3000/api/webhooks/stripe`,
      hints: [
        "Use crypto.timingSafeEqual to protect against side-channel timing attacks."
      ],
      solutionCode: `app.post('/api/webhooks', express.raw({ type: 'application/json' }), (req, res) => {
  const sig = req.headers['stripe-signature'];
  try {
    const event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
    await jobQueue.add('process-payment', event);
    res.status(200).json({ received: true });
  } catch (err) {
    res.status(400).send('Webhook Error: ' + err.message);
  }
});`,
      solutionExplanation: "Returning 200 OK immediately and queuing the event prevents external webhook providers from timing out while your backend executes logic."
    },
    selfCheckQuestions: [
      {
        question: "Why must webhook signature comparisons always use timingSafeEqual rather than ===?",
        answerExplanation: "The standard === operator returns false on the first mismatched byte, leaking execution timing. Attackers can measure response time variations down to nanoseconds to deduce valid signature bytes one by one (Timing Attack)."
      }
    ]
  },
  {
    id: "real-time-backend-systems",
    number: 23,
    title: "Real-Time Backend Systems (WebSockets, SSE - Server-Sent Events)",
    phaseId: 5,
    phaseName: "Asynchronous Systems & Integrations",
    duration: "48 min",
    youtubeId: "2Nt-ZrNP22A",
    youtubeChannelUrl: CHANNEL_URL,
    shortSummary: "Comparing HTTP Long Polling, Server-Sent Events (SSE), and WebSockets, connection state, heartbeats, and scaling with Redis Pub/Sub.",
    seniorInsight: {
      quote: "Do not use WebSockets when Server-Sent Events (SSE) will do. If your data flow is unidirectional (server-to-client like dashboards or stock tickers), SSE runs over plain HTTP/2 without firewall or proxy issues.",
      productionLesson: "A single Node.js or Go server can easily hold 50,000 idle WebSocket connections, but holding state in memory breaks horizontal scaling. When User A connects to Server 1 and User B connects to Server 2, you must use a Redis Pub/Sub backplane to broadcast messages across all server nodes.",
      commonMistake: "Failing to implement heartbeats (ping/pong), causing dead connections to sit open indefinitely when mobile devices lose cell reception."
    },
    coreDeepDive: {
      what: "Real-time communication protocols push data from server to client instantly without repeated client polling.",
      why: "Enables interactive collaborative experiences (chat, live tracking, financial tickers) with sub-second latency.",
      howItWorks: [
        "1. Server-Sent Events (SSE): Standard HTTP GET with text/event-stream content type, keeping connection open for server pushes.",
        "2. WebSockets: HTTP connection upgrades (101 Switching Protocols) to full-duplex, bi-directional TCP framing.",
        "3. Redis Pub/Sub backplane synchronizes messages across horizontally scaled backend clusters."
      ],
      blueprintTitle: "Multi-Server WebSocket Scale with Redis Pub/Sub",
      blueprintCode: `[Client A] ──► [Server Node 1] ──┐
                                     ├──► [Redis Pub/Sub Channel]
[Client B] ──► [Server Node 2] ──┘         │
                                           ▼ (Broadcasts to all nodes)
                                  [All connected clients receive event]`,
      blueprintLanguage: "text"
    },
    recommendedBook: {
      title: "High Performance Browser Networking",
      author: "Ilya Grigorik",
      keyChapters: "Chapters 14 & 15 (Server-Sent Events and WebSockets)",
      whyReadThis: "The definitive technical comparison of transport overhead, connection negotiation, and scaling for real-time protocols.",
      readingUrl: "https://hpbn.co/"
    },
    handsOnChallenge: {
      ticketNumber: "TICKET-023",
      title: "Build Horizontally Scaled WebSocket Broadcast with Redis Pub/Sub",
      scenario: "Users connected to different backend instances cannot see messages sent by each other in chat rooms.",
      acceptanceCriteria: [
        "Subscribe each WebSocket server instance to a Redis pub/sub channel.",
        "Publish new chat messages to Redis.",
        "Broadcast received Redis messages to all locally connected client WebSockets."
      ],
      terminalLab: `wscat -c ws://localhost:3000/ws`,
      hints: [
        "Keep Redis publisher and subscriber clients separate; a Redis client in subscriber mode cannot execute standard commands!"
      ],
      solutionCode: `const sub = redis.duplicate();
sub.subscribe('chat-events');
sub.on('message', (channel, msg) => {
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) client.send(msg);
  });
});`,
      solutionExplanation: "Using Redis as an external message bus decouples clients from specific application instances, allowing seamless horizontal scale across dozens of server nodes."
    },
    selfCheckQuestions: [
      {
        question: "When should you choose Server-Sent Events (SSE) over WebSockets?",
        answerExplanation: "Choose SSE when data flows unidirectionally from server to client (e.g. notifications, status feeds, live sports scores). SSE operates over standard HTTP/2, supports automatic reconnection, and bypasses complex WebSocket proxy traversal issues."
      }
    ]
  },
  {
    id: "object-storage-large-files",
    number: 24,
    title: "Object Storage & Large Files (S3 Pre-signed URLs, Multipart Uploads, CDN)",
    phaseId: 5,
    phaseName: "Asynchronous Systems & Integrations",
    duration: "3 hrs 58 min",
    youtubeId: "3hLmDS179YE",
    youtubeChannelUrl: CHANNEL_URL,
    shortSummary: "Storing BLOBs in cloud object storage (AWS S3/Cloudflare R2), S3 pre-signed upload URLs, multipart uploads for large files, and CDN distribution.",
    seniorInsight: {
      quote: "Never proxy file uploads through your backend application server. Let the client upload directly to S3 via pre-signed URLs.",
      productionLesson: "Streaming a 500MB video file through your API server consumes memory, blocks worker event loops, and burns expensive egress bandwidth. Generate a temporary, cryptographically signed S3 PUT URL and have the browser upload directly to S3.",
      commonMistake: "Storing file uploads on local server disk (e.g. /var/uploads) in a containerized environment where container restarts erase files."
    },
    coreDeepDive: {
      what: "Object storage (S3, GCS, R2) provides virtually unlimited, durable, flat-namespace storage for unstructured binary data (images, videos, backups).",
      why: "Decouples state from compute instances, scales infinitely, and delivers files globally through edge CDNs.",
      howItWorks: [
        "1. Client requests upload ticket from API server.",
        "2. Server generates pre-signed URL with restrictive bucket key, expiration (15 mins), and content-type constraints.",
        "3. Client streams file directly to S3 via HTTP PUT.",
        "4. S3 fires an event notification (or client alerts API) to finalize processing."
      ],
      blueprintTitle: "Pre-signed URL Direct Upload Architecture",
      blueprintCode: `[Client Browser]
   │
   ├── 1. Request Upload Ticket ──► [Backend API]
   │                                   │ (Generates temporary S3 signed URL)
   │◄── 2. Returns Signed S3 URL ──────┘
   │
   └── 3. PUT File Directly (Zero Backend Bandwidth!) ──► [AWS S3 Bucket]
                                                              │
                                                              ▼
                                                     [CloudFront CDN]`,
      blueprintLanguage: "text"
    },
    recommendedBook: {
      title: "Cloud Application Architectures",
      author: "George Reese",
      keyChapters: "Chapter 4: Designing for Infrastructure (Decoupled Storage & Asset Delivery)",
      whyReadThis: "Practical architecture patterns for leveraging cloud object stores, CDNs, and stateless compute infrastructure.",
      readingUrl: "https://docs.aws.amazon.com/AmazonS3/latest/userguide/"
    },
    handsOnChallenge: {
      ticketNumber: "TICKET-024",
      title: "Generate Secure S3 Pre-signed Upload URL with Strict Constraints",
      scenario: "Users upload 50MB avatars through the backend, freezing Node.js event loops and exhausting RAM.",
      acceptanceCriteria: [
        "Implement POST /api/uploads/presigned generating an S3 PUT URL.",
        "Enforce 15-minute expiration and exact Content-Type constraint.",
        "Validate user authentication before issuing the signed URL."
      ],
      terminalLab: `curl -X POST http://localhost:3000/api/uploads/presigned -H "Authorization: Bearer valid_token"`,
      hints: [
        "Use @aws-sdk/s3-request-presigner's getSignedUrl with PutObjectCommand."
      ],
      solutionCode: `import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

async function getUploadUrl(userId, fileType) {
  const key = 'avatars/' + userId + '/' + crypto.randomUUID() + '.' + fileType;
  const command = new PutObjectCommand({
    Bucket: 'my-app-assets',
    Key: key,
    ContentType: 'image/' + fileType
  });
  return getSignedUrl(s3, command, { expiresIn: 900 });
}`,
      solutionExplanation: "Pre-signed URLs offload upload bandwidth to cloud object storage providers while strictly retaining backend control over storage keys and expiration."
    },
    selfCheckQuestions: [
      {
        question: "Why should file uploads never be saved to the local filesystem of a Docker container in production?",
        answerExplanation: "Containers are ephemeral; restarting or rescheduling a container to another host immediately destroys local filesystem state. Furthermore, horizontal scaling across multiple container instances creates split state where files exist on some nodes but not others."
      }
    ]
  },
  {
    id: "full-text-search-elasticsearch",
    number: 25,
    title: "Full Text Search & Elasticsearch (Inverted Indexes, Tokenizers, Fuzzy Matching)",
    phaseId: 5,
    phaseName: "Asynchronous Systems & Integrations",
    duration: "4 hrs 59 min",
    youtubeId: "a4HBKEda_F8",
    youtubeChannelUrl: CHANNEL_URL,
    shortSummary: "Inverted indexes, tokenization, stemming, BM25 scoring, fuzzy matching, and syncing search clusters with PostgreSQL via Change Data Capture (CDC).",
    seniorInsight: {
      quote: "Relational B-Trees fail catastrophically on text queries like WHERE bio LIKE '%developer%'. You cannot index a leading wildcard with B-Trees.",
      productionLesson: "Never use Elasticsearch as your primary database of record. It is an auxiliary search index. Always store your source-of-truth in PostgreSQL, and stream updates asynchronously to Elasticsearch using CDC (Debezium) or application event triggers.",
      commonMistake: "Allowing search index synchronization to run synchronously in user request handlers, slowing mutations."
    },
    coreDeepDive: {
      what: "Full-text search engines (Elasticsearch, OpenSearch, Meilisearch) analyze unstructured text and rank matching documents by relevance.",
      why: "Delivers sub-50ms search across millions of documents with typos, synonyms, and multi-field relevance scoring.",
      howItWorks: [
        "1. Inverted Index maps every unique word token to a list of document IDs containing that token.",
        "2. Analyzer applies Tokenization (splitting words), Lowercasing, Stop-word removal, and Stemming (running -> run).",
        "3. BM25 algorithm scores matches based on Term Frequency (TF) and Inverse Document Frequency (IDF)."
      ],
      blueprintTitle: "Inverted Index Data Structure",
      blueprintCode: `Document 1: "PostgreSQL database indexing"
Document 2: "Indexing full text in Elasticsearch"

[Inverted Index Token Map]:
"database"      ──► [Doc 1]
"elasticsearch" ──► [Doc 2]
"indexing"      ──► [Doc 1, Doc 2]  <-- Instant O(1) posting list seek!
"postgresql"    ──► [Doc 1]`,
      blueprintLanguage: "text"
    },
    recommendedBook: {
      title: "Relevant Search",
      author: "Doug Turnbull & John Berryman",
      keyChapters: "Chapters 2 & 3 (The Anatomy of a Search Engine, Inverted Indexes)",
      whyReadThis: "Master-level exploration of search engine internals, relevance tuning, BM25 scoring, and token analyzers.",
      readingUrl: "https://www.elastic.co/guide/en/elasticsearch/reference/current/index.html"
    },
    handsOnChallenge: {
      ticketNumber: "TICKET-025",
      title: "Configure Custom Analyzer with Fuzzy Search Matching",
      scenario: "Users searching for 'posgresql' (typo) receive 0 results instead of matching 'PostgreSQL'.",
      acceptanceCriteria: [
        "Configure an Elasticsearch index mapping with an n-gram or fuzzy matching query.",
        "Ensure search query matches terms with Levenshtein edit distance of up to 2."
      ],
      terminalLab: `curl -X GET "localhost:9200/products/_search?q=name:posgresql"`,
      hints: [
        "In Elasticsearch DSL, add { 'fuzziness': 'AUTO' } to the match query."
      ],
      solutionCode: `const result = await esClient.search({
  index: 'products',
  body: {
    query: {
      match: {
        name: {
          query: userInput,
          fuzziness: 'AUTO'
        }
      }
    }
  }
});`,
      solutionExplanation: "Fuzzy matching calculates Damerau-Levenshtein distances, returning relevant documents even when users make typographical errors."
    },
    selfCheckQuestions: [
      {
        question: "Why can't a standard B-Tree index accelerate a SQL query like WHERE description LIKE '%apple%'?",
        answerExplanation: "B-Tree indexes sort strings alphabetically from the first character. A leading wildcard (%apple) means the match could begin at any position in the string, forcing the database engine into an O(N) sequential full table scan."
      }
    ]
  },

  // ==========================================
  // PHASE 6: Reliability, Resilience & Observability
  // ==========================================
  {
    id: "robust-error-handling",
    number: 26,
    title: "Robust Error Handling (RFC 7807/9457 Problem Details, Error Domains)",
    phaseId: 6,
    phaseName: "Reliability, Resilience & Observability",
    duration: "32 min",
    youtubeId: "ovnyeq-Xxrc",
    youtubeChannelUrl: CHANNEL_URL,
    shortSummary: "Standardized RFC 9457 Problem Details, operational vs programmer errors, centralized error handling, and scrubbing sensitive stack traces.",
    seniorInsight: {
      quote: "Never leak internal database errors or stack traces to clients in production. Return clean, standardized RFC 9457 Problem Details.",
      productionLesson: "Differentiate between Operational Errors (expected failures like 404 Not Found, 422 Invalid Input) and Programmer Errors (unexpected null pointers, database crashes). Operational errors should be gracefully returned; programmer errors should be logged with stack traces and trigger alerting.",
      commonMistake: "Returning 200 OK with { success: false, error: '...' } inside the body, which breaks HTTP proxy caching and client error listeners."
    },
    coreDeepDive: {
      what: "Standardized error handling structures all error responses into predictable RFC 9457 application/problem+json payloads.",
      why: "Allows API clients, mobile apps, and SDKs to parse errors deterministically without custom string parsing.",
      howItWorks: [
        "1. Domain errors throw structured AppError exceptions with HTTP status codes and machine-readable error codes.",
        "2. Centralized error middleware catches unhandled exceptions.",
        "3. In development, stack traces are displayed; in production, stack traces are scrubbed and replaced with a correlation ID."
      ],
      blueprintTitle: "RFC 9457 Standardized Error Format",
      blueprintCode: `// HTTP/1.1 409 Conflict
// Content-Type: application/problem+json
{
  "type": "https://api.example.com/errors/email-already-registered",
  "title": "Email Conflict",
  "status": 409,
  "detail": "The email user@example.com is already associated with an account.",
  "instance": "/users/registration",
  "code": "EMAIL_ALREADY_EXISTS"
}`,
      blueprintLanguage: "json"
    },
    recommendedBook: {
      title: "Release It! (2nd Edition)",
      author: "Michael T. Nygard",
      keyChapters: "Chapters 3, 4 & 5 (Stability Antipatterns: Integration Points, Cascading Failures)",
      whyReadThis: "The seminal engineering classic on building fault-tolerant software that survives production chaos.",
      readingUrl: "https://learn.microsoft.com/en-us/azure/architecture/patterns/"
    },
    handsOnChallenge: {
      ticketNumber: "TICKET-026",
      title: "Build Centralized Error Middleware with Stack Trace Scrubbing",
      scenario: "A database error leaked raw SQL connection strings and table names to the frontend in production.",
      acceptanceCriteria: [
        "Catch all synchronous and asynchronous errors in a single error handler.",
        "Scrub stack traces in production (NODE_ENV === 'production').",
        "Format responses adhering strictly to RFC 9457 application/problem+json."
      ],
      terminalLab: `curl -i http://localhost:3000/api/trigger-error`,
      hints: [
        "Ensure the Content-Type response header is set to application/problem+json."
      ],
      solutionCode: `app.use((err, req, res, next) => {
  const isDev = process.env.NODE_ENV !== 'production';
  const status = err.status || 500;
  res.setHeader('Content-Type', 'application/problem+json');
  res.status(status).json({
    type: err.type || 'about:blank',
    title: err.title || 'Internal Server Error',
    status,
    detail: err.message,
    instance: req.originalUrl,
    code: err.code || 'INTERNAL_ERROR',
    ...(isDev && { stack: err.stack })
  });
});`,
      solutionExplanation: "Scrubbing internal stack traces from production responses prevents attackers from fingerprinting internal library versions or database topologies."
    },
    selfCheckQuestions: [
      {
        question: "Why should API errors never return HTTP 200 with an error flag inside the JSON body?",
        answerExplanation: "Returning 200 with an error prevents HTTP reverse proxies, API gateways, and CDNs from understanding that the request failed, preventing automated retry policies and polluting uptime monitoring metrics."
      }
    ]
  },
  {
    id: "configuration-management",
    number: 27,
    title: "Configuration Management (12-Factor Env Vars, Fail-Fast Startup)",
    phaseId: 6,
    phaseName: "Reliability, Resilience & Observability",
    duration: "30 min",
    youtubeId: "1OhmRmMsGdQ",
    youtubeChannelUrl: CHANNEL_URL,
    shortSummary: "12-Factor App Factor III: Storing config in the environment, validating configuration schemas on startup (fail-fast), and secret management.",
    seniorInsight: {
      quote: "Fail fast. If your application is missing a mandatory environment variable like DATABASE_URL, crash immediately on startup. Never start up half-healthy.",
      productionLesson: "Never commit .env files or API keys into git repositories. Store secrets in AWS Secrets Manager, HashiCorp Vault, or encrypted deployment pipelines, injecting them as runtime environment variables.",
      commonMistake: "Accessing process.env.SOME_VARIABLE directly in deep service classes instead of through a centralized, validated configuration module."
    },
    coreDeepDive: {
      what: "Configuration management isolates environment-specific variables (database credentials, API keys, port numbers) from application source code.",
      why: "Allows the identical application container image to deploy safely across Staging, UAT, and Production environments without recompilation.",
      howItWorks: [
        "1. Startup hook reads environment variables.",
        "2. Schema validation (Zod, envalid) verifies types and mandatory presence.",
        "3. If any required variable is missing, process exits with code 1 before accepting traffic.",
        "4. Validated, typed configuration object is frozen and injected into services."
      ],
      blueprintTitle: "Fail-Fast Configuration Guard",
      blueprintCode: `import { z } from "zod";

const ConfigSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]),
  PORT: z.coerce.number().default(3000),
  DATABASE_URL: z.string().url(),
  REDIS_URL: z.string().url(),
  JWT_SECRET: z.string().min(32),
});

// Crashes immediately on boot if missing variables!
export const config = ConfigSchema.parse(process.env);`,
      blueprintLanguage: "typescript"
    },
    recommendedBook: {
      title: "The Twelve-Factor App",
      author: "Adam Wiggins",
      keyChapters: "Factor III: Config (Store config in the environment)",
      whyReadThis: "The foundational architectural manifesto for building modern, cloud-native backend applications.",
      readingUrl: "https://12factor.net/"
    },
    handsOnChallenge: {
      ticketNumber: "TICKET-027",
      title: "Implement Strict Fail-Fast Startup Schema Guard",
      scenario: "A server started in production without JWT_SECRET defined, issuing insecure tokens with 'undefined' as the signature key.",
      acceptanceCriteria: [
        "Validate all environment variables on boot using Zod.",
        "If any mandatory variable is missing or invalid, print clear error and call process.exit(1)."
      ],
      terminalLab: `NODE_ENV=production DATABASE_URL= node src/server.js`,
      hints: [
        "Ensure validation runs synchronously before the HTTP server begins listening on any port!"
      ],
      solutionCode: `try {
  ConfigSchema.parse(process.env);
} catch (err) {
  console.error('CRITICAL: Invalid environment configuration', err.errors);
  process.exit(1);
}`,
      solutionExplanation: "Crashing the process on boot signals orchestration systems (Kubernetes/ECS) that the new deployment is unhealthy, preventing broken containers from receiving traffic."
    },
    selfCheckQuestions: [
      {
        question: "Why should an application container image contain zero secrets or configuration baked into its filesystem?",
        answerExplanation: "Baking secrets into images exposes credentials to anyone with image registry access and requires rebuilding container images for every environment change. Injecting config at runtime allows one verified artifact to run everywhere."
      }
    ]
  },
  {
    id: "logging-monitoring-observability",
    number: 28,
    title: "Logging, Monitoring & Observability (Structured JSON Logs, OpenTelemetry, RED Metrics)",
    phaseId: 6,
    phaseName: "Reliability, Resilience & Observability",
    duration: "4 hrs 57 min",
    youtubeId: "cYAE0ZhT43c",
    youtubeChannelUrl: CHANNEL_URL,
    shortSummary: "Structured JSON logging, OpenTelemetry distributed tracing, the RED method (Rate, Errors, Duration), and Prometheus metrics.",
    seniorInsight: {
      quote: "Unstructured plain text logs (console.log('Error occurred!')) are useless in production. Output structured JSON logs with correlation IDs so log aggregators can index and filter them.",
      productionLesson: "Master the RED method for all services: Rate (requests per second), Errors (number of failing requests), and Duration (time taken per request, especially p95 and p99 percentiles).",
      commonMistake: "Relying on average (mean) latency instead of 95th and 99th percentiles (p99 exposes the real pain experienced by users)."
    },
    coreDeepDive: {
      what: "Observability provides visibility into internal system state through three complementary telemetry pillars: Metrics, Logs, and Traces.",
      why: "Enables engineering teams to detect incidents, pinpoint root causes, and resolve production degradation before customers report outages.",
      howItWorks: [
        "1. Logs: Structured JSON events capturing timestamp, severity, message, and trace IDs.",
        "2. Metrics: Numeric aggregations over time (counters, gauges, histograms).",
        "3. Traces: OpenTelemetry spans following a request's journey across microservices, databases, and message queues."
      ],
      blueprintTitle: "Structured JSON Log Event",
      blueprintCode: `{
  "timestamp": "2026-09-13T20:45:00.123Z",
  "level": "error",
  "traceId": "4bf92f3577b34da6a3ce929d0e0e4736",
  "spanId": "00f067aa0ba902b7",
  "service": "billing-service",
  "message": "Payment provider timeout",
  "errorCode": "PAYMENT_GATEWAY_TIMEOUT",
  "latencyMs": 5002.4,
  "http": {
    "method": "POST",
    "route": "/api/v1/checkout",
    "status": 504
  }
}`,
      blueprintLanguage: "json"
    },
    recommendedBook: {
      title: "Site Reliability Engineering (Google SRE Book)",
      author: "Betsy Beyer, Chris Jones, Jennifer Petoff & Niall Richard Murphy",
      keyChapters: "Chapters 6 & 10 (Monitoring Distributed Systems and Being On-Call)",
      whyReadThis: "Google's landmark textbook defining production observability, SLIs, SLOs, and incident response.",
      readingUrl: "https://sre.google/sre-book/table-of-contents/"
    },
    handsOnChallenge: {
      ticketNumber: "TICKET-028",
      title: "Configure OpenTelemetry Tracing with Jaeger Exporter",
      scenario: "An endpoint experiences intermittent 3-second latency spikes, but logs do not reveal which microservice or database query is responsible.",
      acceptanceCriteria: [
        "Initialize OpenTelemetry SDK with HTTP and PostgreSQL auto-instrumentation.",
        "Export traces to a local Jaeger collector.",
        "Identify the slowest span in the trace hierarchy."
      ],
      terminalLab: `docker run -d --name jaeger -p 16686:16686 -p 4318:4318 jaegertracing/all-in-one:latest`,
      hints: [
        "Search in Jaeger UI (http://localhost:16686) for spans with duration > 1000ms."
      ],
      solutionCode: `import { NodeSDK } from '@opentelemetry/sdk-node';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';

const sdk = new NodeSDK({
  traceExporter: new OTLPTraceExporter({ url: 'http://localhost:4318/v1/traces' }),
  instrumentations: [getNodeAutoInstrumentations()]
});
sdk.start();`,
      solutionExplanation: "Auto-instrumentation wraps HTTP and database calls in distributed spans, visualizing the exact waterfall breakdown of request latency."
    },
    selfCheckQuestions: [
      {
        question: "Why is tracking p99 latency much more important than average latency?",
        answerExplanation: "Average latency masks tail outliers. In an e-commerce platform where 99% of requests take 20ms and 1% take 5,000ms, the average looks healthy (~70ms), but your highest-spending power users are experiencing catastrophic 5-second delays."
      }
    ]
  },
  {
    id: "graceful-shutdown-fault-tolerance",
    number: 29,
    title: "Graceful Shutdown & Fault Tolerance (SIGTERM handling, Drain connections)",
    phaseId: 6,
    phaseName: "Reliability, Resilience & Observability",
    duration: "36 min",
    youtubeId: "6rfBgphiCWM",
    youtubeChannelUrl: CHANNEL_URL,
    shortSummary: "Intercepting SIGTERM/SIGINT signals, stopping new connections, draining in-flight HTTP requests, and releasing database pools cleanly.",
    seniorInsight: {
      quote: "When Kubernetes redeploys your app, it sends a SIGTERM. If your app doesn't handle it gracefully, users will see 502 Bad Gateway errors during every deployment.",
      productionLesson: "Graceful shutdown requires three steps: 1) Stop listening for new incoming HTTP connections. 2) Allow active in-flight requests and background jobs to finish (up to a timeout budget, e.g. 15 seconds). 3) Close database pools and Redis connections cleanly before calling process.exit(0).",
      commonMistake: "Immediately closing database connection pools upon receiving SIGTERM while in-flight HTTP requests are still actively executing queries."
    },
    coreDeepDive: {
      what: "Graceful shutdown ensures an application process terminates safely without dropping active network connections or corrupting state.",
      why: "Eliminates 502 Bad Gateway errors during rolling updates and deployments in Kubernetes, ECS, or Docker Swarm.",
      howItWorks: [
        "1. Orchestrator sends SIGTERM signal to container process.",
        "2. Server stops accepting new connections; health check begins returning 503.",
        "3. In-flight HTTP requests are granted a grace period (e.g. 10-20 seconds) to complete.",
        "4. Database connection pools, queue consumers, and file handles are closed.",
        "5. Process terminates with exit code 0."
      ],
      blueprintTitle: "Production Graceful Shutdown Lifecycle",
      blueprintCode: `[SIGTERM Received]
       │
       ▼
1. Stop accepting NEW connections (server.close())
       │
       ▼
2. Drain in-flight HTTP requests (Wait up to 15s)
       │
       ▼
3. Finish or pause background queue jobs
       │
       ▼
4. Close Database Pools & Redis Connections
       │
       ▼
5. Terminate cleanly: process.exit(0)`,
      blueprintLanguage: "text"
    },
    recommendedBook: {
      title: "The Linux Programming Interface",
      author: "Michael Kerrisk",
      keyChapters: "Chapters 20 & 21 (Signals: Fundamental Concepts & Handlers)",
      whyReadThis: "The definitive encyclopedia on UNIX signals, process lifecycles, and OS termination mechanics.",
      readingUrl: "https://man7.org/tlpi/"
    },
    handsOnChallenge: {
      ticketNumber: "TICKET-029",
      title: "Implement Zero-Downtime Graceful Shutdown Handler",
      scenario: "Deployments in production trigger intermittent 502 Bad Gateway errors for active users completing checkouts.",
      acceptanceCriteria: [
        "Listen to process.on('SIGTERM') and process.on('SIGINT').",
        "Stop server from accepting new traffic while allowing existing requests to finish.",
        "Force exit with code 1 after 20-second timeout if requests do not finish."
      ],
      terminalLab: `kill -SIGTERM $(pgrep -f "node src/server.js")`,
      hints: [
        "server.close() stops accepting new requests while allowing current requests to complete."
      ],
      solutionCode: `function setupGracefulShutdown(server, dbPool) {
  const shutdown = async (signal) => {
    console.log('Received ' + signal + '. Shutting down gracefully...');
    server.close(async () => {
      console.log('HTTP connections drained.');
      await dbPool.end();
      console.log('Database connections closed.');
      process.exit(0);
    });
    setTimeout(() => {
      console.error('Forcefully terminating: shutdown timeout exceeded');
      process.exit(1);
    }, 20000);
  };
  process.on('SIGTERM', () => shutdown('SIGTERM'));
  process.on('SIGINT', () => shutdown('SIGINT'));
}`,
      solutionExplanation: "Coordinating server connection closure with database pool termination guarantees zero dropped requests during rolling deployments."
    },
    selfCheckQuestions: [
      {
        question: "What is the difference between SIGTERM and SIGKILL?",
        answerExplanation: "SIGTERM is a polite termination request sent by the OS that application code can catch to perform cleanup. SIGKILL cannot be caught or ignored—the OS kernel immediately terminates the process without cleaning up memory or files."
      }
    ]
  },

  // ==========================================
  // PHASE 7: Advanced Engineering, Scale & Operations
  // ==========================================
  {
    id: "concurrency-parallelism-race-conditions",
    number: 30,
    title: "Concurrency & Parallelism (Race Conditions, Locks, Mutexes, Goroutines/Worker Threads)",
    phaseId: 7,
    phaseName: "Advanced Engineering, Scale & Operations",
    duration: "31 min",
    youtubeId: "oV9rvDllKEg",
    youtubeChannelUrl: CHANNEL_URL,
    shortSummary: "Concurrency vs parallelism, race conditions, mutual exclusion (Mutex), distributed locks (Redlock), and deadlock avoidance.",
    seniorInsight: {
      quote: "Concurrency is not parallelism. Concurrency is about dealing with lots of things at once; parallelism is about doing lots of things at once. — Rob Pike",
      productionLesson: "Node.js is single-threaded for JavaScript execution, but it is NOT immune to race conditions. Two asynchronous requests can execute await db.get() simultaneously, see the same balance, and both execute await db.set(), causing lost updates. Use database row locks (FOR UPDATE) or distributed Redis locks.",
      commonMistake: "Acquiring multiple locks in different orders across functions, creating unresolvable Deadlocks."
    },
    coreDeepDive: {
      what: "Concurrency manages multiple tasks making progress over shared resources; parallelism utilizes multiple CPU cores simultaneously.",
      why: "Prevents data corruption, state collisions, and throughput collapse in multi-user environments.",
      howItWorks: [
        "1. Critical sections are protected by Mutexes (Mutual Exclusion).",
        "2. Database row-level locks (SELECT ... FOR UPDATE) prevent concurrent read-modify-write collisions.",
        "3. Distributed locks (Redlock) coordinate synchronization across multiple independent server instances."
      ],
      blueprintTitle: "Race Condition vs Atomic Row Locking",
      blueprintCode: `-- VULNERABLE TO RACE CONDITION (Lost Update)
-- User A and User B both read balance = 100 at the same millisecond:
SELECT balance FROM accounts WHERE id = 1; 
-- Both compute 100 - 50 = 50 and overwrite:
UPDATE accounts SET balance = 50 WHERE id = 1; -- 50 ETB lost!

-- PROTECTED: Pessimistic Row Lock (SELECT ... FOR UPDATE)
BEGIN;
SELECT balance FROM accounts WHERE id = 1 FOR UPDATE; -- Blocks User B
UPDATE accounts SET balance = balance - 50 WHERE id = 1;
COMMIT; -- User B unblocks and sees correct balance of 50`,
      blueprintLanguage: "sql"
    },
    recommendedBook: {
      title: "Designing Data-Intensive Applications (DDIA)",
      author: "Martin Kleppmann",
      keyChapters: "Chapter 7: Transactions (Race Conditions, Serializability, 2PL, SSI)",
      whyReadThis: "The undisputed master breakdown of concurrency anomalies: Dirty Reads, Non-repeatable Reads, Phantom Reads, and Lost Updates.",
      readingUrl: "https://dataintensive.net/"
    },
    handsOnChallenge: {
      ticketNumber: "TICKET-030",
      title: "Reproduce and Fix an E-Commerce Inventory Race Condition",
      scenario: "When the last item of an iPhone is in stock, two simultaneous checkouts both succeed, overselling inventory to -1.",
      acceptanceCriteria: [
        "Write a script firing 10 concurrent requests to buy 1 item.",
        "Use SELECT FOR UPDATE or atomic UPDATE ... WHERE stock > 0 to guarantee exactly 1 order succeeds."
      ],
      terminalLab: `node -e 'Promise.all([...Array(10)].map(() => fetch("http://localhost:3000/api/buy")))'`,
      hints: [
        "Execute UPDATE inventory SET stock = stock - 1 WHERE id = $1 AND stock >= 1;"
      ],
      solutionCode: `const res = await db.query(
  'UPDATE inventory SET stock = stock - 1 WHERE id = $1 AND stock >= 1 RETURNING *',
  [productId]
);
if (res.rowCount === 0) {
  throw new SoldOutError('Product is sold out.');
}`,
      solutionExplanation: "Atomic single-statement conditional updates leverage PostgreSQL's internal row locks, ensuring that only one concurrent transaction decrements the final stock."
    },
    selfCheckQuestions: [
      {
        question: "Why can race conditions still occur in single-threaded runtimes like Node.js?",
        answerExplanation: "Because Node.js yields execution during asynchronous I/O operations (await). If two requests await a database check concurrently, both inspect the same initial state before either writes its update."
      }
    ]
  },
  {
    id: "scaling-testing-devops",
    number: 31,
    title: "Scaling, Testing & DevOps (Testcontainers, Docker Containers, CI/CD, Load Balancing)",
    phaseId: 7,
    phaseName: "Advanced Engineering, Scale & Operations",
    duration: "2 hrs 10 min",
    youtubeId: "fqMOX6JJhGo",
    youtubeChannelUrl: CHANNEL_URL,
    shortSummary: "Horizontal scaling, load balancing, Testcontainers integration testing, multi-stage Docker builds, and automated CI/CD quality gates.",
    secondaryVideo: {
      youtubeId: "PX3R1fXjJ2M",
      title: "Globally Distributed Databases with Read Replicas",
      duration: "25 min",
      description: "How to scale read-heavy applications using PostgreSQL read replicas and read/write splitting."
    },
    seniorInsight: {
      quote: "Mocking your database in integration tests is lying to yourself. Use Testcontainers to spin up real, ephemeral PostgreSQL and Redis Docker containers during test suites.",
      productionLesson: "In-memory database mocks (like sqlite or mock-redis) do not test real PostgreSQL indexing, locking, or query plans. Testcontainers launches a real PostgreSQL instance inside Docker in 1 second, providing 100% fidelity to production.",
      commonMistake: "Running Docker containers in production as the root user instead of declaring a restricted non-root user (USER node)."
    },
    coreDeepDive: {
      what: "Modern backend DevOps encompasses automated testing with real infrastructure dependencies, container packaging, and automated CI/CD delivery.",
      why: "Ensures code can be deployed to production 10 times a day with zero regressions and seamless horizontal scalability.",
      howItWorks: [
        "1. Testcontainers spins up real ephemeral Docker dependencies (Postgres, Redis) for integration tests.",
        "2. Multi-stage Docker builds separate build dependencies from minimal production runtime images.",
        "3. CI/CD pipeline runs lints, tests, builds image, and performs canary deployment."
      ],
      blueprintTitle: "Hardened Production Multi-Stage Dockerfile",
      blueprintCode: `# Build Stage
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production Runtime Stage (Small, secure, non-root)
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
# Security: Never run containers as root!
USER node
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
EXPOSE 3000
CMD ["node", "dist/server.js"]`,
      blueprintLanguage: "dockerfile"
    },
    recommendedBook: {
      title: "The DevOps Handbook (2nd Edition)",
      author: "Gene Kim, Jez Humble, Patrick Debois & John Willis",
      keyChapters: "Chapters 5 & 6 (The Technical Practices of Flow, Telemetry, and Continuous Delivery)",
      whyReadThis: "The seminal guide for implementing automated testing, continuous integration, and high-trust deployment pipelines.",
      readingUrl: "https://continuousdelivery.com/"
    },
    handsOnChallenge: {
      ticketNumber: "TICKET-031",
      title: "Build an Integration Test Suite using Real PostgreSQL in Testcontainers",
      scenario: "Unit tests with SQLite in-memory passed, but production crashed due to PostgreSQL-specific JSONB and UUID syntax errors.",
      acceptanceCriteria: [
        "Spin up real PostgreSQL container using Testcontainers.",
        "Run database migrations against ephemeral container.",
        "Verify ACID transaction rollbacks pass with 100% production fidelity."
      ],
      terminalLab: `npm test -- test/integration/order-flow.test.js`,
      hints: [
        "Use @testcontainers/postgresql to spin up the container in Jest beforeAll()."
      ],
      solutionCode: `import { PostgreSqlContainer } from '@testcontainers/postgresql';

let container;
beforeAll(async () => {
  container = await new PostgreSqlContainer('postgres:16-alpine').start();
  process.env.DATABASE_URL = container.getConnectionUri();
  await runMigrations();
});
afterAll(async () => {
  await container.stop();
});`,
      solutionExplanation: "Testing against real PostgreSQL instances inside ephemeral containers uncovers real-world database syntax, constraint, and locking errors before code ever deploys."
    },
    selfCheckQuestions: [
      {
        question: "Why are multi-stage Docker builds essential for production backend security and performance?",
        answerExplanation: "Multi-stage builds leave compilers, development dependencies (npm devDependencies), and source code behind in the build stage, creating tiny runtime container images with a minimal attack surface that boot in seconds."
      }
    ]
  }
];

export const ROADMAP_PHASES: RoadmapPhase[] = [
  {
    id: 1,
    name: "Foundations & Web Protocols",
    description: "Master the fundamental principles of backend architecture, networking, HTTP protocols, routing radix trees, and binary/text serialization.",
    topics: ROADMAP_TOPICS.filter((t) => t.phaseId === 1),
  },
  {
    id: 2,
    name: "Core API Architecture & Request Lifecycle",
    description: "Architect clean, modular backend applications: Middlewares, request contexts, input validation, layered architecture, RESTful standards, and state mutations.",
    topics: ROADMAP_TOPICS.filter((t) => t.phaseId === 2),
  },
  {
    id: 3,
    name: "Data Persistence & Storage",
    description: "Master relational and in-memory persistence: PostgreSQL internals, ACID transactions, relational modeling, indexing performance, domain invariants, and caching architectures.",
    topics: ROADMAP_TOPICS.filter((t) => t.phaseId === 3),
  },
  {
    id: 4,
    name: "Security & Access Control",
    description: "Secure APIs and backend systems: Authentication, cryptographic tokens, role and attribute-based authorization, and OWASP API Top 10 hardening.",
    topics: ROADMAP_TOPICS.filter((t) => t.phaseId === 4),
  },
  {
    id: 5,
    name: "Asynchronous Systems & Integrations",
    description: "Decouple synchronous HTTP flows: Task queuing, background workers, transactional email, webhooks with HMAC, real-time websockets/SSE, object storage, and full-text search.",
    topics: ROADMAP_TOPICS.filter((t) => t.phaseId === 5),
  },
  {
    id: 6,
    name: "Reliability, Resilience & Observability",
    description: "Build production-resilient systems: RFC 7807/9457 Problem Details, 12-factor configuration, OpenTelemetry logging/metrics, and graceful shutdown signal handling.",
    topics: ROADMAP_TOPICS.filter((t) => t.phaseId === 6),
  },
  {
    id: 7,
    name: "Advanced Engineering, Scale & Operations",
    description: "Operate at high volume: Concurrency, race conditions, distributed locks, database scaling, read replicas, Testcontainers, and containerized CI/CD pipelines.",
    topics: ROADMAP_TOPICS.filter((t) => t.phaseId === 7),
  },
];
