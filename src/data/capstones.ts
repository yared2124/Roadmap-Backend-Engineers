import { CapstoneProject } from "../types/roadmap";

export const CAPSTONE_PROJECTS: Record<number, CapstoneProject> = {
  1: {
    id: "capstone-phase-1",
    phaseId: 1,
    phaseName: "Foundations & Web Protocols",
    shortName: "RawHTTP",
    subtitle: "Zero-Dependency RFC 9112 Web Server & Radix Trie Router",
    title: "RawHTTP: Zero-Dependency HTTP/1.1 Web Server & Radix-Tree Router",
    pitch: "Build a blazing-fast, framework-free HTTP/1.1 micro-engine from raw TCP sockets. Parse byte streams, route with an O(k) prefix trie, and safely serialize 64-bit integers with zero precision loss.",
    highlights: [
      "Raw TCP Sockets (5,000+ req/s)",
      "O(k) Radix Prefix Trie Router",
      "IEEE 754 Safe 64-Bit Serializer"
    ],
    difficulty: "Intermediate",
    estimatedHours: "10-15 hrs",
    scenario: "You are tasked with building a high-performance HTTP/1.1 micro-framework from first principles without using existing web frameworks (no Express, Fastify, Gin, or Actix). Your engine must listen on raw TCP sockets, parse incoming HTTP byte frames according to RFC 9112, dispatch requests using an edge-optimized Radix Tree, safely serialize 64-bit integers without precision loss, and enforce idempotency semantics on non-mutating routes.",
    keyDeliverables: [
      "Raw TCP Socket Listener: Open a TCP socket, manage connection life-cycles, handle client keep-alive, and parse HTTP/1.1 byte buffers across CRLF delimiters.",
      "RFC-Compliant HTTP Parser: Extract HTTP method, URI, headers, Content-Length, and chunked transfer encoding bodies.",
      "Radix Tree (Prefix Trie) Router: O(k) path matching supporting exact routes (/api/v1/health), parameterized segments (/users/:id), and wildcard catch-alls (/static/*filepath).",
      "Precision-Safe Serializer: Dual JSON and Protobuf support ensuring 64-bit integer IDs (Snowflake IDs) are preserved without JavaScript IEEE 754 precision loss.",
      "Idempotency Middleware: Cache and replay identical responses for repeated GET and idempotent PUT requests based on incoming Idempotency-Key headers."
    ],
    techStack: ["Go (net package)", "Node.js (net module + TypeScript)", "C++ / Rust", "Zero External Web Frameworks"],
    architectureDiagram: `+-------------------------------------------------------------------+
|                        TCP Client (cURL / Browser)                |
+-------------------------------------------------------------------+
                                  |
                                  v
+-------------------------------------------------------------------+
|               Raw TCP Socket Listener (Port 8080)                 |
|       [Connection Pool & Non-blocking Event Loop / Goroutines]    |
+-------------------------------------------------------------------+
                                  |  Raw Byte Stream
                                  v
+-------------------------------------------------------------------+
|                    RFC 9112 HTTP Byte Parser                      |
|         - Method, Path, HTTP/1.1, Headers, Chunked Body           |
+-------------------------------------------------------------------+
                                  |  Parsed HttpRequest Context
                                  v
+-------------------------------------------------------------------+
|                   Radix Tree (Compact Prefix Trie)                |
|           /api/v1/users                                           |
|                  |--> /:id (Param Node)                           |
|                  |--> /search (Static Node)                       |
+-------------------------------------------------------------------+
                                  |
                                  v
+-------------------------------------------------------------------+
|         Handler / Controller + Safe 64-bit Serialization          |
+-------------------------------------------------------------------+`,
    acceptanceCriteria: [
      "Running 'ab -n 5000 -c 50 http://localhost:8080/api/v1/health' achieves >5,000 req/sec with 0 dropped sockets.",
      "Requests to '/api/v1/items/9007199254740995' correctly bind parameter ':id' as a 64-bit integer without bit truncation.",
      "Malformed HTTP requests (missing Host header, invalid Content-Length, unsupported protocol version) return standard HTTP 400 Bad Request or 505 Version Not Supported.",
      "Unit test suite covers Radix tree lookups, param collisions, and chunked transfer decoding with >80% test coverage."
    ],
    githubSubmissionGuide: {
      recommendedRepoName: "raw-http-server-radix",
      folderStructure: `raw-http-server/
├── cmd/
│   └── server/          # Main entrypoint
├── internal/
│   ├── tcp/             # Socket listener & connection management
│   ├── http/            # RFC parser & request/response types
│   ├── router/          # Radix tree implementation
│   └── serializer/      # JSON & Protobuf encoders
├── tests/
│   ├── benchmark_test   # Throughput and latency benchmarks
│   └── router_test      # Radix path resolution tests
├── README.md            # Architecture decisions, benchmarks & usage
└── Makefile             # Build, test, and run commands`,
      readmeChecklist: [
        "Include architecture diagram and explanation of the Radix Tree structure.",
        "Provide benchmark comparison (e.g., ApacheBench or wrk) showing requests per second and p99 latency.",
        "Include instructions for running tests and verifying 64-bit integer safety."
      ]
    }
  },
  2: {
    id: "capstone-phase-2",
    phaseId: 2,
    phaseName: "Core API Architecture & Request Lifecycle",
    shortName: "OrderFlow",
    subtitle: "Layered API Architecture with Context Cancellation & Onion Pipeline",
    title: "OrderFlow: Production-Grade Layered API with Middlewares & Cancellation Deadlines",
    pitch: "Engineer a bulletproof e-commerce checkout service with strict Layered Architecture. Enforce context cancellation deadlines across I/O, shield against Mass Assignment with strict DTOs, and emit RFC 9457 errors.",
    highlights: [
      "Context Cancellation Deadlines",
      "Strict Onion Middleware Pipeline",
      "RFC 9457 Problem Details Spec"
    ],
    difficulty: "Advanced",
    estimatedHours: "15-20 hrs",
    scenario: "Build a production-grade e-commerce Order Processing and Checkout backend following strict Layered Architecture (Controller -> Service -> Repository). The system must enforce an Onion Middleware pipeline, pass cancellation deadlines via Request Context across all downstream I/O operations, validate inputs with strict DTOs (preventing Mass Assignment attacks), and output RFC 9457 Problem Details error responses.",
    keyDeliverables: [
      "Onion Middleware Pipeline: Outermost Panic/Recovery middleware, Correlation ID (X-Request-ID) generator, structured JSON access logger, and sliding-window rate limiter.",
      "Request Context Cancellation: Enforce a 3-second hard deadline on order checkout. If the client disconnects or times out, immediately abort active PostgreSQL transactions and payment HTTP calls.",
      "Strict DTO Schema Guards: Enforce strict schema parsing rejecting unexpected fields (Mass Assignment defense) and sanitize user inputs.",
      "Transport-Agnostic Service Layer: Core order business logic implemented purely in domain services with zero HTTP dependencies (req, res, status codes), fully unit-testable.",
      "RFC 9457 Problem Details: All client and system errors formatted with standard type, title, status, detail, and instance attributes."
    ],
    techStack: ["TypeScript (Fastify / Express + Zod)", "Go (Chi / Gin + validator)", "PostgreSQL 16", "Docker Compose"],
    architectureDiagram: `[ Client Request ]
       |
       v
+-------------------------------------------------------------------+
|                     ONION MIDDLEWARE PIPELINE                     |
|  1. Panic Recovery & Error Translator (RFC 9457)                  |
|  2. Correlation ID Generator (X-Request-ID)                       |
|  3. Context Timeout Deadline Enforcer (3000ms max)                |
|  4. Sliding-Window Rate Limiter                                   |
+-------------------------------------------------------------------+
                                  |
                                  v
+-------------------------------------------------------------------+
|               CONTROLLER / TRANSPORT LAYER                        |
|  - Parse DTO & enforce strict schema (.strict() validation)       |
|  - Extract Authenticated Claims & Context                         |
+-------------------------------------------------------------------+
                                  |  Clean Domain Input
                                  v
+-------------------------------------------------------------------+
|                 BUSINESS SERVICE LAYER (Pure Domain)              |
|  - Order Invariant Validation & Inventory Reservation             |
|  - Check context.Err() before executing heavy operations         |
+-------------------------------------------------------------------+
                                  |
                                  v
+-------------------------------------------------------------------+
|                     REPOSITORY / PERSISTENCE                      |
|  - PostgreSQL Query with context cancellation                     |
+-------------------------------------------------------------------+`,
    acceptanceCriteria: [
      "Aborting a slow checkout request midway via client disconnect immediately cancels the pending database query within 50ms.",
      "Posting payloads with forbidden fields (e.g., {'role': 'admin', 'discount': 100}) returns HTTP 422 with RFC 9457 JSON detailing the disallowed keys.",
      "All service methods are covered by unit tests using in-memory mock repositories without spinning up HTTP servers or real databases.",
      "Every outgoing log entry contains the exact correlation ID corresponding to the client's request."
    ],
    githubSubmissionGuide: {
      recommendedRepoName: "orderflow-layered-api",
      folderStructure: `orderflow/
├── src/
│   ├── middlewares/     # Recovery, RequestID, Timeout, RateLimiter
│   ├── controllers/     # HTTP route handlers
│   ├── dtos/            # Zod / Validator schemas with RFC 9457 mappers
│   ├── services/        # Pure business logic
│   ├── repositories/    # Database queries & interfaces
│   └── errors/          # RFC 9457 Domain exceptions
├── tests/
│   ├── unit/            # Service unit tests with repository mocks
│   └── integration/     # End-to-end API lifecycle & cancellation tests
├── docker-compose.yml   # PostgreSQL + App container
└── README.md`,
      readmeChecklist: [
        "Document middleware ordering rationale and context cancellation flow.",
        "Provide sample cURL commands demonstrating RFC 9457 error responses.",
        "Include proof of context cancellation (logs showing DB query termination upon client abort)."
      ]
    }
  },
  3: {
    id: "capstone-phase-3",
    phaseId: 3,
    phaseName: "Data Persistence & Storage",
    shortName: "FinLedger",
    subtitle: "Bank-Grade Double-Entry Ledger with MVCC & Bloom Filtering",
    title: "FinLedger: High-Throughput Double-Entry Ledger with MVCC & Bloom Caching",
    pitch: "Architect a high-concurrency double-entry monetary ledger capable of thousands of concurrent transfers without deadlocks. Leverage deterministic lock sorting, anti-stampede caching, and Bloom filters.",
    highlights: [
      "Deadlock-Free Transfer Protocol",
      "XFetch Anti-Stampede Redis Cache",
      "Sub-5ms Indexed Ledger Queries"
    ],
    difficulty: "Senior",
    estimatedHours: "20-25 hrs",
    scenario: "Architect and implement a bank-grade double-entry financial ledger service capable of processing thousands of concurrent monetary transfers between accounts without deadlocks, balance anomalies, or race conditions. Implement ACID guarantees with strict lock ordering, solve the N+1 query problem, eliminate Cache Stampedes using Redis probabilistic early expiration (XFetch), and protect the database from phantom lookups using Bloom Filters.",
    keyDeliverables: [
      "Double-Entry General Ledger Schema: Third Normal Form (3NF) relational schema with ledger entries, transactions, and immutable audit logs with CHECK (amount > 0) constraints.",
      "Deadlock-Free Transfer Protocol: Deterministic lock ordering protocol (sorting account IDs before acquiring SELECT ... FOR UPDATE) preventing database deadlocks under high concurrency.",
      "Optimized Query Performance & Anti-N+1: Multi-column composite B-Tree indexes and DataLoader/JOIN strategies verified via EXPLAIN (ANALYZE, BUFFERS) with 0 sequential table scans.",
      "Cache-Aside with XFetch: Redis balance caching utilizing the XFetch probabilistic early expiration algorithm to prevent cache stampedes on viral accounts.",
      "Bloom Filter Front-Guard: In-memory or Redis Bloom Filter that rejects lookups for non-existent account IDs before executing database queries."
    ],
    techStack: ["PostgreSQL 16", "Redis 7 (RedisBloom)", "PgBouncer", "Go or TypeScript", "Testcontainers"],
    architectureDiagram: `[ Client Transfer Request: Acc A -> Acc B ]
                        |
                        v
+-------------------------------------------------------------------+
|                       API Gateway / Service                       |
+-------------------------------------------------------------------+
       |                                          |
       | 1. Check Bloom Filter                    | 2. Balance Cache (XFetch)
       v                                          v
+-------------------------------+      +----------------------------+
|      Redis Bloom Filter       |      |     Redis Balance Cache    |
| (Instantly drops phantom IDs) |      | (Early refresh on beta-TTL)|
+-------------------------------+      +----------------------------+
                                  |
                                  v
+-------------------------------------------------------------------+
|               POSTGRESQL TRANSACTION (SERIALIZABLE / MVCC)        |
|  1. Sort Account IDs: [Min(A, B), Max(A, B)]                      |
|  2. SELECT ... FOR UPDATE (Acquires locks in deterministic order) |
|  3. Validate Invariants: (Balance >= TransferAmount)              |
|  4. INSERT Ledger Entries (Debit & Credit must sum to 0)          |
|  5. COMMIT / Invalidate Cache                                     |
+-------------------------------------------------------------------+`,
    acceptanceCriteria: [
      "Concurrency stress test: 200 concurrent transfers back and forth between two accounts complete with 0 deadlock errors and exact balanced book sums.",
      "Simulated cache stampede on expired key with 1,000 concurrent requests results in exactly 1 background database query.",
      "EXPLAIN ANALYZE on account statement generation verifies index scan with <5ms execution time across 1,000,000 rows.",
      "Bloom filter eliminates >99% of invalid account lookups before hitting PostgreSQL."
    ],
    githubSubmissionGuide: {
      recommendedRepoName: "finledger-double-entry",
      folderStructure: `finledger/
├── migrations/          # SQL DDL migrations with indexes & constraints
├── src/
│   ├── ledger/          # Transfer engine & deterministic lock sorting
│   ├── cache/           # XFetch algorithm & Redis Bloom filter
│   └── db/              # PgBouncer connection pool & repository
├── tests/
│   ├── stress_test/     # Concurrency & deadlock chaos tests
│   └── explain_test/    # EXPLAIN ANALYZE index verification
├── docker-compose.yml   # Postgres, Redis, PgBouncer
└── README.md`,
      readmeChecklist: [
        "Include mathematical proof and explanation of the deterministic lock ordering protocol.",
        "Provide EXPLAIN ANALYZE query plan outputs proving index efficiency.",
        "Demonstrate concurrent stress test results verifying zero balance drift."
      ]
    }
  },
  4: {
    id: "capstone-phase-4",
    phaseId: 4,
    phaseName: "Security & Access Control",
    shortName: "SentinelAuth",
    subtitle: "Zero-Trust Identity Gateway with Refresh Token Theft Detection",
    title: "SentinelAuth: Zero-Trust Identity Gateway with Token Rotation & Sliding Rate Limiting",
    pitch: "Construct an enterprise identity fortress with asymmetric RS256 JWTs, refresh token family rotation with instant replay theft detection, fine-grained ABAC authorization, and sliding-window rate limiting.",
    highlights: [
      "Automatic Token Theft Revocation",
      "Fine-Grained Dynamic ABAC Policies",
      "Sub-ms Redis Sliding Rate Limiter"
    ],
    difficulty: "Senior",
    estimatedHours: "15-20 hrs",
    scenario: "Build a production-grade Zero-Trust Identity, Authentication, and Authorization gateway. The service must issue short-lived asymmetric JWTs, implement Refresh Token Rotation with automatic theft detection (family invalidation), enforce fine-grained Attribute-Based Access Control (ABAC), protect against IDOR/BOLA attacks via scoped database repositories, and implement a distributed sliding-window rate limiter on Redis.",
    keyDeliverables: [
      "Asymmetric JWT Architecture: RS256/EdDSA signed 15-minute access tokens with public key verification across microservices.",
      "Refresh Token Rotation with Theft Detection: Refresh token family tracking. Replaying an already-consumed refresh token immediately triggers family revocation and alerts the user.",
      "Secure Cookie Management: Tokens stored strictly in httpOnly, Secure, SameSite=Strict cookies with CSRF double-submit tokens for mutating endpoints.",
      "Declarative ABAC Policy Guard: Dynamic authorization evaluating user attributes, resource sensitivity, IP subnet whitelist, and working hour constraints.",
      "Distributed Sliding-Window Rate Limiter: Redis Sorted Set (ZSET) implementation tracking request timestamps with sub-millisecond precision."
    ],
    techStack: ["Node.js / Go", "Redis 7", "PostgreSQL 16", "OpenSSL (RS256 keys)", "Argon2id for password hashing"],
    architectureDiagram: `[ Client (Cookie: RefreshToken) ]
                  |
                  v
+-------------------------------------------------------------------+
|               SENTINELAUTH IDENTITY GATEWAY                       |
|  1. Sliding Window Rate Limiter (Redis ZSET: 60 req/min)          |
|  2. CSRF Token Guard & CORS Origin Whitelist                      |
+-------------------------------------------------------------------+
                  |
                  v
+-------------------------------------------------------------------+
|                REFRESH TOKEN ROTATION ENGINE                      |
|  - Lookup Token in Database Family Tree                           |
|  - IF token.used == true:                                         |
|      -> THEFT DETECTED! Revoke all tokens in family               |
|      -> Return HTTP 401 Unauthorized                              |
|  - IF token.valid == true:                                        |
|      -> Mark current token USED                                   |
|      -> Issue new Access Token (RS256) + new Refresh Token        |
+-------------------------------------------------------------------+
                  |
                  v
+-------------------------------------------------------------------+
|              ABAC POLICY ENGINE (Policy Enforcement Point)        |
|  - Evaluate: Subject + Resource + Action + Environment Context    |
|  - Scoped Query: WHERE tenant_id = ctx.tenant_id (IDOR Defense)   |
+-------------------------------------------------------------------+`,
    acceptanceCriteria: [
      "Replaying a previously used refresh token revokes all associated active sessions and logs a critical security alert.",
      "Passwords hashed using Argon2id with memory cost >= 64MB and time cost >= 3 iterations.",
      "Sending 61 requests within a 60-second sliding window triggers HTTP 429 Too Many Requests with accurate Retry-After header.",
      "IDOR test suite verifies that modifying another tenant's resource returns HTTP 404/403 with 0 rows mutated."
    ],
    githubSubmissionGuide: {
      recommendedRepoName: "sentinel-auth-gateway",
      folderStructure: `sentinel-auth/
├── certs/               # Asymmetric public/private key pairs
├── src/
│   ├── auth/            # JWT issuance, Argon2id, Token rotation
│   ├── abac/            # Policy rules & evaluation engine
│   ├── ratelimit/       # Redis sliding-window ZSET implementation
│   └── tenant/          # Tenant-scoped repository abstractions
├── tests/
│   ├── token_theft_test # Simulation of replay attacks
│   └── idor_test        # Cross-tenant data isolation tests
├── docker-compose.yml
└── README.md`,
      readmeChecklist: [
        "Explain Refresh Token Rotation and theft detection mechanics with a flow diagram.",
        "Document the Redis Lua script / pipeline used for the sliding-window rate limiter.",
        "Provide security verification checklist (Argon2id parameters, cookie flags, and ABAC policies)."
      ]
    }
  },
  5: {
    id: "capstone-phase-5",
    phaseId: 5,
    phaseName: "Asynchronous Systems & Integrations",
    shortName: "EventPulse",
    subtitle: "Resilient Webhook Dispatch Platform with Transactional Outbox",
    title: "EventPulse: Resilient Webhook Delivery Engine with Transactional Outbox & Kafka",
    pitch: "Build an enterprise event delivery engine guaranteeing zero message loss. Ingest with constant-time HMAC verification in under 30ms, publish via Transactional Outbox, and dispatch with exponential jittered retries.",
    highlights: [
      "Zero Event Loss Transactional Outbox",
      "Constant-Time HMAC Verification",
      "Exponential Jitter Retries & DLQ"
    ],
    difficulty: "Staff",
    estimatedHours: "20-25 hrs",
    scenario: "Build an enterprise-grade asynchronous event streaming and webhook dispatch platform (similar to Stripe Webhooks). The system must ingest incoming partner events with HMAC-SHA256 verification in constant time, guarantee zero event loss via the Transactional Outbox Pattern, process deliveries asynchronously with exponential backoff and jitter, isolate dead letters (DLQ), and stream real-time delivery telemetry over WebSockets/SSE.",
    keyDeliverables: [
      "High-Throughput Webhook Ingestion: Validate HMAC-SHA256 signatures with constant-time equality (crypto.timingSafeEqual), buffer to Kafka/Redis, and return HTTP 202 Accepted in <30ms.",
      "Transactional Outbox Pattern: Atomic dual-write resolution ensuring local database state and outbox events commit together; CDC poller publishing to message brokers.",
      "Resilient Dispatch Worker: Asynchronous queue worker executing outbound HTTP webhooks with exponential backoff, jitter, and automatic routing to a Dead Letter Queue (DLQ) after 5 failures.",
      "Real-Time Telemetry Stream: Server-Sent Events (SSE) or WebSockets broadcasting real-time delivery latency and status metrics to connected administrative dashboards.",
      "Large Payload Export via S3 Presigned URLs: Asynchronous generation of pre-signed Amazon S3 / MinIO URLs for downloading large audit logs without loading files into server RAM."
    ],
    techStack: ["Apache Kafka / BullMQ", "Redis 7", "PostgreSQL 16", "AWS S3 / MinIO", "Go / TypeScript"],
    architectureDiagram: `[ External Webhook Ingestion ]
               |
               v (HMAC SHA-256 Constant-Time Verification)
+-------------------------------------------------------------------+
|               HIGH-SPEED INGESTION API (<30ms)                    |
|  - Write to Database + Outbox Record in ATOMIC TRANSACTION        |
|  - Return HTTP 202 Accepted                                       |
+-------------------------------------------------------------------+
                                  |
                                  v (Debezium CDC / Poller)
+-------------------------------------------------------------------+
|                   MESSAGE BROKER (Kafka / BullMQ)                 |
|  Topic: webhook.dispatch | DLQ: webhook.dispatch.deadletter       |
+-------------------------------------------------------------------+
                                  |
                                  v (Concurrent Worker Pool)
+-------------------------------------------------------------------+
|                     DISPATCH WORKER ENGINE                        |
|  - HTTP POST with HMAC Signature to Subscriber URL                |
|  - Failure -> Exponential Backoff with Jitter (1s, 2s, 4s, 8s...) |
|  - 5 Failures -> Move to Dead Letter Queue (DLQ)                  |
+-------------------------------------------------------------------+
                                  |
                                  v
+-------------------------------------------------------------------+
|             REAL-TIME TELEMETRY (SSE / WebSockets)                |
|  - Stream delivery status & latencies to operator dashboard       |
+-------------------------------------------------------------------+`,
    acceptanceCriteria: [
      "Simulating 1,000 incoming webhooks under concurrent load finishes with 0 lost events even if the message broker is temporarily paused.",
      "Timing attack analysis proves constant-time HMAC signature verification regardless of signature length or prefix matching.",
      "Failed outbound deliveries follow exponential backoff intervals and successfully land in the DLQ upon the 5th attempt.",
      "Exporting a 100,000-row webhook audit log generates a pre-signed S3 URL without server memory exceeding 50MB."
    ],
    githubSubmissionGuide: {
      recommendedRepoName: "eventpulse-webhook-engine",
      folderStructure: `eventpulse/
├── src/
│   ├── ingestion/       # HMAC verification & rapid HTTP 202 response
│   ├── outbox/          # Atomic DB transaction & CDC event publisher
│   ├── worker/          # BullMQ / Kafka consumer with backoff + DLQ
│   ├── realtime/        # SSE / WebSocket telemetry broadcaster
│   └── storage/         # MinIO / S3 presigned URL generator
├── tests/
│   ├── outbox_test      # Chaos test killing broker during DB commit
│   └── dlq_test         # Verification of poison-pill message handling
├── docker-compose.yml   # Kafka/Zookeeper, Redis, Postgres, MinIO
└── README.md`,
      readmeChecklist: [
        "Include architecture diagram detailing the Transactional Outbox flow.",
        "Provide benchmark report demonstrating ingestion throughput under load.",
        "Document retry interval formulas and DLQ replay instructions."
      ]
    }
  },
  6: {
    id: "capstone-phase-6",
    phaseId: 6,
    phaseName: "Reliability, Resilience & Observability",
    shortName: "ResilienceMesh",
    subtitle: "Fault-Tolerant Microservice with Stateful Circuit Breaker & OpenTelemetry",
    title: "ResilienceMesh: Fault-Tolerant Microservice with Circuit Breaker & OpenTelemetry",
    pitch: "Defend production services against cascading downtime. Implement a self-healing Circuit Breaker with cached fallbacks, full-stack OpenTelemetry distributed tracing in Jaeger, and Prometheus RED metrics.",
    highlights: [
      "Automated Fallback Circuit Breaker",
      "End-to-End OpenTelemetry Traces",
      "Prometheus RED Metrics & Histograms"
    ],
    difficulty: "Senior",
    estimatedHours: "15-20 hrs",
    scenario: "Wrap a critical backend payments and checkout microservice in comprehensive production resilience patterns. Protect upstream services from cascading failures by building a stateful Circuit Breaker with cached fallbacks, instrument end-to-end distributed tracing using OpenTelemetry and Jaeger, emit structured JSON logs with correlation IDs, expose Prometheus RED metrics, and execute zero-downtime graceful connection draining on SIGTERM.",
    keyDeliverables: [
      "Stateful Circuit Breaker Engine: States: CLOSED -> OPEN -> HALF-OPEN. Automatically trip open when >50% of requests fail over a 10-second rolling window, executing cached or fallback responses.",
      "OpenTelemetry Distributed Tracing: Propagate W3C traceparent headers across HTTP and database boundaries, recording span latencies and error tags in Jaeger.",
      "Prometheus RED Metrics Instrumentation: Export /metrics endpoint measuring Rate (requests/sec), Errors (5xx error rates), and Duration (p50, p95, p99 latency histograms).",
      "Structured JSON Logging with PII Redaction: High-performance logger emitting single-line JSON logs with automated redaction of sensitive fields (passwords, credit cards).",
      "Graceful Shutdown & Socket Draining: On SIGTERM, stop accepting new connections, finish in-flight requests within a 25-second deadline, close DB pools cleanly, and exit with code 0."
    ],
    techStack: ["Node.js / Go", "Prometheus", "Grafana", "Jaeger (OpenTelemetry Collector)", "Pino / Zap"],
    architectureDiagram: `[ Upstream Request ]
          |
          v
+-------------------------------------------------------------------+
|                    RESILIENCEMESH MIDDLEWARE                      |
|  - W3C Traceparent Extraction & OpenTelemetry Span Start          |
|  - Prometheus RED Metrics: Start Timer & Increment Rate           |
|  - Structured JSON Context Logger with Correlation ID             |
+-------------------------------------------------------------------+
                                  |
                                  v
+-------------------------------------------------------------------+
|                     STATEFUL CIRCUIT BREAKER                      |
|  State: CLOSED  --->  (Failures > 50%)  --->  State: OPEN         |
|           ^                                        |              |
|           |--- (Success in HALF-OPEN) <------------|              |
|                                                                   |
|  * IF OPEN: Return Fallback Response instantly (<2ms)             |
|  * IF CLOSED: Execute Downstream RPC / DB Query                   |
+-------------------------------------------------------------------+
                                  |
                                  v
+-------------------------------------------------------------------+
|               GRACEFUL SHUTDOWN HANDLER (SIGTERM)                 |
|  1. Stop accepting new connections                                |
|  2. Drain in-flight requests (Timeout: 25s)                        |
|  3. Close DB connection pools & flush OpenTelemetry traces        |
+-------------------------------------------------------------------+`,
    acceptanceCriteria: [
      "Inducing 50% failures on downstream service trips the circuit breaker to OPEN in <5s, dropping latency from 3000ms to <2ms.",
      "Jaeger UI visualizes full distributed traces linking API gateway requests to internal database query spans.",
      "Prometheus accurately records p50, p95, and p99 duration percentiles and alerts when 5xx error rate exceeds 1%.",
      "Sending SIGTERM to the process during an active 10-second HTTP request allows the request to complete with HTTP 200 before process exits."
    ],
    githubSubmissionGuide: {
      recommendedRepoName: "resilience-mesh-observability",
      folderStructure: `resilience-mesh/
├── src/
│   ├── circuitbreaker/  # State machine (Closed, Open, HalfOpen)
│   ├── telemetry/       # OpenTelemetry SDK & tracer initialization
│   ├── metrics/         # Prometheus RED counters & histograms
│   ├── logger/          # Structured JSON logger with PII masking
│   └── shutdown/        # SIGTERM / SIGINT connection drainer
├── telemetry-infra/
│   ├── prometheus.yml   # Prometheus scrape configuration
│   └── grafana-dashboards/ # Pre-configured RED method dashboard
├── docker-compose.yml   # App, Prometheus, Grafana, Jaeger
└── README.md`,
      readmeChecklist: [
        "Include screenshots of the Grafana RED metrics dashboard and Jaeger trace timeline.",
        "Document circuit breaker state transitions and configuration parameters.",
        "Demonstrate graceful shutdown logs verifying socket drain completion."
      ]
    }
  },
  7: {
    id: "capstone-phase-7",
    phaseId: 7,
    phaseName: "Advanced Engineering, Scale & Operations",
    shortName: "CloudScale",
    subtitle: "Flagship Zero-Downtime Deployment, Testcontainers & Multi-Stage CI/CD",
    title: "CloudScale: Production Multi-Stage Docker, Testcontainers & Zero-Downtime CI/CD",
    pitch: "Deliver the crown jewel of production backend engineering: hardened rootless multi-stage Docker (<50MB), ephemeral Testcontainers in GitHub Actions CI, and zero-downtime rolling deploys with 0 dropped packets.",
    highlights: [
      "Ultra-Lean <50MB Rootless Docker",
      "Ephemeral Testcontainers CI Pipeline",
      "Zero-Downtime Rolling Deployments"
    ],
    difficulty: "Staff",
    estimatedHours: "20-25 hrs",
    scenario: "Deliver the ultimate production-grade deployment infrastructure for a high-traffic backend. Author an optimized, rootless multi-stage Dockerfile shrinking images to <50MB, build an automated integration testing suite using Testcontainers in GitHub Actions CI, deploy behind an Nginx reverse proxy with load balancing and TLS termination, and execute automated zero-downtime rolling updates with zero dropped packets.",
    keyDeliverables: [
      "Production Multi-Stage Dockerfile: Separate build dependencies from minimal production runtime (Alpine / Distroless), running as an unprivileged non-root user and passing Trivy CVE security scans.",
      "Ephemeral Integration Testing with Testcontainers: Automated test suite that spins up real PostgreSQL and Redis containers, runs migrations, executes tests, and tears down cleanly.",
      "Reverse Proxy & Edge Gateway: Nginx / Envoy configuration with upstream load balancing, gzip/brotli compression, HTTP/2 multiplexing, and SSL termination.",
      "GitHub Actions CI/CD Pipeline: Automated linting, static analysis, Testcontainers execution, Docker build & push, and automated deployment triggers.",
      "Zero-Downtime Deployment Verification: Blue-green or rolling deployment setup with distinct liveness and readiness health check probes ensuring 100% uptime during updates."
    ],
    techStack: ["Docker & Multi-Stage Builds", "Testcontainers", "GitHub Actions CI/CD", "Nginx / Envoy", "Kubernetes / Docker Compose"],
    architectureDiagram: `[ Git Push / Pull Request ]
               |
               v
+-------------------------------------------------------------------+
|                     GITHUB ACTIONS CI/CD PIPELINE                 |
|  1. Static Linting & Typecheck                                    |
|  2. Testcontainers Suite (Real Postgres & Redis in ephemeral VMs) |
|  3. Multi-Stage Docker Build (Trivy CVE Security Scan)            |
|  4. Publish Minimal Image to Container Registry                   |
+-------------------------------------------------------------------+
                                  |
                                  v
+-------------------------------------------------------------------+
|               NGINX REVERSE PROXY & LOAD BALANCER                 |
|  - TLS 1.3 Termination, HTTP/2, Brotli Compression                |
|  - Upstream Health Checking & Round-Robin Load Balancing          |
+-------------------------------------------------------------------+
                  |                                 |
                  v (Active Pods)                   v (New Rollout Pods)
+-----------------------------------+     +-----------------------------------+
|         App Container v1          |     |         App Container v2          |
|    - Readiness: PASS              |     |    - Initializing DB Connections  |
|    - Receiving Traffic            |     |    - Readiness: PENDING -> PASS   |
+-----------------------------------+     +-----------------------------------+
                  |                                 |
                  +--- (Traffic Switch with 0 Dropped Packets) ---+`,
    acceptanceCriteria: [
      "Final production Docker image size is <50MB and runs as non-root user (USER 1001).",
      "GitHub Actions workflow executes entire Testcontainers integration test suite and builds image in <3 minutes.",
      "Continuous load test with 'hey -z 30s -q 50 http://localhost/api/health' during an active rolling deployment maintains 100% HTTP 200 success rate.",
      "Trivy vulnerability scan reports 0 CRITICAL and 0 HIGH CVE security flaws in the Docker image."
    ],
    githubSubmissionGuide: {
      recommendedRepoName: "cloudscale-production-cicd",
      folderStructure: `cloudscale/
├── .github/
│   └── workflows/       # CI/CD pipeline (lint, testcontainers, docker)
├── docker/
│   ├── Dockerfile       # Hardened multi-stage non-root build
│   └── nginx.conf       # Reverse proxy, SSL, & load balancing
├── tests/
│   └── integration/     # Testcontainers suite with Postgres & Redis
├── deploy/
│   └── docker-compose.prod.yml # Production orchestration
└── README.md`,
      readmeChecklist: [
        "Include CI/CD pipeline run badge and step-by-step description.",
        "Provide Docker image size analysis and Trivy CVE scan report.",
        "Document zero-downtime rolling update verification with load test graph."
      ]
    }
  }
};
