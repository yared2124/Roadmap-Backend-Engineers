import { RoadmapTopic } from '../../types/roadmap';

export const topic: RoadmapTopic = {
  "id": "routing-request-dispatching",
  "number": 4,
  "title": "Routing & Request Dispatching (Radix Trees, Versioning)",
  "phaseId": 1,
  "phaseName": "Foundations & Web Protocols",
  "duration": "18 min",
  "timeEstimates": {
    "video": "26 min",
    "reading": "30 min",
    "lab": "45 min",
    "total": "1 hr 41 min"
  },
  "youtubeId": "m-O5gqCGanA",
  "youtubeChannelUrl": "https://www.youtube.com/@VividCode",
  "secondaryVideo": {
    "youtubeId": "6ULyxuHKxg8",
    "title": "API Gateway Architecture & Request Routing",
    "duration": "8 min",
    "description": "ByteByteGo explains how API Gateways decouple clients from internal services, handling centralized request routing, rate limiting, and SSL termination."
  },
  "shortSummary": "URL dispatching, Trie and Radix tree data structures, path parameters, route grouping, and API versioning strategies.",
  "seniorInsight": {
    "quote": "Never break public API contracts. URL versioning (/v1) allows internal schema refactoring without bricking mobile applications in the wild.",
    "productionLesson": "Linear regex-based routers degrade to O(N) lookup time as routes grow into hundreds. Production web frameworks (Go Gin/Chi, Fastify) utilize Radix Trees (O(K) where K is URL path depth), maintaining constant lookup speed.",
    "commonMistake": "Failing to return 405 Method Not Allowed with an 'Allow' header when a route matches the URL path but not the HTTP verb."
  },
  "coreDeepDive": {
    "what": "Routing is the mechanism of matching incoming HTTP Method + URL Path combinations to the designated controller handler function.",
    "why": "Efficient routing enables scalable API discovery, clean resource nesting, and hierarchical middleware application.",
    "howItWorks": [
      "1. Static prefixes are organized into Radix Tree edges with shared common prefixes.",
      "2. Dynamic parameterized nodes (:userId) match variable path segments and inject them into request parameters.",
      "3. Catch-all wildcards (*filepath) handle remaining subpath captures."
    ],
    "blueprintTitle": "Radix Tree Routing Structure",
    "blueprintCode": "/api\n  └── /v1\n        ├── /users\n        │     └── /:id (GET, PUT, DELETE)\n        │           └── /orders (GET)\n        └── /auth\n              ├── /login (POST)\n              └── /register (POST)",
    "blueprintLanguage": "text"
  },
  "recommendedBook": {
    "title": "Microservices Architecture Patterns",
    "author": "Chris Richardson",
    "keyChapters": "API Gateway & Request Routing Pattern",
    "whyReadThis": "Practical guide explaining request dispatching, path routing, protocol translation, and versioning across backend endpoints.",
    "readingUrl": "https://microservices.io/patterns/apigateway.html"
  },
  "handsOnChallenge": {
    "ticketNumber": "TICKET-004",
    "title": "Implement API Versioning and Method Validation",
    "scenario": "Refactor unversioned flat routes into structured /api/v1 groups and ensure invalid HTTP methods return 405 with an Allow header.",
    "acceptanceCriteria": [
      "Prefix all resource routes with /api/v1.",
      "Return 405 Method Not Allowed when method does not match.",
      "Include the Allow header listing supported methods."
    ],
    "terminalLab": "# Test 405 response\ncurl -i -X POST https://api.github.com/zen",
    "hints": [
      "Inspect RFC 9110 Section 15.5.6: 405 responses MUST generate an Allow header field containing supported methods."
    ],
    "solutionCode": "app.use('/api/v1/users', (req, res) => {\n  if (!['GET', 'POST'].includes(req.method)) {\n    res.setHeader('Allow', 'GET, POST');\n    return res.status(405).json({ error: 'Method Not Allowed' });\n  }\n});",
    "solutionExplanation": "Returning 405 rather than 404 communicates to the client that the endpoint exists but the HTTP verb is incorrect."
  },
  "selfCheckQuestions": [
    {
      "category": "WHAT",
      "question": "What is a Radix Tree (Compact Prefix Tree), and why is it superior to linear regex matching for HTTP routers?",
      "answerExplanation": "A Radix tree is an edge-optimized trie where nodes with single children are merged. Lookup complexity is O(k) where k is the URL path length, independent of the total number of registered routes (N). Linear regex arrays run in O(N * M) time and allocate heap memory per request, creating severe CPU overhead and GC latency under high throughput."
    },
    {
      "category": "WHY",
      "question": "Why should API versioning be implemented via URL paths (/v1/users) or custom MIME headers rather than query params or breaking payload changes?",
      "answerExplanation": "URL path and header versioning provide unambiguous routing boundaries for API gateways, caching layers (Vary headers), and Web Application Firewalls (WAF). They allow deprecated endpoints and newer versions to coexist safely in parallel with distinct schemas, metrics, and security policies without breaking legacy mobile or enterprise consumers."
    },
    {
      "category": "HOW",
      "question": "How do you design a route dispatcher that handles dynamic parameterized routes (/users/:id) alongside catch-all static wildcards (/users/*filepath) without routing ambiguity?",
      "answerExplanation": "Store routes in priority-ordered radix branches where static exact matches have the highest precedence, followed by named parameter child nodes, and finally wildcard/catch-all nodes. The router traverses the exact prefix first; if evaluation fails or returns 404, it backtracks to evaluate parameter and wildcard edges."
    }
  ]
};

export default topic;
