"use client";

import { useState } from "react";
import { Sparkles, Copy, Check, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

const PILLARS = [
  {
    id: "food",
    label: "Food & Drink",
    icon: "🍺",
    desc: "Strongest sellers — Sunday roast, fish & chips, beer garden BBQ, drinks.",
    prompts: ["Sunday roast feature", "Fish & chips", "Beer garden BBQ", "New dish on the menu", "Drinks special"],
  },
  {
    id: "people",
    label: "People & Atmosphere",
    icon: "🐯",
    desc: "The room and the crowd — the team, the regulars, the space.",
    prompts: ["Behind the bar", "Meet the team", "A quiet midweek afternoon", "Friday night atmosphere", "The greyhound"],
  },
  {
    id: "events",
    label: "Events & Offers",
    icon: "📅",
    desc: "The reason to visit — what's on, why now, why here.",
    prompts: ["Quiz night", "Comedy night", "Live sport", "Tiger Club members event", "Garden BBQ Saturday"],
  },
];

const FORMATS = [
  { id: "instagram", label: "Instagram caption" },
  { id: "facebook", label: "Facebook post" },
  { id: "google", label: "Google Business update" },
  { id: "review", label: "Review response" },
];

export default function ContentCreator() {
  const [pillar, setPillar] = useState("");
  const [topic, setTopic] = useState("");
  const [customTopic, setCustomTopic] = useState("");
  const [format, setFormat] = useState("instagram");
  const [extra, setExtra] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const router = useRouter();

  const selectedPillar = PILLARS.find(p => p.id === pillar);

  const generate = async () => {
    const finalTopic = topic === "custom" ? customTopic : topic;
    if (!pillar || !finalTopic) return;
    setLoading(true);
    setResult("");

    const systemPrompt = `You write social media content for The Old Tiger's Head, a Grade II listed community pub in Lee Green, London SE12, established 1750.

Brand voice rules:
- Warm, direct, and confident. Never pretentious or salesy.
- Speak as a team to a valued neighbour who has a stake in the pub.
- Name real things: the Sunday roast, the beer garden, the Tiger Room.
- Never use: "locals", "hidden gem", "cosy", "vibrant", clichés.
- Never mention discounts or deals unless specifically asked.
- Complete sentences. No fragments. No excessive punctuation.
- For Instagram: end with 2-3 relevant hashtags maximum (#LeeGreen #SE12 #OldTigersHead).

Content pillar: ${selectedPillar?.label}
Format: ${format}`;

    const userPrompt = `Write a ${format} about: ${finalTopic}.${extra ? ` Additional context: ${extra}` : ""}`;

    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: systemPrompt,
          messages: [{ role: "user", content: userPrompt }],
        }),
      });
      const data = await res.json();
      const text = data.content?.map((b: any) => b.text || "").join("") || "No response — please try again.";
      setResult(text);
    } catch {
      setResult("Something went wrong. Please try again.");
    }
    setLoading(false);
  };

  const copy = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="min-h-screen bg-navy text-white pt-24 px-6 pb-20">
      <div className="max-w-3xl mx-auto">

        <div className="flex justify-between items-start mb-12">
          <div>
            <p className="text-gold text-xs font-black tracking-[0.4em] uppercase mb-2">Staff Portal</p>
            <h1 className="text-3xl md:text-5xl font-black uppercase sc">Content Creator</h1>
          </div>
          <button onClick={() => router.push("/staff")}
            className="flex items-center gap-2 text-white/30 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest">
            <LogOut size={14} /> Sign out
          </button>
        </div>

        <div className="space-y-8">

          {/* Step 1: Pillar */}
          <div>
            <p className="text-gold text-xs font-black tracking-widest uppercase mb-4 sc">1. Choose a content pillar</p>
            <div className="grid grid-cols-3 gap-3">
              {PILLARS.map(p => (
                <button key={p.id} onClick={() => { setPillar(p.id); setTopic(""); }}
                  className={`p-4 border-2 text-left transition-all ${pillar === p.id ? "border-gold bg-gold/10" : "border-white/10 hover:border-white/30"}`}>
                  <span className="text-2xl block mb-2">{p.icon}</span>
                  <span className="text-xs font-black uppercase tracking-wider text-white block sc">{p.label}</span>
                  <span className="text-white/40 text-[10px] mt-1 block">{p.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Topic */}
          {selectedPillar && (
            <div>
              <p className="text-gold text-xs font-black tracking-widest uppercase mb-4 sc">2. What's the post about?</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {selectedPillar.prompts.map(p => (
                  <button key={p} onClick={() => setTopic(p)}
                    className={`px-4 py-2 border text-xs font-bold uppercase tracking-wider transition-all ${topic === p ? "border-gold bg-gold text-navy" : "border-white/20 text-white/60 hover:border-white/50"}`}>
                    {p}
                  </button>
                ))}
                <button onClick={() => setTopic("custom")}
                  className={`px-4 py-2 border text-xs font-bold uppercase tracking-wider transition-all ${topic === "custom" ? "border-gold bg-gold text-navy" : "border-white/20 text-white/60 hover:border-white/50"}`}>
                  Custom…
                </button>
              </div>
              {topic === "custom" && (
                <input type="text" value={customTopic} onChange={e => setCustomTopic(e.target.value)}
                  placeholder="Describe what you want to post about…"
                  className="w-full bg-white/5 border border-white/20 text-white px-4 py-3 focus:outline-none focus:border-gold transition-colors text-sm" />
              )}
            </div>
          )}

          {/* Step 3: Format */}
          {topic && (
            <div>
              <p className="text-gold text-xs font-black tracking-widest uppercase mb-4 sc">3. Format</p>
              <div className="flex flex-wrap gap-2">
                {FORMATS.map(f => (
                  <button key={f.id} onClick={() => setFormat(f.id)}
                    className={`px-4 py-2 border text-xs font-bold uppercase tracking-wider transition-all ${format === f.id ? "border-gold bg-gold text-navy" : "border-white/20 text-white/60 hover:border-white/50"}`}>
                    {f.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Extra context */}
          {topic && (
            <div>
              <p className="text-gold text-xs font-black tracking-widest uppercase mb-4 sc">4. Anything to add? <span className="text-white/30 normal-case">(optional)</span></p>
              <input type="text" value={extra} onChange={e => setExtra(e.target.value)}
                placeholder="e.g. It's a bank holiday weekend / We still have tables available…"
                className="w-full bg-white/5 border border-white/20 text-white px-4 py-3 focus:outline-none focus:border-gold transition-colors text-sm" />
            </div>
          )}

          {/* Generate */}
          {topic && (
            <button onClick={generate} disabled={loading}
              className="w-full bg-gold text-navy font-black tracking-widest py-4 uppercase hover:bg-white transition-colors flex items-center justify-center gap-3 disabled:opacity-50 sc">
              <Sparkles size={18} />
              {loading ? "Writing…" : "Generate Content"}
            </button>
          )}

          {/* Result */}
          {result && (
            <div className="border border-gold/30 bg-white/5 p-6 relative">
              <p className="text-white/90 text-sm leading-relaxed whitespace-pre-wrap">{result}</p>
              <button onClick={copy}
                className="absolute top-4 right-4 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/40 hover:text-gold transition-colors">
                {copied ? <><Check size={14} /> Copied</> : <><Copy size={14} /> Copy</>}
              </button>
              <div className="mt-6 pt-4 border-t border-white/10 flex gap-3">
                <button onClick={generate}
                  className="text-xs font-bold uppercase tracking-widest text-white/40 hover:text-gold transition-colors">
                  Regenerate
                </button>
              </div>
              <p className="text-white/20 text-[10px] mt-4 uppercase tracking-widest">
                All content requires Rob's approval before posting.
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
