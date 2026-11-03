import { RoadmapTopic } from '../../types/roadmap';

export const topic: RoadmapTopic = {
  "id": "backend-security-hardening",
  "number": 22,
  "title": "Backend Security & Hardening (OWASP Top 10, CORS, Rate Limiting, SQL Injection/XSS)",
  "phaseId": 4,
  "phaseName": "Security & Access Control",
  "duration": "1 hr 27 min",
  "timeEstimates": {
    "video": "1 hr 41 min",
    "reading": "40 min",
    "lab": "45 min",
    "total": "3 hr 6 min"
  },
  "youtubeId": "YYe0FdfdgDU",
  "youtubeChannelUrl": "https://www.youtube.com/@freecodecamp",
  "secondaryVideo": {
    "youtubeId": "YXkOdWBwqaA",
    "title": "Rate Limiter System Design: Token Bucket, Leaky Bucket & Scaling",
    "duration": "14 min",
    "description": "ByteByteGo breaks down how to design a distributed rate limiter, comparing Token Bucket, Leaky Bucket, and Sliding Window algorithms to prevent DDoS attacks."
  },
  "shortSummary": "OWASP API Security Top 10, parameterized queries, CORS preflight mechanics, Content Security Policy, and rate limiting against DDoS.",
  "seniorInsight": {
    "quote": "String concatenation in SQL queries is professional malpractice. Always use parameterized queries or prepared statements without exception.",
    "productionLesson": "CORS is not a server security boundary—it is a browser security mechanism that restricts what other websites can read from your API. Command-line curl and automated bot scripts ignore CORS completely.",
    "commonMistake": "Setting Access-Control-Allow-Origin: * together with Access-Control-Allow-Credentials: true."
  },
  "coreDeepDive": {
    "what": "Backend hardening applies defensive controls across network transport, application dependencies, database boundaries, and response headers.",
    "why": "Mitigates automated attacks, prevents data breach liabilities, and complies with security standards (SOC2, PCI-DSS, GDPR).",
    "howItWorks": [
      "1. Parameterized Queries: Separates SQL query code from user data variables in database drivers, neutralizing SQL injection.",
      "2. Security Headers: Helmet/HSTS enforces HTTPS, disables MIME-sniffing, and protects iframe embedding (X-Frame-Options).",
      "3. Rate Limiting: Leaky bucket algorithms throttle brute force attempts at login and resource creation endpoints."
    ],
    "blueprintTitle": "Parameterized Query vs SQL Injection",
    "blueprintCode": "-- VULNERABLE: String Concatenation allows ' OR '1'='1 SQL Injection\ndb.query(\"SELECT * FROM users WHERE email = '\" + req.body.email + \"'\");\n\n-- SECURE: Parameterized Query sends SQL plan and data in separate packets\ndb.query(\"SELECT * FROM users WHERE email = $1\", [req.body.email]);",
    "blueprintLanguage": "javascript"
  },
  "recommendedBook": {
    "title": "OWASP API Security Top 10 (2023 Edition)",
    "author": "OWASP Foundation",
    "keyChapters": "API Security Top 10: Rate Limiting, Injection, Broken Object Level Authorization",
    "whyReadThis": "The globally recognized security benchmark for protecting backend APIs against DDoS, credential stuffing, and injection exploits.",
    "readingUrl": "https://owasp.org/API-Security/editions/2023/en/0x11-t10/"
  },
  "handsOnChallenge": {
    "ticketNumber": "TICKET-019",
    "title": "Harden API Headers and Configure Strict CORS Policy",
    "scenario": "Security auditors identified missing HSTS headers, permissive CORS (*), and information disclosure revealing X-Powered-By: Express.",
    "acceptanceCriteria": [
      "Remove X-Powered-By header.",
      "Enable HSTS with max-age=31536000; includeSubDomains.",
      "Whitelist only trusted frontend domain origins in CORS."
    ],
    "terminalLab": "curl -I http://localhost:3000/api/health",
    "hints": [
      "Use helmet() middleware in Express or equivalent security header injectors."
    ],
    "solutionCode": "import helmet from 'helmet';\nimport cors from 'cors';\n\napp.use(helmet());\napp.use(cors({\n  origin: ['https://app.example.com'],\n  credentials: true,\n  methods: ['GET', 'POST', 'PUT', 'DELETE']\n}));",
    "solutionExplanation": "Helmet automates standard security headers (HSTS, CSP, X-Content-Type-Options) and strips runtime fingerprinting headers."
  },
  "selfCheckQuestions": [
    {
      "category": "WHAT",
      "question": "How does Cross-Origin Resource Sharing (CORS) work at the protocol level, and what triggers an HTTP OPTIONS Preflight request?",
      "answerExplanation": "CORS is a browser security mechanism that restricts cross-origin HTTP requests. A preflight OPTIONS request is sent before the actual request if the request uses methods other than GET/POST/HEAD, includes custom headers (like Authorization), or has a Content-Type other than text/plain, multipart/form-data, or application/x-www-form-urlencoded. The browser sends Origin and checks for Access-Control-Allow-Origin."
    },
    {
      "category": "WHY",
      "question": "Why do SQL prepared statements (parameterized queries) completely prevent SQL Injection, whereas string sanitization fails?",
      "answerExplanation": "Prepared statements send the SQL query template and the parameter data in two completely separate protocol packets. The database engine compiles and optimizes the SQL execution plan before inserting the user data. The user data is treated strictly as literal scalar values, making it mathematically impossible for malicious input to alter the SQL syntax structure."
    },
    {
      "category": "HOW",
      "question": "How do you implement a distributed sliding-window rate limiter using Redis sorted sets (ZSET)?",
      "answerExplanation": "For each client IP, maintain a Redis ZSET where both member and score are the current timestamp in milliseconds. Use a Redis transaction/pipeline: (1) ZREMRANGEBYSCORE key 0 (now - window_size) to drop expired timestamps, (2) ZCARD key to count current requests, (3) if count < limit, ZADD key now now and EXPIRE key window_size. If count >= limit, calculate retry delay from the oldest element and return HTTP 429."
    }
  ]
};

export default topic;
