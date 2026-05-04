"use client";
import Link from "next/link";
import { AlertCircle, Calendar, Utensils, Settings, Megaphone, MessageSquare, Clock, Leaf, Sparkles } from "lucide-react";

export default function StaffDashboard() {
  return (
    <main className="min-h-screen bg-navy text-white pt-28 px-6 pb-20">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <h1 className="text-4xl md:text-5xl font-black uppercase text-gold sc">Dashboard</h1>
            <p className="text-white/30 uppercase tracking-widest text-xs font-bold mt-2">Staff Portal — The Old Tigers Head</p>
          </div>
          <Link href="/staff/notice"
            className="flex items-center gap-3 bg-red-600 text-white font-black px-8 py-4 uppercase tracking-widest hover:bg-white hover:text-red-600 transition-all">
            <AlertCircle size={20} /> Emergency Notice
          </Link>
        </div>

        {/* Site Settings — top */}
        <Link href="/staff/settings"
          className="flex items-center gap-6 p-5 bg-gold/10 border border-gold/30 hover:border-gold transition-all w-full mb-6 group">
          <Settings size={24} className="text-gold group-hover:rotate-45 transition-transform duration-300" />
          <div>
            <h3 className="font-black uppercase text-gold tracking-widest text-sm sc">Site Settings</h3>
            <p className="text-white/30 text-xs uppercase tracking-widest mt-0.5">Feature flags and global toggles</p>
          </div>
        </Link>

        {/* Main grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <Card href="/staff/content" icon={<Sparkles size={28} />} title="Content Creator" desc="AI-powered captions and post ideas" highlight />
          <Card href="/staff/events" icon={<Calendar size={28} />} title="Events" desc="Manage What's On listings" />
          <Card href="/staff/menu" icon={<Utensils size={28} />} title="Menu Manager" desc="Edit dishes, prices, availability" />
          <Card href="/staff/noticeboard" icon={<Megaphone size={28} />} title="Noticeboard" desc="Staff notices and updates from Rob" />
          <Card href="/staff/feedback" icon={<MessageSquare size={28} />} title="Feedback" desc="Share ideas or concerns with management" />
          <Card href="/staff/rota" icon={<Clock size={28} />} title="Staff Rota" desc="View the current week's schedule" />
          <Card href="/staff/allergens" icon={<Leaf size={28} />} title="Allergen Guide" desc="Dish-by-dish allergen reference" />
        </div>
      </div>
    </main>
  );
}

function Card({ href, icon, title, desc, highlight }: { href: string; icon: React.ReactNode; title: string; desc: string; highlight?: boolean }) {
  return (
    <Link href={href}
      className={`p-7 border transition-all group ${highlight ? "border-gold/30 bg-gold/5 hover:border-gold" : "border-white/10 hover:border-gold"}`}>
      <div className={`mb-5 group-hover:scale-110 transition-transform ${highlight ? "text-gold" : "text-gold"}`}>{icon}</div>
      <h3 className="font-black uppercase text-white text-sm tracking-wider sc mb-1">{title}</h3>
      <p className="text-white/30 text-xs uppercase tracking-widest">{desc}</p>
    </Link>
  );
}
