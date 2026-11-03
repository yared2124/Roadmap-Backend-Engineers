import { RoadmapTopic } from "../../types/roadmap";

export const topic: RoadmapTopic = {
  id: "distributed-message-streaming-kafka",
  "number": 24,
  title: "Distributed Message Streaming & Event Brokers (Apache Kafka, Partitions & Consumer Groups)",
  phaseId: 5,
  phaseName: "Asynchronous Systems & Integrations",
  duration: "35 min",
  timeEstimates: {
    video: "35 min",
    reading: "40 min",
    lab: "50 min",
    total: "2 hrs 05 min",
  },
  youtubeId: "Ch5VhJzaoaI",
  youtubeChannelUrl: "https://www.youtube.com/@jamescutajar",
  secondaryVideo: {
    youtubeId: "41NOoEz3Tzc",
    title: "Event-Driven Microservices Architecture Patterns",
    duration: "16 min",
    description: "freeCodeCamp breakdown of choreography vs orchestration, CQRS, and asynchronous event log decoupling.",
  },
  shortSummary: "Master immutable append-only commit logs, topic partitioning, consumer group scaling, and exactly-once processing with Apache Kafka.",
  seniorInsight: {
    quote: "Queues delete messages after consumption; Kafka retains immutable distributed logs. It transforms disparate services from tightly-coupled RPC callers into independent, asynchronous stream processors.",
    productionLesson: "Order is only guaranteed within a single partition, never across an entire topic. To ensure sequential ordering of events (e.g. all transactions for account #42), assign account_id as the message key so it hashes deterministically to the same partition.",
    commonMistake: "Using automatic offset commits with auto.commit.interval.ms. If an application crashes mid-processing, offsets may already be committed, resulting in silent message loss.",
  },
  coreDeepDive: {
    what: "Apache Kafka is a distributed event streaming platform built on an immutable, partitioned, append-only commit log capable of handling millions of events per second with millisecond latency.",
    why: "Traditional message brokers (like RabbitMQ) track individual message acknowledgments in memory, which degrades under high throughput and prevents replaying historical events.",
    howItWorks: [
      "1. Producers serialize messages with a key, value, and timestamp, hashing keys to assign them to specific topic partitions.",
      "2. Brokers append bytes directly to OS page caches using sequential disk I/O and zero-copy Linux sendfile syscalls.",
      "3. Partitions are replicated across a quorum of broker nodes using an In-Sync Replica (ISR) list for fault tolerance.",
      "4. Consumer groups balance partitions across consumer instances; each consumer tracks its position via sequential offsets committed to the __consumer_offsets topic.",
    ],
    blueprintTitle: "Manual Offset Commit & Idempotent Kafka Consumer Pattern",
    blueprintCode: `// Kafka Consumer with Manual Offset Commit in Go / Sarama
func ProcessOrderEvents(consumer sarama.PartitionConsumer, db *sql.DB) {
    for msg := range consumer.Messages() {
        var event OrderPlacedEvent
        if err := json.Unmarshal(msg.Value, &event); err != nil {
            log.Printf("Malformed message at offset %d: %v", msg.Offset, err)
            continue
        }

        // Atomic Database Mutation + Offset Record
        tx, err := db.Begin()
        if err != nil {
            continue
        }

        if err := applyEvent(tx, event); err != nil {
            tx.Rollback()
            continue // Retry or dead-letter
        }

        tx.Commit()
        // Explicitly commit offset only AFTER successful business state write
        consumer.MarkOffset(msg, "")
    }
}`,
    blueprintLanguage: "go",
  },
  recommendedBook: {
    title: "Kafka: The Definitive Guide: Real-Time Data and Stream Processing at Scale (2nd Edition)",
    author: "Gwen Shapira, Todd Palino, Rajini Sivaram & Krit Petty",
    keyChapters: "Chapter 3: Kafka Producers, Chapter 4: Kafka Consumers, Chapter 6: Reliable Data Delivery",
    whyReadThis: "The industry standard authority on partition mechanics, consumer group rebalancing, and exactly-once processing guarantees.",
    readingUrl: "https://www.oreilly.com/library/view/kafka-the-definitive/9781492043072/",
  },
  handsOnChallenge: {
    ticketNumber: "KAFKA-501",
    title: "Implement High-Throughput Event Ingestion with Ordered Partitioning",
    scenario: "Our payment processing service processes thousands of transactions per second. Build a Kafka producer and consumer group that processes transactions strictly in order per customer while scaling horizontally.",
    acceptanceCriteria: [
      "Produce events using customer_id as the partition key to guarantee order.",
      "Configure producer with acks=all and enable.idempotence=true.",
      "Implement consumer group scaling across 4 worker threads mapped to 4 partitions.",
      "Commit offsets synchronously only after persisting the transaction to the database.",
    ],
    hints: [
      "Default partitioner uses MurmurHash2 on the message key byte slice.",
      "Handle ConsumerGroupSession rebalance callbacks (CleanUp & Setup).",
    ],
    solutionCode: `// Idempotent Kafka Producer Configuration in TypeScript (KafkaJS)
const kafka = new Kafka({ clientId: "billing-service", brokers: ["localhost:9092"] });
const producer = kafka.producer({
  idempotent: true,
  maxInFlightRequests: 5,
});

await producer.send({
  topic: "customer-transactions",
  messages: [
    {
      key: customerId, // Guarantees partition consistency
      value: JSON.stringify({ eventId: uuidv4(), amountCents, timestamp: Date.now() }),
    },
  ],
});`,
    solutionExplanation: "Idempotent producers assign sequence numbers to each batch, preventing duplicate events even if network ACKs fail.",
  },
  selfCheckQuestions: [
    {
      category: "WHAT",
      question: "What is a Consumer Group in Apache Kafka and how does it enable horizontal scalability?",
      answerExplanation: "A Consumer Group is a collection of consumers that coordinate to divide the partitions of a topic among themselves. If a topic has 8 partitions, a group of 4 consumers processes 2 partitions each. Adding more consumers up to 8 distributes the load horizontally.",
    },
    {
      category: "WHY",
      question: "Why does Kafka write sequentially to disk rather than keeping messages entirely in RAM?",
      answerExplanation: "Sequential disk I/O on modern NVMe drives achieves gigabytes per second, comparable to random RAM access. Kafka utilizes OS page caching and zero-copy sendfile syscalls, bypassing JVM garbage collection and sustaining massive throughput without RAM exhaustion.",
    },
    {
      category: "HOW",
      question: "How does Kafka achieve Exactly-Once Semantics (EOS) across distributed producers and consumers?",
      answerExplanation: "EOS combines idempotent producers (assigning monotonically increasing sequence IDs to deduplicate retries) and two-phase transactional commits across multiple partitions, coordinates through a Transaction Coordinator broker.",
    },
  ],
};

export default topic;
