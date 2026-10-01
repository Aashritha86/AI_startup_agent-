'use client';

import React, { useState, useEffect } from 'react';
import { useStartupStore } from '@/store/use-startup-store';
import { Button } from '@/components/ui/button';
import {
  Sparkles,
  Rocket,
  RefreshCw,
  Cpu,
  Database,
  FileText,
  Globe,
  Layers,
  Star,
  CheckCircle2,
  X,
  Network,
  Sun,
  Moon
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { currentStartup, loadDemoStartup, clearCurrentStartup, theme, toggleTheme } = useStartupStore();
  const [showFeatureModal, setShowFeatureModal] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof document !== 'undefined') {
      document.documentElement.classList.toggle('dark', theme === 'dark');
    }
  }, [theme]);

  const highlightedFeatures = [
    {
      icon: Cpu,
      title: 'Full-Stack Code Builder',
      badge: 'Building Feature',
      color: 'from-[#10B981] to-[#059669]',
      description: 'Generates runnable Next.js App Router code, API handlers, SQL DDL migrations, and package manifest for your startup.',
    },
    {
      icon: Database,
      title: 'PostgreSQL Schema & RLS',
      badge: 'Enterprise Security',
      color: 'from-[#0D9488] to-[#059669]',
      description: 'Automatically creates relational SQL tables with Supabase Row-Level Security (RLS) policies for multi-tenant isolation.',
    },
    {
      icon: Network,
      title: 'Interactive System Diagrams',
      badge: 'Architecture',
      color: 'from-[#10B981] to-[#0D9488]',
      description: 'Generates visual Mermaid ERD database diagrams and end-to-end full-stack cloud data flow architecture diagrams.',
    },
    {
      icon: Globe,
      title: 'Responsive Landing Sandbox',
      badge: 'Growth & Leads',
      color: 'from-[#059669] to-[#0D9488]',
      description: 'Includes a live desktop/mobile preview sandbox with working email waitlist capture and local lead storage.',
    },
    {
      icon: FileText,
      title: 'Executive PDF Exporter',
      badge: 'Investor Ready',
      color: 'from-[#10B981] to-[#059669]',
      description: 'Generates a publication-grade 4-page PDF blueprint report complete with executive KPI metrics and slide decks.',
    },
    {
      icon: Layers,
      title: 'Tiered Cost Engine',
      badge: 'Finance Model',
      color: 'from-[#0D9488] to-[#10B981]',
      description: 'Estimates Year 1 operating expenses, cloud burn rate, and infrastructure scaling tiers tailored to your tech stack.',
    },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 glass-panel px-6 py-3.5 shadow-sm transition-colors duration-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Brand logo */}
          <div
            onClick={clearCurrentStartup}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-[#10B981] hover:bg-[#059669] flex items-center justify-center shadow-lg shadow-[#10B981]/25 group-hover:scale-105 transition-transform duration-200">
              <Rocket className="w-5 h-5 text-white transform -rotate-12" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg text-[#0F172A] dark:text-white tracking-tight">AI STARTUP BUILDER</span>
                <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-[#E6F7F2] dark:bg-emerald-950/60 text-[#059669] dark:text-[#34D399] border border-[#10B981]/30">
                  PRO ENGINE
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 font-medium hidden sm:block">
                Orchestrating 10 Core Startup Deliverables & Code Compilation
              </p>
            </div>
          </div>

          {/* Action Buttons & Theme Toggle */}
          <div className="flex items-center gap-3">
            {/* Theme Mode Toggle Button */}
            {mounted && (
              <button
                type="button"
                onClick={toggleTheme}
                title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                className="p-2 rounded-xl bg-[#E6F7F2] dark:bg-emerald-950/60 border border-[#10B981]/30 text-[#059669] dark:text-[#34D399] hover:border-[#10B981] transition-all shadow-sm cursor-pointer flex items-center gap-1.5 text-xs font-bold"
              >
                {theme === 'dark' ? (
                  <>
                    <Sun className="w-4 h-4 text-amber-400 fill-amber-400/20" />
                    <span className="hidden sm:inline">Light</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-4 h-4 text-[#10B981]" />
                    <span className="hidden sm:inline">Dark</span>
                  </>
                )}
              </button>
            )}

            <button
              type="button"
              onClick={() => setShowFeatureModal(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#E6F7F2] dark:bg-emerald-950/60 hover:bg-[#10B981]/15 border border-[#10B981]/30 text-xs font-bold text-[#059669] dark:text-[#34D399] transition-all shadow-sm cursor-pointer"
            >
              <Star className="w-3.5 h-3.5 text-[#10B981] fill-current animate-spin-slow" />
              <span>Feature Highlights</span>
            </button>

            {!currentStartup ? (
              <Button
                variant="primary"
                size="sm"
                onClick={loadDemoStartup}
                className="gap-2 bg-[#10B981] hover:bg-[#059669] text-white shadow-md"
              >
                <Sparkles className="w-4 h-4 text-white" />
                Load Interactive Demo
              </Button>
            ) : (
              <div className="flex items-center gap-3">
                <span className="text-xs text-slate-600 dark:text-slate-300 font-mono hidden md:inline">
                  Active Project: <strong className="text-[#10B981]">{currentStartup.title}</strong>
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearCurrentStartup}
                  className="text-xs gap-1.5 text-[#059669] dark:text-[#34D399]"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-[#10B981]" />
                  New Idea
                </Button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Feature Highlights Modal */}
      {showFeatureModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="glass-panel w-full max-w-4xl p-6 sm:p-8 rounded-3xl border border-[#10B981]/30 shadow-2xl space-y-6 relative max-h-[90vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => setShowFeatureModal(false)}
              className="absolute top-6 right-6 p-2 rounded-xl bg-[#E6F7F2] dark:bg-emerald-950/60 text-slate-600 dark:text-slate-300 hover:text-[#0F172A] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E6F7F2] dark:bg-emerald-950/60 border border-[#10B981]/30 text-[#059669] dark:text-[#34D399] text-xs font-bold">
                <Star className="w-3.5 h-3.5 fill-current text-[#10B981]" />
                <span>Platform Core Capabilities</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] dark:text-white">
                Platform Feature Highlights
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                Explore the automated tools built into the AI Startup Builder engine.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {highlightedFeatures.map((feat, idx) => {
                const IconComp = feat.icon;
                return (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl glass-card space-y-3 hover:border-[#10B981] transition-all group shadow-sm"
                  >
                    <div className="flex items-center justify-between">
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${feat.color} flex items-center justify-center text-white shadow-md`}>
                        <IconComp className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-[#E6F7F2] dark:bg-emerald-950/60 text-[#059669] dark:text-[#34D399] border border-[#10B981]/30">
                        {feat.badge}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-[#0F172A] dark:text-white group-hover:text-[#10B981] transition-colors">
                      {feat.title}
                    </h3>

                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      {feat.description}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="pt-4 border-t border-[#10B981]/20 flex items-center justify-between text-xs text-slate-600 dark:text-slate-300">
              <span className="flex items-center gap-1.5 text-[#059669] dark:text-[#34D399] font-bold">
                <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                All 6 Highlighted Features Active & Production-Ready
              </span>
              <Button size="sm" variant="primary" onClick={() => setShowFeatureModal(false)} className="bg-[#10B981] hover:bg-[#059669] text-white">
                Close Showcase
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
