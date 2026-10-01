'use client';

import React from 'react';
import { TechStack } from '@/types/startup';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Layers, Server, Database, Cloud, Bot, Award, CheckCircle } from 'lucide-react';

interface Props {
  data?: TechStack;
}

export const TechStackView: React.FC<Props> = ({ data }) => {
  if (!data) return null;

  const categories = [
    { title: 'Frontend Architecture', icon: Layers, items: data.frontend, color: 'text-indigo-400', border: 'border-indigo-500/20' },
    { title: 'Backend & APIs', icon: Server, items: data.backend, color: 'text-cyan-400', border: 'border-cyan-500/20' },
    { title: 'Database & Auth (Supabase)', icon: Database, items: data.database, color: 'text-emerald-400', border: 'border-emerald-500/20' },
    { title: 'Cloud & Infrastructure', icon: Cloud, items: data.infrastructure, color: 'text-purple-400', border: 'border-purple-500/20' },
    { title: 'AI Engine Integration', icon: Bot, items: data.aiIntegration, color: 'text-amber-400', border: 'border-amber-500/20' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <span>Optimal Technical Stack & Architecture</span>
            <Badge variant="indigo">Deliverable #4</Badge>
          </h2>
          <p className="text-sm text-slate-400">Production-grade technology selections, justifications, and cost estimates.</p>
        </div>

        <div className="p-3 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 flex items-center gap-3">
          <Award className="w-6 h-6 text-amber-400 flex-shrink-0" />
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">Scalability Rating</span>
            <span className="text-sm font-extrabold text-white font-mono">{data.scalabilityRating}</span>
          </div>
        </div>
      </div>

      {/* Architecture Overview Banner */}
      <Card className="border-indigo-500/30 bg-slate-900/80">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold text-slate-200">System Architecture Overview</CardTitle>
        </CardHeader>
        <p className="text-xs text-slate-300 leading-relaxed font-mono">
          {data.architectureOverview}
        </p>
      </Card>

      {/* Tech Stack Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {categories.map((cat, idx) => {
          const IconComp = cat.icon;
          return (
            <Card key={idx} className={cat.border}>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold text-white flex items-center gap-2">
                  <IconComp className={`w-4 h-4 ${cat.color}`} />
                  <span>{cat.title}</span>
                </CardTitle>
              </CardHeader>

              <div className="space-y-3">
                {cat.items?.map((item, i) => (
                  <div key={i} className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white flex items-center gap-1.5">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                        {item.tool}
                      </span>
                      <span className="text-[10px] font-mono text-cyan-300 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/20">
                        {item.monthlyCostEst}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed pl-5">
                      {item.justification}
                    </p>
                  </div>
                ))}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
