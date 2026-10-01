'use client';

import React, { useState } from 'react';
import { UIWireframe } from '@/types/startup';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { LayoutDashboard, Layers, Activity, TrendingUp, Cpu, Server, Shield, Sparkles, Terminal } from 'lucide-react';

interface Props {
  data?: UIWireframe;
}

export const UIWireframeView: React.FC<Props> = ({ data }) => {
  const [activeView, setActiveView] = useState<'preview' | 'specs'>('preview');

  if (!data) return null;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <span>High-Fidelity UI Wireframe Dashboard</span>
            <Badge variant="emerald">Deliverable #3</Badge>
          </h2>
          <p className="text-sm text-slate-400">Interactive Tailwind CSS React component blueprint for the primary application dashboard.</p>
        </div>

        <div className="flex items-center gap-2 bg-slate-900/80 p-1 rounded-xl border border-slate-800">
          <Button
            size="sm"
            variant={activeView === 'preview' ? 'primary' : 'ghost'}
            onClick={() => setActiveView('preview')}
            className="text-xs"
          >
            Live Preview Demo
          </Button>
          <Button
            size="sm"
            variant={activeView === 'specs' ? 'primary' : 'ghost'}
            onClick={() => setActiveView('specs')}
            className="text-xs"
          >
            Design Tokens & Specs
          </Button>
        </div>
      </div>

      {activeView === 'specs' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Color Palette Design Tokens</CardTitle>
            </CardHeader>
            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                <span className="text-slate-400">Primary Gradient:</span>
                <span className="font-mono text-indigo-400 font-bold">{data.colorPalette?.primary}</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                <span className="text-slate-400">Secondary Accent:</span>
                <span className="font-mono text-emerald-400 font-bold">{data.colorPalette?.secondary}</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                <span className="text-slate-400">Background Tone:</span>
                <span className="font-mono text-slate-300 font-bold">{data.colorPalette?.background}</span>
              </div>
            </div>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Layout Architecture & UX Notes</CardTitle>
            </CardHeader>
            <p className="text-xs text-slate-300 leading-relaxed mb-3">
              {data.layoutStructure}
            </p>
            <p className="text-xs text-slate-400 italic bg-slate-950 p-3 rounded-lg border border-slate-800">
              "{data.dashboardPreviewNotes}"
            </p>
          </Card>
        </div>
      ) : (
        /* Interactive Live Wireframe Representation */
        <div className="glass-panel p-6 rounded-3xl border border-indigo-500/30 bg-slate-950/90 shadow-2xl relative overflow-hidden">
          {/* Mock App Header */}
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-800/80">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-white text-xs">
                {data.dashboardName.slice(0, 2).toUpperCase()}
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">{data.dashboardName}</h3>
                <span className="text-[10px] text-emerald-400 flex items-center gap-1 font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                  System Status: Optimal (Sub-12ms)
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-300 text-xs border border-indigo-500/20 font-mono">
                v1.0.4-production
              </span>
            </div>
          </div>

          {/* Dynamic Component Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 shadow-lg">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                <span>Active AI Pipelines</span>
                <Cpu className="w-4 h-4 text-indigo-400" />
              </div>
              <div className="text-2xl font-extrabold text-white font-mono">1,428</div>
              <div className="text-[11px] text-emerald-400 flex items-center gap-1 mt-1 font-semibold">
                <TrendingUp className="w-3 h-3" />
                +24.8% vs last week
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 shadow-lg">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                <span>Database Query Latency</span>
                <Server className="w-4 h-4 text-cyan-400" />
              </div>
              <div className="text-2xl font-extrabold text-white font-mono">8.4 ms</div>
              <div className="text-[11px] text-cyan-400 flex items-center gap-1 mt-1 font-semibold">
                <Shield className="w-3 h-3" />
                Supabase RLS Enforced
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 shadow-lg">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                <span>Token Inference ROI</span>
                <Sparkles className="w-4 h-4 text-amber-400" />
              </div>
              <div className="text-2xl font-extrabold text-white font-mono">$14,250</div>
              <div className="text-[11px] text-amber-400 flex items-center gap-1 mt-1 font-semibold">
                Est. Engineering Hours Saved
              </div>
            </div>
          </div>

          {/* Wireframe Dynamic Component Feed */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-indigo-400" />
              Tailwind Component Blueprint Manifest
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {data.components?.map((comp, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">{comp.name}</span>
                    <Badge variant="indigo">{comp.type}</Badge>
                  </div>
                  <p className="text-xs text-slate-400">{comp.description}</p>
                  <div className="text-[10px] font-mono text-cyan-300/80 bg-slate-950 p-2 rounded border border-slate-800/80 overflow-x-auto">
                    {comp.tailwindClasses}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
