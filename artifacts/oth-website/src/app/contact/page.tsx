import EnquiryForm from "@/components/EnquiryForm";

export const metadata = {
  title: "Contact | The Old Tiger's Head · Lee Green SE12",
  description: "Get in touch with The Old Tiger's Head. Book a table, enquire about private hire, or ask us anything.",
};

export default async function ContactPage({ searchParams }: { searchParams: Promise<{ type?: string }> }) {
  const params = await searchParams;
  const preset = params?.type ?? "table";
  return (
    <main className="bg-cream pt-[68px] min-h-screen">
      <div className="bg-navy py-14 px-6 border-b border-white/10">
        <div className="max-w-5xl mx-auto">
          <p className="text-gold/60 text-xs font-black tracking-[0.4em] uppercase mb-2">The Old Tiger&apos;s Head</p>
          <h1 className="text-4xl md:text-6xl font-black uppercase text-white" style={{letterSpacing:"0.05em"}}>Get In Touch</h1>
          <p className="text-white/40 mt-3 text-sm">We&apos;ll get back to you as soon as we can — usually the same day.</p>
        </div>
      </div>
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-12">
          <div className="md:col-span-2">
            <EnquiryForm preset={preset} />
          </div>
          <div className="space-y-8">
            <div>
              <h3 className="text-navy font-black uppercase text-xs tracking-widest mb-3">Phone</h3>
              <a href="tel:02045680111" className="text-navy/70 hover:text-gold transition-colors text-sm">020 4568 0111</a>
            </div>
            <div>
              <h3 className="text-navy font-black uppercase text-xs tracking-widest mb-3">Email</h3>
              <a href="mailto:enquiries@theoldtigershead.com" className="text-navy/70 hover:text-gold transition-colors text-xs break-all">enquiries@theoldtigershead.com</a>
            </div>
            <div>
              <h3 className="text-navy font-black uppercase text-xs tracking-widest mb-3">Address</h3>
              <p className="text-navy/70 text-sm leading-relaxed">351 Lee High Road<br />London SE12 8RU</p>
            </div>
            <div>
              <h3 className="text-navy font-black uppercase text-xs tracking-widest mb-3">Opening Hours</h3>
              <div className="space-y-1.5 text-navy/70 text-sm">
                <p>Mon–Thu: 12:00–23:00</p>
                <p>Fri–Sat: 12:00–00:00</p>
                <p>Sunday: 12:00–22:00</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
