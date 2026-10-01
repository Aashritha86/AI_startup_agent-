'use client';

import React from 'react';
import { CompetitorAnalysis } from '@/types/startup';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShieldCheck, AlertTriangle, Crosshair, Award, DollarSign, CheckCircle, XCircle } from 'lucide-react';

interface Props {
  data?: CompetitorAnalysis;
}

export const CompetitorMatrixView: React.FC<Props> = ({ data }) => {
  if (!data) return null;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-[#0F172A] dark:text-white flex items-center gap-2">
          <span>Competitor Matrix & Unfair Advantage</span>
          <Badge variant="emerald">Deliverable #2</Badge>
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-300 font-medium">
          Analysis of top 3 industry alternatives, pricing models, weaknesses, and your strategic moat.
        </p>
      </div>

      {/* Unfair Advantage Highlight Banner */}
      <Card className="border-[#10B981]/30 bg-[#E6F7F2] dark:bg-emerald-950/40 shadow-md">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-2xl">
            <div className="flex items-center gap-2 text-[#059669] dark:text-[#34D399] text-xs font-bold uppercase tracking-wider">
              <Award className="w-4 h-4 text-[#10B981]" />
              Your Unfair Advantage & Strategic Moat
            </div>
            <p className="text-base text-[#0F172A] dark:text-white font-semibold leading-relaxed">
              "{data.userUnfairAdvantage}"
            </p>
          </div>
          <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-[#10B981]/30 text-xs text-slate-600 dark:text-slate-300">
            <strong className="block text-[#0F172A] dark:text-white mb-0.5 font-bold">Market White Space:</strong>
            {data.marketGapSummary}
          </div>
        </div>
      </Card>

      {/* Competitors Matrix Table */}
      <div className="glass-panel rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-[#0F172A] dark:text-slate-200">
            <thead className="bg-slate-100 dark:bg-slate-800/80 text-xs uppercase font-extrabold text-[#0F172A] dark:text-slate-200 border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="p-4">Competitor</th>
                <th className="p-4">Est. Share</th>
                <th className="p-4">Strengths</th>
                <th className="p-4">Weaknesses</th>
                <th className="p-4">Pricing Model</th>
                <th className="p-4 text-[#059669] dark:text-[#34D399]">Vulnerability</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800/80 text-xs font-medium">
              {data.competitors?.map((comp, idx) => (
                <tr key={idx} className="hover:bg-[#E6F7F2]/50 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="p-4 font-bold text-[#0F172A] dark:text-white flex items-center gap-2">
                    <Crosshair className="w-4 h-4 text-[#10B981] flex-shrink-0" />
                    <span>{comp.name}</span>
                  </td>
                  <td className="p-4 font-mono text-[#059669] dark:text-[#34D399] font-bold">{comp.marketShare}</td>
                  <td className="p-4 space-y-1">
                    {comp.strengths?.map((s, i) => (
                      <div key={i} className="flex items-center gap-1.5 text-[#059669] dark:text-[#34D399]">
                        <CheckCircle className="w-3.5 h-3.5 flex-shrink-0 text-[#10B981]" />
                        <span>{s}</span>
                      </div>
                    ))}
                  </td>
                  <td className="p-4 space-y-1">
                    {comp.weaknesses?.map((w, i) => (
                      <div key={i} className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
                        <XCircle className="w-3.5 h-3.5 flex-shrink-0 text-slate-400" />
                        <span>{w}</span>
                      </div>
                    ))}
                  </td>
                  <td className="p-4 font-mono text-slate-800 dark:text-slate-200 font-semibold">{comp.pricingModel}</td>
                  <td className="p-4 bg-[#E6F7F2]/60 dark:bg-emerald-950/30 text-[#059669] dark:text-[#34D399] font-semibold border-l border-[#10B981]/20">
                    {comp.vulnerability}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
