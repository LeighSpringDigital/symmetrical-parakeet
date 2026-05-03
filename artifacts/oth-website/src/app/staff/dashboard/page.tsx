"use client";

import Link from "next/link";
import { AlertCircle, Calendar, Utensils, Settings, LayoutDashboard, Megaphone, Users, Image as ImageIcon } from "lucide-react";

export default function StaffDashboard() {
  return (
    <main className="min-h-screen bg-navy text-white pt-32 px-6">
      <div className="max-w-6xl mx-auto">

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-12">
          <div>
            <h1 className="text-4xl md:text-6xl font-black uppercase text-gold" style={{ fontVariant: "small-caps" }}>
              Dashboard
            </h1>
            <p className="text-white/40 uppercase tracking-widest text-xs font-bold mt-2">
              Welcome back
            </p>
          </div>

          {/* Emergency Notice — no pulse, plain red */}
          <Link
            href="/staff/notice"
            className="flex items-center gap-3 bg-red-600 text-white font-black px-8 py-4 uppercase tracking-widest hover:bg-white hover:text-red-600 transition-all shadow-xl"
          >
            <AlertCircle size={24} />
            Emergency Notice
          </Link>
        </div>

        {/* Site Settings first — most frequently used toggle */}
        <div className="mb-6">
          <Link
            href="/staff/settings"
            className="flex items-center gap-6 p-6 bg-gold/10 border border-gold/30 hover:border-gold group transition-all w-full"
          >
            <div className="text-gold group-hover:scale-110 transition-transform">
              <Settings size={28} />
            </div>
            <div>
              <h3 className="text-lg font-black uppercase text-gold tracking-widest" style={{ fontVariant: "small-caps" }}>
                Site Settings
              </h3>
              <p className="text-white/40 text-xs uppercase tracking-widest font-bold mt-1">
                Feature flags and global toggles
              </p>
            </div>
          </Link>
        </div>

        {/* Other sections grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
            description="Edit dishes, prices, and availability"
          />
          <DashboardCard
            href="/staff/news"
            icon={<Megaphone size={32} />}
            title="Pub News"
            description="Blog posts and announcement banner"
          />
          <DashboardCard
            href="/staff/team"
            icon={<Users size={32} />}
            title="Meet the Team"
            description="Staff profiles and roles"
          />
          <DashboardCard
            href="/staff/gallery"
            icon={<ImageIcon size={32} />}
            title="Gallery & Media"
            description="Manage images and uploads"
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

function DashboardCard({
  href,
  icon,
  title,
  description,
}: {
  href: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <Link
      href={href}
      className="p-8 bg-white/5 border border-white/10 hover:border-gold group transition-all"
    >
      <div className="text-gold mb-6 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-lg font-black uppercase text-white mb-2 tracking-wider" style={{ fontVariant: "small-caps" }}>
        {title}
      </h3>
      <p className="text-white/40 text-xs uppercase tracking-widest font-bold">
        {description}
      </p>
    </Link>
  );
}
