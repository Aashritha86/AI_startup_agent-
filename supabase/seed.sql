-- ==========================================
-- AI STARTUP BUILDER - SEED DATA
-- Seed: supabase/seed.sql
-- ==========================================

-- Insert a sample demo startup project
INSERT INTO public.startups (
  id,
  user_id,
  title,
  tagline,
  description,
  industry,
  target_audience,
  status
) VALUES (
  'a0000000-0000-0000-0000-000000000001',
  NULL, -- Public demo accessible to all users
  'NexusAI',
  'Automated AI Startup Platform for Modern Builders',
  'An AI co-founder that orchestrates full-stack technical schemas, business models, and market stress-tests in seconds.',
  'Enterprise SaaS & AI Automation',
  'B2B Founders, Product Managers, and Engineering Leaders',
  'active'
) ON CONFLICT (id) DO NOTHING;

-- Insert sample 9-part deliverables for the demo startup
INSERT INTO public.deliverables (
  startup_id,
  business_model,
  competitor_matrix,
  ui_wireframe,
  tech_stack,
  database_schema,
  cost_estimation,
  marketing_plan,
  pitch_deck,
  landing_page
) VALUES (
  'a0000000-0000-0000-0000-000000000001',
  '{
    "problem": ["Manual workflows consume 15+ hours per week per employee", "Legacy software lacks real-time contextual AI capabilities", "High error rate and operational friction in cross-team data handoffs"],
    "solution": ["Automated AI agent orchestration layer with instant zero-code setup", "Context-aware predictive analytics and real-time decision synthesis", "Seamless multi-platform integration with Supabase, Slack, and GitHub"],
    "valueProposition": "Streamline operations with automated AI workflow synthesis and real-time decision support.",
    "customerSegments": ["Fast-growing B2B SaaS Startups", "Enterprise Operations Teams", "Technical Product Managers"],
    "channels": ["Product-Led Growth (PLG) free tier funnel", "Developer communities (GitHub, ProductHunt)", "Outbound enterprise sales"],
    "revenueStreams": ["Tiered SaaS Subscription ($49 - $799/mo)", "Usage-based AI API token consumption fees", "Enterprise Custom SLA"],
    "costStructure": ["LLM API inference costs", "AWS ECS / RDS Cloud infrastructure", "Customer support engineering"],
    "keyMetrics": ["Monthly Recurring Revenue (MRR)", "Net Revenue Retention (NRR) > 120%", "Time-to-Value (TTV) < 5 minutes"],
    "unfairAdvantage": "Proprietary multi-agent memory engine and fine-tuned domain models with 99.4% accuracy."
  }'::jsonb,
  '{
    "competitors": [
      {
        "name": "LegacyCorp Automation",
        "marketShare": "42%",
        "strengths": ["Enterprise relationships", "Broad feature set"],
        "weaknesses": ["Outdated UI", "Complex 3-month setup", "Extremely expensive"],
        "pricingModel": "$50,000/year contract minimum",
        "vulnerability": "Slow innovation velocity and zero native LLM agent support."
      },
      {
        "name": "AutoFlow SaaS",
        "marketShare": "24%",
        "strengths": ["Popular workflow builder", "Large integration library"],
        "weaknesses": ["Breaks on complex logic", "No deep AI reasoning or memory"],
        "pricingModel": "$99/mo base subscription",
        "vulnerability": "Lacks contextual intelligence and multi-turn reasoning."
      },
      {
        "name": "HyperAgent AI",
        "marketShare": "12%",
        "strengths": ["Modern AI UI", "Active open-source community"],
        "weaknesses": ["High latency", "Poor enterprise security and RLS compliance"],
        "pricingModel": "$29/mo starter",
        "vulnerability": "Fails enterprise compliance, audit logging, and data privacy tests."
      }
    ],
    "userUnfairAdvantage": "Sub-100ms response latency paired with Supabase Row Level Security (RLS) and adaptive memory agents.",
    "marketGapSummary": "Massive white-space opportunity for a secure, instant-setup AI orchestration engine tailored for high-velocity teams."
  }'::jsonb,
  '{
    "dashboardName": "NexusAI Command Center",
    "colorPalette": {
      "primary": "Indigo Violet Gradient (#6366F1 → #8B5CF6)",
      "secondary": "Emerald Green (#10B981)",
      "background": "Dark Slate (#090D16)",
      "accent": "Cyan Glow (#06B6D4)"
    },
    "layoutStructure": "Glassmorphism responsive dashboard with collapsable sidebar navigation, real-time agent execution stream, and interactive metric cards.",
    "components": [
      {
        "id": "comp-1",
        "name": "Agent Performance Metric Card",
        "type": "stat_card",
        "title": "Autonomous Workflows Executed",
        "description": "Live calculation of AI tasks completed this billing cycle",
        "tailwindClasses": "bg-slate-900/90 border border-slate-800 p-5 rounded-xl shadow-lg backdrop-blur-md"
      }
    ],
    "dashboardPreviewNotes": "Dark-mode aesthetic utilizing vibrant neon accents, subtle hover glow effects, and responsive card layouts."
  }'::jsonb,
  '{
    "frontend": [
      {"category": "Framework", "tool": "Next.js 14 (App Router)", "justification": "Server-side rendering, streaming, and fast SEO performance.", "monthlyCostEst": "$0 (Vercel)"},
      {"category": "Styling & UI", "tool": "Tailwind CSS + Lucide Icons", "justification": "Rapid, responsive design system with zero runtime CSS overhead.", "monthlyCostEst": "$0"},
      {"category": "State Management", "tool": "Zustand", "justification": "Lightweight client state manager with devtools support.", "monthlyCostEst": "$0"}
    ],
    "backend": [
      {"category": "Runtime / API", "tool": "Next.js Route Handlers", "justification": "Unified fullstack TypeScript development with edge execution.", "monthlyCostEst": "$0"}
    ],
    "database": [
      {"category": "Database & Auth", "tool": "Supabase (PostgreSQL)", "justification": "PostgreSQL engine with Row-Level Security (RLS) and real-time subscriptions.", "monthlyCostEst": "$25/mo"},
      {"category": "Vector Store", "tool": "Supabase pgvector extension", "justification": "Native vector similarity search directly inside PostgreSQL.", "monthlyCostEst": "$0 (Included)"}
    ],
    "infrastructure": [
      {"category": "Hosting / CDN", "tool": "Vercel / AWS CloudFront", "justification": "Global edge CDN with sub-50ms global latency.", "monthlyCostEst": "$20/mo"}
    ],
    "aiIntegration": [
      {"category": "Primary LLM Provider", "tool": "Google Gemini 1.5 Flash / OpenAI API", "justification": "Structured JSON output guarantee with ultra-fast generation.", "monthlyCostEst": "$60/mo"}
    ],
    "scalabilityRating": "Grade A+ (Cloud-native serverless architecture ready for 500k+ MAU)",
    "architectureOverview": "Serverless Next.js edge router backed by Supabase PostgreSQL RLS security, pgvector semantic search, and AWS Lambda background workers."
  }'::jsonb,
  '{
    "tables": [
      {"tableName": "users", "description": "Core authentication and user profiles linked to Supabase Auth.", "columns": [{"name": "id", "type": "UUID", "isPrimary": true, "description": "Primary Key references auth.users(id)"}, {"name": "email", "type": "TEXT", "description": "User email address"}]},
      {"tableName": "startups", "description": "User created startup projects and metadata.", "columns": [{"name": "id", "type": "UUID", "isPrimary": true, "description": "Unique startup identifier"}, {"name": "title", "type": "TEXT", "description": "Startup project title"}]},
      {"tableName": "deliverables", "description": "The 9 core output components generated by the AI engine.", "columns": [{"name": "id", "type": "UUID", "isPrimary": true, "description": "Deliverable record ID"}]}
    ],
    "sqlDDL": "CREATE TABLE public.startups ( id UUID PRIMARY KEY DEFAULT gen_random_uuid(), user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE, title TEXT NOT NULL, created_at TIMESTAMPTZ DEFAULT now() ); ALTER TABLE public.startups ENABLE ROW LEVEL SECURITY; CREATE POLICY \"Users can only view their own startups\" ON public.startups FOR SELECT USING (auth.uid() = user_id OR user_id IS NULL);",
    "erDiagramDescription": "Relational 1-to-Many architecture: Auth Users -> Startups -> Deliverables (JSONB) & Simulation Runs."
  }'::jsonb,
  '{
    "year1TotalEstimated": 14200,
    "monthlyBurnRate": 980,
    "tiers": [
      {"tierName": "Bootstrap MVP", "monthlyCost": 180, "annualCost": 2160, "description": "Vercel Hobby + Supabase Free/Pro Tier + Pay-as-you-go AI inference."},
      {"tierName": "Seed Growth Tier", "monthlyCost": 980, "annualCost": 11760, "description": "Supabase Pro + AWS Lambda workers + Dedicated vector index + Support."},
      {"tierName": "Scale Tier (100k Users)", "monthlyCost": 4200, "annualCost": 50400, "description": "AWS ECS Cluster + Multi-region Supabase + Enterprise AI rate limits."}
    ],
    "breakdown": [
      {"category": "Database & Storage", "costMonthly": 25, "provider": "Supabase Pro", "notes": "PostgreSQL 8GB RAM with automated daily backups"},
      {"category": "AI LLM Token Inference", "costMonthly": 240, "provider": "Gemini / OpenAI", "notes": "Est. 15,000 requests per month"},
      {"category": "Hosting & Global CDN", "costMonthly": 40, "provider": "Vercel Pro", "notes": "Custom domains and analytics"}
    ],
    "costOptimizationTips": ["Use Redis caching for repeated AI query patterns.", "Implement fine-tuned smaller models for lightweight classification tasks."]
  }'::jsonb,
  '{
    "targetAudiencePersona": "Alex, Founder & CTO at a Series A SaaS company. Values speed, security, clean API design, and predictable pricing.",
    "gtmStrategy": "Product-Led Growth (PLG) featuring an interactive web playground, free diagnostic tools, and community advocacy.",
    "day1LaunchTactics": ["Product Hunt launch with custom interactive preview demo.", "Hacker News Show HN post featuring open technical architecture breakdowns.", "Twitter/X thread demonstrating live 10-second startup generation."],
    "channels": [
      {"channelName": "Developer Communities (GitHub/Reddit)", "cacEstimate": "$15", "expectedConversionRate": "4.2%", "strategy": "Share open-source utilities and engage in r/SaaS and r/NextJS."},
      {"channelName": "SEO & Engineering Content", "cacEstimate": "$28", "expectedConversionRate": "3.8%", "strategy": "Publish long-form technical guides on Next.js, Supabase, and AI architecture."}
    ],
    "viralHooks": ["Interactive Stress-Test Your Startup widget that generates shareable pivot certificates for Twitter/LinkedIn."]
  }'::jsonb,
  '{
    "elevationTagline": "The Automated AI Co-Founder for Modern Builders",
    "targetFundingAmount": "$1.5M Seed Round to scale engineering & market distribution",
    "slides": [
      {"slideNumber": 1, "title": "Problem Statement", "headline": "Building a Tech Startup Takes 6+ Months of Costly Setup", "content": ["85% of early startup time is wasted reinventing business models and tech stacks", "High developer & agency costs ($50k+ upfront)", "Lack of real-time market stress-testing before launch"], "visualRecommendation": "Dark UI visual contrasting traditional slow agency timelines vs 60-second AI generation.", "speakerNotes": "Start with the pain point: Founders spend months on boilerplate instead of building their core product."},
      {"slideNumber": 2, "title": "The Solution", "headline": "NexusAI: Instant Full-Stack Business & Technical Blueprint", "content": ["9 core business & tech deliverables generated in under 60 seconds", "Row-Level Security (RLS) database schemas", "Dynamic Market Stress-Test & Pivot Engine"], "visualRecommendation": "Interactive 3D dashboard mockup showcasing all 9 deliverables.", "speakerNotes": "Demonstrate how NexusAI acts as an instant technical co-founder."}
    ]
  }'::jsonb,
  '{
    "heroHeadline": "Turn Any Startup Idea into a Production-Ready Foundation in 60 Seconds",
    "heroSubheadline": "Orchestrate AI agents to generate your Lean Canvas, SQL Schema with Supabase RLS, Tech Stack, Pitch Deck, and Market Stress-Test Pivots.",
    "ctaText": "Generate My Startup Now",
    "valueBadge": "⚡ Powered by Next.js 14 & Supabase RLS",
    "features": [
      {"title": "9 Core Deliverables", "description": "From Lean Canvas & Pitch Decks to fully formatted SQL DDL schemas.", "iconName": "Layers"},
      {"title": "Stress-Test Simulator", "description": "Inject real-world market shocks (clones, traffic spikes) to test your survival.", "iconName": "ShieldAlert"}
    ],
    "socialProofQuote": "NexusAI generated our entire seed pitch deck and database schema in 2 minutes. We saved $15,000 in co-founder advisory fees.",
    "waitlistHookText": "Join 2,500+ founders and engineers getting priority early access."
  }'::jsonb
) ON CONFLICT (startup_id) DO NOTHING;
