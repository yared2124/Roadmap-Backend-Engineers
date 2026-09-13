import { RoadmapTopic, RoadmapPhase } from "../types/roadmap";

export const CHANNEL_URL = "https://www.youtube.com/@sriniously";
export const CHANNEL_NAME = "@sriniously";

export const ROADMAP_TOPICS: RoadmapTopic[] = [
  // Phase 1: Foundations & Web Protocols
  {
    id: "backend-from-first-principles",
    number: 1,
    title: "Backend from First Principles: Architecture & Systems Roadmap",
    phaseId: 1,
    phaseName: "Web Protocols & Foundations",
    duration: "31 min",
    youtubeId: "0Rwb4Xmlcwc",
    youtubeChannelUrl: CHANNEL_URL,
    shortSummary: "Deconstructing backend engineering from first principles: Why it extends far beyond CRUD APIs to reliability, scalability, and maintainability across any language or stack.",
    timestamps: [
      { timeFormatted: "00:00", seconds: 0, label: "Introduction to First Principles" },
      { timeFormatted: "02:22", seconds: 142, label: "Foundations (Architecture, HTTP, Routing, Serialization)" },
      { timeFormatted: "07:13", seconds: 433, label: "Request Handling (Auth, Validation, Middlewares, Context)" },
      { timeFormatted: "16:33", seconds: 993, label: "Architecture & Data (REST, BLL, Databases, Caching)" },
      { timeFormatted: "20:04", seconds: 1204, label: "System Operations (Queues, Scheduling, Emails, Errors)" },
      { timeFormatted: "23:16", seconds: 1396, label: "Observability & Reliability (Config, Logging, Metrics, Shutdown)" },
      { timeFormatted: "26:23", seconds: 1583, label: "Scalability & Quality (Performance, Concurrency, DevOps)" },
    ],
    seniorInsight: {
      quote: "Backend engineering is not about writing frameworks; it is about managing state, latency, and failure across network boundaries.",
      productionLesson: "When you reason from first principles, you stop asking 'Which framework is trending?' and start asking 'What are my disk I/O constraints, network latencies, memory footprints, and fault boundaries?'",
      commonMistake: "Learning by superficial analogy—copy-pasting tutorials without understanding the underlying transport protocol, operating system processes, or database storage engines."
    },
    coreDeepDive: {
      what: "First Principles Thinking applied to backend systems: Deconstructing software into fundamental engineering truths (CPU cycles, sockets, bytes on wire, ACID guarantees, fault tolerance) rather than framework-specific abstractions.",
      why: "Frameworks and language popularity shift every 3–5 years, but first-principles (TCP three-way handshakes, B-Tree indexes, race conditions, idempotency, distributed consensus) remain durable across your entire career.",
      howItWorks: [
        "1. Foundations Tier (02:22): Request travel across the internet, DNS, TCP/TLS negotiation, routing lookup algorithms, and data encoding.",
        "2. Request Processing Tier (07:13): Secure perimeter authentication, schema validation, interceptor pipelines, and context cancellation deadlines.",
        "3. Persistence & Data Tier (16:33): Relational ACID transactions, MVCC, indexing strategies, and caching tiers.",
        "4. Asynchronous & Reliability Tier (20:04): Decoupling heavy workloads into worker queues, idempotency, structured error domains, and telemetry (RED metrics)."
      ],
      blueprintTitle: "First-Principles System Architecture Hierarchy",
      blueprintCode: `[Untrusted Public Internet]
       │
       ▼ (HTTPS :443 / TLS 1.3)
[Edge & Reverse Proxy]     <-- SSL termination, DDoS protection, Rate Limiting
       │
       ▼ (Private VPC Network)
[Application Service]      <-- Stateless execution, Request Context, Validation
       │
       ├──► [PostgreSQL]    <-- ACID persistence, MVCC, B-Trees, Connection Pool
       ├──► [Redis]         <-- In-memory cache-aside, locks, transient sessions
       └──► [Task Queue]    <-- Asynchronous background workers, Outbox relay`,
      blueprintLanguage: "text"
    },
    recommendedBook: {
      title: "Designing Data-Intensive Applications (DDIA)",
      author: "Martin Kleppmann",
      keyChapters: "Chapter 1: Reliable, Scalable, and Maintainable Applications",
      whyReadThis: "The definitive first-principles text for backend engineers. Kleppmann establishes how to rigorously analyze hardware faults, network unreliability, and traffic scaling without framework bias."
    },
    additionalReferences: [
      {
        title: "The Twelve-Factor App Methodology",
        url: "https://12factor.net",
        description: "Canonical rules for designing modern, scalable, maintainable cloud-native applications."
      },
      {
        title: "End-to-End Arguments in System Design (MIT Paper)",
        url: "https://web.mit.edu/Saltzer/www/publications/endtoend/endtoend.pdf",
        description: "The foundational MIT research paper that established how intelligence and reliability must be placed in network endpoints."
      },
      {
        title: "Google SRE Book - Reliability Principles",
        url: "https://sre.google/sre-book/introduction/",
        description: "Google's definitive engineering manual on error budgets, SLOs, and systems resilience."
      },
      {
        title: "Martin Fowler: Patterns of Enterprise Architecture",
        url: "https://martinfowler.com/architecture/",
        description: "Foundational architectural patterns for enterprise software and domain boundaries."
      }
    ],
    handsOnChallenge: {
      ticketNumber: "TICKET-001",
      title: "Calculate System Error Budgets & Map Network Latency Hops",
      scenario: "Your team is designing a new microservice. Management demands a 99.9% availability Service Level Objective (SLO). You must calculate the permissible monthly downtime budget, trace packet latency across network boundaries, and draft a first-principles architectural RFC.",
      acceptanceCriteria: [
        "Calculate the exact monthly error budget in minutes for a 99.9% uptime SLO.",
        "Map out the 4 critical network boundaries: Client Browser -> Edge CDN -> Reverse Proxy -> Internal VPC Service.",
        "Use curl with write-out flags to measure DNS lookup, TCP connect, and TTFB latencies."
      ],
      terminalLab: `curl -w "DNS: %{time_namelookup}s | TCP: %{time_connect}s | TLS: %{time_appconnect}s | TTFB: %{time_starttransfer}s | Total: %{time_total}s\\n" -o /dev/null -s https://api.github.com`,
      hints: [
        "A 30-day month contains 43,200 total minutes (30 * 24 * 60).",
        "99.9% availability allows a 0.1% failure rate: 43,200 * 0.001 = 43.2 minutes."
      ],
      solutionCode: `// First-Principles Availability Formula
// Total Month Minutes = 30 * 24 * 60 = 43,200 minutes
// 99.9% ("Three Nines") allowed downtime = 43.2 minutes / month
// 99.99% ("Four Nines") allowed downtime = 4.32 minutes / month
// 99.999% ("Five Nines") allowed downtime = 25.9 seconds / month`,
      solutionExplanation: "Reasoning from first principles reveals that high availability is an engineering trade-off. Every extra nine costs exponentially more in redundant infrastructure and multi-region synchronization."
    },
    selfCheckQuestions: [
      "What is First Principles thinking and how does it differentiate a senior systems engineer from a framework user?",
      "What are the Three Pillars of software systems defined in Chapter 1 of DDIA?",
      "How much downtime does a 99.9% SLA allow per month, and why is 100% uptime physically impossible?"
    ]
  },
  {
    id: "http-protocol",
    number: 2,
    title: "HTTP Protocol Deep Dive",
    phaseId: 1,
    phaseName: "Web Protocols & Foundations",
    duration: "55 min",
    youtubeId: "iYM2zFP3Zn0",
    youtubeChannelUrl: CHANNEL_URL,
    shortSummary: "HTTP/1.1 vs HTTP/2 vs HTTP/3, status codes, headers, and idempotent vs safe methods.",
    seniorInsight: {
      quote: "Understanding idempotency is what separates engineers who build billing bugs from engineers who build fault-tolerant payment systems.",
      productionLesson: "Network packets fail, retry, and duplicate. If your POST or payment endpoint is not idempotent, network retries will charge the customer multiple times.",
      commonMistake: "Using GET requests for operations that mutate state, or using 200 OK for every response including errors."
    },
    coreDeepDive: {
      what: "Hypertext Transfer Protocol (HTTP) is the application-layer foundation of web data exchange.",
      why: "Proper HTTP usage leverages web proxies, CDN caching, browser prefetching, and standardized error parsing.",
      howItWorks: [
        "Safe Methods: GET, HEAD, OPTIONS (do not alter server state).",
        "Idempotent Methods: PUT, DELETE, GET (repeating the same request N times produces the exact same server state as 1 request).",
        "HTTP/2 Multiplexing: Multiple bi-directional streams interleaved over a single TCP connection, eliminating head-of-line blocking."
      ],
      blueprintTitle: "Standardized RFC 7807 Error Response",
      blueprintCode: `// Return Content-Type: application/problem+json
{
  "type": "https://api.example.com/errors/insufficient-funds",
  "title": "Insufficient Funds",
  "status": 422,
  "detail": "Your wallet balance is 40.00 ETB, but transfer requires 100.00 ETB.",
  "instance": "/transfers/tx_9921",
  "code": "WALLET_BALANCE_TOO_LOW"
}`,
      blueprintLanguage: "json"
    },
    recommendedBook: {
      title: "HTTP: The Definitive Guide",
      author: "David Gourley & Brian Totty",
      keyChapters: "Chapters 3, 7 & 11 (HTTP Messages, Caching, and Content Negotiation)",
      whyReadThis: "The undisputed reference for headers, caching directives (ETag, Cache-Control), and proxy traversal."
    },
    handsOnChallenge: {
      ticketNumber: "TICKET-102",
      title: "Implement Idempotency Key Handling in HTTP",
      scenario: "Users on unstable mobile networks double-tap 'Pay Now', causing double charges. Implement an Idempotency-Key header check.",
      acceptanceCriteria: [
        "Extract 'Idempotency-Key' from request headers.",
        "If key exists in cache, return cached response immediately without re-executing payment.",
        "If new, acquire lock, process, cache response with TTL, and return 201 Created."
      ],
      hints: [
        "Use an in-memory Map or Redis SETNX (SET with NX and EX) to store the idempotency key.",
        "Return the identical status code and payload as the original execution."
      ],
      solutionCode: `// Express / Next.js API route middleware example
const idempotencyStore = new Map();

export async function handlePayment(req, res) {
  const key = req.headers['idempotency-key'];
  if (!key) return res.status(400).json({ error: "Missing Idempotency-Key" });

  if (idempotencyStore.has(key)) {
    const cached = idempotencyStore.get(key);
    return res.status(cached.status).json(cached.body);
  }

  // Process transaction
  const result = await chargeCustomer(req.body);
  idempotencyStore.set(key, { status: 201, body: result });
  return res.status(201).json(result);
}`,
      solutionExplanation: "Storing completed responses against unique client-provided UUIDs guarantees duplicate network packets never trigger multiple state mutations."
    },
    selfCheckQuestions: [
      "Why is PUT idempotent while PATCH is typically not guaranteed to be idempotent?",
      "What is the exact purpose of an ETag header and 304 Not Modified?",
      "How does HTTP/2 multiplexing eliminate HTTP/1.1 head-of-line blocking?"
    ]
  },
  {
    id: "routing",
    number: 3,
    title: "Routing & Request Dispatching",
    phaseId: 1,
    phaseName: "Web Protocols & Foundations",
    duration: "40 min",
    youtubeId: "WXsD0ZgRrw8",
    youtubeChannelUrl: CHANNEL_URL,
    shortSummary: "Trie/Radix trees, path parameters, query strings, and API versioning strategies.",
    seniorInsight: {
      quote: "Never break your public API contract. URL versioning (/v1) gives you the freedom to refactor internal models without breaking mobile apps in the wild.",
      productionLesson: "Regex-based routing engines degrade to O(N) lookup times as routes scale into hundreds. Production routers (like Go's Chi/Gin or Fastify) use Radix Trees (O(K) where K is route length).",
      commonMistake: "Putting API version numbers in domain names rather than URI paths, or neglecting 404 vs 405 (Method Not Allowed) differentiation."
    },
    coreDeepDive: {
      what: "Routing maps an incoming HTTP method + URL path to the specific controller function responsible for executing the request.",
      why: "Clean routing ensures predictable API discovery, prevents routing conflicts, and enables group-level middleware application.",
      howItWorks: [
        "1. Exact matches are evaluated first.",
        "2. Parameterized segments (/users/:id) extract variables into the request context.",
        "3. Wildcard routes (/*) catch remaining subpaths."
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
      whyReadThis: "Practical guidelines for constructing intuitive, durable, and REST-compliant route hierarchies."
    },
    handsOnChallenge: {
      ticketNumber: "TICKET-103",
      title: "Build a Versioned Radix-based Router Group",
      scenario: "Refactor legacy flat endpoints into structured /api/v1 and /api/v2 route groups with shared authentication middleware.",
      acceptanceCriteria: [
        "Prefix all routes with /api/v1.",
        "Differentiate 404 (Resource Not Found) from 405 (Method Not Allowed).",
        "Extract path parameters into a strongly typed DTO."
      ],
      hints: [
        "Use route groups with prefix inheritance.",
        "If a route matches the path but not the HTTP verb, RFC dictates returning a 405 with an 'Allow' header."
      ],
      solutionCode: `// Example Router Setup
const router = new Router();
const v1 = router.group("/api/v1");

v1.use(authMiddleware);
v1.get("/users/:userId/orders", (req, res) => {
  const { userId } = req.params;
  // Handled
});`,
      solutionExplanation: "Router groups allow applying middlewares (auth, rate limits, telemetry) at the prefix boundary without code duplication."
    },
    selfCheckQuestions: [
      "Why is a Radix Tree faster than an array of regular expressions for matching URLs?",
      "When should you return 405 Method Not Allowed instead of 404 Not Found?",
      "What are the pros and cons of URI versioning (/v1) vs Header versioning (Accept: application/vnd.api.v1+json)?"
    ]
  },
  {
    id: "serialization-deserialization",
    number: 4,
    title: "Serialization and Deserialization",
    phaseId: 1,
    phaseName: "Web Protocols & Foundations",
    duration: "45 min",
    youtubeId: "4c74i_w89L8",
    youtubeChannelUrl: CHANNEL_URL,
    shortSummary: "JSON parsing, Protobuf, binary protocols, 64-bit int precision pitfalls, and security risks.",
    seniorInsight: {
      quote: "JSON numbers are IEEE 754 floating point. A 64-bit database ID (e.g. 9007199254740993) will silently corrupt in Javascript unless serialized as a string.",
      productionLesson: "Always serialize IDs as strings (or use UUIDv7) when targeting web clients. In high-throughput internal microservices, switch from JSON to Protocol Buffers (Protobuf) for 5-10x throughput gains.",
      commonMistake: "Deserializing untrusted user inputs directly into internal domain models without strict schema stripping (Mass Assignment vulnerability)."
    },
    coreDeepDive: {
      what: "Converting in-memory data structures into a transportable byte stream (serialization) and reconstructing objects from bytes (deserialization).",
      why: "Different programming languages and runtime architectures must exchange structured data over TCP sockets safely.",
      howItWorks: [
        "Text-based (JSON, XML): Human readable, higher CPU overhead, larger payload size.",
        "Binary (Protobuf, MsgPack, FlatBuffers): Schema-enforced, zero-copy parsing, compact wire footprint."
      ],
      blueprintTitle: "Safe DTO Parsing with Zod / Typebox",
      blueprintCode: `import { z } from "zod";

export const CreateUserSchema = z.object({
  email: z.string().email(),
  age: z.number().int().min(18),
  // Explicitly prevent extra fields (mass assignment protection)
}).strict();

export type CreateUserDTO = z.infer<typeof CreateUserSchema>;`,
      blueprintLanguage: "typescript"
    },
    recommendedBook: {
      title: "Designing Data-Intensive Applications (DDIA)",
      author: "Martin Kleppmann",
      keyChapters: "Chapter 4: Encoding and Evolution (Formats, Thrift, Protocol Buffers, Avro)",
      whyReadThis: "The definitive guide on binary encodings, forward and backward schema compatibility, and data evolution."
    },
    handsOnChallenge: {
      ticketNumber: "TICKET-104",
      title: "Fix 64-Bit Integer Truncation in API Responses",
      scenario: "Frontend reports that order ID 18446744073709551614 displays as 18446744073709552000 in browser clients due to JavaScript MAX_SAFE_INTEGER limits.",
      acceptanceCriteria: [
        "Implement a custom JSON serializer or DTO transformer.",
        "Ensure all 64-bit integer IDs (BigInt) are serialized as strings in outbound HTTP responses."
      ],
      hints: [
        "JavaScript's Number.MAX_SAFE_INTEGER is 2^53 - 1 (9007199254740991).",
        "Override BigInt.prototype.toJSON or use schema mapping before res.json()."
      ],
      solutionCode: `// Global BigInt serializer fallback
(BigInt.prototype as any).toJSON = function () {
  return this.toString();
};

// Or via explicit DTO mapping:
const responseDTO = {
  ...order,
  id: order.id.toString(),
  amountCents: order.amountCents.toString(),
};`,
      solutionExplanation: "Transforming 64-bit integers into strings preserves precision across web, iOS, and external API integrations."
    },
    selfCheckQuestions: [
      "What is the maximum integer JavaScript can safely represent without precision loss?",
      "Why is Protobuf significantly faster to deserialize than JSON?",
      "How do schema registries prevent breaking changes in binary serialization?"
    ]
  },

  // Phase 2: Architecture & Request Lifecycle
  {
    id: "handlers-controllers-services",
    number: 5,
    title: "Handlers, Controllers, and Services",
    phaseId: 2,
    phaseName: "Application Architecture & Request Lifecycle",
    duration: "50 min",
    youtubeId: "Cnae5GMWBag",
    youtubeChannelUrl: CHANNEL_URL,
    shortSummary: "Clean 3-tier layered architecture, separation of transport from business logic, and DTOs.",
    seniorInsight: {
      quote: "If your database queries are written inside your HTTP controllers, your code is already legacy on the day it's written.",
      productionLesson: "A controller should be so lightweight that replacing HTTP with a CLI command, WebSocket handler, or gRPC endpoint requires zero changes to the underlying Service layer.",
      commonMistake: "Passing the raw HTTP Request/Response objects down into domain service methods."
    },
    coreDeepDive: {
      what: "A structural pattern dividing backend applications into three distinct layers: Controller (Transport), Service (Business Logic), and Repository (Data Access).",
      why: "Ensures testability, reusability across multiple protocols, and clean separation of concerns.",
      howItWorks: [
        "1. Controller: Extracts headers, body, params; validates syntax; calls Service.",
        "2. Service: Executes domain business rules, coordinates transactions, emits events.",
        "3. Repository: Runs raw SQL or ORM queries; returns domain entities."
      ],
      blueprintTitle: "Clean Layered Flow",
      blueprintCode: `HTTP Request
     │
     ▼
[Controller]  <-- Knows HTTP (Status 200/400, cookies, headers)
     │ (DTO)
     ▼
[Service]     <-- Pure business rules (Transfer funds, calculate discounts)
     │ (Domain Model)
     ▼
[Repository]  <-- Knows SQL (PostgreSQL, queries, connection pools)`,
      blueprintLanguage: "text"
    },
    recommendedBook: {
      title: "Clean Architecture: A Craftsman's Guide",
      author: "Robert C. Martin (Uncle Bob)",
      keyChapters: "Chapters 20 & 22 (Business Rules & The Clean Architecture Hexagon)",
      whyReadThis: "Learn how the Dependency Inversion Principle protects core domain logic from framework lock-in."
    },
    handsOnChallenge: {
      ticketNumber: "TICKET-201",
      title: "Decouple a Bloated Controller into 3 Tiers",
      scenario: "Refactor a 300-line controller method that directly calls SQL queries and sends emails into separate Controller, Service, and Repository units.",
      acceptanceCriteria: [
        "Controller handles HTTP status codes and body parsing only.",
        "Service layer is pure TypeScript with no dependencies on Express/Next.js req/res.",
        "Write a unit test for the Service layer using a mock repository."
      ],
      hints: [
        "Pass only plain data (primitives, DTO objects) to the service method.",
        "Use dependency injection or repository interfaces."
      ],
      solutionCode: `export class OrderService {
  constructor(private repo: OrderRepository, private mailer: EmailService) {}

  async createOrder(dto: CreateOrderDTO): Promise<Order> {
    const order = await this.repo.save(dto);
    await this.mailer.sendConfirmation(order.userEmail, order.id);
    return order;
  }
}`,
      solutionExplanation: "Decoupling transport from business logic allows testing core rules without spinning up mock HTTP servers."
    },
    selfCheckQuestions: [
      "Why should you never pass `req` or `res` into a Service class method?",
      "What is the difference between an Entity and a Data Transfer Object (DTO)?",
      "How does Dependency Injection simplify unit testing in the Service layer?"
    ]
  },
  {
    id: "middlewares",
    number: 6,
    title: "Middlewares and the Onion Architecture",
    phaseId: 2,
    phaseName: "Application Architecture & Request Lifecycle",
    duration: "45 min",
    youtubeId: "lY6icfhap2o",
    youtubeChannelUrl: CHANNEL_URL,
    shortSummary: "Interceptor pattern, request pipelines, panic recovery, CORS, and rate limiting.",
    seniorInsight: {
      quote: "Middlewares are the security guards and telemetry probes of your application. Keep them focused, idempotent, and blazing fast.",
      productionLesson: "A slow middleware (e.g., executing an unindexed DB query on every request to check permissions) introduces artificial latency to every single endpoint in your system.",
      commonMistake: "Forgetting to call `next()` or calling `next()` multiple times, leading to socket hang or double-execution errors."
    },
    coreDeepDive: {
      what: "Functions chained in sequence that execute before, around, or after the main request handler.",
      why: "Cross-cutting concerns (Auth, Logging, Metrics, Tracing, CORS) can be abstracted without polluting business logic.",
      howItWorks: [
        "Inbound: Middleware 1 -> Middleware 2 -> Handler.",
        "Outbound: Handler -> Middleware 2 (post-processing) -> Middleware 1 (response timer) -> Client."
      ],
      blueprintTitle: "Standard Request ID Injection Middleware",
      blueprintCode: `export function requestIdMiddleware(req, res, next) {
  // Use client trace ID if provided, otherwise generate UUIDv7
  const requestId = req.headers['x-request-id'] || crypto.randomUUID();
  req.id = requestId;
  res.setHeader('X-Request-ID', requestId);
  
  const start = performance.now();
  res.on('finish', () => {
    const duration = (performance.now() - start).toFixed(2);
    console.log(JSON.stringify({
      requestId,
      method: req.method,
      path: req.path,
      status: res.statusCode,
      durationMs: duration
    }));
  });
  next();
}`,
      blueprintLanguage: "typescript"
    },
    recommendedBook: {
      title: "Node.js Design Patterns (3rd Edition)",
      author: "Mario Casciaro & Luciano Mammino",
      keyChapters: "Chapter 9: Behavioral Design Patterns (Middleware & Pipeline)",
      whyReadThis: "Mastering the Chain of Responsibility and asynchronous flow control in server runtimes."
    },
    handsOnChallenge: {
      ticketNumber: "TICKET-202",
      title: "Build an Unhandled Exception Recovery Middleware",
      scenario: "An uncaught runtime error in an endpoint crashed the server process. Build a robust recovery middleware that catches exceptions, logs the stack trace with request ID, and returns a safe 500 JSON payload.",
      acceptanceCriteria: [
        "Catch synchronous errors and rejected promises.",
        "Prevent server crash.",
        "Do NOT leak internal database connection strings or stack traces to the client."
      ],
      hints: [
        "Express error middlewares must have 4 parameters: (err, req, res, next).",
        "Always check if headers have already been sent before attempting to write res.status(500)."
      ],
      solutionCode: `export function errorHandler(err: any, req: any, res: any, next: any) {
  const requestId = req.id || "unknown";
  logger.error({ err, requestId, message: "Unhandled exception caught" });

  if (res.headersSent) {
    return next(err);
  }

  res.status(500).json({
    error: "Internal Server Error",
    requestId: requestId,
    message: "An unexpected error occurred. Please quote this requestId to support."
  });
}`,
      solutionExplanation: "Centralized error handling guarantees safe client responses and ensures structured error telemetry reaches monitoring tools."
    },
    selfCheckQuestions: [
      "Why must panic/error recovery middlewares always be placed at the very end of the middleware chain?",
      "How does CORS preflight (OPTIONS request) work and when is it triggered?",
      "What happens if an asynchronous error is thrown inside a middleware without a try/catch or async wrapper?"
    ]
  },
  {
    id: "request-context",
    number: 7,
    title: "Request Context and Deadlines",
    phaseId: 2,
    phaseName: "Application Architecture & Request Lifecycle",
    duration: "40 min",
    youtubeId: "kaZOXXKZgvw",
    youtubeChannelUrl: CHANNEL_URL,
    shortSummary: "AsyncLocalStorage, context propagation, request-scoped metadata, and proactive cancellation deadlines.",
    seniorInsight: {
      quote: "When a user closes their browser tab or a mobile app loses connection, stop doing work for them immediately.",
      productionLesson: "Without context cancellation and proactive timeouts, your database will keep executing heavy 10-second queries for clients that disconnected 9 seconds ago.",
      commonMistake: "Storing mutable global state instead of using request-scoped context, resulting in cross-request data leaks between users."
    },
    coreDeepDive: {
      what: "Carrying request-scoped values (user ID, tenant ID, trace context, cancellation signals) down the call stack without passing them as explicit arguments to every function.",
      why: "Enables distributed tracing, tenant data isolation, and graceful cancellation of downstream database and HTTP calls.",
      howItWorks: [
        "Node.js: AsyncLocalStorage provides thread-local-like storage across asynchronous hops.",
        "Go: context.Context with WithCancel and WithTimeout.",
        "AbortController: Propagates cancellation signals to fetch() and database drivers."
      ],
      blueprintTitle: "Timeout & Cancellation Propagation",
      blueprintCode: `// Propagating cancellation to downstream queries
export async function fetchUserData(userId: string, signal: AbortSignal) {
  const query = db.query("SELECT * FROM users WHERE id = $1", [userId]);
  
  signal.addEventListener("abort", () => {
    query.cancel(); // Abort Postgres query immediately
  });

  return await query;
}`,
      blueprintLanguage: "typescript"
    },
    recommendedBook: {
      title: "Concurrency in Go",
      author: "Katherine Cox-Buday",
      keyChapters: "Chapter 4: Concurrency Patterns in Go (The Context Package)",
      whyReadThis: "Even if you code in TypeScript or Python, Go's context cancellation architecture is the gold standard for backend systems."
    },
    handsOnChallenge: {
      ticketNumber: "TICKET-203",
      title: "Implement Global 3-Second Request Timeout with AbortSignal",
      scenario: "Prevent slow external APIs from holding server connections open indefinitely by enforcing a hard 3-second deadline on all incoming requests.",
      acceptanceCriteria: [
        "Attach an AbortController with a 3000ms timeout to each incoming request context.",
        "If timeout fires before completion, cancel pending downstream DB calls and return 504 Gateway Timeout."
      ],
      hints: [
        "Use AbortSignal.timeout(3000) or setTimeout with controller.abort().",
        "Listen for the 'abort' event in downstream fetch or database queries."
      ],
      solutionCode: `export function timeoutMiddleware(timeoutMs = 3000) {
  return (req, res, next) => {
    const controller = new AbortController();
    req.signal = controller.signal;

    const timer = setTimeout(() => {
      controller.abort();
      if (!res.headersSent) {
        res.status(504).json({ error: "Gateway Timeout: Request exceeded 3s limit" });
      }
    }, timeoutMs);

    res.on("finish", () => clearTimeout(timer));
    next();
  };
}`,
      solutionExplanation: "Proactive deadlines protect server connection pools from cascading exhaustion during downstream provider outages."
    },
    selfCheckQuestions: [
      "What problem does Node.js AsyncLocalStorage solve?",
      "Why should you cancel database queries when an HTTP client disconnects?",
      "What is the difference between a timeout and a deadline?"
    ]
  },
  {
    id: "validation-transformation",
    number: 8,
    title: "Validation and Transformation",
    phaseId: 2,
    phaseName: "Application Architecture & Request Lifecycle",
    duration: "45 min",
    youtubeId: "L6BE-U3oykg",
    youtubeChannelUrl: CHANNEL_URL,
    shortSummary: "Schema validation (Zod/Pydantic), sanitization, DTO coercion, and preventing injection attacks.",
    seniorInsight: {
      quote: "Parse, don't validate. Convert raw, untyped strings into verified, strongly-typed domain values as early as possible.",
      productionLesson: "Input validation is not just about error messages; it is your primary defense against SQL injection, prototype pollution, and buffer overflows.",
      commonMistake: "Validating inputs manually with ad-hoc `if` statements instead of declarative, schema-enforced validators."
    },
    coreDeepDive: {
      what: "Checking that incoming data matches expected types, ranges, formats, and structural invariants, and transforming strings into domain primitives.",
      why: "Guarantees that downstream business logic can operate with 100% confidence on clean, well-formed data.",
      howItWorks: [
        "1. Schema definition: Declare expected shapes and constraints.",
        "2. Coercion: Convert query strings ('page=2') into integers.",
        "3. Stripping: Strip unknown properties to prevent mass assignment."
      ],
      blueprintTitle: "Declarative Validation with Zod",
      blueprintCode: `import { z } from "zod";

export const TransferFundsSchema = z.object({
  recipientIban: z.string().regex(/^[A-Z]{2}[0-9]{2}[A-Z0-9]{4}[0-9]{7}([A-Z0-9]?){0,16}$/),
  amountCents: z.number().int().positive().max(10_000_000), // Max $100k
  currency: z.enum(["ETB", "USD", "EUR"]),
  note: z.string().trim().max(140).optional(),
});`,
      blueprintLanguage: "typescript"
    },
    recommendedBook: {
      title: "Secure by Design",
      author: "Dan Bergh Johnsson, Daniel Deogun & Daniel Sawano",
      keyChapters: "Chapter 3: Domain Primitives (Making illegal states unrepresentable)",
      whyReadThis: "Shows how designing robust value objects and validated domain primitives eliminates security vulnerabilities."
    },
    handsOnChallenge: {
      ticketNumber: "TICKET-204",
      title: "Build a Strict Request Validation Pipe",
      scenario: "Attackers are submitting payloads containing unexpected administrative flags (e.g. `isAdmin: true`). Build a validation pipe that strictly rejects unexpected properties.",
      acceptanceCriteria: [
        "Reject payloads containing undeclared fields with 400 Bad Request.",
        "Transform string date inputs into native JavaScript Date objects.",
        "Return structured error details listing the invalid field paths."
      ],
      hints: [
        "In Zod, use `.strict()` on objects to disallow unknown keys.",
        "Use `safeParse` to inspect validation issues without throwing."
      ],
      solutionCode: `export function validateBody(schema: z.ZodSchema) {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({
        error: "Validation Failed",
        details: result.error.errors.map(e => ({
          field: e.path.join("."),
          message: e.message
        }))
      });
    }
    req.body = result.data; // Stripped & transformed
    next();
  };
}`,
      solutionExplanation: "Strict schema validation ensures only permitted fields ever reach your application's service and database tiers."
    },
    selfCheckQuestions: [
      "What is the Mass Assignment vulnerability?",
      "What is the concept of 'Parse, Don't Validate'?",
      "Why should validation return HTTP 400 or 422 instead of 500?"
    ]
  },
  {
    id: "crud-deep-dive",
    number: 9,
    title: "CRUD Operations Deep Dive",
    phaseId: 2,
    phaseName: "Application Architecture & Request Lifecycle",
    duration: "50 min",
    youtubeId: "W6NZfCO5SIk",
    youtubeChannelUrl: CHANNEL_URL,
    shortSummary: "Create, Read, Update, Delete edge cases: Cursor pagination, optimistic locking, and soft deletes.",
    seniorInsight: {
      quote: "Offset pagination (OFFSET 1000000) will bring your production database to its knees. Master cursor-based pagination early.",
      productionLesson: "When two users edit the same document simultaneously, the second write silently overwrites the first (Lost Update Problem). Always implement Optimistic Concurrency Control using a version column.",
      commonMistake: "Soft deleting rows (`deleted_at IS NOT NULL`) without adding partial indexes, causing all normal queries to scan dead rows."
    },
    coreDeepDive: {
      what: "The four fundamental persistence operations and their associated production edge cases.",
      why: "Every scalable application relies on high-performance reads and conflict-safe writes.",
      howItWorks: [
        "Cursor Pagination: WHERE id > :last_seen_id ORDER BY id ASC LIMIT 20 (O(1) index seek vs O(N) offset scan).",
        "Optimistic Locking: UPDATE items SET data = :data, version = version + 1 WHERE id = :id AND version = :current_version.",
        "Soft Delete: UPDATE items SET deleted_at = NOW() WHERE id = :id."
      ],
      blueprintTitle: "Optimistic Concurrency Control Query",
      blueprintCode: `-- Update row only if nobody changed it in between
UPDATE bank_accounts
SET balance = balance - 50, version = version + 1
WHERE id = 'acc_123' AND version = 4;

-- If rows affected == 0, someone else updated it first! Throw 409 Conflict.`,
      blueprintLanguage: "sql"
    },
    recommendedBook: {
      title: "SQL Performance Explained",
      author: "Markus Winand",
      keyChapters: "Chapter 4: The Order By and Paging (Indexing for Pagination)",
      whyReadThis: "Essential reading on why OFFSET pagination destroys database cache and how keyset pagination operates at constant time."
    },
    handsOnChallenge: {
      ticketNumber: "TICKET-205",
      title: "Implement High-Performance Keyset (Cursor) Pagination",
      scenario: "Your product listing page takes 4.2 seconds on page 500 using `OFFSET 10000`. Refactor the query to use cursor pagination based on `(created_at, id)`.",
      acceptanceCriteria: [
        "Accept a base64 encoded cursor token containing last item's `created_at` and `id`.",
        "Query uses an index on `(created_at, id)` with constant execution time.",
        "Return `next_cursor` in the response metadata."
      ],
      hints: [
        "Encode the cursor as `Buffer.from(JSON.stringify({ createdAt, id })).toString('base64')`.",
        "Use tuple comparison: `WHERE (created_at, id) < (:cursorDate, :cursorId)`."
      ],
      solutionCode: `async function getProducts(cursor?: string, limit = 20) {
  let query = "SELECT id, name, created_at FROM products ";
  const params: any[] = [];

  if (cursor) {
    const { createdAt, id } = JSON.parse(Buffer.from(cursor, "base64").toString());
    query += "WHERE (created_at, id) < ($1, $2) ";
    params.push(createdAt, id);
  }

  query += "ORDER BY created_at DESC, id DESC LIMIT $" + (params.length + 1);
  params.push(limit);

  const results = await db.query(query, params);
  const nextCursor = results.length === limit
    ? Buffer.from(JSON.stringify({
        createdAt: results[results.length - 1].created_at,
        id: results[results.length - 1].id
      })).toString("base64")
    : null;

  return { items: results, nextCursor };
}`,
      solutionExplanation: "Keyset pagination leverages B-Tree indexes directly, maintaining sub-millisecond query performance regardless of how deep the user paginates."
    },
    selfCheckQuestions: [
      "Why does `LIMIT 20 OFFSET 1000000` scan 1,000,020 rows in PostgreSQL?",
      "How does optimistic locking prevent the Lost Update problem without locking the database table?",
      "What index must you create on a table that uses soft deletes?"
    ]
  },
  {
    id: "restful-architecture",
    number: 10,
    title: "RESTful Architecture and Best Practices",
    phaseId: 2,
    phaseName: "Application Architecture & Request Lifecycle",
    duration: "45 min",
    youtubeId: "lsMQRaeKNDk",
    youtubeChannelUrl: CHANNEL_URL,
    shortSummary: "Resource modeling, noun-based URLs, HTTP verb mapping, and API design standards.",
    seniorInsight: {
      quote: "Your API is a user interface for developers. Make it self-describing, consistent, and predictable.",
      productionLesson: "Never mix actions into resource names (e.g. avoid `/api/cancelOrder`). Instead, model the action as a state transition on the resource (`PATCH /orders/{id} { status: 'cancelled' }`) or create a sub-resource (`POST /orders/{id}/cancellations`).",
      commonMistake: "Deeply nesting resources more than 2 levels down (e.g. `/orgs/1/teams/2/projects/3/tasks/4/comments/5`)."
    },
    coreDeepDive: {
      what: "Representational State Transfer (REST) is an architectural style utilizing standard HTTP semantics to manage resources.",
      why: "Ensures uniform interfaces, stateless interactions, cacheability, and discoverability across distributed teams.",
      howItWorks: [
        "Plural nouns for collections: `/users`, `/articles`.",
        "IDs for specific items: `/users/123`.",
        "Sub-resources for tight ownership: `/users/123/orders`."
      ],
      blueprintTitle: "Standard REST Resource Mapping",
      blueprintCode: `GET    /orders          -> List orders (filterable, paginated)
POST   /orders          -> Create new order (returns 201 Created + Location)
GET    /orders/:id      -> Get single order
PUT    /orders/:id      -> Replace entire order (Idempotent)
PATCH  /orders/:id      -> Partial update (e.g. update status)
DELETE /orders/:id      -> Delete order (returns 204 No Content)`,
      blueprintLanguage: "text"
    },
    recommendedBook: {
      title: "RESTful Web APIs",
      author: "Leonard Richardson & Mike Amundsen",
      keyChapters: "Chapter 4: The Resource-Oriented Architecture",
      whyReadThis: "Deeply clarifies Richardson's Maturity Model, Hypermedia controls, and proper resource scoping."
    },
    handsOnChallenge: {
      ticketNumber: "TICKET-206",
      title: "Refactor Non-RESTful RPC Endpoints into Clean REST",
      scenario: "Legacy routes include `/getUserDetails`, `/createNewOrder`, `/deleteUserAccount`. Refactor these into canonical RESTful standards.",
      acceptanceCriteria: [
        "Design clean REST URI structures using appropriate HTTP verbs.",
        "Ensure appropriate HTTP response codes (200, 201, 204, 404, 409).",
        "Document query parameters for filtering and sorting."
      ],
      hints: [
        "Map actions to HTTP verbs: POST to create, DELETE to remove.",
        "Use query strings for filters: `/orders?status=shipped&sort=-created_at`."
      ],
      solutionCode: `// Canonical REST endpoints:
GET    /api/v1/users/:id         // Returns 200 OK
POST   /api/v1/orders            // Returns 201 Created with Location header
DELETE /api/v1/users/:id         // Returns 204 No Content
GET    /api/v1/orders?status=paid // Filtered list`,
      solutionExplanation: "Conforming to standard REST semantics allows browsers, reverse proxies, and API clients to cache and handle errors predictably."
    },
    selfCheckQuestions: [
      "Why should resource URIs be nouns rather than verbs?",
      "When is a 204 No Content status code preferred over a 200 OK?",
      "How should you model complex business actions in REST (e.g., 'approve an invoice')?"
    ]
  },
  {
    id: "business-logic-layer",
    number: 11,
    title: "Business Logic Layer (BLL) & Domain Invariants",
    phaseId: 2,
    phaseName: "Application Architecture & Request Lifecycle",
    duration: "55 min",
    youtubeId: "0bM2Q_4uMTo",
    youtubeChannelUrl: CHANNEL_URL,
    shortSummary: "Domain-Driven Design basics, business invariants, domain events, and transaction boundaries.",
    seniorInsight: {
      quote: "An invariant is a business rule that must ALWAYS be true at all times (e.g. 'a bank account balance cannot drop below zero'). Defend your invariants with your life.",
      productionLesson: "If multiple services or database updates need to stay consistent, encapsulate them inside a single ACID database transaction within your Business Logic Layer.",
      commonMistake: "Anemic Domain Models: Treating domain classes as plain data holders and scattering business calculations across random helper files."
    },
    coreDeepDive: {
      what: "The core engine of your software where business rules, calculations, and domain workflows reside, isolated from transport and database technologies.",
      why: "Ensures the company's business rules remain correct and testable even if you switch web frameworks or database engines.",
      howItWorks: [
        "1. Entity maintains internal consistency and enforces invariants.",
        "2. Service coordinates repositories and external services.",
        "3. Domain Events notify other subsystems of state changes."
      ],
      blueprintTitle: "Enforcing Invariants in Domain Entity",
      blueprintCode: `export class BankAccount {
  constructor(public readonly id: string, private balance: number) {}

  withdraw(amount: number): void {
    if (amount <= 0) throw new Error("Withdrawal amount must be positive");
    if (this.balance - amount < 0) {
      throw new Error("Domain Invariant Violation: Insufficient balance");
    }
    this.balance -= amount;
  }

  getBalance(): number {
    return this.balance;
  }
}`,
      blueprintLanguage: "typescript"
    },
    recommendedBook: {
      title: "Domain-Driven Design: Tackling Complexity in the Heart of Software",
      author: "Eric Evans",
      keyChapters: "Chapters 5 & 6 (Entities, Value Objects, and Aggregates)",
      whyReadThis: "The seminal foundational book on structuring software around real-world business domains."
    },
    handsOnChallenge: {
      ticketNumber: "TICKET-207",
      title: "Implement Atomic Order Checkout with Stock Invariants",
      scenario: "During flash sales, items are oversold because inventory checks and order creation are executed in separate uncoordinated queries. Enforce atomic inventory deduction.",
      acceptanceCriteria: [
        "Enforce invariant: Stock cannot drop below 0.",
        "Wrap inventory reduction and order creation in a single database transaction.",
        "Roll back the entire transaction if any item is out of stock."
      ],
      hints: [
        "Use `BEGIN`, `COMMIT`, and `ROLLBACK` in your database client.",
        "Check affected rows on `UPDATE products SET stock = stock - :qty WHERE id = :id AND stock >= :qty`."
      ],
      solutionCode: `export async function checkoutOrder(userId: string, items: CartItem[]) {
  return await db.transaction(async (trx) => {
    for (const item of items) {
      const updated = await trx.query(
        "UPDATE products SET stock = stock - $1 WHERE id = $2 AND stock >= $1 RETURNING id",
        [item.quantity, item.productId]
      );
      if (updated.rowCount === 0) {
        throw new Error(\`Insufficient stock for product \${item.productId}\`);
      }
    }
    const order = await trx.query(
      "INSERT INTO orders (user_id, status) VALUES ($1, 'confirmed') RETURNING *",
      [userId]
    );
    return order.rows[0];
  });
}`,
      solutionExplanation: "Atomic database transactions guarantee that inventory is never decremented unless the order record is successfully committed."
    },
    selfCheckQuestions: [
      "What is a domain invariant?",
      "What is the difference between an Anemic Domain Model and a Rich Domain Model?",
      "Why must database transaction boundaries be managed in the Business Logic Layer?"
    ]
  },

  // Phase 3: Data Persistence & Performance
  {
    id: "database-postgresql-deep-dive",
    number: 12,
    title: "Database Basics, Schema Design, Performance & PostgreSQL Deep Dive",
    phaseId: 3,
    phaseName: "Data Persistence & Performance",
    duration: "75 min",
    youtubeId: "qw--VYLpxG4",
    youtubeChannelUrl: CHANNEL_URL,
    shortSummary: "PostgreSQL internals, MVCC, B-Tree indexes, EXPLAIN ANALYZE, transactions, and connection pooling.",
    seniorInsight: {
      quote: "Your backend code will rarely be the bottleneck. Your database queries and missing indexes will be responsible for 90% of your production outages.",
      productionLesson: "Postgres spawns a separate OS process for every incoming connection. 300 backend instances with 10 connections each = 3,000 DB processes, which will crash your database RAM. Always place a connection pooler like PgBouncer in front of Postgres.",
      commonMistake: "Using `SELECT *` in production, or creating an index on every single column without realizing indexes slow down INSERT and UPDATE performance."
    },
    coreDeepDive: {
      what: "Relational database schema design, ACID transaction isolation, and the internal storage mechanics of PostgreSQL.",
      why: "The primary relational database is the single source of truth for business data; its schema dictates system scalability.",
      howItWorks: [
        "MVCC (Multi-Version Concurrency Control): Writes do not block reads, and reads do not block writes. Dead tuples are reclaimed by VACUUM.",
        "B-Tree Indexes: Self-balancing tree structure offering O(log N) lookup, range scans, and index-only scans.",
        "EXPLAIN (ANALYZE, BUFFERS): Tells you whether a query used a Sequential Scan or Index Scan, and how many shared buffer memory pages were touched."
      ],
      blueprintTitle: "Composite Indexing & EXPLAIN Execution",
      blueprintCode: `-- Optimal index for WHERE user_id = 123 ORDER BY created_at DESC
CREATE INDEX idx_orders_user_created 
ON orders (user_id, created_at DESC);

-- Inspect query execution plan
EXPLAIN (ANALYZE, BUFFERS)
SELECT id, total_cents FROM orders 
WHERE user_id = 'usr_42' 
ORDER BY created_at DESC 
LIMIT 10;`,
      blueprintLanguage: "sql"
    },
    recommendedBook: {
      title: "The Art of PostgreSQL",
      author: "Dimitri Fontaine",
      keyChapters: "Chapters 4, 6 & 7 (Data Types, Concurrency, and Indexing Strategies)",
      whyReadThis: "Written by a PostgreSQL major contributor, this book teaches how to leverage SQL as a true programming language."
    },
    handsOnChallenge: {
      ticketNumber: "TICKET-301",
      title: "Optimize a 4-Second Slow Query with EXPLAIN ANALYZE",
      scenario: "An endpoint running `SELECT * FROM audit_logs WHERE tenant_id = 't_1' AND action = 'LOGIN' ORDER BY timestamp DESC LIMIT 20` takes 4.2 seconds on a 5M row table.",
      acceptanceCriteria: [
        "Run `EXPLAIN (ANALYZE, BUFFERS)` to observe the Seq Scan.",
        "Create an optimal composite B-Tree index.",
        "Verify the query transforms into an Index Scan with execution time < 2ms."
      ],
      terminalLab: `docker run --name pg-lab -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgres:16
# Seed mock data and experiment with EXPLAIN ANALYZE`,
      hints: [
        "Columns with equality filters (`tenant_id`, `action`) should precede sort columns (`timestamp DESC`) in composite indexes.",
        "Avoid `SELECT *`; specify exact column names to allow potential Index Only Scans."
      ],
      solutionCode: `CREATE INDEX idx_audit_logs_tenant_action_ts 
ON audit_logs (tenant_id, action, timestamp DESC);

-- Query:
SELECT id, user_id, timestamp 
FROM audit_logs 
WHERE tenant_id = 't_1' AND action = 'LOGIN' 
ORDER BY timestamp DESC 
LIMIT 20;`,
      solutionExplanation: "The composite index satisfies both the filtering criteria and the ordering constraint simultaneously, avoiding an expensive in-memory sort."
    },
    selfCheckQuestions: [
      "How does MVCC allow readers to never block writers in PostgreSQL?",
      "What is the difference between a Sequential Scan, an Index Scan, and an Index Only Scan?",
      "Why is PgBouncer mandatory when scaling PostgreSQL across dozens of application containers?"
    ]
  },
  {
    id: "caching",
    number: 13,
    title: "Caching Strategies & Redis Deep Dive",
    phaseId: 3,
    phaseName: "Data Persistence & Performance",
    duration: "60 min",
    youtubeId: "dGAgxozNWFE",
    youtubeChannelUrl: CHANNEL_URL,
    shortSummary: "Cache-aside, write-through, cache stampede, penetration, avalanche, and Redis data structures.",
    seniorInsight: {
      quote: "There are only two hard things in Computer Science: cache invalidation and naming things. — Phil Karlton",
      productionLesson: "If 10,000 requests hit your app for an uncached or just-expired key at the exact same millisecond, all 10,000 will hammer your PostgreSQL database at once (Cache Stampede). Use singleflight mutexes or probabilistic early expiration.",
      commonMistake: "Caching data without a TTL (Time To Live), leading to permanent memory exhaustion (OOM) or stale data that never updates."
    },
    coreDeepDive: {
      what: "Storing expensive database query results or computed data in fast in-memory stores like Redis to achieve sub-millisecond response times.",
      why: "Reduces relational database load, increases throughput by orders of magnitude, and prevents traffic spikes from taking down backend services.",
      howItWorks: [
        "Cache-Aside (Lazy Loading): App reads cache -> miss -> reads DB -> writes to cache -> returns.",
        "Write-Through: App writes to cache -> cache writes to DB.",
        "TTL with Jitter: Adding random seconds (e.g. 300s + Math.random() * 30) prevents keys from expiring at the exact same instant (Cache Avalanche)."
      ],
      blueprintTitle: "Cache-Aside with Stampede Protection (Mutex)",
      blueprintCode: `async function getCachedUserProfile(userId: string) {
  const cacheKey = \`user:\${userId}\`;
  const cached = await redis.get(cacheKey);
  if (cached) return JSON.parse(cached);

  // Lock key to prevent 10,000 concurrent DB queries
  const lock = await redis.set(\`lock:\${cacheKey}\`, "1", "NX", "EX", 5);
  if (!lock) {
    // Another worker is fetching; wait 50ms and retry
    await sleep(50);
    return getCachedUserProfile(userId);
  }

  try {
    const user = await db.findUser(userId);
    const ttlSeconds = 3600 + Math.floor(Math.random() * 300); // with jitter
    await redis.set(cacheKey, JSON.stringify(user), "EX", ttlSeconds);
    return user;
  } finally {
    await redis.del(\`lock:\${cacheKey}\`);
  }
}`,
      blueprintLanguage: "typescript"
    },
    recommendedBook: {
      title: "Redis in Action",
      author: "Josiah L. Carlson",
      keyChapters: "Chapters 1, 2 & 6 (Data structures, web application caching, and distributed locking)",
      whyReadThis: "A hands-on guide exploring Redis Strings, Hashes, Sorted Sets, and transactional primitives."
    },
    handsOnChallenge: {
      ticketNumber: "TICKET-302",
      title: "Implement Jittered Cache-Aside Pattern",
      scenario: "During high-traffic announcements, the homepage product list key expires and causes a 100% database CPU spike. Implement Cache-Aside with TTL jitter.",
      acceptanceCriteria: [
        "Check Redis before querying DB.",
        "On cache miss, fetch from DB and write back to Redis.",
        "Add a 10% random jitter to the TTL to prevent synchronized expiration."
      ],
      hints: [
        "Formula: `const ttl = baseTTL + Math.floor(Math.random() * jitterRange)`.",
        "Use Redis pipeline or multi commands for batching."
      ],
      solutionCode: `async function getProducts() {
  const cached = await redis.get("homepage:products");
  if (cached) return JSON.parse(cached);

  const products = await db.query("SELECT * FROM products WHERE active = true");
  const jitter = Math.floor(Math.random() * 60); // 0-60s random jitter
  await redis.set("homepage:products", JSON.stringify(products), "EX", 300 + jitter);
  return products;
}`,
      solutionExplanation: "Adding random jitter smooths out eviction cycles, ensuring keys expire gradually over time rather than all at once."
    },
    selfCheckQuestions: [
      "What is the difference between Cache Stampede, Cache Penetration, and Cache Avalanche?",
      "Why is Redis faster than querying an in-memory table in PostgreSQL?",
      "How do Redis Hashes (`HSET`/`HGET`) save memory compared to multiple String keys?"
    ]
  },
  {
    id: "full-text-search-elasticsearch",
    number: 14,
    title: "Full Text Search and Elasticsearch",
    phaseId: 3,
    phaseName: "Data Persistence & Performance",
    duration: "55 min",
    youtubeId: "C3q_sh3-mH4",
    youtubeChannelUrl: CHANNEL_URL,
    shortSummary: "Inverted indexes, tokenization, BM25 relevance scoring, Postgres vs Elasticsearch, and CDC synchronization.",
    seniorInsight: {
      quote: "Don't install Elasticsearch on Day 1. PostgreSQL's built-in tsvector and GIN indexes handle 95% of early search requirements with zero extra infrastructure.",
      productionLesson: "When you do adopt Elasticsearch, never do dual-writes from your API code (`db.save()` then `es.index()`). If the second call fails, your search index will permanently drift from your database. Use Change Data Capture (CDC) via Kafka or Debezium.",
      commonMistake: "Using `LIKE '%keyword%'` in SQL, which triggers a full table scan and cannot leverage standard B-Tree indexes."
    },
    coreDeepDive: {
      what: "Searching unstructured text quickly using inverted indexes that map words (tokens) to the documents that contain them.",
      why: "Relational B-Trees cannot search substrings efficiently. Inverted indexes provide typo tolerance, stemming, relevance ranking, and facet filtering.",
      howItWorks: [
        "Analysis pipeline: Character filters -> Tokenizer (splits into words) -> Token filters (lowercasing, stemming, stop-word removal).",
        "Relevance Scoring: BM25 (Best Matching 25) calculates term frequency and inverse document frequency.",
        "Postgres FTS: `to_tsvector('english', body) @@ to_tsquery('english', 'search & query')`."
      ],
      blueprintTitle: "PostgreSQL Full-Text Search with GIN Index",
      blueprintCode: `-- Add generated search vector column
ALTER TABLE articles ADD COLUMN search_vector tsvector
GENERATED ALWAYS AS (
  to_tsvector('english', coalesce(title, '') || ' ' || coalesce(content, ''))
) STORED;

-- Create GIN index for sub-millisecond search
CREATE INDEX idx_articles_search ON articles USING GIN(search_vector);

-- Query with ranking
SELECT id, title, ts_rank(search_vector, query) as rank
FROM articles, to_tsquery('english', 'database & performance') query
WHERE search_vector @@ query
ORDER BY rank DESC LIMIT 10;`,
      blueprintLanguage: "sql"
    },
    recommendedBook: {
      title: "Relevant Search",
      author: "Doug Turnbull & John Berryman",
      keyChapters: "Chapters 2 & 3 (The Anatomy of a Search Engine, Inverted Indexes)",
      whyReadThis: "Demystifies how Lucene-based search engines rank, tokenize, and calculate relevance scores."
    },
    handsOnChallenge: {
      ticketNumber: "TICKET-303",
      title: "Replace Slow SQL LIKE Queries with Postgres tsvector",
      scenario: "Users complain that searching products with `WHERE description ILIKE '%shoes%'` takes 3.5 seconds. Convert this to PostgreSQL Full-Text Search.",
      acceptanceCriteria: [
        "Create a `tsvector` column and a GIN index on `products`.",
        "Execute query using `@@ to_tsquery()`.",
        "Achieve query latency under 5ms on a 500k row dataset."
      ],
      hints: [
        "Use `plainto_tsquery` to safely convert arbitrary user input into valid tsquery tokens.",
        "Verify the query uses a 'Bitmap Index Scan' on the GIN index using EXPLAIN."
      ],
      solutionCode: `CREATE INDEX idx_products_fts ON products USING GIN(to_tsvector('english', name || ' ' || description));

-- Query
SELECT id, name 
FROM products 
WHERE to_tsvector('english', name || ' ' || description) @@ plainto_tsquery('english', 'running shoes')
LIMIT 20;`,
      solutionExplanation: "GIN indexes search inverted term arrays directly, eliminating expensive row-by-row string parsing."
    },
    selfCheckQuestions: [
      "What is an inverted index and why is it superior to a B-Tree for full-text search?",
      "Why does dual-writing to both Postgres and Elasticsearch lead to data inconsistency?",
      "What does stemming mean in search tokenization (e.g. 'running' -> 'run')?"
    ]
  },
  {
    id: "object-storage-large-files",
    number: 15,
    title: "Object Storage and Large Files",
    phaseId: 3,
    phaseName: "Data Persistence & Performance",
    duration: "45 min",
    youtubeId: "v3D_pA44d_0",
    youtubeChannelUrl: CHANNEL_URL,
    shortSummary: "S3, presigned upload/download URLs, multipart chunking, and offloading heavy media from API servers.",
    seniorInsight: {
      quote: "Never stream 1GB video uploads through your application servers. Generate a presigned S3 URL and let the client upload directly to object storage.",
      productionLesson: "Streaming large files through your Node.js or Python backend exhausts server memory, ties up worker threads, and burns your bandwidth bill. Always use direct-to-S3 uploads with presigned URLs.",
      commonMistake: "Storing file binaries directly as BLOBs in PostgreSQL or storing user uploads on local application server disk."
    },
    coreDeepDive: {
      what: "Storing unstructured data (images, videos, PDFs, backups) as immutable objects in distributed object storage services (AWS S3, Cloudflare R2, MinIO).",
      why: "Object storage offers near-infinite scalability, 99.999999999% (11 9s) durability, and built-in CDN edge distribution.",
      howItWorks: [
        "1. Client requests upload authorization from backend API.",
        "2. Backend validates permissions and returns a cryptographically signed Presigned PUT URL (valid for 15 mins).",
        "3. Client uploads file directly to S3 via HTTP PUT.",
        "4. S3 fires an event notification (SNS/SQS/Webhook) to notify backend that upload completed."
      ],
      blueprintTitle: "Direct-to-S3 Presigned URL Flow",
      blueprintCode: `import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3 = new S3Client({ region: "us-east-1" });

export async function generateUploadUrl(userId: string, filename: string) {
  const fileKey = \`uploads/\${userId}/\${crypto.randomUUID()}-\${filename}\`;
  
  const command = new PutObjectCommand({
    Bucket: "my-app-uploads",
    Key: fileKey,
    ContentType: "image/jpeg",
  });

  // URL valid for 15 minutes
  const uploadUrl = await getSignedUrl(s3, command, { expiresIn: 900 });
  return { uploadUrl, fileKey };
}`,
      blueprintLanguage: "typescript"
    },
    recommendedBook: {
      title: "Cloud Application Architectures",
      author: "George Reese",
      keyChapters: "Chapter 4: Designing for Infrastructure (Decoupled Storage & Asset Delivery)",
      whyReadThis: "Foundational strategies for offloading state and large assets from web servers to cloud object storage."
    },
    handsOnChallenge: {
      ticketNumber: "TICKET-304",
      title: "Implement Secure Presigned S3 Uploads",
      scenario: "Application servers are crashing with Out-of-Memory (OOM) errors because users are uploading 50MB video clips directly to `POST /api/upload`. Refactor to presigned URLs.",
      acceptanceCriteria: [
        "Endpoint `POST /api/media/presigned-url` returns a signed S3 upload URL.",
        "Enforce Content-Type and maximum expiration time (10 minutes).",
        "Frontend performs direct `PUT` to the returned URL."
      ],
      hints: [
        "Never include AWS secret keys on the frontend.",
        "Use AWS SDK `@aws-sdk/s3-request-presigner`."
      ],
      solutionCode: `export async function handlePresignedRequest(req, res) {
  const { fileName, fileType } = req.body;
  if (!["image/png", "image/jpeg", "video/mp4"].includes(fileType)) {
    return res.status(400).json({ error: "Unsupported media type" });
  }

  const key = \`media/\${Date.now()}-\${fileName}\`;
  const command = new PutObjectCommand({
    Bucket: process.env.S3_BUCKET!,
    Key: key,
    ContentType: fileType,
  });

  const url = await getSignedUrl(s3Client, command, { expiresIn: 600 });
  res.json({ uploadUrl: url, key });
}`,
      solutionExplanation: "Offloading file payload streams from the API layer frees up server memory and network interfaces to handle lightweight transactional requests."
    },
    selfCheckQuestions: [
      "Why is storing uploaded files on an app server's local file system a fatal mistake in Dockerized environments?",
      "How do presigned URLs authenticate client uploads without sharing AWS credentials?",
      "What are Multipart Uploads in S3 and when should they be utilized?"
    ]
  },

  // Phase 4: Security & Access Control
  {
    id: "authentication-authorization",
    number: 16,
    title: "Authentication and Authorization",
    phaseId: 4,
    phaseName: "Security & Access Control",
    duration: "65 min",
    youtubeId: "2PPSXonhIck",
    youtubeChannelUrl: CHANNEL_URL,
    shortSummary: "Passkeys, Argon2id, JWT vs Sessions, Refresh Token Rotation, RBAC vs ABAC, and OAuth2.",
    seniorInsight: {
      quote: "Never store JWTs in localStorage. An XSS flaw anywhere in your frontend will allow attackers to silently steal all user sessions.",
      productionLesson: "Store your authentication tokens in `HttpOnly, Secure, SameSite=Strict` cookies. If using JWTs, keep them short-lived (10 mins) and implement rotating Refresh Tokens backed by Redis or DB revocation lists.",
      commonMistake: "Confusing Authentication ('Who are you?') with Authorization ('What are you allowed to do?'), leading to IDOR/BOLA security holes."
    },
    coreDeepDive: {
      what: "Authentication (AuthN) verifies user identity; Authorization (AuthZ) verifies permissions to access or mutate a specific resource.",
      why: "A single flaw in identity management exposes customer data, causes catastrophic breaches, and destroys organizational reputation.",
      howItWorks: [
        "Password Hashing: Salted adaptive algorithms (Argon2id or bcrypt) consume CPU & RAM to defeat GPU brute-forcing.",
        "Session-based: Server stores session state in Redis; client holds an opaque random cookie identifier.",
        "Token-based (JWT): Cryptographically signed JSON payload containing claims (exp, sub, roles)."
      ],
      blueprintTitle: "Refresh Token Rotation Flow",
      blueprintCode: `Client                    API Server                  Redis / DB
  │                           │                           │
  ├─ POST /auth/refresh ─────►│                           │
  │  (with old refresh token) │                           │
  │                           ├─ Validate old token ─────►│ (Check revocation)
  │                           │◄─ Valid, single-use OK ───┤
  │                           ├─ Invalidate old token ───►│ (Revoke old ID)
  │                           ├─ Issue NEW Refresh Token ─►│ (Store new ID)
  │◄─ Set-Cookie: new_token ──┤                           │
  │   (New Access Token)      │                           │`,
      blueprintLanguage: "text"
    },
    recommendedBook: {
      title: "Web Security for Developers",
      author: "Malcolm McDonald",
      keyChapters: "Chapters 5 & 6 (Authentication, Password Storage, and Session Management)",
      whyReadThis: "Real-world breakdowns of how attackers crack password hashes, hijack sessions, and bypass tokens."
    },
    handsOnChallenge: {
      ticketNumber: "TICKET-401",
      title: "Implement Refresh Token Rotation with Reuse Detection",
      scenario: "If an attacker steals a refresh token, they could maintain persistent access. Implement Refresh Token Rotation so that if an old token is reused, all tokens for that user are immediately revoked.",
      acceptanceCriteria: [
        "When a refresh token is exchanged, invalidate it and issue a new one.",
        "If an already-invalidated token is submitted, flag as stolen and invalidate all active user sessions.",
        "Store token family ID in Redis or database."
      ],
      hints: [
        "Assign a `familyId` UUID to the initial login.",
        "Track the latest active token ID in the family; if an earlier token is presented, trigger security lockdown."
      ],
      solutionCode: `async function rotateToken(providedToken: string) {
  const tokenRecord = await db.findToken(providedToken);
  if (!tokenRecord) throw new Error("Invalid token");

  if (tokenRecord.isRevoked) {
    // REUSE DETECTED! Potential attacker breach.
    await db.revokeAllUserTokens(tokenRecord.userId);
    throw new Error("Compromised session detected. All sessions terminated.");
  }

  // Invalidate current token and issue replacement
  await db.revokeToken(tokenRecord.id);
  const newToken = await db.createToken({
    userId: tokenRecord.userId,
    familyId: tokenRecord.familyId
  });

  return newToken;
}`,
      solutionExplanation: "Reuse detection ensures that even if a refresh token leaks, the race between client and attacker immediately locks down the account."
    },
    selfCheckQuestions: [
      "Why should JWTs never be stored in browser `localStorage`?",
      "Why is Argon2id preferred over standard SHA-256 or MD5 for password storage?",
      "What is the difference between Role-Based Access Control (RBAC) and Attribute-Based Access Control (ABAC)?"
    ]
  },
  {
    id: "security",
    number: 17,
    title: "Security and OWASP Top 10 API Security",
    phaseId: 4,
    phaseName: "Security & Access Control",
    duration: "60 min",
    youtubeId: "X4XzsmLpIug",
    youtubeChannelUrl: CHANNEL_URL,
    shortSummary: "BOLA/IDOR, SQL Injection, CSRF, Rate Limiting, CORS misconfigurations, and Data Encryption.",
    seniorInsight: {
      quote: "BOLA (Broken Object Level Authorization) is the #1 vulnerability on the internet. Never query a resource by ID without checking that the requesting user actually owns it.",
      productionLesson: "Querying `SELECT * FROM invoices WHERE id = :id` without `AND organization_id = :current_user_org_id` allows any authenticated user to read any other company's private invoices simply by changing the ID in the URL.",
      commonMistake: "Setting CORS header `Access-Control-Allow-Origin: *` while allowing credentials, or relying on client IP addresses without verifying reverse proxy headers."
    },
    coreDeepDive: {
      what: "Proactively engineering defense mechanisms against the most common web and API attack vectors defined by the OWASP foundation.",
      why: "Security cannot be added at the end; it must be built into database queries, middleware, and architecture from Day 1.",
      howItWorks: [
        "BOLA/IDOR: Enforce tenant boundaries in every single query.",
        "SQL Injection: Strictly use parameterized queries / prepared statements (never string concatenation).",
        "Rate Limiting: Token Bucket or Sliding Window algorithms based on IP or User ID."
      ],
      blueprintTitle: "Defending Against BOLA / IDOR in Data Layer",
      blueprintCode: `// VULNERABLE TO BOLA / IDOR:
export async function getInvoice(invoiceId: string) {
  return await db.query("SELECT * FROM invoices WHERE id = $1", [invoiceId]);
}

// SECURE - Enforces Ownership:
export async function getInvoiceSecure(invoiceId: string, userOrgId: string) {
  const result = await db.query(
    "SELECT * FROM invoices WHERE id = $1 AND organization_id = $2",
    [invoiceId, userOrgId]
  );
  if (result.rows.length === 0) {
    throw new NotFoundError("Invoice not found or access denied");
  }
  return result.rows[0];
}`,
      blueprintLanguage: "typescript"
    },
    recommendedBook: {
      title: "API Security in Action",
      author: "Neil Madden",
      keyChapters: "Chapters 3, 4 & 8 (Access Control, Object-Level Security, Rate Limiting)",
      whyReadThis: "Practical, code-heavy guide to locking down RESTful endpoints, token scopes, and microservice boundaries."
    },
    handsOnChallenge: {
      ticketNumber: "TICKET-402",
      title: "Fix BOLA/IDOR Vulnerability in Document API",
      scenario: "Security audit discovered that user A can download user B's documents by changing `/api/documents/105` to `/api/documents/106`. Fix the vulnerability.",
      acceptanceCriteria: [
        "Enforce user ownership in the repository query.",
        "Return 404 Not Found (rather than 403) to prevent attackers from enumerating valid document IDs.",
        "Add unit test verifying cross-tenant access is rejected."
      ],
      hints: [
        "Returning 404 instead of 403 prevents attackers from probing whether resource IDs exist.",
        "Extract authenticated `userId` from request context, never from body or params."
      ],
      solutionCode: `export async function getDocument(req, res) {
  const { id } = req.params;
  const currentUserId = req.user.id; // From verified session/JWT

  const doc = await db.query(
    "SELECT * FROM documents WHERE id = $1 AND owner_id = $2",
    [id, currentUserId]
  );

  if (doc.rows.length === 0) {
    // Return 404 to avoid confirming existence
    return res.status(404).json({ error: "Document not found" });
  }

  res.json(doc.rows[0]);
}`,
      solutionExplanation: "Scoping database queries to the verified authenticated user ID guarantees authorization checks are executed at the data access tier."
    },
    selfCheckQuestions: [
      "What is BOLA / IDOR and why is it ranked #1 in the OWASP API Security Top 10?",
      "Why is returning 404 Not Found often safer than returning 403 Forbidden when an IDOR probe occurs?",
      "Why do prepared statements completely eliminate SQL injection vulnerabilities?"
    ]
  },

  // Phase 5: Asynchronous Workflows & Real-Time
  {
    id: "task-queuing-scheduling",
    number: 18,
    title: "Task Queuing, Background Jobs, and Scheduling",
    phaseId: 5,
    phaseName: "Background Processing & Integrations",
    duration: "60 min",
    youtubeId: "oUFb4_u_gXw",
    youtubeChannelUrl: CHANNEL_URL,
    shortSummary: "Message brokers vs Task queues, BullMQ/RabbitMQ/Kafka, Transactional Outbox pattern, and retries with backoff.",
    seniorInsight: {
      quote: "Never send an email or call a third-party webhook inside an HTTP request handler. Put it in a background queue and respond to the user immediately.",
      productionLesson: "If you save an order to the database and then publish an event to Kafka in two separate steps, your app could crash in between, resulting in lost events. Use the Transactional Outbox Pattern to guarantee at-least-once message delivery.",
      commonMistake: "Writing background workers that are not idempotent, causing duplicate emails or duplicate charges when a job is retried."
    },
    coreDeepDive: {
      what: "Offloading slow, CPU-intensive, or unreliable tasks (video transcoding, email delivery, report generation) to asynchronous worker processes.",
      why: "Keeps HTTP response latency under 100ms and guarantees tasks are retried when external APIs fail.",
      howItWorks: [
        "Producer: Pushes job payload to queue (Redis, RabbitMQ, SQS).",
        "Consumer / Worker: Pulls job, processes logic, acknowledges (ACK) on success.",
        "Dead Letter Queue (DLQ): Where jobs go after exceeding max retries for manual debugging."
      ],
      blueprintTitle: "The Transactional Outbox Pattern",
      blueprintCode: `-- Inside the same atomic database transaction:
BEGIN;

-- 1. Mutate business state
INSERT INTO orders (id, user_id, total) VALUES ('ord_1', 'usr_99', 500);

-- 2. Insert message into outbox table
INSERT INTO outbox_events (id, aggregate_type, payload, status)
VALUES (gen_random_uuid(), 'ORDER_CREATED', '{"orderId":"ord_1"}', 'PENDING');

COMMIT;

-- A background relay process polls outbox_events and publishes to Kafka/RabbitMQ!`,
      blueprintLanguage: "sql"
    },
    recommendedBook: {
      title: "Enterprise Integration Patterns",
      author: "Gregor Hohpe & Bobby Woolf",
      keyChapters: "Chapters 3 & 4 (Messaging Systems & Message Routing)",
      whyReadThis: "The timeless blueprint for queues, topics, publish-subscribe, idempotency, and message channels."
    },
    handsOnChallenge: {
      ticketNumber: "TICKET-501",
      title: "Implement Asynchronous PDF Generation with Retry & Backoff",
      scenario: "PDF invoice generation takes 6 seconds and frequently times out during checkout. Move PDF generation to a background queue with exponential backoff.",
      acceptanceCriteria: [
        "Endpoint `POST /api/orders` enqueues job and returns `202 Accepted` immediately (<100ms).",
        "Worker processes PDF generation with 3 retries using exponential backoff.",
        "Failed jobs after 3 attempts are routed to a Dead Letter Queue."
      ],
      hints: [
        "In BullMQ, configure `attempts: 3` and `backoff: { type: 'exponential', delay: 2000 }`.",
        "Store the generated PDF URL in the order record upon completion."
      ],
      solutionCode: `import { Queue, Worker } from "bullmq";

export const invoiceQueue = new Queue("invoices", { connection: redisConnection });

// Producer (HTTP Handler)
export async function handleOrderCreation(req, res) {
  const order = await db.createOrder(req.body);
  await invoiceQueue.add("generate_pdf", { orderId: order.id }, {
    attempts: 3,
    backoff: { type: "exponential", delay: 1000 }
  });
  return res.status(202).json({ message: "Order placed. Invoice generating.", orderId: order.id });
}

// Consumer (Worker Process)
const worker = new Worker("invoices", async (job) => {
  await generateAndStorePdf(job.data.orderId);
}, { connection: redisConnection });`,
      solutionExplanation: "Decoupling slow file rendering from the request cycle protects HTTP latency and ensures transient failures are automatically retried."
    },
    selfCheckQuestions: [
      "Why is the Transactional Outbox pattern necessary when updating a database and publishing a message?",
      "What is the role of a Dead Letter Queue (DLQ)?",
      "Why must message consumers always be designed to be idempotent?"
    ]
  },
  {
    id: "transactional-emails",
    number: 19,
    title: "Transactional Emails & Notification Pipelines",
    phaseId: 5,
    phaseName: "Background Processing & Integrations",
    duration: "40 min",
    youtubeId: "y_s5fP1k0zI",
    youtubeChannelUrl: CHANNEL_URL,
    shortSummary: "SMTP vs API providers (Postmark/SES/Resend), SPF/DKIM/DMARC, MJML templates, and bounce webhooks.",
    seniorInsight: {
      quote: "Never run your own SMTP mail server in production. Your IP address will be instantly blacklisted by Gmail and Outlook. Use dedicated providers with verified reputations.",
      productionLesson: "Always track email deliverability using inbound webhooks. If an email bounces or is marked as spam, flag the user's account to avoid destroying your sender domain reputation.",
      commonMistake: "Embedding raw HTML strings inside backend code instead of using templating engines like MJML or React Email."
    },
    coreDeepDive: {
      what: "Automated, programmatic emails triggered by user interactions (password resets, order receipts, security alerts).",
      why: "Critical for user lifecycle and trust; requires high deliverability (arriving in the inbox within seconds, not spam folders).",
      howItWorks: [
        "SPF (Sender Policy Framework): DNS record listing IP addresses authorized to send emails from your domain.",
        "DKIM (DomainKeys Identified Mail): Cryptographic signature attached to email headers to verify authenticity.",
        "DMARC: Tells receiving mail servers what to do (quarantine, reject) if SPF or DKIM checks fail."
      ],
      blueprintTitle: "Email Dispatch via Background Queue",
      blueprintCode: `// Clean notification service interface
export interface NotificationService {
  sendReceipt(to: string, receiptData: ReceiptDTO): Promise<void>;
  sendPasswordReset(to: string, resetToken: string): Promise<void>;
}

// Worker executes Resend / Postmark API call
export async function sendEmailJob(payload: { to: string; template: string; data: any }) {
  await resend.emails.send({
    from: "billing@yourdomain.com",
    to: payload.to,
    subject: "Your Order Receipt",
    react: ReceiptEmailTemplate(payload.data),
  });
}`,
      blueprintLanguage: "typescript"
    },
    recommendedBook: {
      title: "Building Microservices (2nd Edition)",
      author: "Sam Newman",
      keyChapters: "Chapter 4: Communication Styles (Asynchronous & Event-Driven Notifications)",
      whyReadThis: "Explains how to structure decoupled notification and email pipelines without blocking primary transactional workflows."
    },
    handsOnChallenge: {
      ticketNumber: "TICKET-502",
      title: "Implement Bounce Handling Webhook for Transactional Mail",
      scenario: "If users sign up with invalid emails, repeated bounces will damage your domain's reputation on AWS SES or Postmark. Build a webhook handler to disable bounced email addresses.",
      acceptanceCriteria: [
        "Verify incoming webhook signature from email provider.",
        "On 'Hard Bounce' event, update user record: `email_status = 'BOUNCED'`.",
        "Prevent future outbound emails to any address marked as 'BOUNCED'."
      ],
      hints: [
        "Check event type: differentiate soft bounces (mailbox full) from hard bounces (mailbox does not exist).",
        "Respond with 200 OK immediately to the webhook provider."
      ],
      solutionCode: `export async function handleEmailWebhook(req, res) {
  const { eventType, recipient } = req.body;

  if (eventType === "HardBounce") {
    await db.query(
      "UPDATE users SET email_verified = false, email_status = 'BOUNCED' WHERE email = $1",
      [recipient]
    );
    logger.warn(\`Hard bounce recorded for \${recipient}. Disabled outbound mail.\`);
  }

  res.status(200).json({ received: true });
}`,
      solutionExplanation: "Automatically suppressing hard bounces protects your sender domain score, ensuring legitimate emails reach user inboxes."
    },
    selfCheckQuestions: [
      "What do SPF, DKIM, and DMARC DNS records achieve?",
      "Why should transactional emails never be dispatched over port 25 directly from an app server?",
      "What is the difference between a Hard Bounce and a Soft Bounce?"
    ]
  },
  {
    id: "webhooks",
    number: 20,
    title: "Webhooks: Sending and Receiving",
    phaseId: 5,
    phaseName: "Background Processing & Integrations",
    duration: "50 min",
    youtubeId: "4A9c8v8HlP8",
    youtubeChannelUrl: CHANNEL_URL,
    shortSummary: "HMAC-SHA256 signature verification, replay attack prevention, exponential backoff retries, and idempotency.",
    seniorInsight: {
      quote: "When receiving a payment webhook (e.g. Stripe, Chapa), your only job is to verify the cryptographic signature, write the event to a queue, and return 200 OK within 200ms.",
      productionLesson: "Webhook providers have strict 5-second timeouts. If you try to process orders, update stock, and send emails inside the webhook endpoint, it will timeout, causing the provider to retry and flood your server.",
      commonMistake: "Validating webhook signatures against parsed JSON objects instead of the raw, unparsed request byte buffer."
    },
    coreDeepDive: {
      what: "User-defined HTTP callbacks triggered by events in external systems (e.g. 'charge.succeeded', 'github.push').",
      why: "Eliminates the need for polling; enables event-driven integration between third-party systems.",
      howItWorks: [
        "1. Provider computes HMAC-SHA256(secret, timestamp + '.' + rawPayload).",
        "2. Provider sends HTTP POST with signature header (`Stripe-Signature` or `X-Hub-Signature`).",
        "3. Receiver recomputes HMAC over raw body and performs constant-time comparison to prevent timing attacks."
      ],
      blueprintTitle: "Secure HMAC Signature Verification",
      blueprintCode: `import crypto from "crypto";

export function verifyWebhookSignature(
  rawBody: Buffer,
  signatureHeader: string,
  secret: string
): boolean {
  const [timestampPart, sigPart] = signatureHeader.split(",");
  const timestamp = timestampPart.split("=")[1];
  const signature = sigPart.split("=")[1];

  // Prevent replay attacks: Reject requests older than 5 minutes
  if (Math.abs(Date.now() / 1000 - Number(timestamp)) > 300) {
    return false;
  }

  const expectedSig = crypto
    .createHmac("sha256", secret)
    .update(\`\${timestamp}.\${rawBody}\`)
    .digest("hex");

  // Constant-time comparison prevents timing attacks
  return crypto.timingSafeEqual(
    Buffer.from(signature, "hex"),
    Buffer.from(expectedSig, "hex")
  );
}`,
      blueprintLanguage: "typescript"
    },
    recommendedBook: {
      title: "Designing Data-Intensive Applications (DDIA)",
      author: "Martin Kleppmann",
      keyChapters: "Chapter 11: Stream Processing (Message Systems & Event-Driven Architectures)",
      whyReadThis: "Essential for understanding event order, deduplication, and exactly-once processing guarantees."
    },
    handsOnChallenge: {
      ticketNumber: "TICKET-503",
      title: "Build High-Throughput Webhook Ingestion Engine",
      scenario: "During flash sales, payment webhooks are timing out and failing. Refactor the ingestion endpoint to verify HMAC, write to queue, and respond in < 150ms.",
      acceptanceCriteria: [
        "Extract raw body buffer without JSON corruption.",
        "Verify HMAC-SHA256 signature.",
        "Push event to Redis queue and respond `200 OK` immediately."
      ],
      hints: [
        "In Next.js/Express, ensure body-parser does not mutate raw bytes.",
        "Use `crypto.timingSafeEqual`."
      ],
      solutionCode: `export async function handleStripeWebhook(req, res) {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    // req.rawBody is preserved as raw Buffer
    event = stripe.webhooks.constructEvent(req.rawBody, sig, process.env.WEBHOOK_SECRET!);
  } catch (err: any) {
    return res.status(400).send(\`Webhook Error: \${err.message}\`);
  }

  // Enqueue for async worker processing
  await webhookQueue.add(event.type, event);

  // Acknowledge receipt immediately
  res.status(200).json({ received: true });
}`,
      solutionExplanation: "Separating fast cryptographic ingestion from slower business fulfillment guarantees zero webhook timeouts."
    },
    selfCheckQuestions: [
      "Why must webhook signature verification use `crypto.timingSafeEqual` instead of `===`?",
      "Why does verifying a webhook signature against a parsed JSON object often fail?",
      "How does including a timestamp in the signature protect against replay attacks?"
    ]
  },
  {
    id: "real-time-backend-systems",
    number: 21,
    title: "Real-Time Backend Systems",
    phaseId: 5,
    phaseName: "Background Processing & Integrations",
    duration: "65 min",
    youtubeId: "1BfCnjr_Vjg",
    youtubeChannelUrl: CHANNEL_URL,
    shortSummary: "Polling vs Server-Sent Events (SSE) vs WebSockets vs gRPC Streaming, and Redis Pub/Sub backplanes.",
    seniorInsight: {
      quote: "Don't jump to WebSockets for simple live updates or AI token streaming. Server-Sent Events (SSE) run over standard HTTP/2, auto-reconnect, and require zero special firewall rules.",
      productionLesson: "When you scale WebSocket servers across 10 machines, User A connected to Server 1 cannot talk to User B connected to Server 2. You must connect all instances to a shared message backplane like Redis Pub/Sub or NATS.",
      commonMistake: "Holding thousands of idle WebSocket connections open on application servers without tuning OS file descriptor limits (`ulimit -n`)."
    },
    coreDeepDive: {
      what: "Architectures providing instantaneous bidirectional or server-push data streams to client interfaces.",
      why: "Chat applications, live order tracking, financial dashboards, and LLM streaming require immediate data delivery.",
      howItWorks: [
        "Polling: Client requests every 2s (high overhead, wasted bandwidth).",
        "Server-Sent Events (SSE): Unidirectional text stream over persistent HTTP connection with automatic browser reconnect.",
        "WebSockets: Full-duplex bidirectional TCP connection established via HTTP upgrade handshake.",
        "Redis Pub/Sub: Bridges messages across horizontally scaled WebSocket nodes."
      ],
      blueprintTitle: "Multi-Node WebSocket Scaling via Redis Backplane",
      blueprintCode: `[Client A]         [Client B]
    │                  │
    ▼                  ▼
[WebSocket Node 1]   [WebSocket Node 2]
    │                  ▲
    ▼ (PUBLISH)        │ (SUBSCRIBE)
    ─────────────────────
         [Redis Pub/Sub]`,
      blueprintLanguage: "text"
    },
    recommendedBook: {
      title: "High Performance Browser Networking",
      author: "Ilya Grigorik",
      keyChapters: "Chapters 14 & 15 (Server-Sent Events and WebSockets)",
      whyReadThis: "In-depth protocol analysis comparing packet overhead, framing headers, and connection lifetime across real-time transports."
    },
    handsOnChallenge: {
      ticketNumber: "TICKET-504",
      title: "Build an LLM / Real-Time Data Streaming SSE Endpoint",
      scenario: "Users want to see real-time updates streamed word-by-word rather than waiting 15 seconds for a complete response. Implement Server-Sent Events (SSE).",
      acceptanceCriteria: [
        "Set headers: `Content-Type: text/event-stream`, `Cache-Control: no-cache`, `Connection: keep-alive`.",
        "Format chunks as `data: {JSON}\\n\\n`.",
        "Handle client disconnection cleanly by ending the stream generator."
      ],
      hints: [
        "Always flush headers immediately.",
        "Listen for `req.on('close')` to stop producing events when the client navigates away."
      ],
      solutionCode: `export async function handleSSE(req, res) {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  const interval = setInterval(() => {
    const data = JSON.stringify({ time: new Date().toISOString(), status: "active" });
    res.write(\`data: \${data}\\n\\n\`);
  }, 1000);

  req.on("close", () => {
    clearInterval(interval);
    res.end();
  });
}`,
      solutionExplanation: "Server-Sent Events provide lightweight, one-way push notifications over standard HTTP without WebSocket protocol negotiation."
    },
    selfCheckQuestions: [
      "When is Server-Sent Events (SSE) a better choice than WebSockets?",
      "Why is a message broker (Redis Pub/Sub) necessary when scaling WebSockets across multiple servers?",
      "What is the OS limitation that limits concurrent connections on a single Linux server by default?"
    ]
  },

  // Phase 6: Reliability, Observability & App Architecture
  {
    id: "error-handling",
    number: 22,
    title: "Error Handling and Fault Tolerance",
    phaseId: 6,
    phaseName: "Reliability & Observability",
    duration: "45 min",
    youtubeId: "J-g9ZJha8FE",
    youtubeChannelUrl: CHANNEL_URL,
    shortSummary: "Operational vs Programmer errors, RFC 9457 Problem Details, error wrapping, and fail-safe design.",
    seniorInsight: {
      quote: "Stack traces belong in your private logging system, never in an HTTP response. Leaking database queries or file paths in error responses gives attackers a blueprint of your system.",
      productionLesson: "Differentiate operational errors (network timeout, invalid credit card - handle gracefully) from programmer bugs (null pointer, syntax error - fail fast, alert on-call, and restart cleanly).",
      commonMistake: "Catching errors with empty catch blocks (`catch (e) {}`), silently swallowing failures until data is hopelessly corrupted."
    },
    coreDeepDive: {
      what: "Anticipating, categorizing, and handling failures gracefully to prevent cascading outages and provide actionable feedback.",
      why: "Distributed networks are inherently unreliable; failures will happen every minute at scale.",
      howItWorks: [
        "1. Create custom Domain Error classes (`NotFoundError`, `UnauthorizedError`, `ConflictError`).",
        "2. Central error middleware catches domain errors and maps them to appropriate HTTP codes.",
        "3. Unknown errors log full stack traces internally and return sanitized RFC 9457 Problem Details."
      ],
      blueprintTitle: "RFC 9457 Structured Error Response",
      blueprintCode: `export class AppError extends Error {
  constructor(
    public readonly statusCode: number,
    public readonly code: string,
    message: string
  ) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class ConflictError extends AppError {
  constructor(message = "Resource already exists") {
    super(409, "RESOURCE_CONFLICT", message);
  }
}`,
      blueprintLanguage: "typescript"
    },
    recommendedBook: {
      title: "Release It! (2nd Edition)",
      author: "Michael T. Nygard",
      keyChapters: "Chapters 3, 4 & 5 (Stability Antipatterns: Integration Points, Cascading Failures, Blocked Threads)",
      whyReadThis: "The definitive engineering manual on designing software that survives chaotic production environments."
    },
    handsOnChallenge: {
      ticketNumber: "TICKET-601",
      title: "Standardize API Errors to RFC 9457 Problem Details",
      scenario: "Mobile and web frontends complain that error responses are inconsistent (sometimes string, sometimes object with `err` or `message`). Standardize all errors.",
      acceptanceCriteria: [
        "Return `Content-Type: application/problem+json`.",
        "Always include `type`, `title`, `status`, `detail`, and `instance`.",
        "Include request trace ID for debugging."
      ],
      hints: [
        "Define an RFC 9457 response interface.",
        "Map standard HTTP status codes to standardized error titles."
      ],
      solutionCode: `export function formatProblemDetails(err: AppError, req: any) {
  return {
    type: \`https://api.myapp.com/errors/\${err.code.toLowerCase()}\`,
    title: err.name || "Application Error",
    status: err.statusCode || 500,
    detail: err.message,
    instance: req.originalUrl,
    requestId: req.id,
    timestamp: new Date().toISOString()
  };
}`,
      solutionExplanation: "RFC-compliant error formatting allows automated client SDKs to parse error details and surface actionable user feedback."
    },
    selfCheckQuestions: [
      "What is the difference between an operational error and a programmer bug?",
      "Why is swallowing exceptions with empty catch blocks considered dangerous in backend development?",
      "What are the mandatory fields in an RFC 9457 Problem Details response?"
    ]
  },
  {
    id: "config-management",
    number: 23,
    title: "Configuration Management and Secrets",
    phaseId: 6,
    phaseName: "Reliability & Observability",
    duration: "40 min",
    youtubeId: "1wZ0bE8yvG4",
    youtubeChannelUrl: CHANNEL_URL,
    shortSummary: "Environment variables, Twelve-Factor config, Secrets Managers (Vault/AWS Secrets), and fail-fast startup validation.",
    seniorInsight: {
      quote: "Never commit a secret to Git. Not even for 5 minutes in a private repository. Automated bots scrape GitHub within milliseconds.",
      productionLesson: "Validate your configuration at application boot. If `DATABASE_URL` or `JWT_SECRET` is missing or malformed, crash the server immediately with an explicit error before accepting any HTTP traffic (Fail-Fast Principle).",
      commonMistake: "Accessing `process.env.MY_VAR` scattered randomly across 50 different source files instead of using a centralized, validated config module."
    },
    coreDeepDive: {
      what: "Strictly separating code from configuration, storing credentials and environment-specific settings outside source control.",
      why: "Enables identical application build artifacts to be deployed safely across development, staging, and production environments.",
      howItWorks: [
        "Precedence: Command line flags > Environment variables > Configuration files > Defaults.",
        "Secrets Management: Cloud KMS, HashiCorp Vault, AWS Secrets Manager.",
        "Fail-Fast: Validate schemas at startup using Zod or Envalid."
      ],
      blueprintTitle: "Type-Safe Fail-Fast Config Module",
      blueprintCode: `import { z } from "zod";

const ConfigSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().default(3000),
  DATABASE_URL: z.string().url(),
  REDIS_URL: z.string().url(),
  JWT_SECRET: z.string().min(32),
});

// Throws immediately on application boot if any variable is missing or invalid!
export const config = ConfigSchema.parse(process.env);
export type Config = z.infer<typeof ConfigSchema>;`,
      blueprintLanguage: "typescript"
    },
    recommendedBook: {
      title: "The Twelve-Factor App",
      author: "Adam Wiggins",
      keyChapters: "Factor III: Config (Store config in the environment)",
      whyReadThis: "Concise, fundamental methodology for designing modern cloud-native applications."
    },
    handsOnChallenge: {
      ticketNumber: "TICKET-602",
      title: "Implement Boot-Time Config Validation with Zod",
      scenario: "A deployment crashed in production 3 hours after launch because an optional payment variable was missing. Refactor the config system to fail fast at boot.",
      acceptanceCriteria: [
        "Define strict Zod schema for all environment variables.",
        "If validation fails, print human-readable missing variable list and exit with `process.exit(1)`.",
        "Export strongly typed config singleton."
      ],
      hints: [
        "Use `safeParse` to inspect all issues at once rather than failing on the first error.",
        "Ensure secrets are masked if logging config values."
      ],
      solutionCode: `const result = ConfigSchema.safeParse(process.env);

if (!result.success) {
  console.error("❌ CRITICAL: Configuration validation failed at startup:");
  result.error.errors.forEach(e => {
    console.error(\`   - \${e.path.join(".")}: \${e.message}\`);
  });
  process.exit(1);
}

export const env = result.data;`,
      solutionExplanation: "Failing fast during initial boot prevents corrupted deployments from serving faulty customer traffic."
    },
    selfCheckQuestions: [
      "Why must code and configuration be strictly decoupled in cloud-native applications?",
      "What is the Fail-Fast Principle and how does it prevent latent production failures?",
      "Why should you never access `process.env` directly inside your business logic layer?"
    ]
  },
  {
    id: "logging-monitoring-observability",
    number: 24,
    title: "Logging, Monitoring, and Observability",
    phaseId: 6,
    phaseName: "Reliability & Observability",
    duration: "65 min",
    youtubeId: "9g_WkJ6pC_0",
    youtubeChannelUrl: CHANNEL_URL,
    shortSummary: "The Three Pillars (Logs, Metrics, Traces), OpenTelemetry, Prometheus RED method, and health checks.",
    seniorInsight: {
      quote: "If it isn't monitored, it's already broken. You shouldn't have to wait for angry users on Twitter to tell you that your API is throwing 500 errors.",
      productionLesson: "Never log plaintext strings like `console.log('User logged in: ' + id)`. Always output structured JSON with timestamps, log levels, user IDs, and trace IDs so centralized search engines (Datadog, Loki, OpenSearch) can index them.",
      commonMistake: "Logging sensitive Personally Identifiable Information (PII) like credit card numbers, passwords, or session tokens."
    },
    coreDeepDive: {
      what: "Observability is the ability to understand the internal state of a system based entirely on its external telemetry outputs.",
      why: "Allows rapid incident triage, root cause analysis, and capacity planning across complex distributed systems.",
      howItWorks: [
        "Structured Logs: Machine-parseable JSON event streams.",
        "Metrics: Numeric measurements over time (Rate, Errors, Duration - RED method).",
        "Distributed Traces: Tracing a single request across multiple microservice network boundaries using W3C `traceparent` headers."
      ],
      blueprintTitle: "Structured JSON Logger Output",
      blueprintCode: `// Output to stdout as single-line JSON:
{
  "timestamp": "2026-09-13T10:15:30.120Z",
  "level": "INFO",
  "message": "Payment processed successfully",
  "service": "payment-api",
  "traceId": "4bf92f3577b34da6a3ce929d0e0e4736",
  "spanId": "00f067aa0ba902b7",
  "userId": "usr_991",
  "orderId": "ord_8812",
  "amountCents": 4500,
  "durationMs": 42.1
}`,
      blueprintLanguage: "json"
    },
    recommendedBook: {
      title: "Site Reliability Engineering (Google SRE Book)",
      author: "Betsy Beyer, Chris Jones, Jennifer Petoff & Niall Murphy",
      keyChapters: "Chapters 6 & 10 (Monitoring Distributed Systems & Being On-Call)",
      whyReadThis: "The seminal work defining Service Level Indicators (SLIs), Objectives (SLOs), and production incident management."
    },
    handsOnChallenge: {
      ticketNumber: "TICKET-603",
      title: "Implement Kubernetes Health Checks (/healthz/live and /healthz/ready)",
      scenario: "During deployments, traffic is routed to new containers before database connections are established, causing 502 errors. Implement proper Liveness and Readiness probes.",
      acceptanceCriteria: [
        "`/healthz/live` returns 200 if the process event loop is alive.",
        "`/healthz/ready` executes a lightweight DB probe (`SELECT 1`) and returns 200 only if DB & Redis connections are established.",
        "Return 503 Service Unavailable if any required backing service is unreachable."
      ],
      hints: [
        "Liveness check should be lightweight and avoid checking external databases.",
        "Readiness check should verify that the application is ready to accept user traffic."
      ],
      solutionCode: `app.get("/healthz/live", (req, res) => {
  res.status(200).json({ status: "alive" });
});

app.get("/healthz/ready", async (req, res) => {
  try {
    await db.query("SELECT 1");
    await redis.ping();
    res.status(200).json({ status: "ready" });
  } catch (err) {
    res.status(503).json({ status: "unhealthy", error: (err as any).message });
  }
});`,
      solutionExplanation: "Separating liveness from readiness ensures orchestrators restart hung processes while preventing traffic routing until dependencies are fully initialized."
    },
    selfCheckQuestions: [
      "What is the difference between a Liveness probe and a Readiness probe in Kubernetes?",
      "What does the RED method stand for in microservices monitoring?",
      "How does distributed tracing track a request across five independent services?"
    ]
  },
  {
    id: "graceful-shutdown",
    number: 25,
    title: "Graceful Shutdown and Process Lifecycle",
    phaseId: 6,
    phaseName: "Reliability & Observability",
    duration: "45 min",
    youtubeId: "uYqP_aK_uXQ",
    youtubeChannelUrl: CHANNEL_URL,
    shortSummary: "SIGINT and SIGTERM handling, draining in-flight requests, closing database connection pools, and zero-downtime deploys.",
    seniorInsight: {
      quote: "When your cloud provider restarts a server or deploys a new container, it sends a SIGTERM signal. If you kill the process immediately, you will abort active user payments halfway through.",
      productionLesson: "On receiving SIGTERM: 1) Stop accepting new connections, 2) Give active HTTP requests 15–30 seconds to finish, 3) Close database pools cleanly, 4) Exit with status code 0. That is how you achieve zero-downtime deployments.",
      commonMistake: "Ignoring OS signals, causing orchestrators (Docker/Kubernetes) to forcefully kill the container with SIGKILL after 30 seconds."
    },
    coreDeepDive: {
      what: "The sequence of actions executed by an application process when terminating, allowing in-progress operations to complete cleanly.",
      why: "Prevents data corruption, broken transactions, socket hangs, and user-facing 502 Bad Gateway errors during rollouts.",
      howItWorks: [
        "1. Process receives `SIGTERM` from Docker or Kubernetes.",
        "2. Server calls `server.close()`, rejecting new inbound requests.",
        "3. Wait for in-flight requests and background queue jobs to complete.",
        "4. Close DB connection pools, Redis clients, and file handles.",
        "5. Call `process.exit(0)`."
      ],
      blueprintTitle: "Production Graceful Shutdown Handler",
      blueprintCode: `function setupGracefulShutdown(server, dbPool, redisClient) {
  const shutdown = async (signal: string) => {
    console.log(\`Received \${signal}. Starting graceful shutdown...\`);
    
    // Stop accepting new HTTP connections
    server.close(async () => {
      console.log("HTTP server closed to new connections.");
      try {
        // Close database and cache pools
        await dbPool.end();
        await redisClient.quit();
        console.log("Database connections closed cleanly.");
        process.exit(0);
      } catch (err) {
        console.error("Error during graceful shutdown:", err);
        process.exit(1);
      }
    });

    // Force shutdown after 15 seconds if requests hang
    setTimeout(() => {
      console.error("Forcefully shutting down after timeout.");
      process.exit(1);
    }, 15000);
  };

  process.on("SIGTERM", () => shutdown("SIGTERM"));
  process.on("SIGINT", () => shutdown("SIGINT"));
}`,
      blueprintLanguage: "typescript"
    },
    recommendedBook: {
      title: "The Linux Programming Interface",
      author: "Michael Kerrisk",
      keyChapters: "Chapters 20 & 21 (Signals: Fundamental Concepts & Handlers)",
      whyReadThis: "The ultimate guide to OS process lifecycles, signal propagation, and POSIX standards."
    },
    handsOnChallenge: {
      ticketNumber: "TICKET-604",
      title: "Implement Graceful Connection Draining in Next.js / Express Server",
      scenario: "Kubernetes rolling deploys cause intermittent 502 errors because old pods terminate instantly while requests are still in-flight. Implement connection draining.",
      acceptanceCriteria: [
        "Intercept `SIGTERM` and `SIGINT` signals.",
        "Close HTTP server and wait for in-flight requests to conclude.",
        "Close database connections cleanly before exiting."
      ],
      hints: [
        "Use `server.close()` to stop accepting new requests while existing sockets finish.",
        "Set a hard deadline timeout using `setTimeout()`."
      ],
      solutionCode: `const server = app.listen(PORT);

process.on("SIGTERM", async () => {
  console.log("SIGTERM received. Draining connections...");
  server.close(async () => {
    await db.close();
    process.exit(0);
  });
  
  setTimeout(() => {
    console.error("Forced exit due to timeout");
    process.exit(1);
  }, 10000);
});`,
      solutionExplanation: "Graceful draining ensures rolling deployments and pod restarts happen with zero dropped customer requests."
    },
    selfCheckQuestions: [
      "What is the difference between SIGTERM and SIGKILL?",
      "Why must an application stop accepting new connections before closing its database pools?",
      "How does a graceful shutdown handler enable zero-downtime deployments in Kubernetes?"
    ]
  },
  {
    id: "twelve-factor-app",
    number: 26,
    title: "The 12-Factor App Methodology",
    phaseId: 6,
    phaseName: "Reliability & Observability",
    duration: "45 min",
    youtubeId: "1OpgLkJjS_0",
    youtubeChannelUrl: CHANNEL_URL,
    shortSummary: "Modern cloud-native architectural principles for scalable, maintainable software systems.",
    seniorInsight: {
      quote: "Treat your servers like cattle, not like pets. If a server dies, a new one should spin up in 2 seconds and take over without manual intervention.",
      productionLesson: "Make your application processes completely stateless. Never store user sessions, uploaded files, or cache in process memory if you want to scale to multiple instances.",
      commonMistake: "Writing log files to local disk instead of treating logs as event streams piped to stdout."
    },
    coreDeepDive: {
      what: "A methodology for building modern, scalable, maintainable software-as-a-service applications.",
      why: "Minimizes divergence between development and production, enables elastic cloud scaling, and maximizes portability.",
      howItWorks: [
        "1. Codebase: One codebase tracked in Git, many deploys.",
        "2. Dependencies: Explicitly declare and isolate dependencies.",
        "3. Config: Store config in the environment.",
        "4. Backing Services: Treat databases and caches as attached resources.",
        "5. Stateless Processes: Execute the app as stateless, share-nothing processes.",
        "6. Concurrency: Scale out via the process model (horizontal scaling)."
      ],
      blueprintTitle: "12-Factor Stateless Architecture",
      blueprintCode: `[Load Balancer]
      ├── [App Container 1 (Stateless)] ──┐
      ├── [App Container 2 (Stateless)] ──┼──► [Postgres (Attached DB)]
      └── [App Container 3 (Stateless)] ──┼──► [Redis (Attached Cache)]
                                          └──► [S3 (Attached Storage)]`,
      blueprintLanguage: "text"
    },
    recommendedBook: {
      title: "Cloud Native Patterns",
      author: "Cornelia Davis",
      keyChapters: "Chapters 1 & 3 (You Keep Using That Word: Cloud Native, Stateless Services)",
      whyReadThis: "Explores modern distributed design patterns built upon the foundations of the Twelve-Factor App."
    },
    handsOnChallenge: {
      ticketNumber: "TICKET-605",
      title: "Audit and Refactor an App for 12-Factor Compliance",
      scenario: "An application stores uploaded files in a local `/public/uploads` directory and stores user sessions in memory. Audit and refactor it for stateless horizontal scaling.",
      acceptanceCriteria: [
        "Refactor file storage to S3 / Object Storage.",
        "Refactor session store to Redis.",
        "Pipe all application logs to standard output (stdout)."
      ],
      hints: [
        "Any local disk write is lost when a container restarts.",
        "Use Redis session stores (`connect-redis`)."
      ],
      solutionCode: `// Stateless Session Configuration
import session from "express-session";
import RedisStore from "connect-redis";

app.use(session({
  store: new RedisStore({ client: redisClient }),
  secret: process.env.SESSION_SECRET!,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: true, httpOnly: true, maxAge: 86400000 }
}));`,
      solutionExplanation: "Externalizing state to attached resources allows application instances to be scaled up or down instantaneously without user session loss."
    },
    selfCheckQuestions: [
      "Why must cloud-native applications execute as stateless processes?",
      "What does 'Treat logs as event streams' mean in practice?",
      "How does Dev/Prod parity prevent unexpected production bugs?"
    ]
  },

  // Phase 7: Scale, Concurrency & Modern Engineering
  {
    id: "concurrency-parallelism",
    number: 27,
    title: "Concurrency and Parallelism",
    phaseId: 7,
    phaseName: "Advanced Engineering & Scale",
    duration: "60 min",
    youtubeId: "oV9rvDllKEg",
    youtubeChannelUrl: CHANNEL_URL,
    shortSummary: "Event loops vs Threads vs Goroutines, Race Conditions, Deadlocks, Mutexes, and atomic operations.",
    seniorInsight: {
      quote: "Concurrency is about dealing with lots of things at once. Parallelism is about doing lots of things at once. — Rob Pike",
      productionLesson: "A single unhandled Race Condition in a payment or ticket booking system can cost millions in minutes. Always use atomic database operations (`UPDATE ... WHERE balance >= amount`) or distributed locks.",
      commonMistake: "Assuming that single-threaded runtimes like Node.js are immune to race conditions. Asynchronous `await` points allow interleaved execution!"
    },
    coreDeepDive: {
      what: "Managing multiple execution tasks simultaneously (concurrency) and running multiple computations simultaneously across CPU cores (parallelism).",
      why: "Maximizes hardware utilization and prevents slow I/O operations from blocking overall system throughput.",
      howItWorks: [
        "Event Loop (Node.js, Python asyncio): Non-blocking I/O multiplexed on a single thread.",
        "Thread Pools (Java, C#, Go): Pre-allocated operating system threads mapped to physical CPU cores.",
        "Hazards: Race conditions (uncoordinated state mutation), Deadlocks (Thread A holds Lock 1 waiting for Lock 2 while Thread B holds Lock 2 waiting for Lock 1)."
      ],
      blueprintTitle: "Race Condition Demonstration & Atomic Fix",
      blueprintCode: `// VULNERABLE TO RACE CONDITIONS:
const balance = await getBalance(userId); // Read
if (balance >= 100) {
  await sleep(10); // Context switch allows another request in!
  await setBalance(userId, balance - 100); // Write - Overwrites concurrent updates!
}

// SAFE - Atomic Database Mutation:
UPDATE accounts 
SET balance = balance - 100 
WHERE user_id = 'usr_1' AND balance >= 100;
-- Single atomic step evaluated inside the database engine`,
      blueprintLanguage: "sql"
    },
    recommendedBook: {
      title: "Designing Data-Intensive Applications (DDIA)",
      author: "Martin Kleppmann",
      keyChapters: "Chapter 7: Transactions (Race Conditions, Serializability, 2PL, SSI)",
      whyReadThis: "The most brilliant explanation in computer science literature of dirty writes, phantom reads, and snapshot isolation."
    },
    handsOnChallenge: {
      ticketNumber: "TICKET-701",
      title: "Simulate and Fix a High-Concurrency Race Condition",
      scenario: "A promotional voucher with 10 available uses was claimed 18 times during a flash sale. Write a script that reproduces the race condition, then fix it.",
      acceptanceCriteria: [
        "Write an atomic SQL update that decrements voucher count safely.",
        "Verify with 50 concurrent requests that exactly 10 claims succeed and 40 fail.",
        "Return clean 409 Conflict responses for failed claims."
      ],
      hints: [
        "Use `UPDATE vouchers SET remaining = remaining - 1 WHERE id = :id AND remaining > 0`.",
        "Inspect the database row count affected."
      ],
      solutionCode: `export async function claimVoucher(voucherId: string, userId: string) {
  const result = await db.query(
    "UPDATE vouchers SET remaining = remaining - 1 WHERE id = $1 AND remaining > 0 RETURNING id",
    [voucherId]
  );

  if (result.rowCount === 0) {
    throw new ConflictError("Vouchers exhausted");
  }

  await db.query("INSERT INTO voucher_claims (voucher_id, user_id) VALUES ($1, $2)", [voucherId, userId]);
  return { success: true };
}`,
      solutionExplanation: "Relying on database-level atomic predicate locking eliminates race conditions without requiring slow application-level mutex locks."
    },
    selfCheckQuestions: [
      "Why can race conditions still happen in Node.js despite it having a single-threaded event loop?",
      "What are the four necessary conditions for a Deadlock to occur (Coffman conditions)?",
      "What is the difference between Pessimistic Locking (`SELECT FOR UPDATE`) and Optimistic Locking?"
    ]
  },
  {
    id: "scaling-performance",
    number: 28,
    title: "Scaling and High Availability",
    phaseId: 7,
    phaseName: "Advanced Engineering & Scale",
    duration: "70 min",
    youtubeId: "yps9bM_C8XQ",
    youtubeChannelUrl: CHANNEL_URL,
    shortSummary: "Horizontal vs Vertical scaling, Load Balancers, Read Replicas, Database Sharding, and Circuit Breakers.",
    seniorInsight: {
      quote: "Premature optimization is the root of all evil, but premature architectural lock-in is worse. Design for 10x your current load, not 1000x.",
      productionLesson: "Before you shard your database, do these three things: 1) Add proper indexes, 2) Set up a Redis cache, 3) Add a read replica. Those three steps will take you to millions of users with 1% of the complexity of sharding.",
      commonMistake: "Building complex microservices before finding product-market fit, spending 80% of engineering time managing distributed network latency."
    },
    coreDeepDive: {
      what: "Designing systems that maintain throughput and low latency as data volume, traffic, and geographic distribution grow exponentially.",
      why: "Ensures applications stay online and performant during massive traffic surges and hardware failures.",
      howItWorks: [
        "Read Replicas: Primary database handles writes; asynchronous read replicas handle read queries.",
        "Circuit Breaker: Automatically stops sending traffic to a failing downstream service to prevent cascading collapse.",
        "Rate Limiting: Token bucket algorithm protects endpoints from DDoS and resource exhaustion."
      ],
      blueprintTitle: "Circuit Breaker State Machine",
      blueprintCode: `        [CLOSED] (Normal operation, requests flow)
           │
           │ (Error threshold exceeded, e.g. 50% failures)
           ▼
         [OPEN]   (Fail fast immediately, no calls sent)
           │
           │ (Cooldown period expires, e.g. 30s)
           ▼
       [HALF-OPEN] (Test canary request)
         ├── If success ──► [CLOSED]
         └── If failure ──► [OPEN]`,
      blueprintLanguage: "text"
    },
    recommendedBook: {
      title: "System Design Interview – An Insider's Guide",
      author: "Alex Xu",
      keyChapters: "Chapters 1 & 4 (Scale From Zero to Millions of Users, Rate Limiter Design)",
      whyReadThis: "Clear visual architectures detailing CDNs, load balancers, caching tiers, and database scaling."
    },
    handsOnChallenge: {
      ticketNumber: "TICKET-702",
      title: "Implement a Redis Sliding Window Rate Limiter",
      scenario: "Malicious actors are spamming the login endpoint. Implement a rate limiter allowing at most 5 attempts per minute per IP address.",
      acceptanceCriteria: [
        "Track attempts using a Redis sorted set (ZSET).",
        "Prune timestamps older than 60 seconds.",
        "Return `429 Too Many Requests` with a `Retry-After` header when limit is exceeded."
      ],
      hints: [
        "Use `ZREMRANGEBYSCORE` to remove expired timestamps.",
        "Use `ZCARD` to count attempts in the current window."
      ],
      solutionCode: `export async function rateLimit(ip: string, limit = 5, windowSec = 60) {
  const now = Date.now();
  const clearBefore = now - windowSec * 1000;
  const key = \`ratelimit:\${ip}\`;

  const pipeline = redis.pipeline();
  pipeline.zremrangebyscore(key, 0, clearBefore);
  pipeline.zadd(key, now, now.toString());
  pipeline.zcard(key);
  pipeline.expire(key, windowSec);

  const results = await pipeline.exec();
  const requestCount = results![2][1] as number;

  if (requestCount > limit) {
    return { allowed: false, retryAfter: windowSec };
  }
  return { allowed: true };
}`,
      solutionExplanation: "The Redis sliding window counter provides smooth, non-bursty rate limiting with sub-millisecond overhead."
    },
    selfCheckQuestions: [
      "What is the difference between Read Replicas and Database Sharding?",
      "How does a Circuit Breaker prevent cascading failures in distributed systems?",
      "What are the trade-offs between Token Bucket and Sliding Window rate limiting algorithms?"
    ]
  },
  {
    id: "testing-code-quality",
    number: 29,
    title: "Testing and Code Quality",
    phaseId: 7,
    phaseName: "Advanced Engineering & Scale",
    duration: "50 min",
    youtubeId: "r9HdJ8P6GQI",
    youtubeChannelUrl: CHANNEL_URL,
    shortSummary: "Test Pyramid, Testcontainers for real database tests, mocking vs fakes, and CI automation.",
    seniorInsight: {
      quote: "Mocking your database in integration tests only tests that you know how to mock things. Test your repositories against a real PostgreSQL container.",
      productionLesson: "Use Testcontainers to spin up ephemeral, real Docker containers for PostgreSQL and Redis during your automated CI tests. This catches real SQL syntax errors and transaction bugs before code ever reaches staging.",
      commonMistake: "Writing 1,000 brittle unit tests that verify implementation details rather than business behavior."
    },
    coreDeepDive: {
      what: "Automated verification methodologies ensuring software remains correct, regression-free, and maintainable over time.",
      why: "Enables engineering teams to deploy to production multiple times a day with high confidence.",
      howItWorks: [
        "Unit Tests: Fast, isolated tests for pure business logic functions.",
        "Integration Tests: Test repositories and API endpoints against real databases using Testcontainers.",
        "E2E Tests: Black-box automated user flows."
      ],
      blueprintTitle: "Integration Test with Testcontainers",
      blueprintCode: `import { PostgreSqlContainer } from "@testcontainers/postgresql";
import { Client } from "pg";

describe("UserRepository Integration Test", () => {
  let container: any;
  let client: Client;

  beforeAll(async () => {
    container = await new PostgreSqlContainer().start();
    client = new Client({ connectionString: container.getConnectionString() });
    await client.connect();
    await runMigrations(client);
  }, 30000);

  afterAll(async () => {
    await client.end();
    await container.stop();
  });

  it("should enforce unique email constraint", async () => {
    // Tests real PostgreSQL unique constraint violation!
  });
});`,
      blueprintLanguage: "typescript"
    },
    recommendedBook: {
      title: "Unit Testing: Principles, Practices, and Patterns",
      author: "Vladimir Khorikov",
      keyChapters: "Chapters 1, 4 & 8 (The Goal of Testing, The Four Pillars of a Good Unit Test, Why Mocking Leads to Brittle Tests)",
      whyReadThis: "The most practical, authoritative book written on building high-value, low-maintenance automated test suites."
    },
    handsOnChallenge: {
      ticketNumber: "TICKET-703",
      title: "Write an Integration Test for Database Constraints",
      scenario: "A regression allowed duplicate emails to be inserted because the unit test used a mock repository that didn't enforce database uniqueness. Write an integration test using a real DB.",
      acceptanceCriteria: [
        "Execute test against real PostgreSQL database.",
        "Verify that inserting duplicate emails throws a unique violation error (code 23505).",
        "Clean up test data after execution."
      ],
      hints: [
        "PostgreSQL unique constraint violation error code is `23505`.",
        "Wrap test in a transaction and roll back at the end for clean isolation."
      ],
      solutionCode: `it("fails when inserting duplicate user email", async () => {
  await userRepository.create({ email: "test@example.com", name: "User 1" });
  
  await expect(
    userRepository.create({ email: "test@example.com", name: "User 2" })
  ).rejects.toThrow(/duplicate key value violates unique constraint/);
});`,
      solutionExplanation: "Testing against real database instances validates constraints, triggers, and foreign keys that in-memory mocks fail to emulate."
    },
    selfCheckQuestions: [
      "Why do unit tests with heavy mocking often give false confidence?",
      "What is Testcontainers and why has it revolutionized backend integration testing?",
      "What are the four pillars of a good automated test according to Vladimir Khorikov?"
    ]
  },
  {
    id: "openapi-standards-tools",
    number: 30,
    title: "OpenAPI Standards and Contract-First Design",
    phaseId: 7,
    phaseName: "Advanced Engineering & Scale",
    duration: "45 min",
    youtubeId: "pRS9LRBgjBo",
    youtubeChannelUrl: CHANNEL_URL,
    shortSummary: "OpenAPI 3.1, Swagger UI, Spec-First vs Code-First, generating client SDKs, and mock servers.",
    seniorInsight: {
      quote: "The API specification is the contract between teams. Design the OpenAPI spec first, get frontend approval, and both teams can build simultaneously.",
      productionLesson: "With Contract-First development, you can generate mock servers (using Prism) in 5 minutes so frontend engineers can develop against realistic APIs before backend code is even written.",
      commonMistake: "Writing API documentation manually in Confluence or Google Docs where it instantly becomes out of date."
    },
    coreDeepDive: {
      what: "A vendor-neutral, machine-readable specification standard (YAML/JSON) for describing RESTful APIs.",
      why: "Enables interactive documentation (Swagger/Redoc), automated client SDK generation, and contract validation testing.",
      howItWorks: [
        "Paths: Define URL endpoints and HTTP methods.",
        "Parameters & RequestBody: Define required headers, params, and JSON schemas.",
        "Responses: Define schema contracts for 200, 400, 500 status codes."
      ],
      blueprintTitle: "OpenAPI 3.1 Spec Snippet",
      blueprintCode: `openapi: 3.1.0
info:
  title: Payments API
  version: 1.0.0
paths:
  /transfers:
    post:
      summary: Initiate money transfer
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/TransferRequest'
      responses:
        '201':
          description: Transfer initiated
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/TransferResponse'`,
      blueprintLanguage: "yaml"
    },
    recommendedBook: {
      title: "Designing Web APIs",
      author: "Brenda Jin, Saurabh Sahni & Amir Shevat",
      keyChapters: "Chapter 7: Documenting Your API",
      whyReadThis: "Covers the developer experience of publishing, documenting, and maintaining public and internal API specifications."
    },
    handsOnChallenge: {
      ticketNumber: "TICKET-704",
      title: "Generate TypeScript API Client from OpenAPI Spec",
      scenario: "Frontend and backend teams are constantly debugging type mismatches. Automate client generation using an OpenAPI specification.",
      acceptanceCriteria: [
        "Generate OpenAPI 3.0 spec from your route definitions.",
        "Use `openapi-typescript` or `orval` to generate typed API fetch functions.",
        "Verify compile-time type safety on the client."
      ],
      terminalLab: `npx openapi-typescript ./openapi.yaml -o ./src/types/api.ts
# Inspect the generated strongly-typed endpoint contracts`,
      hints: [
        "Use tools like `tsoa`, `@fastify/swagger`, or `zod-to-openapi` to automatically derive specs.",
        "Inspect the generated TypeScript models."
      ],
      solutionCode: `// Generated TypeScript contract ensures zero frontend/backend drift
import { paths } from "./types/api";

type TransferInput = paths["/transfers"]["post"]["requestBody"]["content"]["application/json"];
type TransferOutput = paths["/transfers"]["post"]["responses"]["201"]["content"]["application/json"];

export async function createTransfer(data: TransferInput): Promise<TransferOutput> {
  const res = await fetch("/transfers", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  return res.json();
}`,
      solutionExplanation: "Deriving client SDKs directly from OpenAPI contracts completely eliminates type mismatches between frontend and backend teams."
    },
    selfCheckQuestions: [
      "What is the difference between Spec-First and Code-First API development?",
      "How does Prism use OpenAPI specs to mock backend APIs for frontend teams?",
      "What is the advantage of OpenAPI 3.1 aligning with JSON Schema Draft 2020-12?"
    ]
  },
  {
    id: "devops-for-backend-engineers",
    number: 31,
    title: "DevOps, Containers, and CI/CD for Backend Engineers",
    phaseId: 7,
    phaseName: "Advanced Engineering & Scale",
    duration: "75 min",
    youtubeId: "fqMOX6JJhGo",
    youtubeChannelUrl: CHANNEL_URL,
    shortSummary: "Docker multi-stage builds, Distroless/Alpine, Kubernetes fundamentals, GitHub Actions CI/CD pipelines, and Infrastructure as Code.",
    seniorInsight: {
      quote: "If you don't know how your code is packaged, deployed, and run on Linux servers, you are only doing half of the backend engineering job.",
      productionLesson: "Never run your Docker containers as the root user. If an attacker exploits a remote code execution vulnerability in your app, running as root gives them full control over the host node. Always add `USER node` or `USER nonroot`.",
      commonMistake: "Building 1.5GB Docker images containing build tools, TypeScript compilers, and devDependencies instead of using multi-stage builds."
    },
    coreDeepDive: {
      what: "The tools, practices, and automated pipelines that package, test, deploy, and operate backend software reliably in cloud infrastructure.",
      why: "Eliminates the 'It works on my machine' syndrome and enables rapid, automated software delivery.",
      howItWorks: [
        "Multi-stage Docker: Compiles code in build stage, copies only runtime artifacts to a minimal base image.",
        "CI/CD: Automatically runs linters, type checks, and tests on pull request; deploys to staging and production on merge.",
        "Kubernetes: Manages container replication, health probes, service discovery, and rolling zero-downtime updates."
      ],
      blueprintTitle: "Hardened Production Multi-Stage Dockerfile",
      blueprintCode: `# Stage 1: Build & Prune
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json tsconfig.json ./
RUN npm ci
COPY src/ ./src
RUN npm run build
RUN npm prune --production

# Stage 2: Minimal Hardened Production Runtime
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# Security: Run as non-root user
USER node

COPY --chown=node:node --from=builder /app/node_modules ./node_modules
COPY --chown=node:node --from=builder /app/dist ./dist
COPY --chown=node:node --from=builder /app/package.json ./package.json

EXPOSE 3000
CMD ["node", "dist/index.js"]`,
      blueprintLanguage: "dockerfile"
    },
    recommendedBook: {
      title: "The DevOps Handbook (2nd Edition)",
      author: "Gene Kim, Jez Humble, Patrick Debois & John Willis",
      keyChapters: "Chapters 5 & 6 (The Technical Practices of Flow, Telemetry, and Continuous Delivery)",
      whyReadThis: "Essential reading on automating deployment pipelines, reducing lead time, and building resilient engineering cultures."
    },
    handsOnChallenge: {
      ticketNumber: "TICKET-705",
      title: "Build a Hardened GitHub Actions CI/CD Pipeline",
      scenario: "Deployments are currently done by manually SSHing into servers and pulling git branches. Create an automated GitHub Actions pipeline.",
      acceptanceCriteria: [
        "Trigger on push to `main` branch and pull requests.",
        "Run linter, type-check, and automated tests.",
        "Build and scan Docker image with Trivy for vulnerabilities.",
        "Deploy to cloud provider (Vercel or AWS ECS) automatically."
      ],
      hints: [
        "Use GitHub Actions caching for `node_modules` to speed up CI runs.",
        "Store deployment credentials in GitHub Repository Secrets."
      ],
      solutionCode: `name: Production CI/CD
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test-and-build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: "npm"
      - run: npm ci
      - run: npm run lint
      - run: npm test
      - name: Build Docker Image
        run: docker build -t my-app:\${{ github.sha }} .`,
      solutionExplanation: "Automated CI/CD pipelines enforce automated quality gates, ensuring broken code or vulnerable packages never reach production."
    },
    selfCheckQuestions: [
      "Why should you never run Docker containers as the `root` user in production?",
      "How do Docker multi-stage builds reduce final image size and attack surface?",
      "What is the difference between Continuous Integration, Continuous Delivery, and Continuous Deployment?"
    ]
  }
];

export const ROADMAP_PHASES: RoadmapPhase[] = [
  {
    id: 1,
    name: "Web Protocols & Foundations",
    description: "Master how data moves across the internet: HTTP/1.1 to HTTP/3, Radix routing, and binary vs text serialization.",
    topics: ROADMAP_TOPICS.filter((t) => t.phaseId === 1),
  },
  {
    id: 2,
    name: "Application Architecture & Request Lifecycle",
    description: "Build clean, maintainable backend systems: Handlers, Controllers, Middlewares, Contexts, and Domain-Driven Design.",
    topics: ROADMAP_TOPICS.filter((t) => t.phaseId === 2),
  },
  {
    id: 3,
    name: "Data Persistence & Performance",
    description: "Become a master of storage: PostgreSQL deep dive, indexing, MVCC, Redis caching, Full-Text Search, and Object Storage.",
    topics: ROADMAP_TOPICS.filter((t) => t.phaseId === 3),
  },
  {
    id: 4,
    name: "Security & Access Control",
    description: "Protect systems against catastrophic breaches: Modern AuthN/AuthZ, Refresh Token Rotation, BOLA/IDOR, and OWASP API security.",
    topics: ROADMAP_TOPICS.filter((t) => t.phaseId === 4),
  },
  {
    id: 5,
    name: "Background Processing & Integrations",
    description: "Design fault-tolerant asynchronous workflows: Task queues, Transactional Outbox, Webhooks, and Real-Time SSE/WebSockets.",
    topics: ROADMAP_TOPICS.filter((t) => t.phaseId === 5),
  },
  {
    id: 6,
    name: "Reliability & Observability",
    description: "Survive real-world chaos: RFC 9457 error handling, fail-fast config, OpenTelemetry, graceful shutdown, and 12-Factor principles.",
    topics: ROADMAP_TOPICS.filter((t) => t.phaseId === 6),
  },
  {
    id: 7,
    name: "Advanced Engineering & Scale",
    description: "Operate at high scale: Concurrency & race conditions, high availability, Testcontainers, OpenAPI contracts, and Docker/DevOps.",
    topics: ROADMAP_TOPICS.filter((t) => t.phaseId === 7),
  },
];
