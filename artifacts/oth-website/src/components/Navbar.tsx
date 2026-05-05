"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Instagram, Facebook } from "lucide-react";
import { SmallCaps } from "@/lib/smallCaps";

const NAV_LINKS = [
  { label: "Menu", href: "/menu" },
  { label: "Events", href: "/events" },
  { label: "Parties", href: "/parties" },
  { label: "About", href: "/our-pub" },
  { label: "Join", href: "/community" },
  { label: "Contact", href: "/find-us" },
];

function Logo() {
  return (
    <Link href="/" className="flex-shrink-0 leading-none">
      <span className="block font-black text-gold" style={{ fontSize: "1.15rem", letterSpacing: "0.16em" }}>
        <SmallCaps>The Old Tiger&apos;s Head</SmallCaps>
      </span>
    </Link>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    fn();
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-navy shadow-lg" : "bg-navy/70 backdrop-blur-sm"
        }`}
        style={{ height: "68px" }}
      >
        <div className="h-full flex items-center px-5 md:px-10 max-w-[1600px] mx-auto gap-6">

          {/* Logo — single instance, always visible */}
          <Logo />

          {/* DESKTOP nav links — centre */}
          <div className="hidden lg:flex items-center gap-7 flex-1 justify-center">
            {NAV_LINKS.map(l => (
              <Link
                key={l.label}
                href={l.href}
                className="text-xs font-black text-white hover:text-gold transition-colors whitespace-nowrap uppercase tracking-[0.2em]"
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* DESKTOP right — social + book */}
          <div className="hidden lg:flex items-center gap-4 flex-shrink-0">
            <a href="https://www.instagram.com/theoldtigershead" target="_blank" rel="noopener noreferrer"
              className="text-white/50 hover:text-gold transition-colors" aria-label="Instagram">
              <Instagram size={17} />
            </a>
            <a href="https://www.facebook.com/theoldtigershead" target="_blank" rel="noopener noreferrer"
              className="text-white/50 hover:text-gold transition-colors" aria-label="Facebook">
              <Facebook size={17} />
            </a>
            <Link href="/book"
              className="ml-1 bg-gold text-navy px-6 py-2 font-black text-xs tracking-[0.2em] uppercase hover:bg-white transition-colors">
              Book
            </Link>
          </div>

          {/* MOBILE right — book + hamburger */}
          <div className="lg:hidden flex items-center gap-3 ml-auto flex-shrink-0">
            <Link href="/book" className="bg-gold text-navy px-4 py-2 font-black text-xs tracking-widest uppercase">Book</Link>
            <button onClick={() => setMobileOpen(true)} className="text-white p-1.5" aria-label="Open menu">
              <Menu size={22} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile full-screen overlay */}
      <div className={`fixed inset-0 z-[60] bg-navy flex flex-col transition-transform duration-300 ${mobileOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex justify-between items-center p-6 border-b border-white/10">
          <Logo />
          <button onClick={() => setMobileOpen(false)} className="text-white/60 hover:text-white p-1">
            <X size={26} />
          </button>
        </div>
        <div className="flex flex-col flex-1 justify-center gap-7 px-8 text-center">
          {NAV_LINKS.map(l => (
            <Link key={l.label} href={l.href} onClick={() => setMobileOpen(false)}
              className="text-3xl font-black text-white uppercase hover:text-gold transition-colors tracking-[0.12em]">
              <SmallCaps>{l.label}</SmallCaps>
            </Link>
          ))}
          <Link href="/book" onClick={() => setMobileOpen(false)}
            className="mt-4 bg-gold text-navy py-4 font-black text-xl uppercase tracking-widest hover:bg-white transition-colors">
            <SmallCaps>Book A Table</SmallCaps>
          </Link>
          <div className="flex justify-center gap-6 mt-2">
            <a href="https://www.instagram.com/theoldtigershead" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-gold transition-colors"><Instagram size={22} /></a>
            <a href="https://www.facebook.com/theoldtigershead" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-gold transition-colors"><Facebook size={22} /></a>
          </div>
        </div>
        <div className="p-6 text-center border-t border-white/10">
          <Link href="/staff" onClick={() => setMobileOpen(false)} className="text-[10px] text-white/15 uppercase tracking-widest font-bold">Staff Portal</Link>
        </div>
      </div>
    </>
  );
}
