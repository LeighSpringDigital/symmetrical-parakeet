"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Printer } from "lucide-react";
import { featureFlags as mockFlags } from "@/lib/config";

const MOCK_EVENTS = [
  { id: 1, title: "Garden BBQ", date: "Every Saturday · From 1pm", img: "/sunday-roast.jpg", desc: "The garden is open, the grill is on. No booking needed." },
  { id: 2, title: "Sunday Roast", date: "Every Sunday · Last sitting 5pm", img: "/sunday-roast.jpg", desc: "Book by Thursday — it sells out every week." },
  { id: 3, title: "Quiz Night", date: "Every Sunday · 7:30pm", img: "/quiz.jpg", desc: "Free entry. Teams of up to six." },
  { id: 4, title: "Comedy Night", date: "First Thursday · 8pm", img: "/comedy.jpg", desc: "The Tiger Room. Proper stand-up." },
  { id: 5, title: "Live Sport", date: "Match Days", img: "/sport.jpg", desc: "Big screen, great atmosphere." },
];

const MENU_TABS = [
  { key: "today", label: "Today" },
  { key: "sunday", label: "Sunday" },
  { key: "lunch", label: "Lunch" },
  { key: "children", label: "Children's" },
];

const MENU_DATA: Record<string, { section: string; items: { name: string; price: string; desc: string }[] }[]> = {
  today: [
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
  ],
  sunday: [
    { section: "The Roast", items: [
      { name: "Sirloin of Beef", price: "£22.00", desc: "28-day dry-aged, Yorkshire pudding, roast potatoes, seasonal vegetables, 48-hour gravy" },
      { name: "Leg of Lamb", price: "£21.00", desc: "Slow-roasted, rosemary jus, all the trimmings" },
      { name: "Roast Chicken", price: "£19.50", desc: "Free-range, stuffing, bacon, the full works" },
      { name: "Nut Roast", price: "£17.00", desc: "Seasonal vegetables, mushroom gravy" },
    ]},
    { section: "Extras", items: [
      { name: "Extra Yorkshire Pudding", price: "£2.00", desc: "" },
      { name: "Extra Gravy", price: "£2.50", desc: "Beef or mushroom" },
      { name: "Cauliflower Cheese", price: "£5.00", desc: "Baked, gratiné" },
    ]},
    { section: "Puddings", items: [
      { name: "Sticky Toffee Pudding", price: "£8.00", desc: "Toffee sauce, vanilla ice cream" },
      { name: "Apple & Blackberry Crumble", price: "£8.00", desc: "Oat crumble, custard or cream" },
    ]},
  ],
  lunch: [
    { section: "Boards & Sandwiches", items: [
      { name: "Ploughman's Board", price: "£13.50", desc: "Two cheeses, ham hock, pickles, bread, apple" },
      { name: "Club Sandwich", price: "£13.00", desc: "Chicken, bacon, lettuce, tomato, mayo, chips" },
      { name: "Smoked Salmon Bagel", price: "£12.00", desc: "Cream cheese, capers, dill, lemon" },
    ]},
    { section: "Mains", items: [
      { name: "Tiger Burger", price: "£16.50", desc: "Dry-aged beef, secret sauce, triple-cooked chips" },
      { name: "Beer Battered Haddock", price: "£17.00", desc: "Chips, mushy peas, tartare" },
      { name: "Caesar Salad", price: "£12.50", desc: "Romaine, parmesan, croutons, anchovy dressing" },
    ]},
  ],
  children: [
    { section: "Children's Menu", items: [
      { name: "Mini Beef Burger", price: "£8.50", desc: "With chips and salad" },
      { name: "Fish Goujons", price: "£8.50", desc: "Chips, peas, ketchup" },
      { name: "Pasta with Tomato Sauce", price: "£7.50", desc: "With parmesan" },
      { name: "Children's Sunday Roast", price: "£10.00", desc: "Chicken or beef, all the trimmings" },
    ]},
    { section: "Puddings", items: [
      { name: "Ice Cream", price: "£4.50", desc: "Two scoops" },
      { name: "Warm Brownie", price: "£5.50", desc: "Vanilla ice cream" },
    ]},
  ],
};

export default function HomeClient({ initialEvents, settings }: { initialEvents: any[] | null; settings: any | null }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState("today");
  const displayEvents = (initialEvents && initialEvents.length > 0) ? initialEvents : MOCK_EVENTS;
  const flags = settings || mockFlags;

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const { scrollLeft, clientWidth } = scrollRef.current;
    scrollRef.current.scrollTo({ left: dir === "left" ? scrollLeft - clientWidth : scrollLeft + clientWidth, behavior: "smooth" });
  };

  const menuData = MENU_DATA[activeTab] || MENU_DATA.today;

  return (
    <main>

      {/* ── HERO ──────────────────────────────────── */}
      <section className="relative h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
        <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover z-0">
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 z-0" style={{background:"linear-gradient(to bottom, rgba(0,20,40,0.35) 0%, rgba(20,10,0,0.55) 50%, rgba(0,41,66,0.8) 100%)"}} />
        <div className="relative z-10">
          <p className="text-gold text-sm md:text-base font-black tracking-[0.5em] uppercase mb-0 sc">The Old</p>
          <h1 className="text-gold font-black uppercase leading-none sc" style={{fontSize:"clamp(4rem,12vw,11rem)"}}>
            Tigers Head
          </h1>
          <p className="text-white/50 text-xs md:text-sm font-bold tracking-[0.5em] uppercase mt-4 mb-10">
            Est. 1750 · Lee Green, London
          </p>
          <Link href="/book" className="inline-block bg-gold text-navy font-black tracking-[0.2em] px-12 py-4 uppercase hover:bg-white transition-colors sc">
            Book a Table
          </Link>
        </div>
      </section>

      {/* ── INTRO ─────────────────────────────────── */}
      <section className="relative min-h-[40vh] flex items-center">
        <img src="/hist-oth-modern-red.jpg" alt="The Old Tiger's Head" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-navy/80" />
        <div className="relative z-10 max-w-2xl mx-auto px-6 py-20 text-center">
          <p className="text-white/85 text-lg md:text-xl leading-relaxed">
            The Tiger has been at this crossroads since 1750. Grade II listed. 
            Run by people who care about it. Open to everyone. 
            There's a table here for you.
          </p>
        </div>
      </section>

      {/* ── SUNDAY ROAST ─────────────────────────── */}
      <section className="relative min-h-[65vh] flex items-end overflow-hidden">
        <img src="/sunday-roast.jpg" alt="Sunday Roast" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0" style={{background:"linear-gradient(to top, rgba(0,41,66,0.97) 0%, rgba(0,41,66,0.3) 65%, transparent 100%)"}} />
        <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 pb-16 w-full grid md:grid-cols-2 gap-8 items-end">
          <div>
            <p className="text-gold text-xs font-black tracking-[0.4em] uppercase mb-2">Every Sunday</p>
            <h2 className="text-5xl md:text-7xl font-black uppercase text-white leading-none sc">Sunday<br/>Roast</h2>
          </div>
          <div>
            <p className="text-white/80 text-base leading-relaxed mb-6">
              Proper joints, 48-hour gravy, Yorkshire pudding, roast potatoes, seasonal vegetables. 
              Everything your Sunday deserves. Last sitting at 5pm — and it sells out most weeks. 
              Book by Thursday to be sure of a table.
            </p>
            <div className="flex gap-3 flex-wrap">
              <Link href="/book" className="bg-gold text-navy font-black tracking-widest px-8 py-3 uppercase hover:bg-white transition-colors sc">Book a Table</Link>
              <button onClick={() => setActiveTab("sunday")} className="border-2 border-white text-white font-black tracking-widest px-6 py-3 uppercase hover:border-gold hover:text-gold transition-colors sc">See the Menu</button>
            </div>
          </div>
        </div>
      </section>

      {/* ── FULL MENU SECTION ─────────────────────── */}
      <section id="menu" className="py-20 bg-cream">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <h2 className="text-4xl md:text-5xl font-black uppercase text-navy sc">Our Menu</h2>
              <p className="text-navy/50 text-sm mt-2 uppercase tracking-widest font-bold">Served 12:00 – 21:00 daily</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex gap-2 flex-wrap">
                {MENU_TABS.map(tab => (
                  <button key={tab.key} onClick={() => setActiveTab(tab.key)}
                    className={`px-5 py-2 border-2 text-xs font-black uppercase tracking-widest transition-all sc ${
                      activeTab === tab.key ? "bg-navy border-navy text-gold" : "border-navy text-navy hover:bg-navy hover:text-white"
                    }`}>
                    {tab.label}
                  </button>
                ))}
              </div>
              <button onClick={() => window.print()} className="text-navy/30 hover:text-navy transition-colors" title="Print menu">
                <Printer size={18} />
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {menuData.map(({ section, items }) => (
              <div key={section}>
                <h3 className="text-gold font-black uppercase tracking-widest text-xs border-b border-navy/10 pb-3 mb-6 sc">{section}</h3>
                <div className="space-y-5">
                  {items.map(item => (
                    <div key={item.name} className="flex justify-between items-start gap-3">
                      <div>
                        <p className="font-black text-navy text-sm uppercase sc">{item.name}</p>
                        {item.desc && <p className="text-navy/50 text-xs mt-0.5">{item.desc}</p>}
                      </div>
                      <span className="text-gold font-black text-sm flex-shrink-0">{item.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <p className="text-navy/30 text-xs text-center mt-10 uppercase tracking-widest">
            Please inform your server of any allergies. Menu subject to availability.
          </p>
        </div>
      </section>

      {/* ── BEER GARDEN ───────────────────────────── */}
      <section className="relative min-h-[65vh] flex items-end overflow-hidden">
        <img src="/casper.jpg" alt="The beer garden" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0" style={{background:"linear-gradient(to top, rgba(0,41,66,0.97) 0%, rgba(0,41,66,0.3) 65%, transparent 100%)"}} />
        <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 pb-16 w-full grid md:grid-cols-2 gap-8 items-end">
          <div>
            <p className="text-gold text-xs font-black tracking-[0.4em] uppercase mb-2">Open Daily from Noon</p>
            <h2 className="text-5xl md:text-7xl font-black uppercase text-white leading-none sc">The Beer<br/>Garden</h2>
          </div>
          <div>
            <p className="text-white/80 text-base leading-relaxed mb-6">
              One of the best spots in Lee Green — sheltered, decked, heated when needed, and open all year. 
              Dogs welcome. Saturday BBQs from 1pm through the summer. 
              If you want a table outside for a group, mention it when you book.
            </p>
            <Link href="/book" className="border-2 border-white text-white font-black tracking-widest px-8 py-3 uppercase hover:border-gold hover:text-gold transition-colors sc">
              Reserve a Garden Table
            </Link>
          </div>
        </div>
      </section>

      {/* ── WHAT'S ON ─────────────────────────────── */}
      <section id="whats-on" className="py-20 bg-navy overflow-hidden">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-4xl md:text-5xl font-black uppercase text-gold sc">What's On</h2>
            <div className="flex items-center gap-3">
              <Link href="/events" className="hidden md:block text-xs font-black tracking-widest uppercase text-white/30 hover:text-gold transition-colors border border-white/10 px-4 py-2 hover:border-gold">
                All Events
              </Link>
              <button onClick={() => scroll("left")} className="p-2.5 border-2 border-gold text-gold hover:bg-gold hover:text-navy transition-colors"><ChevronLeft size={20} /></button>
              <button onClick={() => scroll("right")} className="p-2.5 border-2 border-gold text-gold hover:bg-gold hover:text-navy transition-colors"><ChevronRight size={20} /></button>
            </div>
          </div>
          <div ref={scrollRef} className="flex gap-5 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4">
            {displayEvents.map((event: any) => (
              <Link key={event.id} href={`/events/${event.id}`}
                className="min-w-[260px] md:min-w-[360px] aspect-[4/5] relative group snap-start overflow-hidden flex-shrink-0 border border-white/10">
                <img src={event.imageUrl || event.img} alt={event.title}
                  className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-gold text-xs font-bold tracking-widest uppercase mb-1">{event.date}</p>
                  <h3 className="text-white text-xl font-black uppercase sc">{event.title}</h3>
                  {event.desc && <p className="text-white/50 text-xs mt-1">{event.desc}</p>}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── TIGER CLUB ────────────────────────────── */}
      <section className="py-20 bg-navy border-t border-white/10">
        <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div className="bg-navy flex items-center justify-center">
            <img src="/LoyaltyCard_bg002942.png" alt="Tiger Club card" className="w-full max-w-xs" />
          </div>
          <div>
            <p className="text-gold text-xs font-black tracking-[0.4em] uppercase mb-4">Membership</p>
            <h2 className="text-4xl font-black uppercase text-white mb-4 sc">The Tiger Club</h2>
            <p className="text-white/60 leading-relaxed mb-8">
              Priority booking, members-only events, and a team that knows your name. 
              For the people who consider this pub theirs.
            </p>
            <Link href="/community#tiger-club" className="inline-block bg-gold text-navy font-black tracking-widest px-10 py-4 uppercase hover:bg-white transition-colors sc">
              Find Out More
            </Link>
          </div>
        </div>
      </section>

      {/* ── HISTORY STRIP ─────────────────────────── */}
      <section className="relative py-28 overflow-hidden">
        <img src="/hist-1900s-lee-high-road.jpg" alt="Lee Green historical" className="absolute inset-0 w-full h-full object-cover grayscale" />
        <div className="absolute inset-0 bg-navy/82" />
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-black uppercase text-white mb-6 sc">Part of Lee<br/>Since 1750</h2>
          <p className="text-white/60 text-base leading-relaxed mb-8 max-w-xl mx-auto">
            Originally a coaching inn, rebuilt in 1896, Grade II listed. 
            The Tiger has been the centre of this neighbourhood through everything Lee has seen.
          </p>
          <Link href="/our-pub#story" className="inline-block border-2 border-gold text-gold font-black tracking-widest px-8 py-3 uppercase hover:bg-gold hover:text-navy transition-all sc">
            Our Story
          </Link>
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────── */}
      <footer className="py-16 bg-navy border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-10 mb-12">
          <div>
            <p className="text-gold font-black uppercase tracking-widest text-xs mb-4 sc">The Old Tigers Head</p>
            <p className="text-white/40 text-sm leading-relaxed">351 Lee High Road<br/>London SE12 8RU</p>
          </div>
          <div>
            <p className="text-gold font-black uppercase tracking-widest text-xs mb-4 sc">Opening Hours</p>
            <div className="text-white/40 text-sm space-y-1">
              <p>Mon–Thu: 12:00–23:00</p>
              <p>Fri–Sat: 12:00–00:00</p>
              <p>Sunday: 12:00–22:00</p>
              <p className="text-white/20 text-xs mt-2">Kitchen closes at 21:00</p>
            </div>
          </div>
          <div>
            <p className="text-gold font-black uppercase tracking-widest text-xs mb-4 sc">Get in Touch</p>
            <div className="text-white/40 text-sm space-y-2">
              <a href="tel:02045680111" className="block hover:text-gold transition-colors">020 4568 0111</a>
              <a href="mailto:enquiries@theoldtigershead.com" className="block hover:text-gold transition-colors">enquiries@theoldtigershead.com</a>
            </div>
          </div>
        </div>
        <div className="max-w-6xl mx-auto px-6 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-white/20 text-[10px] font-bold uppercase tracking-[0.25em] gap-4">
          <p>© 2026 The Old Tigers Head · Lee Green · London SE12 8RU</p>
          <div className="flex gap-6">
            <Link href="/faq" className="hover:text-white transition-colors">FAQ</Link>
            <Link href="/find-us" className="hover:text-white transition-colors">Find Us</Link>
            <Link href="/our-pub" className="hover:text-white transition-colors">About</Link>
            <Link href="/staff" className="hover:text-white transition-colors">Staff</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
