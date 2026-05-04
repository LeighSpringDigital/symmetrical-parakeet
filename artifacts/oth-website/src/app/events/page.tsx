import { getOptionalRequestContext } from "@/lib/cloudflare-shim";
import { getEvents } from "@/lib/db/queries";
import Link from "next/link";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "Events | The Old Tiger's Head · Lee Green SE12",
  description: "What's on at The Old Tiger's Head — garden BBQs, Sunday roasts, quiz nights, comedy, and live sport.",
};

const FALLBACK = [
  { id: 1, title: "Garden BBQ", date: "Every Saturday", sub: "From 1pm · No booking needed", img: "/food-fish-bar.jpg" },
  { id: 2, title: "Sunday Roast", date: "Every Sunday", sub: "Last sitting 5pm — book ahead", img: "/food-roast-beef.webp" },
  { id: 3, title: "Quiz Night", date: "Every Sunday", sub: "7:30pm · Free entry", img: "/quiz.jpg" },
  { id: 4, title: "Comedy Night", date: "First Thursday", sub: "8pm · Tiger Room", img: "/comedy.jpg" },
  { id: 5, title: "Live Sport", date: "Match Days", sub: "Big screen · Great atmosphere", img: "/sport.jpg" },
];

export default async function EventsPage() {
  let events = null;
  try {
    const ctx = getOptionalRequestContext();
    if (ctx?.env?.DB) events = await getEvents(ctx.env.DB);
  } catch {}
  const display = (events && events.length > 0) ? events : FALLBACK;

  return (
    <main className="bg-navy text-white pt-[68px]">
      <div className="bg-navy py-14 px-6 border-b border-white/10">
        <div className="max-w-5xl mx-auto flex items-end justify-between">
          <h1 className="text-5xl md:text-7xl font-black uppercase text-gold sc">What's On</h1>
          <Link href="/events/past" className="text-white/20 text-xs font-black uppercase tracking-widest hover:text-white transition-colors sc hidden md:block">
            Past Events
          </Link>
        </div>
      </div>

      {/* Horizontal scroll — Cream */}
      <section className="bg-cream py-16 overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="flex gap-5 overflow-x-auto pb-4" style={{scrollSnapType:"x mandatory"}}>
            {display.map((ev:any) => (
              <Link key={ev.id} href={`/events/${ev.id}`}
                className="min-w-[260px] md:min-w-[320px] aspect-[3/4] relative group overflow-hidden flex-shrink-0 border border-navy/10"
                style={{scrollSnapAlign:"start"}}>
                <img src={ev.imageUrl||ev.img} alt={ev.title}
                  className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-gold text-xs font-bold tracking-widest uppercase mb-1">{ev.date}</p>
                  {ev.sub && <p className="text-white/60 text-xs mb-2">{ev.sub}</p>}
                  <h3 className="text-white text-lg font-black uppercase sc">{ev.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Parties CTA — Navy */}
      <section className="bg-navy py-16 px-6 text-center">
        <h2 className="text-white font-black uppercase text-2xl mb-4 sc">Planning a Private Event?</h2>
        <p className="text-white/50 mb-8 max-w-md mx-auto text-sm">The Tiger Room seats 60 for dinner or 80 standing. Talk to us.</p>
        <Link href="/parties" className="inline-block bg-gold text-navy font-black uppercase tracking-widest px-10 py-4 hover:bg-white transition-colors sc text-sm">
          Enquire About Parties
        </Link>
      </section>
    </main>
  );
}
