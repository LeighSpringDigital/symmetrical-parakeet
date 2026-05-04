import Navbar from "@/components/Navbar";
import Link from "next/link";

export const metadata = {
  title: "Find Us | The Old Tiger's Head · Lee Green, SE12",
  description: "The Old Tiger's Head is at 351 Lee High Road, London SE12 8RU. Opening hours, parking, buses, and directions.",
};

export default function FindUs() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-navy text-white pt-[100px] pb-0">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <h1 className="text-5xl md:text-7xl font-black uppercase text-gold mb-12 sc">Find Us</h1>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div className="space-y-10">
              <div>
                <h2 className="text-sm font-black uppercase text-gold tracking-widest mb-4 sc">Address</h2>
                <p className="text-white/70 leading-relaxed">
                  351 Lee High Road<br />London SE12 8RU<br /><br />
                  At the Lee Green crossroads — the junction of the A20, A205, and A4000.
                </p>
              </div>

              <div>
                <h2 className="text-sm font-black uppercase text-gold tracking-widest mb-4 sc">Opening Hours</h2>
                <div className="space-y-2 text-white/70 text-sm">
                  {[
                    { day: "Monday – Thursday", hours: "12:00 – 23:00" },
                    { day: "Friday – Saturday", hours: "12:00 – 00:00" },
                    { day: "Sunday", hours: "12:00 – 22:00" },
                  ].map(({ day, hours }) => (
                    <div key={day} className="flex justify-between border-b border-white/10 pb-2">
                      <span>{day}</span><span className="text-gold font-bold">{hours}</span>
                    </div>
                  ))}
                  <p className="text-white/30 text-xs pt-2">Kitchen: 12:00–16:00 and 17:00–21:00 daily</p>
                </div>
              </div>

              <div>
                <h2 className="text-sm font-black uppercase text-gold tracking-widest mb-4 sc">Contact</h2>
                <div className="space-y-3 text-white/70 text-sm">
                  <a href="tel:02045680111" className="block hover:text-gold transition-colors">020 4568 0111</a>
                  <a href="mailto:enquiries@theoldtigershead.com" className="block hover:text-gold transition-colors">enquiries@theoldtigershead.com</a>
                </div>
              </div>

              <div>
                <h2 className="text-sm font-black uppercase text-gold tracking-widest mb-4 sc">Getting Here</h2>
                <div className="space-y-4 text-white/70 text-sm">
                  <div>
                    <p className="text-white/40 text-xs uppercase tracking-widest font-bold mb-1">By Bus</p>
                    <p>261, 321, and 178 stop directly outside. The SL4 Superloop also serves the area.</p>
                  </div>
                  <div>
                    <p className="text-white/40 text-xs uppercase tracking-widest font-bold mb-1">By Train</p>
                    <p>Lee station is a 12-minute walk. Hither Green is 15 minutes. Blackheath is 20 minutes or one stop on the 261.</p>
                  </div>
                  <div>
                    <p className="text-white/40 text-xs uppercase tracking-widest font-bold mb-1">Parking</p>
                    <p>On-street parking on surrounding streets. Sainsbury's car park is two minutes' walk and is usually free in the evenings.</p>
                  </div>
                </div>
              </div>

              <div className="border border-white/10 p-6">
                <p className="text-white/50 text-sm mb-3">Have a question before you visit?</p>
                <Link href="/faq" className="text-gold text-xs font-black uppercase tracking-widest hover:underline sc">View FAQ →</Link>
              </div>
            </div>

            {/* Embedded Google Map */}
            <div className="flex flex-col gap-4">
              <div className="overflow-hidden border border-white/10" style={{height:"480px"}}>
                <iframe
                  title="The Old Tiger's Head location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2486.5!2d-0.0163!3d51.4537!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47d8a9b6b6b6b6b7%3A0x1234567890abcdef!2s351%20Lee%20High%20Rd%2C%20London%20SE12%208RU!5e0!3m2!1sen!2suk!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{border:0, filter:"grayscale(80%) invert(10%)"}}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <a href="https://maps.google.com/?q=351+Lee+High+Road+London+SE12+8RU"
                target="_blank" rel="noopener noreferrer"
                className="border border-white/20 text-white/50 text-xs font-black uppercase tracking-widest px-6 py-3 text-center hover:border-gold hover:text-gold transition-colors sc">
                Open in Google Maps
              </a>
            </div>
          </div>
        </div>

        <footer className="py-12 bg-navy border-t border-white/10">
          <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-white/20 text-[10px] font-bold uppercase tracking-[0.25em] gap-4">
            <p>© 2026 The Old Tigers Head · 351 Lee High Road · London SE12 8RU</p>
            <div className="flex gap-6">
              <Link href="/faq" className="hover:text-white transition-colors">FAQ</Link>
              <Link href="/our-pub" className="hover:text-white transition-colors">About</Link>
              <Link href="/staff" className="hover:text-white transition-colors">Staff</Link>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
