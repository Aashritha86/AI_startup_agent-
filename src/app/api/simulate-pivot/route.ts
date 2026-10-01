import { NextRequest, NextResponse } from 'next/server';
import { getAIClient } from '@/lib/ai/client';
import { SYSTEM_PROMPT_PIVOT_SIMULATION } from '@/lib/ai/prompts';
import { cleanJsonResponse, generateMockSimulationResult } from '@/lib/ai/parsers';
import { createClient } from '@/lib/supabase/server';
import { MarketShockType } from '@/types/simulator';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { startupId, shockType, customPrompt, currentStartup } = body;

    if (!startupId || !shockType) {
      return NextResponse.json(
        { error: 'startupId and shockType are required parameters.' },
        { status: 400 }
      );
    }

    const ai = getAIClient();
    let simulationData: any = null;

    if (ai.provider === 'gemini') {
      try {
        const prompt = `${SYSTEM_PROMPT_PIVOT_SIMULATION}\n\nStartup Snapshot:\nTitle: ${currentStartup?.title || 'Startup'}\nDescription: ${currentStartup?.description || ''}\n\nMarket Shock Type: ${shockType}\nSpecific Shock Prompt:\n"${customPrompt || shockType}"`;
        const result = await ai.model.generateContent(prompt);
        const text = result.response.text();
        simulationData = cleanJsonResponse(text);
      } catch (err) {
        console.warn('Gemini API call failed during pivot simulation. Using fallback generator:', err);
        simulationData = null;
      }
    } else if (ai.provider === 'openai') {
      try {
        const response = await ai.client.chat.completions.create({
          model: 'gpt-4o-mini',
          messages: [
            { role: 'system', content: SYSTEM_PROMPT_PIVOT_SIMULATION },
            { role: 'user', content: `Startup Title: ${currentStartup?.title}\nShock Scenario: ${customPrompt || shockType}` }
          ],
          response_format: { type: 'json_object' }
        });
        const text = response.choices[0]?.message?.content || '{}';
        simulationData = cleanJsonResponse(text);
      } catch (err) {
        console.warn('OpenAI API call failed during pivot simulation. Using fallback generator:', err);
        simulationData = null;
      }
    }

    if (!simulationData) {
      const mockSim = generateMockSimulationResult(startupId, shockType as MarketShockType, customPrompt);
      simulationData = {
        impactSummary: mockSim.impactSummary,
        pivotedBusinessModel: mockSim.pivotedBusinessModel,
        pivotedTechStack: mockSim.pivotedTechStack,
        pivotedCostBreakdown: mockSim.pivotedCostBreakdown,
        strategicPivots: mockSim.strategicPivots
      };
    }

    const resultPayload = {
      id: `sim-${Date.now()}`,
      startupId,
      shockType,
      shockPrompt: customPrompt || shockType,
      impactSummary: simulationData.impactSummary,
      pivotedBusinessModel: simulationData.pivotedBusinessModel,
      pivotedTechStack: simulationData.pivotedTechStack,
      pivotedCostBreakdown: simulationData.pivotedCostBreakdown,
      strategicPivots: simulationData.strategicPivots,
      createdAt: new Date().toISOString()
    };

    // Attempt DB persistence
    try {
      const supabase: any = await createClient();
      await supabase.from('simulation_runs').insert({
        startup_id: startupId.startsWith('sim-') || startupId.startsWith('startup-') ? null : startupId,
        shock_type: shockType,
        shock_prompt: customPrompt || shockType,
        impact_summary: simulationData.impactSummary,
        pivoted_lean_canvas: simulationData.pivotedBusinessModel,
        pivoted_tech_stack: simulationData.pivotedTechStack,
        pivoted_cost_breakdown: simulationData.pivotedCostBreakdown,
        strategic_pivots: simulationData.strategicPivots
      });
    } catch (dbErr) {
      console.info('Supabase simulation log skipped (client mode):', dbErr);
    }

    return NextResponse.json({
      success: true,
      simulation: resultPayload
    });

  } catch (error: any) {
    console.error('Error in /api/simulate-pivot:', error);
    return NextResponse.json(
      { error: error.message || 'An error occurred during pivot simulation.' },
      { status: 500 }
    );
  }
}
