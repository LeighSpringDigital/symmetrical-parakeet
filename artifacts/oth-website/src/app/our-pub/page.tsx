import Navbar from "@/components/Navbar";
import Link from "next/link";

export const metadata = {
  title: "About | The Old Tiger's Head · Lee Green, SE12",
  description: "The story of The Old Tiger's Head — a Grade II listed pub in Lee Green, London, established 1750. Meet the team.",
};

export default function OurPub() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-navy text-white">

        {/* Hero over historical image */}
        <section className="relative h-[60vh] flex items-end overflow-hidden">
          <img src="/hist-oth-modern-red.jpg" alt="The Old Tiger's Head" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0" style={{background:"linear-gradient(to top, rgba(0,41,66,1) 0%, rgba(0,41,66,0.5) 60%, transparent 100%)"}} />
          <div className="relative z-10 max-w-4xl mx-auto px-6 pb-16 w-full">
            <h1 className="text-5xl md:text-8xl font-black uppercase text-gold sc">About</h1>
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-6 py-20">

          {/* ── MEET THE TEAM ──────────────────────── */}
          <section id="team" className="mb-24">
            <h2 className="text-3xl md:text-4xl font-black uppercase text-gold mb-10 sc">Meet the Team</h2>

            {/* Group photo */}
            <div className="relative overflow-hidden mb-10 border border-white/10">
              <img
                src="/groupphoto.jpg"
                alt="The team at The Old Tiger's Head"
                className="w-full h-auto object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
              <p className="text-white/30 text-[10px] uppercase tracking-widest p-3 italic text-right">
                Placeholder — team photo coming soon
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="border border-white/10 p-8">
                <h3 className="text-xl font-black uppercase text-gold mb-1 sc">Rob</h3>
                <p className="text-xs font-bold tracking-widest uppercase text-white/30 mb-4">Landlord</p>
                <p className="text-white/70 text-sm leading-relaxed">
                  Rob took on The Tiger on a 15-year lease with one objective: make it the proper centre of Lee Green again. 
                  He tends to know your order before you've asked, and he takes the building as seriously as the people in it.
                </p>
              </div>
              <div className="border border-white/10 p-8">
                <h3 className="text-xl font-black uppercase text-gold mb-1 sc">Rob</h3>
                <p className="text-xs font-bold tracking-widest uppercase text-white/30 mb-4">Head Chef</p>
                <p className="text-white/70 text-sm leading-relaxed">
                  The Sunday roast books out by Thursday most weeks — that's largely Rob's doing. 
                  His kitchen runs on provenance. He knows where everything comes from and he cooks it properly. 
                  The 48-hour gravy is his. So is the fish and chips.
                </p>
              </div>
            </div>
          </section>

          {/* ── THE HISTORY ────────────────────────── */}
          <section id="story" className="mb-24">
            <h2 className="text-3xl md:text-4xl font-black uppercase text-gold mb-10 sc">The History</h2>

            <div className="space-y-6 text-white/70 leading-relaxed mb-12">
              <p>
                The Tiger started as a coaching inn in the 1750s, when Lee Green was a stop on the road out of London. 
                Horse-drawn traffic, then trams, then the combustion engine — the pub has watched all of it from this corner.
              </p>
              <p>
                The current building dates from 1896. Grade II listed, with the original etched glass, 
                carved woodwork, and the kind of ceiling height that tells you immediately you're somewhere that matters. 
                When it closed, the neighbourhood noticed. When it reopened, people came back.
              </p>
              <p>
                Today, under Rob's stewardship on a 15-year lease, the work is straightforward: 
                run it properly, look after it, and make sure the people of Lee feel it belongs to them.
              </p>
            </div>

            {/* Historical photo grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
              {[
                { src: "/hist-oth-1880s.jpg", caption: "c.1880s" },
                { src: "/hist-1900s-lee-high-road.jpg", caption: "Lee High Road, 1900s" },
                { src: "/hist-1910s-lee-green-tram.jpg", caption: "Lee Green tram, 1910s" },
                { src: "/hist-1930s-lee-green.jpg", caption: "1930s" },
                { src: "/hist-oth-2015.jpg", caption: "2015" },
                { src: "/hist-oth-modern-red.jpg", caption: "Today" },
              ].map(({ src, caption }) => (
                <div key={src} className="relative overflow-hidden border border-white/10 group">
                  <img src={src} alt={caption} className="w-full h-40 object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                  <p className="text-white/30 text-[10px] uppercase tracking-wider p-2 text-center">{caption}</p>
                </div>
              ))}
            </div>

            {/* External links */}
            <div className="border border-white/10 p-8">
              <h3 className="text-sm font-black uppercase text-gold tracking-widest mb-6 sc">Learn More About Lee Green's History</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { label: "Lee Manor Society", url: "https://leemanorsociety.org", desc: "Local history and conservation" },
                  { label: "Lee Green Lives", url: "https://www.lgl.org.uk", desc: "Community group and archive" },
                  { label: "Lewisham Local Studies", url: "https://lewisham.gov.uk/leisure/local-history", desc: "Council archive and records" },
                  { label: "CAMRA — The Tiger's History", url: "https://camra.org.uk/pubs/old-tigers-head-lee-158536", desc: "Pub heritage listing" },
                ].map(({ label, url, desc }) => (
                  <a key={label} href={url} target="_blank" rel="noopener noreferrer"
                    className="flex items-start gap-4 p-4 border border-white/10 hover:border-gold transition-colors group">
                    <div>
                      <p className="text-white font-bold text-sm group-hover:text-gold transition-colors sc">{label}</p>
                      <p className="text-white/40 text-xs mt-1">{desc}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </section>

          {/* ── THE COMMUNITY ──────────────────────── */}
          <section id="community" className="relative overflow-hidden">
            <img src="/oth-king-celebration.jpg" alt="Community at The Old Tiger's Head" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-navy/85" />
            <div className="relative z-10 p-12 md:p-16">
              <h2 className="text-3xl md:text-4xl font-black uppercase text-gold mb-6 sc">The Community</h2>
              <p className="text-white/80 text-lg leading-relaxed max-w-2xl mb-6">
                The Tiger hosts local meetings, charity evenings, and community events. 
                If you have an idea — a fundraiser, a club night, a local society gathering — 
                come and talk to us.
              </p>
              <Link href="/private-hire" className="inline-block border-2 border-gold text-gold font-black tracking-widest px-8 py-3 uppercase hover:bg-gold hover:text-navy transition-all sc">
                Private Hire
              </Link>
            </div>
          </section>

        </div>
      </main>
    </>
  );
}
