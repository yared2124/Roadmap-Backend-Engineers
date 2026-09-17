# ⚡ Backend Engineering Master Roadmap & Open Learning Hub

[![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4-38bdf8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![Playwright](https://img.shields.io/badge/Playwright-E2E_15%2F15_Passed-2EAD33?style=flat-square&logo=playwright)](https://playwright.dev/)
[![Production Audit](https://img.shields.io/badge/Production_Audit-311%2F311_Passed-emerald?style=flat-square)](https://github.com/yared2124/Roadmap-Backend-Engineers)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)

An open-access, zero-barrier, production-grade roadmap and learning platform for backend and distributed systems engineers. Designed to bridge the gap between building toy CRUD APIs and architecting resilient, high-throughput systems capable of handling production failures, data concurrency, and staff-level technical defense.

---

## 📑 Table of Contents

- [Architectural Philosophy](#-architectural-philosophy)
- [Key Features](#-key-features)
- [The 7 Architectural Mastery Phases](#-the-7-architectural-mastery-phases)
- [7 Industry-Grade Portfolio Capstones](#-7-industry-grade-portfolio-capstones)
- [Interactive Mock Interview Oral Defense](#-interactive-mock-interview-oral-defense)
- [Project Directory Structure](#-project-directory-structure)
- [Quick Start Guide](#-quick-start-guide)
- [Testing & Quality Verification](#-testing--quality-verification)
- [Deployment Guide](#-deployment-guide)
- [Keyboard Shortcuts](#-keyboard-shortcuts)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🏛️ Architectural Philosophy

Most developer roadmaps fail because they are lists of buzzwords without cognitive dependency order or practical enforcement. This platform implements the **Tri-Tier Mastery Loop** across every single module:

1. **Foundational Concept Walkthrough**: Hand-curated primary masterclass videos (ByteByteGo, Hussein Nasser, NeetCode, TechWorld with Nana) paired with secondary architectural deep dives.
2. **Authoritative Canonical Literature**: Direct open-access reading links from foundational texts (*Designing Data-Intensive Applications*, *Martin Fowler's Architecture Catalog*, *PostgreSQL Internals*, *High Performance Browser Networking*, *OWASP*).
3. **Multi-Language Implementation Blueprints**: 93 production implementations provided side-by-side in **Go**, **TypeScript (Node.js)**, and **Python**.
4. **Hands-On Terminal Verification Labs**: Realistic ticket scenarios with acceptance criteria, interactive hints, and model solutions.
5. **Oral Defense Self-Evaluation**: 93 technical whiteboard and interview simulation questions formatted into **WHAT**, **WHY**, and **HOW** to develop vocal communication clarity.
6. **Milestone Portfolio Capstones**: 7 end-to-end engineering projects with strict SLAs, failure tests, and evaluation rubrics.

---

## 🌟 Key Features

- **Zero-Barrier Instant Access**: No login, no sign-up paywall, and no tracking cookies. All progress is saved automatically to client-side `localStorage`.
- **Command Palette (`Ctrl+K` / `⌘K`)**: Lightning-fast fuzzy search across all 31 modules, 7 capstones, recommended books, questions, and quick actions.
- **Multi-Language Code Switcher**: Toggle seamlessly between Go, TypeScript, and Python with persistent language preference.
- **Live Mock Interview Timer**: Timed oral assessment simulator with Staff Engineer rubric breakdowns and scoring.
- **Markdown Notes Studio**: Rich personal notes editor with live markdown preview and one-click master export (`.md`) of all study notes.
- **Adaptive Dark / Light Mode**: Sleek, high-contrast monochrome design system optimized for long reading sessions.
- **100% Mobile & Desktop Responsive**: Independent sidebar scroll, touch-friendly navigation, and adaptive modals.

---

## 🗺️ The 7 Architectural Mastery Phases

The curriculum contains **31 exhaustive production deep-dives** arranged in cognitive dependency order:

| Phase | Core Focus | Topics Count | Milestone Capstone |
| :--- | :--- | :---: | :--- |
| **Phase 1: Foundations & Web Protocols** | CPU/RAM/Disk latency, TCP/IP sockets, HTTP/1.1 vs HTTP/2 vs HTTP/3, Radix routers, and serialization. | 4 Modules | **Capstone 01**: High-Throughput HTTP/1.1 Reverse Proxy & Load Balancer Engine |
| **Phase 2: Core API Architecture & Lifecycle** | Handlers/Controllers/Services, Onion middleware, context deadlines, strict DTO validation, and pagination. | 7 Modules | **Capstone 02**: Enterprise Multi-Tenant E-Commerce REST Engine |
| **Phase 3: Data Persistence & Storage** | PostgreSQL internals, MVCC, connection pooling, indexing, B-Trees vs LSM-Trees, and Redis caching. | 4 Modules | **Capstone 03**: Real-Time Multi-Region FinTech Ledger & Payment Engine |
| **Phase 4: Security & Access Control** | Token authentication, refresh rotation, RBAC/ABAC authorization engines, and OWASP API Top 10 defenses. | 3 Modules | **Capstone 04**: Zero-Trust IAM & Security Gateway Service |
| **Phase 5: Asynchronous Systems & Integrations** | Task queues, idempotent workers, Transactional Outbox pattern, HMAC webhooks, and WebSockets/SSE. | 5 Modules | **Capstone 05**: High-Throughput Distributed Task & Webhook Engine |
| **Phase 6: Reliability, Resilience & SRE** | RFC 9457 errors, 12-Factor configs, RED metrics, distributed tracing, graceful shutdowns, and circuit breakers. | 5 Modules | **Capstone 06**: High-Availability Observability & Fault Injection Platform |
| **Phase 7: Advanced Systems & Infrastructure** | Concurrency primitives, distributed locks, containerization, and multi-stage Docker builds. | 3 Modules | **Capstone 07**: Distributed Resilient Key-Value Store & Coordinator |

---

## 🏆 7 Industry-Grade Portfolio Capstones

Each capstone project provides production-grade requirements designed to be hosted as standalone repositories on your GitHub profile:

1. **Phase 1**: `http-reverse-proxy-engine` — Reverse proxy with round-robin balancing, active health checks, connection pooling, and connection draining.
2. **Phase 2**: `enterprise-ecommerce-core-api` — Multi-tenant API featuring keyset pagination, atomic transactions, idempotency headers, and rate limiting.
3. **Phase 3**: `fintech-ledger-engine` — Double-entry bookkeeping engine with pessimistic locking, PostgreSQL partition pruning, and sub-10ms P99 latency.
4. **Phase 4**: `zerotrust-iam-gateway` — Authentication service featuring asymmetric JWT signing (RS256), distributed token revocation via Redis, and fine-grained RBAC.
5. **Phase 5**: `distributed-task-webhook-engine` — Asynchronous queue implementing the Transactional Outbox pattern, exponential backoff retries, and HMAC signatures.
6. **Phase 6**: `observability-resilience-gateway` — SRE platform with OpenTelemetry distributed tracing, circuit breakers, and chaos injection endpoints.
7. **Phase 7**: `distributed-kv-store` — Distributed key-value coordinator implementing leader leases, vector clocks, and crash-recovery state snapshots.

---

## 🎙️ Interactive Mock Interview Oral Defense

Senior and Staff engineers stand out not by typing trivial syntax, but by articulating system trade-offs aloud under realistic interview pressure.

- **75-Second Timer**: Practice crisply explaining concepts before the clock runs out.
- **Categorized Defense Prompts**:
  - `[WHAT]`: Two-sentence crisp definition and mental model.
  - `[WHY]`: Architectural trade-offs, bottlenecks, and failure modes.
  - `[HOW]`: Production remediation, metrics to inspect, and concrete commands/code.
- **Staff Rubric Breakdown**: Reveal the model answer and evaluate yourself (*Nailed It*, *Partially*, *Missed*).
- **Persistent Scoring**: Tracks your oral readiness percentage across topics.

---

## 📁 Project Directory Structure

```
.
├── e2e/                             # Playwright End-to-End Test Suites (15 tests)
│   ├── 01-landing-navigation.spec.ts
│   ├── 02-roadmap-workspace.spec.ts
│   ├── 03-topic-deepdive-interactive.spec.ts
│   ├── 04-oral-exam-defense.spec.ts
│   └── 05-capstones-and-shortcuts.spec.ts
├── public/                          # Production Static Assets
│   ├── favicon.svg                  # High-res SVG favicon
│   ├── icon.svg                     # Browser app icon
│   ├── robots.txt                   # Search crawler directives
│   └── sitemap.xml                  # Canonical search index
├── scripts/                         # Automated Verification Scripts
│   ├── verify-production.js         # 311-point data & asset integrity audit
│   ├── verify-videos.js             # Live YouTube oEmbed availability scan
│   └── verify-books.js              # Canonical literature HTTP 200 verification
├── src/
│   ├── app/                         # Next.js 14 App Router
│   │   ├── globals.css              # Global design system & typography
│   │   ├── layout.tsx               # Root layout with rich SEO & OpenGraph tags
│   │   ├── not-found.tsx            # Custom 404 error page
│   │   └── page.tsx                 # Main application view & workspace router
│   ├── components/                  # UI Components
│   │   ├── BookCard.tsx             # Canonical reading resource card
│   │   ├── CapstoneViewer.tsx       # Portfolio capstone project viewer
│   │   ├── ChallengeSection.tsx     # Hands-on challenge & terminal lab
│   │   ├── CommandPalette.tsx       # Global Cmd+K quick search palette
│   │   ├── Header.tsx               # Sticky navigation header
│   │   ├── MockInterviewModal.tsx   # Live oral assessment simulator
│   │   ├── NotesDrawer.tsx          # Markdown notes studio & exporter
│   │   ├── PortfolioHome.tsx        # Standalone landing & portfolio overview
│   │   ├── RoadmapGuideModal.tsx    # Student orientation & study guide
│   │   ├── ShortcutsModal.tsx       # Keyboard shortcuts cheat-sheet
│   │   ├── Sidebar.tsx              # Syllabus phase accordion navigation
│   │   ├── TopicViewer.tsx          # Topic deep dive, code tabs, & player
│   │   ├── VideoPlayer.tsx          # Embedded video walkthroughs
│   │   └── VisualFlowchart.tsx      # System architecture flow diagram
│   ├── data/                        # Curriculum Data
│   │   ├── architectureFlows.ts     # Visual architecture node flows
│   │   ├── capstones.ts             # 7 portfolio capstone specifications
│   │   ├── multiLangCode.ts         # 93 Go, TypeScript, and Python snippets
│   │   └── roadmap.ts               # 31 topics, videos, literature, and questions
│   ├── hooks/
│   │   └── useProgress.ts           # LocalStorage state management
│   └── types/
│       └── roadmap.ts               # TypeScript interfaces & types
├── package.json
├── playwright.config.ts             # Playwright E2E configuration
├── tailwind.config.ts
└── tsconfig.json
```

---

## 🚀 Quick Start Guide

### Prerequisites
- **Node.js**: v18.17.0 or newer
- **npm**: v9.0.0 or newer

### Installation & Run

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yared2124/Roadmap-Backend-Engineers.git
   cd Roadmap-Backend-Engineers
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```

4. **Open in browser**:
   Navigate to [http://localhost:3000](http://localhost:3000).

---

## 🧪 Testing & Quality Verification

This project maintains automated quality gates to guarantee zero broken links, invalid YouTube videos, or UI regressions.

### 1. Run All Playwright End-to-End Tests
```bash
# Run all 15 E2E tests headless
npm run test:e2e

# Run with interactive Playwright UI dashboard
npm run test:e2e:ui
```

### 2. Run Comprehensive Production Audit
```bash
# Audits 311 data integrity constraints, SEO assets, and code samples
npm run test:prod
```

### 3. Verify Video & Literature Availability
```bash
# Verify all 51 YouTube videos are live and embeddable via oEmbed
npm run test:videos

# Verify all 31 open literature links return HTTP 200
npm run test:books
```

### 4. Build Production Bundle
```bash
# Compile and validate static generation
npm run build
```

---

## 🚢 Deployment Guide

### Deploying to Vercel (Recommended)

1. Fork or push this repository to your GitHub account.
2. Visit [Vercel](https://vercel.com) and click **Add New Project**.
3. Import `Roadmap-Backend-Engineers`.
4. Leave all default build settings:
   - **Framework Preset**: Next.js
   - **Build Command**: `next build`
   - **Output Directory**: `.next`
5. Click **Deploy**. Your roadmap will be live in under 60 seconds with global CDN caching.

### Self-Hosting via Docker

Create a `Dockerfile` in the root:
```dockerfile
FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

Build and run the container:
```bash
docker build -t backend-roadmap .
docker run -p 3000:3000 backend-roadmap
```

---

## ⌨️ Keyboard Shortcuts

Speed up your learning without lifting your fingers from the keyboard:

| Shortcut | Action | Description |
| :--- | :--- | :--- |
| `⌘K` / `Ctrl+K` | **Command Palette** | Quick search across all 31 modules, capstones, and actions |
| `j` / `→` | **Next Topic** | Jump to the next chronological curriculum topic |
| `k` / `←` | **Previous Topic** | Return to the preceding curriculum topic |
| `m` | **Toggle Topic** | Mark active topic as complete or incomplete |
| `b` | **Toggle Book** | Mark recommended canonical literature as read |
| `t` | **Toggle Theme** | Switch instantly between Dark and Light mode |
| `n` | **Focus Notes** | Jump directly to personal Markdown notes editor |
| `?` | **Help Cheat-sheet** | Open keyboard shortcuts modal |
| `Esc` | **Dismiss Modals** | Close any open modal or command palette |

---

## 🤝 Contributing

Contributions from the backend engineering community are welcome! To contribute:

1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/awesome-addition`).
3. Ensure all tests pass (`npm run test:prod && npm run test:e2e && npm run build`).
4. Commit your changes (`git commit -m "feat: add distributed tracing challenge"`).
5. Push to the branch (`git push origin feature/awesome-addition`).
6. Open a Pull Request.

---

## 📄 License

Distributed under the **MIT License**. See `LICENSE` for more information.

---

<p align="center">
  Built with ❤️ for backend and distributed systems engineers worldwide.
</p>
