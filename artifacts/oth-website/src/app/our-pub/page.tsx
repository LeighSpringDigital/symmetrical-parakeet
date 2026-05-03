"use client";

import { featureFlags } from "@/lib/config";
import Link from "next/link";
import { Users, History, Heart, ShieldCheck } from "lucide-react";

export default function OurPub() {
  return (
    <main className="min-h-screen pt-[120px] bg-navy text-white">
      <div className="max-w-4xl mx-auto px-6 py-12 text-center">
        <h1 className="text-5xl md:text-7xl font-black uppercase text-gold mb-8">Our Pub</h1>
        <p className="text-xl text-white/70 leading-relaxed mb-16">
          Established in 1750, The Old Tigers Head has been the cornerstone of Lee for over 275 years. 
          A proper local run by a dedicated team, focused on heritage, community, and great service.
        </p>

        <div className="grid gap-24">
          {/* ── OUR STORY ───────────────────────────────────── */}
          <section id="story">
            <div className="flex items-center justify-center gap-4 mb-8">
              <History className="text-gold" size={32} />
              <h2 className="text-3xl md:text-4xl font-black uppercase">Our Story</h2>
            </div>
            <div className="space-y-6 text-white/70 leading-relaxed text-left">
              <p>
                From the era of horse-drawn carriages at the Lee Green crossroads to the electric trams 
                of the early 20th century, the Tiger has seen it all. Originally advertising Courage & Co. 
                Porter & Ale, it has evolved into a modern community hub while strictly preserving its 
                historic character.
              </p>
              <img src="/hist-oth-1880s.jpg" alt="Historic OTH" className="w-full h-auto border border-white/10 my-8 grayscale" />
              <p>
                Today, under the stewardship of Rob and the team, we continue to honor that legacy. 
                Stripped back to its beautiful red-brick glory, the pub is a testament to the 
                enduring spirit of Lee.
              </p>
            </div>
          </section>

          {/* ── THE COMMUNITY ────────────────────────────────── */}
          <section id="community">
            <div className="flex items-center justify-center gap-4 mb-8">
              <Heart className="text-gold" size={32} />
              <h2 className="text-3xl md:text-4xl font-black uppercase">The Community</h2>
            </div>
            <div className="space-y-6 text-white/70 leading-relaxed text-left">
              <p>
                We believe a proper pub is more than just a place to drink; it's the living room of the 
                neighborhood. We proudly host local meetings, charity events, and provide a welcoming 
                space for residents to gather and connect.
              </p>
              <p>
                Whether it's raising money for the local food bank or hosting the neighborhood watch 
                discussions, the Tiger is where Lee comes together.
              </p>
            </div>
          </section>

          {/* ── MEET THE TEAM ────────────────────────────────── */}
          <section id="team">
            <div className="flex items-center justify-center gap-4 mb-8">
              <Users className="text-gold" size={32} />
              <h2 className="text-3xl md:text-4xl font-black uppercase">Meet the Team</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8 text-left">
              <div className="p-8 border border-white/10 bg-white/5">
                <h3 className="text-xl font-bold uppercase text-gold mb-2">Rob</h3>
                <p className="text-xs font-bold tracking-widest uppercase mb-4 text-white/40">Licensee & Host</p>
                <p className="text-sm">Determined to restore the Tiger as the hub of the community. Always has a seat and a story ready for you.</p>
              </div>
              <div className="p-8 border border-white/10 bg-white/5">
                <h3 className="text-xl font-bold uppercase text-gold mb-2">Paolo</h3>
                <p className="text-xs font-bold tracking-widest uppercase mb-4 text-white/40">Head Chef</p>
                <p className="text-sm">Brings craft and love to every dish. The reason people book a table two weeks in advance for Sunday lunch.</p>
              </div>
            </div>
          </section>

          {/* ── LOYALTY SCHEME (Feature Flag) ────────────────── */}
          {featureFlags.loyaltyScheme && (
            <section id="loyalty" className="bg-gold text-navy p-12">
              <div className="flex items-center justify-center gap-4 mb-8">
                <ShieldCheck size={32} />
                <h2 className="text-3xl md:text-4xl font-black uppercase">Tiger Club</h2>
              </div>
              <p className="font-bold mb-8">Join our community membership for exclusive neighbor benefits.</p>
              <Link href="/loyalty" className="inline-block border-2 border-navy px-8 py-3 font-black uppercase tracking-widest hover:bg-navy hover:text-gold transition-colors">
                Learn More
              </Link>
            </section>
          )}
        </div>
      </div>
    </main>
  );
}
