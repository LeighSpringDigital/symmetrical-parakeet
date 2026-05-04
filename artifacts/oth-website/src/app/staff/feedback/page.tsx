"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function Feedback() {
  const [form, setForm] = useState({ category: "Operations", message: "" });
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <main className="min-h-screen bg-navy text-white pt-24 px-6 pb-20">
      <div className="max-w-xl mx-auto">
        <Link href="/staff/dashboard" className="flex items-center gap-2 text-white/30 hover:text-white text-xs uppercase tracking-widest font-bold mb-10 transition-colors">
          <ArrowLeft size={14} /> Dashboard
        </Link>
        <h1 className="text-4xl font-black uppercase text-gold mb-4 sc">Feedback</h1>
        <p className="text-white/50 mb-10 text-sm leading-relaxed">
          Share feedback, ideas, or concerns with Rob. All submissions go directly to the management team.
        </p>
        {sent ? (
          <div className="text-center py-12 border border-white/10 p-8">
            <div className="text-gold text-3xl mb-4">✓</div>
            <p className="text-white font-black uppercase sc">Feedback received</p>
            <p className="text-white/40 text-sm mt-2">Rob will follow up if needed.</p>
          </div>
        ) : (
          <form onSubmit={submit} className="space-y-5">
            <div>
              <label className="block text-white/40 text-xs font-bold uppercase tracking-widest mb-2">Category</label>
              <select value={form.category} onChange={e => setForm(f => ({...f, category: e.target.value}))}
                className="w-full bg-white/5 border border-white/20 text-white px-4 py-3 focus:outline-none focus:border-gold text-sm">
                {["Operations","Menu & Kitchen","Customer Experience","Staffing","Safety","Other"].map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-white/40 text-xs font-bold uppercase tracking-widest mb-2">Your feedback</label>
              <textarea required rows={6} value={form.message} onChange={e => setForm(f => ({...f, message: e.target.value}))}
                placeholder="Share your thoughts..."
                className="w-full bg-white/5 border border-white/20 text-white px-4 py-3 focus:outline-none focus:border-gold text-sm resize-none" />
            </div>
            <button type="submit" className="w-full bg-gold text-navy font-black tracking-widest py-4 uppercase hover:bg-white transition-colors sc">
              Submit Feedback
            </button>
          </form>
        )}
      </div>
    </main>
  );
}
