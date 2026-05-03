"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const navLinks = [
  { label: "Menu", href: "/menu" },
  { label: "What's On", href: "/#whats-on" },
  { label: "Private Hire", href: "/private-hire" },
  { label: "Our Pub", href: "/our-pub" },
  { label: "Community", href: "/community" },
  { label: "Find Us", href: "/find-us" },
];

export default function Navbar({ lightBackground = false }: { lightBackground?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const onLight = lightBackground && !scrolled;

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500 flex items-center",
          scrolled ? "bg-navy/97 shadow-lg h-[72px]" : "bg-transparent h-[96px]"
        )}
      >
        <div className="w-full max-w-[1600px] mx-auto px-6 md:px-12 flex items-center justify-between gap-6">

          {/* Left: first 3 nav links */}
          <div className="hidden lg:flex items-center gap-8 flex-1">
            {navLinks.slice(0, 3).map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={cn(
                  "text-sm font-black tracking-[0.18em] uppercase transition-colors whitespace-nowrap",
                  onLight ? "text-navy hover:text-gold" : "text-white hover:text-gold"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Centre: pub name — hidden until scrolled on desktop, always on mobile */}
          <div className="flex-shrink-0 px-4 text-center">
            <Link href="/" onClick={() => { if (typeof window !== "undefined") window.scrollTo(0, 0); }}>
              <div className={cn("transition-all duration-500 leading-none select-none hidden lg:block",
                scrolled ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"
              )}>
                <div className="text-[10px] font-black tracking-[0.4em] uppercase text-gold" style={{ fontVariant: "small-caps" }}>
                  The Old
                </div>
                <div className="text-xl font-black tracking-[0.15em] uppercase text-white" style={{ fontVariant: "small-caps" }}>
                  Tigers Head
                </div>
              </div>
              {/* Mobile always visible */}
              <div className="lg:hidden leading-none">
                <div className="text-[9px] font-black tracking-[0.35em] uppercase text-gold" style={{ fontVariant: "small-caps" }}>
                  The Old
                </div>
                <div className="text-base font-black tracking-[0.12em] uppercase text-white" style={{ fontVariant: "small-caps" }}>
                  Tigers Head
                </div>
              </div>
            </Link>
          </div>

          {/* Right: last 3 nav links + Book CTA */}
          <div className="hidden lg:flex items-center gap-8 flex-1 justify-end">
            {navLinks.slice(3).map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={cn(
                  "text-sm font-black tracking-[0.18em] uppercase transition-colors whitespace-nowrap",
                  onLight ? "text-navy hover:text-gold" : "text-white hover:text-gold"
                )}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/#book"
              className="bg-gold text-navy px-6 py-2.5 font-black text-sm tracking-[0.18em] uppercase hover:bg-white transition-colors ml-2 whitespace-nowrap"
            >
              Book
            </Link>
          </div>

          {/* Mobile: Book + Hamburger */}
          <div className="lg:hidden flex items-center gap-3">
            <Link href="/#book" className="bg-gold text-navy px-4 py-2 font-black text-xs tracking-widest uppercase">
              Book
            </Link>
            <button
              onClick={() => setMobileMenuOpen(true)}
              className={cn("p-2 transition-colors", onLight ? "text-navy" : "text-white")}
              aria-label="Open menu"
            >
              <Menu size={28} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile overlay */}
      <div className={cn(
        "fixed inset-0 z-[60] bg-navy transition-transform duration-500 flex flex-col p-8",
        mobileMenuOpen ? "translate-x-0" : "translate-x-full"
      )}>
        <button onClick={() => setMobileMenuOpen(false)} className="self-end text-white p-2 mb-8" aria-label="Close menu">
          <X size={32} />
        </button>
        <div className="flex flex-col gap-8 text-center pt-6">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-4xl font-black text-white uppercase tracking-[0.15em] hover:text-gold transition-colors"
              style={{ fontVariant: "small-caps" }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/#book"
            onClick={() => setMobileMenuOpen(false)}
            className="mt-4 bg-gold text-navy py-4 font-black text-2xl uppercase tracking-widest hover:bg-white transition-colors"
          >
            Book a Table
          </Link>
          <Link href="/staff" onClick={() => setMobileMenuOpen(false)} className="text-xs font-bold text-white/20 uppercase tracking-widest mt-12">
            Staff Portal
          </Link>
        </div>
      </div>
    </>
  );
}
