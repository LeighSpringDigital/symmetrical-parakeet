import { NextRequest, NextResponse } from "next/server";
import { getOptionalRequestContext } from "@/lib/cloudflare-shim";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const { system, user } = await req.json();
    if (!system || !user) {
      return NextResponse.json({ error: "Missing prompt" }, { status: 400 });
    }

    const context = getOptionalRequestContext();
    const ai = (context?.env as any)?.AI;

    if (!ai) {
      return NextResponse.json({ error: "AI binding not available" }, { status: 503 });
    }

    const response = await ai.run("@cf/meta/llama-3.3-70b-instruct-fp8-fast", {
      messages: [
        { role: "system", content: system },
        { role: "user", content: user },
      ],
      max_tokens: 1000,
    });

    return NextResponse.json({ text: response.response ?? "" });
  } catch (e) {
    console.error("AI generation error:", e);
    return NextResponse.json({ error: "Generation failed" }, { status: 500 });
  }
}
