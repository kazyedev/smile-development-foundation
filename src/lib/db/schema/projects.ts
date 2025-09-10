import { pgTable, text, timestamp, uuid, boolean, integer, jsonb, pgArray } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { z } from 'zod';

export const projects = pgTable('projects', {
  id: integer('id').primaryKey().generatedAsIdentity(),
  isEnglish: boolean('is_english').notNull().default(true),
  isArabic: boolean('is_arabic').notNull().default(true),
  titleEn: text('title_en').notNull(),
  titleAr: text('title_ar').notNull(),
  descriptionEn: text('description_en').notNull(),
  descriptionAr: text('description_ar').notNull(),
  featuredImageUrl: text('featured_image_url').notNull(),
  color: text('color').notNull(),
  banners: jsonb('banners').notNull().default([]),
  goalsEn: text('goals_en').array().default([]),
  goalsAr: text('goals_ar').array().default([]),
  videoUrl: text('video_url'),
  statics: jsonb('statics').notNull().default([]),
  fundingProviders: jsonb('funding_providers').notNull().default([]),
  donors: jsonb('donors').notNull().default([]),
  partners: jsonb('partners').notNull().default([]),
  deliverables: jsonb('deliverables').notNull().default([]),
  resources: jsonb('resources').notNull().default([]),
  slugEn: text('slug_en').notNull().unique(),
  slugAr: text('slug_ar').notNull().unique(),
  keywordsEn: text('keywords_en').array().default([]),
  keywordsAr: text('keywords_ar').array().default([]),
  tagsEn: text('tags_en').array().default([]),
  tagsAr: text('tags_ar').array().default([]),
  pageViews: integer('page_views').notNull().default(0),
  programId: integer('program_id').notNull(),
  categoryId: integer('category_id').notNull(),
  activityIds: integer('activity_ids').array().default([]),
  isPublished: boolean('is_published').notNull().default(false),
  publishedAt: timestamp('published_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const projectsRelations = relations(projects, ({ one }) => ({}));

export const insertProjectSchema = z.object({
  isEnglish: z.boolean().optional(),
  isArabic: z.boolean().optional(),
  titleEn: z.string().min(1),
  titleAr: z.string().min(1),
  descriptionEn: z.string().min(1),
  descriptionAr: z.string().min(1),
  featuredImageUrl: z.string().min(1),
  color: z.string().min(1),
  banners: z.array(z.object({
    titleEn: z.string(),
    titleAr: z.string(),
    imageUrl: z.string(),
  })).optional(),
  goalsEn: z.array(z.string()).optional(),
  goalsAr: z.array(z.string()).optional(),
  videoUrl: z.string().optional(),
  statics: z.array(z.object({
    icon: z.string(),
    titleEn: z.string(),
    titleAr: z.string(),
    value: z.number(),
    unitEn: z.string(),
    unitAr: z.string(),
  })).optional(),
  fundingProviders: z.array(z.object({
    nameEn: z.string(),
    nameAr: z.string(),
    imageUrl: z.string(),
  })).optional(),
  donors: z.array(z.object({
    nameEn: z.string(),
    nameAr: z.string(),
    imageUrl: z.string(),
  })).optional(),
  partners: z.array(z.object({
    nameEn: z.string(),
    nameAr: z.string(),
    imageUrl: z.string(),
  })).optional(),
  deliverables: z.array(z.object({
    titleEn: z.string(),
    titleAr: z.string(),
    value: z.string(),
    unitEn: z.string(),
    unitAr: z.string(),
  })).optional(),
  resources: z.array(z.object({
    titleEn: z.string(),
    titleAr: z.string(),
    image: z.string(),
  })).optional(),
  slugEn: z.string().min(1),
  slugAr: z.string().min(1),
  keywordsEn: z.array(z.string()).optional(),
  keywordsAr: z.array(z.string()).optional(),
  tagsEn: z.array(z.string()).optional(),
  tagsAr: z.array(z.string()).optional(),
  pageViews: z.number().optional(),
  programId: z.number(),
  categoryId: z.number(),
  activityIds: z.array(z.number()).optional(),
  isPublished: z.boolean().optional(),
  publishedAt: z.date().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export const selectProjectSchema = insertProjectSchema.extend({
  id: z.number(),
});

export type InsertProject = z.infer<typeof insertProjectSchema>;
export type SelectProject = z.infer<typeof selectProjectSchema>;
