import "./globals.css";
import Navbar from "@/components/Navbar";
import { emergencyNotice as mockNotice } from "@/lib/config";
import { getEmergencyNotice } from "@/lib/db/queries";
import { getOptionalRequestContext } from "@/lib/cloudflare-shim";

export const dynamic = "force-dynamic";

export const metadata = {
  title: {
    template: "%s | The Old Tiger's Head · Lee Green",
    default: "The Old Tiger's Head | Pub in Lee Green, London SE12",
  },
  description: "A historic community pub in Lee Green, London SE12. Sunday roasts, beer garden, live events, and private hire. Established 1750. Grade II listed.",
  keywords: ["pub Lee Green", "Sunday roast SE12", "beer garden Lee Green", "private hire Lewisham", "pub SE12", "Lee Green pub", "community pub Lee"],
  openGraph: {
    title: "The Old Tiger's Head | Lee Green, London",
    description: "A Grade II listed community pub in Lee Green, SE12. Sunday roasts, beer garden, live events, and private hire. Est. 1750.",
    url: "https://theoldtigershead.com",
    siteName: "The Old Tiger's Head",
    images: [{ url: "/opengraph.jpg", width: 1200, height: 630, alt: "The Old Tiger's Head, Lee Green" }],
    locale: "en_GB",
    type: "website",
  },
  other: {
    "application/ld+json": JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BarOrPub",
      "name": "The Old Tiger's Head",
      "description": "A Grade II listed community pub in Lee Green, established 1750.",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "351 Lee High Road",
        "addressLocality": "London",
        "postalCode": "SE12 8RU",
        "addressCountry": "GB"
      },
      "telephone": "+442045680111",
      "email": "enquiries@theoldtigershead.com",
      "url": "https://theoldtigershead.com",
      "geo": { "@type": "GeoCoordinates", "latitude": 51.4537, "longitude": -0.0163 },
      "openingHoursSpecification": [
        { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday"], "opens": "12:00", "closes": "23:00" },
        { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Friday","Saturday"], "opens": "12:00", "closes": "00:00" },
        { "@type": "OpeningHoursSpecification", "dayOfWeek": "Sunday", "opens": "12:00", "closes": "22:00" }
      ],
      "servesCuisine": "British",
      "priceRange": "££",
      "hasMap": "https://maps.google.com/?q=351+Lee+High+Road+London+SE12+8RU",
      "image": "/opengraph.jpg",
    })
  }
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  let dbNotice = null;
  try {
    const context = getOptionalRequestContext();
    if (context?.env?.DB) dbNotice = await getEmergencyNotice(context.env.DB);
  } catch (e) { console.error(e); }

  const notice = dbNotice || mockNotice;

  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-navy antialiased">
        {notice.active && (
          <div className="fixed top-0 left-0 right-0 z-[100] bg-red-600 text-white text-center py-3 px-6 font-black uppercase tracking-widest text-sm">
            {notice.message}
          </div>
        )}
        <Navbar />
        {children}
      </body>
    </html>
  );
}
