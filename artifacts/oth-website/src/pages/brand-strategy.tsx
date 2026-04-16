import React, { useEffect } from "react";
import { ArrowLeft, Printer } from "lucide-react";

const NAVY = "#002942";
const GOLD = "#C9A227";
const CREAM = "#FAF8F3";
const FONT = "'Century Gothic', 'CenturyGothic', 'AppleGothic', sans-serif";

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-10 mb-4">
      <h2
        style={{
          fontFamily: FONT,
          color: NAVY,
          fontSize: "1.2rem",
          fontWeight: 800,
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          borderBottom: `2px solid ${GOLD}`,
          paddingBottom: "0.4rem",
          marginBottom: "0.75rem",
        }}
      >
        {children}
      </h2>
    </div>
  );
}

function Callout({ children, label }: { children: React.ReactNode; label?: string }) {
  return (
    <div
      className="my-5"
      style={{
        border: `1.5px solid ${GOLD}`,
        borderLeft: `5px solid ${GOLD}`,
        padding: "1rem 1.25rem",
        backgroundColor: "rgba(201,162,39,0.06)",
        fontFamily: FONT,
      }}
    >
      {label && (
        <p style={{ fontSize: "0.68rem", letterSpacing: "0.35em", textTransform: "uppercase", color: GOLD, fontWeight: 800, marginBottom: "0.4rem" }}>
          {label}
        </p>
      )}
      <div style={{ color: NAVY, fontSize: "0.95rem", lineHeight: 1.7 }}>{children}</div>
    </div>
  );
}

function DefinitionRow({ term, value }: { term: string; value: string }) {
  return (
    <div className="flex gap-0 mb-2" style={{ borderBottom: "1px solid rgba(0,41,66,0.1)" }}>
      <div
        style={{
          fontFamily: FONT,
          color: GOLD,
          fontWeight: 800,
          fontSize: "0.72rem",
          letterSpacing: "0.25em",
          textTransform: "uppercase",
          minWidth: "180px",
          paddingTop: "0.5rem",
          paddingBottom: "0.5rem",
          flexShrink: 0,
        }}
      >
        {term}
      </div>
      <div
        style={{
          fontFamily: FONT,
          color: NAVY,
          fontSize: "0.93rem",
          lineHeight: 1.65,
          paddingTop: "0.5rem",
          paddingBottom: "0.5rem",
        }}
      >
        {value}
      </div>
    </div>
  );
}

function KpiList() {
  const kpis = [
    { metric: "Female-led bookings", target: "31% → 55% within 90 days" },
    { metric: "Sunday pre-booked covers", target: "+25%" },
    { metric: "First-time local visitors who return", target: "40% within 7 days" },
    { metric: "Google reviews", target: "18 new 4.5★+ per month, 90% replied to warmly" },
    { metric: "Social engagement", target: "8% average" },
    { metric: "Tiger Room revenue per cover", target: "+18%" },
  ];
  return (
    <div className="my-4">
      {kpis.map((k) => (
        <div
          key={k.metric}
          className="flex gap-4 py-2.5"
          style={{ borderBottom: "1px solid rgba(0,41,66,0.1)", fontFamily: FONT }}
        >
          <div style={{ color: NAVY, fontSize: "0.93rem", flex: 1 }}>{k.metric}</div>
          <div style={{ color: GOLD, fontWeight: 800, fontSize: "0.93rem", textAlign: "right", minWidth: "260px" }}>{k.target}</div>
        </div>
      ))}
    </div>
  );
}

function RoadmapItem({ step, text }: { step: string; text: string }) {
  return (
    <div className="flex gap-4 mb-4" style={{ fontFamily: FONT }}>
      <div
        style={{
          minWidth: "140px",
          fontWeight: 800,
          fontSize: "0.72rem",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: GOLD,
          paddingTop: "0.15rem",
          flexShrink: 0,
        }}
      >
        {step}
      </div>
      <div style={{ color: NAVY, fontSize: "0.93rem", lineHeight: 1.65 }}>{text}</div>
    </div>
  );
}

export default function BrandStrategy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <style>{`
        @media print {
          .no-print { display: none !important; }
          body { background: white !important; }
          .print-page { box-shadow: none !important; margin: 0 !important; max-width: 100% !important; padding: 2cm 2.5cm !important; }
        }
        body { background-color: #e8e4dc; }
      `}</style>

      {/* ── TOOLBAR (screen only) ────────────────── */}
      <div
        className="no-print sticky top-0 z-20 flex items-center justify-between px-6 py-3 border-b"
        style={{ backgroundColor: NAVY, borderColor: "rgba(255,255,255,0.1)" }}
      >
        <a
          href="/"
          className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"
          style={{ fontFamily: FONT, fontSize: "0.72rem", letterSpacing: "0.25em", textTransform: "uppercase", fontWeight: 800 }}
        >
          <ArrowLeft size={14} />
          Back to Site
        </a>
        <span style={{ fontFamily: FONT, color: GOLD, fontSize: "0.72rem", letterSpacing: "0.4em", textTransform: "uppercase", fontWeight: 800 }}>
          The Old Tigers Head
        </span>
        <button
          onClick={handlePrint}
          className="flex items-center gap-2 px-5 py-2 transition-all hover:brightness-90"
          style={{ backgroundColor: GOLD, color: NAVY, fontFamily: FONT, fontSize: "0.72rem", letterSpacing: "0.25em", textTransform: "uppercase", fontWeight: 800, border: "none", cursor: "pointer" }}
        >
          <Printer size={13} />
          Save / Print PDF
        </button>
      </div>

      {/* ── DOCUMENT ────────────────────────────── */}
      <div style={{ backgroundColor: "#e8e4dc", padding: "2rem 1rem", minHeight: "100vh" }}>
        <div
          className="print-page"
          style={{
            backgroundColor: CREAM,
            maxWidth: "820px",
            margin: "0 auto",
            padding: "3.5rem 4rem",
            boxShadow: "0 4px 40px rgba(0,0,0,0.18)",
            fontFamily: FONT,
          }}
        >

          {/* DOCUMENT HEADER */}
          <div style={{ borderBottom: `3px solid ${GOLD}`, paddingBottom: "2rem", marginBottom: "2rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.5rem" }}>
              <div>
                <p style={{ fontSize: "0.68rem", letterSpacing: "0.5em", textTransform: "uppercase", color: GOLD, fontWeight: 800, marginBottom: "0.5rem" }}>
                  Internal Strategy Document
                </p>
                <h1
                  style={{
                    fontFamily: FONT,
                    color: NAVY,
                    fontSize: "2rem",
                    fontWeight: 900,
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    lineHeight: 1.1,
                    marginBottom: "0.5rem",
                  }}
                >
                  Marketing Strategy<br />Document
                </h1>
                <p style={{ color: NAVY, fontSize: "0.95rem", opacity: 0.6 }}>The Old Tiger's Head, SE3 · April 2026</p>
              </div>
              <div style={{ textAlign: "right", flexShrink: 0 }}>
                <p style={{ fontSize: "0.68rem", letterSpacing: "0.4em", textTransform: "uppercase", color: GOLD, fontWeight: 800 }}>Est. 1750</p>
                <p style={{ fontSize: "0.8rem", color: NAVY, opacity: 0.5, marginTop: "0.3rem" }}>351 Lee High Road</p>
                <p style={{ fontSize: "0.8rem", color: NAVY, opacity: 0.5 }}>London SE3 8RU</p>
              </div>
            </div>
            <p style={{ color: NAVY, fontSize: "0.95rem", lineHeight: 1.75, opacity: 0.85 }}>
              This document defines the brand for The Old Tiger's Head, examines the pub's current micro and macro environment, identifies target demographics and their buying behaviour, and outlines a targeted digital strategy. The strategy focuses on attracting new customers, growing a loyal returning customer base and achieving revenue targets. It lays the foundation for future growth by establishing a consistent and targeted brand position.
            </p>
          </div>

          {/* BRAND POSITIONING */}
          <SectionHeading>Brand Positioning</SectionHeading>
          <p style={{ color: NAVY, fontSize: "0.95rem", lineHeight: 1.75, marginBottom: "1rem", opacity: 0.85 }}>
            Brand positioning is the single most important strategic lever. It converts the landmark from a passive building into the High-Trust Social Anchor of Lee Green.
          </p>
          <Callout label="Positioning Statement">
            The undisputed High-Trust Social Anchor of Lee Green – the permanent, professionally run neighbourhood hub for SE3's primary spenders.
          </Callout>
          <DefinitionRow term="Brand Identity" value="The Epicentre of the Neighbourhood." />
          <DefinitionRow term="Core Promise" value="A zero-failure social environment where quality and service standards are as reliable as the 1908 building itself." />
          <DefinitionRow term="USP" value="Intersection of heritage and modern hospitality delivered through forensic stewardship and a 15-year lease commitment." />
          <DefinitionRow term="Brand Voice" value="Warm, factual and transparent. Every communication signals professional standards and social ownership." />

          {/* TARGET MARKET */}
          <SectionHeading>Target Market and Buying Behaviour</SectionHeading>
          <Callout label="Primary Target — The Anchored Professional">
            Middle-class women aged <strong>46–52</strong> with household incomes of <strong>£140k+</strong>, who own Victorian terraces or semis in Lee Manor and Burnt Ash. These professional homeowner women act as social decision-makers. They control <strong>68% of household leisure spend</strong> in SE3 and determine venue choice for Sunday roasts, mid-week wine and group events.
          </Callout>
          <p style={{ color: NAVY, fontSize: "0.95rem", lineHeight: 1.75, opacity: 0.85, marginBottom: "0.75rem" }}>
            Their buying behaviour prioritises social reliability. They seek environments that guarantee safety, consistent quality and a professional atmosphere aligned with their standards. They value sophisticated convenience – premium experiences within walking distance – over price alone. In 2026 they expect a community pub to feel known before arrival. They reject opaque venues and default to Blackheath when interiors and standards cannot be assessed online. They become loyal customers when transparency removes the social risk of a first visit and repeated positive experiences create habit.
          </p>

          {/* ENVIRONMENT */}
          <SectionHeading>Current Micro and Macro Environment</SectionHeading>
          <p style={{ color: NAVY, fontSize: "0.95rem", lineHeight: 1.75, opacity: 0.85, marginBottom: "0.75rem" }}>
            <strong style={{ color: NAVY }}>Micro environment:</strong> The pub occupies a dominant Grade II listed position at the Lee Green crossroads. The building itself is structurally sound and benefits from constant footfall. However, the enclosed exterior creates an invisibility barrier, and current digital assets remain placeholder level. Google Business Profile photos still show legacy clientele, reinforcing the perception of a locals-only venue. No website or CRM exists, so first-time visitors cannot easily assess the interior or book with confidence.
          </p>
          <p style={{ color: NAVY, fontSize: "0.95rem", lineHeight: 1.75, opacity: 0.85 }}>
            <strong style={{ color: NAVY }}>Macro environment:</strong> Lee Green functions as a busy transit junction rather than a destination. The 40–60 demographic drives past and continues to Blackheath because local options appear opaque. Rising operational costs (energy +14%, wages +6.2% projected for 2026) place greater emphasis on high-margin, loyal custom. Competitors rely on food photography and events but offer no pre-visit transparency or targeted approach to social decision-makers.
          </p>

          {/* WHAT CONSUMERS EXPECT */}
          <SectionHeading>What Middle-Class Consumers Expect from a Community Pub and Its Digital Presence in 2026</SectionHeading>
          <p style={{ color: NAVY, fontSize: "0.95rem", lineHeight: 1.75, opacity: 0.85 }}>
            Middle-class professional homeowner women expect a community pub to feel like a safe, curated third space: warm lighting, clean and inviting interiors, professional yet approachable staff, and food and drink that matches their discerning standards. They expect the digital presence to eliminate uncertainty. In 2026 they require live atmosphere videos, clear staff portraits, interactive menus with provenance details, instant booking and real-time capacity information. When these expectations are met, the psychological barrier to crossing the threshold disappears and repeat visits become habitual.
          </p>

          {/* LOCAL COMMUNITY */}
          <SectionHeading>Local Community, Influential Leaders, Groups and Businesses</SectionHeading>
          <p style={{ color: NAVY, fontSize: "0.95rem", lineHeight: 1.75, opacity: 0.85 }}>
            The Lee Manor Society, Lee Green Lives community centre, local sports clubs and nearby businesses act as gatekeepers. These influential leaders and groups overcome barriers to entry by receiving direct invitations and practical benefits: free Tiger Room use for meetings, targeted postcards to Victorian streets offering a first-visit upgrade, and simple partnerships such as post-match drinks or senior social afternoons. This low-cost outreach turns them into advocates who bring their networks directly to the pub and reinforce its position as the neighbourhood's social anchor.
          </p>

          {/* DIGITAL STRATEGY */}
          <SectionHeading>Targeted Digital Strategy</SectionHeading>
          <p style={{ color: NAVY, fontSize: "0.95rem", lineHeight: 1.75, opacity: 0.85, marginBottom: "1rem" }}>
            The digital strategy operates in two parallel layers to attract new customers and grow loyal regulars.
          </p>

          <Callout label="Layer 1 — Core Transparency (Ongoing)">
            <p style={{ marginBottom: "0.6rem" }}>
              A new website and Google Business Profile deliver live atmosphere videos, interactive technical menus, a Meet the Team portal and frictionless booking with a Local Intelligence Log. The site's booking function and menu are managed simply through a WhatsApp Business account linked to Google Sheets. This allows real-time updates to availability, special dishes and capacity without complex software.
            </p>
            <p>
              A dedicated staff portal provides AI-assisted digital marketing content creation. Staff can generate brand-consistent Reels, posts and responses in seconds while maintaining the required warm, factual voice.
            </p>
          </Callout>

          <div
            className="my-4 p-4"
            style={{
              border: `1px solid rgba(0,41,66,0.2)`,
              fontFamily: FONT,
            }}
          >
            <p style={{ fontSize: "0.68rem", letterSpacing: "0.35em", textTransform: "uppercase", color: NAVY, fontWeight: 800, opacity: 0.5, marginBottom: "0.4rem" }}>
              Layer 2 — Operational Audit Protocol (90-Day Campaign, May–July 2026)
            </p>
            <p style={{ color: NAVY, fontSize: "0.93rem", lineHeight: 1.65, opacity: 0.8 }}>
              A standalone promotional series that employs a dry humorous framing of the staff as service technicians who are forensically attentive to every operational detail. This runs separately so the main brand voice remains professional and targeted.
            </p>
          </div>

          <Callout label="Core Strategic Principle">
            The combined approach constitutes a highly intentional digital strategy whose core thrust is to build familiarity before customers cross the threshold. Building this pre-visit familiarity is of paramount importance; it is the central mechanism for overcoming the Invisibility Barrier. Whether through this specific campaign or any equivalent transparency mechanisms, this must remain the primary focus of all digital efforts. It attracts new customers through 2-mile radius advertising with a first-time calibration incentive, converts them via transparency and turns them into loyal regulars through the Tigers Pride programme.
          </Callout>

          {/* TIGERS PRIDE */}
          <SectionHeading>Loyalty Programme – Tigers Pride</SectionHeading>

          <div style={{ display: "flex", gap: "2rem", alignItems: "flex-start", flexWrap: "wrap" }}>
            <div style={{ flex: 1, minWidth: "280px" }}>
              <p style={{ color: NAVY, fontSize: "0.95rem", lineHeight: 1.75, opacity: 0.85, marginBottom: "0.75rem" }}>
                Tigers Pride is a simple, wallet-based loyalty scheme for all customers. Membership is actively encouraged on the website and printed menus. Upon joining, the system instantly creates a digital loyalty card that is added directly to the customer's Apple or Google Wallet.
              </p>
              <p style={{ color: NAVY, fontSize: "0.95rem", lineHeight: 1.75, opacity: 0.85, marginBottom: "0.75rem" }}>
                Staff simply enter the customer's membership number (recognised immediately via its unique letter prefix) to retrieve all stored preferences and history in real time. A letter prefix can be used to indicate whatever they want – visit frequency, gluten free, favourite table, etc. Remembering these preferences massively improves guest experience: staff can greet returning customers by name, suggest their preferred drink before they ask, and tailor service to their exact requirements.
              </p>
              <p style={{ color: NAVY, fontSize: "0.95rem", lineHeight: 1.75, opacity: 0.85 }}>
                The result is a sense of genuine belonging that turns one-time visitors into weekly regulars. The programme also offers priority booking, personalised local updates and a complimentary drink upgrade on the first visit. These changes typically generate 20–25% incremental revenue from the loyal base.
              </p>
            </div>
            <div style={{ flexShrink: 0, width: "180px" }}>
              <img
                src="/tigers-pride-card.jpg"
                alt="Tigers Pride digital loyalty card on Apple Wallet"
                style={{ width: "100%", display: "block", border: `1px solid rgba(0,41,66,0.15)` }}
              />
              <p style={{ fontSize: "0.68rem", color: NAVY, opacity: 0.5, textAlign: "center", marginTop: "0.4rem", fontFamily: FONT }}>
                Tigers Pride digital loyalty card
              </p>
            </div>
          </div>

          {/* STAFF PORTAL */}
          <SectionHeading>Staff Portal</SectionHeading>
          <p style={{ color: NAVY, fontSize: "0.95rem", lineHeight: 1.75, opacity: 0.85, marginBottom: "0.75rem" }}>
            The staff portal provides AI-assisted tools for generating brand-consistent social media content, responding to reviews and managing day-to-day digital communications. It is accessible from the website at <strong>/staff</strong>.
          </p>
          <Callout label="Staff Portal Access">
            <DefinitionRow term="URL" value="theoldtigershead.com/staff" />
            <DefinitionRow term="Username" value="test" />
            <DefinitionRow term="Password" value="test" />
          </Callout>

          {/* KPIs */}
          <SectionHeading>Key Performance Indicators</SectionHeading>
          <p style={{ color: NAVY, fontSize: "0.85rem", opacity: 0.5, marginBottom: "0.5rem", fontFamily: FONT }}>
            All KPIs are tracked weekly against the April 2026 baseline.
          </p>
          <KpiList />

          {/* ROADMAP */}
          <SectionHeading>Implementation Roadmap</SectionHeading>
          <div className="my-4">
            <RoadmapItem step="Weeks 1–2" text="Launch new website with live videos and easy booking; complete Google Business Profile cleanup." />
            <RoadmapItem step="Week 3" text="Activate Tigers Pride and begin Operational Audit Reels." />
            <RoadmapItem step="Week 4 Onward" text="Full execution of both digital layers." />
            <RoadmapItem step="30-Day Review" text="Adjust any element not meeting KPIs." />
          </div>

          {/* CLOSING STATEMENT */}
          <div
            style={{
              borderTop: `2px solid ${GOLD}`,
              marginTop: "2.5rem",
              paddingTop: "1.5rem",
            }}
          >
            <p style={{ color: NAVY, fontSize: "0.95rem", lineHeight: 1.75, opacity: 0.85 }}>
              This is a strategy designed to lay the foundations for a powerful brand. It identifies existing barriers to growth and a deliberate approach to overcome them. It positions The Old Tiger's Head as the automatic high-trust choice for SE3's primary spenders and secures revenue growth across the 15-year lease.
            </p>
          </div>

          {/* DOCUMENT FOOTER */}
          <div
            style={{
              marginTop: "3rem",
              paddingTop: "1rem",
              borderTop: `1px solid rgba(0,41,66,0.15)`,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <p style={{ fontFamily: FONT, color: NAVY, opacity: 0.4, fontSize: "0.75rem" }}>
              The Old Tigers Head · 351 Lee High Road, London SE3 8RU · Est. 1750
            </p>
            <p style={{ fontFamily: FONT, color: NAVY, opacity: 0.4, fontSize: "0.75rem" }}>April 2026</p>
          </div>

        </div>

        {/* BOTTOM PRINT BUTTON (screen only) */}
        <div className="no-print flex justify-center mt-8 pb-8">
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-8 py-3 transition-all hover:brightness-90"
            style={{ backgroundColor: NAVY, color: GOLD, fontFamily: FONT, fontSize: "0.75rem", letterSpacing: "0.25em", textTransform: "uppercase", fontWeight: 800, border: "none", cursor: "pointer" }}
          >
            <Printer size={14} />
            Save as PDF / Print
          </button>
        </div>
      </div>
    </>
  );
}
