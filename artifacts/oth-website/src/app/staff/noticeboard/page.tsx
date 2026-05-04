"use client";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const NOTICES = [
  { date: "4 May 2026", author: "Rob", text: "Saturday BBQs starting this weekend. Garden team to be briefed by 12pm Friday. All hands on deck from 1pm." },
  { date: "1 May 2026", author: "Rob", text: "New menu items live from Monday. Please read the full menu update on the Menu Manager page before your next shift." },
  { date: "28 Apr 2026", author: "Rob", text: "Reminder: Tiger Club members should be greeted by name and their preferred drink offered. Check the members list on the dashboard." },
];

export default function Noticeboard() {
  return (
    <main className="min-h-screen bg-navy text-white pt-24 px-6 pb-20">
      <div className="max-w-3xl mx-auto">
        <Link href="/staff/dashboard" className="flex items-center gap-2 text-white/30 hover:text-white text-xs uppercase tracking-widest font-bold mb-10 transition-colors">
          <ArrowLeft size={14} /> Dashboard
        </Link>
        <h1 className="text-4xl font-black uppercase text-gold mb-12 sc">Noticeboard</h1>
        <div className="space-y-6">
          {NOTICES.map((n, i) => (
            <div key={i} className="border border-white/10 p-6 hover:border-gold transition-colors">
              <div className="flex justify-between items-center mb-3">
                <p className="text-gold text-xs font-bold uppercase tracking-widest">{n.date}</p>
                <p className="text-white/30 text-xs uppercase tracking-widest">{n.author}</p>
              </div>
              <p className="text-white/70 leading-relaxed">{n.text}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
