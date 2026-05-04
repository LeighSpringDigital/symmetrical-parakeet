"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Instagram, Facebook } from "lucide-react";

const LEFT = [
  { label: "Menu", href: "/menu" },
  { label: "Events", href: "/events" },
  { label: "Parties", href: "/parties" },
];
const RIGHT = [
  { label: "About", href: "/our-pub" },
  { label: "Join", href: "/community" },
  { label: "Contact", href: "/find-us" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    fn();
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const navBg = scrolled ? "bg-navy shadow-lg" : "bg-navy/60 backdrop-blur-sm";
  const linkCls = "sc-nav text-xs font-black text-white hover:text-gold transition-colors whitespace-nowrap";

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBg}`} style={{height:"68px"}}>
        <div className="relative h-full flex items-center px-6 md:px-10 max-w-[1600px] mx-auto">

          {/* Absolutely centred pub name */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-auto">
            <Link href="/" className="block leading-tight">
              <span className="block text-[8px] font-black tracking-[0.5em] text-gold uppercase">The Old</span>
              <span className="block font-black text-gold uppercase tracking-[0.2em]" style={{fontSize:"clamp(0.75rem,1.5vw,1rem)", fontVariant:"small-caps", letterSpacing:"0.2em"}}>
                Tigers Head
              </span>
            </Link>
          </div>

          {/* Desktop left */}
          <div className="hidden lg:flex items-center gap-8 flex-1">
            {LEFT.map(l => <Link key={l.label} href={l.href} className={linkCls}>{l.label}</Link>)}
          </div>

          {/* Desktop right */}
          <div className="hidden lg:flex items-center gap-7 flex-1 justify-end">
            {RIGHT.map(l => <Link key={l.label} href={l.href} className={linkCls}>{l.label}</Link>)}
            <div className="flex items-center gap-3 ml-2">
              <a href="https://www.instagram.com/theoldtigershead" target="_blank" rel="noopener noreferrer"
                className="text-white/50 hover:text-gold transition-colors" aria-label="Instagram">
                <Instagram size={16} />
              </a>
              <a href="https://www.facebook.com/theoldtigershead" target="_blank" rel="noopener noreferrer"
                className="text-white/50 hover:text-gold transition-colors" aria-label="Facebook">
                <Facebook size={16} />
              </a>
            </div>
            <Link href="/book"
              className="ml-3 bg-gold text-navy px-5 py-2 font-black text-xs tracking-[0.2em] uppercase hover:bg-white transition-colors sc-nav">
              Book
            </Link>
          </div>

          {/* Mobile */}
          <div className="lg:hidden flex items-center justify-between w-full">
            <Link href="/" className="leading-tight">
              <span className="block text-[7px] font-black tracking-[0.4em] text-gold uppercase">The Old</span>
              <span className="block text-xs font-black tracking-[0.15em] text-gold uppercase">Tigers Head</span>
            </Link>
            <div className="flex items-center gap-3">
              <Link href="/book" className="bg-gold text-navy px-4 py-1.5 font-black text-xs tracking-widest uppercase">Book</Link>
              <button onClick={() => setMobileOpen(true)} className="text-white p-1.5" aria-label="Open menu">
                <Menu size={22} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile overlay */}
      <div className={`fixed inset-0 z-[60] bg-navy flex flex-col transition-transform duration-400 ${mobileOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex justify-between items-center p-6 border-b border-white/10">
          <Link href="/" onClick={() => setMobileOpen(false)} className="leading-tight">
            <span className="block text-[8px] font-black tracking-[0.4em] text-gold uppercase">The Old</span>
            <span className="block text-sm font-black tracking-[0.15em] text-gold uppercase">Tigers Head</span>
          </Link>
          <button onClick={() => setMobileOpen(false)} className="text-white/60 hover:text-white p-1" aria-label="Close">
            <X size={26} />
          </button>
        </div>
        <div className="flex flex-col flex-1 justify-center gap-6 px-8 text-center">
          {[...LEFT, ...RIGHT].map(l => (
            <Link key={l.label} href={l.href} onClick={() => setMobileOpen(false)}
              className="text-3xl font-black text-white uppercase hover:text-gold transition-colors sc">
              {l.label}
            </Link>
          ))}
          <Link href="/book" onClick={() => setMobileOpen(false)}
            className="mt-4 bg-gold text-navy py-4 font-black text-xl uppercase tracking-widest hover:bg-white transition-colors sc">
            Book a Table
          </Link>
          <div className="flex justify-center gap-6 mt-4">
            <a href="https://www.instagram.com/theoldtigershead" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-gold transition-colors">
              <Instagram size={22} />
            </a>
            <a href="https://www.facebook.com/theoldtigershead" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-gold transition-colors">
              <Facebook size={22} />
            </a>
          </div>
        </div>
        <div className="p-6 text-center border-t border-white/10">
          <Link href="/staff" onClick={() => setMobileOpen(false)} className="text-[10px] text-white/15 uppercase tracking-widest font-bold">Staff Portal</Link>
        </div>
      </div>
    </>
  );
}
