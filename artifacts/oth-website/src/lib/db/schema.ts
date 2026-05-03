import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const events = sqliteTable("events", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  date: text("date").notNull(),
  time: text("time"),
  description: text("description").notNull(),
  price: text("price"),
  imageUrl: text("image_url"),
  bookingUrl: text("booking_url"),
  isActive: integer("is_active", { mode: "boolean" }).default(true),
});

export const menuItems = sqliteTable("menu_items", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  section: text("section").notNull(), // e.g., "Starters", "Mains"
  name: text("name").notNull(),
  description: text("description"),
  price: text("price"),
  menuType: text("menu_type").notNull(), // "today", "sunday", "kids"
  isActive: integer("is_active", { mode: "boolean" }).default(true),
});

export const staffProfiles = sqliteTable("staff_profiles", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  role: text("role").notNull(),
  note: text("note"),
  imageUrl: text("image_url"),
  displayOrder: integer("display_order").default(0),
});

export const siteSettings = sqliteTable("site_settings", {
  key: text("key").primaryKey(),
  value: text("value").notNull(), // JSON string for complex objects
});

export const emergencyNotice = sqliteTable("emergency_notice", {
  id: integer("id").primaryKey(), // We'll just use ID 1
  active: integer("active", { mode: "boolean" }).default(false),
  message: text("message"),
  expiry: text("expiry"), // ISO string
});

// Zod schemas for validation
export const insertEventSchema = createInsertSchema(events);
export const selectEventSchema = createSelectSchema(events);
export const insertMenuItemSchema = createInsertSchema(menuItems);
export const selectMenuItemSchema = createSelectSchema(menuItems);
export const insertStaffSchema = createInsertSchema(staffProfiles);
export const selectStaffSchema = createSelectSchema(staffProfiles);
