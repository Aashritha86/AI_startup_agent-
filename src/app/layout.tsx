import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/layout/navbar';

export const metadata: Metadata = {
  title: 'AI Startup Builder | Generate Full-Stack Blueprints & Stress-Test Pivots',
  description: 'Input any startup description to generate Lean Canvas, Supabase SQL Schemas with RLS, Tech Stack, Pitch Decks, and simulate real-world market shocks.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col antialiased selection:bg-[#10B981] selection:text-white">
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <footer className="border-t border-slate-200 dark:border-emerald-950/60 py-6 text-center text-xs text-slate-600 dark:text-slate-400 glass-panel">
          <p>© {new Date().getFullYear()} AI Startup Builder • Built with Next.js App Router, Supabase RLS & Gemini/OpenAI API</p>
        </footer>
      </body>
    </html>
  );
}
