'use client';

import React, { useState } from 'react';
import { useStartupStore } from '@/store/use-startup-store';
import { BusinessModelView } from './business-model';
import { CompetitorMatrixView } from './competitor-matrix';
import { TechStackView } from './tech-stack';
import { DatabaseSchemaView } from './database-schema';
import { CostEstimationView } from './cost-estimation';
import { PitchDeckView } from './pitch-deck';
import { AppBuilderView } from './app-builder';
import { DevilsAdvocateView } from './devils-advocate';
import { Button } from '@/components/ui/button';
import { generateStartupPdf } from '@/lib/pdf-export';
import { LandingPageSandbox } from '@/components/LandingPageSandbox';
import { VisualDiagrams } from '@/components/VisualDiagrams';

import {
  FileText,
  Crosshair,
  Layers,
  Database,
  DollarSign,
  Presentation,
  Globe,
  Download,
  FileDown,
  Cpu,
  Flame,
  ChevronLeft,
  ChevronRight,
  Home
} from 'lucide-react';

export const DashboardTabsView: React.FC = () => {
  const { currentStartup, activeTab, setActiveTab, clearCurrentStartup } = useStartupStore();
  const [isExportingPdf, setIsExportingPdf] = useState(false);

  if (!currentStartup || !currentStartup.deliverables) return null;

  const d = currentStartup.deliverables;

  const navItems = [
    { id: 'business-model', label: '1. Lean Canvas', icon: FileText },
    { id: 'competitor-matrix', label: '2. Competitors & SWOT', icon: Crosshair },
    { id: 'tech-stack', label: '3. Tech Stack & Arch', icon: Layers },
    { id: 'database-schema', label: '4. Database & ERD', icon: Database },
    { id: 'app-builder', label: '5. App Builder & Code', icon: Cpu, highlight: true },
    { id: 'landing-page', label: '6. Landing Sandbox', icon: Globe },
    { id: 'cost-estimation', label: '7. Financials & Costs', icon: DollarSign },
    { id: 'pitch-deck', label: '8. Investor Pitch Deck', icon: Presentation },
    { id: 'devils-advocate', label: "9. VC Devil's Advocate", icon: Flame, highlight: true },
  ];

  const currentStepIndex = navItems.findIndex((item) => item.id === activeTab);
  const activeStepNum = currentStepIndex >= 0 ? currentStepIndex + 1 : 1;
  const prevStep = currentStepIndex > 0 ? navItems[currentStepIndex - 1] : null;
  const nextStep = currentStepIndex < navItems.length - 1 ? navItems[currentStepIndex + 1] : null;

  const handleExport = async (format: 'json' | 'markdown') => {
    try {
      const response = await fetch('/api/export', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ startup: currentStartup, format }),
      });

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${currentStartup.title.toLowerCase().replace(/\s+/g, '-')}-blueprint.${format === 'markdown' ? 'md' : 'json'}`;
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (err) {
      console.error('Export failed:', err);
    }
  };

  const handleExportPdf = async () => {
    if (!currentStartup) return;
    try {
      setIsExportingPdf(true);
      await generateStartupPdf(currentStartup);
    } catch (err) {
      console.error('Failed to generate PDF:', err);
    } finally {
      setIsExportingPdf(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 space-y-8">
      {/* Header Info Banner */}
      <div className="bg-white dark:bg-emerald-950/40 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-emerald-800/40 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="space-y-2 max-w-2xl">
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={clearCurrentStartup}
              className="text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-[#10B981] bg-slate-100 dark:bg-slate-800/80 px-3 py-1 rounded-full border border-slate-200 dark:border-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Home className="w-3.5 h-3.5 text-[#10B981]" />
              <span>Main Dashboard</span>
            </button>
            <span className="text-xs font-bold text-[#059669] dark:text-[#34D399] bg-[#E6F7F2] dark:bg-emerald-950/60 px-3 py-1 rounded-full border border-[#10B981]/30">
              {currentStartup.industry || currentStartup.category || 'Technology SaaS'}
            </span>
            <span className="text-xs text-slate-600 dark:text-slate-300 font-medium">Target: {currentStartup.targetMarket || currentStartup.targetAudience}</span>
            <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-100/70 dark:bg-emerald-900/40 px-2.5 py-0.5 rounded-full">
              Step {activeStepNum} of 9
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] dark:text-white tracking-tight">
            {currentStartup.title}
          </h1>

          <p className="text-sm text-slate-600 dark:text-slate-300 italic font-medium">
            "{currentStartup.tagline}"
          </p>
        </div>

        {/* Download / Export Options & Main Dashboard Return */}
        <div className="flex flex-wrap items-center gap-2.5">
          <Button
            size="sm"
            variant="outline"
            onClick={clearCurrentStartup}
            className="text-xs font-bold gap-1.5 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <Home className="w-3.5 h-3.5 text-[#10B981]" />
            Main Dashboard
          </Button>

          <Button
            size="md"
            variant="primary"
            onClick={handleExportPdf}
            isLoading={isExportingPdf}
            className="text-xs font-bold gap-2 px-5 py-2.5 bg-[#10B981] hover:bg-[#059669] text-white shadow-lg shadow-[#10B981]/25 hover:scale-[1.02] transition-transform border-none"
          >
            <FileDown className="w-4 h-4 text-white animate-bounce" />
            <span>Download Blueprint (PDF)</span>
          </Button>

          <Button size="sm" variant="outline" onClick={() => handleExport('markdown')} className="text-xs gap-1.5 border-emerald-600/30 text-[#059669] dark:text-[#34D399] hover:bg-[#E6F7F2]">
            <Download className="w-3.5 h-3.5 text-[#10B981]" />
            Markdown
          </Button>
          <Button size="sm" variant="outline" onClick={() => handleExport('json')} className="text-xs gap-1.5 border-emerald-600/30 text-[#059669] dark:text-[#34D399] hover:bg-[#E6F7F2]">
            <Download className="w-3.5 h-3.5 text-[#10B981]" />
            JSON
          </Button>
        </div>
      </div>

      {/* Responsive Horizontal Multi-Tab Navigation for all 9 steps */}
      <div className="bg-white dark:bg-emerald-950/40 p-2 rounded-2xl border border-slate-200 dark:border-emerald-800/40 shadow-sm flex items-center gap-1.5 overflow-x-auto scrollbar-none">
        {navItems.map((item) => {
          const IconComp = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'bg-[#10B981] text-white shadow-md shadow-[#10B981]/25'
                  : 'bg-slate-50 dark:bg-slate-900/60 text-[#0F172A] dark:text-slate-200 hover:text-[#059669] dark:hover:text-[#34D399] hover:bg-[#E6F7F2] dark:hover:bg-emerald-950/60 border border-slate-200 dark:border-slate-800'
              }`}
            >
              <IconComp className="w-4 h-4" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* Render Active Deliverable View */}
      <div className="min-h-[500px]">
        {activeTab === 'business-model' && <BusinessModelView data={d.businessModel} />}
        {activeTab === 'competitor-matrix' && <CompetitorMatrixView data={d.competitorAnalysis} />}
        {activeTab === 'tech-stack' && (
          <div className="space-y-6">
            <TechStackView data={d.techStack} />
            <VisualDiagrams databaseSchema={d.databaseSchema} techStack={d.techStack} startupTitle={currentStartup.title} />
          </div>
        )}
        {activeTab === 'database-schema' && <DatabaseSchemaView data={d.databaseSchema} />}
        {activeTab === 'app-builder' && <AppBuilderView startup={currentStartup} />}
        {activeTab === 'landing-page' && (
          <LandingPageSandbox
            data={d.landingPage}
            startupId={currentStartup.id}
            startupTitle={currentStartup.title}
          />
        )}
        {activeTab === 'cost-estimation' && (
          <CostEstimationView data={d.costEstimation} startupTitle={currentStartup.title} />
        )}
        {activeTab === 'pitch-deck' && <PitchDeckView data={d.pitchDeck} />}
        {activeTab === 'devils-advocate' && <DevilsAdvocateView data={d.devilsAdvocateCritique} startup={currentStartup} />}
      </div>

      {/* 9 Steps Navigation Footer */}
      <div className="bg-white dark:bg-emerald-950/40 p-4 rounded-2xl border border-slate-200 dark:border-emerald-800/40 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        {prevStep ? (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setActiveTab(prevStep.id)}
            className="w-full sm:w-auto gap-2 border-emerald-600/30 text-[#059669] dark:text-[#34D399] hover:bg-[#E6F7F2]"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Step {currentStepIndex}: {prevStep.label.replace(/^\d+\.\s*/, '')}</span>
          </Button>
        ) : (
          <Button
            variant="outline"
            size="sm"
            onClick={clearCurrentStartup}
            className="w-full sm:w-auto gap-2 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300"
          >
            <Home className="w-4 h-4 text-[#10B981]" />
            <span>Main Dashboard</span>
          </Button>
        )}

        <div className="text-xs font-bold text-slate-600 dark:text-slate-300">
          Step <span className="text-[#10B981] font-mono text-sm">{activeStepNum}</span> of 9: {navItems[currentStepIndex]?.label}
        </div>

        {nextStep ? (
          <Button
            variant="primary"
            size="sm"
            onClick={() => setActiveTab(nextStep.id)}
            className="w-full sm:w-auto gap-2 bg-[#10B981] hover:bg-[#059669] text-white shadow-md"
          >
            <span>Step {currentStepIndex + 2}: {nextStep.label.replace(/^\d+\.\s*/, '')}</span>
            <ChevronRight className="w-4 h-4" />
          </Button>
        ) : (
          <Button
            variant="primary"
            size="sm"
            onClick={() => setActiveTab('business-model')}
            className="w-full sm:w-auto gap-2 bg-[#10B981] hover:bg-[#059669] text-white shadow-md"
          >
            <span>Review Step 1 (Lean Canvas)</span>
            <ChevronRight className="w-4 h-4" />
          </Button>
        )}
      </div>
    </div>
  );
};
