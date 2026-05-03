"use client";

import { useRef } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, MapPin, Phone, Mail } from "lucide-react";

import { featureFlags as mockFlags } from "@/lib/config";

const MOCK_EVENTS = [
  { id: 1, title: "Friday Night Jazz", date: "Every Friday", img: "/jazz.jpg" },
  { id: 2, title: "Sunday Roast", date: "Every Sunday", img: "/sunday-roast.jpg" },
  { id: 3, title: "Quiz Night", date: "Every Sunday", img: "/quiz.jpg" },
  { id: 4, title: "Comedy Night", date: "Monthly", img: "/comedy.jpg" },
  { id: 5, title: "Live Rugby", date: "Match Days", img: "/sport.jpg" },
];

export default function HomeClient({ 
  initialEvents, 
  settings 
}: { 
  initialEvents: any[] | null;
  settings: any | null;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const displayEvents = initialEvents && initialEvents.length > 0 ? initialEvents : MOCK_EVENTS;
  const flags = settings || mockFlags;

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === "left" ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <main className="min-h-screen">
      {/* ── HERO ───────────────────────────────────────────── */}
      <section className="relative h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0 opacity-60"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 z-0 bg-navy/40" />
        <div className="relative z-10">
          <h1 className="text-gold text-5xl md:text-8xl font-black uppercase tracking-tight mb-4">
            The Old Tigers Head
          </h1>
          <p className="text-white text-sm md:text-xl font-bold tracking-[0.4em] uppercase mb-12">
            At the beating heart of Lee
          </p>
          <Link
            href="#book"
            className="inline-block bg-gold text-navy font-black tracking-[0.2em] px-12 py-5 uppercase hover:scale-105 transition-transform text-lg"
          >
            Book a Table
          </Link>
        </div>
      </section>

      {/* ── WHAT'S ON STRIP ────────────────────────────────── */}
      {flags.whatsOn && (
        <section id="whats-on" className="py-24 bg-navy overflow-hidden">
          <div className="max-w-[1600px] mx-auto px-6 md:px-12">
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-4xl md:text-6xl font-black uppercase text-gold">What&apos;s On</h2>
              <div className="hidden md:flex gap-4">
                <button
                  onClick={() => scroll("left")}
                  className="p-3 border-2 border-gold text-gold hover:bg-gold hover:text-navy transition-colors cursor-pointer"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={() => scroll("right")}
                  className="p-3 border-2 border-gold text-gold hover:bg-gold hover:text-navy transition-colors cursor-pointer"
                >
                  <ChevronRight size={24} />
                </button>
              </div>
            </div>

            <div
              ref={scrollRef}
              className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-8"
            >
              {displayEvents.map((event: any) => (
                <Link
                  key={event.id}
                  href={`/events/${event.id}`}
                  className="min-w-[300px] md:min-w-[400px] aspect-[4/5] relative group snap-start overflow-hidden border border-white/10"
                >
                  <img
                    src={event.imageUrl || event.img}
                    alt={event.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <span className="text-gold text-xs font-bold tracking-widest uppercase mb-2 block">
                      {event.date}
                    </span>
                    <h3 className="text-white text-2xl font-black uppercase tracking-wider">
                      {event.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── QUICK MENU ─────────────────────────────────────── */}
      <section id="menu" className="py-24 bg-cream">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-6xl font-black uppercase text-navy mb-4">Our Menu</h2>
          <div className="w-20 h-1 bg-gold mx-auto mb-12" />
          <p className="text-navy/70 text-lg mb-12 max-w-2xl mx-auto">
            Proper pub cooking, heritage surroundings, and a warm welcome for everyone. 
            From our legendary Sunday roasts to a quiet pint at the bar, this is heritage done right.
          </p>
          <Link
            href="/menu"
            className="inline-block border-2 border-navy text-navy font-black tracking-widest px-10 py-4 uppercase hover:bg-navy hover:text-gold transition-all"
          >
            View Full Menu
          </Link>
        </div>
      </section>

      {/* ── BOOKING ────────────────────────────────────────── */}
      {flags.onlineBooking && (
        <section id="book" className="py-24 bg-navy">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <h2 className="text-white text-4xl md:text-6xl font-black uppercase mb-4">Request a Table</h2>
            <div className="w-20 h-1 bg-gold mx-auto mb-12" />
            <p className="text-white/70 mb-12">
              Bookings are recommended, especially for our Sunday roasts. 
              For groups larger than 10, please contact us directly.
            </p>
            <button className="bg-gold text-navy font-black tracking-widest px-12 py-5 uppercase hover:bg-white transition-colors w-full md:w-auto">
              Book via WhatsApp
            </button>
          </div>
        </section>
      )}

      {/* ── VISIT & HOURS ──────────────────────────────────── */}
      <section id="contact" className="py-24 bg-navy border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16">
          <div>
            <h2 className="text-gold text-4xl font-black uppercase mb-8">Find Us</h2>
            <div className="space-y-6 text-white/80">
              <p className="flex items-start gap-4">
                <MapPin className="text-gold flex-shrink-0" /> 
                351 Lee High Road, London SE12 8RU
              </p>
              <p className="flex items-start gap-4">
                <Phone className="text-gold flex-shrink-0" /> 
                <a href="tel:02045680111" className="hover:text-gold transition-colors">020 4568 0111</a>
              </p>
              <p className="flex items-start gap-4">
                <Mail className="text-gold flex-shrink-0" /> 
                <a href="mailto:enquiries@theoldtigershead.com" className="hover:text-gold transition-colors">enquiries@theoldtigershead.com</a>
              </p>
            </div>
          </div>
          <div>
            <h3 className="text-gold font-black uppercase tracking-widest mb-6">Opening Hours</h3>
            <div className="space-y-3 text-white/80">
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span>Mon &ndash; Thu</span> <span>12:00 &ndash; 23:00</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span>Fri &ndash; Sat</span> <span>12:00 &ndash; 00:00</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span>Sunday</span> <span>12:00 &ndash; 22:00</span>
              </div>
              <p className="text-xs text-white/40 mt-6 italic">
                Kitchen hours: Lunch 12:00 &ndash; 16:00 | Dinner 17:00 &ndash; 21:00
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────── */}
      <footer className="py-12 bg-navy border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-white/40 text-[10px] font-bold uppercase tracking-[0.3em] gap-8">
          <p>&copy; 2026 The Old Tigers Head. Lee, London.</p>
          <div className="flex gap-8">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="/accessibility" className="hover:text-white transition-colors">Accessibility</Link>
            <Link href="/staff" className="hover:text-white transition-colors">Staff</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
