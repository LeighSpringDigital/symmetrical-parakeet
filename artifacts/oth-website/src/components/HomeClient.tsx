"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, MapPin, Phone, Mail, Printer } from "lucide-react";
import { featureFlags as mockFlags } from "@/lib/config";

const MOCK_EVENTS = [
  { id: 1, title: "Friday Night Jazz", date: "Every Friday · Doors 8pm", img: "/jazz.jpg" },
  { id: 2, title: "Sunday Roast", date: "Every Sunday · Last sitting 5pm", img: "/sunday-roast.jpg" },
  { id: 3, title: "Quiz Night", date: "Every Sunday · 7:30pm", img: "/quiz.jpg" },
  { id: 4, title: "Comedy Night", date: "First Thursday · 8pm", img: "/comedy.jpg" },
  { id: 5, title: "Live Sport", date: "Match Days", img: "/sport.jpg" },
];

export default function HomeClient({
  initialEvents,
  settings,
}: {
  initialEvents: any[] | null;
  settings: any | null;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const heroTitleRef = useRef<HTMLDivElement>(null);
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

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="relative h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>

        {/* Warm gold-toned overlay — matches original brief */}
        <div className="absolute inset-0 z-0" style={{
          background: "linear-gradient(to bottom, rgba(0,15,30,0.45) 0%, rgba(30,18,0,0.55) 60%, rgba(0,41,66,0.7) 100%)"
        }} />

        <div className="relative z-10" ref={heroTitleRef}>
          {/* "The Old" sits above "Tigers Head" */}
          <p className="text-gold text-base md:text-xl font-black tracking-[0.45em] uppercase mb-1" style={{ fontVariant: "small-caps" }}>
            The Old
          </p>
          <h1 className="text-white text-6xl md:text-9xl font-black uppercase tracking-tight mb-2 leading-none" style={{ fontVariant: "small-caps" }}>
            Tigers Head
          </h1>
          <p className="text-gold/80 text-xs md:text-sm font-bold tracking-[0.5em] uppercase mb-12 mt-4">
            Est. 1750 · Lee Green, London
          </p>
          <Link
            href="/#book"
            className="inline-block bg-gold text-navy font-black tracking-[0.2em] px-12 py-5 uppercase hover:bg-white transition-colors text-base"
            style={{ fontVariant: "small-caps" }}
          >
            Book a Table
          </Link>
        </div>
      </section>

      {/* ── INTRO COPY ───────────────────────────────────── */}
      <section className="py-20 bg-navy">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-white/80 text-lg leading-relaxed">
            The Tiger has stood at this crossroads since 1750. It has outlasted empires, trams, and a great deal of bad weather. 
            We think that earns it a seat at the centre of Lee — and we intend to keep it there. 
            Come in, sit down. This pub belongs to the neighbourhood.
          </p>
        </div>
      </section>

      {/* ── WHAT'S ON ────────────────────────────────────── */}
      {flags.whatsOn && (
        <section id="whats-on" className="py-24 bg-navy overflow-hidden">
          <div className="max-w-[1600px] mx-auto px-6 md:px-12">
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-4xl md:text-6xl font-black uppercase text-gold" style={{ fontVariant: "small-caps" }}>
                What's On
              </h2>
              <div className="flex items-center gap-6">
                <Link
                  href="/events/past"
                  className="hidden md:block text-xs font-black tracking-widest uppercase text-white/40 hover:text-gold transition-colors border border-white/10 px-4 py-2 hover:border-gold"
                >
                  Past Events
                </Link>
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
                    <h3 className="text-white text-2xl font-black uppercase tracking-wider" style={{ fontVariant: "small-caps" }}>
                      {event.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── MENU TEASER ──────────────────────────────────── */}
      <section id="menu" className="py-24 bg-cream">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-6xl font-black uppercase text-navy mb-4" style={{ fontVariant: "small-caps" }}>
            Our Menu
          </h2>
          <div className="w-20 h-1 bg-gold mx-auto mb-10" />
          <p className="text-navy/80 text-lg mb-4 max-w-2xl mx-auto leading-relaxed">
            Rob's been in the kitchen since we reopened, and the Sunday roast books out by Thursday most weeks.
            Everything follows the same logic: good ingredients, cooked properly, no ceremony.
          </p>
          <p className="text-navy/60 text-base mb-12 max-w-xl mx-auto">
            If you haven't tried the roast yet, that's the place to start. Book ahead — it does run out.
          </p>
          <Link
            href="/menu"
            className="inline-block border-2 border-navy text-navy font-black tracking-widest px-10 py-4 uppercase hover:bg-navy hover:text-gold transition-all"
            style={{ fontVariant: "small-caps" }}
          >
            View Full Menu
          </Link>
        </div>
      </section>

      {/* ── BEER GARDEN ──────────────────────────────────── */}
      <section id="beer-garden" className="py-24 bg-navy">
        <div className="max-w-6xl mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-black uppercase text-gold mb-6" style={{ fontVariant: "small-caps" }}>
              The Beer Garden
            </h2>
            <div className="w-16 h-1 bg-gold mb-8" />
            <p className="text-white/80 text-lg leading-relaxed mb-6">
              One of the best kept secrets in Lee Green. A proper outdoor space — sheltered, decked, and 
              as good in a light drizzle as it is in the sun. Dogs welcome, heaters on, 
              Casper probably asleep by the wall.
            </p>
            <p className="text-white/60 text-base leading-relaxed">
              The garden opens from noon daily. On warm evenings it fills up quickly — 
              if you want a spot for a group, let us know when you book.
            </p>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden border border-white/10">
            <img
              src="/casper.jpg"
              alt="The beer garden at The Old Tiger's Head"
              className="absolute inset-0 w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
            />
          </div>
        </div>
      </section>

      {/* ── BOOKING ──────────────────────────────────────── */}
      {flags.onlineBooking && (
        <section id="book" className="py-24 bg-cream">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <h2 className="text-navy text-4xl md:text-6xl font-black uppercase mb-4" style={{ fontVariant: "small-caps" }}>
              Book a Table
            </h2>
            <div className="w-20 h-1 bg-gold mx-auto mb-10" />
            <p className="text-navy/70 mb-4 text-lg">
              Sunday tables typically book out by Thursday. Don't leave it to chance.
            </p>
            <p className="text-navy/50 mb-10 text-sm">
              For groups larger than 10, please call us directly on{" "}
              <a href="tel:02045680111" className="text-navy font-bold hover:text-gold transition-colors">020 4568 0111</a>.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <a
                href="https://wa.me/442045680111?text=I'd%20like%20to%20book%20a%20table%20at%20The%20Old%20Tiger's%20Head"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gold text-navy font-black tracking-widest px-12 py-5 uppercase hover:bg-navy hover:text-gold transition-colors border-2 border-gold"
                style={{ fontVariant: "small-caps" }}
              >
                Book
              </a>
              <Link
                href="/private-hire"
                className="border-2 border-navy text-navy font-black tracking-widest px-10 py-5 uppercase hover:bg-navy hover:text-white transition-colors"
                style={{ fontVariant: "small-caps" }}
              >
                Private Functions
              </Link>
            </div>

            <p className="text-navy/40 text-xs tracking-wide">
              Bookings are handled via WhatsApp. Your table isn't confirmed until you receive a reply from the team.
            </p>
          </div>
        </section>
      )}

      {/* ── VISIT & HOURS ────────────────────────────────── */}
      <section id="contact" className="py-24 bg-navy border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16">
          <div>
            <h2 className="text-gold text-4xl font-black uppercase mb-8" style={{ fontVariant: "small-caps" }}>Find Us</h2>
            <div className="space-y-6 text-white/80">
              <p className="flex items-start gap-4">
                <MapPin className="text-gold flex-shrink-0 mt-0.5" />
                351 Lee High Road, London SE12 8RU
              </p>
              <p className="flex items-start gap-4">
                <Phone className="text-gold flex-shrink-0 mt-0.5" />
                <a href="tel:02045680111" className="hover:text-gold transition-colors">020 4568 0111</a>
              </p>
              <p className="flex items-start gap-4">
                <Mail className="text-gold flex-shrink-0 mt-0.5" />
                <a href="mailto:enquiries@theoldtigershead.com" className="hover:text-gold transition-colors">
                  enquiries@theoldtigershead.com
                </a>
              </p>
            </div>
          </div>
          <div>
            <h3 className="text-gold font-black uppercase tracking-widest mb-6" style={{ fontVariant: "small-caps" }}>
              Opening Hours
            </h3>
            <div className="space-y-3 text-white/80">
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span>Mon – Thu</span> <span>12:00 – 23:00</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span>Fri – Sat</span> <span>12:00 – 00:00</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span>Sunday</span> <span>12:00 – 22:00</span>
              </div>
              <p className="text-xs text-white/40 mt-6 italic">
                Kitchen hours: Lunch 12:00 – 16:00 · Dinner 17:00 – 21:00
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────── */}
      <footer className="py-12 bg-navy border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-white/40 text-[10px] font-bold uppercase tracking-[0.3em] gap-8">
          <p>© 2026 The Old Tigers Head · 351 Lee High Road · London SE12 8RU</p>
          <div className="flex gap-8">
            <Link href="/faq" className="hover:text-white transition-colors">FAQ</Link>
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="/accessibility" className="hover:text-white transition-colors">Accessibility</Link>
            <Link href="/staff" className="hover:text-white transition-colors">Staff</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
