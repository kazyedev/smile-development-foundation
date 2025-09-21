import {
  boolean,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const heroSlides = pgTable("hero_slides", {
  id: serial("id").primaryKey(),
  titleEn: varchar("title_en", { length: 500 }).notNull(),
  titleAr: varchar("title_ar", { length: 500 }).notNull(),
  captionEn: text("caption_en").notNull(),
  captionAr: text("caption_ar").notNull(),
  locationEn: varchar("location_en", { length: 255 }),
  locationAr: varchar("location_ar", { length: 255 }),
  featuredImageUrl: varchar("featured_image_url", { length: 1000 }).notNull(),
  linkTextEn: varchar("link_text_en", { length: 100 }),
  linkTextAr: varchar("link_text_ar", { length: 100 }),
  linkUrlEn: varchar("link_url_en", { length: 500 }),
  linkUrlAr: varchar("link_url_ar", { length: 500 }),
  isPublished: boolean("is_published").default(false),
  publishedAt: timestamp("published_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
  slideType: varchar("slide_type", { length: 50 }).default("normal"),
  referenceId: integer("reference_id"),
  sortOrder: integer("sort_order").default(0),
});

// Zod schemas for validation
export const insertHeroSlideSchema = createInsertSchema(heroSlides, {
  titleEn: z.string().min(1).max(500),
  titleAr: z.string().min(1).max(500),
  captionEn: z.string().min(1),
  captionAr: z.string().min(1),
  featuredImageUrl: z.string().url(),
  slideType: z.string().optional(),
  referenceId: z.number().int().positive().optional(),
});

export const selectHeroSlideSchema = createSelectSchema(heroSlides);

// Types
export type HeroSlide = typeof heroSlides.$inferSelect;
export type NewHeroSlide = typeof heroSlides.$inferInsert;
