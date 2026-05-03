import Navbar from "@/components/Navbar";
import Link from "next/link";
import { ShieldCheck, Newspaper, Users, Star } from "lucide-react";
import { featureFlags } from "@/lib/config";

export const metadata = {
  title: "Community | The Old Tiger's Head · Lee Green",
  description: "Tigers Pride loyalty programme, pub news, member spotlights, and the newsletter. The Old Tiger's Head community hub for Lee Green, SE12.",
};

export default function Community() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-[120px] bg-navy text-white">

        {/* Hero */}
        <section className="py-20 px-6 text-center border-b border-white/10">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-black uppercase text-gold mb-6" style={{ fontVariant: "small-caps" }}>
              Community
            </h1>
            <div className="w-20 h-1 bg-gold mx-auto mb-10" />
            <p className="text-xl text-white/70 leading-relaxed">
              The Tiger isn't just a pub — it's a stake in Lee. 
              This is where the neighbourhood gathers, where regulars become part of the story, 
              and where the next chapter of the pub's 275-year history is written.
            </p>
          </div>
        </section>

        {/* Tigers Pride */}
        <section id="tigers-pride" className="py-24 px-6">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <ShieldCheck className="text-gold" size={32} />
                <h2 className="text-3xl md:text-4xl font-black uppercase" style={{ fontVariant: "small-caps" }}>
                  Tigers Pride
                </h2>
              </div>
              <div className="space-y-5 text-white/70 leading-relaxed">
                <p>
                  Tigers Pride is our community membership — a digital loyalty card that lives 
                  in your Apple or Google Wallet. It's not a discount scheme. It's a marker 
                  of belonging, and it comes with things that matter more than money off.
                </p>
                <ul className="space-y-3">
                  {[
                    "Priority booking — notified 48 hours before general release",
                    "Complimentary drink upgrade on your first visit",
                    "Personalised service — we learn your preferences",
                    "Members' welcome hours: Mon–Thu 5–7pm",
                    "Early access to new menu items and events",
                    "Member spotlights and community features",
                  ].map((benefit) => (
                    <li key={benefit} className="flex items-start gap-3 text-sm">
                      <span className="w-1.5 h-1.5 bg-gold rounded-full flex-shrink-0 mt-2" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10">
                <a
                  href="https://wa.me/442045680111?text=I'd%20like%20to%20join%20Tigers%20Pride"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-gold text-navy font-black tracking-widest px-10 py-4 uppercase hover:bg-white transition-colors"
                  style={{ fontVariant: "small-caps" }}
                >
                  Join Tigers Pride
                </a>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <img
                src="/LoyaltyCard_bg002942.png"
                alt="Tigers Pride loyalty card"
                className="w-full max-w-sm"
              />
            </div>
          </div>
        </section>

        {/* Pub News */}
        <section id="news" className="py-20 px-6 bg-white/5 border-y border-white/10">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-10">
              <Newspaper className="text-gold" size={28} />
              <h2 className="text-3xl font-black uppercase" style={{ fontVariant: "small-caps" }}>
                Pub News
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {/* Placeholder news cards */}
              {[
                { title: "The Beer Garden is Open", date: "May 2026", excerpt: "With the warmer weather arriving, the garden is open from noon daily. Heaters are on, Casper is in position, and the decking has passed its structural audit." },
                { title: "New on the Menu", date: "May 2026", excerpt: "Rob has added three new dishes to the evening menu for spring. The mushroom risotto is already proving popular. Full details on the menu page." },
              ].map(({ title, date, excerpt }) => (
                <div key={title} className="border border-white/10 p-8 hover:border-gold transition-colors group">
                  <p className="text-gold text-xs font-bold uppercase tracking-widest mb-3">{date}</p>
                  <h3 className="text-xl font-black uppercase mb-3 group-hover:text-gold transition-colors" style={{ fontVariant: "small-caps" }}>
                    {title}
                  </h3>
                  <p className="text-white/50 text-sm leading-relaxed" style={{ fontVariant: "normal" }}>
                    {excerpt}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Member Spotlights */}
        <section id="spotlights" className="py-20 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-10">
              <Star className="text-gold" size={28} />
              <h2 className="text-3xl font-black uppercase" style={{ fontVariant: "small-caps" }}>
                Member Spotlights
              </h2>
            </div>
            <p className="text-white/50 text-lg leading-relaxed mb-10">
              Every month we feature a Tigers Pride member — their connection to Lee, their favourite 
              corner of the pub, and what keeps them coming back. 
              The Tiger is its people. This is where we prove it.
            </p>
            <div className="border border-white/10 p-12 text-center">
              <p className="text-white/30 text-sm uppercase tracking-widest font-bold">
                First spotlights coming in June — once Tigers Pride membership reaches 50.
              </p>
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section id="newsletter" className="py-20 px-6 bg-gold text-navy">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-black uppercase mb-4" style={{ fontVariant: "small-caps" }}>
              The Tiger's Letter
            </h2>
            <p className="text-navy/70 leading-relaxed mb-10">
              A monthly note from Rob — what's on, what's new, what's worth knowing. 
              No noise, no promotions. Just the pub, in writing.
            </p>
            <a
              href="https://wa.me/442045680111?text=Please%20add%20me%20to%20The%20Tiger's%20Letter%20newsletter"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block border-2 border-navy text-navy font-black tracking-widest px-10 py-4 uppercase hover:bg-navy hover:text-gold transition-colors"
              style={{ fontVariant: "small-caps" }}
            >
              Sign Up
            </a>
            <p className="text-navy/40 text-xs mt-4 tracking-wide">
              Sign-ups handled via WhatsApp. We'll confirm by return.
            </p>
          </div>
        </section>

      </main>
    </>
  );
}
