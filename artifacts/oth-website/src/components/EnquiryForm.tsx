"use client";

import { useState } from "react";

const TIMES = ["12:00","12:30","13:00","13:30","14:00","14:30","15:00","15:30","16:00","16:30","17:00","17:30","18:00","18:30","19:00","19:30","20:00","20:30","21:00"];
const TABLE_GUESTS = ["1","2","3","4","5","6","7","8","9","10"];
const OCCASIONS = ["Birthday","Anniversary","Retirement","Engagement","Corporate event","Charity / Fundraiser","Wake","Other"];
const ENQUIRY_TYPES = [
  { value: "table", label: "Book A Table" },
  { value: "party", label: "Private Event" },
  { value: "general", label: "General Enquiry" },
];

function buildWhatsAppMessage(type: string, form: Record<string, string>): string {
  const base = `Hi, I'm getting in touch via your website.\n\nName: ${form.name}\nPhone: ${form.phone}${form.email ? `\nEmail: ${form.email}` : ""}`;
  if (type === "table") {
    return encodeURIComponent(`${base}\n\nI'd like to book a table.\nDate: ${form.date}\nTime: ${form.time}\nGuests: ${form.guests}${form.notes ? `\nNotes: ${form.notes}` : ""}`);
  }
  if (type === "party") {
    return encodeURIComponent(`${base}\n\nI'd like to enquire about a private event.\nOccasion: ${form.occasion}\nApprox. guests: ${form.guests}\nPreferred date: ${form.date}${form.notes ? `\nDetails: ${form.notes}` : ""}`);
  }
  return encodeURIComponent(`${base}\n\nEnquiry:\n${form.notes}`);
}

export default function EnquiryForm({ preset = "table" }: { preset?: string }) {
  const [type, setType] = useState(preset);
  const [form, setForm] = useState({ name:"", email:"", phone:"", date:"", time:"19:00", guests:"2", notes:"", occasion:"" });
  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  const inp = "w-full bg-white border border-navy/20 text-navy px-4 py-3 focus:outline-none focus:border-gold transition-colors text-sm placeholder:text-navy/30";
  const lbl = "block text-navy/50 text-xs font-bold uppercase tracking-widest mb-2";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = buildWhatsAppMessage(type, form);
    window.open(`https://wa.me/442045680111?text=${msg}`, "_blank");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">

      {/* Enquiry type selector */}
      <div>
        <label className={lbl}>I&apos;d like to…</label>
        <div className="grid grid-cols-3 gap-2">
          {ENQUIRY_TYPES.map(t => (
            <button key={t.value} type="button"
              onClick={() => setType(t.value)}
              className={`py-3 px-2 text-xs font-black uppercase tracking-wide border-2 transition-colors ${
                type === t.value
                  ? "bg-navy text-gold border-navy"
                  : "bg-white text-navy/50 border-navy/20 hover:border-navy/40"
              }`}>
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Name + Phone */}
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

      {/* Email */}
      <div>
        <label className={lbl}>Email <span className="text-navy/25 normal-case font-normal">(optional)</span></label>
        <input type="email" value={form.email} onChange={e => set("email", e.target.value)} placeholder="your@email.com" className={inp} />
      </div>

      {/* Table-specific fields */}
      {type === "table" && (
        <>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={lbl}>Date</label>
              <input required type="date" value={form.date} onChange={e => set("date", e.target.value)} className={inp} min={new Date().toISOString().split("T")[0]} />
            </div>
            <div>
              <label className={lbl}>Guests</label>
              <select required value={form.guests} onChange={e => set("guests", e.target.value)} className={inp}>
                {TABLE_GUESTS.map(n => <option key={n} value={n}>{n} {n==="1"?"guest":"guests"}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className={lbl}>Time</label>
            <select required value={form.time} onChange={e => set("time", e.target.value)} className={inp}>
              {TIMES.map(t => <option key={t}>{t}</option>)}
            </select>
          </div>
          <p className="text-navy/30 text-xs">For groups larger than 10, please give us a call on <a href="tel:02045680111" className="text-gold">020 4568 0111</a>.</p>
        </>
      )}

      {/* Party-specific fields */}
      {type === "party" && (
        <>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={lbl}>Occasion</label>
              <select value={form.occasion} onChange={e => set("occasion", e.target.value)} className={inp}>
                <option value="">Select occasion</option>
                {OCCASIONS.map(o => <option key={o}>{o}</option>)}
              </select>
            </div>
            <div>
              <label className={lbl}>Approx. Guests</label>
              <input type="text" value={form.guests} onChange={e => set("guests", e.target.value)} placeholder="e.g. 40" className={inp} />
            </div>
          </div>
          <div>
            <label className={lbl}>Preferred Date</label>
            <input type="date" value={form.date} onChange={e => set("date", e.target.value)} className={inp} min={new Date().toISOString().split("T")[0]} />
          </div>
        </>
      )}

      {/* Notes / message */}
      <div>
        <label className={lbl}>
          {type === "general" ? "Your Message" : "Anything Else?"}&nbsp;
          {type !== "general" && <span className="text-navy/25 normal-case font-normal">(optional)</span>}
        </label>
        <textarea
          value={form.notes}
          onChange={e => set("notes", e.target.value)}
          required={type === "general"}
          placeholder={
            type === "party" ? "Tell us about the event, catering requirements, entertainment needs..." :
            type === "table" ? "Dietary requirements, high chairs, special occasions..." :
            "How can we help?"
          }
          rows={4} className={`${inp} resize-none`} />
      </div>

      <button type="submit"
        className="w-full bg-navy text-gold font-black tracking-widest py-4 uppercase hover:bg-gold hover:text-navy transition-colors text-sm flex items-center justify-center gap-3">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.552 4.116 1.52 5.845L0 24l6.335-1.502A11.956 11.956 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.006-1.371l-.36-.214-3.728.884.899-3.638-.235-.374A9.818 9.818 0 1112 21.818z"/></svg>
        {type === "table" ? "Send Via WhatsApp" : type === "party" ? "Send Enquiry Via WhatsApp" : "Send Message Via WhatsApp"}
      </button>

      <p className="text-navy/25 text-xs text-center">
        This will open WhatsApp with your message ready to send. We aim to respond the same day.
      </p>
    </form>
  );
}
