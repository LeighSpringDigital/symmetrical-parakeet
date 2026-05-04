"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Printer } from "lucide-react";
import { featureFlags as mockFlags } from "@/lib/config";

const EVENTS = [
  { id: 2, title: "Sunday Roast", date: "Every Sunday", sub: "Last sitting 5pm", img: "/food-roast-beef.webp" },
  { id: 1, title: "Garden BBQ", date: "Every Saturday", sub: "From 1pm · No booking needed", img: "/food-fish-bar.jpg" },
  { id: 3, title: "Quiz Night", date: "Every Sunday", sub: "7:30pm · Free entry", img: "/quiz.jpg" },
  { id: 4, title: "Comedy Night", date: "First Thursday", sub: "8pm · Tiger Room", img: "/comedy.jpg" },
  { id: 5, title: "Live Sport", date: "Match Days", sub: "Big screen · Great atmosphere", img: "/sport.jpg" },
];

const MENU_TABS = [
  { key: "today", label: "Today" },
  { key: "sunday", label: "Sunday" },
  { key: "lunch", label: "Lunch" },
  { key: "children", label: "Children's" },
];

const MENU: Record<string, {section:string; items:{name:string; price:string; desc:string}[]}[]> = {
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
      { name: "Berry Crumble", price: "£8.00", desc: "Seasonal fruit, oat crumble, custard" },
    ]},
  ],
  sunday: [
    { section: "The Roast", items: [
      { name: "Sirloin of Beef", price: "£22.00", desc: "28-day dry-aged · Yorkshire pudding · roast potatoes · seasonal vegetables · 48-hour gravy" },
      { name: "Leg of Lamb", price: "£21.00", desc: "Slow-roasted · rosemary jus · all the trimmings" },
      { name: "Roast Chicken", price: "£19.50", desc: "Free-range · stuffing · bacon · the full works" },
      { name: "Nut Roast", price: "£17.00", desc: "Seasonal vegetables · mushroom gravy" },
    ]},
    { section: "Extras", items: [
      { name: "Extra Yorkshire Pudding", price: "£2.00", desc: "" },
      { name: "Extra Gravy", price: "£2.50", desc: "Beef or mushroom" },
      { name: "Cauliflower Cheese", price: "£5.00", desc: "Baked, gratiné" },
    ]},
    { section: "Puddings", items: [
      { name: "Sticky Toffee Pudding", price: "£8.00", desc: "Toffee sauce, vanilla ice cream" },
      { name: "Berry Crumble", price: "£8.00", desc: "Seasonal fruit, oat crumble, custard" },
    ]},
  ],
  lunch: [
    { section: "Boards & Sandwiches", items: [
      { name: "Ploughman's Board", price: "£13.50", desc: "Two cheeses, ham hock, pickles, bread, apple" },
      { name: "Club Sandwich", price: "£13.00", desc: "Chicken, bacon, lettuce, tomato, mayo, chips" },
      { name: "Smoked Salmon Bagel", price: "£12.00", desc: "Cream cheese, capers, dill, lemon" },
    ]},
    { section: "Mains", items: [
      { name: "Tiger Burger", price: "£16.50", desc: "Dry-aged beef, secret sauce, chips" },
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

export default function HomeClient({ initialEvents, settings }: { initialEvents:any[]|null; settings:any|null }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [tab, setTab] = useState("today");
  const events = (initialEvents && initialEvents.length > 0) ? initialEvents : EVENTS;
  const flags = settings || mockFlags;

  const scroll = (dir: "left"|"right") => {
    if (!scrollRef.current) return;
    const { scrollLeft, clientWidth } = scrollRef.current;
    scrollRef.current.scrollTo({ left: dir==="left" ? scrollLeft-clientWidth : scrollLeft+clientWidth, behavior:"smooth" });
  };

  return (
    <main>

      {/* ══ 1. HERO — Navy with video ══════════════════════════════ */}
      <section className="relative h-screen flex flex-col items-center justify-center text-center overflow-hidden bg-navy">
        <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover z-0 opacity-60">
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-navy/30 via-transparent to-navy/70" />
        <div className="relative z-10 px-6">
          <p className="text-gold font-black uppercase tracking-[0.5em] mb-1 text-sm md:text-base sc">The Old</p>
          <h1 className="text-gold font-black uppercase leading-none sc" style={{fontSize:"clamp(3.5rem,9vw,8rem)",letterSpacing:"0.05em"}}>
            Tigers Head
          </h1>
          <p className="text-white/50 font-bold uppercase tracking-[0.4em] text-xs mt-5 mb-10">
            Est. 1750 · Lee Green, London
          </p>
          <Link href="/book"
            className="inline-block bg-gold text-navy font-black uppercase tracking-[0.2em] px-10 py-4 hover:bg-white transition-colors sc text-sm">
            Book a Table
          </Link>
        </div>
      </section>

      {/* ══ 2. WELCOME — Cream ══════════════════════════════════════ */}
      <section className="bg-cream py-20 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-navy font-black uppercase text-3xl md:text-4xl mb-6 sc">Welcome to The Tiger</h2>
          <p className="text-navy/70 text-lg leading-relaxed">
            Grade II listed, established 1750, at the heart of Lee Green. 
            A pub run by people who care — about the food, the building, and the people who walk through the door. 
            Your family is welcome here.
          </p>
        </div>
      </section>

      {/* ══ 3. FOOD PHOTO — Full width divider ══════════════════════ */}
      <div className="w-full h-[50vh] md:h-[60vh] overflow-hidden">
        <img src="/food-roast-beef.webp" alt="Sunday roast at The Old Tiger's Head"
          className="w-full h-full object-cover object-center" />
      </div>

      {/* ══ 4. SUNDAY ROAST — Navy ══════════════════════════════════ */}
      <section className="bg-navy py-20 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-gold text-xs font-black tracking-[0.4em] uppercase mb-3">Every Sunday</p>
            <h2 className="text-white font-black uppercase text-4xl md:text-5xl mb-6 sc">Sunday Roast</h2>
            <p className="text-white/70 leading-relaxed mb-4">
              Proper joints, 48-hour gravy, hand-made Yorkshire puddings, roast potatoes, 
              and everything your Sunday should have. 
              Served from noon until 5pm — and it sells out most weeks.
            </p>
            <p className="text-white/50 text-sm mb-8">High chairs available. Children's roast on the menu.</p>
            <Link href="/book" className="inline-block bg-gold text-navy font-black uppercase tracking-[0.2em] px-8 py-3.5 hover:bg-white transition-colors sc text-sm">
              Book a Table
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <img src="/food-yorkshire.webp" alt="Yorkshire puddings" className="w-full h-48 object-cover" />
            <img src="/food-roast-chicken.jpg" alt="Roast chicken" className="w-full h-48 object-cover" />
            <img src="/food-crumble.jpg" alt="Berry crumble" className="w-full h-48 object-cover col-span-2" />
          </div>
        </div>
      </section>

      {/* ══ 5. MENU — Cream ══════════════════════════════════════════ */}
      <section id="menu" className="bg-cream py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
            <h2 className="text-navy font-black uppercase text-3xl md:text-4xl sc">Our Menu</h2>
            <div className="flex items-center gap-2 flex-wrap">
              {MENU_TABS.map(t => (
                <button key={t.key} onClick={() => setTab(t.key)}
                  className={`px-5 py-2 border-2 text-xs font-black uppercase tracking-wider transition-all sc ${
                    tab===t.key ? "bg-navy border-navy text-gold" : "border-navy/30 text-navy hover:border-navy"
                  }`}>
                  {t.label}
                </button>
              ))}
              <button onClick={() => window.print()} className="text-navy/30 hover:text-navy transition-colors p-2 no-print" title="Print menu">
                <Printer size={16} />
              </button>
            </div>
          </div>
          <p className="text-navy/40 text-xs uppercase tracking-widest font-bold mb-10">
            {tab === "sunday" ? "Served Sunday 12:00–17:00" : "Served daily 12:00–21:00"}
          </p>
          <div className="grid md:grid-cols-3 gap-10">
            {(MENU[tab]||MENU.today).map(({section, items}) => (
              <div key={section}>
                <h3 className="text-gold font-black uppercase text-xs tracking-widest border-b border-navy/10 pb-3 mb-5 sc">{section}</h3>
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
          <p className="text-navy/25 text-xs text-center mt-10 uppercase tracking-widest">
            Please inform your server of any allergies before ordering.
          </p>
        </div>
      </section>

      {/* ══ 6. FISH & CHIPS PHOTO — Full width divider ══════════════ */}
      <div className="w-full h-[45vh] overflow-hidden">
        <img src="/food-fish-chips.jpg" alt="Beer battered haddock at The Old Tiger's Head"
          className="w-full h-full object-cover object-center" />
      </div>

      {/* ══ 7. BEER GARDEN — Navy ═══════════════════════════════════ */}
      <section className="bg-navy py-20 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <img src="/casper.jpg" alt="The beer garden" className="w-full h-72 md:h-96 object-cover order-2 md:order-1" />
          <div className="order-1 md:order-2">
            <p className="text-gold text-xs font-black tracking-[0.4em] uppercase mb-3">Open Daily from Noon</p>
            <h2 className="text-white font-black uppercase text-4xl md:text-5xl mb-6 sc">The Beer Garden</h2>
            <p className="text-white/70 leading-relaxed mb-4">
              Sheltered, decked, and heated when needed. One of the best spots in Lee Green for a long afternoon. 
              Dogs welcome. Saturday BBQs from 1pm in summer.
            </p>
            <p className="text-white/50 text-sm mb-8">
              If you need a garden table for a group, mention it when you book.
            </p>
            <Link href="/book" className="inline-block border-2 border-gold text-gold font-black uppercase tracking-[0.2em] px-8 py-3.5 hover:bg-gold hover:text-navy transition-colors sc text-sm">
              Reserve a Table
            </Link>
          </div>
        </div>
      </section>

      {/* ══ 8. WHAT'S ON — Cream ════════════════════════════════════ */}
      <section className="bg-cream py-20 overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-navy font-black uppercase text-3xl md:text-4xl sc">What's On</h2>
            <div className="flex items-center gap-3">
              <Link href="/events" className="text-xs font-black uppercase tracking-widest text-navy/40 hover:text-navy transition-colors hidden md:block sc">
                All Events
              </Link>
              <button onClick={() => scroll("left")} className="p-2 border-2 border-navy/20 text-navy hover:border-navy transition-colors"><ChevronLeft size={18}/></button>
              <button onClick={() => scroll("right")} className="p-2 border-2 border-navy/20 text-navy hover:border-navy transition-colors"><ChevronRight size={18}/></button>
            </div>
          </div>
          <div ref={scrollRef} className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-2">
            {events.map((ev:any) => (
              <Link key={ev.id} href={`/events/${ev.id}`}
                className="min-w-[260px] md:min-w-[320px] aspect-[3/4] relative group snap-start overflow-hidden flex-shrink-0 border border-navy/10">
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

      {/* ══ 9. PARTIES & TIGER CLUB — Navy, side by side ════════════ */}
      <section className="bg-navy py-20 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10">
          <div className="border border-white/10 p-10">
            <p className="text-gold text-xs font-black tracking-[0.4em] uppercase mb-3">Private Events</p>
            <h2 className="text-white font-black uppercase text-3xl mb-4 sc">Parties</h2>
            <p className="text-white/60 leading-relaxed mb-6 text-sm">
              The Tiger Room seats 60 for dinner, 80 standing. High ceilings, original woodwork, 
              its own bar and entrance. Birthdays, anniversaries, corporate dinners — talk to us.
            </p>
            <Link href="/parties" className="inline-block bg-gold text-navy font-black uppercase tracking-wider px-7 py-3 hover:bg-white transition-colors sc text-xs">
              Enquire Now
            </Link>
          </div>
          <div className="border border-white/10 p-10">
            <p className="text-gold text-xs font-black tracking-[0.4em] uppercase mb-3">Membership</p>
            <h2 className="text-white font-black uppercase text-3xl mb-4 sc">The Tiger Club</h2>
            <p className="text-white/60 leading-relaxed mb-6 text-sm">
              Priority booking, members-only events, and a team that knows your name. 
              For the people who make this pub what it is.
            </p>
            <Link href="/community" className="inline-block border-2 border-gold text-gold font-black uppercase tracking-wider px-7 py-3 hover:bg-gold hover:text-navy transition-colors sc text-xs">
              Find Out More
            </Link>
          </div>
        </div>
      </section>

      {/* ══ 10. HISTORY STRIP — full bleed image with text ══════════ */}
      <div className="relative h-[40vh] overflow-hidden">
        <img src="/hist-oth-modern-red.jpg" alt="The Old Tiger's Head" className="absolute inset-0 w-full h-full object-cover grayscale" />
        <div className="absolute inset-0 bg-navy/75 flex items-center justify-center text-center px-6">
          <div>
            <p className="text-gold text-xs font-black tracking-[0.5em] uppercase mb-3 sc">Est. 1750</p>
            <h2 className="text-white font-black uppercase text-3xl md:text-5xl sc">Part of Lee Since 1750</h2>
            <Link href="/our-pub#story" className="inline-block mt-6 border border-gold text-gold font-black uppercase tracking-widest px-6 py-2.5 hover:bg-gold hover:text-navy transition-all sc text-xs">
              Our Story
            </Link>
          </div>
        </div>
      </div>

    </main>
  );
}
