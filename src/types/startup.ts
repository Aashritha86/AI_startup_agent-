export interface LeanCanvas {
  problem: string[];
  solution: string[];
  valueProposition: string;
  customerSegments: string[];
  channels: string[];
  revenueStreams: string[];
  costStructure: string[];
  keyMetrics: string[];
  unfairAdvantage: string;
}

export interface CompetitorItem {
  name: string;
  marketShare: string;
  strengths: string[];
  weaknesses: string[];
  pricingModel: string;
  vulnerability: string;
}

export interface CompetitorAnalysis {
  competitors: CompetitorItem[];
  userUnfairAdvantage: string;
  marketGapSummary: string;
}

export interface UIWireframeComponent {
  id: string;
  name: string;
  type: 'stat_card' | 'chart_placeholder' | 'data_table' | 'action_button' | 'hero_section' | 'feature_grid';
  title: string;
  description: string;
  tailwindClasses: string;
}

export interface UIWireframe {
  dashboardName: string;
  colorPalette: {
    primary: string;
    secondary: string;
    background: string;
    accent: string;
  };
  layoutStructure: string;
  components: UIWireframeComponent[];
  dashboardPreviewNotes: string;
}

export interface TechStackItem {
  category: string;
  tool: string;
  justification: string;
  monthlyCostEst: string;
}

export interface TechStack {
  frontend: TechStackItem[];
  backend: TechStackItem[];
  database: TechStackItem[];
  infrastructure: TechStackItem[];
  aiIntegration: TechStackItem[];
  scalabilityRating: string;
  architectureOverview: string;
  mermaidArchitecture?: string;
}

export interface SchemaColumn {
  name: string;
  type: string;
  isPrimary?: boolean;
  isNullable?: boolean;
  foreignKey?: string;
  description: string;
}

export interface SchemaTable {
  tableName: string;
  description: string;
  columns: SchemaColumn[];
}

export interface DatabaseSchema {
  tables: SchemaTable[];
  sqlDDL: string;
  erDiagramDescription: string;
  mermaidERD?: string;
}

export interface CostTier {
  tierName: string;
  monthlyCost: number;
  annualCost: number;
  description: string;
}

export interface CostBreakdownItem {
  category: string;
  costMonthly: number;
  provider: string;
  notes: string;
}

export interface FinancialDefaults {
  defaultArpu: number;
  defaultMarketingBudget: number;
  defaultChurnRate: number;
}

export interface CostEstimation {
  year1TotalEstimated: number;
  monthlyBurnRate: number;
  tiers: CostTier[];
  breakdown: CostBreakdownItem[];
  costOptimizationTips: string[];
  financialDefaults?: FinancialDefaults;
}

export interface MarketingChannel {
  channelName: string;
  cacEstimate: string;
  expectedConversionRate: string;
  strategy: string;
}

export interface MarketingPlan {
  targetAudiencePersona: string;
  gtmStrategy: string;
  day1LaunchTactics: string[];
  channels: MarketingChannel[];
  viralHooks: string[];
}

export interface PitchDeckSlide {
  slideNumber: number;
  title: string;
  headline: string;
  content: string[];
  visualRecommendation: string;
  speakerNotes: string;
}

export interface PitchDeck {
  slides: PitchDeckSlide[];
  elevationTagline: string;
  targetFundingAmount: string;
}

export interface LandingPageFeature {
  title: string;
  description: string;
  iconName: string;
}

export interface LandingPage {
  heroHeadline: string;
  heroSubheadline: string;
  ctaText: string;
  valueBadge: string;
  features: LandingPageFeature[];
  socialProofQuote: string;
  waitlistHookText: string;
}

export interface DevilsAdvocateCritique {
  criticalFlaws: string[];
  toughInvestorQuestions: string[];
  recommendedPivots: string[];
}

export interface StartupDeliverables {
  businessModel: LeanCanvas;
  competitorAnalysis: CompetitorAnalysis;
  uiWireframe: UIWireframe;
  techStack: TechStack;
  databaseSchema: DatabaseSchema;
  costEstimation: CostEstimation;
  marketingPlan: MarketingPlan;
  pitchDeck: PitchDeck;
  landingPage: LandingPage;
  devilsAdvocateCritique?: DevilsAdvocateCritique;
}

export interface VCPitchMessage {
  sender: 'vc' | 'founder';
  content: string;
  timestamp: string;
}

export interface VCTermSheet {
  investabilityScore: number;
  simulatedValuation: string;
  checkSize: string;
  equityStake: string;
  boardSeat: string;
  verdict: 'Invest' | 'Soft Circle' | 'Pass';
  keyCritique: string;
  strengths: string[];
  redFlags: string[];
}

export interface StartupProject {
  id: string;
  title: string;
  tagline: string;
  description: string;
  industry: string;
  targetAudience: string;
  targetMarket?: string;
  category?: string;
  budget?: string;
  createdAt: string;
  updatedAt: string;
  deliverables?: StartupDeliverables;
}
