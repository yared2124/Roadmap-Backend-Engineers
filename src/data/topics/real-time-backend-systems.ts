import { RoadmapTopic } from '../../types/roadmap';

export const topic: RoadmapTopic = {
  "id": "real-time-backend-systems",
  "number": 27,
  "title": "Real-Time Backend Systems (WebSockets, SSE - Server-Sent Events)",
  "phaseId": 5,
  "phaseName": "Asynchronous Systems & Integrations",
  "duration": "48 min",
  "timeEstimates": {
    "video": "1 hr 4 min",
    "reading": "35 min",
    "lab": "45 min",
    "total": "2 hr 24 min"
  },
  "youtubeId": "2Nt-ZrNP22A",
  "youtubeChannelUrl": "https://www.youtube.com/@hnasr",
  "secondaryVideo": {
    "youtubeId": "okrR1KXNLtA",
    "title": "Design a Real-Time Chat System (WebSockets at Scale)",
    "duration": "16 min",
    "description": "ByteByteGo's complete architecture for real-time messaging systems (WhatsApp/Discord), detailing persistent WebSocket connections, presence servers, and message routing."
  },
  "shortSummary": "Comparing HTTP Long Polling, Server-Sent Events (SSE), and WebSockets, connection state, heartbeats, and scaling with Redis Pub/Sub.",
  "seniorInsight": {
    "quote": "Do not use WebSockets when Server-Sent Events (SSE) will do. If your data flow is unidirectional (server-to-client like dashboards or stock tickers), SSE runs over plain HTTP/2 without firewall or proxy issues.",
    "productionLesson": "A single Node.js or Go server can easily hold 50,000 idle WebSocket connections, but holding state in memory breaks horizontal scaling. When User A connects to Server 1 and User B connects to Server 2, you must use a Redis Pub/Sub backplane to broadcast messages across all server nodes.",
    "commonMistake": "Failing to implement heartbeats (ping/pong), causing dead connections to sit open indefinitely when mobile devices lose cell reception."
  },
  "coreDeepDive": {
    "what": "Real-time communication protocols push data from server to client instantly without repeated client polling.",
    "why": "Enables interactive collaborative experiences (chat, live tracking, financial tickers) with sub-second latency.",
    "howItWorks": [
      "1. Server-Sent Events (SSE): Standard HTTP GET with text/event-stream content type, keeping connection open for server pushes.",
      "2. WebSockets: HTTP connection upgrades (101 Switching Protocols) to full-duplex, bi-directional TCP framing.",
      "3. Redis Pub/Sub backplane synchronizes messages across horizontally scaled backend clusters."
    ],
    "blueprintTitle": "Multi-Server WebSocket Scale with Redis Pub/Sub",
    "blueprintCode": "[Client A] ──► [Server Node 1] ──┐\n                                     ├──► [Redis Pub/Sub Channel]\n[Client B] ──► [Server Node 2] ──┘         │\n                                           ▼ (Broadcasts to all nodes)\n                                  [All connected clients receive event]",
    "blueprintLanguage": "text"
  },
  "recommendedBook": {
    "title": "High Performance Browser Networking (Free Complete Book)",
    "author": "Ilya Grigorik",
    "keyChapters": "Chapter 15: The WebSocket Protocol (and Chapter 14: Server-Sent Events)",
    "whyReadThis": "Full-text explanation of WebSocket framing, TCP connection upgrading, subprotocols, and comparisons with HTTP streaming.",
    "readingUrl": "https://hpbn.co/websocket/"
  },
  "handsOnChallenge": {
    "ticketNumber": "TICKET-023",
    "title": "Build Horizontally Scaled WebSocket Broadcast with Redis Pub/Sub",
    "scenario": "Users connected to different backend instances cannot see messages sent by each other in chat rooms.",
    "acceptanceCriteria": [
      "Subscribe each WebSocket server instance to a Redis pub/sub channel.",
      "Publish new chat messages to Redis.",
      "Broadcast received Redis messages to all locally connected client WebSockets."
    ],
    "terminalLab": "wscat -c ws://localhost:3000/ws",
    "hints": [
      "Keep Redis publisher and subscriber clients separate; a Redis client in subscriber mode cannot execute standard commands!"
    ],
    "solutionCode": "const sub = redis.duplicate();\nsub.subscribe('chat-events');\nsub.on('message', (channel, msg) => {\n  wss.clients.forEach(client => {\n    if (client.readyState === WebSocket.OPEN) client.send(msg);\n  });\n});",
    "solutionExplanation": "Using Redis as an external message bus decouples clients from specific application instances, allowing seamless horizontal scale across dozens of server nodes."
  },
  "selfCheckQuestions": [
    {
      "category": "WHAT",
      "question": "What are the architectural trade-offs between WebSockets and Server-Sent Events (SSE) for real-time applications?",
      "answerExplanation": "WebSockets provide full-duplex, bidirectional communication over a single long-lived TCP connection, ideal for chat, gaming, and collaborative editing. SSE is unidirectional (server-to-client only) running over standard HTTP/1.1 or HTTP/2, featuring built-in browser reconnection, event IDs, and compatibility with standard corporate firewalls and HTTP load balancers without protocol upgrade overhead."
    },
    {
      "category": "WHY",
      "question": "Why is a Redis Pub/Sub or Redis Streams backbone required when scaling WebSockets across multiple server instances?",
      "answerExplanation": "WebSocket connections are stateful TCP connections bound to a specific server instance's memory. If User A is connected to Server 1 and User B is connected to Server 2, Server 1 cannot directly deliver a message to User B. A shared Redis Pub/Sub message broker broadcasts the message to all servers, allowing whichever server holds User B's socket to forward the message."
    },
    {
      "category": "HOW",
      "question": "How do you prevent memory leaks and zombie TCP connections in high-concurrency WebSocket clusters?",
      "answerExplanation": "Implement proactive heartbeat ping/pong frames at the application layer. The server broadcasts a ping frame every 30 seconds; if a client socket fails to acknowledge with a pong within 10 seconds, the server forcefully closes the socket, cleans up event listeners and connection maps from memory, and triggers cleanup callbacks to release resources."
    }
  ]
};

export default topic;
