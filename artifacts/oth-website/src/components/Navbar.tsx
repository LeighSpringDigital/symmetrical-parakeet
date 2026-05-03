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
  { label: "Menu", href: "/#menu" },
  { label: "What's On", href: "/#whats-on" },
  { label: "Book", href: "/#book" },
  { label: "Our Pub", href: "/our-pub" },
  { label: "Contact", href: "/#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500 h-[100px] flex items-center",
          scrolled ? "bg-navy/95 shadow-lg h-[80px]" : "bg-transparent"
        )}
      >
        <div className="w-full max-w-[1600px] mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Left: Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8 flex-1">
            {navLinks.slice(0, 2).map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-white hover:text-gold transition-colors text-xs font-bold tracking-widest uppercase"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Center: Logo */}
          <Link href="/" className="flex-shrink-0 px-8" onClick={() => window.scrollTo(0,0)}>
            <img
              src="/TigerLogo_transparent.png?v=3"
              alt="The Old Tiger's Head"
              className={cn(
                "transition-all duration-500 object-contain",
                scrolled ? "h-[60px]" : "h-[80px]"
              )}
            />
          </Link>

          {/* Right: Desktop Nav + Book Button */}
          <div className="hidden lg:flex items-center gap-8 flex-1 justify-end">
            <Link
              href="/#book"
              className="text-white hover:text-gold transition-colors text-xs font-bold tracking-widest uppercase"
            >
              Book
            </Link>
            {navLinks.slice(3).map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-white hover:text-gold transition-colors text-xs font-bold tracking-widest uppercase"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/#book"
              className="bg-gold text-navy px-6 py-2.5 font-black text-xs tracking-widest uppercase hover:bg-white transition-colors ml-4"
            >
              Book a Table
            </Link>
          </div>

          {/* Mobile: Hamburger & Book Button (Always Visible) */}
          <div className="lg:hidden flex items-center gap-4">
            <Link
              href="/#book"
              className="bg-gold text-navy px-4 py-2 font-black text-[10px] tracking-widest uppercase"
            >
              Book
            </Link>
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="text-white p-2"
              aria-label="Open menu"
            >
              <Menu size={28} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          "fixed inset-0 z-[60] bg-navy transition-transform duration-500 flex flex-col p-8",
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <button
          onClick={() => setMobileMenuOpen(false)}
          className="self-end text-white p-2 mb-8"
        >
          <X size={32} />
        </button>
        <div className="flex flex-col gap-8 text-center pt-10">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-4xl font-black text-white uppercase tracking-[0.2em] hover:text-gold transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/staff"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm font-bold text-white/30 uppercase tracking-widest mt-20"
          >
            Staff Portal
          </Link>
        </div>
      </div>
    </>
  );
}
