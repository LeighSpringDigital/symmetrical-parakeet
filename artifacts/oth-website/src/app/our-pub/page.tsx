import Navbar from "@/components/Navbar";
import Link from "next/link";

export const metadata = {
  title: "About | The Old Tiger's Head · Lee Green, SE12",
  description: "The story of The Old Tiger's Head — a Grade II listed pub in Lee Green, London SE12, established 1750. Meet the team.",
};

export default function OurPub() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-navy text-white">

        <section className="relative h-[50vh] flex items-end overflow-hidden">
          <img src="/hist-oth-modern-red.jpg" alt="The Old Tiger's Head" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0" style={{background:"linear-gradient(to top, rgba(0,41,66,1) 0%, rgba(0,41,66,0.4) 70%, transparent 100%)"}} />
          <div className="relative z-10 max-w-5xl mx-auto px-6 pb-14 w-full">
            <h1 className="text-5xl md:text-8xl font-black uppercase text-gold sc">About</h1>
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-6 py-20 space-y-20">

          {/* Meet the Team */}
          <section id="team">
            <h2 className="text-3xl md:text-4xl font-black uppercase text-gold mb-10 sc">Meet the Team</h2>
            <div className="relative overflow-hidden mb-10 border border-white/10">
              <img src="/groupphoto.jpg" alt="The team at The Old Tiger's Head"
                className="w-full h-[400px] object-cover object-top" />
              <p className="text-white/20 text-[10px] uppercase tracking-widest p-3 italic text-right">
                Team photo placeholder — real photo coming soon
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="border border-white/10 p-8">
                <h3 className="text-xl font-black uppercase text-gold mb-1 sc">Rob</h3>
                <p className="text-xs font-bold tracking-widest uppercase text-white/30 mb-4">Landlord</p>
                <p className="text-white/70 text-sm leading-relaxed">
                  Rob took on The Tiger on a 15-year lease. His standard is simple: 
                  every person who walks through the door should feel immediately welcome and well looked after. 
                  He's usually the one who knows what you're having before you've sat down.
                </p>
              </div>
              <div className="border border-white/10 p-8">
                <h3 className="text-xl font-black uppercase text-gold mb-1 sc">Rob</h3>
                <p className="text-xs font-bold tracking-widest uppercase text-white/30 mb-4">Head Chef</p>
                <p className="text-white/70 text-sm leading-relaxed">
                  The Sunday roast books out by Thursday most weeks. 
                  Rob's kitchen runs on good ingredients, cooked well, without fuss. 
                  The 48-hour gravy is his. So is the fish and chips — people come from Blackheath for it.
                </p>
              </div>
            </div>
          </section>

          {/* The History */}
          <section id="story">
            <h2 className="text-3xl md:text-4xl font-black uppercase text-gold mb-10 sc">The History</h2>
            <div className="space-y-5 text-white/70 leading-relaxed mb-12">
              <p>
                The Tiger started as a coaching inn in the 1750s, when Lee Green was a stop on the road out of London. 
                It has stood at this crossroads through two centuries of change — horse-drawn carriages, trams, the Blitz, 
                the decades that followed — and it is still here.
              </p>
              <p>
                The current building dates from 1896 and is Grade II listed. 
                The original etched glass is still in the windows. The woodwork is original. 
                When the pub closed, the neighbourhood noticed. When it reopened under Rob's stewardship, 
                people came back — and kept coming.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
              {[
                { src: "/hist-oth-1880s.jpg", caption: "c.1880s" },
                { src: "/hist-1900s-lee-high-road.jpg", caption: "Lee High Road, 1900s" },
                { src: "/hist-1910s-lee-green-tram.jpg", caption: "1910s" },
                { src: "/hist-1930s-lee-green.jpg", caption: "1930s" },
                { src: "/hist-oth-2015.jpg", caption: "2015" },
                { src: "/hist-oth-modern-red.jpg", caption: "Today" },
              ].map(({ src, caption }) => (
                <div key={src} className="overflow-hidden border border-white/10 group">
                  <img src={src} alt={caption} className="w-full h-36 object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                  <p className="text-white/25 text-[10px] uppercase tracking-wider p-2 text-center">{caption}</p>
                </div>
              ))}
            </div>

            <div className="border border-white/10 p-8">
              <h3 className="text-sm font-black uppercase text-gold tracking-widest mb-5 sc">Find Out More</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { label: "Lee Manor Society", url: "https://leemanorsociety.org", desc: "Local history and conservation" },
                  { label: "Lee Green Lives", url: "https://www.lgl.org.uk", desc: "Community group and archive" },
                  { label: "Lewisham Local Studies", url: "https://lewisham.gov.uk/leisure/local-history", desc: "Council archive and records" },
                  { label: "CAMRA Pub Heritage", url: "https://camra.org.uk/pubs/old-tigers-head-lee-158536", desc: "Historic pub listing" },
                ].map(({ label, url, desc }) => (
                  <a key={label} href={url} target="_blank" rel="noopener noreferrer"
                    className="p-4 border border-white/10 hover:border-gold transition-colors group block">
                    <p className="text-white font-bold text-sm group-hover:text-gold transition-colors sc">{label}</p>
                    <p className="text-white/30 text-xs mt-1">{desc}</p>
                  </a>
                ))}
              </div>
            </div>
          </section>

        </div>

        {/* Footer */}
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
