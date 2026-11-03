import { RoadmapTopic } from '../../types/roadmap';

export const topic: RoadmapTopic = {
  "id": "configuration-management",
  "number": 31,
  "title": "Configuration Management (12-Factor Env Vars, Fail-Fast Startup)",
  "phaseId": 6,
  "phaseName": "Reliability, Resilience & Observability",
  "duration": "30 min",
  "timeEstimates": {
    "video": "30 min",
    "reading": "30 min",
    "lab": "45 min",
    "total": "1 hr 45 min"
  },
  "youtubeId": "1OhmRmMsGdQ",
  "youtubeChannelUrl": "https://www.youtube.com/@KodeKloud",
  "shortSummary": "12-Factor App Factor III: Storing config in the environment, validating configuration schemas on startup (fail-fast), and secret management.",
  "seniorInsight": {
    "quote": "Fail fast. If your application is missing a mandatory environment variable like DATABASE_URL, crash immediately on startup. Never start up half-healthy.",
    "productionLesson": "Never commit .env files or API keys into git repositories. Store secrets in AWS Secrets Manager, HashiCorp Vault, or encrypted deployment pipelines, injecting them as runtime environment variables.",
    "commonMistake": "Accessing process.env.SOME_VARIABLE directly in deep service classes instead of through a centralized, validated configuration module."
  },
  "coreDeepDive": {
    "what": "Configuration management isolates environment-specific variables (database credentials, API keys, port numbers) from application source code.",
    "why": "Allows the identical application container image to deploy safely across Staging, UAT, and Production environments without recompilation.",
    "howItWorks": [
      "1. Startup hook reads environment variables.",
      "2. Schema validation (Zod, envalid) verifies types and mandatory presence.",
      "3. If any required variable is missing, process exits with code 1 before accepting traffic.",
      "4. Validated, typed configuration object is frozen and injected into services."
    ],
    "blueprintTitle": "Fail-Fast Configuration Guard",
    "blueprintCode": "import { z } from \"zod\";\n\nconst ConfigSchema = z.object({\n  NODE_ENV: z.enum([\"development\", \"test\", \"production\"]),\n  PORT: z.coerce.number().default(3000),\n  DATABASE_URL: z.string().url(),\n  REDIS_URL: z.string().url(),\n  JWT_SECRET: z.string().min(32),\n});\n\n// Crashes immediately on boot if missing variables!\nexport const config = ConfigSchema.parse(process.env);",
    "blueprintLanguage": "typescript"
  },
  "recommendedBook": {
    "title": "The Twelve-Factor App",
    "author": "Adam Wiggins",
    "keyChapters": "Factor III: Config (Store Configuration in the Environment)",
    "whyReadThis": "The canonical cloud-native engineering manifesto on strict separation of code from configuration, 12-factor env vars, and fail-fast startup.",
    "readingUrl": "https://12factor.net/config"
  },
  "handsOnChallenge": {
    "ticketNumber": "TICKET-027",
    "title": "Implement Strict Fail-Fast Startup Schema Guard",
    "scenario": "A server started in production without JWT_SECRET defined, issuing insecure tokens with 'undefined' as the signature key.",
    "acceptanceCriteria": [
      "Validate all environment variables on boot using Zod.",
      "If any mandatory variable is missing or invalid, print clear error and call process.exit(1)."
    ],
    "terminalLab": "NODE_ENV=production DATABASE_URL= node src/server.js",
    "hints": [
      "Ensure validation runs synchronously before the HTTP server begins listening on any port!"
    ],
    "solutionCode": "try {\n  ConfigSchema.parse(process.env);\n} catch (err) {\n  console.error('CRITICAL: Invalid environment configuration', err.errors);\n  process.exit(1);\n}",
    "solutionExplanation": "Crashing the process on boot signals orchestration systems (Kubernetes/ECS) that the new deployment is unhealthy, preventing broken containers from receiving traffic."
  },
  "selfCheckQuestions": [
    {
      "category": "WHAT",
      "question": "What is the Twelve-Factor App methodology principle regarding configuration, and what is the difference between build-time and runtime config?",
      "answerExplanation": "Twelve-Factor config requires strict separation of config from code, storing all environment-specific variables (database URLs, API secrets, feature flags) in the environment. Build-time config is baked into the immutable image/bundle at compile time and must never contain secrets. Runtime config is injected dynamically when the container boots, allowing the identical binary to run across Dev, Staging, and Prod."
    },
    {
      "category": "WHY",
      "question": "Why should a backend service crash immediately (Fail-Fast) on boot if required environment variables are missing or malformed?",
      "answerExplanation": "If a service starts with missing configuration (like a missing Stripe API key or invalid DB connection string), it enters an unhealthy zombie state: it passes basic liveness probes, accepts customer requests, and then crashes unpredictably in the middle of transactions. Failing fast on boot alerts engineers and triggers automated deployment rollback immediately."
    },
    {
      "category": "HOW",
      "question": "How do you validate environment variables at service startup using a strict schema validator?",
      "answerExplanation": "In the application entrypoint (e.g., config.ts or Go config.go), pass process.env through a strict schema validator (Zod, Envalid, or Go envconfig). Define types, default values, and formats (e.g., PORT: z.coerce.number().default(8080), DATABASE_URL: z.string().url()). If parsing throws an error, log the missing fields and invoke process.exit(1)."
    }
  ]
};

export default topic;
