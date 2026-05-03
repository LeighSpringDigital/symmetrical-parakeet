import Navbar from "@/components/Navbar";
import Link from "next/link";
import { Users, History, Heart, ShieldCheck } from "lucide-react";
import { featureFlags } from "@/lib/config";

export const metadata = {
  title: "Our Pub | The Old Tiger's Head · Lee Green",
  description: "The story of The Old Tiger's Head — a Grade II listed community pub in Lee Green, London, established 1750. Meet the team.",
};

export default function OurPub() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-[120px] bg-navy text-white">
        <div className="max-w-4xl mx-auto px-6 py-12">

          {/* Page title */}
          <div className="text-center mb-20">
            <h1 className="text-5xl md:text-7xl font-black uppercase text-gold mb-6" style={{ fontVariant: "small-caps" }}>
              Our Pub
            </h1>
            <p className="text-xl text-white/70 leading-relaxed max-w-2xl mx-auto">
              Established in 1750. Grade II listed. At the crossroads of Lee Green for over 275 years. 
              This isn't just a pub — it's a piece of the neighbourhood that belongs to the people who live here.
            </p>
          </div>

          <div className="grid gap-24">

            {/* ── OUR STORY ──────────────────────────────── */}
            <section id="story">
              <div className="flex items-center gap-4 mb-8">
                <History className="text-gold flex-shrink-0" size={32} />
                <h2 className="text-3xl md:text-4xl font-black uppercase" style={{ fontVariant: "small-caps" }}>
                  Our Story
                </h2>
              </div>
              <div className="space-y-6 text-white/70 leading-relaxed">
                <p>
                  The Tiger started life as a coaching inn in the 1750s, when Lee Green was a 
                  stop on the road out of London. Horse-drawn traffic, then trams, then the 
                  combustion engine — the pub has watched all of it from this corner.
                </p>
                <div className="my-8 border border-white/10 overflow-hidden">
                  <img
                    src="/hist-oth-1880s.jpg"
                    alt="The Old Tiger's Head in the 1880s"
                    className="w-full h-auto grayscale"
                  />
                  <p className="text-xs text-white/30 p-4 italic tracking-wide">
                    The Old Tiger's Head, Lee High Road — c.1880s
                  </p>
                </div>
                <p>
                  The current building dates from 1896 — Grade II listed, with the original etched glass, 
                  carved woodwork, and the kind of ceiling height that makes you feel like you're somewhere 
                  that matters. It was a Star Pubs & Bars house for many years. When it closed, the neighbourhood 
                  noticed. When it reopened, people came back.
                </p>
                <div className="grid grid-cols-2 gap-4 my-8">
                  <img src="/hist-1900s-lee-high-road.jpg" alt="Lee High Road 1900s" className="w-full h-auto grayscale border border-white/10" />
                  <img src="/hist-1910s-lee-green-tram.jpg" alt="Lee Green tram 1910s" className="w-full h-auto grayscale border border-white/10" />
                </div>
                <p>
                  Today, under Rob's stewardship — on a 15-year lease — the work is to make sure 
                  it's still here for the next 275. That means running it properly, looking after it, 
                  and making sure the people of Lee feel that it belongs to them.
                </p>
              </div>
            </section>

            {/* ── THE COMMUNITY ──────────────────────────── */}
            <section id="community">
              <div className="flex items-center gap-4 mb-8">
                <Heart className="text-gold flex-shrink-0" size={32} />
                <h2 className="text-3xl md:text-4xl font-black uppercase" style={{ fontVariant: "small-caps" }}>
                  The Community
                </h2>
              </div>
              <div className="space-y-6 text-white/70 leading-relaxed">
                <p>
                  A pub is either the living room of its neighbourhood or it's just a place 
                  that sells drinks. We know which one we're trying to be. The Tiger hosts local 
                  meetings, charity evenings, and community events — and the doors are open to 
                  anyone who wants to use the space for something that matters to Lee.
                </p>
                <p>
                  If you have an idea — a fundraiser, a club meeting, a local society gathering — 
                  come and talk to us. This building has been a community resource for two and a 
                  half centuries. We intend to keep it that way.
                </p>
                <div className="border border-white/10 overflow-hidden my-8">
                  <img
                    src="/oth-king-celebration.jpg"
                    alt="Community celebration at The Old Tiger's Head"
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </section>

            {/* ── MEET THE TEAM ──────────────────────────── */}
            <section id="team">
              <div className="flex items-center gap-4 mb-8">
                <Users className="text-gold flex-shrink-0" size={32} />
                <h2 className="text-3xl md:text-4xl font-black uppercase" style={{ fontVariant: "small-caps" }}>
                  Meet the Team
                </h2>
              </div>
              <div className="grid md:grid-cols-2 gap-8">

                {/* Rob — Landlord */}
                <div className="border border-white/10 bg-white/5 overflow-hidden">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src="/Rob.jpg"
                      alt="Rob — Landlord at The Old Tiger's Head"
                      className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                    />
                  </div>
                  <div className="p-8">
                    <h3 className="text-xl font-bold uppercase text-gold mb-1" style={{ fontVariant: "small-caps" }}>
                      Rob
                    </h3>
                    <p className="text-xs font-bold tracking-widest uppercase mb-4 text-white/40">
                      Landlord
                    </p>
                    <p className="text-sm text-white/70 leading-relaxed">
                      Rob took on The Tiger on a 15-year lease with a single objective: restore it as 
                      the proper heart of Lee Green. Originally from Australia, he's been in the 
                      hospitality trade long enough to know that a great pub isn't about the drinks — 
                      it's about whether people feel at home. He tends to be the one who knows your 
                      order before you've asked.
                    </p>
                  </div>
                </div>

                {/* Rob — Chef */}
                <div className="border border-white/10 bg-white/5 overflow-hidden">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src="/Rob.jpg"
                      alt="Rob — Chef at The Old Tiger's Head"
                      className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                    />
                  </div>
                  <div className="p-8">
                    <h3 className="text-xl font-bold uppercase text-gold mb-1" style={{ fontVariant: "small-caps" }}>
                      Rob
                    </h3>
                    <p className="text-xs font-bold tracking-widest uppercase mb-4 text-white/40">
                      Head Chef
                    </p>
                    <p className="text-sm text-white/70 leading-relaxed">
                      The Sunday roast books out by Thursday most weeks, and that's largely down to Rob. 
                      His kitchen runs on provenance — he wants to know where things come from and he 
                      wants them cooked properly. The 48-hour gravy is his. So is the fish and chips, 
                      which is why people drive from Blackheath for it.
                    </p>
                  </div>
                </div>

              </div>
              <p className="text-white/30 text-xs text-center mt-8 italic tracking-wide">
                Placeholder photos — team photos to follow.
              </p>
            </section>

            {/* ── TIGERS PRIDE ───────────────────────────── */}
            {featureFlags.loyaltyScheme && (
              <section id="loyalty" className="bg-gold text-navy p-12">
                <div className="flex items-center gap-4 mb-8">
                  <ShieldCheck size={32} />
                  <h2 className="text-3xl md:text-4xl font-black uppercase" style={{ fontVariant: "small-caps" }}>
                    Tigers Pride
                  </h2>
                </div>
                <p className="font-bold mb-8 text-navy/80">
                  Our community membership. Join for priority booking, members' welcome hours, and personalised service.
                </p>
                <Link
                  href="/community"
                  className="inline-block border-2 border-navy px-8 py-3 font-black uppercase tracking-widest hover:bg-navy hover:text-gold transition-colors"
                  style={{ fontVariant: "small-caps" }}
                >
                  Find Out More
                </Link>
              </section>
            )}

          </div>
        </div>
      </main>
    </>
  );
}
