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

export const projectCategories = pgTable("project_categories", {
  id: serial("id").primaryKey(),
  titleEn: varchar("title_en", { length: 500 }).notNull(),
  titleAr: varchar("title_ar", { length: 500 }).notNull(),
  featuredImageUrl: varchar("featured_image_url", { length: 1000 }).notNull(),
  slugEn: varchar("slug_en", { length: 200 }).notNull().unique(),
  slugAr: varchar("slug_ar", { length: 200 }).notNull().unique(),
  descriptionEn: text("description_en"),
  descriptionAr: text("description_ar"),
  keywordsEn: text("keywords_en").array().default([]),
  keywordsAr: text("keywords_ar").array().default([]),
  tagsEn: text("tags_en").array().default([]),
  tagsAr: text("tags_ar").array().default([]),
  pageViews: integer("page_views").default(0),
  isPublished: boolean("is_published").default(false),
  publishedAt: timestamp("published_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

// Zod schemas for validation
export const insertProjectCategorySchema = createInsertSchema(projectCategories, {
  titleEn: z.string().min(1).max(500),
  titleAr: z.string().min(1).max(500),
  featuredImageUrl: z.string().url(),
  slugEn: z.string().min(1).max(200),
  slugAr: z.string().min(1).max(200),
  descriptionEn: z.string().optional(),
  descriptionAr: z.string().optional(),
  pageViews: z.number().int().min(0).optional(),
});

export const selectProjectCategorySchema = createSelectSchema(projectCategories);

// Types
export type ProjectCategory = typeof projectCategories.$inferSelect;
export type NewProjectCategory = typeof projectCategories.$inferInsert;
