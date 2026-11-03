import { RoadmapTopic } from '../../types/roadmap';

export const topic: RoadmapTopic = {
  "id": "graceful-shutdown-fault-tolerance",
  "number": 33,
  "title": "Graceful Shutdown & Fault Tolerance (SIGTERM handling, Drain connections)",
  "phaseId": 6,
  "phaseName": "Reliability, Resilience & Observability",
  "duration": "36 min",
  "timeEstimates": {
    "video": "45 min",
    "reading": "30 min",
    "lab": "45 min",
    "total": "2 hrs"
  },
  "youtubeId": "6rfBgphiCWM",
  "youtubeChannelUrl": "https://www.youtube.com/@sriniously",
  "secondaryVideo": {
    "youtubeId": "3Lis4w4_bBc",
    "title": "8 Critical Rules for Designing Fault-Tolerant Distributed Systems",
    "duration": "9 min",
    "description": "ByteByteGo illustrates redundancy, circuit breakers, graceful degradation, health probes, and self-healing mechanisms under real-world infrastructure failures."
  },
  "shortSummary": "Intercepting SIGTERM/SIGINT signals, stopping new connections, draining in-flight HTTP requests, and releasing database pools cleanly.",
  "seniorInsight": {
    "quote": "When Kubernetes redeploys your app, it sends a SIGTERM. If your app doesn't handle it gracefully, users will see 502 Bad Gateway errors during every deployment.",
    "productionLesson": "Graceful shutdown requires three steps: 1) Stop listening for new incoming HTTP connections. 2) Allow active in-flight requests and background jobs to finish (up to a timeout budget, e.g. 15 seconds). 3) Close database pools and Redis connections cleanly before calling process.exit(0).",
    "commonMistake": "Immediately closing database connection pools upon receiving SIGTERM while in-flight HTTP requests are still actively executing queries."
  },
  "coreDeepDive": {
    "what": "Graceful shutdown ensures an application process terminates safely without dropping active network connections or corrupting state.",
    "why": "Eliminates 502 Bad Gateway errors during rolling updates and deployments in Kubernetes, ECS, or Docker Swarm.",
    "howItWorks": [
      "1. Orchestrator sends SIGTERM signal to container process.",
      "2. Server stops accepting new connections; health check begins returning 503.",
      "3. In-flight HTTP requests are granted a grace period (e.g. 10-20 seconds) to complete.",
      "4. Database connection pools, queue consumers, and file handles are closed.",
      "5. Process terminates with exit code 0."
    ],
    "blueprintTitle": "Production Graceful Shutdown Lifecycle",
    "blueprintCode": "[SIGTERM Received]\n       │\n       ▼\n1. Stop accepting NEW connections (server.close())\n       │\n       ▼\n2. Drain in-flight HTTP requests (Wait up to 15s)\n       │\n       ▼\n3. Finish or pause background queue jobs\n       │\n       ▼\n4. Close Database Pools & Redis Connections\n       │\n       ▼\n5. Terminate cleanly: process.exit(0)",
    "blueprintLanguage": "text"
  },
  "recommendedBook": {
    "title": "The Twelve-Factor App",
    "author": "Adam Wiggins",
    "keyChapters": "Factor IX: Disposability (Maximize Robustness with Fast Startup and Graceful Shutdown)",
    "whyReadThis": "The canonical principle for handling SIGTERM signals, connection draining, and zero-downtime rolling deploys.",
    "readingUrl": "https://12factor.net/disposability"
  },
  "handsOnChallenge": {
    "ticketNumber": "TICKET-029",
    "title": "Implement Zero-Downtime Graceful Shutdown Handler",
    "scenario": "Deployments in production trigger intermittent 502 Bad Gateway errors for active users completing checkouts.",
    "acceptanceCriteria": [
      "Listen to process.on('SIGTERM') and process.on('SIGINT').",
      "Stop server from accepting new traffic while allowing existing requests to finish.",
      "Force exit with code 1 after 20-second timeout if requests do not finish."
    ],
    "terminalLab": "kill -SIGTERM $(pgrep -f \"node src/server.js\")",
    "hints": [
      "server.close() stops accepting new requests while allowing current requests to complete."
    ],
    "solutionCode": "function setupGracefulShutdown(server, dbPool) {\n  const shutdown = async (signal) => {\n    console.log('Received ' + signal + '. Shutting down gracefully...');\n    server.close(async () => {\n      console.log('HTTP connections drained.');\n      await dbPool.end();\n      console.log('Database connections closed.');\n      process.exit(0);\n    });\n    setTimeout(() => {\n      console.error('Forcefully terminating: shutdown timeout exceeded');\n      process.exit(1);\n    }, 20000);\n  };\n  process.on('SIGTERM', () => shutdown('SIGTERM'));\n  process.on('SIGINT', () => shutdown('SIGINT'));\n}",
    "solutionExplanation": "Coordinating server connection closure with database pool termination guarantees zero dropped requests during rolling deployments."
  },
  "selfCheckQuestions": [
    {
      "category": "WHAT",
      "question": "What happens during a graceful shutdown when a Kubernetes pod receives a SIGTERM signal?",
      "answerExplanation": "When SIGTERM is emitted, the service should: (1) stop accepting new incoming TCP connections on its listening port, (2) inform load balancers to deregister the instance from routing, (3) allow all currently in-flight HTTP requests and background database transactions to complete within a grace period (e.g., 30s), (4) close database connection pools and message broker sockets cleanly, and (5) exit with code 0."
    },
    {
      "category": "WHY",
      "question": "Why does killing a backend process abruptly with SIGKILL (-9) cause database lock contention and corrupted file writes?",
      "answerExplanation": "SIGKILL terminates the operating system process instantly without executing language cleanup handlers, defer statements, or finally blocks. In-flight database transactions remain open on the database server until connection timeout detection terminates them, holding table locks and blocking other active queries. Partially written files or network socket buffers become corrupted."
    },
    {
      "category": "HOW",
      "question": "How do you implement a graceful shutdown handler in Node.js or Go that waits for active HTTP requests to drain?",
      "answerExplanation": "Listen for SIGINT and SIGTERM. Upon receipt, call server.close() (which stops accepting new connections but keeps existing sockets open). Start a fallback deadline timer (e.g., 25 seconds). When the server's close callback fires, close database pools (await db.end()) and Redis connections. If the deadline fires first, log a timeout warning and force exit with process.exit(1)."
    }
  ]
};

export default topic;
