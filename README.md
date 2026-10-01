# 🚀 AI Startup Builder

> **Generative AI Business & Technical Co-Founder Engine**  
> Transform a simple 1-3 sentence startup idea into 10 production-ready deliverables, full-stack application code, SQL database schemas, interactive system diagrams, and executive investor blueprints in 60 seconds.

---

## 🌟 Highlighted Platform Features

- 🚀 **Full-Stack MVP Code Builder**: Generates complete runnable Next.js 14 App Router code, API handlers, PostgreSQL DDL migrations, `.env.example`, and `package.json` with an interactive live build console terminal.
- 🔒 **PostgreSQL Schema & Supabase RLS**: Automatically writes relational database tables with strict Supabase Row-Level Security (RLS) policies for multi-tenant data isolation.
- 📊 **Visual ERD & Architecture Diagrams**: Renders interactive Mermaid entity-relationship diagrams (ERD) and full-stack cloud data flow architecture.
- 📄 **Executive PDF Blueprint Export**: Exports a publication-grade 4-page PDF report complete with executive KPI metrics, Lean Canvas, competitor matrix, and pitch deck slides.
- 📱 **Responsive Landing Page Sandbox**: Live single-page landing preview with desktop/mobile (375px) viewport toggles and working email waitlist lead capture.
- 📈 **Tiered Operating Cost Engine**: Calculates Year 1 cloud expenses, monthly burn rates, and infrastructure scaling tiers tailored to your product.

---

## 🛠 Tech Stack

| Domain | Technology |
| :--- | :--- |
| **Framework** | [Next.js 14](https://nextjs.org/) (App Router) + React 18 |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) + Glassmorphism UX |
| **State Management** | [Zustand](https://github.com/pmndrs/zustand) |
| **AI Models** | Google Gemini 1.5 Flash / OpenAI GPT-4o-mini (with fallback synthesizer) |
| **Database & Auth** | PostgreSQL + [Supabase SSR](https://supabase.com/) Row Level Security |
| **Diagrams & PDF** | Mermaid.js, jsPDF, html2canvas |

---

## 📁 Repository Structure

```
AI Startup Builder/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── export/          # Markdown/JSON export handler
│   │   │   └── generate/        # AI blueprint generator endpoint
│   │   ├── auth/                # Supabase authentication pages
│   │   ├── dashboard/[id]/      # Deep-linked startup dashboard route
│   │   ├── globals.css          # Core design system tokens & glassmorphism
│   │   ├── layout.tsx           # Root layout with Navbar header
│   │   └── page.tsx             # Main application entry point
│   ├── components/
│   │   ├── layout/
│   │   │   └── navbar.tsx       # Header with Feature Highlights modal
│   │   ├── startup/
│   │   │   ├── app-builder.tsx  # 🚀 Building Feature (Code Compiler & Sandbox)
│   │   │   ├── business-model.tsx
│   │   │   ├── competitor-matrix.tsx
│   │   │   ├── cost-estimation.tsx
│   │   │   ├── dashboard-tabs.tsx
│   │   │   ├── database-schema.tsx
│   │   │   ├── idea-input-form.tsx
│   │   │   ├── marketing-plan.tsx
│   │   │   ├── pitch-deck.tsx
│   │   │   ├── tech-stack.tsx
│   │   │   └── ui-wireframe.tsx
│   │   ├── LandingPageSandbox.tsx # Interactive Landing Page Preview
│   │   └── VisualDiagrams.tsx     # Mermaid ERD & Architecture Diagrams
│   ├── lib/
│   │   ├── ai/                  # AI client configuration, prompts & parsers
│   │   ├── pdf-export.ts        # Publication-grade jsPDF generator
│   │   └── supabase/            # SSR Supabase client & middleware
│   ├── store/
│   │   └── use-startup-store.ts # Global Zustand state management
│   └── types/                   # TypeScript interfaces & database schemas
├── supabase/
│   └── migrations/              # Initial SQL schema migrations
├── .env.local                   # Local environment credentials
├── next.config.mjs              # Next.js configuration
├── package.json                 # Project dependencies & scripts
└── README.md                    # Project documentation
```

---

## ⚡ Quick Start & Installation

### 1. Prerequisites
Ensure you have **Node.js 18+** installed on your system.

### 2. Clone Repository & Install Dependencies
```bash
git clone https://github.com/your-username/ai-startup-builder.git
cd "AI Startup Builder"
npm install
```

### 3. Configure Environment Variables
Create a `.env.local` file in the root directory:
```env
# AI Provider Keys (Optional: local dynamic synthesizer runs if omitted)
GEMINI_API_KEY=your_gemini_api_key_here
OPENAI_API_KEY=your_openai_api_key_here
AI_PROVIDER=gemini

# Supabase Database Credentials (Optional: runs in offline mode if omitted)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) (or `http://localhost:3001`) in your browser.

### 5. Build for Production
```bash
npm run build
npm start
```

---

## 📋 The 10 Core Deliverables

1. **Lean Canvas**: 9-box business model (Problem, Solution, Value Prop, Channels, Revenue, Moats).
2. **Competitor Matrix**: Market share analysis, pricing models, and unfair advantage white space.
3. **UI Wireframes**: High-fidelity dashboard wireframe with design token specs and layout notes.
4. **Tech Stack**: Frontend, Backend, Database, Infrastructure, and AI integration selections.
5. **SQL Schema**: Relational database DDL with Supabase Row Level Security (RLS) policies.
6. **System Diagrams**: Visual Mermaid ERD database models and data flow architectures.
7. **Year 1 Costs**: Tiered expense breakdown and monthly burn rate calculations.
8. **Marketing GTM**: Go-to-market strategy, Day 1 launch blitz, and CAC channel estimates.
9. **Pitch Deck**: Slide-by-slide investor pitch presentation with speaker notes.
10. **🚀 App Builder**: Production MVP code compiler, multi-file code viewer, and interactive live sandbox.

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
