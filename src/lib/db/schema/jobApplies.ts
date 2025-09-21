import {
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
import { jobs } from "./jobs";

export const jobApplicationStatusEnum = pgEnum("job_application_status", ["pending", "reviewing", "shortlisted", "rejected", "hired"]);

export const jobApplies = pgTable("jobs_applies", {
  id: serial("id").primaryKey(),
  jobId: integer("job_id").notNull().references(() => jobs.id, { onDelete: "cascade" }),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 50 }).notNull(),
  yearsOfExperience: integer("years_of_experience").notNull(),
  coverLetter: text("cover_letter").notNull(),
  cvUrl: varchar("cv_url", { length: 1000 }),
  status: jobApplicationStatusEnum("status").default("pending"),
  appliedAt: timestamp("applied_at", { withTimezone: true }).defaultNow(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

// Zod schemas for validation
export const insertJobApplySchema = createInsertSchema(jobApplies, {
  name: z.string().min(1, "Name is required").max(255),
  email: z.string().email("Valid email is required").max(255),
  phone: z.string().min(1, "Phone number is required").max(50),
  yearsOfExperience: z.number().int().min(0, "Years of experience must be non-negative"),
  coverLetter: z.string().min(10, "Cover letter must be at least 10 characters long"),
  cvUrl: z.string().url("Valid CV URL is required").optional().or(z.literal("")),
  status: z.enum(["pending", "reviewing", "shortlisted", "rejected", "hired"]).optional(),
});

export const selectJobApplySchema = createSelectSchema(jobApplies);

// Types
export type JobApply = typeof jobApplies.$inferSelect;
export type NewJobApply = typeof jobApplies.$inferInsert;
