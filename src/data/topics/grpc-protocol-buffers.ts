import { RoadmapTopic } from "../../types/roadmap";

export const topic: RoadmapTopic = {
  id: "grpc-protocol-buffers",
  "number": 13,
  title: "gRPC & Protocol Buffers (High-Performance Binary RPC, Streaming & IDL Contracts)",
  phaseId: 2,
  phaseName: "Core API Architecture & Request Lifecycle",
  duration: "34 min",
  timeEstimates: {
    video: "35 min",
    reading: "35 min",
    lab: "45 min",
    total: "1 hr 55 min",
  },
  youtubeId: "pvPx4uw2aug",
  youtubeChannelUrl: "https://www.youtube.com/@Codementor",
  secondaryVideo: {
    youtubeId: "46O73On0gyI",
    title: "JSON vs Protocol Buffers Performance Comparison",
    duration: "14 min",
    description: "Hussein Nasser benchmarks serialization speeds, payload sizes, and CPU cycle costs between JSON and Protobuf.",
  },
  shortSummary: "Learn binary Protocol Buffers IDL, HTTP/2 multiplexing, streaming RPCs, and high-throughput inter-service communication.",
  seniorInsight: {
    quote: "JSON is for humans and browsers. In backend-to-backend distributed microservices, gRPC over HTTP/2 delivers 7x to 10x throughput with strict compile-time type safety.",
    productionLesson: "Never reuse field tag numbers in .proto definitions. Protobuf uses varint tag numbers (1, 2, 3), not field names, on the wire. Changing tag numbers causes silent data corruption across deployed services.",
    commonMistake: "Attempting to use gRPC directly in standard web browsers without gRPC-Web proxy translation, since browsers cannot control raw HTTP/2 framing.",
  },
  coreDeepDive: {
    what: "gRPC is an open-source high-performance Remote Procedure Call (RPC) framework developed by Google that uses Protocol Buffers for structured binary serialization and HTTP/2 for transport.",
    why: "JSON over HTTP/1.1 suffers from text serialization overhead, head-of-line blocking, large payload sizes, and loose runtime schema validation that breaks across microservices.",
    howItWorks: [
      "1. Engineers define service methods and message schemas in language-neutral .proto Interface Definition Language (IDL) files.",
      "2. The protoc compiler generates strongly-typed client stubs and server interfaces across Go, TypeScript, Java, and Python.",
      "3. Calls execute over persistent HTTP/2 TCP streams, multiplexing multiple concurrent requests over a single connection.",
      "4. Binary encoders serialize numbers into compact varints and zig-zag encoding, eliminating repetitive JSON key string overhead.",
    ],
    blueprintTitle: "Protocol Buffers Service Definition & Go gRPC Server Implementation",
    blueprintCode: `// order.proto - Interface Definition Language
syntax = "proto3";
package order.v1;

service OrderService {
  rpc CreateOrder (CreateOrderRequest) returns (OrderResponse);
  rpc StreamOrderUpdates (OrderStreamRequest) returns (stream OrderStatusUpdate);
}

message CreateOrderRequest {
  string user_id = 1;
  int64 amount_cents = 2;
  repeated string item_ids = 3;
}

message OrderResponse {
  string order_id = 1;
  string status = 2;
  int64 created_at = 3;
}`,
    blueprintLanguage: "protobuf",
  },
  recommendedBook: {
    title: "gRPC: Up and Running: Building Cloud Native Applications with Go and Java for Docker and Kubernetes",
    author: "Kasun Indrasiri & Danesh Kuruppu",
    keyChapters: "Chapter 2: Protocol Buffers, Chapter 3: gRPC Communication Patterns",
    whyReadThis: "Practical deep-dive covering streaming patterns, interceptors, deadlines, and production Kubernetes deployments.",
    readingUrl: "https://www.oreilly.com/library/view/grpc-up-and/9781492058328/",
  },
  handsOnChallenge: {
    ticketNumber: "RPC-301",
    title: "Implement gRPC Unary Order Dispatcher & Server Streaming Status Monitor",
    scenario: "Our warehouse system requires microsecond inter-service latency. Migrate the internal checkout service from REST/JSON to gRPC with deadline cancellation propagation.",
    acceptanceCriteria: [
      "Define order.proto with CreateOrder (unary) and StreamOrderStatus (server streaming).",
      "Compile code bindings using protoc / protoc-gen-go or ts-proto.",
      "Implement gRPC server with interceptor for OpenTelemetry correlation ID propagation.",
      "Enforce 1500ms context deadline; cancel downstream streaming if client disconnects.",
    ],
    hints: [
      "Use status.Errorf(codes.DeadlineExceeded, ...) to handle timeouts gracefully.",
      "Listen to ctx.Done() inside the streaming loop to detect client connection aborts.",
    ],
    solutionCode: `// Server-Streaming RPC Implementation in Go
func (s *OrderServer) StreamOrderStatus(req *pb.OrderStreamRequest, stream pb.OrderService_StreamOrderStatusServer) error {
    ctx := stream.Context()
    for status := range s.orderUpdatesChannel(req.OrderId) {
        select {
        case <-ctx.Done():
            return status.Errorf(codes.Canceled, "Client canceled status subscription")
        default:
            if err := stream.Send(&pb.OrderStatusUpdate{Status: status}); err != nil {
                return err
            }
        }
    }
    return nil
}`,
    solutionExplanation: "Server streaming maintains an active HTTP/2 stream, pushing state updates to the client without polling.",
  },
  selfCheckQuestions: [
    {
      category: "WHAT",
      question: "What are the four communication patterns supported by gRPC?",
      answerExplanation: "1. Unary RPC (single request, single response). 2. Server Streaming RPC (single request, stream of responses). 3. Client Streaming RPC (stream of requests, single response). 4. Bidirectional Streaming RPC (both sides stream concurrently).",
    },
    {
      category: "WHY",
      question: "Why is Protocol Buffers significantly faster than JSON serialization?",
      answerExplanation: "Protobuf encodes data into compact binary using field numbers (tags) and varints rather than repeating string keys, avoiding text parsing, ASCII encoding, and floating-point conversion costs.",
    },
    {
      category: "HOW",
      question: "How does gRPC handle backward and forward schema compatibility when fields are deprecated?",
      answerExplanation: "Protobuf ignores unknown field tags during deserialization. By marking obsolete fields as 'reserved' (both tag numbers and names) rather than reusing them, new and old client versions can communicate safely without breaking.",
    },
  ],
};

export default topic;
