import { RoadmapTopic } from "../../types/roadmap";

export const topic: RoadmapTopic = {
  id: "api-gateways-reverse-proxies",
  "number": 12,
  title: "API Gateways, Reverse Proxies & Traffic Management (Envoy, NGINX, Rate Limiting)",
  phaseId: 2,
  phaseName: "Core API Architecture & Request Lifecycle",
  duration: "32 min",
  timeEstimates: {
    video: "35 min",
    reading: "30 min",
    lab: "45 min",
    total: "1 hr 50 min",
  },
  youtubeId: "qSsKdog660A",
  youtubeChannelUrl: "https://www.youtube.com/@CodeWithIddris",
  secondaryVideo: {
    youtubeId: "3Kqal7QaCCM",
    title: "Reverse Proxy vs Forward Proxy Explained",
    duration: "10 min",
    description: "Architectural comparison of forward proxies, reverse proxies, and Layer 7 gateway routers.",
  },
  shortSummary: "Master perimeter routing, SSL termination, token-bucket rate limiting, and reverse proxy patterns with Envoy and NGINX.",
  seniorInsight: {
    quote: "Never expose internal microservices directly to the public internet. An API Gateway is your cluster's immune system and protocol boundary.",
    productionLesson: "Differentiate between Layer 4 (TCP/UDP) and Layer 7 (HTTP/gRPC) routing. Layer 7 gateways inspect path headers and jwt claims to direct traffic, but introduce compute overhead; offload static media and TLS termination to edge CDNs when possible.",
    commonMistake: "Putting heavy business logic or database operations into the API Gateway, creating an unmaintainable distributed monolith bottleneck.",
  },
  coreDeepDive: {
    what: "An API Gateway is a reverse proxy that acts as the single entry point for clients, routing requests to internal backend services while enforcing cross-cutting policies.",
    why: "Without an API Gateway, every microservice must independently handle SSL termination, authentication, CORS, rate limiting, and client protocol translation.",
    howItWorks: [
      "1. Edge load balancers route incoming TLS traffic to gateway instances running Envoy, NGINX, or Traefik.",
      "2. The gateway terminates TLS, inspects headers (API keys, JWTs), and enforces rate limits via distributed Redis counters.",
      "3. Path and host rules map public routes (e.g., /api/v1/orders) to internal upstream cluster IPs with connection pooling.",
      "4. The gateway handles circuit breaking, retries, and correlation ID injection before streaming the response back to the client.",
    ],
    blueprintTitle: "Token Bucket Rate Limiting Gateway Filter in Go / Envoy Lua",
    blueprintCode: `// Token Bucket Rate Limiter Algorithm in Go
type TokenBucket struct {
	capacity   float64
	tokens     float64
	refillRate float64 // tokens per second
	lastRefill time.Time
	mu         sync.Mutex
}

func NewTokenBucket(capacity, refillRate float64) *TokenBucket {
	return &TokenBucket{
		capacity:   capacity,
		tokens:     capacity,
		refillRate: refillRate,
		lastRefill: time.Now(),
	}
}

func (tb *TokenBucket) Allow() bool {
	tb.mu.Lock()
	defer tb.mu.Unlock()

	now := time.Now()
	elapsed := now.Sub(tb.lastRefill).Seconds()
	tb.tokens = math.Min(tb.capacity, tb.tokens+elapsed*tb.refillRate)
	tb.lastRefill = now

	if tb.tokens >= 1.0 {
		tb.tokens -= 1.0
		return true
	}
	return false
}`,
    blueprintLanguage: "go",
  },
  recommendedBook: {
    title: "Building Microservices: Designing Fine-Grained Systems (2nd Edition)",
    author: "Sam Newman",
    keyChapters: "Chapter 5: Communication Technologies & API Gateways",
    whyReadThis: "The definitive guide on boundary architecture, backend-for-frontend (BFF) patterns, and gateway anti-patterns.",
    readingUrl: "https://samnewman.io/books/building_microservices_2nd_edition/",
  },
  handsOnChallenge: {
    ticketNumber: "GATEWAY-201",
    title: "Implement Path-Based Reverse Proxy with Sliding Window Rate Limiting",
    scenario: "Our ecommerce services are experiencing brute-force scrapers. You must implement a reverse proxy middleware that validates client API keys and enforces a limit of 100 requests per minute per IP.",
    acceptanceCriteria: [
      "Proxy forwards /api/v1/users to localhost:8081 and /api/v1/products to localhost:8082.",
      "Injects X-Forwarded-For and X-Correlation-ID headers on all proxied requests.",
      "Returns HTTP 429 Too Many Requests with Retry-After header when rate limit is exceeded.",
      "Preserves streaming response bodies without buffering entire payloads in gateway RAM.",
    ],
    hints: [
      "Use httputil.NewSingleHostReverseProxy in Go or http-proxy-middleware in Node.js.",
      "Track timestamps in Redis sorted sets for sliding window rate limits.",
    ],
    solutionCode: `// Reverse Proxy Handler with Header Injection
proxy := httputil.NewSingleHostReverseProxy(targetURL)
originalDirector := proxy.Director
proxy.Director = func(req *http.Request) {
    originalDirector(req)
    req.Header.Set("X-Forwarded-Host", req.Header.Get("Host"))
    req.Header.Set("X-Correlation-ID", uuid.New().String())
}`,
    solutionExplanation: "Using streaming reverse proxies avoids memory exhaustion while ensuring proper audit headers are attached to all downstream requests.",
  },
  selfCheckQuestions: [
    {
      category: "WHAT",
      question: "What is the difference between a forward proxy, reverse proxy, and API Gateway?",
      answerExplanation: "A forward proxy acts on behalf of clients (e.g. corporate internet filtering). A reverse proxy acts on behalf of servers (load balancing, SSL termination). An API Gateway is an advanced reverse proxy offering application-level features like authentication, rate limiting, and request routing.",
    },
    {
      category: "WHY",
      question: "Why should business domain logic be excluded from API Gateways?",
      answerExplanation: "Adding business domain logic turns the gateway into an unmanageable monolithic bottleneck, couples disparate team releases, increases deployment blast radiuses, and harms horizontal autoscaling.",
    },
    {
      category: "HOW",
      question: "How does a Token Bucket algorithm differ from a Leaky Bucket algorithm in traffic shaping?",
      answerExplanation: "Token Bucket allows traffic bursts up to the bucket capacity while maintaining an average rate. Leaky Bucket smooths traffic to a strictly constant egress rate regardless of burst sizes, dropping or queuing excess packets.",
    },
  ],
};

export default topic;
