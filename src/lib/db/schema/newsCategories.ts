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

export const newsCategories = pgTable("news_categories", {
  id: serial("id").primaryKey(),
  nameEn: varchar("name_en", { length: 200 }).notNull(),
  nameAr: varchar("name_ar", { length: 200 }).notNull(),
  slugEn: varchar("slug_en", { length: 200 }).notNull().unique(),
  slugAr: varchar("slug_ar", { length: 200 }).notNull().unique(),
  descriptionEn: text("description_en"),
  descriptionAr: text("description_ar"),
  color: varchar("color", { length: 20 }),
  icon: varchar("icon", { length: 100 }),
  pageViews: integer("page_views").default(0),
  isPublished: boolean("is_published").default(false),
  publishedAt: timestamp("published_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

// Zod schemas for validation
export const insertNewsCategorySchema = createInsertSchema(newsCategories, {
  nameEn: z.string().min(1).max(200),
  nameAr: z.string().min(1).max(200),
  slugEn: z.string().min(1).max(200),
  slugAr: z.string().min(1).max(200),
  descriptionEn: z.string().optional(),
  descriptionAr: z.string().optional(),
  color: z.string().max(20).optional(),
  icon: z.string().max(100).optional(),
  pageViews: z.number().int().min(0).optional(),
});

export const selectNewsCategorySchema = createSelectSchema(newsCategories);

// Types
export type NewsCategory = typeof newsCategories.$inferSelect;
export type NewNewsCategory = typeof newsCategories.$inferInsert;
