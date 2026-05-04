"use client";

import { useRef } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, MapPin, Phone, Mail } from "lucide-react";
import { featureFlags as mockFlags } from "@/lib/config";

const MOCK_EVENTS = [
  { id: 1, title: "Garden BBQ", date: "Every Saturday · From 1pm", img: "/sunday-roast.jpg", desc: "The garden is open, the grill is on." },
  { id: 2, title: "Sunday Roast", date: "Every Sunday · Last sitting 5pm", img: "/sunday-roast.jpg", desc: "Book by Thursday. It sells out." },
  { id: 3, title: "Quiz Night", date: "Every Sunday · 7:30pm", img: "/quiz.jpg", desc: "Free entry. Teams of up to six." },
  { id: 4, title: "Comedy Night", date: "First Thursday · 8pm", img: "/comedy.jpg", desc: "The Tiger Room. Proper stand-up." },
  { id: 5, title: "Live Sport", date: "Match Days", img: "/sport.jpg", desc: "Big screen. Good atmosphere." },
];

const TODAY_MENU = [
  { section: "Starters", items: [
    { name: "Soup of the Day", price: "£7.50", desc: "With sourdough" },
    { name: "Chicken Liver Pâté", price: "£9.00", desc: "Brioche, cornichons, red onion marmalade" },
  ]},
  { section: "Mains", items: [
    { name: "Tiger Burger", price: "£16.50", desc: "Dry-aged beef, secret sauce, triple-cooked chips" },
    { name: "Beer Battered Haddock", price: "£17.00", desc: "Chips, mushy peas, tartare" },
    { name: "Wild Mushroom Risotto", price: "£15.50", desc: "Aged parmesan, truffle oil" },
  ]},
  { section: "Puddings", items: [
    { name: "Sticky Toffee Pudding", price: "£8.00", desc: "Toffee sauce, vanilla ice cream" },
    { name: "Cheese & Biscuits", price: "£10.50", desc: "Three British cheeses" },
  ]},
];

export default function HomeClient({ initialEvents, settings }: { initialEvents: any[] | null; settings: any | null }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const displayEvents = (initialEvents && initialEvents.length > 0) ? initialEvents : MOCK_EVENTS;
  const flags = settings || mockFlags;

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const { scrollLeft, clientWidth } = scrollRef.current;
    scrollRef.current.scrollTo({ left: dir === "left" ? scrollLeft - clientWidth : scrollLeft + clientWidth, behavior: "smooth" });
  };

  return (
    <main>

      {/* ── HERO ─────────────────────────────────────── */}
      <section className="relative h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
        <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover z-0">
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
        {/* Warm amber-gold overlay */}
        <div className="absolute inset-0 z-0" style={{background:"linear-gradient(to bottom, rgba(0,20,40,0.4) 0%, rgba(25,14,0,0.58) 55%, rgba(0,41,66,0.75) 100%)"}} />
        <div className="relative z-10">
          <p className="text-gold text-sm md:text-lg font-black tracking-[0.5em] uppercase mb-1 sc">The Old</p>
          <h1 className="text-gold text-6xl md:text-[10rem] font-black uppercase tracking-tight leading-none mb-6 sc">
            Tigers Head
          </h1>
          <p className="text-white/60 text-xs md:text-sm font-bold tracking-[0.5em] uppercase mb-12">
            Est. 1750 · Lee Green, London
          </p>
          <Link href="/#book" className="inline-block bg-gold text-navy font-black tracking-[0.2em] px-12 py-5 uppercase hover:bg-white transition-colors sc">
            Book a Table
          </Link>
        </div>
      </section>

      {/* ── INTRO — text over full-width image ───────── */}
      <section className="relative min-h-[50vh] flex items-center">
        <img src="/hist-oth-modern-red.jpg" alt="The Old Tiger's Head" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-navy/75" />
        <div className="relative z-10 max-w-3xl mx-auto px-6 py-24 text-center">
          <h2 className="text-3xl md:text-5xl font-black uppercase text-gold mb-8 sc">Est. 1750</h2>
          <p className="text-white/85 text-lg md:text-xl leading-relaxed">
            The Tiger has stood at this crossroads for over 275 years. 
            The building is Grade II listed. The doors are open to everyone. 
            Come in — this pub belongs to the neighbourhood.
          </p>
        </div>
      </section>

      {/* ── SUNDAY ROAST FEATURE ─────────────────────── */}
      <section className="relative min-h-[70vh] flex items-end overflow-hidden">
        <img src="/sunday-roast.jpg" alt="Sunday Roast at The Old Tiger's Head" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0" style={{background:"linear-gradient(to top, rgba(0,41,66,0.95) 0%, rgba(0,41,66,0.4) 60%, transparent 100%)"}} />
        <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 pb-20 w-full grid md:grid-cols-2 gap-8 items-end">
          <div>
            <p className="text-gold text-xs font-black tracking-[0.4em] uppercase mb-3">Every Sunday</p>
            <h2 className="text-5xl md:text-7xl font-black uppercase text-white leading-none sc">Sunday<br/>Roast</h2>
          </div>
          <div>
            <p className="text-white/80 text-lg leading-relaxed mb-6">
              The roast books out by Thursday most weeks. 
              Proper joints, 48-hour gravy, Yorkshire pudding, all the trimmings. 
              Last sitting at 5pm — book ahead.
            </p>
            <div className="flex gap-4 flex-wrap">
              <Link href="/menu?type=sunday" className="bg-gold text-navy font-black tracking-widest px-8 py-3 uppercase hover:bg-white transition-colors sc">
                See the Menu
              </Link>
              <Link href="/#book" className="border-2 border-white text-white font-black tracking-widest px-8 py-3 uppercase hover:border-gold hover:text-gold transition-colors sc">
                Book a Table
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── TODAY'S MENU ─────────────────────────────── */}
      <section className="py-24 bg-cream">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-black uppercase text-navy sc">Today's Menu</h2>
            <div className="w-16 h-0.5 bg-gold mx-auto mt-6 mb-4" />
            <p className="text-navy/60 text-sm uppercase tracking-widest font-bold">Served 12:00 – 21:00</p>
          </div>
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            {TODAY_MENU.map(({ section, items }) => (
              <div key={section}>
                <h3 className="text-gold font-black uppercase tracking-widest text-xs mb-6 border-b border-navy/10 pb-3 sc">{section}</h3>
                <div className="space-y-5">
                  {items.map(item => (
                    <div key={item.name} className="flex justify-between items-start gap-4">
                      <div>
                        <p className="font-black text-navy uppercase text-sm sc">{item.name}</p>
                        <p className="text-navy/50 text-xs mt-0.5">{item.desc}</p>
                      </div>
                      <span className="text-gold font-black text-sm flex-shrink-0">{item.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link href="/menu" className="inline-block border-2 border-navy text-navy font-black tracking-widest px-10 py-4 uppercase hover:bg-navy hover:text-gold transition-all sc">
              Full Menu
            </Link>
          </div>
        </div>
      </section>

      {/* ── BEER GARDEN FEATURE ──────────────────────── */}
      <section className="relative min-h-[70vh] flex items-end overflow-hidden">
        <img src="/casper.jpg" alt="Beer garden at The Old Tiger's Head" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0" style={{background:"linear-gradient(to top, rgba(0,41,66,0.95) 0%, rgba(0,41,66,0.3) 60%, transparent 100%)"}} />
        <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 pb-20 w-full grid md:grid-cols-2 gap-8 items-end">
          <div>
            <p className="text-gold text-xs font-black tracking-[0.4em] uppercase mb-3">Open Daily from Noon</p>
            <h2 className="text-5xl md:text-7xl font-black uppercase text-white leading-none sc">The Beer<br/>Garden</h2>
          </div>
          <div>
            <p className="text-white/80 text-lg leading-relaxed mb-6">
              A proper outdoor space in the middle of Lee Green. Sheltered, decked, heated when it needs to be. 
              Dogs welcome. Saturday BBQs from 1pm through the summer.
            </p>
            <Link href="/#book" className="border-2 border-white text-white font-black tracking-widest px-8 py-3 uppercase hover:border-gold hover:text-gold transition-colors sc">
              Reserve a Garden Table
            </Link>
          </div>
        </div>
      </section>

      {/* ── WHAT'S ON ────────────────────────────────── */}
      <section id="whats-on" className="py-24 bg-navy overflow-hidden">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-4xl md:text-6xl font-black uppercase text-gold sc">What's On</h2>
            <div className="flex items-center gap-4">
              <Link href="/events/past" className="hidden md:block text-xs font-black tracking-widest uppercase text-white/30 hover:text-gold transition-colors border border-white/10 px-4 py-2 hover:border-gold">
                Past Events
              </Link>
              <button onClick={() => scroll("left")} className="p-3 border-2 border-gold text-gold hover:bg-gold hover:text-navy transition-colors">
                <ChevronLeft size={22} />
              </button>
              <button onClick={() => scroll("right")} className="p-3 border-2 border-gold text-gold hover:bg-gold hover:text-navy transition-colors">
                <ChevronRight size={22} />
              </button>
            </div>
          </div>
          <div ref={scrollRef} className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-6">
            {displayEvents.map((event: any) => (
              <Link key={event.id} href={`/events/${event.id}`}
                className="min-w-[280px] md:min-w-[380px] aspect-[4/5] relative group snap-start overflow-hidden border border-white/10 flex-shrink-0">
                <img src={event.imageUrl || event.img} alt={event.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <p className="text-gold text-xs font-bold tracking-widest uppercase mb-2">{event.date}</p>
                  <h3 className="text-white text-2xl font-black uppercase sc">{event.title}</h3>
                  {event.desc && <p className="text-white/60 text-sm mt-2">{event.desc}</p>}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── HISTORY STRIP — full width image with overlay text ── */}
      <section className="relative py-32 overflow-hidden">
        <img src="/hist-1900s-lee-high-road.jpg" alt="Lee High Road historical" className="absolute inset-0 w-full h-full object-cover grayscale" />
        <div className="absolute inset-0 bg-navy/80" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <p className="text-gold text-xs font-black tracking-[0.5em] uppercase mb-4">Since 1750</p>
          <h2 className="text-4xl md:text-6xl font-black uppercase text-white mb-8 sc">Part of Lee<br/>for 275 Years</h2>
          <p className="text-white/70 text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
            Originally a coaching inn, rebuilt in 1896, Grade II listed, and still standing at the same crossroads. 
            The Tiger has been the centre of this neighbourhood through everything.
          </p>
          <Link href="/our-pub#story" className="inline-block border-2 border-gold text-gold font-black tracking-widest px-10 py-4 uppercase hover:bg-gold hover:text-navy transition-all sc">
            Our Story
          </Link>
        </div>
      </section>

      {/* ── TIGER CLUB TEASER ────────────────────────── */}
      <section className="py-24 bg-navy border-t border-white/10">
        <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-gold text-xs font-black tracking-[0.4em] uppercase mb-4">Membership</p>
            <h2 className="text-4xl md:text-5xl font-black uppercase text-white mb-6 sc">The Tiger Club</h2>
            <p className="text-white/70 text-lg leading-relaxed mb-8">
              For the regulars, the neighbours, and the people who think of this place as theirs. 
              Members get priority booking, exclusive events, and service that knows your name.
            </p>
            <Link href="/community#tiger-club" className="inline-block bg-gold text-navy font-black tracking-widest px-10 py-4 uppercase hover:bg-white transition-colors sc">
              Find Out More
            </Link>
          </div>
          {/* Card on navy — background disappears */}
          <div className="flex items-center justify-center bg-navy">
            <img src="/LoyaltyCard_bg002942.png" alt="Tiger Club membership card" className="w-full max-w-sm" />
          </div>
        </div>
      </section>

      {/* ── BOOKING ──────────────────────────────────── */}
      <section id="book" className="py-24 bg-cream">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-6xl font-black uppercase text-navy mb-4 sc">Book a Table</h2>
          <div className="w-16 h-0.5 bg-gold mx-auto mb-10" />
          <p className="text-navy/70 mb-3 text-lg">Sunday tables book out by Thursday. Don't leave it to chance.</p>
          <p className="text-navy/50 mb-10 text-sm">
            Groups of 10 or more — call us on <a href="tel:02045680111" className="text-navy font-bold hover:text-gold transition-colors">020 4568 0111</a>
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <a href="https://wa.me/442045680111?text=I'd%20like%20to%20book%20a%20table%20at%20The%20Old%20Tiger's%20Head"
              target="_blank" rel="noopener noreferrer"
              className="bg-gold text-navy font-black tracking-widest px-12 py-5 uppercase hover:bg-navy hover:text-gold transition-colors border-2 border-gold sc">
              Book
            </a>
            <Link href="/private-hire"
              className="border-2 border-navy text-navy font-black tracking-widest px-10 py-5 uppercase hover:bg-navy hover:text-white transition-colors sc">
              Private Functions
            </Link>
          </div>
          <p className="text-navy/40 text-xs tracking-wide">
            Bookings are handled via WhatsApp. Your table isn't confirmed until you receive a reply from the team.
          </p>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────── */}
      <footer className="py-12 bg-navy border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8 mb-10">
          <div>
            <p className="text-gold font-black uppercase tracking-widest text-xs mb-4 sc">The Old Tigers Head</p>
            <p className="text-white/50 text-sm leading-relaxed">351 Lee High Road<br/>London SE12 8RU</p>
          </div>
          <div>
            <p className="text-gold font-black uppercase tracking-widest text-xs mb-4 sc">Opening Hours</p>
            <div className="text-white/50 text-sm space-y-1">
              <p>Mon–Thu: 12:00–23:00</p>
              <p>Fri–Sat: 12:00–00:00</p>
              <p>Sunday: 12:00–22:00</p>
            </div>
          </div>
          <div>
            <p className="text-gold font-black uppercase tracking-widest text-xs mb-4 sc">Contact</p>
            <div className="text-white/50 text-sm space-y-2">
              <a href="tel:02045680111" className="block hover:text-gold transition-colors">020 4568 0111</a>
              <a href="mailto:enquiries@theoldtigershead.com" className="block hover:text-gold transition-colors">enquiries@theoldtigershead.com</a>
            </div>
          </div>
        </div>
        <div className="max-w-6xl mx-auto px-6 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-white/25 text-[10px] font-bold uppercase tracking-[0.3em] gap-4">
          <p>© 2026 The Old Tigers Head</p>
          <div className="flex gap-6">
            <Link href="/faq" className="hover:text-white transition-colors">FAQ</Link>
            <Link href="/find-us" className="hover:text-white transition-colors">Find Us</Link>
            <Link href="/staff" className="hover:text-white transition-colors">Staff</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
