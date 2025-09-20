import {
  bigint,
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

export const reports = pgTable("reports", {
  id: serial("id").primaryKey(),
  isEnglish: boolean("is_english").default(false),
  isArabic: boolean("is_arabic").default(false),
  titleEn: varchar("title_en", { length: 500 }).notNull(),
  titleAr: varchar("title_ar", { length: 500 }).notNull(),
  descriptionEn: text("description_en"),
  descriptionAr: text("description_ar"),
  url: varchar("url", { length: 1000 }).notNull(),
  categoryId: bigint("category_id", { mode: "number" }),
  featuredImageUrl: varchar("featured_image_url", { length: 1000 }),
  slugEn: varchar("slug_en", { length: 200 }).notNull().unique(),
  slugAr: varchar("slug_ar", { length: 200 }).notNull().unique(),
  keywordsEn: text("keywords_en").array().default([]),
  keywordsAr: text("keywords_ar").array().default([]),
  tagsEn: text("tags_en").array().default([]),
  tagsAr: text("tags_ar").array().default([]),
  downloads: integer("downloads").default(0),
  isPublished: boolean("is_published").default(false),
  publishedAt: timestamp("published_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

// Zod schemas for validation
export const insertReportSchema = createInsertSchema(reports, {
  titleEn: z.string().min(1).max(500),
  titleAr: z.string().min(1).max(500),
  descriptionEn: z.string().optional(),
  descriptionAr: z.string().optional(),
  url: z.string().url(),
  categoryId: z.number().int().positive().optional(),
  featuredImageUrl: z.string().url().optional(),
  slugEn: z.string().min(1).max(200),
  slugAr: z.string().min(1).max(200),
  downloads: z.number().int().min(0).optional(),
});

export const selectReportSchema = createSelectSchema(reports);

// Types
export type Report = typeof reports.$inferSelect;
export type NewReport = typeof reports.$inferInsert;
