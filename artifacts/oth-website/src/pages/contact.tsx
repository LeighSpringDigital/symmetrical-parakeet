import { useState } from "react";
import { MapPin, Phone, Mail, Clock, ChevronRight } from "lucide-react";

const NAVY = "#002942";
const GOLD = "#C9A227";
const FONT = "'Century Gothic', 'Avant Garde', CenturyGothic, AppleGothic, sans-serif";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = "Please enter your name";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) errs.email = "Please enter a valid email address";
    if (!form.message.trim()) errs.message = "Please write a message";
    setErrors(errs);
    if (Object.keys(errs).length === 0) setSubmitted(true);
  }

  function field(key: keyof typeof form) {
    return {
      value: form[key],
      onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
        setForm((f) => ({ ...f, [key]: e.target.value })),
    };
  }

  return (
    <div style={{ fontFamily: FONT, backgroundColor: NAVY }} className="min-h-screen">
      {/* Nav strip */}
      <nav className="px-8 py-5 border-b border-white/10 flex items-center justify-between" style={{ backgroundColor: NAVY }} aria-label="Page navigation">
        <a
          href="/"
          className="font-black uppercase tracking-widest text-sm transition-colors hover:text-white flex items-center gap-2"
          style={{ color: GOLD }}
        >
          ← Old Tigers Head
        </a>
        <a
          href="#book"
          className="text-xs font-bold tracking-widest uppercase px-5 py-2.5 transition-all hover:brightness-90"
          style={{ backgroundColor: GOLD, color: NAVY }}
          onClick={(e) => { e.preventDefault(); window.location.href = "/#book"; }}
        >
          Book a Table
        </a>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-xs tracking-[0.5em] uppercase font-semibold mb-3" style={{ color: GOLD }}>
            We'd love to hear from you
          </p>
          <h1 className="text-white text-4xl md:text-5xl font-black uppercase tracking-wide" style={{ fontFamily: FONT }}>
            Contact Us
          </h1>
          <div className="mt-4 w-16 h-0.5 mx-auto" style={{ backgroundColor: GOLD }} />
        </div>

        <div className="grid lg:grid-cols-2 gap-16">

          {/* ── LEFT: Contact Details ── */}
          <div className="space-y-8">

            {/* Address */}
            <div className="border border-white/10 p-7" style={{ backgroundColor: "rgba(255,255,255,0.03)" }}>
              <div className="text-[10px] font-bold tracking-widest uppercase mb-4" style={{ color: GOLD }}>Find Us</div>
              <div className="flex items-start gap-3 mb-4">
                <MapPin size={16} className="flex-shrink-0 mt-0.5" style={{ color: GOLD }} />
                <div>
                  <div className="text-white font-bold text-sm">The Old Tigers Head</div>
                  <div className="text-white/60 text-sm mt-1 leading-relaxed">
                    351 Lee High Road<br />Lee Green<br />London SE12 8RU
                  </div>
                </div>
              </div>
              <a
                href="https://maps.google.com/?q=351+Lee+High+Road+London+SE12+8RU"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[11px] font-bold tracking-widest uppercase transition-colors hover:text-white"
                style={{ color: GOLD }}
              >
                Open in Google Maps <ChevronRight size={11} />
              </a>
            </div>

            {/* Phone & Email */}
            <div className="border border-white/10 p-7" style={{ backgroundColor: "rgba(255,255,255,0.03)" }}>
              <div className="text-[10px] font-bold tracking-widest uppercase mb-4" style={{ color: GOLD }}>Get in Touch</div>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Phone size={15} className="flex-shrink-0" style={{ color: GOLD }} />
                  <div>
                    <div className="text-white/40 text-[10px] uppercase tracking-wider mb-0.5">Phone</div>
                    <a href="tel:02045680111" className="text-white text-sm font-semibold hover:text-[#C9A227] transition-colors">
                      020 4568 0111
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail size={15} className="flex-shrink-0" style={{ color: GOLD }} />
                  <div>
                    <div className="text-white/40 text-[10px] uppercase tracking-wider mb-0.5">Email</div>
                    <a href="mailto:enquiries@theoldtigershead.com" className="text-white text-sm font-semibold hover:text-[#C9A227] transition-colors">
                      enquiries@theoldtigershead.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Opening Hours */}
            <div className="border border-white/10 p-7" style={{ backgroundColor: "rgba(255,255,255,0.03)" }}>
              <div className="flex items-center gap-2 mb-4">
                <Clock size={13} style={{ color: GOLD }} />
                <div className="text-[10px] font-bold tracking-widest uppercase" style={{ color: GOLD }}>Opening Hours</div>
              </div>
              <div className="space-y-2 text-sm">
                {[
                  { days: "Mon – Thu", hours: "12pm – 11pm" },
                  { days: "Fri – Sat", hours: "12pm – 12am" },
                  { days: "Sunday", hours: "12pm – 10pm" },
                ].map((row) => (
                  <div key={row.days} className="flex justify-between">
                    <span className="text-white/55">{row.days}</span>
                    <span className="text-white font-semibold">{row.hours}</span>
                  </div>
                ))}
                <div className="border-t border-white/10 mt-3 pt-3 space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-white/35">Kitchen – lunch</span>
                    <span className="text-white/60">12pm – 4pm</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/35">Kitchen – dinner</span>
                    <span className="text-white/60">5pm – 9pm</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick links */}
            <div className="flex flex-wrap gap-3">
              {[
                { label: "Book a Table", href: "/#book" },
                { label: "Venue Hire", href: "/#hire" },
                { label: "FAQs", href: "/#faq" },
              ].map((btn) => (
                <a
                  key={btn.label}
                  href={btn.href}
                  className="text-[11px] font-bold tracking-widest uppercase px-5 py-2.5 border transition-all hover:border-[#C9A227] hover:text-[#C9A227]"
                  style={{ borderColor: "rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.65)" }}
                >
                  {btn.label}
                </a>
              ))}
            </div>
          </div>

          {/* ── RIGHT: Get in Touch Form ── */}
          <div>
            <div className="text-[10px] font-bold tracking-widest uppercase mb-6" style={{ color: GOLD }}>Send Us a Message</div>

            {submitted ? (
              <div className="border border-white/10 p-12 text-center" style={{ backgroundColor: "rgba(255,255,255,0.03)" }}>
                <div
                  className="w-14 h-14 flex items-center justify-center mx-auto mb-5 font-black text-xl"
                  style={{ backgroundColor: GOLD, color: NAVY }}
                >
                  ✓
                </div>
                <div className="text-xl font-black uppercase tracking-wide text-white mb-3" style={{ fontFamily: FONT }}>
                  Message Received
                </div>
                <p className="text-white/55 text-sm leading-relaxed mb-6">
                  Thanks, {form.name.split(" ")[0]}. We'll get back to you as soon as we can — usually within 24 hours.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setForm({ name: "", email: "", subject: "", message: "" }); }}
                  className="text-xs font-bold tracking-widest uppercase transition-colors hover:text-white"
                  style={{ color: GOLD }}
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div>
                  <label className="block text-[10px] font-bold tracking-widest uppercase mb-2" style={{ color: "rgba(255,255,255,0.5)" }}>
                    Your Name *
                  </label>
                  <input
                    type="text"
                    placeholder="Full name"
                    {...field("name")}
                    className="w-full bg-transparent border px-4 py-3 text-white text-sm placeholder:text-white/25 outline-none focus:border-[#C9A227] transition-colors"
                    style={{ borderColor: errors.name ? "#ef4444" : "rgba(255,255,255,0.15)" }}
                  />
                  {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-[10px] font-bold tracking-widest uppercase mb-2" style={{ color: "rgba(255,255,255,0.5)" }}>
                    Email Address *
                  </label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    {...field("email")}
                    className="w-full bg-transparent border px-4 py-3 text-white text-sm placeholder:text-white/25 outline-none focus:border-[#C9A227] transition-colors"
                    style={{ borderColor: errors.email ? "#ef4444" : "rgba(255,255,255,0.15)" }}
                  />
                  {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-[10px] font-bold tracking-widest uppercase mb-2" style={{ color: "rgba(255,255,255,0.5)" }}>
                    Subject
                  </label>
                  <select
                    {...field("subject")}
                    className="w-full border px-4 py-3 text-white text-sm outline-none focus:border-[#C9A227] transition-colors appearance-none cursor-pointer"
                    style={{ backgroundColor: "#001a2e", borderColor: "rgba(255,255,255,0.15)" }}
                  >
                    <option value="">Select a topic...</option>
                    {[
                      "Table booking enquiry",
                      "Venue hire / private events",
                      "General enquiry",
                      "Feedback",
                      "Press or media",
                      "Something else",
                    ].map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold tracking-widest uppercase mb-2" style={{ color: "rgba(255,255,255,0.5)" }}>
                    Message *
                  </label>
                  <textarea
                    placeholder="How can we help?"
                    rows={6}
                    {...field("message")}
                    className="w-full bg-transparent border px-4 py-3 text-white text-sm placeholder:text-white/25 outline-none focus:border-[#C9A227] transition-colors resize-none"
                    style={{ borderColor: errors.message ? "#ef4444" : "rgba(255,255,255,0.15)" }}
                  />
                  {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  className="w-full text-sm font-bold tracking-[0.2em] uppercase py-4 transition-all hover:brightness-90"
                  style={{ backgroundColor: GOLD, color: NAVY }}
                >
                  Send Message
                </button>

                <p className="text-white/25 text-xs text-center">
                  For bookings, use our <a href="/#book" className="underline hover:text-white/50 transition-colors">booking form</a>. For urgent queries, call us on{" "}
                  <a href="tel:02045680111" className="underline hover:text-white/50 transition-colors">020 4568 0111</a>.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Footer strip */}
      <div className="mt-16 border-t border-white/10 py-8 text-center" style={{ backgroundColor: "#001520" }}>
        <a href="/" className="text-white/30 text-xs tracking-widest uppercase hover:text-white/55 transition-colors">
          ← Back to the Old Tigers Head
        </a>
      </div>
    </div>
  );
}
