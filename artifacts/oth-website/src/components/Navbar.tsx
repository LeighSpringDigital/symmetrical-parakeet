"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const LEFT_LINKS = [
  { label: "Menu", href: "/menu" },
  { label: "Events", href: "/events" },
  { label: "Parties", href: "/private-hire" },
];
const RIGHT_LINKS = [
  { label: "About", href: "/our-pub" },
  { label: "Community", href: "/community" },
  { label: "Contact", href: "/find-us" },
];

export default function Navbar({ lightBackground = false }: { lightBackground?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onLight = lightBackground && !scrolled;
  const linkClass = `text-sm font-black tracking-[0.18em] uppercase transition-colors whitespace-nowrap ${
    onLight ? "text-navy hover:text-gold" : "text-white hover:text-gold"
  }`;

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 flex items-center ${
        scrolled ? "bg-navy/97 shadow-lg h-[68px]" : "bg-transparent h-[88px]"
      }`}>
        <div className="w-full max-w-[1600px] mx-auto px-6 md:px-10 flex items-center justify-between">

          {/* ── DESKTOP ── */}
          <div className="hidden lg:flex items-center justify-between w-full">

            {/* Left links — always visible */}
            <div className="flex items-center gap-8">
              {LEFT_LINKS.map(l => (
                <Link key={l.label} href={l.href} className={linkClass}>{l.label}</Link>
              ))}
            </div>

            {/* Centre: title — top-left on mobile, centre on desktop */}
            {/* On desktop: hidden until scroll, then fades in */}
            <div className={`transition-all duration-500 text-center ${
              scrolled ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1 pointer-events-none"
            }`}>
              <Link href="/" className="leading-none block">
                <span className="block text-[9px] font-black tracking-[0.45em] uppercase text-gold" style={{fontVariant:"small-caps"}}>The Old</span>
                <span className="block text-lg font-black tracking-[0.18em] uppercase text-gold" style={{fontVariant:"small-caps"}}>Tigers Head</span>
              </Link>
            </div>

            {/* Right links + Book */}
            <div className="flex items-center gap-8">
              {RIGHT_LINKS.map(l => (
                <Link key={l.label} href={l.href} className={linkClass}>{l.label}</Link>
              ))}
              <Link href="/#book" className="bg-gold text-navy px-6 py-2.5 font-black text-sm tracking-[0.18em] uppercase hover:bg-white transition-colors ml-2">
                Book
              </Link>
            </div>
          </div>

          {/* ── MOBILE ── */}
          <div className="lg:hidden flex items-center justify-between w-full">
            {/* Title always visible top-left on mobile */}
            <Link href="/" className="leading-none">
              <span className="block text-[8px] font-black tracking-[0.4em] uppercase text-gold" style={{fontVariant:"small-caps"}}>The Old</span>
              <span className="block text-sm font-black tracking-[0.15em] uppercase text-gold" style={{fontVariant:"small-caps"}}>Tigers Head</span>
            </Link>
            <div className="flex items-center gap-3">
              <Link href="/#book" className="bg-gold text-navy px-4 py-2 font-black text-xs tracking-widest uppercase">Book</Link>
              <button onClick={() => setMobileOpen(true)} className="text-white p-2" aria-label="Open menu">
                <Menu size={26} />
              </button>
            </div>
          </div>

        </div>
      </nav>

      {/* Mobile overlay */}
      <div className={`fixed inset-0 z-[60] bg-navy flex flex-col p-8 transition-transform duration-500 ${
        mobileOpen ? "translate-x-0" : "translate-x-full"
      }`}>
        <button onClick={() => setMobileOpen(false)} className="self-end text-white p-2 mb-6" aria-label="Close">
          <X size={30} />
        </button>
        <div className="flex flex-col gap-7 text-center pt-4">
          {[...LEFT_LINKS, ...RIGHT_LINKS].map(l => (
            <Link key={l.label} href={l.href} onClick={() => setMobileOpen(false)}
              className="text-4xl font-black text-white uppercase tracking-[0.15em] hover:text-gold transition-colors"
              style={{fontVariant:"small-caps"}}>
              {l.label}
            </Link>
          ))}
          <Link href="/#book" onClick={() => setMobileOpen(false)}
            className="mt-4 bg-gold text-navy py-4 font-black text-2xl uppercase tracking-widest hover:bg-white transition-colors"
            style={{fontVariant:"small-caps"}}>
            Book a Table
          </Link>
          <Link href="/staff" onClick={() => setMobileOpen(false)} className="text-[10px] font-bold text-white/20 uppercase tracking-widest mt-8">
            Staff Portal
          </Link>
        </div>
      </div>
    </>
  );
}
