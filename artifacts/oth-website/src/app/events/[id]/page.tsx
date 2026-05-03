"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { Calendar, Clock, Ticket, Share2, Facebook, Instagram, Twitter, ChevronLeft } from "lucide-react";

const eventsData: Record<string, any> = {
  "1": {
    title: "Friday Night Jazz",
    date: "Every Friday",
    time: "20:00 - Late",
    price: "Free Entry",
    img: "/jazz.jpg",
    description: "Experience the finest local jazz musicians in the heart of Lee. Our Friday night sessions have become a staple of the local music scene, offering a perfect blend of classic standards and contemporary improvisation. No booking required, just show up, soak in the atmosphere, and enjoy a pint of our finest ale while the music takes over.",
  },
  "2": {
    title: "Sunday Roast",
    date: "Every Sunday",
    time: "12:00 - 17:00",
    price: "From £16.50",
    img: "/sunday-roast.jpg",
    description: "The legendary Old Tigers Head Sunday Roast. We source the finest cuts from local butchers, served with massive Yorkshire puddings, honey-glazed carrots, parsnips, seasonal greens, and our signature 48-hour gravy. It's the talk of SE12 for a reason. Book ahead to avoid disappointment.",
  },
  "3": {
    title: "Quiz Night",
    date: "Every Sunday",
    time: "19:30 - 22:00",
    price: "£2 per person",
    img: "/quiz.jpg",
    description: "Test your knowledge at Lee's most competitive (but friendly) pub quiz. Teams of up to 6 people. Great prizes, including bar tabs and the chance to win the 'Rolling Jackpot'. It's the perfect way to wind down the weekend with friends and family.",
  },
  "4": {
    title: "Comedy Night",
    date: "First Thursday of the Month",
    time: "20:00 - 22:30",
    price: "£10 Tickets",
    img: "/comedy.jpg",
    description: "A monthly showcase of the best rising talent and established acts from the London comedy circuit. Intimate, hilarious, and always a sell-out. Grab your tickets early and come down for a night of laughs and great drinks.",
  },
  "5": {
    title: "Live Rugby",
    date: "Match Days",
    time: "Various",
    price: "Free Entry",
    img: "/sport.jpg",
    description: "Watch the big games with a proper atmosphere. We show all major international and premiership rugby matches on our large screens. There's no better place in Lee to cheer on your team with a crowd of fellow fans.",
  },
};

export default function EventDetail() {
  const { id } = useParams();
  const event = eventsData[id as string];

  if (!event) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-navy text-white">
        <div className="text-center">
          <h1 className="text-4xl font-black uppercase mb-4">Event Not Found</h1>
          <Link href="/#whats-on" className="text-gold uppercase tracking-widest hover:underline">
            Back to Events
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-navy text-white">
      {/* ── HERO ───────────────────────────────────────────── */}
      <section className="relative h-[60vh] overflow-hidden">
        <img
          src={event.img}
          alt={event.title}
          className="absolute inset-0 w-full h-full object-cover grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy to-transparent" />
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-12 px-6 text-center">
          <Link href="/#whats-on" className="absolute top-32 left-6 md:left-12 flex items-center gap-2 text-gold hover:text-white transition-colors uppercase text-xs font-bold tracking-widest">
            <ChevronLeft size={20} /> Back
          </Link>
          <h1 className="text-4xl md:text-7xl font-black uppercase text-gold mb-2">{event.title}</h1>
          <div className="flex flex-wrap justify-center gap-6 text-white/70 uppercase text-xs font-bold tracking-widest">
            <span className="flex items-center gap-2"><Calendar size={16} className="text-gold" /> {event.date}</span>
            <span className="flex items-center gap-2"><Clock size={16} className="text-gold" /> {event.time}</span>
            <span className="flex items-center gap-2"><Ticket size={16} className="text-gold" /> {event.price}</span>
          </div>
        </div>
      </section>

      {/* ── CONTENT ────────────────────────────────────────── */}
      <section className="py-24 max-w-3xl mx-auto px-6">
        <div className="prose prose-invert max-w-none mb-16">
          <p className="text-xl text-white/80 leading-relaxed italic border-l-4 border-gold pl-8">
            {event.description}
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-12 pt-12 border-t border-white/10">
          <Link
            href="/#book"
            className="bg-gold text-navy font-black tracking-widest px-12 py-5 uppercase hover:bg-white transition-colors w-full md:w-auto text-center"
          >
            Book Now
          </Link>
          
          <div className="flex items-center gap-6">
            <span className="text-xs font-bold tracking-widest uppercase text-white/40 flex items-center gap-2">
              <Share2 size={16} /> Share
            </span>
            <div className="flex gap-4">
              <button className="p-3 bg-white/5 border border-white/10 text-white hover:text-gold transition-colors">
                <Facebook size={20} />
              </button>
              <button className="p-3 bg-white/5 border border-white/10 text-white hover:text-gold transition-colors">
                <Instagram size={20} />
              </button>
              <button className="p-3 bg-white/5 border border-white/10 text-white hover:text-gold transition-colors">
                <Twitter size={20} />
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
