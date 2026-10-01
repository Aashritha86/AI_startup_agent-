import { LeanCanvas, TechStack, CostEstimation } from './startup';

export type MarketShockType = 
  | 'free_clone' 
  | 'traffic_1m' 
  | 'cost_increase_40' 
  | 'cac_double'
  | 'custom';

export interface ShockPreset {
  id: MarketShockType;
  title: string;
  category: 'Competition' | 'Scale' | 'Financial' | 'Regulatory';
  description: string;
  icon: string;
  defaultPrompt: string;
}

export interface StrategicPivot {
  pivotName: string;
  strategy: string;
  expectedOutcome: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface SimulationResult {
  id: string;
  startupId: string;
  shockType: MarketShockType;
  shockPrompt: string;
  impactSummary: string;
  pivotedBusinessModel: LeanCanvas;
  pivotedTechStack: TechStack;
  pivotedCostBreakdown: CostEstimation;
  strategicPivots: StrategicPivot[];
  createdAt: string;
}

export interface DiffMetric {
  label: string;
  originalValue: string | number;
  postShockValue: string | number;
  deltaType: 'increase' | 'decrease' | 'neutral' | 'critical';
  notes: string;
}
