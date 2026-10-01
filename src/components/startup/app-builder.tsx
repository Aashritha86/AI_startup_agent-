'use client';

import React, { useState } from 'react';
import { StartupProject } from '@/types/startup';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Code2,
  Play,
  CheckCircle2,
  Terminal,
  Copy,
  Check,
  Download,
  Layers,
  Sparkles,
  Database,
  Globe,
  FileCode,
  Package,
  Key,
  FileText,
  Monitor,
  RefreshCw,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Zap,
  Server,
  Cpu
} from 'lucide-react';

interface AppBuilderProps {
  startup: StartupProject;
}

export const AppBuilderView: React.FC<AppBuilderProps> = ({ startup }) => {
  const [activeFile, setActiveFile] = useState<'app' | 'schema' | 'api' | 'package' | 'env' | 'readme'>('app');
  const [activeMode, setActiveMode] = useState<'code' | 'preview'>('preview');
  const [isBuilding, setIsBuilding] = useState(false);
  const [buildLogs, setBuildLogs] = useState<string[]>([]);
  const [isBuildComplete, setIsBuildComplete] = useState(true);
  const [copied, setCopied] = useState(false);
  const [mockDataRows, setMockDataRows] = useState<Array<{ id: number; title: string; status: string; date: string }>>([
    { id: 101, title: `${startup.title} Core Pipeline Task #1`, status: 'Active', date: 'Just now' },
    { id: 102, title: `Automated Workflow Execution`, status: 'Completed', date: '5 mins ago' },
    { id: 103, title: `Database Sync to Supabase Postgres`, status: 'Completed', date: '12 mins ago' },
  ]);
  const [newInputText, setNewInputText] = useState('');

  const d = startup.deliverables;
  const colorPrimary = d?.uiWireframe?.colorPalette?.primary || '#6366f1';
  const wireframeTitle = d?.uiWireframe?.dashboardName || `${startup.title} Control Center`;

  // Code Templates dynamically generated for this startup
  const codeFiles = {
    app: `'use client';

import React, { useState } from 'react';
import { Sparkles, Activity, Database, Zap, Plus, CheckCircle2 } from 'lucide-react';

// Main App Dashboard for ${startup.title}
export default function StartupAppDashboard() {
  const [items, setItems] = useState([
    { id: 1, name: 'Production Pipeline Job #1', status: 'Running' },
    { id: 2, name: 'Automated Insight Generator', status: 'Healthy' },
  ]);
  const [newItem, setNewItem] = useState('');

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItem.trim()) return;
    setItems([...items, { id: Date.now(), name: newItem, status: 'Active' }]);
    setNewItem('');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8 font-sans">
      {/* App Header */}
      <header className="flex items-center justify-between pb-6 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center font-bold text-white shadow-lg">
            ${startup.title.slice(0, 2).toUpperCase()}
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-white">${startup.title}</h1>
            <p className="text-xs text-slate-400">${startup.tagline}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
            ● Live API Connected
          </span>
        </div>
      </header>

      {/* Main Workspace Grid */}
      <main className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {/* Stat Cards */}
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
          <span className="text-xs text-slate-400 font-mono">Total Deliveries</span>
          <div className="text-3xl font-extrabold text-white">1,482</div>
          <span className="text-xs text-emerald-400 font-medium">+24.8% from last month</span>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
          <span className="text-xs text-slate-400 font-mono">System Latency</span>
          <div className="text-3xl font-extrabold text-indigo-400">18ms</div>
          <span className="text-xs text-slate-400 font-medium">PostgreSQL Supabase RLS</span>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
          <span className="text-xs text-slate-400 font-mono">Target Audience</span>
          <div className="text-lg font-bold text-white truncate">${startup.targetAudience}</div>
          <span className="text-xs text-purple-400 font-medium">${startup.industry}</span>
        </div>
      </main>

      {/* Data Management Section */}
      <section className="mt-8 p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-6">
        <h2 className="text-base font-bold text-white">Management Console</h2>
        <form onSubmit={handleAddItem} className="flex gap-3">
          <input
            type="text"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            placeholder="Add new record or workflow task..."
            className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
          />
          <button type="submit" className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm flex items-center gap-2">
            <Plus className="w-4 h-4" /> Add Record
          </button>
        </form>

        <div className="space-y-2">
          {items.map((item) => (
            <div key={item.id} className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 flex items-center justify-between">
              <span className="text-sm font-medium text-slate-200">{item.name}</span>
              <span className="text-xs px-2.5 py-1 rounded-lg bg-indigo-950 text-indigo-300 border border-indigo-800/50">
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}`,

    schema: `-- PostgreSQL DDL & Row Level Security (RLS) for ${startup.title}
-- Auto-generated by AI Startup Builder

-- 1. Create Core Project Table
CREATE TABLE IF NOT EXISTS public.${startup.title.toLowerCase().replace(/[^a-z0-9]/g, '_')}_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'pending', 'completed')),
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Enable Supabase Row Level Security
ALTER TABLE public.${startup.title.toLowerCase().replace(/[^a-z0-9]/g, '_')}_records ENABLE ROW LEVEL SECURITY;

-- 3. Row Level Security Policies
CREATE POLICY "Users can view their own ${startup.title} records"
  ON public.${startup.title.toLowerCase().replace(/[^a-z0-9]/g, '_')}_records
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own ${startup.title} records"
  ON public.${startup.title.toLowerCase().replace(/[^a-z0-9]/g, '_')}_records
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own ${startup.title} records"
  ON public.${startup.title.toLowerCase().replace(/[^a-z0-9]/g, '_')}_records
  FOR UPDATE
  USING (auth.uid() = user_id);

${d?.databaseSchema?.sqlDDL || ''}`,

    api: `import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

// Next.js API Route for ${startup.title}
export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: records, error } = await supabase
      .from('${startup.title.toLowerCase().replace(/[^a-z0-9]/g, '_')}_records')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    return NextResponse.json({
      success: true,
      startup: "${startup.title}",
      data: records || []
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const supabase = await createClient();

    const { data, error } = await supabase
      .from('${startup.title.toLowerCase().replace(/[^a-z0-9]/g, '_')}_records')
      .insert({
        title: body.title,
        status: body.status || 'active',
        metadata: body.metadata || {}
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ success: true, record: data });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}`,

    package: `{
  "name": "${startup.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}-app",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "^14.2.15",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "@supabase/supabase-js": "^2.45.0",
    "@supabase/ssr": "^0.5.0",
    "lucide-react": "^0.440.0",
    "tailwindcss": "^3.4.1",
    "clsx": "^2.1.0"
  }
}`,

    env: `# Environment Variables for ${startup.title}
NEXT_PUBLIC_SUPABASE_URL=https://your-supabase-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-key

# AI Engine Credentials
OPENAI_API_KEY=your-openai-api-key
GEMINI_API_KEY=your-gemini-api-key
`,

    readme: `# ${startup.title} - Production MVP Codebase

> ${startup.tagline}

This codebase was automatically generated by **AI Startup Builder** for **${startup.title}**.

## 🚀 Quick Start Guide

### 1. Install Dependencies
\`\`\`bash
npm install
\`\`\`

### 2. Configure Environment
Copy \`.env.example\` to \`.env.local\` and fill in your Supabase API credentials:
\`\`\`bash
cp .env.example .env.local
\`\`\`

### 3. Run Database Migrations
Copy the SQL schema from \`supabase/schema.sql\` into your Supabase SQL Editor and execute it to create your tables and Row Level Security (RLS) policies.

### 4. Launch Local Development Server
\`\`\`bash
npm run dev
\`\`\`
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
`
  };

  const handleStartBuild = () => {
    setIsBuilding(true);
    setIsBuildComplete(false);
    setBuildLogs([]);

    const steps = [
      `[00:01] Initializing build compiler for "${startup.title}"...`,
      `[00:02] Loading Tech Stack specs: Next.js 14, Supabase RLS, Tailwind CSS...`,
      `[00:03] Compiling SQL migrations for database tables & security policies...`,
      `[00:04] Generating Next.js App Router client components & API endpoints...`,
      `[00:05] Verifying TypeScript signatures and bundle size...`,
      `[00:06] SUCCESS: Build completed with 0 errors! MVP ready for live preview & deployment.`,
    ];

    steps.forEach((step, index) => {
      setTimeout(() => {
        setBuildLogs((prev) => [...prev, step]);
        if (index === steps.length - 1) {
          setIsBuilding(false);
          setIsBuildComplete(true);
        }
      }, (index + 1) * 400);
    });
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(codeFiles[activeFile]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAddMockRow = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newInputText.trim()) return;
    setMockDataRows((prev) => [
      { id: Date.now(), title: newInputText, status: 'Active', date: 'Just now' },
      ...prev,
    ]);
    setNewInputText('');
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="glass-panel p-6 rounded-3xl border border-indigo-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950/40">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2">
            <Badge variant="indigo" className="gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-cyan-400" />
              <span>Full-Stack Application Builder</span>
            </Badge>
            <span className="text-xs text-slate-400">Target Tech Stack: Next.js + PostgreSQL</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <span>Building Feature: Production MVP Code Compiler</span>
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Generate, preview, and build complete runnable full-stack application code for <strong>{startup.title}</strong> based on your UI wireframes, SQL schema, and tech stack architecture.
          </p>
        </div>

        {/* Build Action Button */}
        <div className="flex items-center gap-3">
          <Button
            size="lg"
            variant="glow"
            onClick={handleStartBuild}
            isLoading={isBuilding}
            className="gap-2 text-sm font-bold shadow-xl shadow-indigo-600/30 border border-white/10"
          >
            <Play className="w-4 h-4 text-emerald-400 fill-current" />
            <span>{isBuilding ? 'Compiling Codebase...' : 'Re-Build Application Code'}</span>
          </Button>
        </div>
      </div>

      {/* Featured Capabilities & Production Checklist Matrix */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
        <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
          <span className="text-[10px] font-mono font-semibold text-indigo-400 uppercase tracking-wider">Framework</span>
          <div className="text-xs font-bold text-white truncate">Next.js 14</div>
          <span className="text-[10px] text-emerald-400 flex items-center gap-1 font-medium">
            <CheckCircle2 className="w-3 h-3" /> App Router
          </span>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
          <span className="text-[10px] font-mono font-semibold text-emerald-400 uppercase tracking-wider">Security</span>
          <div className="text-xs font-bold text-white truncate">Supabase RLS</div>
          <span className="text-[10px] text-emerald-400 flex items-center gap-1 font-medium">
            <CheckCircle2 className="w-3 h-3" /> Auth Policies
          </span>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
          <span className="text-[10px] font-mono font-semibold text-cyan-400 uppercase tracking-wider">Styling</span>
          <div className="text-xs font-bold text-white truncate">Tailwind CSS</div>
          <span className="text-[10px] text-emerald-400 flex items-center gap-1 font-medium">
            <CheckCircle2 className="w-3 h-3" /> Design Tokens
          </span>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
          <span className="text-[10px] font-mono font-semibold text-purple-400 uppercase tracking-wider">Database</span>
          <div className="text-xs font-bold text-white truncate">PostgreSQL</div>
          <span className="text-[10px] text-emerald-400 flex items-center gap-1 font-medium">
            <CheckCircle2 className="w-3 h-3" /> DDL Migration
          </span>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
          <span className="text-[10px] font-mono font-semibold text-amber-400 uppercase tracking-wider">API Layer</span>
          <div className="text-xs font-bold text-white truncate">REST / JSON</div>
          <span className="text-[10px] text-emerald-400 flex items-center gap-1 font-medium">
            <CheckCircle2 className="w-3 h-3" /> CRUD Handlers
          </span>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
          <span className="text-[10px] font-mono font-semibold text-rose-400 uppercase tracking-wider">Target Host</span>
          <div className="text-xs font-bold text-white truncate">Vercel Cloud</div>
          <span className="text-[10px] text-emerald-400 flex items-center gap-1 font-medium">
            <CheckCircle2 className="w-3 h-3" /> 1-Click Deploy
          </span>
        </div>
      </div>

      {/* Build Status Terminal Console */}
      <div className="glass-panel p-4 rounded-2xl border border-slate-800 bg-slate-950 font-mono text-xs text-slate-300 space-y-2">
        <div className="flex items-center justify-between text-slate-400 pb-2 border-b border-slate-800/80">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-cyan-400" />
            <span className="font-bold text-white">Live Build Compiler Terminal</span>
          </div>
          <div className="flex items-center gap-2 text-[11px]">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Status: Ready</span>
          </div>
        </div>

        <div className="max-h-32 overflow-y-auto space-y-1 scrollbar-none py-1">
          {buildLogs.length === 0 ? (
            <div className="text-slate-500 italic">
              [System] Ready to compile {startup.title} application codebase. Click "Re-Build Application Code" above to trigger a fresh build.
            </div>
          ) : (
            buildLogs.map((log, idx) => (
              <div
                key={idx}
                className={`flex items-center gap-2 ${
                  log.includes('SUCCESS') ? 'text-emerald-400 font-bold' : log.includes('Compiling') ? 'text-cyan-300' : 'text-slate-300'
                }`}
              >
                <ChevronRight className="w-3 h-3 flex-shrink-0 text-slate-500" />
                <span>{log}</span>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Main View Mode Selector (Live Preview vs View Code) */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 glass-panel p-4 rounded-2xl border border-slate-800">
        <div className="flex items-center gap-2">
          <Badge variant="indigo">Deliverable #10</Badge>
          <span className="text-sm font-bold text-white">Application Code & Live Sandbox</span>
        </div>

        <div className="flex items-center gap-2 bg-slate-900 p-1 rounded-xl border border-slate-800">
          <button
            type="button"
            onClick={() => setActiveMode('preview')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
              activeMode === 'preview' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>Live App Sandbox</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveMode('code')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
              activeMode === 'code' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>Code Workbench</span>
          </button>
        </div>
      </div>

      {/* MODE 1: CODE WORKBENCH */}
      {activeMode === 'code' && (
        <div className="glass-panel rounded-3xl border border-slate-800 bg-slate-950 overflow-hidden shadow-2xl space-y-0">
          {/* File Tabs Navigation */}
          <div className="bg-slate-900/90 px-4 py-3 border-b border-slate-800 flex items-center justify-between overflow-x-auto">
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setActiveFile('app')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono flex items-center gap-1.5 transition-colors ${
                  activeFile === 'app' ? 'bg-indigo-600 text-white font-bold' : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <FileCode className="w-3.5 h-3.5 text-cyan-400" />
                <span>src/app/page.tsx</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveFile('schema')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono flex items-center gap-1.5 transition-colors ${
                  activeFile === 'schema' ? 'bg-indigo-600 text-white font-bold' : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Database className="w-3.5 h-3.5 text-emerald-400" />
                <span>supabase/schema.sql</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveFile('api')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono flex items-center gap-1.5 transition-colors ${
                  activeFile === 'api' ? 'bg-indigo-600 text-white font-bold' : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Server className="w-3.5 h-3.5 text-purple-400" />
                <span>src/app/api/v1/route.ts</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveFile('package')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono flex items-center gap-1.5 transition-colors ${
                  activeFile === 'package' ? 'bg-indigo-600 text-white font-bold' : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Package className="w-3.5 h-3.5 text-amber-400" />
                <span>package.json</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveFile('env')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono flex items-center gap-1.5 transition-colors ${
                  activeFile === 'env' ? 'bg-indigo-600 text-white font-bold' : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Key className="w-3.5 h-3.5 text-rose-400" />
                <span>.env.example</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveFile('readme')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono flex items-center gap-1.5 transition-colors ${
                  activeFile === 'readme' ? 'bg-indigo-600 text-white font-bold' : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <FileText className="w-3.5 h-3.5 text-slate-400" />
                <span>README.md</span>
              </button>
            </div>

            <Button size="sm" variant="outline" onClick={handleCopyCode} className="text-xs gap-1.5">
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-cyan-400" />}
              <span>{copied ? 'Copied File!' : 'Copy File Code'}</span>
            </Button>
          </div>

          {/* Code Viewer Display */}
          <pre className="p-6 text-xs font-mono text-indigo-300 bg-slate-950 overflow-x-auto leading-relaxed max-h-[550px] select-all scrollbar-none">
            {codeFiles[activeFile]}
          </pre>
        </div>
      )}

      {/* MODE 2: LIVE INTERACTIVE APP SANDBOX */}
      {activeMode === 'preview' && (
        <div className="glass-panel rounded-3xl border border-slate-800 bg-slate-950 overflow-hidden shadow-2xl">
          {/* Simulated Browser Bar */}
          <div className="bg-slate-900 px-4 py-2.5 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/80"></span>
              <span className="w-3 h-3 rounded-full bg-amber-500/80"></span>
              <span className="w-3 h-3 rounded-full bg-emerald-500/80"></span>
            </div>
            <div className="bg-slate-950 px-4 py-1 rounded-lg border border-slate-800 text-[11px] font-mono text-slate-400 flex items-center gap-2">
              <span className="text-emerald-400">https://</span>
              <span>app.{startup.title.toLowerCase().replace(/\s+/g, '')}.com</span>
            </div>
            <Badge variant="emerald" className="text-[10px]">Compiled MVP Sandbox</Badge>
          </div>

          {/* Live Rendered Interactive Application UI */}
          <div className="p-6 sm:p-8 space-y-8 bg-slate-950 text-slate-100 min-h-[500px]">
            {/* App Top Nav */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-500 flex items-center justify-center text-white font-extrabold shadow-lg shadow-indigo-500/20">
                  {startup.title.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-white">{startup.title}</h3>
                  <p className="text-xs text-slate-400">{wireframeTitle}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold">
                  Industry: {startup.industry || 'SaaS'}
                </span>
                <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                  PostgreSQL RLS Active
                </span>
              </div>
            </div>

            {/* Core Metrics Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
                <span className="text-xs text-slate-400 font-mono">Active User Sessions</span>
                <div className="text-2xl font-extrabold text-white">2,840</div>
                <div className="text-[11px] text-emerald-400 font-medium">99.9% Uptime on Vercel</div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
                <span className="text-xs text-slate-400 font-mono">API Response Speed</span>
                <div className="text-2xl font-extrabold text-cyan-400">14ms</div>
                <div className="text-[11px] text-slate-400 font-medium">Edge Lambda Executions</div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
                <span className="text-xs text-slate-400 font-mono">Monthly Burn Rate</span>
                <div className="text-2xl font-extrabold text-purple-400">
                  ${d?.costEstimation?.monthlyBurnRate || 980}/mo
                </div>
                <div className="text-[11px] text-slate-400 font-medium">Estimated Year 1 Infrastructure</div>
              </div>
            </div>

            {/* Interactive Functional Data Management Widget */}
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <Database className="w-4 h-4 text-indigo-400" />
                    <span>Live Database Operations Sandbox</span>
                  </h4>
                  <p className="text-xs text-slate-400">
                    Test submitting records to the compiled PostgreSQL schema.
                  </p>
                </div>
                <span className="text-xs font-mono text-slate-500">Table: {startup.title.toLowerCase().replace(/[^a-z0-9]/g, '_')}_records</span>
              </div>

              {/* Form Input */}
              <form onSubmit={handleAddMockRow} className="flex gap-2">
                <input
                  type="text"
                  value={newInputText}
                  onChange={(e) => setNewInputText(e.target.value)}
                  placeholder={`Add a new ${startup.title} task or record...`}
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
                <Button type="submit" variant="glow" size="sm" className="text-xs whitespace-nowrap">
                  <span>Create Record</span>
                </Button>
              </form>

              {/* Records List */}
              <div className="space-y-2">
                {mockDataRows.map((row) => (
                  <div key={row.id} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      <span className="font-medium text-slate-200">{row.title}</span>
                    </div>
                    <div className="flex items-center gap-3 font-mono text-[11px]">
                      <span className="text-slate-500">{row.date}</span>
                      <span className="px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800/50">
                        {row.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
