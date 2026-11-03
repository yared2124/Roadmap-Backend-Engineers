import { RoadmapTopic } from '../../types/roadmap';

export const topic: RoadmapTopic = {
  "id": "handlers-controllers-services",
  "number": 9,
  "title": "Handlers, Controllers, and Services (Layered Architecture & Separation of Concerns)",
  "phaseId": 2,
  "phaseName": "Core API Architecture & Request Lifecycle",
  "duration": "58 min",
  "timeEstimates": {
    "video": "1 hr 10 min",
    "reading": "40 min",
    "lab": "45 min",
    "total": "2 hr 35 min"
  },
  "youtubeId": "f7Su4KoqSio",
  "youtubeChannelUrl": "https://www.youtube.com/@donnyroufs551",
  "secondaryVideo": {
    "youtubeId": "c6H2DbIOE0c",
    "title": "Controller vs Service vs Repository Pattern Guide",
    "duration": "12 min",
    "description": "Code Deck breaks down the boundaries, responsibilities, and data flow between HTTP Controllers, business logic Services, and database Repositories."
  },
  "shortSummary": "Three-tier architecture, Clean Architecture, decoupling transport layers from business logic, and repository patterns.",
  "seniorInsight": {
    "quote": "Controllers should be dumb. They unpack HTTP requests, call the service layer, and format the response. Never write SQL or business rules in a controller.",
    "productionLesson": "When business logic lives inside HTTP controllers, you cannot test it without mocking HTTP servers, and you cannot reuse it in background queues, cron jobs, or CLI tools.",
    "commonMistake": "Mixing SQL queries, authentication parsing, validation, and email dispatching inside a single massive controller function."
  },
  "coreDeepDive": {
    "what": "Layered architecture isolates concerns into distinct tiers: Transport/Controller (HTTP), Service/Domain (Business Rules), and Repository (Data Access).",
    "why": "Allows switching web frameworks or databases without rewriting business logic, and makes unit testing fast and decoupled from network sockets.",
    "howItWorks": [
      "1. Controller receives HTTP request, parses DTO, and extracts user identity.",
      "2. Service evaluates business invariants, executes domain workflows, and coordinates transactions.",
      "3. Repository executes SQL queries against PostgreSQL and maps rows to domain entities."
    ],
    "blueprintTitle": "Clean Layered Architecture Flow",
    "blueprintCode": "[HTTP Request]\n       │\n       ▼\n[Controller Layer]  <-- Parses DTO, returns HTTP 200/400 status codes\n       │\n       ▼\n[Service Layer]     <-- Pure business logic, pricing calculation, invariants\n       │\n       ▼\n[Repository Layer]  <-- SQL queries, database transactions, Redis cache",
    "blueprintLanguage": "text"
  },
  "recommendedBook": {
    "title": "The Clean Architecture",
    "author": "Robert C. Martin (Uncle Bob)",
    "keyChapters": "The Clean Architecture: Layered Boundaries, Controllers & Use Cases",
    "whyReadThis": "The original full-text architectural manifesto defining the Dependency Inversion Principle, separation of transport controllers from domain services, and testability.",
    "readingUrl": "https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html"
  },
  "handsOnChallenge": {
    "ticketNumber": "TICKET-009",
    "title": "Refactor a 500-line Fat Controller into Three-Tier Layers",
    "scenario": "A legacy endpoint contains database queries, password hashing, and payment gateway calls all inside one Express handler.",
    "acceptanceCriteria": [
      "Extract business logic into UserService.",
      "Extract database queries into UserRepository.",
      "Keep UserController under 20 lines of code."
    ],
    "terminalLab": "npm test -- test/user-service.test.js",
    "hints": [
      "The service layer should never accept (req, res) objects. Pass clean domain objects."
    ],
    "solutionCode": "// Clean Controller\nexport async function registerController(req, res) {\n  const dto = req.validatedBody;\n  const user = await userService.registerUser(dto);\n  return res.status(201).json(user);\n}",
    "solutionExplanation": "Decoupling transport objects (req, res) from business services allows testing userService.registerUser in pure unit tests without HTTP mocks."
  },
  "selfCheckQuestions": [
    {
      "category": "WHAT",
      "question": "What specific responsibilities belong exclusively to the Controller/Handler layer versus the Service/Business Logic layer?",
      "answerExplanation": "Controllers handle HTTP transport: extracting headers, parsing query params, unmarshaling DTOs, invoking validation, calling the service layer, and mapping domain exceptions to HTTP status codes. The Service layer contains zero HTTP/transport knowledge; it enforces pure business rules, orchestrates repository calls, handles domain events, and manages transactional boundaries."
    },
    {
      "category": "WHY",
      "question": "Why should the Service layer remain completely agnostic of HTTP concepts like req, res, status codes, or cookies?",
      "answerExplanation": "Transport agnosticism makes business logic reusable and portable. The exact same OrderService.PlaceOrder() method can be invoked by an HTTP REST controller, a gRPC handler, an asynchronous Kafka message consumer, or a CLI command without rewriting or mocking HTTP objects."
    },
    {
      "category": "HOW",
      "question": "How do you test a Service class in total isolation without starting a web server or connecting to a live database?",
      "answerExplanation": "Inject repository interfaces into the Service class constructor (Dependency Injection). In unit tests, pass mock or in-memory stub implementations of the repository interfaces. This allows you to verify domain rules, discount calculations, and error flows in milliseconds without network or database overhead."
    }
  ]
};

export default topic;
