import Link from "next/link";

export const metadata = {
  title: "Join | The Old Tiger's Head · Lee Green SE12",
  description: "The Tiger Club membership, pub news, and events. The Old Tiger's Head community, Lee Green SE12.",
};

export default function Community() {
  return (
    <main className="bg-navy text-white pt-[68px]">

      {/* Compact page title */}
      <div className="bg-navy py-14 px-6 border-b border-white/10">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-black uppercase text-gold sc">Join</h1>
        </div>
      </div>

      {/* Tiger Club — Cream */}
      <section className="bg-cream py-16 px-6" id="tiger-club">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-gold text-xs font-black tracking-[0.4em] uppercase mb-3">Membership</p>
            <h2 className="text-navy font-black uppercase text-3xl md:text-4xl mb-6 sc">The Tiger Club</h2>
            <p className="text-navy/70 leading-relaxed mb-6">
              A way for us to provide you truly personalised service, to keep in touch about news and special events, and to offer you perks as a thank you for your support.
            </p>
            <ul className="space-y-3 mb-8">
              {[
                "A complimentary glass of bubbly on your birthday",
                "Every fifth visit as a party of 4 or more: your main course or a bottle of wine for the table, on us",
                "Personalised service at every visit — we will know your name and your order",
                "Members supper clubs and coffee mornings",
                "Early access to new menus and seasonal announcements",
                "The Tiger's Letter — our monthly members newsletter",
              ].map(b => (
                <li key={b} className="flex items-start gap-3 text-navy/60 text-sm">
                  <span className="text-gold mt-1.5 flex-shrink-0 text-xs">—</span>{b}
                </li>
              ))}
            </ul>
            <a href="mailto:enquiries@theoldtigershead.com?subject=Tiger%20Club%20Membership"
              className="inline-block bg-navy text-gold font-black tracking-widest px-10 py-4 uppercase hover:bg-gold hover:text-navy transition-colors sc text-sm">
              Join the Tiger Club
            </a>
          </div>
          <div className="bg-cream p-12 flex items-center justify-center">
            <img src="/tiger-club-card-transparent.png" alt="Tiger Club membership card" className="w-full max-w-sm"  />
          </div>
        </div>
      </section>

      {/* News — Navy */}
      <section className="bg-navy py-16 px-6" id="news">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-gold font-black uppercase text-3xl mb-10 sc">Pub News</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: "The Garden Is Open", date: "May 2026", body: "Summer is finally here and the garden is resplendent. It has a dedicated outside bar, beach huts, and this year a brand new BBQ. All that's missing is you." },
              { title: "Refurbishment Coming Soon", date: "May 2026", body: "Our historic home is having a refreshing paint job to help us provide a bright, polished space for you to enjoy." },
            ].map(({ title, date, body }) => (
              <div key={title} className="border border-white/10 p-8 hover:border-gold transition-colors">
                <p className="text-gold text-xs font-bold uppercase tracking-widest mb-3">{date}</p>
                <h3 className="text-xl font-black uppercase text-white mb-3 sc">{title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}
