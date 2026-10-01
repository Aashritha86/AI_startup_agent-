'use client';

import React from 'react';
import { LeanCanvas } from '@/types/startup';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, CheckCircle2, Target, DollarSign, Shield, Zap, TrendingUp, Users, Radio } from 'lucide-react';

interface Props {
  data?: LeanCanvas;
}

export const BusinessModelView: React.FC<Props> = ({ data }) => {
  if (!data) return null;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-[#0F172A] dark:text-white flex items-center gap-2">
            <span>Lean Canvas Business Model</span>
            <Badge variant="emerald">Deliverable #1</Badge>
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 font-medium">Core strategic blueprint detailing problem, solution, monetization, and moats.</p>
        </div>
      </div>

      {/* Lean Canvas 5-Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">

        {/* Box 1: Problem */}
        <Card className="md:col-span-1 border-[#10B981]/30 bg-[#E6F7F2] dark:bg-slate-900 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-extrabold text-[#059669] dark:text-[#34D399] flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4 text-[#10B981]" />
              1. Problem
            </CardTitle>
          </CardHeader>
          <ul className="space-y-2 p-4 pt-0">
            {data.problem?.map((item, idx) => (
              <li key={idx} className="text-xs text-[#0F172A] dark:text-slate-200 font-medium flex items-start gap-1.5">
                <span className="text-[#10B981] font-bold">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Card>

        {/* Box 2: Solution */}
        <Card className="md:col-span-1 border-[#10B981]/40 bg-[#E6F7F2] dark:bg-slate-900 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-extrabold text-[#059669] dark:text-[#34D399] flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#059669]" />
              2. Solution
            </CardTitle>
          </CardHeader>
          <ul className="space-y-2 p-4 pt-0">
            {data.solution?.map((item, idx) => (
              <li key={idx} className="text-xs text-[#0F172A] dark:text-slate-200 font-medium flex items-start gap-1.5">
                <span className="text-[#059669] font-bold">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Card>

        {/* Box 3: Unique Value Proposition */}
        <Card className="md:col-span-1 border-[#10B981]/30 bg-[#E6F7F2] dark:bg-slate-900 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-extrabold text-[#059669] dark:text-[#34D399] flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-[#10B981]" />
              3. Value Proposition
            </CardTitle>
          </CardHeader>
          <div className="p-4 pt-0">
            <p className="text-xs text-[#0F172A] dark:text-slate-100 leading-relaxed font-semibold bg-white dark:bg-slate-950 p-3 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs">
              "{data.valueProposition}"
            </p>
          </div>
        </Card>

        {/* Box 4: Unfair Advantage */}
        <Card className="md:col-span-1 border-[#0D9488]/30 bg-[#E6F7F2] dark:bg-slate-900 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-extrabold text-[#0D9488] dark:text-[#2DD4BF] flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-[#0D9488]" />
              4. Unfair Advantage
            </CardTitle>
          </CardHeader>
          <div className="p-4 pt-0">
            <p className="text-xs text-[#0F172A] dark:text-slate-200 leading-relaxed font-medium">
              {data.unfairAdvantage}
            </p>
          </div>
        </Card>

        {/* Box 5: Customer Segments */}
        <Card className="md:col-span-1 border-[#10B981]/40 bg-[#E6F7F2] dark:bg-slate-900 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-extrabold text-[#059669] dark:text-[#34D399] flex items-center gap-1.5">
              <Users className="w-4 h-4 text-[#059669]" />
              5. Customer Segments
            </CardTitle>
          </CardHeader>
          <ul className="space-y-2 p-4 pt-0">
            {data.customerSegments?.map((item, idx) => (
              <li key={idx} className="text-xs text-[#0F172A] dark:text-slate-200 font-medium flex items-start gap-1.5">
                <span className="text-[#059669] font-bold">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* Bottom Row: Channels, Revenue Streams, Cost Structure, Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-bold text-[#0F172A] dark:text-slate-200 flex items-center gap-1.5">
              <Radio className="w-3.5 h-3.5 text-[#10B981]" />
              Acquisition Channels
            </CardTitle>
          </CardHeader>
          <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300 p-4 pt-0 font-medium">
            {data.channels?.map((ch, i) => (
              <li key={i}>• {ch}</li>
            ))}
          </ul>
        </Card>

        <Card className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-bold text-[#0F172A] dark:text-slate-200 flex items-center gap-1.5">
              <DollarSign className="w-3.5 h-3.5 text-[#059669]" />
              Revenue Streams
            </CardTitle>
          </CardHeader>
          <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300 p-4 pt-0 font-medium">
            {data.revenueStreams?.map((rev, i) => (
              <li key={i}>• {rev}</li>
            ))}
          </ul>
        </Card>

        <Card className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-bold text-[#0F172A] dark:text-slate-200 flex items-center gap-1.5">
              <Target className="w-3.5 h-3.5 text-[#0D9488]" />
              Cost Structure
            </CardTitle>
          </CardHeader>
          <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300 p-4 pt-0 font-medium">
            {data.costStructure?.map((cost, i) => (
              <li key={i}>• {cost}</li>
            ))}
          </ul>
        </Card>

        <Card className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-bold text-[#0F172A] dark:text-slate-200 flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-[#059669]" />
              Key Metrics
            </CardTitle>
          </CardHeader>
          <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300 p-4 pt-0 font-medium">
            {data.keyMetrics?.map((metric, i) => (
              <li key={i}>• {metric}</li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
};
