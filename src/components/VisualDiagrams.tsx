'use client';

import React, { useEffect, useState, useRef } from 'react';
import { DatabaseSchema, TechStack } from '@/types/startup';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Database, Cloud, RefreshCw, Copy, Check, Eye, Layers } from 'lucide-react';
import mermaid from 'mermaid';

interface Props {
  databaseSchema?: DatabaseSchema;
  techStack?: TechStack;
  startupTitle?: string;
}

export const VisualDiagrams: React.FC<Props> = ({
  databaseSchema,
  techStack,
  startupTitle = 'Startup',
}) => {
  const [activeDiagram, setActiveDiagram] = useState<'erd' | 'architecture'>('erd');
  const [svgContent, setSvgContent] = useState<string>('');
  const [copied, setCopied] = useState(false);
  const [isRendering, setIsRendering] = useState(false);
  const renderContainerRef = useRef<HTMLDivElement>(null);

  // Generate dynamic Mermaid ERD syntax from database schema tables
  const generateErdSyntax = (): string => {
    if (databaseSchema?.mermaidERD) {
      return databaseSchema.mermaidERD;
    }

    if (!databaseSchema?.tables || databaseSchema.tables.length === 0) {
      return `erDiagram
  USERS ||--o{ STARTUPS : owns
  STARTUPS ||--|| DELIVERABLES : contains
  STARTUPS ||--o{ LOGS : tracks`;
    }

    const tables = databaseSchema.tables;
    const lines: string[] = ['erDiagram'];

    // Add relationships
    lines.push('  USERS ||--o{ STARTUPS : owns');
    lines.push('  STARTUPS ||--|| DELIVERABLES : contains');

    tables.forEach((t) => {
      const cleanName = t.tableName.toUpperCase();
      if (cleanName !== 'USERS' && cleanName !== 'STARTUPS' && cleanName !== 'DELIVERABLES') {
        lines.push(`  STARTUPS ||--o{ ${cleanName} : manages`);
      }
    });

    // Add table attribute definitions
    tables.forEach((t) => {
      const cleanName = t.tableName.toUpperCase();
      lines.push(`  ${cleanName} {`);
      t.columns.slice(0, 5).forEach((col) => {
        const cleanType = col.type.replace(/[^a-zA-Z0-9]/g, '_');
        const cleanCol = col.name.replace(/[^a-zA-Z0-9_]/g, '_');
        lines.push(`    ${cleanType} ${cleanCol}`);
      });
      lines.push('  }');
    });

    return lines.join('\n');
  };

  // Generate dynamic AWS cloud topology architecture flowchart
  const generateArchitectureSyntax = (): string => {
    if (techStack?.mermaidArchitecture) {
      return techStack.mermaidArchitecture;
    }

    return `graph TD
  Client[Web / Mobile Client Traffic] --> CDN[AWS CloudFront Global CDN]
  CDN --> ALB[AWS Application Load Balancer]
  ALB --> NextApp[Next.js 14 App Router Container]
  NextApp --> Supabase[(Supabase PostgreSQL RLS Engine)]
  NextApp --> Vector[(pgvector Semantic Search Index)]
  NextApp --> AIInference[Google Gemini / OpenAI Inference]
  NextApp --> S3Bucket[(AWS S3 Asset Bucket / Previews)]
  Supabase --> Backups[(Automated PITR Cloud Backups)]`;
  };

  const currentSyntax = activeDiagram === 'erd' ? generateErdSyntax() : generateArchitectureSyntax();

  useEffect(() => {
    let isMounted = true;

    async function renderDiagram() {
      setIsRendering(true);
      try {
        mermaid.initialize({
          startOnLoad: false,
          theme: 'dark',
          securityLevel: 'loose',
          themeVariables: {
            darkMode: true,
            background: '#090d16',
            primaryColor: '#6366f1',
            primaryTextColor: '#f8fafc',
            primaryBorderColor: '#818cf8',
            lineColor: '#06b6d4',
            secondaryColor: '#10b981',
            tertiaryColor: '#1e293b',
          },
        });

        const uniqueId = `mermaid-svg-${Date.now()}`;
        const { svg } = await mermaid.render(uniqueId, currentSyntax);

        if (isMounted) {
          setSvgContent(svg);
        }
      } catch (err) {
        console.warn('Mermaid rendering fallback triggered:', err);
        // Fallback clean SVG representation if syntax error occurs
        if (isMounted) {
          setSvgContent('');
        }
      } finally {
        if (isMounted) {
          setIsRendering(false);
        }
      }
    }

    renderDiagram();

    return () => {
      isMounted = false;
    };
  }, [currentSyntax, activeDiagram]);

  const handleCopySyntax = () => {
    navigator.clipboard.writeText(currentSyntax);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header and Diagram Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-panel p-5 rounded-3xl border border-slate-800">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span>Visual System Architecture & ERD Diagrams</span>
            <Badge variant="cyan">Mermaid.js</Badge>
          </h2>
          <p className="text-xs text-slate-400">
            Interactive Entity-Relationship diagrams & AWS cloud topology generated dynamically from your project foundation.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800">
            <button
              type="button"
              onClick={() => setActiveDiagram('erd')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                activeDiagram === 'erd' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Database className="w-3.5 h-3.5" />
              <span>Database ERD</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveDiagram('architecture')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                activeDiagram === 'architecture' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Cloud className="w-3.5 h-3.5" />
              <span>AWS Cloud Topology</span>
            </button>
          </div>

          <Button size="sm" variant="outline" onClick={handleCopySyntax} className="text-xs gap-1.5">
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-cyan-400" />}
            <span>{copied ? 'Copied!' : 'Copy Mermaid'}</span>
          </Button>
        </div>
      </div>

      {/* Main Diagram Canvas Card */}
      <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-slate-800 bg-slate-950/90 shadow-2xl relative min-h-[420px] flex flex-col justify-center items-center overflow-x-auto">
        <div className="absolute top-4 left-6 flex items-center gap-2 text-xs font-mono text-slate-400">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          <span>
            {activeDiagram === 'erd' ? 'PostgreSQL Relational Schema Topology' : 'AWS Edge-to-Database Infrastructure'}
          </span>
        </div>

        {isRendering ? (
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <RefreshCw className="w-4 h-4 text-indigo-400 animate-spin" />
            <span>Compiling Mermaid Vector Diagram...</span>
          </div>
        ) : svgContent ? (
          <div
            ref={renderContainerRef}
            className="w-full flex justify-center items-center overflow-x-auto py-6 [&_svg]:max-w-full [&_svg]:h-auto"
            dangerouslySetInnerHTML={{ __html: svgContent }}
          />
        ) : (
          /* Fallback Clean Vector Layout if Mermaid rendering encountered parser anomaly */
          <div className="w-full max-w-2xl py-8 space-y-6 text-center">
            {activeDiagram === 'erd' ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
                {databaseSchema?.tables.map((t, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                    <div className="text-xs font-bold text-indigo-400 mb-1">{t.tableName}</div>
                    <ul className="text-[10px] text-slate-400 font-mono space-y-0.5">
                      {t.columns.map((c, i) => (
                        <li key={i}>• {c.name} ({c.type})</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center gap-3 text-xs font-mono text-slate-300">
                <div className="p-3 bg-indigo-950/80 border border-indigo-500/30 rounded-xl">User Clients</div>
                <div className="w-0.5 h-6 bg-indigo-500"></div>
                <div className="p-3 bg-cyan-950/80 border border-cyan-500/30 rounded-xl">AWS CloudFront CDN + WAF</div>
                <div className="w-0.5 h-6 bg-cyan-500"></div>
                <div className="p-3 bg-purple-950/80 border border-purple-500/30 rounded-xl">Next.js App Router (ECS Fargate)</div>
                <div className="w-0.5 h-6 bg-purple-500"></div>
                <div className="p-3 bg-emerald-950/80 border border-emerald-500/30 rounded-xl">Supabase PostgreSQL (RLS Enforced)</div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Raw Syntax Drawer / Info Note */}
      <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2 text-slate-400">
          <Layers className="w-4 h-4 text-indigo-400" />
          <span>Rendered with client-side Mermaid.js SVG compiler. Compatible with GitHub, Notion, and Mermaid Live Editor.</span>
        </div>
        <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/30">
          {activeDiagram.toUpperCase()} Active
        </span>
      </div>
    </div>
  );
};
