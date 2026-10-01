'use client';

import React, { useState } from 'react';
import { LandingPage } from '@/types/startup';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { createClient } from '@/lib/supabase/client';
import confetti from 'canvas-confetti';
import {
  Monitor,
  Smartphone,
  Code2,
  Eye,
  Copy,
  Check,
  Sparkles,
  Zap,
  Mail,
  ArrowRight,
  ShieldCheck,
  Star,
  Users
} from 'lucide-react';

interface Props {
  data?: LandingPage;
  startupId?: string;
  startupTitle?: string;
}

export const LandingPageSandbox: React.FC<Props> = ({ data, startupId, startupTitle }) => {
  const [activeMode, setActiveMode] = useState<'preview' | 'code'>('preview');
  const [viewport, setViewport] = useState<'desktop' | 'mobile'>('desktop');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [subscribers, setSubscribers] = useState<Array<{ email: string; date: string }>>([]);

  if (!data) return null;

  const handleWaitlistSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;

    setIsSubmitting(true);
    try {
      // 1. Save in Supabase waitlist_subscribers table if available
      try {
        const supabase: any = createClient();
        await supabase.from('waitlist_subscribers').insert({
          startup_id: startupId && !startupId.startsWith('startup-') ? startupId : null,
          email,
          name: email.split('@')[0],
        });
      } catch (err) {
        console.info('Supabase client insert bypassed (using local state):', err);
      }

      // 2. Save in local state
      setSubscribers((prev) => [{ email, date: new Date().toLocaleTimeString() }, ...prev]);
      setIsSubmitted(true);
      setEmail('');

      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const generatedJsxCode = `import React, { useState } from 'react';
import { Sparkles, ArrowRight, Zap, Shield, Mail, CheckCircle2 } from 'lucide-react';

export default function LandingPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased selection:bg-indigo-500 selection:text-white">
      {/* Header Navigation */}
      <header className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="text-lg font-extrabold tracking-tight text-white flex items-center gap-2">
          <span className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white text-xs font-bold">
            ${(startupTitle || 'AI').slice(0, 2).toUpperCase()}
          </span>
          <span>${startupTitle || 'Startup'}</span>
        </div>
        <a href="#waitlist" className="px-4 py-2 text-xs font-bold rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white transition-colors">
          ${data.ctaText || 'Get Started'}
        </a>
      </header>

      {/* Hero Section */}
      <section className="max-w-4xl mx-auto px-6 py-20 text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>${data.valueBadge || 'AI-Powered Innovation'}</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight">
          ${data.heroHeadline}
        </h1>

        <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          ${data.heroSubheadline}
        </p>

        {/* Waitlist Capture */}
        <div id="waitlist" className="max-w-md mx-auto pt-4">
          {submitted ? (
            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-semibold text-sm">
              You are on the VIP priority waitlist!
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter work email..."
                className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500"
              />
              <button type="submit" className="px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 font-bold text-sm text-white flex items-center gap-2">
                <span>${data.ctaText || 'Join Waitlist'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}
          <p className="text-[11px] text-slate-500 mt-2">
            ${data.waitlistHookText || 'Join 2,500+ builders waiting for early launch.'}
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-5xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-6">
        ${data.features?.map((f, i) => `
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 font-bold">
            0${i + 1}
          </div>
          <h3 className="text-base font-bold text-white">${f.title}</h3>
          <p className="text-xs text-slate-400 leading-relaxed">${f.description}</p>
        </div>`).join('')}
      </section>

      {/* Social Proof */}
      <footer className="border-t border-slate-800 py-12 text-center text-xs text-slate-500">
        <p className="italic max-w-xl mx-auto mb-4 text-slate-400">
          "${data.socialProofQuote}"
        </p>
        <p>&copy; {new Date().getFullYear()} ${startupTitle || 'Startup'}. All rights reserved.</p>
      </footer>
    </div>
  );
}`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(generatedJsxCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Top Controls Bar: Live Preview vs View Code + Viewport Selector */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 glass-panel p-4 rounded-2xl border border-slate-800">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span>Live Landing Page Sandbox</span>
            <Badge variant="emerald">Deliverable #9</Badge>
          </h2>
          <p className="text-xs text-slate-400">
            Interactive single-page React landing preview with responsive viewport and lead capture test sandbox.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Viewport Toggles (Active in Preview mode) */}
          {activeMode === 'preview' && (
            <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800">
              <button
                type="button"
                onClick={() => setViewport('desktop')}
                className={`p-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  viewport === 'desktop' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Monitor className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Desktop</span>
              </button>
              <button
                type="button"
                onClick={() => setViewport('mobile')}
                className={`p-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  viewport === 'mobile' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Mobile (375px)</span>
              </button>
            </div>
          )}

          {/* Mode Toggle: Live Preview vs View Code */}
          <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800">
            <button
              type="button"
              onClick={() => setActiveMode('preview')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                activeMode === 'preview' ? 'bg-emerald-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Live Preview</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveMode('code')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                activeMode === 'code' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>View Code</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Container */}
      {activeMode === 'code' ? (
        /* CODE VIEW */
        <div className="glass-panel rounded-3xl border border-slate-800 bg-slate-950 overflow-hidden shadow-2xl">
          <div className="bg-slate-900 px-5 py-3 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2 font-mono text-xs text-slate-300">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-500"></span>
              <span>LandingPage.tsx (Tailwind CSS + React)</span>
            </div>
            <Button size="sm" variant="outline" onClick={handleCopyCode} className="text-xs gap-1.5">
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-cyan-400" />}
              <span>{copied ? 'Code Copied!' : 'Copy Code'}</span>
            </Button>
          </div>
          <pre className="p-6 text-xs font-mono text-cyan-300 bg-slate-950 overflow-x-auto leading-relaxed max-h-[600px] select-all">
            {generatedJsxCode}
          </pre>
        </div>
      ) : (
        /* LIVE PREVIEW SANDBOX */
        <div className="flex flex-col items-center">
          <div
            className={`w-full transition-all duration-300 ${
              viewport === 'mobile' ? 'max-w-[390px] border-[8px] border-slate-800 rounded-[48px] shadow-2xl overflow-hidden my-4' : 'max-w-full rounded-3xl border border-slate-800 shadow-2xl overflow-hidden'
            }`}
          >
            {/* Mock Browser/Device Header */}
            {viewport === 'desktop' ? (
              <div className="bg-slate-900 px-4 py-2.5 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-500/80"></span>
                  <span className="w-3 h-3 rounded-full bg-amber-500/80"></span>
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80"></span>
                </div>
                <div className="bg-slate-950 px-4 py-1 rounded-lg border border-slate-800 text-[11px] font-mono text-slate-400 flex items-center gap-2">
                  <span className="text-emerald-400">https://</span>
                  <span>{(startupTitle || 'startup').toLowerCase().replace(/\s+/g, '')}.vercel.app</span>
                </div>
                <Badge variant="emerald" className="text-[10px]">Active Sandbox</Badge>
              </div>
            ) : (
              <div className="bg-slate-900 py-3 text-center border-b border-slate-800 relative">
                <div className="w-24 h-4 bg-slate-950 rounded-full mx-auto"></div>
              </div>
            )}

            {/* Sandbox Content Container */}
            <div className="bg-slate-950 text-slate-100 min-h-[550px] p-6 sm:p-12 space-y-12 text-center">

              {/* Sandbox Navbar */}
              <div className="flex items-center justify-between pb-6 border-b border-slate-800/80">
                <div className="font-extrabold text-sm text-white tracking-tight flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center text-white text-xs font-bold">
                    {(startupTitle || 'AI').slice(0, 2).toUpperCase()}
                  </div>
                  <span>{startupTitle || 'Startup'}</span>
                </div>
                <span className="text-[11px] font-mono text-indigo-400 bg-indigo-950/60 px-2.5 py-1 rounded-full border border-indigo-500/30">
                  {data.ctaText || 'Get Started'}
                </span>
              </div>

              {/* Hero Section */}
              <div className="space-y-5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{data.valueBadge || '⚡ Next-Gen AI Solution'}</span>
                </div>

                <h1 className={`${viewport === 'mobile' ? 'text-2xl' : 'text-3xl sm:text-5xl'} font-extrabold text-white leading-tight tracking-tight max-w-3xl mx-auto`}>
                  {data.heroHeadline}
                </h1>

                <p className={`${viewport === 'mobile' ? 'text-xs' : 'text-sm sm:text-base'} text-slate-400 max-w-xl mx-auto leading-relaxed`}>
                  {data.heroSubheadline}
                </p>

                {/* Interactive Waitlist Capture Form */}
                <div className="max-w-md mx-auto pt-3">
                  {isSubmitted ? (
                    <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold flex flex-col items-center gap-1.5 animate-fadeIn">
                      <div className="flex items-center gap-2">
                        <Check className="w-4 h-4" />
                        <span>Waitlist Registration Recorded!</span>
                      </div>
                      <span className="text-[11px] font-normal text-slate-300">
                        Saved to sandbox database lead register.
                      </span>
                      <button
                        type="button"
                        onClick={() => setIsSubmitted(false)}
                        className="text-[10px] text-indigo-400 underline mt-1 cursor-pointer"
                      >
                        Submit another test email
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleWaitlistSubmit} className="flex flex-col sm:flex-row items-center gap-2">
                      <div className="relative w-full">
                        <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Enter your work email..."
                          className="w-full bg-slate-900 border border-slate-700 focus:border-indigo-500 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                        />
                      </div>
                      <Button
                        type="submit"
                        variant="glow"
                        isLoading={isSubmitting}
                        className="w-full sm:w-auto text-xs px-5 py-2.5 whitespace-nowrap"
                      >
                        <span>{data.ctaText || 'Join Waitlist'}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Button>
                    </form>
                  )}

                  <p className="text-[10px] text-slate-500 mt-2 font-mono">
                    {data.waitlistHookText}
                  </p>
                </div>
              </div>

              {/* Feature Grid */}
              <div className={`grid ${viewport === 'mobile' ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-3'} gap-4 text-left pt-6 border-t border-slate-800`}>
                {data.features?.map((feat, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1.5">
                    <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-2">
                      <Zap className="w-4 h-4" />
                    </div>
                    <h3 className="text-sm font-bold text-white">{feat.title}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">{feat.description}</p>
                  </div>
                ))}
              </div>

              {/* Social Proof Quote */}
              <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 max-w-xl mx-auto space-y-1.5">
                <div className="flex items-center justify-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <p className="text-xs text-slate-300 italic">
                  "{data.socialProofQuote}"
                </p>
              </div>

              {/* Test Lead Capture Log */}
              {subscribers.length > 0 && (
                <div className="pt-4 border-t border-slate-800/80 text-left">
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-400 mb-2">
                    <Users className="w-3.5 h-3.5" />
                    <span>Live Test Leads Captured in Sandbox ({subscribers.length}):</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {subscribers.map((sub, i) => (
                      <span key={i} className="text-[10px] font-mono bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800 text-slate-300">
                        {sub.email} <span className="text-slate-500">({sub.date})</span>
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
