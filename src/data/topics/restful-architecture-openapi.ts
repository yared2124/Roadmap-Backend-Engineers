import { RoadmapTopic } from '../../types/roadmap';

export const topic: RoadmapTopic = {
  "id": "restful-architecture-openapi",
  "number": 10,
  "title": "RESTful Architecture & OpenAPI Standards (Idempotency, Resource Design, API Contracts)",
  "phaseId": 2,
  "phaseName": "Core API Architecture & Request Lifecycle",
  "duration": "45 min",
  "timeEstimates": {
    "video": "55 min",
    "reading": "35 min",
    "lab": "45 min",
    "total": "2 hr 15 min"
  },
  "youtubeId": "lsMQRaeKNDk",
  "youtubeChannelUrl": "https://www.youtube.com/@IBMTechnology",
  "shortSummary": "Resource modeling, RESTful URI design, OpenAPI 3.0 specification, contract-first development, and generating client SDKs.",
  "secondaryVideo": {
    "youtubeId": "PenvYHJ9Koc",
    "title": "Understand OpenAPI in 5 Minutes With Examples",
    "duration": "10 min",
    "description": "Quick walkthrough of OpenAPI 3.0 spec structure, schemas, and Swagger UI generation."
  },
  "seniorInsight": {
    "quote": "Write your OpenAPI spec before writing a single line of backend code. An agreed contract prevents weeks of integration misalignment with frontend and mobile teams.",
    "productionLesson": "Contract-first design allows frontend teams to generate TypeScript clients and mock servers immediately, parallelizing feature development while backend engineers write the implementation.",
    "commonMistake": "Using action verbs in URLs like /api/deleteUser or /api/getUsersById instead of clean REST resources like DELETE /api/users/:id."
  },
  "coreDeepDive": {
    "what": "REST is an architectural style based on stateless resource representations; OpenAPI is the industry-standard machine-readable specification for documenting APIs.",
    "why": "Provides automated interactive documentation (Swagger UI), automated client SDK generation, and contract validation testing.",
    "howItWorks": [
      "1. Resources are nouns: /api/v1/orders, /api/v1/orders/{orderId}/items.",
      "2. HTTP verbs specify operations: POST (create), GET (read), PUT (replace), PATCH (update), DELETE (remove).",
      "3. OpenAPI YAML/JSON schema defines parameters, request bodies, and standardized response codes."
    ],
    "blueprintTitle": "OpenAPI 3.0 Resource Specification",
    "blueprintCode": "openapi: 3.0.3\ninfo:\n  title: Order Processing Service\n  version: 1.0.0\npaths:\n  /api/v1/orders/{orderId}:\n    get:\n      summary: Retrieve an order by UUID\n      parameters:\n        - name: orderId\n          in: path\n          required: true\n          schema:\n            type: string\n            format: uuid\n      responses:\n        '200':\n          description: Order details\n        '404':\n          description: Order not found",
    "blueprintLanguage": "yaml"
  },
  "recommendedBook": {
    "title": "Steps Toward the Glory of REST",
    "author": "Martin Fowler",
    "keyChapters": "Richardson Maturity Model (Level 0 to Level 3 HATEOAS)",
    "whyReadThis": "The industry standard breakdown of what makes an API truly RESTful: resources, standardized HTTP verbs, and hypermedia controls.",
    "readingUrl": "https://martinfowler.com/articles/richardsonMaturityModel.html"
  },
  "handsOnChallenge": {
    "ticketNumber": "TICKET-010",
    "title": "Design OpenAPI 3.0 Contract and Serve Swagger UI",
    "scenario": "Mobile engineers need an interactive contract for the payment checkout system before backend implementation begins.",
    "acceptanceCriteria": [
      "Author openapi.yaml specifying POST /checkout with 201 Created and 400 Bad Request responses.",
      "Serve Swagger UI or Scalar at /docs."
    ],
    "terminalLab": "npx @scalar/cli validate openapi.yaml",
    "hints": [
      "Ensure all error responses reference application/problem+json schemas."
    ],
    "solutionCode": "import swaggerUi from 'swagger-ui-express';\nimport YAML from 'yamljs';\nconst spec = YAML.load('./openapi.yaml');\napp.use('/docs', swaggerUi.serve, swaggerUi.setup(spec));",
    "solutionExplanation": "Serving automated documentation ensures both human developers and automated SDK generators always work against the exact same API contract."
  },
  "selfCheckQuestions": [
    {
      "category": "WHAT",
      "question": "What are the four levels of the Richardson Maturity Model for REST APIs?",
      "answerExplanation": "Level 0: The Swamp of POX (single URI, single HTTP POST method, like SOAP/RPC). Level 1: Resources (distinct URIs for individual resources, e.g., /orders/123). Level 2: HTTP Verbs (proper usage of GET, POST, PUT, DELETE and HTTP status codes). Level 3: HATEOAS (Hypermedia As The Engine Of Application State, providing dynamic hypermedia links guiding client state transitions)."
    },
    {
      "category": "WHY",
      "question": "Why is a single canonical OpenAPI / Swagger contract essential for contract-driven backend engineering?",
      "answerExplanation": "An OpenAPI specification serves as the single source of truth for API contracts. It enables automated client SDK generation, mock server generation for frontend teams, contract drift validation in CI, and synchronized, interactive documentation that never falls out of date with production code."
    },
    {
      "category": "HOW",
      "question": "How do you design a paginated REST endpoint using cursor-based pagination instead of offset/limit pagination for high-volume datasets?",
      "answerExplanation": "Offset pagination (OFFSET 1000000 LIMIT 20) forces the database to scan and discard 1 million rows on disk. Cursor-based pagination indexes on a monotonically increasing, unique column (e.g., created_at, id). The client passes ?cursor=eyJpZCI6OTk5fQ==, and the SQL executes WHERE (created_at, id) < ($1, $2) ORDER BY created_at DESC, id DESC LIMIT 20, utilizing the B-Tree index for an instant O(log N) seek."
    }
  ]
};

export default topic;
