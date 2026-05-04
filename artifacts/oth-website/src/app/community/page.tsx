import Navbar from "@/components/Navbar";
import Link from "next/link";

export const metadata = {
  title: "Community | The Old Tiger's Head · Lee Green, SE12",
  description: "The Tiger Club, pub news, member events, and the newsletter. The community hub of The Old Tiger's Head, Lee Green.",
};

export default function Community() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-navy text-white">

        {/* Hero */}
        <section className="relative h-[50vh] flex items-end overflow-hidden">
          <img src="/oth-king-celebration.jpg" alt="Community at The Old Tiger's Head" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0" style={{background:"linear-gradient(to top, rgba(0,41,66,1) 0%, rgba(0,41,66,0.4) 70%, transparent 100%)"}} />
          <div className="relative z-10 max-w-4xl mx-auto px-6 pb-16 w-full">
            <h1 className="text-5xl md:text-8xl font-black uppercase text-gold sc">Community</h1>
          </div>
        </section>

        <div className="max-w-5xl mx-auto px-6 py-20 space-y-24">

          {/* ── TIGER CLUB ─────────────────────────── */}
          <section id="tiger-club">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <p className="text-gold text-xs font-black tracking-[0.4em] uppercase mb-4">Membership</p>
                <h2 className="text-4xl md:text-5xl font-black uppercase text-white mb-6 sc">The Tiger Club</h2>
                <p className="text-white/70 text-lg leading-relaxed mb-6">
                  For the regulars, the neighbours, and the people who think of this place as theirs. 
                  The Tiger Club is membership for the people who keep this pub alive.
                </p>
                <ul className="space-y-4 mb-8">
                  {[
                    "Priority booking — 48 hours before general release",
                    "Personalised service — we know your name and your order",
                    "Exclusive members events and offers",
                    "First access to new menus and announcements",
                    "Members welcome hours: Monday–Thursday 5–7pm",
                  ].map(benefit => (
                    <li key={benefit} className="flex items-start gap-3 text-white/70 text-sm">
                      <span className="text-gold mt-1.5 flex-shrink-0">—</span>
                      {benefit}
                    </li>
                  ))}
                </ul>
                <a href="https://wa.me/442045680111?text=I'd%20like%20to%20join%20the%20Tiger%20Club"
                  target="_blank" rel="noopener noreferrer"
                  className="inline-block bg-gold text-navy font-black tracking-widest px-10 py-4 uppercase hover:bg-white transition-colors sc">
                  Join the Tiger Club
                </a>
                <p className="text-white/30 text-xs mt-4">Via WhatsApp — we'll confirm by return.</p>
              </div>
              {/* Card on navy — background vanishes */}
              <div className="bg-navy flex items-center justify-center py-8">
                <img src="/LoyaltyCard_bg002942.png" alt="Tiger Club card" className="w-full max-w-xs" />
              </div>
            </div>
          </section>

          {/* ── PUB NEWS ───────────────────────────── */}
          <section id="news">
            <h2 className="text-3xl font-black uppercase text-gold mb-10 sc">Pub News</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { title: "The Garden is Open", date: "May 2026", body: "The beer garden is open from noon daily. Saturday BBQs are running through the summer — no booking needed, just show up." },
                { title: "New on the Menu", date: "May 2026", body: "Three new dishes on the evening menu for spring. The mushroom risotto has gone down well. Full menu on the menu page." },
              ].map(({ title, date, body }) => (
                <div key={title} className="border border-white/10 p-8 hover:border-gold transition-colors">
                  <p className="text-gold text-xs font-bold uppercase tracking-widest mb-3">{date}</p>
                  <h3 className="text-xl font-black uppercase text-white mb-3 sc">{title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{body}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── MEMBER SPOTLIGHTS ──────────────────── */}
          <section id="spotlights" className="relative overflow-hidden">
            <img src="/jazz.jpg" alt="The atmosphere at The Old Tiger's Head" className="absolute inset-0 w-full h-full object-cover grayscale" />
            <div className="absolute inset-0 bg-navy/88" />
            <div className="relative z-10 p-12 md:p-16">
              <h2 className="text-3xl font-black uppercase text-gold mb-6 sc">Member Spotlights</h2>
              <p className="text-white/70 text-lg leading-relaxed max-w-2xl mb-8">
                Every month we feature a Tiger Club member — their connection to Lee, 
                their corner of the pub, and what keeps them coming back. 
                The Tiger is its people.
              </p>
              <p className="text-white/30 text-sm uppercase tracking-widest font-bold border border-white/10 inline-block px-6 py-3">
                First spotlights coming in June
              </p>
            </div>
          </section>

          {/* ── NEWSLETTER ─────────────────────────── */}
          <section id="newsletter" className="text-center py-16 border-t border-white/10">
            <p className="text-gold text-xs font-black tracking-[0.4em] uppercase mb-4">Monthly</p>
            <h2 className="text-3xl md:text-4xl font-black uppercase text-white mb-4 sc">The Tiger's Letter</h2>
            <p className="text-white/60 max-w-xl mx-auto leading-relaxed mb-10">
              A monthly note from Rob — what's on, what's new, what's worth knowing. 
              No noise. Just the pub, in writing.
            </p>
            <a href="https://wa.me/442045680111?text=Please%20add%20me%20to%20The%20Tiger's%20Letter"
              target="_blank" rel="noopener noreferrer"
              className="inline-block bg-gold text-navy font-black tracking-widest px-10 py-4 uppercase hover:bg-white transition-colors sc">
              Sign Up
            </a>
            <p className="text-white/30 text-xs mt-4">Via WhatsApp. We'll confirm by return.</p>
          </section>

        </div>
      </main>
    </>
  );
}
