import Navbar from "@/components/Navbar";
import Link from "next/link";

export const metadata = {
  title: "Private Hire | The Old Tiger's Head · Lee Green",
  description: "Hire The Tiger Room at The Old Tiger's Head for private events, celebrations, and corporate functions. Holds up to 80 guests in Lee Green, SE12.",
};

export default function PrivateHire() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-[120px] bg-navy text-white">

        {/* Hero */}
        <section className="py-20 px-6 text-center border-b border-white/10">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-black uppercase text-gold mb-6" style={{ fontVariant: "small-caps" }}>
              Private Hire
            </h1>
            <div className="w-20 h-1 bg-gold mx-auto mb-10" />
            <p className="text-xl text-white/70 leading-relaxed">
              The Tiger Room is one of the finest private event spaces in South East London.
              A Victorian ballroom-scale room with period features, flexible layout, and a bar.
              It's the kind of room that makes people feel like they're celebrating properly.
            </p>
          </div>
        </section>

        {/* Tiger Room detail */}
        <section className="py-24 px-6">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-black uppercase text-gold mb-6" style={{ fontVariant: "small-caps" }}>
                The Tiger Room
              </h2>
              <div className="space-y-5 text-white/70 leading-relaxed">
                <p>
                  The Tiger Room runs the full width of the building — high ceilings, original woodwork, 
                  and the kind of atmosphere that a modern events venue can spend a million pounds 
                  trying to replicate. It seats up to 60 for a dinner, or stands 80 for a drinks reception.
                </p>
                <p>
                  We can configure it for sit-down dinners, standing receptions, presentations, live 
                  performances, charity auctions, or anything else you have in mind. Rob and the team 
                  will work with you on catering, drinks packages, and anything else you need.
                </p>
                <p>
                  The room has its own bar, its own entrance from the street, and its own sound system.
                  If you need AV equipment, we can arrange it.
                </p>
              </div>

              <div className="mt-10 grid grid-cols-2 gap-6 text-sm">
                {[
                  { label: "Seated", value: "Up to 60" },
                  { label: "Standing", value: "Up to 80" },
                  { label: "Own Bar", value: "Yes" },
                  { label: "AV Available", value: "On request" },
                  { label: "Catering", value: "In-house" },
                  { label: "Street Access", value: "Private entrance" },
                ].map(({ label, value }) => (
                  <div key={label} className="border-l-2 border-gold pl-4">
                    <p className="text-white/40 text-xs uppercase tracking-widest font-bold">{label}</p>
                    <p className="text-white font-black text-lg mt-1" style={{ fontVariant: "small-caps" }}>{value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Placeholder for Tiger Room photos */}
            <div className="space-y-4">
              <div className="aspect-[4/3] bg-white/5 border border-white/10 flex items-center justify-center">
                <p className="text-white/20 text-xs uppercase tracking-widest font-bold text-center px-8">
                  Tiger Room photos coming soon
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="aspect-square bg-white/5 border border-white/10" />
                <div className="aspect-square bg-white/5 border border-white/10" />
              </div>
            </div>
          </div>
        </section>

        {/* Occasions */}
        <section className="py-20 px-6 bg-white/5 border-y border-white/10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-black uppercase text-gold mb-12 text-center" style={{ fontVariant: "small-caps" }}>
              What We Host
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { title: "Celebrations", items: ["Birthdays", "Anniversaries", "Retirements", "Engagements"] },
                { title: "Corporate", items: ["Team dinners", "Client events", "Away days", "Presentations"] },
                { title: "Community", items: ["Charity dinners", "Society meetings", "Fundraisers", "Wakes"] },
              ].map(({ title, items }) => (
                <div key={title} className="border border-white/10 p-8">
                  <h3 className="text-gold font-black uppercase tracking-widest mb-6 text-sm" style={{ fontVariant: "small-caps" }}>
                    {title}
                  </h3>
                  <ul className="space-y-2">
                    {items.map((item) => (
                      <li key={item} className="text-white/60 text-sm flex items-center gap-3">
                        <span className="w-1 h-1 bg-gold rounded-full flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Enquiry CTA */}
        <section className="py-24 px-6">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-black uppercase text-gold mb-6" style={{ fontVariant: "small-caps" }}>
              Make an Enquiry
            </h2>
            <p className="text-white/60 mb-10 leading-relaxed">
              Tell us your date, your rough numbers, and what you have in mind. 
              We'll come back to you promptly with availability and options.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/442045680111?text=I'd%20like%20to%20enquire%20about%20private%20hire%20at%20The%20Old%20Tiger's%20Head"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gold text-navy font-black tracking-widest px-12 py-5 uppercase hover:bg-white transition-colors"
                style={{ fontVariant: "small-caps" }}
              >
                Enquire via WhatsApp
              </a>
              <a
                href="mailto:enquiries@theoldtigershead.com?subject=Private%20Hire%20Enquiry"
                className="border-2 border-white/30 text-white font-black tracking-widest px-10 py-5 uppercase hover:border-gold hover:text-gold transition-colors"
                style={{ fontVariant: "small-caps" }}
              >
                Email Us
              </a>
            </div>
            <p className="text-white/30 text-xs mt-6 tracking-wide">
              We aim to respond to all private hire enquiries within 24 hours.
            </p>
          </div>
        </section>

      </main>
    </>
  );
}
