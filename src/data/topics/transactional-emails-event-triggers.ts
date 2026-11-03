import { RoadmapTopic } from '../../types/roadmap';

export const topic: RoadmapTopic = {
  "id": "transactional-emails-event-triggers",
  "number": 25,
  "title": "Transactional Emails & Event Triggers (Idempotent mailers, Templates)",
  "phaseId": 5,
  "phaseName": "Asynchronous Systems & Integrations",
  "duration": "30 min",
  "timeEstimates": {
    "video": "30 min",
    "reading": "30 min",
    "lab": "45 min",
    "total": "1 hr 45 min"
  },
  "youtubeId": "AcBhyCPJTEk",
  "youtubeChannelUrl": "https://www.youtube.com/@TechTermsDG",
  "shortSummary": "Asynchronous notification pipelines, SMTP vs API deliverability, DKIM/SPF/DMARC domain authentication, and idempotent notification triggers.",
  "seniorInsight": {
    "quote": "Sending an email directly inside an HTTP handler is a recipe for 504 Gateway Timeouts when your SMTP provider experiences latency spikes.",
    "productionLesson": "Always queue email jobs and assign an idempotency key to notification dispatches. During worker retries, the idempotency check prevents sending the same customer 5 duplicate password reset emails.",
    "commonMistake": "Failing to configure proper SPF, DKIM, and DMARC DNS records, causing your transactional emails to land directly in spam folders."
  },
  "coreDeepDive": {
    "what": "Transactional email systems reliably deliver system-triggered communications (receipts, password resets, verification codes).",
    "why": "Ensures critical notifications reach users promptly without slowing down the primary application server.",
    "howItWorks": [
      "1. Domain event triggers email job creation.",
      "2. Worker renders template with sanitized dynamic variables.",
      "3. Worker dispatches payload over HTTPS API (SES, Postmark, SendGrid) with idempotency tokens.",
      "4. Webhooks listen for bounce, delivery, and open events to maintain domain reputation."
    ],
    "blueprintTitle": "Asynchronous Notification Pipeline",
    "blueprintCode": "[User Registers] ──► [Save User to PostgreSQL]\n                           │\n                           ▼ (Push to Queue)\n                   [Email Worker]\n                           │ (HTTPS API + Idempotency-Key)\n                           ▼\n              [Email Provider: Postmark/SES] ──► [User Inbox]",
    "blueprintLanguage": "text"
  },
  "recommendedBook": {
    "title": "Microservices Architecture Patterns",
    "author": "Chris Richardson",
    "keyChapters": "Transactional Outbox Pattern (Dual-Write Prevention & Event Triggers)",
    "whyReadThis": "Authoritative architectural pattern showing how to commit database state and publish asynchronous events atomically without data loss.",
    "readingUrl": "https://microservices.io/patterns/data/transactional-outbox.html"
  },
  "handsOnChallenge": {
    "ticketNumber": "TICKET-021",
    "title": "Build an Idempotent Email Dispatcher with Rate Throttling",
    "scenario": "During a flash sale, password reset requests surged, threatening to exceed the email provider's 50 emails/second rate limit.",
    "acceptanceCriteria": [
      "Implement rate-throttling on the worker queue (max 50 jobs/sec).",
      "Record sent email hashes in Redis with 10-minute TTL to prevent duplicate dispatches."
    ],
    "terminalLab": "curl -X POST http://localhost:3000/api/auth/reset-password -d '{\"email\": \"user@example.com\"}'",
    "hints": [
      "Use Redis SETNX to atomically claim the email dispatch token."
    ],
    "solutionCode": "async function sendTransactionalEmail(to, templateId, data) {\n  const hash = crypto.createHash('sha256').update(to + ':' + templateId + ':' + JSON.stringify(data)).digest('hex');\n  const claimed = await redis.set('mail:' + hash, '1', 'NX', 'EX', 600);\n  if (!claimed) return console.log('Duplicate email suppressed');\n  await mailProvider.send({ to, templateId, data });\n}",
    "solutionExplanation": "Hashing the email parameters and setting with NX atomically silences duplicate notifications during accidental double submissions."
  },
  "selfCheckQuestions": [
    {
      "category": "WHAT",
      "question": "What is the Dual-Write Problem, and how does it cause data inconsistency between databases and email/notification services?",
      "answerExplanation": "The Dual-Write Problem occurs when an application must update two separate systems (e.g., save an order in PostgreSQL and send a confirmation email via SendGrid) in response to one event. Because distributed transactions across DBs and third-party APIs are impossible, if the DB commits but the network fails during email delivery, the customer gets no email. If email sends first but DB rolls back, the customer gets an email for an order that doesn't exist."
    },
    {
      "category": "WHY",
      "question": "Why is the Transactional Outbox Pattern the industry-standard architecture for triggering asynchronous side effects from database mutations?",
      "answerExplanation": "The Transactional Outbox Pattern saves the business entity mutation AND an outbox event record inside the same atomic local database transaction. Because both succeed or fail together, no data inconsistency can occur. A separate, reliable background process or CDC (Change Data Capture) tool polls or streams the outbox table to dispatch the events."
    },
    {
      "category": "HOW",
      "question": "How do you guarantee that a transactional email is sent exactly once to a user even if the queue worker retries multiple times?",
      "answerExplanation": "Use email idempotency keys. When enqueuing or dispatching the email task, generate an idempotency key composed of the entity ID and event type (e.g., order-confirmed-12345). Send this key in the email provider's API header (Idempotency-Key in SendGrid/Stripe) or track sent keys in a dedicated Redis/DB table so duplicate worker executions do not resend the message."
    }
  ]
};

export default topic;
