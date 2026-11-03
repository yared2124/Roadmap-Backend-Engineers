import { RoadmapTopic } from '../../types/roadmap';

export const topic: RoadmapTopic = {
  "id": "scaling-testing-devops",
  "number": 37,
  "title": "Scaling, Testing & DevOps (Testcontainers, Docker Containers, CI/CD, Load Balancing)",
  "phaseId": 7,
  "phaseName": "Advanced Engineering, Scale & Operations",
  "duration": "2 hrs 10 min",
  "timeEstimates": {
    "video": "6 hr 10 min",
    "reading": "40 min",
    "lab": "60 min",
    "total": "7 hr 50 min"
  },
  "youtubeId": "fqMOX6JJhGo",
  "youtubeChannelUrl": "https://www.youtube.com/@TechWorldwithNana",
  "shortSummary": "Horizontal scaling, load balancing, Testcontainers integration testing, multi-stage Docker builds, and automated CI/CD quality gates.",
  "secondaryVideo": {
    "youtubeId": "X48VuDVv0do",
    "title": "Kubernetes Tutorial for Beginners [Full Course in 4 Hours]",
    "duration": "4 hrs",
    "description": "TechWorld with Nana's definitive deep dive into Kubernetes architecture, Pods, Services, Ingress, ConfigMaps, Secrets, Volumes, and zero-downtime rolling deployments."
  },
  "seniorInsight": {
    "quote": "Mocking your database in integration tests is lying to yourself. Use Testcontainers to spin up real, ephemeral PostgreSQL and Redis Docker containers during test suites.",
    "productionLesson": "In-memory database mocks (like sqlite or mock-redis) do not test real PostgreSQL indexing, locking, or query plans. Testcontainers launches a real PostgreSQL instance inside Docker in 1 second, providing 100% fidelity to production.",
    "commonMistake": "Running Docker containers in production as the root user instead of declaring a restricted non-root user (USER node)."
  },
  "coreDeepDive": {
    "what": "Modern backend DevOps encompasses automated testing with real infrastructure dependencies, container packaging, and automated CI/CD delivery.",
    "why": "Ensures code can be deployed to production 10 times a day with zero regressions and seamless horizontal scalability.",
    "howItWorks": [
      "1. Testcontainers spins up real ephemeral Docker dependencies (Postgres, Redis) for integration tests.",
      "2. Multi-stage Docker builds separate build dependencies from minimal production runtime images.",
      "3. CI/CD pipeline runs lints, tests, builds image, and performs canary deployment."
    ],
    "blueprintTitle": "Hardened Production Multi-Stage Dockerfile",
    "blueprintCode": "# Build Stage\nFROM node:20-alpine AS builder\nWORKDIR /app\nCOPY package*.json ./\nRUN npm ci\nCOPY . .\nRUN npm run build\n\n# Production Runtime Stage (Small, secure, non-root)\nFROM node:20-alpine AS runner\nWORKDIR /app\nENV NODE_ENV=production\n# Security: Never run containers as root!\nUSER node\nCOPY --from=builder /app/package*.json ./\nCOPY --from=builder /app/node_modules ./node_modules\nCOPY --from=builder /app/dist ./dist\nEXPOSE 3000\nCMD [\"node\", \"dist/server.js\"]",
    "blueprintLanguage": "dockerfile"
  },
  "recommendedBook": {
    "title": "Docker Architecture & Container Concepts",
    "author": "Docker Documentation Team",
    "keyChapters": "Containerization Basics: Namespaces, cgroups, Multi-Stage Builds & Isolation",
    "whyReadThis": "Official guide on container primitives, deterministic packaging, minimal production runtime images, and CI/CD pipelines.",
    "readingUrl": "https://docs.docker.com/get-started/docker-concepts/the-basics/what-is-a-container/"
  },
  "handsOnChallenge": {
    "ticketNumber": "TICKET-031",
    "title": "Build an Integration Test Suite using Real PostgreSQL in Testcontainers",
    "scenario": "Unit tests with SQLite in-memory passed, but production crashed due to PostgreSQL-specific JSONB and UUID syntax errors.",
    "acceptanceCriteria": [
      "Spin up real PostgreSQL container using Testcontainers.",
      "Run database migrations against ephemeral container.",
      "Verify ACID transaction rollbacks pass with 100% production fidelity."
    ],
    "terminalLab": "npm test -- test/integration/order-flow.test.js",
    "hints": [
      "Use @testcontainers/postgresql to spin up the container in Jest beforeAll()."
    ],
    "solutionCode": "import { PostgreSqlContainer } from '@testcontainers/postgresql';\n\nlet container;\nbeforeAll(async () => {\n  container = await new PostgreSqlContainer('postgres:16-alpine').start();\n  process.env.DATABASE_URL = container.getConnectionUri();\n  await runMigrations();\n});\nafterAll(async () => {\n  await container.stop();\n});",
    "solutionExplanation": "Testing against real PostgreSQL instances inside ephemeral containers uncovers real-world database syntax, constraint, and locking errors before code ever deploys."
  },
  "selfCheckQuestions": [
    {
      "category": "WHAT",
      "question": "What are the core differences between testing with in-memory mocks versus real containerized dependencies using Testcontainers?",
      "answerExplanation": "In-memory mocks (mocking DB queries or Redis clients) test your application logic against assumptions of how the database behaves, often missing real-world SQL syntax errors, transaction isolation anomalies, foreign key constraints, and specific PostgreSQL extension behaviors. Testcontainers programmatically spins up real, ephemeral Docker containers for PostgreSQL and Redis during test runs, executing true integration tests against real databases."
    },
    {
      "category": "WHY",
      "question": "Why are multi-stage Docker builds essential for production backend security and performance?",
      "answerExplanation": "Multi-stage builds separate the compile/build environment from the final production runtime image. Heavy compilers (Go compiler, TypeScript tsc), development dependencies (devDependencies, build tools), and source code remain behind in early build stages. The final image copies only the compiled binary or stripped production files into a minimal, rootless base image (e.g., alpine or distroless), shrinking image size from 1.5GB to <50MB and drastically reducing vulnerabilities and attack surface."
    },
    {
      "category": "HOW",
      "question": "How do you implement zero-downtime rolling deployments and blue-green health check gates without dropping in-flight requests?",
      "answerExplanation": "Configure two distinct health probes: a livenessProbe (detects if the process crashed) and a readinessProbe (verifies the service has established DB connections and is ready to accept traffic). During a rolling deployment, the load balancer only routes traffic to new pods after they pass the readinessProbe. The old pods receive SIGTERM, stop accepting new traffic, finish processing current requests, and exit cleanly, achieving 100% zero dropped requests."
    }
  ]
};

export default topic;
