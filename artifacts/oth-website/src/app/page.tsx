import HomeClient from "@/components/HomeClient";
import { getEvents, getSiteSettings } from "@/lib/db/queries";
import { getOptionalRequestContext } from "@/lib/cloudflare-shim";

export const dynamic = "force-dynamic";

export default async function Home() {
  let dbEvents = null;
  let dbSettings = null;
  
  try {
    const context = getOptionalRequestContext();
    if (context?.env?.DB) {
      dbEvents = await getEvents(context.env.DB);
      dbSettings = await getSiteSettings(context.env.DB);
    }
  } catch (e) {
    console.error("Failed to fetch data from D1:", e);
  }

  return <HomeClient initialEvents={dbEvents} settings={dbSettings} />;
}
