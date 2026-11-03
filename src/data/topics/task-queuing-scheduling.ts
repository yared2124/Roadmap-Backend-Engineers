import { RoadmapTopic } from '../../types/roadmap';

export const topic: RoadmapTopic = {
  "id": "task-queuing-scheduling",
  "number": 23,
  "title": "Task Queuing & Scheduling (BullMQ, Redis Queues, Cron, Celery)",
  "phaseId": 5,
  "phaseName": "Asynchronous Systems & Integrations",
  "duration": "31 min",
  "timeEstimates": {
    "video": "1 hr 11 min",
    "reading": "35 min",
    "lab": "45 min",
    "total": "2 hr 31 min"
  },
  "youtubeId": "nFxjaVmFj5E",
  "youtubeChannelUrl": "https://www.youtube.com/@amigoscode",
  "secondaryVideo": {
    "youtubeId": "Cie5v59mrTg",
    "title": "RabbitMQ & Message Queues Crash Course",
    "duration": "40 min",
    "description": "Hussein Nasser covers AMQP architecture, message durability, consumer acknowledgments, worker pools, and dead-letter exchanges."
  },
  "shortSummary": "Decoupling synchronous HTTP requests, message brokers (RabbitMQ/BullMQ), worker pools, dead letter queues (DLQ), and exponential retry backoff.",
  "seniorInsight": {
    "quote": "Never do heavy compute, PDF generation, or third-party API calls inside the synchronous HTTP request-response cycle.",
    "productionLesson": "Always configure a Dead Letter Queue (DLQ) with exponential backoff. If an unhandled exception causes a job to crash on every retry, it will poison the queue and consume 100% of worker CPU without ever finishing.",
    "commonMistake": "Assuming message queues guarantee exactly-once processing (production queues guarantee at-least-once; your workers MUST be idempotent)."
  },
  "coreDeepDive": {
    "what": "Task queuing offloads asynchronous, long-running, or resource-heavy tasks to background worker processes.",
    "why": "Ensures sub-100ms HTTP response times, shields backends from traffic spikes, and provides automatic retries during third-party outages.",
    "howItWorks": [
      "1. API server accepts request, pushes job payload to Redis/RabbitMQ queue, and returns 202 Accepted immediately.",
      "2. Worker daemon picks up job from queue and processes task in background.",
      "3. On success, worker acknowledges message; on failure, job retries with backoff or moves to DLQ."
    ],
    "blueprintTitle": "Asynchronous Worker Queue Topology",
    "blueprintCode": "[Client API Request]\n       │\n       ▼ (Submits Job: 202 Accepted in 15ms)\n[HTTP Controller] ──► [Redis / RabbitMQ Queue]\n                            │\n                            ▼ (Worker polls asynchronously)\n                     [Background Worker Pool]\n                            ├── [Success: ACK]\n                            └── [Failure: Retry -> Dead Letter Queue]",
    "blueprintLanguage": "text"
  },
  "recommendedBook": {
    "title": "Enterprise Integration Patterns (Online Book)",
    "author": "Gregor Hohpe & Bobby Woolf",
    "keyChapters": "Point-to-Point Channel & Competing Consumers Pattern",
    "whyReadThis": "The definitive patterns book on asynchronous message queuing, decoupled background workers, and dead-letter queues.",
    "readingUrl": "https://www.enterpriseintegrationpatterns.com/patterns/messaging/PointToPointChannel.html"
  },
  "handsOnChallenge": {
    "ticketNumber": "TICKET-020",
    "title": "Implement an Idempotent Background Job Worker with Dead Letter Queue",
    "scenario": "Video transcoding jobs occasionally fail due to corrupt user files, causing workers to crash endlessly in an infinite retry loop.",
    "acceptanceCriteria": [
      "Limit retry attempts to 3 with exponential backoff.",
      "Route failed jobs after 3 attempts to a dead_letter_queue.",
      "Ensure jobs track a processed_ids set to avoid duplicate execution."
    ],
    "terminalLab": "npm run worker",
    "hints": [
      "In BullMQ, configure { attempts: 3, backoff: { type: 'exponential', delay: 1000 } }."
    ],
    "solutionCode": "const queue = new Queue('transcode', { connection: redis });\nawait queue.add('video', { fileId: '123' }, {\n  attempts: 3,\n  backoff: { type: 'exponential', delay: 2000 },\n  removeOnFail: false\n});",
    "solutionExplanation": "Capping retries and redirecting persistent failures to DLQs prevents corrupted jobs from stalling queue throughput."
  },
  "selfCheckQuestions": [
    {
      "category": "WHAT",
      "question": "What is the difference between an in-memory queue (like Node.js event loop / Go channels) and a durable message queue (like BullMQ / Redis / SQS)?",
      "answerExplanation": "In-memory queues hold task data inside the application process RAM; if the process crashes, deploys, or restarts, all pending and in-flight tasks are permanently lost. Durable message queues persist task state on external, resilient storage with visibility timeouts, acknowledgments (ACK/NACK), automatic retry backoffs, and dead-letter queues."
    },
    {
      "category": "WHY",
      "question": "Why is an Exponential Backoff with Jitter algorithm essential for failed queue workers communicating with third-party APIs?",
      "answerExplanation": "If a downstream service experiences high load or a network hiccup, retrying immediately at fixed intervals causes all failed workers to hammer the service at the exact same second (the Thundering Herd problem). Exponential backoff spaces out retries (2^n), and jitter injects random variance, desynchronizing worker retries and allowing the downstream service to recover."
    },
    {
      "category": "HOW",
      "question": "How do you design a Dead Letter Queue (DLQ) strategy and alerts to handle poisoned-pill messages without stalling queue consumption?",
      "answerExplanation": "Configure maximum retry limits (e.g., 5 attempts). If a task fails repeatedly due to unrecoverable data errors (a poison pill), the queue moves the job to a DLQ instead of abandoning or crashing the worker. Set Prometheus/CloudWatch alerts on DLQ size > 0, and build an administrative replay script to reprocess fixed messages after bug fixes are deployed."
    }
  ]
};

export default topic;
