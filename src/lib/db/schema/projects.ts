import {
  bigint,
  bigserial,
  boolean,
  jsonb,
  pgTable,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { programs } from "./programs";
import { projectCategories } from "./projectCategories";

// JSON Schema types for complex fields
export const BannerSchema = z.object({
  titleEn: z.string(),
  titleAr: z.string(),
  imageUrl: z.string(),
});

export const ProjectStaticSchema = z.object({
  icon: z.string(),
  titleEn: z.string(),
  titleAr: z.string(),
  value: z.number(),
  unitEn: z.string(),
  unitAr: z.string(),
});

export const ProjectProviderDonorPartnerSchema = z.object({
  nameEn: z.string(),
  nameAr: z.string(),
  imageUrl: z.string(),
});

export const DeliverableSchema = z.object({
  titleEn: z.string(),
  titleAr: z.string(),
  value: z.string(),
  unitEn: z.string(),
  unitAr: z.string(),
});

export const ResourceSchema = z.object({
  titleEn: z.string(),
  titleAr: z.string(),
  image: z.string(),
});

export const CostSchema = z.object({
  costTitleEn: z.string(),
  costTitleAr: z.string(),
  costAmount: z.number(),
  costCurrencyEn: z.string(),
  costCurrencyAr: z.string(),
  costPeriodEn: z.string(),
  costPeriodAr: z.string(),
});

export const BeneficiarySchema = z.object({
  beneficiaryAmount: z.number(),
  beneficiaryTargetEn: z.string(),
  beneficiaryTargetAr: z.string(),
});

export const projects = pgTable("projects", {
  id: bigserial("id", { mode: "number" }).primaryKey(),
  
  // Language support flags
  isEnglish: boolean("is_english").notNull().default(true),
  isArabic: boolean("is_arabic").notNull().default(true),
  
  // Basic project information
  titleEn: text("title_en").notNull(),
  titleAr: text("title_ar").notNull(),
  descriptionEn: text("description_en").notNull(),
  descriptionAr: text("description_ar").notNull(),
  featuredImageUrl: text("featured_image_url").notNull(),
  color: text("color").notNull().default("#000000"),
  
  // Media content
  videoUrl: text("video_url"),
  
  // JSON arrays for complex data structures
  banners: jsonb("banners").$type<z.infer<typeof BannerSchema>[]>().default([]),
  goalsEn: text("goals_en").array().default([]),
  goalsAr: text("goals_ar").array().default([]),
  statics: jsonb("statics").$type<z.infer<typeof ProjectStaticSchema>[]>().default([]),
  fundingProviders: jsonb("funding_providers").$type<z.infer<typeof ProjectProviderDonorPartnerSchema>[]>().default([]),
  donors: jsonb("donors").$type<z.infer<typeof ProjectProviderDonorPartnerSchema>[]>().default([]),
  partners: jsonb("partners").$type<z.infer<typeof ProjectProviderDonorPartnerSchema>[]>().default([]),
  deliverables: jsonb("deliverables").$type<z.infer<typeof DeliverableSchema>[]>().default([]),
  resources: jsonb("resources").$type<z.infer<typeof ResourceSchema>[]>().default([]),
  cost: jsonb("cost").$type<z.infer<typeof CostSchema>[]>().default([]),
  beneficiaries: jsonb("beneficiaries").$type<z.infer<typeof BeneficiarySchema>[]>().default([]),
  
  // SEO and navigation
  slugEn: text("slug_en").notNull().unique(),
  slugAr: text("slug_ar").notNull().unique(),
  keywordsEn: text("keywords_en").array().default([]),
  keywordsAr: text("keywords_ar").array().default([]),
  tagsEn: text("tags_en").array().default([]),
  tagsAr: text("tags_ar").array().default([]),
  
  // Metrics and analytics
  pageViews: bigint("page_views", { mode: "number" }).default(0),
  
  // Relationships (foreign keys)
  programId: bigint("program_id", { mode: "number" }).references(() => programs.id, {
    onDelete: "set null",
    onUpdate: "cascade",
  }),
  categoryId: bigint("category_id", { mode: "number" }).references(() => projectCategories.id, {
    onDelete: "set null",
    onUpdate: "cascade",
  }),
  activityIds: bigint("activity_ids", { mode: "number" }).array().default([]),
  
  // Publishing status
  isPublished: boolean("is_published").default(false),
  publishedAt: timestamp("published_at", { withTimezone: true }),
  
  // Timestamps
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

// Zod schemas for validation
export const insertProjectSchema = createInsertSchema(projects, {
  titleEn: z.string().min(1),
  titleAr: z.string().min(1),
  descriptionEn: z.string().min(1),
  descriptionAr: z.string().min(1),
  featuredImageUrl: z.string().url(),
  slugEn: z.string().min(1),
  slugAr: z.string().min(1),
  color: z.string().regex(/^#[0-9A-F]{6}$/i),
  banners: z.array(BannerSchema).optional(),
  statics: z.array(ProjectStaticSchema).optional(),
  fundingProviders: z.array(ProjectProviderDonorPartnerSchema).optional(),
  donors: z.array(ProjectProviderDonorPartnerSchema).optional(),
  partners: z.array(ProjectProviderDonorPartnerSchema).optional(),
  deliverables: z.array(DeliverableSchema).optional(),
  resources: z.array(ResourceSchema).optional(),
  cost: z.array(CostSchema).optional(),
  beneficiaries: z.array(BeneficiarySchema).optional(),
});

export const selectProjectSchema = createSelectSchema(projects);

// Types
export type Project = typeof projects.$inferSelect;
export type NewProject = typeof projects.$inferInsert;
export type ProjectBanner = z.infer<typeof BannerSchema>;
export type ProjectStatic = z.infer<typeof ProjectStaticSchema>;
export type ProjectProviderDonorPartner = z.infer<typeof ProjectProviderDonorPartnerSchema>;
export type ProjectDeliverable = z.infer<typeof DeliverableSchema>;
export type ProjectResource = z.infer<typeof ResourceSchema>;
export type ProjectCost = z.infer<typeof CostSchema>;
export type ProjectBeneficiary = z.infer<typeof BeneficiarySchema>;
