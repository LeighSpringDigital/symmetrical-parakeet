import Link from "next/link";
import { getOptionalRequestContext } from "@/lib/cloudflare-shim";
import { getMenuItems } from "@/lib/db/queries";
import MenuClient from "./MenuClient";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "Menu | The Old Tiger's Head · Lee Green SE12",
  description: "Food and drinks menu at The Old Tiger's Head. Sunday roasts, pub classics, and a children's menu. Lee Green SE12.",
};

export default async function MenuPage() {
  let items = null;
  try {
    const ctx = getOptionalRequestContext();
    if (ctx?.env?.DB) items = await getMenuItems(ctx.env.DB, "today");
  } catch {}
  return <MenuClient initialItems={items} />;
}
