import {
  bigint,
  bigserial,
  boolean,
  integer,
  pgTable,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { mediaCategories } from "./mediaCategories";

export const videos = pgTable("videos", {
  id: bigserial("id", { mode: "number" }).primaryKey(),
  
  // Basic video information
  titleEn: text("title_en").notNull(),
  titleAr: text("title_ar").notNull(),
  descriptionEn: text("description_en"),
  descriptionAr: text("description_ar"),
  
  // Technical video properties
  mimeType: text("mime_type").notNull().default("video/mp4"),
  size: bigint("size", { mode: "number" }).notNull(), // File size in bytes
  width: integer("width").notNull(),
  height: integer("height").notNull(),
  url: text("url").notNull(),
  
  // Location information
  locationEn: text("location_en"),
  locationAr: text("location_ar"),
  
  // Visibility and categorization
  isPublic: boolean("is_public").notNull().default(true),
  categoryId: bigint("category_id", { mode: "number" }).references(() => mediaCategories.id, {
    onDelete: "set null",
    onUpdate: "cascade",
  }),
  
  // SEO and navigation
  slugEn: text("slug_en").notNull().unique(),
  slugAr: text("slug_ar").notNull().unique(),
  keywordsEn: text("keywords_en").array().default([]),
  keywordsAr: text("keywords_ar").array().default([]),
  tagsEn: text("tags_en").array().default([]),
  tagsAr: text("tags_ar").array().default([]),
  
  // Metrics and analytics
  views: bigint("views", { mode: "number" }).default(0),
  
  // Publishing status
  isPublished: boolean("is_published").default(false),
  publishedAt: timestamp("published_at", { withTimezone: true }),
  
  // Timestamps
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

// Zod schemas for validation
export const insertVideoSchema = createInsertSchema(videos, {
  titleEn: z.string().min(1),
  titleAr: z.string().min(1),
  mimeType: z.string().regex(/^video\//),
  size: z.number().min(1),
  width: z.number().min(1),
  height: z.number().min(1),
  url: z.string().url(),
  slugEn: z.string().min(1),
  slugAr: z.string().min(1),
  keywordsEn: z.array(z.string()).optional(),
  keywordsAr: z.array(z.string()).optional(),
  tagsEn: z.array(z.string()).optional(),
  tagsAr: z.array(z.string()).optional(),
});

export const selectVideoSchema = createSelectSchema(videos);

// Types
export type Video = typeof videos.$inferSelect;
export type NewVideo = typeof videos.$inferInsert;
