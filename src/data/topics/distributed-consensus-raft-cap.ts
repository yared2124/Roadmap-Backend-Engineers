import { RoadmapTopic } from "../../types/roadmap";

export const topic: RoadmapTopic = {
  id: "distributed-consensus-raft-cap",
  "number": 36,
  title: "Distributed Consensus, Raft Protocol & the CAP Theorem (Quorums, Pre-Vote & Leader Leases)",
  phaseId: 7,
  phaseName: "Advanced Engineering, Scale & Operations",
  duration: "40 min",
  timeEstimates: {
    video: "40 min",
    reading: "45 min",
    lab: "60 min",
    total: "2 hrs 25 min",
  },
  youtubeId: "vYp4LYbnnW8",
  youtubeChannelUrl: "https://www.youtube.com/@ongardie",
  secondaryVideo: {
    youtubeId: "3Kqal7QaCCM",
    title: "CAP Theorem vs PACELC Explained",
    duration: "11 min",
    description: "ByteByteGo breaks down network partitions, CP vs AP trade-offs, and latency vs consistency trade-offs during normal operation.",
  },
  shortSummary: "Master distributed consensus algorithms: Leader election, log replication, split-brain protection, Pre-Vote phase, and leader lease timers in Raft.",
  seniorInsight: {
    quote: "In a network of N nodes, you cannot prevent partitions; you can only decide whether you sacrifice availability or return stale/conflicting state. Consensus is the math of agreeing under partition.",
    productionLesson: "Always implement the Raft Pre-Vote extension. When an isolated node rejoins the cluster with an incremented term counter, without Pre-Vote it can disrupt a perfectly healthy leader and force needless re-elections across the cluster.",
    commonMistake: "Assuming that a majority write quorum (W + R > N) guarantees linearizability without clock drift protection; uncoordinated leader leases can allow two nodes to serve conflicting reads.",
  },
  coreDeepDive: {
    what: "Distributed consensus is the fundamental problem of getting multiple independent nodes to agree on a sequence of state transitions (a replicated log) even when network links drop and nodes crash.",
    why: "Without consensus protocols like Raft or Paxos, distributed databases succumb to Split-Brain syndrome, where two nodes believe they are the leader and write conflicting data.",
    howItWorks: [
      "1. A Raft cluster consists of an odd number of nodes (typically 3 or 5) operating in one of three states: Follower, Candidate, or Leader.",
      "2. Followers reset a randomized election timer (150ms-300ms) upon receiving periodic AppendEntries heartbeats from the leader.",
      "3. If a follower's timer expires without a heartbeat, it initiates the Pre-Vote phase, asking peers if its log is sufficiently up-to-date before incrementing the term.",
      "4. Once winning a majority vote quorum ((N/2) + 1), the candidate transitions to Leader, accepting client writes and replicating log entries to followers.",
      "5. An entry is committed and applied to the state machine only after a majority of nodes have acknowledged writing it to non-volatile disk.",
    ],
    blueprintTitle: "Raft Node Election State Machine & Quorum Logic in Go",
    blueprintCode: `// Raft Consensus Node State Machine in Go
type NodeRole int
const (
    Follower NodeRole = iota
    Candidate
    Leader
)

type RaftNode struct {
    id          int
    currentTerm int
    votedFor    int
    log         []LogEntry
    role        NodeRole
    commitIndex int
    peers       []string
    mu          sync.Mutex
}

func (rn *RaftNode) RequestVote(candidateId int, term int, lastLogIndex int, lastLogTerm int) bool {
    rn.mu.Lock()
    defer rn.mu.Unlock()

    if term < rn.currentTerm {
        return false // Reject stale term
    }

    if term > rn.currentTerm {
        rn.currentTerm = term
        rn.role = Follower
        rn.votedFor = -1
    }

    // Check log up-to-date invariant
    lastIdx := len(rn.log) - 1
    if (rn.votedFor == -1 || rn.votedFor == candidateId) && lastLogIndex >= lastIdx {
        rn.votedFor = candidateId
        return true
    }
    return false
}`,
    blueprintLanguage: "go",
  },
  recommendedBook: {
    title: "Designing Data-Intensive Applications: The Big Ideas Behind Reliable, Scalable, and Maintainable Systems",
    author: "Martin Kleppmann",
    keyChapters: "Chapter 8: The Trouble with Distributed Systems, Chapter 9: Consistency and Consensus",
    whyReadThis: "Widely regarded as the essential masterwork for understanding split-brain, linearizability, total order broadcast, and consensus proofs.",
    readingUrl: "https://dataintensive.net/",
  },
  handsOnChallenge: {
    ticketNumber: "RAFT-701",
    title: "Implement Raft Election Timer & Quorum Vote Counter",
    scenario: "Build the leader election engine for a distributed key-value store. Simulate a 3-node cluster, partition node 1, and ensure node 2 or 3 successfully reaches quorum and assumes leadership.",
    acceptanceCriteria: [
      "Followers track randomized election timeouts between 150ms and 300ms.",
      "Initiate RequestVote RPCs to all peers concurrently when timeout expires.",
      "Count votes: transition to Leader immediately upon receiving (N/2) + 1 votes.",
      "Leader broadcasts AppendEntries heartbeats every 50ms to maintain authority.",
    ],
    hints: [
      "Use time.AfterFunc or select with a time.NewTimer that is reset on every heartbeat.",
      "Ensure candidate cancels election if another node asserts a higher term.",
    ],
    solutionCode: `// Randomized Heartbeat Timer Reset
func (rn *RaftNode) resetElectionTimeout() {
    d := time.Duration(150+rand.Intn(150)) * time.Millisecond
    rn.electionTimer.Reset(d)
}`,
    solutionExplanation: "Randomizing election timeouts avoids Split-Vote stalemates where two candidates start elections simultaneously.",
  },
  selfCheckQuestions: [
    {
      category: "WHAT",
      question: "What is Split-Brain syndrome in distributed systems?",
      answerExplanation: "Split-Brain occurs when a network partition divides a cluster into two disconnected halves, and both halves believe they are the authoritative cluster, accepting conflicting writes that cannot be reconciled without data loss.",
    },
    {
      category: "WHY",
      question: "Why does a consensus cluster require an odd number of nodes (3, 5, 7) instead of an even number?",
      answerExplanation: "Consensus requires a strict majority quorum of (N/2) + 1 nodes. A 4-node cluster requires 3 nodes for quorum, meaning it can only tolerate 1 failure—the exact same fault tolerance as a 3-node cluster. Odd numbers maximize fault tolerance while minimizing communication overhead.",
    },
    {
      category: "HOW",
      question: "How do Leader Leases prevent stale reads in a distributed Raft cluster?",
      answerExplanation: "The leader acquires a time-bounded lease from a majority of followers. As long as the lease has not expired and local clock drift is bounded, the leader can serve read queries locally without consulting followers on every read, knowing no other leader could have been elected.",
    },
  ],
};

export default topic;
