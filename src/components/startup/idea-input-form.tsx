'use client';

import React, { useState, useEffect } from 'react';
import { useStartupStore } from '@/store/use-startup-store';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Sparkles,
  Rocket,
  Zap,
  ArrowRight,
  Lightbulb,
  Cpu,
  Database,
  Network,
  FileText,
  Globe,
  Star,
  Terminal,
  ChevronRight,
  DollarSign,
  Layers,
  MapPin
} from 'lucide-react';

const PRESET_IDEAS = [
  "AI Legal Co-pilot for commercial real estate contracts and lease negotiation.",
  "Autonomous DevOps agent for Supabase PostgreSQL database optimization and RLS security auditing.",
  "B2B SaaS subscription platform for automated carbon footprint tracking and supply chain compliance.",
  "AI-powered medical triage assistant for remote telehealth clinics."
];

export const IdeaInputForm: React.FC = () => {
  const [description, setDescription] = useState('');
  const [targetMarket, setTargetMarket] = useState('Global (North America & EU)');
  const [category, setCategory] = useState('B2B SaaS');
  const [budget, setBudget] = useState('$10,000 - $50,000');
  const [loadingTerminalLogs, setLoadingTerminalLogs] = useState<string[]>([]);

  const { generateStartup, isGenerating, error, history, setStartup, deleteStartupFromHistory } = useStartupStore();

  useEffect(() => {
    if (!isGenerating) {
      setLoadingTerminalLogs([]);
      return;
    }

    const steps = [
      `[00:01] Dispatching Business Model Agent... Synthesizing 9 Lean Canvas Blocks...`,
      `[00:03] Running Competitor Analysis & SWOT Matrix against market data...`,
      `[00:05] Synthesizing Tech Stack: Next.js 14, Supabase PostgreSQL, Tailwind CSS...`,
      `[00:07] Generating Database Schema & Supabase Row Level Security (RLS) policies...`,
      `[00:09] Compiling Full-Stack MVP Application Codebase (page.tsx, route.ts, schema.sql)...`,
      `[00:11] Structuring Investor Pitch Deck slides & VC Devil's Advocate critique...`,
      `[00:13] Finalizing Executive Blueprint & PDF Bundle...`,
    ];

    steps.forEach((step, idx) => {
      setTimeout(() => {
        setLoadingTerminalLogs((prev) => [...prev, step]);
      }, (idx + 1) * 700);
    });
  }, [isGenerating]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;
    await generateStartup(description, { targetMarket, category, budget });
  };

  const handleSelectPreset = (preset: string) => {
    setDescription(preset);
  };

  return (
    <div className="w-full max-w-5xl mx-auto py-10 px-4 space-y-10">
      {/* Hero Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E6F7F2] dark:bg-emerald-950/60 border border-[#10B981]/30 text-[#059669] dark:text-[#34D399] text-xs font-bold shadow-sm">
          <Sparkles className="w-4 h-4 text-[#10B981]" />
          <span>Generative AI Business & Technical Co-Founder Engine</span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[#0F172A] dark:text-white leading-tight">
          Transform a Simple Idea into a <br className="hidden sm:inline" />
          <span className="text-[#10B981]">
            Production-Ready Startup
          </span>
        </h1>

        <p className="text-[#334155] dark:text-slate-200 text-base sm:text-lg mx-auto font-medium leading-relaxed">
          Input your vision below. In 60 seconds, our AI engine orchestrates your <strong>Lean Canvas, Competitor Matrix, Tech Stack, SQL RLS Schemas, Full-Stack Codebase, Landing Sandbox, Year 1 Costs, Pitch Deck, and VC Devil's Advocate Critique</strong>.
        </p>
      </div>

      {/* Input Card */}
      <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-lg relative overflow-hidden space-y-6">
        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
          {/* Main Idea Description */}
          <div>
            <label className="block text-sm font-bold text-[#0F172A] dark:text-slate-200 mb-2 flex items-center justify-between">
              <span>Describe your startup idea in 1-3 sentences:</span>
              <span className="text-xs text-[#475569] dark:text-slate-400 font-medium">Min 5 characters</span>
            </label>

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g. An AI legal co-pilot for commercial real estate firms that automatically reviews lease agreements, flags high-risk indemnification clauses, and drafts negotiation counter-offers..."
              rows={4}
              className="w-full bg-[#F8F9FA] dark:bg-slate-950 border border-slate-300 dark:border-slate-700 focus:border-[#10B981] focus:ring-2 focus:ring-[#10B981]/20 rounded-2xl p-4 text-[#0F172A] dark:text-white placeholder-slate-500 text-sm sm:text-base leading-relaxed transition-all resize-none shadow-sm"
              required
            />
          </div>

          {/* Additional Blueprint Parameters */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div>
              <label className="block text-xs font-bold text-[#0F172A] dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#10B981]" />
                <span>Target Market / Region</span>
              </label>
              <select
                value={targetMarket}
                onChange={(e) => setTargetMarket(e.target.value)}
                className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2.5 text-xs text-[#0F172A] dark:text-white focus:outline-none focus:border-[#10B981]"
              >
                <option value="Global (North America & EU)">Global (North America & EU)</option>
                <option value="United States & Canada">United States & Canada</option>
                <option value="Asia-Pacific (APAC)">Asia-Pacific (APAC)</option>
                <option value="Latin America (LATAM)">Latin America (LATAM)</option>
                <option value="India & South Asia">India & South Asia</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#0F172A] dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-[#10B981]" />
                <span>Business Model Category</span>
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2.5 text-xs text-[#0F172A] dark:text-white focus:outline-none focus:border-[#10B981]"
              >
                <option value="B2B SaaS">B2B Enterprise SaaS</option>
                <option value="Two-Sided Marketplace">Two-Sided Marketplace</option>
                <option value="B2C Mobile App">B2C Subscription Mobile App</option>
                <option value="Developer Infrastructure">Developer Infra & API</option>
                <option value="AI FinTech & Compliance">AI FinTech & Compliance</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#0F172A] dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
                <DollarSign className="w-3.5 h-3.5 text-[#10B981]" />
                <span>Target Initial Budget</span>
              </label>
              <select
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2.5 text-xs text-[#0F172A] dark:text-white focus:outline-none focus:border-[#10B981]"
              >
                <option value="$5,000 - $15,000">$5,000 - $15,000 (Bootstrap MVP)</option>
                <option value="$10,000 - $50,000">$10,000 - $50,000 (Seed Launch)</option>
                <option value="$50,000 - $150,000">$50,000 - $150,000 (Scale Operations)</option>
                <option value="$250,000+">$250,000+ (Institutional Pre-Seed)</option>
              </select>
            </div>
          </div>

          {/* Multi-Agent Live Terminal Feedback during generation */}
          {isGenerating && (
            <div className="bg-[#0F172A] p-4 rounded-2xl border border-[#10B981]/40 font-mono text-xs text-slate-200 space-y-2 animate-fadeIn">
              <div className="flex items-center justify-between text-[#10B981] pb-2 border-b border-slate-700">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-[#10B981]" />
                  <span className="font-bold text-white">Multi-Agent AI Dispatcher Terminal</span>
                </div>
                <span className="text-[10px] text-[#34D399] animate-pulse font-semibold">Orchestrating...</span>
              </div>
              <div className="space-y-1.5 max-h-36 overflow-y-auto scrollbar-none py-1">
                {loadingTerminalLogs.map((log, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-[#34D399]">
                    <ChevronRight className="w-3 h-3 text-[#10B981] flex-shrink-0" />
                    <span>{log}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {error && (
            <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm flex items-center gap-2 font-semibold">
              <Zap className="w-4 h-4 flex-shrink-0 text-[#10B981]" />
              <span>{error}</span>
            </div>
          )}

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <div className="text-xs text-[#334155] dark:text-slate-300 flex items-center gap-2 font-medium">
              <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-ping"></span>
              Ready to generate 9 core module deliverables
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              isLoading={isGenerating}
              disabled={!description.trim() || description.trim().length < 5}
              className="w-full sm:w-auto shadow-lg bg-[#10B981] hover:bg-[#059669] text-white"
            >
              <Rocket className="w-5 h-5 text-white" />
              <span>Generate Multi-Module Blueprint</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </form>

        {/* Preset Starters */}
        <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2 text-xs font-bold text-[#0F172A] dark:text-slate-300 mb-3">
            <Lightbulb className="w-3.5 h-3.5 text-[#10B981]" />
            <span>Or test with a sample prompt:</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {PRESET_IDEAS.map((preset, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelectPreset(preset)}
                className="text-left p-3.5 rounded-xl bg-[#F8F9FA] dark:bg-slate-800/80 hover:bg-[#E6F7F2] dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-[#10B981] text-xs text-[#334155] dark:text-slate-200 hover:text-[#0F172A] transition-all line-clamp-2 font-medium cursor-pointer shadow-xs"
              >
                "{preset}"
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Dashboard Saved Startups Section */}
      {history.length > 0 && (
        <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-lg space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E6F7F2] dark:bg-emerald-950/60 border border-[#10B981]/30 text-[#059669] dark:text-[#34D399] text-xs font-bold">
                <Rocket className="w-3.5 h-3.5 text-[#10B981]" />
                <span>Main Dashboard Projects</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#0F172A] dark:text-white">
                Saved Startup Blueprints ({history.length})
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Click any startup to open directly into its full 9-step module blueprint.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {history.map((startup) => (
              <div
                key={startup.id}
                className="p-5 rounded-2xl bg-[#F8F9FA] dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 hover:border-[#10B981] transition-all space-y-3 flex flex-col justify-between group shadow-sm"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#E6F7F2] dark:bg-emerald-950/60 text-[#059669] dark:text-[#34D399] border border-[#10B981]/30">
                      {startup.industry || startup.category || 'Startup'}
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteStartupFromHistory(startup.id);
                      }}
                      className="text-xs text-slate-400 hover:text-rose-500 transition-colors px-2 py-0.5"
                      title="Remove from history"
                    >
                      Delete
                    </button>
                  </div>
                  <h3 className="text-lg font-bold text-[#0F172A] dark:text-white group-hover:text-[#10B981] transition-colors">
                    {startup.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 italic line-clamp-2">
                    "{startup.tagline}"
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 font-mono">
                    9 Deliverable Modules
                  </span>
                  <Button
                    size="sm"
                    variant="primary"
                    onClick={() => setStartup(startup)}
                    className="gap-1.5 text-xs bg-[#10B981] hover:bg-[#059669] text-white shadow-sm"
                  >
                    <span>Open 9 Steps</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Feature Highlights Grid Section */}
      <div className="space-y-6">
        <div className="text-center space-y-1">
          <Badge variant="emerald" className="gap-1.5">
            <Star className="w-3 h-3 text-[#10B981] fill-current" />
            <span>Highlighted Engine Capabilities</span>
          </Badge>
          <h2 className="text-xl font-extrabold text-[#0F172A] dark:text-white">What You Get With Every Startup Blueprint</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2.5 hover:border-[#10B981] transition-all shadow-sm">
            <div className="w-9 h-9 rounded-xl bg-[#E6F7F2] flex items-center justify-center text-[#10B981]">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-extrabold text-[#0F172A] dark:text-white">Full-Stack Code Builder</h3>
            <p className="text-xs text-[#334155] dark:text-slate-300 leading-relaxed font-medium">
              Compiles real Next.js App Router components, API routes, SQL schemas, and package manifests.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2.5 hover:border-[#10B981] transition-all shadow-sm">
            <div className="w-9 h-9 rounded-xl bg-[#E6F7F2] flex items-center justify-center text-[#059669]">
              <Database className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-extrabold text-[#0F172A] dark:text-white">PostgreSQL & Supabase RLS</h3>
            <p className="text-xs text-[#334155] dark:text-slate-300 leading-relaxed font-medium">
              Auto-writes relational database tables with strict Row-Level Security policies for auth users.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2.5 hover:border-[#10B981] transition-all shadow-sm">
            <div className="w-9 h-9 rounded-xl bg-[#E6F7F2] flex items-center justify-center text-[#10B981]">
              <Network className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-extrabold text-[#0F172A] dark:text-white">Visual System Diagrams</h3>
            <p className="text-xs text-[#334155] dark:text-slate-300 leading-relaxed font-medium">
              Renders interactive Mermaid ERD entity-relationship models and full cloud architecture flows.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2.5 hover:border-[#10B981] transition-all shadow-sm">
            <div className="w-9 h-9 rounded-xl bg-[#E6F7F2] flex items-center justify-center text-[#059669]">
              <FileText className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-extrabold text-[#0F172A] dark:text-white">4-Page Investor PDF Export</h3>
            <p className="text-xs text-[#334155] dark:text-slate-300 leading-relaxed font-medium">
              Exports publication-grade executive PDF reports formatted with tables, slide decks, and cost breakdowns.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2.5 hover:border-[#10B981] transition-all shadow-sm">
            <div className="w-9 h-9 rounded-xl bg-[#E6F7F2] flex items-center justify-center text-[#10B981]">
              <Globe className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-extrabold text-[#0F172A] dark:text-white">Responsive Landing Sandbox</h3>
            <p className="text-xs text-[#334155] dark:text-slate-300 leading-relaxed font-medium">
              Live single-page landing preview with desktop/mobile viewports and lead capture waitlist.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2.5 hover:border-[#10B981] transition-all shadow-sm">
            <div className="w-9 h-9 rounded-xl bg-[#E6F7F2] flex items-center justify-center text-[#059669]">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-extrabold text-[#0F172A] dark:text-white">Tiered Cost & Burn Engine</h3>
            <p className="text-xs text-[#334155] dark:text-slate-300 leading-relaxed font-medium">
              Calculates Year 1 operating expenses, cloud server costs, and scaling tiers tailored to your product.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
