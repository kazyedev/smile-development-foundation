import {
  boolean,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const faqs = pgTable("faqs", {
  id: serial("id").primaryKey(),
  questionEn: text("question_en").notNull(),
  questionAr: text("question_ar").notNull(),
  answerEn: text("answer_en").notNull(),
  answerAr: text("answer_ar").notNull(),
  views: integer("views").default(0),
  isPublished: boolean("is_published").default(false),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

// Zod schemas for validation
export const insertFaqSchema = createInsertSchema(faqs, {
  questionEn: z.string().min(1),
  questionAr: z.string().min(1),
  answerEn: z.string().min(1),
  answerAr: z.string().min(1),
  views: z.number().int().min(0).optional(),
});

export const selectFaqSchema = createSelectSchema(faqs);

// Types
export type FAQ = typeof faqs.$inferSelect;
export type NewFAQ = typeof faqs.$inferInsert;
