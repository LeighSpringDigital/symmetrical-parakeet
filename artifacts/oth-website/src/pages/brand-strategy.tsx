import React, { useEffect } from "react";
import { ArrowLeft, Target, Users, BarChart2, Map, Zap, Star } from "lucide-react";

const NAVY = "#002942";
const GOLD = "#C9A227";
const FONT = "'Century Gothic', 'CenturyGothic', 'AppleGothic', sans-serif";

function GoldFrame({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`border-2 p-6 md:p-8 ${className}`}
      style={{ borderColor: GOLD }}
    >
      {children}
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[9px] tracking-[0.55em] uppercase font-black mb-3" style={{ color: GOLD }}>
      {children}
    </p>
  );
}

function SectionHeading({ children, icon: Icon }: { children: React.ReactNode; icon?: React.ElementType }) {
  return (
    <div className="flex items-center gap-3 mb-8">
      {Icon && <Icon size={20} style={{ color: GOLD }} strokeWidth={1.5} />}
      <h2 className="text-2xl md:text-3xl font-black uppercase tracking-wide text-white" style={{ fontFamily: FONT }}>
        {children}
      </h2>
    </div>
  );
}

function FramedPoint({ label, value }: { label: string; value: string }) {
  return (
    <div className="py-5 px-6 border-l-2" style={{ borderColor: GOLD, backgroundColor: "rgba(201,162,39,0.06)" }}>
      <p className="text-[8px] tracking-[0.5em] uppercase font-black mb-2" style={{ color: GOLD }}>{label}</p>
      <p className="text-white/90 text-sm leading-relaxed">{value}</p>
    </div>
  );
}

function KpiCard({ stat, label }: { stat: string; label: string }) {
  return (
    <div className="border border-white/10 p-5 text-center hover:border-[#C9A227] transition-colors" style={{ backgroundColor: "rgba(255,255,255,0.03)" }}>
      <div className="text-2xl md:text-3xl font-black mb-2" style={{ color: GOLD, fontFamily: FONT }}>{stat}</div>
      <div className="text-white/60 text-[10px] tracking-[0.3em] uppercase leading-relaxed">{label}</div>
    </div>
  );
}

function RoadmapStep({ week, action, index }: { week: string; action: string; index: number }) {
  return (
    <div className="flex gap-4 items-start">
      <div className="flex-shrink-0 flex flex-col items-center">
        <div className="w-9 h-9 flex items-center justify-center font-black text-sm" style={{ backgroundColor: GOLD, color: NAVY, fontFamily: FONT }}>
          {index + 1}
        </div>
        {index < 4 && <div className="w-px flex-1 mt-1" style={{ backgroundColor: "rgba(201,162,39,0.25)", minHeight: "2.5rem" }} />}
      </div>
      <div className="pb-6">
        <p className="text-[9px] tracking-[0.4em] uppercase font-black mb-1" style={{ color: GOLD }}>{week}</p>
        <p className="text-white/85 text-sm leading-relaxed">{action}</p>
      </div>
    </div>
  );
}

export default function BrandStrategy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ backgroundColor: NAVY, minHeight: "100vh", fontFamily: FONT }}>

      {/* ── TOP NAV BAR ─────────────────────────────── */}
      <div className="sticky top-0 z-20 border-b border-white/10" style={{ backgroundColor: NAVY }}>
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <a
            href="/"
            className="flex items-center gap-2 text-white/60 hover:text-white transition-colors text-xs tracking-widest uppercase font-black"
          >
            <ArrowLeft size={15} />
            Back to Site
          </a>
          <div className="text-[10px] tracking-[0.5em] uppercase font-black" style={{ color: GOLD }}>
            The Old Tigers Head
          </div>
          <div className="text-white/25 text-[9px] tracking-widest uppercase">April 2026</div>
        </div>
      </div>

      {/* ── COVER ───────────────────────────────────── */}
      <div className="border-b border-white/10" style={{ background: `linear-gradient(135deg, #001e30 0%, #002942 60%, #003a5c 100%)` }}>
        <div className="max-w-5xl mx-auto px-6 py-20 md:py-28">
          <p className="text-[9px] tracking-[0.6em] uppercase font-black mb-6" style={{ color: GOLD }}>
            Confidential · Internal Use Only
          </p>
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-wide text-white leading-[1.05] mb-6" style={{ fontFamily: FONT }}>
            Foundational<br />Brand Strategy
          </h1>
          <div className="w-16 h-0.5 mb-8" style={{ backgroundColor: GOLD }} />
          <p className="text-white/55 text-sm leading-relaxed max-w-xl">
            This document defines the brand for The Old Tiger's Head, examines the pub's current micro and macro environment, identifies target demographics and their buying behaviour, and outlines a targeted digital strategy to attract new customers, grow loyal regulars and achieve revenue targets.
          </p>
        </div>
      </div>

      {/* ── MAIN CONTENT ────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-6 py-16 space-y-20">

        {/* ── BRAND POSITIONING ───────────────────── */}
        <section id="positioning">
          <SectionLabel>01 / Brand</SectionLabel>
          <SectionHeading icon={Target}>Brand Positioning</SectionHeading>

          <GoldFrame className="mb-8">
            <p className="text-[8px] tracking-[0.5em] uppercase font-black mb-3" style={{ color: GOLD }}>Positioning Statement</p>
            <p className="text-white text-xl md:text-2xl font-black leading-snug" style={{ fontFamily: FONT }}>
              The undisputed High-Trust Social Anchor of Lee Green — the permanent, professionally run neighbourhood hub for SE3's primary spenders.
            </p>
          </GoldFrame>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FramedPoint
              label="Brand Identity"
              value="The Epicentre of the Neighbourhood."
            />
            <FramedPoint
              label="Core Promise"
              value="A zero-failure social environment where quality and service standards are as reliable as the 1908 building itself."
            />
            <FramedPoint
              label="USP"
              value="Intersection of heritage and modern hospitality delivered through forensic stewardship and a 15-year lease commitment."
            />
            <FramedPoint
              label="Brand Voice"
              value="Warm, factual and transparent. Every communication signals professional standards and social ownership."
            />
          </div>
        </section>

        {/* ── TARGET MARKET ───────────────────────── */}
        <section id="target">
          <SectionLabel>02 / Audience</SectionLabel>
          <SectionHeading icon={Users}>Target Market &amp; Buying Behaviour</SectionHeading>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <GoldFrame className="md:col-span-3">
              <p className="text-[8px] tracking-[0.5em] uppercase font-black mb-3" style={{ color: GOLD }}>Primary Target — The Anchored Professional</p>
              <p className="text-white/85 text-sm leading-relaxed">
                Middle-class women aged <span className="text-white font-black">46–52</span> with household incomes of <span className="text-white font-black">£140k+</span>, owning Victorian terraces or semis in Lee Manor and Burnt Ash. These professional homeowner women act as social decision-makers — they control <span className="text-white font-black">68% of household leisure spend</span> in SE3 and determine venue choice for Sunday roasts, mid-week wine and group events.
              </p>
            </GoldFrame>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FramedPoint
              label="Buying Priority"
              value="Social reliability. They seek environments that guarantee safety, consistent quality and a professional atmosphere aligned with their standards."
            />
            <FramedPoint
              label="Value Driver"
              value="Sophisticated convenience — premium experiences within walking distance — over price alone. They expect to feel known before arrival."
            />
            <FramedPoint
              label="Barrier to Entry"
              value="They reject opaque venues and default to Blackheath when interiors and standards cannot be assessed online."
            />
            <FramedPoint
              label="Loyalty Trigger"
              value="Once trust is established, they become vocal advocates, driving group bookings and word-of-mouth across the demographic cluster."
            />
          </div>
        </section>

        {/* ── ENVIRONMENT ─────────────────────────── */}
        <section id="environment">
          <SectionLabel>03 / Context</SectionLabel>
          <SectionHeading icon={Map}>Micro &amp; Macro Environment</SectionHeading>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-0">
              <div className="py-3 px-5 font-black text-xs tracking-widest uppercase" style={{ backgroundColor: GOLD, color: NAVY }}>
                Micro Environment
              </div>
              <div className="border border-white/10 p-6 space-y-4" style={{ backgroundColor: "rgba(255,255,255,0.02)" }}>
                <p className="text-white/80 text-sm leading-relaxed">
                  The pub occupies a dominant Grade II listed position at the Lee Green crossroads. The building is structurally sound with constant footfall. However:
                </p>
                <ul className="space-y-2">
                  {[
                    "Enclosed exterior creates an invisibility barrier",
                    "Digital assets remain at placeholder level",
                    "Google Business Profile photos show legacy clientele",
                    "No website or CRM — first-time visitors cannot assess the interior",
                    "Reputation actively suppressed by prior management reviews",
                  ].map((item) => (
                    <li key={item} className="flex gap-3 text-sm text-white/70">
                      <span className="mt-1.5 flex-shrink-0 w-1 h-1 rounded-full" style={{ backgroundColor: GOLD }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="space-y-0">
              <div className="py-3 px-5 font-black text-xs tracking-widest uppercase border" style={{ backgroundColor: "transparent", color: GOLD, borderColor: GOLD }}>
                Macro Environment
              </div>
              <div className="border border-t-0 border-white/10 p-6 space-y-4" style={{ backgroundColor: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.1)" }}>
                <p className="text-white/80 text-sm leading-relaxed">
                  Lee Green functions as a busy transit junction rather than a destination. Key pressures:
                </p>
                <ul className="space-y-2">
                  {[
                    "40–60 demographic drives past to Blackheath — local options appear opaque",
                    "Energy costs +14%, wages projected +6.2% in 2026",
                    "Greater emphasis needed on high-margin, loyal custom",
                    "Competitors rely on food photography — no pre-visit transparency",
                    "No competitor targets social decision-makers directly",
                  ].map((item) => (
                    <li key={item} className="flex gap-3 text-sm text-white/70">
                      <span className="mt-1.5 flex-shrink-0 w-1 h-1 rounded-full" style={{ backgroundColor: GOLD }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ── DIGITAL STRATEGY ────────────────────── */}
        <section id="digital">
          <SectionLabel>04 / Strategy</SectionLabel>
          <SectionHeading icon={Zap}>Targeted Digital Strategy</SectionHeading>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <GoldFrame>
              <p className="text-[8px] tracking-[0.5em] uppercase font-black mb-4" style={{ color: GOLD }}>Layer 1 — Core Transparency</p>
              <p className="text-white/50 text-[9px] tracking-[0.3em] uppercase mb-3">Ongoing</p>
              <ul className="space-y-2">
                {[
                  "New website and Google Business Profile",
                  "Live atmosphere videos",
                  "Interactive technical menus",
                  "Meet the Team portal",
                  "Frictionless booking with Local Intelligence Log",
                  "Clean brand voice — proof of professional standards",
                ].map((item) => (
                  <li key={item} className="flex gap-3 text-sm text-white/80">
                    <span className="mt-1.5 flex-shrink-0 w-1.5 h-1.5" style={{ backgroundColor: GOLD }} />
                    {item}
                  </li>
                ))}
              </ul>
            </GoldFrame>

            <div className="border border-white/15 p-6 md:p-8" style={{ backgroundColor: "rgba(255,255,255,0.03)" }}>
              <p className="text-[8px] tracking-[0.5em] uppercase font-black mb-4 text-white/60">Layer 2 — Operational Audit Protocol</p>
              <p className="text-white/50 text-[9px] tracking-[0.3em] uppercase mb-3">90-Day Campaign · May – July 2026</p>
              <ul className="space-y-2">
                {[
                  "Standalone promotional series with isolated creative execution",
                  "Chief Systems Auditor scripts",
                  "Fibreglass Steward and greyhound material",
                  "Runs separately — main brand voice stays professional",
                  "2-mile radius advertising with first-time calibration incentive",
                ].map((item) => (
                  <li key={item} className="flex gap-3 text-sm text-white/65">
                    <span className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 border border-white/30" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="p-5 text-sm text-white/60 leading-relaxed border-l-2" style={{ borderColor: "rgba(201,162,39,0.35)", backgroundColor: "rgba(201,162,39,0.04)" }}>
            The combined approach attracts new customers through 2-mile radius advertising, converts them via transparency and turns them into loyal regulars through the Tigers Pride programme.
          </div>
        </section>

        {/* ── TIGERS PRIDE ────────────────────────── */}
        <section id="loyalty">
          <SectionLabel>05 / Loyalty</SectionLabel>
          <SectionHeading icon={Star}>Tigers Pride Programme</SectionHeading>

          <GoldFrame className="mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <p className="text-[8px] tracking-[0.5em] uppercase font-black mb-2" style={{ color: GOLD }}>Platform</p>
                <p className="text-white text-sm leading-relaxed">WhatsApp-based system designed for social decision-makers.</p>
              </div>
              <div>
                <p className="text-[8px] tracking-[0.5em] uppercase font-black mb-2" style={{ color: GOLD }}>Year 1 Target</p>
                <p className="text-white text-3xl font-black" style={{ fontFamily: FONT }}>1,200</p>
                <p className="text-white/55 text-xs mt-1">members enrolled</p>
              </div>
              <div>
                <p className="text-[8px] tracking-[0.5em] uppercase font-black mb-2" style={{ color: GOLD }}>Projected Revenue</p>
                <p className="text-white text-3xl font-black" style={{ fontFamily: FONT }}>£87k</p>
                <p className="text-white/55 text-xs mt-1">incremental at 22% margin</p>
              </div>
            </div>
          </GoldFrame>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FramedPoint label="Benefit 1" value="Priority booking — guaranteed tables for social decision-makers planning group events." />
            <FramedPoint label="Benefit 2" value="Personalised local updates — curated What's On content delivered directly to their phone." />
            <FramedPoint label="Benefit 3" value="Complimentary drink upgrade on the first visit — converts trial into loyal custom." />
          </div>
        </section>

        {/* ── KPIs ────────────────────────────────── */}
        <section id="kpis">
          <SectionLabel>06 / Measurement</SectionLabel>
          <SectionHeading icon={BarChart2}>Key Performance Indicators</SectionHeading>

          <div className="mb-4 text-white/45 text-[10px] tracking-widest uppercase">All KPIs tracked weekly against April 2026 baseline</div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <KpiCard stat="55%" label="Female-led bookings within 90 days (from 31%)" />
            <KpiCard stat="+25%" label="Sunday pre-booked covers" />
            <KpiCard stat="40%" label="First-time locals who return within 7 days" />
            <KpiCard stat="18/mo" label="New 4.5+ star Google reviews, 90% replied to warmly" />
            <KpiCard stat="8%" label="Average social media engagement rate" />
            <KpiCard stat="+18%" label="Tiger Room revenue per cover" />
          </div>
        </section>

        {/* ── ROADMAP ─────────────────────────────── */}
        <section id="roadmap">
          <SectionLabel>07 / Execution</SectionLabel>
          <SectionHeading>Implementation Roadmap</SectionHeading>

          <div className="border border-white/10 p-8" style={{ backgroundColor: "rgba(255,255,255,0.02)" }}>
            {[
              { week: "Weeks 1–2", action: "Launch new website with live videos and easy booking. Complete Google Business Profile cleanup — remove legacy content and replace with current atmosphere imagery." },
              { week: "Week 3", action: "Activate Tigers Pride WhatsApp programme. Begin Operational Audit Reels as the isolated creative layer." },
              { week: "Week 4 onwards", action: "Full execution of both digital layers — Core Transparency running continuously, Audit Protocol driving acquisition through 2-mile radius paid targeting." },
              { week: "30-Day Review", action: "Assess all KPIs against April 2026 baseline. Adjust any element not meeting targets. Expand what is working without delay." },
              { week: "May – July 2026", action: "Complete 90-day Operational Audit Protocol campaign. Measure conversion from first-time visitor to loyal regular. Begin planning Tigers Pride Year 1 milestone event." },
            ].map((step, i) => (
              <RoadmapStep key={step.week} week={step.week} action={step.action} index={i} />
            ))}
          </div>
        </section>

        {/* ── FOOTER NOTE ─────────────────────────── */}
        <div className="border-t border-white/10 pt-10 pb-4">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <p className="font-black text-sm uppercase tracking-widest mb-1" style={{ color: GOLD, fontFamily: FONT }}>The Old Tigers Head</p>
              <p className="text-white/35 text-xs">351 Lee High Road, London SE3 8RU · Est. 1750</p>
            </div>
            <a
              href="/"
              className="flex items-center gap-2 text-xs font-black tracking-[0.2em] uppercase px-6 py-3 transition-all hover:brightness-90"
              style={{ backgroundColor: GOLD, color: NAVY, fontFamily: FONT }}
            >
              <ArrowLeft size={13} />
              Back to Site
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
