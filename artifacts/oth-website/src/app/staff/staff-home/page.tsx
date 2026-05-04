"use client";

import Link from "next/link";
import { Sparkles, Megaphone, MessageSquare, Clock, Leaf, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export default function StaffHome() {
  const router = useRouter();
  const signOut = () => {
    if (typeof window !== "undefined") sessionStorage.clear();
    router.push("/staff");
  };

  return (
    <main className="min-h-screen bg-navy text-white pt-28 px-6 pb-20">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-start mb-12">
          <div>
            <h1 className="text-4xl font-black uppercase text-gold sc">Staff Area</h1>
            <p className="text-white/30 text-xs uppercase tracking-widest font-bold mt-2">The Old Tigers Head</p>
          </div>
          <button onClick={signOut} className="flex items-center gap-2 text-white/30 hover:text-white text-xs font-bold uppercase tracking-widest transition-colors">
            <LogOut size={14} /> Sign Out
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <StaffCard href="/staff/content" icon={<Sparkles size={28} />} title="Content Creator" desc="AI-powered social media captions" highlight />
          <StaffCard href="/staff/noticeboard" icon={<Megaphone size={28} />} title="Noticeboard" desc="Notices and updates from Rob" />
          <StaffCard href="/staff/feedback" icon={<MessageSquare size={28} />} title="Feedback" desc="Share ideas or concerns" />
          <StaffCard href="/staff/rota" icon={<Clock size={28} />} title="Staff Rota" desc="View the current schedule" />
          <StaffCard href="/staff/allergens" icon={<Leaf size={28} />} title="Allergen Guide" desc="Dish-by-dish allergen reference" />
        </div>
      </div>
    </main>
  );
}

function StaffCard({ href, icon, title, desc, highlight }: { href:string; icon:React.ReactNode; title:string; desc:string; highlight?:boolean }) {
  return (
    <Link href={href} className={`p-7 border transition-all group ${highlight ? "border-gold/30 bg-gold/5 hover:border-gold" : "border-white/10 hover:border-gold"}`}>
      <div className="text-gold mb-5 group-hover:scale-110 transition-transform">{icon}</div>
      <h3 className="font-black uppercase text-white text-sm tracking-wider sc mb-1">{title}</h3>
      <p className="text-white/30 text-xs uppercase tracking-widest">{desc}</p>
    </Link>
  );
}
