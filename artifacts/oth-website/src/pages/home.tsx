import { useState, useEffect, useRef } from "react";
import {
  Search, Menu, X, ChevronRight, ChevronDown, Calendar, Clock,
  MapPin, Phone, Mail, Train, ExternalLink, ChevronLeft, Users, Star
} from "lucide-react";
import { useGetWhatsOn, useGetMenu } from "@workspace/api-client-react";
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

const pastEvents = [
  { day: "Sat 22 Mar", time: "7pm", title: "Spring Comedy Night", desc: "A sell-out evening with headliner Tom Mayhew. Huge night.", tag: "Comedy" },
  { day: "Sun 30 Mar", time: "1pm", title: "Mother's Day Sunday Roast", desc: "Fully booked weeks in advance. Paolo's best roast yet — the beef was extraordinary.", tag: "Food & Sport" },
  { day: "Tue 1 Apr", time: "7:30pm", title: "Quiz Night", desc: "Winners: The Three Musketeers (again). Second place: Close But No Cigar.", tag: "Quiz" },
  { day: "Fri 4 Apr", time: "8pm", title: "Friday Night Jazz", desc: "Standing room only. The quartet from Greenwich were a revelation.", tag: "Music" },
  { day: "Tue 8 Apr", time: "7:30pm", title: "Quiz Night", desc: "Photo finish. New team 'Quiz Khalifa' beat the Musketeers by one point.", tag: "Quiz" },
  { day: "Fri 11 Apr", time: "8pm", title: "Friday Night Jazz", desc: "A night of soul and swing — packed out from 7:30.", tag: "Music" },
];

const weeklyGroups = [
  {
    label: "This Week",
    dates: "14 – 20 Apr",
    events: [
      { day: "Tue 15 Apr", time: "7:30pm", title: "Quiz Night", tag: "Quiz", desc: "Teams of up to 6. Prizes, laughs, and a pint or two.", recurring: true },
      { day: "Fri 18 Apr", time: "8pm – late", title: "Friday Night Jazz", tag: "Music", desc: "Live jazz from local musicians. No booking required.", recurring: true },
      { day: "Sun 20 Apr", time: "12pm – 5pm", title: "Sunday Roast & Live Rugby", tag: "Food & Sport", desc: "Book a table to guarantee your spot.", recurring: true },
    ],
  },
  {
    label: "Next Week",
    dates: "21 – 27 Apr",
    events: [
      { day: "Tue 22 Apr", time: "7:30pm", title: "Quiz Night", tag: "Quiz", desc: "Teams of up to 6. Prizes, laughs, and a pint or two.", recurring: true },
      { day: "Fri 25 Apr", time: "8pm – late", title: "Friday Night Jazz", tag: "Music", desc: "Live jazz from local musicians. No booking required.", recurring: true },
      { day: "Sun 27 Apr", time: "12pm – 5pm", title: "Sunday Roast & Live Rugby", tag: "Food & Sport", desc: "Book a table to guarantee your spot.", recurring: true },
    ],
  },
  {
    label: "28 Apr – 4 May",
    dates: "28 Apr – 4 May",
    events: [
      { day: "Tue 29 Apr", time: "7:30pm", title: "Quiz Night", tag: "Quiz", desc: "Teams of up to 6. Prizes, laughs, and a pint or two.", recurring: true },
      { day: "Fri 2 May", time: "8pm – late", title: "Friday Night Jazz", tag: "Music", desc: "Live jazz from local musicians. No booking required.", recurring: true },
      { day: "Sat 3 May", time: "3pm kick-off", title: "Cup Final Screening", tag: "Sport", desc: "Watch the Cup Final on our big screen. Arrive early to get a seat.", recurring: false },
      { day: "Sun 4 May", time: "12pm – 5pm", title: "Sunday Roast & Live Rugby", tag: "Food & Sport", desc: "Book a table to guarantee your spot.", recurring: true },
    ],
  },
  {
    label: "5 – 11 May",
    dates: "5 – 11 May",
    events: [
      { day: "Tue 6 May", time: "7:30pm", title: "Quiz Night", tag: "Quiz", desc: "Teams of up to 6. Prizes, laughs, and a pint or two.", recurring: true },
      { day: "Fri 9 May", time: "8pm – late", title: "Friday Night Jazz", tag: "Music", desc: "Live jazz from local musicians. No booking required.", recurring: true },
      { day: "Sun 11 May", time: "12pm – 5pm", title: "Sunday Roast & Live Rugby", tag: "Food & Sport", desc: "Book a table to guarantee your spot.", recurring: true },
    ],
  },
  {
    label: "12 – 18 May",
    dates: "12 – 18 May",
    events: [
      { day: "Tue 13 May", time: "7:30pm", title: "Quiz Night", tag: "Quiz", desc: "Teams of up to 6. Prizes, laughs, and a pint or two.", recurring: true },
      { day: "Fri 16 May", time: "8pm – late", title: "Friday Night Jazz", tag: "Music", desc: "Live jazz from local musicians. No booking required.", recurring: true },
      { day: "Sat 17 May", time: "7pm", title: "Spring Charity Dinner", tag: "Community", desc: "A four-course dinner raising money for Lee's local foodbank. Limited places — book now.", recurring: false },
      { day: "Sun 18 May", time: "12pm – 5pm", title: "Sunday Roast & Live Rugby", tag: "Food & Sport", desc: "Book a table to guarantee your spot.", recurring: true },
    ],
  },
];

const todaysMenuSections = [
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
      { name: "Beer-Battered Fish & Chips", desc: "Proper pub fish & chips with mushy peas and tartare sauce", price: "£17.00" },
      { name: "Wild Mushroom Risotto (v)", desc: "Truffle oil, parmesan, fresh herbs", price: "£14.50" },
      { name: "Tiger Burger", desc: "Smash patty, tiger sauce, pickled jalapeños, American cheese, brioche bun. Served with fries", price: "£17.50" },
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

const sundayMenuSections = [
  {
    name: "Starters",
    items: [
      { name: "Soup of the Day", desc: "Freshly made, served with sourdough bread", price: "£7.50" },
      { name: "Prawn Cocktail", desc: "Classic Marie Rose, iceberg lettuce, brown bread", price: "£9.00" },
      { name: "Chicken Liver Pâté", desc: "With red onion chutney and toasted brioche", price: "£9.00" },
    ],
  },
  {
    name: "Roasts",
    items: [
      { name: "Roast Sirloin of Beef", desc: "28-day aged, served with roast potatoes, seasonal vegetables, Yorkshire pudding and gravy", price: "£21.00" },
      { name: "Roast Free-Range Chicken", desc: "Half chicken, roast potatoes, seasonal vegetables, stuffing and gravy", price: "£19.00" },
      { name: "Nut Roast (v/vg)", desc: "Herb and walnut loaf, roast potatoes, seasonal vegetables and vegetable gravy", price: "£17.00" },
      { name: "Children's Roast", desc: "Choice of beef or chicken, served with all the trimmings", price: "£10.00" },
    ],
  },
  {
    name: "Sides",
    items: [
      { name: "Extra Yorkshire Pudding", desc: "", price: "£1.50" },
      { name: "Cauliflower Cheese", desc: "Baked in a cheddar and cream sauce", price: "£4.50" },
      { name: "Roast Potatoes", desc: "Goose fat, rosemary", price: "£4.00" },
      { name: "Seasonal Greens", desc: "Buttered, with garlic", price: "£3.50" },
    ],
  },
  {
    name: "Puddings",
    items: [
      { name: "Sticky Toffee Pudding", desc: "With warm toffee sauce and vanilla ice cream", price: "£7.50" },
      { name: "Treacle Tart", desc: "With clotted cream", price: "£7.00" },
      { name: "Cheese & Biscuits", desc: "A selection of British cheeses with chutney and crackers", price: "£9.50" },
    ],
  },
];

const hardcodedMenuSections = todaysMenuSections;

const tagColors: Record<string, { bg: string; color: string }> = {
  Music: { bg: NAVY, color: GOLD },
  "Food & Sport": { bg: GOLD, color: NAVY },
  Quiz: { bg: NAVY, color: "#fff" },
  Comedy: { bg: GOLD, color: NAVY },
  Sport: { bg: NAVY, color: GOLD },
  Community: { bg: GOLD, color: NAVY },
};

const historySlides = [
  {
    era: "Est. 1750",
    caption: "A coaching inn and alehouse at the crossroads of Lee — serving travellers on the road to Greenwich and beyond.",
    img: "https://oldtigershead.springdigitalstudio.co.uk/wp-content/uploads/2024/10/oth_about_history.jpg",
  },
  {
    era: "Victorian Lee",
    caption: "By the mid-1800s the Tiger was a fixture of Victorian Lee — a community anchor through the railway age, the arrival of the tram, and two World Wars.",
    img: "",
  },
  {
    era: "The 20th Century",
    caption: "From rationing to rock 'n' roll, generations of Lee families have raised a glass here. Wakes and weddings, first dates and leaving dos.",
    img: "",
  },
  {
    era: "Today",
    caption: "Under Rob's stewardship, the Tiger has reclaimed its place at the beating heart of Lee — with a 15-year lease and a comprehensive refurbishment underway.",
    img: "https://oldtigershead.springdigitalstudio.co.uk/wp-content/uploads/2024/10/oth_hero_homepage.jpg",
  },
];

const stationDirections = [
  {
    station: "Lee Station",
    line: "National Rail · Southeastern",
    walk: "11 min · 0.5 miles",
    directions: "Exit the station and head north on Burnt Ash Hill (A2212). Continue straight as it becomes Burnt Ash Road. The pub is at the crossroads where Burnt Ash Road meets Lee High Road.",
    icon: "🚉",
  },
  {
    station: "Blackheath Station",
    line: "National Rail · Southeastern",
    walk: "14 min · 0.6 miles",
    directions: "Exit and head south on Lee Road (B212). Walk straight for about half a mile to Lee Green crossroads. The pub is directly ahead of you on the corner.",
    icon: "🚉",
  },
  {
    station: "Hither Green Station",
    line: "National Rail · Southeastern",
    walk: "18 min · 0.8 miles",
    directions: "Exit from the Springbank Road side and head east on Brightfield Road. Turn left onto Lee High Road (A20) and continue east towards the Lee Green intersection.",
    icon: "🚉",
  },
  {
    station: "Lewisham Station",
    line: "DLR · National Rail",
    walk: "31 min · 1.4 miles",
    directions: "Follow the A20 (Lewisham High Street, then Lee High Road) heading southeast for just over a mile. The pub is at the junction with Burnt Ash Road and Lee Road.",
    icon: "🚉",
  },
];

// Tiger of the Month — hardcoded for now, updatable via Google Sheets later
const tigerOfMonth = {
  name: "Derek & Guinness",
  bio: "Derek has been propping up the bar on Friday evenings since before Rob took over. His Labrador, Guinness, is the pub's unofficial mascot and has his own pint glass (filled with water, we think).",
  month: "April 2026",
  reward: "Wings & a pint of their choice — on the house.",
  isActive: true,
};

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeMenuTab, setActiveMenuTab] = useState("Mains");
  const [activeMenuType, setActiveMenuType] = useState<"today" | "sunday">("today");
  const [slideIndex, setSlideIndex] = useState(0);
  const slideTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const [eventsView, setEventsView] = useState<"upcoming" | "past">("upcoming");
  const [eventsLayout, setEventsLayout] = useState<"grid" | "week">("grid");
  const [expandedWeek, setExpandedWeek] = useState<string | null>("This Week");
  const [bookingForm, setBookingForm] = useState({
    name: "", phone: "", email: "", date: "", time: "", guests: "", notes: "", keepUpdated: false,
  });
  const [bookingErrors, setBookingErrors] = useState<Record<string, string>>({});
  const [bookingSubmitted, setBookingSubmitted] = useState(false);

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
    const content = "A proper local in Lee, London. Good food, great company, and a warm welcome for everyone who walks through the door.";
    if (metaDesc) {
      metaDesc.setAttribute("content", content);
    } else {
      const newMeta = document.createElement("meta");
      newMeta.name = "description";
      newMeta.content = content;
      document.head.appendChild(newMeta);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Auto-advance slideshow
  useEffect(() => {
    slideTimer.current = setInterval(() => {
      setSlideIndex((i) => (i + 1) % historySlides.length);
    }, 5000);
    return () => { if (slideTimer.current) clearInterval(slideTimer.current); };
  }, []);

  const goSlide = (dir: 1 | -1) => {
    if (slideTimer.current) clearInterval(slideTimer.current);
    setSlideIndex((i) => (i + dir + historySlides.length) % historySlides.length);
    slideTimer.current = setInterval(() => {
      setSlideIndex((i) => (i + 1) % historySlides.length);
    }, 5000);
  };

  const whatsOnEvents = (!sheetId || whatsOnError || !whatsOnData)
    ? hardcodedWhatsOn
    : whatsOnData.events.map((e) => ({ day: e.Day, time: e.Time, title: e.Title, desc: e.Description, tag: e.Tag }));

  const rawMenuSections = (!sheetId || menuError || !menuData)
    ? (activeMenuType === "today" ? todaysMenuSections : sundayMenuSections)
    : Object.entries(menuData.sections).map(([name, items]) => ({ name, items }));

  const mappedMenuSections = rawMenuSections;
  const activeSection = mappedMenuSections.find((s) => s.name === activeMenuTab) || mappedMenuSections[0] || { name: "", items: [] };
  const slide = historySlides[slideIndex];

  return (
    <div style={{ fontFamily: FONT }} className="min-h-screen">
      <style>{`
        @keyframes ticker { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        html { scroll-behavior: smooth; }
        .slide-img { transition: opacity 0.6s ease; }
      `}</style>

      {/* ── TICKER ─────────────────────────────────────────── */}
      <div style={{ backgroundColor: GOLD, color: NAVY }} className="overflow-hidden py-2 relative z-30">
        <div className="flex whitespace-nowrap animate-[ticker_35s_linear_infinite]">
          {[
            "FRIDAY NIGHT JAZZ @ 8PM",
            "SUNDAY ROAST & LIVE RUGBY",
            "QUIZ NIGHT EVERY TUESDAY",
            "PRIVATE HIRE FUNCTION ROOM AVAILABLE",
            "JOIN THE TIGERS HEAD COMMUNITY",
            "15-YEAR LEASE SECURED — THE FUTURE IS BRIGHT",
            "FRIDAY NIGHT JAZZ @ 8PM",
            "SUNDAY ROAST & LIVE RUGBY",
            "QUIZ NIGHT EVERY TUESDAY",
            "PRIVATE HIRE FUNCTION ROOM AVAILABLE",
            "JOIN THE TIGERS HEAD COMMUNITY",
            "15-YEAR LEASE SECURED — THE FUTURE IS BRIGHT",
          ].map((item, i) => (
            <span key={i} className="mx-8 text-xs font-bold tracking-widest uppercase">
              ★ {item}
            </span>
          ))}
        </div>
      </div>

      {/* ── NAVBAR ─────────────────────────────────────────── */}
      <nav className="sticky top-0 z-20 transition-all duration-300" style={{ backgroundColor: scrolled ? NAVY : "transparent" }}>
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
                <span className="absolute -bottom-1 left-0 w-0 h-px group-hover:w-full transition-all duration-300" style={{ backgroundColor: GOLD }} />
              </a>
            ))}
          </div>

          {/* CENTRE: Pub name */}
          <div className="flex flex-col items-center flex-shrink-0 mx-6 select-none cursor-pointer" onClick={() => window.scrollTo(0, 0)}>
            <div className="text-[22px] font-black tracking-[0.06em] uppercase leading-tight" style={{ color: GOLD, fontFamily: FONT }}>
              Old Tigers Head
            </div>
            <div className="text-white/50 text-[9px] tracking-[0.4em] uppercase mt-0.5">
              Est. 1750 · Lee, London
            </div>
          </div>

          {/* RIGHT: Menu + Book + Search + Hamburger */}
          <div className="hidden lg:flex items-center gap-3 flex-1 justify-end">
            <a
              href="#food"
              className="text-xs font-bold tracking-[0.2em] uppercase px-5 py-3 transition-all border border-white/30 hover:border-[#C9A227] hover:text-[#C9A227]"
              style={{ color: "rgba(255,255,255,0.85)", fontFamily: FONT }}
            >
              Menu
            </a>
            <a
              href="#book"
              className="text-xs font-bold tracking-[0.2em] uppercase px-6 py-3 transition-all hover:brightness-90"
              style={{ backgroundColor: GOLD, color: NAVY, fontFamily: FONT }}
            >
              Book
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
              aria-label="Navigation menu"
            >
              <Menu size={21} />
            </button>
          </div>

          {/* Mobile right */}
          <div className="flex lg:hidden items-center gap-3 flex-1 justify-end">
            <a href="#food" className="text-[10px] font-bold tracking-widest uppercase px-3 py-2 border border-white/30" style={{ color: "rgba(255,255,255,0.85)" }}>
              Menu
            </a>
            <a href="#book" className="text-[10px] font-bold tracking-widest uppercase px-4 py-2" style={{ backgroundColor: GOLD, color: NAVY }}>
              Request
            </a>
            <button onClick={() => setMenuOpen(!menuOpen)} className="text-white p-1">
              <Menu size={20} />
            </button>
          </div>
        </div>

        {/* Search bar */}
        {searchOpen && (
          <div className="relative border-t border-white/10 px-8 py-4 flex items-center gap-3" style={{ backgroundColor: NAVY }}>
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
        <div className="fixed inset-0 z-50 flex flex-col" style={{ backgroundColor: NAVY }}>
          <div className="flex justify-between items-center px-8 py-5 border-b border-white/10">
            <div className="font-black tracking-widest uppercase" style={{ color: GOLD }}>Navigate</div>
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
          <div className="px-10 py-8 border-t border-white/10 flex gap-3">
            <a
              href="#food"
              className="flex-1 text-center text-sm font-bold tracking-[0.25em] uppercase py-4 border border-white/30 transition-all hover:border-[#C9A227]"
              style={{ color: "rgba(255,255,255,0.85)" }}
              onClick={() => setMenuOpen(false)}
            >
              Menu
            </a>
            <a
              href="#book"
              className="flex-1 text-center text-sm font-bold tracking-[0.25em] uppercase py-4 transition-all hover:brightness-90"
              style={{ backgroundColor: GOLD, color: NAVY }}
              onClick={() => setMenuOpen(false)}
            >
              Book
            </a>
          </div>
        </div>
      )}

      {/* ── HERO ───────────────────────────────────────────── */}
      <div className="relative -mt-20 min-h-screen flex flex-col overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://oldtigershead.springdigitalstudio.co.uk/wp-content/uploads/2024/10/oth_hero_homepage.jpg'), linear-gradient(160deg, #001520 0%, #002942 50%, #001a10 100%)",
            backgroundColor: "#001e30",
          }}
        />
        <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, rgba(0,41,66,0.55) 0%, rgba(0,20,35,0.6) 60%, rgba(0,41,66,0.92) 100%)` }} />

        <div className="relative z-10 flex flex-col items-center justify-center flex-1 text-center px-6 pt-40 pb-16">
          <p className="text-xs tracking-[0.7em] uppercase font-semibold mb-5" style={{ color: GOLD }}>
            At the Beating Heart of Lee
          </p>
          <p className="text-white/80 text-lg md:text-xl max-w-lg mb-14 leading-relaxed" style={{ fontFamily: FONT }}>
            A proper local. Good food, great company, and a warm welcome for everyone who walks through the door.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="#whats-on" className="text-sm font-bold tracking-[0.2em] uppercase px-8 py-4 transition-all hover:brightness-90" style={{ backgroundColor: GOLD, color: NAVY, fontFamily: FONT }}>
              What's On
            </a>
            <a
              href="#hire"
              className="text-sm font-bold tracking-[0.2em] uppercase px-8 py-4 transition-all border-2"
              style={{ borderColor: GOLD, color: GOLD, fontFamily: FONT, backgroundColor: "transparent" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = GOLD; (e.currentTarget as HTMLElement).style.color = NAVY; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "transparent"; (e.currentTarget as HTMLElement).style.color = GOLD; }}
            >
              Private Hire
            </a>
            <a href="#book" className="text-sm font-bold tracking-[0.2em] uppercase px-8 py-4 transition-all border border-white/40 hover:border-white/80" style={{ color: "white", fontFamily: FONT }}>
              Book
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

      {/* ── TIGER OF THE MONTH ─────────────────────────────── */}
      {tigerOfMonth.isActive && (
        <section style={{ backgroundColor: GOLD }}>
          <div className="max-w-6xl mx-auto px-6 py-8">
            <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
              {/* Badge */}
              <div className="flex-shrink-0 flex flex-col items-center">
                <div
                  className="w-20 h-20 flex items-center justify-center font-black text-3xl border-4"
                  style={{ backgroundColor: NAVY, color: GOLD, borderColor: NAVY }}
                >
                  🐯
                </div>
                <div className="text-[9px] font-black tracking-widest uppercase mt-2" style={{ color: NAVY }}>
                  Tiger of the Month
                </div>
              </div>
              {/* Text */}
              <div className="flex-1 text-center md:text-left">
                <div className="text-[10px] font-bold tracking-widest uppercase mb-1" style={{ color: `${NAVY}88` }}>
                  {tigerOfMonth.month}
                </div>
                <div className="text-2xl font-black uppercase tracking-wide mb-1" style={{ color: NAVY, fontFamily: FONT }}>
                  {tigerOfMonth.name}
                </div>
                <p className="text-sm leading-relaxed max-w-xl" style={{ color: `${NAVY}cc` }}>
                  {tigerOfMonth.bio}
                </p>
                <p className="text-[11px] font-bold mt-2 uppercase tracking-wider" style={{ color: NAVY }}>
                  Prize: {tigerOfMonth.reward}
                </p>
              </div>
              {/* CTA */}
              <div className="flex-shrink-0">
                <a
                  href="/community"
                  className="inline-block text-xs font-bold tracking-[0.2em] uppercase px-7 py-3 transition-all hover:brightness-90"
                  style={{ backgroundColor: NAVY, color: GOLD, fontFamily: FONT }}
                >
                  Join the Community
                </a>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── WHAT'S ON ──────────────────────────────────────── */}
      <section id="whats-on" className="py-20 px-6" style={{ backgroundColor: NAVY }}>
        <div className="max-w-6xl mx-auto">

          {/* Section header */}
          <div className="text-center mb-10">
            <p className="text-xs tracking-[0.5em] uppercase font-semibold mb-3" style={{ color: GOLD }}>
              Live, local &amp; legendary
            </p>
            <h2 className="text-white text-4xl md:text-5xl font-black uppercase tracking-wide" style={{ fontFamily: FONT }}>
              What's On
            </h2>
            <div className="mt-4 w-16 h-0.5 mx-auto" style={{ backgroundColor: GOLD }} />
          </div>

          {/* Controls row */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">
            {/* Upcoming / Past tabs */}
            <div className="flex border border-white/15">
              <button
                onClick={() => setEventsView("upcoming")}
                className="px-6 py-2.5 text-xs font-bold tracking-widest uppercase transition-all"
                style={{
                  backgroundColor: eventsView === "upcoming" ? GOLD : "transparent",
                  color: eventsView === "upcoming" ? NAVY : "rgba(255,255,255,0.6)",
                  fontFamily: FONT,
                }}
              >
                Upcoming
              </button>
              <button
                onClick={() => setEventsView("past")}
                className="px-6 py-2.5 text-xs font-bold tracking-widest uppercase transition-all border-l border-white/15"
                style={{
                  backgroundColor: eventsView === "past" ? GOLD : "transparent",
                  color: eventsView === "past" ? NAVY : "rgba(255,255,255,0.6)",
                  fontFamily: FONT,
                }}
              >
                Past Events
              </button>
            </div>

            {/* Grid / Week view toggle — only for upcoming */}
            {eventsView === "upcoming" && (
              <div className="flex items-center gap-3">
                <span className="text-white/30 text-[10px] tracking-widest uppercase">View:</span>
                <div className="flex border border-white/15">
                  <button
                    onClick={() => setEventsLayout("grid")}
                    className="px-4 py-2.5 text-xs font-bold tracking-widest uppercase transition-all flex items-center gap-1.5"
                    style={{
                      backgroundColor: eventsLayout === "grid" ? "rgba(255,255,255,0.12)" : "transparent",
                      color: eventsLayout === "grid" ? "white" : "rgba(255,255,255,0.45)",
                    }}
                    title="Grid view"
                  >
                    <Calendar size={13} /> Grid
                  </button>
                  <button
                    onClick={() => setEventsLayout("week")}
                    className="px-4 py-2.5 text-xs font-bold tracking-widest uppercase transition-all border-l border-white/15 flex items-center gap-1.5"
                    style={{
                      backgroundColor: eventsLayout === "week" ? "rgba(255,255,255,0.12)" : "transparent",
                      color: eventsLayout === "week" ? "white" : "rgba(255,255,255,0.45)",
                    }}
                    title="Week-by-week view"
                  >
                    <Clock size={13} /> Week by Week
                  </button>
                </div>
              </div>
            )}
          </div>

          {whatsOnLoading && (
            <div className="flex justify-center items-center py-20">
              <Spinner className="w-8 h-8 text-[#C9A227]" />
            </div>
          )}

          {/* PAST EVENTS — grid */}
          {!whatsOnLoading && eventsView === "past" && (
            <div>
              <p className="text-white/40 text-sm mb-8 text-center">A look back at recent nights at the Tiger.</p>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                {pastEvents.map((event, i) => {
                  const tag = tagColors[event.tag] ?? { bg: "rgba(255,255,255,0.1)", color: "white" };
                  return (
                    <div
                      key={i}
                      className="border border-white/10 p-6"
                      style={{ backgroundColor: "rgba(255,255,255,0.03)", opacity: 0.85 }}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <span className="text-[10px] font-bold tracking-widest uppercase px-2.5 py-1" style={{ backgroundColor: tag.bg, color: tag.color, opacity: 0.7 }}>
                          {event.tag}
                        </span>
                        <span className="text-white/20 text-[10px] tracking-widest uppercase">Past</span>
                      </div>
                      <h3 className="text-white/70 text-[17px] font-black uppercase tracking-wide mb-2" style={{ fontFamily: FONT }}>
                        {event.title}
                      </h3>
                      <div className="flex gap-4 mb-3">
                        <span className="text-[11px] tracking-wider uppercase font-semibold" style={{ color: `${GOLD}88` }}>
                          {event.day}
                        </span>
                        <span className="text-white/30 text-[11px]">{event.time}</span>
                      </div>
                      <p className="text-white/45 text-sm leading-relaxed">{event.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* UPCOMING — GRID VIEW */}
          {!whatsOnLoading && eventsView === "upcoming" && eventsLayout === "grid" && (
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
                      <span className="text-[10px] font-bold tracking-widest uppercase px-2.5 py-1" style={{ backgroundColor: tag.bg, color: tag.color }}>
                        {event.tag}
                      </span>
                      <Calendar size={14} className="text-white/25 mt-0.5" />
                    </div>
                    <h3 className="text-white text-[17px] font-black uppercase tracking-wide mb-2 group-hover:text-[#C9A227] transition-colors" style={{ fontFamily: FONT }}>
                      {event.title}
                    </h3>
                    <div className="flex gap-4 mb-3">
                      <span className="text-[11px] tracking-wider uppercase font-semibold flex items-center gap-1" style={{ color: GOLD }}>
                        <Clock size={10} className="flex-shrink-0" /> {event.day}
                      </span>
                      <span className="text-white/45 text-[11px]">{event.time}</span>
                    </div>
                    <p className="text-white/60 text-sm leading-relaxed">{event.desc}</p>
                    <div className="mt-5 pt-4 border-t border-white/10">
                      <a href="#book" className="text-[11px] font-bold tracking-widest uppercase flex items-center gap-1 hover:gap-2 transition-all" style={{ color: GOLD }}>
                        Request a Booking <ChevronRight size={11} />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* UPCOMING — WEEK-BY-WEEK VIEW */}
          {!whatsOnLoading && eventsView === "upcoming" && eventsLayout === "week" && (
            <div className="space-y-3">
              {weeklyGroups.map((week) => {
                const isOpen = expandedWeek === week.label;
                return (
                  <div key={week.label} className="border border-white/10" style={{ backgroundColor: "rgba(255,255,255,0.03)" }}>
                    {/* Week header — clickable accordion */}
                    <button
                      className="w-full flex items-center justify-between px-6 py-4 text-left transition-all hover:bg-white/5"
                      onClick={() => setExpandedWeek(isOpen ? null : week.label)}
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className="text-[11px] font-black tracking-widest uppercase px-3 py-1"
                          style={{ backgroundColor: isOpen ? GOLD : "rgba(255,255,255,0.08)", color: isOpen ? NAVY : "white", fontFamily: FONT }}
                        >
                          {week.label}
                        </div>
                        <span className="text-white/40 text-sm">{week.dates}</span>
                        <span className="text-white/25 text-xs">{week.events.length} events</span>
                      </div>
                      <ChevronDown
                        size={16}
                        className="text-white/40 transition-transform"
                        style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                      />
                    </button>

                    {/* Week events */}
                    {isOpen && (
                      <div className="border-t border-white/10">
                        {week.events.map((event, i) => {
                          const tag = tagColors[event.tag] ?? { bg: "rgba(255,255,255,0.1)", color: "white" };
                          return (
                            <div
                              key={i}
                              className="flex items-center gap-4 px-6 py-4 border-b border-white/5 last:border-b-0 hover:bg-white/5 transition-colors group"
                            >
                              {/* Day */}
                              <div className="w-24 flex-shrink-0">
                                <div className="text-white font-bold text-sm" style={{ fontFamily: FONT }}>{event.day}</div>
                                <div className="text-white/40 text-[11px]">{event.time}</div>
                              </div>
                              {/* Tag */}
                              <span className="text-[9px] font-bold tracking-widest uppercase px-2 py-0.5 flex-shrink-0 hidden sm:inline" style={{ backgroundColor: tag.bg, color: tag.color }}>
                                {event.tag}
                              </span>
                              {/* Title + desc */}
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                  <span className="text-white font-black text-sm uppercase tracking-wide group-hover:text-[#C9A227] transition-colors" style={{ fontFamily: FONT }}>
                                    {event.title}
                                  </span>
                                  {event.recurring && (
                                    <span className="text-[9px] text-white/25 tracking-widest uppercase hidden md:inline">Weekly</span>
                                  )}
                                </div>
                                <p className="text-white/45 text-xs leading-relaxed truncate">{event.desc}</p>
                              </div>
                              {/* Book link */}
                              {!event.recurring && (
                                <a href="#book" className="text-[10px] font-bold tracking-widest uppercase flex-shrink-0 transition-colors hover:text-white hidden sm:flex items-center gap-1" style={{ color: GOLD }}>
                                  Book <ChevronRight size={10} />
                                </a>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ── FOOD & MENU ────────────────────────────────────── */}
      <section id="food" className="py-20 px-6" style={{ backgroundColor: "#f5f0e8" }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs tracking-[0.5em] uppercase font-semibold mb-3" style={{ color: GOLD }}>
              Proper pub cooking
            </p>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-wide" style={{ color: NAVY, fontFamily: FONT }}>
              Our Menu
            </h2>
            <div className="mt-4 w-16 h-0.5 mx-auto" style={{ backgroundColor: GOLD }} />
          </div>

          {menuLoading && (
            <div className="flex justify-center items-center py-20">
              <Spinner className="w-8 h-8 text-[#002942]" />
            </div>
          )}

          {!menuLoading && (
            <>
              {/* Top-level menu switcher + print */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
                <div className="flex border-2" style={{ borderColor: NAVY }}>
                  {(["today", "sunday"] as const).map((type) => (
                    <button
                      key={type}
                      onClick={() => {
                        setActiveMenuType(type);
                        setActiveMenuTab(type === "today" ? "Starters" : "Starters");
                      }}
                      className="px-7 py-3 text-xs font-bold tracking-widest uppercase transition-all"
                      style={{
                        backgroundColor: activeMenuType === type ? NAVY : "transparent",
                        color: activeMenuType === type ? GOLD : NAVY,
                        fontFamily: FONT,
                        borderRight: type === "today" ? `2px solid ${NAVY}` : undefined,
                      }}
                    >
                      {type === "today" ? "Today's Menu" : "Sample Sunday Menu"}
                    </button>
                  ))}
                </div>

                {/* Print / Download */}
                <button
                  onClick={() => window.print()}
                  className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase px-5 py-3 border-2 transition-all hover:bg-[#002942] hover:text-white"
                  style={{ borderColor: NAVY, color: NAVY, fontFamily: FONT }}
                  title="Print or save as PDF"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 6 2 18 2 18 9"/>
                    <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/>
                    <rect x="6" y="14" width="12" height="8"/>
                  </svg>
                  Print / Download PDF
                </button>
              </div>

              {/* Section sub-tabs */}
              <div className="flex justify-center gap-2 mb-8 flex-wrap">
                {mappedMenuSections.map((section) => (
                  <button
                    key={section.name}
                    onClick={() => setActiveMenuTab(section.name)}
                    className="px-6 py-2.5 text-xs font-bold tracking-widest uppercase transition-all border"
                    style={{
                      backgroundColor: activeMenuTab === section.name ? NAVY : "transparent",
                      color: activeMenuTab === section.name ? GOLD : `${NAVY}99`,
                      borderColor: activeMenuTab === section.name ? NAVY : `${NAVY}44`,
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
                  <div key={i} className="flex items-start justify-between py-5 px-6 border-b border-[#002942]/10 hover:bg-[#002942]/5 transition-colors">
                    <div className="flex-1 pr-8">
                      <h4 className="font-bold uppercase tracking-wide text-sm" style={{ color: NAVY, fontFamily: FONT }}>{item.name}</h4>
                      {item.desc && <p style={{ color: `${NAVY}88` }} className="text-sm mt-1 leading-relaxed">{item.desc}</p>}
                    </div>
                    <span className="font-black text-lg flex-shrink-0" style={{ color: GOLD }}>{item.price}</span>
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
              Request a Booking
            </a>
          </div>
        </div>
      </section>

      {/* ── REQUEST A BOOKING ──────────────────────────────── */}
      <section id="book" className="py-24 px-6" style={{ backgroundColor: NAVY }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs tracking-[0.5em] uppercase font-semibold mb-3" style={{ color: GOLD }}>
              Reserve your spot
            </p>
            <h2 className="text-white text-4xl md:text-5xl font-black uppercase tracking-wide" style={{ fontFamily: FONT }}>
              Request a Booking
            </h2>
            <div className="mt-4 w-16 h-0.5 mx-auto" style={{ backgroundColor: GOLD }} />
            <p className="text-white/50 text-sm mt-5 leading-relaxed max-w-md mx-auto">
              Fill in your details and we'll confirm your booking via WhatsApp ASAP.
            </p>
          </div>

          {bookingSubmitted ? (
            /* ── CONFIRMATION STATE ── */
            <div className="max-w-xl mx-auto border border-white/10 p-12 text-center" style={{ backgroundColor: "rgba(255,255,255,0.04)" }}>
              <div
                className="w-16 h-16 flex items-center justify-center mx-auto mb-6 font-black text-2xl"
                style={{ backgroundColor: GOLD, color: NAVY }}
              >
                ✓
              </div>
              <div className="text-2xl font-black uppercase tracking-wide text-white mb-3" style={{ fontFamily: FONT }}>
                Booking Pending
              </div>
              <p className="text-white/65 text-sm leading-relaxed mb-6">
                Thanks, {bookingForm.name.split(" ")[0]}. We've received your request and will confirm your booking via WhatsApp shortly.
              </p>
              <div
                className="border-l-4 px-5 py-4 text-left mb-6"
                style={{ borderColor: GOLD, backgroundColor: "rgba(201,162,39,0.08)" }}
              >
                <div className="text-[10px] font-bold tracking-widest uppercase mb-2" style={{ color: GOLD }}>Your request</div>
                <div className="text-white/70 text-sm space-y-1">
                  <div><span className="text-white/40">Date:</span> {bookingForm.date}</div>
                  <div><span className="text-white/40">Time:</span> {bookingForm.time}</div>
                  <div><span className="text-white/40">Guests:</span> {bookingForm.guests}</div>
                </div>
              </div>
              <p className="text-white/40 text-xs">
                If you need to reach us urgently, call us on{" "}
                <a href="tel:02083186000" className="underline hover:text-white transition-colors">020 8318 6000</a>
              </p>
            </div>
          ) : (
            /* ── BOOKING FORM ── */
            <form
              className="max-w-2xl mx-auto"
              onSubmit={(e) => {
                e.preventDefault();
                const errs: Record<string, string> = {};
                if (!bookingForm.name.trim()) errs.name = "Please enter your name";
                if (!bookingForm.phone.trim() && !bookingForm.email.trim()) errs.contact = "Please provide a phone number or email";
                if (!bookingForm.date.trim()) errs.date = "Please choose a date";
                if (!bookingForm.guests.trim()) errs.guests = "Please tell us how many guests";
                setBookingErrors(errs);
                if (Object.keys(errs).length === 0) setBookingSubmitted(true);
              }}
            >
              <div className="grid sm:grid-cols-2 gap-5 mb-5">
                {/* Name */}
                <div className="sm:col-span-2">
                  <label className="block text-[10px] font-bold tracking-widest uppercase mb-2" style={{ color: GOLD }}>
                    Your Name *
                  </label>
                  <input
                    type="text"
                    placeholder="Full name"
                    value={bookingForm.name}
                    onChange={(e) => setBookingForm((f) => ({ ...f, name: e.target.value }))}
                    className="w-full bg-transparent border px-4 py-3 text-white text-sm placeholder:text-white/30 outline-none transition-colors focus:border-[#C9A227]"
                    style={{ borderColor: bookingErrors.name ? "#ef4444" : "rgba(255,255,255,0.15)" }}
                  />
                  {bookingErrors.name && <p className="text-red-400 text-xs mt-1">{bookingErrors.name}</p>}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-[10px] font-bold tracking-widest uppercase mb-2" style={{ color: GOLD }}>
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="Your mobile number"
                    value={bookingForm.phone}
                    onChange={(e) => setBookingForm((f) => ({ ...f, phone: e.target.value }))}
                    className="w-full bg-transparent border px-4 py-3 text-white text-sm placeholder:text-white/30 outline-none transition-colors focus:border-[#C9A227]"
                    style={{ borderColor: bookingErrors.contact ? "#ef4444" : "rgba(255,255,255,0.15)" }}
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-[10px] font-bold tracking-widest uppercase mb-2" style={{ color: GOLD }}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={bookingForm.email}
                    onChange={(e) => setBookingForm((f) => ({ ...f, email: e.target.value }))}
                    className="w-full bg-transparent border px-4 py-3 text-white text-sm placeholder:text-white/30 outline-none transition-colors focus:border-[#C9A227]"
                    style={{ borderColor: bookingErrors.contact ? "#ef4444" : "rgba(255,255,255,0.15)" }}
                  />
                  {bookingErrors.contact && <p className="text-red-400 text-xs mt-1">{bookingErrors.contact}</p>}
                </div>

                {/* Date */}
                <div>
                  <label className="block text-[10px] font-bold tracking-widest uppercase mb-2" style={{ color: GOLD }}>
                    Date of Visit *
                  </label>
                  <input
                    type="date"
                    value={bookingForm.date}
                    onChange={(e) => setBookingForm((f) => ({ ...f, date: e.target.value }))}
                    className="w-full bg-transparent border px-4 py-3 text-white text-sm outline-none transition-colors focus:border-[#C9A227]"
                    style={{
                      borderColor: bookingErrors.date ? "#ef4444" : "rgba(255,255,255,0.15)",
                      colorScheme: "dark",
                    }}
                  />
                  {bookingErrors.date && <p className="text-red-400 text-xs mt-1">{bookingErrors.date}</p>}
                </div>

                {/* Time */}
                <div>
                  <label className="block text-[10px] font-bold tracking-widest uppercase mb-2" style={{ color: GOLD }}>
                    Preferred Time
                  </label>
                  <select
                    value={bookingForm.time}
                    onChange={(e) => setBookingForm((f) => ({ ...f, time: e.target.value }))}
                    className="w-full bg-[#002942] border px-4 py-3 text-white text-sm outline-none transition-colors focus:border-[#C9A227] appearance-none cursor-pointer"
                    style={{ borderColor: "rgba(255,255,255,0.15)" }}
                  >
                    <option value="">Select a time...</option>
                    <option value="12:00">12:00pm – Lunch</option>
                    <option value="13:00">1:00pm</option>
                    <option value="14:00">2:00pm</option>
                    <option value="17:00">5:00pm</option>
                    <option value="18:00">6:00pm</option>
                    <option value="19:00">7:00pm – Dinner</option>
                    <option value="19:30">7:30pm</option>
                    <option value="20:00">8:00pm</option>
                  </select>
                </div>

                {/* Guests */}
                <div>
                  <label className="block text-[10px] font-bold tracking-widest uppercase mb-2" style={{ color: GOLD }}>
                    Number of Guests *
                  </label>
                  <select
                    value={bookingForm.guests}
                    onChange={(e) => setBookingForm((f) => ({ ...f, guests: e.target.value }))}
                    className="w-full bg-[#002942] border px-4 py-3 text-white text-sm outline-none transition-colors focus:border-[#C9A227] appearance-none cursor-pointer"
                    style={{ borderColor: bookingErrors.guests ? "#ef4444" : "rgba(255,255,255,0.15)" }}
                  >
                    <option value="">Select...</option>
                    {[1,2,3,4,5,6,7,8,"9+"].map((n) => (
                      <option key={n} value={String(n)}>{n} {n === 1 ? "guest" : "guests"}</option>
                    ))}
                  </select>
                  {bookingErrors.guests && <p className="text-red-400 text-xs mt-1">{bookingErrors.guests}</p>}
                </div>

                {/* Notes */}
                <div className="sm:col-span-2">
                  <label className="block text-[10px] font-bold tracking-widest uppercase mb-2" style={{ color: GOLD }}>
                    Anything else we should know?
                  </label>
                  <textarea
                    placeholder="Dietary requirements, allergies, high chairs, occasion, specific seating request..."
                    rows={3}
                    value={bookingForm.notes}
                    onChange={(e) => setBookingForm((f) => ({ ...f, notes: e.target.value }))}
                    className="w-full bg-transparent border px-4 py-3 text-white text-sm placeholder:text-white/30 outline-none transition-colors focus:border-[#C9A227] resize-none"
                    style={{ borderColor: "rgba(255,255,255,0.15)" }}
                  />
                </div>
              </div>

              {/* Event updates checkbox */}
              <div className="mb-7 border border-white/10 px-5 py-4" style={{ backgroundColor: "rgba(255,255,255,0.04)" }}>
                <label className="flex items-start gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={bookingForm.keepUpdated}
                    onChange={(e) => setBookingForm((f) => ({ ...f, keepUpdated: e.target.checked }))}
                    className="mt-0.5 flex-shrink-0 accent-[#C9A227]"
                  />
                  <span className="text-white/65 text-sm leading-relaxed group-hover:text-white/80 transition-colors">
                    Keep me updated about what's on at the Old Tigers Head.
                  </span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full text-sm font-bold tracking-[0.25em] uppercase py-4 transition-all hover:brightness-90"
                style={{ backgroundColor: GOLD, color: NAVY, fontFamily: FONT }}
              >
                Book
              </button>

              <p className="text-white/25 text-xs text-center mt-4">
                We'll confirm your booking via WhatsApp. For larger parties or private hire, please{" "}
                <a href="mailto:hello@oldtigershead.co.uk" className="underline hover:text-white/50 transition-colors">
                  email us directly
                </a>.
              </p>
            </form>
          )}
        </div>
      </section>

      {/* ── VISIT ──────────────────────────────────────────── */}
      <section id="visit" className="py-24 px-6" style={{ backgroundColor: "#001e30" }}>
        <div className="max-w-5xl mx-auto">

          <div className="text-center mb-16">
            <p className="text-xs tracking-[0.5em] uppercase font-semibold mb-3" style={{ color: GOLD }}>
              We're easy to find
            </p>
            <h2 className="text-white text-4xl md:text-5xl font-black uppercase tracking-wide" style={{ fontFamily: FONT }}>
              Visit Us
            </h2>
            <div className="mt-4 w-16 h-0.5 mx-auto" style={{ backgroundColor: GOLD }} />
          </div>

          {/* Address + Map link */}
          <div className="flex flex-col md:flex-row gap-8 mb-14">
            <div className="flex-1 border border-white/10 p-8" style={{ backgroundColor: "rgba(255,255,255,0.04)" }}>
              <div className="text-[10px] font-bold tracking-widest uppercase mb-5" style={{ color: GOLD }}>Address</div>
              <div className="flex items-start gap-3 mb-4">
                <MapPin size={16} className="flex-shrink-0 mt-0.5" style={{ color: GOLD }} />
                <div>
                  <div className="text-white font-bold">The Old Tigers Head</div>
                  <div className="text-white/60 text-sm mt-1">351 Lee High Road<br />London SE12 8RU</div>
                </div>
              </div>
              <a
                href="https://maps.google.com/?q=351+Lee+High+Road+London+SE12+8RU"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[11px] font-bold tracking-widest uppercase mt-2 transition-colors hover:text-white"
                style={{ color: GOLD }}
              >
                Open in Google Maps <ExternalLink size={11} />
              </a>
            </div>

            <div className="flex-1 border border-white/10 p-8" style={{ backgroundColor: "rgba(255,255,255,0.04)" }}>
              <div className="text-[10px] font-bold tracking-widest uppercase mb-5" style={{ color: GOLD }}>Opening Hours</div>
              <div className="space-y-2 text-sm">
                {[
                  { days: "Mon – Thu", hours: "12pm – 11pm" },
                  { days: "Fri – Sat", hours: "12pm – 12am" },
                  { days: "Sunday", hours: "12pm – 10:30pm" },
                ].map((row) => (
                  <div key={row.days} className="flex justify-between">
                    <span className="text-white/60">{row.days}</span>
                    <span className="text-white font-semibold">{row.hours}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex-1 border border-white/10 p-8" style={{ backgroundColor: "rgba(255,255,255,0.04)" }}>
              <div className="text-[10px] font-bold tracking-widest uppercase mb-5" style={{ color: GOLD }}>Get in Touch</div>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-white/60 text-sm">
                  <Phone size={14} style={{ color: GOLD }} />
                  <a href="tel:02083186000" className="hover:text-white transition-colors">020 8318 6000</a>
                </div>
                <div className="flex items-center gap-3 text-white/60 text-sm">
                  <Mail size={14} style={{ color: GOLD }} />
                  <a href="mailto:hello@oldtigershead.co.uk" className="hover:text-white transition-colors">hello@oldtigershead.co.uk</a>
                </div>
              </div>
            </div>
          </div>

          {/* Directions */}
          <div className="mb-14">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-black uppercase tracking-wide" style={{ color: "white", fontFamily: FONT }}>
                Getting Here
              </h3>
              <a
                href="https://tfl.gov.uk/plan-a-journey/?to=SE12+8RG"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[11px] font-bold tracking-widest uppercase border px-5 py-2.5 transition-colors hover:border-[#C9A227] hover:text-[#C9A227]"
                style={{ borderColor: "rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.7)" }}
              >
                <Train size={13} />
                TfL Journey Planner
                <ExternalLink size={11} />
              </a>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {stationDirections.map((s) => (
                <div
                  key={s.station}
                  className="border border-white/10 p-6 hover:border-[#C9A227]/40 transition-all"
                  style={{ backgroundColor: "rgba(255,255,255,0.04)" }}
                >
                  <div className="flex items-start gap-4">
                    <span className="text-2xl flex-shrink-0">{s.icon}</span>
                    <div>
                      <div className="font-black uppercase tracking-wide text-white text-sm" style={{ fontFamily: FONT }}>
                        {s.station}
                      </div>
                      <div className="text-[10px] tracking-wider uppercase mb-1" style={{ color: GOLD }}>
                        {s.line}
                      </div>
                      <div className="text-[11px] font-bold mb-2" style={{ color: `${GOLD}99` }}>
                        {s.walk}
                      </div>
                      <p className="text-white/55 text-sm leading-relaxed">{s.directions}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bus stops */}
          <div className="mb-14">
            <h3 className="text-lg font-black uppercase tracking-wide mb-6" style={{ color: "white", fontFamily: FONT }}>
              By Bus
            </h3>
            <div className="border border-white/10 p-6" style={{ backgroundColor: "rgba(255,255,255,0.04)" }}>
              <p className="text-white/60 text-sm leading-relaxed mb-5">
                The pub is served directly by its own stop — <span className="text-white font-semibold">Lee Green / The Old Tigers Head (Stop K)</span> — just steps from the front door.
              </p>
              <div className="grid sm:grid-cols-2 gap-3 mb-5">
                {[
                  { route: "122", direction: "Crystal Palace or Plumstead" },
                  { route: "178", direction: "Woolwich or Lewisham" },
                  { route: "202", direction: "Blackheath or Crystal Palace" },
                  { route: "261", direction: "Lewisham or Princess Royal Hospital" },
                  { route: "321", direction: "Foots Cray or New Cross Gate" },
                ].map((bus) => (
                  <div key={bus.route} className="flex items-center gap-3">
                    <span
                      className="w-10 h-7 flex items-center justify-center font-black text-[11px] flex-shrink-0"
                      style={{ backgroundColor: GOLD, color: NAVY, fontFamily: FONT }}
                    >
                      {bus.route}
                    </span>
                    <span className="text-white/60 text-sm">{bus.direction}</span>
                  </div>
                ))}
              </div>
              <p className="text-white/35 text-xs">
                Nearest stops: Lee Green / The Old Tigers Head (Stop K) · Burnt Ash Road / Lee Road (Stop H) · Lee Green (Stop J)
              </p>
            </div>
          </div>

          {/* FAQ teaser */}
          <div
            className="border-l-4 px-8 py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
            style={{ borderColor: GOLD, backgroundColor: "rgba(201,162,39,0.07)" }}
          >
            <div>
              <div className="text-white font-bold mb-1" style={{ fontFamily: FONT }}>
                Special dietary requirements? Need parking, or a high chair?
              </div>
              <p className="text-white/60 text-sm">
                Chat with us before you visit, or check out our FAQ page for quick answers.
              </p>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0">
              <a
                href="mailto:hello@oldtigershead.co.uk"
                className="text-[11px] font-bold tracking-widest uppercase px-6 py-3 transition-all hover:brightness-90"
                style={{ backgroundColor: GOLD, color: NAVY, fontFamily: FONT }}
              >
                Chat with Us
              </a>
              <a
                href="#faq"
                className="text-[11px] font-bold tracking-widest uppercase px-6 py-3 border transition-colors hover:border-[#C9A227] hover:text-[#C9A227]"
                style={{ borderColor: "rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.7)", fontFamily: FONT }}
              >
                FAQs
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── ABOUT — PAST, PRESENT & FUTURE ────────────────── */}
      <section id="about" className="py-24 px-6" style={{ backgroundColor: NAVY }}>
        <div className="max-w-5xl mx-auto">

          <div className="text-center mb-20">
            <p className="text-xs tracking-[0.5em] uppercase font-semibold mb-3" style={{ color: GOLD }}>
              Est. 1750
            </p>
            <h2 className="text-white text-4xl md:text-5xl font-black uppercase tracking-wide" style={{ fontFamily: FONT }}>
              Our Story
            </h2>
            <div className="mt-4 w-16 h-0.5 mx-auto" style={{ backgroundColor: GOLD }} />
            <p className="text-white/40 text-sm mt-5 max-w-lg mx-auto leading-relaxed">
              The Old Tigers Head has been many things to many people over three centuries. A coaching inn, a community anchor, a local institution — and a pub with a very bright future.
            </p>
          </div>

          {/* ── PAST ── */}
          <div className="mb-24">
            <div className="flex items-center gap-4 mb-10">
              <div className="text-[10px] font-black tracking-[0.5em] uppercase px-3 py-1.5 border" style={{ color: GOLD, borderColor: `${GOLD}55` }}>Past</div>
              <div className="flex-1 h-px" style={{ backgroundColor: `${GOLD}22` }} />
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Slideshow */}
              <div className="relative overflow-hidden" style={{ minHeight: "360px", backgroundColor: "rgba(255,255,255,0.05)" }}>
                {/* Slide image */}
                <div className="relative w-full h-full" style={{ minHeight: "360px" }}>
                  {slide.img ? (
                    <img
                      key={slide.img}
                      src={slide.img}
                      alt={slide.era}
                      className="w-full h-full object-cover slide-img"
                      style={{ minHeight: "360px", opacity: 1 }}
                      onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                    />
                  ) : (
                    <div
                      className="w-full flex items-center justify-center"
                      style={{ minHeight: "360px", background: `linear-gradient(135deg, rgba(0,41,66,0.8) 0%, rgba(0,20,35,0.95) 100%)` }}
                    >
                      <div className="text-center px-8">
                        <div className="text-6xl font-black opacity-10 mb-4" style={{ color: GOLD, fontFamily: FONT }}>
                          OTH
                        </div>
                        <div className="text-white/30 text-xs tracking-widest uppercase">Historical photo coming soon</div>
                      </div>
                    </div>
                  )}
                  {/* Dark overlay */}
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,20,35,0.85) 0%, rgba(0,20,35,0.2) 60%, transparent 100%)" }} />
                  {/* Era label + caption */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="text-[10px] font-black tracking-widest uppercase mb-1" style={{ color: GOLD }}>{slide.era}</div>
                    <p className="text-white/75 text-sm leading-relaxed">{slide.caption}</p>
                  </div>
                </div>

                {/* Prev / Next */}
                <button
                  onClick={() => goSlide(-1)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center border border-white/20 hover:border-white/60 transition-colors text-white"
                  style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
                  aria-label="Previous photo"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  onClick={() => goSlide(1)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center border border-white/20 hover:border-white/60 transition-colors text-white"
                  style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
                  aria-label="Next photo"
                >
                  <ChevronRight size={16} />
                </button>

                {/* Slide dots */}
                <div className="absolute bottom-3 right-3 flex gap-1.5">
                  {historySlides.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => { if (slideTimer.current) clearInterval(slideTimer.current); setSlideIndex(i); }}
                      className="w-1.5 h-1.5 transition-all"
                      style={{ backgroundColor: i === slideIndex ? GOLD : "rgba(255,255,255,0.3)" }}
                      aria-label={`Slide ${i + 1}`}
                    />
                  ))}
                </div>
              </div>

              {/* History text */}
              <div>
                <h3 className="text-2xl font-black uppercase tracking-wide mb-6" style={{ color: GOLD, fontFamily: FONT }}>
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

                {/* History directory */}
                <div className="mt-8 border border-white/10 p-5" style={{ backgroundColor: "rgba(255,255,255,0.04)" }}>
                  <div className="text-[10px] font-bold tracking-widest uppercase mb-2" style={{ color: GOLD }}>
                    Want to go deeper?
                  </div>
                  <p className="text-white/55 text-sm mb-4 leading-relaxed">
                    The Old Tigers Head has a rich and well-documented history. A directory of sources worth exploring.
                  </p>
                  <div className="space-y-3">
                    {[
                      { label: "Lee, London — Wikipedia", note: "Overview of Lee's history, including the Old Tiger's Head at Lee Green.", href: "https://en.wikipedia.org/wiki/Lee,_London" },
                      { label: "Ideal Homes · University of Greenwich", note: "Historical images and notes on Lee Green's old pub and the area.", href: "https://ideal-homes.gre.ac.uk/lewisham/assets/galleries/lee/old-tigers-head.html" },
                      { label: "Dover-Kent", note: "Detailed history including early origins and the rebuilding story.", href: "http://www.dover-kent.com/2016-project/Old-Tigers-Head-Lee.html" },
                      { label: "Pubs Wiki", note: "Dates, landlords, and historical notes on the Old Tigers Head.", href: "https://pubwiki.co.uk/LondonPubs/Lee/OldTigersHead.shtml" },
                      { label: "Running Past", note: "The New Tiger's Head article — explains the relationship with this pub and Lee Green.", href: "https://runner500.wordpress.com/2018/03/14/the-new-tigers-head-a-lee-green-pub/" },
                      { label: "CAMRA", note: "Pub listing with notes on the location and historic setting.", href: "https://camra.org.uk/pubs/old-tigers-head-lee-158536" },
                    ].map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-start gap-3 group"
                      >
                        <ExternalLink size={11} className="flex-shrink-0 mt-1 transition-colors group-hover:text-white" style={{ color: GOLD }} />
                        <div>
                          <div className="text-[11px] font-bold tracking-wide uppercase transition-colors group-hover:text-white" style={{ color: GOLD }}>{link.label}</div>
                          <div className="text-white/40 text-xs leading-relaxed">{link.note}</div>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full h-px mb-20" style={{ backgroundColor: `${GOLD}22` }} />

          {/* ── PRESENT ── */}
          <div className="mb-24">
            <div className="flex items-center gap-4 mb-10">
              <div className="text-[10px] font-black tracking-[0.5em] uppercase px-3 py-1.5 border" style={{ color: GOLD, borderColor: `${GOLD}55` }}>Present</div>
              <div className="flex-1 h-px" style={{ backgroundColor: `${GOLD}22` }} />
            </div>

            <div className="grid lg:grid-cols-2 gap-16 items-start">
              <div>
                <h3 className="text-2xl font-black uppercase tracking-wide mb-6" style={{ color: GOLD, fontFamily: FONT }}>
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
              </div>

              <div className="border border-white/10 p-8" style={{ backgroundColor: "rgba(255,255,255,0.04)" }}>
                <div className="space-y-7">
                  {[
                    { name: "Rob", role: "Licensee & Host", note: "Determined to restore the Tiger as the hub of the community. His door is always open — he'll find you a seat, remember your drink, and make sure you leave with a smile." },
                    { name: "Cara", role: "Front of House", note: "Cara makes every guest feel at home from the moment they walk in. A true natural in hospitality — warm, attentive, and always ready with a recommendation." },
                    { name: "Paolo", role: "Head Chef", note: "Paolo brings craft and love to every dish. Seasonal, honest, always made from scratch — and the reason people book a table two weeks in advance for Sunday lunch." },
                  ].map((person) => (
                    <div key={person.name} className="flex gap-5 items-start">
                      <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center font-black text-lg" style={{ backgroundColor: GOLD, color: NAVY, fontFamily: FONT }}>
                        {person.name[0]}
                      </div>
                      <div>
                        <div className="text-white font-black tracking-wide" style={{ fontFamily: FONT }}>{person.name}</div>
                        <div className="text-[10px] tracking-widest uppercase mb-1.5" style={{ color: GOLD }}>{person.role}</div>
                        <p className="text-white/55 text-sm leading-relaxed">{person.note}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Community CTA */}
            <div
              className="mt-14 p-8 border border-white/10 flex flex-col md:flex-row items-center gap-8 text-center md:text-left"
              style={{ backgroundColor: "rgba(201,162,39,0.07)", borderColor: `${GOLD}33` }}
            >
              <div className="flex-shrink-0">
                <div
                  className="w-16 h-16 flex items-center justify-center"
                  style={{ backgroundColor: GOLD, color: NAVY }}
                >
                  <Users size={28} />
                </div>
              </div>
              <div className="flex-1">
                <div className="text-xl font-black uppercase tracking-wide mb-2" style={{ color: "white", fontFamily: FONT }}>
                  Join the Tigers Head Community
                </div>
                <p className="text-white/60 text-sm leading-relaxed max-w-xl">
                  Sign up, write a bio, add your dog's profile, and become part of the family. One lucky member (or their four-legged friend) wins wings and a pint as our Tiger of the Month — featured right here on the site every month.
                </p>
              </div>
              <div className="flex-shrink-0">
                <a
                  href="/community"
                  className="inline-block text-sm font-bold tracking-[0.2em] uppercase px-8 py-4 transition-all hover:brightness-90"
                  style={{ backgroundColor: GOLD, color: NAVY, fontFamily: FONT }}
                >
                  Join the Community
                </a>
              </div>
            </div>
          </div>

          <div className="w-full h-px mb-20" style={{ backgroundColor: `${GOLD}22` }} />

          {/* ── FUTURE ── */}
          <div>
            <div className="flex items-center gap-4 mb-10">
              <div className="text-[10px] font-black tracking-[0.5em] uppercase px-3 py-1.5 border" style={{ color: GOLD, borderColor: `${GOLD}55` }}>Future</div>
              <div className="flex-1 h-px" style={{ backgroundColor: `${GOLD}22` }} />
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <div>
                <h3 className="text-2xl font-black uppercase tracking-wide mb-6" style={{ color: GOLD, fontFamily: FONT }}>
                  The Tiger Is Here to Stay
                </h3>
                <div className="space-y-5 text-white/72 text-[15px] leading-loose">
                  <p>
                    We're thrilled to announce that a 15-year lease has just been secured on The Old Tigers Head. This is a landmark moment — a guarantee that this building, and this community, will remain at the heart of Lee for a generation to come.
                  </p>
                  <p>
                    And we're not stopping there. A comprehensive refurbishment is on the way — carefully planned to preserve everything that makes the Tiger special while bringing the building up to the standard it deserves. The bones are extraordinary. We intend to match them.
                  </p>
                  <p>
                    We'll share updates on the refurbishment here as plans take shape. In the meantime — come in, have a drink, and know that this place isn't going anywhere.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {/* Milestone: Lease */}
                <div
                  className="border-l-4 p-6 flex items-start gap-5"
                  style={{ borderColor: GOLD, backgroundColor: "rgba(255,255,255,0.04)" }}
                >
                  <div
                    className="w-12 h-12 flex-shrink-0 flex items-center justify-center font-black text-sm"
                    style={{ backgroundColor: GOLD, color: NAVY, fontFamily: FONT }}
                  >
                    <Star size={20} />
                  </div>
                  <div>
                    <div className="text-white font-black uppercase tracking-wide text-sm mb-1" style={{ fontFamily: FONT }}>
                      15-Year Lease Secured
                    </div>
                    <div className="text-[10px] tracking-widest uppercase mb-2" style={{ color: GOLD }}>April 2026</div>
                    <p className="text-white/55 text-sm leading-relaxed">
                      A long-term commitment to Lee and its community. The Old Tigers Head will remain a proper local pub for the foreseeable future.
                    </p>
                  </div>
                </div>

                {/* Milestone: Refurbishment */}
                <div
                  className="border-l-4 p-6 flex items-start gap-5"
                  style={{ borderColor: `${GOLD}55`, backgroundColor: "rgba(255,255,255,0.04)" }}
                >
                  <div
                    className="w-12 h-12 flex-shrink-0 flex items-center justify-center font-black text-sm border-2"
                    style={{ borderColor: GOLD, color: GOLD, fontFamily: FONT }}
                  >
                    🔨
                  </div>
                  <div>
                    <div className="text-white font-black uppercase tracking-wide text-sm mb-1" style={{ fontFamily: FONT }}>
                      Comprehensive Refurbishment
                    </div>
                    <div className="text-[10px] tracking-widest uppercase mb-2" style={{ color: `${GOLD}99` }}>Coming soon</div>
                    <p className="text-white/55 text-sm leading-relaxed">
                      A sympathetic, thorough renovation of the building — preserving its historic character while creating a pub that's worthy of its next 275 years. Full details to follow.
                    </p>
                  </div>
                </div>

                {/* Keep informed CTA */}
                <div className="border border-white/10 p-6" style={{ backgroundColor: "rgba(255,255,255,0.04)" }}>
                  <div className="text-white/60 text-sm mb-3 leading-relaxed">
                    Want to be kept informed as the refurbishment plans take shape? Join the community and we'll keep you posted.
                  </div>
                  <a
                    href="/community"
                    className="inline-flex items-center gap-2 text-[11px] font-bold tracking-widest uppercase transition-colors hover:text-white"
                    style={{ color: GOLD }}
                  >
                    Stay in the Loop <ChevronRight size={11} />
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── VENUE HIRE ─────────────────────────────────────── */}
      <section id="hire" className="py-20 px-6" style={{ backgroundColor: GOLD }}>
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs tracking-[0.5em] uppercase font-semibold mb-3" style={{ color: NAVY }}>
            Functions &amp; Events
          </p>
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-wide mb-6" style={{ color: NAVY, fontFamily: FONT }}>
            Private Hire
          </h2>
          <p className="text-lg leading-relaxed max-w-2xl mx-auto mb-10" style={{ color: `${NAVY}bb` }}>
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

      {/* ── FOOTER ─────────────────────────────────────────── */}
      <footer className="py-16 px-6" style={{ backgroundColor: "#001520" }}>
        <div className="max-w-5xl mx-auto" id="contact">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            <div>
              <div className="text-xl font-black uppercase tracking-wide mb-4" style={{ color: GOLD, fontFamily: FONT }}>
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
            <div>
              <div className="text-white/30 text-[10px] tracking-widest uppercase font-semibold mb-4">Find Us</div>
              <div className="space-y-2">
                <div className="flex items-start gap-2 text-white/60 text-sm">
                  <MapPin size={14} className="flex-shrink-0 mt-0.5" style={{ color: GOLD }} />
                  <span>351 Lee High Road, London SE12 8RU</span>
                </div>
                <div className="flex items-center gap-2 text-white/60 text-sm">
                  <Phone size={14} className="flex-shrink-0" style={{ color: GOLD }} />
                  <a href="tel:02083186000" className="hover:text-white transition-colors">020 8318 6000</a>
                </div>
                <div className="flex items-center gap-2 text-white/60 text-sm">
                  <Mail size={14} className="flex-shrink-0" style={{ color: GOLD }} />
                  <a href="mailto:hello@oldtigershead.co.uk" className="hover:text-white transition-colors">hello@oldtigershead.co.uk</a>
                </div>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/25 text-xs tracking-widest">© 2026 The Old Tigers Head. All rights reserved.</p>
            <p className="text-white/25 text-xs">Please drink responsibly. Think 25.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
