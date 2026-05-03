"use server";

import { getOptionalRequestContext } from "@cloudflare/next-on-pages";
import { getDb } from "@/lib/db";
import { events, siteSettings, emergencyNotice, menuItems } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

// ── SITE SETTINGS (FEATURE FLAGS) ──────────────────────────

export async function updateSiteSettings(settings: Record<string, any>) {
  const context = getOptionalRequestContext();
  if (!context?.env?.DB) throw new Error("DB not found");
  const db = getDb(context.env.DB);

  for (const [key, value] of Object.entries(settings)) {
    await db
      .insert(siteSettings)
      .values({ key, value: JSON.stringify(value) })
      .onConflictDoUpdate({
        target: siteSettings.key,
        set: { value: JSON.stringify(value) },
      });
  }

  revalidatePath("/");
  revalidatePath("/our-pub");
  revalidatePath("/staff/settings");
  return { success: true };
}

// ── EMERGENCY NOTICE ────────────────────────────────────────

export async function updateEmergencyNotice(data: { active: boolean; message: string; expiry?: string }) {
  const context = getOptionalRequestContext();
  if (!context?.env?.DB) throw new Error("DB not found");
  const db = getDb(context.env.DB);

  await db
    .insert(emergencyNotice)
    .values({ id: 1, ...data })
    .onConflictDoUpdate({
      target: emergencyNotice.id,
      set: data,
    });

  revalidatePath("/");
  revalidatePath("/staff/notice");
  return { success: true };
}

// ── EVENTS ──────────────────────────────────────────────────

export async function saveEvent(data: any) {
  const context = getOptionalRequestContext();
  if (!context?.env?.DB) throw new Error("DB not found");
  const db = getDb(context.env.DB);

  if (data.id && typeof data.id === 'number') {
    await db.update(events).set(data).where(eq(events.id, data.id));
  } else {
    await db.insert(events).values(data);
  }

  revalidatePath("/");
  revalidatePath("/staff/events");
  return { success: true };
}

export async function deleteEvent(id: number) {
  const context = getOptionalRequestContext();
  if (!context?.env?.DB) throw new Error("DB not found");
  const db = getDb(context.env.DB);

  await db.delete(events).where(eq(events.id, id));

  revalidatePath("/");
  revalidatePath("/staff/events");
  return { success: true };
}

// ── MENU ITEMS ──────────────────────────────────────────────

export async function bulkUploadMenu(menuType: string, items: any[]) {
  const context = getOptionalRequestContext();
  if (!context?.env?.DB) throw new Error("DB not found");
  const db = getDb(context.env.DB);

  // Clear existing items for this menu type
  await db.delete(menuItems).where(eq(menuItems.menuType, menuType));

  // Batch insert new items
  if (items.length > 0) {
    await db.insert(menuItems).values(
      items.map(item => ({
        ...item,
        menuType,
        isActive: true
      }))
    );
  }

  revalidatePath("/");
  revalidatePath("/staff/menu");
  return { success: true };
}

// ── MEDIA (R2) ──────────────────────────────────────────────

export async function uploadMedia(formData: FormData) {
  const context = getOptionalRequestContext();
  if (!context?.env?.BUCKET) throw new Error("Bucket not found");
  const file = formData.get("file") as File;
  if (!file) throw new Error("No file provided");

  const filename = `${Date.now()}-${file.name}`;
  const arrayBuffer = await file.arrayBuffer();

  await context.env.BUCKET.put(filename, arrayBuffer, {
    httpMetadata: { contentType: file.type },
  });

  return { success: true, url: `/api/media/${filename}`, filename };
}
