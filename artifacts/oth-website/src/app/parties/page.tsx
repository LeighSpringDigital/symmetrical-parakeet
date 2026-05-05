import BookingForm from "@/components/BookingForm";

export const metadata = {
  title: "Parties | The Old Tiger's Head · Lee Green SE12",
  description: "Private events at The Old Tiger's Head. The Tiger Room seats 60 for dinner or 80 standing. Lee Green, SE12.",
};

export default function PartiesPage() {
  return (
    <main className="bg-navy text-white pt-[68px]">

      <div className="relative h-[30vh] overflow-hidden flex items-end">
        <img src="/parties-toast.jpg" alt="Parties at The Old Tiger's Head" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-navy/70" />
        <div className="relative z-10 max-w-5xl mx-auto px-6 pb-10 w-full">
          <h1 className="text-5xl md:text-7xl font-black uppercase text-gold sc">Parties</h1>
        </div>
      </div>

      {/* Info + Form — Cream */}
      <section className="bg-cream py-16 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16">
          <div>
            <h2 className="text-navy font-black uppercase text-2xl md:text-3xl mb-6 sc">The Tiger Room</h2>
            <p className="text-navy/70 leading-relaxed mb-5 text-sm">
              The Tiger Room runs the full width of the building. High ceilings, original woodwork, 
              its own bar and private entrance. Seats 60 for dinner or holds 80 for a standing reception.
            </p>
            <p className="text-navy/70 leading-relaxed mb-8 text-sm">
              Birthdays, anniversaries, retirements, corporate dinners, charity evenings, wakes. 
              Tell us what you need and we'll make it work.
            </p>
            <div className="grid grid-cols-2 gap-4 mb-8">
              {[
                { label: "Seated", value: "Up to 60" },
                { label: "Standing", value: "Up to 80" },
                { label: "Own Bar", value: "Yes" },
                { label: "Private Entrance", value: "Yes" },
                { label: "In-house Catering", value: "Yes" },
                { label: "AV Equipment", value: "On request" },
              ].map(({ label, value }) => (
                <div key={label} className="border-l-2 border-gold pl-4">
                  <p className="text-navy/30 text-xs uppercase tracking-widest font-bold">{label}</p>
                  <p className="text-navy font-black sc">{value}</p>
                </div>
              ))}
            </div>
            <p className="text-navy/40 text-sm">
              Call us on <a href="tel:02045680111" className="text-gold hover:underline">020 4568 0111</a> to arrange a viewing.
            </p>
          </div>
          <div>
            <h2 className="text-navy font-black uppercase text-2xl mb-6 sc">Make an Enquiry</h2>
            <BookingForm type="party" />
          </div>
        </div>
      </section>
    </main>
  );
}
