import {
  boolean,
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const jobTypeEnum = pgEnum("job_type", ["full-time", "part-time", "contract", "internship", "volunteer"]);

export const jobs = pgTable("jobs", {
  id: serial("id").primaryKey(),
  isEnglish: boolean("is_english").default(false),
  isArabic: boolean("is_arabic").default(false),
  titleEn: varchar("title_en", { length: 500 }),
  titleAr: varchar("title_ar", { length: 500 }),
  slugEn: varchar("slug_en", { length: 200 }).unique(),
  slugAr: varchar("slug_ar", { length: 200 }).unique(),
  descriptionEn: text("description_en"),
  descriptionAr: text("description_ar"),
  // New fields added
  departmentEn: varchar("department_en", { length: 255 }),
  departmentAr: varchar("department_ar", { length: 255 }),
  experience: varchar("experience", { length: 50 }), // entry, mid, senior
  salaryMin: integer("salary_min"),
  salaryMax: integer("salary_max"),
  salaryCurrency: varchar("salary_currency", { length: 10 }),
  benefitsEn: text("benefits_en").array().default([]),
  benefitsAr: text("benefits_ar").array().default([]),
  urgent: boolean("urgent").default(false),
  postedDate: timestamp("posted_date", { withTimezone: true }).defaultNow(),
  // Existing fields
  availablePositions: integer("available_positions"),
  requirementsEn: text("requirements_en").array().default([]),
  requirementsAr: text("requirements_ar").array().default([]),
  responsibilitiesEn: text("responsibilities_en").array().default([]),
  responsibilitiesAr: text("responsibilities_ar").array().default([]),
  locationEn: varchar("location_en", { length: 200 }),
  locationAr: varchar("location_ar", { length: 200 }),
  type: jobTypeEnum("type"),
  applyUrl: varchar("apply_url", { length: 1000 }),
  pageViews: integer("page_views").default(0),
  isPublished: boolean("is_published").default(false),
  publishedAt: timestamp("published_at", { withTimezone: true }),
  expiresAt: timestamp("expires_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

// Zod schemas for validation
export const insertJobSchema = createInsertSchema(jobs, {
  titleEn: z.string().min(1).max(500),
  titleAr: z.string().min(1).max(500),
  slugEn: z.string().min(1).max(200),
  slugAr: z.string().min(1).max(200),
  descriptionEn: z.string().min(1),
  descriptionAr: z.string().min(1),
  availablePositions: z.number().int().positive(),
  locationEn: z.string().min(1).max(200),
  locationAr: z.string().min(1).max(200),
  type: z.enum(["full-time", "part-time", "contract", "internship", "volunteer"]),
  applyUrl: z.string().url(),
});

export const selectJobSchema = createSelectSchema(jobs);

// Types
export type Job = typeof jobs.$inferSelect;
export type NewJob = typeof jobs.$inferInsert;
