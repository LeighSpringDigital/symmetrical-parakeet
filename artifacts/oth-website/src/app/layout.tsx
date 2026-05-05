import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { emergencyNotice as mockNotice } from "@/lib/config";
import { getEmergencyNotice } from "@/lib/db/queries";
import { getOptionalRequestContext } from "@/lib/cloudflare-shim";

export const dynamic = "force-dynamic";

export const metadata = {
  title: { template: "%s | The Old Tiger's Head", default: "The Old Tiger's Head | Pub in Lee Green, London SE12" },
  description: "A Grade II listed pub at the heart of Lee Green, London SE12. Sunday roasts, beer garden, private hire and live events. Established 1750. Book a table today.",
  keywords: [
    "pub Lee Green", "Sunday roast SE12", "Sunday roast Lee Green", "beer garden Lee Green",
    "private hire Lewisham", "pub SE12 8RU", "Lee Green pub", "family pub Lee Green",
    "dog friendly pub Lee Green", "pub near Blackheath", "Lee High Road pub",
    "private dining Lewisham", "Tiger Room hire", "pub quiz Lee Green",
    "Grade II listed pub London", "historic pub SE12"
  ],
  openGraph: {
    title: "The Old Tiger's Head | Lee Green, London SE12",
    description: "Grade II listed pub in Lee Green, SE12. Sunday roasts, beer garden, private hire. Est. 1750.",
    images: [{ url: "/opengraph.jpg", width: 1200, height: 630 }],
    locale: "en_GB", type: "website",
    siteName: "The Old Tiger's Head",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Old Tiger's Head | Lee Green",
    description: "Grade II listed pub in Lee Green, SE12. Sunday roasts, beer garden, private hire. Est. 1750.",
    images: ["/opengraph.jpg"],
  },
  alternates: { canonical: "https://www.theoldtigershead.com" },
  robots: { index: true, follow: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "BarOrPub",
  "name": "The Old Tiger's Head",
  "alternateName": "Old Tigers Head",
  "url": "https://www.theoldtigershead.com",
  "telephone": "02045680111",
  "email": "enquiries@theoldtigershead.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "351 Lee High Road",
    "addressLocality": "London",
    "postalCode": "SE12 8RU",
    "addressCountry": "GB"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 51.4583,
    "longitude": 0.0076
  },
  "openingHoursSpecification": [
    { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday"], "opens": "12:00", "closes": "23:00" },
    { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Friday","Saturday"], "opens": "12:00", "closes": "00:00" },
    { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Sunday"], "opens": "12:00", "closes": "22:00" }
  ],
  "servesCuisine": "British",
  "priceRange": "££",
  "menu": "https://www.theoldtigershead.com/menu",
  "acceptsReservations": true,
  "description": "A Grade II listed pub at the heart of Lee Green since 1750. Sunday roasts, beer garden, private hire and live events.",
  "image": "https://www.theoldtigershead.com/opengraph.jpg",
  "sameAs": [
    "https://www.instagram.com/theoldtigershead",
    "https://www.facebook.com/theoldtigershead"
  ]
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
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
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
