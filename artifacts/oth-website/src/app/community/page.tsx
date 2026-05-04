import Navbar from "@/components/Navbar";
import Link from "next/link";

export const metadata = {
  title: "Community | The Old Tiger's Head · Lee Green, SE12",
  description: "The Tiger Club membership, pub news, and member spotlights. The Old Tiger's Head community hub, Lee Green SE12.",
};

export default function Community() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-navy text-white">

        <section className="relative h-[45vh] flex items-end overflow-hidden">
          <img src="/oth-king-celebration.jpg" alt="Community at The Old Tiger's Head" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0" style={{background:"linear-gradient(to top, rgba(0,41,66,1) 0%, rgba(0,41,66,0.4) 70%, transparent 100%)"}} />
          <div className="relative z-10 max-w-5xl mx-auto px-6 pb-14 w-full">
            <h1 className="text-5xl md:text-8xl font-black uppercase text-gold sc">Community</h1>
          </div>
        </section>

        <div className="max-w-5xl mx-auto px-6 py-20 space-y-24">

          {/* Tiger Club — merged with newsletter */}
          <section id="tiger-club">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <p className="text-gold text-xs font-black tracking-[0.4em] uppercase mb-4">Membership</p>
                <h2 className="text-4xl font-black uppercase text-white mb-6 sc">The Tiger Club</h2>
                <p className="text-white/70 leading-relaxed mb-6">
                  For the people who think of The Tiger as theirs. 
                  Members get priority booking, exclusive events, and a team that knows them by name.
                </p>
                <ul className="space-y-3 mb-8">
                  {[
                    "Priority booking — 48 hours before general release",
                    "Personalised service at every visit",
                    "Exclusive members events and offers",
                    "First access to new menus and announcements",
                    "Members welcome hours: Monday–Thursday 5–7pm",
                    "The Tiger's Letter — our monthly newsletter",
                  ].map(b => (
                    <li key={b} className="flex items-start gap-3 text-white/60 text-sm">
                      <span className="text-gold mt-1.5 flex-shrink-0 text-xs">—</span>{b}
                    </li>
                  ))}
                </ul>
                <p className="text-white/70 leading-relaxed mb-8 text-sm">
                  The Tiger's Letter goes out monthly — what's on, what's new, what's worth knowing. 
                  Membership includes the newsletter automatically.
                </p>
                <a href="mailto:enquiries@theoldtigershead.com?subject=Tiger%20Club%20Membership"
                  className="inline-block bg-gold text-navy font-black tracking-widest px-10 py-4 uppercase hover:bg-white transition-colors sc">
                  Join the Tiger Club
                </a>
                <p className="text-white/30 text-xs mt-3">Email us and we'll get you set up.</p>
              </div>
              <div className="bg-navy flex items-center justify-center py-8">
                <img src="/LoyaltyCard_bg002942.png" alt="Tiger Club card" className="w-full max-w-xs" />
              </div>
            </div>
          </section>

          {/* News */}
          <section id="news">
            <h2 className="text-3xl font-black uppercase text-gold mb-10 sc">Pub News</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { title: "The Garden Is Open", date: "May 2026", body: "The beer garden is open from noon daily. Saturday BBQs are running through the summer — no booking needed, just turn up." },
                { title: "New on the Menu", date: "May 2026", body: "Three new dishes on the evening menu for spring. Full details on the menu page." },
              ].map(({ title, date, body }) => (
                <div key={title} className="border border-white/10 p-8 hover:border-gold transition-colors">
                  <p className="text-gold text-xs font-bold uppercase tracking-widest mb-3">{date}</p>
                  <h3 className="text-xl font-black uppercase text-white mb-3 sc">{title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{body}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Spotlights */}
          <section id="spotlights" className="relative overflow-hidden">
            <img src="/jazz.jpg" alt="The Tiger's Head" className="absolute inset-0 w-full h-full object-cover grayscale" />
            <div className="absolute inset-0 bg-navy/88" />
            <div className="relative z-10 p-12 md:p-16">
              <h2 className="text-3xl font-black uppercase text-gold mb-5 sc">Member Spotlights</h2>
              <p className="text-white/60 leading-relaxed max-w-xl mb-8">
                Every month we feature a Tiger Club member — their connection to Lee, and what keeps them coming back. 
                The Tiger is its people.
              </p>
              <p className="text-white/25 text-xs uppercase tracking-widest font-bold border border-white/10 inline-block px-5 py-3">
                First spotlights coming in June
              </p>
            </div>
          </section>

        </div>

        <footer className="py-12 bg-navy border-t border-white/10">
          <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-white/20 text-[10px] font-bold uppercase tracking-[0.25em] gap-4">
            <p>© 2026 The Old Tigers Head · 351 Lee High Road · London SE12 8RU</p>
            <div className="flex gap-6">
              <Link href="/faq" className="hover:text-white transition-colors">FAQ</Link>
              <Link href="/find-us" className="hover:text-white transition-colors">Find Us</Link>
              <Link href="/staff" className="hover:text-white transition-colors">Staff</Link>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
