'use client';

import React from 'react';
import { SimulationResult } from '@/types/simulator';
import { StartupDeliverables } from '@/types/startup';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShieldAlert, ArrowRight, CheckCircle2, TrendingUp, Layers, DollarSign, Lightbulb, AlertTriangle, ShieldCheck } from 'lucide-react';

interface Props {
  simulation: SimulationResult;
  originalDeliverables?: StartupDeliverables;
}

export const PivotResultsDiffView: React.FC<Props> = ({ simulation, originalDeliverables }) => {
  const origBm = originalDeliverables?.businessModel;
  const pivBm = simulation.pivotedBusinessModel;
  const pivTech = simulation.pivotedTechStack;
  const pivCosts = simulation.pivotedCostBreakdown;

  return (
    <div className="space-y-8 animate-fadeIn">

      {/* Impact Evaluation Narrative Banner */}
      <Card className="border-rose-500/40 bg-gradient-to-r from-rose-950/40 via-amber-950/20 to-slate-950 shadow-2xl">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-rose-400 font-bold text-xs uppercase tracking-wider">
            <ShieldAlert className="w-5 h-5 text-rose-400 animate-pulse" />
            Market Shock Impact Evaluation
          </div>

          <h3 className="text-xl font-bold text-white">
            "{simulation.shockPrompt}"
          </h3>

          <p className="text-sm text-slate-300 leading-relaxed pt-2 border-t border-rose-500/20">
            {simulation.impactSummary}
          </p>
        </div>
      </Card>

      {/* Real-time KPI Delta Impact Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="p-4 rounded-2xl bg-slate-900/90 border border-rose-500/30">
          <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Monthly Burn Rate</span>
          <div className="flex items-baseline gap-2 font-mono">
            <span className="text-sm line-through text-slate-500">${originalDeliverables?.costEstimation?.monthlyBurnRate || 980}</span>
            <span className="text-base font-extrabold text-rose-400">${pivCosts?.monthlyBurnRate?.toLocaleString() || 2450}</span>
          </div>
          <span className="text-[10px] text-rose-400 font-bold font-mono">+150% Increase</span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/90 border border-amber-500/30">
          <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Gross Margin %</span>
          <div className="flex items-baseline gap-2 font-mono">
            <span className="text-sm line-through text-slate-500">84%</span>
            <span className="text-base font-extrabold text-amber-400">68%</span>
          </div>
          <span className="text-[10px] text-amber-400 font-bold font-mono">-16% Margin Compression</span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/90 border border-cyan-500/30">
          <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Throughput Scaling</span>
          <div className="flex items-baseline gap-2 font-mono">
            <span className="text-sm line-through text-slate-500">5k req/s</span>
            <span className="text-base font-extrabold text-cyan-400">150k req/s</span>
          </div>
          <span className="text-[10px] text-cyan-400 font-bold font-mono">30x Auto-Scaling</span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/90 border border-emerald-500/30">
          <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Post-Pivot Survival</span>
          <div className="flex items-baseline gap-2 font-mono">
            <span className="text-sm text-slate-400">Runway:</span>
            <span className="text-base font-extrabold text-emerald-400">Stabilized</span>
          </div>
          <span className="text-[10px] text-emerald-400 font-bold font-mono">3 Strategic Pivots Active</span>
        </div>
      </div>

      {/* 3 Strategic Survival Pivots */}
      <div className="space-y-3">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-amber-400" />
          <span>Recommended Strategic Pivots to Survive Scenario</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {simulation.strategicPivots?.map((pivot, idx) => (
            <Card key={idx} className="border-amber-500/30 bg-amber-950/10 hover:border-amber-500/60">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-bold text-white flex items-center justify-between">
                  <span>Pivot #{idx + 1}: {pivot.pivotName}</span>
                  <Badge variant={pivot.riskLevel === 'High' ? 'rose' : pivot.riskLevel === 'Medium' ? 'amber' : 'emerald'}>
                    {pivot.riskLevel} Risk
                  </Badge>
                </CardTitle>
              </CardHeader>
              <div className="space-y-2 pt-1">
                <p className="text-xs text-slate-300 leading-relaxed font-medium">
                  {pivot.strategy}
                </p>
                <div className="text-[11px] font-mono text-emerald-400 pt-2 border-t border-amber-500/20">
                  Target Outcome: <strong>{pivot.expectedOutcome}</strong>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Side-by-Side Business Model & Value Prop Diff */}
      <div className="space-y-3">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-cyan-400" />
          <span>Business Model Recalculation (Before vs After Shock)</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* Original Business Model Snapshot */}
          <Card className="border-slate-800 bg-slate-950/80">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-bold text-slate-400 flex items-center gap-2">
                <span>Original Value Proposition</span>
                <Badge variant="slate">Pre-Shock</Badge>
              </CardTitle>
            </CardHeader>
            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-300">
                "{origBm?.valueProposition || 'Standard Value Proposition'}"
              </div>

              <div>
                <strong className="text-slate-400 block mb-1">Target Segments:</strong>
                <ul className="space-y-1 text-slate-400">
                  {origBm?.customerSegments?.map((s, i) => (
                    <li key={i}>• {s}</li>
                  ))}
                </ul>
              </div>

              <div>
                <strong className="text-slate-400 block mb-1">Unfair Advantage:</strong>
                <p className="text-slate-400">{origBm?.unfairAdvantage}</p>
              </div>
            </div>
          </Card>

          {/* Pivoted Recalculated Model */}
          <Card className="border-cyan-500/40 bg-cyan-950/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-bold text-cyan-300 flex items-center gap-2">
                <span>Pivoted Defensible Value Proposition</span>
                <Badge variant="cyan">Post-Shock Pivot</Badge>
              </CardTitle>
            </CardHeader>
            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-900 border border-cyan-500/30 text-white font-semibold shadow-inner">
                "{pivBm?.valueProposition}"
              </div>

              <div>
                <strong className="text-cyan-400 block mb-1">Shifted Customer Segments:</strong>
                <ul className="space-y-1 text-slate-200">
                  {pivBm?.customerSegments?.map((s, i) => (
                    <li key={i} className="flex items-center gap-1.5">
                      <ArrowRight className="w-3 h-3 text-cyan-400 flex-shrink-0" />
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <strong className="text-cyan-400 block mb-1">New Moat / Unfair Advantage:</strong>
                <p className="text-slate-200">{pivBm?.unfairAdvantage}</p>
              </div>
            </div>
          </Card>

        </div>
      </div>

      {/* Tech Stack Scaling Adjustment Diff */}
      <div className="space-y-3">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Layers className="w-5 h-5 text-indigo-400" />
          <span>Tech Stack Architecture Scaling Adjustments</span>
        </h3>

        <Card className="border-indigo-500/30 bg-slate-900/80">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-bold text-white flex items-center justify-between">
              <span>Recalculated System Architecture & Scaling Grade</span>
              <Badge variant="indigo">{pivTech?.scalabilityRating}</Badge>
            </CardTitle>
          </CardHeader>

          <p className="text-xs text-slate-300 font-mono mb-4">
            {pivTech?.architectureOverview}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            {pivTech?.database?.map((item, i) => (
              <div key={i} className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-[10px] text-cyan-400 uppercase font-bold tracking-wider">{item.category}</span>
                <div className="font-bold text-white">{item.tool}</div>
                <p className="text-[11px] text-slate-400">{item.justification}</p>
              </div>
            ))}

            {pivTech?.infrastructure?.map((item, i) => (
              <div key={i} className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-[10px] text-purple-400 uppercase font-bold tracking-wider">{item.category}</span>
                <div className="font-bold text-white">{item.tool}</div>
                <p className="text-[11px] text-slate-400">{item.justification}</p>
              </div>
            ))}

            {pivTech?.aiIntegration?.map((item, i) => (
              <div key={i} className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-[10px] text-amber-400 uppercase font-bold tracking-wider">{item.category}</span>
                <div className="font-bold text-white">{item.tool}</div>
                <p className="text-[11px] text-slate-400">{item.justification}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Recalculated Year 1 Operating Costs */}
      <div className="space-y-3">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <DollarSign className="w-5 h-5 text-emerald-400" />
          <span>Recalculated Financial Burn Rate & Infrastructure Costs</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="border-slate-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-bold text-white">Post-Shock Financial Overview</CardTitle>
            </CardHeader>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900 font-mono">
                <span className="text-slate-400">Recalculated Year 1 Total:</span>
                <span className="text-emerald-400 font-extrabold text-base">${pivCosts?.year1TotalEstimated?.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900 font-mono">
                <span className="text-slate-400">Adjusted Monthly Burn Rate:</span>
                <span className="text-amber-400 font-extrabold text-base">${pivCosts?.monthlyBurnRate?.toLocaleString()}/mo</span>
              </div>
            </div>
          </Card>

          <Card className="border-emerald-500/30 bg-emerald-950/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-bold text-emerald-300">Cost Containment Recommendations</CardTitle>
            </CardHeader>

            <ul className="space-y-2 text-xs text-slate-300">
              {pivCosts?.costOptimizationTips?.map((tip, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
};
