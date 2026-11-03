import { RoadmapTopic } from '../../types/roadmap';

export const topic: RoadmapTopic = {
  "id": "logging-monitoring-observability",
  "number": 32,
  "title": "Logging, Monitoring & Observability (Structured JSON Logs, OpenTelemetry, RED Metrics)",
  "phaseId": 6,
  "phaseName": "Reliability, Resilience & Observability",
  "duration": "4 hrs 57 min",
  "timeEstimates": {
    "video": "5 hr 19 min",
    "reading": "40 min",
    "lab": "60 min",
    "total": "6 hr 59 min"
  },
  "youtubeId": "cYAE0ZhT43c",
  "youtubeChannelUrl": "https://www.youtube.com/@AbhishekVeeramalla",
  "secondaryVideo": {
    "youtubeId": "QoDqxm7ybLc",
    "title": "How Prometheus Monitoring Works | Architecture Explained",
    "duration": "22 min",
    "description": "TechWorld with Nana breaks down Prometheus metrics architecture, scrape targets, pull vs push models, Alertmanager, and Grafana dashboards."
  },
  "shortSummary": "Structured JSON logging, OpenTelemetry distributed tracing, the RED method (Rate, Errors, Duration), and Prometheus metrics.",
  "seniorInsight": {
    "quote": "Unstructured plain text logs (console.log('Error occurred!')) are useless in production. Output structured JSON logs with correlation IDs so log aggregators can index and filter them.",
    "productionLesson": "Master the RED method for all services: Rate (requests per second), Errors (number of failing requests), and Duration (time taken per request, especially p95 and p99 percentiles).",
    "commonMistake": "Relying on average (mean) latency instead of 95th and 99th percentiles (p99 exposes the real pain experienced by users)."
  },
  "coreDeepDive": {
    "what": "Observability provides visibility into internal system state through three complementary telemetry pillars: Metrics, Logs, and Traces.",
    "why": "Enables engineering teams to detect incidents, pinpoint root causes, and resolve production degradation before customers report outages.",
    "howItWorks": [
      "1. Logs: Structured JSON events capturing timestamp, severity, message, and trace IDs.",
      "2. Metrics: Numeric aggregations over time (counters, gauges, histograms).",
      "3. Traces: OpenTelemetry spans following a request's journey across microservices, databases, and message queues."
    ],
    "blueprintTitle": "Structured JSON Log Event",
    "blueprintCode": "{\n  \"timestamp\": \"2026-09-13T20:45:00.123Z\",\n  \"level\": \"error\",\n  \"traceId\": \"4bf92f3577b34da6a3ce929d0e0e4736\",\n  \"spanId\": \"00f067aa0ba902b7\",\n  \"service\": \"billing-service\",\n  \"message\": \"Payment provider timeout\",\n  \"errorCode\": \"PAYMENT_GATEWAY_TIMEOUT\",\n  \"latencyMs\": 5002.4,\n  \"http\": {\n    \"method\": \"POST\",\n    \"route\": \"/api/v1/checkout\",\n    \"status\": 504\n  }\n}",
    "blueprintLanguage": "json"
  },
  "recommendedBook": {
    "title": "Site Reliability Engineering (Google SRE Book - Free Online)",
    "author": "Betsy Beyer, Chris Jones, Jennifer Petoff & Niall Murphy (Google)",
    "keyChapters": "Chapter 6: Monitoring Distributed Systems (The 4 Golden Signals: Latency, Traffic, Errors, Saturation)",
    "whyReadThis": "Google's landmark SRE book, completely free online, defining production telemetry, RED metrics, and alerting strategies.",
    "readingUrl": "https://sre.google/sre-book/monitoring-distributed-systems/"
  },
  "handsOnChallenge": {
    "ticketNumber": "TICKET-028",
    "title": "Configure OpenTelemetry Tracing with Jaeger Exporter",
    "scenario": "An endpoint experiences intermittent 3-second latency spikes, but logs do not reveal which microservice or database query is responsible.",
    "acceptanceCriteria": [
      "Initialize OpenTelemetry SDK with HTTP and PostgreSQL auto-instrumentation.",
      "Export traces to a local Jaeger collector.",
      "Identify the slowest span in the trace hierarchy."
    ],
    "terminalLab": "docker run -d --name jaeger -p 16686:16686 -p 4318:4318 jaegertracing/all-in-one:latest",
    "hints": [
      "Search in Jaeger UI (http://localhost:16686) for spans with duration > 1000ms."
    ],
    "solutionCode": "import { NodeSDK } from '@opentelemetry/sdk-node';\nimport { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';\nimport { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';\n\nconst sdk = new NodeSDK({\n  traceExporter: new OTLPTraceExporter({ url: 'http://localhost:4318/v1/traces' }),\n  instrumentations: [getNodeAutoInstrumentations()]\n});\nsdk.start();",
    "solutionExplanation": "Auto-instrumentation wraps HTTP and database calls in distributed spans, visualizing the exact waterfall breakdown of request latency."
  },
  "selfCheckQuestions": [
    {
      "category": "WHAT",
      "question": "What are the Three Pillars of Observability (Logs, Metrics, Traces), and how do their roles differ?",
      "answerExplanation": "Metrics are numeric, aggregated timeseries data (counters, gauges, histograms) for alerting and detecting that something is wrong (e.g., HTTP 5xx rate > 1%). Traces track the journey of a single request across multiple microservices, showing where latency or failure occurred. Logs are detailed, timestamped event records providing deep context on why the failure happened inside a specific service."
    },
    {
      "category": "WHY",
      "question": "Why is structured JSON logging with a logger like Pino or Winston mandatory in production instead of console.log?",
      "answerExplanation": "console.log emits unstructured text strings that are difficult to parse and index at scale, and in runtimes like Node.js, console.log is synchronous and blocks the event loop under heavy volume. Structured loggers emit single-line JSON objects with standard fields (level, time, trace_id, message) that centralized log collectors (Datadog, ELK, Loki) parse, query, and alert on effortlessly."
    },
    {
      "category": "HOW",
      "question": "How do you implement the RED Method (Rate, Errors, Duration) for monitoring backend HTTP services using Prometheus?",
      "answerExplanation": "Define Prometheus metrics in an HTTP middleware: (1) Rate: A counter http_requests_total{method, path, status} measuring requests per second, (2) Errors: Calculate error rate from the same counter where status =~ '5..', (3) Duration: A histogram http_request_duration_seconds{method, path} measuring request latencies into percentiles (p50, p95, p99) to detect latency degradation."
    }
  ]
};

export default topic;
