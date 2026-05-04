import Navbar from "@/components/Navbar";
import BookingForm from "@/components/BookingForm";

export const metadata = {
  title: "Book a Table | The Old Tiger's Head · Lee Green, SE12",
  description: "Book a table at The Old Tiger's Head, Lee Green. Sunday roasts, lunch, and evening dining. SE12 8RU.",
};

export default function BookPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-navy pt-[100px] pb-24 px-6">
        <div className="max-w-xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-black uppercase text-gold mb-4 sc">Book a Table</h1>
            <div className="w-12 h-0.5 bg-gold mx-auto mb-6" />
            <p className="text-white/60 leading-relaxed">
              Fill in your details and we'll confirm your table within a few hours. 
              Sunday lunch books out by Thursday — the earlier the better.
            </p>
            <p className="text-white/40 text-sm mt-3">
              For groups of 10 or more, call us on <a href="tel:02045680111" className="text-gold hover:underline">020 4568 0111</a>.
            </p>
          </div>
          <BookingForm type="table" />
        </div>
      </main>
    </>
  );
}
