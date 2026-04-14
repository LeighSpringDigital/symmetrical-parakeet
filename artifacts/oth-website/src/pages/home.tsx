import { useState, useEffect } from "react";
import { Search, Menu, X, ChevronRight, ChevronDown, Calendar, Clock, MapPin, Phone, Mail } from "lucide-react";
import { useGetWhatsOn, useGetMenu, Event, MenuSection, MenuItem } from "@workspace/api-client-react";
import { Spinner } from "@/components/ui/spinner";

const NAVY = "#002942";
const GOLD = "#C9A227";
const FONT = "'Century Gothic', 'Avant Garde', CenturyGothic, AppleGothic, sans-serif";

const navLinksLeft = [
  { label: "What's On", href: "#whats-on" },
  { label: "Visit", href: "#visit" },
  { label: "About", href: "#about" },
  { label: "Food", href: "#food" },
  { label: "Venue Hire", href: "#hire" },
];

const hardcodedWhatsOn = [
  { day: "Every Friday", time: "8pm – late", title: "Friday Night Jazz", desc: "Live jazz from local musicians in the bar. No booking required — just show up and soak it in.", tag: "Music" },
  { day: "Every Sunday", time: "12pm – 5pm", title: "Sunday Roast & Live Rugby", desc: "Our legendary Sunday roast served while the big game plays. Book a table to guarantee your spot.", tag: "Food & Sport" },
  { day: "Every Tuesday", time: "7:30pm", title: "Quiz Night", desc: "The best pub quiz in Lee. Teams of up to 6. Prizes, laughs, and a pint or two.", tag: "Quiz" },
  { day: "Monthly", time: "Various", title: "Comedy Night", desc: "Stand-up comedy from rising and established acts. Tickets available at the bar.", tag: "Comedy" },
  { day: "Saturday 3 May", time: "3pm kick-off", title: "Cup Final Screening", desc: "Watch the Cup Final on our big screen with the whole community. Arrive early to get a seat.", tag: "Sport" },
  { day: "Saturday 17 May", time: "7pm", title: "Spring Charity Dinner", desc: "A four-course dinner raising money for Lee's local foodbank. Limited places — book now.", tag: "Community" },
];

const hardcodedMenuSections = [
  {
    name: "Starters",
    items: [
      { name: "Soup of the Day", desc: "Freshly made, served with sourdough bread", price: "£7.50" },
      { name: "Chicken Liver Pâté", desc: "With red onion chutney and toasted brioche", price: "£9.00" },
      { name: "Crispy Whitebait", desc: "With tartare sauce and lemon", price: "£8.50" },
    ],
  },
  {
    name: "Mains",
    items: [
      { name: "28-Day Aged Burger", desc: "Double smash patty, aged cheddar, house pickles, brioche bun. Served with fries", price: "£16.50" },
      { name: "Sunday Roast", desc: "Choice of beef, chicken or nut roast. Served with all the trimmings", price: "£19.00" },
      { name: "Beer-Battered Fish & Chips", desc: "Proper pub fish & chips with mushy peas and tartare sauce", price: "£17.00" },
      { name: "Wild Mushroom Risotto (v)", desc: "Truffle oil, parmesan, fresh herbs", price: "£14.50" },
    ],
  },
  {
    name: "Puddings",
    items: [
      { name: "Sticky Toffee Pudding", desc: "With warm toffee sauce and vanilla ice cream", price: "£7.50" },
      { name: "Cheese & Biscuits", desc: "A selection of British cheeses with chutney and crackers", price: "£9.50" },
    ],
  },
];

const tagColors: Record<string, { bg: string; color: string }> = {
  Music: { bg: NAVY, color: GOLD },
  "Food & Sport": { bg: GOLD, color: NAVY },
  Quiz: { bg: NAVY, color: "#fff" },
  Comedy: { bg: GOLD, color: NAVY },
  Sport: { bg: NAVY, color: GOLD },
  Community: { bg: GOLD, color: NAVY },
};

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("Mains");

  const sheetId = import.meta.env.VITE_GOOGLE_SHEET_ID;
  
  const { data: whatsOnData, isLoading: whatsOnLoading, isError: whatsOnError } = useGetWhatsOn(
    { sheetId: sheetId || "" }, 
    { query: { enabled: !!sheetId, queryKey: ["/api/sheets/whats-on", { sheetId }] } }
  );

  const { data: menuData, isLoading: menuLoading, isError: menuError } = useGetMenu(
    { sheetId: sheetId || "" }, 
    { query: { enabled: !!sheetId, queryKey: ["/api/sheets/menu", { sheetId }] } }
  );

  useEffect(() => {
    document.title = "The Old Tigers Head | Est. 1750 · Lee, London";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", "A proper local in Lee, London. Good food, great company, and a warm welcome for everyone who walks through the door.");
    } else {
      const newMeta = document.createElement("meta");
      newMeta.name = "description";
      newMeta.content = "A proper local in Lee, London. Good food, great company, and a warm welcome for everyone who walks through the door.";
      document.head.appendChild(newMeta);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const whatsOnEvents = (!sheetId || whatsOnError || !whatsOnData) ? hardcodedWhatsOn : whatsOnData.events.map(e => ({
    day: e.Day,
    time: e.Time,
    title: e.Title,
    desc: e.Description,
    tag: e.Tag
  }));

  const mappedMenuSections = (!sheetId || menuError || !menuData) ? hardcodedMenuSections : Object.entries(menuData.sections).map(([name, items]) => ({
    name,
    items
  }));

  const activeSection = mappedMenuSections.find((s) => s.name === activeMenu) || mappedMenuSections[0] || { name: "", items: [] };

  return (
    <div style={{ fontFamily: FONT }} className="min-h-screen">
      <style>{`
        @keyframes ticker {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        html { scroll-behavior: smooth; }
      `}</style>
      {/* ── TICKER ───────────────────────────────────────── */}
      <div style={{ backgroundColor: GOLD, color: NAVY }} className="overflow-hidden py-2 relative z-30">
        <div className="flex whitespace-nowrap animate-[ticker_35s_linear_infinite]">
          {[
            "FRIDAY NIGHT JAZZ @ 8PM",
            "SUNDAY ROAST & LIVE RUGBY",
            "QUIZ NIGHT EVERY TUESDAY",
            "PRIVATE HIRE FUNCTION ROOM AVAILABLE",
            "JOIN THE TIGERS PRIDE LOYALTY CLUB",
            "FRIDAY NIGHT JAZZ @ 8PM",
            "SUNDAY ROAST & LIVE RUGBY",
            "QUIZ NIGHT EVERY TUESDAY",
            "PRIVATE HIRE FUNCTION ROOM AVAILABLE",
            "JOIN THE TIGERS PRIDE LOYALTY CLUB",
          ].map((item, i) => (
            <span key={i} className="mx-8 text-xs font-bold tracking-widest uppercase">
              ★ {item}
            </span>
          ))}
        </div>
      </div>

      {/* ── NAVBAR ───────────────────────────────────────── */}
      <nav
        className="sticky top-0 z-20 transition-all duration-300"
        style={{ backgroundColor: scrolled ? NAVY : "transparent" }}
      >
        {/* Transparent-to-solid background layer */}
        <div
          className="absolute inset-0 transition-opacity duration-300 pointer-events-none"
          style={{ backgroundColor: NAVY, opacity: scrolled ? 1 : 0 }}
        />

        <div className="relative max-w-[1400px] mx-auto px-8 h-20 flex items-center justify-between">

          {/* LEFT NAV LINKS */}
          <div className="hidden lg:flex items-center gap-7 flex-1">
            {navLinksLeft.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-white/90 hover:text-[#C9A227] text-[12px] font-semibold tracking-[0.15em] uppercase transition-colors duration-200 relative group whitespace-nowrap"
              >
                {link.label}
                <span
                  className="absolute -bottom-1 left-0 w-0 h-px group-hover:w-full transition-all duration-300"
                  style={{ backgroundColor: GOLD }}
                />
              </a>
            ))}
          </div>

          {/* CENTRE: Name only — no crest */}
          <div className="flex flex-col items-center flex-shrink-0 mx-6 select-none cursor-pointer" onClick={() => window.scrollTo(0, 0)}>
            <div
              className="text-[22px] font-black tracking-[0.06em] uppercase leading-tight"
              style={{ color: GOLD, fontFamily: FONT }}
            >
              Old Tigers Head
            </div>
            <div className="text-white/50 text-[9px] tracking-[0.4em] uppercase mt-0.5">
              Est. 1750 · Lee, London
            </div>
          </div>

          {/* RIGHT: Book + Search + Hamburger */}
          <div className="hidden lg:flex items-center gap-4 flex-1 justify-end">
            <a
              href="#book"
              className="text-xs font-bold tracking-[0.2em] uppercase px-6 py-3 transition-all hover:brightness-90"
              style={{ backgroundColor: GOLD, color: NAVY, fontFamily: FONT }}
            >
              Book a Table
            </a>
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="text-white/80 hover:text-[#C9A227] transition-colors p-2"
              aria-label="Search"
            >
              <Search size={19} />
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-white/80 hover:text-[#C9A227] transition-colors p-2"
              aria-label="Menu"
            >
              <Menu size={21} />
            </button>
          </div>

          {/* Mobile right */}
          <div className="flex lg:hidden items-center gap-3 flex-1 justify-end">
            <a
              href="#book"
              className="text-[10px] font-bold tracking-widest uppercase px-4 py-2"
              style={{ backgroundColor: GOLD, color: NAVY }}
            >
              Book
            </a>
            <button onClick={() => setSearchOpen(!searchOpen)} className="text-white p-1">
              <Search size={18} />
            </button>
            <button onClick={() => setMenuOpen(!menuOpen)} className="text-white p-1">
              <Menu size={20} />
            </button>
          </div>
        </div>

        {/* Search bar */}
        {searchOpen && (
          <div
            className="relative border-t border-white/10 px-8 py-4 flex items-center gap-3"
            style={{ backgroundColor: NAVY }}
          >
            <Search size={18} className="flex-shrink-0" style={{ color: GOLD }} />
            <input
              autoFocus
              type="text"
              placeholder="Search the site..."
              className="flex-1 bg-transparent text-white placeholder:text-white/40 text-sm tracking-wider outline-none border-b border-white/20 pb-1"
            />
            <button onClick={() => setSearchOpen(false)} className="text-white/50 hover:text-white transition-colors">
              <X size={18} />
            </button>
          </div>
        )}
      </nav>

      {/* Full-screen mobile menu */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-50 flex flex-col"
          style={{ backgroundColor: NAVY }}
        >
          <div className="flex justify-between items-center px-8 py-5 border-b border-white/10">
            <div className="font-black tracking-widest uppercase" style={{ color: GOLD }}>Menu</div>
            <button onClick={() => setMenuOpen(false)} className="text-white/70 hover:text-white transition-colors">
              <X size={24} />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto px-10 py-10 space-y-8">
            {navLinksLeft.map((link, i) => (
              <div key={link.label}>
                <a
                  href={link.href}
                  className="text-white text-3xl font-black tracking-widest uppercase hover:text-[#C9A227] transition-colors flex items-center gap-3 group"
                  onClick={() => setMenuOpen(false)}
                >
                  <span>{link.label}</span>
                  <ChevronRight size={20} className="text-white/20 group-hover:text-[#C9A227] transition-colors" />
                </a>
                {i < navLinksLeft.length - 1 && <div className="mt-6 border-b border-white/10" />}
              </div>
            ))}
          </div>
          <div className="px-10 py-8 border-t border-white/10">
            <a
              href="#book"
              className="block w-full text-center text-sm font-bold tracking-[0.25em] uppercase py-4 transition-all hover:brightness-90"
              style={{ backgroundColor: GOLD, color: NAVY }}
              onClick={() => setMenuOpen(false)}
            >
              Book a Table
            </a>
          </div>
        </div>
      )}

      {/* ── HERO ─────────────────────────────────────────── */}
      <div className="relative -mt-20 min-h-screen flex flex-col overflow-hidden">
        {/* Background: pub photo falls back to navy gradient */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://oldtigershead.springdigitalstudio.co.uk/wp-content/uploads/2024/10/oth_hero_homepage.jpg'), linear-gradient(160deg, #001520 0%, #002942 50%, #001a10 100%)",
            backgroundColor: "#001e30",
          }}
        />
        <div
          className="absolute inset-0"
          style={{ background: `linear-gradient(to bottom, rgba(0,41,66,0.55) 0%, rgba(0,20,35,0.6) 60%, rgba(0,41,66,0.92) 100%)` }}
        />

        <div className="relative z-10 flex flex-col items-center justify-center flex-1 text-center px-6 pt-40 pb-16">
          {/* Tagline — replaces title in hero */}
          <p
            className="text-xs tracking-[0.7em] uppercase font-semibold mb-5"
            style={{ color: GOLD }}
          >
            At the Beating Heart of Lee
          </p>

          <p
            className="text-white/80 text-lg md:text-xl max-w-lg mb-14 leading-relaxed"
            style={{ fontFamily: FONT }}
          >
            A proper local. Good food, great company, and a warm welcome for everyone who walks through the door.
          </p>

          {/* Hero CTA buttons: What's On, Private Hire, Book a Table */}
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="#whats-on"
              className="text-sm font-bold tracking-[0.2em] uppercase px-8 py-4 transition-all hover:brightness-90"
              style={{ backgroundColor: GOLD, color: NAVY, fontFamily: FONT }}
            >
              What's On
            </a>
            <a
              href="#hire"
              className="text-sm font-bold tracking-[0.2em] uppercase px-8 py-4 transition-all border-2"
              style={{ borderColor: GOLD, color: GOLD, fontFamily: FONT, backgroundColor: "transparent" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = GOLD;
                (e.currentTarget as HTMLElement).style.color = NAVY;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
                (e.currentTarget as HTMLElement).style.color = GOLD;
              }}
            >
              Private Hire
            </a>
            <a
              href="#book"
              className="text-sm font-bold tracking-[0.2em] uppercase px-8 py-4 transition-all border border-white/40 hover:border-white/80"
              style={{ color: "white", fontFamily: FONT }}
            >
              Book a Table
            </a>
          </div>
        </div>

        <div className="relative z-10 pb-10 flex justify-center">
          <div className="flex flex-col items-center text-white/30 animate-bounce">
            <span className="text-[9px] tracking-widest uppercase mb-1">Scroll</span>
            <ChevronDown size={14} />
          </div>
        </div>
      </div>

      {/* ── WHAT'S ON ─────────────────────────────────────── */}
      <section id="whats-on" className="py-20 px-6" style={{ backgroundColor: NAVY }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs tracking-[0.5em] uppercase font-semibold mb-3" style={{ color: GOLD }}>
              Live, local &amp; legendary
            </p>
            <h2 className="text-white text-4xl md:text-5xl font-black uppercase tracking-wide" style={{ fontFamily: FONT }}>
              What's On
            </h2>
            <div className="mt-4 w-16 h-0.5 mx-auto" style={{ backgroundColor: GOLD }} />
            <p className="text-white/40 text-[10px] mt-5 tracking-widest uppercase">
              ★ Updated live from Google Sheets by the team
            </p>
          </div>

          {whatsOnLoading && (
             <div className="flex justify-center items-center py-20">
               <Spinner className="w-8 h-8 text-[#C9A227]" />
             </div>
          )}
          {!whatsOnLoading && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {whatsOnEvents.map((event, i) => {
                const tag = tagColors[event.tag] ?? { bg: "rgba(255,255,255,0.1)", color: "white" };
                return (
                  <div
                    key={i}
                    className="border border-white/10 p-6 hover:border-[#C9A227]/50 transition-all group cursor-pointer"
                    style={{ backgroundColor: "rgba(255,255,255,0.04)" }}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <span
                        className="text-[10px] font-bold tracking-widest uppercase px-2.5 py-1"
                        style={{ backgroundColor: tag.bg, color: tag.color }}
                      >
                        {event.tag}
                      </span>
                      <Calendar size={14} className="text-white/25 mt-0.5" />
                    </div>
                    <h3
                      className="text-white text-[17px] font-black uppercase tracking-wide mb-2 group-hover:text-[#C9A227] transition-colors"
                      style={{ fontFamily: FONT }}
                    >
                      {event.title}
                    </h3>
                    <div className="flex gap-4 mb-3">
                      <span
                        className="text-[11px] tracking-wider uppercase font-semibold flex items-center gap-1"
                        style={{ color: GOLD }}
                      >
                        <Clock size={10} className="flex-shrink-0" /> {event.day}
                      </span>
                      <span className="text-white/45 text-[11px]">{event.time}</span>
                    </div>
                    <p className="text-white/60 text-sm leading-relaxed">{event.desc}</p>
                    <div className="mt-5 pt-4 border-t border-white/10">
                      <a
                        href="#book"
                        className="text-[11px] font-bold tracking-widest uppercase flex items-center gap-1 hover:gap-2 transition-all"
                        style={{ color: GOLD }}
                      >
                        Book a Table <ChevronRight size={11} />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ── FOOD & MENU ───────────────────────────────────── */}
      <section id="food" className="py-20 px-6" style={{ backgroundColor: "#f5f0e8" }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs tracking-[0.5em] uppercase font-semibold mb-3" style={{ color: GOLD }}>
              Proper pub cooking
            </p>
            <h2
              className="text-4xl md:text-5xl font-black uppercase tracking-wide"
              style={{ color: NAVY, fontFamily: FONT }}
            >
              Our Menu
            </h2>
            <div className="mt-4 w-16 h-0.5 mx-auto" style={{ backgroundColor: GOLD }} />
            <p className="text-[10px] mt-5 tracking-widest uppercase" style={{ color: `${NAVY}55` }}>
              ★ Menu updated live from Google Sheets by the kitchen team
            </p>
          </div>

          {menuLoading && (
            <div className="flex justify-center items-center py-20">
              <Spinner className="w-8 h-8 text-[#002942]" />
            </div>
          )}

          {!menuLoading && (
            <>
              {/* Section tabs */}
              <div className="flex justify-center gap-2 mb-10 flex-wrap">
                {mappedMenuSections.map((section) => (
                  <button
                    key={section.name}
                    onClick={() => setActiveMenu(section.name)}
                    className="px-7 py-3 text-xs font-bold tracking-widest uppercase transition-all border-2"
                    style={{
                      backgroundColor: activeMenu === section.name ? NAVY : "transparent",
                      color: activeMenu === section.name ? GOLD : NAVY,
                      borderColor: NAVY,
                      fontFamily: FONT,
                    }}
                  >
                    {section.name}
                  </button>
                ))}
              </div>

              {/* Menu items */}
              <div className="space-y-px">
                {activeSection.items.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start justify-between py-5 px-6 border-b border-[#002942]/10 hover:bg-[#002942]/5 transition-colors"
                  >
                    <div className="flex-1 pr-8">
                      <h4
                        className="font-bold uppercase tracking-wide text-sm"
                        style={{ color: NAVY, fontFamily: FONT }}
                      >
                        {item.name}
                      </h4>
                      <p style={{ color: `${NAVY}88` }} className="text-sm mt-1 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                    <span className="font-black text-lg flex-shrink-0" style={{ color: GOLD }}>
                      {item.price}
                    </span>
                  </div>
                ))}
              </div>
            </>
          )}

          <div className="text-center mt-12">
            <a
              href="#book"
              className="inline-block text-white text-sm font-bold tracking-[0.2em] uppercase px-10 py-4 transition-all hover:brightness-110"
              style={{ backgroundColor: NAVY, fontFamily: FONT }}
            >
              Book a Table →
            </a>
          </div>
        </div>
      </section>

      {/* ── ABOUT ─────────────────────────────────────────── */}
      <section id="about" className="py-24 px-6" style={{ backgroundColor: NAVY }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs tracking-[0.5em] uppercase font-semibold mb-3" style={{ color: GOLD }}>
              Est. 1750
            </p>
            <h2
              className="text-white text-4xl md:text-5xl font-black uppercase tracking-wide"
              style={{ fontFamily: FONT }}
            >
              Our Story
            </h2>
            <div className="mt-4 w-16 h-0.5 mx-auto" style={{ backgroundColor: GOLD }} />
          </div>

          {/* History */}
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            <div
              className="relative overflow-hidden"
              style={{ minHeight: "320px", backgroundColor: "rgba(255,255,255,0.05)" }}
            >
              <img
                src="https://oldtigershead.springdigitalstudio.co.uk/wp-content/uploads/2024/10/oth_about_history.jpg"
                alt="The Old Tigers Head — historic photograph"
                className="w-full h-full object-cover grayscale contrast-105"
                onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
              />
            </div>
            <div>
              <h3
                className="text-2xl font-black uppercase tracking-wide mb-6"
                style={{ color: GOLD, fontFamily: FONT }}
              >
                A Building That Has Seen It All
              </h3>
              <div className="space-y-5 text-white/72 text-[15px] leading-loose">
                <p>
                  The Old Tigers Head has stood at the corner of Lee High Road since 1750 — through wars and coronations, the rumble of trams and the arrival of the motorcar, through rationing and rock 'n' roll. For over two and a half centuries, this corner has been where Lee gathers.
                </p>
                <p>
                  Generations of families have raised a glass here. It has hosted wakes and weddings, first dates and leaving dos, arguments and reconciliations. The walls carry the memory of every toast — the handshakes over deals done, the tears of friends said goodbye to, the roar of a last-minute winner on a Saturday afternoon.
                </p>
                <p>
                  It is, and has always been, more than a pub. It is the living room of Lee. A place where strangers become regulars, and regulars become family.
                </p>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="w-full h-px mb-20" style={{ backgroundColor: `${GOLD}33` }} />

          {/* Rob & Team */}
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <h3
                className="text-2xl font-black uppercase tracking-wide mb-6"
                style={{ color: GOLD, fontFamily: FONT }}
              >
                Rob &amp; the Team
              </h3>
              <div className="space-y-5 text-white/72 text-[15px] leading-loose">
                <p>
                  When Rob took on the Old Tigers Head, he did so with one clear purpose: to give Lee back its pub. Not a gastropub. Not a bar. A proper, welcoming local — where regulars are greeted by name, where the food is made with real care, and where nobody ever feels like a stranger for long.
                </p>
                <p>
                  Together with Cara, Paolo, and the rest of the team, Rob has poured heart and soul into restoring the Tiger to its rightful place at the heart of the community. Every Sunday roast is crafted from the best local suppliers. Every event is planned to bring people together. Every pint is pulled with pride.
                </p>
                <p>
                  Their commitment is simple: quality in everything, warmth in every welcome. Whether you're a regular popping in for a swift half or a family celebrating something special, you'll be looked after the way a good local always should.
                </p>
              </div>

              <div className="mt-8 flex gap-4 flex-wrap">
                {[
                  { value: "1750", label: "Est." },
                  { value: "275+", label: "Years Serving Lee" },
                  { value: "★★★★★", label: "Community Reviews" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="border px-5 py-3 text-center"
                    style={{ borderColor: `${GOLD}44` }}
                  >
                    <div className="text-xl font-black" style={{ color: GOLD }}>{stat.value}</div>
                    <div className="text-white/35 text-[9px] tracking-widest uppercase mt-0.5">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div
              className="border border-white/10 p-8"
              style={{ backgroundColor: "rgba(255,255,255,0.04)" }}
            >
              <div className="space-y-7">
                {[
                  {
                    name: "Rob",
                    role: "Licensee & Host",
                    note: "Determined to restore the Tiger as the hub of the community. His door is always open — he'll find you a seat, remember your drink, and make sure you leave with a smile.",
                  },
                  {
                    name: "Cara",
                    role: "Front of House",
                    note: "Cara makes every guest feel at home from the moment they walk in. A true natural in hospitality — warm, attentive, and always ready with a recommendation.",
                  },
                  {
                    name: "Paolo",
                    role: "Head Chef",
                    note: "Paolo brings craft and love to every dish. Seasonal, honest, always made from scratch — and the reason people book a table two weeks in advance for Sunday lunch.",
                  },
                ].map((person) => (
                  <div key={person.name} className="flex gap-5 items-start">
                    <div
                      className="w-12 h-12 flex-shrink-0 flex items-center justify-center font-black text-lg"
                      style={{ backgroundColor: GOLD, color: NAVY, fontFamily: FONT }}
                    >
                      {person.name[0]}
                    </div>
                    <div>
                      <div className="text-white font-black tracking-wide" style={{ fontFamily: FONT }}>
                        {person.name}
                      </div>
                      <div
                        className="text-[10px] tracking-widest uppercase mb-1.5"
                        style={{ color: GOLD }}
                      >
                        {person.role}
                      </div>
                      <p className="text-white/55 text-sm leading-relaxed">{person.note}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── VENUE HIRE ────────────────────────────────────── */}
      <section id="hire" className="py-20 px-6" style={{ backgroundColor: GOLD }}>
        <div className="max-w-4xl mx-auto text-center">
          <p
            className="text-xs tracking-[0.5em] uppercase font-semibold mb-3"
            style={{ color: NAVY }}
          >
            Functions &amp; Events
          </p>
          <h2
            className="text-4xl md:text-5xl font-black uppercase tracking-wide mb-6"
            style={{ color: NAVY, fontFamily: FONT }}
          >
            Private Hire
          </h2>
          <p
            className="text-lg leading-relaxed max-w-2xl mx-auto mb-10"
            style={{ color: `${NAVY}bb` }}
          >
            Our private function room holds up to 80 guests and can be dressed and tailored for everything from birthday celebrations and wakes to corporate away days and film screenings. Get in touch to discuss your event.
          </p>
          <a
            href="#contact"
            className="inline-block text-sm font-bold tracking-[0.2em] uppercase px-10 py-4 transition-all hover:brightness-110"
            style={{ backgroundColor: NAVY, color: GOLD, fontFamily: FONT }}
          >
            Enquire About Hire
          </a>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────── */}
      <footer className="py-16 px-6" style={{ backgroundColor: "#001520" }}>
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            <div>
              <div
                className="text-xl font-black uppercase tracking-wide mb-4"
                style={{ color: GOLD, fontFamily: FONT }}
              >
                Old Tigers Head
              </div>
              <p className="text-white/50 text-sm leading-relaxed">
                Est. 1750. At the beating heart of Lee, London SE12.
              </p>
            </div>
            <div>
              <div className="text-white/30 text-[10px] tracking-widest uppercase font-semibold mb-4">Opening Hours</div>
              <div className="space-y-1 text-white/60 text-sm">
                <div className="flex justify-between"><span>Mon – Thu</span><span>12pm – 11pm</span></div>
                <div className="flex justify-between"><span>Fri – Sat</span><span>12pm – 12am</span></div>
                <div className="flex justify-between"><span>Sunday</span><span>12pm – 10:30pm</span></div>
              </div>
            </div>
            <div id="contact">
              <div className="text-white/30 text-[10px] tracking-widest uppercase font-semibold mb-4">Find Us</div>
              <div className="space-y-2">
                <div className="flex items-start gap-2 text-white/60 text-sm">
                  <MapPin size={14} className="flex-shrink-0 mt-0.5" style={{ color: GOLD }} />
                  <span>2 Lee Road, London SE12 8RG</span>
                </div>
                <div className="flex items-center gap-2 text-white/60 text-sm">
                  <Phone size={14} className="flex-shrink-0" style={{ color: GOLD }} />
                  <span>020 8318 6000</span>
                </div>
                <div className="flex items-center gap-2 text-white/60 text-sm">
                  <Mail size={14} className="flex-shrink-0" style={{ color: GOLD }} />
                  <span>hello@oldtigershead.co.uk</span>
                </div>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/25 text-xs tracking-widest">© 2025 The Old Tigers Head. All rights reserved.</p>
            <p className="text-white/25 text-xs">Please drink responsibly. Think 25.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
