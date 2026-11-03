import { RoadmapTopic } from '../../types/roadmap';

export const topic: RoadmapTopic = {
  "id": "serialization-deserialization",
  "number": 5,
  "title": "Serialization & Deserialization (JSON vs Protobuf, 64-bit Int Precision)",
  "phaseId": 1,
  "phaseName": "Foundations & Web Protocols",
  "duration": "36 min",
  "timeEstimates": {
    "video": "43 min",
    "reading": "30 min",
    "lab": "45 min",
    "total": "1 hr 58 min"
  },
  "youtubeId": "46O73On0gyI",
  "youtubeChannelUrl": "https://www.youtube.com/@hnasr",
  "secondaryVideo": {
    "youtubeId": "gnchfOojMk4",
    "title": "What is RPC? gRPC & Protocol Buffers Introduction",
    "duration": "7 min",
    "description": "ByteByteGo breaks down why modern high-scale distributed backends use binary Protobuf serialization and gRPC instead of text-based JSON over HTTP/1.1."
  },
  "shortSummary": "JSON parsing overhead, Protocol Buffers binary framing, gRPC, and the JavaScript 64-bit integer precision bug.",
  "seniorInsight": {
    "quote": "JSON numbers are IEEE 754 floating point. A 64-bit database ID (e.g. 9007199254740993) will silently corrupt into 9007199254740992 in JavaScript unless serialized as a string.",
    "productionLesson": "Always serialize IDs as strings (or use UUIDv7) when targeting web and mobile clients. For high-throughput internal microservice communication, migrate from JSON to Protocol Buffers for 5x throughput and 80% bandwidth savings.",
    "commonMistake": "Deserializing untrusted user inputs directly into internal domain models without strict schema stripping (Mass Assignment vulnerability)."
  },
  "coreDeepDive": {
    "what": "Serialization converts in-memory objects into transportable byte streams; deserialization reconstructs objects from bytes.",
    "why": "Different programming languages and runtimes must exchange structured data over TCP sockets safely and efficiently.",
    "howItWorks": [
      "1. Text-based (JSON, XML): Human-readable, higher CPU parse overhead, verbose text representation.",
      "2. Binary (Protobuf, MsgPack, FlatBuffers): Schema-enforced, zero-copy parsing, compact byte serialization."
    ],
    "blueprintTitle": "Safe DTO Schema Validation",
    "blueprintCode": "import { z } from \"zod\";\n\nexport const CreateUserSchema = z.object({\n  email: z.string().email(),\n  // Always accept 64-bit IDs as strings to prevent JS float corruption\n  organizationId: z.string().regex(/^\\d+$/),\n  age: z.number().int().min(18),\n}).strict(); // Strip unauthorized fields",
    "blueprintLanguage": "typescript"
  },
  "recommendedBook": {
    "title": "Protocol Buffers Documentation & Wire Format",
    "author": "Google Protocol Buffers Team",
    "keyChapters": "Protocol Buffers Overview, Binary Wire Format & Scalar Value Types",
    "whyReadThis": "Official specification of binary serialization, 64-bit integer handling (int64/uint64), schema evolution, and performance comparisons over JSON.",
    "readingUrl": "https://protobuf.dev/overview/"
  },
  "handsOnChallenge": {
    "ticketNumber": "TICKET-005",
    "title": "Debug 64-bit Integer Corruption & Implement Protobuf Schema",
    "scenario": "Database primary keys exceeding Number.MAX_SAFE_INTEGER (9007199254740991) are corrupting when fetched by web frontends.",
    "acceptanceCriteria": [
      "Demonstrate precision loss with JSON.parse on 9007199254740993.",
      "Implement a custom serializer that converts BIGINT columns to strings."
    ],
    "terminalLab": "node -e 'console.log(\"JSON Parse:\", JSON.parse(\"{\\\"id\\\": 9007199254740993}\").id); console.log(\"Max Safe:\", Number.MAX_SAFE_INTEGER);'",
    "hints": [
      "Notice how 9007199254740993 rounds down to 9007199254740992!"
    ],
    "solutionCode": "// Custom BigInt serializer for JSON.stringify\nBigInt.prototype.toJSON = function() {\n  return this.toString();\n};",
    "solutionExplanation": "Transforming BigInt primitives into strings before serialization prevents the V8 engine from coercing integers into lossy IEEE 754 floats."
  },
  "selfCheckQuestions": [
    {
      "category": "WHAT",
      "question": "What causes 64-bit integer precision loss when serializing large numeric IDs to JSON, and how does Protobuf handle it?",
      "answerExplanation": "JavaScript and standard JSON parsers adhere to IEEE 754 double-precision floats, which only safely represent integers up to 2^53 - 1 (Number.MAX_SAFE_INTEGER = 9,007,199,254,740,991). 64-bit integers (e.g., Snowflake IDs, Twitter tweet IDs) truncate lower bits unless serialized as strings in JSON. Protocol Buffers natively encodes 64-bit integers as int64/uint64 using binary varints, preserving exact bit precision without string overhead."
    },
    {
      "category": "WHY",
      "question": "Why is Protobuf significantly faster and more bandwidth-efficient than JSON for internal microservice communication?",
      "answerExplanation": "Protobuf uses compact binary encoding with field tags (numbers) instead of repeating verbose string keys like JSON ('user_id'). Numeric fields use variable-length zig-zag encoding, avoiding expensive ASCII-to-binary string parsing and minimizing memory allocations, leading to up to 5-10x throughput increases and 60-80% payload size reductions."
    },
    {
      "category": "HOW",
      "question": "How do you protect a backend service against JSON deserialization Denial of Service (DoS) attacks involving deep object nesting or huge payloads?",
      "answerExplanation": "Enforce strict payload body limits at the reverse proxy/gateway layer (e.g., client_max_body_size 1m; in Nginx), configure the parser with maximum JSON nesting depth limits (e.g., max depth 32), and reject payloads with unescaped control characters or duplicate keys before allocating memory."
    }
  ]
};

export default topic;
