import { RoadmapTopic } from '../../types/roadmap';

export const topic: RoadmapTopic = {
  "id": "robust-error-handling",
  "number": 30,
  "title": "Robust Error Handling (RFC 7807/9457 Problem Details, Error Domains)",
  "phaseId": 6,
  "phaseName": "Reliability, Resilience & Observability",
  "duration": "32 min",
  "timeEstimates": {
    "video": "32 min",
    "reading": "30 min",
    "lab": "45 min",
    "total": "1 hr 47 min"
  },
  "youtubeId": "ovnyeq-Xxrc",
  "youtubeChannelUrl": "https://www.youtube.com/@WebDevSimplified",
  "shortSummary": "Standardized RFC 9457 Problem Details, operational vs programmer errors, centralized error handling, and scrubbing sensitive stack traces.",
  "seniorInsight": {
    "quote": "Never leak internal database errors or stack traces to clients in production. Return clean, standardized RFC 9457 Problem Details.",
    "productionLesson": "Differentiate between Operational Errors (expected failures like 404 Not Found, 422 Invalid Input) and Programmer Errors (unexpected null pointers, database crashes). Operational errors should be gracefully returned; programmer errors should be logged with stack traces and trigger alerting.",
    "commonMistake": "Returning 200 OK with { success: false, error: '...' } inside the body, which breaks HTTP proxy caching and client error listeners."
  },
  "coreDeepDive": {
    "what": "Standardized error handling structures all error responses into predictable RFC 9457 application/problem+json payloads.",
    "why": "Allows API clients, mobile apps, and SDKs to parse errors deterministically without custom string parsing.",
    "howItWorks": [
      "1. Domain errors throw structured AppError exceptions with HTTP status codes and machine-readable error codes.",
      "2. Centralized error middleware catches unhandled exceptions.",
      "3. In development, stack traces are displayed; in production, stack traces are scrubbed and replaced with a correlation ID."
    ],
    "blueprintTitle": "RFC 9457 Standardized Error Format",
    "blueprintCode": "// HTTP/1.1 409 Conflict\n// Content-Type: application/problem+json\n{\n  \"type\": \"https://api.example.com/errors/email-already-registered\",\n  \"title\": \"Email Conflict\",\n  \"status\": 409,\n  \"detail\": \"The email user@example.com is already associated with an account.\",\n  \"instance\": \"/users/registration\",\n  \"code\": \"EMAIL_ALREADY_EXISTS\"\n}",
    "blueprintLanguage": "json"
  },
  "recommendedBook": {
    "title": "RFC 9457: Problem Details for HTTP APIs (IETF Standard)",
    "author": "Mark Nottingham, Erik Wilde & Sanjay Dalal",
    "keyChapters": "RFC 9457 Specification (Standardizing Machine-Readable Error Responses)",
    "whyReadThis": "The official IETF standard defining type, title, status, and detail schemas for robust, consistent API error responses.",
    "readingUrl": "https://datatracker.ietf.org/doc/html/rfc9457"
  },
  "handsOnChallenge": {
    "ticketNumber": "TICKET-026",
    "title": "Build Centralized Error Middleware with Stack Trace Scrubbing",
    "scenario": "A database error leaked raw SQL connection strings and table names to the frontend in production.",
    "acceptanceCriteria": [
      "Catch all synchronous and asynchronous errors in a single error handler.",
      "Scrub stack traces in production (NODE_ENV === 'production').",
      "Format responses adhering strictly to RFC 9457 application/problem+json."
    ],
    "terminalLab": "curl -i http://localhost:3000/api/trigger-error",
    "hints": [
      "Ensure the Content-Type response header is set to application/problem+json."
    ],
    "solutionCode": "app.use((err, req, res, next) => {\n  const isDev = process.env.NODE_ENV !== 'production';\n  const status = err.status || 500;\n  res.setHeader('Content-Type', 'application/problem+json');\n  res.status(status).json({\n    type: err.type || 'about:blank',\n    title: err.title || 'Internal Server Error',\n    status,\n    detail: err.message,\n    instance: req.originalUrl,\n    code: err.code || 'INTERNAL_ERROR',\n    ...(isDev && { stack: err.stack })\n  });\n});",
    "solutionExplanation": "Scrubbing internal stack traces from production responses prevents attackers from fingerprinting internal library versions or database topologies."
  },
  "selfCheckQuestions": [
    {
      "category": "WHAT",
      "question": "What is the RFC 7807 / RFC 9457 Problem Details specification, and what core fields must it include?",
      "answerExplanation": "RFC 9457 standardizes machine-readable error responses for HTTP APIs using application/problem+json. It defines five standard fields: type (a URI identifier for the error type), title (a short human-readable summary), status (the HTTP status code), detail (a human-readable explanation specific to this occurrence), and instance (a URI reference identifying the specific occurrence, such as /errors/err_123)."
    },
    {
      "category": "WHY",
      "question": "Why must internal stack traces, SQL syntax errors, and database connection strings never leak to clients in production API responses?",
      "answerExplanation": "Leaking stack traces and database errors gives attackers critical intelligence regarding your software stack, database dialect, table names, file paths, and vulnerable third-party libraries (Information Disclosure vulnerability). It also creates confusing, unparseable responses for frontend clients. Internal details belong in private structured logs."
    },
    {
      "category": "HOW",
      "question": "How do you architect an Error Translation Boundary that maps low-level database and infrastructure errors to high-level domain errors?",
      "answerExplanation": "Wrap repository and external client errors inside typed domain errors (e.g., wrap PostgreSQL error 23505 unique violation into ErrEmailAlreadyRegistered). Controllers catch typed domain errors and map them to HTTP status codes (e.g., ErrEmailAlreadyRegistered -> HTTP 409 Conflict) with clean RFC 9457 messages, while logging the original raw error and stack trace privately."
    }
  ]
};

export default topic;
