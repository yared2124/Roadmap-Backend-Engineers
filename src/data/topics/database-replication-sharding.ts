import { RoadmapTopic } from "../../types/roadmap";

export const topic: RoadmapTopic = {
  id: "database-replication-sharding",
  "number": 35,
  title: "High-Scale Database Architecture (Read Replicas, Multi-Leader & Consistent Hash Sharding)",
  phaseId: 7,
  phaseName: "Advanced Engineering, Scale & Operations",
  duration: "38 min",
  timeEstimates: {
    video: "35 min",
    reading: "40 min",
    lab: "55 min",
    total: "2 hrs 10 min",
  },
  youtubeId: "iHNovZUZM3A",
  youtubeChannelUrl: "https://www.youtube.com/@hnasr",
  secondaryVideo: {
    youtubeId: "3Kqal7QaCCM",
    title: "Database Sharding & Replication Topologies",
    duration: "13 min",
    description: "ByteByteGo visualizes master-slave replication lag, write-ahead log shipping, and horizontal range vs hash partitioning.",
  },
  shortSummary: "Scale beyond single-instance limits: Read replicas, replication lag defense, read-your-own-writes consistency, and consistent hash sharding.",
  seniorInsight: {
    quote: "Sharding is an architectural decision of last resort. First optimize queries, add proper indexes, vertically scale, and offload reads to replicas. Shard only when write throughput or storage exceeds physical machine capacity.",
    productionLesson: "Asynchronous replication means read replicas will lag behind the primary by milliseconds to seconds. Never route immediate post-mutation reads to replicas; enforce 'Read-Your-Own-Writes' consistency by querying the primary for 5-10 seconds after a user updates their profile.",
    commonMistake: "Picking a low-cardinality shard key (like country_code or status). This creates severe hotspots where one shard melts under 90% of the traffic while other shards remain idle.",
  },
  coreDeepDive: {
    what: "Database scaling splits data across multiple machines using replication (copying data to replicas to scale reads and ensure high availability) and sharding (partitioning rows across independent databases to scale writes and storage).",
    why: "A single database server has physical ceilings: CPU cores, RAM, network bandwidth, and disk I/O. When write volume or dataset sizes exceed hardware limits, horizontal partitioning is mandatory.",
    howItWorks: [
      "1. Master-Replica Replication: Primary accepts all writes, recording them to the Write-Ahead Log (WAL), which replica nodes stream and apply asynchronously.",
      "2. Read-Your-Own-Writes: Applications send user write requests to primary, set a cookie/timestamp, and direct subsequent reads from that user to primary until replication lag passes.",
      "3. Consistent Hashing: Sharding keys (e.g., user_uuid) are hashed onto a circular 32-bit or 64-bit keyspace with virtual nodes, minimizing data rebalancing when nodes are added or removed.",
      "4. Distributed Routing: An application router or middleware (like Vitess or Citus) inspects SQL queries and directs requests to the designated shard node.",
    ],
    blueprintTitle: "Consistent Hash Ring with Virtual Nodes in Go",
    blueprintCode: `// Consistent Hash Ring for Database Sharding in Go
type HashRing struct {
	vnodes   int
	ring     []uint32
	nodesMap map[uint32]string
	mu       sync.RWMutex
}

func NewHashRing(vnodes int) *HashRing {
	return &HashRing{
		vnodes:   vnodes,
		nodesMap: make(map[uint32]string),
	}
}

func (h *HashRing) AddNode(nodeId string) {
	h.mu.Lock()
	defer h.mu.Unlock()

	for i := 0; i < h.vnodes; i++ {
		vnodeKey := fmt.Sprintf("%s#%d", nodeId, i)
		hash := crc32.ChecksumIEEE([]byte(vnodeKey))
		h.ring = append(h.ring, hash)
		h.nodesMap[hash] = nodeId
	}
	sort.Slice(h.ring, func(i, j int) bool { return h.ring[i] < h.ring[j] })
}

func (h *HashRing) GetShard(key string) string {
	h.mu.RLock()
	defer h.mu.RUnlock()

	if len(h.ring) == 0 {
		return ""
	}

	hash := crc32.ChecksumIEEE([]byte(key))
	idx := sort.Search(len(h.ring), func(i int) bool {
		return h.ring[i] >= hash
	})

	if idx == len(h.ring) {
		idx = 0 // Wrap around the circular ring
	}
	return h.nodesMap[h.ring[idx]]
}`,
    blueprintLanguage: "go",
  },
  recommendedBook: {
    title: "Database Internals: A Deep Dive into How Distributed Data Systems Work",
    author: "Alex Petrov",
    keyChapters: "Part II: Distributed Systems, Chapter 10: Replication & Consistency, Chapter 11: Partitioning",
    whyReadThis: "In-depth engineering coverage of replication protocols, anti-entropy mechanisms, and distributed partitioning algorithms.",
    readingUrl: "https://www.oreilly.com/library/view/database-internals/9781492040330/",
  },
  handsOnChallenge: {
    ticketNumber: "SHARD-801",
    title: "Implement Consistent Hashing Shard Router with Dynamic Rebalancing",
    scenario: "Our users database has reached 500 million rows. Build an application-level shard router that maps incoming user queries across 4 PostgreSQL database shards using consistent hashing with 50 virtual nodes per physical shard.",
    acceptanceCriteria: [
      "Implement HashRing mapping UUID keys to shard connection pools.",
      "Achieve uniform distribution within +/- 10% standard deviation across shards.",
      "Implement Read-Your-Own-Writes router: send mutations to primary shard, but route reads to primary if write occurred within last 5 seconds.",
      "Handle shard additions: verify that adding a 5th shard moves only ~1/5th of keys.",
    ],
    hints: [
      "Use CRC32 or MurmurHash3 to project keys onto the 32-bit ring.",
      "Binary search (sort.Search or lower_bound) provides O(log V) shard lookup complexity.",
    ],
    solutionCode: `// Read-Your-Own-Writes Router Middleware
func ShardQueryRouter(userCtx Context, key string, isWrite bool) *sql.DB {
    shard := hashRing.GetShard(key)
    if isWrite {
        userCtx.SetLastWrite(time.Now())
        return shard.PrimaryDB
    }

    if time.Since(userCtx.GetLastWrite()) < 5*time.Second {
        return shard.PrimaryDB // Enforce causal consistency for the user
    }
    return shard.GetReadReplica() // Scale reads safely
}`,
    solutionExplanation: "Tracking the client's last write timestamp prevents users from seeing stale reads immediately after editing their own profile.",
  },
  selfCheckQuestions: [
    {
      category: "WHAT",
      question: "What is Consistent Hashing and why is it superior to modulo hashing (hash(key) % N) for database sharding?",
      answerExplanation: "In modulo hashing, adding or removing a single database shard changes N, which moves almost 100% of keys to new servers, causing catastrophic cache invalidation and data reshuffling. Consistent hashing maps keys and nodes to a circular keyspace, ensuring that adding a server only moves K/N keys (where K is total keys and N is total servers).",
    },
    {
      category: "WHY",
      question: "Why do cross-shard queries and joins create severe performance degradation?",
      answerExplanation: "Cross-shard joins cannot be executed within a single database query engine using indexes. The application or middleware must issue parallel network queries to all involved shards, transfer megabytes of raw rows over the network, and perform in-memory joins in application RAM.",
    },
    {
      category: "HOW",
      question: "How do Virtual Nodes (vnodes) solve the hotspot problem in consistent hash rings?",
      answerExplanation: "Without virtual nodes, random physical node positions on the ring can lead to non-uniform key ranges, where one server handles significantly more data than others. By assigning dozens or hundreds of virtual positions to each physical server, keys are distributed uniformly across the entire ring.",
    },
  ],
};

export default topic;
