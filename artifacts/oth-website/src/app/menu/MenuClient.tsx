"use client";

import { useState } from "react";
import { Printer } from "lucide-react";

const TABS = [
  { key: "today", label: "Today" },
  { key: "sunday", label: "Sunday" },
  { key: "lunch", label: "Lunch" },
  { key: "children", label: "Children" },
];

const MENU: Record<string, {section:string; items:{name:string; price:string; desc:string}[]}[]> = {
  today: [
    { section: "Starters", items: [
      { name: "Soup of the Day", price: "£7.50", desc: "With sourdough" },
      { name: "Chicken Liver Pâté", price: "£9.00", desc: "Brioche, cornichons, red onion marmalade" },
    ]},
    { section: "Mains", items: [
      { name: "Tiger Burger", price: "£16.50", desc: "Dry-aged beef, secret sauce, triple-cooked chips" },
      { name: "Beer Battered Haddock", price: "£17.00", desc: "Chips, mushy peas, tartare" },
      { name: "Wild Mushroom Risotto", price: "£15.50", desc: "Aged parmesan, truffle oil" },
    ]},
    { section: "Puddings", items: [
      { name: "Sticky Toffee Pudding", price: "£8.00", desc: "Toffee sauce, vanilla ice cream" },
      { name: "Berry Crumble", price: "£8.00", desc: "Seasonal fruit, oat crumble, custard" },
    ]},
  ],
  sunday: [
    { section: "The Roast", items: [
      { name: "Sirloin of Beef", price: "£22.00", desc: "28-day dry-aged · Yorkshire pudding · roast potatoes · seasonal vegetables · 48-hour gravy" },
      { name: "Leg of Lamb", price: "£21.00", desc: "Slow-roasted · rosemary jus · all the trimmings" },
      { name: "Roast Chicken", price: "£19.50", desc: "Free-range · stuffing · bacon" },
      { name: "Nut Roast", price: "£17.00", desc: "Seasonal vegetables · mushroom gravy" },
    ]},
    { section: "Extras", items: [
      { name: "Extra Yorkshire Pudding", price: "£2.00", desc: "" },
      { name: "Extra Gravy", price: "£2.50", desc: "Beef or mushroom" },
      { name: "Cauliflower Cheese", price: "£5.00", desc: "Baked, gratiné" },
    ]},
    { section: "Puddings", items: [
      { name: "Sticky Toffee Pudding", price: "£8.00", desc: "Toffee sauce, vanilla ice cream" },
      { name: "Berry Crumble", price: "£8.00", desc: "Seasonal fruit, oat crumble, custard" },
    ]},
  ],
  lunch: [
    { section: "Boards & Sandwiches", items: [
      { name: "Ploughman's Board", price: "£13.50", desc: "Two cheeses, ham hock, pickles, bread, apple" },
      { name: "Club Sandwich", price: "£13.00", desc: "Chicken, bacon, lettuce, tomato, mayo, chips" },
      { name: "Smoked Salmon Bagel", price: "£12.00", desc: "Cream cheese, capers, dill, lemon" },
    ]},
    { section: "Mains", items: [
      { name: "Tiger Burger", price: "£16.50", desc: "Dry-aged beef, secret sauce, chips" },
      { name: "Beer Battered Haddock", price: "£17.00", desc: "Chips, mushy peas, tartare" },
      { name: "Caesar Salad", price: "£12.50", desc: "Romaine, parmesan, croutons, anchovy dressing" },
    ]},
  ],
  children: [
    { section: "Children's Menu", items: [
      { name: "Mini Beef Burger", price: "£8.50", desc: "With chips and salad" },
      { name: "Fish Goujons", price: "£8.50", desc: "Chips, peas, ketchup" },
      { name: "Pasta with Tomato Sauce", price: "£7.50", desc: "With parmesan" },
      { name: "Children's Sunday Roast", price: "£10.00", desc: "Chicken or beef, all the trimmings" },
    ]},
    { section: "Puddings", items: [
      { name: "Ice Cream", price: "£4.50", desc: "Two scoops" },
      { name: "Warm Brownie", price: "£5.50", desc: "Vanilla ice cream" },
    ]},
  ],
};

export default function MenuClient({ initialItems }: { initialItems: any[] | null }) {
  const [tab, setTab] = useState("today");
  const data = MENU[tab] || MENU.today;

  return (
    <main className="bg-cream pt-[72px] min-h-screen">
      <div className="bg-navy py-14 px-6 border-b border-white/10">
        <div className="max-w-5xl mx-auto flex items-end justify-between">
          <h1 className="text-5xl md:text-7xl font-black uppercase text-gold sc">Menu</h1>
          <button onClick={() => window.print()} className="text-white/30 hover:text-white transition-colors no-print flex items-center gap-2 text-xs font-bold uppercase tracking-widest">
            <Printer size={14} /> Print
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Equal-width tabs */}
        <div className="grid grid-cols-4 gap-2 mb-10 no-print">
          {TABS.map(t => (
            <button key={t.key} onClick={() => setTab(t.key)}
              className={`py-3 border-2 text-xs font-black uppercase tracking-wide transition-all sc text-center ${
                tab===t.key ? "bg-navy border-navy text-gold" : "border-navy/30 text-navy hover:border-navy"
              }`}>
              {t.label}
            </button>
          ))}
        </div>

        <p className="text-navy/30 text-xs uppercase tracking-widest font-bold mb-10">
          {tab==="sunday" ? "Served Sunday 12:00 – 17:00" : "Served daily 12:00 – 21:00"}
        </p>

        <div className="grid md:grid-cols-3 gap-12">
          {data.map(({section, items}) => (
            <div key={section}>
              <h2 className="text-gold font-black uppercase text-xs tracking-widest border-b border-navy/10 pb-3 mb-6 sc">{section}</h2>
              <div className="space-y-6">
                {items.map(item => (
                  <div key={item.name} className="flex justify-between items-start gap-3">
                    <div>
                      <p className="font-black text-navy text-sm uppercase sc">{item.name}</p>
                      {item.desc && <p className="text-navy/50 text-xs mt-0.5">{item.desc}</p>}
                    </div>
                    <span className="text-gold font-black text-sm flex-shrink-0">{item.price}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-10 border-t border-navy/10 text-center text-[10px] font-bold uppercase tracking-widest text-navy/25">
          <p>Please inform your server of any allergies before ordering. Menu subject to availability.</p>
        </div>
      </div>
    </main>
  );
}
