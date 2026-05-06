import Link from "next/link";

export const metadata = {
  title: "About | The Old Tiger's Head · Lee Green SE12",
  description: "The story of The Old Tiger's Head. Grade II listed, Lee Green, established 1750. Meet the team.",
};

export default function OurPub() {
  return (
    <main className="bg-navy text-white pt-[68px]">

      {/* Hero — team photo */}
      <div className="relative overflow-hidden" style={{height:"60vh"}}>
        <img src="/team-photo.png" alt="The team at The Old Tiger's Head"
          className="absolute inset-0 w-full h-full object-cover" style={{objectPosition:"center 25%"}} />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/30 via-transparent to-navy/80" />
        <div className="absolute bottom-0 left-0 right-0 max-w-5xl mx-auto px-6 pb-12 w-full">
          <h1 className="text-5xl md:text-7xl font-black uppercase text-gold sc">The Team</h1>
        </div>
      </div>

      {/* Rob bio + dog — Cream */}
      <section className="bg-cream py-16 px-6 -mt-8 relative z-10">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-10">

          {/* Rob — text only, no low-res photo */}
          <div className="border border-navy/10 p-8">
            <h3 className="text-2xl font-black uppercase text-gold mb-1 sc">Rob</h3>
            <p className="text-xs font-bold tracking-widest uppercase text-navy/30 mb-5">Landlord</p>
            <p className="text-navy/70 text-sm leading-relaxed">
              Over the decades he spent running some of London's biggest pubs, Rob assembled an
              exceptional, hand-picked team who simply love food, drink and customers. Their passion
              for what they do has transformed The Old Tiger's Head into the neighbourhood's primary
              social headquarters.
            </p>
          </div>

          {/* Dogs */}
          <div className="border border-navy/10 overflow-hidden">
            <div className="overflow-hidden" style={{height:"180px"}}>
              <img src="/dog-party.jpg" alt="Dogs welcome at The Old Tiger's Head"
                className="w-full h-full object-cover" style={{objectPosition:"center 30%"}} />
            </div>
            <div className="p-8">
              <h3 className="text-2xl font-black uppercase text-gold mb-1 sc">Dogs Welcome</h3>
              <p className="text-xs font-bold tracking-widest uppercase text-navy/30 mb-4">Four-Legged Guests</p>
              <p className="text-navy/70 text-sm leading-relaxed">
                Well-behaved dogs are welcome throughout the pub and in the garden. Water bowls on
                request. Our four-legged visitors are among our most enthusiastic.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Food photo divider */}
      <div className="w-full overflow-hidden" style={{height:"40vh"}}>
        <img src="/food-plating.jpg" alt="Food at The Old Tiger's Head"
          className="w-full h-full object-cover" style={{objectPosition:"center 30%"}} />
      </div>

      {/* History — Navy */}
      <section className="bg-navy py-16 px-6" id="story">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-gold font-black uppercase text-3xl md:text-4xl mb-8 sc">The Building</h2>

          <div className="space-y-5 text-white/70 leading-relaxed mb-12">
            <p>
              The Old Tiger's Head has stood at the Lee Green crossroads since 1750, when it opened
              as a coaching inn serving travellers on the road out of London. It quickly became a
              gathering point for the community, a role it has never stopped playing.
            </p>
            <p>
              The current building was constructed in 1896 and is now Grade II listed. The carved
              wooden bar and high ceilings are all still here. In the early 20th century the pub was
              a regular stop for tram workers from the Lee Green depot. During the Second World War
              it kept its doors open through the Blitz, serving the neighbourhood when it needed it most.
            </p>
            <p>
              After decades as one of South East London's best-known community pubs, the Tiger closed.
              The neighbourhood noticed. When it reopened under Rob's stewardship on a 15-year lease,
              people came back, and they keep coming.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-12">
            {[
              { src: "/hist-oth-1880s.jpg", cap: "c.1880s" },
              { src: "/hist-1900s-lee-high-road.jpg", cap: "Lee High Road, 1900s" },
              { src: "/hist-1910s-lee-green-tram.jpg", cap: "Lee Green Trams, 1910s" },
              { src: "/hist-1930s-lee-green.jpg", cap: "Lee Green, 1930s" },
              { src: "/hist-oth-2015.jpg", cap: "The Tiger, 2015" },
              { src: "/hero-exterior.jpg", cap: "Today" },
            ].map(({ src, cap }) => (
              <div key={src} className="overflow-hidden border border-white/10 group">
                <img src={src} alt={cap} className="w-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" style={{height:"128px"}} />
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
