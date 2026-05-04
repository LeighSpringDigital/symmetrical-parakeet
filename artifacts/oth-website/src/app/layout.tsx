import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { emergencyNotice as mockNotice } from "@/lib/config";
import { getEmergencyNotice } from "@/lib/db/queries";
import { getOptionalRequestContext } from "@/lib/cloudflare-shim";

export const dynamic = "force-dynamic";

export const metadata = {
  title: { template: "%s | The Old Tiger's Head", default: "The Old Tiger's Head | Pub in Lee Green, London SE12" },
  description: "A Grade II listed community pub in Lee Green, London SE12. Sunday roasts, beer garden, private parties, and live events. Established 1750.",
  keywords: ["pub Lee Green", "Sunday roast SE12", "beer garden Lee Green", "private hire Lewisham", "pub SE12 8RU", "Lee Green pub", "family pub Lee Green"],
  openGraph: {
    title: "The Old Tiger's Head | Lee Green",
    description: "A Grade II listed pub in Lee Green, SE12. Sunday roasts, beer garden, parties. Est. 1750.",
    images: [{ url: "/opengraph.jpg", width: 1200, height: 630 }],
    locale: "en_GB", type: "website",
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  let dbNotice = null;
  try {
    const ctx = getOptionalRequestContext();
    if (ctx?.env?.DB) dbNotice = await getEmergencyNotice(ctx.env.DB);
  } catch {}
  const notice = dbNotice || mockNotice;

  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-navy antialiased flex flex-col min-h-screen">
        {notice.active && (
          <div className="fixed top-0 left-0 right-0 z-[100] bg-red-600 text-white text-center py-2.5 px-6 font-black uppercase tracking-widest text-xs">
            {notice.message}
          </div>
        )}
        <Navbar />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
