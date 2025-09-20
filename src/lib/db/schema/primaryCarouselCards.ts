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

export const primaryCarouselCards = pgTable("primary_carousel_cards", {
  id: serial("id").primaryKey(),
  titleEn: varchar("title_en", { length: 255 }).notNull(),
  titleAr: varchar("title_ar", { length: 255 }).notNull(),
  descriptionEn: text("description_en"),
  descriptionAr: text("description_ar"),
  locationEn: varchar("location_en", { length: 255 }),
  locationAr: varchar("location_ar", { length: 255 }),
  imageUrl: varchar("image_url", { length: 500 }).notNull(),
  linkEn: varchar("link_en", { length: 500 }),
  linkAr: varchar("link_ar", { length: 500 }),
  isPublished: boolean("is_published").default(false),
  publishedAt: timestamp("published_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

// Zod schemas for validation
export const insertPrimaryCarouselCardSchema = createInsertSchema(primaryCarouselCards, {
  titleEn: z.string().min(1).max(255),
  titleAr: z.string().min(1).max(255),
  imageUrl: z.string().url().max(500),
  linkEn: z.string().url().max(500).optional(),
  linkAr: z.string().url().max(500).optional(),
  locationEn: z.string().max(255).optional(),
  locationAr: z.string().max(255).optional(),
});

export const selectPrimaryCarouselCardSchema = createSelectSchema(primaryCarouselCards);

export const updatePrimaryCarouselCardSchema = insertPrimaryCarouselCardSchema.partial().omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// Types
export type PrimaryCarouselCard = typeof primaryCarouselCards.$inferSelect;
export type NewPrimaryCarouselCard = typeof primaryCarouselCards.$inferInsert;
export type UpdatePrimaryCarouselCard = z.infer<typeof updatePrimaryCarouselCardSchema>;
