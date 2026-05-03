import Navbar from "@/components/Navbar";
import Link from "next/link";
import { MapPin, Phone, Mail, Bus, Car, Clock } from "lucide-react";

export const metadata = {
  title: "Find Us | The Old Tiger's Head · Lee Green",
  description: "Find The Old Tiger's Head at 351 Lee High Road, London SE12 8RU. Opening hours, directions, parking, and bus routes.",
};

export default function FindUs() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-[120px] bg-navy text-white">

        <section className="py-20 px-6 text-center border-b border-white/10">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-black uppercase text-gold mb-6" style={{ fontVariant: "small-caps" }}>
              Find Us
            </h1>
            <p className="text-white/60 flex items-center justify-center gap-3 text-lg">
              <MapPin className="text-gold flex-shrink-0" size={20} />
              351 Lee High Road, London SE12 8RU
            </p>
          </div>
        </section>

        <section className="py-24 px-6">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16">

            {/* Hours & Contact */}
            <div className="space-y-12">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <Clock className="text-gold" size={24} />
                  <h2 className="text-2xl font-black uppercase" style={{ fontVariant: "small-caps" }}>Opening Hours</h2>
                </div>
                <div className="space-y-3 text-white/70">
                  {[
                    { day: "Monday – Thursday", hours: "12:00 – 23:00" },
                    { day: "Friday – Saturday", hours: "12:00 – 00:00" },
                    { day: "Sunday", hours: "12:00 – 22:00" },
                  ].map(({ day, hours }) => (
                    <div key={day} className="flex justify-between border-b border-white/10 pb-3">
                      <span>{day}</span>
                      <span className="text-gold font-bold">{hours}</span>
                    </div>
                  ))}
                  <p className="text-white/40 text-xs italic mt-4">
                    Kitchen: Lunch 12:00–16:00 · Dinner 17:00–21:00
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-black uppercase mb-6" style={{ fontVariant: "small-caps" }}>Contact</h2>
                <div className="space-y-4 text-white/70">
                  <a href="tel:02045680111" className="flex items-center gap-4 hover:text-gold transition-colors">
                    <Phone className="text-gold flex-shrink-0" size={18} />
                    020 4568 0111
                  </a>
                  <a href="mailto:enquiries@theoldtigershead.com" className="flex items-center gap-4 hover:text-gold transition-colors">
                    <Mail className="text-gold flex-shrink-0" size={18} />
                    enquiries@theoldtigershead.com
                  </a>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-3 mb-6">
                  <Bus className="text-gold" size={24} />
                  <h2 className="text-2xl font-black uppercase" style={{ fontVariant: "small-caps" }}>Getting Here</h2>
                </div>
                <div className="space-y-4 text-white/70 text-sm leading-relaxed">
                  <div>
                    <p className="text-gold font-bold uppercase tracking-widest text-xs mb-2">By Bus</p>
                    <p>Buses 261, 321, and 178 all stop at Lee Green crossroads, directly outside. The SL4 Superloop stops nearby on its route between Eltham and Dulwich.</p>
                  </div>
                  <div>
                    <p className="text-gold font-bold uppercase tracking-widest text-xs mb-2">By Train</p>
                    <p>Lee station (Southeastern) is a 12-minute walk. Hither Green is 15 minutes. Blackheath is a 20-minute walk or a short bus ride on the 261.</p>
                  </div>
                  <div>
                    <p className="text-gold font-bold uppercase tracking-widest text-xs mb-2">By Car</p>
                    <p>We are on Lee High Road at the Lee Green crossroads — the junction of the A20, A205, and A4000. On-street parking is available on surrounding streets. Sainsbury's car park is a two-minute walk.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map placeholder + FAQ link */}
            <div className="space-y-8">
              <div className="aspect-[4/3] bg-white/5 border border-white/10 flex items-center justify-center">
                <div className="text-center px-8">
                  <MapPin className="text-gold mx-auto mb-4" size={32} />
                  <p className="text-white/40 text-xs uppercase tracking-widest font-bold mb-4">
                    351 Lee High Road · SE12 8RU
                  </p>
                  <a
                    href="https://maps.google.com/?q=351+Lee+High+Road+London+SE12+8RU"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block border border-gold text-gold px-6 py-2 text-xs font-black uppercase tracking-widest hover:bg-gold hover:text-navy transition-colors"
                  >
                    Open in Google Maps
                  </a>
                </div>
              </div>

              <div className="border border-white/10 p-8">
                <h3 className="text-gold font-black uppercase tracking-widest text-sm mb-4" style={{ fontVariant: "small-caps" }}>
                  Have a Question?
                </h3>
                <p className="text-white/50 text-sm leading-relaxed mb-6">
                  Parking, high chairs, dogs, allergens, accessibility — we've answered the common ones on our FAQ page.
                </p>
                <Link
                  href="/faq"
                  className="inline-block border border-white/20 text-white/60 px-6 py-2 text-xs font-black uppercase tracking-widest hover:border-gold hover:text-gold transition-colors"
                >
                  View FAQ
                </Link>
              </div>
            </div>

          </div>
        </section>
      </main>
    </>
  );
}
