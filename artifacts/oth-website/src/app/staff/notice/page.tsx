"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, Save, AlertTriangle, PowerOff, Power } from "lucide-react";
import { clsx } from "clsx";
import { updateEmergencyNotice } from "@/app/actions";

export default function EmergencyNoticeManager() {
  const [active, setActive] = useState(false);
  const [message, setMessage] = useState("We are currently closed due to unforeseen circumstances.");
  const [expiry, setExpiry] = useState("");
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateEmergencyNotice({ active, message, expiry });
      alert("Emergency settings updated");
    } catch (e) {
      console.error(e);
      alert("Failed to update emergency notice");
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
            className="flex items-center gap-2 bg-red-600 text-white font-black px-8 py-3 uppercase tracking-widest hover:bg-white hover:text-red-600 transition-all"
          >
            <Save size={20} /> {saving ? "Updating..." : "Update Banner"}
          </button>
        </div>

        <div className="bg-red-600/10 border-2 border-red-600 p-8 md:p-12 text-center">
          <AlertTriangle className="text-red-600 mx-auto mb-6" size={64} />
          <h1 className="text-4xl md:text-6xl font-black uppercase text-white mb-4">Emergency System</h1>
          <p className="text-white/60 uppercase tracking-widest text-xs font-bold mb-12">Instant site-wide alert override</p>

          <div className="grid gap-8 text-left max-w-2xl mx-auto">
            <div className="flex items-center justify-between p-6 bg-red-600/20 border border-red-600/30">
              <div>
                <h3 className="text-xl font-black uppercase mb-1">System Status</h3>
                <p className="text-xs text-white/40 uppercase tracking-widest">Activate full-width red banner</p>
              </div>
              <button
                onClick={() => setActive(!active)}
                className={clsx(
                  "flex items-center gap-3 px-8 py-4 font-black uppercase tracking-widest border-2 transition-all",
                  active 
                    ? "bg-red-600 border-red-600 text-white shadow-[0_0_20px_rgba(220,38,38,0.5)]" 
                    : "bg-transparent border-white/20 text-white/20"
                )}
              >
                {active ? <Power size={20} /> : <PowerOff size={20} />}
                {active ? "Active" : "Inactive"}
              </button>
            </div>

            <div className="space-y-4">
              <label className="block text-[10px] font-bold uppercase tracking-widest text-white/40">Alert Message</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                className="w-full bg-navy border border-red-600/30 p-6 text-white focus:border-red-600 outline-none transition-colors"
                placeholder="Type the emergency notice here..."
              />
            </div>

            <div className="space-y-4">
              <label className="block text-[10px] font-bold uppercase tracking-widest text-white/40">Expiry Date & Time (Optional)</label>
              <input
                type="datetime-local"
                value={expiry}
                onChange={(e) => setExpiry(e.target.value)}
                className="w-full bg-navy border border-red-600/30 p-6 text-white focus:border-red-600 outline-none transition-colors"
                style={{ colorScheme: 'dark' }}
              />
              <p className="text-[10px] text-white/30 italic">Banner will automatically deactivate after this time.</p>
            </div>
          </div>
        </div>

        {active && (
          <div className="mt-12 p-8 border border-red-600/30 bg-red-600/5">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-red-600 mb-4">Live Preview</h4>
            <div className="bg-red-600 text-white text-center py-4 px-6 font-black uppercase tracking-widest text-sm animate-pulse">
              {message}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
