import { getDb } from "./index";
import { events, menuItems, siteSettings, emergencyNotice } from "./schema";
import { eq } from "drizzle-orm";

export async function getEvents(d1: D1Database) {
  try {
    const db = getDb(d1);
    return await db.select().from(events).where(eq(events.isActive, true));
  } catch (e) {
    console.error("D1 Fetch Error (Events):", e);
    return null; // Fallback to mock data in UI
  }
}

export async function getMenuItems(d1: D1Database, type: string) {
  try {
    const db = getDb(d1);
    return await db.select().from(menuItems).where(eq(menuItems.menuType, type));
  } catch (e) {
    console.error("D1 Fetch Error (Menu):", e);
    return null;
  }
}

export async function getSiteSettings(d1: D1Database) {
  try {
    const db = getDb(d1);
    const settings = await db.select().from(siteSettings);
    return settings.reduce((acc, curr) => {
      acc[curr.key] = JSON.parse(curr.value);
      return acc;
    }, {} as Record<string, any>);
  } catch (e) {
    console.error("D1 Fetch Error (Settings):", e);
    return null;
  }
}

export async function getEmergencyNotice(d1: D1Database) {
  try {
    const db = getDb(d1);
    const notice = await db.select().from(emergencyNotice).where(eq(emergencyNotice.id, 1)).get();
    return notice;
  } catch (e) {
    console.error("D1 Fetch Error (Notice):", e);
    return null;
  }
}
