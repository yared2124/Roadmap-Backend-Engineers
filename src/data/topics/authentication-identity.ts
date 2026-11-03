import { RoadmapTopic } from '../../types/roadmap';

export const topic: RoadmapTopic = {
  "id": "authentication-identity",
  "number": 20,
  "title": "Authentication & Identity (Sessions, JWTs, Refresh Token Rotation, Cookies)",
  "phaseId": 4,
  "phaseName": "Security & Access Control",
  "duration": "37 min",
  "timeEstimates": {
    "video": "1 hr 19 min",
    "reading": "40 min",
    "lab": "45 min",
    "total": "2 hr 44 min"
  },
  "youtubeId": "2PPSXonhIck",
  "youtubeChannelUrl": "https://www.youtube.com/@CodeRealm",
  "secondaryVideo": {
    "youtubeId": "T0k-3Ze4NLo",
    "title": "JWT - JSON Web Token Crash Course (NodeJS & Postgres)",
    "duration": "42 min",
    "description": "Hussein Nasser explains stateful cookie sessions vs stateless JWT tokens, token architecture, cryptographic signing, and production security tradeoffs."
  },
  "shortSummary": "Stateful session cookies (HttpOnly, Secure, SameSite) vs stateless JWTs, cryptographic signing (RS256), and refresh token rotation with reuse detection.",
  "seniorInsight": {
    "quote": "Never store JWTs in localStorage. Any third-party npm package or XSS vulnerability can read localStorage and exfiltrate credentials instantly.",
    "productionLesson": "Stateless JWTs cannot be revoked without maintaining a centralized revocation list, which defeats the purpose of being stateless. Use short-lived access tokens (15 minutes) paired with stateful refresh tokens stored in HttpOnly, SameSite=Strict cookies with automatic reuse detection.",
    "commonMistake": "Using symmetric HS256 with weak secrets instead of asymmetric RS256 / EdDSA key pairs."
  },
  "coreDeepDive": {
    "what": "Authentication proves WHO a user is; Identity management issues cryptographically verifiable credentials and maintains active sessions.",
    "why": "Protects sensitive user data, prevents account takeover, and establishes accountability for operations.",
    "howItWorks": [
      "1. User submits credentials; backend verifies password using Argon2id or bcrypt (cost factor >= 12).",
      "2. Server issues short-lived JWT access token and saves refresh token family UUID in Redis.",
      "3. Refresh token is delivered in an HttpOnly, Secure, SameSite=Strict cookie.",
      "4. If a refresh token is reused, all tokens in the family are instantly revoked (Breach Detection)."
    ],
    "blueprintTitle": "Refresh Token Rotation & Reuse Detection",
    "blueprintCode": "[Client submits Refresh Token #1]\n       │\n       ▼\n[Server validates Token #1 in DB]\n    ├── If Valid:\n    │     ├── Delete Token #1\n    │     ├── Issue Token #2 + Access Token\n    │     └── Return to client\n    └── If Token #1 was ALREADY used:\n          ├── THEFT DETECTED!\n          ├── Invalidate ALL refresh tokens for this User\n          └── Force re-authentication",
    "blueprintLanguage": "text"
  },
  "recommendedBook": {
    "title": "OWASP Authentication Cheat Sheet",
    "author": "OWASP Foundation",
    "keyChapters": "Authentication & Password Storage, Multi-Factor Auth, and Session Defense",
    "whyReadThis": "Exhaustive industry standard on password hashing (Argon2id/bcrypt), session IDs, JWT claims, and refresh token security.",
    "readingUrl": "https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html"
  },
  "handsOnChallenge": {
    "ticketNumber": "TICKET-017",
    "title": "Implement Refresh Token Rotation with Token Family Revocation",
    "scenario": "If an attacker intercepts a refresh token and uses it, the legitimate user's subsequent attempt should trigger immediate invalidation of the entire token family.",
    "acceptanceCriteria": [
      "Track token family ID and parent token ID in database.",
      "On reuse attempt, wipe all tokens for that user ID and log security incident."
    ],
    "terminalLab": "curl -X POST http://localhost:3000/api/auth/refresh -b \"refreshToken=stolen-token-uuid\"",
    "hints": [
      "Store a 'used: boolean' flag on each refresh token record in the database."
    ],
    "solutionCode": "async function rotateToken(tokenStr) {\n  const token = await db.findToken(tokenStr);\n  if (token.used) {\n    await db.revokeAllUserTokens(token.userId);\n    throw new SecurityBreachError('Token reuse detected. All sessions revoked.');\n  }\n  await db.markUsed(token.id);\n  return db.createToken({ userId: token.userId, familyId: token.familyId });\n}",
    "solutionExplanation": "Token family tracking instantly detects when two entities possess the same token, quarantining compromised accounts automatically."
  },
  "selfCheckQuestions": [
    {
      "category": "WHAT",
      "question": "What is the difference between a stateful session store and a stateless JSON Web Token (JWT) at the architecture layer?",
      "answerExplanation": "Stateful sessions store session IDs in the client cookie and full user metadata/permissions in a centralized server store (e.g., Redis). Every request requires a Redis lookup, but session revocation is instant. Stateless JWTs encode user identity, claims, and cryptographically signed signatures inside the token itself; servers verify signatures locally using public keys without database lookups, making revocation before expiry difficult."
    },
    {
      "category": "WHY",
      "question": "Why is storing JWT tokens in browser localStorage an insecure vulnerability compared to httpOnly, Secure, SameSite cookies?",
      "answerExplanation": "Any script executing on the page (including malicious third-party packages or Cross-Site Scripting / XSS exploits) can read localStorage and exfiltrate user tokens. Cookies configured with HttpOnly are inaccessible to JavaScript, Secure ensures transmission only over HTTPS, and SameSite=Strict/Lax prevents Cross-Site Request Forgery (CSRF)."
    },
    {
      "category": "HOW",
      "question": "How do you implement Refresh Token Rotation with automatic theft detection?",
      "answerExplanation": "Issue an Access Token (15 min) and a cryptographically random Refresh Token (7 days) stored in a database family table. When the client exchanges the Refresh Token, invalidate it immediately and issue a new pair. If an invalidated or already-used Refresh Token is submitted, detect token reuse as theft, immediately invalidate the entire token family, and force the user to re-authenticate."
    }
  ]
};

export default topic;
