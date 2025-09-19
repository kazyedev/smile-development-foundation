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

export const images = pgTable("images", {
  id: bigserial("id", { mode: "number" }).primaryKey(),
  
  // Basic image information
  titleEn: text("title_en").notNull(),
  titleAr: text("title_ar").notNull(),
  descriptionEn: text("description_en"),
  descriptionAr: text("description_ar"),
  
  // Technical image properties
  mimeType: text("mime_type").notNull().default("image/jpeg"),
  size: bigint("size", { mode: "number" }).notNull(), // File size in bytes
  width: integer("width").notNull(),
  height: integer("height").notNull(),
  url: text("url").notNull(),
  alt: text("alt"), // Alt text for accessibility
  
  // Location information
  locationEn: text("location_en"),
  locationAr: text("location_ar"),
  takenAt: timestamp("taken_at", { withTimezone: true }), // When the photo was taken
  photographer: text("photographer"), // Who took the photo
  
  // Visibility and categorization
  isPublic: boolean("is_public").notNull().default(true),
  programId: integer("program_id"),
  projectId: bigint("project_id", { mode: "number" }),
  activityId: bigint("activity_id", { mode: "number" }),
  categoryId: bigint("category_id", { mode: "number" }),
  
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
export const insertImageSchema = createInsertSchema(images, {
  titleEn: z.string().min(1),
  titleAr: z.string().min(1),
  mimeType: z.string().regex(/^image\//),
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

export const selectImageSchema = createSelectSchema(images);

// Types
export type Image = typeof images.$inferSelect;
export type NewImage = typeof images.$inferInsert;
