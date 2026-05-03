"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, Save, Power } from "lucide-react";
import { clsx } from "clsx";
import { updateSiteSettings } from "@/app/actions";

const INITIAL_FLAGS = {
  loyaltyScheme: false,
  onlineBooking: true,
  pubNews: true,
  whatsOn: true,
  lunchMenu: true,
  sundayMenu: true,
  kidsMenu: true,
  jobVacancies: false,
  giftVouchers: false,
  privateHire: true,
  promotionalBanners: false,
};

export default function SiteSettings() {
  const [flags, setFlags] = useState(INITIAL_FLAGS);
  const [saving, setSaving] = useState(false);

  const toggleFlag = (key: keyof typeof INITIAL_FLAGS) => {
    setFlags((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateSiteSettings(flags);
      alert("Settings saved successfully");
    } catch (e) {
      console.error(e);
      alert("Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="min-h-screen bg-navy text-white pt-32 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <Link href="/staff/dashboard" className="flex items-center gap-2 text-gold hover:text-white transition-colors uppercase text-xs font-bold tracking-widest">
            <ChevronLeft size={20} /> Dashboard
          </Link>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 bg-gold text-navy font-black px-8 py-3 uppercase tracking-widest hover:bg-white transition-all disabled:opacity-50"
          >
            <Save size={20} /> {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>

        <h1 className="text-4xl md:text-6xl font-black uppercase text-gold mb-4">Site Settings</h1>
        <p className="text-white/40 uppercase tracking-widest text-xs font-bold mb-12">Control global feature flags and visibility</p>

        <div className="grid gap-4">
          {Object.entries(flags).map(([key, value]) => (
            <div
              key={key}
              className="flex items-center justify-between p-8 bg-white/5 border border-white/10"
            >
              <div>
                <h3 className="text-lg font-black uppercase mb-1">{key.replace(/([A-Z])/g, ' $1').trim()}</h3>
                <p className="text-xs text-white/40 uppercase tracking-widest">Toggle visibility on public site</p>
              </div>
              
              <button
                onClick={() => toggleFlag(key as keyof typeof INITIAL_FLAGS)}
                className={clsx(
                  "flex items-center gap-3 px-6 py-3 font-black uppercase tracking-widest border-2 transition-all",
                  value 
                    ? "bg-gold border-gold text-navy" 
                    : "bg-transparent border-white/10 text-white/40"
                )}
              >
                <Power size={18} />
                {value ? "On" : "Off"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
