import { RoadmapTopic } from '../../types/roadmap';

export const topic: RoadmapTopic = {
  "id": "backend-first-principles",
  "number": 1,
  "title": "Backend from First Principles (Orientation & Architecture)",
  "phaseId": 1,
  "phaseName": "Foundations & Web Protocols",
  "duration": "31 min",
  "timeEstimates": {
    "video": "40 min",
    "reading": "30 min",
    "lab": "45 min",
    "total": "1 hr 55 min"
  },
  "youtubeId": "0Rwb4Xmlcwc",
  "youtubeChannelUrl": "https://www.youtube.com/@sriniously",
  "secondaryVideo": {
    "youtubeId": "3Kqal7QaCCM",
    "title": "How Garbage Collection Works (Java, Python, Go)",
    "duration": "9 min",
    "description": "ByteByteGo illustrates mark-and-sweep, generational GC algorithms, memory allocation, and CPU trade-offs across backend runtimes."
  },
  "shortSummary": "Foundations of backend systems: CPU, memory, OS processes, network sockets, disk I/O, and distributed computing mental models.",
  "seniorInsight": {
    "quote": "Software is an illusion run on physical silicon, electricity, and packet switches. High-scale engineers optimize for hardware constraints, not framework abstractions.",
    "productionLesson": "Understand memory vs disk latency: CPU cache (1ns), RAM (100ns), NVMe SSD (100,000ns), Cross-datacenter network packet (50,000,000ns). System bottlenecks are almost always network round-trips and unindexed disk scans.",
    "commonMistake": "Treating the server as an abstract magic box and assuming memory allocations and network round-trips are free."
  },
  "coreDeepDive": {
    "what": "Backend engineering is the discipline of creating reliable, fault-tolerant software that processes business operations, safeguards state, and exposes APIs over networks.",
    "why": "Without a disciplined systems approach, applications succumb to memory leaks, thread starvation, data corruption, and catastrophic cascading outages.",
    "howItWorks": [
      "1. Operating systems manage memory pages, file descriptors, and non-blocking I/O event loops (epoll/kqueue).",
      "2. Sockets accept incoming TCP byte streams and hand them off to worker threads or asynchronous runtimes.",
      "3. Business code validates state changes and commits mutations into ACID-compliant storage engines.",
      "4. Telemetry engines emit distributed traces to capture latencies at hardware and network boundaries."
    ],
    "blueprintTitle": "System Latency Hierarchy & Resource Model",
    "blueprintCode": "[L1/L2 Cache: ~1ns]   <-- Registers & CPU execution\n       │\n[Main Memory (RAM): ~100ns]   <-- Hot working sets, Redis cache, in-memory buffers\n       │\n[NVMe Flash SSD: ~100,000ns]  <-- PostgreSQL write-ahead logs (WAL), disk tables\n       │\n[Cross-AZ Network: ~2,000,000ns] <-- Intra-cluster microservices, replica sync\n       │\n[Transatlantic WAN: ~150,000,000ns] <-- Client browser to origin server",
    "blueprintLanguage": "text"
  },
  "recommendedBook": {
    "title": "Software Architecture Guide",
    "author": "Martin Fowler",
    "keyChapters": "Software Architecture Guide & First Principles Layering",
    "whyReadThis": "Foundational architecture treatise explaining why architecture matters, the trade-offs of layering, and separating hardware/runtime boundaries.",
    "readingUrl": "https://martinfowler.com/architecture/"
  },
  "handsOnChallenge": {
    "ticketNumber": "TICKET-001",
    "title": "Measure Network Latency & Process Resource Footprint",
    "scenario": "Identify memory page allocations and system call overhead for an API handling concurrent network connections.",
    "acceptanceCriteria": [
      "Measure system socket connections and file descriptors using lsof or netstat.",
      "Profile request latency breakdown between DNS, TCP handshake, TLS negotiation, and TTFB."
    ],
    "terminalLab": "# Inspect file descriptors and open network sockets for your backend process\nlsof -p $(pgrep -f node) -a -i\ncurl -w \"DNS: %{time_namelookup}s | Connect: %{time_connect}s | TLS: %{time_appconnect}s | TTFB: %{time_starttransfer}s | Total: %{time_total}s\n\" -o /dev/null -s https://httpbin.org/get",
    "hints": [
      "Remember that everything in UNIX is a file descriptor, including network sockets.",
      "High socket counts without closure result in 'EMFILE: too many open files' errors."
    ],
    "solutionCode": "curl -w \"DNS: %{time_namelookup}s\nConnect: %{time_connect}s\nTLS: %{time_appconnect}s\nTTFB: %{time_starttransfer}s\nTotal: %{time_total}s\n\" -o /dev/null -s https://httpbin.org/get",
    "solutionExplanation": "Isolating network handshake latency from TTFB proves whether performance issues stem from physical routing or backend execution."
  },
  "selfCheckQuestions": [
    {
      "category": "WHAT",
      "question": "What distinguishes a distributed stateless backend service from a stateful monolith at the networking and storage layers?",
      "answerExplanation": "A stateless service stores zero client session state in local memory between HTTP requests; any server instance can handle any incoming packet by querying centralized, durable stores (e.g., PostgreSQL, Redis). In contrast, stateful monoliths maintain in-memory sessions, WebSocket connection maps, or local disk state, necessitating sticky load balancing, complex failover protocols, and making horizontal scaling much harder."
    },
    {
      "category": "WHY",
      "question": "Why is the Separation of Concerns strictly enforced across the Controller, Service, and Repository layers in backend architecture?",
      "answerExplanation": "Separation of Concerns prevents coupling business rules with HTTP transport protocols or database dialect drivers. If you migrate from REST to gRPC or from PostgreSQL to CockroachDB, only the transport or persistence adapter changes, while core business domain invariants in the Service layer remain pure, unit-testable, and untouched."
    },
    {
      "category": "HOW",
      "question": "How do you detect and prevent architectural drift (e.g., Controllers directly executing SQL or bypassing Services) in production codebases?",
      "answerExplanation": "Use automated static analysis and architecture linting tools (such as ArchUnit in Java/Kotlin, dependency-cruiser in TypeScript/Node, or internal package boundary rules in Go). In CI pipelines, enforce boundaries that fail builds if transport controllers import database ORM models or database drivers directly."
    }
  ]
};

export default topic;
