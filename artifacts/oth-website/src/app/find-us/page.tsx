import Link from "next/link";

export const metadata = {
  title: "Contact | The Old Tiger's Head · Lee Green SE12",
  description: "351 Lee High Road, London SE12 8RU. Opening hours, directions, parking, and buses.",
};

export default function FindUs() {
  return (
    <main className="bg-navy text-white pt-[72px]">

      <div className="bg-navy py-14 px-6 border-b border-white/10">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-black uppercase text-gold sc">Contact</h1>
        </div>
      </div>

      {/* Contact buttons — prominent */}
      <section className="bg-gold py-10 px-6">
        <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <a href="tel:02045680111"
            className="bg-navy text-gold font-black uppercase tracking-widest px-6 py-4 hover:bg-white hover:text-navy transition-colors sc text-sm">
            Call Us
          </a>
          <a href="mailto:enquiries@theoldtigershead.com"
            className="bg-navy text-gold font-black uppercase tracking-widest px-6 py-4 hover:bg-white hover:text-navy transition-colors sc text-sm">
            Email Us
          </a>
          <Link href="/contact"
            className="bg-navy text-gold font-black uppercase tracking-widest px-6 py-4 hover:bg-white hover:text-navy transition-colors sc text-sm">
            Make An Enquiry
          </Link>
        </div>
      </section>

      {/* Details + Map — Cream */}
      <section className="bg-cream py-16 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
          <div className="space-y-10">
            <div>
              <h2 className="text-navy font-black uppercase text-sm tracking-widest mb-4 sc">Address</h2>
              <p className="text-navy/70 leading-relaxed text-sm">
                351 Lee High Road<br />London SE12 8RU<br /><br />
                At the Lee Green crossroads, junction of the A20, A205, and A4000.
              </p>
            </div>
            <div>
              <h2 className="text-navy font-black uppercase text-sm tracking-widest mb-4 sc">Opening Hours</h2>
              <div className="space-y-2 text-navy/70 text-sm">
                {[
                  { day: "Monday – Thursday", hours: "12:00 – 23:00" },
                  { day: "Friday – Saturday", hours: "12:00 – 00:00" },
                  { day: "Sunday", hours: "12:00 – 22:00" },
                ].map(({ day, hours }) => (
                  <div key={day} className="flex justify-between border-b border-navy/10 pb-2">
                    <span>{day}</span><span className="text-gold font-bold">{hours}</span>
                  </div>
                ))}
                <p className="text-navy/30 text-xs pt-2">Kitchen: 12:00–16:00 and 17:00–21:00</p>
              </div>
            </div>
            <div>
              <h2 className="text-navy font-black uppercase text-sm tracking-widest mb-4 sc">Getting Here</h2>
              <div className="space-y-3 text-navy/70 text-sm">
                <p><span className="font-bold text-navy">Bus:</span> 261, 321, and 178 stop directly outside. SL4 Superloop nearby.</p>
                <p><span className="font-bold text-navy">Train:</span> Lee station 12 mins walk. Hither Green 15 mins. Blackheath 20 mins.</p>
                <p><span className="font-bold text-navy">Parking:</span> On-street nearby. Sainsbury's car park two minutes' walk.</p>
              </div>
            </div>
            <Link href="/faq" className="inline-block border border-navy/20 text-navy/50 text-xs font-black uppercase tracking-widest px-6 py-3 hover:border-navy hover:text-navy transition-colors sc">
              View FAQ →
            </Link>
          </div>

          <div className="flex flex-col gap-4">
            <div className="overflow-hidden border border-navy/10" style={{height:"420px"}}>
              <iframe
                title="The Old Tiger's Head"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d992!2d-0.0163!3d51.4537!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47d8a9f3b3b3b3b3%3A0xabcdef1234567890!2s351%20Lee%20High%20Rd%2C%20London%20SE12%208RU%2C%20UK!5e0!3m2!1sen!2suk!4v1234567890"
                width="100%" height="100%" style={{border:0}} allowFullScreen loading="lazy"
                referrerPolicy="no-referrer-when-downgrade" />
            </div>
            <a href="https://maps.google.com/?q=351+Lee+High+Road+London+SE12+8RU"
              target="_blank" rel="noopener noreferrer"
              className="border border-navy/20 text-navy/50 text-xs font-black uppercase tracking-widest px-6 py-3 text-center hover:border-navy hover:text-navy transition-colors sc">
              Open in Google Maps
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
