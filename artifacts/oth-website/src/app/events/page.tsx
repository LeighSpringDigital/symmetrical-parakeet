import Navbar from "@/components/Navbar";
import Link from "next/link";
import { getOptionalRequestContext } from "@/lib/cloudflare-shim";
import { getEvents } from "@/lib/db/queries";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "Events | The Old Tiger's Head · Lee Green, SE12",
  description: "What's on at The Old Tiger's Head — garden BBQs, Sunday roasts, quiz nights, comedy, and live sport. Lee Green, SE12.",
};

const FALLBACK_EVENTS = [
  { id: 1, title: "Garden BBQ", date: "Every Saturday · From 1pm", img: "/sunday-roast.jpg", desc: "The garden is open, the grill is on. No booking needed — just show up." },
  { id: 2, title: "Sunday Roast", date: "Every Sunday · Last sitting 5pm", img: "/sunday-roast.jpg", desc: "The best roast in Lee Green. Book by Thursday — it sells out." },
  { id: 3, title: "Quiz Night", date: "Every Sunday · 7:30pm", img: "/quiz.jpg", desc: "Free entry. Teams of up to six. Prizes for the top three." },
  { id: 4, title: "Comedy Night", date: "First Thursday · 8pm", img: "/comedy.jpg", desc: "Proper stand-up in the Tiger Room. Tickets on the door." },
  { id: 5, title: "Live Sport", date: "Match Days", img: "/sport.jpg", desc: "Big screen in the main bar. Good atmosphere, cold beer." },
];

export default async function EventsPage() {
  let events = null;
  try {
    const ctx = getOptionalRequestContext();
    if (ctx?.env?.DB) events = await getEvents(ctx.env.DB);
  } catch {}
  const display = (events && events.length > 0) ? events : FALLBACK_EVENTS;

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-navy text-white pt-[120px] pb-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-16 flex items-end justify-between">
            <h1 className="text-5xl md:text-7xl font-black uppercase text-gold sc">What's On</h1>
            <Link href="/events/past" className="text-xs font-black tracking-widest uppercase text-white/30 hover:text-gold transition-colors border border-white/10 px-4 py-2 hover:border-gold">
              Past Events
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {display.map((event: any) => (
              <Link key={event.id} href={`/events/${event.id}`}
                className="relative aspect-[4/5] overflow-hidden border border-white/10 group block">
                <img src={event.imageUrl || event.img} alt={event.title}
                  className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <p className="text-gold text-xs font-bold tracking-widest uppercase mb-2">{event.date}</p>
                  <h2 className="text-white text-2xl font-black uppercase sc">{event.title}</h2>
                  {event.desc && <p className="text-white/60 text-sm mt-2">{event.desc}</p>}
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-16 pt-12 border-t border-white/10 text-center">
            <p className="text-white/40 text-sm mb-6">Interested in a private event?</p>
            <Link href="/private-hire" className="inline-block border-2 border-gold text-gold font-black tracking-widest px-10 py-4 uppercase hover:bg-gold hover:text-navy transition-all sc">
              Private Hire
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
