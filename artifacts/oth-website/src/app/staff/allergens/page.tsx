import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const ALLERGENS = [
  { dish: "Tiger Burger", allergens: ["Gluten (bun)", "Egg (sauce)", "Mustard (sauce)"], notes: "Can be served bunless on request." },
  { dish: "Beer Battered Haddock", allergens: ["Gluten (batter)", "Fish"], notes: "Mushy peas contain no allergens. Tartare contains egg." },
  { dish: "Wild Mushroom Risotto", allergens: ["Dairy (parmesan)"], notes: "Can be made dairy-free on request — check with kitchen." },
  { dish: "Chicken Liver Pâté", allergens: ["Gluten (brioche)", "Dairy (butter)", "Alcohol (brandy)"], notes: "" },
  { dish: "Sunday Roast — Beef", allergens: ["Gluten (gravy)", "Dairy (Yorkshire pudding)", "Egg (Yorkshire pudding)"], notes: "Nut roast option available for vegetarians." },
  { dish: "Sticky Toffee Pudding", allergens: ["Gluten", "Dairy", "Egg"], notes: "Contains sulphites (dates)." },
  { dish: "Cheese & Biscuits", allergens: ["Dairy", "Gluten (biscuits)"], notes: "Crackers are gluten-free on request." },
  { dish: "Children's Pasta", allergens: ["Gluten", "Dairy"], notes: "Gluten-free pasta available — check with kitchen." },
];

export default function Allergens() {
  return (
    <main className="min-h-screen bg-navy text-white pt-24 px-6 pb-20">
      <div className="max-w-4xl mx-auto">
        <Link href="/staff/dashboard" className="flex items-center gap-2 text-white/30 hover:text-white text-xs uppercase tracking-widest font-bold mb-10 transition-colors">
          <ArrowLeft size={14} /> Dashboard
        </Link>
        <h1 className="text-4xl font-black uppercase text-gold mb-4 sc">Allergen Guide</h1>
        <div className="bg-gold/10 border border-gold/30 p-4 mb-10 text-sm text-white/70">
          <strong className="text-gold">Important:</strong> Always direct customers with severe allergies to speak with the kitchen directly before ordering. This guide is for reference only — ingredients may change.
        </div>
        <div className="space-y-4">
          {ALLERGENS.map(({ dish, allergens, notes }) => (
            <div key={dish} className="border border-white/10 p-6 hover:border-gold transition-colors">
              <h3 className="font-black uppercase text-white mb-3 sc">{dish}</h3>
              <div className="flex flex-wrap gap-2 mb-2">
                {allergens.map(a => (
                  <span key={a} className="bg-gold/20 text-gold text-xs font-bold uppercase tracking-wider px-3 py-1">{a}</span>
                ))}
              </div>
              {notes && <p className="text-white/40 text-xs mt-2">{notes}</p>}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
