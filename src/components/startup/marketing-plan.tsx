'use client';

import React from 'react';
import { MarketingPlan } from '@/types/startup';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Megaphone, Rocket, Users, Share2, Target, CheckCircle2 } from 'lucide-react';

interface Props {
  data?: MarketingPlan;
}

export const MarketingPlanView: React.FC<Props> = ({ data }) => {
  if (!data) return null;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <span>Go-To-Market & Marketing Plan</span>
          <Badge variant="rose">Deliverable #7</Badge>
        </h2>
        <p className="text-sm text-slate-400">Day 1 launch playbooks, customer acquisition channels, and viral growth loops.</p>
      </div>

      {/* Target Persona & Strategy Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="border-indigo-500/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-white flex items-center gap-2">
              <Users className="w-4 h-4 text-indigo-400" />
              Target Buyer Persona
            </CardTitle>
          </CardHeader>
          <p className="text-xs text-slate-300 leading-relaxed font-medium">
            {data.targetAudiencePersona}
          </p>
        </Card>

        <Card className="border-cyan-500/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-white flex items-center gap-2">
              <Target className="w-4 h-4 text-cyan-400" />
              Core GTM Execution Plan
            </CardTitle>
          </CardHeader>
          <p className="text-xs text-slate-300 leading-relaxed font-medium">
            {data.gtmStrategy}
          </p>
        </Card>
      </div>

      {/* Day 1 Launch Tactics Checklist */}
      <Card className="border-rose-500/30 bg-rose-950/10">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-bold text-rose-300 flex items-center gap-2">
            <Rocket className="w-4 h-4 text-rose-400" />
            Day 1 Launch Blitz Playbook
          </CardTitle>
        </CardHeader>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          {data.day1LaunchTactics?.map((tactic, idx) => (
            <div key={idx} className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-200 flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
              <span>{tactic}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Customer Acquisition Channels */}
      <Card className="border-slate-800">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold text-white flex items-center gap-2">
            <Megaphone className="w-4 h-4 text-amber-400" />
            Acquisition Channels & Conversion Benchmark Forecast
          </CardTitle>
        </CardHeader>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          {data.channels?.map((ch, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white">{ch.channelName}</span>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/20">
                  Est. CAC: {ch.cacEstimate}
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">{ch.strategy}</p>
              <div className="text-[11px] text-cyan-300 font-mono pt-2 border-t border-slate-800/80">
                Target Conv Rate: {ch.expectedConversionRate}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Viral Growth Hooks */}
      <Card className="border-purple-500/30 bg-purple-950/10">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold text-purple-300 flex items-center gap-2">
            <Share2 className="w-4 h-4 text-purple-400" />
            Built-in Product Virality Loops
          </CardTitle>
        </CardHeader>
        <ul className="space-y-2 text-xs text-slate-300">
          {data.viralHooks?.map((hook, i) => (
            <li key={i} className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-900/60 border border-slate-800">
              <span className="w-2 h-2 rounded-full bg-purple-400"></span>
              <span>{hook}</span>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
};
