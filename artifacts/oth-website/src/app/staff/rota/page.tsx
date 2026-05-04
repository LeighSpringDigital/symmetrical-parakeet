import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function Rota() {
  return (
    <main className="min-h-screen bg-navy text-white pt-24 px-6 pb-20">
      <div className="max-w-4xl mx-auto">
        <Link href="/staff/dashboard" className="flex items-center gap-2 text-white/30 hover:text-white text-xs uppercase tracking-widest font-bold mb-10 transition-colors">
          <ArrowLeft size={14} /> Dashboard
        </Link>
        <h1 className="text-4xl font-black uppercase text-gold mb-4 sc">Staff Rota</h1>
        <p className="text-white/50 mb-10 text-sm">The current week's rota. For changes, speak to Rob directly.</p>
        <div className="border border-white/10 p-12 text-center">
          <p className="text-white/30 text-sm uppercase tracking-widest font-bold mb-4">Rota management coming soon</p>
          <p className="text-white/20 text-xs">Rob will be able to upload and manage the weekly rota from here.</p>
        </div>
      </div>
    </main>
  );
}
