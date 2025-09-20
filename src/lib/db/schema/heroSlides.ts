import {
  boolean,
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
  featuredImageUrl: varchar("featured_image_url", { length: 1000 }).notNull(),
  isPublished: boolean("is_published").default(false),
  publishedAt: timestamp("published_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

// Zod schemas for validation
export const insertHeroSlideSchema = createInsertSchema(heroSlides, {
  titleEn: z.string().min(1).max(500),
  titleAr: z.string().min(1).max(500),
  captionEn: z.string().min(1),
  captionAr: z.string().min(1),
  featuredImageUrl: z.string().url(),
});

export const selectHeroSlideSchema = createSelectSchema(heroSlides);

// Types
export type HeroSlide = typeof heroSlides.$inferSelect;
export type NewHeroSlide = typeof heroSlides.$inferInsert;
