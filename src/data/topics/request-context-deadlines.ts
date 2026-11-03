import { RoadmapTopic } from '../../types/roadmap';

export const topic: RoadmapTopic = {
  "id": "request-context-deadlines",
  "number": 7,
  "title": "Request Context & Cancellation Deadlines",
  "phaseId": 2,
  "phaseName": "Core API Architecture & Request Lifecycle",
  "duration": "33 min",
  "timeEstimates": {
    "video": "33 min",
    "reading": "30 min",
    "lab": "45 min",
    "total": "1 hr 48 min"
  },
  "youtubeId": "LSzR0VEraWw",
  "youtubeChannelUrl": "https://www.youtube.com/@JustForFunc",
  "shortSummary": "Context propagation, cancellation signals, deadline timeouts, and preventing zombie database queries when clients disconnect.",
  "seniorInsight": {
    "quote": "When a user closes their browser tab, your server should immediately stop burning CPU and abort pending database queries.",
    "productionLesson": "Always pass the request context or AbortSignal into database queries and downstream HTTP fetches. Without deadline propagation, a slow 30-second query will continue running on PostgreSQL even though the client gave up 29 seconds ago.",
    "commonMistake": "Creating detached background promises inside HTTP handlers that run indefinitely without cancellation boundaries."
  },
  "coreDeepDive": {
    "what": "Request Context carries request-scoped values, cancellation signals, and deadlines across API boundaries, worker goroutines, and database drivers.",
    "why": "Halts wasted compute and prevents database pool exhaustion when users abandon slow requests.",
    "howItWorks": [
      "1. Middleware attaches an AbortController or context.WithTimeout(ctx, 3*time.Second).",
      "2. The cancellation signal is passed into database queries (e.g. pg.query({ text, signal })).",
      "3. If the client socket closes or timeout expires, the signal triggers an abort event.",
      "4. PostgreSQL driver sends an immediate cancel packet to terminate the remote query."
    ],
    "blueprintTitle": "Context Cancellation Propagation",
    "blueprintCode": "[Client Disconnects / Timeout Expires]\n       │\n       ▼ (AbortSignal Emitted)\n[Express / Go HTTP Context]\n       ├── [Downstream Fetch Aborted]\n       └── [PostgreSQL Query Cancelled via Driver]",
    "blueprintLanguage": "text"
  },
  "recommendedBook": {
    "title": "Go Concurrency & Context Patterns",
    "author": "Sameer Ajmani (Go Core Team)",
    "keyChapters": "Go Concurrency Patterns: Context (Deadlines, Cancellation & Request Scopes)",
    "whyReadThis": "The definitive master guide on propagating cancellation signals, preventing leaked goroutines, and enforcing SLA timeouts across backend microservices.",
    "readingUrl": "https://go.dev/blog/context"
  },
  "handsOnChallenge": {
    "ticketNumber": "TICKET-007",
    "title": "Cancel Long-Running Database Query on Client Disconnect",
    "scenario": "A heavy analytics query causes database connection pool starvation when users refresh the dashboard repeatedly.",
    "acceptanceCriteria": [
      "Attach AbortSignal to database query.",
      "Simulate client disconnect with curl --max-time 1.",
      "Verify in PostgreSQL pg_stat_activity that query terminates immediately."
    ],
    "terminalLab": "# Simulate client closing connection after 1 second\ncurl -m 1 http://localhost:3000/api/heavy-query",
    "hints": [
      "Listen to req.on('close') in Node.js or inspect ctx.Done() in Go."
    ],
    "solutionCode": "app.get('/api/heavy-query', async (req, res) => {\n  const controller = new AbortController();\n  req.on('close', () => controller.abort());\n  try {\n    const result = await db.query('SELECT pg_sleep(10)', { signal: controller.signal });\n    res.json(result);\n  } catch (err) {\n    if (err.name === 'AbortError') console.log('Query successfully cancelled');\n  }\n});",
    "solutionExplanation": "Propagating the cancellation signal to PostgreSQL instructs the database engine to release locks and terminate execution immediately."
  },
  "selfCheckQuestions": [
    {
      "category": "WHAT",
      "question": "What is a Request Context, and what are the only two types of data that should be stored inside it?",
      "answerExplanation": "A Request Context is an immutable scoped container that travels across function boundaries throughout a single request's lifecycle. It should strictly carry: (1) Cancellation signals and deadlines/timeouts, and (2) Request-scoped metadata required across layers (such as authenticated User ID, Tenant ID, and Correlation/Trace IDs). It must NEVER be used to pass optional parameters or database connection pools."
    },
    {
      "category": "WHY",
      "question": "Why is downstream cancellation propagation essential when an upstream HTTP client closes its connection or aborts a request?",
      "answerExplanation": "If a client closes their browser or times out after 2 seconds, continuing to run an expensive 10-second database query or external API call is a waste of server CPU, memory, and database connection pool slots. Propagating context cancellation aborts DB transactions and socket operations immediately, protecting the backend from cascading resource exhaustion."
    },
    {
      "category": "HOW",
      "question": "How do you correctly configure timeout deadlines for database drivers and external HTTP clients using Context in Go or Node.js?",
      "answerExplanation": "Derive a child context with context.WithTimeout(parentCtx, 3*time.Second) or create an AbortController in Node with AbortSignal.timeout(3000). Pass this context/signal to db.QueryContext() and http.NewRequestWithContext(). If the deadline expires, the driver cancels the pending socket I/O and returns context.DeadlineExceeded, allowing you to immediately return HTTP 504 Gateway Timeout."
    }
  ]
};

export default topic;
