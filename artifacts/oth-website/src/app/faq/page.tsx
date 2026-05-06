import Navbar from "@/components/Navbar";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

export const metadata = {
  title: "FAQ | The Old Tiger's Head · Lee Green",
  description: "Frequently asked questions about The Old Tiger's Head, Lee Green. Parking, high chairs, dogs, allergens, booking, and more.",
};

const faqs = [
  {
    category: "Booking & Reservations",
    questions: [
      {
        q: "Do I need to book?",
        a: "We recommend it, especially for Sunday lunch. The roast frequently sells out, and Sunday tables often book up by Thursday. For weekday visits and casual drinks, you're welcome to walk in.",
      },
      {
        q: "How do I book?",
        a: "Bookings are handled via WhatsApp on 020 4568 0111. Send us your name, date, time, and number of guests. Your booking isn't confirmed until you receive a reply from the team.",
      },
      {
        q: "Can I book for large groups?",
        a: "For groups of 10 or more, please call us directly on 020 4568 0111. For private events, the Tiger Room can accommodate up to 60 seated or 80 standing. Visit our Private Hire page for details.",
      },
      {
        q: "What is your cancellation policy?",
        a: "We ask for 24 hours' notice for table cancellations where possible. For Tiger Room bookings, please see the terms on your booking confirmation.",
      },
    ],
  },
  {
    category: "Families & Children",
    questions: [
      {
        q: "Are children welcome?",
        a: "Yes. We have a children's menu, and families are welcome throughout the pub until 7pm. After 7pm we ask that children are not in the main bar area.",
      },
      {
        q: "Do you have high chairs?",
        a: "Yes, we have high chairs available. If you need one, mention it when you book and we'll make sure one is ready at your table.",
      },
      {
        q: "Is there a children's menu?",
        a: "Yes. The children's menu includes smaller versions of our main dishes: burger, fish goujons, pasta, and a children's Sunday roast on Sundays. It's on the menu page.",
      },
      {
        q: "Is there space for a pram or pushchair?",
        a: "Yes. The pub is on one level (ground floor) and has enough space for pushchairs. If you're coming with a pram, the beer garden is often the easiest spot, with plenty of room and a relaxed atmosphere.",
      },
    ],
  },
  {
    category: "Dogs",
    questions: [
      {
        q: "Are dogs welcome?",
        a: "Absolutely. Well-behaved dogs are welcome in the pub and the beer garden. Water bowls are available on request. Casper, our resident greyhound, is usually in the garden and has never objected to visitors.",
      },
      {
        q: "Are there any areas where dogs aren't allowed?",
        a: "We ask that dogs stay out of the kitchen area and the Tiger Room during private events. Everywhere else is fine.",
      },
    ],
  },
  {
    category: "Getting Here & Parking",
    questions: [
      {
        q: "Where can I park?",
        a: "On-street parking is available on the surrounding residential streets (check signs for restrictions). Sainsbury's car park on Lee High Road is a two-minute walk and is usually available in the evenings.",
      },
      {
        q: "Which buses stop nearby?",
        a: "Buses 261, 321, and 178 all stop at Lee Green crossroads, directly outside the pub. The SL4 Superloop also serves the area. If you're coming from Blackheath, the 261 is your bus.",
      },
      {
        q: "What's the nearest train station?",
        a: "Lee station (Southeastern) is about a 12-minute walk. Hither Green is 15 minutes. From Blackheath station it's a 20-minute walk, or take the 261 bus.",
      },
      {
        q: "Is the pub accessible for wheelchair users?",
        a: "The ground floor is step-free and accessible. The Tiger Room is also on the ground floor. Please call us on 020 4568 0111 if you have specific accessibility requirements and we'll make sure everything is ready for you.",
      },
    ],
  },
  {
    category: "Food & Drink",
    questions: [
      {
        q: "Do you cater for allergies and dietary requirements?",
        a: "Yes. Please inform your server of any allergies or dietary requirements before ordering. Our kitchen team take allergens seriously. If you have a severe allergy, please call us before your visit so we can talk through the options.",
      },
      {
        q: "Do you have vegetarian and vegan options?",
        a: "Yes, there are vegetarian options across all menus, including a nut roast on Sundays. Vegan options are available on request. Ask your server and they'll guide you through what we can do.",
      },
      {
        q: "What time does the kitchen close?",
        a: "The kitchen serves lunch 12:00–16:00 and dinner 17:00–21:00 daily. On Sundays the roast is served 12:00–17:00 or until sold out, which often happens before 5pm.",
      },
      {
        q: "Can I see the menu before I visit?",
        a: "Yes, the full menu is on our website, including the Sunday menu and children's menu. You can also print it from the menu page.",
      },
    ],
  },
  {
    category: "Events & Private Hire",
    questions: [
      {
        q: "How do I hire the Tiger Room?",
        a: "Visit our Private Hire page and send us an enquiry via WhatsApp or email. Tell us your date, approximate numbers, and what you have in mind. We'll come back to you with availability and a quote.",
      },
      {
        q: "Can I book the pub for a wake or memorial event?",
        a: "Yes. We handle these with care and discretion. Please call us directly on 020 4568 0111 to discuss your requirements.",
      },
    ],
  },
];

export default function FAQ() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-[120px] bg-navy text-white">
        <section className="py-20 px-6 text-center border-b border-white/10">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-black uppercase text-gold mb-4" style={{ fontVariant: "small-caps" }}>
              FAQ
            </h1>
            <p className="text-white/50 text-lg">
              The questions we get asked most often. If yours isn't here, call us on{" "}
              <a href="tel:02045680111" className="text-gold hover:underline">020 4568 0111</a>.
            </p>
          </div>
        </section>

        <section className="py-20 px-6">
          <div className="max-w-3xl mx-auto space-y-16">
            {faqs.map(({ category, questions }) => (
              <div key={category}>
                <h2 className="text-xl font-black uppercase text-gold mb-8 border-b border-white/10 pb-4 tracking-widest" style={{ fontVariant: "small-caps" }}>
                  {category}
                </h2>
                <div className="space-y-8">
                  {questions.map(({ q, a }) => (
                    <div key={q} className="border-l-2 border-white/10 pl-6 hover:border-gold transition-colors group">
                      <h3 className="font-black text-white mb-3 group-hover:text-gold transition-colors" style={{ fontVariant: "small-caps" }}>
                        {q}
                      </h3>
                      <p className="text-white/60 text-sm leading-relaxed" style={{ fontVariant: "normal" }}>
                        {a}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="py-16 px-6 border-t border-white/10 text-center">
          <p className="text-white/40 text-sm mb-6">Still have a question?</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:02045680111" className="border border-white/20 text-white/60 px-8 py-3 font-black uppercase tracking-widest text-xs hover:border-gold hover:text-gold transition-colors">
              020 4568 0111
            </a>
            <a href="mailto:enquiries@theoldtigershead.com" className="border border-white/20 text-white/60 px-8 py-3 font-black uppercase tracking-widest text-xs hover:border-gold hover:text-gold transition-colors">
              Email Us
            </a>
            <Link href="/find-us" className="border border-white/20 text-white/60 px-8 py-3 font-black uppercase tracking-widest text-xs hover:border-gold hover:text-gold transition-colors">
              Find Us
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
