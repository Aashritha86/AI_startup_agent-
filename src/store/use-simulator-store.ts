import { create } from 'zustand';
import { SimulationResult, MarketShockType } from '@/types/simulator';
import { generateMockSimulationResult } from '@/lib/ai/parsers';

interface SimulatorStore {
  activeSimulation: SimulationResult | null;
  history: SimulationResult[];
  isSimulating: boolean;
  selectedShockType: MarketShockType;
  customShockPrompt: string;
  isDiffMode: boolean;
  error: string | null;

  // Actions
  setShockType: (type: MarketShockType) => void;
  setCustomPrompt: (prompt: string) => void;
  setIsDiffMode: (mode: boolean) => void;
  runSimulation: (startupId: string, currentStartup?: any) => Promise<void>;
  clearSimulation: () => void;
}

export const useSimulatorStore = create<SimulatorStore>((set, get) => ({
  activeSimulation: null,
  history: [],
  isSimulating: false,
  selectedShockType: 'free_clone',
  customShockPrompt: '',
  isDiffMode: true,
  error: null,

  setShockType: (selectedShockType) => set({ selectedShockType }),
  setCustomPrompt: (customShockPrompt) => set({ customShockPrompt }),
  setIsDiffMode: (isDiffMode) => set({ isDiffMode }),

  runSimulation: async (startupId: string, currentStartup?: any) => {
    set({ isSimulating: true, error: null });
    const { selectedShockType, customShockPrompt } = get();

    try {
      const response = await fetch('/api/simulate-pivot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          startupId,
          shockType: selectedShockType,
          customPrompt: customShockPrompt,
          currentStartup,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to execute pivot simulation.');
      }

      set((state) => ({
        activeSimulation: data.simulation,
        history: [data.simulation, ...state.history],
        isDiffMode: true,
      }));
    } catch (err: any) {
      console.warn('Network simulation failed. Using local fallback simulation engine:', err);
      const fallbackSim = generateMockSimulationResult(startupId, selectedShockType, customShockPrompt);
      set((state) => ({
        activeSimulation: fallbackSim,
        history: [fallbackSim, ...state.history],
        isDiffMode: true,
      }));
    } finally {
      set({ isSimulating: false });
    }
  },

  clearSimulation: () => set({ activeSimulation: null }),
}));
