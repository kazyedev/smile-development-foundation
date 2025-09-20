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
import { programs } from "./programs";
import { projects } from "./projects";
import { activities } from "./activities";

export const publications = pgTable("publications", {
  id: serial("id").primaryKey(),
  isEnglish: boolean("is_english").default(false),
  isArabic: boolean("is_arabic").default(false),
  titleEn: varchar("title_en", { length: 500 }).notNull(),
  titleAr: varchar("title_ar", { length: 500 }).notNull(),
  descriptionEn: text("description_en"),
  descriptionAr: text("description_ar"),
  url: varchar("url", { length: 1000 }).notNull(),
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
  categoryId: bigint("category_id", { mode: "number" }),
  featuredImageUrl: varchar("featured_image_url", { length: 1000 }),
  coverImageUrl: varchar("cover_image_url", { length: 1000 }),
  attachmentUrl: varchar("attachment_url", { length: 1000 }),
  contentEn: text("content_en"),
  contentAr: text("content_ar"),
  authorEn: varchar("author_en", { length: 255 }),
  authorAr: varchar("author_ar", { length: 255 }),
  slugEn: varchar("slug_en", { length: 200 }).notNull().unique(),
  slugAr: varchar("slug_ar", { length: 200 }).notNull().unique(),
  keywordsEn: text("keywords_en").array().default([]),
  keywordsAr: text("keywords_ar").array().default([]),
  tagsEn: text("tags_en").array().default([]),
  tagsAr: text("tags_ar").array().default([]),
  pageViews: integer("page_views").default(0),
  downloads: integer("downloads").default(0),
  isPublished: boolean("is_published").default(false),
  publishedAt: timestamp("published_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

// Zod schemas for validation
export const insertPublicationSchema = createInsertSchema(publications, {
  titleEn: z.string().min(1).max(500),
  titleAr: z.string().min(1).max(500),
  descriptionEn: z.string().optional(),
  descriptionAr: z.string().optional(),
  url: z.string().url(),
  programId: z.number().int().positive().optional(),
  projectId: z.number().int().positive().optional(),
  activityId: z.number().int().positive().optional(),
  categoryId: z.number().int().positive().optional(),
  featuredImageUrl: z.string().url().optional(),
  coverImageUrl: z.string().url().optional(),
  attachmentUrl: z.string().url().optional(),
  contentEn: z.string().optional(),
  contentAr: z.string().optional(),
  authorEn: z.string().max(255).optional(),
  authorAr: z.string().max(255).optional(),
  slugEn: z.string().min(1).max(200),
  slugAr: z.string().min(1).max(200),
  pageViews: z.number().int().min(0).optional(),
  downloads: z.number().int().min(0).optional(),
});

export const selectPublicationSchema = createSelectSchema(publications);

// Types
export type Publication = typeof publications.$inferSelect;
export type NewPublication = typeof publications.$inferInsert;
