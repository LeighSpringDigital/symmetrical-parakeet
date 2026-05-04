import BookingForm from "@/components/BookingForm";

export const metadata = {
  title: "Book a Table | The Old Tiger's Head · Lee Green SE12",
  description: "Book a table at The Old Tiger's Head, Lee Green. Sunday roasts, lunch, and evening dining.",
};

export default function BookPage() {
  return (
    <main className="bg-cream pt-[68px] pb-0 min-h-screen">
      <div className="max-w-xl mx-auto px-6 py-16">
        <h1 className="text-4xl md:text-5xl font-black uppercase text-navy mb-4 sc">Book a Table</h1>
        <div className="w-12 h-0.5 bg-gold mb-6" />
        <p className="text-navy/60 mb-2 leading-relaxed text-sm">
          Fill in your details and we'll confirm your booking within a few hours.
        </p>
        <p className="text-navy/40 text-sm mb-10">
          For groups of 10 or more, please call <a href="tel:02045680111" className="text-gold hover:underline">020 4568 0111</a>.
        </p>
        <BookingForm type="table" />
      </div>
    </main>
  );
}
