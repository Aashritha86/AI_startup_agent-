'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useStartupStore } from '@/store/use-startup-store';
import { DashboardTabsView } from '@/components/startup/dashboard-tabs';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Loader2 } from 'lucide-react';

export default function StartupDashboardPage() {
  const params = useParams();
  const router = useRouter();
  const { currentStartup, setStartup } = useStartupStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const startupId = params?.id as string;

  useEffect(() => {
    async function loadStartup() {
      if (currentStartup && currentStartup.id === startupId) {
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const supabase: any = createClient();
        const { data: startup, error: startupErr } = await supabase
          .from('startups')
          .select('*, deliverables(*)')
          .eq('id', startupId)
          .single();

        if (startupErr || !startup) {
          throw new Error(startupErr?.message || 'Startup blueprint not found in database.');
        }

        const del = startup.deliverables;

        setStartup({
          id: startup.id,
          title: startup.title,
          tagline: startup.tagline || '',
          description: startup.description,
          industry: startup.industry || '',
          targetAudience: startup.target_audience || '',
          createdAt: startup.created_at,
          updatedAt: startup.updated_at,
          deliverables: {
            businessModel: (del?.business_model as any) || {},
            competitorAnalysis: (del?.competitor_matrix as any) || {},
            uiWireframe: (del?.ui_wireframe as any) || {},
            techStack: (del?.tech_stack as any) || {},
            databaseSchema: (del?.database_schema as any) || {},
            costEstimation: (del?.cost_estimation as any) || {},
            marketingPlan: (del?.marketing_plan as any) || {},
            pitchDeck: (del?.pitch_deck as any) || {},
            landingPage: (del?.landing_page as any) || {},
          },
        });
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    if (startupId) {
      loadStartup();
    }
  }, [startupId, currentStartup, setStartup]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
        <p className="text-sm text-slate-400 font-mono">Querying Supabase PostgreSQL for Startup Blueprint...</p>
      </div>
    );
  }

  if (error && !currentStartup) {
    return (
      <div className="max-w-md mx-auto my-20 p-6 glass-panel rounded-2xl border border-rose-500/30 text-center space-y-4">
        <h2 className="text-lg font-bold text-white">Startup Not Found</h2>
        <p className="text-xs text-slate-400">{error}</p>
        <Button size="sm" variant="outline" onClick={() => router.push('/')}>
          <ArrowLeft className="w-4 h-4 mr-1.5" /> Return Home
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full pb-16">
      <DashboardTabsView />
    </div>
  );
}
