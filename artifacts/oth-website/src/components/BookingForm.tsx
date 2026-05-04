"use client";

import { useState } from "react";

type FormType = "table" | "party";
const TIMES = ["12:00","12:30","13:00","13:30","14:00","14:30","15:00","15:30","16:00","16:30","17:00","17:30","18:00","18:30","19:00","19:30","20:00","20:30","21:00"];
const GUEST_COUNTS = ["1","2","3","4","5","6","7","8","9","10+"];

export default function BookingForm({ type = "table" }: { type?: FormType }) {
  const [form, setForm] = useState({ name:"", email:"", phone:"", date:"", time:"12:00", guests:"2", notes:"", occasion:"" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      // Formspree endpoint — replace xyzabc with Rob's real Formspree form ID
      // Sign up free at formspree.io, create a form, copy the ID
      const endpoint = type === "party"
        ? "https://formspree.io/f/xyzabc_party"
        : "https://formspree.io/f/xyzabc_table";

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({
          type: type === "party" ? "Party Enquiry" : "Table Booking",
          ...form,
        }),
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        setError("Something went wrong. Please call us on 020 4568 0111.");
      }
    } catch {
      setError("Something went wrong. Please call us on 020 4568 0111.");
    }
    setLoading(false);
  };

  const inp = "w-full bg-white/5 border border-white/20 text-white px-4 py-3 focus:outline-none focus:border-gold transition-colors text-sm placeholder:text-white/30";
  const lbl = "block text-white/50 text-xs font-bold uppercase tracking-widest mb-2";

  if (submitted) return (
    <div className="text-center py-16">
      <div className="w-16 h-16 border-2 border-gold flex items-center justify-center mx-auto mb-6">
        <span className="text-gold text-2xl">✓</span>
      </div>
      <h3 className="text-white font-black uppercase text-xl sc mb-3">
        {type === "party" ? "Enquiry Received" : "Request Received"}
      </h3>
      <p className="text-white/60 text-sm leading-relaxed max-w-sm mx-auto">
        We'll be in touch within a few hours to confirm. If you need to reach us sooner, call <a href="tel:02045680111" className="text-gold hover:underline">020 4568 0111</a>.
      </p>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-5 max-w-xl mx-auto">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={lbl}>Name</label>
          <input required type="text" value={form.name} onChange={e => set("name", e.target.value)} placeholder="Your name" className={inp} />
        </div>
        <div>
          <label className={lbl}>Phone</label>
          <input required type="tel" value={form.phone} onChange={e => set("phone", e.target.value)} placeholder="07700 000000" className={inp} />
        </div>
      </div>

      <div>
        <label className={lbl}>Email</label>
        <input type="email" value={form.email} onChange={e => set("email", e.target.value)} placeholder="your@email.com" className={inp} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={lbl}>Date</label>
          <input required type="date" value={form.date} onChange={e => set("date", e.target.value)} className={inp} min={new Date().toISOString().split("T")[0]} />
        </div>
        <div>
          <label className={lbl}>Guests</label>
          <select required value={form.guests} onChange={e => set("guests", e.target.value)} className={inp}>
            {GUEST_COUNTS.map(n => <option key={n} value={n}>{n} {n === "1" ? "guest" : "guests"}</option>)}
          </select>
        </div>
      </div>

      {type === "table" && (
        <div>
          <label className={lbl}>Preferred Time</label>
          <select required value={form.time} onChange={e => set("time", e.target.value)} className={inp}>
            {TIMES.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
      )}

      {type === "party" && (
        <div>
          <label className={lbl}>Occasion</label>
          <select value={form.occasion} onChange={e => set("occasion", e.target.value)} className={inp}>
            <option value="">Select occasion</option>
            <option>Birthday</option>
            <option>Anniversary</option>
            <option>Retirement</option>
            <option>Engagement</option>
            <option>Corporate event</option>
            <option>Charity / Fundraiser</option>
            <option>Wake</option>
            <option>Other</option>
          </select>
        </div>
      )}

      <div>
        <label className={lbl}>Anything else we should know? <span className="text-white/20 normal-case font-normal">(optional)</span></label>
        <textarea value={form.notes} onChange={e => set("notes", e.target.value)}
          placeholder={type === "party" ? "Tell us about the event, any catering requirements, AV needs..." : "Dietary requirements, high chairs, special occasions..."}
          rows={3} className={`${inp} resize-none`} />
      </div>

      {error && <p className="text-red-400 text-xs font-bold uppercase tracking-widest">{error}</p>}

      <button type="submit" disabled={loading}
        className="w-full bg-gold text-navy font-black tracking-widest py-4 uppercase hover:bg-white transition-colors disabled:opacity-50 sc">
        {loading ? "Sending..." : type === "party" ? "Send Enquiry" : "Request a Table"}
      </button>

      <p className="text-white/25 text-xs text-center tracking-wide">
        We aim to respond to all {type === "party" ? "enquiries" : "booking requests"} within a few hours.
        {type === "table" && " Sunday tables book out by Thursday — book early."}
      </p>
    </form>
  );
}
