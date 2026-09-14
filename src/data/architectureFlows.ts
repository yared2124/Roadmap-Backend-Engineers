import { ArchitectureDiagramFlow } from "../types/roadmap";

export const TOPIC_ARCHITECTURE_FLOWS: Record<string, ArchitectureDiagramFlow> = {
  // Topic 16: Caching Strategies (Redis)
  "caching-strategies-redis": {
    title: "Cache-Aside Pattern with Jittered TTL & Thundering Herd Defense",
    summary: "High-throughput in-memory caching lifecycle. Requests hit Redis first (<2ms). On cache miss, a single worker acquires a distributed lock to query PostgreSQL and populate Redis with random jittered TTL, preventing cache stampedes.",
    nodes: [
      { id: "client", label: "Client App", role: "Web / Mobile Consumer", type: "client" },
      { id: "gateway", label: "API Gateway", role: "Nginx / Envoy / Traefik", type: "gateway" },
      { id: "service", label: "Backend Service", role: "Express / Go / FastAPI", type: "service" },
      { id: "cache", label: "Redis Cluster", role: "In-Memory RAM Key-Value", type: "cache" },
      { id: "database", label: "PostgreSQL DB", role: "Persistent ACID Disk Store", type: "database" }
    ],
    steps: [
      {
        stepNumber: 1,
        from: "client",
        to: "gateway",
        action: "GET /api/v1/products/123",
        detail: "Client submits HTTP request for product data",
        latency: "15ms (Network)"
      },
      {
        stepNumber: 2,
        from: "gateway",
        to: "service",
        action: "Proxy Request",
        detail: "Forward to healthy container pod via round-robin load balancing",
        latency: "<1ms"
      },
      {
        stepNumber: 3,
        from: "service",
        to: "cache",
        action: "GET product:123",
        detail: "Check Redis memory for cached serialized JSON",
        latency: "1-2ms"
      },
      {
        stepNumber: 4,
        from: "cache",
        to: "service",
        action: "Cache Hit (90% traffic)",
        detail: "Return cached payload immediately, skipping database entirely",
        latency: "<1ms"
      },
      {
        stepNumber: 5,
        from: "service",
        to: "database",
        action: "Cache Miss: Query DB",
        detail: "SELECT * FROM products WHERE id = 123 (Executed only on cache miss)",
        latency: "15-40ms",
        isFallback: true
      },
      {
        stepNumber: 6,
        from: "service",
        to: "cache",
        action: "SETEX with Jitter",
        detail: "Write payload to Redis with TTL = 300s + random(30s) to prevent synchronized mass-expiry",
        latency: "1ms",
        isFallback: true
      },
      {
        stepNumber: 7,
        from: "service",
        to: "client",
        action: "200 OK Response",
        detail: "Fast response delivered with Cache-Control: max-age header",
        latency: "Total: 3-5ms (Hit) / 35ms (Miss)"
      }
    ]
  },

  // Topic 30: Concurrency & Parallelism (Race Conditions & Distributed Locks)
  "concurrency-parallelism-race-conditions": {
    title: "Distributed Mutex & Pessimistic Row-Locking Architecture",
    summary: "Zero-race-condition multi-server booking flow. Multiple concurrent pods contend for a single inventory item. Redis Redlock coordinates across nodes, while PostgreSQL SELECT FOR UPDATE locks the exact disk row inside an ACID transaction.",
    nodes: [
      { id: "client", label: "Concurrent Users", role: "2 Users Buying Last Seat", type: "client" },
      { id: "gateway", label: "Load Balancer", role: "Splits traffic to Pod A & Pod B", type: "gateway" },
      { id: "service", label: "Backend Pods (A & B)", role: "Horizontally Scaled Nodes", type: "service" },
      { id: "cache", label: "Redis (Redlock)", role: "Distributed Mutex with TTL", type: "cache" },
      { id: "database", label: "PostgreSQL Engine", role: "Row-Level Exclusive Lock", type: "database" }
    ],
    steps: [
      {
        stepNumber: 1,
        from: "client",
        to: "gateway",
        action: "POST /checkout (Seat #42)",
        detail: "User A and User B press 'Buy' at the exact same millisecond",
        latency: "Concurrent"
      },
      {
        stepNumber: 2,
        from: "gateway",
        to: "service",
        action: "Dispatch to Pod A & Pod B",
        detail: "Pod A handles User A; Pod B handles User B",
        latency: "<1ms"
      },
      {
        stepNumber: 3,
        from: "service",
        to: "cache",
        action: "SET lock:seat:42 <uuid> NX PX 5000",
        detail: "Both pods race to acquire distributed lock in Redis atomically",
        latency: "1ms"
      },
      {
        stepNumber: 4,
        from: "cache",
        to: "service",
        action: "Lock Acquired by Pod A (Pod B waits/fails)",
        detail: "Pod A receives OK (owns lock). Pod B receives nil (aborts with 409 Conflict)",
        latency: "<1ms"
      },
      {
        stepNumber: 5,
        from: "service",
        to: "database",
        action: "BEGIN; SELECT ... FOR UPDATE",
        detail: "Pod A initiates transaction and places exclusive row lock on seat #42",
        latency: "5ms"
      },
      {
        stepNumber: 6,
        from: "service",
        to: "database",
        action: "UPDATE inventory SET stock = 0; COMMIT;",
        detail: "Decrement stock to 0, generate order record, and release database row lock",
        latency: "4ms"
      },
      {
        stepNumber: 7,
        from: "service",
        to: "cache",
        action: "Release Redlock via Lua Script",
        detail: "Safely delete lock key only if UUID matches, avoiding releasing another worker's lock",
        latency: "1ms"
      }
    ]
  },

  // Topic 18: Authorization & Access Control (RBAC, ABAC)
  "authorization-access-control": {
    title: "Zero-Trust Policy Enforcement Point (PEP) & Tenant Isolation",
    summary: "Guards against Broken Object Level Authorization (BOLA/IDOR). The Policy Enforcement Point intercepts authenticated requests, checks dynamic attributes (ABAC), and forces organization_id database scoping.",
    nodes: [
      { id: "client", label: "Authenticated Client", role: "JWT Bearer Token Bearer", type: "client" },
      { id: "auth", label: "Auth Middleware", role: "JWT Signature & Claims Validator", type: "auth" },
      { id: "service", label: "Policy Guard (PEP)", role: "RBAC Matrix & ABAC Policy Engine", type: "service" },
      { id: "database", label: "PostgreSQL DB", role: "Tenant-Isolated Row Boundary", type: "database" }
    ],
    steps: [
      {
        stepNumber: 1,
        from: "client",
        to: "auth",
        action: "GET /api/invoices/105",
        detail: "Request sends Authorization: Bearer <jwt_token>",
        latency: "10ms"
      },
      {
        stepNumber: 2,
        from: "auth",
        to: "service",
        action: "Extract Verified Context",
        detail: "Cryptographically verifies signature, extracts userId: 42 and orgId: 'org_acme'",
        latency: "<1ms"
      },
      {
        stepNumber: 3,
        from: "service",
        to: "service",
        action: "Evaluate Permission (PEP)",
        detail: "Check if role 'BillingManager' has permission 'invoices:read' under current department rules",
        latency: "<1ms"
      },
      {
        stepNumber: 4,
        from: "service",
        to: "database",
        action: "Scoped Tenant Query",
        detail: "SELECT * FROM invoices WHERE id = 105 AND organization_id = 'org_acme'",
        latency: "4ms"
      },
      {
        stepNumber: 5,
        from: "database",
        to: "service",
        action: "Row Found or 404",
        detail: "If invoice 105 belongs to another company, 0 rows return; service returns 404 (preventing BOLA enumeration)",
        latency: "<1ms",
        isFallback: true
      },
      {
        stepNumber: 6,
        from: "service",
        to: "client",
        action: "200 OK / 403 Forbidden",
        detail: "Clean response returned with complete audit log entry written in background",
        latency: "Total: 15ms"
      }
    ]
  },

  // Topic 14: Database Indexing & Query Performance
  "database-indexing-query-performance": {
    title: "PostgreSQL B-Tree Index Traversal vs Full Table Seq Scan",
    summary: "Visualizing query engine optimization. Demonstrates how a 3-level B-Tree index resolves an O(log N) lookup in 3 memory buffer seeks instead of scanning 1,000,000 table pages off disk.",
    nodes: [
      { id: "client", label: "SQL Query Request", role: "SELECT * WHERE user_id = 894021", type: "client" },
      { id: "gateway", label: "Query Parser & Planner", role: "Cost-Based Optimizer (CBO)", type: "gateway" },
      { id: "cache", label: "Shared Buffers (RAM)", role: "PostgreSQL Buffer Cache", type: "cache" },
      { id: "database", label: "B-Tree Index Pages", role: "Root -> Intermediate -> Leaf Nodes", type: "database" },
      { id: "storage", label: "Heap Table Storage", role: "Disk Table Blocks (Data Rows)", type: "storage" }
    ],
    steps: [
      {
        stepNumber: 1,
        from: "client",
        to: "gateway",
        action: "Execute SQL Query",
        detail: "Incoming query filtered on indexed column user_id",
        latency: "<1ms"
      },
      {
        stepNumber: 2,
        from: "gateway",
        to: "cache",
        action: "Generate Index Scan Plan",
        detail: "Optimizer checks table statistics; chooses Index Scan (cost=0.42..8.44) over Seq Scan (cost=18420.00)",
        latency: "<1ms"
      },
      {
        stepNumber: 3,
        from: "cache",
        to: "database",
        action: "Traverse B-Tree Root -> Internal Node",
        detail: "Binary search root page to find target child block reference (Pointer 0x4B)",
        latency: "<0.1ms"
      },
      {
        stepNumber: 4,
        from: "database",
        to: "database",
        action: "Read B-Tree Leaf Page",
        detail: "Leaf page contains sorted array of key values + ItemPointer (TID: page 42, offset 7)",
        latency: "<0.2ms"
      },
      {
        stepNumber: 5,
        from: "database",
        to: "storage",
        action: "Direct Heap Tuple Fetch",
        detail: "Seek directly to page 42 to read row data (or skip if Index-Only Scan with visibility map)",
        latency: "0.5ms"
      },
      {
        stepNumber: 6,
        from: "storage",
        to: "client",
        action: "Result Returned (Execution Time: 0.8ms)",
        detail: "Total buffer reads: 4 blocks (32 KB) instead of 100,000 blocks (800 MB) for Seq Scan",
        latency: "Total: 0.8ms"
      }
    ]
  },

  // Topic 20: Task Queuing & Scheduling
  "task-queuing-scheduling": {
    title: "Asynchronous Message Queue with Dead-Letter (DLQ) Recovery",
    summary: "Decouples heavy work from the synchronous HTTP request-response loop. The API returns 202 Accepted in under 5ms, while distributed worker daemons consume jobs, handle exponential retries, and isolate poison messages.",
    nodes: [
      { id: "client", label: "User Client", role: "Submits Heavy Job (e.g. Generate PDF)", type: "client" },
      { id: "service", label: "API Gateway / Server", role: "Fast Synchronous Ingestion", type: "service" },
      { id: "queue", label: "Redis / RabbitMQ Queue", role: "Durable In-Memory / Disk Buffer", type: "queue" },
      { id: "gateway", label: "Worker Pool Daemons", role: "Background Consumer Nodes", type: "gateway" },
      { id: "storage", label: "Dead Letter Queue (DLQ)", role: "Poison Pill Quarantine Store", type: "storage" }
    ],
    steps: [
      {
        stepNumber: 1,
        from: "client",
        to: "service",
        action: "POST /reports/export",
        detail: "User requests compute-intensive monthly billing report",
        latency: "15ms"
      },
      {
        stepNumber: 2,
        from: "service",
        to: "queue",
        action: "RPUSH / Publish Message",
        detail: "Serializes job payload { reportId: 401, format: 'PDF' } into durable broker queue",
        latency: "2ms"
      },
      {
        stepNumber: 3,
        from: "service",
        to: "client",
        action: "202 Accepted Response",
        detail: "API returns immediately with { jobId: 'job_401', status: 'queued' } in under 20ms",
        latency: "<5ms"
      },
      {
        stepNumber: 4,
        from: "queue",
        to: "gateway",
        action: "BRPOP / Consumer Pull",
        detail: "Idle background worker daemon pulls next available job and begins processing",
        latency: "Event-driven"
      },
      {
        stepNumber: 5,
        from: "gateway",
        to: "queue",
        action: "Retry with Exponential Backoff (on failure)",
        detail: "If third-party API fails, re-queue with delay (2s -> 4s -> 8s -> 16s) up to 5 attempts",
        latency: "Scheduled",
        isFallback: true
      },
      {
        stepNumber: 6,
        from: "gateway",
        to: "storage",
        action: "Route to Dead Letter Queue (DLQ)",
        detail: "After 5 exhausted retries, poison message is isolated in DLQ and Slack alert fires",
        latency: "Safety mechanism",
        isFallback: true
      }
    ]
  },

  // Topic 17: Authentication & Identity
  "authentication-identity": {
    title: "Secure Hybrid Authentication: HttpOnly Cookie + Access Token Rotation",
    summary: "Production-grade authentication lifecycle preventing XSS and token replay attacks. Combines short-lived stateless JWT access tokens with long-lived stateful refresh tokens stored in HttpOnly, SameSite=Strict cookies with automatic reuse detection.",
    nodes: [
      { id: "client", label: "Browser / Client App", role: "Stores Memory Token & HttpOnly Cookie", type: "client" },
      { id: "gateway", label: "API Gateway", role: "Validates RS256 JWT Signature in Memory", type: "gateway" },
      { id: "auth", label: "Auth Microservice", role: "Manages Session Lifecycles & Keys", type: "auth" },
      { id: "cache", label: "Redis Session Store", role: "Refresh Token Family & Blacklist", type: "cache" },
      { id: "database", label: "User Database", role: "Argon2id Password Hashes", type: "database" }
    ],
    steps: [
      {
        stepNumber: 1,
        from: "client",
        to: "auth",
        action: "POST /api/auth/login",
        detail: "Submits credentials (email + password)",
        latency: "30ms"
      },
      {
        stepNumber: 2,
        from: "auth",
        to: "database",
        action: "Verify Argon2id Hash",
        detail: "Fetches user salt and verifies password using memory-hard Argon2id algorithm",
        latency: "60ms"
      },
      {
        stepNumber: 3,
        from: "auth",
        to: "cache",
        action: "Register Refresh Token Family",
        detail: "Store refresh_token UUID with expiration and device metadata in Redis",
        latency: "2ms"
      },
      {
        stepNumber: 4,
        from: "auth",
        to: "client",
        action: "Set-Cookie + Return Access JWT",
        detail: "Refresh token sent in HttpOnly, Secure, SameSite=Strict cookie; short-lived JWT returned in memory",
        latency: "1ms"
      },
      {
        stepNumber: 5,
        from: "client",
        to: "gateway",
        action: "Subsequent API Calls (15 mins)",
        detail: "Gateway verifies JWT cryptographically using cached public RSA key (zero DB lookups)",
        latency: "<0.5ms"
      },
      {
        stepNumber: 6,
        from: "client",
        to: "auth",
        action: "POST /auth/refresh (Token Expired)",
        detail: "Client exchanges cookie for new access token. If token reuse detected, entire family revoked immediately",
        latency: "10ms",
        isFallback: true
      }
    ]
  }
};
