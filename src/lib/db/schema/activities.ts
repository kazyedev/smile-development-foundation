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
import { programs } from "./programs";
import { projects } from "./projects";

export const activities = pgTable("activities", {
  id: serial("id").primaryKey(),
  isArabic: boolean("is_arabic").default(false),
  isEnglish: boolean("is_english").default(false),
  titleEn: varchar("title_en", { length: 500 }).notNull(),
  titleAr: varchar("title_ar", { length: 500 }).notNull(),
  featuredImageUrl: varchar("featured_image_url", { length: 1000 }).notNull(),
  date: timestamp("date", { withTimezone: true }),
  contentEn: text("content_en").notNull(),
  contentAr: text("content_ar").notNull(),
  otherImagesUrl: text("other_images_url").array().default([]),
  programId: bigint("program_id", { mode: "number" }).notNull().references(() => programs.id, {
    onDelete: "cascade",
    onUpdate: "cascade",
  }),
  projectId: bigint("project_id", { mode: "number" }).references(() => projects.id, {
    onDelete: "set null",
    onUpdate: "cascade",
  }),
  slugEn: varchar("slug_en", { length: 200 }).notNull().unique(),
  slugAr: varchar("slug_ar", { length: 200 }).notNull().unique(),
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
export const insertActivitySchema = createInsertSchema(activities, {
  titleEn: z.string().min(1).max(500),
  titleAr: z.string().min(1).max(500),
  contentEn: z.string().min(1),
  contentAr: z.string().min(1),
  slugEn: z.string().min(1).max(200),
  slugAr: z.string().min(1).max(200),
  featuredImageUrl: z.string().url(),
  programId: z.number().int().positive(),
  projectId: z.number().int().positive().optional(),
});

export const selectActivitySchema = createSelectSchema(activities);

// Types
export type Activity = typeof activities.$inferSelect;
export type NewActivity = typeof activities.$inferInsert;
