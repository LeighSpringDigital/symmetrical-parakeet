/**
 * POST /api/generate
 *
 * Server-side AI content generation using Cloudflare Workers AI.
 * FREE — no Anthropic key needed. Uses Llama 3.1 running on Cloudflare's
 * infrastructure, billed against your Workers AI free tier
 * (10,000 neurons/day — more than enough for a pub staff portal).
 *
 * To upgrade to Claude later, swap this file for route-claude.ts.
 * No other files need to change — the response shape is identical.
 *
 * Requires one addition to wrangler.toml:
 *   [ai]
 *   binding = "AI"
 */

import { NextRequest, NextResponse } from 'next/server';

const BRAND_VOICE_SYSTEM = `You are the AI Content Creator for The Old Tiger's Head, a Grade II listed pub at 351 Lee High Road, Lee Green, London SE3 8RU. Established 1750, current building 1896.

RULES — ALWAYS:
- Write in complete, warm sentences. Never fragments or social-media shorthand.
- Name real, specific things: the Sunday roast, Paolo's fish and chips, the jazz quartet.
- Use the word "community" deliberately — it means something here.
- Every response should feel warm, professional, and rooted in the neighbourhood.

RULES — NEVER:
- Never use the word "locals" — it signals exclusion to the exact people we want to attract.
- Never use em dashes.
- Never end a sentence with a preposition.
- Never use the word "proper".
- Never use emojis in formal copy.
- Never use unverifiable superlatives: "best pub in SE3", "award-winning", etc.
- Never use slang or trend-chasing hashtags.

Return only the finished copy. No preamble, no explanation, no quotation marks around the output.`;

export async function POST(request: NextRequest) {
  let ai: any;

  try {
    const { env } = (await import('@opennextjs/cloudflare')).getCloudflareContext();
    ai = (env as any).AI;
  } catch {
    return NextResponse.json(
      { error: 'Workers AI binding not available. Add [ai] binding to wrangler.toml.' },
      { status: 500 }
    );
  }

  if (!ai) {
    return NextResponse.json(
      { error: 'AI binding is undefined. Check wrangler.toml has [ai] with binding = "AI".' },
      { status: 500 }
    );
  }

  let body: {
    messages: Array<{ role: string; content: string }>;
    system?: string;
    max_tokens?: number;
  };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 });
  }

  if (!body.messages?.length) {
    return NextResponse.json({ error: 'messages array is required.' }, { status: 400 });
  }

  const systemPrompt = body.system ?? BRAND_VOICE_SYSTEM;

  try {
    const messages = [
      { role: 'system', content: systemPrompt },
      ...body.messages.map(m => ({ role: m.role, content: m.content })),
    ];

    const response = await ai.run('@cf/meta/llama-3.1-8b-instruct', {
      messages,
      max_tokens: body.max_tokens ?? 1000,
      temperature: 0.7,
    });

    const text = response?.response ?? '';

    if (!text) {
      return NextResponse.json(
        { error: 'Workers AI returned an empty response.' },
        { status: 500 }
      );
    }

    // Same response shape as the Claude version —
    // content page works with either without changes
    return NextResponse.json({
      content: [{ type: 'text', text }],
    });

  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Workers AI request failed.';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
