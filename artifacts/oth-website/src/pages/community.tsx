import { useState } from "react";
import { useLocation } from "wouter";
import { ChevronLeft, ChevronRight, Star, Users } from "lucide-react";

const NAVY = "#002942";
const GOLD = "#C9A227";
const FONT = "'Century Gothic', 'Avant Garde', CenturyGothic, AppleGothic, sans-serif";

const tigerOfMonth = {
  name: "Casper the Chi Chon",
  bio: "Self-appointed Head of Security at the Old Tiger's Head, Casper operates under the firm belief he's a towering apex predator. He's mad, bad and dangerous — until someone pets him, that is, at which point the tough-guy facade evaporates completely.",
  month: "April 2026",
};

const communityMembers = [
  { name: "Sarah T.", bio: "Third-generation Lee local. Regulars since 1987.", dog: "", tag: "Regular" },
  { name: "Marcus & Family", bio: "Sunday roast every week without fail. Our kids grew up here.", dog: "", tag: "Family" },
  { name: "Brenda", bio: "Quiz team captain for six years running — we're not going to mention the losing streak.", dog: "", tag: "Quiz Team" },
  { name: "The Five-Aside Lot", bio: "Post-match pints every Thursday. Paolo knows our order.", dog: "", tag: "Sport" },
  { name: "Janet & Bertie", bio: "Janet moved to Lee last year. Bertie (French Bulldog, 4) has already made more friends than she has.", dog: "Bertie", tag: "Dog Friendly" },
];

type FormState = {
  name: string;
  email: string;
  bio: string;
  dogName: string;
  dogBio: string;
  consent: boolean;
};

export default function CommunityPage() {
  const [, navigate] = useLocation();
  const [step, setStep] = useState<"form" | "success">("form");
  const [form, setForm] = useState<FormState>({
    name: "", email: "", bio: "", dogName: "", dogBio: "", consent: false,
  });
  const [errors, setErrors] = useState<Partial<FormState>>({});

  const validate = () => {
    const e: Partial<FormState> = {};
    if (!form.name.trim()) e.name = "Please tell us your name";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = "A valid email address is required";
    if (!form.bio.trim()) e.bio = "Tell us a little about yourself";
    if (!form.consent) e.consent = "Please agree to be featured" as unknown as boolean;
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) setStep("success");
  };

  const field = (key: keyof FormState) => ({
    value: form[key] as string,
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value })),
  });

  return (
    <div style={{ fontFamily: FONT, backgroundColor: NAVY, minHeight: "100vh" }}>
      {/* ── MINI NAV ── */}
      <div className="sticky top-0 z-20 border-b border-white/10" style={{ backgroundColor: NAVY }}>
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-white/60 hover:text-white transition-colors text-xs tracking-widest uppercase font-semibold"
          >
            <ChevronLeft size={15} /> Back to Site
          </button>
          <div className="font-black text-base uppercase tracking-wide" style={{ color: GOLD, fontFamily: FONT }}>
            Old Tigers Head
          </div>
          <a
            href="/#book"
            className="text-[10px] font-bold tracking-widest uppercase px-5 py-2 hidden sm:inline-block"
            style={{ backgroundColor: GOLD, color: NAVY }}
          >
            Book a Table
          </a>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-16">

        {/* ── HERO ── */}
        <div className="text-center mb-16">
          <p className="text-xs tracking-[0.5em] uppercase font-semibold mb-3" style={{ color: GOLD }}>
            Est. 1750 · Lee, London
          </p>
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-wide text-white mb-4" style={{ fontFamily: FONT }}>
            The Tigers Head<br />Community
          </h1>
          <div className="w-16 h-0.5 mx-auto mb-6" style={{ backgroundColor: GOLD }} />
          <p className="text-white/60 text-lg leading-relaxed max-w-xl mx-auto">
            Every pub has its people. Sign up to become part of ours — write a bio, add your dog, and be in with a chance of winning Tiger of the Month.
          </p>
        </div>

        {/* ── TIGER OF THE MONTH ── */}
        <div className="mb-16 p-8" style={{ backgroundColor: GOLD }}>
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-shrink-0 flex flex-col items-center">
              <div className="w-28 h-28 overflow-hidden border-4" style={{ borderColor: NAVY }}>
                <img src="/casper.jpg" alt="Casper the Chi Chon" className="w-full h-full object-cover object-top" />
              </div>
              <div className="text-[9px] font-black tracking-widest uppercase mt-2" style={{ color: NAVY }}>Tiger of the Month</div>
            </div>
            <div className="flex-1 text-center md:text-left">
              <div className="text-[10px] font-bold tracking-widest uppercase mb-1" style={{ color: `${NAVY}88` }}>{tigerOfMonth.month}</div>
              <div className="text-2xl font-black uppercase tracking-wide mb-1" style={{ color: NAVY, fontFamily: FONT }}>{tigerOfMonth.name}</div>
              <p className="text-sm leading-relaxed mb-2" style={{ color: `${NAVY}cc` }}>{tigerOfMonth.bio}</p>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t text-center" style={{ borderColor: `${NAVY}22` }}>
            <p className="text-sm" style={{ color: `${NAVY}99` }}>
              Every month we pick one member profile — human or canine — to feature as Tiger of the Month right here on the site.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">

          {/* ── SIGN UP FORM ── */}
          <div>
            <h2 className="text-2xl font-black uppercase tracking-wide mb-6" style={{ color: "white", fontFamily: FONT }}>
              Join the Community
            </h2>

            {step === "success" ? (
              <div className="border border-white/10 p-10 text-center" style={{ backgroundColor: "rgba(255,255,255,0.04)" }}>
                <div className="w-20 h-20 overflow-hidden mx-auto mb-5 border-4" style={{ borderColor: GOLD }}>
                  <img src="/casper.jpg" alt="Casper" className="w-full h-full object-cover object-top" />
                </div>
                <div className="text-2xl font-black uppercase tracking-wide text-white mb-3" style={{ fontFamily: FONT }}>
                  Welcome to the Pride
                </div>
                <p className="text-white/60 text-sm leading-relaxed mb-6">
                  You're in. Rob and the team will add your profile to the community wall — and you're now in the draw for Tiger of the Month.
                </p>
                <p className="text-white/40 text-xs mb-6">
                  Come in and show Rob this screen for a complimentary welcome drink.
                </p>
                <button
                  onClick={() => navigate("/")}
                  className="text-xs font-bold tracking-widest uppercase px-8 py-3 transition-all hover:brightness-90"
                  style={{ backgroundColor: GOLD, color: NAVY, fontFamily: FONT }}
                >
                  Back to the Pub
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name */}
                <div>
                  <label className="block text-[10px] font-bold tracking-widest uppercase mb-2" style={{ color: GOLD }}>
                    Your Name *
                  </label>
                  <input
                    type="text"
                    {...field("name")}
                    placeholder="First name, last initial..."
                    className="w-full bg-transparent border px-4 py-3 text-white text-sm placeholder:text-white/30 outline-none transition-colors focus:border-[#C9A227]"
                    style={{ borderColor: errors.name ? "#ef4444" : "rgba(255,255,255,0.15)" }}
                  />
                  {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-[10px] font-bold tracking-widest uppercase mb-2" style={{ color: GOLD }}>
                    Email Address *
                  </label>
                  <input
                    type="email"
                    {...field("email")}
                    placeholder="your@email.com"
                    className="w-full bg-transparent border px-4 py-3 text-white text-sm placeholder:text-white/30 outline-none transition-colors focus:border-[#C9A227]"
                    style={{ borderColor: errors.email ? "#ef4444" : "rgba(255,255,255,0.15)" }}
                  />
                  {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                </div>

                {/* Bio */}
                <div>
                  <label className="block text-[10px] font-bold tracking-widest uppercase mb-2" style={{ color: GOLD }}>
                    Your Bio *
                  </label>
                  <textarea
                    {...field("bio")}
                    placeholder="Tell us who you are, how long you've been coming in, what you drink, your quiz team name..."
                    rows={4}
                    className="w-full bg-transparent border px-4 py-3 text-white text-sm placeholder:text-white/30 outline-none transition-colors focus:border-[#C9A227] resize-none"
                    style={{ borderColor: errors.bio ? "#ef4444" : "rgba(255,255,255,0.15)" }}
                  />
                  {errors.bio && <p className="text-red-400 text-xs mt-1">{errors.bio}</p>}
                </div>

                {/* Dog section */}
                <div className="border border-white/10 p-5" style={{ backgroundColor: "rgba(255,255,255,0.04)" }}>
                  <div className="text-[10px] font-bold tracking-widest uppercase mb-4" style={{ color: GOLD }}>
                    Dog Profile (optional)
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[10px] tracking-widest uppercase mb-1 text-white/50">Dog's Name</label>
                      <input
                        type="text"
                        {...field("dogName")}
                        placeholder="e.g. Bertie, Guinness, Ripley..."
                        className="w-full bg-transparent border px-4 py-3 text-white text-sm placeholder:text-white/30 outline-none transition-colors focus:border-[#C9A227]"
                        style={{ borderColor: "rgba(255,255,255,0.15)" }}
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] tracking-widest uppercase mb-1 text-white/50">Dog's Bio</label>
                      <textarea
                        {...field("dogBio")}
                        placeholder="Breed, age, favourite spot in the pub, drink order..."
                        rows={3}
                        className="w-full bg-transparent border px-4 py-3 text-white text-sm placeholder:text-white/30 outline-none transition-colors focus:border-[#C9A227] resize-none"
                        style={{ borderColor: "rgba(255,255,255,0.15)" }}
                      />
                    </div>
                  </div>
                </div>

                {/* Consent */}
                <div>
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={form.consent}
                      onChange={(e) => setForm((f) => ({ ...f, consent: e.target.checked }))}
                      className="mt-0.5 flex-shrink-0 accent-[#C9A227]"
                    />
                    <span className="text-white/60 text-sm leading-relaxed group-hover:text-white/80 transition-colors">
                      I'm happy for my profile to be featured on the Old Tigers Head website and social channels, and to be considered for Tiger of the Month.
                    </span>
                  </label>
                  {errors.consent && <p className="text-red-400 text-xs mt-1">Please tick the box to continue</p>}
                </div>

                <button
                  type="submit"
                  className="w-full text-sm font-bold tracking-[0.2em] uppercase py-4 transition-all hover:brightness-90"
                  style={{ backgroundColor: GOLD, color: NAVY, fontFamily: FONT }}
                >
                  Join the Tigers Head Community
                </button>
              </form>
            )}
          </div>

          {/* ── MEMBER WALL ── */}
          <div>
            <h2 className="text-2xl font-black uppercase tracking-wide mb-6" style={{ color: "white", fontFamily: FONT }}>
              The Community Wall
            </h2>
            <p className="text-white/50 text-sm mb-8 leading-relaxed">
              A few of the faces that make this pub what it is. Sign up and you'll be here too.
            </p>
            <div className="space-y-4">
              {communityMembers.map((m, i) => (
                <div
                  key={i}
                  className="border border-white/10 p-5 hover:border-[#C9A227]/30 transition-all"
                  style={{ backgroundColor: "rgba(255,255,255,0.04)" }}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="w-10 h-10 flex-shrink-0 flex items-center justify-center font-black"
                      style={{ backgroundColor: i % 2 === 0 ? GOLD : "rgba(201,162,39,0.15)", color: i % 2 === 0 ? NAVY : GOLD, fontFamily: FONT }}
                    >
                      {m.dog ? "🐾" : m.name[0]}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="text-white font-black text-sm tracking-wide" style={{ fontFamily: FONT }}>{m.name}</div>
                        <span
                          className="text-[9px] font-bold tracking-widest uppercase px-2 py-0.5"
                          style={{ backgroundColor: `${GOLD}22`, color: GOLD }}
                        >
                          {m.tag}
                        </span>
                      </div>
                      <p className="text-white/55 text-sm leading-relaxed">{m.bio}</p>
                      {m.dog && (
                        <p className="text-[11px] mt-1" style={{ color: `${GOLD}99` }}>
                          With: {m.dog}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 border border-white/10 p-5 text-center" style={{ backgroundColor: "rgba(255,255,255,0.04)" }}>
              <div className="flex items-center justify-center gap-2 text-white/30 text-sm">
                <Users size={14} />
                <span>Join to add your profile</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER STRIP */}
      <div className="mt-20 py-6 px-6 border-t border-white/10 text-center" style={{ backgroundColor: "#001520" }}>
        <p className="text-white/25 text-xs tracking-widest">© 2026 The Old Tigers Head · 351 Lee High Road, London SE12 8RU</p>
      </div>
    </div>
  );
}
