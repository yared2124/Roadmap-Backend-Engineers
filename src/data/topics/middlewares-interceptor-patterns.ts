import { RoadmapTopic } from '../../types/roadmap';

export const topic: RoadmapTopic = {
  "id": "middlewares-interceptor-patterns",
  "number": 6,
  "title": "Request Lifecycle: Middlewares & Interceptor Patterns",
  "phaseId": 2,
  "phaseName": "Core API Architecture & Request Lifecycle",
  "duration": "1 hr 46 min",
  "timeEstimates": {
    "video": "1 hr 46 min",
    "reading": "35 min",
    "lab": "45 min",
    "total": "3 hr 6 min"
  },
  "youtubeId": "CnH3kAXSrmU",
  "youtubeChannelUrl": "https://www.youtube.com/@TraversyMedia",
  "shortSummary": "The Onion architecture: Inbound interceptors, auth guards, rate limiters, logging, short-circuiting, and error-handling middleware.",
  "seniorInsight": {
    "quote": "Middlewares are the immune system of your backend. Every cross-cutting concern must be intercepted before reaching business domain handlers.",
    "productionLesson": "Order of middleware execution is critical. If your body-parser middleware runs after your signature verification middleware, raw webhook bytes will be mutated and cryptographic HMAC checks will fail.",
    "commonMistake": "Forgetting to call next() or neglecting to return after sending an HTTP response, triggering 'Headers already sent' runtime crashes."
  },
  "coreDeepDive": {
    "what": "Middleware is a pipeline of functions that intercept HTTP requests and responses before and after controller execution.",
    "why": "Prevents code duplication across endpoints for authentication, request logging, rate limiting, and global error handling.",
    "howItWorks": [
      "1. Request traverses inbound middlewares (Onion exterior -> interior).",
      "2. Any middleware can short-circuit the chain by returning early (e.g. 401 Unauthorized or 429 Too Many Requests).",
      "3. Controller executes core logic and sends response.",
      "4. Response traverses outbound path (e.g. response compression, telemetry timing)."
    ],
    "blueprintTitle": "Onion Middleware Pipeline Execution",
    "blueprintCode": "[Incoming Request]\n       │\n       ▼\n[1. Request Correlation ID & Logger]\n       │\n       ▼\n[2. Rate Limiting & IP Filter]\n       │\n       ▼\n[3. Auth Token Verification (JWT/Session)]\n       │\n       ▼\n[4. Controller Handler Execution]\n       │\n       ▼\n[5. Error Handler Catch-All (if thrown)]",
    "blueprintLanguage": "text"
  },
  "recommendedBook": {
    "title": "Express.js Core Architectural Guides",
    "author": "OpenJS Foundation",
    "keyChapters": "Using Middleware: Pipeline Processing & Request-Response Interceptors",
    "whyReadThis": "Practical architecture guide showing how request lifecycle interceptors, chaining, and error-handling middlewares work under the hood.",
    "readingUrl": "https://expressjs.com/en/guide/using-middleware.html"
  },
  "handsOnChallenge": {
    "ticketNumber": "TICKET-006",
    "title": "Build an Execution-Timing and Request-ID Correlation Middleware",
    "scenario": "Requests are failing across microservices with no trace. Implement a middleware that generates a unique X-Request-ID and measures execution duration.",
    "acceptanceCriteria": [
      "Extract existing X-Request-ID or generate UUIDv7.",
      "Attach request ID to incoming headers and outgoing response headers.",
      "Log request start, completion status code, and total latency in milliseconds."
    ],
    "terminalLab": "curl -i -H \"X-Request-ID: test-trace-uuid-123\" https://httpbin.org/headers",
    "hints": [
      "Use process.hrtime.bigint() for microsecond-precise latency measurement."
    ],
    "solutionCode": "function correlationMiddleware(req, res, next) {\n  const reqId = req.headers['x-request-id'] || crypto.randomUUID();\n  req.id = reqId;\n  res.setHeader('X-Request-ID', reqId);\n  const start = process.hrtime.bigint();\n  res.on('finish', () => {\n    const elapsedMs = Number(process.hrtime.bigint() - start) / 1e6;\n    console.log('[' + reqId + '] ' + req.method + ' ' + req.url + ' ' + res.statusCode + ' - ' + elapsedMs.toFixed(2) + 'ms');\n  });\n  next();\n}",
    "solutionExplanation": "Binding correlation IDs at the outermost middleware layer guarantees that all subsequent logs and sub-service calls carry the same trace identifier."
  },
  "selfCheckQuestions": [
    {
      "category": "WHAT",
      "question": "What is the Onion (Russian Doll) Middleware Pattern, and how does the execution order differ between request entry and response exit?",
      "answerExplanation": "Middlewares wrap the core handler in layers like an onion. Requests execute middleware logic in top-down registration order before reaching the terminal handler. Once the handler returns a response, execution unwinds in reverse (bottom-up) order, allowing outer middlewares (e.g., response compression, audit loggers, timer metrics) to inspect, transform, or calculate duration of the outbound response."
    },
    {
      "category": "WHY",
      "question": "Why should error handling and panic recovery always be placed as the outermost (first) middleware in the chain?",
      "answerExplanation": "Placing recovery at the outermost boundary ensures that unhandled runtime exceptions, panics, or null-pointer errors thrown anywhere in subsequent middlewares or downstream business logic are caught. It prevents the entire server process from crashing and guarantees that a structured HTTP 500 JSON response is returned to the client with an incident reference ID."
    },
    {
      "category": "HOW",
      "question": "How do you build a middleware that attaches a unique Correlation ID / Request ID and propagates it across async boundaries and outgoing HTTP requests?",
      "answerExplanation": "The middleware checks for an incoming X-Correlation-ID header; if missing, it generates a cryptographically secure UUIDv4. It sets the ID in the request context/AsyncLocalStorage and response headers. When the service makes downstream HTTP calls or publishes message broker events, it injects this correlation ID into outgoing headers, establishing an end-to-end distributed trace."
    }
  ]
};

export default topic;
