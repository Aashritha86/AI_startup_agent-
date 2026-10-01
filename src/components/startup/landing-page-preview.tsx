'use client';

import React, { useState } from 'react';
import { LandingPage } from '@/types/startup';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Sparkles, CheckCircle2, ArrowRight, Zap, Layers, ShieldCheck, Mail, Star } from 'lucide-react';
import confetti from 'canvas-confetti';

interface Props {
  data?: LandingPage;
}

export const LandingPagePreviewView: React.FC<Props> = ({ data }) => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  if (!data) return null;

  const handleWaitlistSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }, 600);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <span>Functional Landing Page & Waitlist Capture</span>
            <Badge variant="emerald">Deliverable #9</Badge>
          </h2>
          <p className="text-sm text-slate-400">Responsive single-page website component with hero copy and lead conversion form.</p>
        </div>
      </div>

      {/* Live Landing Page Container */}
      <div className="glass-panel rounded-3xl border border-slate-700/80 bg-slate-950 overflow-hidden shadow-2xl">

        {/* Mock Browser Topbar */}
        <div className="bg-slate-900 px-4 py-2.5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500/80"></span>
            <span className="w-3 h-3 rounded-full bg-amber-500/80"></span>
            <span className="w-3 h-3 rounded-full bg-emerald-500/80"></span>
          </div>

          <div className="bg-slate-950 px-4 py-1 rounded-lg border border-slate-800 text-[11px] font-mono text-slate-400 flex items-center gap-2">
            <span className="text-emerald-400">https://</span>
            <span>your-startup-landing.vercel.app</span>
          </div>

          <Badge variant="emerald" className="text-[10px]">Live Component Preview</Badge>
        </div>

        {/* Landing Page Content */}
        <div className="p-8 sm:p-16 space-y-16 max-w-5xl mx-auto text-center">

          {/* Hero Section */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>{data.valueBadge || "⚡ Next-Gen AI Platform"}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight tracking-tight max-w-3xl mx-auto">
              {data.heroHeadline}
            </h1>

            <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              {data.heroSubheadline}
            </p>

            {/* Waitlist Capture Form */}
            <div className="max-w-md mx-auto pt-4">
              {isSubmitted ? (
                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm font-semibold flex items-center justify-center gap-2 animate-bounce">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>You're on the priority waitlist! Check your inbox soon.</span>
                </div>
              ) : (
                <form onSubmit={handleWaitlistSubmit} className="flex flex-col sm:flex-row items-center gap-2">
                  <div className="relative w-full">
                    <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your work email..."
                      required
                      className="w-full bg-slate-900 border border-slate-700 focus:border-indigo-500 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                    />
                  </div>
                  <Button
                    type="submit"
                    variant="glow"
                    isLoading={isLoading}
                    className="w-full sm:w-auto text-sm px-6 py-3 whitespace-nowrap"
                  >
                    <span>{data.ctaText || "Join Waitlist"}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </form>
              )}

              <p className="text-[11px] text-slate-500 mt-2 font-mono">
                {data.waitlistHookText}
              </p>
            </div>
          </div>

          {/* Feature Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left pt-8 border-t border-slate-800">
            {data.features?.map((feat, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-indigo-500/30 transition-all space-y-2">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-3">
                  <Zap className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white">{feat.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{feat.description}</p>
              </div>
            ))}
          </div>

          {/* Social Proof Section */}
          <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 max-w-2xl mx-auto space-y-2">
            <div className="flex items-center justify-center gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <p className="text-xs text-slate-300 italic">
              "{data.socialProofQuote}"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
