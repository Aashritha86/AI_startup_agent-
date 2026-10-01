'use client';

import React from 'react';
import { CostEstimation } from '@/types/startup';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FinancialCalculator } from '@/components/FinancialCalculator';
import { Lightbulb, PieChart } from 'lucide-react';

interface Props {
  data?: CostEstimation;
  startupTitle?: string;
}

export const CostEstimationView: React.FC<Props> = ({ data, startupTitle = 'Startup' }) => {
  if (!data) return null;

  return (
    <div className="space-y-8">
      {/* 1. Interactive Financial Runway Calculator & 12-Month Recharts Monthly Increment Graph */}
      <FinancialCalculator costEstimation={data} startupTitle={startupTitle} />

      {/* 2. Year 1 Tiered Cost Breakdown & Burn Rate */}
      <div className="space-y-6 pt-4 border-t border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <span>Year 1 Tiered Cost Breakdown & Infrastructure Tiers</span>
              <Badge variant="amber">Deliverable #7</Badge>
            </h2>
            <p className="text-sm text-slate-400">Financial forecast, infrastructure tiers, and cloud optimization recommendations.</p>
          </div>

          <div className="flex items-center gap-3 bg-slate-900/90 p-3 rounded-2xl border border-slate-800">
            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Est. Year 1 Total</span>
              <span className="text-xl font-extrabold text-emerald-400 font-mono">
                ${data.year1TotalEstimated?.toLocaleString()}
              </span>
            </div>
            <div className="h-8 w-px bg-slate-800"></div>
            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Monthly Burn</span>
              <span className="text-xl font-extrabold text-amber-400 font-mono">
                ${data.monthlyBurnRate?.toLocaleString()}/mo
              </span>
            </div>
          </div>
        </div>

        {/* Tiered Growth Stages */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {data.tiers?.map((tier, idx) => (
            <Card key={idx} className={idx === 1 ? 'border-indigo-500/50 bg-indigo-950/20' : 'border-slate-800'}>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-bold text-white flex items-center justify-between">
                  <span>{tier.tierName}</span>
                  {idx === 1 && <Badge variant="indigo">Recommended</Badge>}
                </CardTitle>
              </CardHeader>
              <div className="space-y-2 pt-1">
                <div className="text-2xl font-extrabold font-mono text-emerald-400">
                  ${tier.monthlyCost?.toLocaleString()}
                  <span className="text-xs font-normal text-slate-400"> / mo</span>
                </div>
                <div className="text-xs text-slate-400 font-mono">
                  Annual Total: <strong className="text-slate-200">${tier.annualCost?.toLocaleString()}</strong>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed pt-2 border-t border-slate-800">
                  {tier.description}
                </p>
              </div>
            </Card>
          ))}
        </div>

        {/* Cost Breakdown Items Table */}
        <Card className="border-slate-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-white flex items-center gap-2">
              <PieChart className="w-4 h-4 text-indigo-400" />
              Detailed Monthly Line-Item Infrastructure Costs
            </CardTitle>
          </CardHeader>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 text-slate-400 uppercase font-semibold border-b border-slate-800">
                <tr>
                  <th className="p-3">Category</th>
                  <th className="p-3">Provider</th>
                  <th className="p-3">Est. Monthly Cost</th>
                  <th className="p-3">Technical Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {data.breakdown?.map((item, i) => (
                  <tr key={i} className="hover:bg-slate-900/40">
                    <td className="p-3 font-semibold text-white">{item.category}</td>
                    <td className="p-3 font-mono text-cyan-300">{item.provider}</td>
                    <td className="p-3 font-mono text-emerald-400 font-bold">${item.costMonthly}/mo</td>
                    <td className="p-3 text-slate-400">{item.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Optimization Tips */}
        <Card className="border-amber-500/30 bg-amber-950/10">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-amber-300 flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-amber-400" />
              Cloud & AI Cost Optimization Strategies
            </CardTitle>
          </CardHeader>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-slate-300">
            {data.costOptimizationTips?.map((tip, i) => (
              <li key={i} className="flex items-start gap-2 bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
                <span className="text-amber-400 font-bold">•</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
};
