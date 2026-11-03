import { RoadmapTopic } from '../../types/roadmap';

export const topic: RoadmapTopic = {
  "id": "full-text-search-elasticsearch",
  "number": 29,
  "title": "Full Text Search & Elasticsearch (Inverted Indexes, Tokenizers, Fuzzy Matching)",
  "phaseId": 5,
  "phaseName": "Asynchronous Systems & Integrations",
  "duration": "4 hrs 59 min",
  "timeEstimates": {
    "video": "4 hr 59 min",
    "reading": "40 min",
    "lab": "60 min",
    "total": "6 hr 39 min"
  },
  "youtubeId": "a4HBKEda_F8",
  "youtubeChannelUrl": "https://www.youtube.com/@freecodecamp",
  "shortSummary": "Inverted indexes, tokenization, stemming, BM25 scoring, fuzzy matching, and syncing search clusters with PostgreSQL via Change Data Capture (CDC).",
  "seniorInsight": {
    "quote": "Relational B-Trees fail catastrophically on text queries like WHERE bio LIKE '%developer%'. You cannot index a leading wildcard with B-Trees.",
    "productionLesson": "Never use Elasticsearch as your primary database of record. It is an auxiliary search index. Always store your source-of-truth in PostgreSQL, and stream updates asynchronously to Elasticsearch using CDC (Debezium) or application event triggers.",
    "commonMistake": "Allowing search index synchronization to run synchronously in user request handlers, slowing mutations."
  },
  "coreDeepDive": {
    "what": "Full-text search engines (Elasticsearch, OpenSearch, Meilisearch) analyze unstructured text and rank matching documents by relevance.",
    "why": "Delivers sub-50ms search across millions of documents with typos, synonyms, and multi-field relevance scoring.",
    "howItWorks": [
      "1. Inverted Index maps every unique word token to a list of document IDs containing that token.",
      "2. Analyzer applies Tokenization (splitting words), Lowercasing, Stop-word removal, and Stemming (running -> run).",
      "3. BM25 algorithm scores matches based on Term Frequency (TF) and Inverse Document Frequency (IDF)."
    ],
    "blueprintTitle": "Inverted Index Data Structure",
    "blueprintCode": "Document 1: \"PostgreSQL database indexing\"\nDocument 2: \"Indexing full text in Elasticsearch\"\n\n[Inverted Index Token Map]:\n\"database\"      ──► [Doc 1]\n\"elasticsearch\" ──► [Doc 2]\n\"indexing\"      ──► [Doc 1, Doc 2]  <-- Instant O(1) posting list seek!\n\"postgresql\"    ──► [Doc 1]",
    "blueprintLanguage": "text"
  },
  "recommendedBook": {
    "title": "Elasticsearch Reference Architecture",
    "author": "Elastic Documentation Team",
    "keyChapters": "Documents, Indices, and Inverted Index Mapping",
    "whyReadThis": "Official deep-dive into how Elasticsearch tokens, analyzers, and inverted indexes enable sub-second full-text and fuzzy search.",
    "readingUrl": "https://www.elastic.co/guide/en/elasticsearch/reference/current/documents-indices.html"
  },
  "handsOnChallenge": {
    "ticketNumber": "TICKET-025",
    "title": "Configure Custom Analyzer with Fuzzy Search Matching",
    "scenario": "Users searching for 'posgresql' (typo) receive 0 results instead of matching 'PostgreSQL'.",
    "acceptanceCriteria": [
      "Configure an Elasticsearch index mapping with an n-gram or fuzzy matching query.",
      "Ensure search query matches terms with Levenshtein edit distance of up to 2."
    ],
    "terminalLab": "curl -X GET \"localhost:9200/products/_search?q=name:posgresql\"",
    "hints": [
      "In Elasticsearch DSL, add { 'fuzziness': 'AUTO' } to the match query."
    ],
    "solutionCode": "const result = await esClient.search({\n  index: 'products',\n  body: {\n    query: {\n      match: {\n        name: {\n          query: userInput,\n          fuzziness: 'AUTO'\n        }\n      }\n    }\n  }\n});",
    "solutionExplanation": "Fuzzy matching calculates Damerau-Levenshtein distances, returning relevant documents even when users make typographical errors."
  },
  "selfCheckQuestions": [
    {
      "category": "WHAT",
      "question": "What is an Inverted Index in Elasticsearch / Lucene, and how does it enable sub-millisecond search across millions of documents?",
      "answerExplanation": "An inverted index is a mapping between individual words (tokens) and the specific documents containing them, similar to the index at the back of a book. Instead of scanning entire text columns on disk (like SQL LIKE %term%), Elasticsearch looks up the search term in a sorted dictionary in memory and instantly retrieves the posting list of matching document IDs in O(1) time."
    },
    {
      "category": "WHY",
      "question": "Why is Elasticsearch an anti-pattern when used as a primary system of record for transactional data?",
      "answerExplanation": "Elasticsearch is built for near-real-time search and analytics, not ACID transactions. Writes are acknowledged once written to memory buffers and translog, but are only searchable after index refresh (default 1 second). It lacks multi-document transactions, foreign key constraints, and can lose data during network partitions or split-brain cluster states. Primary data must reside in PostgreSQL."
    },
    {
      "category": "HOW",
      "question": "How do you synchronize data between a PostgreSQL primary database and an Elasticsearch cluster without dual-write inconsistency?",
      "answerExplanation": "Use Change Data Capture (CDC) via PostgreSQL Write-Ahead Logs (WAL) and Debezium/Kafka Connect, or read from a Transactional Outbox table. Every committed DB mutation produces a WAL event that streams asynchronously into Elasticsearch. If Elasticsearch crashes, the CDC consumer resumes from its last committed offset without losing records."
    }
  ]
};

export default topic;
