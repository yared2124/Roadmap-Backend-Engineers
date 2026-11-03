import { RoadmapTopic } from '../../types/roadmap';

export const topic: RoadmapTopic = {
  "id": "http-protocol-deep-dive",
  "number": 3,
  "title": "HTTP Protocol Deep Dive (HTTP/1.1 vs HTTP/2 vs HTTP/3, Headers, Status Codes, Idempotency)",
  "phaseId": 1,
  "phaseName": "Foundations & Web Protocols",
  "duration": "39 min",
  "timeEstimates": {
    "video": "49 min",
    "reading": "45 min",
    "lab": "45 min",
    "total": "2 hr 19 min"
  },
  "youtubeId": "iYM2zFP3Zn0",
  "youtubeChannelUrl": "https://www.youtube.com/@TraversyMedia",
  "secondaryVideo": {
    "youtubeId": "WvSVSbGo0wI",
    "title": "HTTP vs HTTPS: TLS Handshakes & Packet Mechanics",
    "duration": "10 min",
    "description": "ByteByteGo's animated breakdown of HTTP vs HTTPS, symmetric vs asymmetric encryption, TLS 1.3 handshake negotiation, and SSL/TLS certificate chains."
  },
  "shortSummary": "HTTP/1.1 pipelining, HTTP/2 binary framing & multiplexing, HTTP/3 QUIC over UDP, idempotency, and standardized status codes.",
  "seniorInsight": {
    "quote": "Understanding idempotency separates engineers who build billing race conditions from engineers who build fault-tolerant payment systems.",
    "productionLesson": "Networks will duplicate packets and users will double-click. If state-mutating endpoints (like payments or checkout) lack idempotency keys, duplicate network packets will charge customers multiple times.",
    "commonMistake": "Using GET for mutations, or blindly returning 200 OK with an error payload inside the JSON body."
  },
  "coreDeepDive": {
    "what": "HTTP is the application-layer foundation protocol of the internet, defining methods, headers, status codes, and message semantics.",
    "why": "Adhering to HTTP semantics enables CDN caching, transparent proxy routing, browser prefetching, and robust automated client retries.",
    "howItWorks": [
      "1. Safe methods (GET, HEAD, OPTIONS) never mutate server state.",
      "2. Idempotent methods (PUT, DELETE, GET) produce the identical server state whether executed 1 time or 10 times.",
      "3. HTTP/2 eliminates head-of-line blocking via interleaved binary streams over a single TCP connection.",
      "4. HTTP/3 replaces TCP with QUIC over UDP, preventing packet loss on one stream from stalling unrelated streams."
    ],
    "blueprintTitle": "RFC 9457 Problem Details Standard",
    "blueprintCode": "// HTTP/1.1 422 Unprocessable Entity\n// Content-Type: application/problem+json\n{\n  \"type\": \"https://api.example.com/errors/insufficient-funds\",\n  \"title\": \"Insufficient Account Balance\",\n  \"status\": 422,\n  \"detail\": \"Transfer of 100 ETB requested, but available balance is 45 ETB.\",\n  \"instance\": \"/accounts/acc_9281/transfers\",\n  \"code\": \"INSUFFICIENT_FUNDS\"\n}",
    "blueprintLanguage": "json"
  },
  "recommendedBook": {
    "title": "High Performance Browser Networking (Free Complete Book)",
    "author": "Ilya Grigorik",
    "keyChapters": "Chapter 11: HTTP/2 Binary Framing & Multiplexing",
    "whyReadThis": "The definitive full-text guide explaining binary framing, header compression (HPACK), multiplexed streams, and 0-RTT transport.",
    "readingUrl": "https://hpbn.co/http2/"
  },
  "handsOnChallenge": {
    "ticketNumber": "TICKET-003",
    "title": "Implement Idempotency Key Middleware for Financial Transactions",
    "scenario": "Mobile users on unstable network connections experience dropouts and retry payment requests. Enforce Idempotency-Key headers.",
    "acceptanceCriteria": [
      "Check for presence of Idempotency-Key header.",
      "If key was processed within 24h, return cached status code and payload without re-executing business logic.",
      "If key is active, acquire atomic lock to reject concurrent double submissions with 409 Conflict."
    ],
    "terminalLab": "# Send initial payment request\ncurl -X POST https://httpbin.org/post -H \"Idempotency-Key: 9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d\" -d '{\"amount\": 500}'",
    "hints": [
      "Use Redis SET key payload NX EX 86400 to atomically claim the idempotency token."
    ],
    "solutionCode": "async function idempotencyMiddleware(req, res, next) {\n  const key = req.headers['idempotency-key'];\n  if (!key) return res.status(400).json({ error: 'Missing Idempotency-Key header' });\n  const cached = await redis.get('idemp:' + key);\n  if (cached) {\n    const { status, body } = JSON.parse(cached);\n    return res.status(status).json(body);\n  }\n  next();\n}",
    "solutionExplanation": "Storing completed responses against unique client-generated UUIDs ensures that retries replay the saved outcome safely."
  },
  "selfCheckQuestions": [
    {
      "category": "WHAT",
      "question": "What is Head-of-Line (HoL) blocking, and how does HTTP/3 (QUIC) solve it differently than HTTP/2?",
      "answerExplanation": "In HTTP/1.1, HoL blocking occurs when a slow request blocks subsequent requests on a TCP connection. HTTP/2 multiplexes streams over a single TCP connection, but if one TCP packet drops, the entire TCP window stalls while retransmitting, blocking all streams. HTTP/3 runs over QUIC (UDP), implementing independent packet recovery per stream so packet loss on stream A never halts packets on stream B."
    },
    {
      "category": "WHY",
      "question": "Why is idempotency critical for HTTP methods (PUT, DELETE) and how does unsafe non-idempotency in POST lead to double charges in billing systems?",
      "answerExplanation": "Idempotence guarantees that making identical requests multiple times produces the exact same server state. Because network glitches often drop responses while the server successfully processed the request, the client must safely retry. If a non-idempotent POST /charges is retried blindly, the payment gateway executes duplicate debit transactions."
    },
    {
      "category": "HOW",
      "question": "How do you implement atomic distributed idempotency keys for payment endpoints using Redis and PostgreSQL?",
      "answerExplanation": "The client generates a unique UUID Idempotency-Key header. The backend executes an atomic SET key status:PENDING NX EX 120 in Redis. If the key exists, it returns 409 Conflict or waits for the cached final response. The business operation executes in a DB transaction where the key and processed output are stored; upon completion, Redis updates with the final HTTP status and payload to instantly replay on retries."
    }
  ]
};

export default topic;
