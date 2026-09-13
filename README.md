# 🚀 Backend Engineering Master Roadmap & Learning Hub

An open-access, production-grade learning platform built with **Next.js (App Router)**, **TypeScript**, and **Tailwind CSS**. Designed for backend engineers and students to achieve staff-level understanding without any login or registration barriers.

Featuring curated video walkthroughs from [**@sriniously**](https://www.youtube.com/@sriniously), canonical engineering literature, and real-world production challenge tickets.

---

## 🌟 Key Features

1. **Zero-Barrier Instant Access**:
   - No login, sign-up, or tracking cookies. Students land on the site and immediately start learning.
2. **Local Progress Persistence (`localStorage`)**:
   - Tracks completed topics, book chapters read, and personal notes directly in the user's browser.
   - Live completion percentage and phase-by-phase progress bars.
3. **Monochrome (Black & White) Aesthetic**:
   - Minimalist, high-contrast, distraction-free typography with instant **Dark Mode / Light Mode** switching.
4. **Embedded YouTube Player**:
   - Responsive 16:9 player with native playback speed controls (0.5x – 2x), volume adjustment, and fullscreen mode.
5. **Staff Engineer Production Insights**:
   - Every topic includes 10+ year production realities, architectural mental models, code blueprints, and common junior pitfalls.
6. **Curated Engineering Literature**:
   - Handpicked readings from the top 10 canonical books (*Designing Data-Intensive Applications*, *The Art of PostgreSQL*, *Release It!*, *High Performance Browser Networking*, etc.).
7. **Hands-On Production Challenges & Solutions**:
   - Realistic incident/feature tickets with Acceptance Criteria, copy-pasteable terminal labs, interactive hints, and complete staff engineer solutions.

---

## 🛠️ Tech Stack

* **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
* **Language**: [TypeScript](https://www.typescriptlang.org/)
* **Styling**: [Tailwind CSS](https://tailwindcss.com/) (Monochrome / Zinc palette)
* **Icons**: [Lucide React](https://lucide.dev/)
* **Deployment Target**: [Vercel](https://vercel.com/) (Zero-configuration)

---

## 🚀 Quick Start (Running Locally)

1. Open your terminal in this project directory:
   ```bash
   cd backend-roadmap-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open your browser at:
   ```
   http://localhost:3000
   ```

---

## 🚢 Deploying to Vercel (1-Click)

This project is 100% pre-configured for Vercel deployment:

### Method A: Via GitHub (Recommended)
1. Push this directory to your GitHub account:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Backend Roadmap Platform"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/backend-roadmap-hub.git
   git push -u origin main
   ```
2. Go to [vercel.com/new](https://vercel.com/new), select your repository, and click **Deploy**.
3. Your platform will be live globally with automatic HTTPS and edge caching!

### Method B: Via Vercel CLI
```bash
npx vercel
```

---

## 📹 Customizing YouTube Videos & Channel

All 31 topics and video mappings are centralized in:
[`src/data/roadmap.ts`](./src/data/roadmap.ts)

To swap in your own video for any topic:
1. Open `src/data/roadmap.ts`.
2. Locate the topic (e.g. `http-protocol` or `postgresql-deep-dive`).
3. Replace `youtubeId: "..."` with your YouTube video ID (e.g. `youtubeId: "YOUR_VIDEO_ID"`).
4. Save the file; changes reflect immediately!

The global channel URL is configured at the top of the file:
```typescript
export const CHANNEL_URL = "https://www.youtube.com/@sriniously";
export const CHANNEL_NAME = "@sriniously";
```

---

## 📚 The 31 Roadmap Topics Included

* **Phase 1: Web Protocols & Foundations**
  1. High-Level Understanding of Backend and Frontend
  2. HTTP Protocol Deep Dive
  3. Routing & Request Dispatching
  4. Serialization and Deserialization
* **Phase 2: Architecture & Request Lifecycle**
  5. Handlers, Controllers, and Services
  6. Middlewares and the Onion Architecture
  7. Request Context and Deadlines
  8. Validation and Transformation
  9. CRUD Operations Deep Dive
  10. RESTful Architecture and Best Practices
  11. Business Logic Layer (BLL) & Domain Invariants
* **Phase 3: Data Persistence & Performance**
  12. PostgreSQL Deep Dive, Schema Design & Indexing
  13. Caching Strategies & Redis Deep Dive
  14. Full Text Search and Elasticsearch
  15. Object Storage and Large Files (S3 Presigned URLs)
* **Phase 4: Security & Access Control**
  16. Authentication and Authorization (JWT Rotation, Passkeys)
  17. Security & OWASP Top 10 API Security (BOLA/IDOR)
* **Phase 5: Background Processing & Integrations**
  18. Task Queuing, Background Jobs & Transactional Outbox
  19. Transactional Emails & Deliverability
  20. Webhooks: Sending & Receiving (HMAC Signatures)
  21. Real-Time Backend Systems (SSE vs WebSockets)
* **Phase 6: Reliability & Observability**
  22. Error Handling & RFC 9457 Problem Details
  23. Configuration Management & Secrets
  24. Logging, Monitoring & Observability (RED Method)
  25. Graceful Shutdown & Process Lifecycle
  26. The 12-Factor App Methodology
* **Phase 7: Advanced Engineering & Scale**
  27. Concurrency, Parallelism & Race Conditions
  28. Scaling, Read Replicas & High Availability
  29. Testing, Code Quality & Testcontainers
  30. OpenAPI Standards & Contract-First Design
  31. DevOps, Containers & CI/CD for Backend Engineers
