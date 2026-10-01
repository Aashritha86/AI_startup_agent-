'use client';

import React from 'react';
import { useSimulatorStore } from '@/store/use-simulator-store';
import { useStartupStore } from '@/store/use-startup-store';
import { ScenarioPresetsSelector, SHOCK_PRESETS } from './scenario-presets';
import { PivotResultsDiffView } from './pivot-results-diff';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShieldAlert, Zap, RefreshCw, ArrowRight, Activity, Sparkles } from 'lucide-react';

export const StressTestPanel: React.FC = () => {
  const { currentStartup } = useStartupStore();
  const {
    activeSimulation,
    isSimulating,
    selectedShockType,
    customShockPrompt,
    setShockType,
    setCustomPrompt,
    runSimulation,
    clearSimulation,
  } = useSimulatorStore();

  if (!currentStartup) return null;

  const handleRunSimulation = async (e: React.FormEvent) => {
    e.preventDefault();
    await runSimulation(currentStartup.id, currentStartup);
  };

  const selectedPresetObj = SHOCK_PRESETS.find((p) => p.id === selectedShockType);

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-rose-500/40 bg-gradient-to-r from-rose-950/20 via-slate-900 to-slate-950 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <ShieldAlert className="w-48 h-48 text-rose-500" />
        </div>

        <div className="space-y-3 max-w-3xl relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-semibold backdrop-blur-md">
            <Zap className="w-3.5 h-3.5 text-rose-400" />
            <span>Outstanding Feature: Dynamic Stress-Test & Pivot Engine</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Market Shock Simulator
          </h2>

          <p className="text-sm text-slate-300 leading-relaxed">
            Test your startup against unpredictable real-world market disruptions. Inject competitive, scaling, financial, or custom shocks to force the AI co-founder to recalculate your <strong>Business Model, Tech Stack Architecture, Operating Costs</strong>, and recommend <strong>3 Strategic Pivots</strong>.
          </p>
        </div>
      </div>

      {/* Simulator Control Room Card */}
      <Card className="border-slate-800 bg-slate-950/90 p-6 rounded-3xl space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Activity className="w-4 h-4 text-rose-400" />
            <span>Step 1: Select a Real-World Market Shock Scenario</span>
          </h3>

          {activeSimulation && (
            <Button size="sm" variant="ghost" onClick={clearSimulation} className="text-xs gap-1.5">
              <RefreshCw className="w-3.5 h-3.5" />
              Reset Simulation
            </Button>
          )}
        </div>

        {/* Presets Selector Grid */}
        <ScenarioPresetsSelector
          selectedShock={selectedShockType}
          onSelectShock={(shock) => {
            setShockType(shock);
            const preset = SHOCK_PRESETS.find((p) => p.id === shock);
            if (preset && preset.id !== 'custom') {
              setCustomPrompt(preset.defaultPrompt);
            }
          }}
        />

        {/* Custom or Selected Shock Input Form */}
        <form onSubmit={handleRunSimulation} className="space-y-4 pt-2">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              {selectedShockType === 'custom'
                ? 'Enter Custom Market Disruption Scenario Prompt:'
                : 'Scenario Simulation Prompt (Editable):'}
            </label>
            <input
              type="text"
              value={customShockPrompt || selectedPresetObj?.defaultPrompt || ''}
              onChange={(e) => setCustomPrompt(e.target.value)}
              placeholder="e.g. A tech giant releases a free clone of our app to 100M users..."
              required
              className="w-full bg-slate-900 border border-slate-700 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 font-medium"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <Button
              type="submit"
              variant="danger"
              size="lg"
              isLoading={isSimulating}
              className="w-full sm:w-auto shadow-xl"
            >
              <ShieldAlert className="w-5 h-5 text-white" />
              <span>Inject Market Shock & Recalculate Pivot</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </form>
      </Card>

      {/* Render Simulation Diff Results */}
      {activeSimulation && (
        <PivotResultsDiffView
          simulation={activeSimulation}
          originalDeliverables={currentStartup.deliverables}
        />
      )}
    </div>
  );
};
