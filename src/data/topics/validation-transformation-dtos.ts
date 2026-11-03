import { RoadmapTopic } from '../../types/roadmap';

export const topic: RoadmapTopic = {
  "id": "validation-transformation-dtos",
  "number": 8,
  "title": "Validation & Transformation (Data Transfer Objects - DTOs, Schema Guards)",
  "phaseId": 2,
  "phaseName": "Core API Architecture & Request Lifecycle",
  "duration": "37 min",
  "timeEstimates": {
    "video": "37 min",
    "reading": "30 min",
    "lab": "45 min",
    "total": "1 hr 52 min"
  },
  "youtubeId": "Dgym6yLNUbM",
  "youtubeChannelUrl": "https://www.youtube.com/@ByteAndBeyondWithUday",
  "shortSummary": "Data Transfer Objects (DTOs), schema guards (Zod/class-validator), type coercion, stripping mass-assignment fields, and domain primitives.",
  "seniorInsight": {
    "quote": "Make illegal states unrepresentable. A validated DTO guarantees that business services never deal with undefined, null, or malformed data.",
    "productionLesson": "Never pass raw request bodies directly into database ORM save methods. Attackers exploit Mass Assignment vulnerabilities by submitting fields like { role: 'admin', isVerified: true } to elevate permissions.",
    "commonMistake": "Validating data inside controllers instead of enforcing strict schema validation at the HTTP boundary."
  },
  "coreDeepDive": {
    "what": "DTO validation parses raw, untrusted client inputs, coerces types, strips unrecognized properties, and guarantees type safety before entering service layers.",
    "why": "Eliminates injection attacks, prevents unexpected runtime null pointers, and shields database schemas from mass assignment exploits.",
    "howItWorks": [
      "1. HTTP request payload lands in controller boundary.",
      "2. Validation schema parses and validates fields (email, password strength, regex).",
      "3. Unknown keys are rejected or stripped (.strict()).",
      "4. Validated DTO object is passed into the service layer."
    ],
    "blueprintTitle": "DTO Validation & Domain Guard",
    "blueprintCode": "import { z } from \"zod\";\n\nexport const UpdateProfileSchema = z.object({\n  displayName: z.string().trim().min(2).max(50),\n  bio: z.string().max(500).optional(),\n  // Strict mode explicitly throws if client attempts to inject 'role' or 'isAdmin'\n}).strict();\n\nexport type UpdateProfileDTO = z.infer<typeof UpdateProfileSchema>;",
    "blueprintLanguage": "typescript"
  },
  "recommendedBook": {
    "title": "OWASP Secure Coding Practice Guidelines",
    "author": "OWASP Foundation",
    "keyChapters": "Input Validation & Data Transfer Object (DTO) Cheat Sheet",
    "whyReadThis": "Industry standard guide on allow-list validation, schema guards, type coercion defense, and preventing mass assignment vulnerabilities.",
    "readingUrl": "https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html"
  },
  "handsOnChallenge": {
    "ticketNumber": "TICKET-008",
    "title": "Prevent Mass Assignment Security Vulnerability",
    "scenario": "An attacker upgraded their account to superadmin by sending { role: 'ADMIN' } in the user profile update endpoint.",
    "acceptanceCriteria": [
      "Create a strict DTO schema that only permits allowed fields (name, bio).",
      "Reject requests with unknown keys with a 400 Bad Request explaining the violation."
    ],
    "terminalLab": "# Simulate exploit payload\ncurl -X PUT http://localhost:3000/api/profile -H \"Content-Type: application/json\" -d '{\"name\": \"Alice\", \"role\": \"ADMIN\"}'",
    "hints": [
      "Use Zod's .strict() or Joi's .unknown(false) to disallow unexpected properties."
    ],
    "solutionCode": "const schema = z.object({\n  name: z.string().min(1),\n  bio: z.string().optional()\n}).strict();\n\nfunction validate(req, res, next) {\n  const result = schema.safeParse(req.body);\n  if (!result.success) return res.status(400).json({ error: result.error.format() });\n  req.validatedBody = result.data;\n  next();\n}",
    "solutionExplanation": "Strict validation rejects any property not explicitly declared in the DTO whitelist, blocking unauthorized state tampering."
  },
  "selfCheckQuestions": [
    {
      "category": "WHAT",
      "question": "What is the difference between a Data Transfer Object (DTO) and a Database Domain Entity?",
      "answerExplanation": "A DTO is a transport-layer schema that models only the data crossing network boundaries (inbound payloads or outbound responses), optimized for validation, serialization, and hiding internal secrets. A Database Domain Entity models internal state, business invariants, and persistence table structures (including sensitive fields like password hashes and internal tenant IDs) that must never be exposed directly to the outside world."
    },
    {
      "category": "WHY",
      "question": "Why is Mass Assignment vulnerability a critical risk when ORM entities are bound directly to HTTP request bodies?",
      "answerExplanation": "If an API binds incoming JSON directly to a database entity, an attacker can inject undeclared fields into the JSON payload (e.g., {'role': 'admin', 'is_verified': true}). The ORM blindly updates these database columns, leading to full privilege escalation and unauthorized data corruption."
    },
    {
      "category": "HOW",
      "question": "How do you design a schema guard that sanitizes incoming inputs, strips unexpected keys, and returns RFC 7807 compliant validation errors?",
      "answerExplanation": "Use strict schema libraries (Zod, Joi, class-validator) configured with .strict() or stripUnknown: false to throw errors on unexpected fields. Transform raw inputs with schema validators before handing them to handlers. When validation fails, collect all field errors and serialize them into an application/problem+json payload listing exact parameter paths and failure reasons."
    }
  ]
};

export default topic;
