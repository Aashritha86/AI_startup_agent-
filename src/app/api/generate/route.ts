import { NextRequest, NextResponse } from 'next/server';
import { getAIClient } from '@/lib/ai/client';
import { SYSTEM_PROMPT_STARTUP_GENERATION } from '@/lib/ai/prompts';
import { cleanJsonResponse, generateMockDeliverables } from '@/lib/ai/parsers';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { description, targetMarket, category, budget } = body;

    if (!description || typeof description !== 'string' || description.trim().length < 5) {
      return NextResponse.json(
        { error: 'Please provide a valid startup idea description (at least 5 characters).' },
        { status: 400 }
      );
    }

    const trimmedDesc = description.trim();
    const ai = getAIClient();
    let generatedData: any = null;

    const dynamicUserPrompt = `
=== USER'S UNIQUE STARTUP IDEA ===
Description: "${trimmedDesc}"
Target Market / Region: "${targetMarket || 'Global'}"
Category: "${category || 'B2B SaaS'}"
Target Budget: "${budget || '$10,000 - $50,000'}"
===================================

MANDATORY GENERATION DIRECTIVE:
1. Formulate an authentic, creative brand name specifically relevant to "${trimmedDesc}". Do NOT name it "NexusAI" or "Startup Name".
2. All deliverables (Business Model, Competitors, Tech Stack, SQL Schema with Supabase RLS, Cost Engine, Pitch Deck, Landing Page, and VC Devil's Advocate Critique) MUST directly reflect the exact domain of "${trimmedDesc}".
3. Output valid JSON adhering strictly to the JSON schema.`;

    if (ai.provider === 'gemini') {
      try {
        console.log(`[API /api/generate] Invoking Gemini 1.5 Flash for idea: "${trimmedDesc.slice(0, 60)}..."`);
        const fullPrompt = `${SYSTEM_PROMPT_STARTUP_GENERATION}\n\n${dynamicUserPrompt}`;
        const result = await ai.model.generateContent(fullPrompt);
        const text = result.response.text();
        generatedData = cleanJsonResponse(text);
        console.log(`[API /api/generate] Gemini generation succeeded for "${generatedData?.title}"`);
      } catch (err) {
        console.warn('[API /api/generate] Gemini API call error. Falling back to dynamic domain synthesizer:', err);
        generatedData = null;
      }
    } else if (ai.provider === 'openai') {
      try {
        console.log(`[API /api/generate] Invoking OpenAI gpt-4o-mini for idea: "${trimmedDesc.slice(0, 60)}..."`);
        const response = await ai.client.chat.completions.create({
          model: 'gpt-4o-mini',
          messages: [
            { role: 'system', content: SYSTEM_PROMPT_STARTUP_GENERATION },
            { role: 'user', content: dynamicUserPrompt }
          ],
          response_format: { type: 'json_object' }
        });
        const text = response.choices[0]?.message?.content || '{}';
        generatedData = cleanJsonResponse(text);
        console.log(`[API /api/generate] OpenAI generation succeeded for "${generatedData?.title}"`);
      } catch (err) {
        console.warn('[API /api/generate] OpenAI API call error. Falling back to dynamic domain synthesizer:', err);
        generatedData = null;
      }
    }

    // Fallback if AI provider wasn't available or errored out
    if (!generatedData) {
      const mockResult = generateMockDeliverables(trimmedDesc);
      generatedData = {
        title: mockResult.title,
        tagline: mockResult.tagline,
        industry: mockResult.industry,
        targetAudience: mockResult.targetAudience,
        ...mockResult.deliverables
      };
    }

    // Extract root properties and deliverables payload
    const {
      title = "NexusAI",
      tagline = "Automated AI Startup Platform",
      industry = category || "Technology SaaS",
      targetAudience = targetMarket || "Founders & Engineers",
      businessModel,
      competitorAnalysis,
      uiWireframe,
      techStack,
      databaseSchema,
      costEstimation,
      marketingPlan,
      pitchDeck,
      landingPage,
      devilsAdvocateCritique
    } = generatedData;

    const deliverables = {
      businessModel,
      competitorAnalysis,
      uiWireframe,
      techStack,
      databaseSchema,
      costEstimation,
      marketingPlan,
      pitchDeck,
      landingPage,
      devilsAdvocateCritique
    };

    // Attempt to persist in Supabase if configured
    let startupId = `startup-${Date.now()}`;
    try {
      const supabase: any = await createClient();
      const { data: { user } } = await supabase.auth.getUser();

      const { data: startupRecord, error: startupErr } = await supabase
        .from('startups')
        .insert({
          user_id: user?.id || null,
          title,
          tagline,
          description: trimmedDesc,
          industry,
          target_audience: targetAudience,
        })
        .select()
        .single();

      if (startupRecord && !startupErr) {
        startupId = startupRecord.id;

        await supabase.from('deliverables').insert({
          startup_id: startupId,
          business_model: businessModel,
          competitor_matrix: competitorAnalysis,
          ui_wireframe: uiWireframe,
          tech_stack: techStack,
          database_schema: databaseSchema,
          cost_estimation: costEstimation,
          marketing_plan: marketingPlan,
          pitch_deck: pitchDeck,
          landing_page: landingPage,
        });

        // Also persist in startup_blueprints table if exists
        try {
          await supabase.from('startup_blueprints').insert({
            startup_id: startupId,
            lean_canvas: businessModel,
            tech_stack: techStack,
            db_schema_sql: databaseSchema?.sqlDDL,
            competitors: competitorAnalysis?.competitors,
            financials: costEstimation,
            pitch_deck: pitchDeck?.slides,
            app_code: generatedData?.generatedAppCode || {},
            devils_advocate: devilsAdvocateCritique || {}
          });
        } catch (bpErr) {
          console.info('startup_blueprints table insert skipped:', bpErr);
        }
      }
    } catch (dbErr) {
      console.info('Supabase database insert skipped (running in client/offline mode):', dbErr);
    }

    return NextResponse.json({
      success: true,
      startup: {
        id: startupId,
        title,
        tagline,
        description: trimmedDesc,
        industry,
        targetAudience,
        targetMarket: targetMarket || 'Global',
        category: category || 'B2B SaaS',
        budget: budget || '$10,000 - $50,000',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        deliverables
      }
    });

  } catch (error: any) {
    console.error('Error in /api/generate:', error);
    return NextResponse.json(
      { error: error.message || 'An error occurred while generating the startup blueprint.' },
      { status: 500 }
    );
  }
}
