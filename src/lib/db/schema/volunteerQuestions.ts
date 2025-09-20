import {
  boolean,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const volunteerQuestions = pgTable("volunteer_questions", {
  id: serial("id").primaryKey(),
  questionEn: text("question_en").notNull(),
  questionAr: text("question_ar").notNull(),
  isPublished: boolean("is_published").default(false),
  publishedAt: timestamp("published_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

// Zod schemas for validation
export const insertVolunteerQuestionSchema = createInsertSchema(volunteerQuestions, {
  questionEn: z.string().min(1),
  questionAr: z.string().min(1),
});

export const selectVolunteerQuestionSchema = createSelectSchema(volunteerQuestions);

// Types
export type VolunteerQuestion = typeof volunteerQuestions.$inferSelect;
export type NewVolunteerQuestion = typeof volunteerQuestions.$inferInsert;
