import { RoadmapTopic } from '../../types/roadmap';

export const topic: RoadmapTopic = {
  "id": "object-storage-large-files",
  "number": 28,
  "title": "Object Storage & Large Files (S3 Pre-signed URLs, Multipart Uploads, CDN)",
  "phaseId": 5,
  "phaseName": "Asynchronous Systems & Integrations",
  "duration": "35 min",
  "timeEstimates": {
    "video": "45 min",
    "reading": "30 min",
    "lab": "45 min",
    "total": "2 hrs"
  },
  "youtubeId": "tfU0JEZjcsg",
  "youtubeChannelUrl": "https://www.youtube.com/@BeABetterDev",
  "secondaryVideo": {
    "youtubeId": "77lMCiiMilo",
    "title": "Introduction to Amazon Simple Storage Service (S3)",
    "duration": "10 min",
    "description": "Official AWS architecture breakdown of Amazon S3 storage classes, bucket policies, data durability (11 nines), and security controls."
  },
  "shortSummary": "Storing BLOBs in cloud object storage (AWS S3/Cloudflare R2), S3 pre-signed upload URLs, multipart uploads for large files, and CDN distribution.",
  "seniorInsight": {
    "quote": "Never proxy file uploads through your backend application server. Let the client upload directly to S3 via pre-signed URLs.",
    "productionLesson": "Streaming a 500MB video file through your API server consumes memory, blocks worker event loops, and burns expensive egress bandwidth. Generate a temporary, cryptographically signed S3 PUT URL and have the browser upload directly to S3.",
    "commonMistake": "Storing file uploads on local server disk (e.g. /var/uploads) in a containerized environment where container restarts erase files."
  },
  "coreDeepDive": {
    "what": "Object storage (S3, GCS, R2) provides virtually unlimited, durable, flat-namespace storage for unstructured binary data (images, videos, backups).",
    "why": "Decouples state from compute instances, scales infinitely, and delivers files globally through edge CDNs.",
    "howItWorks": [
      "1. Client requests upload ticket from API server.",
      "2. Server generates pre-signed URL with restrictive bucket key, expiration (15 mins), and content-type constraints.",
      "3. Client streams file directly to S3 via HTTP PUT.",
      "4. S3 fires an event notification (or client alerts API) to finalize processing."
    ],
    "blueprintTitle": "Pre-signed URL Direct Upload Architecture",
    "blueprintCode": "[Client Browser]\n   │\n   ├── 1. Request Upload Ticket ──► [Backend API]\n   │                                   │ (Generates temporary S3 signed URL)\n   │◄── 2. Returns Signed S3 URL ──────┘\n   │\n   └── 3. PUT File Directly (Zero Backend Bandwidth!) ──► [AWS S3 Bucket]\n                                                              │\n                                                              ▼\n                                                     [CloudFront CDN]",
    "blueprintLanguage": "text"
  },
  "recommendedBook": {
    "title": "Amazon Simple Storage Service (S3) User Guide",
    "author": "Amazon Web Services",
    "keyChapters": "Working with Pre-signed URLs for Secure Direct-to-S3 Uploads",
    "whyReadThis": "Official architectural guide on generating time-limited pre-signed URLs, handling multipart uploads, and offloading large file streaming from API servers.",
    "readingUrl": "https://docs.aws.amazon.com/AmazonS3/latest/userguide/using-presigned-url.html"
  },
  "handsOnChallenge": {
    "ticketNumber": "TICKET-024",
    "title": "Generate Secure S3 Pre-signed Upload URL with Strict Constraints",
    "scenario": "Users upload 50MB avatars through the backend, freezing Node.js event loops and exhausting RAM.",
    "acceptanceCriteria": [
      "Implement POST /api/uploads/presigned generating an S3 PUT URL.",
      "Enforce 15-minute expiration and exact Content-Type constraint.",
      "Validate user authentication before issuing the signed URL."
    ],
    "terminalLab": "curl -X POST http://localhost:3000/api/uploads/presigned -H \"Authorization: Bearer valid_token\"",
    "hints": [
      "Use @aws-sdk/s3-request-presigner's getSignedUrl with PutObjectCommand."
    ],
    "solutionCode": "import { getSignedUrl } from '@aws-sdk/s3-request-presigner';\nimport { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';\n\nasync function getUploadUrl(userId, fileType) {\n  const key = 'avatars/' + userId + '/' + crypto.randomUUID() + '.' + fileType;\n  const command = new PutObjectCommand({\n    Bucket: 'my-app-assets',\n    Key: key,\n    ContentType: 'image/' + fileType\n  });\n  return getSignedUrl(s3, command, { expiresIn: 900 });\n}",
    "solutionExplanation": "Pre-signed URLs offload upload bandwidth to cloud object storage providers while strictly retaining backend control over storage keys and expiration."
  },
  "selfCheckQuestions": [
    {
      "category": "WHAT",
      "question": "What is an S3 Pre-signed URL, and how does it prevent backend servers from becoming network bottlenecks during file uploads?",
      "answerExplanation": "A pre-signed URL is an Amazon S3/Cloud Storage URL cryptographically signed with backend AWS credentials, granting temporary write or read permissions for a specific object key. Instead of routing multi-gigabyte video or image streams through the backend server (saturating server network bandwidth and RAM), the client uploads the file directly to S3 storage over AWS edge networks."
    },
    {
      "category": "WHY",
      "question": "Why is S3 Multipart Upload mandatory for files larger than 100MB in production systems?",
      "answerExplanation": "Single-part uploads must transfer the entire file in one continuous stream; a single network drop at 99% forces the user to re-upload from 0%. Multipart uploads divide the file into independent 5MB-50MB chunks that upload concurrently, allow individual chunk retries on failure, and assemble atomically on S3 once all parts finish."
    },
    {
      "category": "HOW",
      "question": "How do you securely validate file types and prevent malicious executable uploads when using pre-signed upload URLs?",
      "answerExplanation": "Never trust file extensions. When generating the pre-signed URL, enforce strict upload conditions: (1) sign the exact Content-Type header (e.g., image/png), (2) specify content-length-range bounds, (3) configure an asynchronous AWS Lambda or worker triggered by S3 ObjectCreated events to inspect the magic bytes (file header signatures) and quarantine invalid files."
    }
  ]
};

export default topic;
