'use client';

import React, { useState, useEffect, useRef } from 'react';
import { StartupProject, VCPitchMessage, VCTermSheet } from '@/types/startup';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import confetti from 'canvas-confetti';
import {
  Briefcase,
  Send,
  Sparkles,
  Award,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  RefreshCw,
  User,
  Bot,
  MessageSquareQuote,
  ShieldCheck,
  FileCheck
} from 'lucide-react';

interface Props {
  startup: StartupProject;
}

export const PitchSimulator: React.FC<Props> = ({ startup }) => {
  const [messages, setMessages] = useState<VCPitchMessage[]>([]);
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [questionCount, setQuestionCount] = useState(0); // 0 = start, 1 = Q1 answered, 2 = Q2 answered, 3 = Q3 answered
  const [isLoading, setIsLoading] = useState(false);
  const [termSheet, setTermSheet] = useState<VCTermSheet | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Initial welcome message from the VC partner when opening tab
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          sender: 'vc',
          content: `Good morning. I'm Marcus Vance, Partner at Horizon Ventures. I've looked through the 1-pager for ${startup.title}. The market opportunity sounds interesting, but ideas are cheap and execution is everything.\n\nHere is my first question: Why is this an acute 'bleeding-neck' problem that your customers will pay for immediately, rather than a nice-to-have vitamin?`,
          timestamp: new Date().toLocaleTimeString(),
        },
      ]);
    }
  }, [startup.title, messages.length]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSendAnswer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentAnswer.trim() || isLoading) return;

    const userText = currentAnswer.trim();
    setCurrentAnswer('');

    // Add founder's answer to messages
    const updatedMessages: VCPitchMessage[] = [
      ...messages,
      { sender: 'founder', content: userText, timestamp: new Date().toLocaleTimeString() },
    ];
    setMessages(updatedMessages);

    setIsLoading(true);

    try {
      const response = await fetch('/api/pitch-vc', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          startup,
          conversationHistory: updatedMessages,
          currentAnswer: userText,
          questionNumber: questionCount + 1,
        }),
      });

      const data = await response.json();

      if (data.isFinalDecision && data.termSheet) {
        // Final Decision Term Sheet round
        setTermSheet(data.termSheet);
        setQuestionCount(3);
        setMessages((prev) => [
          ...prev,
          {
            sender: 'vc',
            content: `Thank you for your candid answers. I've deliberated with my partners. Here is our official Investment Decision and Term Sheet summary.`,
            timestamp: new Date().toLocaleTimeString(),
          },
        ]);

        if (data.termSheet.investabilityScore >= 75) {
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
          });
        }
      } else {
        // Next Question round
        setQuestionCount((prev) => prev + 1);
        const vcContent = `${data.vcFeedback}\n\n${data.nextQuestion}`;
        setMessages((prev) => [
          ...prev,
          { sender: 'vc', content: vcContent, timestamp: new Date().toLocaleTimeString() },
        ]);
      }
    } catch (err) {
      console.error('VC pitch error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setMessages([
      {
        sender: 'vc',
        content: `Let's take it from the top. I'm Marcus Vance, Partner at Horizon Ventures. Convince me in 2 sentences: Why is ${startup.title} solving a critical, urgent problem customers are desperate to pay for right now?`,
        timestamp: new Date().toLocaleTimeString(),
      },
    ]);
    setQuestionCount(0);
    setTermSheet(null);
    setCurrentAnswer('');
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-indigo-500/30 bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950/40 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold">
            <Briefcase className="w-3.5 h-3.5 text-cyan-400" />
            <span>Interactive AI VC Pitch Simulator</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Pitch to Marcus Vance (Horizon Ventures)
          </h2>
          <p className="text-xs text-slate-300 leading-relaxed">
            Face an authentic, skeptical Tier-1 Seed/Angel VC. Survive a high-stakes 3-question interrogation on your unit economics, defensibility moats, and CAC to earn an <strong>Investability Score (0-100)</strong> and simulated <strong>Term Sheet</strong>.
          </p>
        </div>

        {/* Progress Stepper & Reset */}
        <div className="flex flex-col items-end gap-3">
          <div className="flex items-center gap-1.5 bg-slate-900/90 p-2 rounded-2xl border border-slate-800">
            {[1, 2, 3].map((step) => (
              <div
                key={step}
                className={`w-7 h-7 rounded-lg text-xs font-bold flex items-center justify-center transition-all ${
                  questionCount >= step
                    ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30'
                    : questionCount === step - 1
                    ? 'bg-indigo-600 text-white ring-2 ring-indigo-400'
                    : 'bg-slate-800 text-slate-500'
                }`}
              >
                {questionCount >= step ? '✓' : `Q${step}`}
              </div>
            ))}
          </div>

          <Button size="sm" variant="ghost" onClick={handleReset} className="text-xs gap-1.5 text-slate-400">
            <RefreshCw className="w-3.5 h-3.5" />
            Reset Pitch Session
          </Button>
        </div>
      </div>

      {/* Main Pitching Arena */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Chat Conversation Stream (2 Columns) */}
        <div className={`${termSheet ? 'lg:col-span-2' : 'lg:col-span-3'} space-y-4`}>
          <div className="glass-panel rounded-3xl border border-slate-800 bg-slate-950/80 p-6 min-h-[460px] max-h-[550px] overflow-y-auto space-y-4 shadow-xl">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex gap-3 ${msg.sender === 'founder' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'vc' && (
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white flex-shrink-0 shadow-lg">
                    <Briefcase className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                    msg.sender === 'founder'
                      ? 'bg-gradient-to-r from-indigo-600 to-cyan-600 text-white shadow-lg shadow-indigo-600/20 rounded-br-none'
                      : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-bl-none shadow-md'
                  }`}
                >
                  <div className="flex items-center justify-between gap-4 mb-1 text-[10px] opacity-70 font-mono">
                    <span className="font-bold">
                      {msg.sender === 'vc' ? 'Marcus Vance (Horizon Ventures)' : 'You (Founder)'}
                    </span>
                    <span>{msg.timestamp}</span>
                  </div>
                  <p className="whitespace-pre-wrap">{msg.content}</p>
                </div>

                {msg.sender === 'founder' && (
                  <div className="w-9 h-9 rounded-xl bg-cyan-600 flex items-center justify-center text-white flex-shrink-0 shadow-lg">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white flex-shrink-0">
                  <Briefcase className="w-4 h-4" />
                </div>
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3 text-xs text-slate-400 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
                  <span>Marcus Vance is reviewing your thesis and calculating unit economics...</span>
                </div>
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* Founder Answer Input Form */}
          {!termSheet && (
            <form onSubmit={handleSendAnswer} className="glass-panel p-3 rounded-2xl border border-slate-800 flex gap-2">
              <input
                type="text"
                value={currentAnswer}
                onChange={(e) => setCurrentAnswer(e.target.value)}
                placeholder={`Type your response to Question ${questionCount + 1} of 3...`}
                disabled={isLoading || questionCount >= 3}
                className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
              <Button
                type="submit"
                variant="glow"
                disabled={!currentAnswer.trim() || isLoading}
                className="text-xs px-5 py-3 gap-1.5 whitespace-nowrap"
              >
                <span>Pitch Answer</span>
                <Send className="w-3.5 h-3.5" />
              </Button>
            </form>
          )}
        </div>

        {/* Term Sheet Summary Card (When Generated) */}
        {termSheet && (
          <div className="space-y-4 animate-fadeIn">
            <div className="glass-panel p-6 rounded-3xl border border-emerald-500/40 bg-gradient-to-b from-emerald-950/20 via-slate-950 to-slate-950 shadow-2xl space-y-5">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <FileCheck className="w-5 h-5 text-emerald-400" />
                  <span className="text-sm font-extrabold text-white">SIMULATED TERM SHEET</span>
                </div>
                <Badge variant={termSheet.verdict === 'Invest' ? 'emerald' : termSheet.verdict === 'Soft Circle' ? 'amber' : 'rose'}>
                  {termSheet.verdict}
                </Badge>
              </div>

              {/* Score Gauge */}
              <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 text-center space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-400">Investability Score</span>
                <div className="text-4xl font-extrabold font-mono text-emerald-400">
                  {termSheet.investabilityScore}
                  <span className="text-xs font-normal text-slate-500"> / 100</span>
                </div>
              </div>

              {/* Valuation & Check */}
              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">Valuation</span>
                  <span className="font-bold text-white text-xs">{termSheet.simulatedValuation}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">Offer Size</span>
                  <span className="font-bold text-emerald-400 text-xs">{termSheet.checkSize}</span>
                </div>
              </div>

              {/* Terms Overview */}
              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-slate-800 text-slate-400">
                  <span>Equity Stake:</span>
                  <strong className="text-slate-200">{termSheet.equityStake}</strong>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800 text-slate-400">
                  <span>Governance:</span>
                  <strong className="text-slate-200">{termSheet.boardSeat}</strong>
                </div>
              </div>

              {/* Partner Feedback */}
              <div className="space-y-1.5 pt-1">
                <span className="text-[10px] font-bold uppercase text-slate-400">Partner Memo Critique</span>
                <p className="text-xs text-slate-300 leading-relaxed italic bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                  "{termSheet.keyCritique}"
                </p>
              </div>

              {/* Strengths & Red Flags */}
              <div className="space-y-2 pt-2 border-t border-slate-800 text-[11px]">
                <div>
                  <strong className="text-emerald-400 block mb-1">Key Strengths:</strong>
                  <ul className="space-y-1 text-slate-300">
                    {termSheet.strengths?.map((str, i) => (
                      <li key={i}>✓ {str}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <strong className="text-rose-400 block mb-1">Red Flags / Risks to Address:</strong>
                  <ul className="space-y-1 text-slate-400">
                    {termSheet.redFlags?.map((rf, i) => (
                      <li key={i}>⚠️ {rf}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
