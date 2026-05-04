"use client";

import { useState } from "react";

type FormType = "table" | "party";
const TIMES = ["12:00","12:30","13:00","13:30","14:00","14:30","15:00","15:30","16:00","16:30","17:00","17:30","18:00","18:30","19:00","19:30","20:00","20:30","21:00"];
const GUESTS = ["1","2","3","4","5","6","7","8","9","10+"];

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
      // TODO: Rob — create a free account at formspree.io, create a form, and paste the form ID below.
      // The form ID is the part after /f/ in the endpoint URL (e.g. "xabc1234" from formspree.io/f/xabc1234)
      const FORMSPREE_ID = "xyzabc"; // ← Replace this with your Formspree form ID
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({ _subject: type === "party" ? "Party Enquiry — OTH" : "Table Booking — OTH", type, ...form }),
      });
      if (res.ok) { setSubmitted(true); }
      else { setError("Something went wrong. Please call us on 020 4568 0111."); }
    } catch {
      setError("Something went wrong. Please call us on 020 4568 0111.");
    }
    setLoading(false);
  };

  const inp = "w-full bg-white border border-navy/20 text-navy px-4 py-3 focus:outline-none focus:border-gold transition-colors text-sm placeholder:text-navy/30";
  const lbl = "block text-navy/50 text-xs font-bold uppercase tracking-widest mb-2";

  if (submitted) return (
    <div className="text-center py-12 border border-navy/10 bg-white px-8">
      <div className="w-12 h-12 border-2 border-gold flex items-center justify-center mx-auto mb-4">
        <span className="text-gold font-black">✓</span>
      </div>
      <h3 className="text-navy font-black uppercase text-lg sc mb-2">Request Received</h3>
      <p className="text-navy/50 text-sm leading-relaxed">
        We'll be back in touch within a few hours to confirm. 
        Need us sooner? Call <a href="tel:02045680111" className="text-gold hover:underline">020 4568 0111</a>.
      </p>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div><label className={lbl}>Name</label><input required type="text" value={form.name} onChange={e => set("name", e.target.value)} placeholder="Your name" className={inp} /></div>
        <div><label className={lbl}>Phone</label><input required type="tel" value={form.phone} onChange={e => set("phone", e.target.value)} placeholder="07700 000000" className={inp} /></div>
      </div>
      <div><label className={lbl}>Email</label><input type="email" value={form.email} onChange={e => set("email", e.target.value)} placeholder="your@email.com" className={inp} /></div>
      <div className="grid grid-cols-2 gap-4">
        <div><label className={lbl}>Date</label><input required type="date" value={form.date} onChange={e => set("date", e.target.value)} className={inp} min={new Date().toISOString().split("T")[0]} /></div>
        <div><label className={lbl}>Guests</label>
          <select required value={form.guests} onChange={e => set("guests", e.target.value)} className={inp}>
            {GUESTS.map(n => <option key={n} value={n}>{n} {n==="1"?"guest":"guests"}</option>)}
          </select>
        </div>
      </div>
      {type === "table" && (
        <div><label className={lbl}>Time</label>
          <select required value={form.time} onChange={e => set("time", e.target.value)} className={inp}>
            {TIMES.map(t => <option key={t}>{t}</option>)}
          </select>
        </div>
      )}
      {type === "party" && (
        <div><label className={lbl}>Occasion</label>
          <select value={form.occasion} onChange={e => set("occasion", e.target.value)} className={inp}>
            <option value="">Select occasion</option>
            {["Birthday","Anniversary","Retirement","Engagement","Corporate event","Charity / Fundraiser","Wake","Other"].map(o => <option key={o}>{o}</option>)}
          </select>
        </div>
      )}
      <div><label className={lbl}>Anything else? <span className="text-navy/25 normal-case font-normal">(optional)</span></label>
        <textarea value={form.notes} onChange={e => set("notes", e.target.value)}
          placeholder={type==="party" ? "Tell us about the event, catering requirements, AV needs..." : "Dietary requirements, high chairs, special occasions..."}
          rows={3} className={`${inp} resize-none`} />
      </div>
      {error && <p className="text-red-600 text-xs font-bold uppercase tracking-widest">{error}</p>}
      <button type="submit" disabled={loading}
        className="w-full bg-navy text-gold font-black tracking-widest py-4 uppercase hover:bg-gold hover:text-navy transition-colors disabled:opacity-50 sc text-sm">
        {loading ? "Sending..." : type==="party" ? "Send Enquiry" : "Request a Table"}
      </button>
      <p className="text-navy/25 text-xs text-center tracking-wide">
        We aim to respond within a few hours.
      </p>
    </form>
  );
}
