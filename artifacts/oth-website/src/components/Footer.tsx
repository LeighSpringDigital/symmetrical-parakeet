import Link from "next/link";
import { Instagram, Facebook } from "lucide-react";
import { SmallCaps } from "@/lib/smallCaps";

export default function Footer() {
  return (
    <footer className="bg-navy border-t border-white/10">
      <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-4 gap-10">

        {/* Brand */}
        <div className="md:col-span-1">
          <Link href="/" className="block mb-3 leading-none">
            <span className="block font-black text-gold" style={{fontSize:"1.05rem", letterSpacing:"0.16em"}}>
              <SmallCaps>The Old Tiger&apos;s Head</SmallCaps>
            </span>
          </Link>
          <p className="text-white/30 text-xs italic mb-4 leading-relaxed">
            At the epicentre of Lee Green since 1750.
          </p>
          <p className="text-white/40 text-sm">351 Lee High Road<br />London SE12 8RU</p>
          <div className="flex gap-4 mt-4">
            <a href="https://www.instagram.com/theoldtigershead" target="_blank" rel="noopener noreferrer"
              className="text-white/30 hover:text-gold transition-colors" aria-label="Instagram">
              <Instagram size={18} />
            </a>
            <a href="https://www.facebook.com/theoldtigershead" target="_blank" rel="noopener noreferrer"
              className="text-white/30 hover:text-gold transition-colors" aria-label="Facebook">
              <Facebook size={18} />
            </a>
          </div>
        </div>

        {/* Hours */}
        <div>
          <h3 className="text-gold text-xs font-black tracking-widest uppercase mb-4">Visit</h3>
          <div className="text-white/40 text-sm space-y-1.5">
            <p>Mon–Thu: 12:00–23:00</p>
            <p>Fri–Sat: 12:00–00:00</p>
            <p>Sunday: 12:00–22:00</p>
            <p className="text-white/20 text-xs mt-3">Kitchen closes 21:00</p>
          </div>
        </div>

        {/* Nav */}
        <div>
          <h3 className="text-gold text-xs font-black tracking-widest uppercase mb-4">Explore</h3>
          <div className="space-y-2">
            {[
              { label: "Menu", href: "/menu" },
              { label: "Events", href: "/events" },
              { label: "Parties", href: "/parties" },
              { label: "About", href: "/our-pub" },
              { label: "Tiger Club", href: "/community" },
              { label: "FAQ", href: "/faq" },
            ].map(({ label, href }) => (
              <Link key={href} href={href} className="block text-white/40 text-sm hover:text-gold transition-colors">{label}</Link>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-gold text-xs font-black tracking-widest uppercase mb-4">Get In Touch</h3>
          <div className="space-y-2 text-sm mb-6">
            <a href="tel:02045680111" className="block text-white/40 hover:text-gold transition-colors">020 4568 0111</a>
            <a href="mailto:enquiries@theoldtigershead.com" className="block text-white/40 hover:text-gold transition-colors text-xs break-all">enquiries@theoldtigershead.com</a>
          </div>
          <Link href="/contact" className="inline-block bg-gold text-navy font-black text-xs tracking-widest px-6 py-3 uppercase hover:bg-white transition-colors">
            Make An Enquiry
          </Link>
        </div>
      </div>

      <div className="border-t border-white/10 py-6">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-3 text-white/20 text-[10px] uppercase tracking-widest font-bold">
          <p>© 2026 The Old Tiger&apos;s Head · 351 Lee High Road · London SE12 8RU</p>
          <Link href="/staff" className="hover:text-white/40 transition-colors">Staff Portal</Link>
        </div>
      </div>
    </footer>
  );
}
