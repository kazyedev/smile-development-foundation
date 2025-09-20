import {
  bigint,
  boolean,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { newsCategories } from "./newsCategories";
import { programs } from "./programs";
import { projects } from "./projects";
import { activities } from "./activities";

export const news = pgTable("news", {
  id: serial("id").primaryKey(),
  isEnglish: boolean("is_english").default(false),
  isArabic: boolean("is_arabic").default(false),
  includeInSitemapEn: boolean("include_in_sitemap_en").default(true),
  includeInSitemapAr: boolean("include_in_sitemap_ar").default(true),
  titleEn: varchar("title_en", { length: 500 }).notNull(),
  titleAr: varchar("title_ar", { length: 500 }).notNull(),
  featuredImageUrl: varchar("featured_image_url", { length: 1000 }).notNull(),
  otherImagesUrl: text("other_images_url").array().default([]),
  contentEn: text("content_en").notNull(),
  contentAr: text("content_ar").notNull(),
  categoryId: bigint("category_id", { mode: "number" }).references(() => newsCategories.id, {
    onDelete: "set null",
    onUpdate: "cascade",
  }),
  programId: bigint("program_id", { mode: "number" }).references(() => programs.id, {
    onDelete: "set null",
    onUpdate: "cascade",
  }),
  projectId: bigint("project_id", { mode: "number" }).references(() => projects.id, {
    onDelete: "set null",
    onUpdate: "cascade",
  }),
  activityId: bigint("activity_id", { mode: "number" }).references(() => activities.id, {
    onDelete: "set null",
    onUpdate: "cascade",
  }),
  slugEn: varchar("slug_en", { length: 200 }).notNull().unique(),
  slugAr: varchar("slug_ar", { length: 200 }).notNull().unique(),
  keywordsEn: text("keywords_en").array().default([]),
  keywordsAr: text("keywords_ar").array().default([]),
  tagsEn: text("tags_en").array().default([]),
  tagsAr: text("tags_ar").array().default([]),
  readTime: integer("read_time").default(0),
  pageViews: integer("page_views").default(0),
  authorId: uuid("author_id").notNull(),
  isPublished: boolean("is_published").default(false),
  publishedAt: timestamp("published_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

// Zod schemas for validation
export const insertNewsSchema = createInsertSchema(news, {
  titleEn: z.string().min(1).max(500),
  titleAr: z.string().min(1).max(500),
  contentEn: z.string().min(1),
  contentAr: z.string().min(1),
  slugEn: z.string().min(1).max(200),
  slugAr: z.string().min(1).max(200),
  featuredImageUrl: z.string().url(),
  categoryId: z.number().int().positive().optional(),
  programId: z.number().int().positive().optional(),
  projectId: z.number().int().positive().optional(),
  activityId: z.number().int().positive().optional(),
  readTime: z.number().int().min(0).optional(),
  pageViews: z.number().int().min(0).optional(),
  authorId: z.string().uuid(),
});

export const selectNewsSchema = createSelectSchema(news);

// Types
export type News = typeof news.$inferSelect;
export type NewNews = typeof news.$inferInsert;
