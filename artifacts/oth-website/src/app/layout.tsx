import "./globals.css";
import Navbar from "@/components/Navbar";
import { emergencyNotice as mockNotice } from "@/lib/config";
import { getEmergencyNotice } from "@/lib/db/queries";
import { getRequestContext, getOptionalRequestContext } from "@/lib/cloudflare-shim";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "The Old Tigers Head | Est. 1750 · Lee, London",
  description: "A historic community pub in Lee, London. Serving fine pub cooking, Sunday roasts, and live jazz since 1750.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let dbNotice = null;
  try {
    const context = getOptionalRequestContext();
    if (context?.env?.DB) {
      dbNotice = await getEmergencyNotice(context.env.DB);
    }
  } catch (e) {
    console.error(e);
  }

  const notice = dbNotice || mockNotice;

  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-navy antialiased">
        {notice.active && (
          <div className="fixed top-0 left-0 right-0 z-[100] bg-red-600 text-white text-center py-3 px-6 font-black uppercase tracking-widest text-sm animate-pulse">
            {notice.message}
          </div>
        )}
        <Navbar />
        {children}
      </body>
    </html>
  );
}
