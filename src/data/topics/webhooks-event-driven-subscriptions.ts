import { RoadmapTopic } from '../../types/roadmap';

export const topic: RoadmapTopic = {
  "id": "webhooks-event-driven-subscriptions",
  "number": 26,
  "title": "Webhooks & Event-Driven Subscriptions (HMAC Signatures, Delivery Retries)",
  "phaseId": 5,
  "phaseName": "Asynchronous Systems & Integrations",
  "duration": "2 hrs 29 min",
  "timeEstimates": {
    "video": "2 hr 37 min",
    "reading": "35 min",
    "lab": "45 min",
    "total": "3 hr 57 min"
  },
  "youtubeId": "41NOoEz3Tzc",
  "youtubeChannelUrl": "https://www.youtube.com/@freecodecamp",
  "secondaryVideo": {
    "youtubeId": "x_jjhcDrISk",
    "title": "Top 3 Things You Should Know About Webhooks!",
    "duration": "8 min",
    "description": "ByteByteGo covers webhook mechanics, idempotency handling, retry backoffs, signature security verification, and webhook vs polling trade-offs."
  },
  "shortSummary": "Sending and receiving webhooks, HMAC-SHA256 signature verification, exponential retry backoff, and preventing replay attacks with timestamps.",
  "seniorInsight": {
    "quote": "Never process an incoming webhook without verifying its cryptographic HMAC signature against the raw, unparsed request byte buffer.",
    "productionLesson": "If your body parser converts JSON into an object and you re-stringify it to compute the HMAC hash, JSON key order or whitespace differences will break the signature. Always verify against req.rawBody.",
    "commonMistake": "Omitting a timestamp in the signature header, allowing attackers to intercept a valid webhook and replay it repeatedly."
  },
  "coreDeepDive": {
    "what": "Webhooks provide automated, asynchronous HTTP callbacks between external SaaS platforms (e.g. Stripe, GitHub, Twilio) and your backend.",
    "why": "Enables real-time event-driven architectures without wasteful, continuous HTTP polling.",
    "howItWorks": [
      "1. Sender computes HMAC-SHA256 signature using a shared secret over payload + timestamp.",
      "2. Sender passes signature in header (e.g. Stripe-Signature).",
      "3. Receiver verifies HMAC signature and checks that timestamp is within 5 minutes (Replay Protection).",
      "4. Receiver responds with 200 OK immediately and offloads processing to a background worker."
    ],
    "blueprintTitle": "Cryptographic HMAC-SHA256 Webhook Verification",
    "blueprintCode": "import crypto from \"crypto\";\n\nexport function verifyWebhook(rawBody, signatureHeader, secret) {\n  // Expected header format: t=1690000000,v1=signature_hash\n  const [tPart, sigPart] = signatureHeader.split(\",\");\n  const timestamp = tPart.split(\"=\")[1];\n  const signature = sigPart.split(\"=\")[1];\n\n  // Prevent Replay Attacks (Reject events older than 5 minutes)\n  if (Math.abs(Date.now() / 1000 - Number(timestamp)) > 300) {\n    throw new Error(\"Webhook timestamp expired (replay attack defense)\");\n  }\n\n  const payload = timestamp + '.' + rawBody;\n  const expected = crypto.createHmac(\"sha256\", secret).update(payload).digest(\"hex\");\n\n  // Constant-time comparison prevents timing attacks!\n  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected));\n}",
    "blueprintLanguage": "javascript"
  },
  "recommendedBook": {
    "title": "The Webhooks Guide & Best Practices",
    "author": "Svix / Webhooks.fyi Community",
    "keyChapters": "Webhook Security: HMAC Signatures, Replay Attack Prevention & Idempotency",
    "whyReadThis": "Comprehensive open-source resource on webhook engineering: cryptographic verification, exponential backoff retries, and failure delivery.",
    "readingUrl": "https://webhooks.fyi/"
  },
  "handsOnChallenge": {
    "ticketNumber": "TICKET-022",
    "title": "Implement Secure Stripe Webhook Ingestion Endpoint",
    "scenario": "Build an endpoint that receives payment_intent.succeeded webhooks, verifies HMAC signatures, and handles duplicates safely.",
    "acceptanceCriteria": [
      "Verify HMAC-SHA256 signature using raw request buffer.",
      "Reject requests with invalid signatures with 400 Bad Request.",
      "Store event ID in database with UNIQUE constraint to prevent duplicate processing."
    ],
    "terminalLab": "stripe listen --forward-to localhost:3000/api/webhooks/stripe",
    "hints": [
      "Use crypto.timingSafeEqual to protect against side-channel timing attacks."
    ],
    "solutionCode": "app.post('/api/webhooks', express.raw({ type: 'application/json' }), (req, res) => {\n  const sig = req.headers['stripe-signature'];\n  try {\n    const event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);\n    await jobQueue.add('process-payment', event);\n    res.status(200).json({ received: true });\n  } catch (err) {\n    res.status(400).send('Webhook Error: ' + err.message);\n  }\n});",
    "solutionExplanation": "Returning 200 OK immediately and queuing the event prevents external webhook providers from timing out while your backend executes logic."
  },
  "selfCheckQuestions": [
    {
      "category": "WHAT",
      "question": "What is an HMAC SHA-256 signature, and how does a webhook receiver use it to authenticate incoming HTTP payloads?",
      "answerExplanation": "HMAC (Hash-based Message Authentication Code) combines the raw request payload body with a shared secret key using the SHA-256 cryptographic hash function. The sender transmits this digest in a header (e.g., X-Hub-Signature-256). The receiver hashes the raw request body with its copy of the secret and performs a constant-time comparison against the header to verify payload integrity and authenticity."
    },
    {
      "category": "WHY",
      "question": "Why must timing attacks be prevented when comparing webhook HMAC signatures, and why is standard string equality unsafe?",
      "answerExplanation": "Standard string equality operators (=== or ==) compare strings character-by-character from left to right and return false at the first mismatch. Attackers can measure tiny CPU latency differences (timing attacks) to guess the signature byte-by-byte. You must use constant-time equality functions (crypto.timingSafeEqual in Node, subtle.timingSafeEqual in Go) that always take identical time regardless of match position."
    },
    {
      "category": "HOW",
      "question": "How do you design a high-throughput webhook ingestion endpoint that avoids HTTP 504 timeouts from third-party senders?",
      "answerExplanation": "Keep the ingestion endpoint ultra-lightweight: (1) verify the HMAC signature and timestamp, (2) write the raw event directly to a high-speed durable queue (Kafka, Redis, SQS), and (3) immediately return HTTP 202 Accepted or 200 OK within 100 milliseconds. All heavy business logic, database transactions, and notifications run asynchronously in background queue workers."
    }
  ]
};

export default topic;
