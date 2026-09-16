import { RoadmapTopic, RoadmapPhase } from "../types/roadmap";
import { CAPSTONE_PROJECTS } from "./capstones";

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
    timeEstimates: {
      video: "31 min",
      reading: "30 min",
      lab: "45 min",
      total: "1 hr 45 min"
    },
    youtubeId: "0Rwb4Xmlcwc",
    youtubeChannelUrl: CHANNEL_URL,
    secondaryVideo: {
      youtubeId: "3Kqal7QaCCM",
      title: "How Garbage Collection Works (Java, Python, Go)",
      duration: "9 min",
      description: "ByteByteGo illustrates mark-and-sweep, generational GC algorithms, memory allocation, and CPU trade-offs across backend runtimes."
    },
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
      title: "Software Architecture Guide",
      author: "Martin Fowler",
      keyChapters: "Software Architecture Guide & First Principles Layering",
      whyReadThis: "Foundational architecture treatise explaining why architecture matters, the trade-offs of layering, and separating hardware/runtime boundaries.",
      readingUrl: "https://martinfowler.com/architecture/"
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
        category: "WHAT",
        question: "What distinguishes a distributed stateless backend service from a stateful monolith at the networking and storage layers?",
        answerExplanation: "A stateless service stores zero client session state in local memory between HTTP requests; any server instance can handle any incoming packet by querying centralized, durable stores (e.g., PostgreSQL, Redis). In contrast, stateful monoliths maintain in-memory sessions, WebSocket connection maps, or local disk state, necessitating sticky load balancing, complex failover protocols, and making horizontal scaling much harder."
      },
      {
        category: "WHY",
        question: "Why is the Separation of Concerns strictly enforced across the Controller, Service, and Repository layers in backend architecture?",
        answerExplanation: "Separation of Concerns prevents coupling business rules with HTTP transport protocols or database dialect drivers. If you migrate from REST to gRPC or from PostgreSQL to CockroachDB, only the transport or persistence adapter changes, while core business domain invariants in the Service layer remain pure, unit-testable, and untouched."
      },
      {
        category: "HOW",
        question: "How do you detect and prevent architectural drift (e.g., Controllers directly executing SQL or bypassing Services) in production codebases?",
        answerExplanation: "Use automated static analysis and architecture linting tools (such as ArchUnit in Java/Kotlin, dependency-cruiser in TypeScript/Node, or internal package boundary rules in Go). In CI pipelines, enforce boundaries that fail builds if transport controllers import database ORM models or database drivers directly."
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
    timeEstimates: {
      video: "2 hrs 26 min",
      reading: "45 min",
      lab: "45 min",
      total: "4 hrs"
    },
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
      title: "Patterns of Enterprise Application Architecture",
      author: "Martin Fowler",
      keyChapters: "Service Layer Pattern (Decoupling Business Logic from Web Delivery)",
      whyReadThis: "The canonical definition of why a backend exists: establishing an application boundary that orchestrates business operations and encapsulates state mutations.",
      readingUrl: "https://martinfowler.com/eaaCatalog/serviceLayer.html"
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
        category: "WHAT",
        question: "What happens under the hood across the OSI model when a client sends an HTTP GET request to a backend API server?",
        answerExplanation: "The client resolves the domain via DNS (UDP 53/DoH), initiates a TCP 3-way handshake (SYN, SYN-ACK, ACK) at Layer 4, negotiates a TLS 1.3 cryptographic session (Cipher suites, Diffie-Hellman keys), transmits the Layer 7 HTTP request frame, which traverses reverse proxies and load balancers before the backend runtime's socket accepts the file descriptor, parses headers, and dispatches to application routing."
      },
      {
        category: "WHY",
        question: "Why do high-throughput backend applications decouple compute (stateless workers) from state (relational databases and object stores)?",
        answerExplanation: "Decoupling compute from state allows independent scaling dynamics. Compute nodes (CPU/RAM-bound) can scale from 2 to 200 instances in seconds during traffic spikes via Kubernetes HPA without risking database split-brain, replication lag, or data corruption, while stateful databases scale vertically or via dedicated read replicas and sharding."
      },
      {
        category: "HOW",
        question: "How does a backend server prevent resource starvation when incoming client requests exceed thread pool or socket capacity?",
        answerExplanation: "Implement proactive backpressure, reverse proxy rate limiting, and finite TCP connection queues (listen(somaxconn)). When worker pools exhaust, immediately return HTTP 429 Too Many Requests or HTTP 503 Service Unavailable with a Retry-After header rather than queueing indefinitely, which leads to memory exhaustion, CPU thrashing, and cascading system failure."
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
    timeEstimates: {
      video: "39 min",
      reading: "45 min",
      lab: "45 min",
      total: "2 hrs 10 min"
    },
    youtubeId: "iYM2zFP3Zn0",
    youtubeChannelUrl: CHANNEL_URL,
    secondaryVideo: {
      youtubeId: "WvSVSbGo0wI",
      title: "HTTP vs HTTPS: TLS Handshakes & Packet Mechanics",
      duration: "10 min",
      description: "ByteByteGo's animated breakdown of HTTP vs HTTPS, symmetric vs asymmetric encryption, TLS 1.3 handshake negotiation, and SSL/TLS certificate chains."
    },
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
      title: "High Performance Browser Networking (Free Complete Book)",
      author: "Ilya Grigorik",
      keyChapters: "Chapter 11: HTTP/2 Binary Framing & Multiplexing",
      whyReadThis: "The definitive full-text guide explaining binary framing, header compression (HPACK), multiplexed streams, and 0-RTT transport.",
      readingUrl: "https://hpbn.co/http2/"
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
        category: "WHAT",
        question: "What is Head-of-Line (HoL) blocking, and how does HTTP/3 (QUIC) solve it differently than HTTP/2?",
        answerExplanation: "In HTTP/1.1, HoL blocking occurs when a slow request blocks subsequent requests on a TCP connection. HTTP/2 multiplexes streams over a single TCP connection, but if one TCP packet drops, the entire TCP window stalls while retransmitting, blocking all streams. HTTP/3 runs over QUIC (UDP), implementing independent packet recovery per stream so packet loss on stream A never halts packets on stream B."
      },
      {
        category: "WHY",
        question: "Why is idempotency critical for HTTP methods (PUT, DELETE) and how does unsafe non-idempotency in POST lead to double charges in billing systems?",
        answerExplanation: "Idempotence guarantees that making identical requests multiple times produces the exact same server state. Because network glitches often drop responses while the server successfully processed the request, the client must safely retry. If a non-idempotent POST /charges is retried blindly, the payment gateway executes duplicate debit transactions."
      },
      {
        category: "HOW",
        question: "How do you implement atomic distributed idempotency keys for payment endpoints using Redis and PostgreSQL?",
        answerExplanation: "The client generates a unique UUID Idempotency-Key header. The backend executes an atomic SET key status:PENDING NX EX 120 in Redis. If the key exists, it returns 409 Conflict or waits for the cached final response. The business operation executes in a DB transaction where the key and processed output are stored; upon completion, Redis updates with the final HTTP status and payload to instantly replay on retries."
      }
    ]
  },
  {
    id: "routing-request-dispatching",
    number: 4,
    title: "Routing & Request Dispatching (Radix Trees, Versioning)",
    phaseId: 1,
    phaseName: "Foundations & Web Protocols",
    duration: "18 min",
    timeEstimates: {
      video: "18 min",
      reading: "30 min",
      lab: "45 min",
      total: "1 hr 35 min"
    },
    youtubeId: "m-O5gqCGanA",
    youtubeChannelUrl: CHANNEL_URL,
    secondaryVideo: {
      youtubeId: "6ULyxuHKxg8",
      title: "API Gateway Architecture & Request Routing",
      duration: "8 min",
      description: "ByteByteGo explains how API Gateways decouple clients from internal services, handling centralized request routing, rate limiting, and SSL termination."
    },
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
      title: "Microservices Architecture Patterns",
      author: "Chris Richardson",
      keyChapters: "API Gateway & Request Routing Pattern",
      whyReadThis: "Practical guide explaining request dispatching, path routing, protocol translation, and versioning across backend endpoints.",
      readingUrl: "https://microservices.io/patterns/apigateway.html"
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
        category: "WHAT",
        question: "What is a Radix Tree (Compact Prefix Tree), and why is it superior to linear regex matching for HTTP routers?",
        answerExplanation: "A Radix tree is an edge-optimized trie where nodes with single children are merged. Lookup complexity is O(k) where k is the URL path length, independent of the total number of registered routes (N). Linear regex arrays run in O(N * M) time and allocate heap memory per request, creating severe CPU overhead and GC latency under high throughput."
      },
      {
        category: "WHY",
        question: "Why should API versioning be implemented via URL paths (/v1/users) or custom MIME headers rather than query params or breaking payload changes?",
        answerExplanation: "URL path and header versioning provide unambiguous routing boundaries for API gateways, caching layers (Vary headers), and Web Application Firewalls (WAF). They allow deprecated endpoints and newer versions to coexist safely in parallel with distinct schemas, metrics, and security policies without breaking legacy mobile or enterprise consumers."
      },
      {
        category: "HOW",
        question: "How do you design a route dispatcher that handles dynamic parameterized routes (/users/:id) alongside catch-all static wildcards (/users/*filepath) without routing ambiguity?",
        answerExplanation: "Store routes in priority-ordered radix branches where static exact matches have the highest precedence, followed by named parameter child nodes, and finally wildcard/catch-all nodes. The router traverses the exact prefix first; if evaluation fails or returns 404, it backtracks to evaluate parameter and wildcard edges."
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
    timeEstimates: {
      video: "36 min",
      reading: "30 min",
      lab: "45 min",
      total: "1 hr 50 min"
    },
    youtubeId: "46O73On0gyI",
    youtubeChannelUrl: CHANNEL_URL,
    secondaryVideo: {
      youtubeId: "gnchfOojMk4",
      title: "What is RPC? gRPC & Protocol Buffers Introduction",
      duration: "7 min",
      description: "ByteByteGo breaks down why modern high-scale distributed backends use binary Protobuf serialization and gRPC instead of text-based JSON over HTTP/1.1."
    },
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
      title: "Protocol Buffers Documentation & Wire Format",
      author: "Google Protocol Buffers Team",
      keyChapters: "Protocol Buffers Overview, Binary Wire Format & Scalar Value Types",
      whyReadThis: "Official specification of binary serialization, 64-bit integer handling (int64/uint64), schema evolution, and performance comparisons over JSON.",
      readingUrl: "https://protobuf.dev/overview/"
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
        category: "WHAT",
        question: "What causes 64-bit integer precision loss when serializing large numeric IDs to JSON, and how does Protobuf handle it?",
        answerExplanation: "JavaScript and standard JSON parsers adhere to IEEE 754 double-precision floats, which only safely represent integers up to 2^53 - 1 (Number.MAX_SAFE_INTEGER = 9,007,199,254,740,991). 64-bit integers (e.g., Snowflake IDs, Twitter tweet IDs) truncate lower bits unless serialized as strings in JSON. Protocol Buffers natively encodes 64-bit integers as int64/uint64 using binary varints, preserving exact bit precision without string overhead."
      },
      {
        category: "WHY",
        question: "Why is Protobuf significantly faster and more bandwidth-efficient than JSON for internal microservice communication?",
        answerExplanation: "Protobuf uses compact binary encoding with field tags (numbers) instead of repeating verbose string keys like JSON ('user_id'). Numeric fields use variable-length zig-zag encoding, avoiding expensive ASCII-to-binary string parsing and minimizing memory allocations, leading to up to 5-10x throughput increases and 60-80% payload size reductions."
      },
      {
        category: "HOW",
        question: "How do you protect a backend service against JSON deserialization Denial of Service (DoS) attacks involving deep object nesting or huge payloads?",
        answerExplanation: "Enforce strict payload body limits at the reverse proxy/gateway layer (e.g., client_max_body_size 1m; in Nginx), configure the parser with maximum JSON nesting depth limits (e.g., max depth 32), and reject payloads with unescaped control characters or duplicate keys before allocating memory."
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
    timeEstimates: {
      video: "1 hr 46 min",
      reading: "35 min",
      lab: "45 min",
      total: "3 hrs"
    },
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
      title: "Express.js Core Architectural Guides",
      author: "OpenJS Foundation",
      keyChapters: "Using Middleware: Pipeline Processing & Request-Response Interceptors",
      whyReadThis: "Practical architecture guide showing how request lifecycle interceptors, chaining, and error-handling middlewares work under the hood.",
      readingUrl: "https://expressjs.com/en/guide/using-middleware.html"
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
        category: "WHAT",
        question: "What is the Onion (Russian Doll) Middleware Pattern, and how does the execution order differ between request entry and response exit?",
        answerExplanation: "Middlewares wrap the core handler in layers like an onion. Requests execute middleware logic in top-down registration order before reaching the terminal handler. Once the handler returns a response, execution unwinds in reverse (bottom-up) order, allowing outer middlewares (e.g., response compression, audit loggers, timer metrics) to inspect, transform, or calculate duration of the outbound response."
      },
      {
        category: "WHY",
        question: "Why should error handling and panic recovery always be placed as the outermost (first) middleware in the chain?",
        answerExplanation: "Placing recovery at the outermost boundary ensures that unhandled runtime exceptions, panics, or null-pointer errors thrown anywhere in subsequent middlewares or downstream business logic are caught. It prevents the entire server process from crashing and guarantees that a structured HTTP 500 JSON response is returned to the client with an incident reference ID."
      },
      {
        category: "HOW",
        question: "How do you build a middleware that attaches a unique Correlation ID / Request ID and propagates it across async boundaries and outgoing HTTP requests?",
        answerExplanation: "The middleware checks for an incoming X-Correlation-ID header; if missing, it generates a cryptographically secure UUIDv4. It sets the ID in the request context/AsyncLocalStorage and response headers. When the service makes downstream HTTP calls or publishes message broker events, it injects this correlation ID into outgoing headers, establishing an end-to-end distributed trace."
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
    timeEstimates: {
      video: "33 min",
      reading: "30 min",
      lab: "45 min",
      total: "1 hr 50 min"
    },
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
      title: "Go Concurrency & Context Patterns",
      author: "Sameer Ajmani (Go Core Team)",
      keyChapters: "Go Concurrency Patterns: Context (Deadlines, Cancellation & Request Scopes)",
      whyReadThis: "The definitive master guide on propagating cancellation signals, preventing leaked goroutines, and enforcing SLA timeouts across backend microservices.",
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
        category: "WHAT",
        question: "What is a Request Context, and what are the only two types of data that should be stored inside it?",
        answerExplanation: "A Request Context is an immutable scoped container that travels across function boundaries throughout a single request's lifecycle. It should strictly carry: (1) Cancellation signals and deadlines/timeouts, and (2) Request-scoped metadata required across layers (such as authenticated User ID, Tenant ID, and Correlation/Trace IDs). It must NEVER be used to pass optional parameters or database connection pools."
      },
      {
        category: "WHY",
        question: "Why is downstream cancellation propagation essential when an upstream HTTP client closes its connection or aborts a request?",
        answerExplanation: "If a client closes their browser or times out after 2 seconds, continuing to run an expensive 10-second database query or external API call is a waste of server CPU, memory, and database connection pool slots. Propagating context cancellation aborts DB transactions and socket operations immediately, protecting the backend from cascading resource exhaustion."
      },
      {
        category: "HOW",
        question: "How do you correctly configure timeout deadlines for database drivers and external HTTP clients using Context in Go or Node.js?",
        answerExplanation: "Derive a child context with context.WithTimeout(parentCtx, 3*time.Second) or create an AbortController in Node with AbortSignal.timeout(3000). Pass this context/signal to db.QueryContext() and http.NewRequestWithContext(). If the deadline expires, the driver cancels the pending socket I/O and returns context.DeadlineExceeded, allowing you to immediately return HTTP 504 Gateway Timeout."
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
    timeEstimates: {
      video: "37 min",
      reading: "30 min",
      lab: "45 min",
      total: "1 hr 50 min"
    },
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
      title: "OWASP Secure Coding Practice Guidelines",
      author: "OWASP Foundation",
      keyChapters: "Input Validation & Data Transfer Object (DTO) Cheat Sheet",
      whyReadThis: "Industry standard guide on allow-list validation, schema guards, type coercion defense, and preventing mass assignment vulnerabilities.",
      readingUrl: "https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html"
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
        category: "WHAT",
        question: "What is the difference between a Data Transfer Object (DTO) and a Database Domain Entity?",
        answerExplanation: "A DTO is a transport-layer schema that models only the data crossing network boundaries (inbound payloads or outbound responses), optimized for validation, serialization, and hiding internal secrets. A Database Domain Entity models internal state, business invariants, and persistence table structures (including sensitive fields like password hashes and internal tenant IDs) that must never be exposed directly to the outside world."
      },
      {
        category: "WHY",
        question: "Why is Mass Assignment vulnerability a critical risk when ORM entities are bound directly to HTTP request bodies?",
        answerExplanation: "If an API binds incoming JSON directly to a database entity, an attacker can inject undeclared fields into the JSON payload (e.g., {'role': 'admin', 'is_verified': true}). The ORM blindly updates these database columns, leading to full privilege escalation and unauthorized data corruption."
      },
      {
        category: "HOW",
        question: "How do you design a schema guard that sanitizes incoming inputs, strips unexpected keys, and returns RFC 7807 compliant validation errors?",
        answerExplanation: "Use strict schema libraries (Zod, Joi, class-validator) configured with .strict() or stripUnknown: false to throw errors on unexpected fields. Transform raw inputs with schema validators before handing them to handlers. When validation fails, collect all field errors and serialize them into an application/problem+json payload listing exact parameter paths and failure reasons."
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
    timeEstimates: {
      video: "58 min",
      reading: "40 min",
      lab: "45 min",
      total: "2 hrs 25 min"
    },
    youtubeId: "f7Su4KoqSio",
    youtubeChannelUrl: CHANNEL_URL,
    secondaryVideo: {
      youtubeId: "c6H2DbIOE0c",
      title: "Controller vs Service vs Repository Pattern Guide",
      duration: "12 min",
      description: "Code Deck breaks down the boundaries, responsibilities, and data flow between HTTP Controllers, business logic Services, and database Repositories."
    },
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
      title: "The Clean Architecture",
      author: "Robert C. Martin (Uncle Bob)",
      keyChapters: "The Clean Architecture: Layered Boundaries, Controllers & Use Cases",
      whyReadThis: "The original full-text architectural manifesto defining the Dependency Inversion Principle, separation of transport controllers from domain services, and testability.",
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
        category: "WHAT",
        question: "What specific responsibilities belong exclusively to the Controller/Handler layer versus the Service/Business Logic layer?",
        answerExplanation: "Controllers handle HTTP transport: extracting headers, parsing query params, unmarshaling DTOs, invoking validation, calling the service layer, and mapping domain exceptions to HTTP status codes. The Service layer contains zero HTTP/transport knowledge; it enforces pure business rules, orchestrates repository calls, handles domain events, and manages transactional boundaries."
      },
      {
        category: "WHY",
        question: "Why should the Service layer remain completely agnostic of HTTP concepts like req, res, status codes, or cookies?",
        answerExplanation: "Transport agnosticism makes business logic reusable and portable. The exact same OrderService.PlaceOrder() method can be invoked by an HTTP REST controller, a gRPC handler, an asynchronous Kafka message consumer, or a CLI command without rewriting or mocking HTTP objects."
      },
      {
        category: "HOW",
        question: "How do you test a Service class in total isolation without starting a web server or connecting to a live database?",
        answerExplanation: "Inject repository interfaces into the Service class constructor (Dependency Injection). In unit tests, pass mock or in-memory stub implementations of the repository interfaces. This allows you to verify domain rules, discount calculations, and error flows in milliseconds without network or database overhead."
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
    timeEstimates: {
      video: "45 min",
      reading: "35 min",
      lab: "45 min",
      total: "2 hrs 05 min"
    },
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
      title: "Steps Toward the Glory of REST",
      author: "Martin Fowler",
      keyChapters: "Richardson Maturity Model (Level 0 to Level 3 HATEOAS)",
      whyReadThis: "The industry standard breakdown of what makes an API truly RESTful: resources, standardized HTTP verbs, and hypermedia controls.",
      readingUrl: "https://martinfowler.com/articles/richardsonMaturityModel.html"
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
        category: "WHAT",
        question: "What are the four levels of the Richardson Maturity Model for REST APIs?",
        answerExplanation: "Level 0: The Swamp of POX (single URI, single HTTP POST method, like SOAP/RPC). Level 1: Resources (distinct URIs for individual resources, e.g., /orders/123). Level 2: HTTP Verbs (proper usage of GET, POST, PUT, DELETE and HTTP status codes). Level 3: HATEOAS (Hypermedia As The Engine Of Application State, providing dynamic hypermedia links guiding client state transitions)."
      },
      {
        category: "WHY",
        question: "Why is a single canonical OpenAPI / Swagger contract essential for contract-driven backend engineering?",
        answerExplanation: "An OpenAPI specification serves as the single source of truth for API contracts. It enables automated client SDK generation, mock server generation for frontend teams, contract drift validation in CI, and synchronized, interactive documentation that never falls out of date with production code."
      },
      {
        category: "HOW",
        question: "How do you design a paginated REST endpoint using cursor-based pagination instead of offset/limit pagination for high-volume datasets?",
        answerExplanation: "Offset pagination (OFFSET 1000000 LIMIT 20) forces the database to scan and discard 1 million rows on disk. Cursor-based pagination indexes on a monotonically increasing, unique column (e.g., created_at, id). The client passes ?cursor=eyJpZCI6OTk5fQ==, and the SQL executes WHERE (created_at, id) < ($1, $2) ORDER BY created_at DESC, id DESC LIMIT 20, utilizing the B-Tree index for an instant O(log N) seek."
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
    timeEstimates: {
      video: "3 hrs 09 min",
      reading: "30 min",
      lab: "60 min",
      total: "4 hrs 40 min"
    },
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
      title: "RESTful API Design & HTTP Methods",
      author: "Lokesh Gupta",
      keyChapters: "HTTP Methods: GET, POST, PUT, DELETE, and PATCH (Idempotency & Safe Methods)",
      whyReadThis: "Clear, exhaustive explanation of state mutations, difference between replacement (PUT) and partial modification (PATCH), and status code contracts.",
      readingUrl: "https://restfulapi.net/http-methods/"
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
        category: "WHAT",
        question: "What is the technical and semantic difference between HTTP PUT and HTTP PATCH for state mutation?",
        answerExplanation: "PUT is an idempotent full resource replacement; any existing fields omitted in the request body are either overwritten with null or set to schema defaults. PATCH is a partial mutation; it only updates the specific fields included in the request body, leaving all other existing properties of the stored entity untouched."
      },
      {
        category: "WHY",
        question: "Why is Soft Deletion (deleted_at timestamp) both a blessing for auditing and a hazard for unique database constraints?",
        answerExplanation: "Soft deletion preserves historical records, references in audit logs, and allows accidental deletion recovery. However, standard SQL unique constraints (e.g., UNIQUE(email)) will block re-registration of the same email after soft deletion. It also pollutes B-Tree indexes and requires adding WHERE deleted_at IS NULL to every query, risking slow performance."
      },
      {
        category: "HOW",
        question: "How do you safely enforce unique constraints on soft-deleted tables in PostgreSQL?",
        answerExplanation: "Create a partial unique index: CREATE UNIQUE INDEX idx_users_active_email ON users(email) WHERE deleted_at IS NULL;. This only enforces uniqueness among active non-deleted rows, allowing infinite re-creations of previously soft-deleted entities without database constraint violations."
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
    timeEstimates: {
      video: "4 hrs 20 min",
      reading: "45 min",
      lab: "60 min",
      total: "6 hrs"
    },
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
      title: "PostgreSQL Concurrency Control & Internals",
      author: "The PostgreSQL Global Development Group",
      keyChapters: "Chapter 13: Concurrency Control (MVCC, Transaction Isolation Levels, and Locks)",
      whyReadThis: "Official documentation explaining how Multi-Version Concurrency Control (MVCC) prevents readers from blocking writers and avoids phantom reads.",
      readingUrl: "https://www.postgresql.org/docs/current/mvcc.html"
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
        category: "WHAT",
        question: "What is Multi-Version Concurrency Control (MVCC), and how does PostgreSQL prevent readers from blocking writers?",
        answerExplanation: "MVCC creates a new version (tuple) of a row on every UPDATE and flags rows on DELETE with transaction IDs (xmin and xmax) rather than overwriting data in-place. Because readers view a point-in-time snapshot corresponding to their transaction isolation level, read queries scan valid historical tuples without acquiring row locks, meaning readers never block writers and writers never block readers."
      },
      {
        category: "WHY",
        question: "Why is connection pooling (e.g., PgBouncer) mandatory for PostgreSQL when scaling to thousands of concurrent API requests?",
        answerExplanation: "PostgreSQL uses a process-per-connection model where each client connection forks a backend process consuming ~5-10MB of RAM, OS file descriptors, and CPU context switching. Without a pooler, 5,000 incoming connections crash the database via out-of-memory or CPU thrashing. PgBouncer multiplexes thousands of incoming client connections onto a small pool of 50-100 real database connections."
      },
      {
        category: "HOW",
        question: "How do you detect and fix PostgreSQL database bloat caused by dead tuples and abandoned long-running transactions?",
        answerExplanation: "Query pg_stat_user_tables to check n_dead_tup. Identify old transactions holding locks via pg_stat_activity where now() - xact_start is excessive, as they prevent autovacuum from cleaning dead rows. Terminate offending connections with pg_terminate_backend(pid) and tune autovacuum settings (autovacuum_vacuum_scale_factor = 0.05)."
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
    timeEstimates: {
      video: "5 hrs 55 min",
      reading: "45 min",
      lab: "60 min",
      total: "7 hrs 40 min"
    },
    youtubeId: "26ls5lNiijk",
    youtubeChannelUrl: CHANNEL_URL,
    secondaryVideo: {
      youtubeId: "_1IKwnbscQU",
      title: "7 Must-Know Strategies to Scale Your Database",
      duration: "10 min",
      description: "ByteByteGo breaks down vertical scaling, read replicas, database sharding, caching tiers, normalization trade-offs, and CQRS."
    },
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
      title: "PostgreSQL Data Definition & Relational Modeling",
      author: "The PostgreSQL Global Development Group",
      keyChapters: "Chapter 5: Constraints (Check, Unique, Foreign Keys & Referential Integrity)",
      whyReadThis: "Official guide on enforcing relational domain invariants, cascading deletes, natural vs surrogate keys, and preventing corrupted database records.",
      readingUrl: "https://www.postgresql.org/docs/current/ddl-constraints.html"
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
        category: "WHAT",
        question: "What is the difference between Third Normal Form (3NF) and intentional denormalization in relational database design?",
        answerExplanation: "3NF requires that all non-key columns depend solely and directly on the primary key, eliminating data duplication and update anomalies across tables. Denormalization intentionally reintroduces redundant data (e.g., duplicating user_name inside orders) to eliminate expensive multi-table JOINs and optimize high-frequency read paths in analytical or high-throughput queries."
      },
      {
        category: "WHY",
        question: "Why are database foreign keys both a guarantee of referential integrity and a bottleneck in distributed or sharded systems?",
        answerExplanation: "Foreign keys guarantee data consistency at the engine level by preventing orphaned child records. However, during high-throughput concurrent writes, foreign key checks require shared locks on parent rows, introducing lock contention. In horizontally sharded systems where parent and child rows live on separate nodes, cross-network foreign key validation is prohibitively slow and unsupported."
      },
      {
        category: "HOW",
        question: "How do you model and store complex hierarchical / tree-structured data (like nested comment threads) in a relational database for high-performance querying?",
        answerExplanation: "Use either the Materialized Path model (e.g., PostgreSQL ltree extension storing paths like 1.4.12), Closure Table (a separate lookup table storing ancestor-descendant pairs with path length), or Nested Sets. For most modern backends, PostgreSQL ltree with GiST indexing enables querying all descendants or ancestors of any comment in a single index scan."
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
    timeEstimates: {
      video: "43 min",
      reading: "40 min",
      lab: "45 min",
      total: "2 hrs 10 min"
    },
    youtubeId: "-qNSXK7s7_w",
    youtubeChannelUrl: CHANNEL_URL,
    secondaryVideo: {
      youtubeId: "clrtT_4WBAw",
      title: "PostgreSQL Indexing: How, Why & When (PyCon AU)",
      duration: "38 min",
      description: "Deep dive into how PostgreSQL reads B-Tree indexes, builds query execution plans, and how to debug slow queries with EXPLAIN ANALYZE."
    },
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
      title: "Use The Index, Luke! (Free Complete Book)",
      author: "Markus Winand",
      keyChapters: "Anatomy of an Index: B-Trees, Leaf Nodes, and Query Execution Plans",
      whyReadThis: "The undisputed master textbook on database indexing, completely free online, explaining how B-Trees work, leftmost prefix rules, and EXPLAIN ANALYZE.",
      readingUrl: "https://use-the-index-luke.com/sql/anatomy"
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
        category: "WHAT",
        question: "How does a B-Tree index work under the hood, and what is the difference between an Index Scan, Index Only Scan, and Bitmap Heap Scan?",
        answerExplanation: "A B-Tree is a balanced multi-way search tree maintaining sorted keys on disk pages (O(log N) seeks). An Index Scan traverses the B-Tree to find row IDs (cTIDs) and fetches table pages from disk. An Index Only Scan retrieves all requested columns directly from the index leaf without touching table heap pages. A Bitmap Heap Scan collects row pointers from index matches into a memory bitmap, sorts them by physical disk location, and reads table blocks sequentially."
      },
      {
        category: "WHY",
        question: "Why does putting a function around an indexed column (e.g., WHERE LOWER(email) = 'test@example.com') cause PostgreSQL to ignore a standard B-Tree index?",
        answerExplanation: "Standard B-Tree indexes store raw values, not computed function outputs. The query engine cannot reverse the mathematical or string function to search the sorted index, forcing it to fall back to an exhaustive, CPU-heavy Sequential Table Scan on every single row. To fix this, you must create an explicit functional expression index: CREATE INDEX ON users (LOWER(email));."
      },
      {
        category: "HOW",
        question: "How do you detect, profile, and eliminate the classic N+1 query problem in an ORM (Prisma, Hibernate, GORM)?",
        answerExplanation: "Turn on SQL query logging or use APM tools to spot repetitive queries in logs. The N+1 problem occurs when fetching 1 parent collection followed by N separate queries for each child relation. Eliminate it by using eager loading with SQL JOIN or batch fetching (WHERE id IN (...)), or by utilizing DataLoader patterns that coalesce individual ID requests across an event-loop tick into a single batch query."
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
    timeEstimates: {
      video: "30 min",
      reading: "35 min",
      lab: "45 min",
      total: "1 hr 50 min"
    },
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
      title: "Patterns of Enterprise Application Architecture",
      author: "Martin Fowler",
      keyChapters: "Repository Pattern (Mediating Between Domain Entities and Data Mapping)",
      whyReadThis: "The authoritative definition of the Repository pattern, separating domain rules and transaction aggregates from database queries.",
      readingUrl: "https://martinfowler.com/eaaCatalog/repository.html"
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
        category: "WHAT",
        question: "What is a Domain Invariant, and where must its validation be enforced to prevent corrupted business states?",
        answerExplanation: "A domain invariant is a business rule that must always hold true at all times within an application (e.g., 'an account balance cannot drop below zero', 'a confirmed booking cannot have duplicate reserved seats'). It must be enforced inside the Domain Model / Business Logic Layer (via Domain Entities and Aggregate Roots), backed by database constraints (CHECK constraints, foreign keys, and serializable transactions), never solely in frontend code or UI validations."
      },
      {
        category: "WHY",
        question: "Why is the Transaction Script pattern dangerous for complex enterprise applications compared to Domain-Driven Design (DDD) Aggregates?",
        answerExplanation: "Transaction Scripts organize logic as single procedural methods interacting directly with database tables. As applications grow, business rules get duplicated across multiple endpoints, leading to fragmented logic, subtle race conditions, inconsistent invariants, and an untestable codebase. DDD Aggregates encapsulate state and rules, ensuring all mutations pass through strict domain methods."
      },
      {
        category: "HOW",
        question: "How do you implement the Unit of Work pattern to ensure multiple repository operations commit or rollback atomically in a single database transaction?",
        answerExplanation: "Create a Unit of Work abstraction that maintains a reference to an active database transaction. Repositories accept this context/transaction. All business modifications register changes in memory; when the service finishes, the Unit of Work issues a single COMMIT. If any operation fails, it executes an automatic ROLLBACK, guaranteeing that orphaned mutations never persist."
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
    timeEstimates: {
      video: "1 hr 27 min",
      reading: "35 min",
      lab: "45 min",
      total: "2 hrs 45 min"
    },
    youtubeId: "XCsS_NVAa1g",
    youtubeChannelUrl: CHANNEL_URL,
    secondaryVideo: {
      youtubeId: "5TRFpFBccQM",
      title: "System Design: Why is Single-Threaded Redis So Fast?",
      duration: "12 min",
      description: "ByteByteGo breaks down I/O multiplexing, in-memory skip lists, and how Redis handles millions of operations without multi-threading lock overhead."
    },
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
      title: "Redis Architecture & Data Structures Guide",
      author: "Redis Core Team",
      keyChapters: "Redis Data Types: Strings, Hashes, Sorted Sets & In-Memory Caching",
      whyReadThis: "Official guide covering cache keys, memory optimization, eviction policies (LRU/LFU), and atomic commands.",
      readingUrl: "https://redis.io/docs/latest/develop/data-types/"
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
        category: "WHAT",
        question: "What is the difference between Cache-Aside (Lazy Loading) and Write-Through caching patterns?",
        answerExplanation: "In Cache-Aside, the application first queries Redis; on cache miss, it reads from PostgreSQL, writes the result to Redis with a TTL, and returns it. In Write-Through, the application writes updates to the cache first, and the cache synchronously writes to the database before acknowledging success, ensuring data is always fresh in cache at the cost of higher write latency."
      },
      {
        category: "WHY",
        question: "Why do Cache Stampedes (Dog-piling) occur when high-traffic cache keys expire, and how do Probabilistic Early Expiration algorithms (XFetch) prevent them?",
        answerExplanation: "When a popular key expires, hundreds of concurrent requests simultaneously get a cache miss and rush to execute the same heavy query on the database, causing DB CPU spikes and downtime. The XFetch algorithm computes an early refresh probability based on compute time, remaining TTL, and a randomness factor beta, refreshing the cache in the background before it formally expires."
      },
      {
        category: "HOW",
        question: "How do you solve Cache Penetration (queries for non-existent records repeatedly hitting the DB) using Bloom Filters or null caching?",
        answerExplanation: "When a query finds no record in the database, write a null sentinel value into Redis with a short TTL (e.g., 60 seconds) so subsequent lookups hit the cache. For massive keyspaces, place a Bloom Filter in front of the cache; if the Bloom Filter indicates an ID definitely does not exist, reject the request immediately without touching Redis or PostgreSQL."
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
    timeEstimates: {
      video: "37 min",
      reading: "40 min",
      lab: "45 min",
      total: "2 hrs"
    },
    youtubeId: "2PPSXonhIck",
    youtubeChannelUrl: CHANNEL_URL,
    secondaryVideo: {
      youtubeId: "T0k-3Ze4NLo",
      title: "JWT - JSON Web Token Crash Course (NodeJS & Postgres)",
      duration: "42 min",
      description: "Hussein Nasser explains stateful cookie sessions vs stateless JWT tokens, token architecture, cryptographic signing, and production security tradeoffs."
    },
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
      title: "OWASP Authentication Cheat Sheet",
      author: "OWASP Foundation",
      keyChapters: "Authentication & Password Storage, Multi-Factor Auth, and Session Defense",
      whyReadThis: "Exhaustive industry standard on password hashing (Argon2id/bcrypt), session IDs, JWT claims, and refresh token security.",
      readingUrl: "https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html"
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
        category: "WHAT",
        question: "What is the difference between a stateful session store and a stateless JSON Web Token (JWT) at the architecture layer?",
        answerExplanation: "Stateful sessions store session IDs in the client cookie and full user metadata/permissions in a centralized server store (e.g., Redis). Every request requires a Redis lookup, but session revocation is instant. Stateless JWTs encode user identity, claims, and cryptographically signed signatures inside the token itself; servers verify signatures locally using public keys without database lookups, making revocation before expiry difficult."
      },
      {
        category: "WHY",
        question: "Why is storing JWT tokens in browser localStorage an insecure vulnerability compared to httpOnly, Secure, SameSite cookies?",
        answerExplanation: "Any script executing on the page (including malicious third-party packages or Cross-Site Scripting / XSS exploits) can read localStorage and exfiltrate user tokens. Cookies configured with HttpOnly are inaccessible to JavaScript, Secure ensures transmission only over HTTPS, and SameSite=Strict/Lax prevents Cross-Site Request Forgery (CSRF)."
      },
      {
        category: "HOW",
        question: "How do you implement Refresh Token Rotation with automatic theft detection?",
        answerExplanation: "Issue an Access Token (15 min) and a cryptographically random Refresh Token (7 days) stored in a database family table. When the client exchanges the Refresh Token, invalidate it immediately and issue a new pair. If an invalidated or already-used Refresh Token is submitted, detect token reuse as theft, immediately invalidate the entire token family, and force the user to re-authenticate."
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
    timeEstimates: {
      video: "35 min",
      reading: "35 min",
      lab: "45 min",
      total: "1 hr 55 min"
    },
    youtubeId: "SuycfXLdF8o",
    youtubeChannelUrl: CHANNEL_URL,
    secondaryVideo: {
      youtubeId: "6GRaRY4OKa8",
      title: "RBAC vs ABAC Explained with Real-World Production Examples",
      duration: "18 min",
      description: "How Role-Based and Attribute-Based Access Control differ in practice, resolving role explosion and enforcing fine-grained user permissions."
    },
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
      title: "OWASP Authorization & Access Control Cheat Sheet",
      author: "OWASP Foundation",
      keyChapters: "Role-Based Access Control (RBAC) & Attribute-Based Access Control (ABAC)",
      whyReadThis: "Definitive guide on enforcing principle of least privilege, avoiding BOLA/IDOR vulnerabilities, and policy enforcement points.",
      readingUrl: "https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html"
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
        category: "WHAT",
        question: "What is the fundamental difference between Role-Based Access Control (RBAC) and Attribute-Based Access Control (ABAC)?",
        answerExplanation: "RBAC assigns permissions to static roles (e.g., admin, editor, viewer) and users to roles, answering: 'Does user role X have permission Y?'. ABAC evaluates dynamic policies based on attributes of the user, the resource, the action, and the environment (e.g., 'Can a doctor edit a medical record if doctor.department == record.department and current_time is during business hours?')."
      },
      {
        category: "WHY",
        question: "Why is Insecure Direct Object References (IDOR / BOLA - Broken Object Level Authorization) consistently ranked as the #1 API security flaw?",
        answerExplanation: "Applications often verify that a user is authenticated and possesses a general role (e.g., 'customer'), but forget to verify whether that customer actually owns the specific resource requested by ID (e.g., GET /api/invoices/1234). Attackers simply increment IDs to view or manipulate other users' sensitive private data without triggering standard role guards."
      },
      {
        category: "HOW",
        question: "How do you architect a declarative Policy Enforcement Point (PEP) middleware that prevents IDOR at the database query level?",
        answerExplanation: "Instead of checking ownership in handlers, inject the authenticated user_id or tenant_id into repository query scopes. Every mutation query executes with tenant scoping (e.g., UPDATE invoices SET amount = $1 WHERE id = $2 AND tenant_id = $3). If the record belongs to another user, 0 rows update and the API returns 404/403 automatically."
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
    timeEstimates: {
      video: "1 hr 27 min",
      reading: "40 min",
      lab: "45 min",
      total: "2 hrs 50 min"
    },
    youtubeId: "YYe0FdfdgDU",
    youtubeChannelUrl: CHANNEL_URL,
    secondaryVideo: {
      youtubeId: "YXkOdWBwqaA",
      title: "Rate Limiter System Design: Token Bucket, Leaky Bucket & Scaling",
      duration: "14 min",
      description: "ByteByteGo breaks down how to design a distributed rate limiter, comparing Token Bucket, Leaky Bucket, and Sliding Window algorithms to prevent DDoS attacks."
    },
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
      title: "OWASP API Security Top 10 (2023 Edition)",
      author: "OWASP Foundation",
      keyChapters: "API Security Top 10: Rate Limiting, Injection, Broken Object Level Authorization",
      whyReadThis: "The globally recognized security benchmark for protecting backend APIs against DDoS, credential stuffing, and injection exploits.",
      readingUrl: "https://owasp.org/API-Security/editions/2023/en/0x11-t10/"
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
        category: "WHAT",
        question: "How does Cross-Origin Resource Sharing (CORS) work at the protocol level, and what triggers an HTTP OPTIONS Preflight request?",
        answerExplanation: "CORS is a browser security mechanism that restricts cross-origin HTTP requests. A preflight OPTIONS request is sent before the actual request if the request uses methods other than GET/POST/HEAD, includes custom headers (like Authorization), or has a Content-Type other than text/plain, multipart/form-data, or application/x-www-form-urlencoded. The browser sends Origin and checks for Access-Control-Allow-Origin."
      },
      {
        category: "WHY",
        question: "Why do SQL prepared statements (parameterized queries) completely prevent SQL Injection, whereas string sanitization fails?",
        answerExplanation: "Prepared statements send the SQL query template and the parameter data in two completely separate protocol packets. The database engine compiles and optimizes the SQL execution plan before inserting the user data. The user data is treated strictly as literal scalar values, making it mathematically impossible for malicious input to alter the SQL syntax structure."
      },
      {
        category: "HOW",
        question: "How do you implement a distributed sliding-window rate limiter using Redis sorted sets (ZSET)?",
        answerExplanation: "For each client IP, maintain a Redis ZSET where both member and score are the current timestamp in milliseconds. Use a Redis transaction/pipeline: (1) ZREMRANGEBYSCORE key 0 (now - window_size) to drop expired timestamps, (2) ZCARD key to count current requests, (3) if count < limit, ZADD key now now and EXPIRE key window_size. If count >= limit, calculate retry delay from the oldest element and return HTTP 429."
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
    timeEstimates: {
      video: "31 min",
      reading: "35 min",
      lab: "45 min",
      total: "1 hr 50 min"
    },
    youtubeId: "nFxjaVmFj5E",
    youtubeChannelUrl: CHANNEL_URL,
    secondaryVideo: {
      youtubeId: "Cie5v59mrTg",
      title: "RabbitMQ & Message Queues Crash Course",
      duration: "40 min",
      description: "Hussein Nasser covers AMQP architecture, message durability, consumer acknowledgments, worker pools, and dead-letter exchanges."
    },
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
      title: "Enterprise Integration Patterns (Online Book)",
      author: "Gregor Hohpe & Bobby Woolf",
      keyChapters: "Point-to-Point Channel & Competing Consumers Pattern",
      whyReadThis: "The definitive patterns book on asynchronous message queuing, decoupled background workers, and dead-letter queues.",
      readingUrl: "https://www.enterpriseintegrationpatterns.com/patterns/messaging/PointToPointChannel.html"
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
        category: "WHAT",
        question: "What is the difference between an in-memory queue (like Node.js event loop / Go channels) and a durable message queue (like BullMQ / Redis / SQS)?",
        answerExplanation: "In-memory queues hold task data inside the application process RAM; if the process crashes, deploys, or restarts, all pending and in-flight tasks are permanently lost. Durable message queues persist task state on external, resilient storage with visibility timeouts, acknowledgments (ACK/NACK), automatic retry backoffs, and dead-letter queues."
      },
      {
        category: "WHY",
        question: "Why is an Exponential Backoff with Jitter algorithm essential for failed queue workers communicating with third-party APIs?",
        answerExplanation: "If a downstream service experiences high load or a network hiccup, retrying immediately at fixed intervals causes all failed workers to hammer the service at the exact same second (the Thundering Herd problem). Exponential backoff spaces out retries (2^n), and jitter injects random variance, desynchronizing worker retries and allowing the downstream service to recover."
      },
      {
        category: "HOW",
        question: "How do you design a Dead Letter Queue (DLQ) strategy and alerts to handle poisoned-pill messages without stalling queue consumption?",
        answerExplanation: "Configure maximum retry limits (e.g., 5 attempts). If a task fails repeatedly due to unrecoverable data errors (a poison pill), the queue moves the job to a DLQ instead of abandoning or crashing the worker. Set Prometheus/CloudWatch alerts on DLQ size > 0, and build an administrative replay script to reprocess fixed messages after bug fixes are deployed."
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
    timeEstimates: {
      video: "30 min",
      reading: "30 min",
      lab: "45 min",
      total: "1 hr 45 min"
    },
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
      title: "Microservices Architecture Patterns",
      author: "Chris Richardson",
      keyChapters: "Transactional Outbox Pattern (Dual-Write Prevention & Event Triggers)",
      whyReadThis: "Authoritative architectural pattern showing how to commit database state and publish asynchronous events atomically without data loss.",
      readingUrl: "https://microservices.io/patterns/data/transactional-outbox.html"
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
        category: "WHAT",
        question: "What is the Dual-Write Problem, and how does it cause data inconsistency between databases and email/notification services?",
        answerExplanation: "The Dual-Write Problem occurs when an application must update two separate systems (e.g., save an order in PostgreSQL and send a confirmation email via SendGrid) in response to one event. Because distributed transactions across DBs and third-party APIs are impossible, if the DB commits but the network fails during email delivery, the customer gets no email. If email sends first but DB rolls back, the customer gets an email for an order that doesn't exist."
      },
      {
        category: "WHY",
        question: "Why is the Transactional Outbox Pattern the industry-standard architecture for triggering asynchronous side effects from database mutations?",
        answerExplanation: "The Transactional Outbox Pattern saves the business entity mutation AND an outbox event record inside the same atomic local database transaction. Because both succeed or fail together, no data inconsistency can occur. A separate, reliable background process or CDC (Change Data Capture) tool polls or streams the outbox table to dispatch the events."
      },
      {
        category: "HOW",
        question: "How do you guarantee that a transactional email is sent exactly once to a user even if the queue worker retries multiple times?",
        answerExplanation: "Use email idempotency keys. When enqueuing or dispatching the email task, generate an idempotency key composed of the entity ID and event type (e.g., order-confirmed-12345). Send this key in the email provider's API header (Idempotency-Key in SendGrid/Stripe) or track sent keys in a dedicated Redis/DB table so duplicate worker executions do not resend the message."
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
    timeEstimates: {
      video: "2 hrs 29 min",
      reading: "35 min",
      lab: "45 min",
      total: "3 hrs 50 min"
    },
    youtubeId: "41NOoEz3Tzc",
    youtubeChannelUrl: CHANNEL_URL,
    secondaryVideo: {
      youtubeId: "x_jjhcDrISk",
      title: "Top 3 Things You Should Know About Webhooks!",
      duration: "8 min",
      description: "ByteByteGo covers webhook mechanics, idempotency handling, retry backoffs, signature security verification, and webhook vs polling trade-offs."
    },
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
      title: "The Webhooks Guide & Best Practices",
      author: "Svix / Webhooks.fyi Community",
      keyChapters: "Webhook Security: HMAC Signatures, Replay Attack Prevention & Idempotency",
      whyReadThis: "Comprehensive open-source resource on webhook engineering: cryptographic verification, exponential backoff retries, and failure delivery.",
      readingUrl: "https://webhooks.fyi/"
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
        category: "WHAT",
        question: "What is an HMAC SHA-256 signature, and how does a webhook receiver use it to authenticate incoming HTTP payloads?",
        answerExplanation: "HMAC (Hash-based Message Authentication Code) combines the raw request payload body with a shared secret key using the SHA-256 cryptographic hash function. The sender transmits this digest in a header (e.g., X-Hub-Signature-256). The receiver hashes the raw request body with its copy of the secret and performs a constant-time comparison against the header to verify payload integrity and authenticity."
      },
      {
        category: "WHY",
        question: "Why must timing attacks be prevented when comparing webhook HMAC signatures, and why is standard string equality unsafe?",
        answerExplanation: "Standard string equality operators (=== or ==) compare strings character-by-character from left to right and return false at the first mismatch. Attackers can measure tiny CPU latency differences (timing attacks) to guess the signature byte-by-byte. You must use constant-time equality functions (crypto.timingSafeEqual in Node, subtle.timingSafeEqual in Go) that always take identical time regardless of match position."
      },
      {
        category: "HOW",
        question: "How do you design a high-throughput webhook ingestion endpoint that avoids HTTP 504 timeouts from third-party senders?",
        answerExplanation: "Keep the ingestion endpoint ultra-lightweight: (1) verify the HMAC signature and timestamp, (2) write the raw event directly to a high-speed durable queue (Kafka, Redis, SQS), and (3) immediately return HTTP 202 Accepted or 200 OK within 100 milliseconds. All heavy business logic, database transactions, and notifications run asynchronously in background queue workers."
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
    timeEstimates: {
      video: "48 min",
      reading: "35 min",
      lab: "45 min",
      total: "2 hrs 10 min"
    },
    youtubeId: "2Nt-ZrNP22A",
    youtubeChannelUrl: CHANNEL_URL,
    secondaryVideo: {
      youtubeId: "okrR1KXNLtA",
      title: "Design a Real-Time Chat System (WebSockets at Scale)",
      duration: "16 min",
      description: "ByteByteGo's complete architecture for real-time messaging systems (WhatsApp/Discord), detailing persistent WebSocket connections, presence servers, and message routing."
    },
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
      title: "High Performance Browser Networking (Free Complete Book)",
      author: "Ilya Grigorik",
      keyChapters: "Chapter 15: The WebSocket Protocol (and Chapter 14: Server-Sent Events)",
      whyReadThis: "Full-text explanation of WebSocket framing, TCP connection upgrading, subprotocols, and comparisons with HTTP streaming.",
      readingUrl: "https://hpbn.co/websocket/"
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
        category: "WHAT",
        question: "What are the architectural trade-offs between WebSockets and Server-Sent Events (SSE) for real-time applications?",
        answerExplanation: "WebSockets provide full-duplex, bidirectional communication over a single long-lived TCP connection, ideal for chat, gaming, and collaborative editing. SSE is unidirectional (server-to-client only) running over standard HTTP/1.1 or HTTP/2, featuring built-in browser reconnection, event IDs, and compatibility with standard corporate firewalls and HTTP load balancers without protocol upgrade overhead."
      },
      {
        category: "WHY",
        question: "Why is a Redis Pub/Sub or Redis Streams backbone required when scaling WebSockets across multiple server instances?",
        answerExplanation: "WebSocket connections are stateful TCP connections bound to a specific server instance's memory. If User A is connected to Server 1 and User B is connected to Server 2, Server 1 cannot directly deliver a message to User B. A shared Redis Pub/Sub message broker broadcasts the message to all servers, allowing whichever server holds User B's socket to forward the message."
      },
      {
        category: "HOW",
        question: "How do you prevent memory leaks and zombie TCP connections in high-concurrency WebSocket clusters?",
        answerExplanation: "Implement proactive heartbeat ping/pong frames at the application layer. The server broadcasts a ping frame every 30 seconds; if a client socket fails to acknowledge with a pong within 10 seconds, the server forcefully closes the socket, cleans up event listeners and connection maps from memory, and triggers cleanup callbacks to release resources."
      }
    ]
  },
  {
    id: "object-storage-large-files",
    number: 24,
    title: "Object Storage & Large Files (S3 Pre-signed URLs, Multipart Uploads, CDN)",
    phaseId: 5,
    phaseName: "Asynchronous Systems & Integrations",
    duration: "35 min",
    timeEstimates: {
      video: "35 min",
      reading: "30 min",
      lab: "45 min",
      total: "1 hr 50 min"
    },
    youtubeId: "tfU0JEZjcsg",
    youtubeChannelUrl: CHANNEL_URL,
    secondaryVideo: {
      youtubeId: "77lMCiiMilo",
      title: "Introduction to Amazon Simple Storage Service (S3)",
      duration: "10 min",
      description: "Official AWS architecture breakdown of Amazon S3 storage classes, bucket policies, data durability (11 nines), and security controls."
    },
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
      title: "Amazon Simple Storage Service (S3) User Guide",
      author: "Amazon Web Services",
      keyChapters: "Working with Pre-signed URLs for Secure Direct-to-S3 Uploads",
      whyReadThis: "Official architectural guide on generating time-limited pre-signed URLs, handling multipart uploads, and offloading large file streaming from API servers.",
      readingUrl: "https://docs.aws.amazon.com/AmazonS3/latest/userguide/using-presigned-url.html"
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
        category: "WHAT",
        question: "What is an S3 Pre-signed URL, and how does it prevent backend servers from becoming network bottlenecks during file uploads?",
        answerExplanation: "A pre-signed URL is an Amazon S3/Cloud Storage URL cryptographically signed with backend AWS credentials, granting temporary write or read permissions for a specific object key. Instead of routing multi-gigabyte video or image streams through the backend server (saturating server network bandwidth and RAM), the client uploads the file directly to S3 storage over AWS edge networks."
      },
      {
        category: "WHY",
        question: "Why is S3 Multipart Upload mandatory for files larger than 100MB in production systems?",
        answerExplanation: "Single-part uploads must transfer the entire file in one continuous stream; a single network drop at 99% forces the user to re-upload from 0%. Multipart uploads divide the file into independent 5MB-50MB chunks that upload concurrently, allow individual chunk retries on failure, and assemble atomically on S3 once all parts finish."
      },
      {
        category: "HOW",
        question: "How do you securely validate file types and prevent malicious executable uploads when using pre-signed upload URLs?",
        answerExplanation: "Never trust file extensions. When generating the pre-signed URL, enforce strict upload conditions: (1) sign the exact Content-Type header (e.g., image/png), (2) specify content-length-range bounds, (3) configure an asynchronous AWS Lambda or worker triggered by S3 ObjectCreated events to inspect the magic bytes (file header signatures) and quarantine invalid files."
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
    timeEstimates: {
      video: "4 hrs 59 min",
      reading: "40 min",
      lab: "60 min",
      total: "6 hrs 40 min"
    },
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
      title: "Elasticsearch Reference Architecture",
      author: "Elastic Documentation Team",
      keyChapters: "Documents, Indices, and Inverted Index Mapping",
      whyReadThis: "Official deep-dive into how Elasticsearch tokens, analyzers, and inverted indexes enable sub-second full-text and fuzzy search.",
      readingUrl: "https://www.elastic.co/guide/en/elasticsearch/reference/current/documents-indices.html"
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
        category: "WHAT",
        question: "What is an Inverted Index in Elasticsearch / Lucene, and how does it enable sub-millisecond search across millions of documents?",
        answerExplanation: "An inverted index is a mapping between individual words (tokens) and the specific documents containing them, similar to the index at the back of a book. Instead of scanning entire text columns on disk (like SQL LIKE %term%), Elasticsearch looks up the search term in a sorted dictionary in memory and instantly retrieves the posting list of matching document IDs in O(1) time."
      },
      {
        category: "WHY",
        question: "Why is Elasticsearch an anti-pattern when used as a primary system of record for transactional data?",
        answerExplanation: "Elasticsearch is built for near-real-time search and analytics, not ACID transactions. Writes are acknowledged once written to memory buffers and translog, but are only searchable after index refresh (default 1 second). It lacks multi-document transactions, foreign key constraints, and can lose data during network partitions or split-brain cluster states. Primary data must reside in PostgreSQL."
      },
      {
        category: "HOW",
        question: "How do you synchronize data between a PostgreSQL primary database and an Elasticsearch cluster without dual-write inconsistency?",
        answerExplanation: "Use Change Data Capture (CDC) via PostgreSQL Write-Ahead Logs (WAL) and Debezium/Kafka Connect, or read from a Transactional Outbox table. Every committed DB mutation produces a WAL event that streams asynchronously into Elasticsearch. If Elasticsearch crashes, the CDC consumer resumes from its last committed offset without losing records."
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
    timeEstimates: {
      video: "32 min",
      reading: "30 min",
      lab: "45 min",
      total: "1 hr 45 min"
    },
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
      title: "RFC 9457: Problem Details for HTTP APIs (IETF Standard)",
      author: "Mark Nottingham, Erik Wilde & Sanjay Dalal",
      keyChapters: "RFC 9457 Specification (Standardizing Machine-Readable Error Responses)",
      whyReadThis: "The official IETF standard defining type, title, status, and detail schemas for robust, consistent API error responses.",
      readingUrl: "https://datatracker.ietf.org/doc/html/rfc9457"
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
        category: "WHAT",
        question: "What is the RFC 7807 / RFC 9457 Problem Details specification, and what core fields must it include?",
        answerExplanation: "RFC 9457 standardizes machine-readable error responses for HTTP APIs using application/problem+json. It defines five standard fields: type (a URI identifier for the error type), title (a short human-readable summary), status (the HTTP status code), detail (a human-readable explanation specific to this occurrence), and instance (a URI reference identifying the specific occurrence, such as /errors/err_123)."
      },
      {
        category: "WHY",
        question: "Why must internal stack traces, SQL syntax errors, and database connection strings never leak to clients in production API responses?",
        answerExplanation: "Leaking stack traces and database errors gives attackers critical intelligence regarding your software stack, database dialect, table names, file paths, and vulnerable third-party libraries (Information Disclosure vulnerability). It also creates confusing, unparseable responses for frontend clients. Internal details belong in private structured logs."
      },
      {
        category: "HOW",
        question: "How do you architect an Error Translation Boundary that maps low-level database and infrastructure errors to high-level domain errors?",
        answerExplanation: "Wrap repository and external client errors inside typed domain errors (e.g., wrap PostgreSQL error 23505 unique violation into ErrEmailAlreadyRegistered). Controllers catch typed domain errors and map them to HTTP status codes (e.g., ErrEmailAlreadyRegistered -> HTTP 409 Conflict) with clean RFC 9457 messages, while logging the original raw error and stack trace privately."
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
    timeEstimates: {
      video: "30 min",
      reading: "30 min",
      lab: "45 min",
      total: "1 hr 45 min"
    },
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
      keyChapters: "Factor III: Config (Store Configuration in the Environment)",
      whyReadThis: "The canonical cloud-native engineering manifesto on strict separation of code from configuration, 12-factor env vars, and fail-fast startup.",
      readingUrl: "https://12factor.net/config"
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
        category: "WHAT",
        question: "What is the Twelve-Factor App methodology principle regarding configuration, and what is the difference between build-time and runtime config?",
        answerExplanation: "Twelve-Factor config requires strict separation of config from code, storing all environment-specific variables (database URLs, API secrets, feature flags) in the environment. Build-time config is baked into the immutable image/bundle at compile time and must never contain secrets. Runtime config is injected dynamically when the container boots, allowing the identical binary to run across Dev, Staging, and Prod."
      },
      {
        category: "WHY",
        question: "Why should a backend service crash immediately (Fail-Fast) on boot if required environment variables are missing or malformed?",
        answerExplanation: "If a service starts with missing configuration (like a missing Stripe API key or invalid DB connection string), it enters an unhealthy zombie state: it passes basic liveness probes, accepts customer requests, and then crashes unpredictably in the middle of transactions. Failing fast on boot alerts engineers and triggers automated deployment rollback immediately."
      },
      {
        category: "HOW",
        question: "How do you validate environment variables at service startup using a strict schema validator?",
        answerExplanation: "In the application entrypoint (e.g., config.ts or Go config.go), pass process.env through a strict schema validator (Zod, Envalid, or Go envconfig). Define types, default values, and formats (e.g., PORT: z.coerce.number().default(8080), DATABASE_URL: z.string().url()). If parsing throws an error, log the missing fields and invoke process.exit(1)."
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
    timeEstimates: {
      video: "4 hrs 57 min",
      reading: "40 min",
      lab: "60 min",
      total: "6 hrs 35 min"
    },
    youtubeId: "cYAE0ZhT43c",
    youtubeChannelUrl: CHANNEL_URL,
    secondaryVideo: {
      youtubeId: "QoDqxm7ybLc",
      title: "How Prometheus Monitoring Works | Architecture Explained",
      duration: "22 min",
      description: "TechWorld with Nana breaks down Prometheus metrics architecture, scrape targets, pull vs push models, Alertmanager, and Grafana dashboards."
    },
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
      title: "Site Reliability Engineering (Google SRE Book - Free Online)",
      author: "Betsy Beyer, Chris Jones, Jennifer Petoff & Niall Murphy (Google)",
      keyChapters: "Chapter 6: Monitoring Distributed Systems (The 4 Golden Signals: Latency, Traffic, Errors, Saturation)",
      whyReadThis: "Google's landmark SRE book, completely free online, defining production telemetry, RED metrics, and alerting strategies.",
      readingUrl: "https://sre.google/sre-book/monitoring-distributed-systems/"
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
        category: "WHAT",
        question: "What are the Three Pillars of Observability (Logs, Metrics, Traces), and how do their roles differ?",
        answerExplanation: "Metrics are numeric, aggregated timeseries data (counters, gauges, histograms) for alerting and detecting that something is wrong (e.g., HTTP 5xx rate > 1%). Traces track the journey of a single request across multiple microservices, showing where latency or failure occurred. Logs are detailed, timestamped event records providing deep context on why the failure happened inside a specific service."
      },
      {
        category: "WHY",
        question: "Why is structured JSON logging with a logger like Pino or Winston mandatory in production instead of console.log?",
        answerExplanation: "console.log emits unstructured text strings that are difficult to parse and index at scale, and in runtimes like Node.js, console.log is synchronous and blocks the event loop under heavy volume. Structured loggers emit single-line JSON objects with standard fields (level, time, trace_id, message) that centralized log collectors (Datadog, ELK, Loki) parse, query, and alert on effortlessly."
      },
      {
        category: "HOW",
        question: "How do you implement the RED Method (Rate, Errors, Duration) for monitoring backend HTTP services using Prometheus?",
        answerExplanation: "Define Prometheus metrics in an HTTP middleware: (1) Rate: A counter http_requests_total{method, path, status} measuring requests per second, (2) Errors: Calculate error rate from the same counter where status =~ '5..', (3) Duration: A histogram http_request_duration_seconds{method, path} measuring request latencies into percentiles (p50, p95, p99) to detect latency degradation."
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
    timeEstimates: {
      video: "36 min",
      reading: "30 min",
      lab: "45 min",
      total: "1 hr 50 min"
    },
    youtubeId: "6rfBgphiCWM",
    youtubeChannelUrl: CHANNEL_URL,
    secondaryVideo: {
      youtubeId: "3Lis4w4_bBc",
      title: "8 Critical Rules for Designing Fault-Tolerant Distributed Systems",
      duration: "9 min",
      description: "ByteByteGo illustrates redundancy, circuit breakers, graceful degradation, health probes, and self-healing mechanisms under real-world infrastructure failures."
    },
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
      title: "The Twelve-Factor App",
      author: "Adam Wiggins",
      keyChapters: "Factor IX: Disposability (Maximize Robustness with Fast Startup and Graceful Shutdown)",
      whyReadThis: "The canonical principle for handling SIGTERM signals, connection draining, and zero-downtime rolling deploys.",
      readingUrl: "https://12factor.net/disposability"
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
        category: "WHAT",
        question: "What happens during a graceful shutdown when a Kubernetes pod receives a SIGTERM signal?",
        answerExplanation: "When SIGTERM is emitted, the service should: (1) stop accepting new incoming TCP connections on its listening port, (2) inform load balancers to deregister the instance from routing, (3) allow all currently in-flight HTTP requests and background database transactions to complete within a grace period (e.g., 30s), (4) close database connection pools and message broker sockets cleanly, and (5) exit with code 0."
      },
      {
        category: "WHY",
        question: "Why does killing a backend process abruptly with SIGKILL (-9) cause database lock contention and corrupted file writes?",
        answerExplanation: "SIGKILL terminates the operating system process instantly without executing language cleanup handlers, defer statements, or finally blocks. In-flight database transactions remain open on the database server until connection timeout detection terminates them, holding table locks and blocking other active queries. Partially written files or network socket buffers become corrupted."
      },
      {
        category: "HOW",
        question: "How do you implement a graceful shutdown handler in Node.js or Go that waits for active HTTP requests to drain?",
        answerExplanation: "Listen for SIGINT and SIGTERM. Upon receipt, call server.close() (which stops accepting new connections but keeps existing sockets open). Start a fallback deadline timer (e.g., 25 seconds). When the server's close callback fires, close database pools (await db.end()) and Redis connections. If the deadline fires first, log a timeout warning and force exit with process.exit(1)."
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
    timeEstimates: {
      video: "31 min",
      reading: "35 min",
      lab: "45 min",
      total: "1 hr 50 min"
    },
    youtubeId: "oV9rvDllKEg",
    youtubeChannelUrl: CHANNEL_URL,
    secondaryVideo: {
      youtubeId: "DKScGZb3j6E",
      title: "Distributed Locking Strategies (Redlock, ZooKeeper, etcd)",
      duration: "15 min",
      description: "ByteByteGo's system design breakdown of preventing double-booking race conditions across multi-instance clusters using Redis distributed locks and fencing tokens."
    },
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
      title: "Redis Distributed Systems Patterns",
      author: "Salvatore Sanfilippo (antirez)",
      keyChapters: "Distributed Locks with Redis (The Redlock Algorithm & Fencing Tokens)",
      whyReadThis: "The definitive technical guide on coordinating mutual exclusion across multi-instance clusters and preventing race conditions.",
      readingUrl: "https://redis.io/docs/latest/develop/use/patterns/distributed-locks/"
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
        category: "WHAT",
        question: "What is a Data Race, and what is the difference between Pessimistic Locking and Optimistic Locking for preventing race conditions?",
        answerExplanation: "A Data Race occurs when two concurrent threads/goroutines access the same memory or database record simultaneously and at least one access is a write. Pessimistic Locking locks the record in the database (SELECT ... FOR UPDATE), forcing other transactions to wait in line. Optimistic Locking adds a version integer column; updates execute without locking (UPDATE items SET qty = qty - 1, version = version + 1 WHERE id = 1 AND version = 5), aborting or retrying if another transaction incremented the version first."
      },
      {
        category: "WHY",
        question: "Why is an in-memory Mutex insufficient for preventing race conditions in horizontally scaled multi-instance backends?",
        answerExplanation: "An in-memory mutex (like sync.Mutex in Go or semaphore locks in Node.js) only synchronizes threads or coroutines running inside a single operating system process on a single machine. In a production cluster running 10 pod instances, each instance has its own isolated memory, so concurrent requests hitting different pods will execute simultaneous conflicting writes without blocking each other."
      },
      {
        category: "HOW",
        question: "How do you implement a distributed lock using Redis (Redlock pattern) to prevent concurrent double-booking of a single inventory item?",
        answerExplanation: "Acquire a lock by setting a unique key with a random UUID and TTL: SET lock:inventory:123 <random_uuid> NX PX 10000. If successful, the worker owns the lock and executes the business logic. To release the lock safely without accidentally releasing another worker's expired lock, execute a Lua script that checks if GET key == random_uuid, deleting the key only if the values match."
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
    timeEstimates: {
      video: "2 hrs 10 min",
      reading: "40 min",
      lab: "60 min",
      total: "3 hrs 50 min"
    },
    youtubeId: "fqMOX6JJhGo",
    youtubeChannelUrl: "https://www.youtube.com/@TechWorldwithNana",
    shortSummary: "Horizontal scaling, load balancing, Testcontainers integration testing, multi-stage Docker builds, and automated CI/CD quality gates.",
    secondaryVideo: {
      youtubeId: "X48VuDVv0do",
      title: "Kubernetes Tutorial for Beginners [Full Course in 4 Hours]",
      duration: "4 hrs",
      description: "TechWorld with Nana's definitive deep dive into Kubernetes architecture, Pods, Services, Ingress, ConfigMaps, Secrets, Volumes, and zero-downtime rolling deployments."
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
      title: "Docker Architecture & Container Concepts",
      author: "Docker Documentation Team",
      keyChapters: "Containerization Basics: Namespaces, cgroups, Multi-Stage Builds & Isolation",
      whyReadThis: "Official guide on container primitives, deterministic packaging, minimal production runtime images, and CI/CD pipelines.",
      readingUrl: "https://docs.docker.com/get-started/docker-concepts/the-basics/what-is-a-container/"
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
        category: "WHAT",
        question: "What are the core differences between testing with in-memory mocks versus real containerized dependencies using Testcontainers?",
        answerExplanation: "In-memory mocks (mocking DB queries or Redis clients) test your application logic against assumptions of how the database behaves, often missing real-world SQL syntax errors, transaction isolation anomalies, foreign key constraints, and specific PostgreSQL extension behaviors. Testcontainers programmatically spins up real, ephemeral Docker containers for PostgreSQL and Redis during test runs, executing true integration tests against real databases."
      },
      {
        category: "WHY",
        question: "Why are multi-stage Docker builds essential for production backend security and performance?",
        answerExplanation: "Multi-stage builds separate the compile/build environment from the final production runtime image. Heavy compilers (Go compiler, TypeScript tsc), development dependencies (devDependencies, build tools), and source code remain behind in early build stages. The final image copies only the compiled binary or stripped production files into a minimal, rootless base image (e.g., alpine or distroless), shrinking image size from 1.5GB to <50MB and drastically reducing vulnerabilities and attack surface."
      },
      {
        category: "HOW",
        question: "How do you implement zero-downtime rolling deployments and blue-green health check gates without dropping in-flight requests?",
        answerExplanation: "Configure two distinct health probes: a livenessProbe (detects if the process crashed) and a readinessProbe (verifies the service has established DB connections and is ready to accept traffic). During a rolling deployment, the load balancer only routes traffic to new pods after they pass the readinessProbe. The old pods receive SIGTERM, stop accepting new traffic, finish processing current requests, and exit cleanly, achieving 100% zero dropped requests."
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
    capstoneProject: CAPSTONE_PROJECTS[1],
  },
  {
    id: 2,
    name: "Core API Architecture & Request Lifecycle",
    description: "Architect clean, modular backend applications: Middlewares, request contexts, input validation, layered architecture, RESTful standards, and state mutations.",
    topics: ROADMAP_TOPICS.filter((t) => t.phaseId === 2),
    capstoneProject: CAPSTONE_PROJECTS[2],
  },
  {
    id: 3,
    name: "Data Persistence & Storage",
    description: "Master relational and in-memory persistence: PostgreSQL internals, ACID transactions, relational modeling, indexing performance, domain invariants, and caching architectures.",
    topics: ROADMAP_TOPICS.filter((t) => t.phaseId === 3),
    capstoneProject: CAPSTONE_PROJECTS[3],
  },
  {
    id: 4,
    name: "Security & Access Control",
    description: "Secure APIs and backend systems: Authentication, cryptographic tokens, role and attribute-based authorization, and OWASP API Top 10 hardening.",
    topics: ROADMAP_TOPICS.filter((t) => t.phaseId === 4),
    capstoneProject: CAPSTONE_PROJECTS[4],
  },
  {
    id: 5,
    name: "Asynchronous Systems & Integrations",
    description: "Decouple synchronous HTTP flows: Task queuing, background workers, transactional email, webhooks with HMAC, real-time websockets/SSE, object storage, and full-text search.",
    topics: ROADMAP_TOPICS.filter((t) => t.phaseId === 5),
    capstoneProject: CAPSTONE_PROJECTS[5],
  },
  {
    id: 6,
    name: "Reliability, Resilience & Observability",
    description: "Build production-resilient systems: RFC 7807/9457 Problem Details, 12-factor configuration, OpenTelemetry logging/metrics, and graceful shutdown signal handling.",
    topics: ROADMAP_TOPICS.filter((t) => t.phaseId === 6),
    capstoneProject: CAPSTONE_PROJECTS[6],
  },
  {
    id: 7,
    name: "Advanced Engineering, Scale & Operations",
    description: "Operate at high volume: Concurrency, race conditions, distributed locks, database scaling, read replicas, Testcontainers, and containerized CI/CD pipelines.",
    topics: ROADMAP_TOPICS.filter((t) => t.phaseId === 7),
    capstoneProject: CAPSTONE_PROJECTS[7],
  },
];
