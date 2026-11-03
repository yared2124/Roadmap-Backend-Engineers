import { RoadmapTopic } from '../../types/roadmap';
import { RoadmapTopicSchema } from '../schema';
import topic1 from './backend-first-principles';
import topic2 from './backend-high-level';
import topic3 from './http-protocol-deep-dive';
import topic4 from './routing-request-dispatching';
import topic5 from './serialization-deserialization';
import topic6 from './middlewares-interceptor-patterns';
import topic7 from './request-context-deadlines';
import topic8 from './validation-transformation-dtos';
import topic9 from './handlers-controllers-services';
import topic10 from './restful-architecture-openapi';
import topic11 from './crud-deep-dive-state-mutation';
import topic12 from './api-gateways-reverse-proxies';
import topic13 from './grpc-protocol-buffers';
import topic14 from './database-basics-postgresql';
import topic15 from './schema-design-relational-modeling';
import topic16 from './database-indexing-query-performance';
import topic17 from './database-migrations-evolution';
import topic18 from './business-logic-layer-domain-invariants';
import topic19 from './caching-strategies-redis';
import topic20 from './authentication-identity';
import topic21 from './authorization-access-control';
import topic22 from './backend-security-hardening';
import topic23 from './task-queuing-scheduling';
import topic24 from './distributed-message-streaming-kafka';
import topic25 from './transactional-emails-event-triggers';
import topic26 from './webhooks-event-driven-subscriptions';
import topic27 from './real-time-backend-systems';
import topic28 from './object-storage-large-files';
import topic29 from './full-text-search-elasticsearch';
import topic30 from './robust-error-handling';
import topic31 from './configuration-management';
import topic32 from './logging-monitoring-observability';
import topic33 from './graceful-shutdown-fault-tolerance';
import topic34 from './concurrency-parallelism-race-conditions';
import topic35 from './database-replication-sharding';
import topic36 from './distributed-consensus-raft-cap';
import topic37 from './scaling-testing-devops';

const rawTopics: RoadmapTopic[] = [
  topic1,
  topic2,
  topic3,
  topic4,
  topic5,
  topic6,
  topic7,
  topic8,
  topic9,
  topic10,
  topic11,
  topic12,
  topic13,
  topic14,
  topic15,
  topic16,
  topic17,
  topic18,
  topic19,
  topic20,
  topic21,
  topic22,
  topic23,
  topic24,
  topic25,
  topic26,
  topic27,
  topic28,
  topic29,
  topic30,
  topic31,
  topic32,
  topic33,
  topic34,
  topic35,
  topic36,
  topic37,
];

// Runtime Zod validation guarantees 100% data integrity
export const ROADMAP_TOPICS: RoadmapTopic[] = rawTopics.map((t) => RoadmapTopicSchema.parse(t));
