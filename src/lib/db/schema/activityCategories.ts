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

export const activityCategories = pgTable("activity_categories", {
  id: serial("id").primaryKey(),
  nameEn: varchar("name_en", { length: 255 }).notNull(),
  nameAr: varchar("name_ar", { length: 255 }).notNull(),
  slugEn: varchar("slug_en", { length: 255 }).notNull().unique(),
  slugAr: varchar("slug_ar", { length: 255 }).notNull().unique(),
  descriptionEn: text("description_en"),
  descriptionAr: text("description_ar"),
  color: varchar("color", { length: 7 }).default("#000000"),
  icon: varchar("icon", { length: 255 }),
  pageViews: integer("page_views").default(0),
  isPublished: boolean("is_published").default(false),
  publishedAt: timestamp("published_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

// Zod schemas for validation
export const insertActivityCategorySchema = createInsertSchema(activityCategories, {
  nameEn: z.string().min(1).max(255),
  nameAr: z.string().min(1).max(255),
  slugEn: z.string().min(1).max(255),
  slugAr: z.string().min(1).max(255),
  color: z.string().regex(/^#[0-9A-F]{6}$/i).optional(),
  pageViews: z.number().int().min(0).optional(),
});

export const selectActivityCategorySchema = createSelectSchema(activityCategories);

export const updateActivityCategorySchema = insertActivityCategorySchema.partial().omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// Types
export type ActivityCategory = typeof activityCategories.$inferSelect;
export type NewActivityCategory = typeof activityCategories.$inferInsert;
export type UpdateActivityCategory = z.infer<typeof updateActivityCategorySchema>;
