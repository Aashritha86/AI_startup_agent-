import { StartupDeliverables } from '@/types/startup';
import { SimulationResult, MarketShockType } from '@/types/simulator';

export function cleanJsonResponse(rawText: string): any {
  try {
    // Remove markdown code block fences if present
    const cleaned = rawText.replace(/```json/gi, '').replace(/```/g, '').trim();
    return JSON.parse(cleaned);
  } catch (error) {
    console.error('Failed to parse AI JSON response:', error, 'Raw output:', rawText);
    throw new Error('Invalid JSON received from AI provider');
  }
}

// Domain recognition dictionary for high-precision dynamic generation
interface DomainArchetype {
  keywords: string[];
  namePrefix: string[];
  nameSuffix: string[];
  industry: string;
  audience: string;
  problems: string[];
  solutions: string[];
  valueProp: string;
  competitors: Array<{ name: string; share: string; strengths: string[]; weaknesses: string[]; pricing: string; vuln: string }>;
  tables: Array<{ name: string; desc: string; cols: Array<{ name: string; type: string; isPrimary?: boolean; desc: string }> }>;
  channels: string[];
  taglineVerb: string;
}

const DOMAIN_ARCHETYPES: Record<string, DomainArchetype> = {
  legal: {
    keywords: ['legal', 'contract', 'law', 'lawyer', 'compliance', 'clause', 'lease', 'patent', 'agreement'],
    namePrefix: ['Lex', 'Juris', 'Clausi', 'Veritas', 'Pact'],
    nameSuffix: ['AI', 'IQ', 'Legal', 'Flow', 'Copilot'],
    industry: 'LegalTech & Contract Intelligence',
    audience: 'In-house General Counsels, Real Estate Brokers, and Law Firms',
    problems: [
      'Attorneys spend 14+ hours reviewing repetitive contract clauses and redlining manually',
      'High risk of unflagged compliance liabilities and missed indemnification loopholes',
      'Commercial contract review costs exceed $500/hour with traditional counsel'
    ],
    solutions: [
      'Autonomous legal clause extraction and risk benchmarking',
      'Real-time automated redlining engine synced with company playbooks',
      'Instant contract summarization and risk score calculation in seconds'
    ],
    valueProp: 'Review, redline, and negotiate contracts faster with enterprise legal AI intelligence.',
    competitors: [
      { name: 'Ironclad', share: '38%', strengths: ['Strong CLM workflow', 'Enterprise brand'], weaknesses: ['High cost ($40k/yr minimum)', 'Slow custom setup'], pricing: '$35,000/yr annual', vuln: 'Lacks real-time autonomous negotiation agents' },
      { name: 'Robin AI', share: '18%', strengths: ['Legal assistant UI', 'Good clause library'], weaknesses: ['Limited to standard templates'], pricing: '$300/user/mo', vuln: 'Inflexible domain-specific contract logic' },
      { name: 'LegalZoom Business', share: '22%', strengths: ['Mass consumer awareness', 'Basic forms'], weaknesses: ['Zero intelligent contract analysis'], pricing: '$49/document', vuln: 'Cannot assist with custom enterprise negotiations' }
    ],
    tables: [
      { name: 'contracts', desc: 'Stores uploaded documents and execution status', cols: [{ name: 'id', type: 'UUID', isPrimary: true, desc: 'Primary ID' }, { name: 'title', type: 'TEXT', desc: 'Contract name' }, { name: 'risk_score', type: 'INTEGER', desc: 'Risk 1-100' }] },
      { name: 'clauses', desc: 'Extracted clauses and redline suggestions', cols: [{ name: 'id', type: 'UUID', isPrimary: true, desc: 'Clause ID' }, { name: 'contract_id', type: 'UUID', desc: 'Parent contract' }, { name: 'clause_type', type: 'TEXT', desc: 'Indemnity, Termination, etc.' }] },
      { name: 'audit_logs', desc: 'Compliance verification history', cols: [{ name: 'id', type: 'UUID', isPrimary: true, desc: 'Audit ID' }, { name: 'action', type: 'TEXT', desc: 'Redline approved/rejected' }] }
    ],
    channels: ['LegalTech conferences (Legalweek, CLOC)', 'LinkedIn outreach to VPs of Legal', 'Bar Association partnership webinars'],
    taglineVerb: 'Accelerate contract review with precision AI intelligence'
  },
  health: {
    keywords: ['health', 'medical', 'clinic', 'patient', 'doctor', 'triage', 'telehealth', 'hospital', 'wellness', 'diagnosis', 'pharma', 'care'],
    namePrefix: ['Cura', 'Triage', 'Pulse', 'Vital', 'Sano', 'Med'],
    nameSuffix: ['AI', 'Health', 'Pulse', 'Care', 'MD'],
    industry: 'Healthcare & Clinical Automation',
    audience: 'Outpatient Clinics, Telehealth Providers, and Hospital Operations Leaders',
    problems: [
      'Clinical staff spend 4+ hours daily on documentation and administrative intake',
      'Average clinic triage wait times exceed 45 minutes',
      'Fragmented patient communication leads to 25% follow-up drop-off'
    ],
    solutions: [
      'Autonomous patient intake and symptom severity classification',
      'Clinical transcription engine that drafts SOAP notes directly into EHR systems',
      'Intelligent post-visit care plan monitoring via automated patient check-ins'
    ],
    valueProp: 'Cut clinical intake triage time by 75% and eliminate physician documentation burnout.',
    competitors: [
      { name: 'Epic Systems MyChart', share: '52%', strengths: ['Dominant hospital integration', 'Comprehensive records'], weaknesses: ['Clunky legacy UX'], pricing: 'Enterprise custom ($1M+)', vuln: 'Extremely slow to adopt generative AI' },
      { name: 'Ada Health', share: '16%', strengths: ['User friendly mobile app'], weaknesses: ['Lacks deep clinic workflow EHR integration'], pricing: '$15/patient/visit', vuln: 'Cannot automate provider clinical notes and billing' },
      { name: 'K Health', share: '14%', strengths: ['Virtual doctor chats'], weaknesses: ['Consumer focus rather than B2B clinical tooling'], pricing: '$49/mo', vuln: 'Not customizable for independent private clinics' }
    ],
    tables: [
      { name: 'patients', desc: 'Encrypted patient demographic records', cols: [{ name: 'id', type: 'UUID', isPrimary: true, desc: 'Patient ID' }, { name: 'mrn', type: 'TEXT', desc: 'Medical Record Number' }] },
      { name: 'triage_encounters', desc: 'Symptom questionnaires and urgency classifications', cols: [{ name: 'id', type: 'UUID', isPrimary: true, desc: 'Encounter ID' }, { name: 'acuity_level', type: 'INTEGER', desc: 'Triage Acuity 1-5' }] },
      { name: 'clinical_notes', desc: 'AI-generated SOAP documentation for doctor sign-off', cols: [{ name: 'id', type: 'UUID', isPrimary: true, desc: 'Note ID' }, { name: 'provider_signed', type: 'BOOLEAN', desc: 'Approval status' }] }
    ],
    channels: ['Medical group purchasing associations (GPOs)', 'Healthcare Information Systems (HIMSS)', 'Clinician forums'],
    taglineVerb: 'Transform clinical intake and patient triage with automated care agents'
  },
  ecommerce: {
    keywords: ['ecommerce', 'e-commerce', 'retail', 'shop', 'inventory', 'store', 'cart', 'shopify', 'products', 'commerce', 'd2c', 'merchandise'],
    namePrefix: ['Cart', 'Omni', 'Merch', 'Flux', 'Shop', 'Velo'],
    nameSuffix: ['AI', 'Commerce', 'Pulse', 'Hub', 'Flow'],
    industry: 'E-Commerce Intelligence & Retail Operations',
    audience: 'Direct-to-Consumer (D2C) Brands, E-commerce Directors, and Shopify Merchants',
    problems: [
      'Stockouts and overstock errors cost mid-size retailers up to 12% of annual revenue',
      'High digital ad acquisition costs make customer retention critical',
      'Managing multi-channel listings across Amazon and Shopify causes inventory sync delays'
    ],
    solutions: [
      'Predictive inventory forecasting algorithm that prevents stockouts 30 days in advance',
      'Autonomous personalized video and promotional copy generation for high-intent shoppers',
      'Real-time multi-channel inventory sync with automated supplier purchase orders'
    ],
    valueProp: 'Boost merchant gross margins by 22% with automated inventory prediction and sales recovery.',
    competitors: [
      { name: 'Klaviyo', share: '45%', strengths: ['Email/SMS marketing powerhouse', 'Shopify ecosystem'], weaknesses: ['Expensive tiers'], pricing: '$150-$2,000/mo', vuln: 'Focuses purely on messaging rather than operational fulfillment' },
      { name: 'Inventory Planner', share: '20%', strengths: ['Deep forecasting formulas'], weaknesses: ['Complex configuration'], pricing: '$250/mo base', vuln: 'Lacks predictive visual merchandising and sales generation' },
      { name: 'Gorgias', share: '18%', strengths: ['Omnichannel customer support'], weaknesses: ['High ticket pricing tiers'], pricing: '$60-$900/mo', vuln: 'Only handles reactive tickets, not proactive demand forecasting' }
    ],
    tables: [
      { name: 'products', desc: 'SKU catalogue with live stock count and reorder thresholds', cols: [{ name: 'id', type: 'UUID', isPrimary: true, desc: 'Product ID' }, { name: 'sku', type: 'TEXT', desc: 'Stock Keeping Unit' }, { name: 'stock_level', type: 'INTEGER', desc: 'Current quantity' }] },
      { name: 'demand_forecasts', desc: 'Predictive 30-day demand curves per geographic region', cols: [{ name: 'id', type: 'UUID', isPrimary: true, desc: 'Forecast ID' }, { name: 'predicted_units', type: 'INTEGER', desc: 'Estimated sales' }] },
      { name: 'purchase_orders', desc: 'Automated vendor restock purchase orders', cols: [{ name: 'id', type: 'UUID', isPrimary: true, desc: 'Order ID' }, { name: 'supplier_status', type: 'TEXT', desc: 'Submitted/Shipped' }] }
    ],
    channels: ['Shopify App Store featured listings', 'D2C founder communities', 'E-commerce operations masterminds'],
    taglineVerb: 'Eliminate stockouts and maximize retail margins with intelligent commerce agents'
  },
  devtool: {
    keywords: ['dev', 'developer', 'code', 'api', 'database', 'postgres', 'supabase', 'cloud', 'devops', 'kubernetes', 'docker', 'infrastructure', 'backend'],
    namePrefix: ['Hyper', 'Dev', 'Stack', 'Kube', 'Synapse', 'Cloud'],
    nameSuffix: ['Ops', 'Flow', 'Engine', 'Scale', 'Hub'],
    industry: 'Developer Tools & Cloud Infrastructure',
    audience: 'Full-Stack Engineers, DevOps Leads, and Technical Founders',
    problems: [
      'Engineering teams waste 20% of sprints debugging microservice latency and config drift',
      'Database index tuning and connection exhaustion cause intermittent production outages',
      'Onboarding new engineers requires days of local environment setup and permission provisioning'
    ],
    solutions: [
      'Automated telemetry agent that detects database bottlenecks and writes migration indexes',
      'Zero-config cloud dev environments spun up in seconds',
      'AI architectural copilot that audits query performance in CI/CD'
    ],
    valueProp: 'Ship backend infrastructure faster with autonomous database tuning and telemetry auditing.',
    competitors: [
      { name: 'Datadog', share: '40%', strengths: ['Comprehensive monitoring'], weaknesses: ['High cost', 'Steep learning curve'], pricing: '$15-$35/host/mo', vuln: 'Observes problems but cannot autonomously generate code fixes' },
      { name: 'HashiCorp Terraform', share: '32%', strengths: ['Industry standard IaC'], weaknesses: ['Complex HCL syntax'], pricing: '$20/user/mo', vuln: 'Requires manual human architecture definition' },
      { name: 'Supabase Platform', share: '15%', strengths: ['Postgres ergonomics', 'Fast auth'], weaknesses: ['Requires manual query optimization on large datasets'], pricing: '$25/mo base', vuln: 'Opportunity to build complementary diagnostic tools' }
    ],
    tables: [
      { name: 'clusters', desc: 'Monitored database instances and container clusters', cols: [{ name: 'id', type: 'UUID', isPrimary: true, desc: 'Cluster ID' }, { name: 'provider', type: 'TEXT', desc: 'AWS, Supabase, GCP' }] },
      { name: 'performance_metrics', desc: 'Time-series query latency and connection pool metrics', cols: [{ name: 'id', type: 'UUID', isPrimary: true, desc: 'Metric ID' }, { name: 'latency_ms', type: 'FLOAT', desc: 'P99 Latency' }] },
      { name: 'remediation_jobs', desc: 'Autonomously generated PRs and index migrations', cols: [{ name: 'id', type: 'UUID', isPrimary: true, desc: 'Job ID' }, { name: 'git_pr_url', type: 'TEXT', desc: 'GitHub PR link' }] }
    ],
    channels: ['Developer community launches', 'GitHub trending repositories & developer discord servers', 'DevOps technical threads'],
    taglineVerb: 'Automate cloud infrastructure and database optimization with developer intelligence'
  },
  fintech: {
    keywords: ['fintech', 'finance', 'banking', 'payment', 'money', 'investment', 'accounting', 'invoice', 'credit', 'crypto', 'tax'],
    namePrefix: ['Apex', 'Ledger', 'Fin', 'Velo', 'Aero', 'Stratos'],
    nameSuffix: ['Pay', 'Fin', 'Ledger', 'Capital', 'Vault'],
    industry: 'FinTech & Automated Financial Operations',
    audience: 'CFOs, Startup Controllers, and Accounting Teams',
    problems: [
      'Month-end accounting reconciliation takes 10+ business days across fragmented bank accounts',
      'Uncollected invoices and payment disputes drain cash runway',
      'Manual expense categorization results in tax write-off oversights'
    ],
    solutions: [
      'Autonomous reconciliation agent that pairs bank transactions to ledger entries in real time',
      'Intelligent receivables collector that customizes friendly follow-up cadences automatically',
      'Predictive cash flow modeling that alerts founders to cash crunches in advance'
    ],
    valueProp: 'Close books in hours instead of days with continuous ledger intelligence.',
    competitors: [
      { name: 'QuickBooks Online', share: '55%', strengths: ['Universal accountant familiarity'], weaknesses: ['Legacy interface', 'Manual categorization errors'], pricing: '$90/mo', vuln: 'Lacks native autonomous transaction matching' },
      { name: 'Ramp / Brex', share: '24%', strengths: ['Modern corporate cards', 'Clean spend UI'], weaknesses: ['Focused strictly on spend management'], pricing: 'Free / Interchange fee', vuln: 'Does not automate accounts receivable or deep forecasting' },
      { name: 'Pilot.com', share: '12%', strengths: ['High-touch accounting service'], weaknesses: ['Expensive ($600+/mo)', 'Relies on human back-office staff'], pricing: '$7,200/year minimum', vuln: 'Slow manual turnaround compared to real-time AI reconciliation' }
    ],
    tables: [
      { name: 'ledgers', desc: 'Core double-entry financial accounts', cols: [{ name: 'id', type: 'UUID', isPrimary: true, desc: 'Account ID' }, { name: 'balance_cents', type: 'BIGINT', desc: 'Current balance' }] },
      { name: 'transactions', desc: 'Aggregated bank feed transactions with AI tags', cols: [{ name: 'id', type: 'UUID', isPrimary: true, desc: 'Transaction ID' }, { name: 'is_reconciled', type: 'BOOLEAN', desc: 'Reconciliation flag' }] },
      { name: 'cash_forecasts', desc: 'Predictive 12-month forward cash runway simulations', cols: [{ name: 'id', type: 'UUID', isPrimary: true, desc: 'Forecast ID' }, { name: 'burn_rate_cents', type: 'BIGINT', desc: 'Projected monthly burn' }] }
    ],
    channels: ['FinTech founder communities', 'CFO webinars & accounting firm channel partners', 'Startup accelerator perks'],
    taglineVerb: 'Automate accounting reconciliation and runway forecasting with financial AI'
  }
};

function detectDomain(prompt: string): DomainArchetype {
  const lower = prompt.toLowerCase();
  for (const key of Object.keys(DOMAIN_ARCHETYPES)) {
    const archetype = DOMAIN_ARCHETYPES[key];
    if (archetype.keywords.some((kw) => lower.includes(kw))) {
      return archetype;
    }
  }

  // Generic dynamic fallback synthesizing directly from the words in the prompt
  const words = prompt.trim().split(/\s+/).filter((w) => w.length > 3);
  const mainWord = words[0] ? words[0].charAt(0).toUpperCase() + words[0].slice(1) : 'Innovate';
  const secondWord = words[1] ? words[1].charAt(0).toUpperCase() + words[1].slice(1) : 'Flow';

  return {
    keywords: words,
    namePrefix: [mainWord, 'Velo', 'Aura', 'Omni', 'Nova'],
    nameSuffix: ['AI', 'IQ', 'Hub', 'Engine', 'OS'],
    industry: `${mainWord} & Intelligent Automation`,
    audience: `Operators and Teams working on ${prompt.slice(0, 40)}`,
    problems: [
      `High operational overhead and manual execution delays in ${prompt.slice(0, 50)}`,
      'Lack of integrated real-time contextual intelligence in current software tools',
      'Inconsistent output quality and lack of centralized observability across workflows'
    ],
    solutions: [
      `Autonomous agent system specifically engineered to streamline ${prompt.slice(0, 50)}`,
      'Real-time dashboard with automated exception handling and decision synthesis',
      'Seamless multi-platform integration with modern database and cloud APIs'
    ],
    valueProp: `Transform how teams execute ${prompt.slice(0, 60)} with automated intelligence.`,
    competitors: [
      { name: `Legacy${mainWord} Corp`, share: '40%', strengths: ['Established presence'], weaknesses: ['Outdated UI', 'No generative AI integration'], pricing: '$30,000/yr', vuln: 'Slow development velocity and complex setup' },
      { name: `Manual${secondWord} Tool`, share: '25%', strengths: ['Spreadsheet familiarity'], weaknesses: ['Prone to human error', 'Does not scale'], pricing: '$0-$50/mo', vuln: 'Cannot automate multi-step complex workflows' },
      { name: `GenericAI SaaS`, share: '15%', strengths: ['Modern AI interface'], weaknesses: ['Generic prompt wrapper without domain logic'], pricing: '$49/mo', vuln: 'Fails enterprise domain-specific edge cases' }
    ],
    tables: [
      { name: 'projects', desc: 'Core user workspaces and project configurations', cols: [{ name: 'id', type: 'UUID', isPrimary: true, desc: 'Project ID' }, { name: 'title', type: 'TEXT', desc: 'Title' }] },
      { name: 'workflow_executions', desc: 'Active autonomous pipeline execution records', cols: [{ name: 'id', type: 'UUID', isPrimary: true, desc: 'Execution ID' }, { name: 'status', type: 'TEXT', desc: 'Active/Completed' }] },
      { name: 'insights', desc: 'Synthesized domain recommendations and actions', cols: [{ name: 'id', type: 'UUID', isPrimary: true, desc: 'Insight ID' }, { name: 'confidence_score', type: 'FLOAT', desc: 'Confidence metric' }] }
    ],
    channels: ['Product launch communities', 'Domain-specific forums & communities', 'Targeted professional outreach campaigns'],
    taglineVerb: `Supercharge operations for ${prompt.slice(0, 45)}`
  };
}

export function generateMockDeliverables(ideaPrompt: string): {
  title: string;
  tagline: string;
  industry: string;
  targetAudience: string;
  deliverables: StartupDeliverables;
} {
  const archetype = detectDomain(ideaPrompt);
  
  const cleanWords = ideaPrompt.replace(/[^a-zA-Z0-9\s]/g, '').split(/\s+/).filter(w => w.length > 3);
  const primaryConcept = cleanWords[0] ? cleanWords[0].charAt(0).toUpperCase() + cleanWords[0].slice(1).toLowerCase() : 'Velo';
  const prefix = archetype.namePrefix[Math.floor(Math.random() * archetype.namePrefix.length)];
  const suffix = archetype.nameSuffix[Math.floor(Math.random() * archetype.nameSuffix.length)];
  const brandName = `${prefix}${suffix}`;

  return {
    title: brandName,
    tagline: `${archetype.taglineVerb} with ${brandName}`,
    industry: archetype.industry,
    targetAudience: archetype.audience,
    deliverables: {
      businessModel: {
        problem: archetype.problems,
        solution: archetype.solutions,
        valueProposition: archetype.valueProp,
        customerSegments: [
          archetype.audience,
          'High-growth venture-backed startups scaling team efficiency',
          'Enterprise departments modernizing manual workflows'
        ],
        channels: archetype.channels,
        revenueStreams: [
          'Tiered SaaS Subscription ($49/mo Starter, $199/mo Professional, $799/mo Scale)',
          'Usage-based workflow execution and token consumption fees',
          'Enterprise custom deployment retainers'
        ],
        costStructure: [
          'LLM API token consumption and fine-tuned model hosting',
          'PostgreSQL database instances and CloudFront CDN',
          'Customer success engineering and operations'
        ],
        keyMetrics: [
          'Monthly Recurring Revenue (MRR) & Net Revenue Retention (>120%)',
          'Time-to-Value (TTV) under 4 minutes post-onboarding',
          'Weekly Active Workflows executed autonomously'
        ],
        unfairAdvantage: `Proprietary ${primaryConcept.toLowerCase()} domain agents paired with custom domain models and real-time execution.`
      },
      competitorAnalysis: {
        competitors: archetype.competitors.map((c) => ({
          name: c.name,
          marketShare: c.share,
          strengths: c.strengths,
          weaknesses: c.weaknesses,
          pricingModel: c.pricing,
          vulnerability: c.vuln,
        })),
        userUnfairAdvantage: `High-throughput processing paired with custom ${primaryConcept.toLowerCase()} domain logic.`,
        marketGapSummary: `A high-growth opportunity exists for an intelligent automation platform built specifically for ${archetype.industry.toLowerCase()}.`
      },
      uiWireframe: {
        dashboardName: `${brandName} Command Center`,
        colorPalette: {
          primary: "Vibrant Crimson & Deep Teal (#EE3E4C → #268574)",
          secondary: "Aqua Mint (#4DC6AB)",
          background: "Clean Off-White (#F8F9FA)",
          accent: "Burnt Orange (#F25C38)"
        },
        layoutStructure: "Responsive analytical console with live workflow streams and contextual metric cards.",
        components: [
          {
            id: "comp-1",
            name: `${primaryConcept} Performance Metric Card`,
            type: "stat_card",
            title: "Autonomous Workflows Executed",
            description: "Live calculation of tasks completed this billing cycle",
            tailwindClasses: "bg-white border border-slate-200 p-5 rounded-xl shadow-sm"
          },
          {
            id: "comp-2",
            name: "Live Operational Activity Stream",
            type: "data_table",
            title: "Active Processing Pipeline",
            description: "Real-time log of tasks, latency, and system status",
            tailwindClasses: "bg-white border border-slate-200 p-6 rounded-xl shadow-sm"
          },
          {
            id: "comp-3",
            name: "Cost Savings & ROI Calculator",
            type: "chart_placeholder",
            title: "Efficiency Gains & Hours Saved",
            description: "Visual breakdown of engineering and operational savings",
            tailwindClasses: "bg-white border border-[#4DC6AB]/40 p-6 rounded-xl shadow-sm"
          }
        ],
        dashboardPreviewNotes: `Engineered specifically for ${archetype.audience} with rapid keyboard shortcuts and clean data density.`
      },
      techStack: {
        frontend: [
          { category: "Framework", tool: "Next.js 14 (App Router)", justification: "Server-side rendering and fast performance.", monthlyCostEst: "$0 (Vercel)" },
          { category: "Styling & UI", tool: "Tailwind CSS + Lucide Icons", justification: "Zero-runtime CSS overhead with customizable design tokens.", monthlyCostEst: "$0" },
          { category: "State Management", tool: "Zustand", justification: "Lightweight client state manager with zero boilerplate.", monthlyCostEst: "$0" }
        ],
        backend: [
          { category: "Runtime / API", tool: "Next.js Route Handlers", justification: "Unified fullstack TypeScript development.", monthlyCostEst: "$0" },
          { category: "Orchestration", tool: "LangChain / AI SDK", justification: "Multi-agent structured workflow and schema validation.", monthlyCostEst: "$0" }
        ],
        database: [
          { category: "Database & Auth", tool: "PostgreSQL Database", justification: "PostgreSQL engine with multi-tenant isolation and security policies.", monthlyCostEst: "$25/mo" },
          { category: "Vector Store", tool: "pgvector extension", justification: "Native vector similarity search directly inside PostgreSQL.", monthlyCostEst: "$0 (Included)" }
        ],
        infrastructure: [
          { category: "Hosting / CDN", tool: "Vercel / CloudFront", justification: "Global edge CDN with sub-50ms latency.", monthlyCostEst: "$20/mo" },
          { category: "Serverless Compute", tool: "AWS Lambda / ECS", justification: "Autoscaling background job processing.", monthlyCostEst: "$45/mo" }
        ],
        aiIntegration: [
          { category: "Primary LLM Provider", tool: "Google Gemini API", justification: "Structured JSON output guarantee with ultra-fast generation.", monthlyCostEst: "$60/mo" }
        ],
        scalabilityRating: "Enterprise Scalability (Cloud-native architecture)",
        architectureOverview: `Edge-routed Next.js App Router backed by PostgreSQL multi-tenant security and ${archetype.industry} processing pipelines.`,
        mermaidArchitecture: `graph TD
  Client[User Web Client] --> CDN[Global Edge CDN]
  CDN --> ALB[Application Load Balancer]
  ALB --> NextJS[Next.js 14 App Server]
  NextJS --> Database[(PostgreSQL Database)]
  NextJS --> Vector[(pgvector Semantic Index)]
  NextJS --> AI[Google Gemini Inference]
  NextJS --> S3[Asset Storage]`
      },
      databaseSchema: {
        tables: archetype.tables.map(t => ({
          tableName: t.name,
          description: t.desc,
          columns: t.cols.map(c => ({
            name: c.name,
            type: c.type,
            isPrimary: c.isPrimary,
            description: c.desc
          }))
        })),
        sqlDDL: `-- POSTGRESQL SCHEMA FOR ${brandName.toUpperCase()}
${archetype.tables.map(t => `CREATE TABLE public.${t.name} (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  startup_id UUID REFERENCES public.startups(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT now()
);
CREATE POLICY "Users can only access their own ${t.name}"
  ON public.${t.name} FOR ALL
  USING (auth.uid() IS NOT NULL);`).join('\n\n')}`,
        erDiagramDescription: `Relational architecture customized for ${archetype.industry}: Auth Users -> Startups -> Deliverables & ${archetype.tables.map(t => t.name).join(' -> ')}.`,
        mermaidERD: `erDiagram
  USERS ||--o{ STARTUPS : owns
  STARTUPS ||--|| DELIVERABLES : defines
  STARTUPS ||--o{ ${archetype.tables[0]?.name.toUpperCase() || 'ITEMS'} : manages
  ${archetype.tables[0]?.name.toUpperCase() || 'ITEMS'} ||--o{ ${archetype.tables[1]?.name.toUpperCase() || 'LOGS'} : generates`
      },
      costEstimation: {
        year1TotalEstimated: 14200,
        monthlyBurnRate: 980,
        financialDefaults: {
          defaultArpu: 89,
          defaultMarketingBudget: 3500,
          defaultChurnRate: 4.5
        },
        tiers: [
          { tierName: "Bootstrap MVP", monthlyCost: 180, annualCost: 2160, description: "Hobby Server + PostgreSQL Free/Pro Tier + AI inference." },
          { tierName: "Seed Growth Tier", monthlyCost: 980, annualCost: 11760, description: "Database Pro + Serverless Lambda workers + Priority support." },
          { tierName: "Scale Tier", monthlyCost: 4200, annualCost: 50400, description: "Autoscaling Cluster + Multi-region Database + Enterprise SLA." }
        ],
        breakdown: [
          { category: "Database & Storage", costMonthly: 25, provider: "PostgreSQL Pro", notes: "PostgreSQL with automated daily point-in-time backups" },
          { category: "AI LLM Token Inference", costMonthly: 240, provider: "Google Gemini API", notes: "Est. 15,000 requests per month" },
          { category: "Hosting & Global CDN", costMonthly: 40, provider: "Vercel Pro", notes: "Custom domains and edge caching" },
          { category: "Infrastructure & Queue Workers", costMonthly: 120, provider: "AWS Lambda / SQS", notes: "Asynchronous task queue processing" },
          { category: "Domain, SSL & Ops", costMonthly: 15, provider: "Cloudflare", notes: "DDoS protection and WAF rules" }
        ],
        costOptimizationTips: [
          "Use Redis caching for repeated query patterns (reduces token costs by ~35%).",
          "Implement fine-tuned smaller models for lightweight classification tasks.",
          "Utilize vector indexed queries to reduce search latency and server compute."
        ]
      },
      marketingPlan: {
        targetAudiencePersona: `${archetype.audience}. High sensitivity to efficiency and time savings.`,
        gtmStrategy: "Product-Led Growth (PLG) featuring an interactive sandbox, transparent ROI calculator, and targeted community advocacy.",
        day1LaunchTactics: [
          `Product launch highlighting "${brandName}: ${archetype.valueProp}".`,
          `Community technical post detailing architecture and security.`,
          `Targeted video demonstration showing 10-second automated workflow.`
        ],
        channels: archetype.channels.map((ch, idx) => ({
          channelName: ch,
          cacEstimate: `$${15 + idx * 12}`,
          expectedConversionRate: `${4.5 - idx * 0.6}%`,
          strategy: `Execute targeted campaigns and educational guides tailored to ${archetype.audience}.`
        })),
        viralHooks: [
          `Interactive "Benchmark Your ${primaryConcept} Efficiency" diagnostic tool that outputs shareable badges.`
        ]
      },
      pitchDeck: {
        elevationTagline: `${archetype.taglineVerb} with ${brandName}`,
        targetFundingAmount: "$1.5M Seed Round to scale engineering & market distribution",
        slides: [
          {
            slideNumber: 1,
            title: "Problem Statement",
            headline: `${archetype.industry} Suffers from Friction and Slow Workflows`,
            content: archetype.problems,
            visualRecommendation: "Split visual contrasting traditional manual process vs instantaneous AI workflow.",
            speakerNotes: "Founders and operators spend over 30% of their week on administrative friction instead of core growth."
          },
          {
            slideNumber: 2,
            title: "The Solution",
            headline: `${brandName}: The Autonomous Intelligence Layer`,
            content: archetype.solutions,
            visualRecommendation: `Interactive dashboard visual highlighting ${brandName}'s autonomous processing.`,
            speakerNotes: "Show how our agent architecture transforms complex multi-hour workflows into 15-second automations."
          },
          {
            slideNumber: 3,
            title: "Market Opportunity",
            headline: `Massive Market Tailwinds in ${archetype.industry}`,
            content: [
              `Rapid enterprise adoption of specialized vertical AI solutions`,
              `Over 100,000+ potential target teams in primary demographic`,
              `High willingness to pay for validated operational hours saved`
            ],
            visualRecommendation: "TAM / SAM / SOM market penetration breakdown graphic.",
            speakerNotes: "Highlight why generalized tools fail and why our vertical specialization creates a defensible wedge."
          },
          {
            slideNumber: 4,
            title: "Traction & Early Validation",
            headline: "Strong Pre-Launch Momentum & Waitlist Demand",
            content: [
              "2,500+ waitlist signups in first 14 days of prototype release",
              "94% of beta testers report saving 8+ hours per week",
              "Pilot agreements underway with 12 enterprise organizations"
            ],
            visualRecommendation: "Exponential waitlist growth curve chart.",
            speakerNotes: "Demonstrate organic pull and high customer retention metrics from beta users."
          }
        ]
      },
      landingPage: {
        heroHeadline: archetype.valueProp,
        heroSubheadline: `Empower your team with ${brandName} — the intelligent platform engineered to automate ${ideaPrompt.slice(0, 50)}.`,
        ctaText: "Get Priority Early Access",
        valueBadge: `⚡ Next-Gen ${archetype.industry}`,
        features: archetype.solutions.map((sol, i) => ({
          title: `Feature 0${i + 1}`,
          description: sol,
          iconName: i === 0 ? "Zap" : i === 1 ? "Layers" : "Shield"
        })),
        socialProofQuote: `"${brandName} transformed our entire workflow on Day 1. We saved over 15 hours in the very first week."`,
        waitlistHookText: "Join 2,500+ founders and leaders waiting for launch access."
      },
      devilsAdvocateCritique: {
        criticalFlaws: [
          `Heavy reliance on third-party AI inference margins compresses net unit economics.`,
          `Customer acquisition cost (CAC) risk if ad bidding competition increases in ${archetype.industry}.`,
          `Low initial switching costs until deep enterprise workflow integration is established.`
        ],
        toughInvestorQuestions: [
          `Why is ${brandName} an acute problem rather than a software vitamin for ${archetype.audience}?`,
          `How will you prevent incumbents like ${archetype.competitors[0]?.name || 'market leaders'} from cloning this feature in 6 months?`,
          `What is your customer retention strategy after initial onboarding excitement wears off?`
        ],
        recommendedPivots: [
          `Pivot to verticalized enterprise SaaS with dedicated data privacy controls.`,
          `Introduce an open API marketplace model to create ecosystem network effects.`,
          `Bundle automated compliance auditing to increase annual contract value (ACV).`
        ]
      }
    }
  };
}

export function generateMockSimulationResult(
  startupId: string,
  shockType: MarketShockType,
  customPrompt?: string
): SimulationResult {
  const shockTitleMap: Record<MarketShockType, string> = {
    free_clone: "A Tech Giant Releases a Free Clone of Your App",
    traffic_1m: "Traffic Spikes to 1,000,000 Active Users Overnight",
    cost_increase_40: "Supply Chain & Infrastructure Costs Increase by 40%",
    cac_double: "Customer Acquisition Cost (CAC) Doubles on Ad Channels",
    custom: customPrompt || "Custom Severe Market Disruption"
  };

  const shockPromptText = customPrompt || shockTitleMap[shockType];

  return {
    id: `sim-${Date.now()}`,
    startupId,
    shockType,
    shockPrompt: shockPromptText,
    impactSummary: `CRITICAL MARKET IMPACT ANALYSIS: The scenario "${shockPromptText}" creates immediate pressure on operating margins, user retention, and infrastructure capacity. To survive and thrive, the company must execute immediate structural adjustments.`,
    pivotedBusinessModel: {
      problem: [
        "Commoditization of basic features due to market shock",
        "Higher server compute costs and potential bandwidth bottlenecks",
        "Increased customer churn if pricing is not aligned with defensible value"
      ],
      solution: [
        "Pivot focus toward proprietary enterprise data workflows and custom integrations",
        "Deploy rate limiting, edge caching, and self-hosted open-source AI models",
        "Launch an exclusive Enterprise Tier with guaranteed SLAs and dedicated cloud instances"
      ],
      valueProposition: "Uncompromising enterprise-grade security, custom workflow automation, and zero data leakage.",
      customerSegments: [
        "Mid-Market & Enterprise Mid-level Executives (replaces general consumer segment)",
        "Security-conscious Financial & Healthcare institutions requiring compliance"
      ],
      channels: [
        "Direct Enterprise Account-Based Marketing (ABM)",
        "Strategic channel partnerships with Cloud ISV programs"
      ],
      revenueStreams: [
        "Enterprise Annual Contracts ($25,000 - $100,000/year)",
        "Dedicated Private Cloud & Managed Node deployment fees"
      ],
      costStructure: [
        "Self-hosted LLM GPU instance clusters",
        "Compliance auditing and enterprise support engineers"
      ],
      keyMetrics: [
        "Annual Contract Value (ACV) & Expansion MRR",
        "Gross Margin % Post-Infrastructure Optimization (> 75%)"
      ],
      unfairAdvantage: "Deep proprietary domain integrations and zero-trust security architecture."
    },
    pivotedTechStack: {
      frontend: [
        { category: "Frontend Engine", tool: "Next.js 14 + Cloudflare Edge Workers", justification: "Edge rendering to absorb massive traffic surges without backend latency.", monthlyCostEst: "$120/mo" }
      ],
      backend: [
        { category: "API Router", tool: "Go / Rust Microservices + Node.js Edge", justification: "Rewrite high-frequency API endpoints in Go to reduce memory footprint by 80%.", monthlyCostEst: "$250/mo" }
      ],
      database: [
        { category: "Database Cluster", tool: "Enterprise PostgreSQL + Read Replicas", justification: "Add 3 read replicas and connection pooling with PgBouncer.", monthlyCostEst: "$650/mo" },
        { category: "Caching Layer", tool: "Redis Cluster (Upstash / AWS ElastiCache)", justification: "Cache 90% of repeated read requests and rate limit excessive API traffic.", monthlyCostEst: "$180/mo" }
      ],
      infrastructure: [
        { category: "Cloud & DDoS", tool: "AWS ECS Auto-scaling + Cloudflare Enterprise", justification: "Absorb 1M+ active user traffic spikes with zero downtime.", monthlyCostEst: "$850/mo" }
      ],
      aiIntegration: [
        { category: "AI Inference Engine", tool: "Hybrid: Fine-tuned vLLM + Gemini Fallback", justification: "Reduces per-token LLM costs by 70% compared to standard cloud APIs.", monthlyCostEst: "$400/mo" }
      ],
      scalabilityRating: "Battle-Tested Scalability (Ready for 1M+ active request spikes)",
      architectureOverview: "High-throughput edge architecture with Redis caching, Go API microservices, PostgreSQL read replicas, and hybrid LLM inference."
    },
    pivotedCostBreakdown: {
      year1TotalEstimated: 29400,
      monthlyBurnRate: 2450,
      tiers: [
        { tierName: "Post-Shock Survival Mode", monthlyCost: 1450, annualCost: 17400, description: "Streamlined infrastructure with aggressive caching and open-source models." },
        { tierName: "Scale & Defense Tier", monthlyCost: 2450, annualCost: 29400, description: "Multi-region autoscaling + Enterprise security compliance." }
      ],
      breakdown: [
        { category: "Database & Read Replicas", costMonthly: 650, provider: "Enterprise PostgreSQL", notes: "Dedicated DB instance with 3 read replicas" },
        { category: "Redis Caching & Queue", costMonthly: 180, provider: "Upstash / AWS ElastiCache", notes: "90% cache hit ratio" },
        { category: "Compute & Auto-Scaling", costMonthly: 850, provider: "AWS ECS Fargate", notes: "Dynamic container scaling" },
        { category: "AI Token Inference (Hybrid)", costMonthly: 400, provider: "Self-hosted vLLM + Gemini", notes: "70% cost reduction vs standard API" },
        { category: "Cloudflare Enterprise Security", costMonthly: 370, provider: "Cloudflare", notes: "DDoS mitigation & WAF rules" }
      ],
      costOptimizationTips: [
        "Implement aggressive stale-while-revalidate caching headers at Cloudflare edge.",
        "Offload heavy data processing to background queue workers running on spot instances."
      ]
    },
    strategicPivots: [
      {
        pivotName: "The Enterprise Security & Compliance Shield",
        strategy: "Pivot from self-serve B2B SaaS to high-ticket Enterprise Contracts requiring compliance and private cloud deployment where clones cannot compete.",
        expectedOutcome: "Increases Average Contract Value (ACV) from $1k/yr to $35k/yr and eliminates consumer price sensitivity.",
        riskLevel: "Medium"
      },
      {
        pivotName: "Open-Source Infrastructure & Edge Hybrid Engine",
        strategy: "Migrate core inference from closed third-party APIs to a hybrid self-hosted fine-tuned LLM engine with aggressive Redis edge caching.",
        expectedOutcome: "Cuts per-request infrastructure cost by 72% while doubling response throughput.",
        riskLevel: "Low"
      },
      {
        pivotName: "Verticalized Industry Integration Moat",
        strategy: "Focus exclusively on a highly regulated vertical (e.g. Healthcare or FinTech) by building deep compliance workflows that generic competitors cannot easily replicate.",
        expectedOutcome: "Establishes a defensible moat and locks in customer retention.",
        riskLevel: "High"
      }
    ],
    createdAt: new Date().toISOString()
  };
}
