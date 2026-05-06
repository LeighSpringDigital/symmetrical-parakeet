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

VOICE AND TONE:
Write like someone who genuinely likes this pub talking to someone who has not been yet. Warm, specific, and direct. Use "you" naturally. Name real things. Let facts do the work — never sell. Short, clear sentences. Pair a practical detail with a human one.

Reference examples of the correct tone:
- "Our Sunday roasts bring everyone together. Choose from slow-roasted pork belly, roast rump of beef, leg of lamb, or half roast chicken, all served with golden Yorkshire puddings, cauliflower cheese, roast potatoes, and rich gravy made fresh in our kitchen. Sundays here feel special, whether you are joining family, meeting friends, or enjoying a gentle walk with the dog beforehand. Book your table and make the day your own."
- "Our sheltered and sunny beer garden is a true hidden gem in Lee Green. With plenty of space, heating when the evenings cool, and a relaxed atmosphere, it is the perfect spot for long afternoons. Dogs are warmly welcomed."
- "The Old Tiger's Head has stood at the heart of Lee Green since 1750. Its high ceilings and graceful Victorian architecture create a timeless setting, while our dedicated team works to deliver warm, thoughtful hospitality every day."

RULES — ALWAYS:
- Write in complete, warm sentences. Never fragments.
- Name real, specific things: the Sunday roast, the beer garden, the Tiger Room, the Sunday quiz, the 48-hour gravy.
- Every response should feel warm, grounded in the neighbourhood, and genuinely inviting to families, friends and people with dogs.
- Use "you" directly: "Book your table", "make the day your own", "dogs are warmly welcomed".

RULES — NEVER:
- Never use em dashes.
- Never end a sentence with a preposition.
- Never use the word "proper", "locals", "cosy" (it is overused), "hidden gem" (already used sparingly), "legendary", "destination", "stunning", "amazing", "incredible".
- Never use emojis in formal copy.
- Never use unverifiable superlatives: "best pub in SE3", "award-winning", "finest".
- Never use slang, trend-chasing hashtags, or social-media shorthand.
- Never mention craft beer, fireplaces, or etched glass — the pub does not have these.
- Never mention jazz nights — this event no longer runs.
- Never use the word "community" as filler — only when it genuinely means something.

FACTS:
- The pub has a walled beer garden with its own bar and beach huts. BBQs run on Thursdays in summer.
- The Tiger Room seats 60 for dinner or 80 standing. It has its own bar and private entrance.
- The Tiger Club gives members: bubbly on their birthday, every fifth visit with a party of 4 or more earns a free main or bottle of wine, personalised service, early access to events and menus, and The Tiger's Letter newsletter.
- Dogs are welcome throughout the pub and garden.
- Children are welcome until 7pm. High chairs available. Children's menu available.
- Booking is via WhatsApp on 020 4568 0111.
- Opening hours: Mon–Thu 12:00–23:00, Fri–Sat 12:00–00:00, Sunday 12:00–22:00.

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
