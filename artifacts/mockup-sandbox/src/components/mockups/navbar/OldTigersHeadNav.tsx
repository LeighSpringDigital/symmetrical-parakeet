import { useState, useEffect } from "react";
import { Search, Menu, X, ChevronDown } from "lucide-react";

const navLinksLeft = [
  { label: "What's On", href: "#" },
  { label: "Visit", href: "#" },
  { label: "About", href: "#" },
  { label: "Food", href: "#" },
  { label: "Venue Hire", href: "#" },
];

export function OldTigersHeadNav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen font-['Oswald'] relative overflow-hidden">
      {/* Hero background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('/__mockup/images/oth-hero.jpg'), linear-gradient(135deg, #1a1206 0%, #2d1f0a 40%, #0d0d0d 100%)",
          backgroundColor: "#1a1206",
        }}
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Announcement ticker */}
      <div className="relative z-10 bg-[#C9A227] text-black overflow-hidden py-2">
        <div className="flex whitespace-nowrap animate-[ticker_30s_linear_infinite]">
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
            <span
              key={i}
              className="mx-8 text-sm font-semibold tracking-widest uppercase"
            >
              ★ {item}
            </span>
          ))}
        </div>
      </div>

      {/* ── NAVBAR ─────────────────────────────────────────── */}
      <nav
        className={`relative z-20 transition-all duration-300 ${
          scrolled ? "bg-black/90 shadow-lg" : "bg-transparent"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 h-20 flex items-center justify-between">

          {/* LEFT: nav links */}
          <div className="hidden lg:flex items-center gap-8 flex-1">
            {navLinksLeft.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-white/90 hover:text-[#C9A227] text-sm font-medium tracking-widest uppercase transition-colors duration-200 relative group whitespace-nowrap"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#C9A227] group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </div>

          {/* CENTRE: Logo / name */}
          <div className="flex flex-col items-center flex-shrink-0 mx-8 select-none">
            {/* "T" crest */}
            <div className="w-12 h-12 bg-[#C9A227] flex items-center justify-center mb-1 rounded-sm">
              <span className="text-black text-2xl font-black font-['Oswald']">T</span>
            </div>
            <div className="text-center leading-none">
              <div className="text-white text-[10px] tracking-[0.35em] uppercase font-light">The</div>
              <div className="text-[#C9A227] text-lg font-black tracking-[0.1em] uppercase leading-tight">Old Tigers Head</div>
              <div className="text-white/70 text-[8px] tracking-[0.3em] uppercase">Est. 1750 · Lee, London</div>
            </div>
          </div>

          {/* RIGHT: CTA + icons */}
          <div className="hidden lg:flex items-center gap-4 flex-1 justify-end">
            <a
              href="#"
              className="bg-[#C9A227] text-black text-xs font-bold tracking-[0.2em] uppercase px-6 py-3 hover:bg-[#b08c1e] transition-colors duration-200"
            >
              Book a Table
            </a>
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="text-white/80 hover:text-[#C9A227] transition-colors p-2"
              aria-label="Search"
            >
              <Search size={20} />
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-white/80 hover:text-[#C9A227] transition-colors p-2"
              aria-label="Menu"
            >
              <Menu size={22} />
            </button>
          </div>

          {/* Mobile: right side */}
          <div className="flex lg:hidden items-center gap-3 flex-1 justify-end">
            <a
              href="#"
              className="bg-[#C9A227] text-black text-[10px] font-bold tracking-widest uppercase px-4 py-2"
            >
              Book
            </a>
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="text-white p-1"
            >
              <Search size={18} />
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-white p-1"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>

        {/* Search bar drop-down */}
        {searchOpen && (
          <div className="bg-black/95 border-t border-white/10 px-6 py-4 flex items-center gap-3">
            <Search size={18} className="text-[#C9A227] flex-shrink-0" />
            <input
              autoFocus
              type="text"
              placeholder="Search..."
              className="flex-1 bg-transparent text-white placeholder:text-white/40 text-sm tracking-wider outline-none border-b border-white/20 pb-1 focus:border-[#C9A227] transition-colors"
            />
            <button
              onClick={() => setSearchOpen(false)}
              className="text-white/50 hover:text-white transition-colors"
            >
              <X size={18} />
            </button>
          </div>
        )}
      </nav>

      {/* Full-screen mobile menu overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-black/97 flex flex-col">
          <div className="flex justify-between items-center px-6 py-5 border-b border-white/10">
            <div className="text-[#C9A227] text-lg font-black tracking-widest uppercase">Menu</div>
            <button
              onClick={() => setMenuOpen(false)}
              className="text-white/70 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto px-8 py-10 space-y-8">
            {navLinksLeft.map((link, i) => (
              <div key={link.label}>
                <a
                  href={link.href}
                  className="text-white text-3xl font-bold tracking-widest uppercase hover:text-[#C9A227] transition-colors flex items-center gap-3 group"
                  onClick={() => setMenuOpen(false)}
                >
                  <span>{link.label}</span>
                  <ChevronDown size={20} className="text-white/30 group-hover:text-[#C9A227] rotate-[-90deg] transition-colors" />
                </a>
                {i < navLinksLeft.length - 1 && (
                  <div className="mt-6 border-b border-white/10" />
                )}
              </div>
            ))}
          </div>
          <div className="px-8 py-8 border-t border-white/10">
            <a
              href="#"
              className="block w-full bg-[#C9A227] text-black text-center text-sm font-bold tracking-[0.25em] uppercase py-4 hover:bg-[#b08c1e] transition-colors"
            >
              Book a Table
            </a>
          </div>
        </div>
      )}

      {/* Hero content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[85vh] text-center px-6">
        <p className="text-white/70 text-xs tracking-[0.5em] uppercase mb-6">
          The Beating Heart of Lee
        </p>
        <h1 className="text-white font-black uppercase leading-none mb-8">
          <span
            className="block text-[#C9A227]"
            style={{ fontSize: "clamp(3rem, 10vw, 8rem)" }}
          >
            The Old
          </span>
          <span
            className="block"
            style={{ fontSize: "clamp(3rem, 10vw, 8rem)" }}
          >
            Tigers Head
          </span>
        </h1>
        <div className="flex flex-wrap gap-4 justify-center">
          <a
            href="#"
            className="bg-[#C9A227] text-black text-sm font-bold tracking-[0.25em] uppercase px-10 py-4 hover:bg-[#b08c1e] transition-colors"
          >
            Book a Table →
          </a>
          <a
            href="#"
            className="border border-white/60 text-white text-sm font-bold tracking-[0.25em] uppercase px-10 py-4 hover:border-[#C9A227] hover:text-[#C9A227] transition-colors"
          >
            View Menu
          </a>
        </div>
      </div>

      <style>{`
        @keyframes ticker {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
