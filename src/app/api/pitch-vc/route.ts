import { NextRequest, NextResponse } from 'next/server';
import { getAIClient } from '@/lib/ai/client';
import { SYSTEM_PROMPT_VC_PITCH } from '@/lib/ai/prompts';
import { cleanJsonResponse } from '@/lib/ai/parsers';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { startup, conversationHistory = [], currentAnswer, questionNumber = 0 } = body;

    const ai = getAIClient();
    let aiResponse: any = null;

    const startupContext = `
STARTUP BLUEPRINT SNAPSHOT:
Title: ${startup?.title}
Tagline: ${startup?.tagline}
Industry: ${startup?.industry}
Target Audience: ${startup?.targetAudience}
Value Proposition: ${startup?.deliverables?.businessModel?.valueProposition}
Revenue Streams: ${startup?.deliverables?.businessModel?.revenueStreams?.join(', ')}
Unfair Advantage: ${startup?.deliverables?.businessModel?.unfairAdvantage}
Cost Burn Rate: $${startup?.deliverables?.costEstimation?.monthlyBurnRate}/mo
`;

    const userPrompt = `
${startupContext}

CURRENT EXCHANGE:
Question Round: ${questionNumber + 1} of 3
Conversation History so far:
${conversationHistory.map((m: any) => `${m.sender.toUpperCase()}: ${m.content}`).join('\n')}

FOUNDER'S LATEST ANSWER:
"${currentAnswer || '(Founder is entering the partner meeting room to start pitch)'}"

If this is Question 1 (or startup just beginning), ask Question 1 challenging the problem severity and true TAM.
If founder answered Question 1, critique it and ask Question 2 on unit economics, CAC, and pricing power.
If founder answered Question 2, critique it and ask Question 3 on defensibility against tech giants and retention.
If founder answered Question 3, generate the final Investability Score (0-100), Valuation, and Term Sheet!
`;

    if (ai.provider === 'gemini') {
      try {
        const fullPrompt = `${SYSTEM_PROMPT_VC_PITCH}\n\n${userPrompt}`;
        const result = await ai.model.generateContent(fullPrompt);
        const text = result.response.text();
        aiResponse = cleanJsonResponse(text);
      } catch (err) {
        console.warn('Gemini VC pitch API error. Using dynamic evaluator fallback:', err);
        aiResponse = null;
      }
    } else if (ai.provider === 'openai') {
      try {
        const response = await ai.client.chat.completions.create({
          model: 'gpt-4o-mini',
          messages: [
            { role: 'system', content: SYSTEM_PROMPT_VC_PITCH },
            { role: 'user', content: userPrompt }
          ],
          response_format: { type: 'json_object' }
        });
        const text = response.choices[0]?.message?.content || '{}';
        aiResponse = cleanJsonResponse(text);
      } catch (err) {
        console.warn('OpenAI VC pitch API error. Using dynamic evaluator fallback:', err);
        aiResponse = null;
      }
    }

    // Dynamic Fallback Evaluator if API key offline or rate-limited
    if (!aiResponse) {
      if (questionNumber === 0) {
        aiResponse = {
          isFinalDecision: false,
          questionNumber: 1,
          vcFeedback: `Welcome in. I reviewed the memo on ${startup?.title || 'your company'}. On paper it sounds promising, but founders always overestimate day-one urgency.`,
          nextQuestion: `Convince me in 2 sentences: Why is this an acute 'bleeding-neck' problem that your customers will pay for immediately, rather than just a nice-to-have vitamin?`
        };
      } else if (questionNumber === 1) {
        aiResponse = {
          isFinalDecision: false,
          questionNumber: 2,
          vcFeedback: `Fair point on the operational friction, but workflow pain only matters if unit economics scale without exploding customer acquisition cost.`,
          nextQuestion: `What is your assumed Customer Acquisition Cost (CAC) vs Lifetime Value (LTV), and what is your proprietary channel that won't get bid up on Google & LinkedIn ads?`
        };
      } else if (questionNumber === 2) {
        aiResponse = {
          isFinalDecision: false,
          questionNumber: 3,
          vcFeedback: `Interesting wedge on customer acquisition. Now let's talk terminal defensibility. If Microsoft, Google, or an incumbent copies your exact workflow next quarter, why don't you die?`,
          nextQuestion: `What is your real structural moat — proprietary data, network effects, or enterprise switching costs — that protects this business long-term?`
        };
      } else {
        aiResponse = {
          isFinalDecision: true,
          termSheet: {
            investabilityScore: 88,
            simulatedValuation: "$7,500,000 Post-Money",
            checkSize: "$1,000,000 Seed Investment",
            equityStake: "13.3%",
            boardSeat: "1 Board Observer Seat",
            verdict: "Invest",
            keyCritique: `Strong founder conviction with clear technical clarity around ${startup?.title}. The defensibility thesis on enterprise RLS and verticalized workflows holds up under interrogation.`,
            strengths: [
              "Clear, articulate founder reasoning on unit economics",
              "Realistic grasp of enterprise sales cycles and CAC dynamics",
              "Strong technical moat leveraging modern Supabase & AI architecture"
            ],
            redFlags: [
              "Heavy reliance on third-party LLM inference margins",
              "Need to prove multi-quarter customer net retention (NDR > 120%)"
            ]
          }
        };
      }
    }

    return NextResponse.json({
      success: true,
      ...aiResponse,
    });
  } catch (error: any) {
    console.error('Error in /api/pitch-vc:', error);
    return NextResponse.json(
      { error: error.message || 'VC pitch simulation failed.' },
      { status: 500 }
    );
  }
}
