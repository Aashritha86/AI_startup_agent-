import React from 'react';
import { MarketShockType, ShockPreset } from '@/types/simulator';
import { ShieldAlert, Zap, TrendingUp, DollarSign, Sliders } from 'lucide-react';

export const SHOCK_PRESETS: ShockPreset[] = [
  {
    id: 'free_clone',
    title: 'Tech Giant Releases Free Clone',
    category: 'Competition',
    description: 'A major tech platform launches a free built-in competitor product, undercutting pricing.',
    icon: 'ShieldAlert',
    defaultPrompt: 'A tech giant releases a free clone of our product to their 500M existing enterprise users.'
  },
  {
    id: 'traffic_1m',
    title: '1M Active Users Overnight Spike',
    category: 'Scale',
    description: 'Viral exposure causes traffic to surge 1,000x beyond baseline compute capacity.',
    icon: 'Zap',
    defaultPrompt: 'Traffic spikes to 1,000,000 active daily users overnight after a viral launch event.'
  },
  {
    id: 'cost_increase_40',
    title: '40% Infrastructure Cost Inflation',
    category: 'Financial',
    description: 'Cloud host API token prices and server compute costs increase by 40%.',
    icon: 'TrendingUp',
    defaultPrompt: 'Supply chain hardware costs and LLM API token inference fees surge by 40% globally.'
  },
  {
    id: 'cac_double',
    title: 'CAC Doubles Across Paid Channels',
    category: 'Financial',
    description: 'Ad channel saturation causes Customer Acquisition Cost (CAC) to double.',
    icon: 'DollarSign',
    defaultPrompt: 'Customer Acquisition Cost (CAC) doubles across Google & Meta ad channels due to bidding wars.'
  },
  {
    id: 'custom',
    title: 'Custom Market Disruption Scenario',
    category: 'Regulatory',
    description: 'Inject your own custom real-world shock prompt to test survival resilience.',
    icon: 'Sliders',
    defaultPrompt: ''
  }
];

interface Props {
  selectedShock: MarketShockType;
  onSelectShock: (shock: MarketShockType) => void;
}

export const ScenarioPresetsSelector: React.FC<Props> = ({ selectedShock, onSelectShock }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {SHOCK_PRESETS.map((preset) => {
        const isSelected = selectedShock === preset.id;
        return (
          <button
            key={preset.id}
            type="button"
            onClick={() => onSelectShock(preset.id)}
            className={`p-4 rounded-2xl text-left border transition-all duration-200 cursor-pointer ${
              isSelected
                ? 'bg-rose-950/60 border-rose-500 shadow-xl shadow-rose-950/40 ring-1 ring-rose-500/50'
                : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md ${
                preset.category === 'Competition' ? 'bg-rose-500/20 text-rose-300' :
                preset.category === 'Scale' ? 'bg-cyan-500/20 text-cyan-300' :
                preset.category === 'Financial' ? 'bg-amber-500/20 text-amber-300' : 'bg-purple-500/20 text-purple-300'
              }`}>
                {preset.category}
              </span>

              {isSelected && (
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
              )}
            </div>

            <h4 className="text-sm font-bold text-white mb-1">{preset.title}</h4>
            <p className="text-xs text-slate-400 leading-relaxed">{preset.description}</p>
          </button>
        );
      })}
    </div>
  );
};
