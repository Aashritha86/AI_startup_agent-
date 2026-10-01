import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { StartupProject } from '@/types/startup';
import { generateMockDeliverables } from '@/lib/ai/parsers';

interface StartupStore {
  currentStartup: StartupProject | null;
  history: StartupProject[];
  isGenerating: boolean;
  activeTab: string;
  error: string | null;
  theme: 'light' | 'dark';

  // Actions
  setStartup: (startup: StartupProject) => void;
  setIsGenerating: (isGenerating: boolean) => void;
  setActiveTab: (tab: string) => void;
  setError: (error: string | null) => void;
  toggleTheme: () => void;
  setTheme: (theme: 'light' | 'dark') => void;
  generateStartup: (
    description: string,
    metadata?: { targetMarket?: string; category?: string; budget?: string }
  ) => Promise<void>;
  loadDemoStartup: () => void;
  clearCurrentStartup: () => void;
  deleteStartupFromHistory: (id: string) => void;
}

export const useStartupStore = create<StartupStore>()(
  persist(
    (set, get) => ({
      currentStartup: null,
      history: [],
      isGenerating: false,
      activeTab: 'business-model',
      error: null,
      theme: 'light',

      setStartup: (startup) => {
        set((state) => ({
          currentStartup: startup,
          activeTab: 'business-model',
          history: [startup, ...state.history.filter((s) => s.id !== startup.id)],
        }));
      },

      setIsGenerating: (isGenerating) => set({ isGenerating }),
      setActiveTab: (activeTab) => set({ activeTab }),
      setError: (error) => set({ error }),

      toggleTheme: () => {
        const nextTheme = get().theme === 'light' ? 'dark' : 'light';
        if (typeof document !== 'undefined') {
          document.documentElement.classList.toggle('dark', nextTheme === 'dark');
        }
        set({ theme: nextTheme });
      },

      setTheme: (theme) => {
        if (typeof document !== 'undefined') {
          document.documentElement.classList.toggle('dark', theme === 'dark');
        }
        set({ theme });
      },

      generateStartup: async (description, metadata) => {
        set({ isGenerating: true, error: null });
        try {
          const response = await fetch('/api/generate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              description,
              targetMarket: metadata?.targetMarket,
              category: metadata?.category,
              budget: metadata?.budget,
            }),
          });

          const data = await response.json();

          if (!response.ok || !data.success) {
            throw new Error(data.error || 'Failed to generate startup blueprint.');
          }

          get().setStartup(data.startup);
        } catch (err: any) {
          console.warn('Network API failed or offline. Using local instant fallback generator:', err);
          const mockResult = generateMockDeliverables(description);
          const fallbackStartup: StartupProject = {
            id: `startup-fallback-${Date.now()}`,
            title: mockResult.title,
            tagline: mockResult.tagline,
            description,
            industry: mockResult.industry,
            targetAudience: mockResult.targetAudience,
            targetMarket: metadata?.targetMarket || 'Global',
            category: metadata?.category || 'B2B SaaS',
            budget: metadata?.budget || '$10,000 - $50,000',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            deliverables: mockResult.deliverables,
          };
          get().setStartup(fallbackStartup);
        } finally {
          set({ isGenerating: false });
        }
      },

      loadDemoStartup: () => {
        const demo = generateMockDeliverables('AI automated agent co-founder for early stage startups');
        const demoStartup: StartupProject = {
          id: 'demo-startup-nexus',
          title: demo.title,
          tagline: demo.tagline,
          description: 'An AI co-founder that orchestrates full-stack technical schemas, business models, and market stress-tests in seconds.',
          industry: demo.industry,
          targetAudience: demo.targetAudience,
          targetMarket: 'North America & Global',
          category: 'B2B SaaS',
          budget: '$25,000',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          deliverables: demo.deliverables,
        };
        get().setStartup(demoStartup);
      },

      clearCurrentStartup: () => set({ currentStartup: null, activeTab: 'business-model' }),

      deleteStartupFromHistory: (id) =>
        set((state) => ({
          history: state.history.filter((s) => s.id !== id),
          currentStartup: state.currentStartup?.id === id ? null : state.currentStartup,
        })),
    }),
    {
      name: 'ai-startup-builder-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        currentStartup: state.currentStartup,
        history: state.history,
        activeTab: state.activeTab,
        theme: state.theme,
      }),
    }
  )
);
