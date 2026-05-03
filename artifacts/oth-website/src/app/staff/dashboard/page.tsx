"use client";

import Link from "next/link";
import { AlertCircle, Calendar, Utensils, Settings, LayoutDashboard, Megaphone, Users, Image as ImageIcon } from "lucide-react";

export default function StaffDashboard() {
  return (
    <main className="min-h-screen bg-navy text-white pt-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-16">
          <div>
            <h1 className="text-4xl md:text-6xl font-black uppercase text-gold">Dashboard</h1>
            <p className="text-white/40 uppercase tracking-widest text-xs font-bold mt-2">Welcome back, Manager</p>
          </div>
          
          <Link
            href="/staff/notice"
            className="flex items-center gap-3 bg-red-600 text-white font-black px-8 py-4 uppercase tracking-widest hover:bg-white hover:text-red-600 transition-all shadow-xl animate-pulse"
          >
            <AlertCircle size={24} />
            Emergency Notice
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <DashboardCard
            href="/staff/events"
            icon={<Calendar size={32} />}
            title="What's On"
            description="Manage events and scrolling strip"
          />
          <DashboardCard
            href="/staff/menu"
            icon={<Utensils size={32} />}
            title="Menu Manager"
            description="Excel upload and manual edits"
          />
          <DashboardCard
            href="/staff/news"
            icon={<Megaphone size={32} />}
            title="Pub News"
            description="Blog and announcement banner"
          />
          <DashboardCard
            href="/staff/settings"
            icon={<Settings size={32} />}
            title="Site Settings"
            description="Feature flags and global toggles"
          />
          <DashboardCard
            href="/staff/team"
            icon={<Users size={32} />}
            title="Meet the Team"
            description="Manage staff profiles and roles"
          />
          <DashboardCard
            href="/staff/gallery"
            icon={<ImageIcon size={32} />}
            title="Gallery & Media"
            description="Manage R2 image storage"
          />
          <DashboardCard
            href="/staff/pages"
            icon={<LayoutDashboard size={32} />}
            title="Page Content"
            description="Edit text across the site"
          />
        </div>
      </div>
    </main>
  );
}

function DashboardCard({ href, icon, title, description }: { href: string; icon: React.ReactNode; title: string; description: string }) {
  return (
    <Link
      href={href}
      className="p-8 bg-white/5 border border-white/10 hover:border-gold group transition-all"
    >
      <div className="text-gold mb-6 group-hover:scale-110 transition-transform">{icon}</div>
      <h3 className="text-xl font-black uppercase mb-2">{title}</h3>
      <p className="text-sm text-white/40 leading-relaxed">{description}</p>
    </Link>
  );
}
