"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Printer, Star } from "lucide-react";
import { featureFlags as mockFlags } from "@/lib/config";
import { SmallCaps } from "@/lib/smallCaps";

const EVENTS = [
  { id: 2, title: "Sunday Roast", date: "Every Sunday", sub: "Last sitting 5pm — book ahead", img: "/food-roast-beef-new.png" },
  { id: 1, title: "Garden BBQ", date: "Every Saturday", sub: "From 1pm · No booking needed", img: "/garden-festoon.png" },
  { id: 3, title: "Quiz Night", date: "Every Sunday", sub: "7:30pm · Free entry", img: "/quiz.jpg" },
  { id: 4, title: "Comedy Night", date: "First Thursday", sub: "8pm · Tiger Room", img: "/comedy.jpg" },
  { id: 5, title: "Live Sport", date: "Match Days", sub: "Big screen · Great atmosphere", img: "/sport.jpg" },
];

const MENU_TABS = [
  { key: "today", label: "Today" },
  { key: "lunch", label: "Lunch" },
  { key: "sunday", label: "Sunday" },
  { key: "children", label: "Children" },
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
      { name: "Roast Chicken", price: "£19.50", desc: "Free-range · stuffing · bacon" },
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

  const scroll = (dir: "left"|"right") => {
    if (!scrollRef.current) return;
    const { scrollLeft, clientWidth } = scrollRef.current;
    scrollRef.current.scrollTo({ left: dir==="left" ? scrollLeft-clientWidth : scrollLeft+clientWidth, behavior:"smooth" });
  };

  return (
    <main>

      {/* ══ 1. HERO ══════════════════════════════════════════════════ */}
      <section className="relative h-screen flex flex-col items-center justify-center text-center overflow-hidden bg-navy">
        <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover z-0 opacity-55">
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-navy/20 via-transparent to-navy/80" />
        <div className="relative z-10 px-6">
          <h1 className="text-gold font-black leading-none" style={{fontSize:"clamp(2.4rem,8vw,6.5rem)", letterSpacing:"0.05em"}}>
            <SmallCaps>The Old Tiger&apos;s Head</SmallCaps>
          </h1>
          <p className="text-white/50 font-bold uppercase tracking-[0.4em] text-xs mt-5 mb-10">
            Est. 1750 · Lee Green, London
          </p>
          <Link href="/book" className="inline-block bg-gold text-navy font-black uppercase tracking-[0.2em] px-10 py-4 hover:bg-white transition-colors sc text-sm">
            Book a Table
          </Link>
        </div>
      </section>

      {/* ══ 2. WELCOME — Cream ═══════════════════════════════════════ */}
      <section className="bg-cream py-20 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-navy font-black uppercase text-3xl md:text-4xl mb-6 sc"><SmallCaps>Welcome</SmallCaps></h2>
          <p className="text-navy/70 text-lg leading-relaxed">
            The Old Tiger's Head has stood at the epicentre of Lee Green since 1750. 
            Grade II listed, the Victorian bar and high ceilings are all exactly as they were. 
            What has changed is everything behind them: the kitchen, the cellar, the standards and the team. 
            A neighbourhood pub for families, friends and regulars. The food is made here, the welcome is genuine, and the lease runs fifteen years.
          </p>
        </div>
      </section>

      {/* ══ 3. FOOD PHOTO DIVIDER — roast beef ══════════════════════ */}
      <div className="w-full overflow-hidden" style={{height:"55vh"}}>
        <img src="/food-roast-beef-new.png" alt="Sunday roast at The Old Tiger's Head"
          className="w-full h-full object-cover" style={{objectPosition:"center 30%"}} />
      </div>

      {/* ══ 4. SUNDAY ROAST — Navy ═══════════════════════════════════ */}
      <section className="bg-navy py-20 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-gold text-xs font-black tracking-[0.4em] uppercase mb-3">Every Sunday</p>
            <h2 className="text-white font-black uppercase text-4xl md:text-5xl mb-6 sc"><SmallCaps>Sunday Roast</SmallCaps></h2>
            <p className="text-white/70 leading-relaxed mb-4">
              48-hour gravy, hand-made Yorkshire puddings, and all the trimmings. 
              Served from noon until 5pm. High chairs available — children's roast on the menu.
            </p>
            <Link href="/book" className="inline-block bg-gold text-navy font-black uppercase tracking-[0.2em] px-8 py-3.5 hover:bg-white transition-colors sc text-sm">
              Book a Table
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="overflow-hidden" style={{height:"200px"}}>
              <img src="/food-roast-yorkshire.png" alt="Yorkshire puddings" className="w-full h-full object-cover" style={{objectPosition:"center 20%"}} />
            </div>
            <div className="overflow-hidden" style={{height:"200px"}}>
              <img src="/food-roast-chicken-new.png" alt="Roast chicken" className="w-full h-full object-cover" style={{objectPosition:"center 25%"}} />
            </div>
            <div className="overflow-hidden col-span-2" style={{height:"180px"}}>
              <img src="/food-crumble-new.png" alt="Berry crumble" className="w-full h-full object-cover" style={{objectPosition:"center 40%"}} />
            </div>
          </div>
        </div>
      </section>

      {/* ══ 5. MENU — Cream ══════════════════════════════════════════ */}
      <section id="menu" className="bg-cream py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
            <h2 className="text-navy font-black uppercase text-3xl md:text-4xl sc"><SmallCaps>Our Menu</SmallCaps></h2>
            <div className="flex items-center gap-2">
              {/* Equal width tabs */}
              <div className="grid grid-cols-4 gap-2 w-full md:w-auto">
                {MENU_TABS.map(t => (
                  <button key={t.key} onClick={() => setTab(t.key)}
                    className={`py-2.5 border-2 text-xs font-black uppercase tracking-wide transition-all sc text-center whitespace-nowrap ${
                      tab===t.key ? "bg-navy border-navy text-gold" : "border-navy/30 text-navy hover:border-navy"
                    }`} style={{minWidth:"80px"}}>
                    {t.label}
                  </button>
                ))}
              </div>
              <button onClick={() => window.print()} className="text-navy/30 hover:text-navy transition-colors p-2 no-print ml-1" title="Print menu">
                <Printer size={16} />
              </button>
            </div>
          </div>
          <p className="text-navy/30 text-xs uppercase tracking-widest font-bold mb-10">
            {tab==="sunday" ? "Served Sunday 12:00 – 17:00" : "Served daily 12:00 – 21:00"}
          </p>
          <div className="grid md:grid-cols-3 gap-10">
            {(MENU[tab]||MENU.today).map(({section, items}) => (
              <div key={section}>
                <h3 className="text-gold font-black uppercase text-xs tracking-widest border-b border-navy/10 pb-3 mb-6 sc"><SmallCaps>{section}</SmallCaps></h3>
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

      {/* ══ 6. FISH & CHIPS PHOTO DIVIDER ════════════════════════════ */}
      <div className="w-full overflow-hidden" style={{height:"50vh"}}>
        <img src="/food-fish-chips-single.png" alt="Beer battered haddock"
          className="w-full h-full object-cover" style={{objectPosition:"center 35%"}} />
      </div>

      {/* ══ 7. BEER GARDEN — Navy ════════════════════════════════════ */}
      <section className="bg-navy py-20 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="overflow-hidden order-2 md:order-1" style={{height:"380px"}}>
            <img src="/garden-festoon.png" alt="The beer garden at The Old Tiger's Head"
              className="w-full h-full object-cover" style={{objectPosition:"center center"}} />
          </div>
          <div className="order-1 md:order-2">
            <p className="text-gold text-xs font-black tracking-[0.4em] uppercase mb-3">Open Daily from Noon</p>
            <h2 className="text-white font-black uppercase text-4xl md:text-5xl mb-6 sc"><SmallCaps>The Beer Garden</SmallCaps></h2>
            <p className="text-white/70 leading-relaxed mb-4">
              Sheltered, decked, and heated when needed, our hidden oasis is the best spot in Lee Green 
              for a long afternoon. Dogs welcome. Saturday BBQs from 1pm in summer.
            </p>
            <Link href="/book" className="inline-block border-2 border-gold text-gold font-black uppercase tracking-[0.2em] px-8 py-3.5 hover:bg-gold hover:text-navy transition-colors sc text-sm">
              Reserve a Table
            </Link>
          </div>
        </div>
      </section>

      {/* ══ 8. WHAT'S ON — Cream ═════════════════════════════════════ */}
      <section className="bg-cream py-20 overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-navy font-black uppercase text-3xl md:text-4xl sc"><SmallCaps>What's On</SmallCaps></h2>
            <div className="flex items-center gap-3">
              <Link href="/events" className="text-xs font-black uppercase tracking-widest text-navy/40 hover:text-navy transition-colors hidden md:block sc">All Events</Link>
              <button onClick={() => scroll("left")} className="p-2 border-2 border-navy/20 text-navy hover:border-navy transition-colors"><ChevronLeft size={18}/></button>
              <button onClick={() => scroll("right")} className="p-2 border-2 border-navy/20 text-navy hover:border-navy transition-colors"><ChevronRight size={18}/></button>
            </div>
          </div>
          <div ref={scrollRef} className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-2">
            {events.map((ev:any) => (
              <Link key={ev.id} href={`/events/${ev.id}`}
                className="min-w-[260px] md:min-w-[300px] aspect-[3/4] relative group snap-start overflow-hidden flex-shrink-0 border border-navy/10">
                <img src={ev.imageUrl||ev.img} alt={ev.title}
                  className="absolute inset-0 w-full h-full object-cover md:grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-gold text-xs font-bold tracking-widest uppercase mb-1">{ev.date}</p>
                  {ev.sub && <p className="text-white/60 text-xs mb-2">{ev.sub}</p>}
                  <h3 className="text-white text-lg font-black uppercase sc"><SmallCaps>{ev.title}</SmallCaps></h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 9. PARTIES & TIGER CLUB — Navy ══════════════════════════ */}
      <section className="bg-navy py-20 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
          <div className="border border-white/10 p-10">
            <p className="text-gold text-xs font-black tracking-[0.4em] uppercase mb-3">Private Events</p>
            <h2 className="text-white font-black uppercase text-3xl mb-4 sc"><SmallCaps>Parties</SmallCaps></h2>
            <p className="text-white/60 leading-relaxed mb-6 text-sm">
              The Tiger Room runs the full width of the building. High ceilings, original woodwork, 
              its own bar and private entrance. Seats 60 for dinner or holds 80 for a standing reception.
            </p>
            <Link href="/parties" className="inline-block bg-gold text-navy font-black uppercase tracking-wider px-7 py-3 hover:bg-white transition-colors sc text-xs">
              Enquire Now
            </Link>
          </div>
          <div className="border border-white/10 p-10">
            <p className="text-gold text-xs font-black tracking-[0.4em] uppercase mb-3">Membership</p>
            <h2 className="text-white font-black uppercase text-3xl mb-4 sc"><SmallCaps>The Tiger Club</SmallCaps></h2>
            <p className="text-white/60 leading-relaxed mb-6 text-sm">
              Stay up to date with pub news and be first to hear about special events. Our team will always remember your personal needs and preferences. Every 5th time you visit as a party of 4 or more, your main course or a bottle of wine for the table is on us.
            </p>
            <div className="flex justify-center mb-6">
              <img src="/tiger-club-card-transparent.png" alt="Tiger Club membership card" className="w-72" style={{mixBlendMode:"screen"}} />
            </div>
            <Link href="/community" className="inline-block border-2 border-gold text-gold font-black uppercase tracking-wider px-7 py-3 hover:bg-gold hover:text-navy transition-colors sc text-xs">
              Find Out More
            </Link>
          </div>
        </div>
      </section>

      {/* ══ 10. REVIEW CTA — Cream ═══════════════════════════════════ */}
      <section className="bg-cream py-16 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <div className="flex justify-center gap-1 mb-4">
            {[...Array(5)].map((_, i) => <Star key={i} size={24} className="text-gold fill-gold" />)}
          </div>
          <h2 className="text-navy font-black uppercase text-2xl md:text-3xl mb-4 sc"><SmallCaps>Had a Good Time?</SmallCaps></h2>
          <p className="text-navy/60 mb-8 leading-relaxed">
            Reviews help other people in Lee Green find us. If you enjoyed your visit, 
            we'd love to hear about it.
          </p>
          <a href="https://search.google.com/local/writereview?placeid=ChIJf3aSzYkCdkgRQVYZ6Q3s7qA" target="_blank" rel="noopener noreferrer"
            className="inline-block bg-navy text-gold font-black uppercase tracking-[0.2em] px-10 py-4 hover:bg-gold hover:text-navy transition-colors sc text-sm">
            Leave a Review
          </a>
          <p className="text-navy/30 text-xs mt-4">Opens Google Reviews</p>
        </div>
      </section>

      {/* ══ 11. HISTORY STRIP ════════════════════════════════════════ */}
      <div className="relative overflow-hidden" style={{height:"38vh"}}>
        <img src="/hist-oth-modern-red.jpg" alt="The Old Tiger's Head" className="absolute inset-0 w-full h-full object-cover grayscale" />
        <div className="absolute inset-0 bg-navy/80 flex items-center justify-center text-center px-6">
          <div>
            <p className="text-gold text-xs font-black tracking-[0.5em] uppercase mb-3 sc">Est. 1750</p>
            <h2 className="text-white font-black uppercase sc" style={{fontSize:"clamp(1.4rem,4vw,3.5rem)"}}><SmallCaps>At The Epicentre Of Lee Since 1750</SmallCaps></h2>
            <Link href="/our-pub#story" className="inline-block mt-6 border border-gold text-gold font-black uppercase tracking-widest px-6 py-2.5 hover:bg-gold hover:text-navy transition-all sc text-xs">
              Our Story
            </Link>
          </div>
        </div>
      </div>

    </main>
  );
}
