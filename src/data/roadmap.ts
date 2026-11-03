import { RoadmapTopic, RoadmapPhase } from "../types/roadmap";
import { ROADMAP_TOPICS } from "./topics";
import { CAPSTONE_PROJECTS } from "./capstones";

export const CHANNEL_URL = "https://www.youtube.com";
export const CHANNEL_NAME = "YouTube";

export { ROADMAP_TOPICS };

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
    description: "Architect clean, modular backend applications: Middlewares, request contexts, input validation, layered architecture, RESTful standards, API gateways, and gRPC/Protobuf RPCs.",
    topics: ROADMAP_TOPICS.filter((t) => t.phaseId === 2),
    capstoneProject: CAPSTONE_PROJECTS[2],
  },
  {
    id: 3,
    name: "Data Persistence & Storage",
    description: "Master relational and in-memory persistence: PostgreSQL internals, ACID transactions, relational modeling, indexing performance, zero-downtime migrations, and caching architectures.",
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
    description: "Decouple synchronous HTTP flows: Task queuing, distributed message streaming with Apache Kafka, transactional email, webhooks with HMAC, real-time websockets/SSE, object storage, and full-text search.",
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
    description: "Operate at high volume: Concurrency, race conditions, distributed locks, database replication and sharding, distributed consensus (Raft/CAP), Testcontainers, and containerized CI/CD pipelines.",
    topics: ROADMAP_TOPICS.filter((t) => t.phaseId === 7),
    capstoneProject: CAPSTONE_PROJECTS[7],
  },
];
