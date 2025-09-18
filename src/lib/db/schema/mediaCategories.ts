import {
  bigint,
  bigserial,
  boolean,
  pgTable,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const mediaCategories = pgTable("media_categories", {
  id: bigserial("id", { mode: "number" }).primaryKey(),
  
  // Language support flags
  isEnglish: boolean("is_english").notNull().default(true),
  isArabic: boolean("is_arabic").notNull().default(true),
  
  // Basic category information
  nameEn: text("name_en").notNull(),
  nameAr: text("name_ar").notNull(),
  slugEn: text("slug_en").notNull().unique(),
  slugAr: text("slug_ar").notNull().unique(),
  descriptionEn: text("description_en"),
  descriptionAr: text("description_ar"),
  
  // Visual elements
  imageUrl: text("image_url"),
  imageAltEn: text("image_alt_en"),
  imageAltAr: text("image_alt_ar"),
  color: text("color").default("#000000"),
  icon: text("icon"),
  
  // Metrics and analytics
  pageViews: bigint("page_views", { mode: "number" }).default(0),
  
  // Publishing status
  isPublished: boolean("is_published").default(false),
  publishedAt: timestamp("published_at", { withTimezone: true }),
  
  // Timestamps
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

// Zod schemas for validation
export const insertMediaCategorySchema = createInsertSchema(mediaCategories, {
  nameEn: z.string().min(1),
  nameAr: z.string().min(1),
  slugEn: z.string().min(1),
  slugAr: z.string().min(1),
  imageUrl: z.string().url().optional(),
  color: z.string().regex(/^#[0-9A-F]{6}$/i).optional(),
});

export const selectMediaCategorySchema = createSelectSchema(mediaCategories);

// Types
export type MediaCategory = typeof mediaCategories.$inferSelect;
export type NewMediaCategory = typeof mediaCategories.$inferInsert;
