import {
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const seoDetails = pgTable("seo_details", {
  id: serial("id").primaryKey(),
  titleEn: varchar("title_en", { length: 500 }).notNull(),
  titleAr: varchar("title_ar", { length: 500 }).notNull(),
  descriptionEn: text("description_en"),
  descriptionAr: text("description_ar"),
  keywordsEn: text("keywords_en").array().default([]),
  keywordsAr: text("keywords_ar").array().default([]),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

// Zod schemas for validation
export const insertSeoDetailSchema = createInsertSchema(seoDetails, {
  titleEn: z.string().min(1).max(500),
  titleAr: z.string().min(1).max(500),
  descriptionEn: z.string().optional(),
  descriptionAr: z.string().optional(),
});

export const selectSeoDetailSchema = createSelectSchema(seoDetails);

// Types
export type SEODetail = typeof seoDetails.$inferSelect;
export type NewSEODetail = typeof seoDetails.$inferInsert;
