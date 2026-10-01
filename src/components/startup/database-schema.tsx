'use client';

import React, { useState } from 'react';
import { DatabaseSchema } from '@/types/startup';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Database, ShieldCheck, Copy, Check, Table, Key, Link as LinkIcon } from 'lucide-react';

interface Props {
  data?: DatabaseSchema;
}

export const DatabaseSchemaView: React.FC<Props> = ({ data }) => {
  const [copied, setCopied] = useState(false);

  if (!data) return null;

  const handleCopy = () => {
    if (data.sqlDDL) {
      navigator.clipboard.writeText(data.sqlDDL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <span>Relational PostgreSQL Schema & RLS</span>
            <Badge variant="cyan">Deliverable #5</Badge>
          </h2>
          <p className="text-sm text-slate-400">Complete Supabase-ready DDL schema scripts with Row Level Security policies.</p>
        </div>

        <Button variant="outline" size="sm" onClick={handleCopy} className="gap-2 text-xs">
          {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-cyan-400" />}
          <span>{copied ? 'SQL DDL Copied!' : 'Copy SQL Script'}</span>
        </Button>
      </div>

      {/* RLS Security Banner */}
      <Card className="border-emerald-500/30 bg-emerald-950/10">
        <div className="flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
          <div className="space-y-1 text-xs">
            <h4 className="font-bold text-white">Supabase Row Level Security (RLS) Active</h4>
            <p className="text-slate-300">
              All tables feature isolated multi-tenant security policies. User data is protected at the database engine level via <code className="text-emerald-300 font-mono">auth.uid() = user_id</code> clauses.
            </p>
          </div>
        </div>
      </Card>

      {/* Relational Table Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {data.tables?.map((table, idx) => (
          <Card key={idx} className="border-slate-800 bg-slate-900/80">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-bold text-white flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-indigo-400 font-mono">
                  <Table className="w-4 h-4" />
                  {table.tableName}
                </span>
                <span className="text-[10px] text-slate-500 font-normal">Table #{idx + 1}</span>
              </CardTitle>
              <CardDescription className="text-xs">{table.description}</CardDescription>
            </CardHeader>

            <div className="space-y-1.5 pt-2">
              {table.columns?.map((col, i) => (
                <div key={i} className="flex items-center justify-between text-xs p-2 rounded bg-slate-950/60 border border-slate-800/80">
                  <div className="flex items-center gap-1.5 font-mono">
                    {col.isPrimary && <Key className="w-3 h-3 text-amber-400 flex-shrink-0" />}
                    {col.foreignKey && <LinkIcon className="w-3 h-3 text-cyan-400 flex-shrink-0" />}
                    <span className={col.isPrimary ? 'text-amber-300 font-bold' : 'text-slate-200'}>{col.name}</span>
                  </div>
                  <span className="text-[10px] font-mono text-indigo-300 bg-indigo-950/40 px-1.5 py-0.5 rounded">
                    {col.type}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>

      {/* Raw SQL DDL Script Viewer */}
      <Card className="border-slate-800 bg-slate-950">
        <CardHeader className="pb-2">
          <CardTitle className="text-xs font-bold text-slate-400 uppercase font-mono tracking-wider flex items-center justify-between">
            <span>Formatted PostgreSQL DDL Execution Script</span>
            <span className="text-emerald-400 text-[10px]">PostgreSQL 15 / Supabase</span>
          </CardTitle>
        </CardHeader>

        <pre className="p-4 rounded-xl bg-slate-900/90 text-xs font-mono text-cyan-300 leading-relaxed overflow-x-auto border border-slate-800 max-h-80 select-all">
          {data.sqlDDL || `-- PostgreSQL Schema\nCREATE TABLE public.startups (\n  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),\n  user_id UUID REFERENCES auth.users(id),\n  created_at TIMESTAMPTZ DEFAULT now()\n);`}
        </pre>
      </Card>
    </div>
  );
};
