import { getOptionalRequestContext } from "@/lib/cloudflare-shim";
import { getMenuItems } from "@/lib/db/queries";
import Link from "next/link";
import { ChevronLeft, Printer } from "lucide-react";
import Navbar from "@/components/Navbar";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Menu | The Old Tiger's Head · Lee Green",
  description: "Food and drinks menu at The Old Tiger's Head, Lee Green. Sunday roasts, pub classics, and a children's menu. Book a table online.",
};

const MENU_TABS = [
  { key: "today", label: "Today" },
  { key: "sunday", label: "Sunday" },
  { key: "lunch", label: "Lunch" },
  { key: "children", label: "Children's" },
];

const FALLBACK_ITEMS: Record<string, any[]> = {
  today: [
    { section: "Starters", name: "Soup of the Day", description: "Ask your server for today's selection. Served with sourdough.", price: "£7.50" },
    { section: "Starters", name: "Potted Chicken Liver Pâté", description: "Toasted brioche, cornichons, red onion marmalade.", price: "£9.00" },
    { section: "Mains", name: "Classic Tiger Burger", description: "Dry-aged beef patty, secret sauce, pickles, triple-cooked chips.", price: "£16.50" },
    { section: "Mains", name: "Beer Battered Haddock", description: "Sustainably caught haddock, minty mushy peas, tartare sauce, chips.", price: "£17.00" },
    { section: "Mains", name: "Wild Mushroom & Spinach Risotto", description: "Aged parmesan, truffle oil, toasted pine nuts.", price: "£15.50" },
    { section: "Sides", name: "Triple-Cooked Chips", description: "", price: "£4.00" },
    { section: "Sides", name: "Seasonal Greens", description: "Buttered, with a little garlic.", price: "£4.00" },
    { section: "Puddings", name: "Sticky Toffee Pudding", description: "Proper one. Toffee sauce, vanilla ice cream.", price: "£8.00" },
    { section: "Puddings", name: "Cheese & Biscuits", description: "Three British cheeses, grapes, chutney, crackers.", price: "£10.50" },
  ],
  sunday: [
    { section: "The Roast", name: "Roast Sirloin of Beef", description: "28-day dry-aged, carved at the pass. Yorkshire pudding, roast potatoes, honey-glazed carrots, parsnips, seasonal greens, 48-hour gravy.", price: "£22.00" },
    { section: "The Roast", name: "Roast Leg of Lamb", description: "Slow-roasted, with rosemary jus. All the trimmings.", price: "£21.00" },
    { section: "The Roast", name: "Roast Chicken", description: "Free-range. Stuffing, bacon, the full works.", price: "£19.50" },
    { section: "The Roast", name: "Nut Roast", description: "Seasonal vegetables, mushroom gravy, all the sides.", price: "£17.00" },
    { section: "Extras", name: "Extra Yorkshire Pudding", description: "", price: "£2.00" },
    { section: "Extras", name: "Extra Gravy", description: "48-hour beef or mushroom.", price: "£2.50" },
    { section: "Extras", name: "Cauliflower Cheese", description: "Baked, gratiné, non-negotiable.", price: "£5.00" },
    { section: "Puddings", name: "Sticky Toffee Pudding", description: "Toffee sauce, vanilla ice cream.", price: "£8.00" },
    { section: "Puddings", name: "Apple & Blackberry Crumble", description: "Seasonal fruit, oat crumble, custard or cream.", price: "£8.00" },
  ],
  lunch: [
    { section: "Sandwiches & Boards", name: "Ploughman's Board", description: "Two cheeses, ham hock, pickles, bread, apple. Best eaten slowly.", price: "£13.50" },
    { section: "Sandwiches & Boards", name: "Toasted Club Sandwich", description: "Chicken, bacon, lettuce, tomato, mayo. Served with chips.", price: "£13.00" },
    { section: "Sandwiches & Boards", name: "Smoked Salmon Bagel", description: "Cream cheese, capers, dill, lemon.", price: "£12.00" },
    { section: "Mains", name: "Classic Tiger Burger", description: "Dry-aged beef patty, secret sauce, pickles, triple-cooked chips.", price: "£16.50" },
    { section: "Mains", name: "Beer Battered Haddock", description: "Chips, mushy peas, tartare.", price: "£17.00" },
    { section: "Mains", name: "Caesar Salad", description: "Romaine, parmesan, croutons, anchovy dressing. Add chicken £3.", price: "£12.50" },
  ],
  children: [
    { section: "Children's Menu", name: "Mini Beef Burger", description: "With chips and a small salad.", price: "£8.50" },
    { section: "Children's Menu", name: "Battered Fish Goujons", description: "Chips, peas, and ketchup on the side.", price: "£8.50" },
    { section: "Children's Menu", name: "Pasta with Tomato Sauce", description: "Parmesan on top if they want it.", price: "£7.50" },
    { section: "Children's Menu", name: "Children's Sunday Roast", description: "A proper (smaller) roast. Chicken or beef, all the trimmings.", price: "£10.00" },
    { section: "Puddings", name: "Ice Cream", description: "Two scoops. Vanilla, chocolate, or strawberry.", price: "£4.50" },
    { section: "Puddings", name: "Warm Brownie", description: "With vanilla ice cream.", price: "£5.50" },
  ],
};

export default async function MenuPage({ searchParams }: { searchParams: Promise<{ type?: string }> }) {
  const params = await searchParams;
  const type = (params.type && MENU_TABS.find(t => t.key === params.type)) ? params.type : "today";

  let items = null;
  try {
    const context = getOptionalRequestContext();
    if (context?.env?.DB) {
      items = await getMenuItems(context.env.DB, type);
    }
  } catch (e) {
    console.error(e);
  }

  const displayItems = (items && items.length > 0) ? items : (FALLBACK_ITEMS[type] || FALLBACK_ITEMS.today);

  const sections = displayItems.reduce((acc: any, item: any) => {
    if (!acc[item.section]) acc[item.section] = [];
    acc[item.section].push(item);
    return acc;
  }, {});

  return (
    <>
      <Navbar lightBackground={true} />
      <main className="min-h-screen pt-32 pb-24 bg-cream text-navy print-menu">

        <div className="max-w-4xl mx-auto px-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gold font-bold uppercase text-xs tracking-widest mb-12 hover:text-navy transition-colors no-print"
          >
            <ChevronLeft size={20} /> Back
          </Link>

          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-black uppercase mb-4 text-navy" style={{ fontVariant: "small-caps" }}>
              Our Menu
            </h1>
            <div className="w-20 h-1 bg-gold mx-auto mb-8" />

            {/* Tab navigation */}
            <div className="flex justify-center gap-3 flex-wrap no-print">
              {MENU_TABS.map((tab) => (
                <Link
                  key={tab.key}
                  href={`?type=${tab.key}`}
                  className={`px-6 py-2 border-2 border-navy text-sm font-black uppercase tracking-widest transition-all ${
                    type === tab.key
                      ? "bg-navy text-gold"
                      : "text-navy hover:bg-navy hover:text-white"
                  }`}
                  style={{ fontVariant: "small-caps" }}
                >
                  {tab.label}
                </Link>
              ))}
            </div>

            {/* Print button */}
            <div className="mt-6 no-print">
              <button
                onClick={() => window.print()}
                className="inline-flex items-center gap-2 text-navy/40 hover:text-navy transition-colors text-xs font-bold uppercase tracking-widest"
              >
                <Printer size={14} /> Print Menu
              </button>
            </div>
          </div>

          {/* Menu sections */}
          <div className="space-y-16">
            {Object.entries(sections).map(([section, sectionItems]: [string, any]) => (
              <div key={section}>
                <h2 className="text-2xl font-black uppercase text-gold border-b-2 border-navy/10 pb-4 mb-8 tracking-[0.15em]" style={{ fontVariant: "small-caps" }}>
                  {section}
                </h2>
                <div className="grid gap-8">
                  {sectionItems.map((item: any, idx: number) => (
                    <div key={idx} className="flex justify-between items-start group">
                      <div className="flex-1 pr-8">
                        <h3 className="text-xl font-black uppercase mb-1 group-hover:text-gold transition-colors" style={{ fontVariant: "small-caps" }}>
                          {item.name}
                        </h3>
                        {item.description && (
                          <p className="text-sm text-navy/60 leading-relaxed" style={{ fontVariant: "normal" }}>
                            {item.description}
                          </p>
                        )}
                      </div>
                      <span className="text-lg font-black text-gold tabular-nums">
                        {item.price}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-24 pt-12 border-t border-navy/10 text-center text-[10px] font-bold uppercase tracking-widest text-navy/40">
            <p>Please inform your server of any allergies before ordering.</p>
            <p className="mt-2">All prices include VAT. Menu subject to availability.</p>
          </div>
        </div>
      </main>
    </>
  );
}
