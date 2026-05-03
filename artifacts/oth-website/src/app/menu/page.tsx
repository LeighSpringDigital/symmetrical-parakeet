import { getRequestContext } from "@cloudflare/next-on-pages";
import { getMenuItems } from "@/lib/db/queries";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { getOptionalRequestContext } from "@cloudflare/next-on-pages";

export const runtime = "edge";
export const dynamic = "force-dynamic";

export default async function MenuPage({ searchParams }: { searchParams: Promise<{ type?: string }> }) {
  const params = await searchParams;
  const type = params.type || "today";
  let items = null;

  try {
    const context = getOptionalRequestContext();
    if (context?.env?.DB) {
      items = await getMenuItems(context.env.DB, type);
    }
  } catch (e) {
    console.error(e);
  }

  // Fallback items if DB is empty/fails
  const displayItems = items && items.length > 0 ? items : [
    { section: "Mains", name: "Classic Tiger Burger", description: "Dry-aged beef, secret sauce, triple-cooked chips", price: "£16.50" },
    { section: "Mains", name: "Beer Battered Haddock", description: "Sustainably caught, minty mushy peas, tartare", price: "£17.00" },
  ];

  const sections = displayItems.reduce((acc: any, item: any) => {
    if (!acc[item.section]) acc[item.section] = [];
    acc[item.section].push(item);
    return acc;
  }, {});

  return (
    <main className="min-h-screen pt-32 pb-24 bg-cream text-navy">
      <div className="max-w-4xl mx-auto px-6">
        <Link href="/" className="inline-flex items-center gap-2 text-gold font-bold uppercase text-xs tracking-widest mb-12 hover:text-navy transition-colors">
          <ChevronLeft size={20} /> Back to Home
        </Link>

        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-black uppercase mb-4">Our Menu</h1>
          <div className="w-20 h-1 bg-gold mx-auto mb-8" />
          
          <div className="flex justify-center gap-4">
            {["today", "sunday", "kids"].map((t) => (
              <Link
                key={t}
                href={`?type=${t}`}
                className={`px-6 py-2 border-2 border-navy text-[10px] font-black uppercase tracking-widest transition-all ${
                  type === t ? "bg-navy text-gold" : "hover:bg-navy hover:text-white"
                }`}
              >
                {t}
              </Link>
            ))}
          </div>
        </div>

        <div className="space-y-16">
          {Object.entries(sections).map(([section, sectionItems]: [string, any]) => (
            <div key={section}>
              <h2 className="text-2xl font-black uppercase text-gold border-b-2 border-navy/10 pb-4 mb-8 tracking-[0.2em]">
                {section}
              </h2>
              <div className="grid gap-8">
                {sectionItems.map((item: any, idx: number) => (
                  <div key={idx} className="flex justify-between items-start group">
                    <div className="flex-1 pr-8">
                      <h3 className="text-xl font-black uppercase mb-1 group-hover:text-gold transition-colors">
                        {item.name}
                      </h3>
                      <p className="text-sm text-navy/60 italic leading-relaxed">
                        {item.description}
                      </p>
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
          <p className="mt-2">All prices include VAT at the current rate.</p>
        </div>
      </div>
    </main>
  );
}
