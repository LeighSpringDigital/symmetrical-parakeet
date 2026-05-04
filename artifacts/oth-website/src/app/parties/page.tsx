import Navbar from "@/components/Navbar";
import BookingForm from "@/components/BookingForm";

export const metadata = {
  title: "Parties & Private Hire | The Old Tiger's Head · Lee Green, SE12",
  description: "Private events, celebrations and corporate hire at The Old Tiger's Head. The Tiger Room seats up to 60. Lee Green, SE12.",
};

export default function PartiesPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-navy pt-[100px] pb-24">

        {/* Hero */}
        <section className="relative h-[45vh] flex items-end overflow-hidden mb-16">
          <img src="/charitydinner.jpg" alt="Private events at The Old Tiger's Head" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0" style={{background:"linear-gradient(to top, rgba(0,41,66,1) 0%, rgba(0,41,66,0.3) 70%, transparent 100%)"}} />
          <div className="relative z-10 max-w-5xl mx-auto px-6 pb-12 w-full">
            <h1 className="text-5xl md:text-7xl font-black uppercase text-gold sc">Parties</h1>
          </div>
        </section>

        <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-16 mb-24">

          {/* Left: info */}
          <div>
            <h2 className="text-2xl font-black uppercase text-gold mb-6 sc">The Tiger Room</h2>
            <p className="text-white/70 leading-relaxed mb-6">
              The Tiger Room runs the full width of the building. High ceilings, original woodwork, its own bar and entrance. 
              It seats 60 for dinner or holds 80 for a standing reception. 
              It's the kind of room that makes an occasion feel like one.
            </p>
            <p className="text-white/70 leading-relaxed mb-8">
              We handle birthdays, anniversaries, retirements, wakes, corporate dinners, charity evenings, and everything in between. 
              Tell us what you need and we'll make it work.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              {[
                { label: "Seated", value: "Up to 60" },
                { label: "Standing", value: "Up to 80" },
                { label: "Own Bar", value: "Yes" },
                { label: "Private Entrance", value: "Yes" },
                { label: "Catering", value: "In-house" },
                { label: "AV Equipment", value: "On request" },
              ].map(({ label, value }) => (
                <div key={label} className="border-l-2 border-gold pl-4">
                  <p className="text-white/30 text-xs uppercase tracking-widest font-bold">{label}</p>
                  <p className="text-white font-black sc">{value}</p>
                </div>
              ))}
            </div>

            <div className="border border-white/10 p-6">
              <p className="text-white/50 text-sm leading-relaxed">
                Photos of the Tiger Room coming soon. In the meantime, call us on{" "}
                <a href="tel:02045680111" className="text-gold hover:underline">020 4568 0111</a>{" "}
                and we'll show you round.
              </p>
            </div>
          </div>

          {/* Right: form */}
          <div>
            <h2 className="text-2xl font-black uppercase text-gold mb-6 sc">Make an Enquiry</h2>
            <BookingForm type="party" />
          </div>
        </div>

      </main>
    </>
  );
}
