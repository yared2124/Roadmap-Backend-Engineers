import { RoadmapTopic } from '../../types/roadmap';

export const topic: RoadmapTopic = {
  "id": "backend-high-level",
  "number": 2,
  "title": "High-Level Understanding: What is a Backend, How it Works & Why We Need It",
  "phaseId": 1,
  "phaseName": "Foundations & Web Protocols",
  "duration": "2 hrs 26 min",
  "timeEstimates": {
    "video": "2 hr 26 min",
    "reading": "45 min",
    "lab": "45 min",
    "total": "3 hr 56 min"
  },
  "youtubeId": "KOutPbKc9UM",
  "youtubeChannelUrl": "https://www.youtube.com/@freecodecamp",
  "shortSummary": "Client-server architecture, reverse proxies, edge gateways, application runtimes, and distributed state boundaries.",
  "seniorInsight": {
    "quote": "The frontend is an untrusted remote sandbox. Never delegate authority or data integrity checks to the client.",
    "productionLesson": "In production, client-side validation is strictly for user experience. Every single business invariant, pricing computation, and permission rule must be authoritatively enforced on the backend.",
    "commonMistake": "Allowing the client to dictate database foreign keys or assuming HTTP parameters haven't been tampered with in transit."
  },
  "coreDeepDive": {
    "what": "The backend is the centralized tier that executes critical business logic, orchestrates data persistence, and coordinates microservices.",
    "why": "Enables independent horizontal scaling, multi-client support (one API for iOS, Android, and Web), and unified security enforcement.",
    "howItWorks": [
      "1. Client resolves host IP via DNS recursive resolvers.",
      "2. Reverse proxy terminates TLS, applies rate limits, and load balances traffic to private subnets.",
      "3. Application server processes requests, executes business rules, queries databases, and emits telemetry.",
      "4. Formatted responses return via standardized status codes and serializations."
    ],
    "blueprintTitle": "Three-Tier Backend Topology",
    "blueprintCode": "[Client (Mobile/Web)]\n       │ (HTTPS :443)\n       ▼\n[Edge / Reverse Proxy: Nginx/Cloudflare]\n       │ (Private VPC HTTP :8080)\n       ▼\n[Stateless App Servers (Node/Go/Python)]\n    ├── [Primary DB: PostgreSQL] (ACID state)\n    └── [Cache Tier: Redis]      (In-memory sessions)",
    "blueprintLanguage": "text"
  },
  "recommendedBook": {
    "title": "Patterns of Enterprise Application Architecture",
    "author": "Martin Fowler",
    "keyChapters": "Service Layer Pattern (Decoupling Business Logic from Web Delivery)",
    "whyReadThis": "The canonical definition of why a backend exists: establishing an application boundary that orchestrates business operations and encapsulates state mutations.",
    "readingUrl": "https://martinfowler.com/eaaCatalog/serviceLayer.html"
  },
  "handsOnChallenge": {
    "ticketNumber": "TICKET-002",
    "title": "Architect an Isolated Three-Tier Network Boundary",
    "scenario": "Configure reverse proxy TLS termination and verify that private databases and services cannot be accessed directly from the public internet.",
    "acceptanceCriteria": [
      "Bind application services to private localhost or VPC IP addresses.",
      "Ensure public traffic only enters through the reverse proxy on port 443."
    ],
    "terminalLab": "# Verify public port listening\nnetstat -tuln | grep -E \":80|:443|:5432|:6379\"",
    "hints": [
      "Databases should NEVER bind to 0.0.0.0 in production.",
      "Use private Docker networks or VPC security groups."
    ],
    "solutionCode": "# Docker Compose isolated backend subnet\nnetworks:\n  frontend-tier:\n  backend-db:\n    internal: true",
    "solutionExplanation": "Declaring internal: true isolates databases onto private virtual interfaces, preventing accidental exposure to public interfaces."
  },
  "selfCheckQuestions": [
    {
      "category": "WHAT",
      "question": "What happens under the hood across the OSI model when a client sends an HTTP GET request to a backend API server?",
      "answerExplanation": "The client resolves the domain via DNS (UDP 53/DoH), initiates a TCP 3-way handshake (SYN, SYN-ACK, ACK) at Layer 4, negotiates a TLS 1.3 cryptographic session (Cipher suites, Diffie-Hellman keys), transmits the Layer 7 HTTP request frame, which traverses reverse proxies and load balancers before the backend runtime's socket accepts the file descriptor, parses headers, and dispatches to application routing."
    },
    {
      "category": "WHY",
      "question": "Why do high-throughput backend applications decouple compute (stateless workers) from state (relational databases and object stores)?",
      "answerExplanation": "Decoupling compute from state allows independent scaling dynamics. Compute nodes (CPU/RAM-bound) can scale from 2 to 200 instances in seconds during traffic spikes via Kubernetes HPA without risking database split-brain, replication lag, or data corruption, while stateful databases scale vertically or via dedicated read replicas and sharding."
    },
    {
      "category": "HOW",
      "question": "How does a backend server prevent resource starvation when incoming client requests exceed thread pool or socket capacity?",
      "answerExplanation": "Implement proactive backpressure, reverse proxy rate limiting, and finite TCP connection queues (listen(somaxconn)). When worker pools exhaust, immediately return HTTP 429 Too Many Requests or HTTP 503 Service Unavailable with a Retry-After header rather than queueing indefinitely, which leads to memory exhaustion, CPU thrashing, and cascading system failure."
    }
  ]
};

export default topic;
