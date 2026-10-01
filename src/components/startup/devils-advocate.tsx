'use client';

import React, { useState } from 'react';
import { DevilsAdvocateCritique, StartupProject } from '@/types/startup';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  ShieldAlert,
  HelpCircle,
  TrendingUp,
  MessageSquare,
  AlertTriangle,
  Flame,
  CheckCircle2,
  Send,
  User,
  Bot
} from 'lucide-react';

interface Props {
  data?: DevilsAdvocateCritique;
  startup: StartupProject;
}

export const DevilsAdvocateView: React.FC<Props> = ({ data, startup }) => {
  const [userAnswer, setUserAnswer] = useState('');
  const [dialogLogs, setDialogLogs] = useState<Array<{ sender: 'vc' | 'founder'; text: string }>>([
    {
      sender: 'vc',
      text: `I've analyzed the business model for ${startup.title}. Before I write a check: Founders always overestimate early adoption. Explain why customers won't just keep using their existing status quo workflow.`,
    },
  ]);

  const flaws = data?.criticalFlaws || [
    `Heavy reliance on third-party API margins which compresses net unit economics.`,
    `Customer acquisition cost (CAC) could spike if Google/Facebook ad bidding gets competitive.`,
    `Low switching costs unless deep workflow data integrations are established early.`,
  ];

  const questions = data?.toughInvestorQuestions || [
    `Why is this an acute "bleeding-neck" problem rather than a nice-to-have software vitamin?`,
    `How will you prevent Google, Microsoft, or an incumbent from building this feature in 6 months?`,
    `What is your customer retention strategy after the initial onboarding excitement wears off?`,
  ];

  const pivots = data?.recommendedPivots || [
    `Pivot to verticalized enterprise SaaS with dedicated RLS data privacy controls.`,
    `Introduce a developer API marketplace model to create network effects and ecosystem lock-in.`,
    `Bundle automated compliance auditing to increase annual contract value (ACV).`,
  ];

  const handleSendAnswer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userAnswer.trim()) return;

    const newLogs = [
      ...dialogLogs,
      { sender: 'founder' as const, text: userAnswer },
      {
        sender: 'vc' as const,
        text: `Fair defense regarding "${userAnswer.slice(0, 45)}...". However, unit economics still require proving multi-quarter net revenue retention (NRR > 120%). What proprietary data moat protects your pricing power long term?`,
      },
    ];

    setDialogLogs(newLogs);
    setUserAnswer('');
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-panel p-6 rounded-3xl border border-rose-500/30 bg-gradient-to-r from-slate-950 via-slate-900 to-rose-950/30">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="rose" className="gap-1">
              <Flame className="w-3.5 h-3.5 text-rose-400 fill-current" />
              <span>Deliverable #9</span>
            </Badge>
            <span className="text-xs text-slate-400">Stress-Test & Investor Interrogation</span>
          </div>
          <h2 className="text-2xl font-extrabold text-white">
            VC Devil's Advocate Debate & Vulnerability Audit
          </h2>
          <p className="text-xs text-slate-300 mt-1">
            Brutally honest AI critique pinpointing critical flaws, tough partner questions, and defensive pivots for <strong>{startup.title}</strong>.
          </p>
        </div>
      </div>

      {/* Flaws, Questions, Pivots 3-Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Critical Flaws */}
        <div className="p-6 rounded-3xl bg-slate-900/80 border border-rose-500/30 space-y-4">
          <div className="flex items-center gap-2 font-bold text-sm text-rose-400">
            <AlertTriangle className="w-4 h-4" />
            <span>Critical Vulnerabilities</span>
          </div>
          <div className="space-y-3">
            {flaws.map((flaw, idx) => (
              <div key={idx} className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-300 space-y-1">
                <span className="font-mono text-rose-400 font-bold text-[10px]">FLAW #0{idx + 1}</span>
                <p className="leading-relaxed">{flaw}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tough Partner Questions */}
        <div className="p-6 rounded-3xl bg-slate-900/80 border border-amber-500/30 space-y-4">
          <div className="flex items-center gap-2 font-bold text-sm text-amber-400">
            <HelpCircle className="w-4 h-4" />
            <span>Tough Partner Questions</span>
          </div>
          <div className="space-y-3">
            {questions.map((q, idx) => (
              <div key={idx} className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-300 space-y-1">
                <span className="font-mono text-amber-400 font-bold text-[10px]">QUESTION #0{idx + 1}</span>
                <p className="leading-relaxed">{q}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recommended Strategic Pivots */}
        <div className="p-6 rounded-3xl bg-slate-900/80 border border-emerald-500/30 space-y-4">
          <div className="flex items-center gap-2 font-bold text-sm text-emerald-400">
            <TrendingUp className="w-4 h-4" />
            <span>Defensive Moat Pivots</span>
          </div>
          <div className="space-y-3">
            {pivots.map((p, idx) => (
              <div key={idx} className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-300 space-y-1">
                <span className="font-mono text-emerald-400 font-bold text-[10px]">PIVOT #0{idx + 1}</span>
                <p className="leading-relaxed">{p}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Live Interactive Investor Debate Simulator */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800 bg-slate-950 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-indigo-400" />
            <h3 className="text-sm font-bold text-white">Live VC Debate Room Simulator</h3>
          </div>
          <Badge variant="indigo" className="text-[10px]">Partner Meeting</Badge>
        </div>

        <div className="max-h-60 overflow-y-auto space-y-3 pr-2 scrollbar-none">
          {dialogLogs.map((log, i) => (
            <div
              key={i}
              className={`flex gap-3 text-xs p-3.5 rounded-2xl ${
                log.sender === 'vc'
                  ? 'bg-slate-900/90 border border-slate-800 text-slate-200'
                  : 'bg-indigo-600/20 border border-indigo-500/30 text-indigo-200 ml-6'
              }`}
            >
              <div className="flex-shrink-0 mt-0.5">
                {log.sender === 'vc' ? (
                  <Bot className="w-4 h-4 text-rose-400" />
                ) : (
                  <User className="w-4 h-4 text-indigo-400" />
                )}
              </div>
              <div className="space-y-1">
                <span className="font-mono text-[10px] text-slate-400 uppercase font-bold">
                  {log.sender === 'vc' ? 'Lead VC Partner' : 'Founder Response'}
                </span>
                <p className="leading-relaxed">{log.text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Founder Response Input Form */}
        <form onSubmit={handleSendAnswer} className="flex gap-2 pt-2">
          <input
            type="text"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            placeholder="Type your strategic response to defend your moat..."
            className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
          <Button type="submit" variant="glow" size="sm" className="text-xs whitespace-nowrap gap-1">
            <span>Respond</span>
            <Send className="w-3.5 h-3.5" />
          </Button>
        </form>
      </div>
    </div>
  );
};
