import {
  boolean,
  jsonb,
  pgEnum,
  pgTable,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const volunteerRequestStatusEnum = pgEnum("volunteer_request_status", ["pending", "approved", "rejected"]);

// JSON Schema types for complex fields
export const QuestionAnswerSchema = z.object({
  question: z.object({
    questionEn: z.string(),
    questionAr: z.string(),
    isPublished: z.boolean(),
    publishedAt: z.date(),
    createdAt: z.date(),
    updatedAt: z.date(),
  }),
  answerEn: z.string(),
  answerAr: z.string(),
});

export const volunteerRequests = pgTable("volunteer_requests", {
  id: serial("id").primaryKey(),
  isEnglish: boolean("is_english").default(false),
  isArabic: boolean("is_arabic").default(false),
  // Basic form fields
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 255 }),
  phone: varchar("phone", { length: 50 }),
  age: varchar("age", { length: 10 }),
  interests: varchar("interests"),
  availability: varchar("availability", { length: 100 }),
  experience: varchar("experience"),
  motivation: varchar("motivation"),
  cvUrl: varchar("cv_url", { length: 1000 }),
  questionsAnswers: jsonb("questions_answers").$type<z.infer<typeof QuestionAnswerSchema>[]>().default([]),
  status: volunteerRequestStatusEnum("status").default("pending"),
  appliedAt: timestamp("applied_at", { withTimezone: true }).defaultNow(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

// Zod schemas for validation
export const insertVolunteerRequestSchema = createInsertSchema(volunteerRequests, {
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(1, "Phone number is required"),
  age: z.string().min(1, "Age is required"),
  interests: z.string().min(1, "At least one interest is required"),
  availability: z.string().min(1, "Availability is required"),
  motivation: z.string().min(1, "Motivation is required"),
  experience: z.string().optional(),
  cvUrl: z.string().url().optional().or(z.literal("")),
  questionsAnswers: z.array(QuestionAnswerSchema).optional(),
  status: z.enum(["pending", "approved", "rejected"]).optional(),
  appliedAt: z.date().optional(),
});

export const selectVolunteerRequestSchema = createSelectSchema(volunteerRequests);

// Types
export type VolunteerRequest = typeof volunteerRequests.$inferSelect;
export type NewVolunteerRequest = typeof volunteerRequests.$inferInsert;
export type VolunteerRequestQuestionAnswer = z.infer<typeof QuestionAnswerSchema>;
