import EnquiryForm from "@/components/EnquiryForm";

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
              The Tiger Room is our dedicated private events space, located on the ground floor. Rich in character and steeped in history, the room offers an intimate and versatile setting, ideal for everything from birthday celebrations and live bands to comedy nights and special occasions.
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
            <h2 className="text-navy font-black uppercase text-2xl mb-6 sc">Make An Enquiry</h2>
            <EnquiryForm preset="party" />
          </div>
        </div>
      </section>
    </main>
  );
}
