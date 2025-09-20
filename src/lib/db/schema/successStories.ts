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

export const successStories = pgTable("success_stories", {
  id: serial("id").primaryKey(),
  isEnglish: boolean("is_english").default(false),
  isArabic: boolean("is_arabic").default(false),
  titleEn: varchar("title_en", { length: 500 }).notNull(),
  titleAr: varchar("title_ar", { length: 500 }).notNull(),
  featuredImageUrl: varchar("featured_image_url", { length: 1000 }).notNull(),
  video: varchar("video", { length: 1000 }).notNull(),
  programId: bigint("program_id", { mode: "number" }).references(() => programs.id, {
    onDelete: "set null",
    onUpdate: "cascade",
  }),
  personNameEn: varchar("person_name_en", { length: 200 }).notNull(),
  personNameAr: varchar("person_name_ar", { length: 200 }).notNull(),
  personAge: integer("person_age").notNull(),
  personLocationEn: varchar("person_location_en", { length: 200 }).notNull(),
  personLocationAr: varchar("person_location_ar", { length: 200 }).notNull(),
  cityEn: varchar("city_en", { length: 200 }).notNull(),
  cityAr: varchar("city_ar", { length: 200 }).notNull(),
  otherImagesUrl: text("other_images_url").array().default([]),
  contentEn: text("content_en").notNull(),
  contentAr: text("content_ar").notNull(),
  slugEn: varchar("slug_en", { length: 200 }).notNull().unique(),
  slugAr: varchar("slug_ar", { length: 200 }).notNull().unique(),
  keywordsEn: text("keywords_en").array().default([]),
  keywordsAr: text("keywords_ar").array().default([]),
  tagsEn: text("tags_en").array().default([]),
  tagsAr: text("tags_ar").array().default([]),
  readTime: integer("read_time").default(0),
  pageViews: integer("page_views").default(0),
  isPublished: boolean("is_published").default(false),
  publishedAt: timestamp("published_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

// Zod schemas for validation
export const insertSuccessStorySchema = createInsertSchema(successStories, {
  titleEn: z.string().min(1).max(500),
  titleAr: z.string().min(1).max(500),
  featuredImageUrl: z.string().url(),
  video: z.string().url(),
  programId: z.number().int().positive().optional(),
  personNameEn: z.string().min(1).max(200),
  personNameAr: z.string().min(1).max(200),
  personAge: z.number().int().positive(),
  personLocationEn: z.string().min(1).max(200),
  personLocationAr: z.string().min(1).max(200),
  cityEn: z.string().min(1).max(200),
  cityAr: z.string().min(1).max(200),
  contentEn: z.string().min(1),
  contentAr: z.string().min(1),
  slugEn: z.string().min(1).max(200),
  slugAr: z.string().min(1).max(200),
  readTime: z.number().int().min(0).optional(),
  pageViews: z.number().int().min(0).optional(),
});

export const selectSuccessStorySchema = createSelectSchema(successStories);

// Types
export type SuccessStory = typeof successStories.$inferSelect;
export type NewSuccessStory = typeof successStories.$inferInsert;
