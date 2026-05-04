import Navbar from "@/components/Navbar";
import Link from "next/link";

export const metadata = {
  title: "About | The Old Tiger's Head · Lee Green SE12",
  description: "The story of The Old Tiger's Head — Grade II listed, Lee Green, established 1750. Meet the team.",
};

export default function OurPub() {
  return (
    <main className="bg-navy text-white pt-[68px]">

      {/* Page title — compact, not full screen */}
      <div className="relative h-[30vh] overflow-hidden flex items-end">
        <img src="/hist-oth-modern-red.jpg" alt="The Old Tiger's Head" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-navy/70" />
        <div className="relative z-10 max-w-5xl mx-auto px-6 pb-10 w-full">
          <h1 className="text-5xl md:text-7xl font-black uppercase text-gold sc">About</h1>
        </div>
      </div>

      {/* Meet the Team — Cream */}
      <section className="bg-cream py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-navy font-black uppercase text-3xl md:text-4xl mb-10 sc">Meet the Team</h2>
          <div className="relative overflow-hidden mb-8 border border-navy/10">
            <img src="/groupphoto.jpg" alt="The team at The Old Tiger's Head" className="w-full h-72 object-cover object-top" />
            <p className="text-navy/25 text-[10px] uppercase tracking-widest p-2 italic text-right">Team photo placeholder</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border border-navy/10 p-8">
              <h3 className="text-2xl font-black uppercase text-gold mb-1 sc">Rob</h3>
              <p className="text-xs font-bold tracking-widest uppercase text-navy/30 mb-4">Landlord</p>
              <p className="text-navy/70 text-sm leading-relaxed">
                Rob took on The Tiger on a 15-year lease with one goal: make it the place Lee Green deserves. 
                He'll usually know what you're having before you've sat down, 
                and he takes as much care of the building as he does his customers.
              </p>
            </div>
            <div className="border border-navy/10 p-8">
              <h3 className="text-2xl font-black uppercase text-gold mb-1 sc">Rob</h3>
              <p className="text-xs font-bold tracking-widest uppercase text-navy/30 mb-4">Head Chef</p>
              <p className="text-navy/70 text-sm leading-relaxed">
                The fish and chips have people coming from Blackheath. The 48-hour gravy on the Sunday roast 
                is his. Rob's kitchen runs on good ingredients, treated with care and cooked properly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Food photo divider */}
      <div className="w-full h-[35vh] overflow-hidden">
        <img src="/food-sausage.jpg" alt="Food at The Old Tiger's Head" className="w-full h-full object-cover" />
      </div>

      {/* History — Navy */}
      <section className="bg-navy py-16 px-6" id="story">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-gold font-black uppercase text-3xl md:text-4xl mb-8 sc">The History</h2>
          <div className="space-y-5 text-white/70 leading-relaxed mb-12">
            <p>
              The Tiger started as a coaching inn in the 1750s, when Lee Green was a stop on the road out of London. 
              The current building dates from 1896 and is Grade II listed — the original etched glass, 
              the carved woodwork, and the ceiling height are all still here.
            </p>
            <p>
              When the pub closed, the neighbourhood noticed. 
              Under Rob's stewardship on a 15-year lease, it is open again, and it intends to stay that way.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-12">
            {[
              { src: "/hist-oth-1880s.jpg", cap: "c.1880s" },
              { src: "/hist-1900s-lee-high-road.jpg", cap: "1900s" },
              { src: "/hist-1910s-lee-green-tram.jpg", cap: "1910s" },
              { src: "/hist-1930s-lee-green.jpg", cap: "1930s" },
              { src: "/hist-oth-2015.jpg", cap: "2015" },
              { src: "/hist-oth-modern-red.jpg", cap: "Today" },
            ].map(({ src, cap }) => (
              <div key={src} className="overflow-hidden border border-white/10 group">
                <img src={src} alt={cap} className="w-full h-32 object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                <p className="text-white/20 text-[10px] uppercase tracking-wider p-1.5 text-center">{cap}</p>
              </div>
            ))}
          </div>
          <div className="border border-white/10 p-8">
            <h3 className="text-gold text-xs font-black uppercase tracking-widest mb-5 sc">Find Out More</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { label: "Lee Manor Society", url: "https://leemanorsociety.org", desc: "Local history and conservation" },
                { label: "Lee Green Lives", url: "https://www.lgl.org.uk", desc: "Community group and archive" },
                { label: "Lewisham Local Studies", url: "https://lewisham.gov.uk/leisure/local-history", desc: "Council archive" },
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
        </div>
      </section>
    </main>
  );
}
