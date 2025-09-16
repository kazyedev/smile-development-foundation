import {
  boolean,
  integer,
  jsonb,
  pgTable,
  serial,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

// JSON Schema types for complex fields
export const StaticSchema = z.object({
  icon: z.string().optional(),
  titleEn: z.string(),
  titleAr: z.string(),
  value: z.number(),
  unitEn: z.string().optional(),
  unitAr: z.string().optional(),
});

export const ProviderDonorPartnerSchema = z.object({
  nameEn: z.string(),
  nameAr: z.string(),
  imageUrl: z.string(),
});

export const SlideSchema = z.object({
  titleEn: z.string(),
  titleAr: z.string(),
  imageUrl: z.string(),
});

export const programs = pgTable("programs", {
  id: serial("id").primaryKey(),
  titleEn: varchar("title_en", { length: 500 }).notNull(),
  titleAr: varchar("title_ar", { length: 500 }).notNull(),
  descriptionEn: text("description_en").notNull(),
  descriptionAr: text("description_ar").notNull(),
  aboutEn: text("about_en"),
  aboutAr: text("about_ar"),
  goalsEn: text("goals_en").array(),
  goalsAr: text("goals_ar").array(),
  statics: jsonb("statics").$type<z.infer<typeof StaticSchema>[]>().default([]),
  icon: varchar("icon", { length: 100 }),
  color: varchar("color", { length: 20 }),
  implementationLocationEn: varchar("implementation_location_en", { length: 500 }),
  implementationLocationAr: varchar("implementation_location_ar", { length: 500 }),
  fundingProviders: jsonb("funding_providers").$type<z.infer<typeof ProviderDonorPartnerSchema>[]>().default([]),
  donors: jsonb("donors").$type<z.infer<typeof ProviderDonorPartnerSchema>[]>().default([]),
  partners: jsonb("partners").$type<z.infer<typeof ProviderDonorPartnerSchema>[]>().default([]),
  featuredImageUrl: varchar("featured_image_url", { length: 1000 }),
  slides: jsonb("slides").$type<z.infer<typeof SlideSchema>[]>().default([]),
  slugEn: varchar("slug_en", { length: 200 }).notNull().unique(),
  slugAr: varchar("slug_ar", { length: 200 }).notNull().unique(),
  keywordsEn: text("keywords_en").array(),
  keywordsAr: text("keywords_ar").array(),
  tagsEn: text("tags_en").array(),
  tagsAr: text("tags_ar").array(),
  includeInSitemapEn: boolean("include_in_sitemap_en").default(true),
  includeInSitemapAr: boolean("include_in_sitemap_ar").default(true),
  pageViews: integer("page_views").default(0),
  createdBy: uuid("created_by"),
  isPublished: boolean("is_published").default(false),
  publishedAt: timestamp("published_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

// Zod schemas for validation
export const insertProgramSchema = createInsertSchema(programs, {
  titleEn: z.string().min(1).max(500),
  titleAr: z.string().min(1).max(500),
  descriptionEn: z.string().min(1),
  descriptionAr: z.string().min(1),
  slugEn: z.string().min(1).max(200),
  slugAr: z.string().min(1).max(200),
  statics: z.array(StaticSchema).optional(),
  fundingProviders: z.array(ProviderDonorPartnerSchema).optional(),
  donors: z.array(ProviderDonorPartnerSchema).optional(),
  partners: z.array(ProviderDonorPartnerSchema).optional(),
  slides: z.array(SlideSchema).optional(),
});

export const selectProgramSchema = createSelectSchema(programs);

// Types
export type Program = typeof programs.$inferSelect;
export type NewProgram = typeof programs.$inferInsert;
export type ProgramStatic = z.infer<typeof StaticSchema>;
export type ProgramProviderDonorPartner = z.infer<typeof ProviderDonorPartnerSchema>;
export type ProgramSlide = z.infer<typeof SlideSchema>;
