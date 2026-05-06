"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { Calendar, Clock, Ticket, Share2, Facebook, Instagram, Twitter, ChevronLeft } from "lucide-react";

const eventsData: Record<string, any> = {
  "2": {
    title: "Sunday Roast",
    date: "Every Sunday",
    time: "12:00 – 17:00",
    price: "From £16.50",
    img: "/sunday-roast.jpg",
    description: "Our Sunday roasts bring everyone together. Choose from slow-roasted pork belly, roast rump of beef, leg of lamb, or half roast chicken, all served with golden Yorkshire puddings, cauliflower cheese, roast potatoes, and rich gravy made fresh in our kitchen. Finish with comforting puddings such as berry crumble or lemon meringue pie. Book your table and make the day your own.",
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
    description: "A monthly showcase of the best rising talent and established acts from the London comedy circuit. Tables book up early. Come for the laughs, stay for the drinks.",
  },
  "5": {
    title: "Live Rugby",
    date: "Match Days",
    time: "Various",
    price: "Free Entry",
    img: "/sport.jpg",
    description: "Watch the big games in the right atmosphere. We show all major international and premiership rugby matches on our large screens. We show all major fixtures on our large screens in a warm, engaged atmosphere. Good sport deserves good company.",
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
